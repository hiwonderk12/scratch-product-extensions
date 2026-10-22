// 机械臂作者入口：集中维护积木、四语文案与按需 Python 依赖。
import type {ExtensionContext, ExtensionInfo, NativeExtension, PythonTemplate} from '../../../../tools/sdk';

export const messages = {
    "zh-cn": {
        "product.name": "AI机甲机械臂",
        "group.arm": "机械臂",
        "block.aimech_set_arm_id": "将机械臂舵机ID设置为 [SERVO]",
        "block.aimech_set_claw_id": "将机械爪舵机ID设置为 [SERVO]",
        "block.aimech_servo_enable": "将 [ARM] 舵机上电",
        "block.aimech_servo_disable": "将 [ARM] 舵机掉电",
        "block.aimech_set_servo_pose_time": "设置 [ARM] 舵机位置(0~1000) [POS] 运行时间 [TIME] ms",
        "block.aimech_get_angle": "获取 [ARM] 舵机位置",
        "block.aimech_set_servo_stop": "停止舵机 [ARM] 运行",
        "menu.arm.0": "机械臂",
        "menu.arm.1": "机械爪"
    },
    en: {
        "product.name": "AI Mech Robot Arm",
        "group.arm": "Robot arm",
        "block.aimech_set_arm_id": "Set robot arm servo ID to [SERVO]",
        "block.aimech_set_claw_id": "Set gripper servo ID to [SERVO]",
        "block.aimech_servo_enable": "Power on [ARM] servo",
        "block.aimech_servo_disable": "Power off [ARM] servo",
        "block.aimech_set_servo_pose_time": "Set [ARM] servo position (0~1000) [POS] duration [TIME] ms",
        "block.aimech_get_angle": "Get [ARM] servo position",
        "block.aimech_set_servo_stop": "Stop servo [ARM]",
        "menu.arm.0": "Robot arm",
        "menu.arm.1": "Gripper"
    },
    "zh-tw": {
        "product.name": "AI機甲機械臂",
        "group.arm": "機械臂",
        "block.aimech_set_arm_id": "將機械臂舵機ID設定為 [SERVO]",
        "block.aimech_set_claw_id": "將機械爪舵機ID設定為 [SERVO]",
        "block.aimech_servo_enable": "將 [ARM] 舵機上電",
        "block.aimech_servo_disable": "將 [ARM] 舵機斷電",
        "block.aimech_set_servo_pose_time": "設定 [ARM] 舵機位置(0~1000) [POS] 運行時間 [TIME] ms",
        "block.aimech_get_angle": "取得 [ARM] 舵機位置",
        "block.aimech_set_servo_stop": "停止舵機 [ARM] 運行",
        "menu.arm.0": "機械臂",
        "menu.arm.1": "機械爪"
    },
    ko: {
        "product.name": "AI 메카 로봇 팔",
        "group.arm": "로봇 팔",
        "block.aimech_set_arm_id": "로봇 팔 서보 ID를 [SERVO] 로 설정하기",
        "block.aimech_set_claw_id": "그리퍼 서보 ID를 [SERVO] 로 설정하기",
        "block.aimech_servo_enable": "[ARM] 서보 전원 켜기",
        "block.aimech_servo_disable": "[ARM] 서보 전원 끄기",
        "block.aimech_set_servo_pose_time": "[ARM] 서보 위치(0~1000)를 [POS] 로, 동작 시간을 [TIME] ms로 설정하기",
        "block.aimech_get_angle": "[ARM] 서보 위치 읽기",
        "block.aimech_set_servo_stop": "서보 [ARM] 정지하기",
        "menu.arm.0": "로봇 팔",
        "menu.arm.1": "그리퍼"
    }
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
