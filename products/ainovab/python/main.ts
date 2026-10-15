// WonderCode AiNova 入门版的积木接口与 Python 模板；config 声明初始化、入口函数和回调注册。
//% color="#EF8C4D" iconWidth=50 iconHeight=40
namespace ainovab {

    // 声明主程序依赖；config 的 launcher 在函数定义后注册 startMain 回调。
    //% block="AiNova Program" blockType="hat"
    export function start_thread(parameter: any, block: any) {
        Generator.addImport("import Hiwonder");
        Generator.addImport("import time");
    }

    // 声明启动依赖；section=setup 将下方积木生成为顶层初始化代码。
    //% block="When AiNova start-up" blockType="hat"
    export function start_run_thread(parameter: any, block: any) {
        Generator.addImport("import Hiwonder");
        Generator.addImport("import time");
    }

    // 生成当 参数 键被短按对应的 Python 事件入口。
    //% block="When key [BUTTON] is clicked" blockType="hat"
    //% BUTTON.shadow="dropdown" BUTTON.options="button"
    export function when_key_click_thread(parameter: any, block: any) {
        const button = parameter.BUTTON.code;
        Generator.addImport("import Hiwonder");
        Generator.addImport("import time");
    }

    // 生成当 参数 键被长按对应的 Python 事件入口。
    //% block="When key [BUTTON] is long pressed" blockType="hat"
    //% BUTTON.shadow="dropdown" BUTTON.options="button"
    export function when_key_long_pressed_thread(parameter: any, block: any) {
        const button = parameter.BUTTON.code;
        Generator.addImport("import Hiwonder");
        Generator.addImport("import time");
    }

    // 生成设置编码电机类型 参数对应的 Python 代码。
    //% block="Set motor type [TYPE] " blockType="command"
    //% TYPE.shadow="dropdown" TYPE.options="motor_type"
    export function en_motorSetType(parameter: any, block: any) {
        const type = parameter.TYPE.code;
        Generator.addImport("import Hiwonder");
        Generator.addObject("", "", `en_motor = Hiwonder.EncoderMotor`);
        Generator.addCode(`en_motor.setType(en_motor.N20_MOTOR)`);
    }

    // 生成重置编码电机 参数 编码器计数值(马达输出轴转过的圈数)为0对应的 Python 代码。
    //% block="Reset encoder [INDEX] count to 0" blockType="command"
    //% INDEX.shadow="dropdown" INDEX.options="motors"
    export function en_motorResetCounter(parameter: any, block: any) {
        const index = parameter.INDEX.code;
        Generator.addImport("import Hiwonder");
        Generator.addObject("", "", `en_motor = Hiwonder.EncoderMotor`);
        Generator.addCode(`en_motor.resetCounter(en_motor.Motor2)`);
    }

    // 生成设置编码电机 参数 马达转速为 参数 转每分钟对应的 Python 代码。
    //% block="Set motor [INDEX] speed to [NUM] rpm " blockType="command"
    //% INDEX.shadow="dropdown" INDEX.options="motors"
    //% NUM.shadow="number" NUM.defl="30"
    export function en_motorSetSpeed(parameter: any, block: any) {
        const index = parameter.INDEX.code;
        const num = parameter.NUM.code;
        Generator.addImport("import Hiwonder");
        Generator.addObject("", "", `en_motor = Hiwonder.EncoderMotor`);
        Generator.addCode(`en_motor.setSpeed(en_motor.Motor2,${num})`);
    }

    // 生成设置编码电机 参数 马达转速为 参数 转每分钟对应的 Python 代码。
    //% block="Set motor [INDEX] speed to [NUM] rpm " blockType="command"
    //% INDEX.shadow="number" INDEX.defl="1"
    //% NUM.shadow="number" NUM.defl="30"
    // config 仅将字面代码 0/1/2 映射为枚举，连接的 INDEX 表达式不求值。
    export function en_motorSetSpeedArg(parameter: any, block: any) {
        const index = parameter.INDEX.code;
        const num = parameter.NUM.code;
        Generator.addImport("import Hiwonder");
        Generator.addObject("", "", `en_motor = Hiwonder.EncoderMotor`);
        Generator.addCode(`en_motor.setSpeed(${index},${num})`);
    }

    // 生成获取编码电机 参数 马达转速对应的 Python 代码。
    //% block="Get motor [INDEX] speed" blockType="reporter"
    //% INDEX.shadow="dropdown" INDEX.options="motors"
    export function en_motorGetSpeed(parameter: any, block: any) {
        const index = parameter.INDEX.code;
        Generator.addImport("import Hiwonder");
        Generator.addObject("", "", `en_motor = Hiwonder.EncoderMotor`);
        Generator.addCode(`en_motor.getSpeed(en_motor.Motor2)`);
    }

    // 生成获取编码电机 参数 编码器计数值(马达输出轴转过的圈数)对应的 Python 代码。
    //% block="Get encoder [INDEX] count" blockType="reporter"
    //% INDEX.shadow="dropdown" INDEX.options="motors"
    export function en_motorGetCounter(parameter: any, block: any) {
        const index = parameter.INDEX.code;
        Generator.addImport("import Hiwonder");
        Generator.addObject("", "", `en_motor = Hiwonder.EncoderMotor`);
        Generator.addCode(`en_motor.getCounter(en_motor.Motor2)`);
    }

    // 生成停止编码电机 参数 运行对应的 Python 代码。
    //% block="Stop motor [INDEX] " blockType="command"
    //% INDEX.shadow="dropdown" INDEX.options="motors"
    export function en_motorStop(parameter: any, block: any) {
        const index = parameter.INDEX.code;
        Generator.addImport("import Hiwonder");
        Generator.addObject("", "", `en_motor = Hiwonder.EncoderMotor`);
        Generator.addCode(`en_motor.stop(en_motor.Motor2)`);
    }

    // 生成初始化划线对应的 Python 代码。
    //% block="Draw line initialization" blockType="command"
    export function en_motorDrawInit(parameter: any, block: any) {
        Generator.addImport("import Hiwonder");
        Generator.addObject("", "", `en_motor = Hiwonder.EncoderMotor`);
        Generator.addCode(`en_motor.drawInit()`);
    }

    // 生成将坐标数据X 参数 Y 参数 加入坐标队列对应的 Python 代码。
    //% block="Add X [XPOS] Y [YPOS] to coordinate queue" blockType="command"
    //% XPOS.shadow="number" XPOS.defl="0"
    //% YPOS.shadow="number" YPOS.defl="0"
    export function en_motorDrawPutData(parameter: any, block: any) {
        const xpos = parameter.XPOS.code;
        const ypos = parameter.YPOS.code;
        Generator.addImport("import Hiwonder");
        Generator.addObject("", "", `en_motor = Hiwonder.EncoderMotor`);
        Generator.addCode(`en_motor.drawPutData(${xpos},${ypos})`);
    }

    // 生成以 参数 度/秒的速度转角 参数 度对应的 Python 代码。
    //% block="Turn [ANGLE] degrees at [SPEED] deg/sec" blockType="command"
    //% SPEED.shadow="number" SPEED.defl="90"
    //% ANGLE.shadow="number" ANGLE.defl="90"
    export function en_motorTurn(parameter: any, block: any) {
        const speed = parameter.SPEED.code;
        const angle = parameter.ANGLE.code;
        Generator.addImport("import Hiwonder");
        Generator.addObject("", "", `en_motor = Hiwonder.EncoderMotor`);
        Generator.addCode(`en_motor.turn(${speed},${angle})`);
    }

    // 生成以 参数 的速度 参数对应的 Python 代码。
    //% block="Device move [ORIENTION] at a speed of [SPEED]" blockType="command"
    //% SPEED.shadow="number" SPEED.defl="60"
    //% ORIENTION.shadow="dropdown" ORIENTION.options="oriention_all"
    export function motor_speed_set(parameter: any, block: any) {
        const speed = parameter.SPEED.code;
        const oriention = parameter.ORIENTION.code;
        Generator.addImport("from Hiwonder import Motor");
        Generator.addCode(`Motor.setSpeed(${speed},${speed})`);
    }

    // 生成以 参数 的速度行进对应的 Python 代码。
    //% block="ove at a speed of [SPEED]" blockType="command"
    //% SPEED.shadow="number" SPEED.defl="60"
    export function motor_speed_set_arg(parameter: any, block: any) {
        const speed = parameter.SPEED.code;
        Generator.addImport("from Hiwonder import Motor");
        Generator.addCode(`Motor.setSpeed(${speed},${speed})`);
    }

    // 生成参数 以 参数 的速度 参数对应的 Python 代码。
    //% block="Device [WHEEL] move [ORIENTION] at a speed of [SPEED]" blockType="command"
    //% WHEEL.shadow="dropdown" WHEEL.options="wheel"
    //% SPEED.shadow="number" SPEED.defl="60"
    //% ORIENTION.shadow="dropdown" ORIENTION.options="oriention"
    // 左轮对应 M2、右轮对应 M1；config 选择电机，条件表达式只改变所选轮方向。
    export function motor_speed_set_wheel(parameter: any, block: any) {
        const wheel = parameter.WHEEL.code;
        const speed = parameter.SPEED.code;
        const oriention = parameter.ORIENTION.code;
        Generator.addImport("from Hiwonder import Motor");
        Generator.addCode(`Motor.setSpeed(M2=(-(${speed}) if ${oriention} == 2 else ${speed}))`);
    }

    // 生成参数 停止对应的 Python 代码。
    //% block="Device [WHEEL] stop" blockType="command"
    //% WHEEL.shadow="dropdown" WHEEL.options="wheels"
    export function motor_speed_stop(parameter: any, block: any) {
        const wheel = parameter.WHEEL.code;
        Generator.addImport("from Hiwonder import Motor");
        Generator.addCode(`Motor.setSpeed(0,0)`);
    }

    // 生成获取PID 参数 的 参数 值对应的 Python 代码。
    //% block="Get the [TYPE] value of PID [NUM]" blockType="reporter"
    //% NUM.shadow="dropdown" NUM.options="pid_num"
    //% TYPE.shadow="dropdown" TYPE.options="pid_type"
    export function pid_value(parameter: any, block: any) {
        const num = parameter.NUM.code;
        const type = parameter.TYPE.code;
        Generator.addImport("import PID");
        Generator.addObject("", "", `mypid_${num} = PID.PID(P = 0.1, I= 0, D= 0)`);
        Generator.addCode(`mypid_${num}${type}`);
    }

    // 生成设置PID 参数 参数 值为 参数对应的 Python 代码。
    //% block="Set the PID [NUM] [TYPE] value to [VALUE]" blockType="command"
    //% NUM.shadow="dropdown" NUM.options="pid_num"
    //% TYPE.shadow="dropdown" TYPE.options="pid_type"
    //% VALUE.shadow="number" VALUE.defl="0"
    // PID 初始化由生成上下文按实际 NUM 去重，不预先创建未使用的控制器。
    export function set_pid_value(parameter: any, block: any) {
        const num = parameter.NUM.code;
        const type = parameter.TYPE.code;
        const value = parameter.VALUE.code;
        Generator.addImport("import PID");
        Generator.addObject("", "", `mypid_${num} = PID.PID(P = 0.1, I= 0, D= 0)`);
        Generator.addCode(`mypid_${num}${type} = ${value}`);
    }

    // 生成使用值 参数 更新PID 参数 输出对应的 Python 代码。
    //% block="Update PID [NUM] output with value [VALUE]" blockType="command"
    //% VALUE.shadow="number" VALUE.defl="0"
    //% NUM.shadow="dropdown" NUM.options="pid_num"
    export function update_pid_value(parameter: any, block: any) {
        const value = parameter.VALUE.code;
        const num = parameter.NUM.code;
        Generator.addImport("import PID");
        Generator.addObject("", "", `mypid_${num} = PID.PID(P = 0.1, I= 0, D= 0)`);
        Generator.addCode(`mypid_${num}.update(${value})`);
    }

    // 生成PID 参数 控制器输出值对应的 Python 代码。
    //% block="PID [NUM] controller output value" blockType="reporter"
    //% NUM.shadow="dropdown" NUM.options="pid_num"
    export function output_pid_value(parameter: any, block: any) {
        const num = parameter.NUM.code;
        Generator.addImport("import PID");
        Generator.addObject("", "", `mypid_${num} = PID.PID(P = 0.1, I= 0, D= 0)`);
        Generator.addCode(`mypid_${num}.output`);
    }

    // 生成重置PID 参数 控制器对应的 Python 代码。
    //% block="Reset PID [NUM] controller" blockType="command"
    //% NUM.shadow="dropdown" NUM.options="pid_num"
    export function reset_pid_value(parameter: any, block: any) {
        const num = parameter.NUM.code;
        Generator.addImport("import PID");
        Generator.addObject("", "", `mypid_${num} = PID.PID(P = 0.1, I= 0, D= 0)`);
        Generator.addCode(`mypid_${num}.clear()`);
    }

    // 生成输出字符 参数对应的 Python 代码。
    //% block="Output print character [STR]" blockType="command"
    //% STR.shadow="string" STR.defl="Hello"
    export function print_str(parameter: any, block: any) {
        const str = parameter.STR.code;
        Generator.addCode(`print(${str})`);
    }

    // 生成输出数字 参数对应的 Python 代码。
    //% block="Output print number [NUM]" blockType="command"
    //% NUM.shadow="number" NUM.defl="60"
    export function print_number(parameter: any, block: any) {
        const num = parameter.NUM.code;
        Generator.addCode(`print(${num})`);
    }

    // 生成设置LED 参数 红色 参数 绿色 参数 蓝色 参数对应的 Python 代码。
    //% block="Set LED [NUMS] red [RED] green [GREEN] blue [BLUE]" blockType="command"
    //% NUMS.shadow="dropdown" NUMS.options="nums"
    //% RED.shadow="number" RED.defl="255"
    //% GREEN.shadow="number" GREEN.defl="0"
    //% BLUE.shadow="number" BLUE.defl="0"
    export function led_color_set(parameter: any, block: any) {
        const nums = parameter.NUMS.code;
        const red = parameter.RED.code;
        const green = parameter.GREEN.code;
        const blue = parameter.BLUE.code;
        Generator.addImport("import Hiwonder");
        Generator.addCode(`Hiwonder.Neopixel_onboard.setItem(${nums},${red},${green},${blue})
Hiwonder.Neopixel_onboard.write()`);
    }

    // 生成设置LED 参数 红色 参数 绿色 参数 蓝色 参数对应的 Python 代码。
    //% block="Set LED [NUMS] red [RED] green [GREEN] blue [BLUE]" blockType="command"
    //% NUMS.shadow="number" NUMS.defl="1"
    //% RED.shadow="number" RED.defl="255"
    //% GREEN.shadow="number" GREEN.defl="0"
    //% BLUE.shadow="number" BLUE.defl="0"
    export function led_color_set_arg(parameter: any, block: any) {
        const nums = parameter.NUMS.code;
        const red = parameter.RED.code;
        const green = parameter.GREEN.code;
        const blue = parameter.BLUE.code;
        Generator.addImport("import Hiwonder");
        Generator.addCode(`Hiwonder.Neopixel_onboard.setItem(${nums}-1,${red},${green},${blue})
Hiwonder.Neopixel_onboard.write()`);
    }

    // 生成设置LED 参数 颜色 参数对应的 Python 代码。
    //% block="Set LED [NUMS] to [COLOR]" blockType="command"
    //% NUMS.shadow="dropdown" NUMS.options="nums"
    //% COLOR.shadow="color" COLOR.defl="#ff0000"
    export function led_color_select(parameter: any, block: any) {
        const nums = parameter.NUMS.code;
        const color = parameter.COLOR.code;
        Generator.addImport("import Hiwonder");
        Generator.addCode(`Hiwonder.Neopixel_onboard.setItem(${nums},{COLOR.rgb})
Hiwonder.Neopixel_onboard.write()`);
    }

    // 生成关闭LED 参数对应的 Python 代码。
    //% block="Turn off LED [NUMS]" blockType="command"
    //% NUMS.shadow="dropdown" NUMS.options="nums"
    export function led_close(parameter: any, block: any) {
        const nums = parameter.NUMS.code;
        Generator.addImport("import Hiwonder");
        Generator.addCode(`Hiwonder.Neopixel_onboard.setItem(${nums},0,0,0)
Hiwonder.Neopixel_onboard.write()`);
    }

    // 生成播放音调为 参数 节拍为 参数 模式为 参数对应的 Python 代码。
    //% block="Play tone [TONES] with beat [RHYTHMS] in [MODE]" blockType="command"
    //% TONES.shadow="dropdown" TONES.options="tones"
    //% RHYTHMS.shadow="dropdown" RHYTHMS.options="rhythms"
    //% MODE.shadow="dropdown" MODE.options="buzzer_mode"
    export function buzzer_tone_set(parameter: any, block: any) {
        const tones = parameter.TONES.code;
        const rhythms = parameter.RHYTHMS.code;
        const mode = parameter.MODE.code;
        Generator.addImport("from Hiwonder import Buzzer");
        Generator.addCode(`Buzzer.playTone(${tones},${rhythms},${mode})`);
    }

    // 生成播放音调为 参数 节拍为 参数 模式为 参数对应的 Python 代码。
    //% block="Play tone [TONES] with beat [RHYTHMS] in [MODE]" blockType="command"
    //% TONES.shadow="number" TONES.defl="65"
    //% RHYTHMS.shadow="number" RHYTHMS.defl="500"
    //% MODE.shadow="dropdown" MODE.options="buzzer_mode"
    export function buzzer_tone_set_arg(parameter: any, block: any) {
        const tones = parameter.TONES.code;
        const rhythms = parameter.RHYTHMS.code;
        const mode = parameter.MODE.code;
        Generator.addImport("from Hiwonder import Buzzer");
        Generator.addCode(`Buzzer.playTone(${tones},${rhythms},${mode})`);
    }

    // 生成播放旋律为 参数 模式为 参数对应的 Python 代码。
    //% block="Play melody [MELODY] in [MODE]" blockType="command"
    //% MELODY.shadow="number" MELODY.defl="0"
    //% MODE.shadow="dropdown" MODE.options="buzzer_mode"
    export function buzzer_play_melody(parameter: any, block: any) {
        const melody = parameter.MELODY.code;
        const mode = parameter.MODE.code;
        Generator.addImport("from Hiwonder import Buzzer");
        Generator.addCode(`Buzzer.playMelody(${melody},${mode})`);
    }

    // 生成设置蜂鸣器播放速度 参数 bpm对应的 Python 代码。
    //% block="Set buzzer bpm [VALUE]" blockType="command"
    //% VALUE.shadow="number" VALUE.defl="120"
    export function set_buzzer_bpm(parameter: any, block: any) {
        const value = parameter.VALUE.code;
        Generator.addImport("from Hiwonder import Buzzer");
        Generator.addCode(`Buzzer.bpm(${value})`);
    }

    // 生成获取蜂鸣器播放速度(bpm)对应的 Python 代码。
    //% block="Get buzzer bpm" blockType="reporter"
    export function get_buzzer_bpm(parameter: any, block: any) {
        Generator.addImport("from Hiwonder import Buzzer");
        Generator.addCode(`Buzzer.bpm()`);
    }

    // 生成设置蜂鸣器音量 参数对应的 Python 代码。
    //% block="Set buzzer volume [VALUE]" blockType="command"
    //% VALUE.shadow="number" VALUE.defl="100"
    export function set_buzzer_volume(parameter: any, block: any) {
        const value = parameter.VALUE.code;
        Generator.addImport("from Hiwonder import Buzzer");
        Generator.addCode(`Buzzer.setVolume(${value})`);
    }

    // 生成蜂鸣器播放音乐结束了吗？对应的 Python 代码。
    //% block="Has the buzzer play music over ?" blockType="boolean"
    export function buzzer_isFinish(parameter: any, block: any) {
        Generator.addImport("from Hiwonder import Buzzer");
        Generator.addCode(`Buzzer.isFinish()`);
    }

    // 生成关闭低电压报警对应的 Python 代码。
    //% block="Disable low power alarm" blockType="command"
    export function disable_lowPower_alarm(parameter: any, block: any) {
        Generator.addImport("import Hiwonder");
        Generator.addCode(`Hiwonder.disableLowPowerAlarm()`);
    }

    // 生成参数 键被按下对应的 Python 代码。
    //% block="[BUTTON] key pressed" blockType="boolean"
    //% BUTTON.shadow="dropdown" BUTTON.options="button"
    export function key_detect(parameter: any, block: any) {
        const button = parameter.BUTTON.code;
        Generator.addImport("import Hiwonder");
        Generator.addCode(`(Hiwonder.Button_${button}.read())`);
    }

    // 生成音量值(0~255)对应的 Python 代码。
    //% block="Sound volume(0~255)" blockType="reporter"
    export function get_sound(parameter: any, block: any) {
        Generator.addImport("import Hiwonder");
        Generator.addCode(`Hiwonder.Sound_onboard.read()`);
    }

    // 生成电量值(mV)对应的 Python 代码。
    //% block="Battery level(mV)" blockType="reporter"
    export function get_battery_level(parameter: any, block: any) {
        Generator.addImport("import Hiwonder");
        Generator.addCode(`Hiwonder.batteryVolt()`);
    }

    // 生成设置蓝牙为 参数 模式，名称 参数对应的 Python 代码。
    //% block="Set bluetooth to [MODE] mode ,name [NAME] " blockType="command"
    //% MODE.shadow="dropdown" MODE.options="blemode"
    //% NAME.shadow="string" NAME.defl="AiNova"
    export function set_ble_mode(parameter: any, block: any) {
        const mode = parameter.MODE.code;
        const name = parameter.NAME.code;
        Generator.addImport("import Hiwonder_BLE");
        Generator.addObject("", "", `ble = None`);
        Generator.addCode(`ble = Hiwonder_BLE.BLE(${mode}, name = ${name})`);
    }

    // 生成蓝牙已连接？对应的 Python 代码。
    //% block="Is bluetooth connected ?" blockType="boolean"
    export function ble_is_connected(parameter: any, block: any) {
        Generator.addCode(`ble.ble_isconnected()`);
    }

    // 生成获取蓝牙mac地址对应的 Python 代码。
    //% block="Get bluetooth mac address ?" blockType="reporter"
    export function get_ble_mac(parameter: any, block: any) {
        Generator.addImport("import Hiwonder_BLE");
        Generator.addCode(`Hiwonder_BLE.getBluetoothMac()`);
    }

    // 生成蓝牙接收数据遇到结束标志？对应的 Python 代码。
    //% block="Bluetooth receiving data encountered end flag ?" blockType="boolean"
    export function ble_wait_end(parameter: any, block: any) {
        Generator.addCode(`ble.recv_uart_until('$', 0)`);
    }

    // 生成获取接收到的蓝牙数据对应的 Python 代码。
    //% block="Get received Bluetooth data" blockType="reporter"
    export function read_ble_data(parameter: any, block: any) {
        Generator.addCode(`ble.read_uart_until('$')`);
    }

    // 生成解析蓝牙数据 参数 ,获取命令对应的 Python 代码。
    //% block="Parse Bluetooth data [DATA] and get command " blockType="reporter"
    //% DATA.shadow="string" DATA.defl="0"
    export function get_ble_cmd(parameter: any, block: any) {
        const data = parameter.DATA.code;
        Generator.addCode(`ble.parse_uart_cmd(${data})[0]`);
    }

    // 生成解析蓝牙数据 参数 ,获取参数 参数对应的 Python 代码。
    //% block="Parse Bluetooth data [DATA] and get parameter [NUM] " blockType="reporter"
    //% DATA.shadow="string" DATA.defl="0"
    //% NUM.shadow="number" NUM.defl="0"
    // 蓝牙参数为零基编号，跳过命令位；在 Python 中计算索引以支持连接表达式。
    export function get_ble_args(parameter: any, block: any) {
        const data = parameter.DATA.code;
        const num = parameter.NUM.code;
        Generator.addCode(`ble.parse_uart_cmd(${data})[int(${num})+1]`);
    }

    // 生成蓝牙发送数据 参数对应的 Python 代码。
    //% block="Bluetooth sends data [DATA] " blockType="command"
    //% DATA.shadow="string" DATA.defl="CMD"
    export function ble_write(parameter: any, block: any) {
        const data = parameter.DATA.code;
        Generator.addCode(`ble.ble_write(${data})`);
    }

    // 生成当遥控器 参数 点击对应的 Python 事件入口。
    //% block="When the [IRKEY] key is clicked" blockType="hat"
    //% IRKEY.shadow="dropdown" IRKEY.options="irkey"
    export function when_get_irkey_thread(parameter: any, block: any) {
        const irkey = parameter.IRKEY.code;
        Generator.addImport("import Hiwonder");
        Generator.addImport("import time");
    }

    // 生成当遥控器 参数 长按对应的 Python 事件入口。
    //% block="When the [IRKEY] key is long pressed" blockType="hat"
    //% IRKEY.shadow="dropdown" IRKEY.options="irkey"
    export function when_irkey_longPress_thread(parameter: any, block: any) {
        const irkey = parameter.IRKEY.code;
        Generator.addImport("import Hiwonder");
        Generator.addImport("import time");
    }

    // 生成当遥控器从长按状态松开对应的 Python 事件入口。
    //% block="When the remote control released long press" blockType="hat"
    export function when_irkey_stop_thread(parameter: any, block: any) {
        Generator.addImport("import Hiwonder");
        Generator.addImport("import time");
    }

    // 生成发送主板红外遥控按键 参数对应的 Python 代码。
    //% block="Send board infrared remote control code key [IRKEY]" blockType="command"
    //% IRKEY.shadow="dropdown" IRKEY.options="irkey"
    export function send_irkey(parameter: any, block: any) {
        const irkey = parameter.IRKEY.code;
        Generator.addImport("import Hiwonder");
        Generator.addImport("from Hiwonder import Ir");
        Generator.addCode(`Ir.sendCmd(Hiwonder.Ir.${irkey})`);
    }

    // 生成设置主板进入红外学习模式，学习编号(1~10) 参数对应的 Python 代码。
    //% block="Set the board to enter infrared learning mode, learning code number (1 ~ 10) [NUM]" blockType="command"
    //% NUM.shadow="number" NUM.defl="1"
    export function learn_mode(parameter: any, block: any) {
        const num = parameter.NUM.code;
        Generator.addImport("from Hiwonder import Ir");
        Generator.addCode(`Ir.intoLearningMode(${num})`);
    }

    // 生成主板发送红外学习码，学习码编号(1~10) 参数对应的 Python 代码。
    //% block="Board sends infrared learning code, learning code number (1 ~ 10) [NUM]" blockType="command"
    //% NUM.shadow="number" NUM.defl="1"
    export function send_learn_code(parameter: any, block: any) {
        const num = parameter.NUM.code;
        Generator.addImport("from Hiwonder import Ir");
        Generator.addCode(`Ir.sendSavedCmd(${num})`);
    }
}
