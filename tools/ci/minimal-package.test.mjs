import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import {createRequire} from 'node:module';
import {spawnSync} from 'node:child_process';
import {fileURLToPath} from 'node:url';
import test from 'node:test';
import JSZip from 'jszip';

const root = fileURLToPath(new URL('../../', import.meta.url));
const readJson = filename => JSON.parse(fs.readFileSync(filename, 'utf8'));
const tutorial = fs.readFileSync(path.join(root, 'docs/official-package-tutorial.md'), 'utf8');

// 教程中的原版本须匹配当前源码；示例版本按下一 patch 预发行规则选取，防止文字悄悄过期。
const versionRow = filename => {
    const row = tutorial.split(/\r?\n/).find(line => line.startsWith(`| ${filename} |`));
    assert.ok(row, `教程缺少版本行：${filename}`);
    const cells = row.split('|').slice(1, -1).map(cell => cell.trim());
    assert.equal(cells.length, 3);
    return {before: cells[1], after: cells[2]};
};
const nextDemo = version => {
    assert.match(version, /^\d+\.\d+\.\d+$/);
    const parts = version.split('.').map(Number);
    return `${parts[0]}.${parts[1]}.${parts[2] + 1}-demo.1`;
};

// 副本只写入公开库忽略目录，不联接共享依赖、不清理；链接来源直接拒绝。
const assertNoLinks = filename => {
    let current = path.resolve(filename);
    while (true) {
        if (fs.existsSync(current)) assert.equal(fs.lstatSync(current).isSymbolicLink(), false, current);
        const parent = path.dirname(current);
        if (parent === current) break;
        current = parent;
    }
};
const copySource = (source, destination) => {
    assertNoLinks(source);
    if (fs.lstatSync(source).isDirectory()) {
        fs.mkdirSync(destination, {recursive: true});
        for (const entry of fs.readdirSync(source)) copySource(path.join(source, entry), path.join(destination, entry));
    } else {
        fs.mkdirSync(path.dirname(destination), {recursive: true});
        fs.copyFileSync(source, destination, fs.constants.COPYFILE_EXCL);
    }
};

test('minimal tutorial versions and before/after support examples match the real baseline', () => {
    for (const filename of ['library.config.json', 'products/robots/aimech/metadata.json']) {
        const row = versionRow(filename);
        assert.equal(row.before, readJson(path.join(root, filename)).version, `${filename} 教程基线过期`);
        assert.equal(row.after, nextDemo(row.before));
    }
    const row = versionRow('products/output/hello-text/metadata.json');
    assert.equal(row.before, '新包');
    assert.equal(row.after, readJson(path.join(root, 'docs/examples/minimal-text/metadata.json')).version);
    const examples = [...tutorial.matchAll(/~~~json\r?\n([\s\S]*?)\r?\n~~~/g)].map(match => match[1]);
    assert.equal(examples.length, 2);
    const board = readJson(path.join(root, 'library/boards/aimech.json'));
    assert.deepEqual(JSON.parse(`{${examples[0]}}`), {modules: board.modules});
    assert.deepEqual(JSON.parse(examples[1]), {
        ...board,
        modules: {...board.modules, 'output/hello-text': {variant: 'text-demo', legacyNamespaces: ['textdemo'], portGroups: {}}}
    });
});

test('minimal handwritten package checks and builds companions using only public-library dependencies', async context => {
    assertNoLinks(path.join(root, 'dist'));
    fs.mkdirSync(path.join(root, 'dist'), {recursive: true});
    const directory = fs.mkdtempSync(path.join(root, 'dist', 'minimal-text-'));
    context.diagnostic(`保留最小教程副本及日志：${directory}`);
    for (const relative of ['tools', 'products', 'library', 'library.config.json', 'catalog.json']) {
        copySource(path.join(root, relative), path.join(directory, relative));
    }
    const example = path.join(root, 'docs/examples/minimal-text');
    assert.deepEqual(fs.readdirSync(example).sort(), ['metadata.json', 'src']);
    assert.deepEqual(fs.readdirSync(path.join(example, 'src')), ['index.ts']);
    copySource(example, path.join(directory, 'products/output/hello-text'));
    const requireFromFixture = createRequire(path.join(directory, 'tools/cli/index.mjs'));
    for (const dependency of ['typescript', 'jszip']) {
        const expected = fs.realpathSync(path.join(root, 'node_modules', dependency));
        assertNoLinks(expected);
        assert.ok(fs.realpathSync(requireFromFixture.resolve(dependency)).startsWith(expected + path.sep));
    }
    assert.equal(fs.existsSync(path.join(directory, 'node_modules')), false);
    const writeJson = (relative, value) => fs.writeFileSync(path.join(directory, relative), JSON.stringify(value, null, 2) + '\n');
    const board = JSON.parse([...tutorial.matchAll(/~~~json\r?\n([\s\S]*?)\r?\n~~~/g)][1][1]);
    writeJson('library/boards/aimech.json', board);
    for (const filename of ['library.config.json', 'products/robots/aimech/metadata.json']) {
        writeJson(filename, {...readJson(path.join(directory, filename)), version: versionRow(filename).after});
    }
    const steps = [];
    const run = args => {
        const env = {...process.env};
        delete env.NODE_PATH;
        const result = spawnSync(process.execPath, ['tools/cli/index.mjs', ...args], {
            cwd: directory, encoding: 'utf8', env, timeout: 120000, windowsHide: true
        });
        steps.push({args, status: result.status, stdout: result.stdout, stderr: result.stderr, error: result.error?.message});
        fs.writeFileSync(path.join(directory, 'minimal-steps.json'), JSON.stringify(steps, null, 2) + '\n');
        assert.equal(result.status, 0, `${args.join(' ')}\n${result.error || ''}\n${result.stdout}\n${result.stderr}`);
        return result.stdout;
    };
    assert.match(run(['--help']), /check/);
    assert.match(run(['check', 'output/hello-text']), /原生类编译检查通过：output\/hello-text/);
    run(['check', '--write-indexes']);
    assert.match(run(['check']), /检查通过/);
    run(['check', 'output/hello-text']);
    const pack = ['pack-set', 'aimech', 'output/hello-text', '--output', 'dist/hello-text-demo'];
    assert.match(run([...pack, '--dry-run']), /DRY-RUN：未写入文件/);
    assert.equal(fs.existsSync(path.join(directory, 'dist/hello-text-demo')), false);
    assert.match(run(pack), /配套操作完成/);
    const output = path.join(directory, 'dist/hello-text-demo');
    const manifest = readJson(path.join(output, 'package-set.json'));
    assert.equal(manifest.libraryVersion, versionRow('library.config.json').after);
    assert.deepEqual(manifest.packages, [
        {moduleId: 'robots/aimech', version: versionRow('products/robots/aimech/metadata.json').after,
            file: `aimech-${versionRow('products/robots/aimech/metadata.json').after}.zip`},
        {moduleId: 'output/hello-text', version: versionRow('products/output/hello-text/metadata.json').after,
            file: `hello-text-${versionRow('products/output/hello-text/metadata.json').after}.zip`}
    ]);
    assert.deepEqual(fs.readdirSync(output).sort(), [...manifest.packages.map(item => item.file), 'package-set.json'].sort());
    const snapshots = [];
    for (const item of manifest.packages) {
        const zip = await JSZip.loadAsync(fs.readFileSync(path.join(output, item.file)));
        const descriptor = JSON.parse(await zip.file('extension.json').async('string'));
        const snapshot = JSON.parse(await zip.file('library.json').async('string'));
        assert.equal(descriptor.version, item.version);
        assert.equal(descriptor.moduleId, item.moduleId);
        assert.equal(descriptor.profile, 'wonderlab');
        assert.equal(descriptor.libraryVersion, snapshot.version);
        snapshots.push(snapshot);
        if (item.moduleId !== 'output/hello-text') continue;
        assert.deepEqual(Object.keys(zip.files).filter(name => !zip.files[name].dir).sort(), ['extension.json', 'index.cjs', 'library.json']);
        const loaded = {exports: {}};
        // 只执行可信最小例的类，用仅含翻译的上下文证明它不依赖资源或端口；不是桌面／硬件验收。
        new Function('module', 'exports', await zip.file('index.cjs').async('string'))(loaded, loaded.exports);
        const {default: Extension, messages, product} = loaded.exports;
        let locale = 'zh-cn';
        const extension = new Extension({t: key => messages[locale][key]});
        const expected = {
            'zh-cn': '显示文本 [TEXT]', en: 'Show text [TEXT]', 'zh-tw': '顯示文字 [TEXT]', ko: '텍스트 [TEXT] 표시'
        };
        assert.deepEqual(product.supportedLocales, Object.keys(expected));
        for (const selected of product.supportedLocales) {
            locale = selected;
            assert.deepEqual(extension.getInfo(), {
                id: 'textdemo', name: descriptor.name[locale], blocks: [{
                    opcode: 'show_text', blockType: 'command', text: expected[locale],
                    arguments: {TEXT: {type: 'string', defaultValue: '你好，课程'}}
                }]
            });
            assert.deepEqual(extension.getPython(), {show_text: {template: 'print({TEXT})'}});
        }
    }
    assert.deepEqual(snapshots[0], snapshots[1]);
    assert.deepEqual(snapshots[0].products.aimech.modules['output/hello-text'], board.modules['output/hello-text']);
});
