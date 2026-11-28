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

export default class LightSensorBlocks implements NativeExtension {
    constructor (private readonly context: ExtensionContext) {}

    // 未声明的适配不能静默落到机器人DEV驱动。
    private checkAdapter (): void {
        if (!['wonderlab', 'hiwonder-iic', 'hiwonder-dev-io-aidoggy'].includes(this.context.variant)) {
            throw new Error('light-sensor: 未支持的主控适配 ' + this.context.variant);
        }
    }

    getInfo (): ExtensionInfo {
        this.checkAdapter();
        if (this.context.variant === 'hiwonder-dev-io-aidoggy') {
            return {
                id: 'sensor', name: this.context.t(product.name),
                color1: '#7B68EE', color2: '#7B68EE', color3: '#7B68EE',
                blocks: [{opcode: 'aidoggy_read_light', blockType: 'reporter',
                    text: this.context.t('block.aimech_read_light'), disableMonitor: true,
                    blockIconURI: this.context.asset('assets/light.svg'),
                    arguments: {PORT: {type: 'string', menu: 'aidoggy_io_port', literal: true,
                        defaultValue: this.context.defaultPort('aidoggy_read_light', 'PORT')}}}],
                menus: {aidoggy_io_port: {acceptReporters: false, items: this.context.ports('sensor.aidoggy_io_port')}}
            };
        }
        if (this.context.variant === 'hiwonder-iic') {
            return {
                id: 'sensor', name: this.context.t(product.name),
                color1: '#7B68EE', color2: '#7B68EE', color3: '#7B68EE',
                blocks: [{
                    opcode: 'aiblocksboard_read_light', blockType: 'reporter',
                    text: this.context.t('block.aimech_read_light'),
                    disableMonitor: true, blockIconURI: this.context.asset('assets/light.svg'),
                    arguments: {PORT: {
                        type: 'string', menu: 'aiblocks_iicport', literal: true,
                        defaultValue: this.context.defaultPort('aiblocksboard_read_light', 'PORT')
                    }}
                }],
                menus: {aiblocks_iicport: {acceptReporters: false, items: this.context.ports('sensor.aiblocks_iicport')}}
            };
        }
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
    getPython (): Record<string, PythonTemplate> {
        this.checkAdapter();
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
