// 总线舵机作者入口：积木、集中四语与 Python 在同一文件维护。
import type {ExtensionContext, ExtensionInfo, NativeExtension, PythonTemplate} from '../../../../tools/sdk';

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
