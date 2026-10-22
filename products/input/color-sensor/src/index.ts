import type {ExtensionContext, ExtensionInfo, NativeExtension, PythonTemplate} from '../../../../tools/sdk';

// 本模块在同一入口维护积木、菜单、集中四语和 Python 生成规则。
export const messages = {
    "zh-cn": {
        "product.name": "颜色识别模块",
        "menu.aiblocks_colors.0": "红",
        "menu.aiblocks_colors.1": "绿",
        "menu.aiblocks_colors.2": "蓝",
        "menu.aiblocks_colors2.0": "红",
        "menu.aiblocks_colors2.1": "绿",
        "menu.aiblocks_colors2.2": "蓝",
        "block.aimech_colorsensor_init": "初始化颜色传感器IIC接口 [PORT]",
        "block.aiblocks_check_color": "检测到 [COLOR]",
        "block.aiblocks_get_color": "获取颜色值",
        "block.aiblocks_get_color_arg": "颜色值 [NUM] 的 [COLOR] 色值"
    },
    en: {
        "product.name": "Color recognition module",
        "menu.aiblocks_colors.0": "Red",
        "menu.aiblocks_colors.1": "Green",
        "menu.aiblocks_colors.2": "Blue",
        "menu.aiblocks_colors2.0": "Red",
        "menu.aiblocks_colors2.1": "Green",
        "menu.aiblocks_colors2.2": "Blue",
        "block.aimech_colorsensor_init": "Initialize color sensor IIC port [PORT]",
        "block.aiblocks_check_color": "Color [COLOR] detected",
        "block.aiblocks_get_color": "Get color values",
        "block.aiblocks_get_color_arg": "[COLOR] channel of color values [NUM]"
    },
    "zh-tw": {
        "product.name": "顏色辨識模組",
        "menu.aiblocks_colors.0": "紅",
        "menu.aiblocks_colors.1": "綠",
        "menu.aiblocks_colors.2": "藍",
        "menu.aiblocks_colors2.0": "紅",
        "menu.aiblocks_colors2.1": "綠",
        "menu.aiblocks_colors2.2": "藍",
        "block.aimech_colorsensor_init": "初始化顏色感測器 IIC 介面 [PORT]",
        "block.aiblocks_check_color": "偵測到 [COLOR]",
        "block.aiblocks_get_color": "取得顏色值",
        "block.aiblocks_get_color_arg": "顏色值 [NUM] 的 [COLOR] 色值"
    },
    ko: {
        "product.name": "색상 인식 모듈",
        "menu.aiblocks_colors.0": "빨강",
        "menu.aiblocks_colors.1": "초록",
        "menu.aiblocks_colors.2": "파랑",
        "menu.aiblocks_colors2.0": "빨강",
        "menu.aiblocks_colors2.1": "초록",
        "menu.aiblocks_colors2.2": "파랑",
        "block.aimech_colorsensor_init": "색상 센서 IIC 포트 [PORT] 초기화",
        "block.aiblocks_check_color": "[COLOR] 색상 감지",
        "block.aiblocks_get_color": "색상 값 읽기",
        "block.aiblocks_get_color_arg": "색상 값 [NUM] 의 [COLOR] 채널"
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

export default class ColorSensorBlocks implements NativeExtension {
    constructor (private readonly context: ExtensionContext) {}

    // 驱动由库配置选择；拒绝未知适配，避免仅更换端口却调用错误 SDK。
    private checkAdapter (): void {
        if (this.context.variant !== 'hiwonder-dev-port') {
            throw new Error('input/color-sensor: 未知适配 ' + this.context.variant);
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
                aiblocks_colors: {
                    items: [
                        {
                            text: this.context.t('menu.aiblocks_colors.0'),
                            value: "1"
                        },
                        {
                            text: this.context.t('menu.aiblocks_colors.1'),
                            value: "2"
                        },
                        {
                            text: this.context.t('menu.aiblocks_colors.2'),
                            value: "3"
                        }
                    ],
                    acceptReporters: false
                },
                aiblocks_colors2: {
                    items: [
                        {
                            text: this.context.t('menu.aiblocks_colors2.0'),
                            value: "0"
                        },
                        {
                            text: this.context.t('menu.aiblocks_colors2.1'),
                            value: "1"
                        },
                        {
                            text: this.context.t('menu.aiblocks_colors2.2'),
                            value: "2"
                        }
                    ],
                    acceptReporters: false
                },
                aimech_iicport: {
                    items: this.context.ports('sensor.aimech_iicport'),
                    acceptReporters: false
                }
            },
            blocks: [
                {
                    subCategory: this.context.t(product.name)
                },
                {
                    opcode: "aimech_colorsensor_init",
                    blockType: "command",
                    text: this.context.t('block.aimech_colorsensor_init'),
                    arguments: {
                        PORT: {
                            type: "string",
                            defaultValue: this.context.defaultPort('aimech_colorsensor_init', 'PORT'),
                            menu: "aimech_iicport",
                            literal: true
                        }
                    },
                    blockIconURI: this.context.asset('assets/color.svg')
                },
                {
                    opcode: "aiblocks_check_color",
                    blockType: "Boolean",
                    disableMonitor: true,
                    text: this.context.t('block.aiblocks_check_color'),
                    arguments: {
                        COLOR: {
                            type: "string",
                            defaultValue: "1",
                            menu: "aiblocks_colors",
                            literal: true
                        }
                    },
                    blockIconURI: this.context.asset('assets/color.svg')
                },
                {
                    opcode: "aiblocks_get_color",
                    blockType: "reporter",
                    disableMonitor: true,
                    text: this.context.t('block.aiblocks_get_color'),
                    arguments: {},
                    blockIconURI: this.context.asset('assets/color.svg')
                },
                {
                    opcode: "aiblocks_get_color_arg",
                    blockType: "reporter",
                    disableMonitor: true,
                    text: this.context.t('block.aiblocks_get_color_arg'),
                    arguments: {
                        NUM: {
                            type: "number",
                            defaultValue: 0
                        },
                        COLOR: {
                            type: "string",
                            defaultValue: "0",
                            menu: "aiblocks_colors2",
                            literal: true
                        }
                    },
                    blockIconURI: this.context.asset('assets/color.svg')
                }
            ]
        };
    }

    // 初始化只由初始化积木收集；读取和控制不隐式补默认端口。
    getPython (): Record<string, PythonTemplate> {
        this.checkAdapter();
        return {
            aimech_colorsensor_init: {
                template: "",
                imports: [
                    "import Hiwonder_DEV"
                ],
                variables: [
                    "color = Hiwonder_DEV.DEV_COLOR_RECOGNIZE(Hiwonder_DEV.Port({PORT}))"
                ]
            },
            aiblocks_check_color: {
                template: "color.get_color_name() == {COLOR}"
            },
            aiblocks_get_color: {
                template: "color.get_color_data()"
            },
            aiblocks_get_color_arg: {
                template: "{NUM}[{COLOR}]"
            }
        };
    }
}
