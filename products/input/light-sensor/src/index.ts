import type {ExtensionContext, ExtensionInfo, NativeExtension} from '../../../../tools/sdk';

// 产品积木、菜单、集中 i18n 文案及 Python 规则在本文件维护。
import locale0 from './locales/zh-cn.json';
import locale1 from './locales/en.json';
import locale2 from './locales/zh-tw.json';
import locale3 from './locales/ko.json';

export const messages = {
    "zh-cn": locale0,
    "en": locale1,
    "zh-tw": locale2,
    "ko": locale3
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
