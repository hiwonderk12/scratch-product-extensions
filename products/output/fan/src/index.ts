// 风扇作者入口：主控适配决定 SDK 与活跃旧前缀，两个接口互斥。
import type {ExtensionContext, ExtensionInfo, NativeExtension, PythonTemplate} from '../../../../tools/sdk';

import locale0 from './locales/zh-cn.json';
import locale1 from './locales/en.json';
import locale2 from './locales/zh-tw.json';
import locale3 from './locales/ko.json';

export const messages = {
    "zh-cn": locale0,
    en: locale1,
    "zh-tw": locale2,
    ko: locale3
} as const;

export const product = {name: 'product.name', supportedLocales: ['zh-cn', 'en', 'zh-tw', 'ko']} as const;

const PORT_MENUS: Record<string, {acceptReporters: boolean; items: Array<{text: string; value: string}>}> = {
    fanport: {
        acceptReporters: false,
        items: [
            {text: '6', value: '6'},
            {text: '8', value: '8'}
        ]
    },
    aidoggy_iicport: {
        acceptReporters: false,
        items: [
            {text: 'C', value: '3'},
            {text: 'D', value: '4'},
            {text: 'E', value: '5'},
            {text: 'F', value: '6'}
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
                menus: {fanport: PORT_MENUS.fanport},
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
            menus: {[menu]: PORT_MENUS[menu]},
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
