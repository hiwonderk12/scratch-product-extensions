// 360°舵机：只在 AIBlocksBoard 上声明直控通道，四语和 Python 共用一个产品类。
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
