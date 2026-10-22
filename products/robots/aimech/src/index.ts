import type {ExtensionContext, ExtensionInfo, NativeExtension, PythonTemplate} from '../../../../tools/sdk';

// 产品积木、菜单、集中 i18n 文案及 Python 规则在本文件维护。
export const messages = {
    "zh-cn": {
        "product.name": "AI机甲双驱车",
        "menu.rhythms.500": "二分之一",
        "menu.rhythms.250": "四分之一",
        "menu.rhythms.125": "八分之一",
        "menu.rhythms.1000": "整拍",
        "menu.rhythms.2000": "双拍",
        "menu.rhythms.5000": "长时间",
        "menu.rhythms.0": "停止",
        "menu.buzzerMode.False": "后台播放",
        "menu.buzzerMode.True": "前台播放(阻塞)",
        "menu.lightColors.0": "红",
        "menu.lightColors.1": "绿",
        "menu.lightColors.2": "蓝",
        "menu.lightColors.3": "黄",
        "menu.lightColors.4": "紫",
        "menu.lightColors.5": "青",
        "menu.lightColors.6": "白",
        "menu.oriention2.1": "前进",
        "menu.oriention2.-1": "后退",
        "menu.orientionTurn.1": "原地左转",
        "menu.orientionTurn.-1": "原地右转",
        "menu.wheel.1": "左轮(EM1)",
        "menu.wheel.2": "右轮(EM2)",
        "menu.wheel.0": "全部",
        "menu.wheel2.1": "左轮(EM1)",
        "menu.wheel2.2": "右轮(EM2)",
        "menu.eulerElement.0": "Z轴度数",
        "menu.eulerElement.1": "X轴度数",
        "menu.eulerElement.2": "Y轴度数",
        "menu.bleMode.BLE.MODE_BLE_SLAVE": "从机模式",
        "menu.bleMode.BLE.MODE_BLE_MASTER": "主机模式",
        "block.start_thread": "主程序",
        "block.start_run_thread": "当启动时",
        "group.1": "板载资源",
        "block.buzzer_tone_set": "播放音调为 [TONES] 节拍为 [RHYTHMS] 模式为 [MODE]",
        "block.buzzer_tone_set_arg": "播放音调为 [TONES] 节拍为 [RHYTHMS] 模式为 [MODE]",
        "block.buzzer_tone_set_volume": "设置蜂鸣器音量为 [VALUE]",
        "block.close_buzzer": "关闭蜂鸣器",
        "block.close_lowpower_warning": "关闭低压报警",
        "block.get_battery_level": "电量值(mV)",
        "group.2": "RGB彩灯",
        "block.set_led_color": "设置RGB彩灯颜色 [COLOR]",
        "block.set_led_color_arg": "设置RGB彩灯红色 [RED] 绿色 [GREEN] 蓝色 [BLUE]",
        "block.rgb_module_breath_one": "设置RGB彩灯呼吸灯模式 颜色 [COLOR] 变化周期(0.5~20) [CYCLE] 秒",
        "block.rgb_module_breath": "设置RGB彩灯炫彩模式",
        "block.close_led": "关闭RGB彩灯",
        "group.3": "输出打印",
        "block.print_str": "输出打印字符 [STR]",
        "block.print_number": "输出打印数字 [NUM]",
        "group.4": "按键",
        "block.when_key_click_thread": "当 [KEYS] 键短按时",
        "block.when_key_longclick_thread": "当 [KEYS] 键长按时",
        "block.key_is_pressed": "[KEYS] 键被按下",
        "group.5": "编码电机控制",
        "block.motor_speed_set": "设置小车以[SPEED]转/分钟的转速[ORIENTION]",
        "block.set_motor_run_distance": "设置小车以[SPEED]转/分钟的转速 [ORIENTION] [DISTANCE] 厘米",
        "block.set_motor_run_oriention_angle": "设置小车以[SPEED]转/分钟的转速 [TURN] [ANGLE] 度",
        "block.set_motor_run_speed": "设置 [WHEEL] 以 [SPEED] 转/分钟的转速启动",
        "block.set_motor_run_angle": "设置[WHEEL]以[SPEED]转/分钟的转速运行[ANGLE]度",
        "block.set_motor_run_two_wheel": "设置左轮(EM1)转速[SPEED]转/分钟, 右轮(EM2)转速[SPEED2]转/分钟",
        "block.set_motor_run_two_wheel_percent": "设置左轮(EM1)动力 [SPEED] %, 右轮(EM2)动力 [SPEED2] %",
        "block.set_motor_stop": "停止编码电机 [WHEEL] 运行",
        "block.get_servo_run_angle": "获取[WHEEL] 转过的度数",
        "block.reset_run_angle": "重置 [WHEEL] 转过的度数",
        "block.pd_set_pd_line": "设置小车进行PD调节巡线（偏差值 [OFFSET] 基础速度 [SPEED] 最大速度 [MAXSPEED] Kp值 [KP] Kd值 [KD]）",
        "group.6": "IMU传感器",
        "block.imu_init": "初始化IMU传感器",
        "block.imu_cali": "校准IMU传感器",
        "block.get_euler_angle_element_value": "获取设备 [VALUE]",
        "group.7": "蓝牙通信",
        "block.set_ble_mode": "设置蓝牙模式 [MODE] 名称 [NAME]",
        "block.ble_is_connected": "蓝牙是否已连接",
        "block.get_ble_mac": "获取蓝牙MAC地址",
        "block.ble_wait_end": "蓝牙收到的数据是否包含 [VALUE]",
        "block.read_ble_data": "读取蓝牙数据",
        "block.get_ble_cmd": "解析蓝牙数据 [DATA] 获取命令",
        "block.get_ble_args": "解析蓝牙数据 [DATA] 获取参数 [NUM]",
        "block.ble_write": "蓝牙发送数据 [DATA]"
    },
    "en": {
        "product.name": "AI Mech Dual-drive Car",
        "menu.rhythms.500": "Half beat",
        "menu.rhythms.250": "Quarter beat",
        "menu.rhythms.125": "Eighth beat",
        "menu.rhythms.1000": "Whole beat",
        "menu.rhythms.2000": "Double beat",
        "menu.rhythms.5000": "Long duration",
        "menu.rhythms.0": "Stop",
        "menu.buzzerMode.False": "Play in background",
        "menu.buzzerMode.True": "Play in foreground (blocking)",
        "menu.lightColors.0": "Red",
        "menu.lightColors.1": "Green",
        "menu.lightColors.2": "Blue",
        "menu.lightColors.3": "Yellow",
        "menu.lightColors.4": "Purple",
        "menu.lightColors.5": "Cyan",
        "menu.lightColors.6": "White",
        "menu.oriention2.1": "Forward",
        "menu.oriention2.-1": "Backward",
        "menu.orientionTurn.1": "Turn left in place",
        "menu.orientionTurn.-1": "Turn right in place",
        "menu.wheel.1": "Left wheel (EM1)",
        "menu.wheel.2": "Right wheel (EM2)",
        "menu.wheel.0": "All",
        "menu.wheel2.1": "Left wheel (EM1)",
        "menu.wheel2.2": "Right wheel (EM2)",
        "menu.eulerElement.0": "Z-axis angle",
        "menu.eulerElement.1": "X-axis angle",
        "menu.eulerElement.2": "Y-axis angle",
        "menu.bleMode.BLE.MODE_BLE_SLAVE": "Peripheral mode",
        "menu.bleMode.BLE.MODE_BLE_MASTER": "Central mode",
        "block.start_thread": "main program",
        "block.start_run_thread": "when started",
        "group.1": "Onboard resources",
        "block.buzzer_tone_set": "Play tone [TONES] beat [RHYTHMS] mode [MODE]",
        "block.buzzer_tone_set_arg": "Play tone [TONES] beat [RHYTHMS] mode [MODE]",
        "block.buzzer_tone_set_volume": "Set buzzer volume to [VALUE]",
        "block.close_buzzer": "Turn off buzzer",
        "block.close_lowpower_warning": "Turn off low-voltage alarm",
        "block.get_battery_level": "Battery voltage (mV)",
        "group.2": "RGB LEDs",
        "block.set_led_color": "Set RGB LED color to [COLOR]",
        "block.set_led_color_arg": "Set RGB LED red [RED] green [GREEN] blue [BLUE]",
        "block.rgb_module_breath_one": "Set RGB LED breathing color [COLOR] cycle (0.5~20) [CYCLE] seconds",
        "block.rgb_module_breath": "Set RGB LED rainbow mode",
        "block.close_led": "Turn off RGB LEDs",
        "group.3": "Output",
        "block.print_str": "print text [STR]",
        "block.print_number": "print number [NUM]",
        "group.4": "Buttons",
        "block.when_key_click_thread": "When button [KEYS] is short-pressed",
        "block.when_key_longclick_thread": "When button [KEYS] is long-pressed",
        "block.key_is_pressed": "Button [KEYS] is pressed",
        "group.5": "Encoder motor control",
        "block.motor_speed_set": "Drive car [ORIENTION] at [SPEED] rpm",
        "block.set_motor_run_distance": "Drive car [ORIENTION] for [DISTANCE] cm at [SPEED] rpm",
        "block.set_motor_run_oriention_angle": "Turn car [TURN] by [ANGLE] degrees at [SPEED] rpm",
        "block.set_motor_run_speed": "Start [WHEEL] at [SPEED] rpm",
        "block.set_motor_run_angle": "Run [WHEEL] at [SPEED] rpm for [ANGLE] degrees",
        "block.set_motor_run_two_wheel": "Set left wheel (EM1) [SPEED] rpm and right wheel (EM2) [SPEED2] rpm",
        "block.set_motor_run_two_wheel_percent": "Set left wheel (EM1) power [SPEED] % and right wheel (EM2) power [SPEED2] %",
        "block.set_motor_stop": "Stop encoder motor [WHEEL]",
        "block.get_servo_run_angle": "Get degrees rotated by [WHEEL]",
        "block.reset_run_angle": "Reset degrees rotated by [WHEEL]",
        "block.pd_set_pd_line": "PD line following: offset [OFFSET] base speed [SPEED] max speed [MAXSPEED] Kp [KP] Kd [KD]",
        "group.6": "IMU sensor",
        "block.imu_init": "Initialize IMU sensor",
        "block.imu_cali": "Calibrate IMU sensor",
        "block.get_euler_angle_element_value": "Get device [VALUE]",
        "group.7": "Bluetooth communication",
        "block.set_ble_mode": "Set Bluetooth mode [MODE] name [NAME]",
        "block.ble_is_connected": "Bluetooth connected?",
        "block.get_ble_mac": "Get Bluetooth MAC address",
        "block.ble_wait_end": "Bluetooth received data contains [VALUE]?",
        "block.read_ble_data": "Read Bluetooth data",
        "block.get_ble_cmd": "Parse Bluetooth data [DATA] to get command",
        "block.get_ble_args": "Parse Bluetooth data [DATA] to get argument [NUM]",
        "block.ble_write": "Send Bluetooth data [DATA]"
    },
    "zh-tw": {
        "product.name": "AI機甲雙驅車",
        "menu.rhythms.500": "二分之一拍",
        "menu.rhythms.250": "四分之一拍",
        "menu.rhythms.125": "八分之一拍",
        "menu.rhythms.1000": "整拍",
        "menu.rhythms.2000": "雙拍",
        "menu.rhythms.5000": "長時間",
        "menu.rhythms.0": "停止",
        "menu.buzzerMode.False": "背景播放",
        "menu.buzzerMode.True": "前景播放（阻塞）",
        "menu.lightColors.0": "紅",
        "menu.lightColors.1": "綠",
        "menu.lightColors.2": "藍",
        "menu.lightColors.3": "黃",
        "menu.lightColors.4": "紫",
        "menu.lightColors.5": "青",
        "menu.lightColors.6": "白",
        "menu.oriention2.1": "前進",
        "menu.oriention2.-1": "後退",
        "menu.orientionTurn.1": "原地左轉",
        "menu.orientionTurn.-1": "原地右轉",
        "menu.wheel.1": "左輪（EM1）",
        "menu.wheel.2": "右輪（EM2）",
        "menu.wheel.0": "全部",
        "menu.wheel2.1": "左輪（EM1）",
        "menu.wheel2.2": "右輪（EM2）",
        "menu.eulerElement.0": "Z軸度數",
        "menu.eulerElement.1": "X軸度數",
        "menu.eulerElement.2": "Y軸度數",
        "menu.bleMode.BLE.MODE_BLE_SLAVE": "從機模式",
        "menu.bleMode.BLE.MODE_BLE_MASTER": "主機模式",
        "block.start_thread": "主程式",
        "block.start_run_thread": "當啟動時",
        "group.1": "板載資源",
        "block.buzzer_tone_set": "播放音調 [TONES] 節拍 [RHYTHMS] 模式 [MODE]",
        "block.buzzer_tone_set_arg": "播放音調 [TONES] 節拍 [RHYTHMS] 模式 [MODE]",
        "block.buzzer_tone_set_volume": "設定蜂鳴器音量為 [VALUE]",
        "block.close_buzzer": "關閉蜂鳴器",
        "block.close_lowpower_warning": "關閉低壓警報",
        "block.get_battery_level": "電量值（mV）",
        "group.2": "RGB彩燈",
        "block.set_led_color": "設定RGB彩燈顏色 [COLOR]",
        "block.set_led_color_arg": "設定RGB彩燈紅色 [RED] 綠色 [GREEN] 藍色 [BLUE]",
        "block.rgb_module_breath_one": "設定RGB彩燈呼吸燈模式 顏色 [COLOR] 變化週期（0.5~20）[CYCLE] 秒",
        "block.rgb_module_breath": "設定RGB彩燈炫彩模式",
        "block.close_led": "關閉RGB彩燈",
        "group.3": "輸出列印",
        "block.print_str": "輸出文字 [STR]",
        "block.print_number": "輸出數字 [NUM]",
        "group.4": "按鍵",
        "block.when_key_click_thread": "當 [KEYS] 鍵短按時",
        "block.when_key_longclick_thread": "當 [KEYS] 鍵長按時",
        "block.key_is_pressed": "[KEYS] 鍵被按下",
        "group.5": "編碼馬達控制",
        "block.motor_speed_set": "設定小車以 [SPEED] 轉/分鐘的轉速 [ORIENTION]",
        "block.set_motor_run_distance": "設定小車以 [SPEED] 轉/分鐘的轉速 [ORIENTION] [DISTANCE] 公分",
        "block.set_motor_run_oriention_angle": "設定小車以 [SPEED] 轉/分鐘的轉速 [TURN] [ANGLE] 度",
        "block.set_motor_run_speed": "設定 [WHEEL] 以 [SPEED] 轉/分鐘的轉速啟動",
        "block.set_motor_run_angle": "設定 [WHEEL] 以 [SPEED] 轉/分鐘的轉速運行 [ANGLE] 度",
        "block.set_motor_run_two_wheel": "設定左輪（EM1）轉速 [SPEED] 轉/分鐘、右輪（EM2）轉速 [SPEED2] 轉/分鐘",
        "block.set_motor_run_two_wheel_percent": "設定左輪（EM1）動力 [SPEED] %、右輪（EM2）動力 [SPEED2] %",
        "block.set_motor_stop": "停止編碼馬達 [WHEEL] 運行",
        "block.get_servo_run_angle": "取得 [WHEEL] 轉過的度數",
        "block.reset_run_angle": "重設 [WHEEL] 轉過的度數",
        "block.pd_set_pd_line": "設定小車進行PD調節循線（偏差值 [OFFSET] 基礎速度 [SPEED] 最大速度 [MAXSPEED] Kp值 [KP] Kd值 [KD]）",
        "group.6": "IMU感測器",
        "block.imu_init": "初始化IMU感測器",
        "block.imu_cali": "校正IMU感測器",
        "block.get_euler_angle_element_value": "取得裝置 [VALUE]",
        "group.7": "藍牙通訊",
        "block.set_ble_mode": "設定藍牙模式 [MODE] 名稱 [NAME]",
        "block.ble_is_connected": "藍牙是否已連線",
        "block.get_ble_mac": "取得藍牙MAC位址",
        "block.ble_wait_end": "藍牙收到的資料是否包含 [VALUE]",
        "block.read_ble_data": "讀取藍牙資料",
        "block.get_ble_cmd": "解析藍牙資料 [DATA] 取得命令",
        "block.get_ble_args": "解析藍牙資料 [DATA] 取得參數 [NUM]",
        "block.ble_write": "藍牙傳送資料 [DATA]"
    },
    "ko": {
        "product.name": "AI 메카 2륜 구동 자동차",
        "menu.rhythms.500": "2분음표",
        "menu.rhythms.250": "4분음표",
        "menu.rhythms.125": "8분음표",
        "menu.rhythms.1000": "온박",
        "menu.rhythms.2000": "두 박",
        "menu.rhythms.5000": "긴 시간",
        "menu.rhythms.0": "정지",
        "menu.buzzerMode.False": "백그라운드 재생",
        "menu.buzzerMode.True": "포그라운드 재생(대기)",
        "menu.lightColors.0": "빨강",
        "menu.lightColors.1": "초록",
        "menu.lightColors.2": "파랑",
        "menu.lightColors.3": "노랑",
        "menu.lightColors.4": "보라",
        "menu.lightColors.5": "청록",
        "menu.lightColors.6": "하양",
        "menu.oriention2.1": "전진",
        "menu.oriention2.-1": "후진",
        "menu.orientionTurn.1": "제자리에서 왼쪽 회전",
        "menu.orientionTurn.-1": "제자리에서 오른쪽 회전",
        "menu.wheel.1": "왼쪽 바퀴(EM1)",
        "menu.wheel.2": "오른쪽 바퀴(EM2)",
        "menu.wheel.0": "전체",
        "menu.wheel2.1": "왼쪽 바퀴(EM1)",
        "menu.wheel2.2": "오른쪽 바퀴(EM2)",
        "menu.eulerElement.0": "Z축 각도",
        "menu.eulerElement.1": "X축 각도",
        "menu.eulerElement.2": "Y축 각도",
        "menu.bleMode.BLE.MODE_BLE_SLAVE": "주변 장치 모드",
        "menu.bleMode.BLE.MODE_BLE_MASTER": "중앙 장치 모드",
        "block.start_thread": "주 프로그램",
        "block.start_run_thread": "시작할 때",
        "group.1": "온보드 리소스",
        "block.buzzer_tone_set": "음 [TONES] 박자 [RHYTHMS] 모드 [MODE] 재생",
        "block.buzzer_tone_set_arg": "음 [TONES] 박자 [RHYTHMS] 모드 [MODE] 재생",
        "block.buzzer_tone_set_volume": "부저 음량을 [VALUE]로 설정",
        "block.close_buzzer": "부저 끄기",
        "block.close_lowpower_warning": "저전압 경보 끄기",
        "block.get_battery_level": "배터리 전압(mV)",
        "group.2": "RGB LED",
        "block.set_led_color": "RGB LED 색상을 [COLOR]로 설정",
        "block.set_led_color_arg": "RGB LED 빨강 [RED] 초록 [GREEN] 파랑 [BLUE] 설정",
        "block.rgb_module_breath_one": "RGB LED 숨쉬기 색상 [COLOR] 주기(0.5~20) [CYCLE]초 설정",
        "block.rgb_module_breath": "RGB LED 무지개 모드 설정",
        "block.close_led": "RGB LED 끄기",
        "group.3": "출력",
        "block.print_str": "텍스트 [STR] 출력",
        "block.print_number": "숫자 [NUM] 출력",
        "group.4": "버튼",
        "block.when_key_click_thread": "[KEYS] 버튼을 짧게 눌렀을 때",
        "block.when_key_longclick_thread": "[KEYS] 버튼을 길게 눌렀을 때",
        "block.key_is_pressed": "[KEYS] 버튼이 눌렸는가",
        "group.5": "엔코더 모터 제어",
        "block.motor_speed_set": "자동차를 [SPEED]rpm으로 [ORIENTION] 이동",
        "block.set_motor_run_distance": "자동차를 [SPEED]rpm으로 [ORIENTION] [DISTANCE]cm 이동",
        "block.set_motor_run_oriention_angle": "자동차를 [SPEED]rpm으로 [TURN] [ANGLE]도 회전",
        "block.set_motor_run_speed": "[WHEEL]을 [SPEED]rpm으로 시작",
        "block.set_motor_run_angle": "[WHEEL]을 [SPEED]rpm으로 [ANGLE]도 회전",
        "block.set_motor_run_two_wheel": "왼쪽 바퀴(EM1) [SPEED]rpm, 오른쪽 바퀴(EM2) [SPEED2]rpm 설정",
        "block.set_motor_run_two_wheel_percent": "왼쪽 바퀴(EM1) 출력 [SPEED] %, 오른쪽 바퀴(EM2) 출력 [SPEED2] % 설정",
        "block.set_motor_stop": "엔코더 모터 [WHEEL] 정지",
        "block.get_servo_run_angle": "[WHEEL]의 회전 각도 읽기",
        "block.reset_run_angle": "[WHEEL]의 회전 각도 초기화",
        "block.pd_set_pd_line": "PD 라인 추적: 편차 [OFFSET] 기본 속도 [SPEED] 최대 속도 [MAXSPEED] Kp [KP] Kd [KD]",
        "group.6": "IMU 센서",
        "block.imu_init": "IMU 센서 초기화",
        "block.imu_cali": "IMU 센서 보정",
        "block.get_euler_angle_element_value": "장치 [VALUE] 읽기",
        "group.7": "블루투스 통신",
        "block.set_ble_mode": "블루투스 모드 [MODE] 이름 [NAME] 설정",
        "block.ble_is_connected": "블루투스가 연결되었는가",
        "block.get_ble_mac": "블루투스 MAC 주소 읽기",
        "block.ble_wait_end": "블루투스 수신 데이터에 [VALUE]이 포함되어 있는가",
        "block.read_ble_data": "블루투스 데이터 읽기",
        "block.get_ble_cmd": "블루투스 데이터 [DATA]에서 명령 추출",
        "block.get_ble_args": "블루투스 데이터 [DATA]에서 매개변수 [NUM] 추출",
        "block.ble_write": "블루투스 데이터 [DATA] 전송"
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

export default class AimechBlocks implements NativeExtension {
    constructor (private readonly context: ExtensionContext) {}

    getInfo (): ExtensionInfo {
        return {
            id: "aimech",
            name: this.context.t(product.name),
            color1: "#1874cd",
            color2: "#1874cd",
            color3: "#1874cd",
            menus: {
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
                buzzerMode: {
                    acceptReporters: false,
                    items: [
                        {
                            text: this.context.t("menu.buzzerMode.False"),
                            value: "False"
                        },
                        {
                            text: this.context.t("menu.buzzerMode.True"),
                            value: "True"
                        }
                    ]
                },
                lightColors: {
                    acceptReporters: false,
                    items: [
                        {
                            text: this.context.t("menu.lightColors.0"),
                            value: "0"
                        },
                        {
                            text: this.context.t("menu.lightColors.1"),
                            value: "1"
                        },
                        {
                            text: this.context.t("menu.lightColors.2"),
                            value: "2"
                        },
                        {
                            text: this.context.t("menu.lightColors.3"),
                            value: "3"
                        },
                        {
                            text: this.context.t("menu.lightColors.4"),
                            value: "4"
                        },
                        {
                            text: this.context.t("menu.lightColors.5"),
                            value: "5"
                        },
                        {
                            text: this.context.t("menu.lightColors.6"),
                            value: "6"
                        }
                    ]
                },
                keys: {
                    acceptReporters: false,
                    items: [
                        {
                            text: "A",
                            value: "A"
                        },
                        {
                            text: "B",
                            value: "B"
                        }
                    ]
                },
                oriention2: {
                    acceptReporters: false,
                    items: [
                        {
                            text: this.context.t("menu.oriention2.1"),
                            value: "1"
                        },
                        {
                            text: this.context.t("menu.oriention2.-1"),
                            value: "-1"
                        }
                    ]
                },
                orientionTurn: {
                    acceptReporters: false,
                    items: [
                        {
                            text: this.context.t("menu.orientionTurn.1"),
                            value: "1"
                        },
                        {
                            text: this.context.t("menu.orientionTurn.-1"),
                            value: "-1"
                        }
                    ]
                },
                wheel: {
                    acceptReporters: false,
                    items: [
                        {
                            text: this.context.t("menu.wheel.1"),
                            value: "1"
                        },
                        {
                            text: this.context.t("menu.wheel.2"),
                            value: "2"
                        },
                        {
                            text: this.context.t("menu.wheel.0"),
                            value: "0"
                        }
                    ]
                },
                wheel2: {
                    acceptReporters: false,
                    items: [
                        {
                            text: this.context.t("menu.wheel2.1"),
                            value: "1"
                        },
                        {
                            text: this.context.t("menu.wheel2.2"),
                            value: "2"
                        }
                    ]
                },
                eulerElement: {
                    acceptReporters: false,
                    items: [
                        {
                            text: this.context.t("menu.eulerElement.0"),
                            value: "0"
                        },
                        {
                            text: this.context.t("menu.eulerElement.1"),
                            value: "1"
                        },
                        {
                            text: this.context.t("menu.eulerElement.2"),
                            value: "2"
                        }
                    ]
                },
                bleMode: {
                    acceptReporters: false,
                    items: [
                        {
                            text: this.context.t("menu.bleMode.BLE.MODE_BLE_SLAVE"),
                            value: "BLE.MODE_BLE_SLAVE"
                        },
                        {
                            text: this.context.t("menu.bleMode.BLE.MODE_BLE_MASTER"),
                            value: "BLE.MODE_BLE_MASTER"
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
                        MODE: {
                            type: "string",
                            defaultValue: "False",
                            menu: "buzzerMode",
                            literal: true
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
                        MODE: {
                            type: "string",
                            defaultValue: "False",
                            menu: "buzzerMode",
                            literal: true
                        }
                    }
                },
                {
                    opcode: "buzzer_tone_set_volume",
                    blockType: "command",
                    text: this.context.t("block.buzzer_tone_set_volume"),
                    arguments: {
                        VALUE: {
                            type: "slider",
                            defaultValue: 100
                        }
                    }
                },
                {
                    opcode: "close_buzzer",
                    blockType: "command",
                    text: this.context.t("block.close_buzzer"),
                    arguments: {}
                },
                {
                    opcode: "close_lowpower_warning",
                    blockType: "command",
                    text: this.context.t("block.close_lowpower_warning"),
                    arguments: {}
                },
                {
                    opcode: "get_battery_level",
                    blockType: "reporter",
                    text: this.context.t("block.get_battery_level"),
                    disableMonitor: true,
                    arguments: {}
                },
                {
                    subCategory: this.context.t("group.2")
                },
                {
                    opcode: "set_led_color",
                    blockType: "command",
                    text: this.context.t("block.set_led_color"),
                    arguments: {
                        COLOR: {
                            type: "square_color",
                            defaultValue: "#ff0000"
                        }
                    }
                },
                {
                    opcode: "set_led_color_arg",
                    blockType: "command",
                    text: this.context.t("block.set_led_color_arg"),
                    arguments: {
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
                    }
                },
                {
                    opcode: "rgb_module_breath_one",
                    blockType: "command",
                    text: this.context.t("block.rgb_module_breath_one"),
                    arguments: {
                        COLOR: {
                            type: "string",
                            defaultValue: "0",
                            menu: "lightColors",
                            literal: true
                        },
                        CYCLE: {
                            type: "number",
                            defaultValue: 1
                        }
                    }
                },
                {
                    opcode: "rgb_module_breath",
                    blockType: "command",
                    text: this.context.t("block.rgb_module_breath"),
                    arguments: {}
                },
                {
                    opcode: "close_led",
                    blockType: "command",
                    text: this.context.t("block.close_led"),
                    arguments: {}
                },
                {
                    subCategory: this.context.t("group.3")
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
                    subCategory: this.context.t("group.4")
                },
                {
                    opcode: "when_key_click_thread",
                    blockType: "hat",
                    text: this.context.t("block.when_key_click_thread"),
                    isEdgeActivated: false,
                    arguments: {
                        KEYS: {
                            type: "string",
                            defaultValue: "A",
                            menu: "keys",
                            literal: true
                        }
                    }
                },
                {
                    opcode: "when_key_longclick_thread",
                    blockType: "hat",
                    text: this.context.t("block.when_key_longclick_thread"),
                    isEdgeActivated: false,
                    arguments: {
                        KEYS: {
                            type: "string",
                            defaultValue: "A",
                            menu: "keys",
                            literal: true
                        }
                    }
                },
                {
                    opcode: "key_is_pressed",
                    blockType: "Boolean",
                    text: this.context.t("block.key_is_pressed"),
                    disableMonitor: true,
                    arguments: {
                        KEYS: {
                            type: "string",
                            defaultValue: "A",
                            menu: "keys",
                            literal: true
                        }
                    }
                },
                {
                    subCategory: this.context.t("group.5")
                },
                {
                    opcode: "motor_speed_set",
                    blockType: "command",
                    text: this.context.t("block.motor_speed_set"),
                    arguments: {
                        SPEED: {
                            type: "slider150",
                            defaultValue: 60
                        },
                        ORIENTION: {
                            type: "string",
                            defaultValue: "1",
                            menu: "oriention2",
                            literal: true
                        }
                    }
                },
                {
                    opcode: "set_motor_run_distance",
                    blockType: "command",
                    text: this.context.t("block.set_motor_run_distance"),
                    arguments: {
                        SPEED: {
                            type: "slider150",
                            defaultValue: 60
                        },
                        ORIENTION: {
                            type: "string",
                            defaultValue: "1",
                            menu: "oriention2",
                            literal: true
                        },
                        DISTANCE: {
                            type: "number",
                            defaultValue: 100
                        }
                    }
                },
                {
                    opcode: "set_motor_run_oriention_angle",
                    blockType: "command",
                    text: this.context.t("block.set_motor_run_oriention_angle"),
                    arguments: {
                        SPEED: {
                            type: "slider150",
                            defaultValue: 60
                        },
                        TURN: {
                            type: "string",
                            defaultValue: "1",
                            menu: "orientionTurn",
                            literal: true
                        },
                        ANGLE: {
                            type: "number",
                            defaultValue: 90
                        }
                    }
                },
                {
                    opcode: "set_motor_run_speed",
                    blockType: "command",
                    text: this.context.t("block.set_motor_run_speed"),
                    arguments: {
                        WHEEL: {
                            type: "string",
                            defaultValue: "1",
                            menu: "wheel",
                            literal: true
                        },
                        SPEED: {
                            type: "slider150p",
                            defaultValue: 60
                        }
                    }
                },
                {
                    opcode: "set_motor_run_angle",
                    blockType: "command",
                    text: this.context.t("block.set_motor_run_angle"),
                    arguments: {
                        WHEEL: {
                            type: "string",
                            defaultValue: "1",
                            menu: "wheel",
                            literal: true
                        },
                        SPEED: {
                            type: "slider150",
                            defaultValue: 60
                        },
                        ANGLE: {
                            type: "number",
                            defaultValue: 180
                        }
                    }
                },
                {
                    opcode: "set_motor_run_two_wheel",
                    blockType: "command",
                    text: this.context.t("block.set_motor_run_two_wheel"),
                    arguments: {
                        SPEED: {
                            type: "slider150p",
                            defaultValue: 60
                        },
                        SPEED2: {
                            type: "slider150p",
                            defaultValue: 60
                        }
                    }
                },
                {
                    opcode: "set_motor_run_two_wheel_percent",
                    blockType: "command",
                    text: this.context.t("block.set_motor_run_two_wheel_percent"),
                    arguments: {
                        SPEED: {
                            type: "slider100",
                            defaultValue: 25
                        },
                        SPEED2: {
                            type: "slider100",
                            defaultValue: 25
                        }
                    }
                },
                {
                    opcode: "set_motor_stop",
                    blockType: "command",
                    text: this.context.t("block.set_motor_stop"),
                    arguments: {
                        WHEEL: {
                            type: "string",
                            defaultValue: "1",
                            menu: "wheel",
                            literal: true
                        }
                    }
                },
                {
                    opcode: "get_servo_run_angle",
                    blockType: "reporter",
                    text: this.context.t("block.get_servo_run_angle"),
                    disableMonitor: true,
                    arguments: {
                        WHEEL: {
                            type: "string",
                            defaultValue: "1",
                            menu: "wheel2",
                            literal: true
                        }
                    }
                },
                {
                    opcode: "reset_run_angle",
                    blockType: "command",
                    text: this.context.t("block.reset_run_angle"),
                    arguments: {
                        WHEEL: {
                            type: "string",
                            defaultValue: "1",
                            menu: "wheel",
                            literal: true
                        }
                    }
                },
                {
                    opcode: "pd_set_pd_line",
                    blockType: "command",
                    text: this.context.t("block.pd_set_pd_line"),
                    arguments: {
                        OFFSET: {
                            type: "number",
                            defaultValue: 0
                        },
                        SPEED: {
                            type: "number",
                            defaultValue: 50
                        },
                        MAXSPEED: {
                            type: "number",
                            defaultValue: 150
                        },
                        KP: {
                            type: "number",
                            defaultValue: 20
                        },
                        KD: {
                            type: "number",
                            defaultValue: 10
                        }
                    }
                },
                {
                    subCategory: this.context.t("group.6")
                },
                {
                    opcode: "imu_init",
                    blockType: "command",
                    text: this.context.t("block.imu_init"),
                    arguments: {}
                },
                {
                    opcode: "imu_cali",
                    blockType: "command",
                    text: this.context.t("block.imu_cali"),
                    arguments: {}
                },
                {
                    opcode: "get_euler_angle_element_value",
                    blockType: "reporter",
                    text: this.context.t("block.get_euler_angle_element_value"),
                    disableMonitor: true,
                    arguments: {
                        VALUE: {
                            type: "string",
                            defaultValue: "0",
                            menu: "eulerElement",
                            literal: true
                        }
                    }
                },
                {
                    subCategory: this.context.t("group.7")
                },
                {
                    opcode: "set_ble_mode",
                    blockType: "command",
                    text: this.context.t("block.set_ble_mode"),
                    arguments: {
                        MODE: {
                            type: "string",
                            defaultValue: "BLE.MODE_BLE_SLAVE",
                            menu: "bleMode",
                            literal: true
                        },
                        NAME: {
                            type: "string",
                            defaultValue: "aimech"
                        }
                    }
                },
                {
                    opcode: "ble_is_connected",
                    blockType: "Boolean",
                    text: this.context.t("block.ble_is_connected"),
                    disableMonitor: true,
                    arguments: {}
                },
                {
                    opcode: "get_ble_mac",
                    blockType: "reporter",
                    text: this.context.t("block.get_ble_mac"),
                    disableMonitor: true,
                    arguments: {}
                },
                {
                    opcode: "ble_wait_end",
                    blockType: "Boolean",
                    text: this.context.t("block.ble_wait_end"),
                    disableMonitor: true,
                    arguments: {
                        VALUE: {
                            type: "string",
                            defaultValue: "CMD"
                        }
                    }
                },
                {
                    opcode: "read_ble_data",
                    blockType: "reporter",
                    text: this.context.t("block.read_ble_data"),
                    disableMonitor: true,
                    arguments: {}
                },
                {
                    opcode: "get_ble_cmd",
                    blockType: "reporter",
                    text: this.context.t("block.get_ble_cmd"),
                    disableMonitor: true,
                    arguments: {
                        DATA: {
                            type: "string",
                            defaultValue: "0"
                        }
                    }
                },
                {
                    opcode: "get_ble_args",
                    blockType: "reporter",
                    text: this.context.t("block.get_ble_args"),
                    disableMonitor: true,
                    arguments: {
                        DATA: {
                            type: "string",
                            defaultValue: "0"
                        },
                        NUM: {
                            type: "number",
                            defaultValue: 1
                        }
                    }
                },
                {
                    opcode: "ble_write",
                    blockType: "command",
                    text: this.context.t("block.ble_write"),
                    arguments: {
                        DATA: {
                            type: "string",
                            defaultValue: "CMD"
                        }
                    }
                }
            ]
        };
    }

    // 主程序收尾、事件回调和菜单分支直接交给 Python 生成器处理。
    getPython (): Record<string, PythonTemplate> {
        return {
            start_thread: {
                template: "",
                imports: [
                    "import Hiwonder",
                    "import time",
                    "import Hiwonder_DEV"
                ],
                launcher: "Hiwonder.startMain({MAIN})",
                section: "main"
            },
            start_run_thread: {
                template: "",
                imports: [
                    "import Hiwonder",
                    "import time",
                    "import Hiwonder_DEV"
                ],
                section: "setup"
            },
            buzzer_tone_set: {
                template: "beep.playTone({TONES},{RHYTHMS},{MODE})",
                imports: [
                    "import Hiwonder"
                ],
                variables: [
                    "beep = Hiwonder.Buzzer()"
                ]
            },
            buzzer_tone_set_arg: {
                template: "beep.playTone({TONES},{RHYTHMS},{MODE})",
                imports: [
                    "import Hiwonder"
                ],
                variables: [
                    "beep = Hiwonder.Buzzer()"
                ]
            },
            buzzer_tone_set_volume: {
                template: "beep.setVolume({VALUE})",
                imports: [
                    "import Hiwonder"
                ],
                variables: [
                    "beep = Hiwonder.Buzzer()"
                ]
            },
            close_buzzer: {
                template: "beep.onoff(False)",
                imports: [
                    "import Hiwonder"
                ],
                variables: [
                    "beep = Hiwonder.Buzzer()"
                ]
            },
            close_lowpower_warning: {
                template: "Hiwonder.disableLowPowerAlarm()",
                imports: [
                    "import Hiwonder"
                ]
            },
            get_battery_level: {
                template: "Hiwonder.Battery_power()",
                imports: [
                    "import Hiwonder"
                ]
            },
            set_led_color: {
                template: "rgb.setRGB(0,{COLOR.rgb})",
                imports: [
                    "import Hiwonder"
                ],
                variables: [
                    "rgb = Hiwonder.RGB()"
                ]
            },
            set_led_color_arg: {
                template: "rgb.setRGB(0,{RED},{GREEN},{BLUE})",
                imports: [
                    "import Hiwonder"
                ],
                variables: [
                    "rgb = Hiwonder.RGB()"
                ]
            },
            rgb_module_breath_one: {
                template: "rgb.set_Breathing({COLOR},{CYCLE})",
                imports: [
                    "import Hiwonder"
                ],
                variables: [
                    "rgb = Hiwonder.RGB()"
                ]
            },
            rgb_module_breath: {
                template: "rgb.setRGBBreathingValue(5,10,15)",
                imports: [
                    "import Hiwonder"
                ],
                variables: [
                    "rgb = Hiwonder.RGB()"
                ]
            },
            close_led: {
                template: "rgb.setRGB(0,0,0,0)"
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
            when_key_click_thread: {
                template: "",
                imports: [
                    "import Hiwonder",
                    "import time",
                    "import Hiwonder_DEV"
                ],
                variables: [
                    "button{KEYS} = Hiwonder.Button('{KEYS}')"
                ],
                entryTemplate: "def on_button{KEYS}_clicked():",
                entryFooter: "button{KEYS}.Clicked(on_button{KEYS}_clicked)",
                section: "main"
            },
            when_key_longclick_thread: {
                template: "",
                imports: [
                    "import Hiwonder",
                    "import time",
                    "import Hiwonder_DEV"
                ],
                variables: [
                    "button{KEYS} = Hiwonder.Button('{KEYS}')"
                ],
                entryTemplate: "def on_button{KEYS}_longpressed():",
                entryFooter: "button{KEYS}.Longpressed(on_button{KEYS}_longpressed)",
                section: "main"
            },
            key_is_pressed: {
                template: "button{KEYS}.read()",
                imports: [
                    "import Hiwonder"
                ],
                variables: [
                    "button{KEYS} = Hiwonder.Button('{KEYS}')"
                ]
            },
            motor_speed_set: {
                template: "motor.run_rpm({SPEED}*{ORIENTION})",
                imports: [
                    "import Hiwonder"
                ],
                variables: [
                    "motor = Hiwonder.Car()"
                ]
            },
            set_motor_run_distance: {
                template: "motor.run_distance({DISTANCE}*{ORIENTION},{SPEED})",
                imports: [
                    "import Hiwonder"
                ],
                variables: [
                    "motor = Hiwonder.Car()"
                ]
            },
            set_motor_run_oriention_angle: {
                template: "motor.turn_angle({ANGLE}*{TURN},{SPEED})",
                imports: [
                    "import Hiwonder"
                ],
                variables: [
                    "motor = Hiwonder.Car()"
                ]
            },
            set_motor_run_speed: {
                template: "motor.motor_run_rpm({WHEEL},{SPEED})",
                imports: [
                    "import Hiwonder"
                ],
                variables: [
                    "motor = Hiwonder.Car()"
                ],
                templateSelector: {
                    argument: "WHEEL",
                    cases: {
                        "0": "motor.motors_run_rpm({SPEED},{SPEED})"
                    }
                }
            },
            set_motor_run_angle: {
                template: "motor.motor_run_angle({WHEEL},{ANGLE},{SPEED})",
                imports: [
                    "import Hiwonder"
                ],
                variables: [
                    "motor = Hiwonder.Car()"
                ],
                templateSelector: {
                    argument: "WHEEL",
                    cases: {
                        "0": `motor.motor_run_angle(1,{ANGLE},{SPEED})
motor.motor_run_angle(2,{ANGLE},{SPEED})`
                    }
                }
            },
            set_motor_run_two_wheel: {
                template: "motor.motors_run_rpm({SPEED},{SPEED2})",
                imports: [
                    "import Hiwonder"
                ],
                variables: [
                    "motor = Hiwonder.Car()"
                ]
            },
            set_motor_run_two_wheel_percent: {
                template: "motor.motors_run_rpm({SPEED}*1.5,{SPEED2}*1.5)",
                imports: [
                    "import Hiwonder"
                ],
                variables: [
                    "motor = Hiwonder.Car()"
                ]
            },
            set_motor_stop: {
                template: "motor.stop({WHEEL})",
                imports: [
                    "import Hiwonder"
                ],
                variables: [
                    "motor = Hiwonder.Car()"
                ]
            },
            get_servo_run_angle: {
                template: "motor.get_motor_angle({WHEEL})",
                imports: [
                    "import Hiwonder"
                ],
                variables: [
                    "motor = Hiwonder.Car()"
                ]
            },
            reset_run_angle: {
                template: "motor.reset_motor_angle({WHEEL})",
                imports: [
                    "import Hiwonder"
                ],
                variables: [
                    "motor = Hiwonder.Car()"
                ],
                templateSelector: {
                    argument: "WHEEL",
                    cases: {
                        "0": `motor.reset_motor_angle(1)
motor.reset_motor_angle(2)`
                    }
                }
            },
            pd_set_pd_line: {
                template: "motor.pd_set_speed({OFFSET},{SPEED},{MAXSPEED},{KP},{KD})",
                imports: [
                    "import Hiwonder"
                ],
                variables: [
                    "motor = Hiwonder.Car()"
                ]
            },
            imu_init: {
                template: "",
                imports: [
                    "import Hiwonder"
                ],
                variables: [
                    "imu = Hiwonder.IMU()"
                ]
            },
            imu_cali: {
                template: "",
                imports: [
                    "import Hiwonder"
                ],
                variables: [
                    "buttonA = Hiwonder.Button('A')",
                    `def is_stop_3091ratyxq():
  return buttonA.read()`
                ],
                forcedVariables: [
                    {
                        name: "imu",
                        code: "imu = Hiwonder.IMU(True, is_stop_3091ratyxq)"
                    }
                ]
            },
            get_euler_angle_element_value: {
                template: "imu.get_angle()[{VALUE}]"
            },
            set_ble_mode: {
                template: "",
                imports: [
                    "from Hiwonder_BLE import BLE"
                ],
                variables: [
                    "ble = BLE({MODE},{NAME})"
                ]
            },
            ble_is_connected: {
                template: "ble.is_connected()"
            },
            get_ble_mac: {
                template: "ble.get_mac()"
            },
            ble_wait_end: {
                template: "ble.contains_data({VALUE})"
            },
            read_ble_data: {
                template: "ble.read_uart_cmd()"
            },
            get_ble_cmd: {
                template: "ble.parse_uart_cmd({DATA})[0]"
            },
            get_ble_args: {
                template: "ble.parse_uart_cmd({DATA})[{NUM}]"
            },
            ble_write: {
                template: "ble.send_data({DATA})"
            }
        };
    }
}
