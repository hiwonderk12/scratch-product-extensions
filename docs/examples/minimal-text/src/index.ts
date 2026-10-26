// 最小手写示例：只声明一个文本积木和 Python 规则，不访问硬件、端口或外部资源。
// 复制到 products/output/hello-text/src/index.ts 后，此类型导入指向仓库内的作者 SDK。
import type {ExtensionContext, ExtensionInfo, NativeExtension, PythonTemplate} from '../../../../tools/sdk';

// 文案集中维护；只翻译显示文字，不翻译 key、opcode、参数名 TEXT。
export const messages = {
    'zh-cn': {'product.name': '文本演示', 'block.show_text': '显示文本 [TEXT]'},
    en: {'product.name': 'Text demo', 'block.show_text': 'Show text [TEXT]'},
    'zh-tw': {'product.name': '文字示範', 'block.show_text': '顯示文字 [TEXT]'},
    ko: {'product.name': '텍스트 예제', 'block.show_text': '텍스트 [TEXT] 표시'}
};

// 包卡片和工具箱共用名称；声明的四语必须具有全部文案 key 和相同参数占位符。
export const product = {
    name: 'product.name',
    supportedLocales: ['zh-cn', 'en', 'zh-tw', 'ko']
} as const;

export default class TextDemoBlocks implements NativeExtension {
    // 宿主注入上下文；只保存引用，不在构造时缓存当前语言或执行 Python。
    constructor (private readonly context: ExtensionContext) {}

    // 语言切换会重新读取声明，故在这里按 key 取文案。
    getInfo (): ExtensionInfo {
        return {
            id: 'textdemo', // 与 metadata.namespace 一致，发布后保持稳定。
            name: this.context.t('product.name'),
            blocks: [{
                opcode: 'show_text', // 工程中保存的完整类型为 textdemo_show_text。
                blockType: 'command', // 上下可拼接指令，不是返回数值的表达式。
                text: this.context.t('block.show_text'),
                arguments: {
                    TEXT: {type: 'string', defaultValue: '你好，课程'}
                }
            }]
        };
    }

    // key 对应 opcode；{TEXT} 由生成器转义并添加字符串引号，不要再次包引号。
    getPython (): Record<string, PythonTemplate> {
        return {show_text: {template: 'print({TEXT})'}};
    }
}
