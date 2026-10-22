import type {ExtensionContext, ExtensionInfo, NativeExtension, PythonTemplate} from '../../../../tools/sdk';

export const messages = {
    'zh-cn': {
        'product.name': '数码管',
        'block.aimech_digit_show_num': '数码管接口 [PORT] 显示数字 [NUM]',
        'block.aiblocksboard_digit_show_num': '数码管接口 [PORT] 显示数字 [NUM]'
    },
    en: {
        'product.name': 'Digit display',
        'block.aimech_digit_show_num': 'Digit display port [PORT] show number [NUM]',
        'block.aiblocksboard_digit_show_num': 'Digit display port [PORT] show number [NUM]'
    },
    'zh-tw': {
        'product.name': '數碼管',
        'block.aimech_digit_show_num': '數碼管介面 [PORT] 顯示數字 [NUM]',
        'block.aiblocksboard_digit_show_num': '數碼管介面 [PORT] 顯示數字 [NUM]'
    },
    ko: {
        'product.name': '숫자 표시 모듈',
        'block.aimech_digit_show_num': '숫자 표시 모듈 포트 [PORT] 에 숫자 [NUM] 표시하기',
        'block.aiblocksboard_digit_show_num': '숫자 표시 모듈 포트 [PORT] 에 숫자 [NUM] 표시하기'
    }
} as const;

export const product = {
    name: 'product.name',
    supportedLocales: ['zh-cn', 'en', 'zh-tw', 'ko']
} as const;

export default class DigitDisplayBlocks implements NativeExtension {
    constructor (private readonly context: ExtensionContext) {}

    private usesIicDriver (): boolean {
        if (this.context.variant === 'hiwonder-iic') return true;
        if (this.context.variant === 'hiwonder-dev-port') return false;
        throw new Error('digit-display: 未支持的主控适配 ' + this.context.variant);
    }

    getInfo (): ExtensionInfo {
        const usesIic = this.usesIicDriver();
        const menu = usesIic ? 'aiblocks_iicport' : 'aimech_iicport';
        return {
            id: 'display',
            name: this.context.t(product.name),
            color1: '#FF6347',
            color2: '#FF6347',
            color3: '#FF6347',
            menus: {
                [menu]: {items: this.context.ports('display.' + menu), acceptReporters: false}
            },
            blocks: [
                {subCategory: this.context.t(product.name)},
                usesIic ? {
                    opcode: 'aiblocksboard_digit_show_num',
                    blockType: 'command',
                    text: this.context.t('block.aiblocksboard_digit_show_num'),
                    blockIconURI: this.context.asset('assets/digit.svg'),
                    arguments: {
                        PORT: {type: 'string', menu: 'aiblocks_iicport', literal: true,
                            defaultValue: this.context.defaultPort('aiblocksboard_digit_show_num', 'PORT')},
                        NUM: {type: 'number', defaultValue: 0}
                    }
                } : {
                    opcode: 'aimech_digit_show_num',
                    blockType: 'command',
                    text: this.context.t('block.aimech_digit_show_num'),
                    blockIconURI: this.context.asset('assets/digit.svg'),
                    arguments: {
                        PORT: {type: 'string', menu: 'aimech_iicport', literal: true,
                            defaultValue: this.context.defaultPort('aimech_digit_show_num', 'PORT')},
                        NUM: {type: 'number', defaultValue: 0}
                    }
                }
            ]
        };
    }

    getPython (): Record<string, PythonTemplate> {
        if (this.usesIicDriver()) {
            return {
                aiblocksboard_digit_show_num: {
                    imports: ['import Hiwonder_IIC'],
                    variables: ['iic = Hiwonder_IIC.IIC()', 'digit_{PORT} = Hiwonder_IIC.DEV_NixieTube(iic,{PORT})'],
                    template: 'digit_{PORT}.show_int({NUM})'
                }
            };
        }
        return {
            aimech_digit_show_num: {
                imports: ['import Hiwonder_DEV'],
                variables: ['digit_{PORT} = Hiwonder_DEV.DEV_NixieTube(Hiwonder_DEV.Port({PORT}))'],
                template: 'digit_{PORT}.show_int({NUM})'
            }
        };
    }
}
