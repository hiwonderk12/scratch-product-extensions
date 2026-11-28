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
                [menu]: PORT_MENUS[menu]
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
