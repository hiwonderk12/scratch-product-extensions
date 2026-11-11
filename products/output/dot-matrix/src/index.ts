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
