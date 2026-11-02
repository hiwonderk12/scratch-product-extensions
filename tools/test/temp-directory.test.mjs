// 验证测试抛错后也清理本轮副本，并保留同目录的其他文件。
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import {spawnSync} from 'node:child_process';
import test from 'node:test';

const helperUrl = new URL('./temp-directory.mjs', import.meta.url).href;
for (const fail of [false, true]) {
    test(`temporary copy is removed after ${fail ? 'failure' : 'success'}`, context => {
        const base = fs.mkdtempSync(path.join(os.tmpdir(), 'native-cleanup-check-'));
        context.after(() => {
            assert.equal(path.dirname(fs.realpathSync(base)), fs.realpathSync(os.tmpdir()));
            assert.ok(path.basename(base).startsWith('native-cleanup-check-'));
            fs.rmSync(base, {recursive: true, force: true});
        });
        const sentinel = path.join(base, 'keep.txt');
        fs.writeFileSync(sentinel, 'untouched');
        const marker = path.join(base, 'created.txt');
        const fixture = path.join(base, 'cleanup.test.mjs');
        fs.writeFileSync(fixture, `
import fs from 'node:fs';
import test from 'node:test';
import {createTemporaryDirectory} from ${JSON.stringify(helperUrl)};
test('cleanup fixture', context => {
    const directory = createTemporaryDirectory(context, ${JSON.stringify(base)}, 'current-run-');
    fs.writeFileSync(${JSON.stringify(marker)}, directory);
    fs.writeFileSync(directory + '/output.txt', 'test output');
    ${fail ? "throw new Error('injected test failure');" : ''}
});
`);
        // 子进程是独立测试运行，不能继承父测试器的递归运行标志。
        const env = {...process.env};
        delete env.NODE_TEST_CONTEXT;
        const result = spawnSync(process.execPath, ['--test', fixture], {
            encoding: 'utf8', windowsHide: true, env
        });
        assert.equal(result.status, fail ? 1 : 0, result.stdout + result.stderr);
        if (fail) assert.match(result.stdout + result.stderr, /injected test failure/);
        assert.equal(fs.existsSync(fs.readFileSync(marker, 'utf8')), false);
        assert.equal(fs.readFileSync(sentinel, 'utf8'), 'untouched');
    });
}
