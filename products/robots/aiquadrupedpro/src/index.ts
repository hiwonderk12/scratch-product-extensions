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

export default class AiquadrupedproBlocks implements NativeExtension {
    constructor (private readonly context: ExtensionContext) {}

    getInfo (): ExtensionInfo {
        return {
            id: "aiquadrupedpro",
            name: this.context.t(product.name),
            color1: "#1874cd",
            color2: "#1874cd",
            color3: "#1874cd",
            menus: {
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
                            text: "0",
                            value: "0"
                        }
                    ]
                },
                buzzerMode: {
                    acceptReporters: false,
                    items: [
                        {
                            text: this.context.t("menu.buzzerMode.False"),
                            value: "False"
                        },
                        {
                            text: this.context.t("menu.buzzerMode.True"),
                            value: "True"
                        }
                    ]
                },
                lightColors: {
                    acceptReporters: false,
                    items: [
                        {
                            text: this.context.t("menu.lightColors.0"),
                            value: "0"
                        },
                        {
                            text: this.context.t("menu.lightColors.1"),
                            value: "1"
                        },
                        {
                            text: this.context.t("menu.lightColors.2"),
                            value: "2"
                        },
                        {
                            text: this.context.t("menu.lightColors.3"),
                            value: "3"
                        },
                        {
                            text: this.context.t("menu.lightColors.4"),
                            value: "4"
                        },
                        {
                            text: this.context.t("menu.lightColors.5"),
                            value: "5"
                        },
                        {
                            text: this.context.t("menu.lightColors.6"),
                            value: "6"
                        }
                    ]
                },
                keys: {
                    acceptReporters: false,
                    items: [
                        {
                            text: "A",
                            value: "A"
                        },
                        {
                            text: "B",
                            value: "B"
                        }
                    ]
                },
                moves: {
                    acceptReporters: false,
                    items: [
                        {
                            text: this.context.t("menu.moves.0"),
                            value: "0"
                        },
                        {
                            text: this.context.t("menu.moves.1"),
                            value: "1"
                        },
                        {
                            text: this.context.t("menu.moves.2"),
                            value: "2"
                        },
                        {
                            text: this.context.t("menu.moves.3"),
                            value: "3"
                        },
                        {
                            text: this.context.t("menu.moves.4"),
                            value: "4"
                        },
                        {
                            text: this.context.t("menu.moves.5"),
                            value: "5"
                        }
                    ]
                },
                heightChange: {
                    acceptReporters: false,
                    items: [
                        {
                            text: this.context.t("menu.heightChange.1"),
                            value: "1"
                        },
                        {
                            text: this.context.t("menu.heightChange.-1"),
                            value: "-1"
                        }
                    ]
                },
                servoLoad: {
                    acceptReporters: false,
                    items: [
                        {
                            text: this.context.t("menu.servoLoad.1"),
                            value: "1"
                        },
                        {
                            text: this.context.t("menu.servoLoad.0"),
                            value: "0"
                        }
                    ]
                },
                eulerElement: {
                    acceptReporters: false,
                    items: [
                        {
                            text: this.context.t("menu.eulerElement.0"),
                            value: "0"
                        },
                        {
                            text: this.context.t("menu.eulerElement.1"),
                            value: "1"
                        },
                        {
                            text: this.context.t("menu.eulerElement.2"),
                            value: "2"
                        }
                    ]
                },
                bleMode: {
                    acceptReporters: false,
                    items: [
                        {
                            text: this.context.t("menu.bleMode.BLE.MODE_BLE_SLAVE"),
                            value: "BLE.MODE_BLE_SLAVE"
                        },
                        {
                            text: this.context.t("menu.bleMode.BLE.MODE_BLE_MASTER"),
                            value: "BLE.MODE_BLE_MASTER"
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
                        MODE: {
                            type: "string",
                            defaultValue: "False",
                            menu: "buzzerMode",
                            literal: true
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
                        MODE: {
                            type: "string",
                            defaultValue: "False",
                            menu: "buzzerMode",
                            literal: true
                        }
                    }
                },
                {
                    opcode: "buzzer_tone_set_volume",
                    blockType: "command",
                    text: this.context.t("block.buzzer_tone_set_volume"),
                    arguments: {
                        VALUE: {
                            type: "slider",
                            defaultValue: 100
                        }
                    }
                },
                {
                    opcode: "close_buzzer",
                    blockType: "command",
                    text: this.context.t("block.close_buzzer"),
                    arguments: {}
                },
                {
                    opcode: "close_lowpower_warning",
                    blockType: "command",
                    text: this.context.t("block.close_lowpower_warning"),
                    arguments: {}
                },
                {
                    opcode: "get_battery_level",
                    blockType: "reporter",
                    text: this.context.t("block.get_battery_level"),
                    disableMonitor: true,
                    arguments: {}
                },
                {
                    subCategory: this.context.t("group.2")
                },
                {
                    opcode: "set_led_color",
                    blockType: "command",
                    text: this.context.t("block.set_led_color"),
                    arguments: {
                        COLOR: {
                            type: "square_color",
                            defaultValue: "#ff0000"
                        }
                    }
                },
                {
                    opcode: "set_led_color_arg",
                    blockType: "command",
                    text: this.context.t("block.set_led_color_arg"),
                    arguments: {
                        RED: {
                            type: "slider255",
                            defaultValue: 255
                        },
                        GREEN: {
                            type: "slider255",
                            defaultValue: 0
                        },
                        BLUE: {
                            type: "slider255",
                            defaultValue: 0
                        }
                    }
                },
                {
                    opcode: "rgb_module_breath_one",
                    blockType: "command",
                    text: this.context.t("block.rgb_module_breath_one"),
                    arguments: {
                        COLOR: {
                            type: "string",
                            defaultValue: "0",
                            menu: "lightColors",
                            literal: true
                        },
                        CYCLE: {
                            type: "number",
                            defaultValue: 1
                        }
                    }
                },
                {
                    opcode: "rgb_module_breath",
                    blockType: "command",
                    text: this.context.t("block.rgb_module_breath"),
                    arguments: {}
                },
                {
                    opcode: "close_led",
                    blockType: "command",
                    text: this.context.t("block.close_led"),
                    arguments: {}
                },
                {
                    subCategory: this.context.t("group.3")
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
                    subCategory: this.context.t("group.4")
                },
                {
                    opcode: "when_key_click_thread",
                    blockType: "hat",
                    text: this.context.t("block.when_key_click_thread"),
                    isEdgeActivated: false,
                    arguments: {
                        KEYS: {
                            type: "string",
                            defaultValue: "A",
                            menu: "keys",
                            literal: true
                        }
                    }
                },
                {
                    opcode: "when_key_longclick_thread",
                    blockType: "hat",
                    text: this.context.t("block.when_key_longclick_thread"),
                    isEdgeActivated: false,
                    arguments: {
                        KEYS: {
                            type: "string",
                            defaultValue: "A",
                            menu: "keys",
                            literal: true
                        }
                    }
                },
                {
                    opcode: "key_is_pressed",
                    blockType: "Boolean",
                    text: this.context.t("block.key_is_pressed"),
                    disableMonitor: true,
                    arguments: {
                        KEYS: {
                            type: "string",
                            defaultValue: "A",
                            menu: "keys",
                            literal: true
                        }
                    }
                },
                {
                    subCategory: this.context.t("group.5")
                },
                {
                    opcode: "robot_init_foot",
                    blockType: "command",
                    text: this.context.t("block.robot_init_foot"),
                    arguments: {
                        VALUE1: {
                            type: "number",
                            defaultValue: 110
                        },
                        VALUE2: {
                            type: "number",
                            defaultValue: 0
                        },
                        VALUE3: {
                            type: "number",
                            defaultValue: -60
                        }
                    }
                },
                {
                    opcode: "robot_set_foot",
                    blockType: "command",
                    text: this.context.t("block.robot_set_foot"),
                    arguments: {
                        VALUE1: {
                            type: "number",
                            defaultValue: 110
                        },
                        VALUE2: {
                            type: "number",
                            defaultValue: 0
                        },
                        VALUE3: {
                            type: "number",
                            defaultValue: -60
                        }
                    }
                },
                {
                    opcode: "robot_reset",
                    blockType: "command",
                    text: this.context.t("block.robot_reset"),
                    arguments: {}
                },
                {
                    opcode: "robot_move",
                    blockType: "command",
                    text: this.context.t("block.robot_move"),
                    arguments: {
                        ORIENTION: {
                            type: "string",
                            defaultValue: "0",
                            menu: "moves",
                            literal: true
                        },
                        VALUE: {
                            type: "number",
                            defaultValue: 20
                        },
                        HEIGHT: {
                            type: "number",
                            defaultValue: 15
                        },
                        PERIOD: {
                            type: "number",
                            defaultValue: 500
                        }
                    }
                },
                {
                    opcode: "robot_move_step",
                    blockType: "command",
                    text: this.context.t("block.robot_move_step"),
                    arguments: {
                        ORIENTION: {
                            type: "string",
                            defaultValue: "0",
                            menu: "moves",
                            literal: true
                        },
                        VALUE: {
                            type: "number",
                            defaultValue: 20
                        },
                        HEIGHT: {
                            type: "number",
                            defaultValue: 15
                        },
                        PERIOD: {
                            type: "number",
                            defaultValue: 500
                        },
                        VALUE2: {
                            type: "number",
                            defaultValue: 10
                        }
                    }
                },
                {
                    opcode: "robot_move_xyz",
                    blockType: "command",
                    text: this.context.t("block.robot_move_xyz"),
                    arguments: {
                        VALUE1: {
                            type: "number",
                            defaultValue: 0
                        },
                        VALUE2: {
                            type: "number",
                            defaultValue: 20
                        },
                        VALUE3: {
                            type: "number",
                            defaultValue: 0
                        },
                        HEIGHT: {
                            type: "number",
                            defaultValue: 15
                        },
                        PERIOD: {
                            type: "number",
                            defaultValue: 500
                        }
                    }
                },
                {
                    opcode: "robot_move_xyz_step",
                    blockType: "command",
                    text: this.context.t("block.robot_move_xyz_step"),
                    arguments: {
                        VALUE1: {
                            type: "number",
                            defaultValue: 0
                        },
                        VALUE2: {
                            type: "number",
                            defaultValue: 20
                        },
                        VALUE3: {
                            type: "number",
                            defaultValue: 0
                        },
                        HEIGHT: {
                            type: "number",
                            defaultValue: 15
                        },
                        PERIOD: {
                            type: "number",
                            defaultValue: 500
                        },
                        STEP: {
                            type: "number",
                            defaultValue: 10
                        }
                    }
                },
                {
                    opcode: "robot_stop_run",
                    blockType: "command",
                    text: this.context.t("block.robot_stop_run"),
                    arguments: {}
                },
                {
                    opcode: "robot_run_action",
                    blockType: "command",
                    text: this.context.t("block.robot_run_action"),
                    arguments: {
                        ACTION: {
                            type: "string",
                            defaultValue: "1"
                        },
                        STEP: {
                            type: "number",
                            defaultValue: 1
                        }
                    }
                },
                {
                    opcode: "robot_stop_action",
                    blockType: "command",
                    text: this.context.t("block.robot_stop_action"),
                    arguments: {}
                },
                {
                    opcode: "robot_height",
                    blockType: "command",
                    text: this.context.t("block.robot_height"),
                    arguments: {
                        HEIGHT: {
                            type: "string",
                            defaultValue: "1",
                            menu: "heightChange",
                            literal: true
                        },
                        VALUE: {
                            type: "number",
                            defaultValue: 20
                        }
                    }
                },
                {
                    opcode: "robot_run_pose",
                    blockType: "command",
                    text: this.context.t("block.robot_run_pose"),
                    arguments: {
                        TIME: {
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
                        PITCH: {
                            type: "number",
                            defaultValue: 0
                        },
                        ROLL: {
                            type: "number",
                            defaultValue: 0
                        },
                        YAW: {
                            type: "number",
                            defaultValue: 0
                        }
                    }
                },
                {
                    opcode: "robot_servo_set",
                    blockType: "command",
                    text: this.context.t("block.robot_servo_set"),
                    arguments: {
                        ID: {
                            type: "number",
                            defaultValue: 11
                        },
                        POS: {
                            type: "number",
                            defaultValue: 500
                        },
                        DURATION: {
                            type: "number",
                            defaultValue: 500
                        }
                    }
                },
                {
                    opcode: "get_robot_servo_pos",
                    blockType: "reporter",
                    text: this.context.t("block.get_robot_servo_pos"),
                    disableMonitor: true,
                    arguments: {
                        NUM: {
                            type: "number",
                            defaultValue: 11
                        }
                    }
                },
                {
                    opcode: "set_all_robot_servo_load",
                    blockType: "command",
                    text: this.context.t("block.set_all_robot_servo_load"),
                    arguments: {
                        LOAD: {
                            type: "string",
                            defaultValue: "1",
                            menu: "servoLoad",
                            literal: true
                        }
                    }
                },
                {
                    subCategory: this.context.t("group.6")
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
                        VALUE: {
                            type: "string",
                            defaultValue: "0",
                            menu: "eulerElement",
                            literal: true
                        }
                    }
                },
                {
                    subCategory: this.context.t("group.7")
                },
                {
                    opcode: "set_ble_mode",
                    blockType: "command",
                    text: this.context.t("block.set_ble_mode"),
                    arguments: {
                        MODE: {
                            type: "string",
                            defaultValue: "BLE.MODE_BLE_SLAVE",
                            menu: "bleMode",
                            literal: true
                        },
                        NAME: {
                            type: "string",
                            defaultValue: "aimech"
                        }
                    }
                },
                {
                    opcode: "ble_is_connected",
                    blockType: "Boolean",
                    text: this.context.t("block.ble_is_connected"),
                    disableMonitor: true,
                    arguments: {}
                },
                {
                    opcode: "get_ble_mac",
                    blockType: "reporter",
                    text: this.context.t("block.get_ble_mac"),
                    disableMonitor: true,
                    arguments: {}
                },
                {
                    opcode: "ble_wait_end",
                    blockType: "Boolean",
                    text: this.context.t("block.ble_wait_end"),
                    disableMonitor: true,
                    arguments: {
                        VALUE: {
                            type: "string",
                            defaultValue: "CMD"
                        }
                    }
                },
                {
                    opcode: "read_ble_data",
                    blockType: "reporter",
                    text: this.context.t("block.read_ble_data"),
                    disableMonitor: true,
                    arguments: {}
                },
                {
                    opcode: "get_ble_cmd",
                    blockType: "reporter",
                    text: this.context.t("block.get_ble_cmd"),
                    disableMonitor: true,
                    arguments: {
                        DATA: {
                            type: "string",
                            defaultValue: "0"
                        }
                    }
                },
                {
                    opcode: "get_ble_args",
                    blockType: "reporter",
                    text: this.context.t("block.get_ble_args"),
                    disableMonitor: true,
                    arguments: {
                        DATA: {
                            type: "string",
                            defaultValue: "0"
                        },
                        NUM: {
                            type: "number",
                            defaultValue: 1
                        }
                    }
                },
                {
                    opcode: "ble_write",
                    blockType: "command",
                    text: this.context.t("block.ble_write"),
                    arguments: {
                        DATA: {
                            type: "string",
                            defaultValue: "CMD"
                        }
                    }
                }
            ]
        };
    }

    // 主程序收尾、事件回调和菜单分支直接交给 Python 生成器处理。
    getPython (): Record<string, PythonTemplate> {
        return {
            start_thread: {
                template: "",
                imports: [
                    "import Hiwonder",
                    "import time",
                    "import Hiwonder_DEV"
                ],
                launcher: "Hiwonder.startMain({MAIN})",
                section: "main"
            },
            start_run_thread: {
                template: "",
                imports: [
                    "import Hiwonder",
                    "import time",
                    "import Hiwonder_DEV"
                ],
                section: "setup"
            },
            buzzer_tone_set: {
                template: "beep.playTone({TONES},{RHYTHMS},{MODE})",
                imports: [
                    "import Hiwonder"
                ],
                variables: [
                    "beep = Hiwonder.Buzzer()"
                ]
            },
            buzzer_tone_set_arg: {
                template: "beep.playTone({TONES},{RHYTHMS},{MODE})",
                imports: [
                    "import Hiwonder"
                ],
                variables: [
                    "beep = Hiwonder.Buzzer()"
                ]
            },
            buzzer_tone_set_volume: {
                template: "beep.setVolume({VALUE})",
                imports: [
                    "import Hiwonder"
                ],
                variables: [
                    "beep = Hiwonder.Buzzer()"
                ]
            },
            close_buzzer: {
                template: "beep.onoff(False)",
                imports: [
                    "import Hiwonder"
                ],
                variables: [
                    "beep = Hiwonder.Buzzer()"
                ]
            },
            close_lowpower_warning: {
                template: "Hiwonder.disableLowPowerAlarm()",
                imports: [
                    "import Hiwonder"
                ]
            },
            get_battery_level: {
                template: "Hiwonder.Battery_power()",
                imports: [
                    "import Hiwonder"
                ]
            },
            set_led_color: {
                template: "rgb.setRGB(0,{COLOR.rgb})",
                imports: [
                    "import Hiwonder"
                ],
                variables: [
                    "rgb = Hiwonder.RGB()"
                ]
            },
            set_led_color_arg: {
                template: "rgb.setRGB(0,{RED},{GREEN},{BLUE})",
                imports: [
                    "import Hiwonder"
                ],
                variables: [
                    "rgb = Hiwonder.RGB()"
                ]
            },
            rgb_module_breath_one: {
                template: "rgb.set_Breathing({COLOR},{CYCLE})",
                imports: [
                    "import Hiwonder"
                ],
                variables: [
                    "rgb = Hiwonder.RGB()"
                ]
            },
            rgb_module_breath: {
                template: "rgb.setRGBBreathingValue(5,10,15)",
                imports: [
                    "import Hiwonder"
                ],
                variables: [
                    "rgb = Hiwonder.RGB()"
                ]
            },
            close_led: {
                template: "rgb.setRGB(0,0,0,0)"
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
            when_key_click_thread: {
                template: "",
                imports: [
                    "import Hiwonder",
                    "import time",
                    "import Hiwonder_DEV"
                ],
                variables: [
                    "button{KEYS} = Hiwonder.Button('{KEYS}')"
                ],
                entryTemplate: "def on_button{KEYS}_clicked():",
                entryFooter: "button{KEYS}.Clicked(on_button{KEYS}_clicked)",
                section: "main"
            },
            when_key_longclick_thread: {
                template: "",
                imports: [
                    "import Hiwonder",
                    "import time",
                    "import Hiwonder_DEV"
                ],
                variables: [
                    "button{KEYS} = Hiwonder.Button('{KEYS}')"
                ],
                entryTemplate: "def on_button{KEYS}_longpressed():",
                entryFooter: "button{KEYS}.Longpressed(on_button{KEYS}_longpressed)",
                section: "main"
            },
            key_is_pressed: {
                template: "button{KEYS}.read()",
                imports: [
                    "import Hiwonder"
                ],
                variables: [
                    "button{KEYS} = Hiwonder.Button('{KEYS}')"
                ]
            },
            robot_init_foot: {
                template: "",
                imports: [
                    "import Hiwonder_DEV"
                ],
                forcedVariables: [
                    {
                        name: "quadrupedpro",
                        code: "quadrupedpro = Hiwonder_DEV.DEV_Quadruped_3DOF(Hiwonder_DEV.Port(9),{VALUE1},{VALUE2},{VALUE3})"
                    }
                ]
            },
            robot_set_foot: {
                template: "quadrupedpro.set_legs_pose({VALUE1},{VALUE2},{VALUE3})"
            },
            robot_reset: {
                template: "quadrupedpro.reset()",
                imports: [
                    "import Hiwonder_DEV"
                ],
                variables: [
                    "quadrupedpro = Hiwonder_DEV.DEV_Quadruped_3DOF(Hiwonder_DEV.Port(9))"
                ]
            },
            robot_move: {
                template: "quadrupedpro.move({ORIENTION},{VALUE},0,{HEIGHT},{PERIOD},-1)",
                imports: [
                    "import Hiwonder_DEV"
                ],
                variables: [
                    "quadrupedpro = Hiwonder_DEV.DEV_Quadruped_3DOF(Hiwonder_DEV.Port(9))"
                ],
                templateSelector: {
                    argument: "ORIENTION",
                    cases: {
                        "0": "quadrupedpro.move(0,{VALUE},0,{HEIGHT},{PERIOD},-1)",
                        "1": "quadrupedpro.move(0,-{VALUE},0,{HEIGHT},{PERIOD},-1)",
                        "2": "quadrupedpro.move(-{VALUE},0,0,{HEIGHT},{PERIOD},-1)",
                        "3": "quadrupedpro.move({VALUE},0,0,{HEIGHT},{PERIOD},-1)",
                        "4": "quadrupedpro.move(0,0,{VALUE},{HEIGHT},{PERIOD},-1)",
                        "5": "quadrupedpro.move(0,0,-{VALUE},{HEIGHT},{PERIOD},-1)"
                    }
                }
            },
            robot_move_step: {
                template: "quadrupedpro.move({ORIENTION},{VALUE},0,{HEIGHT},{PERIOD},{VALUE2})",
                imports: [
                    "import Hiwonder_DEV"
                ],
                variables: [
                    "quadrupedpro = Hiwonder_DEV.DEV_Quadruped_3DOF(Hiwonder_DEV.Port(9))"
                ],
                templateSelector: {
                    argument: "ORIENTION",
                    cases: {
                        "0": "quadrupedpro.move(0,{VALUE},0,{HEIGHT},{PERIOD},{VALUE2})",
                        "1": "quadrupedpro.move(0,-{VALUE},0,{HEIGHT},{PERIOD},{VALUE2})",
                        "2": "quadrupedpro.move(-{VALUE},0,0,{HEIGHT},{PERIOD},{VALUE2})",
                        "3": "quadrupedpro.move({VALUE},0,0,{HEIGHT},{PERIOD},{VALUE2})",
                        "4": "quadrupedpro.move(0,0,{VALUE},{HEIGHT},{PERIOD},{VALUE2})",
                        "5": "quadrupedpro.move(0,0,-{VALUE},{HEIGHT},{PERIOD},{VALUE2})"
                    }
                }
            },
            robot_move_xyz: {
                template: "quadrupedpro.move({VALUE1},{VALUE2},{VALUE3},{HEIGHT},{PERIOD},-1)",
                imports: [
                    "import Hiwonder_DEV"
                ],
                variables: [
                    "quadrupedpro = Hiwonder_DEV.DEV_Quadruped_3DOF(Hiwonder_DEV.Port(9))"
                ]
            },
            robot_move_xyz_step: {
                template: "quadrupedpro.move({VALUE1},{VALUE2},{VALUE3},{HEIGHT},{PERIOD},{STEP})",
                imports: [
                    "import Hiwonder_DEV"
                ],
                variables: [
                    "quadrupedpro = Hiwonder_DEV.DEV_Quadruped_3DOF(Hiwonder_DEV.Port(9))"
                ]
            },
            robot_stop_run: {
                template: "quadrupedpro.stop()",
                imports: [
                    "import Hiwonder_DEV"
                ],
                variables: [
                    "quadrupedpro = Hiwonder_DEV.DEV_Quadruped_3DOF(Hiwonder_DEV.Port(9))"
                ]
            },
            robot_run_action: {
                template: "quadrupedpro.action_run({ACTION},{STEP})",
                imports: [
                    "import Hiwonder_DEV"
                ],
                variables: [
                    "quadrupedpro = Hiwonder_DEV.DEV_Quadruped_3DOF(Hiwonder_DEV.Port(9))"
                ]
            },
            robot_stop_action: {
                template: "quadrupedpro.action_stop()",
                imports: [
                    "import Hiwonder_DEV"
                ],
                variables: [
                    "quadrupedpro = Hiwonder_DEV.DEV_Quadruped_3DOF(Hiwonder_DEV.Port(9))"
                ]
            },
            robot_height: {
                template: "quadrupedpro.set_pose(0,0,{HEIGHT}*{VALUE})",
                imports: [
                    "import Hiwonder_DEV"
                ],
                variables: [
                    "quadrupedpro = Hiwonder_DEV.DEV_Quadruped_3DOF(Hiwonder_DEV.Port(9))"
                ]
            },
            robot_run_pose: {
                template: "quadrupedpro.set_pose({VALUE1},{VALUE2},{VALUE3},{PITCH},{ROLL},{YAW},{TIME})",
                imports: [
                    "import Hiwonder_DEV"
                ],
                variables: [
                    "quadrupedpro = Hiwonder_DEV.DEV_Quadruped_3DOF(Hiwonder_DEV.Port(9))"
                ]
            },
            robot_servo_set: {
                template: "quadrupedpro.set_servo_pose({ID},{POS},{DURATION})",
                imports: [
                    "import Hiwonder_DEV"
                ],
                variables: [
                    "quadrupedpro = Hiwonder_DEV.DEV_Quadruped_3DOF(Hiwonder_DEV.Port(9))"
                ]
            },
            get_robot_servo_pos: {
                template: "quadrupedpro.read_servo_pose({NUM})",
                imports: [
                    "import Hiwonder_DEV"
                ],
                variables: [
                    "quadrupedpro = Hiwonder_DEV.DEV_Quadruped_3DOF(Hiwonder_DEV.Port(9))"
                ]
            },
            set_all_robot_servo_load: {
                template: "quadrupedpro.set_LoadOrUnload({LOAD})",
                imports: [
                    "import Hiwonder_DEV"
                ],
                variables: [
                    "quadrupedpro = Hiwonder_DEV.DEV_Quadruped_3DOF(Hiwonder_DEV.Port(9))"
                ]
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
                    "import Hiwonder"
                ],
                variables: [
                    "buttonA = Hiwonder.Button('A')",
                    `def is_stop_3091ratyxq():
  return buttonA.read()`
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
            },
            set_ble_mode: {
                template: "",
                imports: [
                    "from Hiwonder_BLE import BLE"
                ],
                variables: [
                    "ble = BLE({MODE},{NAME})"
                ]
            },
            ble_is_connected: {
                template: "ble.is_connected()"
            },
            get_ble_mac: {
                template: "ble.get_mac()"
            },
            ble_wait_end: {
                template: "ble.contains_data({VALUE})"
            },
            read_ble_data: {
                template: "ble.read_uart_cmd()"
            },
            get_ble_cmd: {
                template: "ble.parse_uart_cmd({DATA})[0]"
            },
            get_ble_args: {
                template: "ble.parse_uart_cmd({DATA})[{NUM}]"
            },
            ble_write: {
                template: "ble.send_data({DATA})"
            }
        };
    }
}
