import type {ExtensionContext, ExtensionInfo, NativeExtension} from '../../../../tools/sdk';

// 模块积木、菜单、集中四语文案和 Python 规则只在本文件维护。
export const messages = {
    "zh-cn": {
        "product.name": "雨滴传感器",
        "block.aimech_get_rain_drop_value": "接口 [PORT] 雨滴模拟值(0~100)"
    },
    en: {
        "product.name": "Rain sensor",
        "block.aimech_get_rain_drop_value": "Port [PORT] rain analog value (0~100)"
    },
    "zh-tw": {
        "product.name": "雨滴感測器",
        "block.aimech_get_rain_drop_value": "介面 [PORT] 雨滴類比值（0~100）"
    },
    ko: {
        "product.name": "빗방울 센서",
        "block.aimech_get_rain_drop_value": "포트 [PORT] 빗방울 아날로그 값(0~100)"
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

export default class RainSensorBlocks implements NativeExtension {
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
                    opcode: "aimech_get_rain_drop_value",
                    blockType: "reporter",
                    disableMonitor: true,
                    text: this.context.t('block.aimech_get_rain_drop_value'),
                    blockIconURI: this.context.asset('assets/raindrop.svg'),
                    arguments: {
                        PORT: {
                            type: "string",
                            defaultValue: this.context.defaultPort('aimech_get_rain_drop_value', 'PORT'),
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
            aimech_get_rain_drop_value: {
                template: "rain.read_value()",
                imports: [
                    "import Hiwonder_DEV"
                ],
                variables: [
                    "rain = Hiwonder_DEV.DEV_RAIN(Hiwonder_DEV.Port({PORT}))"
                ]
            }
        };
    }
}
