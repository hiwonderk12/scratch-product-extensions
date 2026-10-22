// 风扇作者入口：主控适配决定 SDK 与活跃旧前缀，两个接口互斥。
import type {ExtensionContext, ExtensionInfo, NativeExtension, PythonTemplate} from '../../../../tools/sdk';

export const messages = {
    "zh-cn": {
        "product.name": "风扇",
        "block.aimech_fan_iic_set_module_speed": "设置风扇接口 [PORT] 转速 [SPEED]",
        "block.fan_module_speed": "设置风扇接口 [PORT] 转速 [SPEED]",
        "group.fan": "风扇模块"
    },
    en: {
        "product.name": "Fan",
        "block.aimech_fan_iic_set_module_speed": "Set fan port [PORT] speed [SPEED]",
        "block.fan_module_speed": "Set fan port [PORT] speed [SPEED]",
        "group.fan": "Fan module"
    },
    "zh-tw": {
        "product.name": "風扇",
        "block.aimech_fan_iic_set_module_speed": "設定風扇介面 [PORT] 轉速 [SPEED]",
        "block.fan_module_speed": "設定風扇介面 [PORT] 轉速 [SPEED]",
        "group.fan": "風扇模組"
    },
    ko: {
        "product.name": "팬",
        "block.aimech_fan_iic_set_module_speed": "팬 포트 [PORT] 속도 [SPEED] 설정하기",
        "block.fan_module_speed": "팬 포트 [PORT] 속도 [SPEED] 설정하기",
        "group.fan": "팬 모듈"
    }
} as const;

export const product = {name: 'product.name', supportedLocales: ['zh-cn', 'en', 'zh-tw', 'ko']} as const;

export default class FanBlocks implements NativeExtension {
    constructor (private readonly context: ExtensionContext) {}

    private driver (): string {
        if (['hiwonder-dev-port', 'hiwonder-dev-port-aidoggy', 'hiwonder-port'].includes(this.context.variant)) {
            return this.context.variant;
        }
        throw new Error('fan: 未支持的主控适配 ' + this.context.variant);
    }

    getInfo (): ExtensionInfo {
        const driver = this.driver();
        if (driver === 'hiwonder-port') {
            return {
                id: 'display', name: this.context.t(product.name),
                color1: '#FF6347', color2: '#FF6347', color3: '#FF6347',
                menus: {fanport: {acceptReporters: false, items: this.context.ports('display.fanport')}},
                blocks: [
                    {subCategory: this.context.t('group.fan')},
                    {opcode: 'fan_module_speed', blockType: 'command',
                        text: this.context.t('block.fan_module_speed'),
                        blockIconURI: this.context.asset('assets/fan.svg'),
                        arguments: {
                            PORT: {type: 'string', menu: 'fanport', literal: true,
                                defaultValue: this.context.defaultPort('fan_module_speed', 'PORT', 'display')},
                            SPEED: {type: 'slider100', defaultValue: 80}
                        }}
                ]
            };
        }
        const menu = driver === 'hiwonder-dev-port-aidoggy' ? 'aidoggy_iicport' : 'aimech_iicport';
        return {
            id: 'actuator', name: this.context.t(product.name),
            color1: '#2D87C9', color2: '#2D87C9', color3: '#2D87C9',
            menus: {[menu]: {acceptReporters: false, items: this.context.ports('actuator.' + menu)}},
            blocks: [
                {subCategory: this.context.t(product.name)},
                {opcode: 'aimech_fan_iic_set_module_speed', blockType: 'command',
                    text: this.context.t('block.aimech_fan_iic_set_module_speed'),
                    blockIconURI: this.context.asset('assets/fan.svg'),
                    arguments: {
                        PORT: {type: 'string', menu, literal: true,
                            defaultValue: this.context.defaultPort('aimech_fan_iic_set_module_speed', 'PORT')},
                        SPEED: {type: 'slider100', defaultValue: 80}
                    }}
            ]
        };
    }

    // 只返回当前主控接口的 Python，不能混用两种驱动对象。
    getPython (): Record<string, PythonTemplate> {
        if (this.driver() === 'hiwonder-port') {
            return {fan_module_speed: {
                imports: ['import Hiwonder_Fan'],
                variables: ['fan_{PORT} = Hiwonder_Fan.Fan(Hiwonder.Port({PORT}))'],
                template: 'fan_{PORT}.set_speed({SPEED})'
            }};
        }
        return {aimech_fan_iic_set_module_speed: {
            imports: ['import Hiwonder_DEV'],
            variables: ['iic_fan_{PORT} = Hiwonder_DEV.DEV_FAN(Hiwonder_DEV.Port({PORT}))'],
            template: 'iic_fan_{PORT}.set_speed({SPEED})'
        }};
    }
}
