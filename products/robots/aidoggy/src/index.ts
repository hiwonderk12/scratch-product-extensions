import type {ExtensionContext, ExtensionInfo, NativeExtension, PythonTemplate} from '../../../../tools/sdk';

// 产品积木、菜单、集中 i18n 文案及 Python 规则在本文件维护。
import locale0 from './locales/zh-cn.json';
import locale1 from './locales/en.json';
import locale2 from './locales/zh-tw.json';
import locale3 from './locales/ko.json';

export const messages = {
    "zh-cn": locale0,
    "en": locale1,
    "zh-tw": locale2,
    "ko": locale3
} as const;

export const product = {
    "name": "product.name",
    "supportedLocales": [
        "zh-cn",
        "en",
        "zh-tw",
        "ko"
    ]
} as const;

export default class AidoggyBlocks implements NativeExtension {
    constructor (private readonly context: ExtensionContext) {}

    getInfo (): ExtensionInfo {
        return {
            id: "aidoggy",
            name: this.context.t(product.name),
            color1: "#4682b4",
            color2: "#4682b4",
            color3: "#4682b4",
            menus: {
                action_name: {
                    acceptReporters: false,
                    items: [
                        {
                            text: this.context.t("menu.action_name.sit_preset"),
                            value: "sit_preset"
                        },
                        {
                            text: this.context.t("menu.action_name.stand_preset"),
                            value: "stand_preset"
                        },
                        {
                            text: this.context.t("menu.action_name.lieDown_preset"),
                            value: "lieDown_preset"
                        },
                        {
                            text: this.context.t("menu.action_name.squat_preset"),
                            value: "squat_preset"
                        },
                        {
                            text: this.context.t("menu.action_name.stretch_preset"),
                            value: "stretch_preset"
                        },
                        {
                            text: this.context.t("menu.action_name.handshake_preset"),
                            value: "handshake_preset"
                        },
                        {
                            text: this.context.t("menu.action_name.waveHand_preset"),
                            value: "waveHand_preset"
                        },
                        {
                            text: this.context.t("menu.action_name.pee_preset"),
                            value: "pee_preset"
                        },
                        {
                            text: this.context.t("menu.action_name.sway_preset"),
                            value: "sway_preset"
                        },
                        {
                            text: this.context.t("menu.action_name.waveMotion_preset"),
                            value: "waveMotion_preset"
                        },
                        {
                            text: this.context.t("menu.action_name.3axis_preset"),
                            value: "3axis_preset"
                        },
                        {
                            text: this.context.t("menu.action_name.action_pitch_preset"),
                            value: "action_pitch_preset"
                        },
                        {
                            text: this.context.t("menu.action_name.action_roll_preset"),
                            value: "action_roll_preset"
                        },
                        {
                            text: this.context.t("menu.action_name.action_yaw_preset"),
                            value: "action_yaw_preset"
                        }
                    ]
                },
                blocking: {
                    acceptReporters: false,
                    items: [
                        {
                            text: this.context.t("menu.blocking.True"),
                            value: "True"
                        },
                        {
                            text: this.context.t("menu.blocking.False"),
                            value: "False"
                        }
                    ]
                },
                oriention_turn: {
                    acceptReporters: false,
                    items: [
                        {
                            text: this.context.t("menu.oriention_turn.1"),
                            value: "1"
                        },
                        {
                            text: this.context.t("menu.oriention_turn.-1"),
                            value: "-1"
                        }
                    ]
                },
                orientation: {
                    acceptReporters: false,
                    items: [
                        {
                            text: this.context.t("menu.orientation.0"),
                            value: "0"
                        },
                        {
                            text: this.context.t("menu.orientation.180"),
                            value: "180"
                        },
                        {
                            text: this.context.t("menu.orientation.90"),
                            value: "90"
                        },
                        {
                            text: this.context.t("menu.orientation.-90"),
                            value: "-90"
                        },
                        {
                            text: this.context.t("menu.orientation.45"),
                            value: "45"
                        },
                        {
                            text: this.context.t("menu.orientation.-45"),
                            value: "-45"
                        },
                        {
                            text: this.context.t("menu.orientation.75"),
                            value: "75"
                        },
                        {
                            text: this.context.t("menu.orientation.-75"),
                            value: "-75"
                        }
                    ]
                },
                gait: {
                    acceptReporters: false,
                    items: [
                        {
                            text: this.context.t("menu.gait.0"),
                            value: "0"
                        },
                        {
                            text: this.context.t("menu.gait.1"),
                            value: "1"
                        },
                        {
                            text: this.context.t("menu.gait.2"),
                            value: "2"
                        },
                        {
                            text: this.context.t("menu.gait.3"),
                            value: "3"
                        },
                        {
                            text: this.context.t("menu.gait.4"),
                            value: "4"
                        }
                    ]
                },
                tones: {
                    acceptReporters: false,
                    items: [
                        {
                            text: "C2",
                            value: "65"
                        },
                        {
                            text: "D2",
                            value: "73"
                        },
                        {
                            text: "E2",
                            value: "82"
                        },
                        {
                            text: "F2",
                            value: "87"
                        },
                        {
                            text: "G2",
                            value: "98"
                        },
                        {
                            text: "A2",
                            value: "110"
                        },
                        {
                            text: "B2",
                            value: "123"
                        },
                        {
                            text: "C3",
                            value: "131"
                        },
                        {
                            text: "D3",
                            value: "147"
                        },
                        {
                            text: "E3",
                            value: "165"
                        },
                        {
                            text: "F3",
                            value: "175"
                        },
                        {
                            text: "G3",
                            value: "196"
                        },
                        {
                            text: "A3",
                            value: "220"
                        },
                        {
                            text: "B3",
                            value: "247"
                        },
                        {
                            text: "C4",
                            value: "262"
                        },
                        {
                            text: "D4",
                            value: "294"
                        },
                        {
                            text: "E4",
                            value: "330"
                        },
                        {
                            text: "F4",
                            value: "349"
                        },
                        {
                            text: "G4",
                            value: "392"
                        },
                        {
                            text: "A4",
                            value: "440"
                        },
                        {
                            text: "B4",
                            value: "494"
                        },
                        {
                            text: "C5",
                            value: "523"
                        },
                        {
                            text: "D5",
                            value: "587"
                        },
                        {
                            text: "E5",
                            value: "659"
                        },
                        {
                            text: "F5",
                            value: "698"
                        },
                        {
                            text: "G5",
                            value: "784"
                        },
                        {
                            text: "A5",
                            value: "880"
                        },
                        {
                            text: "B5",
                            value: "988"
                        },
                        {
                            text: "C6",
                            value: "1047"
                        },
                        {
                            text: "D6",
                            value: "1175"
                        },
                        {
                            text: "E6",
                            value: "1319"
                        },
                        {
                            text: "F6",
                            value: "1397"
                        },
                        {
                            text: "G6",
                            value: "1568"
                        },
                        {
                            text: "A6",
                            value: "1760"
                        },
                        {
                            text: "B6",
                            value: "1976"
                        },
                        {
                            text: "C7",
                            value: "2093"
                        },
                        {
                            text: "D7",
                            value: "2349"
                        },
                        {
                            text: "E7",
                            value: "2637"
                        },
                        {
                            text: "F7",
                            value: "2794"
                        },
                        {
                            text: "G7",
                            value: "3136"
                        },
                        {
                            text: "A7",
                            value: "3520"
                        },
                        {
                            text: "B7",
                            value: "3951"
                        },
                        {
                            text: "C8",
                            value: "4186"
                        },
                        {
                            text: "D8",
                            value: "4699"
                        }
                    ]
                },
                rhythms: {
                    acceptReporters: false,
                    items: [
                        {
                            text: this.context.t("menu.rhythms.500"),
                            value: "500"
                        },
                        {
                            text: this.context.t("menu.rhythms.250"),
                            value: "250"
                        },
                        {
                            text: this.context.t("menu.rhythms.125"),
                            value: "125"
                        },
                        {
                            text: this.context.t("menu.rhythms.1000"),
                            value: "1000"
                        },
                        {
                            text: this.context.t("menu.rhythms.2000"),
                            value: "2000"
                        },
                        {
                            text: this.context.t("menu.rhythms.5000"),
                            value: "5000"
                        },
                        {
                            text: this.context.t("menu.rhythms.0"),
                            value: "0"
                        }
                    ]
                },
                on_off: {
                    acceptReporters: false,
                    items: [
                        {
                            text: this.context.t("menu.on_off.True"),
                            value: "True"
                        },
                        {
                            text: this.context.t("menu.on_off.False"),
                            value: "False"
                        }
                    ]
                }
            },
            blocks: [
                {
                    opcode: "start_thread",
                    blockType: "hat",
                    text: this.context.t("block.start_thread"),
                    isEdgeActivated: false,
                    arguments: {}
                },
                {
                    opcode: "start_run_thread",
                    blockType: "hat",
                    text: this.context.t("block.start_run_thread"),
                    isEdgeActivated: false,
                    arguments: {}
                },
                {
                    subCategory: this.context.t("group.1")
                },
                {
                    opcode: "buzzer_tone_set",
                    blockType: "command",
                    text: this.context.t("block.buzzer_tone_set"),
                    arguments: {
                        TONES: {
                            type: "string",
                            defaultValue: "65",
                            menu: "tones",
                            literal: true
                        },
                        RHYTHMS: {
                            type: "string",
                            defaultValue: "500",
                            menu: "rhythms",
                            literal: true
                        },
                        VALUE: {
                            type: "number",
                            defaultValue: 100
                        },
                        VALUE2: {
                            type: "number",
                            defaultValue: 1
                        }
                    }
                },
                {
                    opcode: "buzzer_tone_set_arg",
                    blockType: "command",
                    text: this.context.t("block.buzzer_tone_set_arg"),
                    arguments: {
                        TONES: {
                            type: "number",
                            defaultValue: 65
                        },
                        RHYTHMS: {
                            type: "number",
                            defaultValue: 500
                        },
                        VALUE: {
                            type: "number",
                            defaultValue: 100
                        },
                        VALUE2: {
                            type: "number",
                            defaultValue: 1
                        }
                    }
                },
                {
                    opcode: "get_battery_level",
                    blockType: "reporter",
                    text: this.context.t("block.get_battery_level"),
                    disableMonitor: true,
                    arguments: {}
                },
                {
                    opcode: "set_low_battery_alarm",
                    blockType: "command",
                    text: this.context.t("block.set_low_battery_alarm"),
                    arguments: {
                        VALUE: {
                            type: "string",
                            defaultValue: "True",
                            menu: "on_off",
                            literal: true
                        }
                    }
                },
                {
                    subCategory: this.context.t("group.2")
                },
                {
                    opcode: "print_str",
                    blockType: "command",
                    text: this.context.t("block.print_str"),
                    arguments: {
                        STR: {
                            type: "string",
                            defaultValue: "Hello"
                        }
                    }
                },
                {
                    opcode: "print_number",
                    blockType: "command",
                    text: this.context.t("block.print_number"),
                    arguments: {
                        NUM: {
                            type: "number",
                            defaultValue: 60
                        }
                    }
                },
                {
                    subCategory: this.context.t("group.3")
                },
                {
                    opcode: "set_pose",
                    blockType: "command",
                    text: this.context.t("block.set_pose"),
                    arguments: {
                        VALUE6: {
                            type: "number",
                            defaultValue: 1000
                        },
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
                            defaultValue: 0
                        },
                        VALUE5: {
                            type: "number",
                            defaultValue: 0
                        }
                    }
                },
                {
                    opcode: "set_move",
                    blockType: "command",
                    text: this.context.t("block.set_move"),
                    arguments: {
                        VALUE5: {
                            type: "number",
                            defaultValue: 80
                        },
                        VALUE1: {
                            type: "string",
                            defaultValue: "0",
                            menu: "orientation",
                            literal: true
                        },
                        VALUE2: {
                            type: "number",
                            defaultValue: 200
                        },
                        VALUE3: {
                            type: "number",
                            defaultValue: 40
                        },
                        VALUE4: {
                            type: "number",
                            defaultValue: 30
                        }
                    }
                },
                {
                    opcode: "set_move_xyz",
                    blockType: "command",
                    text: this.context.t("block.set_move_xyz"),
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
                            defaultValue: 40
                        },
                        VALUE5: {
                            type: "number",
                            defaultValue: 30
                        }
                    }
                },
                {
                    opcode: "set_turn",
                    blockType: "command",
                    text: this.context.t("block.set_turn"),
                    arguments: {
                        VALUE1: {
                            type: "number",
                            defaultValue: 0
                        },
                        VALUE2: {
                            type: "string",
                            defaultValue: "1",
                            menu: "oriention_turn",
                            literal: true
                        }
                    }
                },
                {
                    opcode: "set_gait",
                    blockType: "command",
                    text: this.context.t("block.set_gait"),
                    arguments: {
                        VALUE1: {
                            type: "string",
                            defaultValue: "0",
                            menu: "gait",
                            literal: true
                        }
                    }
                },
                {
                    opcode: "set_stop",
                    blockType: "command",
                    text: this.context.t("block.set_stop"),
                    arguments: {}
                },
                {
                    subCategory: this.context.t("group.4")
                },
                {
                    opcode: "run_action",
                    blockType: "command",
                    text: this.context.t("block.run_action"),
                    arguments: {
                        ACTION: {
                            type: "string",
                            defaultValue: "sit_preset"
                        },
                        BLOCK: {
                            type: "number",
                            defaultValue: "True",
                            menu: "blocking",
                            literal: true
                        }
                    }
                },
                {
                    opcode: "run_action_name",
                    blockType: "command",
                    text: this.context.t("block.run_action_name"),
                    arguments: {
                        ACTION: {
                            type: "string",
                            defaultValue: "sit_preset",
                            menu: "action_name",
                            literal: true
                        },
                        BLOCK: {
                            type: "number",
                            defaultValue: "True",
                            menu: "blocking",
                            literal: true
                        }
                    }
                },
                {
                    opcode: "stop_action",
                    blockType: "command",
                    text: this.context.t("block.stop_action"),
                    arguments: {}
                }
            ],
            menuIconURI: this.context.asset("assets/icon.svg")
        };
    }

    // 主程序收尾、事件回调和菜单分支直接交给 Python 生成器处理。
    getPython (): Record<string, PythonTemplate> {
        return {
            start_thread: {
                template: "",
                imports: [
                    "import Hiwonder"
                ],
                variables: [
                    "aidoggy = Hiwonder.AIDoggy()"
                ],
                launcher: "Hiwonder.startMain({MAIN})",
                section: "main"
            },
            start_run_thread: {
                template: "",
                imports: [
                    "import Hiwonder"
                ],
                variables: [
                    "aidoggy = Hiwonder.AIDoggy()"
                ],
                section: "setup"
            },
            buzzer_tone_set: {
                template: "beep.set_buzzer({TONES},{RHYTHMS},{VALUE},{VALUE2})",
                variables: [
                    "beep = Hiwonder.Buzzer()"
                ]
            },
            buzzer_tone_set_arg: {
                template: "beep.set_buzzer({TONES},{RHYTHMS},{VALUE},{VALUE2})"
            },
            get_battery_level: {
                template: "rsys.read_battery_voltage()",
                variables: [
                    "rsys = Hiwonder.Robot_System()"
                ]
            },
            set_low_battery_alarm: {
                template: "rsys.set_low_voltage_alarm_enable({VALUE})",
                variables: [
                    "rsys = Hiwonder.Robot_System()"
                ]
            },
            print_str: {
                template: `print({STR})
time.sleep(0.05)`,
                imports: [
                    "import time"
                ]
            },
            print_number: {
                template: `print({NUM})
time.sleep(0.05)`,
                imports: [
                    "import time"
                ]
            },
            set_pose: {
                template: "aidoggy.set_pose({VALUE1},{VALUE2},{VALUE3},{VALUE4},{VALUE5},{VALUE6})"
            },
            set_move: {
                template: "aidoggy.move({VALUE1},{VALUE2},{VALUE3},{VALUE4},{VALUE5})"
            },
            set_move_xyz: {
                template: "aidoggy.omni_move({VALUE1},{VALUE2},{VALUE3},{VALUE4},{VALUE5})"
            },
            set_turn: {
                template: "aidoggy.omni_move(0,0,{VALUE1},0,0)",
                templateSelector: {
                    argument: "VALUE2",
                    cases: {
                        "1": "aidoggy.omni_move(0,0,{VALUE1},0,0)",
                        "-1": "aidoggy.omni_move(0,0,-{VALUE1},0,0)"
                    }
                }
            },
            set_gait: {
                template: "aidoggy.set_gait({VALUE1})"
            },
            set_stop: {
                template: "aidoggy.stop()"
            },
            run_action: {
                template: "aidoggy.run_action_group({ACTION},{BLOCK})"
            },
            run_action_name: {
                template: "aidoggy.run_action_group('{ACTION}',{BLOCK})"
            },
            stop_action: {
                template: "aidoggy.action_stop()"
            }
        };
    }
}
