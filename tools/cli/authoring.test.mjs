import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import test from 'node:test';
import {execFileSync} from 'node:child_process';
import {fileURLToPath} from 'node:url';
import ts from 'typescript';
import JSZip from 'jszip';
import {applyAuthoringPlan, planAuthoringCommand} from './authoring.mjs';
import {collectNativeModule, createNativeArchive} from './native-package.mjs';

const repository = fileURLToPath(new URL('../../', import.meta.url));
const names = {'zh-cn': '演示模块', en: 'Demo module', 'zh-tw': '示範模組', ko: '데모 모듈'};
const blockSpec = {
    text: {'zh-cn': '将 [VALUE] 翻倍', en: 'Double [VALUE]', 'zh-tw': '將 [VALUE] 加倍', ko: '[VALUE] 두 배'},
    arguments: {VALUE: {type: 'number', defaultValue: 2}},
    python: {template: '({VALUE} * 2)'}
};
const fixture = context => {
    const root = fs.mkdtempSync(path.join(repository, '.native-cli-authoring-'));
    context.after(() => fs.rmSync(root, {recursive: true, force: true}));
    const write = (relative, value) => {
        const filename = path.join(root, relative);
        fs.mkdirSync(path.dirname(filename), {recursive: true});
        fs.writeFileSync(filename, JSON.stringify(value, null, 2) + '\n');
        return filename;
    };
    for (const relative of ['tools/sdk/index.d.ts', 'tools/cli/native-package.mjs', 'tools/cli/authoring-config.mjs']) {
        fs.mkdirSync(path.dirname(path.join(root, relative)), {recursive: true});
        fs.copyFileSync(path.join(repository, relative), path.join(root, relative));
    }
    write('library.config.json', {profile: 'wonderlab', version: '0.1.11', defaultLocale: 'zh-cn',
        categories: ['robots', 'input', 'output', 'power', 'communication'].map(id => ({id})),
        products: {}, ports: 'library/ports.json'});
    write('library/ports.json', {});
    const specification = write('spec.json', {name: names});
    const create = (id = 'demo', category = 'input') => {
        const plan = planAuthoringCommand(root, ['new', category === 'robots' ? 'product' : 'module', id,
            ...(category === 'robots' ? [] : ['--category', category]), '--spec', specification], ts);
        applyAuthoringPlan(plan);
        return `products/${category}/${id}/src/index.ts`;
    };
    return {root, write, specification, create};
};

test('dry-run lists files and fields without creating directories or changing support configuration', context => {
    const {root, specification} = fixture(context);
    const before = fs.readFileSync(path.join(root, 'library.config.json'), 'utf8');
    const plan = planAuthoringCommand(root, ['new', 'module', 'demo', '--category', 'input', '--spec', specification, '--dry-run'], ts);
    assert.equal(plan.dryRun, true);
    assert.equal(plan.changes.length, 4);
    assert.ok(plan.fields.includes('messages/product/getInfo/getPython'));
    applyAuthoringPlan(plan);
    assert.equal(fs.existsSync(path.join(root, 'products')), false);
    assert.equal(fs.readFileSync(path.join(root, 'library.config.json'), 'utf8'), before);
});

for (const category of ['robots', 'input', 'output', 'power', 'communication']) {
    test(`new ${category} emits one class, four locales and a native ZIP without enabling hardware support`, async context => {
        const {root, create} = fixture(context);
        create('demo', category);
        const record = collectNativeModule(root, `${category}/demo`, ts);
        assert.deepEqual(record.descriptor.supportedLocales, ['zh-cn', 'en', 'zh-tw', 'ko']);
        assert.deepEqual(record.descriptor.name, names);
        assert.deepEqual(JSON.parse(record.files['library.json']).products, {});
        assert.match(record.files['index.cjs'], /class ProductBlocks/);
        assert.equal(fs.existsSync(path.join(root, `products/${category}/demo/python`)), false);
        const zip = await JSZip.loadAsync(await createNativeArchive(record, JSZip));
        assert.deepEqual(Object.keys(zip.files).filter(name => !zip.files[name].dir).sort(),
            ['extension.json', 'index.cjs', 'library.json']);
        const environment = {...process.env};
        delete environment.NODE_TEST_CONTEXT;
        delete environment.NODE_OPTIONS;
        const result = execFileSync(process.execPath, ['--test', path.join(root, `products/${category}/demo/test/smoke.mjs`)], {encoding: 'utf8', env: environment});
        assert.match(result, /pass 1/);
    });
}

test('generates menu and block with focused AST insertions, keeping comments and Python together', context => {
    const {root, write, create} = fixture(context);
    const sourceFile = path.join(root, create());
    const original = fs.readFileSync(sourceFile, 'utf8').replace('getInfo ()', '// 保留课程人员的说明\n    getInfo ()');
    fs.writeFileSync(sourceFile, original);
    const menu = write('menu.json', {acceptReporters: false, items: [{value: '0', text: names},
        {value: '1', text: {'zh-cn': '快', en: 'Fast', 'zh-tw': '快', ko: '빠름'}}]});
    applyAuthoringPlan(planAuthoringCommand(root, ['g', 'menu', 'input/demo', 'mode', '--spec', menu], ts));
    const spec = write('block.json', blockSpec);
    const plan = planAuthoringCommand(root, ['generate', 'block', 'input/demo', 'double_value', '--type', 'reporter', '--spec', spec], ts);
    assert.equal(plan.changes.length, 1);
    assert.deepEqual(plan.fields, ['messages.*.block.double_value', 'getInfo.blocks.double_value', 'getPython.double_value']);
    applyAuthoringPlan(plan);
    const source = fs.readFileSync(sourceFile, 'utf8');
    assert.match(source, /保留课程人员的说明/);
    assert.match(source, /opcode: "double_value"/);
    assert.match(source, /\(\{VALUE\} \* 2\)/);
    assert.equal(source.includes('defaultValue: "Hello"'), true);
    const record = collectNativeModule(root, 'input/demo', ts);
    assert.equal(record.descriptor.name.en, 'Demo module');
    assert.ok(source.includes('menu.mode.0'));
    assert.throws(() => planAuthoringCommand(root, ['g', 'block', 'input/demo', 'double_value', '--type', 'reporter', '--spec', spec], ts), /重复|已存在/);
    assert.throws(() => planAuthoringCommand(root, ['g', 'menu', 'input/demo', 'mode', '--spec', menu], ts), /重复|已存在/);
});

test('invalid translations, placeholders, menus and unsupported targets cannot partially edit a source', context => {
    const {root, write, create} = fixture(context);
    const sourceFile = path.join(root, create());
    const before = fs.readFileSync(sourceFile, 'utf8');
    for (const patch of [
        {text: {...blockSpec.text, en: 'Double'}},
        {text: {...blockSpec.text, ko: ''}},
        {arguments: {VALUE: {type: 'number', defaultValue: 2, menu: 'missing'}}},
        {python: {template: '{UNKNOWN}'}},
        {python: {template: ''}},
        {codegen: {c: 'placeholder'}}
    ]) {
        const spec = write('bad.json', {...blockSpec, ...patch});
        assert.throws(() => planAuthoringCommand(root, ['g', 'block', 'input/demo', 'bad', '--type', 'reporter', '--spec', spec], ts));
        assert.equal(fs.readFileSync(sourceFile, 'utf8'), before);
    }
});

test('rejects overwrites, traversal, duplicate flags and conflicting ownership without changing files', context => {
    const {root, specification, write, create} = fixture(context);
    const sourceFile = path.join(root, create());
    const before = fs.readFileSync(sourceFile, 'utf8');
    for (const argumentsList of [
        ['new', 'module', 'demo', '--category', 'input', '--spec', specification],
        ['new', 'module', '../escape', '--category', 'input', '--spec', specification],
        ['new', 'module', 'con', '--category', 'input', '--spec', specification],
        ['new', 'module', 'wondercode-example', '--category', 'input', '--spec', specification],
        ['new', 'module', 'other', '--category', 'input', '--category', 'power', '--spec', specification],
        ['new', 'module', 'other', '--category', 'input', '--spec', specification, '--force']
    ]) assert.throws(() => planAuthoringCommand(root, argumentsList, ts));
    create('other');
    const spec = write('block.json', blockSpec);
    assert.throws(() => planAuthoringCommand(root, ['g', 'block', 'input/other', 'demo_print_text', '--type', 'reporter', '--spec', spec], ts), /归属|冲突/);
    assert.equal(fs.readFileSync(sourceFile, 'utf8'), before);
});

test('existing module metadata cannot redirect edits to another module, and junctions cannot redirect writes', context => {
    const {root, specification, write, create} = fixture(context);
    create();
    const spec = write('block.json', blockSpec);
    const metadataFile = path.join(root, 'products/input/demo/metadata.json');
    const metadata = JSON.parse(fs.readFileSync(metadataFile, 'utf8'));
    fs.writeFileSync(metadataFile, JSON.stringify({...metadata, source: '../../../tools/sdk/index.d.ts'}));
    assert.throws(() => planAuthoringCommand(root, ['g', 'block', 'input/demo', 'read', '--type', 'reporter', '--spec', spec], ts), /越界/);
    const destination = path.join(root, 'outside-output');
    fs.mkdirSync(destination);
    fs.symlinkSync(destination, path.join(root, 'products/output'), process.platform === 'win32' ? 'junction' : 'dir');
    assert.throws(() => planAuthoringCommand(root, ['new', 'module', 'demo', '--category', 'output', '--spec', specification], ts), /链接|联接/);
    assert.deepEqual(fs.readdirSync(destination), []);
});

test('generation preserves CRLF and an existing sensor class without rewriting its old declarations', context => {
    const {root, write} = fixture(context);
    fs.mkdirSync(path.join(root, 'products/input'), {recursive: true});
    fs.cpSync(path.join(repository, 'products/input/light-sensor'), path.join(root, 'products/input/light-sensor'), {recursive: true});
    const filename = path.join(root, 'products/input/light-sensor/src/index.ts');
    const original = fs.readFileSync(filename, 'utf8').replace(/\r?\n/g, '\r\n');
    fs.writeFileSync(filename, original);
    const spec = write('block.json', blockSpec);
    const plan = planAuthoringCommand(root, ['g', 'block', 'input/light-sensor', 'cli_double_value', '--type', 'reporter', '--spec', spec], ts);
    applyAuthoringPlan(plan);
    const after = fs.readFileSync(filename, 'utf8');
    assert.equal(/(?<!\r)\n/.test(after), false);
    assert.ok(after.includes("imports: ['import Hiwonder_DEV']"));
    assert.ok(after.includes('light.read_value()'));
    assert.match(collectNativeModule(root, 'input/light-sensor', ts).files['index.cjs'], /cli_double_value/);
});

test('stale plans and branchy classes fail before writing rather than guessing an adaptation branch', context => {
    const {root, write, create} = fixture(context);
    const sourceFile = path.join(root, create());
    const spec = write('block.json', blockSpec);
    const plan = planAuthoringCommand(root, ['g', 'block', 'input/demo', 'double_value', '--type', 'reporter', '--spec', spec], ts);
    const changed = fs.readFileSync(sourceFile, 'utf8') + '\n// 外部编辑\n';
    fs.writeFileSync(sourceFile, changed);
    assert.throws(() => applyAuthoringPlan(plan), /变化/);
    assert.equal(fs.readFileSync(sourceFile, 'utf8'), changed);
    fs.writeFileSync(sourceFile, changed.replace('return {', "if (this.context.variant === 'x') return {};\n        return {"));
    assert.throws(() => planAuthoringCommand(root, ['g', 'block', 'input/demo', 'double_value', '--type', 'reporter', '--spec', spec], ts), /分支|直接返回/);
});

test('staging failure leaves no partial scaffold, while dry-run never invokes writes', context => {
    const {root, specification} = fixture(context);
    const argumentsList = ['new', 'module', 'demo', '--category', 'input', '--spec', specification];
    const plan = planAuthoringCommand(root, argumentsList, ts);
    const write = fs.writeFileSync;
    const mocked = context.mock.method(fs, 'writeFileSync', (filename, ...argumentsRest) => {
        if (String(filename).includes('index.ts.')) throw new Error('模拟写盘失败');
        return write(filename, ...argumentsRest);
    });
    assert.throws(() => applyAuthoringPlan(plan), /模拟写盘失败/);
    assert.equal(fs.existsSync(path.join(root, 'products')), false);
    const calls = mocked.mock.callCount();
    applyAuthoringPlan({...plan, dryRun: true});
    assert.equal(mocked.mock.callCount(), calls);
});

test('CLI help and dry-run expose implemented commands without editing the actual repository', context => {
    const {specification} = fixture(context);
    const cli = path.join(repository, 'tools/cli/index.mjs');
    assert.match(execFileSync(process.execPath, [cli, '--help'], {encoding: 'utf8'}), /generate|生成/);
    const result = execFileSync(process.execPath, [cli, 'new', 'module', 'cli-acceptance-demo', '--category', 'input',
        '--spec', specification, '--dry-run'], {encoding: 'utf8'});
    assert.match(result, /DRY-RUN/);
    assert.match(result, /products\/input\/cli-acceptance-demo\/src\/index.ts/);
    assert.equal(fs.existsSync(path.join(repository, 'products/input/cli-acceptance-demo')), false);
});
