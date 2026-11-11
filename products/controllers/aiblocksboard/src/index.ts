import type {ExtensionContext, ExtensionInfo, NativeExtension, PythonTemplate} from '../../../../tools/sdk';

// AIBlocksBoard 主板独立于机器人套件，集中维护四语、板载积木和 Python 规则。
import locale0 from './locales/zh-cn.json';
import locale1 from './locales/en.json';
import locale2 from './locales/zh-tw.json';
import locale3 from './locales/ko.json';

export const messages = {
    "zh-cn": locale0,
    en: locale1,
    "zh-tw": locale2,
    ko: locale3
};

export const product = {
    name: 'product.name',
    supportedLocales: ['zh-cn', 'en', 'zh-tw', 'ko']
};

export default class AIBlocksBoard implements NativeExtension {
    constructor (private readonly context: ExtensionContext) {}

    // 宿主刷新语言时重新读取文案，菜单实际值和旧积木标识保持固定。
    getInfo (): ExtensionInfo {
        return {
            id: "aiblocksboard",
            name: this.context.t("product.name"),
            color1: "#ff82ab",
            color2: "#ff82ab",
            blocks: [
                {
                    opcode: "start_thread",
                    text: this.context.t("block.start_thread"),
                    blockType: "hat",
                    isEdgeActivated: false,
                    arguments: {}
                },
                {
                    opcode: "start_run_thread",
                    text: this.context.t("block.start_run_thread"),
                    blockType: "hat",
                    isEdgeActivated: false,
                    arguments: {}
                },
                {
                    subCategory: this.context.t("group.1")
                },
                {
                    opcode: "buzzer_tone_set",
                    text: this.context.t("block.buzzer_tone_set"),
                    blockType: "command",
                    arguments: {
                        TONES: {
                            type: "string",
                            menu: "tones",
                            defaultValue: "65",
                            literal: true
                        },
                        RHYTHMS: {
                            type: "string",
                            menu: "rhythms",
                            defaultValue: "500",
                            literal: true
                        },
                        MODE: {
                            type: "string",
                            menu: "buzzer_mode",
                            defaultValue: "False",
                            literal: true
                        }
                    }
                },
                {
                    opcode: "buzzer_tone_set_arg",
                    text: this.context.t("block.buzzer_tone_set_arg"),
                    blockType: "command",
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
                            menu: "buzzer_mode",
                            defaultValue: "False",
                            literal: true
                        }
                    }
                },
                {
                    opcode: "buzzer_tone_set_volume",
                    text: this.context.t("block.buzzer_tone_set_volume"),
                    blockType: "command",
                    arguments: {
                        VALUE: {
                            type: "slider",
                            defaultValue: 100
                        }
                    }
                },
                {
                    opcode: "close_buzzer",
                    text: this.context.t("block.close_buzzer"),
                    blockType: "command",
                    arguments: {}
                },
                {
                    opcode: "get_battery_level",
                    text: this.context.t("block.get_battery_level"),
                    blockType: "reporter",
                    disableMonitor: true,
                    arguments: {}
                },
                {
                    subCategory: this.context.t("group.2")
                },
                {
                    opcode: "print_str",
                    text: this.context.t("block.print_str"),
                    blockType: "command",
                    arguments: {
                        STR: {
                            type: "string",
                            defaultValue: "Hello"
                        }
                    }
                },
                {
                    opcode: "print_number",
                    text: this.context.t("block.print_number"),
                    blockType: "command",
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
                    opcode: "when_key_click_thread",
                    text: this.context.t("block.when_key_click_thread"),
                    isEdgeActivated: false,
                    blockType: "hat",
                    arguments: {
                        KEYS: {
                            type: "string",
                            menu: "keys",
                            defaultValue: "0",
                            literal: true
                        }
                    }
                },
                {
                    opcode: "key_is_pressed",
                    text: this.context.t("block.key_is_pressed"),
                    blockType: "Boolean",
                    disableMonitor: true,
                    arguments: {
                        KEYS: {
                            type: "string",
                            menu: "keys",
                            defaultValue: "0",
                            literal: true
                        }
                    }
                },
                {
                    subCategory: this.context.t("group.4")
                },
                {
                    opcode: "set_ble_mode",
                    text: this.context.t("block.set_ble_mode"),
                    blockType: "command",
                    arguments: {
                        MODE: {
                            type: "string",
                            menu: "blemode",
                            defaultValue: "BLE.MODE_BLE_SLAVE",
                            literal: true
                        },
                        NAME: {
                            type: "string",
                            defaultValue: "AIBlocks"
                        }
                    }
                },
                {
                    opcode: "ble_is_connected",
                    text: this.context.t("block.ble_is_connected"),
                    blockType: "Boolean",
                    disableMonitor: true,
                    arguments: {}
                },
                {
                    opcode: "get_ble_mac",
                    text: this.context.t("block.get_ble_mac"),
                    blockType: "reporter",
                    disableMonitor: true,
                    arguments: {}
                },
                {
                    opcode: "ble_wait_end",
                    text: this.context.t("block.ble_wait_end"),
                    blockType: "Boolean",
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
                    text: this.context.t("block.read_ble_data"),
                    blockType: "reporter",
                    disableMonitor: true,
                    arguments: {}
                },
                {
                    opcode: "get_ble_cmd",
                    text: this.context.t("block.get_ble_cmd"),
                    blockType: "reporter",
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
                    text: this.context.t("block.get_ble_args"),
                    blockType: "reporter",
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
                    text: this.context.t("block.ble_write"),
                    blockType: "command",
                    arguments: {
                        DATA: {
                            type: "string",
                            defaultValue: "CMD"
                        }
                    }
                }
            ],
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
                            text: this.context.t("menu.rhythms.0"),
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
                keys: {
                    acceptReporters: false,
                    items: [
                        {
                            text: this.context.t("menu.keys.0"),
                            value: "0"
                        },
                        {
                            text: this.context.t("menu.keys.1"),
                            value: "1"
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
                }
            }
        };
    }

    // 主入口使用 IIC SDK；数字按键与蓝牙初始化由生成器按实际使用收集去重。
    getPython (): Record<string, PythonTemplate> {
        return {
            start_thread: {
                template: "",
                imports: [
                    "import Hiwonder",
                    "import time",
                    "import Hiwonder_IIC"
                ],
                launcher: "Hiwonder.startMain({MAIN})",
                section: "main"
            },
            start_run_thread: {
                template: "",
                imports: [
                    "import Hiwonder",
                    "import time",
                    "import Hiwonder_IIC"
                ],
                section: "setup"
            },
            buzzer_tone_set: {
                template: "beep.playTone({TONES},{RHYTHMS},{MODE})",
                variables: [
                    "beep = Hiwonder.Buzzer()"
                ],
                templateSelector: {
                    argument: "RHYTHMS",
                    cases: {
                        "0": "beep.onoff(True, {TONES})"
                    }
                }
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
            close_buzzer: {
                template: "beep.onoff(False)",
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
            print_str: {
                template: "print({STR})\ntime.sleep(0.05)",
                imports: [
                    "import time"
                ]
            },
            print_number: {
                template: "print({NUM})\ntime.sleep(0.05)",
                imports: [
                    "import time"
                ],
                templateSelector: {
                    argument: "NUM",
                    matchInputCode: true,
                    cases: {
                        NaN: "print(0)\ntime.sleep(0.05)"
                    }
                }
            },
            when_key_click_thread: {
                template: "",
                imports: [
                    "import Hiwonder",
                    "import time",
                    "import Hiwonder_IIC"
                ],
                variables: [
                    "button{KEYS} = Hiwonder.Button({KEYS})"
                ],
                entryTemplate: "def on_button{KEYS}_clicked():",
                entryFooter: "button{KEYS}.Clicked(on_button{KEYS}_clicked)",
                section: "main"
            },
            key_is_pressed: {
                template: "button{KEYS}.read()",
                imports: [
                    "import Hiwonder",
                    "import time"
                ],
                variables: [
                    "button{KEYS} = Hiwonder.Button({KEYS})"
                ]
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
