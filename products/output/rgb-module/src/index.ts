import type {ExtensionContext, ExtensionInfo, NativeExtension} from '../../../../tools/sdk';

// 模块积木、菜单、集中四语文案和 Python 规则只在本文件维护。
export const messages = {
    "zh-cn": {
        "product.name": "RGB模块",
        "block.aimech_rgb_module_color_set": "设置RGB模块接口 [PORT] 红色值 [RED] 绿色值 [GREEN] 蓝色值 [BLUE]",
        "block.aimech_rgb_module_color_select": "设置RGB模块接口 [PORT] 颜色 [COLOR]",
        "block.aimech_rgb_module_breath_one": "设置RGB模块接口 [PORT] 呼吸灯模式,颜色 [COLOR] 变化周期(0.5~20) [CYCLE] 秒",
        "block.aimech_rgb_module_breath": "设置RGB模块接口 [PORT] 炫彩模式",
        "block.aimech_rgb_module_close": "关闭RGB模块接口 [PORT] 灯",
        "menu.light_colors.0": "红",
        "menu.light_colors.1": "绿",
        "menu.light_colors.2": "蓝",
        "menu.light_colors.3": "黄",
        "menu.light_colors.4": "紫",
        "menu.light_colors.5": "青",
        "menu.light_colors.6": "白"
    },
    en: {
        "product.name": "RGB module",
        "block.aimech_rgb_module_color_set": "Set RGB module on port [PORT] red [RED] green [GREEN] blue [BLUE]",
        "block.aimech_rgb_module_color_select": "Set RGB module on port [PORT] color [COLOR]",
        "block.aimech_rgb_module_breath_one": "Set RGB module on port [PORT] breathing color [COLOR] cycle (0.5~20) [CYCLE] seconds",
        "block.aimech_rgb_module_breath": "Set RGB module on port [PORT] rainbow mode",
        "block.aimech_rgb_module_close": "Turn off RGB module on port [PORT]",
        "menu.light_colors.0": "Red",
        "menu.light_colors.1": "Green",
        "menu.light_colors.2": "Blue",
        "menu.light_colors.3": "Yellow",
        "menu.light_colors.4": "Purple",
        "menu.light_colors.5": "Cyan",
        "menu.light_colors.6": "White"
    },
    "zh-tw": {
        "product.name": "RGB模組",
        "block.aimech_rgb_module_color_set": "設定RGB模組介面 [PORT] 紅色值 [RED] 綠色值 [GREEN] 藍色值 [BLUE]",
        "block.aimech_rgb_module_color_select": "設定RGB模組介面 [PORT] 顏色 [COLOR]",
        "block.aimech_rgb_module_breath_one": "設定RGB模組介面 [PORT] 呼吸燈模式，顏色 [COLOR] 變化週期（0.5~20）[CYCLE] 秒",
        "block.aimech_rgb_module_breath": "設定RGB模組介面 [PORT] 炫彩模式",
        "block.aimech_rgb_module_close": "關閉RGB模組介面 [PORT] 燈",
        "menu.light_colors.0": "紅",
        "menu.light_colors.1": "綠",
        "menu.light_colors.2": "藍",
        "menu.light_colors.3": "黃",
        "menu.light_colors.4": "紫",
        "menu.light_colors.5": "青",
        "menu.light_colors.6": "白"
    },
    ko: {
        "product.name": "RGB 모듈",
        "block.aimech_rgb_module_color_set": "포트 [PORT] RGB 모듈 빨강 [RED] 초록 [GREEN] 파랑 [BLUE] 설정",
        "block.aimech_rgb_module_color_select": "포트 [PORT] RGB 모듈 색상 [COLOR] 설정",
        "block.aimech_rgb_module_breath_one": "포트 [PORT] RGB 모듈 숨쉬기 모드 색상 [COLOR] 주기(0.5~20) [CYCLE] 초 설정",
        "block.aimech_rgb_module_breath": "포트 [PORT] RGB 모듈 무지개 모드 설정",
        "block.aimech_rgb_module_close": "포트 [PORT] RGB 모듈 끄기",
        "menu.light_colors.0": "빨강",
        "menu.light_colors.1": "초록",
        "menu.light_colors.2": "파랑",
        "menu.light_colors.3": "노랑",
        "menu.light_colors.4": "보라",
        "menu.light_colors.5": "청록",
        "menu.light_colors.6": "하양"
    }
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
                    items: this.context.ports('display.aimech_iicport'),
                    acceptReporters: false
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
