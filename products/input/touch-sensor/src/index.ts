import type {ExtensionContext, ExtensionInfo, NativeExtension} from '../../../../tools/sdk';

// 模块积木、菜单、集中四语文案和 Python 规则只在本文件维护。
export const messages = {
    "zh-cn": {
        "product.name": "触摸传感器",
        "block.aimech_read_touch": "接口 [PORT] 触摸传感器被触碰?"
    },
    en: {
        "product.name": "Touch sensor",
        "block.aimech_read_touch": "Port [PORT] touch sensor touched?"
    },
    "zh-tw": {
        "product.name": "觸摸感測器",
        "block.aimech_read_touch": "介面 [PORT] 觸摸感測器被觸碰？"
    },
    ko: {
        "product.name": "터치 센서",
        "block.aimech_read_touch": "포트 [PORT] 터치 센서가 감지되었는가?"
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

export default class TouchSensorBlocks implements NativeExtension {
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
                    opcode: "aimech_read_touch",
                    blockType: "Boolean",
                    disableMonitor: true,
                    text: this.context.t('block.aimech_read_touch'),
                    arguments: {
                        PORT: {
                            type: "string",
                            defaultValue: this.context.defaultPort('aimech_read_touch', 'PORT'),
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
            aimech_read_touch: {
                template: "touch.read_state()",
                imports: [
                    "import Hiwonder_DEV"
                ],
                variables: [
                    "touch = Hiwonder_DEV.DEV_TOUCH(Hiwonder_DEV.Port({PORT}))"
                ]
            }
        };
    }
}
