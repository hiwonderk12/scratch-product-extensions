// AI机甲麦轮车 Python 作者源：积木与代码模板由已校对的声明式产品包机械迁移。
//% color="#1874cd" iconWidth=50 iconHeight=40
namespace aimecanum {
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

    //% block="等待 [SECONDS] 秒" blockType="command"
    //% SECONDS.shadow="number" SECONDS.defl="1"
    export function wait_seconds(parameter: any, block: any) {
        const value_SECONDS = parameter.SECONDS.code;
        Generator.addImport(`import time`);
        Generator.addCode(`time.sleep(${value_SECONDS})`);
    }

    //% block="播放音调为 [TONES] 节拍为 [RHYTHMS] 模式为 [MODE]" blockType="command"
    //% TONES.shadow="dropdown" TONES.options="tones" TONES.defl="65"
    //% RHYTHMS.shadow="dropdown" RHYTHMS.options="rhythms" RHYTHMS.defl="500"
    //% MODE.shadow="dropdown" MODE.options="buzzerMode" MODE.defl="False"
    export function buzzer_tone_set(parameter: any, block: any) {
        const value_TONES = parameter.TONES.code;
        const value_RHYTHMS = parameter.RHYTHMS.code;
        const value_MODE = parameter.MODE.code;
        Generator.addImport(`import Hiwonder`);
        Generator.addObject("", "", `beep = Hiwonder.Buzzer()`);
        Generator.addCode(`beep.playTone(${value_TONES},${value_RHYTHMS},${value_MODE})`);
    }

    //% block="播放音调为 [TONES] 节拍为 [RHYTHMS] 模式为 [MODE]" blockType="command"
    //% TONES.shadow="number" TONES.defl="65"
    //% RHYTHMS.shadow="number" RHYTHMS.defl="500"
    //% MODE.shadow="dropdown" MODE.options="buzzerMode" MODE.defl="False"
    export function buzzer_tone_set_arg(parameter: any, block: any) {
        const value_TONES = parameter.TONES.code;
        const value_RHYTHMS = parameter.RHYTHMS.code;
        const value_MODE = parameter.MODE.code;
        Generator.addImport(`import Hiwonder`);
        Generator.addObject("", "", `beep = Hiwonder.Buzzer()`);
        Generator.addCode(`beep.playTone(${value_TONES},${value_RHYTHMS},${value_MODE})`);
    }

    //% block="蜂鸣器设置音量大小 [VALUE]" blockType="command"
    //% VALUE.shadow="number" VALUE.defl="100"
    export function buzzer_tone_set_volume(parameter: any, block: any) {
        const value_VALUE = parameter.VALUE.code;
        Generator.addImport(`import Hiwonder`);
        Generator.addObject("", "", `beep = Hiwonder.Buzzer()`);
        Generator.addCode(`beep.setVolume(${value_VALUE})`);
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
    //% COLOR.shadow="string" COLOR.defl="#ffbf00"
    export function set_led_color(parameter: any, block: any) {
        const value_NUMS = parameter.NUMS.code;
        const value_COLOR = parameter.COLOR.code;
        Generator.addImport(`import Hiwonder`);
        Generator.addObject("", "", `rgb = Hiwonder.RGB()`);
        Generator.addCode(`rgb.setRGB(${value_NUMS}, int(${value_COLOR}[1:3], 16), int(${value_COLOR}[3:5], 16), int(${value_COLOR}[5:7], 16))`);
    }

    //% block="设置RGB彩灯红色 [RED] 绿色 [GREEN] 蓝色 [BLUE]" blockType="command"
    //% RED.shadow="number" RED.defl="255"
    //% GREEN.shadow="number" GREEN.defl="0"
    //% BLUE.shadow="number" BLUE.defl="0"
    export function set_led_color_arg(parameter: any, block: any) {
        const value_RED = parameter.RED.code;
        const value_GREEN = parameter.GREEN.code;
        const value_BLUE = parameter.BLUE.code;
        Generator.addImport(`import Hiwonder`);
        Generator.addObject("", "", `rgb = Hiwonder.RGB()`);
        Generator.addCode(`rgb.setRGB(0,${value_RED},${value_GREEN},${value_BLUE})`);
    }

    //% block="设置RGB彩灯呼吸灯模式,颜色 [COLOR] 变化周期(0.5~20) [CYCLE] 秒" blockType="command"
    //% COLOR.shadow="dropdown" COLOR.options="lightColors" COLOR.defl="0"
    //% CYCLE.shadow="number" CYCLE.defl="1"
    export function rgb_module_breath_one(parameter: any, block: any) {
        const value_COLOR = parameter.COLOR.code;
        const value_CYCLE = parameter.CYCLE.code;
        Generator.addImport(`import Hiwonder`);
        Generator.addObject("", "", `rgb = Hiwonder.RGB()`);
        Generator.addCode(`rgb.set_Breathing(${value_COLOR},${value_CYCLE})`);
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
        const value_NUMS = parameter.NUMS.code;
        Generator.addImport(`import Hiwonder`);
        Generator.addObject("", "", `rgb = Hiwonder.RGB()`);
        Generator.addCode(`rgb.setRGB(${value_NUMS},0,0,0)`);
    }

    //% block="输出字符 [STR]" blockType="command"
    //% STR.shadow="string" STR.defl="Hello"
    export function print_str(parameter: any, block: any) {
        const value_STR = parameter.STR.code;
        Generator.addImport(`import time`);
        Generator.addCode(`print(${value_STR})
time.sleep(0.05)`);
    }

    //% block="输出数字 [NUM]" blockType="command"
    //% NUM.shadow="number" NUM.defl="60"
    export function print_number(parameter: any, block: any) {
        const value_NUM = parameter.NUM.code;
        Generator.addImport(`import time`);
        Generator.addCode(`print(${value_NUM})
time.sleep(0.05)`);
    }

    //% block="当 [KEYS] 键短按时" blockType="hat"
    //% KEYS.shadow="dropdown" KEYS.options="keys" KEYS.defl="A"
    export function when_key_click_thread(parameter: any, block: any) {
        const value_KEYS = parameter.KEYS.code;
        Generator.addImport(`import Hiwonder`);
        Generator.addImport(`import time`);
        Generator.addImport(`import Hiwonder_DEV`);
        Generator.addObject("", "", `button${value_KEYS} = Hiwonder.Button('${value_KEYS}')`);
    }

    //% block="当 [KEYS] 键长按时" blockType="hat"
    //% KEYS.shadow="dropdown" KEYS.options="keys" KEYS.defl="A"
    export function when_key_longclick_thread(parameter: any, block: any) {
        const value_KEYS = parameter.KEYS.code;
        Generator.addImport(`import Hiwonder`);
        Generator.addImport(`import time`);
        Generator.addImport(`import Hiwonder_DEV`);
        Generator.addObject("", "", `button${value_KEYS} = Hiwonder.Button('${value_KEYS}')`);
    }

    //% block="[KEYS] 键被按下" blockType="boolean"
    //% KEYS.shadow="dropdown" KEYS.options="keys" KEYS.defl="A"
    export function key_is_pressed(parameter: any, block: any) {
        const value_KEYS = parameter.KEYS.code;
        Generator.addImport(`import Hiwonder`);
        Generator.addObject("", "", `button${value_KEYS} = Hiwonder.Button('${value_KEYS}')`);
        Generator.addCode(`button${value_KEYS}.read()`);
    }

    //% block="设置麦轮小车左前轮 [SPEED1], 左后轮 [SPEED2], 右前轮 [SPEED3], 右后轮 [SPEED4] 转/分钟" blockType="command"
    //% SPEED1.shadow="number" SPEED1.defl="60"
    //% SPEED2.shadow="number" SPEED2.defl="60"
    //% SPEED3.shadow="number" SPEED3.defl="60"
    //% SPEED4.shadow="number" SPEED4.defl="60"
    export function set_motor_speed_all(parameter: any, block: any) {
        const value_SPEED1 = parameter.SPEED1.code;
        const value_SPEED2 = parameter.SPEED2.code;
        const value_SPEED3 = parameter.SPEED3.code;
        const value_SPEED4 = parameter.SPEED4.code;
        Generator.addImport(`import Hiwonder_DEV`);
        Generator.addObject("", "", `mecanumCar = Hiwonder_DEV.DEV_MecanumCar()`);
        Generator.addCode(`mecanumCar.set_motors_speed(${value_SPEED4},${value_SPEED3},${value_SPEED2},${value_SPEED1})`);
    }

    //% block="设置麦轮小车 [WHEEL] 轮速度为 [SPEED] 转/分钟" blockType="command"
    //% WHEEL.shadow="dropdown" WHEEL.options="wheels" WHEEL.defl="4"
    //% SPEED.shadow="number" SPEED.defl="60"
    export function set_motor_speed_one(parameter: any, block: any) {
        const value_WHEEL = parameter.WHEEL.code;
        const value_SPEED = parameter.SPEED.code;
        Generator.addImport(`import Hiwonder_DEV`);
        Generator.addObject("", "", `mecanumCar = Hiwonder_DEV.DEV_MecanumCar()`);
        Generator.addCode(`mecanumCar.set_motor_speed(${value_WHEEL},${value_SPEED})`);
    }

    //% block="设置麦轮小车 [SIDE] 轮组速度为 [SPEED] 转/分钟" blockType="command"
    //% SIDE.shadow="dropdown" SIDE.options="sides" SIDE.defl="0"
    //% SPEED.shadow="number" SPEED.defl="60"
    export function set_motor_speed_two(parameter: any, block: any) {
        const value_SIDE = parameter.SIDE.code;
        const value_SPEED = parameter.SPEED.code;
        Generator.addImport(`import Hiwonder_DEV`);
        Generator.addObject("", "", `mecanumCar = Hiwonder_DEV.DEV_MecanumCar()`);
        Generator.addCode(`mecanumCar.set_2_speeds(${value_SIDE},${value_SPEED})`);
    }

    //% block="设置麦轮小车以 [SPEED] 转/分钟的速度面向 [ORIENTION] 方向移动" blockType="command"
    //% ORIENTION.shadow="dropdown" ORIENTION.options="oriention8" ORIENTION.defl="0"
    //% SPEED.shadow="number" SPEED.defl="60"
    export function move_oriention(parameter: any, block: any) {
        const value_ORIENTION = parameter.ORIENTION.code;
        const value_SPEED = parameter.SPEED.code;
        Generator.addImport(`import Hiwonder_DEV`);
        Generator.addObject("", "", `mecanumCar = Hiwonder_DEV.DEV_MecanumCar()`);
        Generator.addCode(`mecanumCar.move_dir(${value_ORIENTION},${value_SPEED})`);
    }

    //% block="设置麦轮小车以 [SPEED] 转/分钟的速度面向 [ORIENTION] 度方向移动" blockType="command"
    //% ORIENTION.shadow="number" ORIENTION.defl="0"
    //% SPEED.shadow="number" SPEED.defl="60"
    export function move_oriention_angle(parameter: any, block: any) {
        const value_ORIENTION = parameter.ORIENTION.code;
        const value_SPEED = parameter.SPEED.code;
        Generator.addImport(`import Hiwonder_DEV`);
        Generator.addObject("", "", `mecanumCar = Hiwonder_DEV.DEV_MecanumCar()`);
        Generator.addCode(`mecanumCar.move_dir(${value_ORIENTION},${value_SPEED})`);
    }

    //% block="设置麦轮小车X轴速度 [SPEED1], Y轴速度 [SPEED2]" blockType="command"
    //% SPEED1.shadow="number" SPEED1.defl="60"
    //% SPEED2.shadow="number" SPEED2.defl="60"
    export function set_x_y_speed(parameter: any, block: any) {
        const value_SPEED1 = parameter.SPEED1.code;
        const value_SPEED2 = parameter.SPEED2.code;
        Generator.addImport(`import Hiwonder_DEV`);
        Generator.addObject("", "", `mecanumCar = Hiwonder_DEV.DEV_MecanumCar()`);
        Generator.addCode(`mecanumCar.set_xy_speed(${value_SPEED1},${value_SPEED2})`);
    }

    //% block="设置麦轮小车停止" blockType="command"
    export function move_stop(parameter: any, block: any) {
        Generator.addImport(`import Hiwonder_DEV`);
        Generator.addObject("", "", `mecanumCar = Hiwonder_DEV.DEV_MecanumCar()`);
        Generator.addCode(`mecanumCar.stop()`);
    }

    //% block="设置麦轮小车以 [SPEED] 转/分钟的转速向 [ORIENTION] 移动 [DISTANCE] 厘米" blockType="command"
    //% ORIENTION.shadow="dropdown" ORIENTION.options="oriention4" ORIENTION.defl="0"
    //% DISTANCE.shadow="number" DISTANCE.defl="10"
    //% SPEED.shadow="number" SPEED.defl="60"
    export function move_distance(parameter: any, block: any) {
        const value_ORIENTION = parameter.ORIENTION.code;
        const value_DISTANCE = parameter.DISTANCE.code;
        const value_SPEED = parameter.SPEED.code;
        Generator.addImport(`import Hiwonder_DEV`);
        Generator.addObject("", "", `mecanumCar = Hiwonder_DEV.DEV_MecanumCar()`);
        Generator.addCode(`mecanumCar.move_distance(${value_DISTANCE},${value_ORIENTION},${value_SPEED})`);
    }

    //% block="设置麦轮小车以 [SPEED] 转/分钟的转速向 [ORIENTION] 度方向平移 [DISTANCE] 厘米" blockType="command"
    //% ORIENTION.shadow="number" ORIENTION.defl="0"
    //% DISTANCE.shadow="number" DISTANCE.defl="10"
    //% SPEED.shadow="number" SPEED.defl="60"
    export function move_distance_arg(parameter: any, block: any) {
        const value_ORIENTION = parameter.ORIENTION.code;
        const value_DISTANCE = parameter.DISTANCE.code;
        const value_SPEED = parameter.SPEED.code;
        Generator.addImport(`import Hiwonder_DEV`);
        Generator.addObject("", "", `mecanumCar = Hiwonder_DEV.DEV_MecanumCar()`);
        Generator.addCode(`mecanumCar.move_distance(${value_DISTANCE},${value_ORIENTION},${value_SPEED})`);
    }

    //% block="设置麦轮小车以 [SPEED] %的动力面向 [ORIENTION] 方向移动" blockType="command"
    //% ORIENTION.shadow="dropdown" ORIENTION.options="oriention8" ORIENTION.defl="0"
    //% SPEED.shadow="number" SPEED.defl="60"
    export function move_all(parameter: any, block: any) {
        const value_ORIENTION = parameter.ORIENTION.code;
        const value_SPEED = parameter.SPEED.code;
        Generator.addImport(`import Hiwonder_DEV`);
        Generator.addObject("", "", `mecanumCar = Hiwonder_DEV.DEV_MecanumCar()`);
        Generator.addCode(`mecanumCar.move_dir(${value_ORIENTION},${value_SPEED}*1.5)`);
    }

    //% block="设置麦轮小车以 [SPEED] %的动力面向 [ORIENTION] 度方向移动" blockType="command"
    //% ORIENTION.shadow="number" ORIENTION.defl="0"
    //% SPEED.shadow="number" SPEED.defl="60"
    export function move_all_angle(parameter: any, block: any) {
        const value_ORIENTION = parameter.ORIENTION.code;
        const value_SPEED = parameter.SPEED.code;
        Generator.addImport(`import Hiwonder_DEV`);
        Generator.addObject("", "", `mecanumCar = Hiwonder_DEV.DEV_MecanumCar()`);
        Generator.addCode(`mecanumCar.move_dir(${value_ORIENTION},${value_SPEED}*1.5)`);
    }

    //% block="设置麦轮小车以 [SPEED] %的动力 [ORIENTION]" blockType="command"
    //% ORIENTION.shadow="dropdown" ORIENTION.options="orientionTurn" ORIENTION.defl="1"
    //% SPEED.shadow="number" SPEED.defl="60"
    export function turn_percent(parameter: any, block: any) {
        const value_ORIENTION = parameter.ORIENTION.code;
        const value_SPEED = parameter.SPEED.code;
        Generator.addImport(`import Hiwonder_DEV`);
        Generator.addObject("", "", `mecanumCar = Hiwonder_DEV.DEV_MecanumCar()`);
        Generator.addCode(`mecanumCar.rotate_speed(${value_ORIENTION}*${value_SPEED}*1.5)`);
    }

    //% block="设置麦轮小车以 [SPEED] 转/分钟的转速 [ORIENTION]" blockType="command"
    //% ORIENTION.shadow="dropdown" ORIENTION.options="orientionTurn" ORIENTION.defl="1"
    //% SPEED.shadow="number" SPEED.defl="60"
    export function turn_speed(parameter: any, block: any) {
        const value_ORIENTION = parameter.ORIENTION.code;
        const value_SPEED = parameter.SPEED.code;
        Generator.addImport(`import Hiwonder_DEV`);
        Generator.addObject("", "", `mecanumCar = Hiwonder_DEV.DEV_MecanumCar()`);
        Generator.addCode(`mecanumCar.rotate_speed(${value_ORIENTION}*${value_SPEED})`);
    }

    //% block="获取电机 [ID] 转过的度数" blockType="reporter"
    //% ID.shadow="dropdown" ID.options="wheelMotors" ID.defl="4"
    export function get_motor_angle(parameter: any, block: any) {
        const value_ID = parameter.ID.code;
        Generator.addImport(`import Hiwonder_DEV`);
        Generator.addObject("", "", `mecanumCar = Hiwonder_DEV.DEV_MecanumCar()`);
        Generator.addCode(`mecanumCar.read_motor_angle(${value_ID})`);
    }

    //% block="重置底盘" blockType="command"
    export function reset_motor(parameter: any, block: any) {
        Generator.addImport(`import Hiwonder_DEV`);
        Generator.addObject("", "", `mecanumCar = Hiwonder_DEV.DEV_MecanumCar()`);
        Generator.addCode(`mecanumCar.reset()`);
    }

    //% block="电机 [ID] 运动完成？" blockType="boolean"
    //% ID.shadow="dropdown" ID.options="wheelMotors" ID.defl="4"
    export function is_motor_ready(parameter: any, block: any) {
        const value_ID = parameter.ID.code;
        Generator.addImport(`import Hiwonder_DEV`);
        Generator.addObject("", "", `mecanumCar = Hiwonder_DEV.DEV_MecanumCar()`);
        Generator.addCode(`mecanumCar.read_motor_ready(${value_ID})`);
    }

    //% block="所有电机是否都运动完成？" blockType="boolean"
    export function is_all_ready(parameter: any, block: any) {
        Generator.addImport(`import Hiwonder_DEV`);
        Generator.addObject("", "", `mecanumCar = Hiwonder_DEV.DEV_MecanumCar()`);
        Generator.addCode(`mecanumCar.read_ready()`);
    }

    //% block="设置小车进行PD调节巡线（偏差值 [OFFSET] 基础速度 [SPEED] 最大速度 [MAXSPEED] Kp值 [KP] Kd值 [KD] 运动方向 [ORIENTION]）" blockType="command"
    //% OFFSET.shadow="number" OFFSET.defl="0"
    //% SPEED.shadow="number" SPEED.defl="40"
    //% MAXSPEED.shadow="number" MAXSPEED.defl="80"
    //% KP.shadow="number" KP.defl="0.3"
    //% KD.shadow="number" KD.defl="0.1"
    //% ORIENTION.shadow="dropdown" ORIENTION.options="moveDirection" ORIENTION.defl="1"
    export function pd_set_pd_line(parameter: any, block: any) {
        const value_OFFSET = parameter.OFFSET.code;
        const value_SPEED = parameter.SPEED.code;
        const value_MAXSPEED = parameter.MAXSPEED.code;
        const value_KP = parameter.KP.code;
        const value_KD = parameter.KD.code;
        const value_ORIENTION = parameter.ORIENTION.code;
        Generator.addImport(`import Hiwonder_DEV`);
        Generator.addObject("", "", `mecanumCar = Hiwonder_DEV.DEV_MecanumCar()`);
        Generator.addCode(`mecanumCar.pd_set_speed(${value_OFFSET},${value_SPEED},${value_MAXSPEED},${value_KP},${value_KD},${value_ORIENTION})`);
    }

    //% block="初始化IMU传感器" blockType="command"
    export function imu_init(parameter: any, block: any) {
        Generator.addImport(`import Hiwonder`);
        Generator.addObject("", "", `imu = Hiwonder.IMU()`);
    }

    //% block="校准IMU传感器" blockType="command"
    export function imu_cali(parameter: any, block: any) {
        Generator.addImport(`import Hiwonder`);
        Generator.addObject("", "", `imu = Hiwonder.IMU()`);
    }

    //% block="获取设备 [VALUE]" blockType="reporter"
    //% VALUE.shadow="dropdown" VALUE.options="eulerElement" VALUE.defl="0"
    export function get_euler_angle_element_value(parameter: any, block: any) {
        const value_VALUE = parameter.VALUE.code;
        Generator.addImport(`import Hiwonder`);
        Generator.addObject("", "", `imu = Hiwonder.IMU()`);
        Generator.addCode(`imu.get_angle()[${value_VALUE}]`);
    }

    //% block="[SENSOR] 六路巡线传感器通道 [NUM] 识别到 [LINE]" blockType="boolean"
    //% SENSOR.shadow="dropdown" SENSOR.options="line6Sensor" SENSOR.defl="LF1"
    //% NUM.shadow="dropdown" NUM.options="line6Mask" NUM.defl="1"
    //% LINE.shadow="dropdown" LINE.options="linedot2" LINE.defl="> 0"
    export function linefollower6_one_status(parameter: any, block: any) {
        const value_SENSOR = parameter.SENSOR.code;
        const value_NUM = parameter.NUM.code;
        const value_LINE = parameter.LINE.code;
        Generator.addImport(`import Hiwonder_DEV`);
        Generator.addObject("", "", `mecanumCar = Hiwonder_DEV.DEV_MecanumCar()`);
        Generator.addCode(`(mecanumCar.${value_SENSOR}.get_result_data() & ${value_NUM}) ${value_LINE}`);
    }

    //% block="[SENSOR] 六路巡线传感器通道识别到 [LINE]" blockType="boolean"
    //% SENSOR.shadow="dropdown" SENSOR.options="line6Sensor" SENSOR.defl="LF1"
    //% LINE.shadow="string" LINE.defl="00"
    export function linefollower6_status(parameter: any, block: any) {
        const value_SENSOR = parameter.SENSOR.code;
        const value_LINE = parameter.LINE.code;
        Generator.addImport(`import Hiwonder_DEV`);
        Generator.addObject("", "", `mecanumCar = Hiwonder_DEV.DEV_MecanumCar()`);
        Generator.addCode(`mecanumCar.${value_SENSOR}.get_result_data() == 0x${value_LINE}`);
    }

    //% block="设置 [SENSOR] 六路巡线传感器的阈值比例(范围1~9)为 [VALUE]" blockType="command"
    //% SENSOR.shadow="dropdown" SENSOR.options="line6Sensor" SENSOR.defl="LF1"
    //% VALUE.shadow="number" VALUE.defl="7"
    export function linefollower6_set_threshold(parameter: any, block: any) {
        const value_SENSOR = parameter.SENSOR.code;
        const value_VALUE = parameter.VALUE.code;
        Generator.addImport(`import Hiwonder_DEV`);
        Generator.addObject("", "", `mecanumCar = Hiwonder_DEV.DEV_MecanumCar()`);
        Generator.addCode(`mecanumCar.${value_SENSOR}.set_ThresholdRatioReg(${value_VALUE})`);
    }

    //% block="[SENSOR] 六路巡线传感器通道 [NUM] 灰度值(0~100)" blockType="reporter"
    //% SENSOR.shadow="dropdown" SENSOR.options="line6Sensor" SENSOR.defl="LF1"
    //% NUM.shadow="dropdown" NUM.options="linefollows6" NUM.defl="1"
    export function linefollower6_get_value(parameter: any, block: any) {
        const value_SENSOR = parameter.SENSOR.code;
        const value_NUM = parameter.NUM.code;
        Generator.addImport(`import Hiwonder_DEV`);
        Generator.addObject("", "", `mecanumCar = Hiwonder_DEV.DEV_MecanumCar()`);
        Generator.addCode(`mecanumCar.${value_SENSOR}.read_AnalogQuantity(${value_NUM})`);
    }

    //% block="获取 [SENSOR] 六路巡线传感器偏差值" blockType="reporter"
    //% SENSOR.shadow="dropdown" SENSOR.options="line6Sensor" SENSOR.defl="LF1"
    export function linefollower6_read_offset(parameter: any, block: any) {
        const value_SENSOR = parameter.SENSOR.code;
        Generator.addImport(`import Hiwonder_DEV`);
        Generator.addObject("", "", `mecanumCar = Hiwonder_DEV.DEV_MecanumCar()`);
        Generator.addCode(`mecanumCar.${value_SENSOR}.read_offset()`);
    }

    //% block="超声波传感器检测到障碍物距离(cm)" blockType="reporter"
    export function get_led_ultrasonic_distance(parameter: any, block: any) {
        Generator.addImport(`import Hiwonder_DEV`);
        Generator.addObject("", "", `mecanumCar = Hiwonder_DEV.DEV_MecanumCar()`);
        Generator.addCode(`mecanumCar.sonar.getDistance()`);
    }

    //% block="设置超声波传感器彩灯 [NUMS] 颜色 [COLOR]" blockType="command"
    //% NUMS.shadow="dropdown" NUMS.options="ultrasonicNums" NUMS.defl="0"
    //% COLOR.shadow="string" COLOR.defl="#ffbf00"
    export function set_led_ultrasonic_color(parameter: any, block: any) {
        const value_NUMS = parameter.NUMS.code;
        const value_COLOR = parameter.COLOR.code;
        Generator.addImport(`import Hiwonder_DEV`);
        Generator.addObject("", "", `mecanumCar = Hiwonder_DEV.DEV_MecanumCar()`);
        Generator.addCode(`mecanumCar.sonar.setRGB(${value_NUMS}, int(${value_COLOR}[1:3], 16), int(${value_COLOR}[3:5], 16), int(${value_COLOR}[5:7], 16))`);
    }

    //% block="设置超声波传感器彩灯 [NUMS] 红色 [RED] 绿色 [GREEN] 蓝色 [BLUE]" blockType="command"
    //% NUMS.shadow="dropdown" NUMS.options="ultrasonicNums" NUMS.defl="0"
    //% RED.shadow="number" RED.defl="255"
    //% GREEN.shadow="number" GREEN.defl="0"
    //% BLUE.shadow="number" BLUE.defl="0"
    export function set_led_ultrasonic_color_arg(parameter: any, block: any) {
        const value_NUMS = parameter.NUMS.code;
        const value_RED = parameter.RED.code;
        const value_GREEN = parameter.GREEN.code;
        const value_BLUE = parameter.BLUE.code;
        Generator.addImport(`import Hiwonder_DEV`);
        Generator.addObject("", "", `mecanumCar = Hiwonder_DEV.DEV_MecanumCar()`);
        Generator.addCode(`mecanumCar.sonar.setRGB(${value_NUMS},${value_RED},${value_GREEN},${value_BLUE})`);
    }

    //% block="关闭超声波传感器彩灯 [NUMS]" blockType="command"
    //% NUMS.shadow="dropdown" NUMS.options="ultrasonicNums" NUMS.defl="0"
    export function close_led_ultrasonic(parameter: any, block: any) {
        const value_NUMS = parameter.NUMS.code;
        Generator.addImport(`import Hiwonder_DEV`);
        Generator.addObject("", "", `mecanumCar = Hiwonder_DEV.DEV_MecanumCar()`);
        Generator.addCode(`mecanumCar.sonar.setRGB(${value_NUMS},0,0,0)`);
    }

    //% block="设置超声波传感器彩灯 [NUM] [RGB] 周期 [TIME] 秒" blockType="command"
    //% NUM.shadow="dropdown" NUM.options="ultrasonicNums" NUM.defl="0"
    //% RGB.shadow="dropdown" RGB.options="rgb" RGB.defl="1"
    //% TIME.shadow="number" TIME.defl="1"
    export function set_led_ultrasonic_breath(parameter: any, block: any) {
        const value_NUM = parameter.NUM.code;
        const value_RGB = parameter.RGB.code;
        const value_TIME = parameter.TIME.code;
        Generator.addImport(`import Hiwonder_DEV`);
        Generator.addObject("", "", `mecanumCar = Hiwonder_DEV.DEV_MecanumCar()`);
        Generator.addCode(`mecanumCar.sonar.setBreathingCycle(${value_NUM},${value_RGB},${value_TIME} * 10)`);
    }

    //% block="设置超声波传感器彩灯进入炫彩模式" blockType="command"
    export function set_led_ultrasonic_random(parameter: any, block: any) {
        Generator.addImport(`import Hiwonder_DEV`);
        Generator.addObject("", "", `mecanumCar = Hiwonder_DEV.DEV_MecanumCar()`);
        Generator.addCode(`mecanumCar.sonar.startSymphony()`);
    }

    //% block="设置蓝牙为 [MODE] 模式，名称 [NAME] " blockType="command"
    //% MODE.shadow="dropdown" MODE.options="bleMode" MODE.defl="BLE.MODE_BLE_SLAVE"
    //% NAME.shadow="string" NAME.defl="Hiwonder"
    export function set_ble_mode(parameter: any, block: any) {
        const value_MODE = parameter.MODE.code;
        const value_NAME = parameter.NAME.code;
        Generator.addImport(`from Hiwonder_BLE import BLE`);
        Generator.addObject("", "", `ble = BLE(${value_MODE}, ${value_NAME})`);
    }

    //% block="蓝牙已连接？" blockType="boolean"
    export function ble_is_connected(parameter: any, block: any) {
        Generator.addCode(`ble.is_connected()`);
    }

    //% block="获取蓝牙mac地址" blockType="reporter"
    export function get_ble_mac(parameter: any, block: any) {
        Generator.addCode(`ble.get_mac()`);
    }

    //% block="蓝牙接收数据包含 [VALUE] ?" blockType="boolean"
    //% VALUE.shadow="string" VALUE.defl="OK"
    export function ble_wait_end(parameter: any, block: any) {
        const value_VALUE = parameter.VALUE.code;
        Generator.addCode(`ble.contains_data(${value_VALUE})`);
    }

    //% block="获取接收到的蓝牙数据" blockType="reporter"
    export function read_ble_data(parameter: any, block: any) {
        Generator.addCode(`ble.read_uart_cmd()`);
    }

    //% block="解析蓝牙数据 [DATA] ,获取命令" blockType="reporter"
    //% DATA.shadow="string" DATA.defl="data"
    export function get_ble_cmd(parameter: any, block: any) {
        const value_DATA = parameter.DATA.code;
        Generator.addCode(`ble.parse_uart_cmd(${value_DATA})[0]`);
    }

    //% block="解析蓝牙数据 [DATA] ,获取参数 [NUM] " blockType="reporter"
    //% DATA.shadow="string" DATA.defl="data"
    //% NUM.shadow="number" NUM.defl="1"
    export function get_ble_args(parameter: any, block: any) {
        const value_DATA = parameter.DATA.code;
        const value_NUM = parameter.NUM.code;
        Generator.addCode(`ble.parse_uart_cmd(${value_DATA})[${value_NUM}]`);
    }

    //% block="蓝牙发送数据 [DATA]" blockType="command"
    //% DATA.shadow="string" DATA.defl="Hello"
    export function ble_write(parameter: any, block: any) {
        const value_DATA = parameter.DATA.code;
        Generator.addCode(`ble.send_data(${value_DATA})`);
    }
}
