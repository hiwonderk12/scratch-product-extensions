// 长电机：只在 AIBlocksBoard 上声明直控通道，四语和 Python 共用一个产品类。
import type {ExtensionContext, ExtensionInfo, NativeExtension, PythonTemplate} from '../../../../tools/sdk';

export const messages = {
    "zh-cn": {
        "product.name": "长电机",
        "group.1": "电机模式",
        "block.long_motor_set_speed": "设置电机 [MOTOR] 以 [SPEED] % 的速度 [ORIENTION] 启动",
        "block.long_motor_set_control": "设置电机 [MOTOR] 以 [SPEED] % 的速度 [ORIENTION] 运行 [VALUE] [RUNMODE] [DELAY]",
        "block.long_motor_set_speed_zero": "停止电机 [MOTOR]",
        "block.long_motor_read_speed": "获取电机 [MOTOR] 转动速度（度/秒）",
        "block.long_motor_read_pose_relative": "获取电机 [MOTOR] 相对角度",
        "block.long_motor_set_0_degrees_relative": "设置电机 [MOTOR] 相对角度归零",
        "group.2": "舵机模式",
        "block.long_motor_set_run": "设置舵机 [MOTOR] 开机状态为0度, 以 [SPEED] %速度 转动到 [NUM] 度(-1800度~1800度) [DELAY]",
        "block.long_motor_read_pose_absolute": "获取舵机 [MOTOR] 绝对角度",
        "group.3": "组合控制",
        "block.long_motor_init_car": "初始化底盘左轮电机为 [MOTOR1] 右轮电机为 [MOTOR2] 轮子直径为 [VALUE1] 厘米 轮距为 [VALUE2] 厘米",
        "block.long_motor_set_car_run": "设置小车以 [SPEED] % 的速度 [ORIENTION] [VALUE] [RUNMODE]",
        "block.long_motorset_car_rotate": "设置小车以 [SPEED] % 的速度 [ORIENTION] [VALUE] 度",
        "block.long_motor_set_car_move": "设置小车左轮速度 [VALUE1] %, 右轮速度 [VALUE2] %",
        "block.long_motor_set_car_stop": "停止小车运行",
        "block.long_motor_set_car_rotate_bias": "设置转弯偏差系数 [VALUE] 范围0.5~1.5",
        "menu.oriention.0": "顺时针",
        "menu.oriention.1": "逆时针",
        "menu.delay.0": "自动等待",
        "menu.delay.1": "不等待",
        "menu.oriention_all2.0": "前进",
        "menu.oriention_all2.1": "后退",
        "menu.oriention5.0": "顺时针",
        "menu.oriention5.1": "逆时针",
        "menu.runmode.0": "度",
        "menu.runmode.1": "圈",
        "menu.runmode.2": "秒",
        "menu.runmode2.0": "厘米",
        "menu.runmode2.1": "圈",
        "menu.runmode2.2": "秒",
        "menu.turn.0": "左转",
        "menu.turn.1": "右转",
        "menu.movemode.0": "模式一",
        "menu.movemode.1": "模式二"
    },
    en: {
        "product.name": "Long motor",
        "group.1": "Motor Mode",
        "block.long_motor_set_speed": "Set motor [MOTOR] rotation direction [ORIENTION] speed [SPEED]% and start",
        "block.long_motor_set_control": "Set motor [MOTOR] to run [ORIENTION] at [SPEED]% speed for [VALUE] [RUNMODE] [DELAY]",
        "block.long_motor_set_speed_zero": "Stop motor [MOTOR]",
        "block.long_motor_read_speed": "Get motor [MOTOR] rotation speed (degrees/second)",
        "block.long_motor_read_pose_relative": "Get motor [MOTOR] relative angle",
        "block.long_motor_set_0_degrees_relative": "Set motor [MOTOR] relative angle to zero",
        "group.2": "Servo Mode",
        "block.long_motor_set_run": "Set servo [MOTOR] to 0 degrees on startup, rotate to [NUM] degrees (-1800~1800) at [SPEED]% speed [DELAY]",
        "block.long_motor_read_pose_absolute": "Get servo [MOTOR] absolute angle",
        "group.3": "Combined Control",
        "block.long_motor_init_car": "Initialize chassis left motor as [MOTOR1] right motor as [MOTOR2] wheel diameter [VALUE1] cm wheelbase [VALUE2] cm",
        "block.long_motor_set_car_run": "Set car to run [ORIENTION] at [SPEED]% speed for [VALUE] [RUNMODE]",
        "block.long_motorset_car_rotate": "Set car to rotate [ORIENTION] [VALUE] degrees at [SPEED]% speed",
        "block.long_motor_set_car_move": "Set car left wheel speed [VALUE1]%, right wheel speed [VALUE2]%",
        "block.long_motor_set_car_stop": "Stop car",
        "block.long_motor_set_car_rotate_bias": "Set turning offset coefficient [VALUE] range 0.5~1.5",
        "menu.oriention.0": "clockwise",
        "menu.oriention.1": "Counterclockwise",
        "menu.delay.0": "automatic delay",
        "menu.delay.1": "no delay",
        "menu.oriention_all2.0": "forward",
        "menu.oriention_all2.1": "reverse",
        "menu.oriention5.0": "clockwise",
        "menu.oriention5.1": "Counterclockwise",
        "menu.runmode.0": "degree",
        "menu.runmode.1": "circle",
        "menu.runmode.2": "seconds",
        "menu.runmode2.0": "cm",
        "menu.runmode2.1": "circle",
        "menu.runmode2.2": "seconds",
        "menu.turn.0": "Turn left",
        "menu.turn.1": "Turn right",
        "menu.movemode.0": "Mode 1",
        "menu.movemode.1": "Mode 2"
    },
    "zh-tw": {
        "product.name": "長電機",
        "group.1": "電機模式",
        "block.long_motor_set_speed": "設置電機 [MOTOR] 以 [SPEED]% 的速度 [ORIENTION] 啟動",
        "block.long_motor_set_control": "設置電機 [MOTOR] 以 [SPEED] % 的速度 [ORIENTION] 運行 [VALUE] [RUNMODE] [DELAY]",
        "block.long_motor_set_speed_zero": "停止電機 [MOTOR]",
        "block.long_motor_read_speed": "獲取電機 [MOTOR] 轉動速度（度/秒）",
        "block.long_motor_read_pose_relative": "獲取電機 [MOTOR] 相對角度",
        "block.long_motor_set_0_degrees_relative": "設置電機 [MOTOR] 相對角度歸零",
        "group.2": "舵機模式",
        "block.long_motor_set_run": "設置舵機 [MOTOR] 開機狀態為0度, 以 [SPEED] %速度 轉動到 [NUM] 度(-1800度~1800度) [DELAY]",
        "block.long_motor_read_pose_absolute": "獲取舵機 [MOTOR] 絕對角度",
        "group.3": "組合控制",
        "block.long_motor_init_car": "初始化底盤左輪電機為 [MOTOR1] 右輪電機為 [MOTOR2] 輪子直徑為 [VALUE1] 厘米 輪距為 [VALUE2] 厘米",
        "block.long_motor_set_car_run": "設置小車以 [SPEED] % 的速度 [ORIENTION] [VALUE] [RUNMODE]",
        "block.long_motorset_car_rotate": "設置小車以 [SPEED] % 的速度 [ORIENTION] [VALUE] 度",
        "block.long_motor_set_car_move": "設置小車左輪速度 [VALUE1] %, 右輪速度 [VALUE2] %",
        "block.long_motor_set_car_stop": "停止小車運行",
        "block.long_motor_set_car_rotate_bias": "設置轉彎偏差係數 [VALUE] 範圍0.5~1.5",
        "menu.oriention.0": "順時針",
        "menu.oriention.1": "逆時針",
        "menu.delay.0": "自動等待",
        "menu.delay.1": "不等待",
        "menu.oriention_all2.0": "前進",
        "menu.oriention_all2.1": "後退",
        "menu.oriention5.0": "順時針",
        "menu.oriention5.1": "逆時針",
        "menu.runmode.0": "度",
        "menu.runmode.1": "圈",
        "menu.runmode.2": "秒",
        "menu.runmode2.0": "公分",
        "menu.runmode2.1": "圈",
        "menu.runmode2.2": "秒",
        "menu.turn.0": "左轉",
        "menu.turn.1": "右轉",
        "menu.movemode.0": "模式一",
        "menu.movemode.1": "模式二"
    },
    ko: {
        "product.name": "롱 모터",
        "group.1": "모터 모드",
        "block.long_motor_set_speed": "모터 [MOTOR] 로 [ORIENTION] 속도 [SPEED]% 설정 시작",
        "block.long_motor_set_control": "모터 [MOTOR] 를 [SPEED]% 속도로 [ORIENTION] 방향으로 [VALUE] [RUNMODE] [DELAY] 시간 실행",
        "block.long_motor_set_speed_zero": "모터 [MOTOR] 정지",
        "block.long_motor_read_speed": "모터 [MOTOR] 회전 속도 가져오기 (도/초)",
        "block.long_motor_read_pose_relative": "모터 [MOTOR] 상대 각도 가져오기",
        "block.long_motor_set_0_degrees_relative": "모터 [MOTOR] 상대 각도 0으로 설정",
        "group.2": "서보 모드",
        "block.long_motor_set_run": "서보 [MOTOR] 시작 시 0도로 설정, [SPEED]% 속도로 [NUM] 도(-1800도~1800도) 회전 [DELAY]",
        "block.long_motor_read_pose_absolute": "모터 [MOTOR] 절대 각도 가져오기",
        "group.3": "복합 제어",
        "block.long_motor_init_car": "섀시 왼쪽 모터를 [MOTOR1] 오른쪽 모터를 [MOTOR2] 로 초기화, 바퀴 직경 [VALUE1] cm, 휠베이스 [VALUE2] cm",
        "block.long_motor_set_car_run": "차량을 [SPEED]% 속도로 [ORIENTION] 방향으로 [VALUE] [RUNMODE] 실행",
        "block.long_motorset_car_rotate": "차량을 [SPEED]% 속도로 [ORIENTION] [VALUE] 도 회전",
        "block.long_motor_set_car_move": "차량 왼쪽 바퀴 속도 [VALUE1]%, 오른쪽 바퀴 속도 [VALUE2]%",
        "block.long_motor_set_car_stop": "차량 정지",
        "block.long_motor_set_car_rotate_bias": "회전 편향 계수 [VALUE] 설정 범위 0.5~1.5",
        "menu.oriention.0": "시계 방향",
        "menu.oriention.1": "반시계 방향",
        "menu.delay.0": "완료까지 대기",
        "menu.delay.1": "대기 안 함",
        "menu.oriention_all2.0": "전진",
        "menu.oriention_all2.1": "후진",
        "menu.oriention5.0": "시계 방향",
        "menu.oriention5.1": "반시계 방향",
        "menu.runmode.0": "도",
        "menu.runmode.1": "회전",
        "menu.runmode.2": "초",
        "menu.runmode2.0": "cm",
        "menu.runmode2.1": "회전",
        "menu.runmode2.2": "초",
        "menu.turn.0": "좌회전",
        "menu.turn.1": "우회전",
        "menu.movemode.0": "모드 1",
        "menu.movemode.1": "모드 2"
    }
} as const;

export const product = {name: 'product.name', supportedLocales: ['zh-cn', 'en', 'zh-tw', 'ko']} as const;

export default class LongMotorBlocks implements NativeExtension {
    constructor (private readonly context: ExtensionContext) {}

    private checkVariant (): void {
        if (this.context.variant !== 'hiwonder-direct') throw new Error('power/long-motor: 未支持的主控适配 ' + this.context.variant);
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
                    subCategory: this.context.t('group.1')
                },
                {
                    opcode: "long_motor_set_speed",
                    text: this.context.t('block.long_motor_set_speed'),
                    blockType: "command",
                    arguments: {
                        MOTOR: {
                            type: "string",
                            menu: "motors",
                            defaultValue: "1",
                            literal: true
                        },
                        SPEED: {
                            type: "slider",
                            defaultValue: 50
                        },
                        ORIENTION: {
                            type: "string",
                            menu: "oriention",
                            defaultValue: "1",
                            literal: true
                        },
                        MODE: {
                            type: "string",
                            menu: "movemode",
                            defaultValue: "True",
                            literal: true
                        }
                    }
                },
                {
                    opcode: "long_motor_set_control",
                    text: this.context.t('block.long_motor_set_control'),
                    blockType: "command",
                    arguments: {
                        MOTOR: {
                            type: "string",
                            menu: "motors",
                            defaultValue: "1",
                            literal: true
                        },
                        SPEED: {
                            type: "slider",
                            defaultValue: 50
                        },
                        ORIENTION: {
                            type: "string",
                            menu: "oriention5",
                            defaultValue: "0",
                            literal: true
                        },
                        VALUE: {
                            type: "number",
                            defaultValue: 0
                        },
                        RUNMODE: {
                            type: "string",
                            menu: "runmode",
                            defaultValue: "2",
                            literal: true
                        },
                        DELAY: {
                            type: "string",
                            menu: "delay",
                            defaultValue: "True",
                            literal: true
                        }
                    }
                },
                {
                    opcode: "long_motor_set_speed_zero",
                    text: this.context.t('block.long_motor_set_speed_zero'),
                    blockType: "command",
                    arguments: {
                        MOTOR: {
                            type: "string",
                            menu: "motors",
                            defaultValue: "1",
                            literal: true
                        }
                    }
                },
                {
                    opcode: "long_motor_read_speed",
                    text: this.context.t('block.long_motor_read_speed'),
                    blockType: "reporter",
                    isEdgeActivated: false,
                    disableMonitor: true,
                    arguments: {
                        MOTOR: {
                            type: "string",
                            menu: "motors",
                            defaultValue: "1",
                            literal: true
                        }
                    }
                },
                {
                    opcode: "long_motor_read_pose_relative",
                    text: this.context.t('block.long_motor_read_pose_relative'),
                    blockType: "reporter",
                    isEdgeActivated: false,
                    disableMonitor: true,
                    arguments: {
                        MOTOR: {
                            type: "string",
                            menu: "motors",
                            defaultValue: "1",
                            literal: true
                        }
                    }
                },
                {
                    opcode: "long_motor_set_0_degrees_relative",
                    text: this.context.t('block.long_motor_set_0_degrees_relative'),
                    blockType: "command",
                    arguments: {
                        MOTOR: {
                            type: "string",
                            menu: "motors",
                            defaultValue: "1",
                            literal: true
                        }
                    }
                },
                {
                    subCategory: this.context.t('group.2')
                },
                {
                    opcode: "long_motor_set_run",
                    text: this.context.t('block.long_motor_set_run'),
                    blockType: "command",
                    arguments: {
                        MOTOR: {
                            type: "string",
                            menu: "motors",
                            defaultValue: "1",
                            literal: true
                        },
                        SPEED: {
                            type: "slider",
                            defaultValue: 50
                        },
                        NUM: {
                            type: "number",
                            defaultValue: 0
                        },
                        DELAY: {
                            type: "string",
                            menu: "delay",
                            defaultValue: "True",
                            literal: true
                        }
                    }
                },
                {
                    opcode: "long_motor_read_pose_absolute",
                    text: this.context.t('block.long_motor_read_pose_absolute'),
                    blockType: "reporter",
                    isEdgeActivated: false,
                    disableMonitor: true,
                    arguments: {
                        MOTOR: {
                            type: "string",
                            menu: "motors",
                            defaultValue: "1",
                            literal: true
                        }
                    }
                },
                {
                    subCategory: this.context.t('group.3')
                },
                {
                    opcode: "long_motor_init_car",
                    text: this.context.t('block.long_motor_init_car'),
                    blockType: "command",
                    arguments: {
                        MOTOR1: {
                            type: "string",
                            menu: "motors",
                            defaultValue: "1",
                            literal: true
                        },
                        MOTOR2: {
                            type: "string",
                            menu: "motors",
                            defaultValue: "2",
                            literal: true
                        },
                        VALUE1: {
                            type: "number",
                            defaultValue: 6
                        },
                        VALUE2: {
                            type: "number",
                            defaultValue: 12
                        }
                    }
                },
                {
                    opcode: "long_motor_set_car_run",
                    text: this.context.t('block.long_motor_set_car_run'),
                    blockType: "command",
                    arguments: {
                        SPEED: {
                            type: "slider",
                            defaultValue: 50
                        },
                        ORIENTION: {
                            type: "string",
                            menu: "oriention_all2",
                            defaultValue: "0",
                            literal: true
                        },
                        VALUE: {
                            type: "number",
                            defaultValue: 0
                        },
                        RUNMODE: {
                            type: "string",
                            menu: "runmode2",
                            defaultValue: "3",
                            literal: true
                        }
                    }
                },
                {
                    opcode: "long_motorset_car_rotate",
                    text: this.context.t('block.long_motorset_car_rotate'),
                    blockType: "command",
                    arguments: {
                        SPEED: {
                            type: "slider",
                            defaultValue: 50
                        },
                        ORIENTION: {
                            type: "string",
                            menu: "turn",
                            defaultValue: "-1",
                            literal: true
                        },
                        VALUE: {
                            type: "number",
                            defaultValue: 0
                        }
                    }
                },
                {
                    opcode: "long_motor_set_car_move",
                    text: this.context.t('block.long_motor_set_car_move'),
                    blockType: "command",
                    arguments: {
                        VALUE1: {
                            type: "slider100",
                            defaultValue: 50
                        },
                        VALUE2: {
                            type: "slider100",
                            defaultValue: 50
                        },
                        MODE: {
                            type: "string",
                            menu: "movemode",
                            defaultValue: "True",
                            literal: true
                        }
                    }
                },
                {
                    opcode: "long_motor_set_car_stop",
                    text: this.context.t('block.long_motor_set_car_stop'),
                    blockType: "command",
                    arguments: {}
                },
                {
                    opcode: "long_motor_set_car_rotate_bias",
                    text: this.context.t('block.long_motor_set_car_rotate_bias'),
                    blockType: "command",
                    arguments: {
                        VALUE: {
                            type: "number",
                            defaultValue: 1
                        }
                    }
                }
            ],
            menus: {
                motors: {
                    acceptReporters: false,
                    items: [
                        {
                            text: "M1",
                            value: "1"
                        },
                        {
                            text: "M2",
                            value: "2"
                        },
                        {
                            text: "M3",
                            value: "3"
                        },
                        {
                            text: "M4",
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
                },
                oriention_all2: {
                    acceptReporters: false,
                    items: [
                        {
                            text: this.context.t('menu.oriention_all2.0'),
                            value: "0"
                        },
                        {
                            text: this.context.t('menu.oriention_all2.1'),
                            value: "1"
                        }
                    ]
                },
                oriention5: {
                    acceptReporters: false,
                    items: [
                        {
                            text: this.context.t('menu.oriention5.0'),
                            value: "0"
                        },
                        {
                            text: this.context.t('menu.oriention5.1'),
                            value: "1"
                        }
                    ]
                },
                runmode: {
                    acceptReporters: false,
                    items: [
                        {
                            text: this.context.t('menu.runmode.0'),
                            value: "2"
                        },
                        {
                            text: this.context.t('menu.runmode.1'),
                            value: "3"
                        },
                        {
                            text: this.context.t('menu.runmode.2'),
                            value: "1"
                        }
                    ]
                },
                runmode2: {
                    acceptReporters: false,
                    items: [
                        {
                            text: this.context.t('menu.runmode2.0'),
                            value: "3"
                        },
                        {
                            text: this.context.t('menu.runmode2.1'),
                            value: "1"
                        },
                        {
                            text: this.context.t('menu.runmode2.2'),
                            value: "2"
                        }
                    ]
                },
                turn: {
                    acceptReporters: false,
                    items: [
                        {
                            text: this.context.t('menu.turn.0'),
                            value: "-1"
                        },
                        {
                            text: this.context.t('menu.turn.1'),
                            value: "1"
                        }
                    ]
                },
                movemode: {
                    acceptReporters: false,
                    items: [
                        {
                            text: this.context.t('menu.movemode.0'),
                            value: "True"
                        },
                        {
                            text: this.context.t('menu.movemode.1'),
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
            long_motor_set_speed: {
                template: "motor_{MOTOR}.set_speed({SPEED} * 8 * {ORIENTION},False)",
                variables: [
                    "uart = Hiwonder.UART(115200)",
                    "motor_{MOTOR} = Hiwonder.Motor(uart,{MOTOR})"
                ],
                setups: [
                    "motor_{MOTOR}.set_mode(0)"
                ]
            },
            long_motor_set_control: {
                template: "motor_{MOTOR}.set_motor_distance_ctl({RUNMODE},{ORIENTION},{VALUE},{SPEED}*8,{DELAY})",
                variables: [
                    "uart = Hiwonder.UART(115200)",
                    "motor_{MOTOR} = Hiwonder.Motor(uart,{MOTOR})"
                ],
                setups: [
                    "motor_{MOTOR}.set_mode(0)"
                ]
            },
            long_motor_set_speed_zero: {
                template: "motor_{MOTOR}.set_speed(0)",
                variables: [
                    "uart = Hiwonder.UART(115200)",
                    "motor_{MOTOR} = Hiwonder.Motor(uart,{MOTOR})"
                ],
                setups: [
                    "motor_{MOTOR}.set_mode(0)"
                ]
            },
            long_motor_read_speed: {
                template: "motor_{MOTOR}.read_speed()",
                variables: [
                    "uart = Hiwonder.UART(115200)",
                    "motor_{MOTOR} = Hiwonder.Motor(uart,{MOTOR})"
                ],
                setups: [
                    "motor_{MOTOR}.set_mode(0)"
                ]
            },
            long_motor_read_pose_relative: {
                template: "motor_{MOTOR}.read_pose_relative()",
                variables: [
                    "uart = Hiwonder.UART(115200)",
                    "motor_{MOTOR} = Hiwonder.Motor(uart,{MOTOR})"
                ],
                setups: [
                    "motor_{MOTOR}.set_mode(0)"
                ]
            },
            long_motor_set_0_degrees_relative: {
                template: "motor_{MOTOR}.set_0_degrees_relative()",
                variables: [
                    "uart = Hiwonder.UART(115200)",
                    "motor_{MOTOR} = Hiwonder.Motor(uart,{MOTOR})"
                ],
                setups: [
                    "motor_{MOTOR}.set_mode(0)"
                ]
            },
            long_motor_set_run: {
                template: "motor_{MOTOR}.set_pose({NUM}, {SPEED} * 8, False, {DELAY})",
                variables: [
                    "uart = Hiwonder.UART(115200)",
                    "motor_{MOTOR} = Hiwonder.Motor(uart,{MOTOR})"
                ],
                setups: [
                    "motor_{MOTOR}.set_mode(0)"
                ]
            },
            long_motor_read_pose_absolute: {
                template: "motor_{MOTOR}.__read_pose()",
                variables: [
                    "uart = Hiwonder.UART(115200)",
                    "motor_{MOTOR} = Hiwonder.Motor(uart,{MOTOR})"
                ],
                setups: [
                    "motor_{MOTOR}.set_mode(0)"
                ]
            },
            long_motor_init_car: {
                template: "",
                variables: [
                    "uart = Hiwonder.UART(115200)",
                    "motor_{MOTOR1} = Hiwonder.Motor(uart,{MOTOR1})",
                    "motor_{MOTOR2} = Hiwonder.Motor(uart,{MOTOR2})",
                    "car = Hiwonder.car(motor_{MOTOR1},motor_{MOTOR2},{VALUE1},{VALUE2})"
                ],
                setups: [
                    "motor_{MOTOR1}.set_mode(0)",
                    "motor_{MOTOR2}.set_mode(0)"
                ]
            },
            long_motor_set_car_run: {
                template: "car.run({SPEED}*8,{ORIENTION},{VALUE},{RUNMODE})"
            },
            long_motorset_car_rotate: {
                template: "car.rotate({VALUE}*{ORIENTION},{SPEED}*8)"
            },
            long_motor_set_car_move: {
                template: "car.move({VALUE1}*8,{VALUE2}*8,False)"
            },
            long_motor_set_car_stop: {
                template: "car.move(0,0)"
            },
            long_motor_set_car_rotate_bias: {
                template: "car.set_rotate_bias({VALUE})"
            }
        };
    }
}
