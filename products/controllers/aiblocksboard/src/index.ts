import type {ExtensionContext, ExtensionInfo, NativeExtension, PythonTemplate} from '../../../../tools/sdk';

// AIBlocksBoard 主板独立于机器人套件，集中维护四语、板载积木和 Python 规则。
export const messages = {
    "zh-cn": {
        "product.name": "AI积木控制器",
        "block.start_thread": "主程序",
        "block.start_run_thread": "当启动时",
        "group.1": "板载资源",
        "block.buzzer_tone_set": "播放音调为 [TONES] 节拍为 [RHYTHMS] 模式为 [MODE]",
        "block.buzzer_tone_set_arg": "播放音调为 [TONES] 节拍为 [RHYTHMS] 模式为 [MODE]",
        "block.buzzer_tone_set_volume": "蜂鸣器设置音量大小 [VALUE]",
        "block.close_buzzer": "关闭蜂鸣器",
        "block.get_battery_level": "电量值(mV)",
        "group.2": "输出打印",
        "block.print_str": "输出字符 [STR]",
        "block.print_number": "输出数字 [NUM]",
        "group.3": "按键",
        "block.when_key_click_thread": "当 [KEYS] 键短按时",
        "block.key_is_pressed": "[KEYS] 键被按下",
        "group.4": "蓝牙通信",
        "block.set_ble_mode": "设置蓝牙为 [MODE] 模式，名称 [NAME] ",
        "block.ble_is_connected": "蓝牙已连接？",
        "block.get_ble_mac": "获取蓝牙mac地址",
        "block.ble_wait_end": "蓝牙接收数据包含 [VALUE] ?",
        "block.read_ble_data": "获取接收到的蓝牙数据",
        "block.get_ble_cmd": "解析蓝牙数据 [DATA] ,获取命令",
        "block.get_ble_args": "解析蓝牙数据 [DATA] ,获取参数 [NUM] ",
        "block.ble_write": "蓝牙发送数据 [DATA]",
        "menu.rhythms.500": "二分之一",
        "menu.rhythms.250": "四分之一",
        "menu.rhythms.125": "八分之一",
        "menu.rhythms.1000": "整拍",
        "menu.rhythms.2000": "双拍",
        "menu.rhythms.5000": "长时间",
        "menu.rhythms.0": "持续",
        "menu.buzzer_mode.False": "后台播放",
        "menu.buzzer_mode.True": "前台播放(阻塞式)",
        "menu.keys.0": "左",
        "menu.keys.1": "右",
        "menu.blemode.BLE.MODE_BLE_SLAVE": "从机模式",
        "menu.blemode.BLE.MODE_BLE_MASTER": "主机模式"
    },
    en: {
        "product.name": "AI Blocks Board",
        "block.start_thread": "Main program",
        "block.start_run_thread": "When start-up",
        "group.1": "board resource",
        "block.buzzer_tone_set": "Play tone [TONES] with beat [RHYTHMS] in [MODE]",
        "block.buzzer_tone_set_arg": "Play tone [TONES] with beat [RHYTHMS] in [MODE]",
        "block.buzzer_tone_set_volume": "Set buzzer volume to [VALUE]",
        "block.close_buzzer": "Turn off the buzzer",
        "block.get_battery_level": "Battery level(mV)",
        "group.2": "output",
        "block.print_str": "Output print character [STR]",
        "block.print_number": "Output print number [NUM]",
        "group.3": "Keys",
        "block.when_key_click_thread": "When [KEYS] is short pressed",
        "block.key_is_pressed": "[KEYS] is pressed",
        "group.4": "Bluetooth",
        "block.set_ble_mode": "Set bluetooth to [MODE] mode ,name [NAME] ",
        "block.ble_is_connected": "Is bluetooth connected ?",
        "block.get_ble_mac": "Get bluetooth mac address ?",
        "block.ble_wait_end": "Bluetooth receiving data contains [VALUE] ?",
        "block.read_ble_data": "Get received Bluetooth data",
        "block.get_ble_cmd": "Parse Bluetooth data [DATA] and get command ",
        "block.get_ble_args": "Parse Bluetooth data [DATA] and get parameter [NUM] ",
        "block.ble_write": "Bluetooth sends data [DATA] ",
        "menu.rhythms.500": "Half",
        "menu.rhythms.250": "Quater",
        "menu.rhythms.125": "Eighth",
        "menu.rhythms.1000": "Whole",
        "menu.rhythms.2000": "Double",
        "menu.rhythms.5000": "Long time",
        "menu.rhythms.0": "Continuous",
        "menu.buzzer_mode.False": "play background",
        "menu.buzzer_mode.True": "play foreground(block)",
        "menu.keys.0": "Left",
        "menu.keys.1": "Right",
        "menu.blemode.BLE.MODE_BLE_SLAVE": "Slave mode",
        "menu.blemode.BLE.MODE_BLE_MASTER": "Master mode"
    },
    "zh-tw": {
        "product.name": "AI積木控制器",
        "block.start_thread": "Main program",
        "block.start_run_thread": "When start-up",
        "group.1": "板載資源",
        "block.buzzer_tone_set": "播放音調為 [TONES] 節拍為 [RHYTHMS] 模式為 [MODE]",
        "block.buzzer_tone_set_arg": "播放音調為 [TONES] 節拍為 [RHYTHMS] 模式為 [MODE]",
        "block.buzzer_tone_set_volume": "蜂鳴器設定音量大小 [VALUE]",
        "block.close_buzzer": "Turn off the buzzer",
        "block.get_battery_level": "電量值(mV)",
        "group.2": "輸出列印",
        "block.print_str": "輸出字元 [STR]",
        "block.print_number": "輸出數位 [NUM]",
        "group.3": "按鍵",
        "block.when_key_click_thread": "When [KEYS] is short pressed",
        "block.key_is_pressed": "[KEYS] is pressed",
        "group.4": "藍牙通信",
        "block.set_ble_mode": "設定藍牙為 [MODE] 模式，名稱 [NAME] ",
        "block.ble_is_connected": "藍牙已連接？",
        "block.get_ble_mac": "獲取藍牙mac地址",
        "block.ble_wait_end": "藍牙接收數據包含 [VALUE] ?",
        "block.read_ble_data": "獲取接收到的藍牙數據",
        "block.get_ble_cmd": "解析藍牙數據 [DATA] ,獲取命令",
        "block.get_ble_args": "解析藍牙數據 [DATA] ,獲取參數 [NUM] ",
        "block.ble_write": "藍牙發送數據 [DATA]",
        "menu.rhythms.500": "二分之一",
        "menu.rhythms.250": "四分之一",
        "menu.rhythms.125": "八分之一",
        "menu.rhythms.1000": "整拍",
        "menu.rhythms.2000": "雙拍",
        "menu.rhythms.5000": "長時間",
        "menu.rhythms.0": "持續",
        "menu.buzzer_mode.False": "後臺播放",
        "menu.buzzer_mode.True": "前臺播放(阻塞式)",
        "menu.keys.0": "Left",
        "menu.keys.1": "Right",
        "menu.blemode.BLE.MODE_BLE_SLAVE": "從機模式",
        "menu.blemode.BLE.MODE_BLE_MASTER": "主機模式"
    },
    ko: {
        "product.name": "AI 블록형 컨트롤러",
        "block.start_thread": "메인프로그램",
        "block.start_run_thread": "시작할때",
        "group.1": "보드 자원",
        "block.buzzer_tone_set": "[TONES] 주파수를 [RHYTHMS] 동안 [MODE] 모드로 재생",
        "block.buzzer_tone_set_arg": "[TONES] 주파수를 [RHYTHMS] 동안 [MODE] 모드로 재생",
        "block.buzzer_tone_set_volume": "버저 볼륨을 [VALUE] 로 설정",
        "block.close_buzzer": "버저 끄기",
        "block.get_battery_level": "배터리 전압(Mv)",
        "group.2": "출력",
        "block.print_str": "문자 [STR] 출력",
        "block.print_number": "[NUM] 숫자 출력",
        "group.3": "키",
        "block.when_key_click_thread": "[KEYS] 키를 짧게 눌렀을 때",
        "block.key_is_pressed": "[KEYS] 키가 눌렸는가?",
        "group.4": "블루투스",
        "block.set_ble_mode": "블루투스를 [MODE] 모드, 이름 [NAME] 로 설정",
        "block.ble_is_connected": "블루투스가 연결되었는가 ?",
        "block.get_ble_mac": "블루투스 MAC 주소",
        "block.ble_wait_end": "받은 데이터에 [VALUE] 가 포함되어있는",
        "block.read_ble_data": "받은 블루투스 데이터",
        "block.get_ble_cmd": "블루투스 데이터 [DATA] 를 파싱하고 명령어 가져오기",
        "block.get_ble_args": "블루투스 데이터 [DATA] 를 파싱하고 변수 [NUM] 가져오기",
        "block.ble_write": "블루투스 데이터 [DATA] 보내기",
        "menu.rhythms.500": "2분 음표",
        "menu.rhythms.250": "4분 음표",
        "menu.rhythms.125": "8분 음표",
        "menu.rhythms.1000": "온 음표",
        "menu.rhythms.2000": "이중 온음표",
        "menu.rhythms.5000": "길게",
        "menu.rhythms.0": "지속",
        "menu.buzzer_mode.False": "백그라운드 실행",
        "menu.buzzer_mode.True": "포그라운드(블록)",
        "menu.keys.0": "왼쪽",
        "menu.keys.1": "오른쪽",
        "menu.blemode.BLE.MODE_BLE_SLAVE": "슬레이브",
        "menu.blemode.BLE.MODE_BLE_MASTER": "마스터"
    }
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
