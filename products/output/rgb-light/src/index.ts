import type {ExtensionContext, ExtensionInfo, NativeExtension, PythonTemplate} from '../../../../tools/sdk';

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
                    acceptReporters: false,
                    items: [
                        {text: '3', value: '3'},
                        {text: '8', value: '8'}
                    ]
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
