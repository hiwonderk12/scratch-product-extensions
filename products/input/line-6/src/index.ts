import type {ExtensionContext, ExtensionInfo, NativeExtension, PythonTemplate} from '../../../../tools/sdk';

// 单入口维护巡线积木、集中四语、菜单和 Python；通道编号与位掩码保持不同语义。
export const messages = {
    "zh-cn": {
        "product.name": "六路巡线传感器",
        "block.aimech_linefollower6_init": "初始化六路巡线传感器IIC接口 [PORT]",
        "block.linefollower6_one_status": "六路巡线传感器通道 [NUM] 检测到 [LINE]",
        "block.linefollower6_status": "六路巡线传感器通道检测到 [LINE]",
        "block.linefollower6_set_threshold": "设置六路巡线传感器阈值比例(范围1~9)为 [VALUE]",
        "block.linefollower6_get_value": "六路巡线传感器通道 [NUM] 灰度值(0~100)",
        "block.linefollower6_read_offset": "获取六路巡线传感器偏差值"
    },
    en: {
        "product.name": "6-channel line follower sensor",
        "block.aimech_linefollower6_init": "Initialize 6-channel line follower IIC port [PORT]",
        "block.linefollower6_one_status": "6-channel line follower channel [NUM] detects [LINE]",
        "block.linefollower6_status": "6-channel line follower channels detect [LINE]",
        "block.linefollower6_set_threshold": "Set 6-channel line follower threshold ratio (1~9) to [VALUE]",
        "block.linefollower6_get_value": "6-channel line follower channel [NUM] grayscale (0~100)",
        "block.linefollower6_read_offset": "Get 6-channel line follower offset"
    },
    "zh-tw": {
        "product.name": "六路循線感測器",
        "block.aimech_linefollower6_init": "初始化六路循線感測器 IIC 介面 [PORT]",
        "block.linefollower6_one_status": "六路循線感測器通道 [NUM] 偵測到 [LINE]",
        "block.linefollower6_status": "六路循線感測器通道偵測到 [LINE]",
        "block.linefollower6_set_threshold": "設定六路循線感測器閾值比例（範圍 1~9）為 [VALUE]",
        "block.linefollower6_get_value": "六路循線感測器通道 [NUM] 灰階值（0~100）",
        "block.linefollower6_read_offset": "取得六路循線感測器偏差值"
    },
    ko: {
        "product.name": "6채널 라인 추적 센서",
        "block.aimech_linefollower6_init": "6채널 라인 추적 센서 IIC 포트 [PORT] 초기화",
        "block.linefollower6_one_status": "6채널 라인 추적 센서 채널 [NUM] 에서 [LINE] 감지",
        "block.linefollower6_status": "6채널 라인 추적 센서 채널 상태 [LINE] 감지",
        "block.linefollower6_set_threshold": "6채널 라인 추적 센서 임계값 비율(1~9)을 [VALUE] 로 설정",
        "block.linefollower6_get_value": "6채널 라인 추적 센서 채널 [NUM] 그레이스케일 값(0~100)",
        "block.linefollower6_read_offset": "6채널 라인 추적 센서 편차 읽기"
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

export default class Line6Blocks implements NativeExtension {
    constructor (private readonly context: ExtensionContext) {}

    // 库配置选择真实驱动；不接受只改端口而不匹配 SDK 的未知适配。
    private checkAdapter (): void {
        if (this.context.variant !== 'hiwonder-dev-port') {
            throw new Error('input/line-6: 未知适配 ' + this.context.variant);
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
                    opcode: "aimech_linefollower6_init",
                    blockType: "command",
                    text: this.context.t('block.aimech_linefollower6_init'),
                    blockIconURI: this.context.asset('assets/linefollow.svg'),
                    arguments: {
                        PORT: {
                            type: "string",
                            defaultValue: this.context.defaultPort('aimech_linefollower6_init', 'PORT'),
                            menu: "aimech_iicport",
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
        return {
            aimech_linefollower6_init: {
                template: "",
                imports: [
                    "import Hiwonder_DEV"
                ],
                variables: [
                    "linefollow6 = Hiwonder_DEV.DEV_LINE_FOLLOW_6(Hiwonder_DEV.Port({PORT}))"
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
