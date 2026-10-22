import type {ExtensionContext, ExtensionInfo, NativeExtension, PythonTemplate} from '../../../../tools/sdk';

export const messages = {
    "zh-cn": {
        "product.name": "点阵屏",
        "block.brightness": "设置点阵屏接口 [PORT] 亮度 [BRIGHT] (1-8)",
        "block.number": "点阵屏接口 [PORT] 显示数字 [DATA]",
        "block.text": "点阵屏接口 [PORT] 位置 x [XPOS] y [YPOS] 显示字符串 [STR] [SCROLL]",
        "block.pixel": "点阵屏接口 [PORT] 位置 x [XPOS] y [YPOS] [LEDSTATUS]",
        "block.bitmap": "点阵屏接口 [PORT] 绘制 [MATRIX]",
        "block.clear": "点阵屏接口 [PORT] 清空显示",
        "menu.pixel.on": "点亮",
        "menu.pixel.off": "熄灭",
        "menu.scroll.no": "不滚动",
        "menu.scroll.yes": "滚动"
    },
    "en": {
        "product.name": "LED matrix",
        "block.brightness": "Set LED matrix port [PORT] brightness [BRIGHT] (1-8)",
        "block.number": "LED matrix port [PORT] show number [DATA]",
        "block.text": "LED matrix port [PORT] at x [XPOS] y [YPOS] show text [STR] [SCROLL]",
        "block.pixel": "LED matrix port [PORT] pixel x [XPOS] y [YPOS] [LEDSTATUS]",
        "block.bitmap": "LED matrix port [PORT] draw [MATRIX]",
        "block.clear": "LED matrix port [PORT] clear display",
        "menu.pixel.on": "on",
        "menu.pixel.off": "off",
        "menu.scroll.no": "no scrolling",
        "menu.scroll.yes": "scroll"
    },
    "zh-tw": {
        "product.name": "點陣屏",
        "block.brightness": "設定點陣屏介面 [PORT] 亮度 [BRIGHT] (1-8)",
        "block.number": "點陣屏介面 [PORT] 顯示數字 [DATA]",
        "block.text": "點陣屏介面 [PORT] 位置 x [XPOS] y [YPOS] 顯示字串 [STR] [SCROLL]",
        "block.pixel": "點陣屏介面 [PORT] 位置 x [XPOS] y [YPOS] [LEDSTATUS]",
        "block.bitmap": "點陣屏介面 [PORT] 繪製 [MATRIX]",
        "block.clear": "點陣屏介面 [PORT] 清空顯示",
        "menu.pixel.on": "點亮",
        "menu.pixel.off": "熄滅",
        "menu.scroll.no": "不捲動",
        "menu.scroll.yes": "捲動"
    },
    "ko": {
        "product.name": "LED 매트릭스",
        "block.brightness": "LED 매트릭스 포트 [PORT] 밝기를 [BRIGHT] (1-8) 로 설정하기",
        "block.number": "LED 매트릭스 포트 [PORT] 에 숫자 [DATA] 표시하기",
        "block.text": "LED 매트릭스 포트 [PORT] x [XPOS] y [YPOS] 에 텍스트 [STR] 표시하기 [SCROLL]",
        "block.pixel": "LED 매트릭스 포트 [PORT] x [XPOS] y [YPOS] 픽셀 [LEDSTATUS]",
        "block.bitmap": "LED 매트릭스 포트 [PORT] 에 [MATRIX] 그리기",
        "block.clear": "LED 매트릭스 포트 [PORT] 화면 지우기",
        "menu.pixel.on": "켜기",
        "menu.pixel.off": "끄기",
        "menu.scroll.no": "스크롤 안 함",
        "menu.scroll.yes": "스크롤"
    }
} as const;

export const product = {name: 'product.name', supportedLocales: ['zh-cn', 'en', 'zh-tw', 'ko']} as const;

export default class DotMatrixBlocks implements NativeExtension {
    constructor(private readonly context: ExtensionContext) { }

    private adapter() {
        switch (this.context.variant) {
            case 'hiwonder-dev-port': return { usesIic: false, portMenu: 'aiblocks_iicport' };
            case 'hiwonder-dev-port-aidoggy': return { usesIic: false, portMenu: 'aidoggy_iicport' };
            case 'hiwonder-iic': return { usesIic: true, portMenu: 'aiblocks_iicport' };
            default: throw new Error('dot-matrix: 未支持的主控适配 ' + this.context.variant);
        }
    }

    getInfo(): ExtensionInfo {
        const { usesIic, portMenu } = this.adapter();
        const blocks: ExtensionInfo['blocks'] = usesIic ? [
            {
                opcode: "aiblocksboard_matrixLed_brightness",
                "blockType": "command",
                "text": this.context.t('block.brightness'),
                "blockIconURI": this.context.asset('assets/dot.svg'),
                "arguments": {
                    PORT: {
                        "type": "string",
                        "defaultValue": this.context.defaultPort('aiblocksboard_matrixLed_brightness', 'PORT'),
                        "menu": portMenu,
                        "literal": true
                    },
                    "BRIGHT": {
                        "type": "slider8",
                        "defaultValue": 8
                    }
                }
            },
            {
                opcode: "aiblocksboard_matrixLed_show_num",
                "blockType": "command",
                "text": this.context.t('block.number'),
                "blockIconURI": this.context.asset('assets/dot.svg'),
                "arguments": {
                    PORT: {
                        "type": "string",
                        "defaultValue": this.context.defaultPort('aiblocksboard_matrixLed_show_num', 'PORT'),
                        "menu": portMenu,
                        "literal": true
                    },
                    "DATA": {
                        "type": "number",
                        "defaultValue": 0
                    }
                }
            },
            {
                opcode: "aiblocksboard_matrixLed_show_str",
                "blockType": "command",
                "text": this.context.t('block.text'),
                "blockIconURI": this.context.asset('assets/dot.svg'),
                "arguments": {
                    PORT: {
                        "type": "string",
                        "defaultValue": this.context.defaultPort('aiblocksboard_matrixLed_show_str', 'PORT'),
                        "menu": portMenu,
                        "literal": true
                    },
                    "XPOS": {
                        "type": "number",
                        "defaultValue": 0
                    },
                    "YPOS": {
                        "type": "number",
                        "defaultValue": 0
                    },
                    "STR": {
                        "type": "string",
                        "defaultValue": "Hi"
                    },
                    "SCROLL": {
                        "type": "string",
                        "defaultValue": "False",
                        "menu": "scroll",
                        "literal": true
                    }
                }
            },
            {
                opcode: "aiblocksboard_matrixLed_pos_onoff",
                "blockType": "command",
                "text": this.context.t('block.pixel'),
                "blockIconURI": this.context.asset('assets/dot.svg'),
                "arguments": {
                    PORT: {
                        "type": "string",
                        "defaultValue": this.context.defaultPort('aiblocksboard_matrixLed_pos_onoff', 'PORT'),
                        "menu": portMenu,
                        "literal": true
                    },
                    "XPOS": {
                        "type": "number",
                        "defaultValue": 0
                    },
                    "YPOS": {
                        "type": "number",
                        "defaultValue": 0
                    },
                    "LEDSTATUS": {
                        "type": "string",
                        "defaultValue": "1",
                        "menu": "ledstatus",
                        "literal": true
                    }
                }
            },
            {
                opcode: "aiblocksboard_matrix_led",
                "blockType": "command",
                "text": this.context.t('block.bitmap'),
                "blockIconURI": this.context.asset('assets/dot.svg'),
                "arguments": {
                    PORT: {
                        "type": "string",
                        "defaultValue": this.context.defaultPort('aiblocksboard_matrix_led', 'PORT'),
                        "menu": portMenu,
                        "literal": true
                    },
                    "MATRIX": {
                        "type": "led_matrix",
                        "defaultValue": "11111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111"
                    }
                }
            },
            {
                opcode: "aiblocksboard_clear_matrix_led",
                "blockType": "command",
                "text": this.context.t('block.clear'),
                "blockIconURI": this.context.asset('assets/dot.svg'),
                "arguments": {
                    PORT: {
                        "type": "string",
                        "defaultValue": this.context.defaultPort('aiblocksboard_clear_matrix_led', 'PORT'),
                        "menu": portMenu,
                        "literal": true
                    }
                }
            }
        ] : [
            {
                opcode: "aimech_matrixLed_brightness",
                "blockType": "command",
                "text": this.context.t('block.brightness'),
                "blockIconURI": this.context.asset('assets/dot.svg'),
                "arguments": {
                    PORT: {
                        "type": "string",
                        "defaultValue": this.context.defaultPort('aimech_matrixLed_brightness', 'PORT'),
                        "menu": portMenu,
                        "literal": true
                    },
                    "BRIGHT": {
                        "type": "slider8",
                        "defaultValue": 8
                    }
                }
            },
            {
                opcode: "aimech_matrixLed_show_num",
                "blockType": "command",
                "text": this.context.t('block.number'),
                "blockIconURI": this.context.asset('assets/dot.svg'),
                "arguments": {
                    PORT: {
                        "type": "string",
                        "defaultValue": this.context.defaultPort('aimech_matrixLed_show_num', 'PORT'),
                        "menu": portMenu,
                        "literal": true
                    },
                    "DATA": {
                        "type": "number",
                        "defaultValue": 0
                    }
                }
            },
            {
                opcode: "aimech_matrixLed_show_str",
                "blockType": "command",
                "text": this.context.t('block.text'),
                "blockIconURI": this.context.asset('assets/dot.svg'),
                "arguments": {
                    PORT: {
                        "type": "string",
                        "defaultValue": this.context.defaultPort('aimech_matrixLed_show_str', 'PORT'),
                        "menu": portMenu,
                        "literal": true
                    },
                    "XPOS": {
                        "type": "number",
                        "defaultValue": 0
                    },
                    "YPOS": {
                        "type": "number",
                        "defaultValue": 0
                    },
                    "STR": {
                        "type": "string",
                        "defaultValue": "Hi"
                    },
                    "SCROLL": {
                        "type": "string",
                        "defaultValue": "False",
                        "menu": "scroll",
                        "literal": true
                    }
                }
            },
            {
                opcode: "aimech_matrixLed_pos_onoff",
                "blockType": "command",
                "text": this.context.t('block.pixel'),
                "blockIconURI": this.context.asset('assets/dot.svg'),
                "arguments": {
                    PORT: {
                        "type": "string",
                        "defaultValue": this.context.defaultPort('aimech_matrixLed_pos_onoff', 'PORT'),
                        "menu": portMenu,
                        "literal": true
                    },
                    "XPOS": {
                        "type": "number",
                        "defaultValue": 0
                    },
                    "YPOS": {
                        "type": "number",
                        "defaultValue": 0
                    },
                    "LEDSTATUS": {
                        "type": "string",
                        "defaultValue": "1",
                        "menu": "ledstatus",
                        "literal": true
                    }
                }
            },
            {
                opcode: "aimech_matrix_led",
                "blockType": "command",
                "text": this.context.t('block.bitmap'),
                "blockIconURI": this.context.asset('assets/dot.svg'),
                "arguments": {
                    PORT: {
                        "type": "string",
                        "defaultValue": this.context.defaultPort('aimech_matrix_led', 'PORT'),
                        "menu": portMenu,
                        "literal": true
                    },
                    "MATRIX": {
                        "type": "led_matrix",
                        "defaultValue": "11111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111"
                    }
                }
            },
            {
                opcode: "aimech_clear_matrix_led",
                "blockType": "command",
                "text": this.context.t('block.clear'),
                "blockIconURI": this.context.asset('assets/dot.svg'),
                "arguments": {
                    PORT: {
                        "type": "string",
                        "defaultValue": this.context.defaultPort('aimech_clear_matrix_led', 'PORT'),
                        "menu": portMenu,
                        "literal": true
                    }
                }
            }
        ];
        return {
            id: 'display', name: this.context.t(product.name),
            color1: '#FF6347', color2: '#FF6347', color3: '#FF6347',
            menus: {
                [portMenu]: {
                    "items": this.context.ports('display.' + portMenu),
                    "acceptReporters": false
                },
                "ledstatus": {
                    "items": [
                        {
                            "text": this.context.t('menu.pixel.on'),
                            "value": "1"
                        },
                        {
                            "text": this.context.t('menu.pixel.off'),
                            "value": "0"
                        }
                    ],
                    "acceptReporters": false
                },
                "scroll": {
                    "items": [
                        {
                            "text": this.context.t('menu.scroll.no'),
                            "value": "False"
                        },
                        {
                            "text": this.context.t('menu.scroll.yes'),
                            "value": "True"
                        }
                    ],
                    "acceptReporters": false
                }
            },
            blocks: [{ subCategory: this.context.t(product.name) }, ...blocks]
        };
    }

    getPython(): Record<string, PythonTemplate> {
        const { usesIic } = this.adapter();
        return usesIic ? {
            "aiblocksboard_matrixLed_brightness": {
                "template": "matrix_{PORT}.setBrightness({BRIGHT})",
                "imports": [
                    "import Hiwonder_IIC"
                ],
                "variables": [
                    "iic = Hiwonder_IIC.IIC()",
                    "matrix_{PORT} = Hiwonder_IIC.DEV_LEDMatrix(iic,{PORT})"
                ]
            },
            "aiblocksboard_matrixLed_show_num": {
                "template": "matrix_{PORT}.showNum({DATA})",
                "imports": [
                    "import Hiwonder_IIC"
                ],
                "variables": [
                    "iic = Hiwonder_IIC.IIC()",
                    "matrix_{PORT} = Hiwonder_IIC.DEV_LEDMatrix(iic,{PORT})"
                ]
            },
            "aiblocksboard_matrixLed_show_str": {
                "template": "matrix_{PORT}.drawStr({XPOS},{YPOS},{STR},{SCROLL})",
                "imports": [
                    "import Hiwonder_IIC"
                ],
                "variables": [
                    "iic = Hiwonder_IIC.IIC()",
                    "matrix_{PORT} = Hiwonder_IIC.DEV_LEDMatrix(iic,{PORT})"
                ]
            },
            "aiblocksboard_matrixLed_pos_onoff": {
                "template": "matrix_{PORT}.setLedOnOff({XPOS},{YPOS},{LEDSTATUS})",
                "imports": [
                    "import Hiwonder_IIC"
                ],
                "variables": [
                    "iic = Hiwonder_IIC.IIC()",
                    "matrix_{PORT} = Hiwonder_IIC.DEV_LEDMatrix(iic,{PORT})"
                ]
            },
            "aiblocksboard_matrix_led": {
                "template": "matrix_{PORT}.drawBitMap(({MATRIX.bitmap}))",
                "imports": [
                    "import Hiwonder_IIC"
                ],
                "variables": [
                    "iic = Hiwonder_IIC.IIC()",
                    "matrix_{PORT} = Hiwonder_IIC.DEV_LEDMatrix(iic,{PORT})"
                ]
            },
            "aiblocksboard_clear_matrix_led": {
                "template": "matrix_{PORT}.clear()",
                "imports": [
                    "import Hiwonder_IIC"
                ],
                "variables": [
                    "iic = Hiwonder_IIC.IIC()",
                    "matrix_{PORT} = Hiwonder_IIC.DEV_LEDMatrix(iic,{PORT})"
                ]
            }
        } : {
            "aimech_matrixLed_brightness": {
                "template": "ledMatrix_{PORT}.setBrightness({BRIGHT})",
                "imports": [
                    "import Hiwonder_DEV"
                ],
                "variables": [
                    "ledMatrix_{PORT} = Hiwonder_DEV.DEV_LEDMatrix(Hiwonder_DEV.Port({PORT}))"
                ]
            },
            "aimech_matrixLed_show_num": {
                "template": "ledMatrix_{PORT}.showNum({DATA})",
                "imports": [
                    "import Hiwonder_DEV"
                ],
                "variables": [
                    "ledMatrix_{PORT} = Hiwonder_DEV.DEV_LEDMatrix(Hiwonder_DEV.Port({PORT}))"
                ]
            },
            "aimech_matrixLed_show_str": {
                "template": "ledMatrix_{PORT}.drawStr({XPOS},{YPOS},{STR},{SCROLL})",
                "imports": [
                    "import Hiwonder_DEV"
                ],
                "variables": [
                    "ledMatrix_{PORT} = Hiwonder_DEV.DEV_LEDMatrix(Hiwonder_DEV.Port({PORT}))"
                ]
            },
            "aimech_matrixLed_pos_onoff": {
                "template": "ledMatrix_{PORT}.setLedOnOff({XPOS},{YPOS},{LEDSTATUS})",
                "imports": [
                    "import Hiwonder_DEV"
                ],
                "variables": [
                    "ledMatrix_{PORT} = Hiwonder_DEV.DEV_LEDMatrix(Hiwonder_DEV.Port({PORT}))"
                ]
            },
            "aimech_matrix_led": {
                "template": "ledMatrix_{PORT}.drawBitMap(({MATRIX.bitmap}))",
                "imports": [
                    "import Hiwonder_DEV"
                ],
                "variables": [
                    "ledMatrix_{PORT} = Hiwonder_DEV.DEV_LEDMatrix(Hiwonder_DEV.Port({PORT}))"
                ]
            },
            "aimech_clear_matrix_led": {
                "template": "ledMatrix_{PORT}.clear()",
                "imports": [
                    "import Hiwonder_DEV"
                ],
                "variables": [
                    "ledMatrix_{PORT} = Hiwonder_DEV.DEV_LEDMatrix(Hiwonder_DEV.Port({PORT}))"
                ]
            }
        };
    }
}
