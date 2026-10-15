// 通信模块 Python 作者源：维护 AI 产品 PS3 手柄的积木与代码生成规则。
//% color="#ee799f" iconWidth=50 iconHeight=40
namespace communication {
    //% block="初始化手柄，MAC地址 [STR]" blockType="command"
    //% STR.shadow="string" STR.defl="10:00:00:00:00:00"
    export function ps3_init(parameter: any, block: any) {
        const address = parameter.STR.code;
        Generator.addImport("ps3", "import PS3");
        Generator.addCode(`PS3.init(${address})`);
    }

    //% block="获取mac地址" blockType="reporter"
    export function ps3_get_address(parameter: any, block: any) {
        Generator.addCode("PS3.get_address()");
    }

    //% block="断开连接" blockType="command"
    export function ps3_disconnect(parameter: any, block: any) {
        Generator.addCode("PS3.deinit()");
    }

    //% block="是否连接成功？" blockType="boolean"
    export function ps3_is_connected(parameter: any, block: any) {
        Generator.addCode("PS3.isconnected()");
    }

    //% block="设置LED灯1 [VALUE1] 灯2 [VALUE2] 灯3 [VALUE3] 灯4 [VALUE4]" blockType="command"
    //% VALUE1.shadow="dropdown" VALUE1.options="on_off" VALUE1.defl="1" VALUE2.shadow="dropdown" VALUE2.options="on_off" VALUE2.defl="1" VALUE3.shadow="dropdown" VALUE3.options="on_off" VALUE3.defl="1" VALUE4.shadow="dropdown" VALUE4.options="on_off" VALUE4.defl="1"
    export function ps3_set_led(parameter: any, block: any) {
        const led1 = parameter.VALUE1.code;
        const led2 = parameter.VALUE2.code;
        const led3 = parameter.VALUE3.code;
        const led4 = parameter.VALUE4.code;
        Generator.addCode(`PS3.setleds([${led1},${led2},${led3},${led4}])`);
    }

    //% block="设置手柄震动强度 [VALUE1] 和震动时间(最大值5000ms) [VALUE2] ms" blockType="command"
    //% VALUE1.shadow="number" VALUE1.defl="60" VALUE2.shadow="number" VALUE2.defl="3000"
    export function ps3_set_rumble(parameter: any, block: any) {
        const intensity = parameter.VALUE1.code;
        const duration = parameter.VALUE2.code;
        Generator.addCode(`PS3.set_rumble(${intensity}, ${duration})`);
    }

    //% block="[PS3_KEYS] 被按下" blockType="boolean"
    //% PS3_KEYS.shadow="dropdown" PS3_KEYS.options="ps3_keys" PS3_KEYS.defl="SELECT"
    export function ps3_get_keys(parameter: any, block: any) {
        const key = parameter.PS3_KEYS.code;
        Generator.addCode(`PS3.get_button(PS3.${key})`);
    }

    //% block="获取 [HANDLE_AXIS] 值" blockType="reporter"
    //% HANDLE_AXIS.shadow="dropdown" HANDLE_AXIS.options="ps3_handle_axis" HANDLE_AXIS.defl="RX"
    export function ps3_get_axis(parameter: any, block: any) {
        const axis = parameter.HANDLE_AXIS.code;
        Generator.addCode(`PS3.get_axis(PS3.${axis})`);
    }

    //% block="获取imu [ACCEL] 值" blockType="reporter"
    //% ACCEL.shadow="dropdown" ACCEL.options="accel" ACCEL.defl="ACCEL_X"
    export function ps3_get_sensor(parameter: any, block: any) {
        const axis = parameter.ACCEL.code;
        Generator.addCode(`PS3.get_sensor(PS3.${axis})`);
    }
}
