import type {ExtensionContext, ExtensionInfo, NativeExtension} from '../../../../tools/sdk';

// 产品积木、菜单、集中 i18n 文案及 Python 规则在本文件维护。
export const messages = {
    "zh-cn": {
        "product.name": "光线传感器",
        "block.aimech_read_light": "接口 [PORT] 光敏模拟值(0~100)"
    },
    "en": {
        "product.name": "Light sensor",
        "block.aimech_read_light": "Port [PORT] light analog value (0~100)"
    },
    "zh-tw": {
        "product.name": "光線感測器",
        "block.aimech_read_light": "介面 [PORT] 光敏類比值（0~100）"
    },
    "ko": {
        "product.name": "조도 센서",
        "block.aimech_read_light": "포트 [PORT] 조도 아날로그 값(0~100)"
    }
} as const;

export const product = {
    "name": "product.name",
    "supportedLocales": [
        "zh-cn",
        "en",
        "zh-tw",
        "ko"
    ]
} as const;

export default class LightSensorBlocks implements NativeExtension {
    constructor (private readonly context: ExtensionContext) {}

    getInfo (): ExtensionInfo {
        return {
            id: 'sensor',
            name: this.context.t(product.name),
            color1: '#7B68EE',
            color2: '#7B68EE',
            color3: '#7B68EE',
            blocks: [{
                opcode: 'aimech_read_light',
                blockType: 'reporter',
                text: this.context.t("block.aimech_read_light"),
                disableMonitor: true,
                blockIconURI: this.context.asset('assets/light.svg'),
                arguments: {
                    PORT: {
                        type: 'string',
                        menu: 'aimech_iicport',
                        defaultValue: this.context.defaultPort('aimech_read_light', 'PORT'),
                        literal: true
                    }
                }
            }],
            menus: {
                aimech_iicport: {acceptReporters: false, items: this.context.ports('sensor.aimech_iicport')}
            }
        };
    }

    // 生成规则按设备 SDK 初始化与取值，只在用到该积木时收集依赖。
    getPython () {
        return {
            aimech_read_light: {
                imports: ['import Hiwonder_DEV'],
                variables: ["light = Hiwonder_DEV.DEV_LIGHT(Hiwonder_DEV.Port({PORT}))"],
                template: "light.read_value()"
            }
        };
    }
}
