import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import test from 'node:test';
import vm from 'node:vm';
import {spawnSync} from 'node:child_process';
import ts from 'typescript';
import JSZip from 'jszip';
import * as packaging from './native-package.mjs';

const root = fileURLToPath(new URL('../../', import.meta.url));

test('作者目录直接编译单包，不读取全库支持配置或生成配套主控', async () => {
    assert.equal(typeof packaging.collectStandaloneExtension, 'function');
    for (const example of ['minimal-text', 'handwritten-text']) {
        const directory = path.join(root, 'docs/examples', example);
        const collected = packaging.collectStandaloneExtension(directory, ts);
        const zip = await JSZip.loadAsync(await packaging.createNativeArchive(collected, JSZip));
        const info = JSON.parse(await zip.file('metadata.json').async('string'));
        assert.equal(info.installation, 'standalone');
        assert.equal(info.profile, 'wonderlab');
        assert.equal(info.moduleId, 'output/hello-text');
        assert.equal(zip.file('library.json'), null);
        assert.equal(zip.file('extension.json'), null);
        assert.match(await zip.file(info.entry).async('string'), /class /);
        assert.equal((await zip.file(info.entry).async('string')).includes('\r\n'), false);
        assert.ok(zip.file('src/index.ts'));
        assert.ok(fs.existsSync(path.join(directory, 'metadata.json')));
        const compiled = {exports: {}};
        vm.runInNewContext(collected.files[info.entry], {exports: compiled.exports, module: compiled});
        let locale = 'zh-cn';
        const instance = new compiled.exports.default({
            variant: info.support.default.variant,
            t: key => compiled.exports.messages[locale][key],
            asset: filename => collected.files[filename].toString(),
            python: filename => collected.files[filename].toString().trimEnd()
        });
        const python = JSON.stringify(instance.getPython());
        const names = [];
        for (locale of ['zh-cn', 'en', 'zh-tw', 'ko']) {
            const info = instance.getInfo();
            assert.ok(info.blocks.some(block => block.opcode === 'show_text'));
            assert.equal(JSON.stringify(instance.getPython()), python);
            names.push(info.blocks.find(block => block.opcode === 'show_text').text);
        }
        assert.equal(new Set(names).size, 4);
    }
});

test('目录 CLI 可重复打包同一个 ZIP，不要求维护发行版本或配套配置', async () => {
    const directory = fs.mkdtempSync(path.join(root, 'dist', 'standalone-cli-'));
    const filename = path.join(directory, 'hello.zip');
    const run = command => {
        const result = spawnSync(process.execPath, ['tools/cli/index.mjs', command,
            './docs/examples/handwritten-text', ...(command === 'pack' ? ['--output', filename] : [])],
        {cwd: root, encoding: 'utf8', windowsHide: true});
        assert.equal(result.status, 0, result.stdout + result.stderr);
    };
    run('check');
    run('pack');
    fs.writeFileSync(filename, 'previous build');
    run('pack');
    const zip = await JSZip.loadAsync(fs.readFileSync(filename));
    assert.ok(zip.file('metadata.json'));
    assert.equal(zip.file('library.json'), null);
});
