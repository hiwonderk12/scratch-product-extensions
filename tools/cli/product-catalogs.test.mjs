import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import test from 'node:test';
import {execFileSync} from 'node:child_process';
import {fileURLToPath} from 'node:url';
import {writeNativeProductCatalogs} from './product-catalogs.mjs';
import {createNativeRootCatalog} from './native-releases.mjs';

const repository = fileURLToPath(new URL('../../', import.meta.url));
const fixture = context => {
    const directory = fs.mkdtempSync(path.join(os.tmpdir(), 'native-product-catalogs-'));
    context.after(() => {
        assert.equal(path.dirname(fs.realpathSync(directory)), fs.realpathSync(os.tmpdir()));
        assert.ok(path.basename(directory).startsWith('native-product-catalogs-'));
        assert.equal(fs.lstatSync(directory).isSymbolicLink(), false);
        fs.rmSync(directory, {recursive: true, force: true});
    });
    return directory;
};

const writeFlatFixture = directory => {
    const filename = path.join(directory, 'flat.json');
    fs.writeFileSync(filename, JSON.stringify(createNativeRootCatalog({profile: 'wonderlab',
        productsDirectory: path.join(repository, 'products'), status: 'published', layout: 'flat'})));
    return filename;
};

test('split preview preserves every real published identity and URL without needing dist or historical ZIPs', context => {
    const directory = fixture(context);
    const outputDirectory = path.join(directory, 'preview');
    const source = writeFlatFixture(directory);
    const original = fs.readFileSync(source, 'utf8');
    const input = JSON.parse(original);
    const result = writeNativeProductCatalogs({catalogFile: source, productsDirectory: path.join(repository, 'products'),
        outputDirectory, profile: 'wonderlab'});
    assert.equal(result.formatVersion, 3);
    assert.equal(result.products.length, new Set(input.packages.map(item => item.moduleId)).size);
    assert.equal('packages' in result, false);
    const restored = result.products.flatMap(product => {
        assert.equal(product.catalog, `products/${product.moduleId}/catalog.json`);
        const child = JSON.parse(fs.readFileSync(path.join(outputDirectory, product.catalog), 'utf8'));
        assert.equal(child.moduleId, product.moduleId);
        assert.equal(child.formatVersion, 2);
        assert.deepEqual(child, JSON.parse(fs.readFileSync(path.join(repository, product.catalog), 'utf8')));
        return child.packages.map(({tag, notes, ...item}) => item);
    });
    const sorted = items => [...items].sort((left, right) =>
        `${left.moduleId}@${left.version}`.localeCompare(`${right.moduleId}@${right.version}`));
    assert.deepEqual(sorted(restored), sorted(input.packages));
    assert.equal(fs.readFileSync(source, 'utf8'), original);
    assert.throws(() => writeNativeProductCatalogs({catalogFile: source, productsDirectory: path.join(repository, 'products'),
        outputDirectory, profile: 'wonderlab'}), /已存在/);
});

test('multiple historical releases stay in one product catalog, with current source irrelevant', context => {
    const directory = fixture(context);
    const productsDirectory = path.join(directory, 'products');
    const product = path.join(productsDirectory, 'input/light-sensor');
    fs.mkdirSync(product, {recursive: true});
    fs.writeFileSync(path.join(product, 'metadata.json'), JSON.stringify({id: 'light-sensor', version: '9.0.0'}));
    const releases = ['0.1.0', '0.2.0'].map(version => ({version, tag: `history-${version}`,
        asset: `light-${version}.zip`, status: 'published'}));
    const packages = releases.map(release => ({moduleId: 'input/light-sensor', version: release.version,
        libraryVersion: '0.1.11', status: release.status, asset: release.asset,
        downloadUrl: `https://github.com/hiwonderk12/scratch-product-extensions/releases/download/${release.tag}/${release.asset}`}));
    const history = {formatVersion: 2, profile: 'wonderlab', status: 'published', moduleId: 'input/light-sensor',
        packages: packages.map((item, index) => ({...item, tag: releases[index].tag}))};
    fs.writeFileSync(path.join(product, 'catalog.json'), JSON.stringify(history));
    const catalogFile = path.join(directory, 'input.json');
    fs.writeFileSync(catalogFile, JSON.stringify({formatVersion: 2, profile: 'wonderlab', status: 'published', packages}));
    const outputDirectory = path.join(directory, 'preview');
    const result = writeNativeProductCatalogs({catalogFile, productsDirectory, outputDirectory, profile: 'wonderlab'});
    assert.equal(result.products.length, 1);
    assert.deepEqual(JSON.parse(fs.readFileSync(path.join(outputDirectory, result.products[0].catalog))), history);
});

test('invalid baseline fails before creating outputs rather than silently rewriting history', context => {
    const directory = fixture(context);
    const input = JSON.parse(fs.readFileSync(writeFlatFixture(directory), 'utf8'));
    input.packages[0].downloadUrl = 'https://other.invalid/changed.zip';
    const catalogFile = path.join(directory, 'bad.json');
    fs.writeFileSync(catalogFile, JSON.stringify(input));
    const outputDirectory = path.join(directory, 'preview');
    assert.throws(() => writeNativeProductCatalogs({catalogFile, productsDirectory: path.join(repository, 'products'),
        outputDirectory, profile: 'wonderlab'}), /不一致/);
    assert.equal(fs.existsSync(outputDirectory), false);
});

test('CLI exposes split as a preview-only operation and rejects mixed generation modes', context => {
    const directory = fixture(context);
    const outputDirectory = path.join(directory, 'preview');
    const cli = path.join(repository, 'tools/cli/index.mjs');
    const source = writeFlatFixture(directory);
    const output = execFileSync(process.execPath, [cli, 'catalog', '--split', source, '--output-dir', outputDirectory],
        {cwd: repository, encoding: 'utf8'});
    assert.match(output, /分层目录预览/);
    assert.equal(JSON.parse(fs.readFileSync(path.join(outputDirectory, 'catalog.json'))).formatVersion, 3);
    assert.throws(() => execFileSync(process.execPath, [cli, 'catalog', '--split', source,
        '--output-dir', path.join(directory, 'mixed'), '--status', 'published'], {cwd: repository, stdio: 'pipe'}));
    assert.equal(fs.existsSync(path.join(directory, 'mixed')), false);
});
