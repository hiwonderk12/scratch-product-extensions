// 新包只提供可运行的文本示例，不声明尚未实现的硬件能力或自动开放主控支持。
const createModuleFiles = ({moduleId, namespace, name, description}) => {
    const id = moduleId.split('/')[1];
    const opcode = id.replaceAll('-', '_') + '_print_text';
    const locales = ['zh-cn', 'en', 'zh-tw', 'ko'];
    const texts = ['显示文本 [TEXT]', 'Print [TEXT]', '顯示文字 [TEXT]', '텍스트 [TEXT] 출력'];
    const messages = Object.fromEntries(locales.map((locale, index) => [locale, {
        'product.name': name[locale],
        ...(description ? {'product.description': description[locale]} : {}),
        ['block.' + opcode]: texts[index]
    }]));
    const product = {name: 'product.name', ...(description ? {description: 'product.description'} : {}), supportedLocales: locales};
    const source = `import type {ExtensionContext, ExtensionInfo, NativeExtension} from '../../../../tools/sdk';

// 产品声明、四语和 Python 规则在本文件维护；示例只输出文本，不连接硬件。
export const messages = ${JSON.stringify(messages, null, 4)} as const;

export const product = ${JSON.stringify(product, null, 4)} as const;

export default class ProductBlocks implements NativeExtension {
    constructor (private readonly context: ExtensionContext) {}

    getInfo (): ExtensionInfo {
        return {
            id: ${JSON.stringify(namespace)},
            name: this.context.t(product.name),
            color1: '#7B68EE',
            blocks: [{
                opcode: ${JSON.stringify(opcode)},
                blockType: 'command',
                text: this.context.t(${JSON.stringify('block.' + opcode)}),
                arguments: {TEXT: {type: 'string', defaultValue: "Hello"}}
            }],
            menus: {}
        };
    }

    // 内联模板由宿主按使用情况收集，不在类构造时初始化设备。
    getPython () {
        return {
            ${opcode}: {template: 'print({TEXT})'}
        };
    }
}
`;
    const smoke = `import assert from 'node:assert/strict';
import test from 'node:test';
import vm from 'node:vm';
import {fileURLToPath} from 'node:url';
import ts from 'typescript';
import {collectNativeModule} from '../../../../tools/cli/native-package.mjs';

// 仅为作者本地结构冒烟，不替代应用宿主、Python 完整程序或硬件验收。
test('产品类与 Python 示例可加载', () => {
    const root = fileURLToPath(new URL('../../../../', import.meta.url));
    const record = collectNativeModule(root, ${JSON.stringify(moduleId)}, ts);
    const exported = {};
    vm.runInNewContext(record.files[record.descriptor.entry], {exports: exported});
    for (const locale of record.descriptor.supportedLocales) {
        const extension = new exported.default({t: key => exported.messages[locale][key]});
        const info = extension.getInfo();
        assert.equal(info.id, ${JSON.stringify(namespace)});
        assert.equal(info.name, record.descriptor.name[locale]);
        assert.ok(info.blocks.some(block => block.opcode === ${JSON.stringify(opcode)}));
        assert.equal(extension.getPython()[${JSON.stringify(opcode)}].template, 'print({TEXT})');
    }
});
`;
    const guide = [
        '# ' + name['zh-cn'], '',
        '主要维护 `src/index.ts` 中的产品类、集中四语、菜单和内联 Python。',
        '当前仅有输出文本的通用示例，不代表该产品固件或传感器接口已实现。', '',
        '- 编译检查：`npm run ext -- check ' + moduleId + '`。',
        '- 作者冒烟：`node --test products/' + moduleId + '/test/smoke.mjs`，只执行可信本地源码，不是安全沙箱或应用内预览。',
        '- 新增普通积木/菜单：先读[CLI手册](../../../../docs/cli.md)。分支/多命名空间类需手工定点维护。',
        '- 检查完整程序、实际控件、项目保存恢复和硬件，再按需开放主控支持。',
        '- 主控支持、端口和 variant 在[库配置](../../../../docs/configuration.md)维护；创建命令不会自动添加支持或递增版本。',
        '- 目录/旧类型变化后：`npm run ext -- check --write-indexes`，审阅索引再执行`npm run ext -- check`。',
        '- 修改已发行内容必须递增包版本；打包不是发布，变更经 Git Review 合并。', ''
    ].join('\n');
    return {
        'metadata.json': JSON.stringify({id, format: 'hiwonder-native-extension', formatVersion: 1,
            version: '0.1.0', apiVersion: 1, namespace, mode: 'python', source: 'src/index.ts', entry: 'index.cjs', legacySources: []}, null, 2) + '\n',
        'src/index.ts': source,
        'test/smoke.mjs': smoke,
        'docs/README.md': guide
    };
};

export {createModuleFiles};
