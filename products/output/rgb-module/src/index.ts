import type {ExtensionContext, ExtensionInfo, NativeExtension} from '../../../../tools/sdk';

// 模块积木、菜单、集中四语文案和 Python 规则只在本文件维护。
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

export default class RgbModuleBlocks implements NativeExtension {
    constructor (private readonly context: ExtensionContext) {}

    getInfo (): ExtensionInfo {
        return {
            id: "display",
            name: this.context.t(product.name),
            color1: "#FF6347",
            color2: "#FF6347",
            color3: "#FF6347",
            menus: {
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
                },
                light_colors: {
                    items: [
                        {
                            text: this.context.t('menu.light_colors.0'),
                            value: "0"
                        },
                        {
                            text: this.context.t('menu.light_colors.1'),
                            value: "1"
                        },
                        {
                            text: this.context.t('menu.light_colors.2'),
                            value: "2"
                        },
                        {
                            text: this.context.t('menu.light_colors.3'),
                            value: "3"
                        },
                        {
                            text: this.context.t('menu.light_colors.4'),
                            value: "4"
                        },
                        {
                            text: this.context.t('menu.light_colors.5'),
                            value: "5"
                        },
                        {
                            text: this.context.t('menu.light_colors.6'),
                            value: "6"
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
                    opcode: "aimech_rgb_module_color_set",
                    blockType: "command",
                    text: this.context.t('block.aimech_rgb_module_color_set'),
                    blockIconURI: this.context.asset('assets/rgb.svg'),
                    arguments: {
                        PORT: {
                            type: "string",
                            defaultValue: this.context.defaultPort('aimech_rgb_module_color_set', 'PORT'),
                            menu: "aimech_iicport",
                            literal: true
                        },
                        RED: {
                            type: "slider255",
                            defaultValue: 255
                        },
                        GREEN: {
                            type: "slider255",
                            defaultValue: 0
                        },
                        BLUE: {
                            type: "slider255",
                            defaultValue: 0
                        }
                    }
                },
                {
                    opcode: "aimech_rgb_module_color_select",
                    blockType: "command",
                    text: this.context.t('block.aimech_rgb_module_color_select'),
                    blockIconURI: this.context.asset('assets/rgb.svg'),
                    arguments: {
                        PORT: {
                            type: "string",
                            defaultValue: this.context.defaultPort('aimech_rgb_module_color_select', 'PORT'),
                            menu: "aimech_iicport",
                            literal: true
                        },
                        COLOR: {
                            type: "square_color",
                            defaultValue: "#ff0000"
                        }
                    }
                },
                {
                    opcode: "aimech_rgb_module_breath_one",
                    blockType: "command",
                    text: this.context.t('block.aimech_rgb_module_breath_one'),
                    blockIconURI: this.context.asset('assets/rgb.svg'),
                    arguments: {
                        PORT: {
                            type: "string",
                            defaultValue: this.context.defaultPort('aimech_rgb_module_breath_one', 'PORT'),
                            menu: "aimech_iicport",
                            literal: true
                        },
                        COLOR: {
                            type: "string",
                            defaultValue: "0",
                            menu: "light_colors",
                            literal: true
                        },
                        CYCLE: {
                            type: "number",
                            defaultValue: 1
                        }
                    }
                },
                {
                    opcode: "aimech_rgb_module_breath",
                    blockType: "command",
                    text: this.context.t('block.aimech_rgb_module_breath'),
                    blockIconURI: this.context.asset('assets/rgb.svg'),
                    arguments: {
                        PORT: {
                            type: "string",
                            defaultValue: this.context.defaultPort('aimech_rgb_module_breath', 'PORT'),
                            menu: "aimech_iicport",
                            literal: true
                        }
                    }
                },
                {
                    opcode: "aimech_rgb_module_close",
                    blockType: "command",
                    text: this.context.t('block.aimech_rgb_module_close'),
                    blockIconURI: this.context.asset('assets/rgb.svg'),
                    arguments: {
                        PORT: {
                            type: "string",
                            defaultValue: this.context.defaultPort('aimech_rgb_module_close', 'PORT'),
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
            aimech_rgb_module_color_set: {
                template: "rgbModule_{PORT}.set_rgb({RED},{GREEN},{BLUE})",
                imports: [
                    "import Hiwonder_DEV"
                ],
                variables: [
                    "rgbModule_{PORT} = Hiwonder_DEV.DEV_RGB(Hiwonder_DEV.Port({PORT}))"
                ]
            },
            aimech_rgb_module_color_select: {
                template: "rgbModule_{PORT}.set_rgb({COLOR.rgb})",
                imports: [
                    "import Hiwonder_DEV"
                ],
                variables: [
                    "rgbModule_{PORT} = Hiwonder_DEV.DEV_RGB(Hiwonder_DEV.Port({PORT}))"
                ]
            },
            aimech_rgb_module_breath_one: {
                template: "rgbModule_{PORT}.set_Breathing({COLOR},{CYCLE})",
                imports: [
                    "import Hiwonder_DEV"
                ],
                variables: [
                    "rgbModule_{PORT} = Hiwonder_DEV.DEV_RGB(Hiwonder_DEV.Port({PORT}))"
                ]
            },
            aimech_rgb_module_breath: {
                template: "rgbModule_{PORT}.setRGBBreathingValue(5,10,15,40)",
                imports: [
                    "import Hiwonder_DEV"
                ],
                variables: [
                    "rgbModule_{PORT} = Hiwonder_DEV.DEV_RGB(Hiwonder_DEV.Port({PORT}))"
                ]
            },
            aimech_rgb_module_close: {
                template: "rgbModule_{PORT}.set_rgb(0, 0, 0)",
                imports: [
                    "import Hiwonder_DEV"
                ],
                variables: [
                    "rgbModule_{PORT} = Hiwonder_DEV.DEV_RGB(Hiwonder_DEV.Port({PORT}))"
                ]
            }
        };
    }
}
