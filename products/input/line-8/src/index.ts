import type {ExtensionContext, ExtensionInfo, NativeExtension, PythonTemplate} from '../../../../tools/sdk';

// 单入口维护巡线积木、集中四语、菜单和 Python；通道编号与位掩码保持不同语义。
export const messages = {
    "zh-cn": {
        "product.name": "八路灰度巡线传感器",
        "block.linefollower8_init": "初始化八路灰度巡线传感器IIC接口 [PORT]",
        "block.linefollower8_one_status": "八路灰度巡线传感器通道 [NUM] 检测到 [LINE]",
        "block.linefollower8_status": "八路灰度巡线传感器通道检测到 [LINE]",
        "block.linefollower8_get_value": "八路灰度巡线传感器通道 [NUM] 灰度值"
    },
    en: {
        "product.name": "8-channel grayscale line follower sensor",
        "block.linefollower8_init": "Initialize 8-channel grayscale line follower IIC port [PORT]",
        "block.linefollower8_one_status": "8-channel grayscale line follower channel [NUM] detects [LINE]",
        "block.linefollower8_status": "8-channel grayscale line follower channels detect [LINE]",
        "block.linefollower8_get_value": "8-channel grayscale line follower channel [NUM] grayscale"
    },
    "zh-tw": {
        "product.name": "八路灰階循線感測器",
        "block.linefollower8_init": "初始化八路灰階循線感測器 IIC 介面 [PORT]",
        "block.linefollower8_one_status": "八路灰階循線感測器通道 [NUM] 偵測到 [LINE]",
        "block.linefollower8_status": "八路灰階循線感測器通道偵測到 [LINE]",
        "block.linefollower8_get_value": "八路灰階循線感測器通道 [NUM] 灰階值"
    },
    ko: {
        "product.name": "8채널 그레이스케일 라인 추적 센서",
        "block.linefollower8_init": "8채널 그레이스케일 라인 추적 센서 IIC 포트 [PORT] 초기화",
        "block.linefollower8_one_status": "8채널 그레이스케일 라인 추적 센서 채널 [NUM] 에서 [LINE] 감지",
        "block.linefollower8_status": "8채널 그레이스케일 라인 추적 센서 채널 상태 [LINE] 감지",
        "block.linefollower8_get_value": "8채널 그레이스케일 라인 추적 센서 채널 [NUM] 그레이스케일 값"
    }
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
