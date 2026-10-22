// IIC 转 PWM 作者入口：端口、控件与生成规则由单类声明。
import type {ExtensionContext, ExtensionInfo, NativeExtension, PythonTemplate} from '../../../../tools/sdk';

export const messages = {
    "zh-cn": {
        "product.name": "IIC转PWM控制模块",
        "block.aimecha_iicpwm_init": "初始化IIC转PWM模块IIC接口 [PORT]",
        "block.iicpwm_set_pos": "设置180°舵机编号 [NUM] 转至 [ANGLE] ° 运行时间(ms) [TIME]",
        "block.iicpwm_set_speed": "设置电机编号 [NUM] 速度 [SPEED]"
    },
    en: {
        "product.name": "IIC to PWM module",
        "block.aimecha_iicpwm_init": "Initialize IIC to PWM module port [PORT]",
        "block.iicpwm_set_pos": "Set 180° servo [NUM] angle [ANGLE] ° duration (ms) [TIME]",
        "block.iicpwm_set_speed": "Set motor [NUM] speed [SPEED]"
    },
    "zh-tw": {
        "product.name": "IIC轉PWM控制模組",
        "block.aimecha_iicpwm_init": "初始化IIC轉PWM模組IIC介面 [PORT]",
        "block.iicpwm_set_pos": "設定180°舵機編號 [NUM] 轉至 [ANGLE] ° 運行時間(ms) [TIME]",
        "block.iicpwm_set_speed": "設定馬達編號 [NUM] 速度 [SPEED]"
    },
    ko: {
        "product.name": "IIC-PWM 제어 모듈",
        "block.aimecha_iicpwm_init": "IIC-PWM 모듈 IIC 포트 [PORT] 초기화하기",
        "block.iicpwm_set_pos": "180° 서보 [NUM] 각도 [ANGLE] ° 동작 시간(ms) [TIME] 설정하기",
        "block.iicpwm_set_speed": "모터 [NUM] 속도 [SPEED] 설정하기"
    }
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
                    items: this.context.ports('actuator.aimech_iicport')
                },
                iic_pwm_port: {
                    acceptReporters: false,
                    items: this.context.ports('actuator.iic_pwm_port')
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
