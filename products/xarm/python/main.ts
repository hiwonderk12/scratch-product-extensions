// 机械臂模块 Python 作者源：维护基础机械臂与串联机械臂的 Python 生成规则。
//% color="#2d87c9" iconWidth=50 iconHeight=40
namespace xarm {
    //% block="将机械臂舵机ID设置为 [SERVO]" blockType="command"
    //% SERVO.shadow="number" SERVO.defl="2"
    export function aimech_set_arm_id(parameter: any, block: any) {
        const servo = parameter.SERVO.code;
        Generator.addSetup("_armId", `_armId = ${servo}`);
    }

    //% block="将机械爪舵机ID设置为 [SERVO]" blockType="command"
    //% SERVO.shadow="number" SERVO.defl="1"
    export function aimech_set_claw_id(parameter: any, block: any) {
        const servo = parameter.SERVO.code;
        Generator.addSetup("_clawId", `_clawId = ${servo}`);
    }

    //% block="将 [ARM] 舵机上电" blockType="command"
    //% ARM.shadow="dropdown" ARM.options="arm" ARM.defl="_armId"
    export function aimech_servo_enable(parameter: any, block: any) {
        const arm = parameter.ARM.code;
        Generator.addImport(`import Hiwonder`);
        Generator.addObject("", "", `_clawId = 1`);
        Generator.addObject("", "", `_armId = 2`);
        Generator.addObject("", "", `busservos = Hiwonder.BusServo()`);
        Generator.addCode(`busservos.load(${arm})`);
    }

    //% block="将 [ARM] 舵机掉电" blockType="command"
    //% ARM.shadow="dropdown" ARM.options="arm" ARM.defl="_armId"
    export function aimech_servo_disable(parameter: any, block: any) {
        const arm = parameter.ARM.code;
        Generator.addImport(`import Hiwonder`);
        Generator.addObject("", "", `_clawId = 1`);
        Generator.addObject("", "", `_armId = 2`);
        Generator.addObject("", "", `busservos = Hiwonder.BusServo()`);
        Generator.addCode(`busservos.unload(${arm})`);
    }

    //% block="设置 [ARM] 舵机位置(0~1000) [POS] 运行时间 [TIME] ms" blockType="command"
    //% ARM.shadow="dropdown" ARM.options="arm" ARM.defl="_armId" POS.shadow="number" POS.defl="500" TIME.shadow="number" TIME.defl="500"
    export function aimech_set_servo_pose_time(parameter: any, block: any) {
        const arm = parameter.ARM.code;
        const position = parameter.POS.code;
        const duration = parameter.TIME.code;
        Generator.addImport(`import Hiwonder`);
        Generator.addObject("", "", `_clawId = 1`);
        Generator.addObject("", "", `_armId = 2`);
        Generator.addObject("", "", `busservos = Hiwonder.BusServo()`);
        Generator.addCode(`busservos.run(${arm},${position},${duration})`);
    }

    //% block="获取 [ARM] 舵机位置" blockType="reporter"
    //% ARM.shadow="dropdown" ARM.options="arm" ARM.defl="_armId"
    export function aimech_get_angle(parameter: any, block: any) {
        const arm = parameter.ARM.code;
        Generator.addImport(`import Hiwonder`);
        Generator.addObject("", "", `_clawId = 1`);
        Generator.addObject("", "", `_armId = 2`);
        Generator.addObject("", "", `busservos = Hiwonder.BusServo()`);
        Generator.addCode(`busservos.get_position(${arm})`);
    }

    //% block="停止舵机 [ARM] 运行" blockType="command"
    //% ARM.shadow="dropdown" ARM.options="arm" ARM.defl="_armId"
    export function aimech_set_servo_stop(parameter: any, block: any) {
        const arm = parameter.ARM.code;
        Generator.addImport(`import Hiwonder`);
        Generator.addObject("", "", `_clawId = 1`);
        Generator.addObject("", "", `_armId = 2`);
        Generator.addObject("", "", `busservos = Hiwonder.BusServo()`);
        Generator.addCode(`busservos.stop(${arm})`);
    }

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
