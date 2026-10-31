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
const exampleVersion = readJson(path.join(root, 'docs/examples/handwritten-text/metadata.json')).version;

// 独立作者副本不复制依赖、不建立联接、不递归清理；仅向公开库自己的依赖目录解析。
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
    const stat = fs.lstatSync(source);
    if (stat.isDirectory()) {
        fs.mkdirSync(destination, {recursive: true});
        for (const entry of fs.readdirSync(source)) copySource(path.join(source, entry), path.join(destination, entry));
    } else fs.copyFileSync(source, destination, fs.constants.COPYFILE_EXCL);
};

test('handwritten tutorial: check and package companions without authoring generators or GUI', async context => {
    assertNoLinks(path.join(root, 'dist'));
    fs.mkdirSync(path.join(root, 'dist'), {recursive: true});
    const directory = fs.mkdtempSync(path.join(root, 'dist', 'handwritten-'));
    context.diagnostic(`保留独立手写副本及日志：${directory}`);
    for (const relative of ['tools', 'products', 'library', 'library.config.json', 'catalog.json']) {
        copySource(path.join(root, relative), path.join(directory, relative));
    }
    fs.mkdirSync(path.join(directory, 'products/output/hello-text'), {recursive: true});
    for (const relative of ['metadata.json', 'src', 'assets', 'python']) {
        copySource(path.join(root, 'docs/examples/handwritten-text', relative), path.join(directory, 'products/output/hello-text', relative));
    }
    const requireFromFixture = createRequire(path.join(directory, 'tools/cli/index.mjs'));
    for (const dependency of ['typescript', 'jszip']) {
        const expected = fs.realpathSync(path.join(root, 'node_modules', dependency));
        assertNoLinks(expected);
        assert.ok(fs.realpathSync(requireFromFixture.resolve(dependency)).startsWith(expected + path.sep));
    }
    assert.equal(fs.existsSync(path.join(directory, 'node_modules')), false);
    const updateJson = (relative, update) => {
        const filename = path.join(directory, relative);
        const data = readJson(filename);
        update(data);
        fs.writeFileSync(filename, JSON.stringify(data, null, 2) + '\n');
    };
    updateJson('library/boards/aimech.json', board => {
        board.modules['output/hello-text'] = {variant: 'text-demo', legacyNamespaces: ['textdemo'], portGroups: {}};
    });
    updateJson('library.config.json', library => { library.version = '0.0.2-demo.1'; });
    updateJson('products/robots/aimech/metadata.json', metadata => { metadata.version = '0.0.2-demo.1'; });
    const steps = [];
    const run = (args, expectedStatus = 0) => {
        const env = {...process.env};
        delete env.NODE_PATH;
        const result = spawnSync(process.execPath, ['tools/cli/index.mjs', ...args], {
            cwd: directory, encoding: 'utf8', env, timeout: 120000, windowsHide: true
        });
        steps.push({args, status: result.status, stdout: result.stdout, stderr: result.stderr, error: result.error?.message});
        fs.writeFileSync(path.join(directory, 'handwritten-steps.json'), JSON.stringify(steps, null, 2) + '\n');
        assert.equal(result.status, expectedStatus, `${args.join(' ')}\n${result.error || ''}\n${result.stdout}\n${result.stderr}`);
        return result;
    };
    await context.test('real CLI checks handwritten support and builds matching product/module ZIPs', async () => {
        run(['check', 'output/hello-text']);
        run(['check', '--write-indexes']);
        run(['check']);
        run(['check', 'output/hello-text']);
        const args = ['pack-set', 'aimech', 'output/hello-text', '--output', 'dist/hello-text-demo'];
        run([...args, '--dry-run']);
        assert.equal(fs.existsSync(path.join(directory, 'dist/hello-text-demo')), false);
        run(args);
        const output = path.join(directory, 'dist/hello-text-demo');
        const manifest = readJson(path.join(output, 'package-set.json'));
        assert.equal(manifest.libraryVersion, '0.0.2-demo.1');
        assert.deepEqual(manifest.packages, [
            {moduleId: 'robots/aimech', version: '0.0.2-demo.1', file: 'aimech-0.0.2-demo.1.zip'},
            {moduleId: 'output/hello-text', version: exampleVersion, file: `hello-text-${exampleVersion}.zip`}
        ]);
        const snapshots = [];
        for (const item of manifest.packages) {
            const zip = await JSZip.loadAsync(fs.readFileSync(path.join(output, item.file)));
            const descriptor = JSON.parse(await zip.file('extension.json').async('string'));
            const snapshot = JSON.parse(await zip.file('library.json').async('string'));
            assert.equal(descriptor.version, item.version);
            assert.equal(descriptor.profile, 'wonderlab');
            assert.equal(descriptor.moduleId, item.moduleId);
            assert.equal(descriptor.libraryVersion, snapshot.version);
            assert.ok((await zip.file('index.cjs').async('string')).includes('class '));
            snapshots.push(snapshot);
        }
        assert.deepEqual(snapshots[0], snapshots[1]);
        assert.deepEqual(snapshots[0].products.aimech.modules['output/hello-text'], {
            variant: 'text-demo', legacyNamespaces: ['textdemo'], portGroups: {}
        });
    });
    const zip = await JSZip.loadAsync(fs.readFileSync(path.join(directory, `dist/hello-text-demo/hello-text-${exampleVersion}.zip`)));
    const descriptor = JSON.parse(await zip.file('extension.json').async('string'));
    const source = await zip.file('index.cjs').async('string');
    const loaded = {exports: {}};
    // 仅执行仓库内可信教程类；此检查不是宿主加载、安全隔离或设备验收。
    new Function('module', 'exports', source)(loaded, loaded.exports);
    const {default: Extension, messages, product} = loaded.exports;
    const resources = {
        'assets/text-demo.svg': 'data:image/svg+xml;base64,' + await zip.file('assets/text-demo.svg').async('base64'),
        'python/fixed-message.py': await zip.file('python/fixed-message.py').async('string')
    };
    let locale = 'zh-cn';
    const createContext = (variant = 'text-demo', overrides = {}) => ({
        variant,
        t: key => {
            assert.equal(typeof messages[locale][key], 'string', `${locale}/${key}`);
            return messages[locale][key];
        },
        asset: filename => {
            assert.ok(Object.hasOwn(resources, filename));
            return resources[filename];
        },
        python: filename => {
            assert.ok(Object.hasOwn(resources, filename));
            return resources[filename].trimEnd();
        },
        ports: () => { throw new Error('默认文本适配不应读取端口'); },
        defaultPort: () => { throw new Error('默认文本适配不应读取端口绑定'); },
        ...overrides
    });
    await context.test('trusted reference class resolves four catalogs without changing every block, menu or rule', () => {
        const extension = new Extension(createContext());
        const stableInfo = info => ({
            id: info.id,
            blocks: info.blocks.filter(block => block.opcode).map(({text, ...block}) => block),
            menus: Object.fromEntries(Object.entries(info.menus).map(([name, menu]) => [name, {
                acceptReporters: menu.acceptReporters, values: menu.items.map(item => item.value)
            }]))
        });
        const baseline = stableInfo(extension.getInfo());
        const python = extension.getPython();
        assert.deepEqual(product.supportedLocales, ['zh-cn', 'en', 'zh-tw', 'ko']);
        for (const selected of product.supportedLocales) {
            locale = selected;
            const info = extension.getInfo();
            assert.equal(info.name, descriptor.name[locale]);
            assert.equal(descriptor.description[locale], messages[locale][product.description]);
            assert.equal(info.blocks[0].text, messages[locale]['block.show_text']);
            for (const block of info.blocks.filter(block => block.opcode)) {
                const opcode = block.opcode === 'old_show_text' ? 'show_text' : block.opcode;
                assert.equal(block.text, messages[locale]['block.' + opcode], `${locale}/${block.opcode}`);
            }
            assert.deepEqual(info.blocks.filter(block => block.subCategory).map(block => block.subCategory),
                ['group.values', 'group.generation', 'group.resources'].map(key => messages[locale][key]));
            const menuKeys = {
                textdemo_repeat_count: ['menu.repeat.once', 'menu.repeat.twice'],
                textdemo_case: ['menu.case.keep', 'menu.case.upper', 'menu.case.lower'],
                textdemo_log_level: ['menu.level.info', 'menu.level.warning'],
                textdemo_legacy_color: ['menu.color.red', 'menu.color.green']
            };
            for (const [name, keys] of Object.entries(menuKeys)) {
                assert.deepEqual(info.menus[name].items.map(item => item.text), keys.map(key => messages[locale][key]));
            }
            assert.deepEqual(stableInfo(info), baseline);
            assert.deepEqual(extension.getPython(), python);
        }
        assert.equal(python.show_text.template, 'print({TEXT})');
        assert.deepEqual(Object.keys(python).sort(), baseline.blocks.map(block => block.opcode).sort());
        extension.dispose();
        extension.dispose();
    });
    await context.test('reference covers all template fields, block shapes, resources and existing control families', () => {
        const extension = new Extension(createContext());
        const info = extension.getInfo();
        const python = extension.getPython();
        assert.deepEqual([...new Set(info.blocks.filter(block => block.opcode).map(block => block.blockType))].sort(),
            ['Boolean', 'command', 'hat', 'reporter']);
        const fields = [...new Set(Object.values(python).flatMap(rule => Object.keys(rule)))].sort();
        assert.deepEqual(fields, ['entryFooter', 'entryTemplate', 'forcedVariables', 'imports', 'launcher',
            'runtimeFiles', 'section', 'setups', 'template', 'templateSelector', 'variables'].sort());
        assert.deepEqual(python.start_thread, {template: '', imports: ['import Hiwonder', 'import time'],
            launcher: 'Hiwonder.startMain({MAIN})', section: 'main'});
        assert.equal(python.setup_demo.section, 'setup');
        assert.equal(python.on_demo.entryTemplate, 'def on_demo():');
        assert.equal(python.on_demo.section, 'main');
        assert.equal(python.on_demo.entryFooter, 'textdemo_callbacks.append(on_demo)');
        assert.equal(python.repeat_text.templateSelector.matchInputCode, true);
        assert.equal(python.choose_text.templateSelector.matchInputCode, false);
        assert.equal(python.reset_history.forcedVariables[0].name, 'textdemo_history');
        assert.deepEqual(python.show_resource.runtimeFiles, ['python/fixed-message.py']);
        assert.equal(python.show_resource.template, resources['python/fixed-message.py'].trimEnd());
        assert.equal(descriptor.icon, 'assets/text-demo.svg');
        assert.equal(info.menuIconURI, resources[descriptor.icon]);
        assert.equal(info.blockIconURI, resources[descriptor.icon]);
        const types = new Set(info.blocks.flatMap(block => Object.values(block.arguments || {}).map(argument => argument.type)));
        for (const type of ['string', 'number', 'Boolean', 'angle', 'color', 'slider255',
            'slider150p', 'square_color', 'led_matrix', 'line4', 'line6', 'line8', 'largetext']) assert.ok(types.has(type), type);
        assert.equal(types.has('note'), false);
        assert.equal(types.has('matrix'), false);
        assert.equal(python.show_controls.template, 'print({NUMBER}, float({ANGLE}), {FLAG}, {COLOR})');
        const matrix = info.blocks.find(block => block.opcode === 'show_bitmap').arguments.MATRIX.defaultValue;
        assert.match(matrix, /^[01]{128}$/);
        assert.equal(info.blocks.find(block => block.opcode === 'old_show_text').hideFromPalette, true);
        assert.equal(info.blocks.find(block => block.opcode === 'log_text').arguments.LEVEL.literal, true);
        assert.equal(info.menus.textdemo_log_level.acceptReporters, false);
        assert.equal(info.menus.textdemo_repeat_count.acceptReporters, true);
        assert.equal(Object.hasOwn(python, 'read_light'), false);
        assert.equal(JSON.stringify(python).includes('import Hiwonder_DEV'), false);
    });
    await context.test('optional SDK variant uses explicit ports and matching import and initialization only in that branch', () => {
        const calls = [];
        const extension = new Extension(createContext('hiwonder-dev-port', {
            ports: group => {
                calls.push(['ports', group]);
                return [{text: 'A', value: '1'}];
            },
            defaultPort: (...args) => {
                calls.push(['defaultPort', ...args]);
                return '1';
            }
        }));
        const info = extension.getInfo();
        const port = info.blocks.find(block => block.opcode === 'read_light').arguments.PORT;
        assert.equal(port.defaultValue, '1');
        assert.equal(port.literal, true);
        assert.deepEqual(info.menus.textdemo_iic_port.items, [{text: 'A', value: '1'}]);
        assert.deepEqual(calls, [['defaultPort', 'read_light', 'PORT', 'textdemo'], ['ports', 'sensor.aimech_iicport']]);
        assert.deepEqual(extension.getPython().read_light, {imports: ['import Hiwonder_DEV'],
            variables: ['textdemo_light_{PORT} = Hiwonder_DEV.DEV_LIGHT(Hiwonder_DEV.Port({PORT}))'],
            template: 'textdemo_light_{PORT}.read_value()'});
        assert.throws(() => new Extension(createContext('unknown')), /不支持此适配/);
        extension.dispose();
    });
    await context.test('missing referenced assets or Python files fail the actual compiler check', () => {
        const entry = path.join(directory, 'products/output/hello-text/src/index.ts');
        const original = fs.readFileSync(entry, 'utf8');
        try {
            for (const filename of ['assets/text-demo.svg', 'python/fixed-message.py']) {
                fs.writeFileSync(entry, original.replaceAll(filename, filename + '.missing'));
                assert.match(run(['check', 'output/hello-text'], 1).stderr, /文件不存在|不可读/);
            }
        } finally {
            fs.writeFileSync(entry, original);
        }
    });
    await context.test('declared-language gaps and changed placeholders fail the actual compiler check', () => {
        const entry = path.join(directory, 'products/output/hello-text/src/index.ts');
        const original = fs.readFileSync(entry, 'utf8');
        try {
            assert.ok(original.includes("'block.show_text': '텍스트 표시 [TEXT]'"));
            fs.writeFileSync(entry, original.replace(/^\s*'block\.show_text': '텍스트 표시 \[TEXT\]',?\r?\n/m, ''));
            assert.match(run(['check', 'output/hello-text'], 1).stderr, /ko|缺译文/);
            fs.writeFileSync(entry, original.replace('텍스트 표시 [TEXT]', '텍스트 표시 [VALUE]'));
            assert.match(run(['check', 'output/hello-text'], 1).stderr, /占位符/);
        } finally {
            fs.writeFileSync(entry, original);
        }
    });
});
