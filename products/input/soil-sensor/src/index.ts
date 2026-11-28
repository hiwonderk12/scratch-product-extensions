import type {ExtensionContext, ExtensionInfo, NativeExtension, PythonTemplate} from '../../../../tools/sdk';

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

const PORT_MENUS: Record<string, {acceptReporters: boolean; items: Array<{text: string; value: string}>}> = {
    aiblocks_iicport: {
        acceptReporters: false,
        items: [
            {text: 'A', value: '1'},
            {text: 'B', value: '2'},
            {text: 'C', value: '3'},
            {text: 'D', value: '4'}
        ]
    },
    aimech_iicport: {
        acceptReporters: false,
        items: [
            {text: 'A', value: '1'},
            {text: 'B', value: '2'},
            {text: 'C', value: '3'},
            {text: 'D', value: '4'},
            {text: 'E', value: '5'},
            {text: 'J', value: '9'},
            {text: 'K', value: '10'}
        ]
    }
};

export default class SoilSensorBlocks implements NativeExtension {
    constructor (private readonly context: ExtensionContext) {}

    // 未声明的适配不能静默落到机器人DEV驱动。
    private adapter (): {opcode: string; portMenu: string} {
        if (this.context.variant === 'hiwonder-iic') {
            return {opcode: 'aiblocksboard_get_soil_moisture_value', portMenu: 'aiblocks_iicport'};
        }
        if (this.context.variant === 'wonderlab') {
            return {opcode: 'aimech_get_soil_value', portMenu: 'aimech_iicport'};
        }
        throw new Error('soil-sensor: 未支持的主控适配 ' + this.context.variant);
    }

    getInfo (): ExtensionInfo {
        const {opcode, portMenu} = this.adapter();
        return {
            id: 'sensor',
            name: this.context.t(product.name),
            color1: '#7B68EE',
            color2: '#7B68EE',
            color3: '#7B68EE',
            blocks: [{
                opcode,
                blockType: 'reporter',
                text: this.context.t('block.aimech_get_soil_value'),
                disableMonitor: true,
                blockIconURI: this.context.asset('assets/soil.svg'),
                arguments: {
                    PORT: {
                        type: 'string',
                        menu: portMenu,
                        defaultValue: this.context.defaultPort(opcode, 'PORT'),
                        literal: true
                    }
                }
            }],
            menus: {
                [portMenu]: PORT_MENUS[portMenu]
            }
        };
    }

    // 独立模板保留原 IIC 地址及 read_value API。
    getPython (): Record<string, PythonTemplate> {
        this.adapter();
        // 板端先建立共享IIC；设备地址保留在传感器构造参数，不套用DEV.Port。
        if (this.context.variant === 'hiwonder-iic') {
            return {
                aiblocksboard_get_soil_moisture_value: {
                    imports: ['import Hiwonder_IIC'],
                    variables: ['iic = Hiwonder_IIC.IIC()',
                        'soil = Hiwonder_IIC.DEV_SOIL(iic,{PORT},0x5A)'],
                    template: 'soil.read_value()'
                }
            };
        }
        return {
            aimech_get_soil_value: {
                imports: ['import Hiwonder_DEV'],
                variables: ["soil = Hiwonder_DEV.DEV_SOIL(Hiwonder_DEV.Port({PORT},0x5A))"],
                template: "soil.read_value()"
            }
        };
    }
}
