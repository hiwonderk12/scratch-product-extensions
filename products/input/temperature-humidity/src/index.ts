import type {ExtensionContext, ExtensionInfo, NativeExtension, PythonTemplate} from '../../../../tools/sdk';

// 本模块在同一入口维护积木、菜单、集中四语和 Python 生成规则。
import locale0 from './locales/zh-cn.json';
import locale1 from './locales/en.json';
import locale2 from './locales/zh-tw.json';
import locale3 from './locales/ko.json';

export const messages = {
    "zh-cn": locale0,
    en: locale1,
    "zh-tw": locale2,
    ko: locale3
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

export default class TemperatureHumidityBlocks implements NativeExtension {
    constructor (private readonly context: ExtensionContext) {}

    // 驱动由库配置选择；拒绝未知适配，避免仅更换端口却调用错误 SDK。
    private adapter (): {opcode: string; portMenu: string; board: boolean} {
        if (this.context.variant === 'hiwonder-iic') {
            return {opcode: 'aiblocksboard_temphumi_init', portMenu: 'aiblocks_iicport', board: true};
        }
        if (['hiwonder-dev-port', 'hiwonder-dev-port-aidoggy'].includes(this.context.variant)) {
            return {opcode: 'aimech_temphumi_init',
                portMenu: this.context.variant === 'hiwonder-dev-port-aidoggy' ? 'aidoggy_iicport' : 'aimech_iicport',
                board: false};
        }
        throw new Error('input/temperature-humidity: 未知适配 ' + this.context.variant);
    }

    getInfo (): ExtensionInfo {
        const {opcode, portMenu} = this.adapter();
        return {
            id: "sensor",
            name: this.context.t(product.name),
            color1: "#7B68EE",
            color2: "#7B68EE",
            color3: "#7B68EE",
            menus: {
                [portMenu]: {
                    items: this.context.ports('sensor.' + portMenu),
                    acceptReporters: false
                },
                ...(portMenu === 'aidoggy_iicport' ? {aimech_iicport: {
                    items: this.context.ports('sensor.aimech_iicport'), acceptReporters: false
                }} : {}),
                temphumi: {
                    items: [
                        {
                            text: this.context.t('menu.temphumi.0'),
                            value: "0"
                        },
                        {
                            text: this.context.t('menu.temphumi.1'),
                            value: "1"
                        }
                    ],
                    acceptReporters: false
                }
            },
            blocks: [
                {
                    subCategory: this.context.t(product.name)
                },
                {
                    opcode,
                    blockType: "command",
                    text: this.context.t('block.aimech_temphumi_init'),
                    arguments: {
                        PORT: {
                            type: "string",
                            defaultValue: this.context.defaultPort(opcode, 'PORT'),
                            menu: portMenu,
                            literal: true
                        }
                    },
                    blockIconURI: this.context.asset('assets/temphumi.svg')
                },
                {
                    opcode: "aimech_get_temp_and_humi",
                    blockType: "reporter",
                    disableMonitor: true,
                    text: this.context.t('block.aimech_get_temp_and_humi'),
                    arguments: {},
                    blockIconURI: this.context.asset('assets/temphumi.svg')
                },
                {
                    opcode: "aimech_get_temp_or_humi",
                    blockType: "reporter",
                    disableMonitor: true,
                    text: this.context.t('block.aimech_get_temp_or_humi'),
                    arguments: {
                        TEMPHUMI: {
                            type: "string",
                            defaultValue: "0",
                            menu: "temphumi",
                            literal: true
                        }
                    },
                    blockIconURI: this.context.asset('assets/temphumi.svg')
                }
            ]
        };
    }

    // 初始化只由初始化积木收集；读取和控制不隐式补默认端口。
    getPython (): Record<string, PythonTemplate> {
        const {opcode, board} = this.adapter();
        return {
            [opcode]: {
                template: "",
                imports: [board ? 'import Hiwonder_IIC' : 'import Hiwonder_DEV'],
                // 板端与其他IIC输入共用总线，机器人保持DEV端口对象和原初始化身份。
                variables: board ? ['iic = Hiwonder_IIC.IIC()', 'temphumi = Hiwonder_IIC.DEV_TH(iic,{PORT})'] :
                    ['temphumi = Hiwonder_DEV.DEV_TH(Hiwonder_DEV.Port({PORT}))']
            },
            aimech_get_temp_and_humi: {
                template: "temphumi.read_Temp_Humi()"
            },
            aimech_get_temp_or_humi: {
                template: "temphumi.read_Temp_Humi()[{TEMPHUMI}]"
            }
        };
    }
}
