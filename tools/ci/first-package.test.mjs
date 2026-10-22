import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import {spawnSync} from 'node:child_process';
import {fileURLToPath} from 'node:url';
import test from 'node:test';

const script = fileURLToPath(new URL('./first-package.mjs', import.meta.url));
for (const args of [[], ['--output', 'relative-directory']]) {
    test(`tutorial rejects invalid output arguments ${JSON.stringify(args)}`, () => {
        const result = spawnSync(process.execPath, [script, ...args], {encoding: 'utf8'});
        assert.equal(result.status, 1);
        assert.match(result.stderr, /ABSOLUTE_NEW_DIRECTORY/);
    });
}
test('tutorial refuses an existing directory without overwriting its contents', context => {
    const directory = fs.mkdtempSync(path.join(os.tmpdir(), 'tutorial-output-test-'));
    context.after(() => fs.rmSync(directory, {recursive: true, force: true}));
    fs.writeFileSync(path.join(directory, 'keep.txt'), 'keep');
    const result = spawnSync(process.execPath, [script, '--output', directory], {encoding: 'utf8'});
    assert.equal(result.status, 1);
    assert.match(result.stderr, /must not already exist/);
    assert.equal(fs.readFileSync(path.join(directory, 'keep.txt'), 'utf8'), 'keep');
});
