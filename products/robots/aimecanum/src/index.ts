import type {ExtensionContext, ExtensionInfo, NativeExtension, PythonTemplate} from '../../../../tools/sdk';

// 产品积木、菜单、集中 i18n 文案及 Python 规则在本文件维护。
export const messages = {
    "zh-cn": {
        "product.name": "AI机甲麦轮车",
        "menu.rhythms.500": "二分之一",
        "menu.rhythms.250": "四分之一",
        "menu.rhythms.125": "八分之一",
        "menu.rhythms.1000": "整拍",
        "menu.rhythms.2000": "双拍",
        "menu.rhythms.5000": "长时间",
        "menu.rhythms.0": "停止",
        "menu.buzzerMode.False": "后台播放",
        "menu.buzzerMode.True": "前台播放(阻塞式)",
        "menu.wheels.4": "左前",
        "menu.wheels.3": "左后",
        "menu.wheels.2": "右前",
        "menu.wheels.1": "右后",
        "menu.wheelMotors.4": "左前轮(EM4)",
        "menu.wheelMotors.3": "左后轮(EM3)",
        "menu.wheelMotors.2": "右前轮(EM2)",
        "menu.wheelMotors.1": "右后轮(EM1)",
        "menu.sides.0": "左侧",
        "menu.sides.1": "右侧",
        "menu.lightColors.0": "红",
        "menu.lightColors.1": "绿",
        "menu.lightColors.2": "蓝",
        "menu.lightColors.3": "黄",
        "menu.lightColors.4": "紫",
        "menu.lightColors.5": "青",
        "menu.lightColors.6": "白",
        "menu.oriention8.0": "↑",
        "menu.oriention8.180": "↓",
        "menu.oriention8.90": "←",
        "menu.oriention8.-90": "→",
        "menu.oriention8.45": "↖",
        "menu.oriention8.-45": "↗",
        "menu.oriention8.135": "↙",
        "menu.oriention8.-135": "↘",
        "menu.oriention4.0": "前",
        "menu.oriention4.180": "后",
        "menu.oriention4.90": "左",
        "menu.oriention4.-90": "右",
        "menu.orientionTurn.1": "原地左转",
        "menu.orientionTurn.-1": "原地右转",
        "menu.eulerElement.0": "Z轴数据",
        "menu.eulerElement.1": "X轴数据",
        "menu.eulerElement.2": "Y轴数据",
        "menu.line6Sensor.LF1": "前置",
        "menu.line6Sensor.LF2": "后置",
        "menu.linedot2.== 0": "◌",
        "menu.linedot2.> 0": "●",
        "menu.moveDirection.1": "前进",
        "menu.moveDirection.-1": "后退",
        "menu.nums.0": "全部",
        "menu.ultrasonicNums.0": "所有",
        "menu.rgb.1": "红色",
        "menu.rgb.2": "绿色",
        "menu.rgb.3": "蓝色",
        "menu.bleMode.BLE.MODE_BLE_SLAVE": "从机模式",
        "menu.bleMode.BLE.MODE_BLE_MASTER": "主机模式",
        "block.start_thread": "主程序",
        "block.start_run_thread": "当启动时",
        "block.wait_seconds": "等待 [SECONDS] 秒",
        "group.1": "板载资源",
        "block.buzzer_tone_set": "播放音调为 [TONES] 节拍为 [RHYTHMS] 模式为 [MODE]",
        "block.buzzer_tone_set_arg": "播放音调为 [TONES] 节拍为 [RHYTHMS] 模式为 [MODE]",
        "block.buzzer_tone_set_volume": "蜂鸣器设置音量大小 [VALUE]",
        "block.close_buzzer": "关闭蜂鸣器",
        "block.close_lowpower_warning": "关闭低压报警",
        "block.get_battery_level": "电量值(mV)",
        "group.2": "RGB彩灯",
        "block.set_led_color": "设置RGB彩灯 [NUMS] 颜色 [COLOR]",
        "block.set_led_color_arg": "设置RGB彩灯红色 [RED] 绿色 [GREEN] 蓝色 [BLUE]",
        "block.rgb_module_breath_one": "设置RGB彩灯呼吸灯模式,颜色 [COLOR] 变化周期(0.5~20) [CYCLE] 秒",
        "block.rgb_module_breath": "设置RGB彩灯炫彩模式",
        "block.close_led": "关闭RGB彩灯 [NUMS]",
        "group.3": "输出打印",
        "block.print_str": "输出字符 [STR]",
        "block.print_number": "输出数字 [NUM]",
        "group.4": "按键",
        "block.when_key_click_thread": "当 [KEYS] 键短按时",
        "block.when_key_longclick_thread": "当 [KEYS] 键长按时",
        "block.key_is_pressed": "[KEYS] 键被按下",
        "group.5": "运动控制",
        "block.set_motor_speed_all": "设置麦轮小车左前轮 [SPEED1], 左后轮 [SPEED2], 右前轮 [SPEED3], 右后轮 [SPEED4] 转/分钟",
        "block.set_motor_speed_one": "设置麦轮小车 [WHEEL] 轮速度为 [SPEED] 转/分钟",
        "block.set_motor_speed_two": "设置麦轮小车 [SIDE] 轮组速度为 [SPEED] 转/分钟",
        "block.move_oriention": "设置麦轮小车以 [SPEED] 转/分钟的速度面向 [ORIENTION] 方向移动",
        "block.move_oriention_angle": "设置麦轮小车以 [SPEED] 转/分钟的速度面向 [ORIENTION] 度方向移动",
        "block.set_x_y_speed": "设置麦轮小车X轴速度 [SPEED1], Y轴速度 [SPEED2]",
        "block.move_stop": "设置麦轮小车停止",
        "block.move_distance": "设置麦轮小车以 [SPEED] 转/分钟的转速向 [ORIENTION] 移动 [DISTANCE] 厘米",
        "block.move_distance_arg": "设置麦轮小车以 [SPEED] 转/分钟的转速向 [ORIENTION] 度方向平移 [DISTANCE] 厘米",
        "block.move_all": "设置麦轮小车以 [SPEED] %的动力面向 [ORIENTION] 方向移动",
        "block.move_all_angle": "设置麦轮小车以 [SPEED] %的动力面向 [ORIENTION] 度方向移动",
        "block.turn_percent": "设置麦轮小车以 [SPEED] %的动力 [ORIENTION]",
        "block.turn_speed": "设置麦轮小车以 [SPEED] 转/分钟的转速 [ORIENTION]",
        "block.get_motor_angle": "获取电机 [ID] 转过的度数",
        "block.reset_motor": "重置底盘",
        "block.is_motor_ready": "电机 [ID] 运动完成？",
        "block.is_all_ready": "所有电机是否都运动完成？",
        "block.pd_set_pd_line": "设置小车进行PD调节巡线（偏差值 [OFFSET] 基础速度 [SPEED] 最大速度 [MAXSPEED] Kp值 [KP] Kd值 [KD] 运动方向 [ORIENTION]）",
        "group.6": "IMU传感器",
        "block.imu_init": "初始化IMU传感器",
        "block.imu_cali": "校准IMU传感器",
        "block.get_euler_angle_element_value": "获取设备 [VALUE]",
        "group.7": "六路巡线传感器",
        "block.linefollower6_one_status": "[SENSOR] 六路巡线传感器通道 [NUM] 识别到 [LINE]",
        "block.linefollower6_status": "[SENSOR] 六路巡线传感器通道识别到 [LINE]",
        "block.linefollower6_set_threshold": "设置 [SENSOR] 六路巡线传感器的阈值比例(范围1~9)为 [VALUE]",
        "block.linefollower6_get_value": "[SENSOR] 六路巡线传感器通道 [NUM] 灰度值(0~100)",
        "block.linefollower6_read_offset": "获取 [SENSOR] 六路巡线传感器偏差值",
        "group.8": "超声波传感器",
        "block.get_led_ultrasonic_distance": "超声波传感器检测到障碍物距离(cm)",
        "block.set_led_ultrasonic_color": "设置超声波传感器彩灯 [NUMS] 颜色 [COLOR]",
        "block.set_led_ultrasonic_color_arg": "设置超声波传感器彩灯 [NUMS] 红色 [RED] 绿色 [GREEN] 蓝色 [BLUE]",
        "block.close_led_ultrasonic": "关闭超声波传感器彩灯 [NUMS]",
        "block.set_led_ultrasonic_breath": "设置超声波传感器彩灯 [NUM] [RGB] 周期 [TIME] 秒",
        "block.set_led_ultrasonic_random": "设置超声波传感器彩灯进入炫彩模式",
        "group.9": "蓝牙通信",
        "block.set_ble_mode": "设置蓝牙为 [MODE] 模式，名称 [NAME] ",
        "block.ble_is_connected": "蓝牙已连接？",
        "block.get_ble_mac": "获取蓝牙mac地址",
        "block.ble_wait_end": "蓝牙接收数据包含 [VALUE] ?",
        "block.read_ble_data": "获取接收到的蓝牙数据",
        "block.get_ble_cmd": "解析蓝牙数据 [DATA] ,获取命令",
        "block.get_ble_args": "解析蓝牙数据 [DATA] ,获取参数 [NUM] ",
        "block.ble_write": "蓝牙发送数据 [DATA]"
    },
    "en": {
        "product.name": "AI Mech Mecanum Car",
        "menu.rhythms.500": "Half beat",
        "menu.rhythms.250": "Quarter beat",
        "menu.rhythms.125": "Eighth beat",
        "menu.rhythms.1000": "Whole beat",
        "menu.rhythms.2000": "Double beat",
        "menu.rhythms.5000": "Long duration",
        "menu.rhythms.0": "Stop",
        "menu.buzzerMode.False": "Play in background",
        "menu.buzzerMode.True": "Play in foreground (blocking)",
        "menu.wheels.4": "Front left",
        "menu.wheels.3": "Rear left",
        "menu.wheels.2": "Front right",
        "menu.wheels.1": "Rear right",
        "menu.wheelMotors.4": "Front-left wheel (EM4)",
        "menu.wheelMotors.3": "Rear-left wheel (EM3)",
        "menu.wheelMotors.2": "Front-right wheel (EM2)",
        "menu.wheelMotors.1": "Rear-right wheel (EM1)",
        "menu.sides.0": "Left side",
        "menu.sides.1": "Right side",
        "menu.lightColors.0": "Red",
        "menu.lightColors.1": "Green",
        "menu.lightColors.2": "Blue",
        "menu.lightColors.3": "Yellow",
        "menu.lightColors.4": "Purple",
        "menu.lightColors.5": "Cyan",
        "menu.lightColors.6": "White",
        "menu.oriention8.0": "↑",
        "menu.oriention8.180": "↓",
        "menu.oriention8.90": "←",
        "menu.oriention8.-90": "→",
        "menu.oriention8.45": "↖",
        "menu.oriention8.-45": "↗",
        "menu.oriention8.135": "↙",
        "menu.oriention8.-135": "↘",
        "menu.oriention4.0": "Front",
        "menu.oriention4.180": "Back",
        "menu.oriention4.90": "Left",
        "menu.oriention4.-90": "Right",
        "menu.orientionTurn.1": "Turn left in place",
        "menu.orientionTurn.-1": "Turn right in place",
        "menu.eulerElement.0": "Z-axis data",
        "menu.eulerElement.1": "X-axis data",
        "menu.eulerElement.2": "Y-axis data",
        "menu.line6Sensor.LF1": "Front-mounted",
        "menu.line6Sensor.LF2": "Rear-mounted",
        "menu.linedot2.== 0": "◌",
        "menu.linedot2.> 0": "●",
        "menu.moveDirection.1": "Forward",
        "menu.moveDirection.-1": "Backward",
        "menu.nums.0": "All",
        "menu.ultrasonicNums.0": "All",
        "menu.rgb.1": "Red",
        "menu.rgb.2": "Green",
        "menu.rgb.3": "Blue",
        "menu.bleMode.BLE.MODE_BLE_SLAVE": "Peripheral mode",
        "menu.bleMode.BLE.MODE_BLE_MASTER": "Central mode",
        "block.start_thread": "main program",
        "block.start_run_thread": "when started",
        "block.wait_seconds": "Wait [SECONDS] seconds",
        "group.1": "Onboard resources",
        "block.buzzer_tone_set": "Play tone [TONES] beat [RHYTHMS] mode [MODE]",
        "block.buzzer_tone_set_arg": "Play tone [TONES] beat [RHYTHMS] mode [MODE]",
        "block.buzzer_tone_set_volume": "Set buzzer volume to [VALUE]",
        "block.close_buzzer": "Turn off buzzer",
        "block.close_lowpower_warning": "Turn off low-voltage alarm",
        "block.get_battery_level": "Battery voltage (mV)",
        "group.2": "RGB LEDs",
        "block.set_led_color": "Set RGB LED [NUMS] color [COLOR]",
        "block.set_led_color_arg": "Set RGB LED red [RED] green [GREEN] blue [BLUE]",
        "block.rgb_module_breath_one": "Set RGB LED breathing color [COLOR] cycle (0.5~20) [CYCLE] seconds",
        "block.rgb_module_breath": "Set RGB LED rainbow mode",
        "block.close_led": "Turn off RGB LED [NUMS]",
        "group.3": "Output",
        "block.print_str": "Print text [STR]",
        "block.print_number": "Print number [NUM]",
        "group.4": "Buttons",
        "block.when_key_click_thread": "When button [KEYS] is short-pressed",
        "block.when_key_longclick_thread": "When button [KEYS] is long-pressed",
        "block.key_is_pressed": "Button [KEYS] is pressed",
        "group.5": "Motion control",
        "block.set_motor_speed_all": "Set mecanum car front-left [SPEED1] rear-left [SPEED2] front-right [SPEED3] rear-right [SPEED4] rpm",
        "block.set_motor_speed_one": "Set mecanum car wheel [WHEEL] speed [SPEED] rpm",
        "block.set_motor_speed_two": "Set mecanum car [SIDE] wheel group speed [SPEED] rpm",
        "block.move_oriention": "Move mecanum car toward [ORIENTION] at [SPEED] rpm",
        "block.move_oriention_angle": "Move mecanum car toward [ORIENTION] degrees at [SPEED] rpm",
        "block.set_x_y_speed": "Set mecanum car X-axis speed [SPEED1] Y-axis speed [SPEED2]",
        "block.move_stop": "Stop mecanum car",
        "block.move_distance": "Move mecanum car [ORIENTION] for [DISTANCE] cm at [SPEED] rpm",
        "block.move_distance_arg": "Translate mecanum car toward [ORIENTION] degrees for [DISTANCE] cm at [SPEED] rpm",
        "block.move_all": "Move mecanum car toward [ORIENTION] at [SPEED] % power",
        "block.move_all_angle": "Move mecanum car toward [ORIENTION] degrees at [SPEED] % power",
        "block.turn_percent": "Turn mecanum car [ORIENTION] at [SPEED] % power",
        "block.turn_speed": "Turn mecanum car [ORIENTION] at [SPEED] rpm",
        "block.get_motor_angle": "Get motor [ID] degrees rotated",
        "block.reset_motor": "Reset chassis",
        "block.is_motor_ready": "Motor [ID] movement complete?",
        "block.is_all_ready": "All motors movement complete?",
        "block.pd_set_pd_line": "PD line following: offset [OFFSET] base speed [SPEED] max speed [MAXSPEED] Kp [KP] Kd [KD] direction [ORIENTION]",
        "group.6": "IMU sensor",
        "block.imu_init": "Initialize IMU sensor",
        "block.imu_cali": "Calibrate IMU sensor",
        "block.get_euler_angle_element_value": "Get device [VALUE]",
        "group.7": "6-channel line-following sensor",
        "block.linefollower6_one_status": "[SENSOR] 6-channel line sensor channel [NUM] detects [LINE]",
        "block.linefollower6_status": "[SENSOR] 6-channel line sensor detects [LINE]",
        "block.linefollower6_set_threshold": "Set [SENSOR] 6-channel line sensor threshold ratio (1~9) to [VALUE]",
        "block.linefollower6_get_value": "[SENSOR] 6-channel line sensor channel [NUM] grayscale (0~100)",
        "block.linefollower6_read_offset": "Get [SENSOR] 6-channel line sensor offset",
        "group.8": "Ultrasonic sensor",
        "block.get_led_ultrasonic_distance": "Ultrasonic sensor obstacle distance (cm)",
        "block.set_led_ultrasonic_color": "Set ultrasonic sensor LED [NUMS] color [COLOR]",
        "block.set_led_ultrasonic_color_arg": "Set ultrasonic sensor LED [NUMS] red [RED] green [GREEN] blue [BLUE]",
        "block.close_led_ultrasonic": "Turn off ultrasonic sensor LED [NUMS]",
        "block.set_led_ultrasonic_breath": "Set ultrasonic sensor LED [NUM] [RGB] cycle [TIME] seconds",
        "block.set_led_ultrasonic_random": "Set ultrasonic sensor LEDs to rainbow mode",
        "group.9": "Bluetooth communication",
        "block.set_ble_mode": "Set Bluetooth mode [MODE] name [NAME]",
        "block.ble_is_connected": "Bluetooth connected?",
        "block.get_ble_mac": "Get Bluetooth MAC address",
        "block.ble_wait_end": "Bluetooth received data contains [VALUE]?",
        "block.read_ble_data": "Get received Bluetooth data",
        "block.get_ble_cmd": "Parse Bluetooth data [DATA] to get command",
        "block.get_ble_args": "Parse Bluetooth data [DATA] to get argument [NUM]",
        "block.ble_write": "Send Bluetooth data [DATA]"
    },
    "zh-tw": {
        "product.name": "AI機甲麥輪車",
        "menu.rhythms.500": "二分之一拍",
        "menu.rhythms.250": "四分之一拍",
        "menu.rhythms.125": "八分之一拍",
        "menu.rhythms.1000": "整拍",
        "menu.rhythms.2000": "雙拍",
        "menu.rhythms.5000": "長時間",
        "menu.rhythms.0": "停止",
        "menu.buzzerMode.False": "背景播放",
        "menu.buzzerMode.True": "前景播放（阻塞式）",
        "menu.wheels.4": "左前",
        "menu.wheels.3": "左後",
        "menu.wheels.2": "右前",
        "menu.wheels.1": "右後",
        "menu.wheelMotors.4": "左前輪（EM4）",
        "menu.wheelMotors.3": "左後輪（EM3）",
        "menu.wheelMotors.2": "右前輪（EM2）",
        "menu.wheelMotors.1": "右後輪（EM1）",
        "menu.sides.0": "左側",
        "menu.sides.1": "右側",
        "menu.lightColors.0": "紅",
        "menu.lightColors.1": "綠",
        "menu.lightColors.2": "藍",
        "menu.lightColors.3": "黃",
        "menu.lightColors.4": "紫",
        "menu.lightColors.5": "青",
        "menu.lightColors.6": "白",
        "menu.oriention8.0": "↑",
        "menu.oriention8.180": "↓",
        "menu.oriention8.90": "←",
        "menu.oriention8.-90": "→",
        "menu.oriention8.45": "↖",
        "menu.oriention8.-45": "↗",
        "menu.oriention8.135": "↙",
        "menu.oriention8.-135": "↘",
        "menu.oriention4.0": "前",
        "menu.oriention4.180": "後",
        "menu.oriention4.90": "左",
        "menu.oriention4.-90": "右",
        "menu.orientionTurn.1": "原地左轉",
        "menu.orientionTurn.-1": "原地右轉",
        "menu.eulerElement.0": "Z軸資料",
        "menu.eulerElement.1": "X軸資料",
        "menu.eulerElement.2": "Y軸資料",
        "menu.line6Sensor.LF1": "前置",
        "menu.line6Sensor.LF2": "後置",
        "menu.linedot2.== 0": "◌",
        "menu.linedot2.> 0": "●",
        "menu.moveDirection.1": "前進",
        "menu.moveDirection.-1": "後退",
        "menu.nums.0": "全部",
        "menu.ultrasonicNums.0": "所有",
        "menu.rgb.1": "紅色",
        "menu.rgb.2": "綠色",
        "menu.rgb.3": "藍色",
        "menu.bleMode.BLE.MODE_BLE_SLAVE": "從機模式",
        "menu.bleMode.BLE.MODE_BLE_MASTER": "主機模式",
        "block.start_thread": "主程式",
        "block.start_run_thread": "當啟動時",
        "block.wait_seconds": "等待 [SECONDS] 秒",
        "group.1": "板載資源",
        "block.buzzer_tone_set": "播放音調 [TONES] 節拍 [RHYTHMS] 模式 [MODE]",
        "block.buzzer_tone_set_arg": "播放音調 [TONES] 節拍 [RHYTHMS] 模式 [MODE]",
        "block.buzzer_tone_set_volume": "蜂鳴器設定音量大小 [VALUE]",
        "block.close_buzzer": "關閉蜂鳴器",
        "block.close_lowpower_warning": "關閉低壓警報",
        "block.get_battery_level": "電量值（mV）",
        "group.2": "RGB彩燈",
        "block.set_led_color": "設定RGB彩燈 [NUMS] 顏色 [COLOR]",
        "block.set_led_color_arg": "設定RGB彩燈紅色 [RED] 綠色 [GREEN] 藍色 [BLUE]",
        "block.rgb_module_breath_one": "設定RGB彩燈呼吸燈模式，顏色 [COLOR] 變化週期（0.5~20）[CYCLE] 秒",
        "block.rgb_module_breath": "設定RGB彩燈炫彩模式",
        "block.close_led": "關閉RGB彩燈 [NUMS]",
        "group.3": "輸出列印",
        "block.print_str": "輸出字元 [STR]",
        "block.print_number": "輸出數字 [NUM]",
        "group.4": "按鍵",
        "block.when_key_click_thread": "當 [KEYS] 鍵短按時",
        "block.when_key_longclick_thread": "當 [KEYS] 鍵長按時",
        "block.key_is_pressed": "[KEYS] 鍵被按下",
        "group.5": "運動控制",
        "block.set_motor_speed_all": "設定麥輪小車左前輪 [SPEED1]、左後輪 [SPEED2]、右前輪 [SPEED3]、右後輪 [SPEED4] 轉/分鐘",
        "block.set_motor_speed_one": "設定麥輪小車 [WHEEL] 輪速度為 [SPEED] 轉/分鐘",
        "block.set_motor_speed_two": "設定麥輪小車 [SIDE] 輪組速度為 [SPEED] 轉/分鐘",
        "block.move_oriention": "設定麥輪小車以 [SPEED] 轉/分鐘的速度面向 [ORIENTION] 方向移動",
        "block.move_oriention_angle": "設定麥輪小車以 [SPEED] 轉/分鐘的速度面向 [ORIENTION] 度方向移動",
        "block.set_x_y_speed": "設定麥輪小車X軸速度 [SPEED1]、Y軸速度 [SPEED2]",
        "block.move_stop": "設定麥輪小車停止",
        "block.move_distance": "設定麥輪小車以 [SPEED] 轉/分鐘的轉速向 [ORIENTION] 移動 [DISTANCE] 公分",
        "block.move_distance_arg": "設定麥輪小車以 [SPEED] 轉/分鐘的轉速向 [ORIENTION] 度方向平移 [DISTANCE] 公分",
        "block.move_all": "設定麥輪小車以 [SPEED] %的動力面向 [ORIENTION] 方向移動",
        "block.move_all_angle": "設定麥輪小車以 [SPEED] %的動力面向 [ORIENTION] 度方向移動",
        "block.turn_percent": "設定麥輪小車以 [SPEED] %的動力 [ORIENTION]",
        "block.turn_speed": "設定麥輪小車以 [SPEED] 轉/分鐘的轉速 [ORIENTION]",
        "block.get_motor_angle": "取得馬達 [ID] 轉過的度數",
        "block.reset_motor": "重設底盤",
        "block.is_motor_ready": "馬達 [ID] 運動完成？",
        "block.is_all_ready": "所有馬達是否都運動完成？",
        "block.pd_set_pd_line": "設定小車進行PD調節循線（偏差值 [OFFSET] 基礎速度 [SPEED] 最大速度 [MAXSPEED] Kp值 [KP] Kd值 [KD] 運動方向 [ORIENTION]）",
        "group.6": "IMU感測器",
        "block.imu_init": "初始化IMU感測器",
        "block.imu_cali": "校正IMU感測器",
        "block.get_euler_angle_element_value": "取得裝置 [VALUE]",
        "group.7": "六路循線感測器",
        "block.linefollower6_one_status": "[SENSOR] 六路循線感測器通道 [NUM] 識別到 [LINE]",
        "block.linefollower6_status": "[SENSOR] 六路循線感測器通道識別到 [LINE]",
        "block.linefollower6_set_threshold": "設定 [SENSOR] 六路循線感測器的閾值比例（範圍1~9）為 [VALUE]",
        "block.linefollower6_get_value": "[SENSOR] 六路循線感測器通道 [NUM] 灰階值（0~100）",
        "block.linefollower6_read_offset": "取得 [SENSOR] 六路循線感測器偏差值",
        "group.8": "超音波感測器",
        "block.get_led_ultrasonic_distance": "超音波感測器偵測到障礙物距離（cm）",
        "block.set_led_ultrasonic_color": "設定超音波感測器彩燈 [NUMS] 顏色 [COLOR]",
        "block.set_led_ultrasonic_color_arg": "設定超音波感測器彩燈 [NUMS] 紅色 [RED] 綠色 [GREEN] 藍色 [BLUE]",
        "block.close_led_ultrasonic": "關閉超音波感測器彩燈 [NUMS]",
        "block.set_led_ultrasonic_breath": "設定超音波感測器彩燈 [NUM] [RGB] 週期 [TIME] 秒",
        "block.set_led_ultrasonic_random": "設定超音波感測器彩燈進入炫彩模式",
        "group.9": "藍牙通訊",
        "block.set_ble_mode": "設定藍牙為 [MODE] 模式，名稱 [NAME]",
        "block.ble_is_connected": "藍牙已連線？",
        "block.get_ble_mac": "取得藍牙MAC位址",
        "block.ble_wait_end": "藍牙接收資料包含 [VALUE]？",
        "block.read_ble_data": "取得接收到的藍牙資料",
        "block.get_ble_cmd": "解析藍牙資料 [DATA]，取得命令",
        "block.get_ble_args": "解析藍牙資料 [DATA]，取得參數 [NUM]",
        "block.ble_write": "藍牙傳送資料 [DATA]"
    },
    "ko": {
        "product.name": "AI 메카 메카넘 자동차",
        "menu.rhythms.500": "2분음표",
        "menu.rhythms.250": "4분음표",
        "menu.rhythms.125": "8분음표",
        "menu.rhythms.1000": "온박",
        "menu.rhythms.2000": "두 박",
        "menu.rhythms.5000": "긴 시간",
        "menu.rhythms.0": "정지",
        "menu.buzzerMode.False": "백그라운드 재생",
        "menu.buzzerMode.True": "포그라운드 재생(대기)",
        "menu.wheels.4": "왼쪽 앞",
        "menu.wheels.3": "왼쪽 뒤",
        "menu.wheels.2": "오른쪽 앞",
        "menu.wheels.1": "오른쪽 뒤",
        "menu.wheelMotors.4": "왼쪽 앞바퀴(EM4)",
        "menu.wheelMotors.3": "왼쪽 뒷바퀴(EM3)",
        "menu.wheelMotors.2": "오른쪽 앞바퀴(EM2)",
        "menu.wheelMotors.1": "오른쪽 뒷바퀴(EM1)",
        "menu.sides.0": "왼쪽",
        "menu.sides.1": "오른쪽",
        "menu.lightColors.0": "빨강",
        "menu.lightColors.1": "초록",
        "menu.lightColors.2": "파랑",
        "menu.lightColors.3": "노랑",
        "menu.lightColors.4": "보라",
        "menu.lightColors.5": "청록",
        "menu.lightColors.6": "하양",
        "menu.oriention8.0": "↑",
        "menu.oriention8.180": "↓",
        "menu.oriention8.90": "←",
        "menu.oriention8.-90": "→",
        "menu.oriention8.45": "↖",
        "menu.oriention8.-45": "↗",
        "menu.oriention8.135": "↙",
        "menu.oriention8.-135": "↘",
        "menu.oriention4.0": "앞",
        "menu.oriention4.180": "뒤",
        "menu.oriention4.90": "왼쪽",
        "menu.oriention4.-90": "오른쪽",
        "menu.orientionTurn.1": "제자리에서 왼쪽 회전",
        "menu.orientionTurn.-1": "제자리에서 오른쪽 회전",
        "menu.eulerElement.0": "Z축 데이터",
        "menu.eulerElement.1": "X축 데이터",
        "menu.eulerElement.2": "Y축 데이터",
        "menu.line6Sensor.LF1": "전방 장착",
        "menu.line6Sensor.LF2": "후방 장착",
        "menu.linedot2.== 0": "◌",
        "menu.linedot2.> 0": "●",
        "menu.moveDirection.1": "전진",
        "menu.moveDirection.-1": "후진",
        "menu.nums.0": "전체",
        "menu.ultrasonicNums.0": "전체",
        "menu.rgb.1": "빨강",
        "menu.rgb.2": "초록",
        "menu.rgb.3": "파랑",
        "menu.bleMode.BLE.MODE_BLE_SLAVE": "주변 장치 모드",
        "menu.bleMode.BLE.MODE_BLE_MASTER": "중앙 장치 모드",
        "block.start_thread": "주 프로그램",
        "block.start_run_thread": "시작할 때",
        "block.wait_seconds": "[SECONDS]초 기다리기",
        "group.1": "온보드 리소스",
        "block.buzzer_tone_set": "음 [TONES] 박자 [RHYTHMS] 모드 [MODE] 재생",
        "block.buzzer_tone_set_arg": "음 [TONES] 박자 [RHYTHMS] 모드 [MODE] 재생",
        "block.buzzer_tone_set_volume": "부저 음량을 [VALUE]로 설정",
        "block.close_buzzer": "부저 끄기",
        "block.close_lowpower_warning": "저전압 경보 끄기",
        "block.get_battery_level": "배터리 전압(mV)",
        "group.2": "RGB LED",
        "block.set_led_color": "RGB LED [NUMS] 색상 [COLOR] 설정",
        "block.set_led_color_arg": "RGB LED 빨강 [RED] 초록 [GREEN] 파랑 [BLUE] 설정",
        "block.rgb_module_breath_one": "RGB LED 숨쉬기 색상 [COLOR] 주기(0.5~20) [CYCLE]초 설정",
        "block.rgb_module_breath": "RGB LED 무지개 모드 설정",
        "block.close_led": "RGB LED [NUMS] 끄기",
        "group.3": "출력",
        "block.print_str": "문자열 [STR] 출력",
        "block.print_number": "숫자 [NUM] 출력",
        "group.4": "버튼",
        "block.when_key_click_thread": "[KEYS] 버튼을 짧게 눌렀을 때",
        "block.when_key_longclick_thread": "[KEYS] 버튼을 길게 눌렀을 때",
        "block.key_is_pressed": "[KEYS] 버튼이 눌렸는가",
        "group.5": "동작 제어",
        "block.set_motor_speed_all": "메카넘 자동차 왼쪽 앞바퀴 [SPEED1], 왼쪽 뒷바퀴 [SPEED2], 오른쪽 앞바퀴 [SPEED3], 오른쪽 뒷바퀴 [SPEED4]rpm 설정",
        "block.set_motor_speed_one": "메카넘 자동차 [WHEEL] 바퀴 속도를 [SPEED]rpm으로 설정",
        "block.set_motor_speed_two": "메카넘 자동차 [SIDE] 바퀴 그룹 속도를 [SPEED]rpm으로 설정",
        "block.move_oriention": "메카넘 자동차를 [SPEED]rpm으로 [ORIENTION] 방향 이동",
        "block.move_oriention_angle": "메카넘 자동차를 [SPEED]rpm으로 [ORIENTION]도 방향 이동",
        "block.set_x_y_speed": "메카넘 자동차 X축 속도 [SPEED1], Y축 속도 [SPEED2] 설정",
        "block.move_stop": "메카넘 자동차 정지",
        "block.move_distance": "메카넘 자동차를 [SPEED]rpm으로 [ORIENTION] 방향 [DISTANCE]cm 이동",
        "block.move_distance_arg": "메카넘 자동차를 [SPEED]rpm으로 [ORIENTION]도 방향 [DISTANCE]cm 평행 이동",
        "block.move_all": "메카넘 자동차를 출력 [SPEED] %로 [ORIENTION] 방향 이동",
        "block.move_all_angle": "메카넘 자동차를 출력 [SPEED] %로 [ORIENTION]도 방향 이동",
        "block.turn_percent": "메카넘 자동차를 출력 [SPEED] %로 [ORIENTION] 회전",
        "block.turn_speed": "메카넘 자동차를 [SPEED]rpm으로 [ORIENTION] 회전",
        "block.get_motor_angle": "모터 [ID]의 회전 각도 읽기",
        "block.reset_motor": "섀시 초기화",
        "block.is_motor_ready": "모터 [ID]의 이동이 완료되었는가",
        "block.is_all_ready": "모든 모터의 이동이 완료되었는가",
        "block.pd_set_pd_line": "PD 라인 추적: 편차 [OFFSET] 기본 속도 [SPEED] 최대 속도 [MAXSPEED] Kp [KP] Kd [KD] 이동 방향 [ORIENTION]",
        "group.6": "IMU 센서",
        "block.imu_init": "IMU 센서 초기화",
        "block.imu_cali": "IMU 센서 보정",
        "block.get_euler_angle_element_value": "장치 [VALUE] 읽기",
        "group.7": "6채널 라인 추적 센서",
        "block.linefollower6_one_status": "[SENSOR] 6채널 라인 센서 채널 [NUM]이 [LINE]을 감지했는가",
        "block.linefollower6_status": "[SENSOR] 6채널 라인 센서가 [LINE]을 감지했는가",
        "block.linefollower6_set_threshold": "[SENSOR] 6채널 라인 센서 임계값 비율(1~9)을 [VALUE]로 설정",
        "block.linefollower6_get_value": "[SENSOR] 6채널 라인 센서 채널 [NUM]의 그레이스케일 값(0~100)",
        "block.linefollower6_read_offset": "[SENSOR] 6채널 라인 센서 편차 읽기",
        "group.8": "초음파 센서",
        "block.get_led_ultrasonic_distance": "초음파 센서 장애물 거리(cm)",
        "block.set_led_ultrasonic_color": "초음파 센서 LED [NUMS] 색상 [COLOR] 설정",
        "block.set_led_ultrasonic_color_arg": "초음파 센서 LED [NUMS] 빨강 [RED] 초록 [GREEN] 파랑 [BLUE] 설정",
        "block.close_led_ultrasonic": "초음파 센서 LED [NUMS] 끄기",
        "block.set_led_ultrasonic_breath": "초음파 센서 LED [NUM] [RGB] 주기 [TIME]초 설정",
        "block.set_led_ultrasonic_random": "초음파 센서 LED 무지개 모드 설정",
        "group.9": "블루투스 통신",
        "block.set_ble_mode": "블루투스 모드 [MODE], 이름 [NAME] 설정",
        "block.ble_is_connected": "블루투스가 연결되었는가",
        "block.get_ble_mac": "블루투스 MAC 주소 읽기",
        "block.ble_wait_end": "블루투스 수신 데이터에 [VALUE]이 포함되어 있는가",
        "block.read_ble_data": "수신된 블루투스 데이터 읽기",
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

export default class AimecanumBlocks implements NativeExtension {
    constructor (private readonly context: ExtensionContext) {}

    getInfo (): ExtensionInfo {
        return {
            id: "aimecanum",
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
                wheels: {
                    acceptReporters: false,
                    items: [
                        {
                            text: this.context.t("menu.wheels.4"),
                            value: "4"
                        },
                        {
                            text: this.context.t("menu.wheels.3"),
                            value: "3"
                        },
                        {
                            text: this.context.t("menu.wheels.2"),
                            value: "2"
                        },
                        {
                            text: this.context.t("menu.wheels.1"),
                            value: "1"
                        }
                    ]
                },
                wheelMotors: {
                    acceptReporters: false,
                    items: [
                        {
                            text: this.context.t("menu.wheelMotors.4"),
                            value: "4"
                        },
                        {
                            text: this.context.t("menu.wheelMotors.3"),
                            value: "3"
                        },
                        {
                            text: this.context.t("menu.wheelMotors.2"),
                            value: "2"
                        },
                        {
                            text: this.context.t("menu.wheelMotors.1"),
                            value: "1"
                        }
                    ]
                },
                sides: {
                    acceptReporters: false,
                    items: [
                        {
                            text: this.context.t("menu.sides.0"),
                            value: "0"
                        },
                        {
                            text: this.context.t("menu.sides.1"),
                            value: "1"
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
                oriention8: {
                    acceptReporters: false,
                    items: [
                        {
                            text: this.context.t("menu.oriention8.0"),
                            value: "0"
                        },
                        {
                            text: this.context.t("menu.oriention8.180"),
                            value: "180"
                        },
                        {
                            text: this.context.t("menu.oriention8.90"),
                            value: "90"
                        },
                        {
                            text: this.context.t("menu.oriention8.-90"),
                            value: "-90"
                        },
                        {
                            text: this.context.t("menu.oriention8.45"),
                            value: "45"
                        },
                        {
                            text: this.context.t("menu.oriention8.-45"),
                            value: "-45"
                        },
                        {
                            text: this.context.t("menu.oriention8.135"),
                            value: "135"
                        },
                        {
                            text: this.context.t("menu.oriention8.-135"),
                            value: "-135"
                        }
                    ]
                },
                oriention4: {
                    acceptReporters: false,
                    items: [
                        {
                            text: this.context.t("menu.oriention4.0"),
                            value: "0"
                        },
                        {
                            text: this.context.t("menu.oriention4.180"),
                            value: "180"
                        },
                        {
                            text: this.context.t("menu.oriention4.90"),
                            value: "90"
                        },
                        {
                            text: this.context.t("menu.oriention4.-90"),
                            value: "-90"
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
                line6Sensor: {
                    acceptReporters: false,
                    items: [
                        {
                            text: this.context.t("menu.line6Sensor.LF1"),
                            value: "LF1"
                        },
                        {
                            text: this.context.t("menu.line6Sensor.LF2"),
                            value: "LF2"
                        }
                    ]
                },
                line6Mask: {
                    acceptReporters: false,
                    items: [
                        {
                            text: "1",
                            value: "1"
                        },
                        {
                            text: "2",
                            value: "2"
                        },
                        {
                            text: "3",
                            value: "4"
                        },
                        {
                            text: "4",
                            value: "8"
                        },
                        {
                            text: "5",
                            value: "16"
                        },
                        {
                            text: "6",
                            value: "32"
                        }
                    ]
                },
                linefollows6: {
                    acceptReporters: false,
                    items: [
                        {
                            text: "1",
                            value: "1"
                        },
                        {
                            text: "2",
                            value: "2"
                        },
                        {
                            text: "3",
                            value: "3"
                        },
                        {
                            text: "4",
                            value: "4"
                        },
                        {
                            text: "5",
                            value: "5"
                        },
                        {
                            text: "6",
                            value: "6"
                        }
                    ]
                },
                linedot2: {
                    acceptReporters: false,
                    items: [
                        {
                            text: this.context.t("menu.linedot2.== 0"),
                            value: "== 0"
                        },
                        {
                            text: this.context.t("menu.linedot2.> 0"),
                            value: "> 0"
                        }
                    ]
                },
                moveDirection: {
                    acceptReporters: false,
                    items: [
                        {
                            text: this.context.t("menu.moveDirection.1"),
                            value: "1"
                        },
                        {
                            text: this.context.t("menu.moveDirection.-1"),
                            value: "-1"
                        }
                    ]
                },
                nums: {
                    acceptReporters: false,
                    items: [
                        {
                            text: this.context.t("menu.nums.0"),
                            value: "0"
                        },
                        {
                            text: "1",
                            value: "1"
                        },
                        {
                            text: "2",
                            value: "2"
                        },
                        {
                            text: "3",
                            value: "3"
                        }
                    ]
                },
                ultrasonicNums: {
                    acceptReporters: false,
                    items: [
                        {
                            text: this.context.t("menu.ultrasonicNums.0"),
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
                    ]
                },
                rgb: {
                    acceptReporters: false,
                    items: [
                        {
                            text: this.context.t("menu.rgb.1"),
                            value: "1"
                        },
                        {
                            text: this.context.t("menu.rgb.2"),
                            value: "2"
                        },
                        {
                            text: this.context.t("menu.rgb.3"),
                            value: "3"
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
                    opcode: "wait_seconds",
                    blockType: "command",
                    text: this.context.t("block.wait_seconds"),
                    arguments: {
                        SECONDS: {
                            type: "number",
                            defaultValue: 1
                        }
                    }
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
                        NUMS: {
                            type: "string",
                            defaultValue: "0",
                            menu: "nums",
                            literal: true
                        },
                        COLOR: {
                            type: "square_color",
                            defaultValue: "#ffbf00"
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
                    arguments: {
                        NUMS: {
                            type: "string",
                            defaultValue: "0",
                            menu: "nums",
                            literal: true
                        }
                    }
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
                    opcode: "set_motor_speed_all",
                    blockType: "command",
                    text: this.context.t("block.set_motor_speed_all"),
                    arguments: {
                        SPEED1: {
                            type: "slider150p",
                            defaultValue: 60
                        },
                        SPEED2: {
                            type: "slider150p",
                            defaultValue: 60
                        },
                        SPEED3: {
                            type: "slider150p",
                            defaultValue: 60
                        },
                        SPEED4: {
                            type: "slider150p",
                            defaultValue: 60
                        }
                    }
                },
                {
                    opcode: "set_motor_speed_one",
                    blockType: "command",
                    text: this.context.t("block.set_motor_speed_one"),
                    arguments: {
                        WHEEL: {
                            type: "string",
                            defaultValue: "4",
                            menu: "wheels",
                            literal: true
                        },
                        SPEED: {
                            type: "slider150p",
                            defaultValue: 60
                        }
                    }
                },
                {
                    opcode: "set_motor_speed_two",
                    blockType: "command",
                    text: this.context.t("block.set_motor_speed_two"),
                    arguments: {
                        SIDE: {
                            type: "string",
                            defaultValue: "0",
                            menu: "sides",
                            literal: true
                        },
                        SPEED: {
                            type: "slider150p",
                            defaultValue: 60
                        }
                    }
                },
                {
                    opcode: "move_oriention",
                    blockType: "command",
                    text: this.context.t("block.move_oriention"),
                    arguments: {
                        SPEED: {
                            type: "slider150",
                            defaultValue: 60
                        },
                        ORIENTION: {
                            type: "string",
                            defaultValue: "0",
                            menu: "oriention8",
                            literal: true
                        }
                    }
                },
                {
                    opcode: "move_oriention_angle",
                    blockType: "command",
                    text: this.context.t("block.move_oriention_angle"),
                    arguments: {
                        SPEED: {
                            type: "slider150",
                            defaultValue: 60
                        },
                        ORIENTION: {
                            type: "slider180",
                            defaultValue: 0
                        }
                    }
                },
                {
                    opcode: "set_x_y_speed",
                    blockType: "command",
                    text: this.context.t("block.set_x_y_speed"),
                    arguments: {
                        SPEED1: {
                            type: "slider",
                            defaultValue: 60
                        },
                        SPEED2: {
                            type: "slider",
                            defaultValue: 60
                        }
                    }
                },
                {
                    opcode: "move_stop",
                    blockType: "command",
                    text: this.context.t("block.move_stop"),
                    arguments: {}
                },
                {
                    opcode: "move_distance",
                    blockType: "command",
                    text: this.context.t("block.move_distance"),
                    arguments: {
                        SPEED: {
                            type: "slider150",
                            defaultValue: 60
                        },
                        ORIENTION: {
                            type: "string",
                            defaultValue: "0",
                            menu: "oriention4",
                            literal: true
                        },
                        DISTANCE: {
                            type: "number",
                            defaultValue: 10
                        }
                    }
                },
                {
                    opcode: "move_distance_arg",
                    blockType: "command",
                    text: this.context.t("block.move_distance_arg"),
                    arguments: {
                        SPEED: {
                            type: "number",
                            defaultValue: 60
                        },
                        ORIENTION: {
                            type: "number",
                            defaultValue: 0
                        },
                        DISTANCE: {
                            type: "number",
                            defaultValue: 10
                        }
                    }
                },
                {
                    opcode: "move_all",
                    blockType: "command",
                    text: this.context.t("block.move_all"),
                    arguments: {
                        SPEED: {
                            type: "slider",
                            defaultValue: 60
                        },
                        ORIENTION: {
                            type: "string",
                            defaultValue: "0",
                            menu: "oriention8",
                            literal: true
                        }
                    }
                },
                {
                    opcode: "move_all_angle",
                    blockType: "command",
                    text: this.context.t("block.move_all_angle"),
                    arguments: {
                        SPEED: {
                            type: "slider",
                            defaultValue: 60
                        },
                        ORIENTION: {
                            type: "slider180",
                            defaultValue: 0
                        }
                    }
                },
                {
                    opcode: "turn_percent",
                    blockType: "command",
                    text: this.context.t("block.turn_percent"),
                    arguments: {
                        SPEED: {
                            type: "slider",
                            defaultValue: 60
                        },
                        ORIENTION: {
                            type: "string",
                            defaultValue: "1",
                            menu: "orientionTurn",
                            literal: true
                        }
                    }
                },
                {
                    opcode: "turn_speed",
                    blockType: "command",
                    text: this.context.t("block.turn_speed"),
                    arguments: {
                        SPEED: {
                            type: "slider150",
                            defaultValue: 60
                        },
                        ORIENTION: {
                            type: "string",
                            defaultValue: "1",
                            menu: "orientionTurn",
                            literal: true
                        }
                    }
                },
                {
                    opcode: "get_motor_angle",
                    blockType: "reporter",
                    text: this.context.t("block.get_motor_angle"),
                    disableMonitor: true,
                    arguments: {
                        ID: {
                            type: "string",
                            defaultValue: "4",
                            menu: "wheelMotors",
                            literal: true
                        }
                    }
                },
                {
                    opcode: "reset_motor",
                    blockType: "command",
                    text: this.context.t("block.reset_motor"),
                    arguments: {}
                },
                {
                    opcode: "is_motor_ready",
                    blockType: "Boolean",
                    text: this.context.t("block.is_motor_ready"),
                    disableMonitor: true,
                    arguments: {
                        ID: {
                            type: "string",
                            defaultValue: "4",
                            menu: "wheelMotors",
                            literal: true
                        }
                    }
                },
                {
                    opcode: "is_all_ready",
                    blockType: "Boolean",
                    text: this.context.t("block.is_all_ready"),
                    disableMonitor: true,
                    arguments: {}
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
                            defaultValue: 40
                        },
                        MAXSPEED: {
                            type: "number",
                            defaultValue: 80
                        },
                        KP: {
                            type: "number",
                            defaultValue: 0.3
                        },
                        KD: {
                            type: "number",
                            defaultValue: 0.1
                        },
                        ORIENTION: {
                            type: "string",
                            defaultValue: "1",
                            menu: "moveDirection",
                            literal: true
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
                    opcode: "linefollower6_one_status",
                    blockType: "Boolean",
                    text: this.context.t("block.linefollower6_one_status"),
                    disableMonitor: true,
                    arguments: {
                        SENSOR: {
                            type: "string",
                            defaultValue: "LF1",
                            menu: "line6Sensor",
                            literal: true
                        },
                        NUM: {
                            type: "string",
                            defaultValue: "1",
                            menu: "line6Mask",
                            literal: true
                        },
                        LINE: {
                            type: "string",
                            defaultValue: "> 0",
                            menu: "linedot2",
                            literal: true
                        }
                    }
                },
                {
                    opcode: "linefollower6_status",
                    blockType: "Boolean",
                    text: this.context.t("block.linefollower6_status"),
                    disableMonitor: true,
                    arguments: {
                        SENSOR: {
                            type: "string",
                            defaultValue: "LF1",
                            menu: "line6Sensor",
                            literal: true
                        },
                        LINE: {
                            type: "line6",
                            defaultValue: "00"
                        }
                    }
                },
                {
                    opcode: "linefollower6_set_threshold",
                    blockType: "command",
                    text: this.context.t("block.linefollower6_set_threshold"),
                    arguments: {
                        SENSOR: {
                            type: "string",
                            defaultValue: "LF1",
                            menu: "line6Sensor",
                            literal: true
                        },
                        VALUE: {
                            type: "number",
                            defaultValue: 7
                        }
                    }
                },
                {
                    opcode: "linefollower6_get_value",
                    blockType: "reporter",
                    text: this.context.t("block.linefollower6_get_value"),
                    disableMonitor: true,
                    arguments: {
                        SENSOR: {
                            type: "string",
                            defaultValue: "LF1",
                            menu: "line6Sensor",
                            literal: true
                        },
                        NUM: {
                            type: "string",
                            defaultValue: "1",
                            menu: "linefollows6",
                            literal: true
                        }
                    }
                },
                {
                    opcode: "linefollower6_read_offset",
                    blockType: "reporter",
                    text: this.context.t("block.linefollower6_read_offset"),
                    disableMonitor: true,
                    arguments: {
                        SENSOR: {
                            type: "string",
                            defaultValue: "LF1",
                            menu: "line6Sensor",
                            literal: true
                        }
                    }
                },
                {
                    subCategory: this.context.t("group.8")
                },
                {
                    opcode: "get_led_ultrasonic_distance",
                    blockType: "reporter",
                    text: this.context.t("block.get_led_ultrasonic_distance"),
                    disableMonitor: true,
                    arguments: {}
                },
                {
                    opcode: "set_led_ultrasonic_color",
                    blockType: "command",
                    text: this.context.t("block.set_led_ultrasonic_color"),
                    arguments: {
                        NUMS: {
                            type: "string",
                            defaultValue: "0",
                            menu: "ultrasonicNums",
                            literal: true
                        },
                        COLOR: {
                            type: "square_color",
                            defaultValue: "#ffbf00"
                        }
                    }
                },
                {
                    opcode: "set_led_ultrasonic_color_arg",
                    blockType: "command",
                    text: this.context.t("block.set_led_ultrasonic_color_arg"),
                    arguments: {
                        NUMS: {
                            type: "string",
                            defaultValue: "0",
                            menu: "ultrasonicNums",
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
                    }
                },
                {
                    opcode: "close_led_ultrasonic",
                    blockType: "command",
                    text: this.context.t("block.close_led_ultrasonic"),
                    arguments: {
                        NUMS: {
                            type: "string",
                            defaultValue: "0",
                            menu: "ultrasonicNums",
                            literal: true
                        }
                    }
                },
                {
                    opcode: "set_led_ultrasonic_breath",
                    blockType: "command",
                    text: this.context.t("block.set_led_ultrasonic_breath"),
                    arguments: {
                        NUM: {
                            type: "string",
                            defaultValue: "0",
                            menu: "ultrasonicNums",
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
                    }
                },
                {
                    opcode: "set_led_ultrasonic_random",
                    blockType: "command",
                    text: this.context.t("block.set_led_ultrasonic_random"),
                    arguments: {}
                },
                {
                    subCategory: this.context.t("group.9")
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
                            defaultValue: "Hiwonder"
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
                            defaultValue: "OK"
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
                            defaultValue: "data"
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
                            defaultValue: "data"
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
                            defaultValue: "Hello"
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
            wait_seconds: {
                template: "time.sleep({SECONDS})",
                imports: [
                    "import time"
                ]
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
                template: "rgb.setRGB({NUMS}, {COLOR.rgb})",
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
                template: "rgb.setRGB({NUMS},0,0,0)",
                imports: [
                    "import Hiwonder"
                ],
                variables: [
                    "rgb = Hiwonder.RGB()"
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
            set_motor_speed_all: {
                template: "mecanumCar.set_motors_speed({SPEED4},{SPEED3},{SPEED2},{SPEED1})",
                imports: [
                    "import Hiwonder_DEV"
                ],
                variables: [
                    "mecanumCar = Hiwonder_DEV.DEV_MecanumCar()"
                ]
            },
            set_motor_speed_one: {
                template: "mecanumCar.set_motor_speed({WHEEL},{SPEED})",
                imports: [
                    "import Hiwonder_DEV"
                ],
                variables: [
                    "mecanumCar = Hiwonder_DEV.DEV_MecanumCar()"
                ]
            },
            set_motor_speed_two: {
                template: "mecanumCar.set_2_speeds({SIDE},{SPEED})",
                imports: [
                    "import Hiwonder_DEV"
                ],
                variables: [
                    "mecanumCar = Hiwonder_DEV.DEV_MecanumCar()"
                ]
            },
            move_oriention: {
                template: "mecanumCar.move_dir({ORIENTION},{SPEED})",
                imports: [
                    "import Hiwonder_DEV"
                ],
                variables: [
                    "mecanumCar = Hiwonder_DEV.DEV_MecanumCar()"
                ]
            },
            move_oriention_angle: {
                template: "mecanumCar.move_dir({ORIENTION},{SPEED})",
                imports: [
                    "import Hiwonder_DEV"
                ],
                variables: [
                    "mecanumCar = Hiwonder_DEV.DEV_MecanumCar()"
                ]
            },
            set_x_y_speed: {
                template: "mecanumCar.set_xy_speed({SPEED1},{SPEED2})",
                imports: [
                    "import Hiwonder_DEV"
                ],
                variables: [
                    "mecanumCar = Hiwonder_DEV.DEV_MecanumCar()"
                ]
            },
            move_stop: {
                template: "mecanumCar.stop()",
                imports: [
                    "import Hiwonder_DEV"
                ],
                variables: [
                    "mecanumCar = Hiwonder_DEV.DEV_MecanumCar()"
                ]
            },
            move_distance: {
                template: "mecanumCar.move_distance({DISTANCE},{ORIENTION},{SPEED})",
                imports: [
                    "import Hiwonder_DEV"
                ],
                variables: [
                    "mecanumCar = Hiwonder_DEV.DEV_MecanumCar()"
                ]
            },
            move_distance_arg: {
                template: "mecanumCar.move_distance({DISTANCE},{ORIENTION},{SPEED})",
                imports: [
                    "import Hiwonder_DEV"
                ],
                variables: [
                    "mecanumCar = Hiwonder_DEV.DEV_MecanumCar()"
                ]
            },
            move_all: {
                template: "mecanumCar.move_dir({ORIENTION},{SPEED}*1.5)",
                imports: [
                    "import Hiwonder_DEV"
                ],
                variables: [
                    "mecanumCar = Hiwonder_DEV.DEV_MecanumCar()"
                ]
            },
            move_all_angle: {
                template: "mecanumCar.move_dir({ORIENTION},{SPEED}*1.5)",
                imports: [
                    "import Hiwonder_DEV"
                ],
                variables: [
                    "mecanumCar = Hiwonder_DEV.DEV_MecanumCar()"
                ]
            },
            turn_percent: {
                template: "mecanumCar.rotate_speed({ORIENTION}*{SPEED}*1.5)",
                imports: [
                    "import Hiwonder_DEV"
                ],
                variables: [
                    "mecanumCar = Hiwonder_DEV.DEV_MecanumCar()"
                ]
            },
            turn_speed: {
                template: "mecanumCar.rotate_speed({ORIENTION}*{SPEED})",
                imports: [
                    "import Hiwonder_DEV"
                ],
                variables: [
                    "mecanumCar = Hiwonder_DEV.DEV_MecanumCar()"
                ]
            },
            get_motor_angle: {
                template: "mecanumCar.read_motor_angle({ID})",
                imports: [
                    "import Hiwonder_DEV"
                ],
                variables: [
                    "mecanumCar = Hiwonder_DEV.DEV_MecanumCar()"
                ]
            },
            reset_motor: {
                template: "mecanumCar.reset()",
                imports: [
                    "import Hiwonder_DEV"
                ],
                variables: [
                    "mecanumCar = Hiwonder_DEV.DEV_MecanumCar()"
                ]
            },
            is_motor_ready: {
                template: "mecanumCar.read_motor_ready({ID})",
                imports: [
                    "import Hiwonder_DEV"
                ],
                variables: [
                    "mecanumCar = Hiwonder_DEV.DEV_MecanumCar()"
                ]
            },
            is_all_ready: {
                template: "mecanumCar.read_ready()",
                imports: [
                    "import Hiwonder_DEV"
                ],
                variables: [
                    "mecanumCar = Hiwonder_DEV.DEV_MecanumCar()"
                ]
            },
            pd_set_pd_line: {
                template: "mecanumCar.pd_set_speed({OFFSET},{SPEED},{MAXSPEED},{KP},{KD},{ORIENTION})",
                imports: [
                    "import Hiwonder_DEV"
                ],
                variables: [
                    "mecanumCar = Hiwonder_DEV.DEV_MecanumCar()"
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
                    "imu = Hiwonder.IMU()"
                ]
            },
            get_euler_angle_element_value: {
                template: "imu.get_angle()[{VALUE}]",
                imports: [
                    "import Hiwonder"
                ],
                variables: [
                    "imu = Hiwonder.IMU()"
                ]
            },
            linefollower6_one_status: {
                template: "(mecanumCar.{SENSOR}.get_result_data() & {NUM}) {LINE}",
                imports: [
                    "import Hiwonder_DEV"
                ],
                variables: [
                    "mecanumCar = Hiwonder_DEV.DEV_MecanumCar()"
                ]
            },
            linefollower6_status: {
                template: "mecanumCar.{SENSOR}.get_result_data() == 0x{LINE}",
                imports: [
                    "import Hiwonder_DEV"
                ],
                variables: [
                    "mecanumCar = Hiwonder_DEV.DEV_MecanumCar()"
                ]
            },
            linefollower6_set_threshold: {
                template: "mecanumCar.{SENSOR}.set_ThresholdRatioReg({VALUE})",
                imports: [
                    "import Hiwonder_DEV"
                ],
                variables: [
                    "mecanumCar = Hiwonder_DEV.DEV_MecanumCar()"
                ]
            },
            linefollower6_get_value: {
                template: "mecanumCar.{SENSOR}.read_AnalogQuantity({NUM})",
                imports: [
                    "import Hiwonder_DEV"
                ],
                variables: [
                    "mecanumCar = Hiwonder_DEV.DEV_MecanumCar()"
                ]
            },
            linefollower6_read_offset: {
                template: "mecanumCar.{SENSOR}.read_offset()",
                imports: [
                    "import Hiwonder_DEV"
                ],
                variables: [
                    "mecanumCar = Hiwonder_DEV.DEV_MecanumCar()"
                ]
            },
            get_led_ultrasonic_distance: {
                template: "mecanumCar.sonar.getDistance()",
                imports: [
                    "import Hiwonder_DEV"
                ],
                variables: [
                    "mecanumCar = Hiwonder_DEV.DEV_MecanumCar()"
                ]
            },
            set_led_ultrasonic_color: {
                template: "mecanumCar.sonar.setRGB({NUMS}, {COLOR.rgb})",
                imports: [
                    "import Hiwonder_DEV"
                ],
                variables: [
                    "mecanumCar = Hiwonder_DEV.DEV_MecanumCar()"
                ]
            },
            set_led_ultrasonic_color_arg: {
                template: "mecanumCar.sonar.setRGB({NUMS},{RED},{GREEN},{BLUE})",
                imports: [
                    "import Hiwonder_DEV"
                ],
                variables: [
                    "mecanumCar = Hiwonder_DEV.DEV_MecanumCar()"
                ]
            },
            close_led_ultrasonic: {
                template: "mecanumCar.sonar.setRGB({NUMS},0,0,0)",
                imports: [
                    "import Hiwonder_DEV"
                ],
                variables: [
                    "mecanumCar = Hiwonder_DEV.DEV_MecanumCar()"
                ]
            },
            set_led_ultrasonic_breath: {
                template: "mecanumCar.sonar.setBreathingCycle({NUM},{RGB},{TIME} * 10)",
                imports: [
                    "import Hiwonder_DEV"
                ],
                variables: [
                    "mecanumCar = Hiwonder_DEV.DEV_MecanumCar()"
                ]
            },
            set_led_ultrasonic_random: {
                template: "mecanumCar.sonar.startSymphony()",
                imports: [
                    "import Hiwonder_DEV"
                ],
                variables: [
                    "mecanumCar = Hiwonder_DEV.DEV_MecanumCar()"
                ]
            },
            set_ble_mode: {
                template: "",
                imports: [
                    "from Hiwonder_BLE import BLE"
                ],
                variables: [
                    "ble = BLE({MODE}, {NAME})"
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
