import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import test from 'node:test';
import {execFileSync} from 'node:child_process';
import {fileURLToPath} from 'node:url';
import JSZip from 'jszip';
import {createNativeCandidateCatalog, writeNativeCandidateCatalog} from './native-catalog.mjs';

const descriptor = {format: 'hiwonder-native-extension', formatVersion: 1, apiVersion: 1, mode: 'python',
    profile: 'wonderlab', namespace: 'sensor', id: 'light-sensor', moduleId: 'input/light-sensor', version: '0.1.0',
    libraryVersion: '0.1.11', entry: 'index.cjs', library: 'library.json', name: {'zh-cn': '光敏'}};
const options = {profile: 'wonderlab', baseUrl: 'https://example.test/native/'};
const archive = async (overrides = {}, libraryChanges = {}) => {
    const zip = new JSZip();
    zip.file('extension.json', JSON.stringify({...descriptor, ...overrides}));
    zip.file('library.json', JSON.stringify({formatVersion: 1, profile: 'wonderlab', version: '0.1.11',
        products: {}, ports: {}, ...libraryChanges}));
    zip.file('index.cjs', 'module.exports = class { getInfo() { return {}; } };');
    return zip.generateAsync({type: 'uint8array'});
};

test('candidate catalog only carries identity, version and resource locations', async () => {
    const catalog = await createNativeCandidateCatalog([{relativePath: 'input/light/0.1.0/light.zip', data: await archive()}], options, JSZip);
    assert.equal(catalog.status, 'candidate');
    assert.deepEqual(Object.keys(catalog.packages[0]).sort(), ['asset', 'downloadUrl', 'libraryVersion', 'moduleId', 'status', 'version']);
    assert.equal(catalog.packages[0].downloadUrl, 'https://example.test/native/input/light/0.1.0/light.zip');
    assert.equal(JSON.stringify(catalog).includes('sha256'), false);
});
test('rejects duplicate package identities and conflicting snapshots', async () => {
    const first = {relativePath: 'a.zip', data: await archive()};
    await assert.rejects(createNativeCandidateCatalog([first, {...first, relativePath: 'b.zip'}], options, JSZip), /重复/);
    const second = {relativePath: 'b.zip', data: await archive({version: '0.2.0'}, {ports: {different: []}})};
    await assert.rejects(createNativeCandidateCatalog([first, second], options, JSZip), /快照不同/);
});
test('rejects old formats, other profiles, missing entry and unsafe resource paths', async () => {
    for (const overrides of [{formatVersion: 9}, {profile: 'wondercode'}, {entry: 'missing.cjs'}, {version: 'latest'}, {namespace: 'bad_namespace'}, {icon: 'missing.png'}]) {
        await assert.rejects(createNativeCandidateCatalog([{relativePath: 'a.zip', data: await archive(overrides)}], options, JSZip));
    }
    for (const relativePath of ['../a.zip', '/a.zip', '.hidden.zip', 'dir\\a.zip']) {
        await assert.rejects(createNativeCandidateCatalog([{relativePath, data: await archive()}], options, JSZip));
    }
    await assert.rejects(createNativeCandidateCatalog([{relativePath: 'a.zip', data: await archive()}], {...options, baseUrl: 'http://example.test'}, JSZip), /HTTPS/);
    await assert.rejects(createNativeCandidateCatalog([], options, JSZip), /至少/);
});
test('CLI reads existing archives, writes a new candidate only and refuses overwrites', async context => {
    const temporary = fs.mkdtempSync(path.join(os.tmpdir(), 'native-catalog-'));
    context.after(() => {
        if (path.dirname(path.resolve(temporary)) !== path.resolve(os.tmpdir()) || !path.basename(temporary).startsWith('native-catalog-')) {
            throw new Error('拒绝清理临时目录以外路径');
        }
        fs.rmSync(temporary, {recursive: true, force: true});
    });
    const inputDirectory = path.join(temporary, 'resources');
    fs.mkdirSync(inputDirectory);
    fs.writeFileSync(path.join(inputDirectory, 'light.zip'), await archive());
    const outputFile = path.join(temporary, 'catalog.json');
    const cli = fileURLToPath(new URL('./index.mjs', import.meta.url));
    execFileSync(process.execPath, [...process.execArgv, cli, 'catalog', '--input', inputDirectory, '--base-url', options.baseUrl, '--output', outputFile]);
    const text = fs.readFileSync(outputFile, 'utf8');
    assert.equal(JSON.parse(text).packages.length, 1);
    await assert.rejects(writeNativeCandidateCatalog({inputDirectory, outputFile, ...options}, JSZip), /EEXIST/);
    assert.equal(fs.readFileSync(outputFile, 'utf8'), text);
});
