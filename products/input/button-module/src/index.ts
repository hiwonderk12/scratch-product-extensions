import type {ExtensionContext, ExtensionInfo, NativeExtension} from '../../../../tools/sdk';

// 模块积木、菜单、集中四语文案和 Python 规则只在本文件维护。
export const messages = {
    "zh-cn": {
        "product.name": "按键模块",
        "block.aimech_key_is_pressed": "接口 [PORT] 按键被按下"
    },
    en: {
        "product.name": "Button module",
        "block.aimech_key_is_pressed": "Port [PORT] button pressed"
    },
    "zh-tw": {
        "product.name": "按鍵模組",
        "block.aimech_key_is_pressed": "介面 [PORT] 按鍵被按下"
    },
    ko: {
        "product.name": "버튼 모듈",
        "block.aimech_key_is_pressed": "포트 [PORT] 버튼이 눌렸는가"
    }
} as const;

export const product = {
    name: "product.name",
    supportedLocales: [
        "zh-cn",
        "en",
        "zh-tw",
        "ko"
    ]
} as const;

export default class ButtonModuleBlocks implements NativeExtension {
    constructor (private readonly context: ExtensionContext) {}

    getInfo (): ExtensionInfo {
        return {
            id: "sensor",
            name: this.context.t(product.name),
            color1: "#7B68EE",
            color2: "#7B68EE",
            color3: "#7B68EE",
            menus: {
                aimech_iicport: {
                    items: this.context.ports('sensor.aimech_iicport'),
                    acceptReporters: false
                }
            },
            blocks: [
                {
                    subCategory: this.context.t(product.name)
                },
                {
                    opcode: "aimech_key_is_pressed",
                    blockType: "Boolean",
                    disableMonitor: true,
                    text: this.context.t('block.aimech_key_is_pressed'),
                    arguments: {
                        PORT: {
                            type: "string",
                            defaultValue: this.context.defaultPort('aimech_key_is_pressed', 'PORT'),
                            menu: "aimech_iicport",
                            literal: true
                        }
                    }
                }
            ]
        };
    }

    // 仅使用积木时收集初始化；对象名、端口字面值及生成接口保持旧工程语义。
    getPython () {
        return {
            aimech_key_is_pressed: {
                template: "key.read_state()",
                imports: [
                    "import Hiwonder_DEV"
                ],
                variables: [
                    "key = Hiwonder_DEV.DEV_BUTTON(Hiwonder_DEV.Port({PORT}))"
                ]
            }
        };
    }
}
