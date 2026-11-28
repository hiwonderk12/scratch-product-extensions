import type {ExtensionContext, ExtensionInfo, NativeExtension, PythonTemplate} from '../../../../tools/sdk';

// 单入口维护巡线积木、集中四语、菜单和 Python；通道编号与位掩码保持不同语义。
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

export const product = {
    name: "product.name",
    supportedLocales: [
        "zh-cn",
        "en",
        "zh-tw",
        "ko"
    ]
} as const;

export default class Line8Blocks implements NativeExtension {
    constructor (private readonly context: ExtensionContext) {}

    // 库配置选择真实驱动；不接受只改端口而不匹配 SDK 的未知适配。
    private checkAdapter (): void {
        if (this.context.variant !== 'hiwonder-dev-port') {
            throw new Error('input/line-8: 未知适配 ' + this.context.variant);
        }
    }

    getInfo (): ExtensionInfo {
        this.checkAdapter();
        return {
            id: "sensor",
            name: this.context.t(product.name),
            color1: "#7B68EE",
            color2: "#7B68EE",
            color3: "#7B68EE",
            menus: {
                aimech_iicport: {
                    acceptReporters: false,
                    items: [
                        {text: 'A', value: '1'},
                        {text: 'B', value: '2'},
                        {text: 'C', value: '3'},
                        {text: 'D', value: '4'},
                        {text: 'E', value: '5'},
                        {text: 'J', value: '9'},
                        {text: 'K', value: '10'}
                    ]
                },
                linedot2: {
                    items: [
                        {
                            text: "◌",
                            value: "0"
                        },
                        {
                            text: "●",
                            value: "1"
                        }
                    ],
                    acceptReporters: false
                },
                linefollows8: {
                    items: [
                        {
                            text: "1",
                            value: "1"
                        },
                        {
                            text: "2",
                            value: "2"
                        },
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
                            text: "6",
                            value: "6"
                        },
                        {
                            text: "7",
                            value: "7"
                        },
                        {
                            text: "8",
                            value: "8"
                        }
                    ],
                    acceptReporters: false
                },
                linefollows8Mask: {
                    items: [
                        {
                            text: "1",
                            value: "1"
                        },
                        {
                            text: "2",
                            value: "2"
                        },
                        {
                            text: "3",
                            value: "4"
                        },
                        {
                            text: "4",
                            value: "8"
                        },
                        {
                            text: "5",
                            value: "16"
                        },
                        {
                            text: "6",
                            value: "32"
                        },
                        {
                            text: "7",
                            value: "64"
                        },
                        {
                            text: "8",
                            value: "128"
                        }
                    ],
                    acceptReporters: false
                }
            },
            blocks: [
                {
                    subCategory: this.context.t(product.name)
                },
                {
                    opcode: "linefollower8_init",
                    blockType: "command",
                    text: this.context.t('block.linefollower8_init'),
                    arguments: {
                        PORT: {
                            type: "string",
                            defaultValue: this.context.defaultPort('linefollower8_init', 'PORT'),
                            menu: "aimech_iicport",
                            literal: true
                        }
                    }
                },
                {
                    opcode: "linefollower8_one_status",
                    blockType: "Boolean",
                    disableMonitor: true,
                    text: this.context.t('block.linefollower8_one_status'),
                    arguments: {
                        NUM: {
                            type: "string",
                            defaultValue: "1",
                            menu: "linefollows8Mask",
                            literal: true
                        },
                        LINE: {
                            type: "string",
                            defaultValue: "0",
                            menu: "linedot2",
                            literal: true
                        }
                    }
                },
                {
                    opcode: "linefollower8_status",
                    blockType: "Boolean",
                    disableMonitor: true,
                    text: this.context.t('block.linefollower8_status'),
                    arguments: {
                        LINE: {
                            type: "line8",
                            defaultValue: "00"
                        }
                    }
                },
                {
                    opcode: "linefollower8_get_value",
                    blockType: "reporter",
                    disableMonitor: true,
                    text: this.context.t('block.linefollower8_get_value'),
                    arguments: {
                        NUM: {
                            type: "string",
                            defaultValue: "1",
                            menu: "linefollows8",
                            literal: true
                        }
                    }
                }
            ]
        };
    }

    // 仅初始化积木收集独立设备对象；亮灭由选择器区分 == 0 与 > 0，LINE 值直接组成十六进制。
    getPython (): Record<string, PythonTemplate> {
        this.checkAdapter();
        return {
            linefollower8_init: {
                template: "",
                imports: [
                    "import Hiwonder_DEV"
                ],
                variables: [
                    "linefollow8 = Hiwonder_DEV.DEV_LINE_FOLLOW_8(Hiwonder_DEV.Port({PORT}))"
                ]
            },
            linefollower8_one_status: {
                template: "(linefollow8.get_result_data() & {NUM}) > {LINE}",
                templateSelector: {
                    argument: "LINE",
                    cases: {
                        "0": "(linefollow8.get_result_data() & {NUM}) == 0",
                        "1": "(linefollow8.get_result_data() & {NUM}) > 0"
                    }
                }
            },
            linefollower8_status: {
                template: "linefollow8.get_result_data() == 0x{LINE}"
            },
            linefollower8_get_value: {
                template: "linefollow8.read_AnalogQuantity({NUM})"
            }
        };
    }
}
