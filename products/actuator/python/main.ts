// 动力模块 Python 作者源：维护总线舵机与 IIC 转 PWM 的 Python 生成规则。
//% color="#d05b33" iconWidth=50 iconHeight=40
namespace actuator {
    //% block="设置总线舵机编号 [SERVO] 位置 (0~1000) [POS] 运行时间 (ms) [TIME]" blockType="command"
    //% SERVO.shadow="number" SERVO.defl="1" POS.shadow="number" POS.defl="0" TIME.shadow="number" TIME.defl="100"
    export function set_bus_servo(parameter: any, block: any) {
        const servo = parameter.SERVO.code;
        const position = parameter.POS.code;
        const duration = parameter.TIME.code;
        Generator.addImport(`import Hiwonder`);
        Generator.addObject("", "", `busservos = Hiwonder.BusServo()`);
        Generator.addCode(`busservos.run(${servo},${position},${duration})`);
    }

    //% block="设置总线舵机编号 [SERVO] 电机模式, 转速 [SPEED]" blockType="command"
    //% SERVO.shadow="number" SERVO.defl="1" SPEED.shadow="number" SPEED.defl="200"
    export function set_bus_servo_motor_speed(parameter: any, block: any) {
        const servo = parameter.SERVO.code;
        const speed = parameter.SPEED.code;
        Generator.addImport(`import Hiwonder`);
        Generator.addObject("", "", `busservos = Hiwonder.BusServo()`);
        Generator.addCode(`busservos.set_mode(${servo},1,${speed})`);
    }

    //% block="设置总线舵机编号 [SERVO] 上电" blockType="command"
    //% SERVO.shadow="number" SERVO.defl="1"
    export function load_bus_servo(parameter: any, block: any) {
        const servo = parameter.SERVO.code;
        Generator.addImport(`import Hiwonder`);
        Generator.addObject("", "", `busservos = Hiwonder.BusServo()`);
        Generator.addCode(`busservos.load(${servo})`);
    }

    //% block="设置总线舵机编号 [SERVO] 掉电" blockType="command"
    //% SERVO.shadow="number" SERVO.defl="1"
    export function unload_bus_servo(parameter: any, block: any) {
        const servo = parameter.SERVO.code;
        Generator.addImport(`import Hiwonder`);
        Generator.addObject("", "", `busservos = Hiwonder.BusServo()`);
        Generator.addCode(`busservos.unload(${servo})`);
    }

    //% block="获取总线舵机编号 [SERVO] 位置" blockType="reporter"
    //% SERVO.shadow="number" SERVO.defl="1"
    export function get_bus_servo_pos(parameter: any, block: any) {
        const servo = parameter.SERVO.code;
        Generator.addImport(`import Hiwonder`);
        Generator.addObject("", "", `busservos = Hiwonder.BusServo()`);
        Generator.addCode(`busservos.get_position(${servo})`);
    }

    //% block="初始化IIC转PWM模块IIC接口 [PORT]" blockType="command"
    //% PORT.shadow="dropdown" PORT.options="aimech_iicport" PORT.defl="1"
    export function aimecha_iicpwm_init(parameter: any, block: any) {
        const port = parameter.PORT.code;
        Generator.addImport(`import Hiwonder_DEV`);
        Generator.addObject("", "", `iicpwm = Hiwonder_DEV.DEV_PWMModule(Hiwonder_DEV.Port(${port}))`);
        Generator.addCode("");
    }

    //% block="设置180°舵机编号 [NUM] 转至 [ANGLE] ° 运行时间(ms) [TIME]" blockType="command"
    //% NUM.shadow="dropdown" NUM.options="iic_pwm_port" NUM.defl="1" ANGLE.shadow="number" ANGLE.defl="90" TIME.shadow="number" TIME.defl="500"
    export function iicpwm_set_pos(parameter: any, block: any) {
        const number = parameter.NUM.code;
        const angle = parameter.ANGLE.code;
        const duration = parameter.TIME.code;
        Generator.addCode(`iicpwm.set_angle(${number},${angle},${duration},180)`);
    }

    //% block="设置电机编号 [NUM] 速度 [SPEED]" blockType="command"
    //% NUM.shadow="dropdown" NUM.options="iic_pwm_port" NUM.defl="1" SPEED.shadow="number" SPEED.defl="0"
    export function iicpwm_set_speed(parameter: any, block: any) {
        const number = parameter.NUM.code;
        const speed = parameter.SPEED.code;
        Generator.addCode(`iicpwm.set_speed(${number},${speed})`);
    }

    //% block="设置风扇接口 [PORT] 转速 [SPEED]" blockType="command"
    //% PORT.shadow="dropdown" PORT.options="aimech_iicport" PORT.defl="1" SPEED.shadow="number" SPEED.defl="80"
    export function aimech_fan_iic_set_module_speed(parameter: any, block: any) {
        const port = parameter.PORT.code;
        const speed = parameter.SPEED.code;
        Generator.addImport(`import Hiwonder_DEV`);
        Generator.addObject("", "", `iic_fan_${port} = Hiwonder_DEV.DEV_FAN(Hiwonder_DEV.Port(${port}))`);
        Generator.addCode(`iic_fan_${port}.set_speed(${speed})`);
    }

    // 旧版教案把机械臂归入动力模块，opcode 必须继续使用 actuator 命名空间。
    //% block="初始化 [ARM] 参数 大臂长度 [VALUE1] 小臂长度 [VALUE2] 小臂偏移 [VALUE3] 末端长度 [VALUE4]" blockType="command"
    //% ARM.shadow="dropdown" ARM.options="arm_3dof" ARM.defl="0" VALUE1.shadow="number" VALUE1.defl="55" VALUE2.shadow="number" VALUE2.defl="76" VALUE3.shadow="number" VALUE3.defl="27" VALUE4.shadow="number" VALUE4.defl="120"
    export function aimech_3dof_arm_init(parameter: any, block: any) {
        const arm = parameter.ARM.code;
        const upperArm = parameter.VALUE1.code;
        const forearm = parameter.VALUE2.code;
        const offset = parameter.VALUE3.code;
        const end = parameter.VALUE4.code;
        Generator.addImport(`import Hiwonder`);
        Generator.addObject(
            "",
            "",
            `dof3Arm = Hiwonder.Arm_3DOF(${upperArm},${forearm},${offset},${end},${arm})`
        );
    }

    //% block="控制机械臂运动到 Y轴(前后方向) [VALUE1] 毫米, Z轴(上下方向) [VALUE2] 毫米, 末端的姿态角度(抬头是正, 低头是负) [VALUE3] 度, 运动时长 [VALUE4] 毫秒" blockType="command"
    //% VALUE1.shadow="number" VALUE1.defl="0" VALUE2.shadow="number" VALUE2.defl="0" VALUE3.shadow="number" VALUE3.defl="0" VALUE4.shadow="number" VALUE4.defl="1000"
    export function aimech_3dof_arm_move(parameter: any, block: any) {
        const y = parameter.VALUE1.code;
        const z = parameter.VALUE2.code;
        const angle = parameter.VALUE3.code;
        const duration = parameter.VALUE4.code;
        Generator.addImport(`import Hiwonder`);
        Generator.addCode(`dof3Arm.move_to_yz(${y},${z},${angle},${duration})`);
    }

    //% block="初始化连杆机械臂" blockType="command"
    export function aimech_rod_arm_init(parameter: any, block: any) {
        Generator.addImport(`import Hiwonder`);
        Generator.addObject("", "", `rodArm = Hiwonder.Arm_Link()`);
    }

    //% block="检测坐标Y [VALUE1] 毫米,Z [VALUE2] 毫米是否可以到达" blockType="boolean"
    //% VALUE1.shadow="number" VALUE1.defl="0" VALUE2.shadow="number" VALUE2.defl="0"
    export function aimech_rod_reach_detect(parameter: any, block: any) {
        const y = parameter.VALUE1.code;
        const z = parameter.VALUE2.code;
        Generator.addImport(`import Hiwonder`);
        Generator.addCode(`rodArm.is_s1s2_angle(${y},${z})`);
    }

    //% block="控制机械臂运动到 Y轴(前后方向) [VALUE1] 毫米, Z轴(上下方向) [VALUE2] 毫米, 运动时长 [VALUE3] 毫秒, [VALUE4] 等待" blockType="command"
    //% VALUE1.shadow="number" VALUE1.defl="0" VALUE2.shadow="number" VALUE2.defl="0" VALUE3.shadow="number" VALUE3.defl="1000" VALUE4.shadow="dropdown" VALUE4.options="delay_select" VALUE4.defl="False"
    export function aimech_rod_arm_move(parameter: any, block: any) {
        const y = parameter.VALUE1.code;
        const z = parameter.VALUE2.code;
        const duration = parameter.VALUE3.code;
        const wait = parameter.VALUE4.code;
        Generator.addImport(`import Hiwonder`);
        Generator.addCode(`rodArm.move_to_yz(${y},${z},${duration},${wait})`);
    }
}
