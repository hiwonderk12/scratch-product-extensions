import type {ExtensionContext, ExtensionInfo, NativeExtension} from '../../../../tools/sdk';

// 模块积木、菜单、集中四语文案和 Python 规则只在本文件维护。
export const messages = {
    "zh-cn": {
        "product.name": "声音传感器",
        "block.aimech_read_sound": "接口 [PORT] 音量模拟值(0~100)"
    },
    en: {
        "product.name": "Sound sensor",
        "block.aimech_read_sound": "Port [PORT] sound analog value (0~100)"
    },
    "zh-tw": {
        "product.name": "聲音感測器",
        "block.aimech_read_sound": "介面 [PORT] 音量類比值（0~100）"
    },
    ko: {
        "product.name": "소리 센서",
        "block.aimech_read_sound": "포트 [PORT] 소리 아날로그 값(0~100)"
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

export default class SoundSensorBlocks implements NativeExtension {
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
                    opcode: "aimech_read_sound",
                    blockType: "reporter",
                    disableMonitor: true,
                    text: this.context.t('block.aimech_read_sound'),
                    arguments: {
                        PORT: {
                            type: "string",
                            defaultValue: this.context.defaultPort('aimech_read_sound', 'PORT'),
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
            aimech_read_sound: {
                template: "sound.read_value()",
                imports: [
                    "import Hiwonder_DEV"
                ],
                variables: [
                    "sound = Hiwonder_DEV.DEV_SOUND(Hiwonder_DEV.Port({PORT}))"
                ]
            }
        };
    }
}
