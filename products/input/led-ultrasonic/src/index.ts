import type {ExtensionBlock, ExtensionContext, ExtensionInfo, NativeExtension, PythonTemplate} from '../../../../tools/sdk';

// 本模块在同一入口维护积木、菜单、集中四语和 Python 生成规则。
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

export const product = {
    name: "product.name",
    supportedLocales: [
        "zh-cn",
        "en",
        "zh-tw",
        "ko"
    ]
} as const;

export default class LedUltrasonicBlocks implements NativeExtension {
    constructor (private readonly context: ExtensionContext) {}

    // 驱动由库配置选择；拒绝未知适配，避免仅更换端口却调用错误 SDK。
    private checkAdapter (): void {
        if (!['hiwonder-dev-port', 'hiwonder-dev-port-aidoggy', 'hiwonder-dev-onboard'].includes(this.context.variant)) {
            throw new Error('input/led-ultrasonic: 未知适配 ' + this.context.variant);
        }
    }

    getInfo (): ExtensionInfo {
        this.checkAdapter();
        const onboard = this.context.variant === 'hiwonder-dev-onboard';
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
                num: {
                    items: [
                        {
                            text: "1",
                            value: "1"
                        },
                        {
                            text: "2",
                            value: "2"
                        }
                    ],
                    acceptReporters: false
                },
                nums: {
                    items: [
                        {
                            text: this.context.t('menu.nums.0'),
                            value: "0"
                        },
                        {
                            text: "1",
                            value: "1"
                        },
                        {
                            text: "2",
                            value: "2"
                        }
                    ],
                    acceptReporters: false
                },
                rgb: {
                    items: [
                        {
                            text: this.context.t('menu.rgb.0'),
                            value: "1"
                        },
                        {
                            text: this.context.t('menu.rgb.1'),
                            value: "2"
                        },
                        {
                            text: this.context.t('menu.rgb.2'),
                            value: "3"
                        }
                    ],
                    acceptReporters: false
                }
            },
            blocks: [
                {
                    subCategory: this.context.t(product.name)
                },
                ...(onboard ? [{
                    opcode: "minihexa_led_ultrasonic_init",
                    blockType: "command",
                    text: this.context.t('block.minihexa_led_ultrasonic_init'),
                    blockIconURI: this.context.asset('assets/ultra.svg'),
                    arguments: {}
                } satisfies ExtensionBlock] : []),
                {
                    opcode: "aimech_led_ultrasonic_init",
                    ...(onboard ? {hideFromPalette: true} : {}),
                    blockType: "command",
                    text: this.context.t('block.aimech_led_ultrasonic_init'),
                    arguments: {
                        PORT: {
                            type: "string",
                            defaultValue: this.context.defaultPort('aimech_led_ultrasonic_init', 'PORT'),
                            menu: portMenu,
                            literal: true
                        }
                    },
                    blockIconURI: this.context.asset('assets/ultra.svg')
                },
                {
                    opcode: "aimech_get_led_ultrasonic_distance",
                    blockType: "reporter",
                    disableMonitor: true,
                    text: this.context.t('block.aimech_get_led_ultrasonic_distance'),
                    arguments: {},
                    blockIconURI: this.context.asset('assets/ultra.svg')
                },
                {
                    opcode: "aimech_set_led_ultrasonic_color",
                    blockType: "command",
                    text: this.context.t('block.aimech_set_led_ultrasonic_color'),
                    arguments: {
                        NUMS: {
                            type: "string",
                            defaultValue: "0",
                            menu: "nums",
                            literal: true
                        },
                        COLOR: {
                            type: "square_color",
                            defaultValue: "#ff0000"
                        }
                    },
                    blockIconURI: this.context.asset('assets/ultra.svg')
                },
                {
                    opcode: "aimech_set_led_ultrasonic_color_arg",
                    blockType: "command",
                    text: this.context.t('block.aimech_set_led_ultrasonic_color_arg'),
                    arguments: {
                        NUMS: {
                            type: "string",
                            defaultValue: "0",
                            menu: "nums",
                            literal: true
                        },
                        RED: {
                            type: "slider255",
                            defaultValue: 255
                        },
                        GREEN: {
                            type: "slider255",
                            defaultValue: 0
                        },
                        BLUE: {
                            type: "slider255",
                            defaultValue: 0
                        }
                    },
                    blockIconURI: this.context.asset('assets/ultra.svg')
                },
                {
                    opcode: "aimech_close_led_ultrasonic",
                    blockType: "command",
                    text: this.context.t('block.aimech_close_led_ultrasonic'),
                    arguments: {
                        NUMS: {
                            type: "string",
                            defaultValue: "0",
                            menu: "nums",
                            literal: true
                        }
                    },
                    blockIconURI: this.context.asset('assets/ultra.svg')
                },
                {
                    opcode: "aimech_set_led_ultrasonic_breath",
                    blockType: "command",
                    text: this.context.t('block.aimech_set_led_ultrasonic_breath'),
                    arguments: {
                        NUM: {
                            type: "string",
                            defaultValue: "1",
                            menu: "num",
                            literal: true
                        },
                        RGB: {
                            type: "string",
                            defaultValue: "1",
                            menu: "rgb",
                            literal: true
                        },
                        TIME: {
                            type: "number",
                            defaultValue: 1
                        }
                    },
                    blockIconURI: this.context.asset('assets/ultra.svg')
                },
                {
                    opcode: "aimech_set_led_ultrasonic_random",
                    blockType: "command",
                    text: this.context.t('block.aimech_set_led_ultrasonic_random'),
                    arguments: {},
                    blockIconURI: this.context.asset('assets/ultra.svg')
                }
            ]
        };
    }

    // 初始化只由初始化积木收集；读取和控制不隐式补默认端口。
    getPython (): Record<string, PythonTemplate> {
        this.checkAdapter();
        const templates: Record<string, PythonTemplate> = {
            aimech_led_ultrasonic_init: {
                template: "",
                imports: [
                    "import Hiwonder_DEV"
                ],
                variables: [
                    "sonar = Hiwonder_DEV.DEV_SONAR(Hiwonder_DEV.Port({PORT}))"
                ]
            },
            aimech_get_led_ultrasonic_distance: {
                template: "sonar.getDistance()"
            },
            aimech_set_led_ultrasonic_color: {
                template: "sonar.setRGB({NUMS},{COLOR.rgb})"
            },
            aimech_set_led_ultrasonic_color_arg: {
                template: "sonar.setRGB({NUMS},{RED},{GREEN},{BLUE})"
            },
            aimech_close_led_ultrasonic: {
                template: "sonar.setRGB({NUMS},0x00,0x00,0x00)"
            },
            aimech_set_led_ultrasonic_breath: {
                template: "sonar.setBreathingCycle({NUM},{RGB},{TIME} * 1000)"
            },
            aimech_set_led_ultrasonic_random: {
                template: "sonar.startSymphony()"
            }
        };
        if (this.context.variant === 'hiwonder-dev-onboard') {
            templates.aimech_led_ultrasonic_init.variables = ["sonar = Hiwonder_DEV.DEV_SONAR()"];
            templates.minihexa_led_ultrasonic_init = templates.aimech_led_ultrasonic_init;
        }
        return templates;
    }
}
