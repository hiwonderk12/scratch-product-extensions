// 机械臂作者入口：集中维护积木、四语文案与按需 Python 依赖。
import type {ExtensionContext, ExtensionInfo, NativeExtension, PythonTemplate} from '../../../../tools/sdk';

export const messages = {
    "zh-cn": {
        "product.name": "AI机甲连杆机械臂",
        "group.arm": "连杆机械臂",
        "block.aimech_rod_arm_init": "初始化连杆机械臂",
        "block.aimech_rod_reach_detect": "检测坐标Y [VALUE1] 毫米,Z [VALUE2] 毫米是否可以到达",
        "block.aimech_rod_arm_move": "控制机械臂运动到 Y轴(前后方向) [VALUE1] 毫米, Z轴(上下方向) [VALUE2] 毫米, 运动时长 [VALUE3] 毫秒, [VALUE4] 等待",
        "menu.delay_select.0": "不延时",
        "menu.delay_select.1": "延时"
    },
    en: {
        "product.name": "AI Mech Linkage Arm",
        "group.arm": "Linkage arm",
        "block.aimech_rod_arm_init": "Initialize linkage arm",
        "block.aimech_rod_reach_detect": "Check if Y [VALUE1] mm, Z [VALUE2] mm is reachable",
        "block.aimech_rod_arm_move": "Move arm to Y (forward/backward) [VALUE1] mm, Z (up/down) [VALUE2] mm, duration [VALUE3] ms [VALUE4]",
        "menu.delay_select.0": "Do not wait",
        "menu.delay_select.1": "Wait"
    },
    "zh-tw": {
        "product.name": "AI機甲連桿機械臂",
        "group.arm": "連桿機械臂",
        "block.aimech_rod_arm_init": "初始化連桿機械臂",
        "block.aimech_rod_reach_detect": "偵測座標Y [VALUE1] 毫米,Z [VALUE2] 毫米是否可以到達",
        "block.aimech_rod_arm_move": "控制機械臂運動到 Y軸(前後方向) [VALUE1] 毫米, Z軸(上下方向) [VALUE2] 毫米, 運動時長 [VALUE3] 毫秒, [VALUE4] 等待",
        "menu.delay_select.0": "不延時",
        "menu.delay_select.1": "延時"
    },
    ko: {
        "product.name": "AI 메카 링크 로봇 팔",
        "group.arm": "링크 로봇 팔",
        "block.aimech_rod_arm_init": "링크 로봇 팔 초기화하기",
        "block.aimech_rod_reach_detect": "Y [VALUE1] mm, Z [VALUE2] mm 좌표에 도달할 수 있는지 확인하기",
        "block.aimech_rod_arm_move": "로봇 팔을 Y축(앞뒤) [VALUE1] mm, Z축(위아래) [VALUE2] mm로 이동하기, 동작 시간 [VALUE3] ms [VALUE4]",
        "menu.delay_select.0": "기다리지 않기",
        "menu.delay_select.1": "기다리기"
    }
} as const;

export const product = {name: 'product.name', supportedLocales: ['zh-cn', 'en', 'zh-tw', 'ko']} as const;

export default class LinkageArmBlocks implements NativeExtension {
    constructor (private readonly context: ExtensionContext) {}

    private checkVariant (): void {
        if (!['hiwonder-actuator', 'hiwonder-xarm'].includes(this.context.variant)) {
            throw new Error('xarm-linkage: 未支持的主控适配 ' + this.context.variant);
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
                    delay_select: {
                        acceptReporters: false,
                        items: [
                            {
                                text: this.context.t('menu.delay_select.0'),
                                value: "False"
                            },
                            {
                                text: this.context.t('menu.delay_select.1'),
                                value: "True"
                            }
                        ]
                    }
                },
                blocks: [
                    {
                        subCategory: this.context.t('group.arm')
                    },
                    {
                        opcode: "aimech_rod_arm_init",
                        blockType: "command",
                        text: this.context.t('block.aimech_rod_arm_init'),
                        arguments: {}
                    },
                    {
                        opcode: "aimech_rod_reach_detect",
                        blockType: "Boolean",
                        disableMonitor: true,
                        text: this.context.t('block.aimech_rod_reach_detect'),
                        arguments: {
                            VALUE1: {
                                type: "number",
                                defaultValue: 0
                            },
                            VALUE2: {
                                type: "number",
                                defaultValue: 0
                            }
                        }
                    },
                    {
                        opcode: "aimech_rod_arm_move",
                        blockType: "command",
                        text: this.context.t('block.aimech_rod_arm_move'),
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
                                defaultValue: 1000
                            },
                            VALUE4: {
                                type: "string",
                                defaultValue: "False",
                                menu: "delay_select",
                                literal: true
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
                delay_select: {
                    acceptReporters: false,
                    items: [
                        {
                            text: this.context.t('menu.delay_select.0'),
                            value: "False"
                        },
                        {
                            text: this.context.t('menu.delay_select.1'),
                            value: "True"
                        }
                    ]
                }
            },
            blocks: [
                {
                    subCategory: this.context.t(product.name)
                },
                {
                    opcode: "aimech_rod_arm_init",
                    blockType: "command",
                    text: this.context.t('block.aimech_rod_arm_init'),
                    arguments: {}
                },
                {
                    opcode: "aimech_rod_reach_detect",
                    blockType: "Boolean",
                    disableMonitor: true,
                    text: this.context.t('block.aimech_rod_reach_detect'),
                    arguments: {
                        VALUE1: {
                            type: "number",
                            defaultValue: 0
                        },
                        VALUE2: {
                            type: "number",
                            defaultValue: 0
                        }
                    }
                },
                {
                    opcode: "aimech_rod_arm_move",
                    blockType: "command",
                    text: this.context.t('block.aimech_rod_arm_move'),
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
                            defaultValue: 1000
                        },
                        VALUE4: {
                            type: "string",
                            defaultValue: "False",
                            menu: "delay_select",
                            literal: true
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
            aimech_rod_arm_init: {
                template: "",
                imports: [
                    "import Hiwonder"
                ],
                variables: [
                    "rodArm = Hiwonder.Arm_Link()"
                ]
            },
            aimech_rod_reach_detect: {
                template: "rodArm.is_s1s2_angle({VALUE1},{VALUE2})",
                imports: [
                    "import Hiwonder"
                ]
            },
            aimech_rod_arm_move: {
                template: "rodArm.move_to_yz({VALUE1},{VALUE2},{VALUE3},{VALUE4})",
                imports: [
                    "import Hiwonder"
                ]
            }
        };
    }
}
