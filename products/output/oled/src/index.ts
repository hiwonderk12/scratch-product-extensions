import type {ExtensionContext, ExtensionInfo, NativeExtension, PythonTemplate} from '../../../../tools/sdk';

import locale0 from './locales/zh-cn.json';
import locale1 from './locales/en.json';
import locale2 from './locales/zh-tw.json';
import locale3 from './locales/ko.json';

export const messages = {
    'zh-cn': locale0,
    en: locale1,
    'zh-tw': locale2,
    ko: locale3
} as const;

export const product = {
    name: 'product.name',
    supportedLocales: ['zh-cn', 'en', 'zh-tw', 'ko']
} as const;

const PORT_MENUS: Record<string, {acceptReporters: boolean; items: Array<{text: string; value: string}>}> = {
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

export default class OledBlocks implements NativeExtension {
    constructor (private readonly context: ExtensionContext) {}

    private usesIicDriver (): boolean {
        if (this.context.variant === 'hiwonder-iic') return true;
        if (this.context.variant === 'hiwonder-dev-port') return false;
        throw new Error('oled: 未支持的主控适配 ' + this.context.variant);
    }

    getInfo (): ExtensionInfo {
        const usesIic = this.usesIicDriver();
        const menu = usesIic ? 'aiblocks_iicport' : 'aimech_iicport';
        return {
            id: 'display',
            name: this.context.t(product.name),
            color1: '#FF6347', color2: '#FF6347', color3: '#FF6347',
            menus: {
                [menu]: PORT_MENUS[menu],
                oled_char_row: {
                    items: ['0', '1', '2', '3', '4', '5'].map(value => ({text: value, value})),
                    acceptReporters: false
                },
                oledstatus: {
                    items: [
                        {text: this.context.t('menu.oledstatus.on'), value: '1'},
                        {text: this.context.t('menu.oledstatus.off'), value: '0'}
                    ],
                    acceptReporters: false
                },
                shapetype: {
                    items: [
                        {text: this.context.t('menu.shapetype.outline'), value: '0'},
                        {text: this.context.t('menu.shapetype.filled'), value: '1'}
                    ],
                    acceptReporters: false
                }
            },
            blocks: [
                {subCategory: this.context.t(product.name)},
                usesIic ? {
                    opcode: 'aiblocks_oled_init', blockType: 'command',
                    text: this.context.t('block.aiblocks_oled_init'),
                    blockIconURI: this.context.asset('assets/oled.svg'),
                    arguments: {
                        PORT: {type: 'string', menu: 'aiblocks_iicport', literal: true,
                            defaultValue: this.context.defaultPort('aiblocks_oled_init', 'PORT')}
                    }
                } : {
                    opcode: 'aimech_oled_init', blockType: 'command',
                    text: this.context.t('block.aimech_oled_init'),
                    blockIconURI: this.context.asset('assets/oled.svg'),
                    arguments: {
                        PORT: {type: 'string', menu: 'aimech_iicport', literal: true,
                            defaultValue: this.context.defaultPort('aimech_oled_init', 'PORT')}
                    }
                },
                {
                    opcode: 'oled_draw_ascii', blockType: 'command',
                    text: this.context.t('block.oled_draw_ascii'),
                    blockIconURI: this.context.asset('assets/oled.svg'),
                    arguments: {
                        STR: {type: 'string', defaultValue: 'Hello'},
                        XPOS: {type: 'number', defaultValue: 0},
                        YPOS: {type: 'string', menu: 'oled_char_row', literal: true, defaultValue: '0'}
                    }
                },
                {
                    opcode: 'oled_point', blockType: 'command',
                    text: this.context.t('block.oled_point'),
                    blockIconURI: this.context.asset('assets/oled.svg'),
                    arguments: {
                        XPOS: {type: 'number', defaultValue: 0},
                        YPOS: {type: 'number', defaultValue: 0},
                        STATUS: {type: 'string', menu: 'oledstatus', literal: true, defaultValue: '1'}
                    }
                },
                {
                    opcode: 'oled_clear', blockType: 'command',
                    text: this.context.t('block.oled_clear'),
                    blockIconURI: this.context.asset('assets/oled.svg'),
                    arguments: {}
                },
                {
                    opcode: 'oled_draw_hline', blockType: 'command',
                    text: this.context.t('block.oled_draw_hline'),
                    blockIconURI: this.context.asset('assets/oled.svg'),
                    arguments: {
                        XPOS: {type: 'number', defaultValue: 10},
                        YPOS: {type: 'number', defaultValue: 15},
                        LENGTH: {type: 'number', defaultValue: 117}
                    }
                },
                {
                    opcode: 'oled_draw_vline', blockType: 'command',
                    text: this.context.t('block.oled_draw_vline'),
                    blockIconURI: this.context.asset('assets/oled.svg'),
                    arguments: {
                        XPOS: {type: 'number', defaultValue: 10},
                        YPOS: {type: 'number', defaultValue: 15},
                        LENGTH: {type: 'number', defaultValue: 48}
                    }
                },
                {
                    opcode: 'oled_draw_line', blockType: 'command',
                    text: this.context.t('block.oled_draw_line'),
                    blockIconURI: this.context.asset('assets/oled.svg'),
                    arguments: {
                        XPOS: {type: 'number', defaultValue: 10},
                        YPOS: {type: 'number', defaultValue: 15},
                        XPOS1: {type: 'number', defaultValue: 117},
                        YPOS1: {type: 'number', defaultValue: 15}
                    }
                },
                {
                    opcode: 'oled_draw_rect', blockType: 'command',
                    text: this.context.t('block.oled_draw_rect'),
                    blockIconURI: this.context.asset('assets/oled.svg'),
                    arguments: {
                        SHAPE: {type: 'string', menu: 'shapetype', literal: true, defaultValue: '0'},
                        XPOS: {type: 'number', defaultValue: 30},
                        YPOS: {type: 'number', defaultValue: 5},
                        XPOS1: {type: 'number', defaultValue: 98},
                        YPOS1: {type: 'number', defaultValue: 31}
                    }
                }
            ]
        };
    }

    getPython (): Record<string, PythonTemplate> {
        const initialization: Record<string, PythonTemplate> = this.usesIicDriver() ? {
            aiblocks_oled_init: {
                template: '', imports: ['import Hiwonder_IIC'],
                variables: ['iic = Hiwonder_IIC.IIC()', 'my_oled = Hiwonder_IIC.DEV_OLED(iic,{PORT})']
            }
        } : {
            aimech_oled_init: {
                template: '', imports: ['import Hiwonder_DEV'],
                variables: ['my_oled = Hiwonder_DEV.DEV_OLED(Hiwonder_DEV.Port({PORT}))']
            }
        };
        return {
            ...initialization,
            oled_draw_ascii: {template: 'my_oled.text({STR},{XPOS},{YPOS}*10 )'},
            oled_point: {template: 'my_oled.pixel({XPOS},{YPOS},{STATUS})'},
            oled_clear: {template: 'my_oled.fill()'},
            oled_draw_hline: {template: 'my_oled.hline({XPOS},{YPOS},{LENGTH})'},
            oled_draw_vline: {template: 'my_oled.vline({XPOS},{YPOS},{LENGTH})'},
            oled_draw_line: {template: 'my_oled.line({XPOS},{YPOS},{XPOS1},{YPOS1})'},
            oled_draw_rect: {
                template: 'my_oled.rect({XPOS},{YPOS},{XPOS1},{YPOS1})',
                templateSelector: {argument: 'SHAPE', cases: {
                    '0': 'my_oled.rect({XPOS},{YPOS},{XPOS1},{YPOS1})',
                    '1': 'my_oled.fill_rect({XPOS},{YPOS},{XPOS1},{YPOS1})'
                }}
            }
        };
    }
}
