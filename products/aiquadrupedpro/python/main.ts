// AI机甲四足竞赛版 Python 作者源：维护旧 VM 启用积木与最终生效的 Python 生成规则。
//% color="#1874cd" iconWidth=50 iconHeight=40
namespace aiquadrupedpro {
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

    //% block="初始化足端坐标 X [VALUE1] Y [VALUE2] Z [VALUE3]" blockType="command"
    //% VALUE1.shadow="number" VALUE1.defl="110"
    //% VALUE2.shadow="number" VALUE2.defl="0"
    //% VALUE3.shadow="number" VALUE3.defl="-60"
    export function robot_init_foot(parameter: any, block: any) {
        const value1 = parameter.VALUE1.code;
        const value2 = parameter.VALUE2.code;
        const value3 = parameter.VALUE3.code;
        Generator.addImport(`import Hiwonder_DEV`);
        Generator.addVariableForce("quadrupedpro", `quadrupedpro = Hiwonder_DEV.DEV_Quadruped_3DOF(Hiwonder_DEV.Port(9),${value1},${value2},${value3})`);
    }

    //% block="设置足端坐标 X [VALUE1] Y [VALUE2] Z [VALUE3]" blockType="command"
    //% VALUE1.shadow="number" VALUE1.defl="110"
    //% VALUE2.shadow="number" VALUE2.defl="0"
    //% VALUE3.shadow="number" VALUE3.defl="-60"
    export function robot_set_foot(parameter: any, block: any) {
        const value1 = parameter.VALUE1.code;
        const value2 = parameter.VALUE2.code;
        const value3 = parameter.VALUE3.code;
        Generator.addCode(`quadrupedpro.set_legs_pose(${value1},${value2},${value3})`);
    }

    //% block="复位四足机器人机身姿态" blockType="command"
    export function robot_reset(parameter: any, block: any) {
        Generator.addImport(`import Hiwonder_DEV`);
        Generator.addObject("", "", `quadrupedpro = Hiwonder_DEV.DEV_Quadruped_3DOF(Hiwonder_DEV.Port(9))`);
        Generator.addCode(`quadrupedpro.reset()`);
    }

    //% block="设置四足机器人 [ORIENTION] 步长 [VALUE] 毫米 抬腿高度 [HEIGHT] 单步周期 [PERIOD] 毫秒" blockType="command"
    //% ORIENTION.shadow="dropdown" ORIENTION.options="moves" ORIENTION.defl="0"
    //% VALUE.shadow="number" VALUE.defl="20"
    //% HEIGHT.shadow="number" HEIGHT.defl="15"
    //% PERIOD.shadow="number" PERIOD.defl="500"
    export function robot_move(parameter: any, block: any) {
        const oriention = parameter.ORIENTION.code;
        const value = parameter.VALUE.code;
        const height = parameter.HEIGHT.code;
        const period = parameter.PERIOD.code;
        Generator.addImport(`import Hiwonder_DEV`);
        Generator.addObject("", "", `quadrupedpro = Hiwonder_DEV.DEV_Quadruped_3DOF(Hiwonder_DEV.Port(9))`);
        Generator.addCode(`quadrupedpro.move(${oriention},${value},0,${height},${period},-1)`);
    }

    //% block="设置四足机器人 [ORIENTION] 步长 [VALUE] 毫米 抬腿高度 [HEIGHT] 单步周期 [PERIOD] 毫秒 步数 [VALUE2]" blockType="command"
    //% ORIENTION.shadow="dropdown" ORIENTION.options="moves" ORIENTION.defl="0"
    //% VALUE.shadow="number" VALUE.defl="20"
    //% HEIGHT.shadow="number" HEIGHT.defl="15"
    //% PERIOD.shadow="number" PERIOD.defl="500"
    //% VALUE2.shadow="number" VALUE2.defl="10"
    export function robot_move_step(parameter: any, block: any) {
        const oriention = parameter.ORIENTION.code;
        const value = parameter.VALUE.code;
        const height = parameter.HEIGHT.code;
        const period = parameter.PERIOD.code;
        const value2 = parameter.VALUE2.code;
        Generator.addImport(`import Hiwonder_DEV`);
        Generator.addObject("", "", `quadrupedpro = Hiwonder_DEV.DEV_Quadruped_3DOF(Hiwonder_DEV.Port(9))`);
        Generator.addCode(`quadrupedpro.move(${oriention},${value},0,${height},${period},${value2})`);
    }

    //% block="设置四足机器人 X轴步长 [VALUE1] 毫米 Y轴步长 [VALUE2] 毫米 Z轴步长 [VALUE3] 毫米 抬腿高度 [HEIGHT] 单步周期 [PERIOD] 毫秒" blockType="command"
    //% VALUE1.shadow="number" VALUE1.defl="0"
    //% VALUE2.shadow="number" VALUE2.defl="20"
    //% VALUE3.shadow="number" VALUE3.defl="0"
    //% HEIGHT.shadow="number" HEIGHT.defl="15"
    //% PERIOD.shadow="number" PERIOD.defl="500"
    export function robot_move_xyz(parameter: any, block: any) {
        const value1 = parameter.VALUE1.code;
        const value2 = parameter.VALUE2.code;
        const value3 = parameter.VALUE3.code;
        const height = parameter.HEIGHT.code;
        const period = parameter.PERIOD.code;
        Generator.addImport(`import Hiwonder_DEV`);
        Generator.addObject("", "", `quadrupedpro = Hiwonder_DEV.DEV_Quadruped_3DOF(Hiwonder_DEV.Port(9))`);
        Generator.addCode(`quadrupedpro.move(${value1},${value2},${value3},${height},${period},-1)`);
    }

    //% block="设置四足机器人 X轴步长 [VALUE1] 毫米 Y轴步长 [VALUE2] 毫米 Z轴步长 [VALUE3] 毫米 抬腿高度 [HEIGHT] 单步周期 [PERIOD] 毫秒 步数 [STEP]" blockType="command"
    //% VALUE1.shadow="number" VALUE1.defl="0"
    //% VALUE2.shadow="number" VALUE2.defl="20"
    //% VALUE3.shadow="number" VALUE3.defl="0"
    //% HEIGHT.shadow="number" HEIGHT.defl="15"
    //% PERIOD.shadow="number" PERIOD.defl="500"
    //% STEP.shadow="number" STEP.defl="10"
    export function robot_move_xyz_step(parameter: any, block: any) {
        const value1 = parameter.VALUE1.code;
        const value2 = parameter.VALUE2.code;
        const value3 = parameter.VALUE3.code;
        const height = parameter.HEIGHT.code;
        const period = parameter.PERIOD.code;
        const step = parameter.STEP.code;
        Generator.addImport(`import Hiwonder_DEV`);
        Generator.addObject("", "", `quadrupedpro = Hiwonder_DEV.DEV_Quadruped_3DOF(Hiwonder_DEV.Port(9))`);
        Generator.addCode(`quadrupedpro.move(${value1},${value2},${value3},${height},${period},${step})`);
    }

    //% block="停止四足机器人运动" blockType="command"
    export function robot_stop_run(parameter: any, block: any) {
        Generator.addImport(`import Hiwonder_DEV`);
        Generator.addObject("", "", `quadrupedpro = Hiwonder_DEV.DEV_Quadruped_3DOF(Hiwonder_DEV.Port(9))`);
        Generator.addCode(`quadrupedpro.stop()`);
    }

    //% block="设置四足机器人执行动作组名称 [ACTION] [STEP] 次" blockType="command"
    //% ACTION.shadow="string" ACTION.defl="1"
    //% STEP.shadow="number" STEP.defl="1"
    export function robot_run_action(parameter: any, block: any) {
        const action = parameter.ACTION.code;
        const step = parameter.STEP.code;
        Generator.addImport(`import Hiwonder_DEV`);
        Generator.addObject("", "", `quadrupedpro = Hiwonder_DEV.DEV_Quadruped_3DOF(Hiwonder_DEV.Port(9))`);
        Generator.addCode(`quadrupedpro.action_run(${action},${step})`);
    }

    //% block="停止四足机器人动作组" blockType="command"
    export function robot_stop_action(parameter: any, block: any) {
        Generator.addImport(`import Hiwonder_DEV`);
        Generator.addObject("", "", `quadrupedpro = Hiwonder_DEV.DEV_Quadruped_3DOF(Hiwonder_DEV.Port(9))`);
        Generator.addCode(`quadrupedpro.action_stop()`);
    }

    //% block="设置四足机器人 [HEIGHT] [VALUE] 毫米" blockType="command"
    //% HEIGHT.shadow="dropdown" HEIGHT.options="heightChange" HEIGHT.defl="1"
    //% VALUE.shadow="number" VALUE.defl="20"
    export function robot_height(parameter: any, block: any) {
        const height = parameter.HEIGHT.code;
        const value = parameter.VALUE.code;
        Generator.addImport(`import Hiwonder_DEV`);
        Generator.addObject("", "", `quadrupedpro = Hiwonder_DEV.DEV_Quadruped_3DOF(Hiwonder_DEV.Port(9))`);
        Generator.addCode(`quadrupedpro.set_pose(0,0,${height}*${value})`);
    }

    //% block="设置四足机器人在 [TIME] 毫秒内调整姿态 X轴变化 [VALUE1] Y轴变化 [VALUE2] Z轴变化 [VALUE3] 俯仰角 [PITCH] 横滚角 [ROLL] 偏航角 [YAW]" blockType="command"
    //% TIME.shadow="number" TIME.defl="1000"
    //% VALUE1.shadow="number" VALUE1.defl="0"
    //% VALUE2.shadow="number" VALUE2.defl="0"
    //% VALUE3.shadow="number" VALUE3.defl="0"
    //% PITCH.shadow="number" PITCH.defl="0"
    //% ROLL.shadow="number" ROLL.defl="0"
    //% YAW.shadow="number" YAW.defl="0"
    export function robot_run_pose(parameter: any, block: any) {
        const time = parameter.TIME.code;
        const value1 = parameter.VALUE1.code;
        const value2 = parameter.VALUE2.code;
        const value3 = parameter.VALUE3.code;
        const pitch = parameter.PITCH.code;
        const roll = parameter.ROLL.code;
        const yaw = parameter.YAW.code;
        Generator.addImport(`import Hiwonder_DEV`);
        Generator.addObject("", "", `quadrupedpro = Hiwonder_DEV.DEV_Quadruped_3DOF(Hiwonder_DEV.Port(9))`);
        Generator.addCode(`quadrupedpro.set_pose(${value1},${value2},${value3},${pitch},${roll},${yaw},${time})`);
    }

    //% block="设置四足机器人舵机ID(11~22) [ID] 位置(200~800) [POS] 时长 [DURATION] 毫秒" blockType="command"
    //% ID.shadow="number" ID.defl="11"
    //% POS.shadow="number" POS.defl="500"
    //% DURATION.shadow="number" DURATION.defl="500"
    export function robot_servo_set(parameter: any, block: any) {
        const id = parameter.ID.code;
        const position = parameter.POS.code;
        const duration = parameter.DURATION.code;
        Generator.addImport(`import Hiwonder_DEV`);
        Generator.addObject("", "", `quadrupedpro = Hiwonder_DEV.DEV_Quadruped_3DOF(Hiwonder_DEV.Port(9))`);
        Generator.addCode(`quadrupedpro.set_servo_pose(${id},${position},${duration})`);
    }

    //% block="获取舵机ID [NUM] 的位置" blockType="reporter"
    //% NUM.shadow="number" NUM.defl="11"
    export function get_robot_servo_pos(parameter: any, block: any) {
        const number = parameter.NUM.code;
        Generator.addImport(`import Hiwonder_DEV`);
        Generator.addObject("", "", `quadrupedpro = Hiwonder_DEV.DEV_Quadruped_3DOF(Hiwonder_DEV.Port(9))`);
        Generator.addCode(`quadrupedpro.read_servo_pose(${number})`);
    }

    //% block="设置所有舵机 [LOAD]" blockType="command"
    //% LOAD.shadow="dropdown" LOAD.options="servoLoad" LOAD.defl="1"
    export function set_all_robot_servo_load(parameter: any, block: any) {
        const load = parameter.LOAD.code;
        Generator.addImport(`import Hiwonder_DEV`);
        Generator.addObject("", "", `quadrupedpro = Hiwonder_DEV.DEV_Quadruped_3DOF(Hiwonder_DEV.Port(9))`);
        Generator.addCode(`quadrupedpro.set_LoadOrUnload(${load})`);
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
