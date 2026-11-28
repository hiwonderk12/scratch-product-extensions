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

export default class ColorSensorBlocks implements NativeExtension {
    constructor (private readonly context: ExtensionContext) {}

    // 驱动由库配置选择；拒绝未知适配，避免仅更换端口却调用错误 SDK。
    private adapter (): {opcode: string; menu: string; board: boolean} {
        if (this.context.variant === 'hiwonder-iic') {
            return {opcode: 'aiblocks_colorsensor_init', menu: 'aiblocks_iicport', board: true};
        }
        if (this.context.variant === 'hiwonder-dev-port') {
            return {opcode: 'aimech_colorsensor_init', menu: 'aimech_iicport', board: false};
        }
        if (this.context.variant === 'hiwonder-dev-port-aidoggy') {
            return {opcode: 'aidoggy_colorsensor_init', menu: 'aidoggy_iicport', board: false};
        }
        throw new Error('input/color-sensor: 未知适配 ' + this.context.variant);
    }

    getInfo (): ExtensionInfo {
        const {opcode, menu} = this.adapter();
        return {
            id: "sensor",
            name: this.context.t(product.name),
            color1: "#7B68EE",
            color2: "#7B68EE",
            color3: "#7B68EE",
            menus: {
                aiblocks_colors: {
                    items: [
                        {
                            text: this.context.t('menu.aiblocks_colors.0'),
                            value: "1"
                        },
                        {
                            text: this.context.t('menu.aiblocks_colors.1'),
                            value: "2"
                        },
                        {
                            text: this.context.t('menu.aiblocks_colors.2'),
                            value: "3"
                        }
                    ],
                    acceptReporters: false
                },
                aiblocks_colors2: {
                    items: [
                        {
                            text: this.context.t('menu.aiblocks_colors2.0'),
                            value: "0"
                        },
                        {
                            text: this.context.t('menu.aiblocks_colors2.1'),
                            value: "1"
                        },
                        {
                            text: this.context.t('menu.aiblocks_colors2.2'),
                            value: "2"
                        }
                    ],
                    acceptReporters: false
                },
                [menu]: {
                    items: this.context.ports('sensor.' + menu),
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
                    text: this.context.t('block.aimech_colorsensor_init'),
                    arguments: {
                        PORT: {
                            type: "string",
                            defaultValue: this.context.defaultPort(opcode, 'PORT'),
                            menu,
                            literal: true
                        }
                    },
                    blockIconURI: this.context.asset('assets/color.svg')
                },
                {
                    opcode: "aiblocks_check_color",
                    blockType: "Boolean",
                    disableMonitor: true,
                    text: this.context.t('block.aiblocks_check_color'),
                    arguments: {
                        COLOR: {
                            type: "string",
                            defaultValue: "1",
                            menu: "aiblocks_colors",
                            literal: true
                        }
                    },
                    blockIconURI: this.context.asset('assets/color.svg')
                },
                {
                    opcode: "aiblocks_get_color",
                    blockType: "reporter",
                    disableMonitor: true,
                    text: this.context.t('block.aiblocks_get_color'),
                    arguments: {},
                    blockIconURI: this.context.asset('assets/color.svg')
                },
                {
                    opcode: "aiblocks_get_color_arg",
                    blockType: "reporter",
                    disableMonitor: true,
                    text: this.context.t('block.aiblocks_get_color_arg'),
                    arguments: {
                        NUM: {
                            type: "number",
                            defaultValue: 0
                        },
                        COLOR: {
                            type: "string",
                            defaultValue: "0",
                            menu: "aiblocks_colors2",
                            literal: true
                        }
                    },
                    blockIconURI: this.context.asset('assets/color.svg')
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
                // 板端与其他IIC输入共享总线；机器人通过各自端口对象初始化。
                variables: board ? ['iic = Hiwonder_IIC.IIC()',
                    'color = Hiwonder_IIC.COLOR_RECOGNIZE_module(iic,{PORT})'] :
                    ['color = Hiwonder_DEV.DEV_COLOR_RECOGNIZE(Hiwonder_DEV.Port({PORT}))']
            },
            aiblocks_check_color: {
                template: "color.get_color_name() == {COLOR}"
            },
            aiblocks_get_color: {
                template: "color.get_color_data()"
            },
            aiblocks_get_color_arg: {
                template: "{NUM}[{COLOR}]"
            }
        };
    }
}
