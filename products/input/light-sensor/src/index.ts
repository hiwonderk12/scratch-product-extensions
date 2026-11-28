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
    aidoggy_io_port: {
        acceptReporters: false,
        items: [
            {text: 'E', value: '5'},
            {text: 'F', value: '6'}
        ]
    },
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

export default class LightSensorBlocks implements NativeExtension {
    constructor (private readonly context: ExtensionContext) {}

    // 未声明的适配不能静默落到机器人DEV驱动。
    private adapter (): {opcode: string; portMenu: string} {
        if (this.context.variant === 'hiwonder-dev-io-aidoggy') {
            return {opcode: 'aidoggy_read_light', portMenu: 'aidoggy_io_port'};
        }
        if (this.context.variant === 'hiwonder-iic') {
            return {opcode: 'aiblocksboard_read_light', portMenu: 'aiblocks_iicport'};
        }
        if (this.context.variant === 'wonderlab') {
            return {opcode: 'aimech_read_light', portMenu: 'aimech_iicport'};
        }
        throw new Error('light-sensor: 未支持的主控适配 ' + this.context.variant);
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
                text: this.context.t('block.aimech_read_light'),
                disableMonitor: true,
                blockIconURI: this.context.asset('assets/light.svg'),
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

    // 生成规则按设备 SDK 初始化与取值，只在用到该积木时收集依赖。
    getPython (): Record<string, PythonTemplate> {
        this.adapter();
        // IO读取按端口创建独立对象，E／F同时使用不会互相覆盖。
        if (this.context.variant === 'hiwonder-dev-io-aidoggy') {
            return {aidoggy_read_light: {
                imports: ['import Hiwonder_DEV'],
                variables: ['light_{PORT} = Hiwonder_DEV.DEV_LIGHT_IO(Hiwonder_DEV.Port({PORT}))'],
                template: 'light_{PORT}.read()'
            }};
        }
        // 板端先建立共享IIC；设备地址保留在传感器构造参数，不套用DEV.Port。
        if (this.context.variant === 'hiwonder-iic') {
            return {
                aiblocksboard_read_light: {
                    imports: ['import Hiwonder_IIC'],
                    variables: ['iic = Hiwonder_IIC.IIC()',
                        'light = Hiwonder_IIC.DEV_LIGHT(iic,{PORT})'],
                    template: 'light.read_value()'
                }
            };
        }
        return {
            aimech_read_light: {
                imports: ['import Hiwonder_DEV'],
                variables: ["light = Hiwonder_DEV.DEV_LIGHT(Hiwonder_DEV.Port({PORT}))"],
                template: "light.read_value()"
            }
        };
    }
}
