import type {ExtensionContext, ExtensionInfo, NativeExtension, PythonTemplate} from '../../../../tools/sdk';

export const messages = {
    'zh-cn': {
        'product.name': 'IIC 风扇',
        'block.aiblocks_fan_iic_set_module_speed': '设置 IIC 风扇接口 [PORT] 转速 [SPEED]',
        'block.aimech_fan_iic_set_module_speed': '设置风扇接口 [PORT] 转速 [SPEED]'
    },
    en: {
        'product.name': 'IIC fan',
        'block.aiblocks_fan_iic_set_module_speed': 'Set IIC fan port [PORT] speed [SPEED]',
        'block.aimech_fan_iic_set_module_speed': 'Set fan port [PORT] speed [SPEED]'
    },
    'zh-tw': {
        'product.name': 'IIC 風扇',
        'block.aiblocks_fan_iic_set_module_speed': '設定 IIC 風扇介面 [PORT] 轉速 [SPEED]',
        'block.aimech_fan_iic_set_module_speed': '設定風扇介面 [PORT] 轉速 [SPEED]'
    },
    ko: {
        'product.name': 'IIC 팬',
        'block.aiblocks_fan_iic_set_module_speed': 'IIC 팬 포트 [PORT] 속도를 [SPEED] 로 설정하기',
        'block.aimech_fan_iic_set_module_speed': '팬 포트 [PORT] 속도를 [SPEED] 로 설정하기'
    }
} as const;

export const product = {
    name: 'product.name',
    supportedLocales: ['zh-cn', 'en', 'zh-tw', 'ko']
} as const;

export default class FanIicBlocks implements NativeExtension {
    constructor (private readonly context: ExtensionContext) {}

    private usesIicDriver (): boolean {
        if (this.context.variant === 'hiwonder-iic') return true;
        if (this.context.variant === 'hiwonder-dev-port') return false;
        throw new Error('fan-iic: 未支持的主控适配 ' + this.context.variant);
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
                    opcode: 'aiblocks_fan_iic_set_module_speed',
                    blockType: 'command',
                    text: this.context.t('block.aiblocks_fan_iic_set_module_speed'),
                    blockIconURI: this.context.asset('assets/fan.svg'),
                    arguments: {
                        PORT: {type: 'string', menu: 'aiblocks_iicport', literal: true,
                            defaultValue: this.context.defaultPort('aiblocks_fan_iic_set_module_speed', 'PORT')},
                        SPEED: {type: 'slider100', defaultValue: 80}
                    }
                } : {
                    opcode: 'aimech_fan_iic_set_module_speed',
                    blockType: 'command',
                    text: this.context.t('block.aimech_fan_iic_set_module_speed'),
                    blockIconURI: this.context.asset('assets/fan.svg'),
                    arguments: {
                        PORT: {type: 'string', menu: 'aimech_iicport', literal: true,
                            defaultValue: this.context.defaultPort('aimech_fan_iic_set_module_speed', 'PORT')},
                        SPEED: {type: 'slider100', defaultValue: 80}
                    }
                }
            ]
        };
    }

    getPython (): Record<string, PythonTemplate> {
        if (this.usesIicDriver()) {
            return {
                aiblocks_fan_iic_set_module_speed: {
                    imports: ['import Hiwonder_IIC'],
                    variables: ['iic = Hiwonder_IIC.IIC()', 'iic_fan_{PORT} = Hiwonder_IIC.DEV_FAN(iic,{PORT},0x56)'],
                    template: 'iic_fan_{PORT}.set_speed({SPEED})'
                }
            };
        }
        return {
            aimech_fan_iic_set_module_speed: {
                imports: ['import Hiwonder_DEV'],
                variables: ['iic_fan_{PORT} = Hiwonder_DEV.DEV_FAN(Hiwonder_DEV.Port({PORT}))'],
                template: 'iic_fan_{PORT}.set_speed({SPEED})'
            }
        };
    }
}
