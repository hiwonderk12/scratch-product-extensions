import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import test from 'node:test';
import {execFileSync} from 'node:child_process';
import {fileURLToPath} from 'node:url';
import ts from 'typescript';
import vm from 'node:vm';
import JSZip from 'jszip';
import {applyAuthoringPlan, planAuthoringCommand} from './authoring.mjs';
import {collectNativeModule, collectStandaloneExtension, createNativeArchive} from './native-package.mjs';
import {prepareNativeLocales} from './authoring-locales.mjs';

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
    for (const relative of ['tools/sdk/index.d.ts', 'tools/cli/python-template-schema.mjs', 'tools/cli/native-package.mjs', 'tools/cli/authoring-config.mjs', 'tools/cli/authoring-locales.mjs']) {
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

// 新建夹具使用真实骨架的相邻语言目录，验证编译与多文件编辑合同。
const localizedFixture = context => {
    const fixtureValue = fixture(context);
    const file = fixtureValue.create();
    const filename = path.join(fixtureValue.root, file);
    return {...fixtureValue, filename};
};

test('every registered product uses four adjacent language catalogs', () => {
    const inventory = JSON.parse(fs.readFileSync(path.join(repository, 'library/modules.json'), 'utf8')).modules;
    for (const {moduleId} of inventory) {
        const directory = path.join(repository, 'products', moduleId);
        const metadata = JSON.parse(fs.readFileSync(path.join(directory, 'metadata.json'), 'utf8'));
        const filename = path.join(directory, metadata.source);
        const source = ts.createSourceFile(filename, fs.readFileSync(filename, 'utf8'), ts.ScriptTarget.Latest, true);
        const {catalogs} = prepareNativeLocales(source, ts,
            relative => fs.readFileSync(path.resolve(path.dirname(filename), relative), 'utf8'));
        assert.deepEqual([...catalogs.keys()].sort(), ['en', 'ko', 'zh-cn', 'zh-tw'], moduleId);
    }
});

test('inline author catalogs remain editable and self-contained', context => {
    const {root, filename, write} = localizedFixture(context);
    const before = fs.readFileSync(filename, 'utf8');
    const source = ts.createSourceFile(filename, before, ts.ScriptTarget.Latest, true);
    const prepared = prepareNativeLocales(source, ts,
        relative => fs.readFileSync(path.resolve(path.dirname(filename), relative), 'utf8'));
    fs.writeFileSync(filename, prepared.source.text);
    const spec = write('block.json', blockSpec);
    const plan = planAuthoringCommand(root, ['g', 'block', 'input/demo', 'double_value', '--type', 'reporter', '--spec', spec], ts);
    assert.equal(plan.changes.length, 1);
    applyAuthoringPlan(plan);
    assert.match(collectNativeModule(root, 'input/demo', ts).files['index.cjs'], /Double \[VALUE\]/);
});

test('language directories compile to one self-contained entry and CLI edits the four catalogs', async context => {
    const {root, filename, write} = localizedFixture(context);
    const specification = write('block.json', blockSpec);
    const plan = planAuthoringCommand(root, ['g', 'block', 'input/demo', 'double_value', '--type', 'reporter', '--spec', specification], ts);
    assert.equal(plan.changes.length, 5);
    applyAuthoringPlan(plan);
    assert.match(fs.readFileSync(filename, 'utf8'), /import locale0 from '\.\/locales\/zh-cn.json'/);
    const record = collectNativeModule(root, 'input/demo', ts);
    const module = {exports: {}};
    vm.runInNewContext(record.files['index.cjs'], {module, exports: module.exports});
    for (const locale of Object.keys(names)) {
        assert.equal(module.exports.messages[locale]['block.double_value'], blockSpec.text[locale]);
        assert.equal(JSON.parse(fs.readFileSync(path.join(path.dirname(filename), 'locales', locale + '.json'), 'utf8'))['block.double_value'], blockSpec.text[locale]);
    }
    assert.doesNotMatch(record.files['index.cjs'], /require\(/);
    const standalone = collectStandaloneExtension(path.join(root, 'products/input/demo'), ts);
    const zip = await JSZip.loadAsync(await createNativeArchive(standalone, JSZip));
    for (const locale of Object.keys(names)) {
        assert.equal(await zip.file(`src/locales/${locale}.json`).async('string'),
            fs.readFileSync(path.join(path.dirname(filename), 'locales', locale + '.json'), 'utf8'));
    }
    assert.equal(await zip.file('src/index.ts').async('string'), fs.readFileSync(filename, 'utf8'));
});

test('directory catalogs retain missing translation and placeholder validation', context => {
    const {root, filename} = localizedFixture(context);
    const english = path.join(path.dirname(filename), 'locales/en.json');
    const catalog = JSON.parse(fs.readFileSync(english, 'utf8'));
    catalog['block.demo_print_text'] = 'Print [WRONG]';
    fs.writeFileSync(english, JSON.stringify(catalog));
    assert.throws(() => collectNativeModule(root, 'input/demo', ts), /占位符不一致/);
    delete catalog['block.demo_print_text'];
    fs.writeFileSync(english, JSON.stringify(catalog));
    assert.throws(() => collectNativeModule(root, 'input/demo', ts), /缺译文/);
});

test('catalog imports reject traversal and use outside messages', context => {
    const {root, filename} = localizedFixture(context);
    const source = fs.readFileSync(filename, 'utf8');
    fs.writeFileSync(filename, source.replace('./locales/zh-cn.json', '../locales/zh-cn.json'));
    assert.throws(() => collectNativeModule(root, 'input/demo', ts), /语言.*路径/);
    fs.writeFileSync(filename, source + '\nconst outside = locale0;\n');
    assert.throws(() => collectNativeModule(root, 'input/demo', ts), /只.*messages/);
});

test('directory catalog edits preserve dry-run and stale-plan protections', context => {
    const {root, filename, write} = localizedFixture(context);
    const spec = write('block.json', blockSpec);
    const command = ['g', 'block', 'input/demo', 'double_value', '--type', 'reporter', '--spec', spec];
    const dryRun = planAuthoringCommand(root, [...command, '--dry-run'], ts);
    applyAuthoringPlan(dryRun);
    for (const change of dryRun.changes) assert.equal(fs.readFileSync(path.join(root, change.file), 'utf8'), change.before);
    const plan = planAuthoringCommand(root, command, ts);
    const english = path.join(path.dirname(filename), 'locales/en.json');
    fs.appendFileSync(english, '\n');
    assert.throws(() => applyAuthoringPlan(plan), /计划后发生变化/);
    assert.equal(fs.readFileSync(filename, 'utf8'), plan.changes[0].before);
});

test('directory menu generation rolls back all files after a partial write failure', context => {
    const {root, write} = localizedFixture(context);
    const spec = write('menu.json', {acceptReporters: false, items: [{value: '0', text: names}]});
    const plan = planAuthoringCommand(root, ['g', 'menu', 'input/demo', 'mode', '--spec', spec], ts);
    const rename = fs.renameSync;
    context.mock.method(fs, 'renameSync', (from, to) => {
        if (to.endsWith('en.json')) throw new Error('模拟译文提交失败');
        return rename(from, to);
    });
    assert.throws(() => applyAuthoringPlan(plan), /模拟译文提交失败/);
    for (const change of plan.changes) assert.equal(fs.readFileSync(path.join(root, change.file), 'utf8'), change.before);
    assert.equal(fs.readdirSync(path.join(root, 'products/input/demo/src/locales')).some(name => name.endsWith('.tmp')), false);
});

test('directory catalogs reject duplicate keys, mismatched locale and redirected directories', context => {
    const {root, filename, write} = localizedFixture(context);
    const english = path.join(path.dirname(filename), 'locales/en.json');
    const before = fs.readFileSync(english, 'utf8');
    fs.writeFileSync(english, before.replace('{', '{"product.name": "duplicate",'));
    assert.throws(() => collectNativeModule(root, 'input/demo', ts), /属性重复/);
    fs.writeFileSync(english, before);
    const source = fs.readFileSync(filename, 'utf8');
    fs.writeFileSync(filename, source.replace('"en": en', '"xx": en'));
    assert.throws(() => collectNativeModule(root, 'input/demo', ts), /文件名一致/);
    fs.writeFileSync(filename, source);
    const directory = path.join(path.dirname(filename), 'locales');
    const destination = path.join(root, 'outside-locales');
    fs.renameSync(directory, destination);
    fs.symlinkSync(destination, directory, process.platform === 'win32' ? 'junction' : 'dir');
    assert.throws(() => collectNativeModule(root, 'input/demo', ts), /超出目录/);
    const spec = write('block.json', blockSpec);
    assert.throws(() => planAuthoringCommand(root, ['g', 'block', 'input/demo', 'double_value', '--type', 'reporter', '--spec', spec], ts), /符号链接|联接/);
});

test('dry-run lists files and fields without creating directories or changing support configuration', context => {
    const {root, specification} = fixture(context);
    const before = fs.readFileSync(path.join(root, 'library.config.json'), 'utf8');
    const plan = planAuthoringCommand(root, ['new', 'module', 'demo', '--category', 'input', '--spec', specification, '--dry-run'], ts);
    assert.equal(plan.dryRun, true);
    assert.equal(plan.changes.length, 8);
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
    assert.equal(plan.changes.length, 5);
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

test('lowercase CLI boolean emits the VM Boolean block and argument types', context => {
    const {root, write, create} = fixture(context);
    create();
    const specification = write('boolean.json', {
        text: {'zh-cn': '判断 [VALUE]', en: 'Test [VALUE]', 'zh-tw': '判斷 [VALUE]', ko: '[VALUE] 판단'},
        arguments: {VALUE: {type: 'boolean', defaultValue: false}},
        python: {template: '{VALUE}'}
    });
    for (const type of ['boolean', 'command', 'reporter']) {
        applyAuthoringPlan(planAuthoringCommand(root,
            ['g', 'block', 'input/demo', `test_${type}`, '--type', type, '--spec', specification], ts));
    }
    const record = collectNativeModule(root, 'input/demo', ts);
    const module = {exports: {}};
    new Function('module', 'exports', record.files['index.cjs'])(module, module.exports);
    const instance = new module.exports.default({t: key => key});
    const blocks = instance.getInfo().blocks;
    for (const type of ['boolean', 'command', 'reporter']) {
        const block = blocks.find(item => item.opcode === `test_${type}`);
        assert.equal(block.blockType, type === 'boolean' ? 'Boolean' : type);
        assert.equal(block.arguments.VALUE.type, 'Boolean');
        assert.equal(block.arguments.VALUE.defaultValue, false);
        assert.deepEqual(instance.getPython()[block.opcode], {template: '{VALUE}'});
    }
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

test('generation preserves CRLF and refuses rewriting a branched sensor class', context => {
    const {root, write, create} = fixture(context);
    fs.mkdirSync(path.join(root, 'products/input'), {recursive: true});
    fs.cpSync(path.join(repository, 'products/input/light-sensor'), path.join(root, 'products/input/light-sensor'), {recursive: true});
    const sensorFile = path.join(root, 'products/input/light-sensor/src/index.ts');
    const sensorBefore = fs.readFileSync(sensorFile, 'utf8');
    const filename = path.join(root, create('plain'));
    const original = fs.readFileSync(filename, 'utf8').replace(/\r?\n/g, '\r\n');
    fs.writeFileSync(filename, original);
    const spec = write('block.json', blockSpec);
    assert.throws(() => planAuthoringCommand(root, ['g', 'block', 'input/light-sensor', 'cli_double_value',
        '--type', 'reporter', '--spec', spec], ts), /分支|直接返回/);
    assert.equal(fs.readFileSync(sensorFile, 'utf8'), sensorBefore);
    const plan = planAuthoringCommand(root, ['g', 'block', 'input/plain', 'cli_double_value', '--type', 'reporter', '--spec', spec], ts);
    applyAuthoringPlan(plan);
    const after = fs.readFileSync(filename, 'utf8');
    assert.equal(/(?<!\r)\n/.test(after), false);
    assert.ok(after.includes("template: 'print({TEXT})'"));
    assert.match(collectNativeModule(root, 'input/plain', ts).files['index.cjs'], /cli_double_value/);
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
