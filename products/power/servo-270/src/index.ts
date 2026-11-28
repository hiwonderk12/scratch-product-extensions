// 270°积木舵机：仅在 AiDoggy 上开放 PWM 角度控制，使用内联通道菜单与四语文案。
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

export default class Servo270Blocks implements NativeExtension {
    constructor (private readonly context: ExtensionContext) {}

    private checkVariant (): void {
        if (this.context.variant !== 'hiwonder-aidoggy') {
            throw new Error('power/servo-270: 未支持的主控适配 ' + this.context.variant);
        }
    }

    // S1/S2/全部为直连PWM通道协议，不读取IIC端口表。
    getInfo (): ExtensionInfo {
        this.checkVariant();
        return {
            id: "actuator",
            name: this.context.t(product.name),
            color1: "#2D87C9",
            color2: "#2D87C9",
            color3: "#2D87C9",
            menus: {
                aidoggy_servo: {
                    acceptReporters: false,
                    items: [
                        {text: "S1", value: "1"},
                        {text: "S2", value: "2"},
                        {text: this.context.t('menu.aidoggy_servo.0'), value: "0"}
                    ]
                }
            },
            blocks: [
                {
                    subCategory: this.context.t(product.name)
                },
                {
                    opcode: "aidoggy_set_servo270_angle_time",
                    blockType: "command",
                    text: this.context.t('block.aidoggy_set_servo270_angle_time'),
                    blockIconURI: this.context.asset('assets/servo.svg'),
                    arguments: {
                        SERVO: {
                            type: "string",
                            menu: "aidoggy_servo",
                            defaultValue: "1",
                            literal: true
                        },
                        ANGLE: {
                            type: "slider270",
                            defaultValue: 135
                        },
                        TIME: {
                            type: "number",
                            defaultValue: 500
                        }
                    }
                }
            ]
        };
    }

    // 使用 AiDoggy 主对象输出 270° 舵机控制语句，与主控共享 Hiwonder.AIDoggy() 去重初始化。
    getPython (): Record<string, PythonTemplate> {
        this.checkVariant();
        return {
            aidoggy_set_servo270_angle_time: {
                template: "aidoggy.set_pwm_servo_angle({SERVO}, {ANGLE}, {TIME}, 270)",
                imports: [
                    "import Hiwonder"
                ],
                variables: [
                    "aidoggy = Hiwonder.AIDoggy()"
                ]
            }
        };
    }
}
