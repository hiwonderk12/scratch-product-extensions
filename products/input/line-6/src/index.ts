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

export default class Line6Blocks implements NativeExtension {
    constructor (private readonly context: ExtensionContext) {}

    // 库配置选择真实驱动；不接受只改端口而不匹配 SDK 的未知适配。
    private checkAdapter (): void {
        if (!['hiwonder-dev-port', 'hiwonder-iic'].includes(this.context.variant)) {
            throw new Error('input/line-6: 未知适配 ' + this.context.variant);
        }
    }

    getInfo (): ExtensionInfo {
        this.checkAdapter();
        const board = this.context.variant === 'hiwonder-iic';
        const {opcode: initOpcode} = board ? {opcode: 'aiblocksboard_linefollower6_init'} : {opcode: 'aimech_linefollower6_init'};
        const portMenu = board ? 'aiblocks_iicport' : 'aimech_iicport';
        return {
            id: "sensor",
            name: this.context.t(product.name),
            color1: "#7B68EE",
            color2: "#7B68EE",
            color3: "#7B68EE",
            menus: {
                [portMenu]: {
                    items: this.context.ports('sensor.' + portMenu),
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
                linefollows6: {
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
                        }
                    ],
                    acceptReporters: false
                },
                linefollows6Mask: {
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
                    opcode: initOpcode,
                    blockType: "command",
                    text: board ? this.context.t('block.aiblocksboard_linefollower6_init') : this.context.t('block.aimech_linefollower6_init'),
                    blockIconURI: this.context.asset('assets/linefollow.svg'),
                    arguments: {
                        PORT: {
                            type: "string",
                            defaultValue: this.context.defaultPort(initOpcode, 'PORT'),
                            menu: portMenu,
                            literal: true
                        }
                    }
                },
                {
                    opcode: "linefollower6_one_status",
                    blockType: "Boolean",
                    disableMonitor: true,
                    text: this.context.t('block.linefollower6_one_status'),
                    blockIconURI: this.context.asset('assets/linefollow.svg'),
                    arguments: {
                        NUM: {
                            type: "string",
                            defaultValue: "1",
                            menu: "linefollows6Mask",
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
                    opcode: "linefollower6_status",
                    blockType: "Boolean",
                    disableMonitor: true,
                    text: this.context.t('block.linefollower6_status'),
                    blockIconURI: this.context.asset('assets/linefollow.svg'),
                    arguments: {
                        LINE: {
                            type: "line6",
                            defaultValue: "00"
                        }
                    }
                },
                {
                    opcode: "linefollower6_set_threshold",
                    blockType: "command",
                    text: this.context.t('block.linefollower6_set_threshold'),
                    blockIconURI: this.context.asset('assets/linefollow.svg'),
                    arguments: {
                        VALUE: {
                            type: "number",
                            defaultValue: 7
                        }
                    }
                },
                {
                    opcode: "linefollower6_get_value",
                    blockType: "reporter",
                    disableMonitor: true,
                    text: this.context.t('block.linefollower6_get_value'),
                    blockIconURI: this.context.asset('assets/linefollow.svg'),
                    arguments: {
                        NUM: {
                            type: "string",
                            defaultValue: "1",
                            menu: "linefollows6",
                            literal: true
                        }
                    }
                },
                {
                    opcode: "linefollower6_read_offset",
                    blockType: "reporter",
                    disableMonitor: true,
                    text: this.context.t('block.linefollower6_read_offset'),
                    blockIconURI: this.context.asset('assets/linefollow.svg'),
                    arguments: {}
                }
            ]
        };
    }

    // 仅初始化积木收集独立设备对象；亮灭由选择器区分 == 0 与 > 0，LINE 值直接组成十六进制。
    getPython (): Record<string, PythonTemplate> {
        this.checkAdapter();
        const board = this.context.variant === 'hiwonder-iic';
        return {
            [board ? 'aiblocksboard_linefollower6_init' : 'aimech_linefollower6_init']: {
                template: "",
                imports: [
                    board ? "import Hiwonder_IIC" : "import Hiwonder_DEV"
                ],
                variables: [
                    ...(board ? ["iic = Hiwonder_IIC.IIC()", "linefollow6 = Hiwonder_IIC.LINE_FOLLOW_6_module(iic,{PORT})"] :
                        ["linefollow6 = Hiwonder_DEV.DEV_LINE_FOLLOW_6(Hiwonder_DEV.Port({PORT}))"])
                ]
            },
            linefollower6_one_status: {
                template: "(linefollow6.get_result_data() & {NUM}) > {LINE}",
                templateSelector: {
                    argument: "LINE",
                    cases: {
                        "0": "(linefollow6.get_result_data() & {NUM}) == 0",
                        "1": "(linefollow6.get_result_data() & {NUM}) > 0"
                    }
                }
            },
            linefollower6_status: {
                template: "linefollow6.get_result_data() == 0x{LINE}"
            },
            linefollower6_set_threshold: {
                template: "linefollow6.set_ThresholdRatioReg({VALUE})"
            },
            linefollower6_get_value: {
                template: "linefollow6.read_AnalogQuantity({NUM})"
            },
            linefollower6_read_offset: {
                template: "linefollow6.read_offset()"
            }
        };
    }
}
