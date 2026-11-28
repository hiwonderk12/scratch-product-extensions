import type {ExtensionContext, ExtensionInfo, NativeExtension, PythonTemplate} from '../../../../tools/sdk';

// 产品积木、菜单、集中 i18n 文案及 Python 规则在本文件维护；保留隐藏 set_gait 以兼容既有工程。
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
                        {text: this.context.t("menu.action_name.nod"), value: "nod"},
                        {text: this.context.t("menu.action_name.sit_down"), value: "sit_down"},
                        {text: this.context.t("menu.action_name.go_prone"), value: "go_prone"},
                        {text: this.context.t("menu.action_name.shake_head"), value: "shake_head"},
                        {text: this.context.t("menu.action_name.squat_preset"), value: "squat_preset"},
                        {text: this.context.t("menu.action_name.action_roll_preset"), value: "action_roll_preset"},
                        {text: this.context.t("menu.action_name.action_pitch_preset"), value: "action_pitch_preset"},
                        {text: this.context.t("menu.action_name.action_yaw_preset"), value: "action_yaw_preset"},
                        {text: this.context.t("menu.action_name.3axis_preset"), value: "3axis_preset"},
                        {text: this.context.t("menu.action_name.pee_preset"), value: "pee_preset"},
                        {text: this.context.t("menu.action_name.coquetry"), value: "coquetry"},
                        {text: this.context.t("menu.action_name.handshake"), value: "handshake"},
                        {text: this.context.t("menu.action_name.stretch_oneself"), value: "stretch_oneself"},
                        {text: this.context.t("menu.action_name.sway_preset"), value: "sway_preset"},
                        {text: this.context.t("menu.action_name.happy_trot"), value: "happy_trot"},
                        {text: this.context.t("menu.action_name.head_rubbing"), value: "head_rubbing"},
                        {text: this.context.t("menu.action_name.shake_buttocks"), value: "shake_buttocks"},
                        {text: this.context.t("menu.action_name.sitting_salute"), value: "sitting_salute"},
                        {text: this.context.t("menu.action_name.sitting_wave_hand"), value: "sitting_wave_hand"},
                        {text: this.context.t("menu.action_name.suspicious_tilt"), value: "suspicious_tilt"}
                    ]
                },
                blocking: {
                    acceptReporters: false,
                    items: [
                        {text: this.context.t("menu.blocking.True"), value: "True"},
                        {text: this.context.t("menu.blocking.False"), value: "False"}
                    ]
                },
                oriention_turn: {
                    acceptReporters: false,
                    items: [
                        {text: this.context.t("menu.oriention_turn.1"), value: "1"},
                        {text: this.context.t("menu.oriention_turn.-1"), value: "-1"}
                    ]
                },
                oriention_move: {
                    acceptReporters: false,
                    items: [
                        {text: this.context.t("menu.oriention_move.1"), value: "1"},
                        {text: this.context.t("menu.oriention_move.-1"), value: "-1"}
                    ]
                },
                orientation: {
                    acceptReporters: false,
                    items: [
                        {text: this.context.t("menu.orientation.0"), value: "0"},
                        {text: this.context.t("menu.orientation.180"), value: "180"},
                        {text: this.context.t("menu.orientation.90"), value: "90"},
                        {text: this.context.t("menu.orientation.-90"), value: "-90"},
                        {text: this.context.t("menu.orientation.45"), value: "45"},
                        {text: this.context.t("menu.orientation.-45"), value: "-45"},
                        {text: this.context.t("menu.orientation.75"), value: "75"},
                        {text: this.context.t("menu.orientation.-75"), value: "-75"}
                    ]
                },
                gait: {
                    acceptReporters: false,
                    items: [
                        {text: this.context.t("menu.gait.0"), value: "0"},
                        {text: this.context.t("menu.gait.1"), value: "1"},
                        {text: this.context.t("menu.gait.2"), value: "2"},
                        {text: this.context.t("menu.gait.3"), value: "3"},
                        {text: this.context.t("menu.gait.4"), value: "4"}
                    ]
                },
                tones: {
                    acceptReporters: false,
                    items: [
                        {text: "C2", value: "65"}, {text: "D2", value: "73"}, {text: "E2", value: "82"},
                        {text: "F2", value: "87"}, {text: "G2", value: "98"}, {text: "A2", value: "110"},
                        {text: "B2", value: "123"}, {text: "C3", value: "131"}, {text: "D3", value: "147"},
                        {text: "E3", value: "165"}, {text: "F3", value: "175"}, {text: "G3", value: "196"},
                        {text: "A3", value: "220"}, {text: "B3", value: "247"}, {text: "C4", value: "262"},
                        {text: "D4", value: "294"}, {text: "E4", value: "330"}, {text: "F4", value: "349"},
                        {text: "G4", value: "392"}, {text: "A4", value: "440"}, {text: "B4", value: "494"},
                        {text: "C5", value: "523"}, {text: "D5", value: "587"}, {text: "E5", value: "659"},
                        {text: "F5", value: "698"}, {text: "G5", value: "784"}, {text: "A5", value: "880"},
                        {text: "B5", value: "988"}, {text: "C6", value: "1047"}, {text: "D6", value: "1175"},
                        {text: "E6", value: "1319"}, {text: "F6", value: "1397"}, {text: "G6", value: "1568"},
                        {text: "A6", value: "1760"}, {text: "B6", value: "1976"}, {text: "C7", value: "2093"},
                        {text: "D7", value: "2349"}, {text: "E7", value: "2637"}, {text: "F7", value: "2794"},
                        {text: "G7", value: "3136"}, {text: "A7", value: "3520"}, {text: "B7", value: "3951"},
                        {text: "C8", value: "4186"}, {text: "D8", value: "4699"}
                    ]
                },
                rhythms: {
                    acceptReporters: false,
                    items: [
                        {text: this.context.t("menu.rhythms.500"), value: "500"},
                        {text: this.context.t("menu.rhythms.250"), value: "250"},
                        {text: this.context.t("menu.rhythms.125"), value: "125"},
                        {text: this.context.t("menu.rhythms.1000"), value: "1000"},
                        {text: this.context.t("menu.rhythms.2000"), value: "2000"},
                        {text: this.context.t("menu.rhythms.5000"), value: "5000"},
                        {text: this.context.t("menu.rhythms.0"), value: "0"}
                    ]
                },
                on_off: {
                    acceptReporters: false,
                    items: [
                        {text: this.context.t("menu.on_off.True"), value: "True"},
                        {text: this.context.t("menu.on_off.False"), value: "False"}
                    ]
                },
                leg_select: {
                    acceptReporters: false,
                    items: [
                        {text: this.context.t("menu.leg_select.1"), value: "1"},
                        {text: this.context.t("menu.leg_select.2"), value: "2"},
                        {text: this.context.t("menu.leg_select.3"), value: "3"},
                        {text: this.context.t("menu.leg_select.4"), value: "4"}
                    ]
                },
                leg_joint: {
                    acceptReporters: false,
                    items: [
                        {text: this.context.t("menu.leg_joint.1"), value: "1"},
                        {text: this.context.t("menu.leg_joint.2"), value: "2"},
                        {text: this.context.t("menu.leg_joint.3"), value: "3"}
                    ]
                },
                servo_torque: {
                    acceptReporters: false,
                    items: [
                        {text: this.context.t("menu.servo_torque.1"), value: "1"},
                        {text: this.context.t("menu.servo_torque.0"), value: "0"}
                    ]
                },
                euler_element: {
                    acceptReporters: false,
                    items: [
                        {text: this.context.t("menu.euler_element.0"), value: "0"},
                        {text: this.context.t("menu.euler_element.1"), value: "1"},
                        {text: this.context.t("menu.euler_element.2"), value: "2"}
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
                        TONES: {type: "string", defaultValue: "65", menu: "tones", literal: true},
                        RHYTHMS: {type: "string", defaultValue: "500", menu: "rhythms", literal: true},
                        VALUE: {type: "number", defaultValue: 100},
                        VALUE2: {type: "number", defaultValue: 1}
                    }
                },
                {
                    opcode: "buzzer_tone_set_arg",
                    blockType: "command",
                    text: this.context.t("block.buzzer_tone_set_arg"),
                    arguments: {
                        TONES: {type: "number", defaultValue: 65},
                        RHYTHMS: {type: "number", defaultValue: 500},
                        VALUE: {type: "number", defaultValue: 100},
                        VALUE2: {type: "number", defaultValue: 1}
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
                        VALUE: {type: "string", defaultValue: "True", menu: "on_off", literal: true}
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
                        STR: {type: "string", defaultValue: "Hello"}
                    }
                },
                {
                    opcode: "print_number",
                    blockType: "command",
                    text: this.context.t("block.print_number"),
                    arguments: {
                        NUM: {type: "number", defaultValue: 60}
                    }
                },
                {
                    subCategory: this.context.t("group.3")
                },
                {
                    opcode: "set_frequency_move",
                    blockType: "command",
                    text: this.context.t("block.set_frequency_move"),
                    arguments: {
                        VALUE: {type: "number", defaultValue: 3}
                    }
                },
                {
                    opcode: "set_step_length_move",
                    blockType: "command",
                    text: this.context.t("block.set_step_length_move"),
                    arguments: {
                        VALUE: {type: "number", defaultValue: 40}
                    }
                },
                {
                    opcode: "set_move",
                    blockType: "command",
                    text: this.context.t("block.set_move"),
                    arguments: {
                        VALUE1: {type: "string", defaultValue: "0", menu: "orientation", literal: true},
                        VALUE2: {type: "number", defaultValue: 200},
                        VALUE3: {type: "number", defaultValue: 20},
                        VALUE4: {type: "number", defaultValue: 80}
                    }
                },
                {
                    opcode: "set_keep_move",
                    blockType: "command",
                    text: this.context.t("block.set_keep_move"),
                    arguments: {
                        VALUE1: {type: "string", defaultValue: "0", menu: "orientation", literal: true},
                        VALUE2: {type: "number", defaultValue: 20},
                        VALUE3: {type: "number", defaultValue: 80}
                    }
                },
                {
                    opcode: "set_move_xyz",
                    blockType: "command",
                    text: this.context.t("block.set_move_xyz"),
                    arguments: {
                        VALUE1: {type: "number", defaultValue: 0},
                        VALUE2: {type: "number", defaultValue: 0},
                        VALUE3: {type: "number", defaultValue: 0},
                        VALUE4: {type: "number", defaultValue: 20}
                    }
                },
                {
                    opcode: "set_turn",
                    blockType: "command",
                    text: this.context.t("block.set_turn"),
                    arguments: {
                        VALUE1: {type: "number", defaultValue: 0},
                        VALUE2: {type: "string", defaultValue: "1", menu: "oriention_turn", literal: true},
                        VALUE3: {type: "number", defaultValue: 1}
                    }
                },
                {
                    opcode: "set_move_left_right",
                    blockType: "command",
                    text: this.context.t("block.set_move_left_right"),
                    arguments: {
                        VALUE1: {type: "number", defaultValue: 50},
                        VALUE2: {type: "string", defaultValue: "1", menu: "oriention_move", literal: true},
                        VALUE3: {type: "number", defaultValue: 1}
                    }
                },
                {
                    opcode: "set_gait",
                    blockType: "command",
                    hideFromPalette: true,
                    text: this.context.t("block.set_gait"),
                    arguments: {
                        VALUE1: {type: "string", defaultValue: "0", menu: "gait", literal: true}
                    }
                },
                {
                    opcode: "set_stop",
                    blockType: "command",
                    text: this.context.t("block.set_stop"),
                    arguments: {}
                },
                {
                    subCategory: this.context.t("group.5")
                },
                {
                    opcode: "pose_init",
                    blockType: "command",
                    text: this.context.t("block.pose_init"),
                    arguments: {}
                },
                {
                    opcode: "set_pose",
                    blockType: "command",
                    text: this.context.t("block.set_pose"),
                    arguments: {
                        VALUE1: {type: "number", defaultValue: 0},
                        VALUE2: {type: "number", defaultValue: 0},
                        VALUE3: {type: "number", defaultValue: 0},
                        VALUE4: {type: "number", defaultValue: 500}
                    }
                },
                {
                    opcode: "set_pose_height",
                    blockType: "command",
                    text: this.context.t("block.set_pose_height"),
                    arguments: {
                        VALUE1: {type: "number", defaultValue: 0},
                        VALUE2: {type: "number", defaultValue: 500}
                    }
                },
                {
                    opcode: "set_pose_body",
                    blockType: "command",
                    text: this.context.t("block.set_pose_body"),
                    arguments: {
                        VALUE1: {type: "number", defaultValue: 0},
                        VALUE2: {type: "number", defaultValue: 0},
                        VALUE3: {type: "number", defaultValue: 500}
                    }
                },
                {
                    opcode: "set_leg_angle",
                    blockType: "command",
                    text: this.context.t("block.set_leg_angle"),
                    arguments: {
                        VALUE1: {type: "string", defaultValue: "1", menu: "leg_select", literal: true},
                        VALUE2: {type: "string", defaultValue: "1", menu: "leg_joint", literal: true},
                        VALUE3: {type: "number", defaultValue: 2048},
                        VALUE4: {type: "number", defaultValue: 500}
                    }
                },
                {
                    subCategory: this.context.t("group.4")
                },
                {
                    opcode: "run_action",
                    blockType: "command",
                    text: this.context.t("block.run_action"),
                    arguments: {
                        ACTION: {type: "string", defaultValue: "sit_down"},
                        BLOCK: {type: "number", defaultValue: "True", menu: "blocking", literal: true}
                    }
                },
                {
                    opcode: "run_action_name",
                    blockType: "command",
                    text: this.context.t("block.run_action_name"),
                    arguments: {
                        ACTION: {type: "string", defaultValue: "sit_down", menu: "action_name", literal: true},
                        BLOCK: {type: "number", defaultValue: "True", menu: "blocking", literal: true}
                    }
                },
                {
                    opcode: "stop_action",
                    blockType: "command",
                    text: this.context.t("block.stop_action"),
                    arguments: {}
                },
                {
                    subCategory: this.context.t("group.6")
                },
                {
                    opcode: "set_servos_pose",
                    blockType: "command",
                    text: this.context.t("block.set_servos_pose"),
                    arguments: {
                        VALUE1: {type: "number", defaultValue: 21},
                        VALUE2: {type: "number", defaultValue: 2048},
                        VALUE3: {type: "number", defaultValue: 500}
                    }
                },
                {
                    opcode: "read_servos_pose",
                    blockType: "reporter",
                    text: this.context.t("block.read_servos_pose"),
                    disableMonitor: true,
                    arguments: {
                        VALUE1: {type: "number", defaultValue: 21}
                    }
                },
                {
                    opcode: "set_servo_torque",
                    blockType: "command",
                    text: this.context.t("block.set_servo_torque"),
                    arguments: {
                        ID: {type: "number", defaultValue: 1},
                        ENABLE: {type: "number", defaultValue: "1", menu: "servo_torque", literal: true}
                    }
                },
                {
                    opcode: "set_all_servos_torque",
                    blockType: "command",
                    text: this.context.t("block.set_all_servos_torque"),
                    arguments: {
                        ENABLE: {type: "number", defaultValue: "1", menu: "servo_torque", literal: true}
                    }
                },
                {
                    subCategory: this.context.t("group.7")
                },
                {
                    opcode: "imu_init",
                    blockType: "command",
                    text: this.context.t("block.imu_init"),
                    arguments: {}
                },
                {
                    opcode: "imu_cali",
                    blockType: "command",
                    text: this.context.t("block.imu_cali"),
                    arguments: {}
                },
                {
                    opcode: "get_euler_angle_element_value",
                    blockType: "reporter",
                    text: this.context.t("block.get_euler_angle_element_value"),
                    disableMonitor: true,
                    arguments: {
                        VALUE: {type: "string", defaultValue: "0", menu: "euler_element", literal: true}
                    }
                }
            ],
            menuIconURI: this.context.asset("assets/icon.svg")
        };
    }

    // 对齐 1.3.8 全局步长与 DEV 导入，并保持底层姿态/舵机/IMU 控制接口。
    getPython (): Record<string, PythonTemplate> {
        return {
            start_thread: {
                template: "",
                imports: [
                    "import Hiwonder",
                    "import Hiwonder_DEV",
                    "import time"
                ],
                variables: [
                    "aidoggy = Hiwonder.AIDoggy()",
                    "step_ihqogzqm = 40"
                ],
                launcher: "Hiwonder.startMain({MAIN})",
                section: "main"
            },
            start_run_thread: {
                template: "",
                imports: [
                    "import Hiwonder",
                    "import Hiwonder_DEV",
                    "import time"
                ],
                variables: [
                    "aidoggy = Hiwonder.AIDoggy()",
                    "step_ihqogzqm = 40"
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
                template: "beep.set_buzzer({TONES},{RHYTHMS},{VALUE},{VALUE2})",
                variables: [
                    "beep = Hiwonder.Buzzer()"
                ]
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
            set_frequency_move: {
                template: "aidoggy.set_frequency(1, {VALUE})"
            },
            set_step_length_move: {
                template: `aidoggy.set_frequency(0, 0)
step_ihqogzqm = {VALUE}`
            },
            set_move: {
                template: "aidoggy.move({VALUE1},{VALUE2},step_ihqogzqm,{VALUE3},{VALUE4})"
            },
            set_keep_move: {
                template: "aidoggy.translation({VALUE1},{VALUE3},step_ihqogzqm,{VALUE2})"
            },
            set_move_xyz: {
                template: "aidoggy.omni_move({VALUE1},{VALUE2},{VALUE3},step_ihqogzqm,{VALUE4})"
            },
            set_turn: {
                template: `aidoggy.omni_move(0,0,{VALUE1},step_ihqogzqm,20)
time.sleep({VALUE3})
aidoggy.stop()`,
                imports: [
                    "import time"
                ],
                templateSelector: {
                    argument: "VALUE2",
                    cases: {
                        "1": `aidoggy.omni_move(0,0,{VALUE1},step_ihqogzqm,20)
time.sleep({VALUE3})
aidoggy.stop()`,
                        "-1": `aidoggy.omni_move(0,0,-{VALUE1},step_ihqogzqm,20)
time.sleep({VALUE3})
aidoggy.stop()`
                    }
                }
            },
            set_move_left_right: {
                template: `aidoggy.omni_move(0,{VALUE1},0,step_ihqogzqm,20)
time.sleep({VALUE3})
aidoggy.stop()`,
                imports: [
                    "import time"
                ],
                templateSelector: {
                    argument: "VALUE2",
                    cases: {
                        "1": `aidoggy.omni_move(0,{VALUE1},0,step_ihqogzqm,20)
time.sleep({VALUE3})
aidoggy.stop()`,
                        "-1": `aidoggy.omni_move(0,-{VALUE1},0,step_ihqogzqm,20)
time.sleep({VALUE3})
aidoggy.stop()`
                    }
                }
            },
            set_gait: {
                template: "aidoggy.set_gait({VALUE1})"
            },
            set_stop: {
                template: "aidoggy.stop()"
            },
            pose_init: {
                template: "aidoggy.set_pose(pitch=0.0, roll=0.0, body_x=0.0, body_y=0.0, height=0.0, duration=500)"
            },
            set_pose: {
                template: "aidoggy.set_body_angle({VALUE1},{VALUE2},{VALUE3},{VALUE4})"
            },
            set_pose_height: {
                template: "aidoggy.set_body_offset(None,None,{VALUE1},{VALUE2})"
            },
            set_pose_body: {
                template: "aidoggy.set_body_offset({VALUE1},{VALUE2},None,{VALUE3})"
            },
            set_leg_angle: {
                template: "aidoggy.set_servos_pose([[({VALUE1}-1)*3+{VALUE2},{VALUE3}]],{VALUE4})",
                templateSelector: {
                    argument: "VALUE1",
                    cases: {
                        "1": "aidoggy.set_servos_pose([[{VALUE2},{VALUE3}]],{VALUE4})",
                        "2": "aidoggy.set_servos_pose([[3+{VALUE2},{VALUE3}]],{VALUE4})",
                        "3": "aidoggy.set_servos_pose([[6+{VALUE2},{VALUE3}]],{VALUE4})",
                        "4": "aidoggy.set_servos_pose([[9+{VALUE2},{VALUE3}]],{VALUE4})"
                    }
                }
            },
            run_action: {
                template: "aidoggy.run_action_group({ACTION},{BLOCK})"
            },
            run_action_name: {
                template: "aidoggy.run_action_group('{ACTION}',{BLOCK})"
            },
            stop_action: {
                template: "aidoggy.action_stop()"
            },
            set_servos_pose: {
                template: "aidoggy.set_servos_pose([[{VALUE1},{VALUE2}]],{VALUE3})"
            },
            read_servos_pose: {
                template: "aidoggy.read_servos_pose([{VALUE1}])[0][1]"
            },
            set_servo_torque: {
                template: "aidoggy.set_servo_torque({ID},{ENABLE})"
            },
            set_all_servos_torque: {
                template: "aidoggy.set_servo_torque(254,{ENABLE})"
            },
            imu_init: {
                template: "",
                imports: [
                    "import Hiwonder"
                ],
                variables: [
                    "imu = Hiwonder.IMU()"
                ]
            },
            imu_cali: {
                template: "",
                imports: [
                    "import Hiwonder",
                    "import time"
                ],
                variables: [
                    "imu_start_time = time.ticks_ms()",
                    `def is_stop_3091ratyxq():
  return time.ticks_diff(time.ticks_ms(), imu_start_time) >= 30000`
                ],
                forcedVariables: [
                    {
                        name: "imu",
                        code: "imu = Hiwonder.IMU(True, is_stop_3091ratyxq)"
                    }
                ]
            },
            get_euler_angle_element_value: {
                template: "imu.get_angle()[{VALUE}]"
            }
        };
    }
}
