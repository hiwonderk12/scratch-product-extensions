// 完整示例的公开库自验：真实编译与 ZIP，接口覆盖及四语不改变代码规则。
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import test from 'node:test';
import vm from 'node:vm';
import JSZip from 'jszip';
import ts from 'typescript';
import {collectStandaloneExtension, createNativeArchive} from '../cli/native-package.mjs';

const root = fileURLToPath(new URL('../../', import.meta.url));
const directory = path.join(root, 'docs/examples/api-showcase');
const collected = collectStandaloneExtension(directory, ts);
const compiled = {exports: {}};
// 只执行本库已知的参考类；Node vm 不是供不可信拓展使用的安全边界。
vm.runInNewContext(collected.files['index.cjs'], {exports: compiled.exports, module: compiled});
const {default: Product, messages, product} = compiled.exports;
const metadata = JSON.parse(fs.readFileSync(path.join(directory, 'metadata.json'), 'utf8'));
const plain = value => JSON.parse(JSON.stringify(value));
const keys = objects => [...new Set(objects.flatMap(object => Object.keys(object)))].sort();
const sdk = ts.createSourceFile('index.d.ts', fs.readFileSync(path.join(root, 'tools/sdk/index.d.ts'), 'utf8'),
    ts.ScriptTarget.Latest, true);
const interfaceFields = name => {
    const declaration = sdk.statements.find(statement => ts.isInterfaceDeclaration(statement) && statement.name.text === name);
    assert.ok(declaration, name);
    return declaration.members.map(member => member.name.getText(sdk)).sort();
};
const create = (productId = null) => {
    let locale = 'zh-cn';
    const calls = [];
    const support = metadata.support.products[productId] || metadata.support.default;
    const context = {
        variant: support.variant,
        t: key => {
            assert.equal(typeof key, 'string');
            assert.equal(typeof messages[locale][key], 'string', `${locale}: ${key}`);
            return messages[locale][key];
        },
        ports: group => {
            assert.ok(support.portGroups[group], group);
            calls.push(['ports', group]);
            return metadata.support.ports[group].map(port => ({
                text: typeof port.label === 'string' ? port.label : port.label[locale], value: port.value
            }));
        },
        defaultPort: (opcode, argument, namespace = metadata.namespace) => {
            calls.push(['defaultPort', opcode, argument, namespace]);
            const values = Object.values(support.portGroups)
                .map(group => group.bindings[`${namespace}_${opcode}.${argument}`]).filter(Boolean);
            assert.equal(values.length, 1);
            return values[0];
        },
        asset: filename => {
            calls.push(['asset', filename]);
            assert.ok(collected.files[filename], filename);
            return filename;
        },
        python: filename => {
            calls.push(['python', filename]);
            assert.ok(collected.files[filename], filename);
            return collected.files[filename].toString().trimEnd();
        }
    };
    return {instance: new Product(context), calls, context, setLocale: value => { locale = value; }};
};

test('完整 API 参考是独立作者包，ZIP 保留类、四语源码和原始资源', async () => {
    const zip = await JSZip.loadAsync(await createNativeArchive(collected, JSZip));
    const descriptor = JSON.parse(await zip.file('metadata.json').async('string'));
    assert.equal(descriptor.installation, 'standalone');
    assert.equal(descriptor.moduleId, 'output/api-showcase');
    assert.equal(descriptor.version, '0.0.1');
    for (const name of ['index.cjs', 'src/index.ts', 'assets/api-showcase.svg', 'assets/value.svg',
        'python/resource-demo.py']) assert.ok(zip.file(name), name);
    for (const name of ['extension.json', 'library.json', 'package-set.json']) assert.equal(zip.file(name), null);
    assert.match(await zip.file('index.cjs').async('string'), /class ApiShowcaseBlocks/);
    assert.match(await zip.file('assets/api-showcase.svg').async('string'), /<svg/);
});

test('四语 key、占位符、菜单实际值和 Python 规则一致，全部 opcode 都有生成规则', () => {
    const sample = create();
    const baseline = plain(sample.instance.getInfo());
    const rules = plain(sample.instance.getPython());
    const baseKeys = Object.keys(messages['zh-cn']).sort();
    const placeholders = text => [...text.matchAll(/\[([A-Z][A-Z0-9_]*)\]/g)].map(match => match[1]).sort();
    const names = [];
    for (const locale of product.supportedLocales) {
        sample.setLocale(locale);
        assert.deepEqual(Object.keys(messages[locale]).sort(), baseKeys);
        for (const key of baseKeys) assert.deepEqual(placeholders(messages[locale][key]), placeholders(messages['zh-cn'][key]));
        const info = plain(sample.instance.getInfo());
        names.push(info.name);
        assert.deepEqual(plain(sample.instance.getPython()), rules);
        const blocks = info.blocks.filter(block => block.opcode);
        assert.equal(blocks.length, 31);
        assert.deepEqual(blocks.map(block => block.opcode).sort(), Object.keys(rules).sort());
        for (const block of blocks) assert.deepEqual(placeholders(block.text), Object.keys(block.arguments || {}).sort());
        for (const [name, menu] of Object.entries(info.menus)) {
            assert.deepEqual(menu.items.map(item => item.value), baseline.menus[name].items.map(item => item.value));
        }
    }
    assert.equal(new Set(names).size, 4);
});

test('全部 SDK 顶层字段、选择器嵌套字段及生命周期都有真实示例', () => {
    const sample = create();
    const info = sample.instance.getInfo();
    const blocks = info.blocks.filter(block => block.opcode);
    const rules = Object.values(sample.instance.getPython());
    const coverage = {
        ProductDisplay: [product], ExtensionContext: [sample.context], ExtensionInfo: [info],
        ExtensionBlock: blocks, ExtensionSubcategory: info.blocks.filter(block => block.subCategory),
        ExtensionArgument: blocks.flatMap(block => Object.values(block.arguments || {})), PythonTemplate: rules,
        NativeExtension: [{getInfo: sample.instance.getInfo, getPython: sample.instance.getPython, dispose: sample.instance.dispose}]
    };
    for (const [name, objects] of Object.entries(coverage)) assert.deepEqual(keys(objects), interfaceFields(name), name);
    const selector = sdk.statements.find(statement => statement.name?.text === 'PythonTemplate')
        .members.find(member => member.name.getText(sdk) === 'templateSelector');
    assert.deepEqual(keys(rules.filter(rule => rule.templateSelector).map(rule => rule.templateSelector)),
        selector.type.members.map(member => member.name.getText(sdk)).sort());
    assert.deepEqual(keys(rules.flatMap(rule => rule.forcedVariables || [])), ['code', 'name']);
    assert.deepEqual(keys(Object.values(info.menus)), ['acceptReporters', 'items']);
    assert.deepEqual(keys(Object.values(info.menus).flatMap(menu => menu.items)), ['text', 'value']);
});

test('四类积木、二十种滑块、其他可生成控件与全部格式化写法均有实际声明', () => {
    const sample = create();
    const blocks = sample.instance.getInfo().blocks.filter(block => block.opcode);
    assert.deepEqual([...new Set(blocks.map(block => block.blockType))].sort(), ['Boolean', 'command', 'hat', 'reporter']);
    const types = [...new Set(blocks.flatMap(block => Object.values(block.arguments || {}).map(argument => argument.type)))];
    assert.deepEqual(types.filter(type => type.startsWith('slider')).sort(), [
        'slider', 'slider100', 'slider90', 'slider127', 'slider150', 'slider150p', 'slider180', 'slider180z',
        'slider360', 'slider200', 'slider200p', 'slider255', 'slider270', 'slider8', 'slider30', 'slider2500',
        'slider1000', 'slider1000p', 'slider0180', 'slider10'
    ].sort());
    for (const type of ['string', 'number', 'angle', 'Boolean', 'color', 'square_color', 'largetext', 'led_matrix',
        'line4', 'line6', 'line8']) assert.ok(types.includes(type), type);
    const templates = JSON.stringify(sample.instance.getPython());
    for (const formatter of ['rgb', 'bitmap', 'jsonValue', 'compactJson', 'identifier', 'memberName',
        'compactHead', 'compactTail', 'colorName']) assert.ok(templates.includes(`.${formatter}}`), formatter);
    const groups = sample.instance.getInfo().blocks.filter(block => block.subCategory);
    assert.equal(groups.length, 5);
    assert.equal(new Set(groups.map(group => group.toolboxCategoryId)).size, 5);
    assert.ok(groups.slice(1).every(group => group.toolboxParentId === groups[0].toolboxCategoryId));
});

test('三种主控适配同时切换端口、依赖和初始化，资源缓存与清理可重复使用', async () => {
    const expected = [
        [null, '1', 'import math', 'apishowcase_virtual_{PORT} = math.sqrt({PORT})', 'apishowcase_virtual_{PORT}'],
        ['aimech', '1', 'import Hiwonder_DEV', 'apishowcase_ir_{PORT} = Hiwonder_DEV.DEV_IR(Hiwonder_DEV.Port({PORT}))',
            'apishowcase_ir_{PORT}.read_state()'],
        ['minihexa', '32', 'import Hiwonder_DEV', 'apishowcase_ir_{PORT} = Hiwonder_DEV.DEV_IR({PORT})', 'apishowcase_ir_{PORT}.read()']
    ];
    for (const [productId, port, dependency, initialization, expression] of expected) {
        const sample = create(productId);
        assert.equal(sample.instance.getInfo().blocks.find(block => block.opcode === 'read_port').arguments.PORT.defaultValue, port);
        const rules = sample.instance.getPython();
        assert.deepEqual(plain(rules.read_port), {imports: [dependency], variables: [initialization], template: expression});
        assert.equal(rules.start_thread.launcher, productId ? 'Hiwonder.startMain({MAIN})' : '{MAIN}()');
        sample.instance.getPython();
        assert.equal(sample.calls.filter(call => call[0] === 'python').length, 1);
        await sample.instance.dispose();
        await sample.instance.dispose();
        sample.instance.getPython();
        assert.equal(sample.calls.filter(call => call[0] === 'python').length, 2);
        for (const method of ['asset', 'python', 'ports', 'defaultPort']) assert.ok(sample.calls.some(call => call[0] === method), method);
    }
    assert.throws(() => new Product({variant: 'unknown'}), /不支持此适配/);
});
