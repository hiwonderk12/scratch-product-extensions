import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import test from 'node:test';
import {execFileSync} from 'node:child_process';
import {fileURLToPath} from 'node:url';
import JSZip from 'jszip';
import {validateNativeReleaseCatalog, writeNativeReleaseCatalog} from './native-releases.mjs';

const fixture = async context => {
    const root = fs.mkdtempSync(path.join(os.tmpdir(), 'native-releases-'));
    context.after(() => {
        assert.equal(path.dirname(root), path.resolve(os.tmpdir()));
        assert.ok(path.basename(root).startsWith('native-releases-'));
        fs.rmSync(root, {recursive: true, force: true});
    });
    const product = path.join(root, 'products/input/light-sensor');
    const inputDirectory = path.join(root, 'archives');
    fs.mkdirSync(product, {recursive: true});
    fs.mkdirSync(inputDirectory);
    fs.writeFileSync(path.join(product, 'metadata.json'), JSON.stringify({id: 'light-sensor', version: '9.0.0'}));
    const releases = [];
    for (const version of ['0.1.0', '0.1.1']) {
        const tag = 'demo-' + version;
        const asset = 'light-' + version + '.zip';
        const zip = new JSZip();
        zip.file('extension.json', JSON.stringify({format: 'hiwonder-native-extension', formatVersion: 1,
            apiVersion: 1, mode: 'python', profile: 'wonderlab', moduleId: 'input/light-sensor',
            id: 'light-sensor', namespace: 'sensor', name: {'zh-cn': '光敏'}, version,
            libraryVersion: '0.1.11', entry: 'index.cjs', library: 'library.json'}));
        zip.file('index.cjs', 'module.exports = class {};');
        zip.file('library.json', JSON.stringify({formatVersion: 1, profile: 'wonderlab',
            version: '0.1.11', products: {}, ports: {}}));
        fs.mkdirSync(path.join(inputDirectory, tag));
        fs.writeFileSync(path.join(inputDirectory, tag, asset), await zip.generateAsync({type: 'nodebuffer'}));
        releases.push({version, tag, asset, status: 'candidate', notes: '演示，尚未上传'});
    }
    const releaseFile = path.join(product, 'release.json');
    const writeReleases = entries => fs.writeFileSync(releaseFile, JSON.stringify({releases: entries}));
    writeReleases(releases);
    return {root, releases, writeReleases, options: {productsDirectory: path.join(root, 'products'),
        inputDirectory, outputFile: path.join(root, 'catalog.json'), profile: 'wonderlab', status: 'candidate'}};
};

test('source checks accept a published catalog only when every entry matches release history', async context => {
    const {options, releases, writeReleases} = await fixture(context);
    writeReleases(releases.map(release => ({...release, status: 'published'})));
    options.status = 'published';
    const catalog = await writeNativeReleaseCatalog(options, JSZip);
    assert.equal(validateNativeReleaseCatalog(catalog, options), catalog);
    const changed = structuredClone(catalog);
    changed.packages[0].downloadUrl = changed.packages[0].downloadUrl.replace('hiwonderk12', 'other-owner');
    assert.throws(() => validateNativeReleaseCatalog(changed, options), /发行历史/);
    writeReleases(releases);
    assert.throws(() => validateNativeReleaseCatalog(catalog, options), /发行历史/);
});

test('source checks preserve empty development catalogs but reject missing history and duplicate identities', async context => {
    const {options} = await fixture(context);
    const catalog = await writeNativeReleaseCatalog(options, JSZip);
    assert.equal(validateNativeReleaseCatalog(catalog, options), catalog);
    const empty = {formatVersion: 2, profile: 'wonderlab', status: 'development', packages: []};
    assert.equal(validateNativeReleaseCatalog(empty, options), empty);
    assert.throws(() => validateNativeReleaseCatalog({...empty, packages: catalog.packages}, options), /development/);
    assert.throws(() => validateNativeReleaseCatalog({...catalog,
        packages: [...catalog.packages, catalog.packages[0]]}, options), /重复/);
    fs.unlinkSync(path.join(options.productsDirectory, 'input/light-sensor/release.json'));
    assert.throws(() => validateNativeReleaseCatalog(catalog, options), /release.json/);
});

test('release histories validate real archives and use only the target GitHub repository', async context => {
    const {options} = await fixture(context);
    const catalog = await writeNativeReleaseCatalog(options, JSZip);
    assert.equal(catalog.packages.length, 2);
    assert.equal(catalog.packages[0].version, '0.1.0');
    assert.equal(catalog.packages[0].libraryVersion, '0.1.11');
    assert.equal(catalog.packages[0].downloadUrl,
        'https://github.com/hiwonderk12/scratch-product-extensions/releases/download/demo-0.1.0/light-0.1.0.zip');
    await assert.rejects(writeNativeReleaseCatalog(options, JSZip), /EEXIST/);
});

test('missing archives, wrong identities, duplicate versions and unsafe tags fail before writing', async context => {
    const {options, releases, writeReleases} = await fixture(context);
    for (const entries of [[{...releases[0], asset: 'missing.zip'}], [{...releases[0], version: '0.9.0'}],
        [releases[0], releases[0]], [{...releases[0], tag: '../outside'}],
        [{...releases[0], status: 'draft'}]]) {
        writeReleases(entries);
        await assert.rejects(writeNativeReleaseCatalog(options, JSZip));
        assert.equal(fs.existsSync(options.outputFile), false);
    }
});

test('published output requires explicitly published history and never promotes candidates', async context => {
    const {options, releases, writeReleases} = await fixture(context);
    await assert.rejects(writeNativeReleaseCatalog({...options, status: 'published'}, JSZip), /至少/);
    writeReleases([{...releases[0], status: 'published'}, releases[1]]);
    const catalog = await writeNativeReleaseCatalog({...options, status: 'published'}, JSZip);
    assert.equal(catalog.packages.length, 1);
    assert.equal(catalog.status, 'published');
    assert.equal(catalog.packages[0].status, 'published');
});

test('CLI builds a new release index without changing the source history', async context => {
    const {root, options, releases} = await fixture(context);
    const cli = fileURLToPath(new URL('./index.mjs', import.meta.url));
    execFileSync(process.execPath, [cli, 'catalog', '--releases', options.productsDirectory,
        '--input', options.inputDirectory, '--output', options.outputFile, '--status', 'candidate']);
    assert.equal(JSON.parse(fs.readFileSync(options.outputFile)).packages.length, 2);
    assert.deepEqual(JSON.parse(fs.readFileSync(path.join(root, 'products/input/light-sensor/release.json'))).releases, releases);
});
