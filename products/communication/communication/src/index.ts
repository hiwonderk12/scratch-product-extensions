// 通信作者入口：维护 PS3 手柄声明、集中四语与原始协议常量。
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
