import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import test from 'node:test';
import JSZip from 'jszip';
import {execFileSync} from 'node:child_process';
import {fileURLToPath} from 'node:url';
import {readNativeProductCatalogs, createNativeRootCatalog, validateNativeReleaseCatalog} from './native-releases.mjs';
import {writeNativeReleaseAddition} from './release-add.mjs';

const repository = fileURLToPath(new URL('../../', import.meta.url));
const moduleId = 'input/light-sensor';
const fixture = context => {
    const directory = fs.mkdtempSync(path.join(os.tmpdir(), 'native-product-history-'));
    context.after(() => {
        assert.equal(path.dirname(fs.realpathSync(directory)), fs.realpathSync(os.tmpdir()));
        assert.ok(path.basename(directory).startsWith('native-product-history-'));
        assert.equal(fs.lstatSync(directory).isSymbolicLink(), false);
        fs.rmSync(directory, {recursive: true, force: true});
    });
    const productsDirectory = path.join(directory, 'products');
    const product = path.join(productsDirectory, moduleId);
    fs.mkdirSync(product, {recursive: true});
    fs.writeFileSync(path.join(product, 'metadata.json'), JSON.stringify({id: 'light-sensor', version: '9.0.0',
        format: 'hiwonder-native-extension'}));
    const previous = {moduleId, version: '0.1.0', libraryVersion: '0.1.11', tag: 'history-v1',
        asset: 'light-0.1.0.zip', status: 'published', notes: '保留旧记录',
        downloadUrl: 'https://github.com/hiwonderk12/scratch-product-extensions/releases/download/history-v1/light-0.1.0.zip'};
    const child = {formatVersion: 2, profile: 'wonderlab', moduleId, status: 'published', packages: [previous]};
    const filename = path.join(product, 'catalog.json');
    const write = value => fs.writeFileSync(filename, JSON.stringify(value, null, 2) + '\n');
    write(child);
    const options = {productsDirectory, profile: 'wonderlab'};
    return {directory, filename, child, previous, write, options};
};
const archive = async (directory, version, {libraryVersion = '0.1.11', conflict = false} = {}) => {
    const zip = new JSZip();
    zip.file('extension.json', JSON.stringify({format: 'hiwonder-native-extension', formatVersion: 1, apiVersion: 1,
        mode: 'python', profile: 'wonderlab', moduleId, id: 'light-sensor', namespace: 'sensor', name: {'zh-cn': '光敏'},
        version, libraryVersion, entry: 'index.cjs', library: 'library.json'}));
    zip.file('index.cjs', 'module.exports = class {};');
    zip.file('library.json', JSON.stringify({formatVersion: 1, profile: 'wonderlab', version: libraryVersion,
        products: {aimech: {driver: conflict ? 'changed' : 'original'}}, ports: {}}));
    const filename = path.join(directory, `light-${version}.zip`);
    fs.writeFileSync(filename, await zip.generateAsync({type: 'nodebuffer'}));
    return filename;
};

test('real products expose the initial published baseline through one hierarchical catalog source', () => {
    const options = {profile: 'wonderlab', productsDirectory: path.join(repository, 'products')};
    const histories = readNativeProductCatalogs(options);
    assert.equal(histories.length, 41);
    const root = JSON.parse(fs.readFileSync(path.join(repository, 'catalog.json')));
    assert.deepEqual(createNativeRootCatalog({...options, status: 'published'}), root);
    assert.equal(root.formatVersion, 3);
    for (const history of histories) {
        assert.equal(history.packages.length, 1);
        assert.equal(history.packages[0].version, '0.0.1');
        assert.equal(history.packages[0].libraryVersion, '0.0.1');
        assert.equal(history.packages[0].tag, 'wonderlab-library-v0.0.1');
    }
    const flat = createNativeRootCatalog({...options, status: 'published', layout: 'flat'});
    assert.equal(flat.packages.length, 41);
    assert.equal(validateNativeReleaseCatalog(flat, options), flat);
    assert.equal(validateNativeReleaseCatalog(root, options), root);
    const index = createNativeRootCatalog({...options, status: 'published'});
    assert.equal(index.formatVersion, 3);
    assert.equal(index.products.length, 41);
    assert.equal(validateNativeReleaseCatalog(index, options), index);
});

test('root checks reject missing products, historical entries, duplicate refs and changed identities', context => {
    const {options} = fixture(context);
    const flat = createNativeRootCatalog({...options, status: 'published', layout: 'flat'});
    const root = createNativeRootCatalog({...options, status: 'published'});
    for (const value of [{...flat, packages: []}, {...flat, packages: [{...flat.packages[0], libraryVersion: '0.0.1'}]},
        {...root, products: []}, {...root, products: [...root.products, root.products[0]]},
        {...root, products: [null]},
        {...root, products: [{...root.products[0], catalog: 'https://other.invalid/catalog.json'}]}]) {
        assert.throws(() => validateNativeReleaseCatalog(value, options));
    }
});

test('source checks reject legacy duplicate authority and incorrect product catalog identities', context => {
    const {filename, child, write, options} = fixture(context);
    const legacy = path.join(path.dirname(filename), 'release.json');
    fs.writeFileSync(legacy, '{"releases":[]}');
    assert.throws(() => readNativeProductCatalogs(options), /release.json/);
    fs.unlinkSync(legacy);
    for (const value of [{...child, profile: 'wondercode'}, {...child, moduleId: 'input/other'},
        {...child, packages: [...child.packages, child.packages[0]]},
        {...child, packages: [...child.packages, {...child.packages[0], version: '0.2.0'}]},
        {...child, packages: [{...child.packages[0], tag: '../escape'}]},
        {...child, packages: [{...child.packages[0], moduleId: 'input/other'}]}]) {
        write(value);
        assert.throws(() => readNativeProductCatalogs(options));
    }
});

test('append requires a trusted reference ZIP for an already registered snapshot, then preserves old records', async context => {
    const {directory, filename, child, options} = fixture(context);
    const original = fs.readFileSync(filename, 'utf8');
    const archiveFile = await archive(directory, '0.2.0');
    const outputFile = path.join(directory, 'proposal.json');
    const addition = {...options, archiveFile, tag: 'history-v2', outputFile};
    await assert.rejects(writeNativeReleaseAddition(addition, JSZip), /参考ZIP/);
    assert.equal(fs.existsSync(outputFile), false);
    const baselineArchiveFile = await archive(directory, '0.1.0');
    const result = await writeNativeReleaseAddition({...addition, baselineArchiveFile}, JSZip);
    assert.deepEqual(result.packages[0], child.packages[0]);
    assert.equal(result.packages[1].version, '0.2.0');
    assert.equal(result.packages[1].libraryVersion, '0.1.11');
    assert.equal(result.packages[1].status, 'candidate');
    assert.equal(result.status, 'candidate');
    assert.equal(fs.readFileSync(filename, 'utf8'), original);
    await assert.rejects(writeNativeReleaseAddition({...addition, baselineArchiveFile}, JSZip), /EEXIST/);
});

test('append refuses duplicate versions, unknown references and same-version snapshot conflicts', async context => {
    const {directory, options} = fixture(context);
    const baselineArchiveFile = await archive(directory, '0.1.0');
    const addition = {...options, baselineArchiveFile, tag: 'history-v2', outputFile: path.join(directory, 'proposal.json')};
    await assert.rejects(writeNativeReleaseAddition({...addition, archiveFile: baselineArchiveFile}, JSZip), /已存在/);
    const archiveFile = await archive(directory, '0.2.0', {conflict: true});
    await assert.rejects(writeNativeReleaseAddition({...addition, archiveFile}, JSZip), /完整快照不同/);
    const unknown = await archive(directory, '0.0.1');
    await assert.rejects(writeNativeReleaseAddition({...addition, archiveFile, baselineArchiveFile: unknown}, JSZip), /参考ZIP/);
    assert.equal(fs.existsSync(addition.outputFile), false);
});

test('a genuinely new snapshot version needs no historical archive and never promotes older candidates', async context => {
    const {directory, child, write, options} = fixture(context);
    write({...child, status: 'candidate', packages: child.packages.map(item => ({...item, status: 'candidate'}))});
    const archiveFile = await archive(directory, '0.2.0', {libraryVersion: '0.2.0'});
    const result = await writeNativeReleaseAddition({...options, archiveFile, tag: 'history-v2',
        status: 'published', outputFile: path.join(directory, 'proposal.json')}, JSZip);
    assert.equal(result.packages[0].status, 'candidate');
    assert.equal(result.packages[1].status, 'published');
    assert.equal(result.status, 'candidate');
    assert.throws(() => createNativeRootCatalog({...options, status: 'published'}), /至少/);
});

test('CLI root generation uses product catalogs without any local archives and rejects mixed modes', context => {
    const directory = fixture(context).directory;
    const cli = path.join(repository, 'tools/cli/index.mjs');
    const outputFile = path.join(directory, 'root.json');
    const output = execFileSync(process.execPath, [cli, 'catalog', '--products', path.join(repository, 'products'),
        '--status', 'published', '--output', outputFile], {cwd: repository, encoding: 'utf8'});
    assert.match(output, /未复验历史ZIP/);
    assert.equal(JSON.parse(fs.readFileSync(outputFile)).products.length, 41);
    assert.throws(() => execFileSync(process.execPath, [cli, 'catalog', '--products', path.join(repository, 'products'),
        '--input', directory, '--output', path.join(directory, 'bad.json')], {cwd: repository, stdio: 'pipe'}));
    assert.equal(fs.existsSync(path.join(directory, 'bad.json')), false);
});

test('new-file proposals reject linked archive and output parents without touching their targets', async context => {
    const {directory, options} = fixture(context);
    const archiveFile = await archive(directory, '0.2.0', {libraryVersion: '0.2.0'});
    const linked = path.join(directory, 'linked');
    fs.symlinkSync(directory, linked, process.platform === 'win32' ? 'junction' : 'dir');
    try {
        const addition = {...options, archiveFile, tag: 'history-v2', outputFile: path.join(linked, 'proposal.json')};
        await assert.rejects(writeNativeReleaseAddition(addition, JSZip), /联接|符号链接/);
        await assert.rejects(writeNativeReleaseAddition({...addition, archiveFile: path.join(linked, path.basename(archiveFile)),
            outputFile: path.join(directory, 'proposal.json')}, JSZip), /联接|符号链接/);
        assert.equal(fs.existsSync(path.join(directory, 'proposal.json')), false);
    } finally {
        fs.unlinkSync(linked);
    }
});

test('CLI release add validates the new ZIP without changing the registered product source', async context => {
    const {directory} = fixture(context);
    const cli = path.join(repository, 'tools/cli/index.mjs');
    const source = path.join(repository, 'products/input/light-sensor/catalog.json');
    const original = fs.readFileSync(source, 'utf8');
    const archiveFile = await archive(directory, '0.2.0', {libraryVersion: '0.2.0'});
    const outputFile = path.join(directory, 'proposal.json');
    const output = execFileSync(process.execPath, [cli, 'release', 'add', '--archive', archiveFile,
        '--tag', 'history-v2', '--output', outputFile], {cwd: repository, encoding: 'utf8'});
    assert.match(output, /原历史未改、未上传或发布/);
    const proposal = JSON.parse(fs.readFileSync(outputFile));
    assert.deepEqual(proposal.packages.slice(0, -1), JSON.parse(original).packages);
    assert.equal(proposal.packages.at(-1).version, '0.2.0');
    assert.equal(proposal.status, 'candidate');
    assert.equal(fs.readFileSync(source, 'utf8'), original);
    assert.throws(() => execFileSync(process.execPath, [cli, 'release', 'add', '--archive', archiveFile,
        '--tag', 'history-v2', '--output', outputFile, '--input', directory], {cwd: repository, stdio: 'pipe'}));
});

test('a new identity cannot reuse a registered tag and asset location', async context => {
    const {directory, options, previous} = fixture(context);
    const next = await archive(directory, '0.2.0', {libraryVersion: '0.2.0'});
    const archiveFile = path.join(directory, previous.asset);
    fs.copyFileSync(next, archiveFile);
    const outputFile = path.join(directory, 'proposal.json');
    await assert.rejects(writeNativeReleaseAddition({...options, archiveFile, tag: previous.tag, outputFile}, JSZip), /资源地址/);
    assert.equal(fs.existsSync(outputFile), false);
});
