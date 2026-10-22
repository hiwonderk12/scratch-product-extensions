import type {ExtensionBlock, ExtensionContext, ExtensionInfo, NativeExtension, PythonTemplate} from '../../../../tools/sdk';

// 本模块在同一入口维护积木、菜单、集中四语和 Python 生成规则。
export const messages = {
    "zh-cn": {
        "product.name": "LED超声波传感器",
        "block.minihexa_led_ultrasonic_init": "初始化发光超声波传感器板载IIC接口",
        "menu.nums.0": "全部",
        "menu.rgb.0": "红",
        "menu.rgb.1": "绿",
        "menu.rgb.2": "蓝",
        "block.aimech_led_ultrasonic_init": "初始化LED超声波传感器接口 [PORT]",
        "block.aimech_get_led_ultrasonic_distance": "LED超声波传感器检测到障碍物距离(cm)",
        "block.aimech_set_led_ultrasonic_color": "LED超声波传感器灯 [NUMS] 颜色 [COLOR]",
        "block.aimech_set_led_ultrasonic_color_arg": "LED超声波传感器灯 [NUMS] 红 [RED] 绿 [GREEN] 蓝 [BLUE]",
        "block.aimech_close_led_ultrasonic": "关闭LED超声波传感器灯 [NUMS]",
        "block.aimech_set_led_ultrasonic_breath": "LED超声波传感器灯 [NUM] [RGB] 呼吸周期 [TIME] 秒",
        "block.aimech_set_led_ultrasonic_random": "LED超声波传感器进入随机变色模式"
    },
    en: {
        "product.name": "LED ultrasonic sensor",
        "block.minihexa_led_ultrasonic_init": "Initialize LED ultrasonic sensor onboard IIC interface",
        "menu.nums.0": "All",
        "menu.rgb.0": "Red",
        "menu.rgb.1": "Green",
        "menu.rgb.2": "Blue",
        "block.aimech_led_ultrasonic_init": "Initialize LED ultrasonic sensor port [PORT]",
        "block.aimech_get_led_ultrasonic_distance": "LED ultrasonic obstacle distance (cm)",
        "block.aimech_set_led_ultrasonic_color": "LED ultrasonic light [NUMS] color [COLOR]",
        "block.aimech_set_led_ultrasonic_color_arg": "LED ultrasonic light [NUMS] red [RED] green [GREEN] blue [BLUE]",
        "block.aimech_close_led_ultrasonic": "Turn off LED ultrasonic light [NUMS]",
        "block.aimech_set_led_ultrasonic_breath": "LED ultrasonic light [NUM] [RGB] breathing period [TIME] seconds",
        "block.aimech_set_led_ultrasonic_random": "Start LED ultrasonic random color mode"
    },
    "zh-tw": {
        "product.name": "LED超音波感測器",
        "block.minihexa_led_ultrasonic_init": "初始化發光超音波感測器板載IIC介面",
        "menu.nums.0": "全部",
        "menu.rgb.0": "紅",
        "menu.rgb.1": "綠",
        "menu.rgb.2": "藍",
        "block.aimech_led_ultrasonic_init": "初始化 LED 超音波感測器介面 [PORT]",
        "block.aimech_get_led_ultrasonic_distance": "LED 超音波感測器偵測到障礙物的距離 (cm)",
        "block.aimech_set_led_ultrasonic_color": "LED 超音波感測器燈 [NUMS] 顏色 [COLOR]",
        "block.aimech_set_led_ultrasonic_color_arg": "LED 超音波感測器燈 [NUMS] 紅 [RED] 綠 [GREEN] 藍 [BLUE]",
        "block.aimech_close_led_ultrasonic": "關閉 LED 超音波感測器燈 [NUMS]",
        "block.aimech_set_led_ultrasonic_breath": "LED 超音波感測器燈 [NUM] [RGB] 呼吸週期 [TIME] 秒",
        "block.aimech_set_led_ultrasonic_random": "LED 超音波感測器進入隨機變色模式"
    },
    ko: {
        "product.name": "LED 초음파 센서",
        "block.minihexa_led_ultrasonic_init": "LED 초음파 센서 내장 IIC 인터페이스 초기화",
        "menu.nums.0": "전체",
        "menu.rgb.0": "빨강",
        "menu.rgb.1": "초록",
        "menu.rgb.2": "파랑",
        "block.aimech_led_ultrasonic_init": "LED 초음파 센서 포트 [PORT] 초기화",
        "block.aimech_get_led_ultrasonic_distance": "LED 초음파 센서 장애물 거리(cm)",
        "block.aimech_set_led_ultrasonic_color": "LED 초음파 센서 조명 [NUMS] 색상 [COLOR]",
        "block.aimech_set_led_ultrasonic_color_arg": "LED 초음파 센서 조명 [NUMS] 빨강 [RED] 초록 [GREEN] 파랑 [BLUE]",
        "block.aimech_close_led_ultrasonic": "LED 초음파 센서 조명 [NUMS] 끄기",
        "block.aimech_set_led_ultrasonic_breath": "LED 초음파 센서 조명 [NUM] [RGB] 숨쉬기 주기 [TIME] 초",
        "block.aimech_set_led_ultrasonic_random": "LED 초음파 센서 무작위 색상 모드 시작"
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
