// 通信作者入口：维护 PS3 手柄声明、集中四语与原始协议常量。
import type {ExtensionContext, ExtensionInfo, NativeExtension, PythonTemplate} from '../../../../tools/sdk';

export const messages = {
    "zh-cn": {
        "product.name": "通信模块",
        "group.ps3": "PS3手柄",
        "block.ps3_init": "初始化手柄，MAC地址 [STR]",
        "block.ps3_get_address": "获取mac地址",
        "block.ps3_disconnect": "断开连接",
        "block.ps3_is_connected": "是否连接成功？",
        "block.ps3_set_led": "设置LED灯1 [VALUE1] 灯2 [VALUE2] 灯3 [VALUE3] 灯4 [VALUE4]",
        "block.ps3_set_rumble": "设置手柄震动强度 [VALUE1] 和震动时间(最大值5000ms) [VALUE2] ms",
        "block.ps3_get_keys": "[PS3_KEYS] 被按下",
        "block.ps3_get_axis": "获取 [HANDLE_AXIS] 值",
        "block.ps3_get_sensor": "获取imu [ACCEL] 值",
        "menu.x-angle": "X轴角度",
        "menu.y-angle": "Y轴角度",
        "menu.on": "开",
        "menu.off": "关",
        "menu.right-horizontal": "右舵水平",
        "menu.right-vertical": "右舵垂直",
        "menu.left-horizontal": "左舵水平",
        "menu.left-vertical": "左舵垂直"
    },
    en: {
        "product.name": "Communication module",
        "group.ps3": "PS3 controller",
        "block.ps3_init": "Initialize controller with MAC address [STR]",
        "block.ps3_get_address": "Get MAC address",
        "block.ps3_disconnect": "Disconnect",
        "block.ps3_is_connected": "Connected?",
        "block.ps3_set_led": "Set LED 1 [VALUE1] LED 2 [VALUE2] LED 3 [VALUE3] LED 4 [VALUE4]",
        "block.ps3_set_rumble": "Set controller rumble intensity [VALUE1] and duration (maximum 5000 ms) [VALUE2] ms",
        "block.ps3_get_keys": "[PS3_KEYS] pressed?",
        "block.ps3_get_axis": "Get [HANDLE_AXIS] value",
        "block.ps3_get_sensor": "Get IMU [ACCEL] value",
        "menu.x-angle": "X-axis angle",
        "menu.y-angle": "Y-axis angle",
        "menu.on": "On",
        "menu.off": "Off",
        "menu.right-horizontal": "Right stick horizontal",
        "menu.right-vertical": "Right stick vertical",
        "menu.left-horizontal": "Left stick horizontal",
        "menu.left-vertical": "Left stick vertical"
    },
    "zh-tw": {
        "product.name": "通訊模組",
        "group.ps3": "PS3控制器",
        "block.ps3_init": "初始化控制器，MAC位址 [STR]",
        "block.ps3_get_address": "取得MAC位址",
        "block.ps3_disconnect": "中斷連線",
        "block.ps3_is_connected": "是否連線成功？",
        "block.ps3_set_led": "設定LED燈1 [VALUE1] 燈2 [VALUE2] 燈3 [VALUE3] 燈4 [VALUE4]",
        "block.ps3_set_rumble": "設定控制器震動強度 [VALUE1] 和震動時間(最大值5000ms) [VALUE2] ms",
        "block.ps3_get_keys": "[PS3_KEYS] 被按下",
        "block.ps3_get_axis": "取得 [HANDLE_AXIS] 值",
        "block.ps3_get_sensor": "取得IMU [ACCEL] 值",
        "menu.x-angle": "X軸角度",
        "menu.y-angle": "Y軸角度",
        "menu.on": "開",
        "menu.off": "關",
        "menu.right-horizontal": "右搖桿水平",
        "menu.right-vertical": "右搖桿垂直",
        "menu.left-horizontal": "左搖桿水平",
        "menu.left-vertical": "左搖桿垂直"
    },
    ko: {
        "product.name": "통신 모듈",
        "group.ps3": "PS3 컨트롤러",
        "block.ps3_init": "MAC 주소 [STR] 로 컨트롤러 초기화하기",
        "block.ps3_get_address": "MAC 주소 읽기",
        "block.ps3_disconnect": "연결 해제하기",
        "block.ps3_is_connected": "연결되었는가?",
        "block.ps3_set_led": "LED 1 [VALUE1] LED 2 [VALUE2] LED 3 [VALUE3] LED 4 [VALUE4] 설정하기",
        "block.ps3_set_rumble": "컨트롤러 진동 강도 [VALUE1] 및 진동 시간(최대 5000 ms) [VALUE2] ms 설정하기",
        "block.ps3_get_keys": "[PS3_KEYS] 버튼을 눌렀는가?",
        "block.ps3_get_axis": "[HANDLE_AXIS] 값 읽기",
        "block.ps3_get_sensor": "IMU [ACCEL] 값 읽기",
        "menu.x-angle": "X축 각도",
        "menu.y-angle": "Y축 각도",
        "menu.on": "켜기",
        "menu.off": "끄기",
        "menu.right-horizontal": "오른쪽 스틱 수평",
        "menu.right-vertical": "오른쪽 스틱 수직",
        "menu.left-horizontal": "왼쪽 스틱 수평",
        "menu.left-vertical": "왼쪽 스틱 수직"
    }
} as const;

export const product = {name: 'product.name', supportedLocales: ['zh-cn', 'en', 'zh-tw', 'ko']} as const;

export default class CommunicationBlocks implements NativeExtension {
    constructor (private readonly context: ExtensionContext) {}

    private checkVariant (): void {
        if (this.context.variant !== 'ps3') {
            throw new Error('communication/communication: 未支持的主控适配 ' + this.context.variant);
        }
    }

    getInfo (): ExtensionInfo {
        this.checkVariant();
        return {
            id: "communication",
            name: this.context.t(product.name),
            color1: "#EE799F",
            color2: "#EE799F",
            color3: "#EE799F",
            menus: {
                accel: {
                    acceptReporters: false,
                    items: [
                        {
                            text: this.context.t('menu.x-angle'),
                            value: "ACCEL_X"
                        },
                        {
                            text: this.context.t('menu.y-angle'),
                            value: "ACCEL_Y"
                        }
                    ]
                },
                on_off: {
                    acceptReporters: false,
                    items: [
                        {
                            text: this.context.t('menu.on'),
                            value: "1"
                        },
                        {
                            text: this.context.t('menu.off'),
                            value: "0"
                        }
                    ]
                },
                ps3_handle_axis: {
                    acceptReporters: false,
                    items: [
                        {
                            text: this.context.t('menu.right-horizontal'),
                            value: "RX"
                        },
                        {
                            text: this.context.t('menu.right-vertical'),
                            value: "RY"
                        },
                        {
                            text: this.context.t('menu.left-horizontal'),
                            value: "LX"
                        },
                        {
                            text: this.context.t('menu.left-vertical'),
                            value: "LY"
                        }
                    ]
                },
                ps3_keys: {
                    acceptReporters: false,
                    items: [
                        {
                            text: "SELECT",
                            value: "SELECT"
                        },
                        {
                            text: "START",
                            value: "START"
                        },
                        {
                            text: "PS",
                            value: "PS"
                        },
                        {
                            text: "↑",
                            value: "UP"
                        },
                        {
                            text: "↓",
                            value: "DOWN"
                        },
                        {
                            text: "←",
                            value: "LEFT"
                        },
                        {
                            text: "→",
                            value: "RIGHT"
                        },
                        {
                            text: "L1",
                            value: "L1"
                        },
                        {
                            text: "L2",
                            value: "L2"
                        },
                        {
                            text: "L3",
                            value: "L3"
                        },
                        {
                            text: "R1",
                            value: "R1"
                        },
                        {
                            text: "R2",
                            value: "R2"
                        },
                        {
                            text: "R3",
                            value: "R3"
                        },
                        {
                            text: "◭",
                            value: "TRIANGLE"
                        },
                        {
                            text: "◯",
                            value: "CIRCLE"
                        },
                        {
                            text: "╳",
                            value: "CROSS"
                        },
                        {
                            text: "▢",
                            value: "SQUARE"
                        }
                    ]
                }
            },
            blocks: [
                {
                    subCategory: this.context.t('group.ps3')
                },
                {
                    opcode: "ps3_init",
                    blockType: "command",
                    text: this.context.t('block.ps3_init'),
                    arguments: {
                        STR: {
                            type: "string",
                            defaultValue: "10:00:00:00:00:00"
                        }
                    }
                },
                {
                    opcode: "ps3_get_address",
                    blockType: "reporter",
                    disableMonitor: true,
                    text: this.context.t('block.ps3_get_address'),
                    arguments: {}
                },
                {
                    opcode: "ps3_disconnect",
                    blockType: "command",
                    text: this.context.t('block.ps3_disconnect'),
                    arguments: {}
                },
                {
                    opcode: "ps3_is_connected",
                    blockType: "Boolean",
                    disableMonitor: true,
                    text: this.context.t('block.ps3_is_connected'),
                    arguments: {}
                },
                {
                    opcode: "ps3_set_led",
                    blockType: "command",
                    text: this.context.t('block.ps3_set_led'),
                    arguments: {
                        VALUE1: {
                            type: "string",
                            defaultValue: "1",
                            menu: "on_off",
                            literal: true
                        },
                        VALUE2: {
                            type: "string",
                            defaultValue: "1",
                            menu: "on_off",
                            literal: true
                        },
                        VALUE3: {
                            type: "string",
                            defaultValue: "1",
                            menu: "on_off",
                            literal: true
                        },
                        VALUE4: {
                            type: "string",
                            defaultValue: "1",
                            menu: "on_off",
                            literal: true
                        }
                    }
                },
                {
                    opcode: "ps3_set_rumble",
                    blockType: "command",
                    text: this.context.t('block.ps3_set_rumble'),
                    arguments: {
                        VALUE1: {
                            type: "slider",
                            defaultValue: 60
                        },
                        VALUE2: {
                            type: "number",
                            defaultValue: 3000
                        }
                    }
                },
                {
                    opcode: "ps3_get_keys",
                    blockType: "Boolean",
                    disableMonitor: true,
                    text: this.context.t('block.ps3_get_keys'),
                    arguments: {
                        PS3_KEYS: {
                            type: "string",
                            defaultValue: "SELECT",
                            menu: "ps3_keys",
                            literal: true
                        }
                    }
                },
                {
                    opcode: "ps3_get_axis",
                    blockType: "reporter",
                    disableMonitor: true,
                    text: this.context.t('block.ps3_get_axis'),
                    arguments: {
                        HANDLE_AXIS: {
                            type: "string",
                            defaultValue: "RX",
                            menu: "ps3_handle_axis",
                            literal: true
                        }
                    }
                },
                {
                    opcode: "ps3_get_sensor",
                    blockType: "reporter",
                    disableMonitor: true,
                    text: this.context.t('block.ps3_get_sensor'),
                    arguments: {
                        ACCEL: {
                            type: "string",
                            defaultValue: "ACCEL_X",
                            menu: "accel",
                            literal: true
                        }
                    }
                }
            ]
        };
    }

    // 仅初始化积木导入 PS3；其他控制和读取不隐式初始化连接。
    getPython (): Record<string, PythonTemplate> {
        this.checkVariant();
        return {
            ps3_init: {
                template: "PS3.init({STR})",
                imports: [
                    "import PS3"
                ]
            },
            ps3_get_address: {
                template: "PS3.get_address()"
            },
            ps3_disconnect: {
                template: "PS3.deinit()"
            },
            ps3_is_connected: {
                template: "PS3.isconnected()"
            },
            ps3_set_led: {
                template: "PS3.setleds([{VALUE1},{VALUE2},{VALUE3},{VALUE4}])"
            },
            ps3_set_rumble: {
                template: "PS3.set_rumble({VALUE1}, {VALUE2})"
            },
            ps3_get_keys: {
                template: "PS3.get_button(PS3.{PS3_KEYS})"
            },
            ps3_get_axis: {
                template: "PS3.get_axis(PS3.{HANDLE_AXIS})"
            },
            ps3_get_sensor: {
                template: "PS3.get_sensor(PS3.{ACCEL})"
            }
        };
    }
}
