// 总线舵机作者入口：积木、集中四语与 Python 在同一文件维护。
import type {ExtensionContext, ExtensionInfo, NativeExtension, PythonTemplate} from '../../../../tools/sdk';

export const messages = {
    "zh-cn": {
        "product.name": "总线舵机",
        "block.set_bus_servo": "设置总线舵机编号 [SERVO] 位置 (0~1000) [POS] 运行时间 (ms) [TIME]",
        "block.set_bus_servo_motor_speed": "设置总线舵机编号 [SERVO] 电机模式, 转速 [SPEED]",
        "block.load_bus_servo": "设置总线舵机编号 [SERVO] 上电",
        "block.unload_bus_servo": "设置总线舵机编号 [SERVO] 掉电",
        "block.get_bus_servo_pos": "获取总线舵机编号 [SERVO] 位置"
    },
    en: {
        "product.name": "Bus servo",
        "block.set_bus_servo": "Set bus servo [SERVO] position (0~1000) [POS] duration (ms) [TIME]",
        "block.set_bus_servo_motor_speed": "Set bus servo [SERVO] motor mode speed [SPEED]",
        "block.load_bus_servo": "Power on bus servo [SERVO]",
        "block.unload_bus_servo": "Power off bus servo [SERVO]",
        "block.get_bus_servo_pos": "Bus servo [SERVO] position"
    },
    "zh-tw": {
        "product.name": "匯流排舵機",
        "block.set_bus_servo": "設定匯流排舵機編號 [SERVO] 位置 (0~1000) [POS] 運行時間 (ms) [TIME]",
        "block.set_bus_servo_motor_speed": "設定匯流排舵機編號 [SERVO] 馬達模式，轉速 [SPEED]",
        "block.load_bus_servo": "設定匯流排舵機編號 [SERVO] 上電",
        "block.unload_bus_servo": "設定匯流排舵機編號 [SERVO] 斷電",
        "block.get_bus_servo_pos": "取得匯流排舵機編號 [SERVO] 位置"
    },
    ko: {
        "product.name": "버스 서보",
        "block.set_bus_servo": "버스 서보 [SERVO] 위치 (0~1000) [POS] 동작 시간 (ms) [TIME] 설정하기",
        "block.set_bus_servo_motor_speed": "버스 서보 [SERVO] 모터 모드 속도 [SPEED] 설정하기",
        "block.load_bus_servo": "버스 서보 [SERVO] 전원 켜기",
        "block.unload_bus_servo": "버스 서보 [SERVO] 전원 끄기",
        "block.get_bus_servo_pos": "버스 서보 [SERVO] 위치"
    }
} as const;

export const product = {name: 'product.name', supportedLocales: ['zh-cn', 'en', 'zh-tw', 'ko']} as const;

export default class BusServoBlocks implements NativeExtension {
    constructor (private readonly context: ExtensionContext) {}

    private checkVariant (): void {
        if (this.context.variant !== 'hiwonder') throw new Error('power/bus-servo: 未支持的主控适配 ' + this.context.variant);
    }

    getInfo (): ExtensionInfo {
        this.checkVariant();
        return {
            id: "actuator",
            name: this.context.t(product.name),
            color1: "#2D87C9",
            color2: "#2D87C9",
            color3: "#2D87C9",
            menus: {

            },
            blocks: [
                {
                    subCategory: this.context.t(product.name)
                },
                {
                    opcode: "set_bus_servo",
                    blockType: "command",
                    text: this.context.t('block.set_bus_servo'),
                    blockIconURI: this.context.asset('assets/servo.svg'),
                    arguments: {
                        SERVO: {
                            type: "number",
                            defaultValue: 1
                        },
                        POS: {
                            type: "slider1000",
                            defaultValue: 0
                        },
                        TIME: {
                            type: "number",
                            defaultValue: 100
                        }
                    }
                },
                {
                    opcode: "set_bus_servo_motor_speed",
                    blockType: "command",
                    text: this.context.t('block.set_bus_servo_motor_speed'),
                    blockIconURI: this.context.asset('assets/servo.svg'),
                    arguments: {
                        SERVO: {
                            type: "number",
                            defaultValue: 1
                        },
                        SPEED: {
                            type: "slider1000p",
                            defaultValue: 200
                        }
                    }
                },
                {
                    opcode: "load_bus_servo",
                    blockType: "command",
                    text: this.context.t('block.load_bus_servo'),
                    blockIconURI: this.context.asset('assets/servo.svg'),
                    arguments: {
                        SERVO: {
                            type: "number",
                            defaultValue: 1
                        }
                    }
                },
                {
                    opcode: "unload_bus_servo",
                    blockType: "command",
                    text: this.context.t('block.unload_bus_servo'),
                    blockIconURI: this.context.asset('assets/servo.svg'),
                    arguments: {
                        SERVO: {
                            type: "number",
                            defaultValue: 1
                        }
                    }
                },
                {
                    opcode: "get_bus_servo_pos",
                    blockType: "reporter",
                    disableMonitor: true,
                    text: this.context.t('block.get_bus_servo_pos'),
                    blockIconURI: this.context.asset('assets/servo.svg'),
                    arguments: {
                        SERVO: {
                            type: "number",
                            defaultValue: 1
                        }
                    }
                }
            ]
        };
    }

    // 按使用积木收集共享总线设备，生成器负责去重。
    getPython (): Record<string, PythonTemplate> {
        this.checkVariant();
        return {
            set_bus_servo: {
                template: "busservos.run({SERVO},{POS},{TIME})",
                imports: [
                    "import Hiwonder"
                ],
                variables: [
                    "busservos = Hiwonder.BusServo()"
                ]
            },
            set_bus_servo_motor_speed: {
                template: "busservos.set_mode({SERVO},1,{SPEED})",
                imports: [
                    "import Hiwonder"
                ],
                variables: [
                    "busservos = Hiwonder.BusServo()"
                ]
            },
            load_bus_servo: {
                template: "busservos.load({SERVO})",
                imports: [
                    "import Hiwonder"
                ],
                variables: [
                    "busservos = Hiwonder.BusServo()"
                ]
            },
            unload_bus_servo: {
                template: "busservos.unload({SERVO})",
                imports: [
                    "import Hiwonder"
                ],
                variables: [
                    "busservos = Hiwonder.BusServo()"
                ]
            },
            get_bus_servo_pos: {
                template: "busservos.get_position({SERVO})",
                imports: [
                    "import Hiwonder"
                ],
                variables: [
                    "busservos = Hiwonder.BusServo()"
                ]
            }
        };
    }
}
