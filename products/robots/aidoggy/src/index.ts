import type {ExtensionContext, ExtensionInfo, NativeExtension, PythonTemplate} from '../../../../tools/sdk';

// 产品积木、菜单、集中 i18n 文案及 Python 规则在本文件维护。
export const messages = {
    "zh-cn": {
        "product.name": "AiDoggy",
        "menu.action_name.sit_preset": "坐下",
        "menu.action_name.stand_preset": "站立",
        "menu.action_name.lieDown_preset": "趴下",
        "menu.action_name.squat_preset": "下蹲",
        "menu.action_name.stretch_preset": "伸展",
        "menu.action_name.handshake_preset": "握手",
        "menu.action_name.waveHand_preset": "挥手",
        "menu.action_name.pee_preset": "抬腿",
        "menu.action_name.sway_preset": "摇摆",
        "menu.action_name.waveMotion_preset": "波浪运动",
        "menu.action_name.3axis_preset": "三轴姿态演示",
        "menu.action_name.action_pitch_preset": "俯仰轴动作",
        "menu.action_name.action_roll_preset": "横滚轴动作",
        "menu.action_name.action_yaw_preset": "偏航轴动作",
        "menu.blocking.True": "等待运行完毕",
        "menu.blocking.False": "不等待",
        "menu.oriention_turn.1": "原地左转",
        "menu.oriention_turn.-1": "原地右转",
        "menu.orientation.0": "↑",
        "menu.orientation.180": "↓",
        "menu.orientation.90": "←",
        "menu.orientation.-90": "→",
        "menu.orientation.45": "↖",
        "menu.orientation.-45": "↗",
        "menu.orientation.75": "↙",
        "menu.orientation.-75": "↘",
        "menu.gait.0": "对角小跑",
        "menu.gait.1": "爬行",
        "menu.gait.2": "跳跃",
        "menu.gait.3": "侧向",
        "menu.gait.4": "混合",
        "menu.rhythms.500": "二分之一",
        "menu.rhythms.250": "四分之一",
        "menu.rhythms.125": "八分之一",
        "menu.rhythms.1000": "一拍",
        "menu.rhythms.2000": "两拍",
        "menu.rhythms.5000": "长音",
        "menu.rhythms.0": "连续",
        "menu.on_off.True": "开启",
        "menu.on_off.False": "关闭",
        "block.start_thread": "主程序",
        "block.start_run_thread": "当启动时",
        "group.1": "板载资源",
        "block.buzzer_tone_set": "播放音调为 [TONES] 节拍为 [RHYTHMS] 间隔 [VALUE] 毫秒，鸣响 [VALUE2] 次",
        "block.buzzer_tone_set_arg": "播放音调为 [TONES] 节拍为 [RHYTHMS] 间隔 [VALUE] 毫秒，鸣响 [VALUE2] 次",
        "block.get_battery_level": "电池电压(mV)",
        "block.set_low_battery_alarm": "[VALUE] 低电压报警",
        "group.2": "输出打印",
        "block.print_str": "输出打印字符 [STR]",
        "block.print_number": "输出打印数字 [NUM]",
        "group.3": "运动控制",
        "block.set_pose": "设置以 [VALUE6] 毫秒的时间调整姿态，俯仰角(Pitch) [VALUE1] 度，横滚角(Roll) [VALUE2] 度，机身高度 [VALUE3] 毫米，X轴偏移 [VALUE4] 毫米，Y轴偏移 [VALUE5] 毫米",
        "block.set_move": "设置以 [VALUE5] 毫米/秒的速度行走，行走方向 [VALUE1]，行走距离 [VALUE2] 毫米，步长 [VALUE3] 毫米，抬腿高度 [VALUE4] 毫米",
        "block.set_move_xyz": "设置X方向速度 [VALUE1] 毫米/秒，Y方向速度 [VALUE2] 毫米/秒，角速度 [VALUE3] 度/秒，步长 [VALUE4] 毫米，抬腿高度 [VALUE5] 毫米",
        "block.set_turn": "设置以 [VALUE1] 度/秒的速度 [VALUE2]",
        "block.set_gait": "设置步态类型 [VALUE1]",
        "block.set_stop": "停止运动",
        "group.4": "动作组控制",
        "block.run_action": "设置运行动作组名称 [ACTION] [BLOCK]",
        "block.run_action_name": "设置运行动作组 [ACTION] [BLOCK]",
        "block.stop_action": "停止运行动作组"
    },
    "en": {
        "product.name": "AiDoggy",
        "menu.action_name.sit_preset": "Sit",
        "menu.action_name.stand_preset": "Stand",
        "menu.action_name.lieDown_preset": "Lie down",
        "menu.action_name.squat_preset": "Squat",
        "menu.action_name.stretch_preset": "Stretch",
        "menu.action_name.handshake_preset": "Handshake",
        "menu.action_name.waveHand_preset": "Wave",
        "menu.action_name.pee_preset": "Lift leg",
        "menu.action_name.sway_preset": "Sway",
        "menu.action_name.waveMotion_preset": "Wave motion",
        "menu.action_name.3axis_preset": "3-axis posture demo",
        "menu.action_name.action_pitch_preset": "Pitch axis action",
        "menu.action_name.action_roll_preset": "Roll axis action",
        "menu.action_name.action_yaw_preset": "Yaw axis action",
        "menu.blocking.True": "Wait until complete",
        "menu.blocking.False": "Do not wait",
        "menu.oriention_turn.1": "Turn left in place",
        "menu.oriention_turn.-1": "Turn right in place",
        "menu.orientation.0": "↑",
        "menu.orientation.180": "↓",
        "menu.orientation.90": "←",
        "menu.orientation.-90": "→",
        "menu.orientation.45": "↖",
        "menu.orientation.-45": "↗",
        "menu.orientation.75": "↙",
        "menu.orientation.-75": "↘",
        "menu.gait.0": "Trot",
        "menu.gait.1": "Crawl",
        "menu.gait.2": "Jump",
        "menu.gait.3": "Side step",
        "menu.gait.4": "Hybrid",
        "menu.rhythms.500": "Half beat",
        "menu.rhythms.250": "Quarter beat",
        "menu.rhythms.125": "Eighth beat",
        "menu.rhythms.1000": "One beat",
        "menu.rhythms.2000": "Two beats",
        "menu.rhythms.5000": "Long tone",
        "menu.rhythms.0": "Continuous",
        "menu.on_off.True": "On",
        "menu.on_off.False": "Off",
        "block.start_thread": "main program",
        "block.start_run_thread": "when started",
        "group.1": "Onboard resources",
        "block.buzzer_tone_set": "play tone [TONES] rhythm [RHYTHMS] interval [VALUE] ms repeat [VALUE2] times",
        "block.buzzer_tone_set_arg": "play tone [TONES] rhythm [RHYTHMS] interval [VALUE] ms repeat [VALUE2] times",
        "block.get_battery_level": "battery voltage (mV)",
        "block.set_low_battery_alarm": "[VALUE] low voltage alarm",
        "group.2": "Output",
        "block.print_str": "print text [STR]",
        "block.print_number": "print number [NUM]",
        "group.3": "Motion control",
        "block.set_pose": "set pose in [VALUE6] ms pitch [VALUE1] roll [VALUE2] height [VALUE3] x [VALUE4] y [VALUE5]",
        "block.set_move": "move speed [VALUE5] direction [VALUE1] distance [VALUE2] step [VALUE3] lift [VALUE4]",
        "block.set_move_xyz": "omni move x [VALUE1] y [VALUE2] omega [VALUE3] step [VALUE4] lift [VALUE5]",
        "block.set_turn": "turn speed [VALUE1] direction [VALUE2]",
        "block.set_gait": "set gait [VALUE1]",
        "block.set_stop": "stop moving",
        "group.4": "Action group control",
        "block.run_action": "run action name [ACTION] [BLOCK]",
        "block.run_action_name": "run preset action [ACTION] [BLOCK]",
        "block.stop_action": "stop action"
    },
    "zh-tw": {
        "product.name": "AiDoggy",
        "menu.action_name.sit_preset": "坐下",
        "menu.action_name.stand_preset": "站立",
        "menu.action_name.lieDown_preset": "趴下",
        "menu.action_name.squat_preset": "下蹲",
        "menu.action_name.stretch_preset": "伸展",
        "menu.action_name.handshake_preset": "握手",
        "menu.action_name.waveHand_preset": "揮手",
        "menu.action_name.pee_preset": "抬腿",
        "menu.action_name.sway_preset": "搖擺",
        "menu.action_name.waveMotion_preset": "波浪運動",
        "menu.action_name.3axis_preset": "三軸姿態展示",
        "menu.action_name.action_pitch_preset": "俯仰軸動作",
        "menu.action_name.action_roll_preset": "橫滾軸動作",
        "menu.action_name.action_yaw_preset": "偏航軸動作",
        "menu.blocking.True": "等待執行完畢",
        "menu.blocking.False": "不等待",
        "menu.oriention_turn.1": "原地左轉",
        "menu.oriention_turn.-1": "原地右轉",
        "menu.orientation.0": "↑",
        "menu.orientation.180": "↓",
        "menu.orientation.90": "←",
        "menu.orientation.-90": "→",
        "menu.orientation.45": "↖",
        "menu.orientation.-45": "↗",
        "menu.orientation.75": "↙",
        "menu.orientation.-75": "↘",
        "menu.gait.0": "對角小跑",
        "menu.gait.1": "爬行",
        "menu.gait.2": "跳躍",
        "menu.gait.3": "側向",
        "menu.gait.4": "混合",
        "menu.rhythms.500": "二分之一拍",
        "menu.rhythms.250": "四分之一拍",
        "menu.rhythms.125": "八分之一拍",
        "menu.rhythms.1000": "一拍",
        "menu.rhythms.2000": "兩拍",
        "menu.rhythms.5000": "長音",
        "menu.rhythms.0": "連續",
        "menu.on_off.True": "開啟",
        "menu.on_off.False": "關閉",
        "block.start_thread": "主程式",
        "block.start_run_thread": "當啟動時",
        "group.1": "板載資源",
        "block.buzzer_tone_set": "播放音調 [TONES] 節拍 [RHYTHMS] 間隔 [VALUE] 毫秒，播放 [VALUE2] 次",
        "block.buzzer_tone_set_arg": "播放音調 [TONES] 節拍 [RHYTHMS] 間隔 [VALUE] 毫秒，播放 [VALUE2] 次",
        "block.get_battery_level": "電池電壓 (mV)",
        "block.set_low_battery_alarm": "[VALUE] 低電壓警報",
        "group.2": "輸出列印",
        "block.print_str": "輸出文字 [STR]",
        "block.print_number": "輸出數字 [NUM]",
        "group.3": "運動控制",
        "block.set_pose": "以 [VALUE6] 毫秒調整姿態：俯仰角 [VALUE1] 度、橫滾角 [VALUE2] 度、機身高度 [VALUE3] 毫米、X 軸偏移 [VALUE4] 毫米、Y 軸偏移 [VALUE5] 毫米",
        "block.set_move": "以速度 [VALUE5] 毫米/秒、方向 [VALUE1]、距離 [VALUE2] 毫米、步長 [VALUE3] 毫米、抬腿高度 [VALUE4] 毫米移動",
        "block.set_move_xyz": "全向移動：X 速度 [VALUE1]、Y 速度 [VALUE2]、角速度 [VALUE3]、步長 [VALUE4]、抬腿高度 [VALUE5]",
        "block.set_turn": "以速度 [VALUE1] 度/秒向 [VALUE2] 旋轉",
        "block.set_gait": "設定步態 [VALUE1]",
        "block.set_stop": "停止移動",
        "group.4": "動作組控制",
        "block.run_action": "執行動作組名稱 [ACTION] [BLOCK]",
        "block.run_action_name": "執行預設動作 [ACTION] [BLOCK]",
        "block.stop_action": "停止動作"
    },
    "ko": {
        "product.name": "AiDoggy",
        "menu.action_name.sit_preset": "앉기",
        "menu.action_name.stand_preset": "서기",
        "menu.action_name.lieDown_preset": "엎드리기",
        "menu.action_name.squat_preset": "쪼그리기",
        "menu.action_name.stretch_preset": "스트레칭",
        "menu.action_name.handshake_preset": "악수",
        "menu.action_name.waveHand_preset": "손 흔들기",
        "menu.action_name.pee_preset": "다리 들기",
        "menu.action_name.sway_preset": "흔들기",
        "menu.action_name.waveMotion_preset": "웨이브 동작",
        "menu.action_name.3axis_preset": "3축 자세 시연",
        "menu.action_name.action_pitch_preset": "피치 축 동작",
        "menu.action_name.action_roll_preset": "롤 축 동작",
        "menu.action_name.action_yaw_preset": "요 축 동작",
        "menu.blocking.True": "완료될 때까지 대기",
        "menu.blocking.False": "대기하지 않음",
        "menu.oriention_turn.1": "제자리에서 왼쪽 회전",
        "menu.oriention_turn.-1": "제자리에서 오른쪽 회전",
        "menu.orientation.0": "↑",
        "menu.orientation.180": "↓",
        "menu.orientation.90": "←",
        "menu.orientation.-90": "→",
        "menu.orientation.45": "↖",
        "menu.orientation.-45": "↗",
        "menu.orientation.75": "↙",
        "menu.orientation.-75": "↘",
        "menu.gait.0": "트로트",
        "menu.gait.1": "기어가기",
        "menu.gait.2": "점프",
        "menu.gait.3": "측면 이동",
        "menu.gait.4": "혼합",
        "menu.rhythms.500": "2분음표",
        "menu.rhythms.250": "4분음표",
        "menu.rhythms.125": "8분음표",
        "menu.rhythms.1000": "1박",
        "menu.rhythms.2000": "2박",
        "menu.rhythms.5000": "긴 음",
        "menu.rhythms.0": "연속",
        "menu.on_off.True": "켜기",
        "menu.on_off.False": "끄기",
        "block.start_thread": "주 프로그램",
        "block.start_run_thread": "시작할 때",
        "group.1": "온보드 리소스",
        "block.buzzer_tone_set": "음 [TONES] 박자 [RHYTHMS] 간격 [VALUE] ms로 [VALUE2]회 재생",
        "block.buzzer_tone_set_arg": "음 [TONES] 박자 [RHYTHMS] 간격 [VALUE] ms로 [VALUE2]회 재생",
        "block.get_battery_level": "배터리 전압 (mV)",
        "block.set_low_battery_alarm": "저전압 경보 [VALUE]",
        "group.2": "출력",
        "block.print_str": "텍스트 [STR] 출력",
        "block.print_number": "숫자 [NUM] 출력",
        "group.3": "동작 제어",
        "block.set_pose": "[VALUE6] ms 동안 자세 설정: 피치 [VALUE1]도, 롤 [VALUE2]도, 높이 [VALUE3] mm, X 오프셋 [VALUE4] mm, Y 오프셋 [VALUE5] mm",
        "block.set_move": "속도 [VALUE5] mm/s, 방향 [VALUE1], 거리 [VALUE2] mm, 보폭 [VALUE3] mm, 다리 높이 [VALUE4] mm로 이동",
        "block.set_move_xyz": "전방향 이동: X 속도 [VALUE1], Y 속도 [VALUE2], 각속도 [VALUE3], 보폭 [VALUE4], 다리 높이 [VALUE5]",
        "block.set_turn": "속도 [VALUE1]도/초로 [VALUE2] 회전",
        "block.set_gait": "보행 방식 [VALUE1] 설정",
        "block.set_stop": "이동 정지",
        "group.4": "동작 그룹 제어",
        "block.run_action": "동작 그룹 이름 [ACTION] 실행 [BLOCK]",
        "block.run_action_name": "미리 설정된 동작 [ACTION] 실행 [BLOCK]",
        "block.stop_action": "동작 정지"
    }
} as const;

export const product = {
    "name": "product.name",
    "supportedLocales": [
        "zh-cn",
        "en",
        "zh-tw",
        "ko"
    ]
} as const;

export default class AidoggyBlocks implements NativeExtension {
    constructor (private readonly context: ExtensionContext) {}

    getInfo (): ExtensionInfo {
        return {
            id: "aidoggy",
            name: this.context.t(product.name),
            color1: "#4682b4",
            color2: "#4682b4",
            color3: "#4682b4",
            menus: {
                action_name: {
                    acceptReporters: false,
                    items: [
                        {
                            text: this.context.t("menu.action_name.sit_preset"),
                            value: "sit_preset"
                        },
                        {
                            text: this.context.t("menu.action_name.stand_preset"),
                            value: "stand_preset"
                        },
                        {
                            text: this.context.t("menu.action_name.lieDown_preset"),
                            value: "lieDown_preset"
                        },
                        {
                            text: this.context.t("menu.action_name.squat_preset"),
                            value: "squat_preset"
                        },
                        {
                            text: this.context.t("menu.action_name.stretch_preset"),
                            value: "stretch_preset"
                        },
                        {
                            text: this.context.t("menu.action_name.handshake_preset"),
                            value: "handshake_preset"
                        },
                        {
                            text: this.context.t("menu.action_name.waveHand_preset"),
                            value: "waveHand_preset"
                        },
                        {
                            text: this.context.t("menu.action_name.pee_preset"),
                            value: "pee_preset"
                        },
                        {
                            text: this.context.t("menu.action_name.sway_preset"),
                            value: "sway_preset"
                        },
                        {
                            text: this.context.t("menu.action_name.waveMotion_preset"),
                            value: "waveMotion_preset"
                        },
                        {
                            text: this.context.t("menu.action_name.3axis_preset"),
                            value: "3axis_preset"
                        },
                        {
                            text: this.context.t("menu.action_name.action_pitch_preset"),
                            value: "action_pitch_preset"
                        },
                        {
                            text: this.context.t("menu.action_name.action_roll_preset"),
                            value: "action_roll_preset"
                        },
                        {
                            text: this.context.t("menu.action_name.action_yaw_preset"),
                            value: "action_yaw_preset"
                        }
                    ]
                },
                blocking: {
                    acceptReporters: false,
                    items: [
                        {
                            text: this.context.t("menu.blocking.True"),
                            value: "True"
                        },
                        {
                            text: this.context.t("menu.blocking.False"),
                            value: "False"
                        }
                    ]
                },
                oriention_turn: {
                    acceptReporters: false,
                    items: [
                        {
                            text: this.context.t("menu.oriention_turn.1"),
                            value: "1"
                        },
                        {
                            text: this.context.t("menu.oriention_turn.-1"),
                            value: "-1"
                        }
                    ]
                },
                orientation: {
                    acceptReporters: false,
                    items: [
                        {
                            text: this.context.t("menu.orientation.0"),
                            value: "0"
                        },
                        {
                            text: this.context.t("menu.orientation.180"),
                            value: "180"
                        },
                        {
                            text: this.context.t("menu.orientation.90"),
                            value: "90"
                        },
                        {
                            text: this.context.t("menu.orientation.-90"),
                            value: "-90"
                        },
                        {
                            text: this.context.t("menu.orientation.45"),
                            value: "45"
                        },
                        {
                            text: this.context.t("menu.orientation.-45"),
                            value: "-45"
                        },
                        {
                            text: this.context.t("menu.orientation.75"),
                            value: "75"
                        },
                        {
                            text: this.context.t("menu.orientation.-75"),
                            value: "-75"
                        }
                    ]
                },
                gait: {
                    acceptReporters: false,
                    items: [
                        {
                            text: this.context.t("menu.gait.0"),
                            value: "0"
                        },
                        {
                            text: this.context.t("menu.gait.1"),
                            value: "1"
                        },
                        {
                            text: this.context.t("menu.gait.2"),
                            value: "2"
                        },
                        {
                            text: this.context.t("menu.gait.3"),
                            value: "3"
                        },
                        {
                            text: this.context.t("menu.gait.4"),
                            value: "4"
                        }
                    ]
                },
                tones: {
                    acceptReporters: false,
                    items: [
                        {
                            text: "C2",
                            value: "65"
                        },
                        {
                            text: "D2",
                            value: "73"
                        },
                        {
                            text: "E2",
                            value: "82"
                        },
                        {
                            text: "F2",
                            value: "87"
                        },
                        {
                            text: "G2",
                            value: "98"
                        },
                        {
                            text: "A2",
                            value: "110"
                        },
                        {
                            text: "B2",
                            value: "123"
                        },
                        {
                            text: "C3",
                            value: "131"
                        },
                        {
                            text: "D3",
                            value: "147"
                        },
                        {
                            text: "E3",
                            value: "165"
                        },
                        {
                            text: "F3",
                            value: "175"
                        },
                        {
                            text: "G3",
                            value: "196"
                        },
                        {
                            text: "A3",
                            value: "220"
                        },
                        {
                            text: "B3",
                            value: "247"
                        },
                        {
                            text: "C4",
                            value: "262"
                        },
                        {
                            text: "D4",
                            value: "294"
                        },
                        {
                            text: "E4",
                            value: "330"
                        },
                        {
                            text: "F4",
                            value: "349"
                        },
                        {
                            text: "G4",
                            value: "392"
                        },
                        {
                            text: "A4",
                            value: "440"
                        },
                        {
                            text: "B4",
                            value: "494"
                        },
                        {
                            text: "C5",
                            value: "523"
                        },
                        {
                            text: "D5",
                            value: "587"
                        },
                        {
                            text: "E5",
                            value: "659"
                        },
                        {
                            text: "F5",
                            value: "698"
                        },
                        {
                            text: "G5",
                            value: "784"
                        },
                        {
                            text: "A5",
                            value: "880"
                        },
                        {
                            text: "B5",
                            value: "988"
                        },
                        {
                            text: "C6",
                            value: "1047"
                        },
                        {
                            text: "D6",
                            value: "1175"
                        },
                        {
                            text: "E6",
                            value: "1319"
                        },
                        {
                            text: "F6",
                            value: "1397"
                        },
                        {
                            text: "G6",
                            value: "1568"
                        },
                        {
                            text: "A6",
                            value: "1760"
                        },
                        {
                            text: "B6",
                            value: "1976"
                        },
                        {
                            text: "C7",
                            value: "2093"
                        },
                        {
                            text: "D7",
                            value: "2349"
                        },
                        {
                            text: "E7",
                            value: "2637"
                        },
                        {
                            text: "F7",
                            value: "2794"
                        },
                        {
                            text: "G7",
                            value: "3136"
                        },
                        {
                            text: "A7",
                            value: "3520"
                        },
                        {
                            text: "B7",
                            value: "3951"
                        },
                        {
                            text: "C8",
                            value: "4186"
                        },
                        {
                            text: "D8",
                            value: "4699"
                        }
                    ]
                },
                rhythms: {
                    acceptReporters: false,
                    items: [
                        {
                            text: this.context.t("menu.rhythms.500"),
                            value: "500"
                        },
                        {
                            text: this.context.t("menu.rhythms.250"),
                            value: "250"
                        },
                        {
                            text: this.context.t("menu.rhythms.125"),
                            value: "125"
                        },
                        {
                            text: this.context.t("menu.rhythms.1000"),
                            value: "1000"
                        },
                        {
                            text: this.context.t("menu.rhythms.2000"),
                            value: "2000"
                        },
                        {
                            text: this.context.t("menu.rhythms.5000"),
                            value: "5000"
                        },
                        {
                            text: this.context.t("menu.rhythms.0"),
                            value: "0"
                        }
                    ]
                },
                on_off: {
                    acceptReporters: false,
                    items: [
                        {
                            text: this.context.t("menu.on_off.True"),
                            value: "True"
                        },
                        {
                            text: this.context.t("menu.on_off.False"),
                            value: "False"
                        }
                    ]
                }
            },
            blocks: [
                {
                    opcode: "start_thread",
                    blockType: "hat",
                    text: this.context.t("block.start_thread"),
                    isEdgeActivated: false,
                    arguments: {}
                },
                {
                    opcode: "start_run_thread",
                    blockType: "hat",
                    text: this.context.t("block.start_run_thread"),
                    isEdgeActivated: false,
                    arguments: {}
                },
                {
                    subCategory: this.context.t("group.1")
                },
                {
                    opcode: "buzzer_tone_set",
                    blockType: "command",
                    text: this.context.t("block.buzzer_tone_set"),
                    arguments: {
                        TONES: {
                            type: "string",
                            defaultValue: "65",
                            menu: "tones",
                            literal: true
                        },
                        RHYTHMS: {
                            type: "string",
                            defaultValue: "500",
                            menu: "rhythms",
                            literal: true
                        },
                        VALUE: {
                            type: "number",
                            defaultValue: 100
                        },
                        VALUE2: {
                            type: "number",
                            defaultValue: 1
                        }
                    }
                },
                {
                    opcode: "buzzer_tone_set_arg",
                    blockType: "command",
                    text: this.context.t("block.buzzer_tone_set_arg"),
                    arguments: {
                        TONES: {
                            type: "number",
                            defaultValue: 65
                        },
                        RHYTHMS: {
                            type: "number",
                            defaultValue: 500
                        },
                        VALUE: {
                            type: "number",
                            defaultValue: 100
                        },
                        VALUE2: {
                            type: "number",
                            defaultValue: 1
                        }
                    }
                },
                {
                    opcode: "get_battery_level",
                    blockType: "reporter",
                    text: this.context.t("block.get_battery_level"),
                    disableMonitor: true,
                    arguments: {}
                },
                {
                    opcode: "set_low_battery_alarm",
                    blockType: "command",
                    text: this.context.t("block.set_low_battery_alarm"),
                    arguments: {
                        VALUE: {
                            type: "string",
                            defaultValue: "True",
                            menu: "on_off",
                            literal: true
                        }
                    }
                },
                {
                    subCategory: this.context.t("group.2")
                },
                {
                    opcode: "print_str",
                    blockType: "command",
                    text: this.context.t("block.print_str"),
                    arguments: {
                        STR: {
                            type: "string",
                            defaultValue: "Hello"
                        }
                    }
                },
                {
                    opcode: "print_number",
                    blockType: "command",
                    text: this.context.t("block.print_number"),
                    arguments: {
                        NUM: {
                            type: "number",
                            defaultValue: 60
                        }
                    }
                },
                {
                    subCategory: this.context.t("group.3")
                },
                {
                    opcode: "set_pose",
                    blockType: "command",
                    text: this.context.t("block.set_pose"),
                    arguments: {
                        VALUE6: {
                            type: "number",
                            defaultValue: 1000
                        },
                        VALUE1: {
                            type: "number",
                            defaultValue: 0
                        },
                        VALUE2: {
                            type: "number",
                            defaultValue: 0
                        },
                        VALUE3: {
                            type: "number",
                            defaultValue: 0
                        },
                        VALUE4: {
                            type: "number",
                            defaultValue: 0
                        },
                        VALUE5: {
                            type: "number",
                            defaultValue: 0
                        }
                    }
                },
                {
                    opcode: "set_move",
                    blockType: "command",
                    text: this.context.t("block.set_move"),
                    arguments: {
                        VALUE5: {
                            type: "number",
                            defaultValue: 80
                        },
                        VALUE1: {
                            type: "string",
                            defaultValue: "0",
                            menu: "orientation",
                            literal: true
                        },
                        VALUE2: {
                            type: "number",
                            defaultValue: 200
                        },
                        VALUE3: {
                            type: "number",
                            defaultValue: 40
                        },
                        VALUE4: {
                            type: "number",
                            defaultValue: 30
                        }
                    }
                },
                {
                    opcode: "set_move_xyz",
                    blockType: "command",
                    text: this.context.t("block.set_move_xyz"),
                    arguments: {
                        VALUE1: {
                            type: "number",
                            defaultValue: 0
                        },
                        VALUE2: {
                            type: "number",
                            defaultValue: 0
                        },
                        VALUE3: {
                            type: "number",
                            defaultValue: 0
                        },
                        VALUE4: {
                            type: "number",
                            defaultValue: 40
                        },
                        VALUE5: {
                            type: "number",
                            defaultValue: 30
                        }
                    }
                },
                {
                    opcode: "set_turn",
                    blockType: "command",
                    text: this.context.t("block.set_turn"),
                    arguments: {
                        VALUE1: {
                            type: "number",
                            defaultValue: 0
                        },
                        VALUE2: {
                            type: "string",
                            defaultValue: "1",
                            menu: "oriention_turn",
                            literal: true
                        }
                    }
                },
                {
                    opcode: "set_gait",
                    blockType: "command",
                    text: this.context.t("block.set_gait"),
                    arguments: {
                        VALUE1: {
                            type: "string",
                            defaultValue: "0",
                            menu: "gait",
                            literal: true
                        }
                    }
                },
                {
                    opcode: "set_stop",
                    blockType: "command",
                    text: this.context.t("block.set_stop"),
                    arguments: {}
                },
                {
                    subCategory: this.context.t("group.4")
                },
                {
                    opcode: "run_action",
                    blockType: "command",
                    text: this.context.t("block.run_action"),
                    arguments: {
                        ACTION: {
                            type: "string",
                            defaultValue: "sit_preset"
                        },
                        BLOCK: {
                            type: "number",
                            defaultValue: "True",
                            menu: "blocking",
                            literal: true
                        }
                    }
                },
                {
                    opcode: "run_action_name",
                    blockType: "command",
                    text: this.context.t("block.run_action_name"),
                    arguments: {
                        ACTION: {
                            type: "string",
                            defaultValue: "sit_preset",
                            menu: "action_name",
                            literal: true
                        },
                        BLOCK: {
                            type: "number",
                            defaultValue: "True",
                            menu: "blocking",
                            literal: true
                        }
                    }
                },
                {
                    opcode: "stop_action",
                    blockType: "command",
                    text: this.context.t("block.stop_action"),
                    arguments: {}
                }
            ],
            menuIconURI: this.context.asset("assets/icon.svg")
        };
    }

    // 主程序收尾、事件回调和菜单分支直接交给 Python 生成器处理。
    getPython (): Record<string, PythonTemplate> {
        return {
            start_thread: {
                template: "",
                imports: [
                    "import Hiwonder"
                ],
                variables: [
                    "aidoggy = Hiwonder.AIDoggy()"
                ],
                launcher: "Hiwonder.startMain({MAIN})",
                section: "main"
            },
            start_run_thread: {
                template: "",
                imports: [
                    "import Hiwonder"
                ],
                variables: [
                    "aidoggy = Hiwonder.AIDoggy()"
                ],
                section: "setup"
            },
            buzzer_tone_set: {
                template: "beep.set_buzzer({TONES},{RHYTHMS},{VALUE},{VALUE2})",
                variables: [
                    "beep = Hiwonder.Buzzer()"
                ]
            },
            buzzer_tone_set_arg: {
                template: "beep.set_buzzer({TONES},{RHYTHMS},{VALUE},{VALUE2})"
            },
            get_battery_level: {
                template: "rsys.read_battery_voltage()",
                variables: [
                    "rsys = Hiwonder.Robot_System()"
                ]
            },
            set_low_battery_alarm: {
                template: "rsys.set_low_voltage_alarm_enable({VALUE})",
                variables: [
                    "rsys = Hiwonder.Robot_System()"
                ]
            },
            print_str: {
                template: `print({STR})
time.sleep(0.05)`,
                imports: [
                    "import time"
                ]
            },
            print_number: {
                template: `print({NUM})
time.sleep(0.05)`,
                imports: [
                    "import time"
                ]
            },
            set_pose: {
                template: "aidoggy.set_pose({VALUE1},{VALUE2},{VALUE3},{VALUE4},{VALUE5},{VALUE6})"
            },
            set_move: {
                template: "aidoggy.move({VALUE1},{VALUE2},{VALUE3},{VALUE4},{VALUE5})"
            },
            set_move_xyz: {
                template: "aidoggy.omni_move({VALUE1},{VALUE2},{VALUE3},{VALUE4},{VALUE5})"
            },
            set_turn: {
                template: "aidoggy.omni_move(0,0,{VALUE1},0,0)",
                templateSelector: {
                    argument: "VALUE2",
                    cases: {
                        "1": "aidoggy.omni_move(0,0,{VALUE1},0,0)",
                        "-1": "aidoggy.omni_move(0,0,-{VALUE1},0,0)"
                    }
                }
            },
            set_gait: {
                template: "aidoggy.set_gait({VALUE1})"
            },
            set_stop: {
                template: "aidoggy.stop()"
            },
            run_action: {
                template: "aidoggy.run_action_group({ACTION},{BLOCK})"
            },
            run_action_name: {
                template: "aidoggy.run_action_group('{ACTION}',{BLOCK})"
            },
            stop_action: {
                template: "aidoggy.action_stop()"
            }
        };
    }
}
