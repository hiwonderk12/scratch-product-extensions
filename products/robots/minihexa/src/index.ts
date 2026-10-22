import type {ExtensionContext, ExtensionInfo, NativeExtension, PythonTemplate} from '../../../../tools/sdk';

// 产品积木、菜单、集中 i18n 文案及 Python 规则在本文件维护。
export const messages = {
    "zh-cn": {
        "product.name": "miniHexa",
        "menu.asrmodes.1": "连续模式",
        "menu.asrmodes.2": "语音模式",
        "menu.asrmodes.3": "按键模式",
        "menu.blemode.BLE.MODE_BLE_SLAVE": "从机模式",
        "menu.blemode.BLE.MODE_BLE_MASTER": "主机模式",
        "menu.balance.True": "启动",
        "menu.balance.False": "停止",
        "menu.rhythms.500": "二分之一",
        "menu.rhythms.250": "四分之一",
        "menu.rhythms.125": "八分之一",
        "menu.rhythms.1000": "一拍",
        "menu.rhythms.2000": "两拍",
        "menu.rhythms.5000": "长音",
        "menu.buzzer_mode.False": "后台播放",
        "menu.buzzer_mode.True": "前台播放（阻塞）",
        "menu.gyro_select.0": "X轴角速度",
        "menu.gyro_select.1": "Y轴角速度",
        "menu.gyro_select.2": "Z轴角速度",
        "menu.imu_select.0": "横滚角",
        "menu.imu_select.1": "俯仰角",
        "menu.up_down_select.1": "向上",
        "menu.up_down_select.-1": "向下",
        "menu.x_select.1": "向前",
        "menu.x_select.-1": "向后",
        "menu.pitch_select.1": "前倾",
        "menu.pitch_select.-1": "后倾",
        "menu.roll_select.1": "左倾",
        "menu.roll_select.-1": "右倾",
        "menu.roll_pitch_yaw.1": "横滚",
        "menu.roll_pitch_yaw.2": "俯仰",
        "menu.roll_pitch_yaw.3": "偏航",
        "menu.oriention_8.0": "↑",
        "menu.oriention_8.1": "↓",
        "menu.oriention_8.2": "←",
        "menu.oriention_8.3": "→",
        "menu.oriention_8.4": "↖",
        "menu.oriention_8.5": "↗",
        "menu.oriention_8.6": "↙",
        "menu.oriention_8.7": "↘",
        "menu.oriention_9.1": "抬高",
        "menu.oriention_9.-1": "降低",
        "menu.robot_turn.1": "顺时针旋转",
        "menu.robot_turn.2": "逆时针旋转",
        "menu.onoff.True": "开启",
        "menu.onoff.False": "关闭",
        "block.start_thread": "主程序",
        "block.start_run_thread": "当启动时",
        "group.1": "板载资源",
        "block.buzzer_tone_set": "播放音调为 [TONES] 节拍为 [RHYTHMS] 模式为 [MODE]",
        "block.buzzer_tone_set_arg": "播放音调为 [TONES] 节拍为 [RHYTHMS] 模式为 [MODE]",
        "block.buzzer_tone_set_volume": "设置蜂鸣器音量为 [VALUE]",
        "block.get_battery_level": "电量值(mV)",
        "block.get_volume": "获取音量值",
        "block.disable_lowPower_alarm": "关闭低电量报警",
        "group.2": "输出打印",
        "block.print_str": "输出打印字符 [STR]",
        "block.print_number": "输出打印数字 [NUM]",
        "group.3": "运动控制",
        "block.set_body_reset": "设置机器人初始姿态",
        "block.set_body_angle": "设置身体 [ANGLE] 旋转角度(-20.0~20.0) [VALUE], 用时 [DURATION] ms",
        "block.set_body_pose": "设置身体中心向 [ORIENTION] 平移(-4.0~4.0) [VALUE] 厘米, 用时 [DURATION] ms",
        "block.set_body_pose_height": "设置身体中心 [ORIENTION] [VALUE] (0.0~4.0) 厘米, 用时 [DURATION] ms",
        "block.set_go": "控制机器人以 [SPEED] 的速度向 [MOVE] 移动, 每一步用时 [DURATION] ms",
        "block.set_go_step": "控制机器人以 [SPEED] 的速度向 [MOVE] 移动, 运行 [STEP] 步, 每一步用时 [DURATION] ms",
        "block.set_move_xyz": "控制机器人向 X: [VALUE1] Y: [VALUE2] Z: [VALUE3] 方向移动, 每一步用时 [DURATION] ms",
        "block.set_move_xyz_step": "控制机器人向 X: [VALUE1] Y: [VALUE2] Z: [VALUE3] 方向移动 [STEP] 步, 每一步用时 [DURATION] ms",
        "block.set_turn": "控制机器人以 [SPEED] 的速度 [MOVE], 每一步用时 [DURATION] ms",
        "block.set_turn_step": "控制机器人以 [SPEED] 的速度 [MOVE] 运行 [STEP] 步, 每一步用时 [DURATION] ms",
        "block.set_go_stop": "控制机器人停止",
        "block.set_leg_lift": "控制机器人抬腿高度等级(2~4) [VALUE]",
        "block.set_self_balance": "[CONTROL] 自平衡",
        "group.4": "舵机控制",
        "block.set_servo": "设置舵机 ID [NUM] 位置 [POS] 运行时间 [DURATION] 毫秒",
        "group.5": "动作组",
        "block.action_run": "miniHexa运行动作组 [NUM] ,重复次数 [LOOP]",
        "block.action_stop": "停止运行动作组",
        "group.6": "按键",
        "block.when_minihexa_key_click_thread": "当按键短按时",
        "block.when_minihexa_key_longclick_thread": "当按键长按时",
        "block.key_is_pressed": "按键被按下",
        "group.7": "IMU传感器",
        "block.imu_read_gyro_data": "获取陀螺仪 [SELECT] 轴数值",
        "block.imu_read_angle": "获取 IMU [SELECT] 角度值",
        "group.8": "串口通信",
        "block.serial_set_baudrate": "设置串口波特率 [DATA]",
        "block.serial_write": "串口发送数据 [DATA]",
        "block.serial_has_recv_data": "串口已接收数据？",
        "block.serial_recv_contains": "串口接收数据包含 [DATA]？",
        "block.serial_recv_buff": "串口接收缓冲区",
        "block.get_serial_cmd": "解析串口数据 [DATA] 获取命令",
        "block.get_serial_args": "解析串口数据 [DATA] 获取参数 [NUM]",
        "block.clear_buffer": "清空串口缓冲区"
    },
    "en": {
        "product.name": "miniHexa",
        "menu.asrmodes.1": "Continuous mode",
        "menu.asrmodes.2": "Voice mode",
        "menu.asrmodes.3": "Button mode",
        "menu.blemode.BLE.MODE_BLE_SLAVE": "Peripheral mode",
        "menu.blemode.BLE.MODE_BLE_MASTER": "Central mode",
        "menu.balance.True": "Enable",
        "menu.balance.False": "Stop",
        "menu.rhythms.500": "Half beat",
        "menu.rhythms.250": "Quarter beat",
        "menu.rhythms.125": "Eighth beat",
        "menu.rhythms.1000": "One beat",
        "menu.rhythms.2000": "Two beats",
        "menu.rhythms.5000": "Long tone",
        "menu.buzzer_mode.False": "Play in background",
        "menu.buzzer_mode.True": "Play in foreground (blocking)",
        "menu.gyro_select.0": "X-axis angular velocity",
        "menu.gyro_select.1": "Y-axis angular velocity",
        "menu.gyro_select.2": "Z-axis angular velocity",
        "menu.imu_select.0": "Roll angle",
        "menu.imu_select.1": "Pitch angle",
        "menu.up_down_select.1": "Up",
        "menu.up_down_select.-1": "Down",
        "menu.x_select.1": "Forward",
        "menu.x_select.-1": "Backward",
        "menu.pitch_select.1": "Tilt forward",
        "menu.pitch_select.-1": "Tilt backward",
        "menu.roll_select.1": "Tilt left",
        "menu.roll_select.-1": "Tilt right",
        "menu.roll_pitch_yaw.1": "Roll",
        "menu.roll_pitch_yaw.2": "Pitch",
        "menu.roll_pitch_yaw.3": "Yaw",
        "menu.oriention_8.0": "↑",
        "menu.oriention_8.1": "↓",
        "menu.oriention_8.2": "←",
        "menu.oriention_8.3": "→",
        "menu.oriention_8.4": "↖",
        "menu.oriention_8.5": "↗",
        "menu.oriention_8.6": "↙",
        "menu.oriention_8.7": "↘",
        "menu.oriention_9.1": "Raise",
        "menu.oriention_9.-1": "Lower",
        "menu.robot_turn.1": "Rotate clockwise",
        "menu.robot_turn.2": "Rotate counterclockwise",
        "menu.onoff.True": "On",
        "menu.onoff.False": "Off",
        "block.start_thread": "main program",
        "block.start_run_thread": "when started",
        "group.1": "Onboard resources",
        "block.buzzer_tone_set": "Play tone [TONES] beat [RHYTHMS] mode [MODE]",
        "block.buzzer_tone_set_arg": "Play tone [TONES] beat [RHYTHMS] mode [MODE]",
        "block.buzzer_tone_set_volume": "Set buzzer volume to [VALUE]",
        "block.get_battery_level": "Battery voltage (mV)",
        "block.get_volume": "Get volume",
        "block.disable_lowPower_alarm": "Turn off low-battery alarm",
        "group.2": "Output",
        "block.print_str": "print text [STR]",
        "block.print_number": "print number [NUM]",
        "group.3": "Motion control",
        "block.set_body_reset": "Set robot initial posture",
        "block.set_body_angle": "Set body [ANGLE] rotation angle (-20.0~20.0) [VALUE] duration [DURATION] ms",
        "block.set_body_pose": "Translate body center [ORIENTION] (-4.0~4.0) [VALUE] cm duration [DURATION] ms",
        "block.set_body_pose_height": "Move body center [ORIENTION] [VALUE] (0.0~4.0) cm duration [DURATION] ms",
        "block.set_go": "Move robot toward [MOVE] at speed [SPEED] step duration [DURATION] ms",
        "block.set_go_step": "Move robot toward [MOVE] at speed [SPEED] for [STEP] steps step duration [DURATION] ms",
        "block.set_move_xyz": "Move robot along X [VALUE1] Y [VALUE2] Z [VALUE3] step duration [DURATION] ms",
        "block.set_move_xyz_step": "Move robot along X [VALUE1] Y [VALUE2] Z [VALUE3] for [STEP] steps step duration [DURATION] ms",
        "block.set_turn": "Turn robot [MOVE] at speed [SPEED] step duration [DURATION] ms",
        "block.set_turn_step": "Turn robot [MOVE] at speed [SPEED] for [STEP] steps step duration [DURATION] ms",
        "block.set_go_stop": "Stop robot",
        "block.set_leg_lift": "Set robot leg lift level (2~4) [VALUE]",
        "block.set_self_balance": "[CONTROL] self-balancing",
        "group.4": "Servo control",
        "block.set_servo": "Set servo ID [NUM] position [POS] run time [DURATION] ms",
        "group.5": "Action groups",
        "block.action_run": "Run miniHexa action group [NUM] repeat [LOOP] times",
        "block.action_stop": "stop action",
        "group.6": "Buttons",
        "block.when_minihexa_key_click_thread": "When button is short-pressed",
        "block.when_minihexa_key_longclick_thread": "When button is long-pressed",
        "block.key_is_pressed": "Button is pressed",
        "group.7": "IMU sensor",
        "block.imu_read_gyro_data": "Get gyroscope [SELECT] axis value",
        "block.imu_read_angle": "Get IMU [SELECT] angle",
        "group.8": "Serial communication",
        "block.serial_set_baudrate": "Set serial baud rate [DATA]",
        "block.serial_write": "Send serial data [DATA]",
        "block.serial_has_recv_data": "Serial data received?",
        "block.serial_recv_contains": "Serial received data contains [DATA]?",
        "block.serial_recv_buff": "Serial receive buffer",
        "block.get_serial_cmd": "Parse serial data [DATA] to get command",
        "block.get_serial_args": "Parse serial data [DATA] to get argument [NUM]",
        "block.clear_buffer": "Clear serial buffer"
    },
    "zh-tw": {
        "product.name": "miniHexa",
        "menu.asrmodes.1": "連續模式",
        "menu.asrmodes.2": "語音模式",
        "menu.asrmodes.3": "按鍵模式",
        "menu.blemode.BLE.MODE_BLE_SLAVE": "從機模式",
        "menu.blemode.BLE.MODE_BLE_MASTER": "主機模式",
        "menu.balance.True": "啟動",
        "menu.balance.False": "停止",
        "menu.rhythms.500": "二分之一拍",
        "menu.rhythms.250": "四分之一拍",
        "menu.rhythms.125": "八分之一拍",
        "menu.rhythms.1000": "一拍",
        "menu.rhythms.2000": "兩拍",
        "menu.rhythms.5000": "長音",
        "menu.buzzer_mode.False": "背景播放",
        "menu.buzzer_mode.True": "前景播放（阻塞）",
        "menu.gyro_select.0": "X軸角速度",
        "menu.gyro_select.1": "Y軸角速度",
        "menu.gyro_select.2": "Z軸角速度",
        "menu.imu_select.0": "橫滾角",
        "menu.imu_select.1": "俯仰角",
        "menu.up_down_select.1": "向上",
        "menu.up_down_select.-1": "向下",
        "menu.x_select.1": "向前",
        "menu.x_select.-1": "向後",
        "menu.pitch_select.1": "前傾",
        "menu.pitch_select.-1": "後傾",
        "menu.roll_select.1": "左傾",
        "menu.roll_select.-1": "右傾",
        "menu.roll_pitch_yaw.1": "橫滾",
        "menu.roll_pitch_yaw.2": "俯仰",
        "menu.roll_pitch_yaw.3": "偏航",
        "menu.oriention_8.0": "↑",
        "menu.oriention_8.1": "↓",
        "menu.oriention_8.2": "←",
        "menu.oriention_8.3": "→",
        "menu.oriention_8.4": "↖",
        "menu.oriention_8.5": "↗",
        "menu.oriention_8.6": "↙",
        "menu.oriention_8.7": "↘",
        "menu.oriention_9.1": "抬高",
        "menu.oriention_9.-1": "降低",
        "menu.robot_turn.1": "順時針旋轉",
        "menu.robot_turn.2": "逆時針旋轉",
        "menu.onoff.True": "開啟",
        "menu.onoff.False": "關閉",
        "block.start_thread": "主程式",
        "block.start_run_thread": "當啟動時",
        "group.1": "板載資源",
        "block.buzzer_tone_set": "播放音調 [TONES] 節拍 [RHYTHMS] 模式 [MODE]",
        "block.buzzer_tone_set_arg": "播放音調 [TONES] 節拍 [RHYTHMS] 模式 [MODE]",
        "block.buzzer_tone_set_volume": "設定蜂鳴器音量為 [VALUE]",
        "block.get_battery_level": "電量值（mV）",
        "block.get_volume": "取得音量值",
        "block.disable_lowPower_alarm": "關閉低電量警報",
        "group.2": "輸出列印",
        "block.print_str": "輸出文字 [STR]",
        "block.print_number": "輸出數字 [NUM]",
        "group.3": "運動控制",
        "block.set_body_reset": "設定機器人初始姿態",
        "block.set_body_angle": "設定身體 [ANGLE] 旋轉角度（-20.0~20.0）[VALUE]，用時 [DURATION] ms",
        "block.set_body_pose": "設定身體中心向 [ORIENTION] 平移（-4.0~4.0）[VALUE] 公分，用時 [DURATION] ms",
        "block.set_body_pose_height": "設定身體中心 [ORIENTION] [VALUE]（0.0~4.0）公分，用時 [DURATION] ms",
        "block.set_go": "控制機器人以 [SPEED] 的速度向 [MOVE] 移動，每一步用時 [DURATION] ms",
        "block.set_go_step": "控制機器人以 [SPEED] 的速度向 [MOVE] 移動，運行 [STEP] 步，每一步用時 [DURATION] ms",
        "block.set_move_xyz": "控制機器人向 X：[VALUE1] Y：[VALUE2] Z：[VALUE3] 方向移動，每一步用時 [DURATION] ms",
        "block.set_move_xyz_step": "控制機器人向 X：[VALUE1] Y：[VALUE2] Z：[VALUE3] 方向移動 [STEP] 步，每一步用時 [DURATION] ms",
        "block.set_turn": "控制機器人以 [SPEED] 的速度 [MOVE]，每一步用時 [DURATION] ms",
        "block.set_turn_step": "控制機器人以 [SPEED] 的速度 [MOVE] 運行 [STEP] 步，每一步用時 [DURATION] ms",
        "block.set_go_stop": "控制機器人停止",
        "block.set_leg_lift": "控制機器人抬腿高度等級（2~4）[VALUE]",
        "block.set_self_balance": "[CONTROL] 自平衡",
        "group.4": "伺服馬達控制",
        "block.set_servo": "設定伺服馬達 ID [NUM] 位置 [POS] 運行時間 [DURATION] 毫秒",
        "group.5": "動作組",
        "block.action_run": "miniHexa執行動作組 [NUM]，重複次數 [LOOP]",
        "block.action_stop": "停止動作",
        "group.6": "按鍵",
        "block.when_minihexa_key_click_thread": "當按鍵短按時",
        "block.when_minihexa_key_longclick_thread": "當按鍵長按時",
        "block.key_is_pressed": "按鍵被按下",
        "group.7": "IMU感測器",
        "block.imu_read_gyro_data": "取得陀螺儀 [SELECT] 軸數值",
        "block.imu_read_angle": "取得 IMU [SELECT] 角度值",
        "group.8": "序列埠通訊",
        "block.serial_set_baudrate": "設定序列埠鮑率 [DATA]",
        "block.serial_write": "序列埠傳送資料 [DATA]",
        "block.serial_has_recv_data": "序列埠已接收資料？",
        "block.serial_recv_contains": "序列埠接收資料包含 [DATA]？",
        "block.serial_recv_buff": "序列埠接收緩衝區",
        "block.get_serial_cmd": "解析序列埠資料 [DATA] 取得命令",
        "block.get_serial_args": "解析序列埠資料 [DATA] 取得參數 [NUM]",
        "block.clear_buffer": "清空序列埠緩衝區"
    },
    "ko": {
        "product.name": "miniHexa",
        "menu.asrmodes.1": "연속 모드",
        "menu.asrmodes.2": "음성 모드",
        "menu.asrmodes.3": "버튼 모드",
        "menu.blemode.BLE.MODE_BLE_SLAVE": "주변 장치 모드",
        "menu.blemode.BLE.MODE_BLE_MASTER": "중앙 장치 모드",
        "menu.balance.True": "활성화",
        "menu.balance.False": "정지",
        "menu.rhythms.500": "2분음표",
        "menu.rhythms.250": "4분음표",
        "menu.rhythms.125": "8분음표",
        "menu.rhythms.1000": "1박",
        "menu.rhythms.2000": "2박",
        "menu.rhythms.5000": "긴 음",
        "menu.buzzer_mode.False": "백그라운드 재생",
        "menu.buzzer_mode.True": "포그라운드 재생(대기)",
        "menu.gyro_select.0": "X축 각속도",
        "menu.gyro_select.1": "Y축 각속도",
        "menu.gyro_select.2": "Z축 각속도",
        "menu.imu_select.0": "롤 각도",
        "menu.imu_select.1": "피치 각도",
        "menu.up_down_select.1": "위로",
        "menu.up_down_select.-1": "아래로",
        "menu.x_select.1": "앞으로",
        "menu.x_select.-1": "뒤로",
        "menu.pitch_select.1": "앞으로 기울이기",
        "menu.pitch_select.-1": "뒤로 기울이기",
        "menu.roll_select.1": "왼쪽으로 기울이기",
        "menu.roll_select.-1": "오른쪽으로 기울이기",
        "menu.roll_pitch_yaw.1": "롤",
        "menu.roll_pitch_yaw.2": "피치",
        "menu.roll_pitch_yaw.3": "요",
        "menu.oriention_8.0": "↑",
        "menu.oriention_8.1": "↓",
        "menu.oriention_8.2": "←",
        "menu.oriention_8.3": "→",
        "menu.oriention_8.4": "↖",
        "menu.oriention_8.5": "↗",
        "menu.oriention_8.6": "↙",
        "menu.oriention_8.7": "↘",
        "menu.oriention_9.1": "높이 올리기",
        "menu.oriention_9.-1": "높이 내리기",
        "menu.robot_turn.1": "시계 방향 회전",
        "menu.robot_turn.2": "반시계 방향 회전",
        "menu.onoff.True": "켜기",
        "menu.onoff.False": "끄기",
        "block.start_thread": "주 프로그램",
        "block.start_run_thread": "시작할 때",
        "group.1": "온보드 리소스",
        "block.buzzer_tone_set": "음 [TONES] 박자 [RHYTHMS] 모드 [MODE] 재생",
        "block.buzzer_tone_set_arg": "음 [TONES] 박자 [RHYTHMS] 모드 [MODE] 재생",
        "block.buzzer_tone_set_volume": "부저 음량을 [VALUE]로 설정",
        "block.get_battery_level": "배터리 전압(mV)",
        "block.get_volume": "음량 읽기",
        "block.disable_lowPower_alarm": "배터리 부족 경보 끄기",
        "group.2": "출력",
        "block.print_str": "텍스트 [STR] 출력",
        "block.print_number": "숫자 [NUM] 출력",
        "group.3": "동작 제어",
        "block.set_body_reset": "로봇 초기 자세 설정",
        "block.set_body_angle": "몸체 [ANGLE] 회전 각도(-20.0~20.0) [VALUE], 시간 [DURATION]ms 설정",
        "block.set_body_pose": "몸체 중심을 [ORIENTION] 방향으로 (-4.0~4.0) [VALUE]cm, 시간 [DURATION]ms 평행 이동",
        "block.set_body_pose_height": "몸체 중심을 [ORIENTION] [VALUE](0.0~4.0)cm, 시간 [DURATION]ms 이동",
        "block.set_go": "로봇을 속도 [SPEED]로 [MOVE] 방향 이동, 한 걸음 시간 [DURATION]ms",
        "block.set_go_step": "로봇을 속도 [SPEED]로 [MOVE] 방향 [STEP]걸음 이동, 한 걸음 시간 [DURATION]ms",
        "block.set_move_xyz": "로봇을 X [VALUE1] Y [VALUE2] Z [VALUE3] 방향 이동, 한 걸음 시간 [DURATION]ms",
        "block.set_move_xyz_step": "로봇을 X [VALUE1] Y [VALUE2] Z [VALUE3] 방향 [STEP]걸음 이동, 한 걸음 시간 [DURATION]ms",
        "block.set_turn": "로봇을 속도 [SPEED]로 [MOVE] 회전, 한 걸음 시간 [DURATION]ms",
        "block.set_turn_step": "로봇을 속도 [SPEED]로 [MOVE] [STEP]걸음 회전, 한 걸음 시간 [DURATION]ms",
        "block.set_go_stop": "로봇 정지",
        "block.set_leg_lift": "로봇 다리 높이 단계(2~4) [VALUE] 설정",
        "block.set_self_balance": "자세 균형 유지 [CONTROL]",
        "group.4": "서보 제어",
        "block.set_servo": "서보 ID [NUM] 위치 [POS] 동작 시간 [DURATION]ms 설정",
        "group.5": "동작 그룹",
        "block.action_run": "miniHexa 동작 그룹 [NUM]을 [LOOP]회 반복 실행",
        "block.action_stop": "동작 정지",
        "group.6": "버튼",
        "block.when_minihexa_key_click_thread": "버튼을 짧게 눌렀을 때",
        "block.when_minihexa_key_longclick_thread": "버튼을 길게 눌렀을 때",
        "block.key_is_pressed": "버튼이 눌렸는가",
        "group.7": "IMU 센서",
        "block.imu_read_gyro_data": "자이로스코프 [SELECT]축 값 읽기",
        "block.imu_read_angle": "IMU [SELECT] 각도 읽기",
        "group.8": "시리얼 통신",
        "block.serial_set_baudrate": "시리얼 통신 속도 [DATA] 설정",
        "block.serial_write": "시리얼 데이터 [DATA] 전송",
        "block.serial_has_recv_data": "시리얼 데이터를 수신했는가",
        "block.serial_recv_contains": "시리얼 수신 데이터에 [DATA]가 포함되어 있는가",
        "block.serial_recv_buff": "시리얼 수신 버퍼",
        "block.get_serial_cmd": "시리얼 데이터 [DATA]에서 명령 추출",
        "block.get_serial_args": "시리얼 데이터 [DATA]에서 매개변수 [NUM] 추출",
        "block.clear_buffer": "시리얼 버퍼 비우기"
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

export default class MinihexaBlocks implements NativeExtension {
    constructor (private readonly context: ExtensionContext) {}

    getInfo (): ExtensionInfo {
        return {
            id: "minihexa",
            name: this.context.t(product.name),
            color1: "#336699",
            color2: "#336699",
            color3: "#336699",
            menus: {
                iicport: {
                    acceptReporters: false,
                    items: [
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
                            text: "9",
                            value: "9"
                        }
                    ]
                },
                asrmodes: {
                    acceptReporters: false,
                    items: [
                        {
                            text: this.context.t("menu.asrmodes.1"),
                            value: "1"
                        },
                        {
                            text: this.context.t("menu.asrmodes.2"),
                            value: "2"
                        },
                        {
                            text: this.context.t("menu.asrmodes.3"),
                            value: "3"
                        }
                    ]
                },
                blemode: {
                    acceptReporters: false,
                    items: [
                        {
                            text: this.context.t("menu.blemode.BLE.MODE_BLE_SLAVE"),
                            value: "BLE.MODE_BLE_SLAVE"
                        },
                        {
                            text: this.context.t("menu.blemode.BLE.MODE_BLE_MASTER"),
                            value: "BLE.MODE_BLE_MASTER"
                        }
                    ]
                },
                balance: {
                    acceptReporters: false,
                    items: [
                        {
                            text: this.context.t("menu.balance.True"),
                            value: "True"
                        },
                        {
                            text: this.context.t("menu.balance.False"),
                            value: "False"
                        }
                    ]
                },
                baudrate: {
                    acceptReporters: false,
                    items: [
                        {
                            text: "9600",
                            value: "9600"
                        },
                        {
                            text: "115200",
                            value: "115200"
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
                            text: "0",
                            value: "0"
                        }
                    ]
                },
                buzzer_mode: {
                    acceptReporters: false,
                    items: [
                        {
                            text: this.context.t("menu.buzzer_mode.False"),
                            value: "False"
                        },
                        {
                            text: this.context.t("menu.buzzer_mode.True"),
                            value: "True"
                        }
                    ]
                },
                gyro_select: {
                    acceptReporters: false,
                    items: [
                        {
                            text: this.context.t("menu.gyro_select.0"),
                            value: "0"
                        },
                        {
                            text: this.context.t("menu.gyro_select.1"),
                            value: "1"
                        },
                        {
                            text: this.context.t("menu.gyro_select.2"),
                            value: "2"
                        }
                    ]
                },
                imu_select: {
                    acceptReporters: false,
                    items: [
                        {
                            text: this.context.t("menu.imu_select.0"),
                            value: "0"
                        },
                        {
                            text: this.context.t("menu.imu_select.1"),
                            value: "1"
                        }
                    ]
                },
                up_down_select: {
                    acceptReporters: false,
                    items: [
                        {
                            text: this.context.t("menu.up_down_select.1"),
                            value: "1"
                        },
                        {
                            text: this.context.t("menu.up_down_select.-1"),
                            value: "-1"
                        }
                    ]
                },
                x_select: {
                    acceptReporters: false,
                    items: [
                        {
                            text: this.context.t("menu.x_select.1"),
                            value: "1"
                        },
                        {
                            text: this.context.t("menu.x_select.-1"),
                            value: "-1"
                        }
                    ]
                },
                pitch_select: {
                    acceptReporters: false,
                    items: [
                        {
                            text: this.context.t("menu.pitch_select.1"),
                            value: "1"
                        },
                        {
                            text: this.context.t("menu.pitch_select.-1"),
                            value: "-1"
                        }
                    ]
                },
                roll_select: {
                    acceptReporters: false,
                    items: [
                        {
                            text: this.context.t("menu.roll_select.1"),
                            value: "1"
                        },
                        {
                            text: this.context.t("menu.roll_select.-1"),
                            value: "-1"
                        }
                    ]
                },
                roll_pitch_yaw: {
                    acceptReporters: false,
                    items: [
                        {
                            text: this.context.t("menu.roll_pitch_yaw.1"),
                            value: "1"
                        },
                        {
                            text: this.context.t("menu.roll_pitch_yaw.2"),
                            value: "2"
                        },
                        {
                            text: this.context.t("menu.roll_pitch_yaw.3"),
                            value: "3"
                        }
                    ]
                },
                oriention_8: {
                    acceptReporters: false,
                    items: [
                        {
                            text: this.context.t("menu.oriention_8.0"),
                            value: "0"
                        },
                        {
                            text: this.context.t("menu.oriention_8.1"),
                            value: "1"
                        },
                        {
                            text: this.context.t("menu.oriention_8.2"),
                            value: "2"
                        },
                        {
                            text: this.context.t("menu.oriention_8.3"),
                            value: "3"
                        },
                        {
                            text: this.context.t("menu.oriention_8.4"),
                            value: "4"
                        },
                        {
                            text: this.context.t("menu.oriention_8.5"),
                            value: "5"
                        },
                        {
                            text: this.context.t("menu.oriention_8.6"),
                            value: "6"
                        },
                        {
                            text: this.context.t("menu.oriention_8.7"),
                            value: "7"
                        }
                    ]
                },
                oriention_9: {
                    acceptReporters: false,
                    items: [
                        {
                            text: this.context.t("menu.oriention_9.1"),
                            value: "1"
                        },
                        {
                            text: this.context.t("menu.oriention_9.-1"),
                            value: "-1"
                        }
                    ]
                },
                robot_turn: {
                    acceptReporters: false,
                    items: [
                        {
                            text: this.context.t("menu.robot_turn.1"),
                            value: "1"
                        },
                        {
                            text: this.context.t("menu.robot_turn.2"),
                            value: "2"
                        }
                    ]
                },
                onoff: {
                    acceptReporters: false,
                    items: [
                        {
                            text: this.context.t("menu.onoff.True"),
                            value: "True"
                        },
                        {
                            text: this.context.t("menu.onoff.False"),
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
                        MODE: {
                            type: "string",
                            defaultValue: "False",
                            menu: "buzzer_mode",
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
                            menu: "buzzer_mode",
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
                    opcode: "get_battery_level",
                    blockType: "reporter",
                    text: this.context.t("block.get_battery_level"),
                    disableMonitor: true,
                    arguments: {}
                },
                {
                    opcode: "get_volume",
                    blockType: "reporter",
                    text: this.context.t("block.get_volume"),
                    disableMonitor: true,
                    arguments: {}
                },
                {
                    opcode: "disable_lowPower_alarm",
                    blockType: "command",
                    text: this.context.t("block.disable_lowPower_alarm"),
                    arguments: {}
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
                    opcode: "set_body_reset",
                    blockType: "command",
                    text: this.context.t("block.set_body_reset"),
                    arguments: {}
                },
                {
                    opcode: "set_body_angle",
                    blockType: "command",
                    text: this.context.t("block.set_body_angle"),
                    arguments: {
                        ANGLE: {
                            type: "string",
                            defaultValue: "1",
                            menu: "roll_pitch_yaw",
                            literal: true
                        },
                        VALUE: {
                            type: "number",
                            defaultValue: 2
                        },
                        DURATION: {
                            type: "number",
                            defaultValue: 500
                        }
                    }
                },
                {
                    opcode: "set_body_pose",
                    blockType: "command",
                    text: this.context.t("block.set_body_pose"),
                    arguments: {
                        ORIENTION: {
                            type: "string",
                            defaultValue: "0",
                            menu: "oriention_8",
                            literal: true
                        },
                        VALUE: {
                            type: "number",
                            defaultValue: 2
                        },
                        DURATION: {
                            type: "number",
                            defaultValue: 500
                        }
                    }
                },
                {
                    opcode: "set_body_pose_height",
                    blockType: "command",
                    text: this.context.t("block.set_body_pose_height"),
                    arguments: {
                        ORIENTION: {
                            type: "string",
                            defaultValue: "1",
                            menu: "oriention_9",
                            literal: true
                        },
                        VALUE: {
                            type: "number",
                            defaultValue: 2
                        },
                        DURATION: {
                            type: "number",
                            defaultValue: 500
                        }
                    }
                },
                {
                    opcode: "set_go",
                    blockType: "command",
                    text: this.context.t("block.set_go"),
                    arguments: {
                        SPEED: {
                            type: "number",
                            defaultValue: 2
                        },
                        MOVE: {
                            type: "string",
                            defaultValue: "0",
                            menu: "oriention_8",
                            literal: true
                        },
                        DURATION: {
                            type: "number",
                            defaultValue: 500
                        }
                    }
                },
                {
                    opcode: "set_go_step",
                    blockType: "command",
                    text: this.context.t("block.set_go_step"),
                    arguments: {
                        SPEED: {
                            type: "number",
                            defaultValue: 2
                        },
                        MOVE: {
                            type: "string",
                            defaultValue: "0",
                            menu: "oriention_8",
                            literal: true
                        },
                        STEP: {
                            type: "number",
                            defaultValue: 2
                        },
                        DURATION: {
                            type: "number",
                            defaultValue: 500
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
                        DURATION: {
                            type: "number",
                            defaultValue: 500
                        }
                    }
                },
                {
                    opcode: "set_move_xyz_step",
                    blockType: "command",
                    text: this.context.t("block.set_move_xyz_step"),
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
                        STEP: {
                            type: "number",
                            defaultValue: 5
                        },
                        DURATION: {
                            type: "number",
                            defaultValue: 500
                        }
                    }
                },
                {
                    opcode: "set_turn",
                    blockType: "command",
                    text: this.context.t("block.set_turn"),
                    arguments: {
                        SPEED: {
                            type: "number",
                            defaultValue: 2
                        },
                        MOVE: {
                            type: "string",
                            defaultValue: "1",
                            menu: "robot_turn",
                            literal: true
                        },
                        DURATION: {
                            type: "number",
                            defaultValue: 500
                        }
                    }
                },
                {
                    opcode: "set_turn_step",
                    blockType: "command",
                    text: this.context.t("block.set_turn_step"),
                    arguments: {
                        SPEED: {
                            type: "number",
                            defaultValue: 2
                        },
                        MOVE: {
                            type: "string",
                            defaultValue: "1",
                            menu: "robot_turn",
                            literal: true
                        },
                        STEP: {
                            type: "number",
                            defaultValue: 2
                        },
                        DURATION: {
                            type: "number",
                            defaultValue: 500
                        }
                    }
                },
                {
                    opcode: "set_go_stop",
                    blockType: "command",
                    text: this.context.t("block.set_go_stop"),
                    arguments: {}
                },
                {
                    opcode: "set_leg_lift",
                    blockType: "command",
                    text: this.context.t("block.set_leg_lift"),
                    arguments: {
                        VALUE: {
                            type: "number",
                            defaultValue: 3
                        }
                    }
                },
                {
                    opcode: "set_self_balance",
                    blockType: "command",
                    text: this.context.t("block.set_self_balance"),
                    arguments: {
                        CONTROL: {
                            type: "string",
                            defaultValue: "True",
                            menu: "onoff",
                            literal: true
                        }
                    }
                },
                {
                    subCategory: this.context.t("group.4")
                },
                {
                    opcode: "set_servo",
                    blockType: "command",
                    text: this.context.t("block.set_servo"),
                    arguments: {
                        NUM: {
                            type: "number",
                            defaultValue: 1
                        },
                        POS: {
                            type: "number",
                            defaultValue: 1500
                        },
                        DURATION: {
                            type: "number",
                            defaultValue: 500
                        }
                    }
                },
                {
                    subCategory: this.context.t("group.5")
                },
                {
                    opcode: "action_run",
                    blockType: "command",
                    text: this.context.t("block.action_run"),
                    arguments: {
                        NUM: {
                            type: "string",
                            defaultValue: "1"
                        },
                        LOOP: {
                            type: "number",
                            defaultValue: 1
                        }
                    }
                },
                {
                    opcode: "action_stop",
                    blockType: "command",
                    text: this.context.t("block.action_stop"),
                    arguments: {}
                },
                {
                    subCategory: this.context.t("group.6")
                },
                {
                    opcode: "when_minihexa_key_click_thread",
                    blockType: "hat",
                    text: this.context.t("block.when_minihexa_key_click_thread"),
                    isEdgeActivated: false,
                    arguments: {}
                },
                {
                    opcode: "when_minihexa_key_longclick_thread",
                    blockType: "hat",
                    text: this.context.t("block.when_minihexa_key_longclick_thread"),
                    isEdgeActivated: false,
                    arguments: {}
                },
                {
                    opcode: "key_is_pressed",
                    blockType: "Boolean",
                    text: this.context.t("block.key_is_pressed"),
                    disableMonitor: true,
                    arguments: {}
                },
                {
                    subCategory: this.context.t("group.7")
                },
                {
                    opcode: "imu_read_gyro_data",
                    blockType: "reporter",
                    text: this.context.t("block.imu_read_gyro_data"),
                    disableMonitor: true,
                    arguments: {
                        SELECT: {
                            type: "string",
                            defaultValue: "0",
                            menu: "gyro_select",
                            literal: true
                        }
                    }
                },
                {
                    opcode: "imu_read_angle",
                    blockType: "reporter",
                    text: this.context.t("block.imu_read_angle"),
                    disableMonitor: true,
                    arguments: {
                        SELECT: {
                            type: "string",
                            defaultValue: "0",
                            menu: "imu_select",
                            literal: true
                        }
                    }
                },
                {
                    subCategory: this.context.t("group.8")
                },
                {
                    opcode: "serial_set_baudrate",
                    blockType: "command",
                    text: this.context.t("block.serial_set_baudrate"),
                    arguments: {
                        DATA: {
                            type: "string",
                            defaultValue: "9600",
                            menu: "baudrate",
                            literal: true
                        }
                    }
                },
                {
                    opcode: "serial_write",
                    blockType: "command",
                    text: this.context.t("block.serial_write"),
                    arguments: {
                        DATA: {
                            type: "string",
                            defaultValue: "CMD"
                        }
                    }
                },
                {
                    opcode: "serial_has_recv_data",
                    blockType: "Boolean",
                    text: this.context.t("block.serial_has_recv_data"),
                    disableMonitor: true,
                    arguments: {}
                },
                {
                    opcode: "serial_recv_contains",
                    blockType: "Boolean",
                    text: this.context.t("block.serial_recv_contains"),
                    disableMonitor: true,
                    arguments: {
                        DATA: {
                            type: "string",
                            defaultValue: "CMD"
                        }
                    }
                },
                {
                    opcode: "serial_recv_buff",
                    blockType: "reporter",
                    text: this.context.t("block.serial_recv_buff"),
                    disableMonitor: true,
                    arguments: {}
                },
                {
                    opcode: "get_serial_cmd",
                    blockType: "reporter",
                    text: this.context.t("block.get_serial_cmd"),
                    disableMonitor: true,
                    arguments: {
                        DATA: {
                            type: "string",
                            defaultValue: "0"
                        }
                    }
                },
                {
                    opcode: "get_serial_args",
                    blockType: "reporter",
                    text: this.context.t("block.get_serial_args"),
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
                    opcode: "clear_buffer",
                    blockType: "command",
                    text: this.context.t("block.clear_buffer"),
                    arguments: {}
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
                variables: [
                    "minihexa = Hiwonder.Robot()"
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
                variables: [
                    "minihexa = Hiwonder.Robot()"
                ],
                section: "setup"
            },
            buzzer_tone_set: {
                template: "beep.playTone({TONES},{RHYTHMS},{MODE})",
                variables: [
                    "beep = Hiwonder.Buzzer()"
                ]
            },
            buzzer_tone_set_arg: {
                template: "beep.playTone({TONES},{RHYTHMS},{MODE})",
                variables: [
                    "beep = Hiwonder.Buzzer()"
                ]
            },
            buzzer_tone_set_volume: {
                template: "beep.setVolume({VALUE})",
                variables: [
                    "beep = Hiwonder.Buzzer()"
                ]
            },
            get_battery_level: {
                template: "Hiwonder.Battery_power()",
                imports: [
                    "import Hiwonder"
                ]
            },
            get_volume: {
                template: "sound.read()",
                imports: [
                    "import Hiwonder"
                ],
                variables: [
                    "sound = Hiwonder.Sound()"
                ]
            },
            disable_lowPower_alarm: {
                template: "Hiwonder.disableLowPowerAlarm()",
                variables: [
                    "beep = Hiwonder.Buzzer()"
                ]
            },
            print_str: {
                template: `print({STR})
time.sleep(0.5)`,
                imports: [
                    "import time"
                ]
            },
            print_number: {
                template: `print({NUM})
time.sleep(0.5)`,
                imports: [
                    "import time"
                ]
            },
            set_body_reset: {
                template: "minihexa.reset()"
            },
            set_body_angle: {
                template: "minihexa.set_body_angle([0,0,0],{DURATION})",
                templateSelector: {
                    argument: "ANGLE",
                    cases: {
                        "1": "minihexa.set_body_angle([{VALUE},0,0],{DURATION})",
                        "2": "minihexa.set_body_angle([0,{VALUE},0],{DURATION})",
                        "3": "minihexa.set_body_angle([0,0,{VALUE}],{DURATION})"
                    }
                }
            },
            set_body_pose: {
                template: "minihexa.set_body_pose([0,0,0],{DURATION})",
                templateSelector: {
                    argument: "ORIENTION",
                    cases: {
                        "0": "minihexa.set_body_pose([0,{VALUE},0],{DURATION})",
                        "1": "minihexa.set_body_pose([0,-{VALUE},0],{DURATION})",
                        "2": "minihexa.set_body_pose([-{VALUE},0,0],{DURATION})",
                        "3": "minihexa.set_body_pose([{VALUE},0,0],{DURATION})",
                        "4": "minihexa.set_body_pose([-{VALUE},{VALUE},0],{DURATION})",
                        "5": "minihexa.set_body_pose([{VALUE},{VALUE},0],{DURATION})",
                        "6": "minihexa.set_body_pose([-{VALUE},-{VALUE},0],{DURATION})",
                        "7": "minihexa.set_body_pose([{VALUE},-{VALUE},0],{DURATION})"
                    }
                }
            },
            set_body_pose_height: {
                template: "minihexa.set_body_pose([0,0,{VALUE}*{ORIENTION}],{DURATION})"
            },
            set_go: {
                template: "minihexa.go([0,0,0],-1,{DURATION})",
                templateSelector: {
                    argument: "MOVE",
                    cases: {
                        "0": "minihexa.go([0,{SPEED},0],-1,{DURATION})",
                        "1": "minihexa.go([0,-{SPEED},0],-1,{DURATION})",
                        "2": "minihexa.go([-{SPEED},0,0],-1,{DURATION})",
                        "3": "minihexa.go([{SPEED},0,0],-1,{DURATION})",
                        "4": "minihexa.go([-{SPEED},{SPEED},0],-1,{DURATION})",
                        "5": "minihexa.go([{SPEED},{SPEED},0],-1,{DURATION})",
                        "6": "minihexa.go([-{SPEED},-{SPEED},0],-1,{DURATION})",
                        "7": "minihexa.go([{SPEED},-{SPEED},0],-1,{DURATION})"
                    }
                }
            },
            set_go_step: {
                template: "minihexa.go([0,0,0],{STEP},{DURATION})",
                templateSelector: {
                    argument: "MOVE",
                    cases: {
                        "0": "minihexa.go([0,{SPEED},0],{STEP},{DURATION})",
                        "1": "minihexa.go([0,-{SPEED},0],{STEP},{DURATION})",
                        "2": "minihexa.go([-{SPEED},0,0],{STEP},{DURATION})",
                        "3": "minihexa.go([{SPEED},0,0],{STEP},{DURATION})",
                        "4": "minihexa.go([-{SPEED},{SPEED},0],{STEP},{DURATION})",
                        "5": "minihexa.go([{SPEED},{SPEED},0],{STEP},{DURATION})",
                        "6": "minihexa.go([-{SPEED},-{SPEED},0],{STEP},{DURATION})",
                        "7": "minihexa.go([{SPEED},-{SPEED},0],{STEP},{DURATION})"
                    }
                }
            },
            set_move_xyz: {
                template: "minihexa.go([{VALUE1},{VALUE2},{VALUE3}],-1,{DURATION})"
            },
            set_move_xyz_step: {
                template: "minihexa.go([{VALUE1},{VALUE2},{VALUE3}],{STEP},{DURATION})"
            },
            set_turn: {
                template: "minihexa.go([0,0,0],-1,{DURATION})",
                templateSelector: {
                    argument: "MOVE",
                    cases: {
                        "1": "minihexa.go([0,0,-{SPEED}],-1,{DURATION})",
                        "2": "minihexa.go([0,0,{SPEED}],-1,{DURATION})"
                    }
                }
            },
            set_turn_step: {
                template: "minihexa.go([0,0,0],{STEP},{DURATION})",
                templateSelector: {
                    argument: "MOVE",
                    cases: {
                        "1": "minihexa.go([0,0,-{SPEED}],{STEP},{DURATION})",
                        "2": "minihexa.go([0,0,{SPEED}],{STEP},{DURATION})"
                    }
                }
            },
            set_go_stop: {
                template: "minihexa.go([0,0,0],0)"
            },
            set_leg_lift: {
                template: "minihexa.set_leg_lift({VALUE})"
            },
            set_self_balance: {
                template: "minihexa.homeostasis({CONTROL})"
            },
            set_servo: {
                template: "minihexa.multi_servo_control([({NUM},{POS})],{DURATION})"
            },
            action_run: {
                template: "minihexa.action_run({NUM},{LOOP})"
            },
            action_stop: {
                template: "minihexa.action_stop()"
            },
            when_minihexa_key_click_thread: {
                template: "",
                imports: [
                    "import Hiwonder",
                    "import time",
                    "import Hiwonder_IIC"
                ],
                variables: [
                    "minihexa = Hiwonder.Robot()",
                    "button1 = Hiwonder.Button()"
                ],
                entryTemplate: "def on_button1_clicked():",
                entryFooter: "button1.Clicked(on_button1_clicked)",
                section: "main"
            },
            when_minihexa_key_longclick_thread: {
                template: "",
                imports: [
                    "import Hiwonder",
                    "import time",
                    "import Hiwonder_IIC"
                ],
                variables: [
                    "minihexa = Hiwonder.Robot()",
                    "button1 = Hiwonder.Button()"
                ],
                entryTemplate: "def on_button1_longpressed():",
                entryFooter: "button1.Longpressed(on_button1_longpressed)",
                section: "main"
            },
            key_is_pressed: {
                template: "button1.read()",
                imports: [
                    "import Hiwonder",
                    "import time"
                ],
                variables: [
                    "button1 = Hiwonder.Button()"
                ]
            },
            imu_read_gyro_data: {
                template: "imu.read_gyro_data()[{SELECT}]",
                variables: [
                    "imu = Hiwonder.IMU()"
                ]
            },
            imu_read_angle: {
                template: "imu.read_angle()[{SELECT}]",
                variables: [
                    "imu = Hiwonder.IMU()"
                ]
            },
            serial_set_baudrate: {
                template: "",
                variables: [
                    "uart = Hiwonder.UART({DATA})"
                ]
            },
            serial_write: {
                template: "uart.send_data({DATA})"
            },
            serial_has_recv_data: {
                template: "uart.has_data()"
            },
            serial_recv_contains: {
                template: "uart.contains_data({DATA})"
            },
            serial_recv_buff: {
                template: "uart.read_buffer()"
            },
            get_serial_cmd: {
                template: "uart.read_uart_cmd({DATA})[0]"
            },
            get_serial_args: {
                template: "uart.parse_uart_cmd({DATA})[{NUM}]"
            },
            clear_buffer: {
                template: "uart.clear_buffer()"
            }
        };
    }
}
