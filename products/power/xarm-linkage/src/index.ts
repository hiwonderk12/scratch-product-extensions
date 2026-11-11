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
