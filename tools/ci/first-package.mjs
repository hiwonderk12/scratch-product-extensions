import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import {spawnSync} from 'node:child_process';
import {fileURLToPath} from 'node:url';
import {createRequire} from 'node:module';

// 在独立副本执行公开入门教程；只使用公开库自身依赖，不借用软件宿主。
const repository = fileURLToPath(new URL('../../', import.meta.url));
const [flag, output, ...extra] = process.argv.slice(2);
if (flag !== '--output' || !output || extra.length || !path.isAbsolute(output)) {
    throw new Error('Usage: node tools/ci/first-package.mjs --output ABSOLUTE_NEW_DIRECTORY');
}
if (fs.existsSync(output)) throw new Error('Tutorial output must not already exist');
const require = createRequire(path.join(repository, 'package.json'));
for (const dependency of ['typescript', 'jszip']) {
    const resolved = fs.realpathSync(require.resolve(dependency));
    if (!resolved.startsWith(fs.realpathSync(path.join(repository, 'node_modules')) + path.sep)) {
        throw new Error(`Public library must install its own dependency: ${dependency}`);
    }
}
const workspace = fs.mkdtempSync(path.join(os.tmpdir(), 'wonderlab-public-tutorial-'));
const run = (...args) => {
    const result = spawnSync(process.execPath, args, {cwd: workspace, stdio: 'inherit'});
    if (result.error) throw result.error;
    if (result.status !== 0) throw new Error(`Tutorial command failed: ${args.join(' ')}`);
};
try {
    fs.cpSync(repository, workspace, {recursive: true, filter: source => {
        const relative = path.relative(repository, source);
        return !relative || !['.git', 'node_modules', 'dist'].includes(relative.split(path.sep)[0]);
    }});
    fs.symlinkSync(path.join(repository, 'node_modules'), path.join(workspace, 'node_modules'),
        process.platform === 'win32' ? 'junction' : 'dir');
    const cli = 'tools/cli/index.mjs';
    const create = ['new', 'module', 'hello-text', '--category', 'output', '--spec', 'docs/examples/first-package.json'];
    run(cli, ...create, '--dry-run');
    run(cli, ...create);
    const entry = path.join(workspace, 'products/output/hello-text/src/index.ts');
    const source = fs.readFileSync(entry, 'utf8');
    if (!source.includes('defaultValue: "Hello"')) throw new Error('Tutorial default text has changed');
    fs.writeFileSync(entry, source.replace('defaultValue: "Hello"', 'defaultValue: "你好，课程"'));
    run(cli, 'check', 'output/hello-text');
    run('--test', 'products/output/hello-text/test/smoke.mjs');
    const support = ['support', 'add', 'aimech', 'output/hello-text', '--spec', 'docs/examples/text-support.json'];
    run(cli, ...support, '--dry-run');
    run(cli, ...support);
    run(cli, 'check', '--write-indexes');
    run(cli, 'check');
    const pack = ['pack-set', 'aimech', 'output/hello-text', '--output', 'dist/hello-text-demo'];
    run(cli, ...pack, '--dry-run');
    run(cli, ...pack);
    fs.cpSync(path.join(workspace, 'dist/hello-text-demo'), output, {recursive: true, errorOnExist: true, force: false});
    console.log(`Tutorial package set: ${output}`);
} finally {
    fs.rmSync(workspace, {recursive: true, force: true});
}
