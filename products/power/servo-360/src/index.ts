// 360°舵机：只在 AIBlocksBoard 上声明直控通道，四语和 Python 共用一个产品类。
import type {ExtensionContext, ExtensionInfo, NativeExtension, PythonTemplate} from '../../../../tools/sdk';

export const messages = {
    "zh-cn": {
        "product.name": "360°舵机",
        "block.set_servo360_angle_time": "设置舵机 [SERVO] 以 [SPEED] %速度转至 [ANGLE] 度 [DELAY]",
        "block.set_servo360_run": "设置舵机 [SERVO] 以 [SPEED] %速度 [ORIENTION] 转动 [ANGLE] 度 [DELAY]",
        "block.set_servo360_stop": "停止舵机 [SERVO]",
        "menu.oriention.0": "顺时针",
        "menu.oriention.1": "逆时针",
        "menu.delay.0": "自动等待",
        "menu.delay.1": "不等待"
    },
    en: {
        "product.name": "360° servo",
        "block.set_servo360_angle_time": "Set servo [SERVO] to [ANGLE] degrees at [SPEED] % speed [DELAY]",
        "block.set_servo360_run": "Rotate servo [SERVO] [ORIENTION] by [ANGLE] degrees at [SPEED] % speed [DELAY]",
        "block.set_servo360_stop": "Stop servo [SERVO]",
        "menu.oriention.0": "clockwise",
        "menu.oriention.1": "Counterclockwise",
        "menu.delay.0": "automatic delay",
        "menu.delay.1": "no delay"
    },
    "zh-tw": {
        "product.name": "360°舵機",
        "block.set_servo360_angle_time": "設定舵機 [SERVO] 以 [SPEED] %速度轉至 [ANGLE] 度 [DELAY]",
        "block.set_servo360_run": "設定舵機 [SERVO] 以 [SPEED] %速度 [ORIENTION] 轉動 [ANGLE] 度 [DELAY]",
        "block.set_servo360_stop": "停止舵機 [SERVO]",
        "menu.oriention.0": "順時針",
        "menu.oriention.1": "逆時針",
        "menu.delay.0": "自動等待",
        "menu.delay.1": "不等待"
    },
    ko: {
        "product.name": "360° 서보",
        "block.set_servo360_angle_time": "서보 [SERVO] 를 [SPEED] % 속도로 [ANGLE] 도로 이동 [DELAY]",
        "block.set_servo360_run": "서보 [SERVO] 를 [SPEED] % 속도로 [ORIENTION] 으로 [ANGLE] 도 회전 [DELAY]",
        "block.set_servo360_stop": "서보 [SERVO] 정지",
        "menu.oriention.0": "시계 방향",
        "menu.oriention.1": "반시계 방향",
        "menu.delay.0": "완료까지 대기",
        "menu.delay.1": "대기 안 함"
    }
} as const;

export const product = {name: 'product.name', supportedLocales: ['zh-cn', 'en', 'zh-tw', 'ko']} as const;

export default class Servo360Blocks implements NativeExtension {
    constructor (private readonly context: ExtensionContext) {}

    private checkVariant (): void {
        if (this.context.variant !== 'hiwonder-direct') throw new Error('power/servo-360: 未支持的主控适配 ' + this.context.variant);
    }

    // 菜单值保留旧工程协议；M/S 通道不是 IIC 端口，不读取机器人端口表。
    getInfo (): ExtensionInfo {
        this.checkVariant();
        return {
            id: "actuator",
            name: this.context.t(product.name),
            color1: "#2D87C9",
            color2: "#2D87C9",
            color3: "#2D87C9",
            blocks: [
                {
                    subCategory: this.context.t(product.name)
                },
                {
                    opcode: "set_servo360_angle_time",
                    text: this.context.t('block.set_servo360_angle_time'),
                    blockType: "command",
                    arguments: {
                        SERVO: {
                            type: "string",
                            menu: "servos",
                            defaultValue: "1",
                            literal: true
                        },
                        SPEED: {
                            type: "slider",
                            defaultValue: 80
                        },
                        ANGLE: {
                            type: "slider360",
                            defaultValue: 10
                        },
                        DELAY: {
                            type: "string",
                            menu: "delay",
                            defaultValue: "False",
                            literal: true
                        }
                    },
                    blockIconURI: this.context.asset('assets/servo.svg')
                },
                {
                    opcode: "set_servo360_run",
                    text: this.context.t('block.set_servo360_run'),
                    blockType: "command",
                    arguments: {
                        SERVO: {
                            type: "string",
                            menu: "servos",
                            defaultValue: "1",
                            literal: true
                        },
                        SPEED: {
                            type: "slider",
                            defaultValue: 80
                        },
                        ORIENTION: {
                            type: "string",
                            menu: "oriention",
                            defaultValue: "1",
                            literal: true
                        },
                        ANGLE: {
                            type: "slider360",
                            defaultValue: 10
                        },
                        DELAY: {
                            type: "string",
                            menu: "delay",
                            defaultValue: "False",
                            literal: true
                        }
                    },
                    blockIconURI: this.context.asset('assets/servo.svg')
                },
                {
                    opcode: "set_servo360_stop",
                    text: this.context.t('block.set_servo360_stop'),
                    blockType: "command",
                    arguments: {
                        SERVO: {
                            type: "string",
                            menu: "servos",
                            defaultValue: "1",
                            literal: true
                        }
                    },
                    blockIconURI: this.context.asset('assets/servo.svg')
                }
            ],
            menus: {
                servos: {
                    acceptReporters: false,
                    items: [
                        {
                            text: "S1",
                            value: "1"
                        },
                        {
                            text: "S2",
                            value: "2"
                        },
                        {
                            text: "S3",
                            value: "3"
                        },
                        {
                            text: "S4",
                            value: "4"
                        }
                    ]
                },
                oriention: {
                    acceptReporters: false,
                    items: [
                        {
                            text: this.context.t('menu.oriention.0'),
                            value: "1"
                        },
                        {
                            text: this.context.t('menu.oriention.1'),
                            value: "-1"
                        }
                    ]
                },
                delay: {
                    acceptReporters: false,
                    items: [
                        {
                            text: this.context.t('menu.delay.0'),
                            value: "True"
                        },
                        {
                            text: this.context.t('menu.delay.1'),
                            value: "False"
                        }
                    ]
                }
            }
        };
    }

    // 入口由主板提供 import；按所用通道收集对象，生成器负责初始化去重。
    getPython (): Record<string, PythonTemplate> {
        this.checkVariant();
        return {
            set_servo360_angle_time: {
                template: "servos.set_angle_speed({SERVO},{ANGLE},{SPEED},{DELAY},360)",
                variables: [
                    "servos = Hiwonder.Servos_Controller()"
                ]
            },
            set_servo360_run: {
                template: "servos.set_angle_increment({SERVO},{ANGLE}*{ORIENTION},{SPEED},{DELAY},360)",
                variables: [
                    "servos = Hiwonder.Servos_Controller()"
                ]
            },
            set_servo360_stop: {
                template: "servos.stop({SERVO})",
                variables: [
                    "servos = Hiwonder.Servos_Controller()"
                ]
            }
        };
    }
}
