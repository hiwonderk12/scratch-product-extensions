// 长电机：只在 AIBlocksBoard 上声明直控通道，四语和 Python 共用一个产品类。
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

export default class LongMotorBlocks implements NativeExtension {
    constructor (private readonly context: ExtensionContext) {}

    private checkVariant (): void {
        if (this.context.variant !== 'hiwonder-direct') throw new Error('power/long-motor: 未支持的主控适配 ' + this.context.variant);
    }

    // 菜单值保留旧工程协议；M/S 通道不是 IIC 端口，不读取机器人端口表。
    getInfo (): ExtensionInfo {
        this.checkVariant();
        return {
            id: "actuator",
            name: this.context.t(product.name),
            color1: "#2D87C9",
            color2: "#2D87C9",
            color3: "#2D87C9",
            blocks: [
                {
                    subCategory: this.context.t('group.1')
                },
                {
                    opcode: "long_motor_set_speed",
                    text: this.context.t('block.long_motor_set_speed'),
                    blockType: "command",
                    arguments: {
                        MOTOR: {
                            type: "string",
                            menu: "motors",
                            defaultValue: "1",
                            literal: true
                        },
                        SPEED: {
                            type: "slider",
                            defaultValue: 50
                        },
                        ORIENTION: {
                            type: "string",
                            menu: "oriention",
                            defaultValue: "1",
                            literal: true
                        },
                        MODE: {
                            type: "string",
                            menu: "movemode",
                            defaultValue: "True",
                            literal: true
                        }
                    }
                },
                {
                    opcode: "long_motor_set_control",
                    text: this.context.t('block.long_motor_set_control'),
                    blockType: "command",
                    arguments: {
                        MOTOR: {
                            type: "string",
                            menu: "motors",
                            defaultValue: "1",
                            literal: true
                        },
                        SPEED: {
                            type: "slider",
                            defaultValue: 50
                        },
                        ORIENTION: {
                            type: "string",
                            menu: "oriention5",
                            defaultValue: "0",
                            literal: true
                        },
                        VALUE: {
                            type: "number",
                            defaultValue: 0
                        },
                        RUNMODE: {
                            type: "string",
                            menu: "runmode",
                            defaultValue: "2",
                            literal: true
                        },
                        DELAY: {
                            type: "string",
                            menu: "delay",
                            defaultValue: "True",
                            literal: true
                        }
                    }
                },
                {
                    opcode: "long_motor_set_speed_zero",
                    text: this.context.t('block.long_motor_set_speed_zero'),
                    blockType: "command",
                    arguments: {
                        MOTOR: {
                            type: "string",
                            menu: "motors",
                            defaultValue: "1",
                            literal: true
                        }
                    }
                },
                {
                    opcode: "long_motor_read_speed",
                    text: this.context.t('block.long_motor_read_speed'),
                    blockType: "reporter",
                    isEdgeActivated: false,
                    disableMonitor: true,
                    arguments: {
                        MOTOR: {
                            type: "string",
                            menu: "motors",
                            defaultValue: "1",
                            literal: true
                        }
                    }
                },
                {
                    opcode: "long_motor_read_pose_relative",
                    text: this.context.t('block.long_motor_read_pose_relative'),
                    blockType: "reporter",
                    isEdgeActivated: false,
                    disableMonitor: true,
                    arguments: {
                        MOTOR: {
                            type: "string",
                            menu: "motors",
                            defaultValue: "1",
                            literal: true
                        }
                    }
                },
                {
                    opcode: "long_motor_set_0_degrees_relative",
                    text: this.context.t('block.long_motor_set_0_degrees_relative'),
                    blockType: "command",
                    arguments: {
                        MOTOR: {
                            type: "string",
                            menu: "motors",
                            defaultValue: "1",
                            literal: true
                        }
                    }
                },
                {
                    subCategory: this.context.t('group.2')
                },
                {
                    opcode: "long_motor_set_run",
                    text: this.context.t('block.long_motor_set_run'),
                    blockType: "command",
                    arguments: {
                        MOTOR: {
                            type: "string",
                            menu: "motors",
                            defaultValue: "1",
                            literal: true
                        },
                        SPEED: {
                            type: "slider",
                            defaultValue: 50
                        },
                        NUM: {
                            type: "number",
                            defaultValue: 0
                        },
                        DELAY: {
                            type: "string",
                            menu: "delay",
                            defaultValue: "True",
                            literal: true
                        }
                    }
                },
                {
                    opcode: "long_motor_read_pose_absolute",
                    text: this.context.t('block.long_motor_read_pose_absolute'),
                    blockType: "reporter",
                    isEdgeActivated: false,
                    disableMonitor: true,
                    arguments: {
                        MOTOR: {
                            type: "string",
                            menu: "motors",
                            defaultValue: "1",
                            literal: true
                        }
                    }
                },
                {
                    subCategory: this.context.t('group.3')
                },
                {
                    opcode: "long_motor_init_car",
                    text: this.context.t('block.long_motor_init_car'),
                    blockType: "command",
                    arguments: {
                        MOTOR1: {
                            type: "string",
                            menu: "motors",
                            defaultValue: "1",
                            literal: true
                        },
                        MOTOR2: {
                            type: "string",
                            menu: "motors",
                            defaultValue: "2",
                            literal: true
                        },
                        VALUE1: {
                            type: "number",
                            defaultValue: 6
                        },
                        VALUE2: {
                            type: "number",
                            defaultValue: 12
                        }
                    }
                },
                {
                    opcode: "long_motor_set_car_run",
                    text: this.context.t('block.long_motor_set_car_run'),
                    blockType: "command",
                    arguments: {
                        SPEED: {
                            type: "slider",
                            defaultValue: 50
                        },
                        ORIENTION: {
                            type: "string",
                            menu: "oriention_all2",
                            defaultValue: "0",
                            literal: true
                        },
                        VALUE: {
                            type: "number",
                            defaultValue: 0
                        },
                        RUNMODE: {
                            type: "string",
                            menu: "runmode2",
                            defaultValue: "3",
                            literal: true
                        }
                    }
                },
                {
                    opcode: "long_motorset_car_rotate",
                    text: this.context.t('block.long_motorset_car_rotate'),
                    blockType: "command",
                    arguments: {
                        SPEED: {
                            type: "slider",
                            defaultValue: 50
                        },
                        ORIENTION: {
                            type: "string",
                            menu: "turn",
                            defaultValue: "-1",
                            literal: true
                        },
                        VALUE: {
                            type: "number",
                            defaultValue: 0
                        }
                    }
                },
                {
                    opcode: "long_motor_set_car_move",
                    text: this.context.t('block.long_motor_set_car_move'),
                    blockType: "command",
                    arguments: {
                        VALUE1: {
                            type: "slider100",
                            defaultValue: 50
                        },
                        VALUE2: {
                            type: "slider100",
                            defaultValue: 50
                        },
                        MODE: {
                            type: "string",
                            menu: "movemode",
                            defaultValue: "True",
                            literal: true
                        }
                    }
                },
                {
                    opcode: "long_motor_set_car_stop",
                    text: this.context.t('block.long_motor_set_car_stop'),
                    blockType: "command",
                    arguments: {}
                },
                {
                    opcode: "long_motor_set_car_rotate_bias",
                    text: this.context.t('block.long_motor_set_car_rotate_bias'),
                    blockType: "command",
                    arguments: {
                        VALUE: {
                            type: "number",
                            defaultValue: 1
                        }
                    }
                }
            ],
            menus: {
                motors: {
                    acceptReporters: false,
                    items: [
                        {
                            text: "M1",
                            value: "1"
                        },
                        {
                            text: "M2",
                            value: "2"
                        },
                        {
                            text: "M3",
                            value: "3"
                        },
                        {
                            text: "M4",
                            value: "4"
                        }
                    ]
                },
                oriention: {
                    acceptReporters: false,
                    items: [
                        {
                            text: this.context.t('menu.oriention.0'),
                            value: "1"
                        },
                        {
                            text: this.context.t('menu.oriention.1'),
                            value: "-1"
                        }
                    ]
                },
                delay: {
                    acceptReporters: false,
                    items: [
                        {
                            text: this.context.t('menu.delay.0'),
                            value: "True"
                        },
                        {
                            text: this.context.t('menu.delay.1'),
                            value: "False"
                        }
                    ]
                },
                oriention_all2: {
                    acceptReporters: false,
                    items: [
                        {
                            text: this.context.t('menu.oriention_all2.0'),
                            value: "0"
                        },
                        {
                            text: this.context.t('menu.oriention_all2.1'),
                            value: "1"
                        }
                    ]
                },
                oriention5: {
                    acceptReporters: false,
                    items: [
                        {
                            text: this.context.t('menu.oriention5.0'),
                            value: "0"
                        },
                        {
                            text: this.context.t('menu.oriention5.1'),
                            value: "1"
                        }
                    ]
                },
                runmode: {
                    acceptReporters: false,
                    items: [
                        {
                            text: this.context.t('menu.runmode.0'),
                            value: "2"
                        },
                        {
                            text: this.context.t('menu.runmode.1'),
                            value: "3"
                        },
                        {
                            text: this.context.t('menu.runmode.2'),
                            value: "1"
                        }
                    ]
                },
                runmode2: {
                    acceptReporters: false,
                    items: [
                        {
                            text: this.context.t('menu.runmode2.0'),
                            value: "3"
                        },
                        {
                            text: this.context.t('menu.runmode2.1'),
                            value: "1"
                        },
                        {
                            text: this.context.t('menu.runmode2.2'),
                            value: "2"
                        }
                    ]
                },
                turn: {
                    acceptReporters: false,
                    items: [
                        {
                            text: this.context.t('menu.turn.0'),
                            value: "-1"
                        },
                        {
                            text: this.context.t('menu.turn.1'),
                            value: "1"
                        }
                    ]
                },
                movemode: {
                    acceptReporters: false,
                    items: [
                        {
                            text: this.context.t('menu.movemode.0'),
                            value: "True"
                        },
                        {
                            text: this.context.t('menu.movemode.1'),
                            value: "False"
                        }
                    ]
                }
            }
        };
    }

    // 入口由主板提供 import；按所用通道收集对象，生成器负责初始化去重。
    getPython (): Record<string, PythonTemplate> {
        this.checkVariant();
        return {
            long_motor_set_speed: {
                template: "motor_{MOTOR}.set_speed({SPEED} * 8 * {ORIENTION},False)",
                variables: [
                    "uart = Hiwonder.UART(115200)",
                    "motor_{MOTOR} = Hiwonder.Motor(uart,{MOTOR})"
                ],
                setups: [
                    "motor_{MOTOR}.set_mode(0)"
                ]
            },
            long_motor_set_control: {
                template: "motor_{MOTOR}.set_motor_distance_ctl({RUNMODE},{ORIENTION},{VALUE},{SPEED}*8,{DELAY})",
                variables: [
                    "uart = Hiwonder.UART(115200)",
                    "motor_{MOTOR} = Hiwonder.Motor(uart,{MOTOR})"
                ],
                setups: [
                    "motor_{MOTOR}.set_mode(0)"
                ]
            },
            long_motor_set_speed_zero: {
                template: "motor_{MOTOR}.set_speed(0)",
                variables: [
                    "uart = Hiwonder.UART(115200)",
                    "motor_{MOTOR} = Hiwonder.Motor(uart,{MOTOR})"
                ],
                setups: [
                    "motor_{MOTOR}.set_mode(0)"
                ]
            },
            long_motor_read_speed: {
                template: "motor_{MOTOR}.read_speed()",
                variables: [
                    "uart = Hiwonder.UART(115200)",
                    "motor_{MOTOR} = Hiwonder.Motor(uart,{MOTOR})"
                ],
                setups: [
                    "motor_{MOTOR}.set_mode(0)"
                ]
            },
            long_motor_read_pose_relative: {
                template: "motor_{MOTOR}.read_pose_relative()",
                variables: [
                    "uart = Hiwonder.UART(115200)",
                    "motor_{MOTOR} = Hiwonder.Motor(uart,{MOTOR})"
                ],
                setups: [
                    "motor_{MOTOR}.set_mode(0)"
                ]
            },
            long_motor_set_0_degrees_relative: {
                template: "motor_{MOTOR}.set_0_degrees_relative()",
                variables: [
                    "uart = Hiwonder.UART(115200)",
                    "motor_{MOTOR} = Hiwonder.Motor(uart,{MOTOR})"
                ],
                setups: [
                    "motor_{MOTOR}.set_mode(0)"
                ]
            },
            long_motor_set_run: {
                template: "motor_{MOTOR}.set_pose({NUM}, {SPEED} * 8, False, {DELAY})",
                variables: [
                    "uart = Hiwonder.UART(115200)",
                    "motor_{MOTOR} = Hiwonder.Motor(uart,{MOTOR})"
                ],
                setups: [
                    "motor_{MOTOR}.set_mode(0)"
                ]
            },
            long_motor_read_pose_absolute: {
                template: "motor_{MOTOR}.__read_pose()",
                variables: [
                    "uart = Hiwonder.UART(115200)",
                    "motor_{MOTOR} = Hiwonder.Motor(uart,{MOTOR})"
                ],
                setups: [
                    "motor_{MOTOR}.set_mode(0)"
                ]
            },
            long_motor_init_car: {
                template: "",
                variables: [
                    "uart = Hiwonder.UART(115200)",
                    "motor_{MOTOR1} = Hiwonder.Motor(uart,{MOTOR1})",
                    "motor_{MOTOR2} = Hiwonder.Motor(uart,{MOTOR2})",
                    "car = Hiwonder.car(motor_{MOTOR1},motor_{MOTOR2},{VALUE1},{VALUE2})"
                ],
                setups: [
                    "motor_{MOTOR1}.set_mode(0)",
                    "motor_{MOTOR2}.set_mode(0)"
                ]
            },
            long_motor_set_car_run: {
                template: "car.run({SPEED}*8,{ORIENTION},{VALUE},{RUNMODE})"
            },
            long_motorset_car_rotate: {
                template: "car.rotate({VALUE}*{ORIENTION},{SPEED}*8)"
            },
            long_motor_set_car_move: {
                template: "car.move({VALUE1}*8,{VALUE2}*8,False)"
            },
            long_motor_set_car_stop: {
                template: "car.move(0,0)"
            },
            long_motor_set_car_rotate_bias: {
                template: "car.set_rotate_bias({VALUE})"
            }
        };
    }
}
