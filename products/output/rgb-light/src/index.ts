import type {ExtensionContext, ExtensionInfo, NativeExtension, PythonTemplate} from '../../../../tools/sdk';

export const messages = {
    "zh-cn": {
        "product.name": "RGB 灯带",
        "block.rgb_color_set": "设置 RGB 灯带接口 [PORT] 灯 [NUMS] 红 [RED] 绿 [GREEN] 蓝 [BLUE]",
        "block.led_color_select": "设置 RGB 灯带接口 [PORT] 灯 [NUMS] 颜色 [COLOR]",
        "block.led_close": "关闭 RGB 灯带接口 [PORT] 灯 [NUMS]",
        "menu.nums.all": "全部"
    },
    "en": {
        "product.name": "RGB strip",
        "block.rgb_color_set": "Set RGB strip port [PORT] LED [NUMS] red [RED] green [GREEN] blue [BLUE]",
        "block.led_color_select": "Set RGB strip port [PORT] LED [NUMS] color [COLOR]",
        "block.led_close": "Turn off RGB strip port [PORT] LED [NUMS]",
        "menu.nums.all": "all"
    },
    "zh-tw": {
        "product.name": "RGB 燈帶",
        "block.rgb_color_set": "設定 RGB 燈帶介面 [PORT] 燈 [NUMS] 紅 [RED] 綠 [GREEN] 藍 [BLUE]",
        "block.led_color_select": "設定 RGB 燈帶介面 [PORT] 燈 [NUMS] 顏色 [COLOR]",
        "block.led_close": "關閉 RGB 燈帶介面 [PORT] 燈 [NUMS]",
        "menu.nums.all": "全部"
    },
    "ko": {
        "product.name": "RGB LED 스트립",
        "block.rgb_color_set": "RGB 스트립 포트 [PORT] LED [NUMS] 빨강 [RED] 초록 [GREEN] 파랑 [BLUE] 설정하기",
        "block.led_color_select": "RGB 스트립 포트 [PORT] LED [NUMS] 색상을 [COLOR] 로 설정하기",
        "block.led_close": "RGB 스트립 포트 [PORT] LED [NUMS] 끄기",
        "menu.nums.all": "전체"
    }
} as const;

export const product = {name: 'product.name', supportedLocales: ['zh-cn', 'en', 'zh-tw', 'ko']} as const;

export default class RgbStripBlocks implements NativeExtension {
    constructor(private readonly context: ExtensionContext) { }

    private checkAdapter(): void {
        if (this.context.variant !== 'hiwonder-port')
            throw new Error('rgb-light: 未支持的主控适配 ' + this.context.variant);
    }

    getInfo(): ExtensionInfo {
        this.checkAdapter();
        return {
            id: 'display', name: this.context.t(product.name),
            color1: '#FF6347', color2: '#FF6347', color3: '#FF6347',
            menus: {
                "nums": {
                    "items": [
                        {
                            "text": this.context.t('menu.nums.all'),
                            "value": "15"
                        },
                        {
                            "text": "1",
                            "value": "0"
                        },
                        {
                            "text": "2",
                            "value": "1"
                        },
                        {
                            "text": "3",
                            "value": "2"
                        },
                        {
                            "text": "4",
                            "value": "3"
                        },
                        {
                            "text": "5",
                            "value": "4"
                        },
                        {
                            "text": "6",
                            "value": "5"
                        },
                        {
                            "text": "7",
                            "value": "6"
                        },
                        {
                            "text": "8",
                            "value": "7"
                        },
                        {
                            "text": "9",
                            "value": "8"
                        },
                        {
                            "text": "10",
                            "value": "9"
                        },
                        {
                            "text": "11",
                            "value": "10"
                        },
                        {
                            "text": "12",
                            "value": "11"
                        },
                        {
                            "text": "13",
                            "value": "12"
                        },
                        {
                            "text": "14",
                            "value": "13"
                        },
                        {
                            "text": "15",
                            "value": "14"
                        }
                    ],
                    "acceptReporters": false
                },
                "rgbport": {
                    "items": this.context.ports('display.rgbport'),
                    "acceptReporters": false
                }
            },
            blocks: [{ subCategory: this.context.t(product.name) },
                {
                    opcode: "rgb_color_set",
                    "blockType": "command",
                    "text": this.context.t('block.rgb_color_set'),
                    "blockIconURI": this.context.asset('assets/strip.svg'),
                    "arguments": {
                        PORT: {
                            "type": "string",
                            "defaultValue": this.context.defaultPort('rgb_color_set', 'PORT'),
                            "menu": "rgbport",
                            "literal": true
                        },
                        "NUMS": {
                            "type": "string",
                            "defaultValue": "15",
                            "menu": "nums",
                            "literal": true
                        },
                        "RED": {
                            "type": "slider255",
                            "defaultValue": 255
                        },
                        "GREEN": {
                            "type": "slider255",
                            "defaultValue": 0
                        },
                        "BLUE": {
                            "type": "slider255",
                            "defaultValue": 0
                        }
                    }
                },
                {
                    opcode: "led_color_select",
                    "blockType": "command",
                    "text": this.context.t('block.led_color_select'),
                    "blockIconURI": this.context.asset('assets/strip.svg'),
                    "arguments": {
                        PORT: {
                            "type": "string",
                            "defaultValue": this.context.defaultPort('led_color_select', 'PORT'),
                            "menu": "rgbport",
                            "literal": true
                        },
                        "NUMS": {
                            "type": "string",
                            "defaultValue": "15",
                            "menu": "nums",
                            "literal": true
                        },
                        "COLOR": {
                            "type": "square_color",
                            "defaultValue": "#ff0000"
                        }
                    }
                },
                {
                    opcode: "led_close",
                    "blockType": "command",
                    "text": this.context.t('block.led_close'),
                    "blockIconURI": this.context.asset('assets/strip.svg'),
                    "arguments": {
                        PORT: {
                            "type": "string",
                            "defaultValue": this.context.defaultPort('led_close', 'PORT'),
                            "menu": "rgbport",
                            "literal": true
                        },
                        "NUMS": {
                            "type": "string",
                            "defaultValue": "15",
                            "menu": "nums",
                            "literal": true
                        }
                    }
                }
            ]
        };
    }

    getPython(): Record<string, PythonTemplate> {
        this.checkAdapter();
        return {
            "rgb_color_set": {
                "template": "myrgb_{PORT}.setItem({NUMS},{RED},{GREEN},{BLUE})\nmyrgb_{PORT}.write()",
                "templateSelector": {
                    "argument": "NUMS",
                    "cases": {
                        "15": "myrgb_{PORT}.fill({RED},{GREEN},{BLUE})\nmyrgb_{PORT}.write()"
                    }
                },
                "variables": [
                    "myrgb_{PORT} = Hiwonder.Neopixel(Hiwonder.Port({PORT}),15)"
                ]
            },
            "led_color_select": {
                "template": "myrgb_{PORT}.setItem({NUMS},{COLOR.rgb})\nmyrgb_{PORT}.write()",
                "templateSelector": {
                    "argument": "NUMS",
                    "cases": {
                        "15": "myrgb_{PORT}.fill({COLOR.rgb})\nmyrgb_{PORT}.write()"
                    }
                },
                "variables": [
                    "myrgb_{PORT} = Hiwonder.Neopixel(Hiwonder.Port({PORT}),15)"
                ]
            },
            "led_close": {
                "template": "myrgb_{PORT}.setItem({NUMS},0x00,0x00,0x00)\nmyrgb_{PORT}.write()",
                "templateSelector": {
                    "argument": "NUMS",
                    "cases": {
                        "15": "myrgb_{PORT}.clear()"
                    }
                },
                "variables": [
                    "myrgb_{PORT} = Hiwonder.Neopixel(Hiwonder.Port({PORT}),15)"
                ]
            }
        };
    }
}
