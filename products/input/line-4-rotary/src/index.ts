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

export default class RotaryLine4Blocks implements NativeExtension {
    constructor (private readonly context: ExtensionContext) {}

    // 库配置选择真实驱动；不接受只改端口而不匹配 SDK 的未知适配。
    private checkAdapter (): void {
        if (this.context.variant !== 'hiwonder-dev-port') {
            throw new Error('input/line-4-rotary: 未知适配 ' + this.context.variant);
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
                    items: this.context.ports('sensor.aimech_iicport'),
                    acceptReporters: false
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
                linefollows4Mask: {
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
                    opcode: "linefollower4_init",
                    blockType: "command",
                    text: this.context.t('block.linefollower4_init'),
                    blockIconURI: this.context.asset('assets/linefollow.svg'),
                    arguments: {
                        PORT: {
                            type: "string",
                            defaultValue: this.context.defaultPort('linefollower4_init', 'PORT'),
                            menu: "aimech_iicport",
                            literal: true
                        }
                    }
                },
                {
                    opcode: "linefollower4_one_status",
                    blockType: "Boolean",
                    disableMonitor: true,
                    text: this.context.t('block.linefollower4_one_status'),
                    blockIconURI: this.context.asset('assets/linefollow.svg'),
                    arguments: {
                        NUM: {
                            type: "string",
                            defaultValue: "1",
                            menu: "linefollows4Mask",
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
                    opcode: "linefollower4_status_result",
                    blockType: "Boolean",
                    disableMonitor: true,
                    text: this.context.t('block.linefollower4_status_result'),
                    blockIconURI: this.context.asset('assets/linefollow.svg'),
                    arguments: {
                        VALUE: {
                            type: "line4",
                            defaultValue: "00"
                        }
                    }
                },
                {
                    opcode: "linefollower4_read_offset",
                    blockType: "reporter",
                    disableMonitor: true,
                    text: this.context.t('block.linefollower4_read_offset'),
                    blockIconURI: this.context.asset('assets/linefollow.svg'),
                    arguments: {}
                }
            ]
        };
    }

    // 仅初始化积木收集独立设备对象；亮灭由选择器区分 == 0 与 > 0，LINE 值直接组成十六进制。
    getPython (): Record<string, PythonTemplate> {
        this.checkAdapter();
        return {
            linefollower4_init: {
                template: "",
                imports: [
                    "import Hiwonder_DEV"
                ],
                variables: [
                    "linefollow4 = Hiwonder_DEV.DEV_LINE_FOLLOW_4_O(Hiwonder_DEV.Port({PORT}))"
                ]
            },
            linefollower4_one_status: {
                template: "(linefollow4.get_result_data() & {NUM}) > {LINE}",
                templateSelector: {
                    argument: "LINE",
                    cases: {
                        "0": "(linefollow4.get_result_data() & {NUM}) == 0",
                        "1": "(linefollow4.get_result_data() & {NUM}) > 0"
                    }
                }
            },
            linefollower4_status_result: {
                template: "linefollow4.get_result_data() == 0x{VALUE}"
            },
            linefollower4_read_offset: {
                template: "linefollow4.read_offset()"
            }
        };
    }
}
