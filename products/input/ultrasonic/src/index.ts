import type {ExtensionContext, ExtensionInfo, NativeExtension, PythonTemplate} from '../../../../tools/sdk';

// 本模块在同一入口维护积木、菜单、集中四语和 Python 生成规则。
export const messages = {
    "zh-cn": {
        "product.name": "超声波传感器",
        "block.get_ultrasonic_distance": "端口 [ULTRA_PORT] 超声波传感器检测到障碍物的距离(cm)"
    },
    en: {
        "product.name": "Ultrasonic sensor",
        "block.get_ultrasonic_distance": "Port [ULTRA_PORT] ultrasonic obstacle distance (cm)"
    },
    "zh-tw": {
        "product.name": "超音波感測器",
        "block.get_ultrasonic_distance": "介面 [ULTRA_PORT] 超音波感測器偵測到障礙物的距離 (cm)"
    },
    ko: {
        "product.name": "초음파 센서",
        "block.get_ultrasonic_distance": "포트 [ULTRA_PORT] 초음파 센서 장애물 거리(cm)"
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

export default class UltrasonicBlocks implements NativeExtension {
    constructor (private readonly context: ExtensionContext) {}

    // 驱动由库配置选择；拒绝未知适配，避免仅更换端口却调用错误 SDK。
    private checkAdapter (): void {
        if (this.context.variant !== 'hiwonder-port') {
            throw new Error('input/ultrasonic: 未知适配 ' + this.context.variant);
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
                ultra_port: {
                    items: this.context.ports('sensor.ultra_port'),
                    acceptReporters: false
                }
            },
            blocks: [
                {
                    subCategory: this.context.t(product.name)
                },
                {
                    opcode: "get_ultrasonic_distance",
                    blockType: "reporter",
                    disableMonitor: true,
                    text: this.context.t('block.get_ultrasonic_distance'),
                    arguments: {
                        ULTRA_PORT: {
                            type: "string",
                            defaultValue: this.context.defaultPort('get_ultrasonic_distance', 'ULTRA_PORT'),
                            menu: "ultra_port",
                            literal: true
                        }
                    },
                    blockIconURI: this.context.asset('assets/ultra.svg')
                }
            ]
        };
    }

    // 按使用端口生成独立 sonar_PORT 对象，不覆盖显式初始化的 LED sonar。
    getPython (): Record<string, PythonTemplate> {
        this.checkAdapter();
        return {
            get_ultrasonic_distance: {
                template: "sonar_{ULTRA_PORT}.read()",
                imports: [
                    "import Hiwonder"
                ],
                variables: [
                    "sonar_{ULTRA_PORT} = Hiwonder.Sonar(Hiwonder.Port({ULTRA_PORT}))"
                ]
            }
        };
    }
}
