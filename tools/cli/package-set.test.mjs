import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import test from 'node:test';
import ts from 'typescript';
import JSZip from 'jszip';
import {fileURLToPath} from 'node:url';
import {applyAuthoringPlan, planAuthoringCommand} from './authoring.mjs';
import {planSupportCommand, planPackageSet} from './package-set.mjs';
import {readLibrarySnapshot} from './native-package.mjs';

const repository = fileURLToPath(new URL('../../', import.meta.url));
const fixture = context => {
    const root = fs.mkdtempSync(path.join(os.tmpdir(), 'native-package-set-'));
    context.after(() => fs.rmSync(root, {recursive: true, force: true}));
    const write = (relative, value) => {
        const filename = path.join(root, relative);
        fs.mkdirSync(path.dirname(filename), {recursive: true});
        fs.writeFileSync(filename, JSON.stringify(value, null, 2) + '\n');
        return filename;
    };
    fs.mkdirSync(path.join(root, 'tools/sdk'), {recursive: true});
    fs.copyFileSync(path.join(repository, 'tools/sdk/index.d.ts'), path.join(root, 'tools/sdk/index.d.ts'));
    write('library.config.json', {formatVersion: 1, profile: 'wonderlab', version: '0.1.11', defaultLocale: 'zh-cn',
        categories: [{id: 'robots'}, {id: 'output'}], products: {aimech: 'library/boards/aimech.json'}, ports: 'library/ports.json'});
    write('library/ports.json', {});
    write('library/support/base.json', {modules: {}});
    write('library/boards/aimech.json', {product: 'robots/aimech', extends: 'library/support/base.json', modules: {}});
    const spec = write('module.json', {name: {'zh-cn': '文本演示', en: 'Text demo', 'zh-tw': '文字示範', ko: '텍스트 예제'}});
    for (const args of [['new', 'product', 'aimech'], ['new', 'module', 'hello-text', '--category', 'output']]) {
        applyAuthoringPlan(planAuthoringCommand(root, [...args, '--spec', spec], ts));
    }
    const support = {variant: 'text-demo', portGroups: {}, libraryVersion: '0.1.12-demo.1', productVersion: '0.1.1-demo.1'};
    const specification = write('support.json', support);
    const args = ['add', 'aimech', 'output/hello-text', '--spec', specification];
    return {root, write, support, args};
};

test('support dry-run shows the companion product and changes nothing; apply changes only one board and explicit versions', context => {
    const {root, args} = fixture(context);
    const before = readLibrarySnapshot(root);
    const plan = planSupportCommand(root, [...args, '--dry-run']);
    assert.deepEqual(plan.modules, ['robots/aimech', 'output/hello-text']);
    assert.equal(plan.changes.length, 3);
    applyAuthoringPlan(plan);
    assert.deepEqual(readLibrarySnapshot(root), before);
    applyAuthoringPlan(planSupportCommand(root, args));
    const snapshot = readLibrarySnapshot(root);
    assert.equal(snapshot.version, '0.1.12-demo.1');
    assert.deepEqual(snapshot.products.aimech.modules['output/hello-text'], {
        variant: 'text-demo', legacyNamespaces: ['display'], portGroups: {}
    });
    assert.equal(JSON.parse(fs.readFileSync(path.join(root, 'products/robots/aimech/metadata.json'))).version, '0.1.1-demo.1');
    assert.equal(JSON.parse(fs.readFileSync(path.join(root, 'products/output/hello-text/metadata.json'))).version, '0.1.0');
    assert.deepEqual(JSON.parse(fs.readFileSync(path.join(root, 'library/support/base.json'))), {modules: {}});
});

test('support refuses unknown boards, repeated support, unselected namespaces, bad ports and unchanged versions before writing', context => {
    const {root, args, support, write} = fixture(context);
    assert.throws(() => planSupportCommand(root, ['add', 'missing', ...args.slice(2)]), /主控/);
    for (const patch of [{libraryVersion: '0.1.11'}, {productVersion: '0.1.0'},
        {legacyNamespaces: ['other']}, {portGroups: {missing: {bindings: {}}}}, {variant: ''}, {typo: true}]) {
        write('support.json', {...support, ...patch});
        assert.throws(() => planSupportCommand(root, args));
        assert.equal(readLibrarySnapshot(root).version, '0.1.11');
    }
    write('support.json', support);
    applyAuthoringPlan(planSupportCommand(root, args));
    assert.throws(() => planSupportCommand(root, args), /已支持/);
});

test('multi-file support update rolls back committed files on rename failure and rejects stale plans', context => {
    const {root, args} = fixture(context);
    const plan = planSupportCommand(root, args);
    const rename = fs.renameSync;
    let calls = 0;
    const mocked = context.mock.method(fs, 'renameSync', (...parameters) => {
        calls++;
        if (calls === 2) throw new Error('模拟配置写入失败');
        return rename(...parameters);
    });
    assert.throws(() => applyAuthoringPlan(plan), /模拟配置写入失败/);
    mocked.mock.restore();
    for (const change of plan.changes) assert.equal(fs.readFileSync(path.join(root, change.file), 'utf8'), change.before);
    fs.appendFileSync(path.join(root, plan.changes[0].file), '\n');
    assert.throws(() => applyAuthoringPlan(plan), /变化/);
});

test('support respects inherited entries and validates port bindings and defaults before writes', context => {
    const {root, args, write, support} = fixture(context);
    write('library/support/base.json', {modules: {'output/hello-text': {variant: 'text-demo', legacyNamespaces: ['display'], portGroups: {}}}});
    assert.throws(() => planSupportCommand(root, args), /已支持/);
    write('library/support/base.json', {modules: {}});
    write('library/ports.json', {'display.demo': [{label: 'A', value: '1'}]});
    for (const bindings of [{'display_wrong.TEXT': '1'}, {'display_hello_text_print_text.MISSING': '1'},
        {'display_hello_text_print_text.TEXT': '9'}]) {
        write('support.json', {...support, portGroups: {'display.demo': {bindings}}});
        assert.throws(() => planSupportCommand(root, args), /端口|参数|默认值/);
        assert.equal(readLibrarySnapshot(root).version, '0.1.11');
    }
    const portGroups = {'display.demo': {bindings: {'display_hello_text_print_text.TEXT': '1'}}};
    write('support.json', {...support, portGroups});
    applyAuthoringPlan(planSupportCommand(root, args));
    assert.deepEqual(readLibrarySnapshot(root).products.aimech.modules['output/hello-text'].portGroups, portGroups);
});

test('pack-set creates only the selected product and module with identical snapshots, no overwrite or hidden support injection', async context => {
    const {root, args} = fixture(context);
    await assert.rejects(() => planPackageSet(root, ['aimech', 'output/hello-text', '--output', 'dist/first'], ts, JSZip), /未支持/);
    applyAuthoringPlan(planSupportCommand(root, args));
    const plan = await planPackageSet(root, ['aimech', 'output/hello-text', '--output', 'dist/first', '--dry-run'], ts, JSZip);
    applyAuthoringPlan(plan);
    assert.equal(fs.existsSync(path.join(root, 'dist')), false);
    applyAuthoringPlan({...plan, dryRun: false});
    assert.equal(plan.changes.length, 3);
    const snapshots = [];
    for (const change of plan.changes.filter(item => item.file.endsWith('.zip'))) {
        const zip = await JSZip.loadAsync(fs.readFileSync(path.join(root, change.file)));
        const descriptor = JSON.parse(await zip.file('extension.json').async('string'));
        const snapshot = JSON.parse(await zip.file('library.json').async('string'));
        assert.equal(descriptor.libraryVersion, '0.1.12-demo.1');
        assert.equal(snapshot.products.aimech.modules['output/hello-text'].variant, 'text-demo');
        snapshots.push(snapshot);
    }
    assert.deepEqual(snapshots[0], snapshots[1]);
    const manifest = JSON.parse(fs.readFileSync(path.join(root, 'dist/first/package-set.json')));
    assert.deepEqual(manifest.packages.map(item => item.moduleId), ['robots/aimech', 'output/hello-text']);
    await assert.rejects(() => planPackageSet(root, ['aimech', 'output/hello-text', '--output', 'dist/first'], ts, JSZip), /已存在/);
    await assert.rejects(() => planPackageSet(root, ['aimech', 'output/hello-text', '--output', '../escape'], ts, JSZip), /越界/);
});

test('pack-set compiles all selected packages before writing and does not publish partial output', async context => {
    const {root, args} = fixture(context);
    applyAuthoringPlan(planSupportCommand(root, args));
    fs.appendFileSync(path.join(root, 'products/output/hello-text/src/index.ts'), '\nconst broken: number = "invalid";');
    await assert.rejects(() => planPackageSet(root, ['aimech', 'output/hello-text', '--output', 'dist/broken'], ts, JSZip));
    assert.equal(fs.existsSync(path.join(root, 'dist')), false);
});

test('pack-set write failure removes only its new files and refuses linked output paths', async context => {
    const {root, args} = fixture(context);
    applyAuthoringPlan(planSupportCommand(root, args));
    const plan = await planPackageSet(root, ['aimech', 'output/hello-text', '--output', 'dist/failure'], ts, JSZip);
    const copy = fs.copyFileSync;
    let calls = 0;
    const mocked = context.mock.method(fs, 'copyFileSync', (...parameters) => {
        calls++;
        if (calls === 2) throw new Error('模拟ZIP写入失败');
        return copy(...parameters);
    });
    assert.throws(() => applyAuthoringPlan(plan), /模拟ZIP写入失败/);
    mocked.mock.restore();
    assert.equal(fs.existsSync(path.join(root, 'dist')), false);
    fs.mkdirSync(path.join(root, 'destination'));
    fs.symlinkSync(path.join(root, 'destination'), path.join(root, 'linked'), process.platform === 'win32' ? 'junction' : 'dir');
    await assert.rejects(() => planPackageSet(root, ['aimech', 'output/hello-text', '--output', 'linked/escape'], ts, JSZip), /联接|链接/);
    assert.deepEqual(fs.readdirSync(path.join(root, 'destination')), []);
});
