// AI机甲双驱车 Python 作者源：维护旧 VM 启用积木与 Python 生成规则。
//% color="#1874cd" iconWidth=50 iconHeight=40
namespace aimech {
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

    //% block="设置RGB彩灯颜色 [COLOR]" blockType="command"
    //% COLOR.shadow="string" COLOR.defl="#ff0000"
    export function set_led_color(parameter: any, block: any) {
        const color = parameter.COLOR.code;
        Generator.addImport(`import Hiwonder`);
        Generator.addObject("", "", `rgb = Hiwonder.RGB()`);
        Generator.addCode(`rgb.setRGB(0,int(${color}[1:3],16),int(${color}[3:5],16),int(${color}[5:7],16))`);
    }

    //% block="设置RGB彩灯红色 [RED] 绿色 [GREEN] 蓝色 [BLUE]" blockType="command"
    //% RED.shadow="number" RED.defl="255"
    //% GREEN.shadow="number" GREEN.defl="0"
    //% BLUE.shadow="number" BLUE.defl="0"
    export function set_led_color_arg(parameter: any, block: any) {
        const red = parameter.RED.code;
        const green = parameter.GREEN.code;
        const blue = parameter.BLUE.code;
        Generator.addImport(`import Hiwonder`);
        Generator.addObject("", "", `rgb = Hiwonder.RGB()`);
        Generator.addCode(`rgb.setRGB(0,${red},${green},${blue})`);
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

    //% block="关闭RGB彩灯" blockType="command"
    export function close_led(parameter: any, block: any) {
        Generator.addCode(`rgb.setRGB(0,0,0,0)`);
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

    //% block="设置小车以[SPEED]转/分钟的转速[ORIENTION]" blockType="command"
    //% SPEED.shadow="number" SPEED.defl="60"
    //% ORIENTION.shadow="dropdown" ORIENTION.options="oriention2" ORIENTION.defl="1"
    export function motor_speed_set(parameter: any, block: any) {
        const speed = parameter.SPEED.code;
        const oriention = parameter.ORIENTION.code;
        Generator.addImport(`import Hiwonder`);
        Generator.addObject("", "", `motor = Hiwonder.Car()`);
        Generator.addCode(`motor.run_rpm(${speed}*${oriention})`);
    }

    //% block="设置小车以[SPEED]转/分钟的转速 [ORIENTION] [DISTANCE] 厘米" blockType="command"
    //% SPEED.shadow="number" SPEED.defl="60"
    //% ORIENTION.shadow="dropdown" ORIENTION.options="oriention2" ORIENTION.defl="1"
    //% DISTANCE.shadow="number" DISTANCE.defl="100"
    export function set_motor_run_distance(parameter: any, block: any) {
        const speed = parameter.SPEED.code;
        const oriention = parameter.ORIENTION.code;
        const distance = parameter.DISTANCE.code;
        Generator.addImport(`import Hiwonder`);
        Generator.addObject("", "", `motor = Hiwonder.Car()`);
        Generator.addCode(`motor.run_distance(${distance}*${oriention},${speed})`);
    }

    //% block="设置小车以[SPEED]转/分钟的转速 [TURN] [ANGLE] 度" blockType="command"
    //% SPEED.shadow="number" SPEED.defl="60"
    //% TURN.shadow="dropdown" TURN.options="orientionTurn" TURN.defl="1"
    //% ANGLE.shadow="number" ANGLE.defl="90"
    export function set_motor_run_oriention_angle(parameter: any, block: any) {
        const speed = parameter.SPEED.code;
        const turn = parameter.TURN.code;
        const angle = parameter.ANGLE.code;
        Generator.addImport(`import Hiwonder`);
        Generator.addObject("", "", `motor = Hiwonder.Car()`);
        Generator.addCode(`motor.turn_angle(${angle}*${turn},${speed})`);
    }

    //% block="设置 [WHEEL] 以 [SPEED] 转/分钟的转速启动" blockType="command"
    //% WHEEL.shadow="dropdown" WHEEL.options="wheel" WHEEL.defl="1"
    //% SPEED.shadow="number" SPEED.defl="60"
    export function set_motor_run_speed(parameter: any, block: any) {
        const wheel = parameter.WHEEL.code;
        const speed = parameter.SPEED.code;
        Generator.addImport(`import Hiwonder`);
        Generator.addObject("", "", `motor = Hiwonder.Car()`);
        Generator.addCode(`motor.motor_run_rpm(${wheel},${speed})`);
    }

    //% block="设置[WHEEL]以[SPEED]转/分钟的转速运行[ANGLE]度" blockType="command"
    //% WHEEL.shadow="dropdown" WHEEL.options="wheel" WHEEL.defl="1"
    //% SPEED.shadow="number" SPEED.defl="60"
    //% ANGLE.shadow="number" ANGLE.defl="180"
    export function set_motor_run_angle(parameter: any, block: any) {
        const wheel = parameter.WHEEL.code;
        const speed = parameter.SPEED.code;
        const angle = parameter.ANGLE.code;
        Generator.addImport(`import Hiwonder`);
        Generator.addObject("", "", `motor = Hiwonder.Car()`);
        Generator.addCode(`motor.motor_run_angle(${wheel},${angle},${speed})`);
    }

    //% block="设置左轮(EM1)转速[SPEED]转/分钟, 右轮(EM2)转速[SPEED2]转/分钟" blockType="command"
    //% SPEED.shadow="number" SPEED.defl="60"
    //% SPEED2.shadow="number" SPEED2.defl="60"
    export function set_motor_run_two_wheel(parameter: any, block: any) {
        const speed = parameter.SPEED.code;
        const speed2 = parameter.SPEED2.code;
        Generator.addImport(`import Hiwonder`);
        Generator.addObject("", "", `motor = Hiwonder.Car()`);
        Generator.addCode(`motor.motors_run_rpm(${speed},${speed2})`);
    }

    //% block="设置左轮(EM1)动力 [SPEED] %, 右轮(EM2)动力 [SPEED2] %" blockType="command"
    //% SPEED.shadow="number" SPEED.defl="25"
    //% SPEED2.shadow="number" SPEED2.defl="25"
    export function set_motor_run_two_wheel_percent(parameter: any, block: any) {
        const speed = parameter.SPEED.code;
        const speed2 = parameter.SPEED2.code;
        Generator.addImport(`import Hiwonder`);
        Generator.addObject("", "", `motor = Hiwonder.Car()`);
        Generator.addCode(`motor.motors_run_rpm(${speed}*1.5,${speed2}*1.5)`);
    }

    //% block="停止编码电机 [WHEEL] 运行" blockType="command"
    //% WHEEL.shadow="dropdown" WHEEL.options="wheel" WHEEL.defl="1"
    export function set_motor_stop(parameter: any, block: any) {
        const wheel = parameter.WHEEL.code;
        Generator.addImport(`import Hiwonder`);
        Generator.addObject("", "", `motor = Hiwonder.Car()`);
        Generator.addCode(`motor.stop(${wheel})`);
    }

    //% block="获取[WHEEL] 转过的度数" blockType="reporter"
    //% WHEEL.shadow="dropdown" WHEEL.options="wheel2" WHEEL.defl="1"
    export function get_servo_run_angle(parameter: any, block: any) {
        const wheel = parameter.WHEEL.code;
        Generator.addImport(`import Hiwonder`);
        Generator.addObject("", "", `motor = Hiwonder.Car()`);
        Generator.addCode(`motor.get_motor_angle(${wheel})`);
    }

    //% block="重置 [WHEEL] 转过的度数" blockType="command"
    //% WHEEL.shadow="dropdown" WHEEL.options="wheel" WHEEL.defl="1"
    export function reset_run_angle(parameter: any, block: any) {
        const wheel = parameter.WHEEL.code;
        Generator.addImport(`import Hiwonder`);
        Generator.addObject("", "", `motor = Hiwonder.Car()`);
        Generator.addCode(`motor.reset_motor_angle(${wheel})`);
    }

    //% block="设置小车进行PD调节巡线（偏差值 [OFFSET] 基础速度 [SPEED] 最大速度 [MAXSPEED] Kp值 [KP] Kd值 [KD]）" blockType="command"
    //% OFFSET.shadow="number" OFFSET.defl="0"
    //% SPEED.shadow="number" SPEED.defl="50"
    //% MAXSPEED.shadow="number" MAXSPEED.defl="150"
    //% KP.shadow="number" KP.defl="20"
    //% KD.shadow="number" KD.defl="10"
    export function pd_set_pd_line(parameter: any, block: any) {
        const offset = parameter.OFFSET.code;
        const speed = parameter.SPEED.code;
        const maxspeed = parameter.MAXSPEED.code;
        const kp = parameter.KP.code;
        const kd = parameter.KD.code;
        Generator.addImport(`import Hiwonder`);
        Generator.addObject("", "", `motor = Hiwonder.Car()`);
        Generator.addCode(`motor.pd_set_speed(${offset},${speed},${maxspeed},${kp},${kd})`);
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
