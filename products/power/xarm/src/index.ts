// 机械臂作者入口：集中维护积木、四语文案与按需 Python 依赖。
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

export default class RobotArmBlocks implements NativeExtension {
    constructor (private readonly context: ExtensionContext) {}

    private checkVariant (): void {
        if (this.context.variant !== 'hiwonder') {
            throw new Error('xarm: 未支持的主控适配 ' + this.context.variant);
        }
    }

    getInfo (): ExtensionInfo {
        this.checkVariant();
        return {
            id: "xarm",
            name: this.context.t(product.name),
            color1: "#00B2EE",
            color2: "#00B2EE",
            color3: "#00B2EE",
            menus: {
                arm: {
                    acceptReporters: false,
                    items: [
                        {
                            text: this.context.t('menu.arm.0'),
                            value: "_armId"
                        },
                        {
                            text: this.context.t('menu.arm.1'),
                            value: "_clawId"
                        }
                    ]
                }
            },
            blocks: [
                {
                    subCategory: this.context.t('group.arm')
                },
                {
                    opcode: "aimech_set_arm_id",
                    blockType: "command",
                    text: this.context.t('block.aimech_set_arm_id'),
                    blockIconURI: this.context.asset('assets/claw.svg'),
                    arguments: {
                        SERVO: {
                            type: "number",
                            defaultValue: 2
                        }
                    }
                },
                {
                    opcode: "aimech_set_claw_id",
                    blockType: "command",
                    text: this.context.t('block.aimech_set_claw_id'),
                    blockIconURI: this.context.asset('assets/claw.svg'),
                    arguments: {
                        SERVO: {
                            type: "number",
                            defaultValue: 1
                        }
                    }
                },
                {
                    opcode: "aimech_servo_enable",
                    blockType: "command",
                    text: this.context.t('block.aimech_servo_enable'),
                    blockIconURI: this.context.asset('assets/claw.svg'),
                    arguments: {
                        ARM: {
                            type: "string",
                            defaultValue: "_armId",
                            menu: "arm",
                            literal: true
                        }
                    }
                },
                {
                    opcode: "aimech_servo_disable",
                    blockType: "command",
                    text: this.context.t('block.aimech_servo_disable'),
                    blockIconURI: this.context.asset('assets/claw.svg'),
                    arguments: {
                        ARM: {
                            type: "string",
                            defaultValue: "_armId",
                            menu: "arm",
                            literal: true
                        }
                    }
                },
                {
                    opcode: "aimech_set_servo_pose_time",
                    blockType: "command",
                    text: this.context.t('block.aimech_set_servo_pose_time'),
                    blockIconURI: this.context.asset('assets/claw.svg'),
                    arguments: {
                        ARM: {
                            type: "string",
                            defaultValue: "_armId",
                            menu: "arm",
                            literal: true
                        },
                        POS: {
                            type: "slider1000",
                            defaultValue: 500
                        },
                        TIME: {
                            type: "number",
                            defaultValue: 500
                        }
                    }
                },
                {
                    opcode: "aimech_get_angle",
                    blockType: "reporter",
                    disableMonitor: true,
                    text: this.context.t('block.aimech_get_angle'),
                    blockIconURI: this.context.asset('assets/claw.svg'),
                    arguments: {
                        ARM: {
                            type: "string",
                            defaultValue: "_armId",
                            menu: "arm",
                            literal: true
                        }
                    }
                },
                {
                    opcode: "aimech_set_servo_stop",
                    blockType: "command",
                    text: this.context.t('block.aimech_set_servo_stop'),
                    blockIconURI: this.context.asset('assets/claw.svg'),
                    arguments: {
                        ARM: {
                            type: "string",
                            defaultValue: "_armId",
                            menu: "arm",
                            literal: true
                        }
                    }
                }
            ]
        };
    }

    // ID 设置保留 setup 顺序；机械臂对象仅由相应使用或初始化积木收集。
    getPython (): Record<string, PythonTemplate> {
        this.checkVariant();
        return {
            aimech_set_arm_id: {
                template: "",
                setups: [
                    "_armId = {SERVO}"
                ]
            },
            aimech_set_claw_id: {
                template: "",
                setups: [
                    "_clawId = {SERVO}"
                ]
            },
            aimech_servo_enable: {
                template: "busservos.load({ARM})",
                imports: [
                    "import Hiwonder"
                ],
                variables: [
                    "_clawId = 1",
                    "_armId = 2",
                    "busservos = Hiwonder.BusServo()"
                ]
            },
            aimech_servo_disable: {
                template: "busservos.unload({ARM})",
                imports: [
                    "import Hiwonder"
                ],
                variables: [
                    "_clawId = 1",
                    "_armId = 2",
                    "busservos = Hiwonder.BusServo()"
                ]
            },
            aimech_set_servo_pose_time: {
                template: "busservos.run({ARM},{POS},{TIME})",
                imports: [
                    "import Hiwonder"
                ],
                variables: [
                    "_clawId = 1",
                    "_armId = 2",
                    "busservos = Hiwonder.BusServo()"
                ]
            },
            aimech_get_angle: {
                template: "busservos.get_position({ARM})",
                imports: [
                    "import Hiwonder"
                ],
                variables: [
                    "_clawId = 1",
                    "_armId = 2",
                    "busservos = Hiwonder.BusServo()"
                ]
            },
            aimech_set_servo_stop: {
                template: "busservos.stop({ARM})",
                imports: [
                    "import Hiwonder"
                ],
                variables: [
                    "_clawId = 1",
                    "_armId = 2",
                    "busservos = Hiwonder.BusServo()"
                ]
            }
        };
    }
}
