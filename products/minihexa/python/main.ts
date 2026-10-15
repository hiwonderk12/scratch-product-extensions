// miniHexa Python 作者源：声明积木外观，并通过 Generator 白名单描述旧版 Python 生成规则。
//% color="#336699" iconWidth=50 iconHeight=40
namespace minihexa {
    //% block="主程序" blockType="hat"
    export function start_thread(parameter: any, block: any) {
        Generator.addImport("import Hiwonder");
        Generator.addImport("import time");
        Generator.addImport("import Hiwonder_DEV");
        Generator.addImport("minihexa = Hiwonder.Robot()");
    }

    //% block="当启动时" blockType="hat"
    export function start_run_thread(parameter: any, block: any) {
        Generator.addImport("import Hiwonder");
        Generator.addImport("import time");
        Generator.addImport("import Hiwonder_DEV");
        Generator.addImport("minihexa = Hiwonder.Robot()");
    }

    //% block="播放音调为 [TONES] 节拍为 [RHYTHMS] 模式为 [MODE]" blockType="command"
    //% TONES.shadow="dropdown" TONES.options="tones" TONES.defl=65
    //% RHYTHMS.shadow="dropdown" RHYTHMS.options="rhythms" RHYTHMS.defl=500
    //% MODE.shadow="dropdown" MODE.options="buzzer_mode" MODE.defl=False
    export function buzzer_tone_set(parameter: any, block: any) {
        const tones = parameter.TONES.code;
        const rhythms = parameter.RHYTHMS.code;
        const mode = parameter.MODE.code;
        Generator.addImport("beep = Hiwonder.Buzzer()");
        Generator.addCode(`beep.playTone(${tones},${rhythms},${mode})`);
    }

    //% block="播放音调为 [TONES] 节拍为 [RHYTHMS] 模式为 [MODE]" blockType="command"
    //% TONES.shadow="number" TONES.defl=65
    //% RHYTHMS.shadow="number" RHYTHMS.defl=500
    //% MODE.shadow="dropdown" MODE.options="buzzer_mode" MODE.defl=False
    export function buzzer_tone_set_arg(parameter: any, block: any) {
        const tones = parameter.TONES.code;
        const rhythms = parameter.RHYTHMS.code;
        const mode = parameter.MODE.code;
        Generator.addImport("beep = Hiwonder.Buzzer()");
        Generator.addCode(`beep.playTone(${tones},${rhythms},${mode})`);
    }

    //% block="设置蜂鸣器音量为 [VALUE]" blockType="command"
    //% VALUE.shadow="number" VALUE.defl=100
    export function buzzer_tone_set_volume(parameter: any, block: any) {
        const value = parameter.VALUE.code;
        Generator.addImport("beep = Hiwonder.Buzzer()");
        Generator.addCode(`beep.setVolume(${value})`);
    }

    //% block="电量值(mV)" blockType="reporter"
    export function get_battery_level(parameter: any, block: any) {
        Generator.addImport("import Hiwonder");
        Generator.addCode("Hiwonder.Battery_power()");
    }

    //% block="获取音量值" blockType="reporter"
    export function get_volume(parameter: any, block: any) {
        Generator.addImport("import Hiwonder");
        Generator.addImport("sound = Hiwonder.Sound()");
        Generator.addCode("sound.read()");
    }

    //% block="关闭低电量报警" blockType="command"
    export function disable_lowPower_alarm(parameter: any, block: any) {
        Generator.addImport("beep = Hiwonder.Buzzer()");
        Generator.addCode("Hiwonder.disableLowPowerAlarm()");
    }

    //% block="输出打印字符 [STR]" blockType="command"
    //% STR.shadow="string" STR.defl="Hello"
    export function print_str(parameter: any, block: any) {
        const text = parameter.STR.code;
        Generator.addImport("import time");
        Generator.addCode(`print(${text})\ntime.sleep(0.5)`);
    }

    //% block="输出打印数字 [NUM]" blockType="command"
    //% NUM.shadow="number" NUM.defl=60
    export function print_number(parameter: any, block: any) {
        const value = parameter.NUM.code;
        Generator.addImport("import time");
        Generator.addCode(`print(${value})\ntime.sleep(0.5)`);
    }

    //% block="设置机器人初始姿态" blockType="command"
    export function set_body_reset(parameter: any, block: any) {
        Generator.addCode("minihexa.reset()");
    }

    //% block="设置身体 [ANGLE] 旋转角度(-20.0~20.0) [VALUE], 用时 [DURATION] ms" blockType="command"
    //% ANGLE.shadow="dropdown" ANGLE.options="roll_pitch_yaw" ANGLE.defl=1
    //% VALUE.shadow="number" VALUE.defl=2
    //% DURATION.shadow="number" DURATION.defl=500
    export function set_body_angle(parameter: any, block: any) {
        const duration = parameter.DURATION.code;
        Generator.addCode(`minihexa.set_body_angle([0,0,0],${duration})`);
    }

    //% block="设置身体中心向 [ORIENTION] 平移(-4.0~4.0) [VALUE] 厘米, 用时 [DURATION] ms" blockType="command"
    //% ORIENTION.shadow="dropdown" ORIENTION.options="oriention_8" ORIENTION.defl=0
    //% VALUE.shadow="number" VALUE.defl=2
    //% DURATION.shadow="number" DURATION.defl=500
    export function set_body_pose(parameter: any, block: any) {
        const duration = parameter.DURATION.code;
        Generator.addCode(`minihexa.set_body_pose([0,0,0],${duration})`);
    }

    //% block="设置身体中心 [ORIENTION] [VALUE] (0.0~4.0) 厘米, 用时 [DURATION] ms" blockType="command"
    //% ORIENTION.shadow="dropdown" ORIENTION.options="oriention_9" ORIENTION.defl=1
    //% VALUE.shadow="number" VALUE.defl=2
    //% DURATION.shadow="number" DURATION.defl=500
    export function set_body_pose_height(parameter: any, block: any) {
        const orientation = parameter.ORIENTION.code;
        const value = parameter.VALUE.code;
        const duration = parameter.DURATION.code;
        Generator.addCode(`minihexa.set_body_pose([0,0,${value}*${orientation}],${duration})`);
    }

    //% block="控制机器人以 [SPEED] 的速度向 [MOVE] 移动, 每一步用时 [DURATION] ms" blockType="command"
    //% SPEED.shadow="number" SPEED.defl=2
    //% MOVE.shadow="dropdown" MOVE.options="oriention_8" MOVE.defl=0
    //% DURATION.shadow="number" DURATION.defl=500
    export function set_go(parameter: any, block: any) {
        const duration = parameter.DURATION.code;
        Generator.addCode(`minihexa.go([0,0,0],-1,${duration})`);
    }

    //% block="控制机器人以 [SPEED] 的速度向 [MOVE] 移动, 运行 [STEP] 步, 每一步用时 [DURATION] ms" blockType="command"
    //% SPEED.shadow="number" SPEED.defl=2
    //% MOVE.shadow="dropdown" MOVE.options="oriention_8" MOVE.defl=0
    //% STEP.shadow="number" STEP.defl=2
    //% DURATION.shadow="number" DURATION.defl=500
    export function set_go_step(parameter: any, block: any) {
        const step = parameter.STEP.code;
        const duration = parameter.DURATION.code;
        Generator.addCode(`minihexa.go([0,0,0],${step},${duration})`);
    }

    //% block="控制机器人向 X: [VALUE1] Y: [VALUE2] Z: [VALUE3] 方向移动, 每一步用时 [DURATION] ms" blockType="command"
    //% VALUE1.shadow="number" VALUE1.defl=0
    //% VALUE2.shadow="number" VALUE2.defl=0
    //% VALUE3.shadow="number" VALUE3.defl=0
    //% DURATION.shadow="number" DURATION.defl=500
    export function set_move_xyz(parameter: any, block: any) {
        const value1 = parameter.VALUE1.code;
        const value2 = parameter.VALUE2.code;
        const value3 = parameter.VALUE3.code;
        const duration = parameter.DURATION.code;
        Generator.addCode(`minihexa.go([${value1},${value2},${value3}],-1,${duration})`);
    }

    //% block="控制机器人向 X: [VALUE1] Y: [VALUE2] Z: [VALUE3] 方向移动 [STEP] 步, 每一步用时 [DURATION] ms" blockType="command"
    //% VALUE1.shadow="number" VALUE1.defl=0
    //% VALUE2.shadow="number" VALUE2.defl=0
    //% VALUE3.shadow="number" VALUE3.defl=0
    //% STEP.shadow="number" STEP.defl=5
    //% DURATION.shadow="number" DURATION.defl=500
    export function set_move_xyz_step(parameter: any, block: any) {
        const value1 = parameter.VALUE1.code;
        const value2 = parameter.VALUE2.code;
        const value3 = parameter.VALUE3.code;
        const step = parameter.STEP.code;
        const duration = parameter.DURATION.code;
        Generator.addCode(`minihexa.go([${value1},${value2},${value3}],${step},${duration})`);
    }

    //% block="控制机器人以 [SPEED] 的速度 [MOVE], 每一步用时 [DURATION] ms" blockType="command"
    //% SPEED.shadow="number" SPEED.defl=2
    //% MOVE.shadow="dropdown" MOVE.options="robot_turn" MOVE.defl=1
    //% DURATION.shadow="number" DURATION.defl=500
    export function set_turn(parameter: any, block: any) {
        const duration = parameter.DURATION.code;
        Generator.addCode(`minihexa.go([0,0,0],-1,${duration})`);
    }

    //% block="控制机器人以 [SPEED] 的速度 [MOVE] 运行 [STEP] 步, 每一步用时 [DURATION] ms" blockType="command"
    //% SPEED.shadow="number" SPEED.defl=2
    //% MOVE.shadow="dropdown" MOVE.options="robot_turn" MOVE.defl=1
    //% STEP.shadow="number" STEP.defl=2
    //% DURATION.shadow="number" DURATION.defl=500
    export function set_turn_step(parameter: any, block: any) {
        const step = parameter.STEP.code;
        const duration = parameter.DURATION.code;
        Generator.addCode(`minihexa.go([0,0,0],${step},${duration})`);
    }

    //% block="控制机器人停止" blockType="command"
    export function set_go_stop(parameter: any, block: any) {
        Generator.addCode("minihexa.go([0,0,0],0)");
    }

    //% block="控制机器人抬腿高度等级(2~4) [VALUE]" blockType="command"
    //% VALUE.shadow="number" VALUE.defl=3
    export function set_leg_lift(parameter: any, block: any) {
        const value = parameter.VALUE.code;
        Generator.addCode(`minihexa.set_leg_lift(${value})`);
    }

    //% block="[CONTROL] 自平衡" blockType="command"
    //% CONTROL.shadow="dropdown" CONTROL.options="onoff" CONTROL.defl=True
    export function set_self_balance(parameter: any, block: any) {
        const control = parameter.CONTROL.code;
        Generator.addCode(`minihexa.homeostasis(${control})`);
    }

    //% block="设置舵机 ID [NUM] 位置 [POS] 运行时间 [DURATION] 毫秒" blockType="command"
    //% NUM.shadow="number" NUM.defl=1
    //% POS.shadow="number" POS.defl=1500
    //% DURATION.shadow="number" DURATION.defl=500
    export function set_servo(parameter: any, block: any) {
        const number = parameter.NUM.code;
        const position = parameter.POS.code;
        const duration = parameter.DURATION.code;
        Generator.addCode(`minihexa.multi_servo_control([(${number},${position})],${duration})`);
    }

    //% block="miniHexa运行动作组 [NUM] ,重复次数 [LOOP]" blockType="command"
    //% NUM.shadow="string" NUM.defl="1"
    //% LOOP.shadow="number" LOOP.defl=1
    export function action_run(parameter: any, block: any) {
        const number = parameter.NUM.code;
        const loop = parameter.LOOP.code;
        Generator.addCode(`minihexa.action_run(${number},${loop})`);
    }

    //% block="停止运行动作组" blockType="command"
    export function action_stop(parameter: any, block: any) {
        Generator.addCode("minihexa.action_stop()");
    }

    //% block="当按键短按时" blockType="hat"
    export function when_minihexa_key_click_thread(parameter: any, block: any) {
        Generator.addImport("import Hiwonder");
        Generator.addImport("import time");
        Generator.addImport("import Hiwonder_IIC");
        Generator.addImport("minihexa = Hiwonder.Robot()");
        Generator.addImport("button1 = Hiwonder.Button()");
    }

    //% block="当按键长按时" blockType="hat"
    export function when_minihexa_key_longclick_thread(parameter: any, block: any) {
        Generator.addImport("import Hiwonder");
        Generator.addImport("import time");
        Generator.addImport("import Hiwonder_IIC");
        Generator.addImport("minihexa = Hiwonder.Robot()");
        Generator.addImport("button1 = Hiwonder.Button()");
    }

    //% block="按键被按下" blockType="boolean"
    export function key_is_pressed(parameter: any, block: any) {
        Generator.addImport("import Hiwonder");
        Generator.addImport("import time");
        Generator.addImport("button1 = Hiwonder.Button()");
        Generator.addCode("button1.read()");
    }

    //% block="获取陀螺仪 [SELECT] 轴数值" blockType="reporter"
    //% SELECT.shadow="dropdown" SELECT.options="gyro_select" SELECT.defl=0
    export function imu_read_gyro_data(parameter: any, block: any) {
        const select = parameter.SELECT.code;
        Generator.addImport("imu = Hiwonder.IMU()");
        Generator.addCode(`imu.read_gyro_data()[${select}]`);
    }

    //% block="获取 IMU [SELECT] 角度值" blockType="reporter"
    //% SELECT.shadow="dropdown" SELECT.options="imu_select" SELECT.defl=0
    export function imu_read_angle(parameter: any, block: any) {
        const select = parameter.SELECT.code;
        Generator.addImport("imu = Hiwonder.IMU()");
        Generator.addCode(`imu.read_angle()[${select}]`);
    }

    //% block="设置串口波特率 [DATA]" blockType="command"
    //% DATA.shadow="dropdown" DATA.options="baudrate" DATA.defl=9600
    export function serial_set_baudrate(parameter: any, block: any) {
        const data = parameter.DATA.code;
        Generator.addImport(`uart = Hiwonder.UART(${data})`);
    }

    //% block="串口发送数据 [DATA]" blockType="command"
    //% DATA.shadow="string" DATA.defl="CMD"
    export function serial_write(parameter: any, block: any) {
        const data = parameter.DATA.code;
        Generator.addCode(`uart.send_data(${data})`);
    }

    //% block="串口已接收数据？" blockType="boolean"
    export function serial_has_recv_data(parameter: any, block: any) {
        Generator.addCode("uart.has_data()");
    }

    //% block="串口接收数据包含 [DATA]？" blockType="boolean"
    //% DATA.shadow="string" DATA.defl="CMD"
    export function serial_recv_contains(parameter: any, block: any) {
        const data = parameter.DATA.code;
        Generator.addCode(`uart.contains_data(${data})`);
    }

    //% block="串口接收缓冲区" blockType="reporter"
    export function serial_recv_buff(parameter: any, block: any) {
        Generator.addCode("uart.read_buffer()");
    }

    //% block="解析串口数据 [DATA] 获取命令" blockType="reporter"
    //% DATA.shadow="string" DATA.defl="0"
    export function get_serial_cmd(parameter: any, block: any) {
        const data = parameter.DATA.code;
        Generator.addCode(`uart.read_uart_cmd(${data})[0]`);
    }

    //% block="解析串口数据 [DATA] 获取参数 [NUM]" blockType="reporter"
    //% DATA.shadow="string" DATA.defl="0"
    //% NUM.shadow="number" NUM.defl=1
    export function get_serial_args(parameter: any, block: any) {
        const data = parameter.DATA.code;
        const number = parameter.NUM.code;
        Generator.addCode(`uart.parse_uart_cmd(${data})[${number}]`);
    }

    //% block="清空串口缓冲区" blockType="command"
    export function clear_buffer(parameter: any, block: any) {
        Generator.addCode("uart.clear_buffer()");
    }
}
