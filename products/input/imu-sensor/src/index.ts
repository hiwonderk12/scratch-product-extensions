import type {ExtensionContext, ExtensionInfo, NativeExtension, PythonTemplate} from '../../../../tools/sdk';

// 本模块在同一入口维护积木、菜单、集中四语和 Python 生成规则。
export const messages = {
    "zh-cn": {
        "product.name": "IMU传感器",
        "menu.euler_element.0": "Z轴转角",
        "menu.euler_element.1": "X轴转角",
        "menu.euler_element.2": "Y轴转角",
        "block.aimech_imu_init": "初始化IMU传感器IIC接口 [PORT]",
        "block.get_euler_angle_element_value": "获取欧拉角 [VALUE]",
        "block.get_euler_angle": "获取欧拉角",
        "block.get_euler_angle_element": "[VALUE]"
    },
    en: {
        "product.name": "IMU sensor",
        "menu.euler_element.0": "Z-axis rotation",
        "menu.euler_element.1": "X-axis rotation",
        "menu.euler_element.2": "Y-axis rotation",
        "block.aimech_imu_init": "Initialize IMU sensor IIC port [PORT]",
        "block.get_euler_angle_element_value": "Get Euler angle [VALUE]",
        "block.get_euler_angle": "Get Euler angles",
        "block.get_euler_angle_element": "[VALUE]"
    },
    "zh-tw": {
        "product.name": "IMU感測器",
        "menu.euler_element.0": "Z 軸轉角",
        "menu.euler_element.1": "X 軸轉角",
        "menu.euler_element.2": "Y 軸轉角",
        "block.aimech_imu_init": "初始化 IMU 感測器 IIC 介面 [PORT]",
        "block.get_euler_angle_element_value": "取得歐拉角 [VALUE]",
        "block.get_euler_angle": "取得歐拉角",
        "block.get_euler_angle_element": "[VALUE]"
    },
    ko: {
        "product.name": "IMU 센서",
        "menu.euler_element.0": "Z축 회전각",
        "menu.euler_element.1": "X축 회전각",
        "menu.euler_element.2": "Y축 회전각",
        "block.aimech_imu_init": "IMU 센서 IIC 포트 [PORT] 초기화",
        "block.get_euler_angle_element_value": "오일러 각 [VALUE] 읽기",
        "block.get_euler_angle": "오일러 각 읽기",
        "block.get_euler_angle_element": "[VALUE]"
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

export default class ImuSensorBlocks implements NativeExtension {
    constructor (private readonly context: ExtensionContext) {}

    // 驱动由库配置选择；拒绝未知适配，避免仅更换端口却调用错误 SDK。
    private checkAdapter (): void {
        if (this.context.variant !== 'hiwonder-dev-port') {
            throw new Error('input/imu-sensor: 未知适配 ' + this.context.variant);
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
                euler_element: {
                    items: [
                        {
                            text: this.context.t('menu.euler_element.0'),
                            value: "0"
                        },
                        {
                            text: this.context.t('menu.euler_element.1'),
                            value: "1"
                        },
                        {
                            text: this.context.t('menu.euler_element.2'),
                            value: "2"
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
                    opcode: "aimech_imu_init",
                    blockType: "command",
                    text: this.context.t('block.aimech_imu_init'),
                    arguments: {
                        PORT: {
                            type: "string",
                            defaultValue: this.context.defaultPort('aimech_imu_init', 'PORT'),
                            menu: "aimech_iicport",
                            literal: true
                        }
                    },
                    blockIconURI: this.context.asset('assets/acceleration.svg')
                },
                {
                    opcode: "get_euler_angle_element_value",
                    blockType: "reporter",
                    disableMonitor: true,
                    text: this.context.t('block.get_euler_angle_element_value'),
                    arguments: {
                        VALUE: {
                            type: "string",
                            defaultValue: "0",
                            menu: "euler_element",
                            literal: true
                        }
                    },
                    blockIconURI: this.context.asset('assets/acceleration.svg')
                },
                {
                    opcode: "get_euler_angle",
                    blockType: "reporter",
                    disableMonitor: true,
                    text: this.context.t('block.get_euler_angle'),
                    arguments: {},
                    blockIconURI: this.context.asset('assets/acceleration.svg')
                },
                {
                    opcode: "get_euler_angle_element",
                    blockType: "reporter",
                    disableMonitor: true,
                    text: this.context.t('block.get_euler_angle_element'),
                    arguments: {
                        VALUE: {
                            type: "string",
                            defaultValue: "0",
                            menu: "euler_element",
                            literal: true
                        }
                    },
                    blockIconURI: this.context.asset('assets/acceleration.svg')
                }
            ]
        };
    }

    // 显式初始化使用 imu_sensor，不覆盖主控 imu；轴选择 reporter 只输出索引。
    getPython (): Record<string, PythonTemplate> {
        this.checkAdapter();
        return {
            aimech_imu_init: {
                template: "",
                imports: [
                    "import Hiwonder_DEV"
                ],
                variables: [
                    "imu_sensor = Hiwonder_DEV.DEV_IMU(Hiwonder_DEV.Port({PORT}))"
                ]
            },
            get_euler_angle_element_value: {
                template: "imu_sensor.read_euler()[{VALUE}]"
            },
            get_euler_angle: {
                template: "imu_sensor.read_euler()"
            },
            get_euler_angle_element: {
                template: "{VALUE}"
            }
        };
    }
}
