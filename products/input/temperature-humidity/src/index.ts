import type {ExtensionContext, ExtensionInfo, NativeExtension, PythonTemplate} from '../../../../tools/sdk';

// 本模块在同一入口维护积木、菜单、集中四语和 Python 生成规则。
export const messages = {
    "zh-cn": {
        "product.name": "温湿度传感器",
        "menu.temphumi.0": "温度",
        "menu.temphumi.1": "湿度",
        "block.aimech_temphumi_init": "初始化温湿度传感器接口 [PORT]",
        "block.aimech_get_temp_and_humi": "温湿度值",
        "block.aimech_get_temp_or_humi": "[TEMPHUMI] 值"
    },
    en: {
        "product.name": "Temperature and humidity sensor",
        "menu.temphumi.0": "Temperature",
        "menu.temphumi.1": "Humidity",
        "block.aimech_temphumi_init": "Initialize temperature and humidity sensor port [PORT]",
        "block.aimech_get_temp_and_humi": "Temperature and humidity values",
        "block.aimech_get_temp_or_humi": "[TEMPHUMI] value"
    },
    "zh-tw": {
        "product.name": "溫濕度感測器",
        "menu.temphumi.0": "溫度",
        "menu.temphumi.1": "濕度",
        "block.aimech_temphumi_init": "初始化溫濕度感測器介面 [PORT]",
        "block.aimech_get_temp_and_humi": "溫濕度值",
        "block.aimech_get_temp_or_humi": "[TEMPHUMI] 值"
    },
    ko: {
        "product.name": "온습도 센서",
        "menu.temphumi.0": "온도",
        "menu.temphumi.1": "습도",
        "block.aimech_temphumi_init": "온습도 센서 포트 [PORT] 초기화",
        "block.aimech_get_temp_and_humi": "온습도 값",
        "block.aimech_get_temp_or_humi": "[TEMPHUMI] 값"
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

export default class TemperatureHumidityBlocks implements NativeExtension {
    constructor (private readonly context: ExtensionContext) {}

    // 驱动由库配置选择；拒绝未知适配，避免仅更换端口却调用错误 SDK。
    private checkAdapter (): void {
        if (!['hiwonder-dev-port', 'hiwonder-dev-port-aidoggy'].includes(this.context.variant)) {
            throw new Error('input/temperature-humidity: 未知适配 ' + this.context.variant);
        }
    }

    getInfo (): ExtensionInfo {
        this.checkAdapter();
        const portMenu = this.context.variant === 'hiwonder-dev-port-aidoggy' ? 'aidoggy_iicport' : 'aimech_iicport';
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
                ...(portMenu === 'aidoggy_iicport' ? {aimech_iicport: {
                    items: this.context.ports('sensor.aimech_iicport'), acceptReporters: false
                }} : {}),
                temphumi: {
                    items: [
                        {
                            text: this.context.t('menu.temphumi.0'),
                            value: "0"
                        },
                        {
                            text: this.context.t('menu.temphumi.1'),
                            value: "1"
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
                    opcode: "aimech_temphumi_init",
                    blockType: "command",
                    text: this.context.t('block.aimech_temphumi_init'),
                    arguments: {
                        PORT: {
                            type: "string",
                            defaultValue: this.context.defaultPort('aimech_temphumi_init', 'PORT'),
                            menu: portMenu,
                            literal: true
                        }
                    },
                    blockIconURI: this.context.asset('assets/temphumi.svg')
                },
                {
                    opcode: "aimech_get_temp_and_humi",
                    blockType: "reporter",
                    disableMonitor: true,
                    text: this.context.t('block.aimech_get_temp_and_humi'),
                    arguments: {},
                    blockIconURI: this.context.asset('assets/temphumi.svg')
                },
                {
                    opcode: "aimech_get_temp_or_humi",
                    blockType: "reporter",
                    disableMonitor: true,
                    text: this.context.t('block.aimech_get_temp_or_humi'),
                    arguments: {
                        TEMPHUMI: {
                            type: "string",
                            defaultValue: "0",
                            menu: "temphumi",
                            literal: true
                        }
                    },
                    blockIconURI: this.context.asset('assets/temphumi.svg')
                }
            ]
        };
    }

    // 初始化只由初始化积木收集；读取和控制不隐式补默认端口。
    getPython (): Record<string, PythonTemplate> {
        this.checkAdapter();
        return {
            aimech_temphumi_init: {
                template: "",
                imports: [
                    "import Hiwonder_DEV"
                ],
                variables: [
                    "temphumi = Hiwonder_DEV.DEV_TH(Hiwonder_DEV.Port({PORT}))"
                ]
            },
            aimech_get_temp_and_humi: {
                template: "temphumi.read_Temp_Humi()"
            },
            aimech_get_temp_or_humi: {
                template: "temphumi.read_Temp_Humi()[{TEMPHUMI}]"
            }
        };
    }
}
