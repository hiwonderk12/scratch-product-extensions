// 机械臂作者入口：集中维护积木、四语文案与按需 Python 依赖。
import type {ExtensionContext, ExtensionInfo, NativeExtension, PythonTemplate} from '../../../../tools/sdk';

export const messages = {
    "zh-cn": {
        "product.name": "AI机甲串联机械臂",
        "group.arm": "AI机甲串联机械臂",
        "block.aimech_3dof_arm_init": "初始化 [ARM] 参数 大臂长度 [VALUE1] 小臂长度 [VALUE2] 小臂偏移 [VALUE3] 末端长度 [VALUE4]",
        "block.aimech_3dof_arm_move": "控制机械臂运动到 Y轴(前后方向) [VALUE1] 毫米, Z轴(上下方向) [VALUE2] 毫米, 末端的姿态角度(抬头是正, 低头是负) [VALUE3] 度, 运动时长 [VALUE4] 毫秒",
        "menu.arm_3dof.0": "短机械臂",
        "menu.arm_3dof.1": "长机械臂"
    },
    en: {
        "product.name": "AI Mech Serial Arm",
        "group.arm": "AI Mech Serial Arm",
        "block.aimech_3dof_arm_init": "Initialize [ARM] with upper arm length [VALUE1] forearm length [VALUE2] forearm offset [VALUE3] end length [VALUE4]",
        "block.aimech_3dof_arm_move": "Move arm to Y (forward/backward) [VALUE1] mm, Z (up/down) [VALUE2] mm, end pitch (positive up, negative down) [VALUE3] degrees, duration [VALUE4] ms",
        "menu.arm_3dof.0": "Short arm",
        "menu.arm_3dof.1": "Long arm"
    },
    "zh-tw": {
        "product.name": "AI機甲串聯機械臂",
        "group.arm": "AI機甲串聯機械臂",
        "block.aimech_3dof_arm_init": "初始化 [ARM] 參數 大臂長度 [VALUE1] 小臂長度 [VALUE2] 小臂偏移 [VALUE3] 末端長度 [VALUE4]",
        "block.aimech_3dof_arm_move": "控制機械臂運動到 Y軸(前後方向) [VALUE1] 毫米, Z軸(上下方向) [VALUE2] 毫米, 末端的姿態角度(抬頭為正, 低頭為負) [VALUE3] 度, 運動時長 [VALUE4] 毫秒",
        "menu.arm_3dof.0": "短機械臂",
        "menu.arm_3dof.1": "長機械臂"
    },
    ko: {
        "product.name": "AI 메카 직렬 로봇 팔",
        "group.arm": "AI 메카 직렬 로봇 팔",
        "block.aimech_3dof_arm_init": "[ARM] 초기화하기: 위팔 길이 [VALUE1] 아래팔 길이 [VALUE2] 아래팔 오프셋 [VALUE3] 말단 길이 [VALUE4]",
        "block.aimech_3dof_arm_move": "로봇 팔을 Y축(앞뒤) [VALUE1] mm, Z축(위아래) [VALUE2] mm로 이동하기, 말단 피치 각도(위로 양수, 아래로 음수) [VALUE3] 도, 동작 시간 [VALUE4] ms",
        "menu.arm_3dof.0": "짧은 로봇 팔",
        "menu.arm_3dof.1": "긴 로봇 팔"
    }
} as const;

export const product = {name: 'product.name', supportedLocales: ['zh-cn', 'en', 'zh-tw', 'ko']} as const;

export default class SerialArmBlocks implements NativeExtension {
    constructor (private readonly context: ExtensionContext) {}

    private checkVariant (): void {
        if (!['hiwonder-actuator', 'hiwonder-xarm'].includes(this.context.variant)) {
            throw new Error('xarm-series: 未支持的主控适配 ' + this.context.variant);
        }
    }

    getInfo (): ExtensionInfo {
        this.checkVariant();
        if (this.context.variant === 'hiwonder-xarm') {
            return {
                id: "xarm",
                name: this.context.t(product.name),
                color1: "#00B2EE",
                color2: "#00B2EE",
                color3: "#00B2EE",
                menus: {
                    arm_3dof: {
                        acceptReporters: false,
                        items: [
                            {
                                text: this.context.t('menu.arm_3dof.0'),
                                value: "0"
                            },
                            {
                                text: this.context.t('menu.arm_3dof.1'),
                                value: "1"
                            }
                        ]
                    }
                },
                blocks: [
                    {
                        subCategory: this.context.t('group.arm')
                    },
                    {
                        opcode: "aimech_3dof_arm_init",
                        blockType: "command",
                        text: this.context.t('block.aimech_3dof_arm_init'),
                        blockIconURI: this.context.asset('assets/claw.svg'),
                        arguments: {
                            ARM: {
                                type: "string",
                                defaultValue: "0",
                                menu: "arm_3dof",
                                literal: true
                            },
                            VALUE1: {
                                type: "number",
                                defaultValue: 55
                            },
                            VALUE2: {
                                type: "number",
                                defaultValue: 76
                            },
                            VALUE3: {
                                type: "number",
                                defaultValue: 27
                            },
                            VALUE4: {
                                type: "number",
                                defaultValue: 120
                            }
                        }
                    },
                    {
                        opcode: "aimech_3dof_arm_move",
                        blockType: "command",
                        text: this.context.t('block.aimech_3dof_arm_move'),
                        blockIconURI: this.context.asset('assets/claw.svg'),
                        arguments: {
                            VALUE1: {
                                type: "number",
                                defaultValue: 0
                            },
                            VALUE2: {
                                type: "number",
                                defaultValue: 0
                            },
                            VALUE3: {
                                type: "number",
                                defaultValue: 0
                            },
                            VALUE4: {
                                type: "number",
                                defaultValue: 1000
                            }
                        }
                    }
                ]
            };
        }
        return {
            id: "actuator",
            name: this.context.t(product.name),
            color1: "#2D87C9",
            color2: "#2D87C9",
            color3: "#2D87C9",
            menus: {
                arm_3dof: {
                    acceptReporters: false,
                    items: [
                        {
                            text: this.context.t('menu.arm_3dof.0'),
                            value: "0"
                        },
                        {
                            text: this.context.t('menu.arm_3dof.1'),
                            value: "1"
                        }
                    ]
                }
            },
            blocks: [
                {
                    subCategory: this.context.t('group.arm')
                },
                {
                    opcode: "aimech_3dof_arm_init",
                    blockType: "command",
                    text: this.context.t('block.aimech_3dof_arm_init'),
                    blockIconURI: this.context.asset('assets/claw.svg'),
                    arguments: {
                        ARM: {
                            type: "string",
                            defaultValue: "0",
                            menu: "arm_3dof",
                            literal: true
                        },
                        VALUE1: {
                            type: "number",
                            defaultValue: 55
                        },
                        VALUE2: {
                            type: "number",
                            defaultValue: 76
                        },
                        VALUE3: {
                            type: "number",
                            defaultValue: 27
                        },
                        VALUE4: {
                            type: "number",
                            defaultValue: 120
                        }
                    }
                },
                {
                    opcode: "aimech_3dof_arm_move",
                    blockType: "command",
                    text: this.context.t('block.aimech_3dof_arm_move'),
                    blockIconURI: this.context.asset('assets/claw.svg'),
                    arguments: {
                        VALUE1: {
                            type: "number",
                            defaultValue: 0
                        },
                        VALUE2: {
                            type: "number",
                            defaultValue: 0
                        },
                        VALUE3: {
                            type: "number",
                            defaultValue: 0
                        },
                        VALUE4: {
                            type: "number",
                            defaultValue: 1000
                        }
                    }
                }
            ]
        };
    }

    // 两前缀使用同一 SDK；仅初始化积木收集对象，读取和运动不隐式初始化。
    getPython (): Record<string, PythonTemplate> {
        this.checkVariant();
        return {
            aimech_3dof_arm_init: {
                template: "",
                imports: [
                    "import Hiwonder"
                ],
                variables: [
                    "dof3Arm = Hiwonder.Arm_3DOF({VALUE1},{VALUE2},{VALUE3},{VALUE4},{ARM})"
                ]
            },
            aimech_3dof_arm_move: {
                template: "dof3Arm.move_to_yz({VALUE1},{VALUE2},{VALUE3},{VALUE4})",
                imports: [
                    "import Hiwonder"
                ]
            }
        };
    }
}
