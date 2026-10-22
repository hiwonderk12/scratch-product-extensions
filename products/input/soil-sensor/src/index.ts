import type {ExtensionContext, ExtensionInfo, NativeExtension} from '../../../../tools/sdk';

// 产品积木、菜单、集中 i18n 文案及 Python 规则在本文件维护。
export const messages = {
    "zh-cn": {
        "product.name": "土壤传感器",
        "block.aimech_get_soil_value": "接口 [PORT] 土壤湿度模拟值(0~100)"
    },
    "en": {
        "product.name": "Soil moisture sensor",
        "block.aimech_get_soil_value": "Port [PORT] soil moisture analog value (0~100)"
    },
    "zh-tw": {
        "product.name": "土壤感測器",
        "block.aimech_get_soil_value": "介面 [PORT] 土壤濕度類比值（0~100）"
    },
    "ko": {
        "product.name": "토양 수분 센서",
        "block.aimech_get_soil_value": "포트 [PORT] 토양 수분 아날로그 값(0~100)"
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
