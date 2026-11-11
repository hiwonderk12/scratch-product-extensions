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

export default class MinihexaBlocks implements NativeExtension {
    constructor (private readonly context: ExtensionContext) {}

    getInfo (): ExtensionInfo {
        return {
            id: "minihexa",
            name: this.context.t(product.name),
            color1: "#336699",
            color2: "#336699",
            color3: "#336699",
            menus: {
                iicport: {
                    acceptReporters: false,
                    items: [
                        {
                            text: "3",
                            value: "3"
                        },
                        {
                            text: "4",
                            value: "4"
                        },
                        {
                            text: "5",
                            value: "5"
                        },
                        {
                            text: "9",
                            value: "9"
                        }
                    ]
                },
                asrmodes: {
                    acceptReporters: false,
                    items: [
                        {
                            text: this.context.t("menu.asrmodes.1"),
                            value: "1"
                        },
                        {
                            text: this.context.t("menu.asrmodes.2"),
                            value: "2"
                        },
                        {
                            text: this.context.t("menu.asrmodes.3"),
                            value: "3"
                        }
                    ]
                },
                blemode: {
                    acceptReporters: false,
                    items: [
                        {
                            text: this.context.t("menu.blemode.BLE.MODE_BLE_SLAVE"),
                            value: "BLE.MODE_BLE_SLAVE"
                        },
                        {
                            text: this.context.t("menu.blemode.BLE.MODE_BLE_MASTER"),
                            value: "BLE.MODE_BLE_MASTER"
                        }
                    ]
                },
                balance: {
                    acceptReporters: false,
                    items: [
                        {
                            text: this.context.t("menu.balance.True"),
                            value: "True"
                        },
                        {
                            text: this.context.t("menu.balance.False"),
                            value: "False"
                        }
                    ]
                },
                baudrate: {
                    acceptReporters: false,
                    items: [
                        {
                            text: "9600",
                            value: "9600"
                        },
                        {
                            text: "115200",
                            value: "115200"
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
                            text: "0",
                            value: "0"
                        }
                    ]
                },
                buzzer_mode: {
                    acceptReporters: false,
                    items: [
                        {
                            text: this.context.t("menu.buzzer_mode.False"),
                            value: "False"
                        },
                        {
                            text: this.context.t("menu.buzzer_mode.True"),
                            value: "True"
                        }
                    ]
                },
                gyro_select: {
                    acceptReporters: false,
                    items: [
                        {
                            text: this.context.t("menu.gyro_select.0"),
                            value: "0"
                        },
                        {
                            text: this.context.t("menu.gyro_select.1"),
                            value: "1"
                        },
                        {
                            text: this.context.t("menu.gyro_select.2"),
                            value: "2"
                        }
                    ]
                },
                imu_select: {
                    acceptReporters: false,
                    items: [
                        {
                            text: this.context.t("menu.imu_select.0"),
                            value: "0"
                        },
                        {
                            text: this.context.t("menu.imu_select.1"),
                            value: "1"
                        }
                    ]
                },
                up_down_select: {
                    acceptReporters: false,
                    items: [
                        {
                            text: this.context.t("menu.up_down_select.1"),
                            value: "1"
                        },
                        {
                            text: this.context.t("menu.up_down_select.-1"),
                            value: "-1"
                        }
                    ]
                },
                x_select: {
                    acceptReporters: false,
                    items: [
                        {
                            text: this.context.t("menu.x_select.1"),
                            value: "1"
                        },
                        {
                            text: this.context.t("menu.x_select.-1"),
                            value: "-1"
                        }
                    ]
                },
                pitch_select: {
                    acceptReporters: false,
                    items: [
                        {
                            text: this.context.t("menu.pitch_select.1"),
                            value: "1"
                        },
                        {
                            text: this.context.t("menu.pitch_select.-1"),
                            value: "-1"
                        }
                    ]
                },
                roll_select: {
                    acceptReporters: false,
                    items: [
                        {
                            text: this.context.t("menu.roll_select.1"),
                            value: "1"
                        },
                        {
                            text: this.context.t("menu.roll_select.-1"),
                            value: "-1"
                        }
                    ]
                },
                roll_pitch_yaw: {
                    acceptReporters: false,
                    items: [
                        {
                            text: this.context.t("menu.roll_pitch_yaw.1"),
                            value: "1"
                        },
                        {
                            text: this.context.t("menu.roll_pitch_yaw.2"),
                            value: "2"
                        },
                        {
                            text: this.context.t("menu.roll_pitch_yaw.3"),
                            value: "3"
                        }
                    ]
                },
                oriention_8: {
                    acceptReporters: false,
                    items: [
                        {
                            text: this.context.t("menu.oriention_8.0"),
                            value: "0"
                        },
                        {
                            text: this.context.t("menu.oriention_8.1"),
                            value: "1"
                        },
                        {
                            text: this.context.t("menu.oriention_8.2"),
                            value: "2"
                        },
                        {
                            text: this.context.t("menu.oriention_8.3"),
                            value: "3"
                        },
                        {
                            text: this.context.t("menu.oriention_8.4"),
                            value: "4"
                        },
                        {
                            text: this.context.t("menu.oriention_8.5"),
                            value: "5"
                        },
                        {
                            text: this.context.t("menu.oriention_8.6"),
                            value: "6"
                        },
                        {
                            text: this.context.t("menu.oriention_8.7"),
                            value: "7"
                        }
                    ]
                },
                oriention_9: {
                    acceptReporters: false,
                    items: [
                        {
                            text: this.context.t("menu.oriention_9.1"),
                            value: "1"
                        },
                        {
                            text: this.context.t("menu.oriention_9.-1"),
                            value: "-1"
                        }
                    ]
                },
                robot_turn: {
                    acceptReporters: false,
                    items: [
                        {
                            text: this.context.t("menu.robot_turn.1"),
                            value: "1"
                        },
                        {
                            text: this.context.t("menu.robot_turn.2"),
                            value: "2"
                        }
                    ]
                },
                onoff: {
                    acceptReporters: false,
                    items: [
                        {
                            text: this.context.t("menu.onoff.True"),
                            value: "True"
                        },
                        {
                            text: this.context.t("menu.onoff.False"),
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
                        MODE: {
                            type: "string",
                            defaultValue: "False",
                            menu: "buzzer_mode",
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
                            menu: "buzzer_mode",
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
                    opcode: "get_battery_level",
                    blockType: "reporter",
                    text: this.context.t("block.get_battery_level"),
                    disableMonitor: true,
                    arguments: {}
                },
                {
                    opcode: "get_volume",
                    blockType: "reporter",
                    text: this.context.t("block.get_volume"),
                    disableMonitor: true,
                    arguments: {}
                },
                {
                    opcode: "disable_lowPower_alarm",
                    blockType: "command",
                    text: this.context.t("block.disable_lowPower_alarm"),
                    arguments: {}
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
                    opcode: "set_body_reset",
                    blockType: "command",
                    text: this.context.t("block.set_body_reset"),
                    arguments: {}
                },
                {
                    opcode: "set_body_angle",
                    blockType: "command",
                    text: this.context.t("block.set_body_angle"),
                    arguments: {
                        ANGLE: {
                            type: "string",
                            defaultValue: "1",
                            menu: "roll_pitch_yaw",
                            literal: true
                        },
                        VALUE: {
                            type: "number",
                            defaultValue: 2
                        },
                        DURATION: {
                            type: "number",
                            defaultValue: 500
                        }
                    }
                },
                {
                    opcode: "set_body_pose",
                    blockType: "command",
                    text: this.context.t("block.set_body_pose"),
                    arguments: {
                        ORIENTION: {
                            type: "string",
                            defaultValue: "0",
                            menu: "oriention_8",
                            literal: true
                        },
                        VALUE: {
                            type: "number",
                            defaultValue: 2
                        },
                        DURATION: {
                            type: "number",
                            defaultValue: 500
                        }
                    }
                },
                {
                    opcode: "set_body_pose_height",
                    blockType: "command",
                    text: this.context.t("block.set_body_pose_height"),
                    arguments: {
                        ORIENTION: {
                            type: "string",
                            defaultValue: "1",
                            menu: "oriention_9",
                            literal: true
                        },
                        VALUE: {
                            type: "number",
                            defaultValue: 2
                        },
                        DURATION: {
                            type: "number",
                            defaultValue: 500
                        }
                    }
                },
                {
                    opcode: "set_go",
                    blockType: "command",
                    text: this.context.t("block.set_go"),
                    arguments: {
                        SPEED: {
                            type: "number",
                            defaultValue: 2
                        },
                        MOVE: {
                            type: "string",
                            defaultValue: "0",
                            menu: "oriention_8",
                            literal: true
                        },
                        DURATION: {
                            type: "number",
                            defaultValue: 500
                        }
                    }
                },
                {
                    opcode: "set_go_step",
                    blockType: "command",
                    text: this.context.t("block.set_go_step"),
                    arguments: {
                        SPEED: {
                            type: "number",
                            defaultValue: 2
                        },
                        MOVE: {
                            type: "string",
                            defaultValue: "0",
                            menu: "oriention_8",
                            literal: true
                        },
                        STEP: {
                            type: "number",
                            defaultValue: 2
                        },
                        DURATION: {
                            type: "number",
                            defaultValue: 500
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
                        DURATION: {
                            type: "number",
                            defaultValue: 500
                        }
                    }
                },
                {
                    opcode: "set_move_xyz_step",
                    blockType: "command",
                    text: this.context.t("block.set_move_xyz_step"),
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
                        STEP: {
                            type: "number",
                            defaultValue: 5
                        },
                        DURATION: {
                            type: "number",
                            defaultValue: 500
                        }
                    }
                },
                {
                    opcode: "set_turn",
                    blockType: "command",
                    text: this.context.t("block.set_turn"),
                    arguments: {
                        SPEED: {
                            type: "number",
                            defaultValue: 2
                        },
                        MOVE: {
                            type: "string",
                            defaultValue: "1",
                            menu: "robot_turn",
                            literal: true
                        },
                        DURATION: {
                            type: "number",
                            defaultValue: 500
                        }
                    }
                },
                {
                    opcode: "set_turn_step",
                    blockType: "command",
                    text: this.context.t("block.set_turn_step"),
                    arguments: {
                        SPEED: {
                            type: "number",
                            defaultValue: 2
                        },
                        MOVE: {
                            type: "string",
                            defaultValue: "1",
                            menu: "robot_turn",
                            literal: true
                        },
                        STEP: {
                            type: "number",
                            defaultValue: 2
                        },
                        DURATION: {
                            type: "number",
                            defaultValue: 500
                        }
                    }
                },
                {
                    opcode: "set_go_stop",
                    blockType: "command",
                    text: this.context.t("block.set_go_stop"),
                    arguments: {}
                },
                {
                    opcode: "set_leg_lift",
                    blockType: "command",
                    text: this.context.t("block.set_leg_lift"),
                    arguments: {
                        VALUE: {
                            type: "number",
                            defaultValue: 3
                        }
                    }
                },
                {
                    opcode: "set_self_balance",
                    blockType: "command",
                    text: this.context.t("block.set_self_balance"),
                    arguments: {
                        CONTROL: {
                            type: "string",
                            defaultValue: "True",
                            menu: "onoff",
                            literal: true
                        }
                    }
                },
                {
                    subCategory: this.context.t("group.4")
                },
                {
                    opcode: "set_servo",
                    blockType: "command",
                    text: this.context.t("block.set_servo"),
                    arguments: {
                        NUM: {
                            type: "number",
                            defaultValue: 1
                        },
                        POS: {
                            type: "number",
                            defaultValue: 1500
                        },
                        DURATION: {
                            type: "number",
                            defaultValue: 500
                        }
                    }
                },
                {
                    subCategory: this.context.t("group.5")
                },
                {
                    opcode: "action_run",
                    blockType: "command",
                    text: this.context.t("block.action_run"),
                    arguments: {
                        NUM: {
                            type: "string",
                            defaultValue: "1"
                        },
                        LOOP: {
                            type: "number",
                            defaultValue: 1
                        }
                    }
                },
                {
                    opcode: "action_stop",
                    blockType: "command",
                    text: this.context.t("block.action_stop"),
                    arguments: {}
                },
                {
                    subCategory: this.context.t("group.6")
                },
                {
                    opcode: "when_minihexa_key_click_thread",
                    blockType: "hat",
                    text: this.context.t("block.when_minihexa_key_click_thread"),
                    isEdgeActivated: false,
                    arguments: {}
                },
                {
                    opcode: "when_minihexa_key_longclick_thread",
                    blockType: "hat",
                    text: this.context.t("block.when_minihexa_key_longclick_thread"),
                    isEdgeActivated: false,
                    arguments: {}
                },
                {
                    opcode: "key_is_pressed",
                    blockType: "Boolean",
                    text: this.context.t("block.key_is_pressed"),
                    disableMonitor: true,
                    arguments: {}
                },
                {
                    subCategory: this.context.t("group.7")
                },
                {
                    opcode: "imu_read_gyro_data",
                    blockType: "reporter",
                    text: this.context.t("block.imu_read_gyro_data"),
                    disableMonitor: true,
                    arguments: {
                        SELECT: {
                            type: "string",
                            defaultValue: "0",
                            menu: "gyro_select",
                            literal: true
                        }
                    }
                },
                {
                    opcode: "imu_read_angle",
                    blockType: "reporter",
                    text: this.context.t("block.imu_read_angle"),
                    disableMonitor: true,
                    arguments: {
                        SELECT: {
                            type: "string",
                            defaultValue: "0",
                            menu: "imu_select",
                            literal: true
                        }
                    }
                },
                {
                    subCategory: this.context.t("group.8")
                },
                {
                    opcode: "serial_set_baudrate",
                    blockType: "command",
                    text: this.context.t("block.serial_set_baudrate"),
                    arguments: {
                        DATA: {
                            type: "string",
                            defaultValue: "9600",
                            menu: "baudrate",
                            literal: true
                        }
                    }
                },
                {
                    opcode: "serial_write",
                    blockType: "command",
                    text: this.context.t("block.serial_write"),
                    arguments: {
                        DATA: {
                            type: "string",
                            defaultValue: "CMD"
                        }
                    }
                },
                {
                    opcode: "serial_has_recv_data",
                    blockType: "Boolean",
                    text: this.context.t("block.serial_has_recv_data"),
                    disableMonitor: true,
                    arguments: {}
                },
                {
                    opcode: "serial_recv_contains",
                    blockType: "Boolean",
                    text: this.context.t("block.serial_recv_contains"),
                    disableMonitor: true,
                    arguments: {
                        DATA: {
                            type: "string",
                            defaultValue: "CMD"
                        }
                    }
                },
                {
                    opcode: "serial_recv_buff",
                    blockType: "reporter",
                    text: this.context.t("block.serial_recv_buff"),
                    disableMonitor: true,
                    arguments: {}
                },
                {
                    opcode: "get_serial_cmd",
                    blockType: "reporter",
                    text: this.context.t("block.get_serial_cmd"),
                    disableMonitor: true,
                    arguments: {
                        DATA: {
                            type: "string",
                            defaultValue: "0"
                        }
                    }
                },
                {
                    opcode: "get_serial_args",
                    blockType: "reporter",
                    text: this.context.t("block.get_serial_args"),
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
                    opcode: "clear_buffer",
                    blockType: "command",
                    text: this.context.t("block.clear_buffer"),
                    arguments: {}
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
                variables: [
                    "minihexa = Hiwonder.Robot()"
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
                variables: [
                    "minihexa = Hiwonder.Robot()"
                ],
                section: "setup"
            },
            buzzer_tone_set: {
                template: "beep.playTone({TONES},{RHYTHMS},{MODE})",
                variables: [
                    "beep = Hiwonder.Buzzer()"
                ]
            },
            buzzer_tone_set_arg: {
                template: "beep.playTone({TONES},{RHYTHMS},{MODE})",
                variables: [
                    "beep = Hiwonder.Buzzer()"
                ]
            },
            buzzer_tone_set_volume: {
                template: "beep.setVolume({VALUE})",
                variables: [
                    "beep = Hiwonder.Buzzer()"
                ]
            },
            get_battery_level: {
                template: "Hiwonder.Battery_power()",
                imports: [
                    "import Hiwonder"
                ]
            },
            get_volume: {
                template: "sound.read()",
                imports: [
                    "import Hiwonder"
                ],
                variables: [
                    "sound = Hiwonder.Sound()"
                ]
            },
            disable_lowPower_alarm: {
                template: "Hiwonder.disableLowPowerAlarm()",
                variables: [
                    "beep = Hiwonder.Buzzer()"
                ]
            },
            print_str: {
                template: `print({STR})
time.sleep(0.5)`,
                imports: [
                    "import time"
                ]
            },
            print_number: {
                template: `print({NUM})
time.sleep(0.5)`,
                imports: [
                    "import time"
                ]
            },
            set_body_reset: {
                template: "minihexa.reset()"
            },
            set_body_angle: {
                template: "minihexa.set_body_angle([0,0,0],{DURATION})",
                templateSelector: {
                    argument: "ANGLE",
                    cases: {
                        "1": "minihexa.set_body_angle([{VALUE},0,0],{DURATION})",
                        "2": "minihexa.set_body_angle([0,{VALUE},0],{DURATION})",
                        "3": "minihexa.set_body_angle([0,0,{VALUE}],{DURATION})"
                    }
                }
            },
            set_body_pose: {
                template: "minihexa.set_body_pose([0,0,0],{DURATION})",
                templateSelector: {
                    argument: "ORIENTION",
                    cases: {
                        "0": "minihexa.set_body_pose([0,{VALUE},0],{DURATION})",
                        "1": "minihexa.set_body_pose([0,-{VALUE},0],{DURATION})",
                        "2": "minihexa.set_body_pose([-{VALUE},0,0],{DURATION})",
                        "3": "minihexa.set_body_pose([{VALUE},0,0],{DURATION})",
                        "4": "minihexa.set_body_pose([-{VALUE},{VALUE},0],{DURATION})",
                        "5": "minihexa.set_body_pose([{VALUE},{VALUE},0],{DURATION})",
                        "6": "minihexa.set_body_pose([-{VALUE},-{VALUE},0],{DURATION})",
                        "7": "minihexa.set_body_pose([{VALUE},-{VALUE},0],{DURATION})"
                    }
                }
            },
            set_body_pose_height: {
                template: "minihexa.set_body_pose([0,0,{VALUE}*{ORIENTION}],{DURATION})"
            },
            set_go: {
                template: "minihexa.go([0,0,0],-1,{DURATION})",
                templateSelector: {
                    argument: "MOVE",
                    cases: {
                        "0": "minihexa.go([0,{SPEED},0],-1,{DURATION})",
                        "1": "minihexa.go([0,-{SPEED},0],-1,{DURATION})",
                        "2": "minihexa.go([-{SPEED},0,0],-1,{DURATION})",
                        "3": "minihexa.go([{SPEED},0,0],-1,{DURATION})",
                        "4": "minihexa.go([-{SPEED},{SPEED},0],-1,{DURATION})",
                        "5": "minihexa.go([{SPEED},{SPEED},0],-1,{DURATION})",
                        "6": "minihexa.go([-{SPEED},-{SPEED},0],-1,{DURATION})",
                        "7": "minihexa.go([{SPEED},-{SPEED},0],-1,{DURATION})"
                    }
                }
            },
            set_go_step: {
                template: "minihexa.go([0,0,0],{STEP},{DURATION})",
                templateSelector: {
                    argument: "MOVE",
                    cases: {
                        "0": "minihexa.go([0,{SPEED},0],{STEP},{DURATION})",
                        "1": "minihexa.go([0,-{SPEED},0],{STEP},{DURATION})",
                        "2": "minihexa.go([-{SPEED},0,0],{STEP},{DURATION})",
                        "3": "minihexa.go([{SPEED},0,0],{STEP},{DURATION})",
                        "4": "minihexa.go([-{SPEED},{SPEED},0],{STEP},{DURATION})",
                        "5": "minihexa.go([{SPEED},{SPEED},0],{STEP},{DURATION})",
                        "6": "minihexa.go([-{SPEED},-{SPEED},0],{STEP},{DURATION})",
                        "7": "minihexa.go([{SPEED},-{SPEED},0],{STEP},{DURATION})"
                    }
                }
            },
            set_move_xyz: {
                template: "minihexa.go([{VALUE1},{VALUE2},{VALUE3}],-1,{DURATION})"
            },
            set_move_xyz_step: {
                template: "minihexa.go([{VALUE1},{VALUE2},{VALUE3}],{STEP},{DURATION})"
            },
            set_turn: {
                template: "minihexa.go([0,0,0],-1,{DURATION})",
                templateSelector: {
                    argument: "MOVE",
                    cases: {
                        "1": "minihexa.go([0,0,-{SPEED}],-1,{DURATION})",
                        "2": "minihexa.go([0,0,{SPEED}],-1,{DURATION})"
                    }
                }
            },
            set_turn_step: {
                template: "minihexa.go([0,0,0],{STEP},{DURATION})",
                templateSelector: {
                    argument: "MOVE",
                    cases: {
                        "1": "minihexa.go([0,0,-{SPEED}],{STEP},{DURATION})",
                        "2": "minihexa.go([0,0,{SPEED}],{STEP},{DURATION})"
                    }
                }
            },
            set_go_stop: {
                template: "minihexa.go([0,0,0],0)"
            },
            set_leg_lift: {
                template: "minihexa.set_leg_lift({VALUE})"
            },
            set_self_balance: {
                template: "minihexa.homeostasis({CONTROL})"
            },
            set_servo: {
                template: "minihexa.multi_servo_control([({NUM},{POS})],{DURATION})"
            },
            action_run: {
                template: "minihexa.action_run({NUM},{LOOP})"
            },
            action_stop: {
                template: "minihexa.action_stop()"
            },
            when_minihexa_key_click_thread: {
                template: "",
                imports: [
                    "import Hiwonder",
                    "import time",
                    "import Hiwonder_IIC"
                ],
                variables: [
                    "minihexa = Hiwonder.Robot()",
                    "button1 = Hiwonder.Button()"
                ],
                entryTemplate: "def on_button1_clicked():",
                entryFooter: "button1.Clicked(on_button1_clicked)",
                section: "main"
            },
            when_minihexa_key_longclick_thread: {
                template: "",
                imports: [
                    "import Hiwonder",
                    "import time",
                    "import Hiwonder_IIC"
                ],
                variables: [
                    "minihexa = Hiwonder.Robot()",
                    "button1 = Hiwonder.Button()"
                ],
                entryTemplate: "def on_button1_longpressed():",
                entryFooter: "button1.Longpressed(on_button1_longpressed)",
                section: "main"
            },
            key_is_pressed: {
                template: "button1.read()",
                imports: [
                    "import Hiwonder",
                    "import time"
                ],
                variables: [
                    "button1 = Hiwonder.Button()"
                ]
            },
            imu_read_gyro_data: {
                template: "imu.read_gyro_data()[{SELECT}]",
                variables: [
                    "imu = Hiwonder.IMU()"
                ]
            },
            imu_read_angle: {
                template: "imu.read_angle()[{SELECT}]",
                variables: [
                    "imu = Hiwonder.IMU()"
                ]
            },
            serial_set_baudrate: {
                template: "",
                variables: [
                    "uart = Hiwonder.UART({DATA})"
                ]
            },
            serial_write: {
                template: "uart.send_data({DATA})"
            },
            serial_has_recv_data: {
                template: "uart.has_data()"
            },
            serial_recv_contains: {
                template: "uart.contains_data({DATA})"
            },
            serial_recv_buff: {
                template: "uart.read_buffer()"
            },
            get_serial_cmd: {
                template: "uart.read_uart_cmd({DATA})[0]"
            },
            get_serial_args: {
                template: "uart.parse_uart_cmd({DATA})[{NUM}]"
            },
            clear_buffer: {
                template: "uart.clear_buffer()"
            }
        };
    }
}
