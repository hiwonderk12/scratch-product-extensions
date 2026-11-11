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

export default class SoilSensorBlocks implements NativeExtension {
    constructor (private readonly context: ExtensionContext) {}

    getInfo (): ExtensionInfo {
        return {
            id: 'sensor',
            name: this.context.t(product.name),
            color1: '#7B68EE',
            color2: '#7B68EE',
            color3: '#7B68EE',
            blocks: [{
                opcode: 'aimech_get_soil_value',
                blockType: 'reporter',
                text: this.context.t("block.aimech_get_soil_value"),
                disableMonitor: true,
                blockIconURI: this.context.asset('assets/soil.svg'),
                arguments: {
                    PORT: {
                        type: 'string',
                        menu: 'aimech_iicport',
                        defaultValue: this.context.defaultPort('aimech_get_soil_value', 'PORT'),
                        literal: true
                    }
                }
            }],
            menus: {
                aimech_iicport: {acceptReporters: false, items: this.context.ports('sensor.aimech_iicport')}
            }
        };
    }

    // 独立模板保留原 IIC 地址及 read_value API。
    getPython () {
        return {
            aimech_get_soil_value: {
                imports: ['import Hiwonder_DEV'],
                variables: ["soil = Hiwonder_DEV.DEV_SOIL(Hiwonder_DEV.Port({PORT},0x5A))"],
                template: "soil.read_value()"
            }
        };
    }
}
