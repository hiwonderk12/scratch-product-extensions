// IIC 转 PWM 作者入口：端口、控件与生成规则由单类声明。
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

export default class IicPwmBlocks implements NativeExtension {
    constructor (private readonly context: ExtensionContext) {}

    private checkVariant (): void {
        if (this.context.variant !== 'hiwonder-dev-port') throw new Error('power/iic-pwm: 未支持的主控适配 ' + this.context.variant);
    }

    getInfo (): ExtensionInfo {
        this.checkVariant();
        return {
            id: "actuator",
            name: this.context.t(product.name),
            color1: "#2D87C9",
            color2: "#2D87C9",
            color3: "#2D87C9",
            menus: {
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
                },
                iic_pwm_port: {
                    acceptReporters: false,
                    items: [
                        {text: '1', value: '1'},
                        {text: '2', value: '2'}
                    ]
                }
            },
            blocks: [
                {
                    subCategory: this.context.t(product.name)
                },
                {
                    opcode: "aimecha_iicpwm_init",
                    blockType: "command",
                    text: this.context.t('block.aimecha_iicpwm_init'),
                    arguments: {
                        PORT: {
                            type: "string",
                            defaultValue: this.context.defaultPort('aimecha_iicpwm_init', 'PORT'),
                            menu: "aimech_iicport",
                            literal: true
                        }
                    }
                },
                {
                    opcode: "iicpwm_set_pos",
                    blockType: "command",
                    text: this.context.t('block.iicpwm_set_pos'),
                    arguments: {
                        NUM: {
                            type: "string",
                            defaultValue: "1",
                            menu: "iic_pwm_port",
                            literal: true
                        },
                        ANGLE: {
                            type: "slider180z",
                            defaultValue: 90
                        },
                        TIME: {
                            type: "number",
                            defaultValue: 500
                        }
                    }
                },
                {
                    opcode: "iicpwm_set_speed",
                    blockType: "command",
                    text: this.context.t('block.iicpwm_set_speed'),
                    arguments: {
                        NUM: {
                            type: "string",
                            defaultValue: "1",
                            menu: "iic_pwm_port",
                            literal: true
                        },
                        SPEED: {
                            type: "slider100",
                            defaultValue: 0
                        }
                    }
                }
            ]
        };
    }

    // 仅初始化积木声明驱动对象，后续控制不自动补初始化。
    getPython (): Record<string, PythonTemplate> {
        this.checkVariant();
        return {
            aimecha_iicpwm_init: {
                template: "",
                imports: [
                    "import Hiwonder_DEV"
                ],
                variables: [
                    "iicpwm = Hiwonder_DEV.DEV_PWMModule(Hiwonder_DEV.Port({PORT}))"
                ]
            },
            iicpwm_set_pos: {
                template: "iicpwm.set_angle({NUM},{ANGLE},{TIME},180)"
            },
            iicpwm_set_speed: {
                template: "iicpwm.set_speed({NUM},{SPEED})"
            }
        };
    }
}
