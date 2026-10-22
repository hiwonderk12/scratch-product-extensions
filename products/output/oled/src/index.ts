import type {ExtensionContext, ExtensionInfo, NativeExtension, PythonTemplate} from '../../../../tools/sdk';

export const messages = {
    'zh-cn': {
        'product.name': 'OLED-12864',
        'block.aimech_oled_init': '初始化 OLED 接口 [PORT]',
        'block.aiblocks_oled_init': '初始化 OLED 接口 [PORT]',
        'block.oled_draw_ascii': 'OLED 显示字符 [STR] 坐标 X [XPOS] Y [YPOS]',
        'block.oled_point': 'OLED 在坐标 X [XPOS] Y [YPOS] [STATUS]',
        'block.oled_clear': 'OLED 清空显示',
        'block.oled_draw_hline': 'OLED 画水平线 起点 X [XPOS] Y [YPOS] 长度 [LENGTH]',
        'block.oled_draw_vline': 'OLED 画垂直线 起点 X [XPOS] Y [YPOS] 长度 [LENGTH]',
        'block.oled_draw_line': 'OLED 画直线 起点 X [XPOS] Y [YPOS] 终点 X [XPOS1] Y [YPOS1]',
        'block.oled_draw_rect': 'OLED 画 [SHAPE] 矩形 左上 X [XPOS] Y [YPOS] 右下 X [XPOS1] Y [YPOS1]',
        'menu.oledstatus.on': '点亮',
        'menu.oledstatus.off': '关闭',
        'menu.shapetype.outline': '空心',
        'menu.shapetype.filled': '实心'
    },
    en: {
        'product.name': 'OLED-12864',
        'block.aimech_oled_init': 'Initialize OLED port [PORT]',
        'block.aiblocks_oled_init': 'Initialize OLED port [PORT]',
        'block.oled_draw_ascii': 'OLED show text [STR] at X [XPOS] Y [YPOS]',
        'block.oled_point': 'OLED pixel at X [XPOS] Y [YPOS] [STATUS]',
        'block.oled_clear': 'OLED clear display',
        'block.oled_draw_hline': 'OLED draw horizontal line from X [XPOS] Y [YPOS] length [LENGTH]',
        'block.oled_draw_vline': 'OLED draw vertical line from X [XPOS] Y [YPOS] length [LENGTH]',
        'block.oled_draw_line': 'OLED draw line from X [XPOS] Y [YPOS] to X [XPOS1] Y [YPOS1]',
        'block.oled_draw_rect': 'OLED draw [SHAPE] rectangle top left X [XPOS] Y [YPOS] bottom right X [XPOS1] Y [YPOS1]',
        'menu.oledstatus.on': 'on',
        'menu.oledstatus.off': 'off',
        'menu.shapetype.outline': 'outlined',
        'menu.shapetype.filled': 'filled'
    },
    'zh-tw': {
        'product.name': 'OLED-12864',
        'block.aimech_oled_init': '初始化 OLED 介面 [PORT]',
        'block.aiblocks_oled_init': '初始化 OLED 介面 [PORT]',
        'block.oled_draw_ascii': 'OLED 顯示字元 [STR] 座標 X [XPOS] Y [YPOS]',
        'block.oled_point': 'OLED 在座標 X [XPOS] Y [YPOS] [STATUS]',
        'block.oled_clear': 'OLED 清空顯示',
        'block.oled_draw_hline': 'OLED 畫水平線 起點 X [XPOS] Y [YPOS] 長度 [LENGTH]',
        'block.oled_draw_vline': 'OLED 畫垂直線 起點 X [XPOS] Y [YPOS] 長度 [LENGTH]',
        'block.oled_draw_line': 'OLED 畫直線 起點 X [XPOS] Y [YPOS] 終點 X [XPOS1] Y [YPOS1]',
        'block.oled_draw_rect': 'OLED 畫 [SHAPE] 矩形 左上 X [XPOS] Y [YPOS] 右下 X [XPOS1] Y [YPOS1]',
        'menu.oledstatus.on': '點亮',
        'menu.oledstatus.off': '關閉',
        'menu.shapetype.outline': '空心',
        'menu.shapetype.filled': '實心'
    },
    ko: {
        'product.name': 'OLED-12864',
        'block.aimech_oled_init': 'OLED 포트 [PORT] 초기화하기',
        'block.aiblocks_oled_init': 'OLED 포트 [PORT] 초기화하기',
        'block.oled_draw_ascii': 'OLED X [XPOS] Y [YPOS] 에 텍스트 [STR] 표시하기',
        'block.oled_point': 'OLED X [XPOS] Y [YPOS] 의 픽셀을 [STATUS] 하기',
        'block.oled_clear': 'OLED 화면 지우기',
        'block.oled_draw_hline': 'OLED X [XPOS] Y [YPOS] 에서 길이 [LENGTH] 의 가로선 그리기',
        'block.oled_draw_vline': 'OLED X [XPOS] Y [YPOS] 에서 길이 [LENGTH] 의 세로선 그리기',
        'block.oled_draw_line': 'OLED X [XPOS] Y [YPOS] 에서 X [XPOS1] Y [YPOS1] 까지 선 그리기',
        'block.oled_draw_rect': 'OLED 왼쪽 위 X [XPOS] Y [YPOS] 오른쪽 아래 X [XPOS1] Y [YPOS1] 에 [SHAPE] 사각형 그리기',
        'menu.oledstatus.on': '켜기',
        'menu.oledstatus.off': '끄기',
        'menu.shapetype.outline': '윤곽선',
        'menu.shapetype.filled': '채운'
    }
} as const;

export const product = {
    name: 'product.name',
    supportedLocales: ['zh-cn', 'en', 'zh-tw', 'ko']
} as const;

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
                [menu]: {items: this.context.ports('display.' + menu), acceptReporters: false},
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
