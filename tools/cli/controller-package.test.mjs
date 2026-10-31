import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import test from 'node:test';
import {fileURLToPath} from 'node:url';
import typescript from 'typescript';
import JSZip from 'jszip';
import {collectNativeModule, collectStandaloneExtension, createNativeArchive} from './native-package.mjs';
import {createNativeCandidateCatalog} from './native-catalog.mjs';
import {createNativeRootCatalog, validateNativeReleaseCatalog} from './native-releases.mjs';
import {planAuthoringCommand} from './authoring.mjs';

const repository = fileURLToPath(new URL('../../', import.meta.url));
const moduleId = 'controllers/aiblocksboard';

test('handwritten controller compiles, packs its real icon and enters the official download catalog', async () => {
    const collected = collectNativeModule(repository, moduleId, typescript);
    assert.equal(collected.descriptor.id, 'aiblocksboard');
    assert.equal(collected.descriptor.version, '0.0.2');
    assert.match(collected.files['index.cjs'], /class AIBlocksBoard/);
    const library = JSON.parse(collected.files['library.json']);
    assert.equal(library.products.aiblocksboard.product, moduleId);
    assert.deepEqual(Object.keys(library.products.aiblocksboard.modules).sort(),
        ['power/long-motor', 'power/servo-180', 'power/servo-360']);
    const data = await createNativeArchive(collected, JSZip);
    const zip = await JSZip.loadAsync(data);
    assert.deepEqual(await zip.file(collected.descriptor.icon).async('nodebuffer'),
        fs.readFileSync(path.join(repository, 'products', moduleId, collected.descriptor.icon)));
    const catalog = await createNativeCandidateCatalog([{relativePath: 'aiblocksboard.zip', data}], {
        profile: 'wonderlab', baseUrl: 'https://example.test/native/'
    }, JSZip);
    assert.equal(catalog.packages[0].moduleId, moduleId);
    assert.equal(catalog.packages[0].libraryVersion, library.version);
});

for (const [id, count] of [['long-motor', 14], ['servo-180', 3], ['servo-360', 3]]) {
    test(`direct power ${id} compiles and packs only its verified controller support`, async () => {
        const collected = collectNativeModule(repository, `power/${id}`, typescript);
        assert.equal(collected.descriptor.version, '0.0.1');
        assert.equal(collected.descriptor.namespace, 'actuator');
        assert.deepEqual(collected.descriptor.supportedLocales, ['zh-cn', 'en', 'zh-tw', 'ko']);
        const library = JSON.parse(collected.files['library.json']);
        assert.equal(library.version, '0.0.3');
        assert.deepEqual(Object.keys(library.products).filter(productId => library.products[productId].modules[`power/${id}`]),
            ['aiblocksboard']);
        const module = {exports: {}};
        // 执行本次编译的作者类，仅检查声明，不调用设备 SDK。
        new Function('module', 'exports', collected.files['index.cjs'])(module, module.exports);
        const instance = new module.exports.default({variant: 'hiwonder-direct',
            t: key => module.exports.messages.en[key], asset: filename => filename});
        assert.equal(instance.getInfo().blocks.filter(block => block.opcode).length, count);
        assert.equal(Object.keys(instance.getPython()).length, count);
        const zip = await JSZip.loadAsync(await createNativeArchive(collected, JSZip));
        assert.ok(zip.file(collected.descriptor.icon));
        assert.ok(zip.file('index.cjs'));
        assert.ok(zip.file('library.json'));
        if (id !== 'long-motor') assert.ok(zip.file('assets/servo.svg'));
    });
}

test('controller history participates in the hierarchical catalog without rewriting real releases', context => {
    const directory = fs.mkdtempSync(path.join(os.tmpdir(), 'native-controller-catalog-'));
    context.after(() => {
        assert.equal(path.dirname(fs.realpathSync(directory)), fs.realpathSync(os.tmpdir()));
        assert.equal(fs.lstatSync(directory).isSymbolicLink(), false);
        assert.ok(path.basename(directory).startsWith('native-controller-catalog-'));
        fs.rmSync(directory, {recursive: true});
    });
    const product = path.join(directory, moduleId);
    fs.mkdirSync(product, {recursive: true});
    fs.writeFileSync(path.join(product, 'metadata.json'), JSON.stringify({id: 'aiblocksboard'}));
    fs.writeFileSync(path.join(product, 'catalog.json'), JSON.stringify({formatVersion: 2, profile: 'wonderlab',
        moduleId, status: 'candidate', packages: [{moduleId, version: '0.0.1', libraryVersion: '0.0.2',
            status: 'candidate', tag: 'test-only', asset: 'aiblocksboard.zip',
            downloadUrl: 'https://github.com/hiwonderk12/scratch-product-extensions/releases/download/test-only/aiblocksboard.zip'}]}));
    const options = {productsDirectory: directory, profile: 'wonderlab', status: 'candidate'};
    const root = createNativeRootCatalog(options);
    assert.deepEqual(root.products, [{moduleId, catalog: `products/${moduleId}/catalog.json`}]);
    assert.equal(validateNativeReleaseCatalog(root, options), root);
    assert.throws(() => validateNativeReleaseCatalog({...root, products: []}, options), /遗漏/);
});

test('standalone author metadata cannot request a controller category', context => {
    const directory = fs.mkdtempSync(path.join(os.tmpdir(), 'native-controller-user-'));
    context.after(() => {
        assert.equal(path.dirname(fs.realpathSync(directory)), fs.realpathSync(os.tmpdir()));
        assert.equal(fs.lstatSync(directory).isSymbolicLink(), false);
        assert.ok(path.basename(directory).startsWith('native-controller-user-'));
        fs.rmSync(directory, {recursive: true});
    });
    fs.writeFileSync(path.join(directory, 'metadata.json'), JSON.stringify({id: 'custom-board', category: 'controllers'}));
    assert.throws(() => collectStandaloneExtension(directory, typescript), /不能替换主控包/);
});

test('optional generation recognizes controller ownership without allowing new module commands to create a main board', context => {
    const directory = fs.mkdtempSync(path.join(os.tmpdir(), 'native-controller-authoring-'));
    context.after(() => {
        assert.equal(path.dirname(fs.realpathSync(directory)), fs.realpathSync(os.tmpdir()));
        assert.equal(fs.lstatSync(directory).isSymbolicLink(), false);
        assert.ok(path.basename(directory).startsWith('native-controller-authoring-'));
        fs.rmSync(directory, {recursive: true});
    });
    const sourceDirectory = path.join(directory, 'products', moduleId, 'src');
    fs.mkdirSync(sourceDirectory, {recursive: true});
    for (const relative of ['metadata.json', 'src/index.ts']) {
        fs.copyFileSync(path.join(repository, 'products', moduleId, relative), path.join(directory, 'products', moduleId, relative));
    }
    fs.writeFileSync(path.join(directory, 'library.config.json'), JSON.stringify({profile: 'wonderlab'}));
    const specification = path.join(directory, 'spec.json');
    fs.writeFileSync(specification, JSON.stringify({text: {'zh-cn': '演示', en: 'Demo', 'zh-tw': '示範', ko: '데모'},
        arguments: {}, python: {template: 'print(1)'}}));
    const args = ['--spec', specification, '--type', 'command', '--dry-run'];
    const plan = planAuthoringCommand(directory, ['generate', 'block', moduleId, 'demo_print', ...args], typescript);
    assert.equal(plan.dryRun, true);
    assert.equal(plan.changes[0].file, `products/${moduleId}/src/index.ts`);
    assert.match(plan.changes[0].after, /demo_print/);
    assert.throws(() => planAuthoringCommand(directory, ['generate', 'block', moduleId, 'start_thread', ...args], typescript), /重复|已存在/);
    assert.throws(() => planAuthoringCommand(directory, ['new', 'module', 'another-board', '--category', 'controllers',
        '--spec', specification, '--dry-run'], typescript), /module 需要/);
});
