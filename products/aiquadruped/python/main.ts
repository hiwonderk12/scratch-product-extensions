// AI机甲四足机器人 Python 作者源：维护旧 VM 启用积木与 Python 生成规则。
//% color="#1874cd" iconWidth=50 iconHeight=40
namespace aiquadruped {
    //% block="主程序" blockType="hat"
    export function start_thread(parameter: any, block: any) {
        Generator.addImport(`import Hiwonder`);
        Generator.addImport(`import time`);
        Generator.addImport(`import Hiwonder_DEV`);
    }

    //% block="当启动时" blockType="hat"
    export function start_run_thread(parameter: any, block: any) {
        Generator.addImport(`import Hiwonder`);
        Generator.addImport(`import time`);
        Generator.addImport(`import Hiwonder_DEV`);
    }

    //% block="播放音调为 [TONES] 节拍为 [RHYTHMS] 模式为 [MODE]" blockType="command"
    //% TONES.shadow="dropdown" TONES.options="tones" TONES.defl="65"
    //% RHYTHMS.shadow="dropdown" RHYTHMS.options="rhythms" RHYTHMS.defl="500"
    //% MODE.shadow="dropdown" MODE.options="buzzerMode" MODE.defl="False"
    export function buzzer_tone_set(parameter: any, block: any) {
        const tones = parameter.TONES.code;
        const rhythms = parameter.RHYTHMS.code;
        const mode = parameter.MODE.code;
        Generator.addImport(`import Hiwonder`);
        Generator.addObject("", "", `beep = Hiwonder.Buzzer()`);
        Generator.addCode(`beep.playTone(${tones},${rhythms},${mode})`);
    }

    //% block="播放音调为 [TONES] 节拍为 [RHYTHMS] 模式为 [MODE]" blockType="command"
    //% TONES.shadow="number" TONES.defl="65"
    //% RHYTHMS.shadow="number" RHYTHMS.defl="500"
    //% MODE.shadow="dropdown" MODE.options="buzzerMode" MODE.defl="False"
    export function buzzer_tone_set_arg(parameter: any, block: any) {
        const tones = parameter.TONES.code;
        const rhythms = parameter.RHYTHMS.code;
        const mode = parameter.MODE.code;
        Generator.addImport(`import Hiwonder`);
        Generator.addObject("", "", `beep = Hiwonder.Buzzer()`);
        Generator.addCode(`beep.playTone(${tones},${rhythms},${mode})`);
    }

    //% block="设置蜂鸣器音量为 [VALUE]" blockType="command"
    //% VALUE.shadow="number" VALUE.defl="100"
    export function buzzer_tone_set_volume(parameter: any, block: any) {
        const value = parameter.VALUE.code;
        Generator.addImport(`import Hiwonder`);
        Generator.addObject("", "", `beep = Hiwonder.Buzzer()`);
        Generator.addCode(`beep.setVolume(${value})`);
    }

    //% block="关闭蜂鸣器" blockType="command"
    export function close_buzzer(parameter: any, block: any) {
        Generator.addImport(`import Hiwonder`);
        Generator.addObject("", "", `beep = Hiwonder.Buzzer()`);
        Generator.addCode(`beep.onoff(False)`);
    }

    //% block="关闭低压报警" blockType="command"
    export function close_lowpower_warning(parameter: any, block: any) {
        Generator.addImport(`import Hiwonder`);
        Generator.addCode(`Hiwonder.disableLowPowerAlarm()`);
    }

    //% block="电量值(mV)" blockType="reporter"
    export function get_battery_level(parameter: any, block: any) {
        Generator.addImport(`import Hiwonder`);
        Generator.addCode(`Hiwonder.Battery_power()`);
    }

    //% block="设置RGB彩灯 [NUMS] 颜色 [COLOR]" blockType="command"
    //% NUMS.shadow="dropdown" NUMS.options="nums" NUMS.defl="0"
    //% COLOR.shadow="string" COLOR.defl="#ff0000"
    export function set_led_color(parameter: any, block: any) {
        const nums = parameter.NUMS.code;
        const color = parameter.COLOR.code;
        Generator.addImport(`import Hiwonder`);
        Generator.addObject("", "", `rgb = Hiwonder.RGB()`);
        Generator.addCode(`rgb.setRGB(${nums},int(${color}[1:3],16),int(${color}[3:5],16),int(${color}[5:7],16))`);
    }

    //% block="设置RGB彩灯 [NUMS] 红色 [RED] 绿色 [GREEN] 蓝色 [BLUE]" blockType="command"
    //% NUMS.shadow="dropdown" NUMS.options="nums" NUMS.defl="0"
    //% RED.shadow="number" RED.defl="255"
    //% GREEN.shadow="number" GREEN.defl="0"
    //% BLUE.shadow="number" BLUE.defl="0"
    export function set_led_color_arg(parameter: any, block: any) {
        const nums = parameter.NUMS.code;
        const red = parameter.RED.code;
        const green = parameter.GREEN.code;
        const blue = parameter.BLUE.code;
        Generator.addImport(`import Hiwonder`);
        Generator.addObject("", "", `rgb = Hiwonder.RGB()`);
        Generator.addCode(`rgb.setRGB(${nums},${red},${green},${blue})`);
    }

    //% block="设置RGB彩灯呼吸灯模式 颜色 [COLOR] 变化周期(0.5~20) [CYCLE] 秒" blockType="command"
    //% COLOR.shadow="dropdown" COLOR.options="lightColors" COLOR.defl="0"
    //% CYCLE.shadow="number" CYCLE.defl="1"
    export function rgb_module_breath_one(parameter: any, block: any) {
        const color = parameter.COLOR.code;
        const cycle = parameter.CYCLE.code;
        Generator.addImport(`import Hiwonder`);
        Generator.addObject("", "", `rgb = Hiwonder.RGB()`);
        Generator.addCode(`rgb.set_Breathing(${color},${cycle})`);
    }

    //% block="设置RGB彩灯炫彩模式" blockType="command"
    export function rgb_module_breath(parameter: any, block: any) {
        Generator.addImport(`import Hiwonder`);
        Generator.addObject("", "", `rgb = Hiwonder.RGB()`);
        Generator.addCode(`rgb.setRGBBreathingValue(5,10,15)`);
    }

    //% block="关闭RGB彩灯 [NUMS]" blockType="command"
    //% NUMS.shadow="dropdown" NUMS.options="nums" NUMS.defl="0"
    export function close_led(parameter: any, block: any) {
        const nums = parameter.NUMS.code;
        Generator.addCode(`rgb.setRGB(${nums},0,0,0)`);
    }

    //% block="输出打印字符 [STR]" blockType="command"
    //% STR.shadow="string" STR.defl="Hello"
    export function print_str(parameter: any, block: any) {
        const text = parameter.STR.code;
        Generator.addImport(`import time`);
        Generator.addCode(`print(${text})
time.sleep(0.05)`);
    }

    //% block="输出打印数字 [NUM]" blockType="command"
    //% NUM.shadow="number" NUM.defl="60"
    export function print_number(parameter: any, block: any) {
        const number = parameter.NUM.code;
        Generator.addImport(`import time`);
        Generator.addCode(`print(${number})
time.sleep(0.05)`);
    }

    //% block="当 [KEYS] 键短按时" blockType="hat"
    //% KEYS.shadow="dropdown" KEYS.options="keys" KEYS.defl="A"
    export function when_key_click_thread(parameter: any, block: any) {
        const keys = parameter.KEYS.code;
        Generator.addImport(`import Hiwonder`);
        Generator.addImport(`import time`);
        Generator.addImport(`import Hiwonder_DEV`);
        Generator.addObject("", "", `button${keys} = Hiwonder.Button('${keys}')`);
    }

    //% block="当 [KEYS] 键长按时" blockType="hat"
    //% KEYS.shadow="dropdown" KEYS.options="keys" KEYS.defl="A"
    export function when_key_longclick_thread(parameter: any, block: any) {
        const keys = parameter.KEYS.code;
        Generator.addImport(`import Hiwonder`);
        Generator.addImport(`import time`);
        Generator.addImport(`import Hiwonder_DEV`);
        Generator.addObject("", "", `button${keys} = Hiwonder.Button('${keys}')`);
    }

    //% block="[KEYS] 键被按下" blockType="boolean"
    //% KEYS.shadow="dropdown" KEYS.options="keys" KEYS.defl="A"
    export function key_is_pressed(parameter: any, block: any) {
        const keys = parameter.KEYS.code;
        Generator.addImport(`import Hiwonder`);
        Generator.addObject("", "", `button${keys} = Hiwonder.Button('${keys}')`);
        Generator.addCode(`button${keys}.read()`);
    }

    //% block="复位四足机器人机身姿态" blockType="command"
    export function robot_reset(parameter: any, block: any) {
        Generator.addImport(`import Hiwonder_DEV`);
        Generator.addObject("", "", `quadruped = Hiwonder_DEV.DEV_Quadruped_Board(Hiwonder_DEV.Port(9))`);
        Generator.addCode(`quadruped.reset()`);
    }

    //% block="设置四足机器人 [MOVE] [STEP] 步 单步时长 [DURATION] 毫秒 大腿摆幅(1~25) [VALUE1] 小腿外翻幅度(1~10) [VALUE2]" blockType="command"
    //% MOVE.shadow="dropdown" MOVE.options="moves" MOVE.defl="0"
    //% STEP.shadow="number" STEP.defl="10"
    //% DURATION.shadow="number" DURATION.defl="500"
    //% VALUE1.shadow="number" VALUE1.defl="25"
    //% VALUE2.shadow="number" VALUE2.defl="10"
    export function robot_move_step(parameter: any, block: any) {
        const move = parameter.MOVE.code;
        const step = parameter.STEP.code;
        const duration = parameter.DURATION.code;
        const value1 = parameter.VALUE1.code;
        const value2 = parameter.VALUE2.code;
        Generator.addImport(`import Hiwonder_DEV`);
        Generator.addObject("", "", `quadruped = Hiwonder_DEV.DEV_Quadruped_Board(Hiwonder_DEV.Port(9))`);
        Generator.addCode(`quadruped.move(${move},${step},${duration},${value1},${value2})`);
    }

    //% block="设置四足机器人 [MOVE] 单步时长 [DURATION] 毫秒 大腿摆幅(1~25) [VALUE1] 小腿外翻幅度(1~10) [VALUE2]" blockType="command"
    //% MOVE.shadow="dropdown" MOVE.options="moves" MOVE.defl="0"
    //% DURATION.shadow="number" DURATION.defl="500"
    //% VALUE1.shadow="number" VALUE1.defl="25"
    //% VALUE2.shadow="number" VALUE2.defl="10"
    export function robot_move(parameter: any, block: any) {
        const move = parameter.MOVE.code;
        const duration = parameter.DURATION.code;
        const value1 = parameter.VALUE1.code;
        const value2 = parameter.VALUE2.code;
        Generator.addImport(`import Hiwonder_DEV`);
        Generator.addObject("", "", `quadruped = Hiwonder_DEV.DEV_Quadruped_Board(Hiwonder_DEV.Port(9))`);
        Generator.addCode(`quadruped.move(${move},-1,${duration},${value1},${value2})`);
    }

    //% block="设置四足机器人 [MOVE] 偏移角度(-10~10) [OFFSET] 单步时长 [DURATION] 毫秒 大腿摆幅(1~25) [VALUE1] 小腿外翻幅度(1~10) [VALUE2]" blockType="command"
    //% MOVE.shadow="dropdown" MOVE.options="moves2" MOVE.defl="0"
    //% OFFSET.shadow="number" OFFSET.defl="0"
    //% DURATION.shadow="number" DURATION.defl="500"
    //% VALUE1.shadow="number" VALUE1.defl="25"
    //% VALUE2.shadow="number" VALUE2.defl="10"
    export function robot_move_offset(parameter: any, block: any) {
        const move = parameter.MOVE.code;
        const offset = parameter.OFFSET.code;
        const duration = parameter.DURATION.code;
        const value1 = parameter.VALUE1.code;
        const value2 = parameter.VALUE2.code;
        Generator.addImport(`import Hiwonder_DEV`);
        Generator.addObject("", "", `quadruped = Hiwonder_DEV.DEV_Quadruped_Board(Hiwonder_DEV.Port(9))`);
        Generator.addCode(`quadruped.move(${move},-1,${duration},${value1},${value2},${offset})`);
    }

    //% block="设置四足机器人运动方向 [MOVE] 偏移角度(-10~10) [OFFSET] [STEP] 步 单步时长 [DURATION] 毫秒 大腿摆幅(1~25) [VALUE1] 小腿外翻幅度(1~10) [VALUE2]" blockType="command"
    //% MOVE.shadow="number" MOVE.defl="0"
    //% OFFSET.shadow="number" OFFSET.defl="0"
    //% STEP.shadow="number" STEP.defl="10"
    //% DURATION.shadow="number" DURATION.defl="500"
    //% VALUE1.shadow="number" VALUE1.defl="25"
    //% VALUE2.shadow="number" VALUE2.defl="10"
    export function robot_move_step_arg(parameter: any, block: any) {
        const move = parameter.MOVE.code;
        const offset = parameter.OFFSET.code;
        const step = parameter.STEP.code;
        const duration = parameter.DURATION.code;
        const value1 = parameter.VALUE1.code;
        const value2 = parameter.VALUE2.code;
        Generator.addImport(`import Hiwonder_DEV`);
        Generator.addObject("", "", `quadruped = Hiwonder_DEV.DEV_Quadruped_Board(Hiwonder_DEV.Port(9))`);
        Generator.addCode(`quadruped.move(${move},${step},${duration},${value1},${value2},${offset})`);
    }

    //% block="停止四足机器人运动" blockType="command"
    export function robot_stop_run(parameter: any, block: any) {
        Generator.addImport(`import Hiwonder_DEV`);
        Generator.addObject("", "", `quadruped = Hiwonder_DEV.DEV_Quadruped_Board(Hiwonder_DEV.Port(9))`);
        Generator.addCode(`quadruped.stand()`);
    }

    //% block="设置四足机器人执行 [ACTION] [STEP] 次 每次时长 [DURATION] 毫秒" blockType="command"
    //% ACTION.shadow="dropdown" ACTION.options="actions" ACTION.defl="6"
    //% STEP.shadow="number" STEP.defl="10"
    //% DURATION.shadow="number" DURATION.defl="500"
    export function robot_run_action(parameter: any, block: any) {
        const action = parameter.ACTION.code;
        const step = parameter.STEP.code;
        const duration = parameter.DURATION.code;
        Generator.addImport(`import Hiwonder_DEV`);
        Generator.addObject("", "", `quadruped = Hiwonder_DEV.DEV_Quadruped_Board(Hiwonder_DEV.Port(9))`);
        Generator.addCode(`quadruped.move(${action},${step},${duration})`);
    }

    //% block="设置四足机器人舵机ID(11~18) [ID] 位置(200~800) [POS] 时长 [DURATION] 毫秒" blockType="command"
    //% ID.shadow="number" ID.defl="11"
    //% POS.shadow="number" POS.defl="500"
    //% DURATION.shadow="number" DURATION.defl="500"
    export function robot_servo_set(parameter: any, block: any) {
        const id = parameter.ID.code;
        const position = parameter.POS.code;
        const duration = parameter.DURATION.code;
        Generator.addImport(`import Hiwonder_DEV`);
        Generator.addObject("", "", `quadruped = Hiwonder_DEV.DEV_Quadruped_Board(Hiwonder_DEV.Port(9))`);
        Generator.addCode(`quadruped.set_servo_pose(${id},${position},${duration})`);
    }

    //% block="获取舵机ID [NUM] 的位置" blockType="reporter"
    //% NUM.shadow="number" NUM.defl="11"
    export function get_robot_servo_pos(parameter: any, block: any) {
        const number = parameter.NUM.code;
        Generator.addImport(`import Hiwonder_DEV`);
        Generator.addObject("", "", `quadruped = Hiwonder_DEV.DEV_Quadruped_Board(Hiwonder_DEV.Port(9))`);
        Generator.addCode(`quadruped.read_servo_pose(${number})`);
    }

    //% block="初始化IMU传感器" blockType="command"
    export function imu_init(parameter: any, block: any) {
        Generator.addImport(`import Hiwonder`);
        Generator.addObject("", "", `imu = Hiwonder.IMU()`);
    }

    //% block="校准IMU传感器" blockType="command"
    export function imu_cali(parameter: any, block: any) {
        Generator.addImport(`import Hiwonder`);
        Generator.addObject("", "", `buttonA = Hiwonder.Button('A')`);
        Generator.addObject("", "", `def is_stop_3091ratyxq():
  return buttonA.read()`);
        Generator.addVariableForce("imu", "imu = Hiwonder.IMU(True, is_stop_3091ratyxq)");
    }

    //% block="获取设备 [VALUE]" blockType="reporter"
    //% VALUE.shadow="dropdown" VALUE.options="eulerElement" VALUE.defl="0"
    export function get_euler_angle_element_value(parameter: any, block: any) {
        const value = parameter.VALUE.code;
        Generator.addCode(`imu.get_angle()[${value}]`);
    }

    //% block="设置蓝牙模式 [MODE] 名称 [NAME]" blockType="command"
    //% MODE.shadow="dropdown" MODE.options="bleMode" MODE.defl="BLE.MODE_BLE_SLAVE"
    //% NAME.shadow="string" NAME.defl="aimech"
    export function set_ble_mode(parameter: any, block: any) {
        const mode = parameter.MODE.code;
        const name = parameter.NAME.code;
        Generator.addImport(`from Hiwonder_BLE import BLE`);
        Generator.addObject("", "", `ble = BLE(${mode},${name})`);
    }

    //% block="蓝牙是否已连接" blockType="boolean"
    export function ble_is_connected(parameter: any, block: any) {
        Generator.addCode(`ble.is_connected()`);
    }

    //% block="获取蓝牙MAC地址" blockType="reporter"
    export function get_ble_mac(parameter: any, block: any) {
        Generator.addCode(`ble.get_mac()`);
    }

    //% block="蓝牙收到的数据是否包含 [VALUE]" blockType="boolean"
    //% VALUE.shadow="string" VALUE.defl="CMD"
    export function ble_wait_end(parameter: any, block: any) {
        const value = parameter.VALUE.code;
        Generator.addCode(`ble.contains_data(${value})`);
    }

    //% block="读取蓝牙数据" blockType="reporter"
    export function read_ble_data(parameter: any, block: any) {
        Generator.addCode(`ble.read_uart_cmd()`);
    }

    //% block="解析蓝牙数据 [DATA] 获取命令" blockType="reporter"
    //% DATA.shadow="string" DATA.defl="0"
    export function get_ble_cmd(parameter: any, block: any) {
        const data = parameter.DATA.code;
        Generator.addCode(`ble.parse_uart_cmd(${data})[0]`);
    }

    //% block="解析蓝牙数据 [DATA] 获取参数 [NUM]" blockType="reporter"
    //% DATA.shadow="string" DATA.defl="0"
    //% NUM.shadow="number" NUM.defl="1"
    export function get_ble_args(parameter: any, block: any) {
        const data = parameter.DATA.code;
        const num = parameter.NUM.code;
        Generator.addCode(`ble.parse_uart_cmd(${data})[${num}]`);
    }

    //% block="蓝牙发送数据 [DATA]" blockType="command"
    //% DATA.shadow="string" DATA.defl="CMD"
    export function ble_write(parameter: any, block: any) {
        const data = parameter.DATA.code;
        Generator.addCode(`ble.send_data(${data})`);
    }
}
