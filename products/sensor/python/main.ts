// 输入模块 Mind+ Python 作者源：维护基础传感器及其 Python 生成规则。
//% color="#2e8b57" iconWidth=50 iconHeight=40
namespace sensor {
    //% block="接口 [PORT] 旋钮模拟值(0~100)" blockType="reporter"
    //% PORT.shadow="dropdown" PORT.options="aimech_iicport" PORT.defl="1"
    export function aimech_read_knob(parameter: any, block: any) {
        const port = parameter.PORT.code;
        Generator.addImport(`import Hiwonder_DEV`);
        Generator.addObject("", "", `knob = Hiwonder_DEV.DEV_KNOB(Hiwonder_DEV.Port(${port}))`);
        Generator.addCode(`knob.read_value()`);
    }

    //% block="接口 [PORT] 光敏模拟值(0~100)" blockType="reporter"
    //% PORT.shadow="dropdown" PORT.options="aimech_iicport" PORT.defl="1"
    export function aimech_read_light(parameter: any, block: any) {
        const port = parameter.PORT.code;
        Generator.addImport(`import Hiwonder_DEV`);
        Generator.addObject("", "", `light = Hiwonder_DEV.DEV_LIGHT(Hiwonder_DEV.Port(${port}))`);
        Generator.addCode(`light.read_value()`);
    }

    //% block="接口 [PORT] 雨滴模拟值(0~100)" blockType="reporter"
    //% PORT.shadow="dropdown" PORT.options="aimech_iicport" PORT.defl="1"
    export function aimech_get_rain_drop_value(parameter: any, block: any) {
        const port = parameter.PORT.code;
        Generator.addImport(`import Hiwonder_DEV`);
        Generator.addObject("", "", `rain = Hiwonder_DEV.DEV_RAIN(Hiwonder_DEV.Port(${port}))`);
        Generator.addCode(`rain.read_value()`);
    }

    //% block="接口 [PORT] 土壤湿度模拟值(0~100)" blockType="reporter"
    //% PORT.shadow="dropdown" PORT.options="aimech_iicport" PORT.defl="1"
    export function aimech_get_soil_value(parameter: any, block: any) {
        const port = parameter.PORT.code;
        Generator.addImport(`import Hiwonder_DEV`);
        Generator.addObject("", "", `soil = Hiwonder_DEV.DEV_SOIL(Hiwonder_DEV.Port(${port},0x5A))`);
        Generator.addCode(`soil.read_value()`);
    }

    //% block="接口 [PORT] 音量模拟值(0~100)" blockType="reporter"
    //% PORT.shadow="dropdown" PORT.options="aimech_iicport" PORT.defl="1"
    export function aimech_read_sound(parameter: any, block: any) {
        const port = parameter.PORT.code;
        Generator.addImport(`import Hiwonder_DEV`);
        Generator.addObject("", "", `sound = Hiwonder_DEV.DEV_SOUND(Hiwonder_DEV.Port(${port}))`);
        Generator.addCode(`sound.read_value()`);
    }

    //% block="接口 [PORT] 红外检测传感器检测到障碍物?" blockType="boolean"
    //% PORT.shadow="dropdown" PORT.options="aimech_iicport" PORT.defl="1"
    export function aimech_get_avoid_value(parameter: any, block: any) {
        const port = parameter.PORT.code;
        Generator.addImport(`import Hiwonder_DEV`);
        Generator.addObject("", "", `ir_${port} = Hiwonder_DEV.DEV_IR(Hiwonder_DEV.Port(${port}))`);
        Generator.addCode(`ir_${port}.read_state()`);
    }

    //% block="接口 [PORT] 触摸传感器被触碰?" blockType="boolean"
    //% PORT.shadow="dropdown" PORT.options="aimech_iicport" PORT.defl="1"
    export function aimech_read_touch(parameter: any, block: any) {
        const port = parameter.PORT.code;
        Generator.addImport(`import Hiwonder_DEV`);
        Generator.addObject("", "", `touch = Hiwonder_DEV.DEV_TOUCH(Hiwonder_DEV.Port(${port}))`);
        Generator.addCode(`touch.read_state()`);
    }

    //% block="接口 [PORT] 按键被按下" blockType="boolean"
    //% PORT.shadow="dropdown" PORT.options="aimech_iicport" PORT.defl="1"
    export function aimech_key_is_pressed(parameter: any, block: any) {
        const port = parameter.PORT.code;
        Generator.addImport(`import Hiwonder_DEV`);
        Generator.addObject("", "", `key = Hiwonder_DEV.DEV_BUTTON(Hiwonder_DEV.Port(${port}))`);
        Generator.addCode(`key.read_state()`);
    }

    //% block="端口 [ULTRA_PORT] 超声波传感器检测到障碍物的距离(cm)" blockType="reporter"
    //% ULTRA_PORT.shadow="dropdown" ULTRA_PORT.options="ultra_port" ULTRA_PORT.defl="2"
    export function get_ultrasonic_distance(parameter: any, block: any) {
        const port = parameter.ULTRA_PORT.code;
        Generator.addImport(`import Hiwonder`);
        Generator.addObject("", "", `sonar_${port} = Hiwonder.Sonar(Hiwonder.Port(${port}))`);
        Generator.addCode(`sonar_${port}.read()`);
    }

    //% block="初始化颜色传感器IIC接口 [PORT]" blockType="command"
    //% PORT.shadow="dropdown" PORT.options="aimech_iicport" PORT.defl="1"
    export function aimech_colorsensor_init(parameter: any, block: any) {
        const port = parameter.PORT.code;
        Generator.addImport(`import Hiwonder_DEV`);
        Generator.addObject("", "", `color = Hiwonder_DEV.DEV_COLOR_RECOGNIZE(Hiwonder_DEV.Port(${port}))`);
    }

    //% block="检测到 [COLOR]" blockType="boolean"
    //% COLOR.shadow="dropdown" COLOR.options="aiblocks_colors" COLOR.defl="1"
    export function aiblocks_check_color(parameter: any, block: any) {
        const color = parameter.COLOR.code;
        Generator.addCode(`color.get_color_name() == ${color}`);
    }

    //% block="获取颜色值" blockType="reporter"
    export function aiblocks_get_color(parameter: any, block: any) {
        Generator.addCode(`color.get_color_data()`);
    }

    //% block="颜色值 [NUM] 的 [COLOR] 色值" blockType="reporter"
    //% NUM.shadow="number" NUM.defl=0
    //% COLOR.shadow="dropdown" COLOR.options="aiblocks_colors2" COLOR.defl="0"
    export function aiblocks_get_color_arg(parameter: any, block: any) {
        const value = parameter.NUM.code;
        const color = parameter.COLOR.code;
        Generator.addCode(`${value}[${color}]`);
    }

    //% block="初始化温湿度传感器接口 [PORT]" blockType="command"
    //% PORT.shadow="dropdown" PORT.options="aimech_iicport" PORT.defl="1"
    export function aimech_temphumi_init(parameter: any, block: any) {
        const port = parameter.PORT.code;
        Generator.addImport(`import Hiwonder_DEV`);
        Generator.addObject("", "", `temphumi = Hiwonder_DEV.DEV_TH(Hiwonder_DEV.Port(${port}))`);
    }

    //% block="温湿度值" blockType="reporter"
    export function aimech_get_temp_and_humi(parameter: any, block: any) {
        Generator.addCode(`temphumi.read_Temp_Humi()`);
    }

    //% block="[TEMPHUMI] 值" blockType="reporter"
    //% TEMPHUMI.shadow="dropdown" TEMPHUMI.options="temphumi" TEMPHUMI.defl="0"
    export function aimech_get_temp_or_humi(parameter: any, block: any) {
        const type = parameter.TEMPHUMI.code;
        Generator.addCode(`temphumi.read_Temp_Humi()[${type}]`);
    }

    // 六路巡线初始化独立维护 linefollow6，后续读取积木复用同一设备对象。
    //% block="初始化六路巡线传感器IIC接口 [PORT]" blockType="command"
    //% PORT.shadow="dropdown" PORT.options="aimech_iicport" PORT.defl="1"
    export function aimech_linefollower6_init(parameter: any, block: any) {
        const port = parameter.PORT.code;
        Generator.addImport(`import Hiwonder_DEV`);
        Generator.addObject("", "", `linefollow6 = Hiwonder_DEV.DEV_LINE_FOLLOW_6(Hiwonder_DEV.Port(${port}))`);
    }

    // 通道菜单直接保存旧生成器使用的位掩码，保持最终 Python 判断表达式一致。
    //% block="六路巡线传感器通道 [NUM] 检测到 [LINE]" blockType="boolean"
    //% NUM.shadow="dropdown" NUM.options="linefollows6Mask" NUM.defl="1"
    //% LINE.shadow="dropdown" LINE.options="linedot2" LINE.defl="0"
    export function linefollower6_one_status(parameter: any, block: any) {
        const num = parameter.NUM.code;
        const status = parameter.LINE.code;
        Generator.addCode(`(linefollow6.get_result_data() & ${num}) > ${status}`);
    }

    // LINE 参数由 editor 配置覆盖为 LINE6 可视化位掩码字段。
    //% block="六路巡线传感器通道检测到 [LINE]" blockType="boolean"
    //% LINE.shadow="string" LINE.defl="00"
    export function linefollower6_status(parameter: any, block: any) {
        const status = parameter.LINE.code;
        Generator.addCode(`linefollow6.get_result_data() == 0x${status}`);
    }

    //% block="设置六路巡线传感器阈值比例(范围1~9)为 [VALUE]" blockType="command"
    //% VALUE.shadow="number" VALUE.defl=7
    export function linefollower6_set_threshold(parameter: any, block: any) {
        const value = parameter.VALUE.code;
        Generator.addCode(`linefollow6.set_ThresholdRatioReg(${value})`);
    }

    //% block="六路巡线传感器通道 [NUM] 灰度值(0~100)" blockType="reporter"
    //% NUM.shadow="dropdown" NUM.options="linefollows6" NUM.defl="1"
    export function linefollower6_get_value(parameter: any, block: any) {
        const num = parameter.NUM.code;
        Generator.addCode(`linefollow6.read_AnalogQuantity(${num})`);
    }

    //% block="获取六路巡线传感器偏差值" blockType="reporter"
    export function linefollower6_read_offset(parameter: any, block: any) {
        Generator.addCode(`linefollow6.read_offset()`);
    }

    // 八路巡线初始化维护独立设备对象，避免与四路、六路传感器状态互相覆盖。
    //% block="初始化八路灰度巡线传感器IIC接口 [PORT]" blockType="command"
    //% PORT.shadow="dropdown" PORT.options="aimech_iicport" PORT.defl="1"
    export function linefollower8_init(parameter: any, block: any) {
        const port = parameter.PORT.code;
        Generator.addImport(`import Hiwonder_DEV`);
        Generator.addObject("", "", `linefollow8 = Hiwonder_DEV.DEV_LINE_FOLLOW_8(Hiwonder_DEV.Port(${port}))`);
    }

    // 通道菜单保存 1-128 位掩码，模板选择器根据亮灭状态生成布尔表达式。
    //% block="八路灰度巡线传感器通道 [NUM] 检测到 [LINE]" blockType="boolean"
    //% NUM.shadow="dropdown" NUM.options="linefollows8Mask" NUM.defl="1"
    //% LINE.shadow="dropdown" LINE.options="linedot2" LINE.defl="0"
    export function linefollower8_one_status(parameter: any, block: any) {
        const num = parameter.NUM.code;
        const status = parameter.LINE.code;
        Generator.addCode(`(linefollow8.get_result_data() & ${num}) > ${status}`);
    }

    // LINE 参数由 editor 配置覆盖为 LINE8 可视化位掩码字段。
    //% block="八路灰度巡线传感器通道检测到 [LINE]" blockType="boolean"
    //% LINE.shadow="string" LINE.defl="00"
    export function linefollower8_status(parameter: any, block: any) {
        const status = parameter.LINE.code;
        Generator.addCode(`linefollow8.get_result_data() == 0x${status}`);
    }

    //% block="八路灰度巡线传感器通道 [NUM] 灰度值" blockType="reporter"
    //% NUM.shadow="dropdown" NUM.options="linefollows8" NUM.defl="1"
    export function linefollower8_get_value(parameter: any, block: any) {
        const num = parameter.NUM.code;
        Generator.addCode(`linefollow8.read_AnalogQuantity(${num})`);
    }

    // 普通四路巡线初始化维护 linefollow，后续状态与偏差读取复用该对象。
    //% block="初始化四路巡线传感器IIC接口 [PORT]" blockType="command"
    //% PORT.shadow="dropdown" PORT.options="aimech_iicport" PORT.defl="1"
    export function aimech_linefollower_init(parameter: any, block: any) {
        const port = parameter.PORT.code;
        Generator.addImport(`import Hiwonder_DEV`);
        Generator.addObject("", "", `linefollow = Hiwonder_DEV.DEV_LINE_FOLLOW_4(Hiwonder_DEV.Port(${port}))`);
    }

    // 通道菜单保存 1/2/4/8 位掩码，模板选择器按亮灭状态生成旧版比较表达式。
    //% block="四路巡线传感器通道 [NUM] 识别到 [LINE]" blockType="boolean"
    //% NUM.shadow="dropdown" NUM.options="linefollows4Mask" NUM.defl="1"
    //% LINE.shadow="dropdown" LINE.options="linedot2" LINE.defl="0"
    export function linefollower_one_status(parameter: any, block: any) {
        const num = parameter.NUM.code;
        const status = parameter.LINE.code;
        Generator.addCode(`(linefollow.get_result_data() & ${num}) > ${status}`);
    }

    // LINE 由 editor 覆盖为 LINE4 字段，每一路状态都可在弹层中独立切换。
    //% block="四路巡线传感器识别到 [LINE]" blockType="boolean"
    //% LINE.shadow="string" LINE.defl="00"
    export function linefollower_status(parameter: any, block: any) {
        const status = parameter.LINE.code;
        Generator.addCode(`linefollow.get_result_data() == 0x${status}`);
    }

    // VALUE 由 editor 覆盖为 LINE4 可视化位掩码字段，直接进入十六进制比较。
    //% block="四路巡线传感器通道识别到 [VALUE]" blockType="boolean"
    //% VALUE.shadow="string" VALUE.defl="00"
    export function linefollower_status_result(parameter: any, block: any) {
        const status = parameter.VALUE.code;
        Generator.addCode(`linefollow.get_result_data() == 0x${status}`);
    }

    //% block="获取四路巡线传感器偏差值" blockType="reporter"
    export function linefollower_read_offset(parameter: any, block: any) {
        Generator.addCode(`linefollow.read_offset()`);
    }

    // 旋钮四路巡线使用独立设备类型和变量，不能与普通四路初始化合并。
    //% block="初始化旋钮四路巡线传感器IIC接口 [PORT]" blockType="command"
    //% PORT.shadow="dropdown" PORT.options="aimech_iicport" PORT.defl="1"
    export function linefollower4_init(parameter: any, block: any) {
        const port = parameter.PORT.code;
        Generator.addImport(`import Hiwonder_DEV`);
        Generator.addObject("", "", `linefollow4 = Hiwonder_DEV.DEV_LINE_FOLLOW_4_O(Hiwonder_DEV.Port(${port}))`);
    }

    //% block="四路巡线传感器通道 [NUM] 识别到 [LINE]" blockType="boolean"
    //% NUM.shadow="dropdown" NUM.options="linefollows4Mask" NUM.defl="1"
    //% LINE.shadow="dropdown" LINE.options="linedot2" LINE.defl="0"
    export function linefollower4_one_status(parameter: any, block: any) {
        const num = parameter.NUM.code;
        const status = parameter.LINE.code;
        Generator.addCode(`(linefollow4.get_result_data() & ${num}) > ${status}`);
    }

    // VALUE 由 editor 覆盖为 LINE4 字段；旧版注释掉的普通状态菜单积木不迁移。
    //% block="四路巡线传感器通道识别到 [VALUE]" blockType="boolean"
    //% VALUE.shadow="string" VALUE.defl="00"
    export function linefollower4_status_result(parameter: any, block: any) {
        const status = parameter.VALUE.code;
        Generator.addCode(`linefollow4.get_result_data() == 0x${status}`);
    }

    //% block="获取四路巡线传感器偏差值" blockType="reporter"
    export function linefollower4_read_offset(parameter: any, block: any) {
        Generator.addCode(`linefollow4.read_offset()`);
    }

    // 外接 IMU 使用 imu_sensor，避免覆盖主产品自身的 imu 初始化与校准对象。
    //% block="初始化IMU传感器IIC接口 [PORT]" blockType="command"
    //% PORT.shadow="dropdown" PORT.options="aimech_iicport" PORT.defl="1"
    export function aimech_imu_init(parameter: any, block: any) {
        const port = parameter.PORT.code;
        Generator.addImport(`import Hiwonder_DEV`);
        Generator.addObject("", "", `imu_sensor = Hiwonder_DEV.DEV_IMU(Hiwonder_DEV.Port(${port}))`);
    }

    //% block="获取欧拉角 [VALUE]" blockType="reporter"
    //% VALUE.shadow="dropdown" VALUE.options="euler_element" VALUE.defl="0"
    export function get_euler_angle_element_value(parameter: any, block: any) {
        const value = parameter.VALUE.code;
        Generator.addCode(`imu_sensor.read_euler()[${value}]`);
    }

    //% block="获取欧拉角" blockType="reporter"
    export function get_euler_angle(parameter: any, block: any) {
        Generator.addCode(`imu_sensor.read_euler()`);
    }

    // 该 reporter 保留旧版的轴索引输出，可嵌入需要 0/1/2 索引的积木。
    //% block="[VALUE]" blockType="reporter"
    //% VALUE.shadow="dropdown" VALUE.options="euler_element" VALUE.defl="0"
    export function get_euler_angle_element(parameter: any, block: any) {
        const value = parameter.VALUE.code;
        Generator.addCode(`${value}`);
    }

    // LED 超声波模块使用独立 sonar 对象，测距和灯光控制积木复用该初始化结果。
    //% block="初始化LED超声波传感器接口 [PORT]" blockType="command"
    //% PORT.shadow="dropdown" PORT.options="aimech_iicport" PORT.defl="1"
    export function aimech_led_ultrasonic_init(parameter: any, block: any) {
        const port = parameter.PORT.code;
        Generator.addImport(`import Hiwonder_DEV`);
        Generator.addObject("", "", `sonar = Hiwonder_DEV.DEV_SONAR(Hiwonder_DEV.Port(${port}))`);
    }

    //% block="LED超声波传感器检测到障碍物距离(cm)" blockType="reporter"
    export function aimech_get_led_ultrasonic_distance(parameter: any, block: any) {
        Generator.addCode(`sonar.getDistance()`);
    }

    // COLOR.rgb 将颜色选择器的 #RRGGBB 值展开为硬件接口需要的三个十六进制通道。
    //% block="LED超声波传感器灯 [NUMS] 颜色 [COLOR]" blockType="command"
    //% NUMS.shadow="dropdown" NUMS.options="nums" NUMS.defl="0"
    //% COLOR.shadow="color" COLOR.defl="#ff0000"
    export function aimech_set_led_ultrasonic_color(parameter: any, block: any) {
        const nums = parameter.NUMS.code;
        Generator.addCode(`sonar.setRGB(${nums},{COLOR.rgb})`);
    }

    //% block="LED超声波传感器灯 [NUMS] 红 [RED] 绿 [GREEN] 蓝 [BLUE]" blockType="command"
    //% NUMS.shadow="dropdown" NUMS.options="nums" NUMS.defl="0"
    //% RED.shadow="number" RED.defl="255"
    //% GREEN.shadow="number" GREEN.defl="0"
    //% BLUE.shadow="number" BLUE.defl="0"
    export function aimech_set_led_ultrasonic_color_arg(parameter: any, block: any) {
        const nums = parameter.NUMS.code;
        const red = parameter.RED.code;
        const green = parameter.GREEN.code;
        const blue = parameter.BLUE.code;
        Generator.addCode(`sonar.setRGB(${nums},${red},${green},${blue})`);
    }

    //% block="关闭LED超声波传感器灯 [NUMS]" blockType="command"
    //% NUMS.shadow="dropdown" NUMS.options="nums" NUMS.defl="0"
    export function aimech_close_led_ultrasonic(parameter: any, block: any) {
        const nums = parameter.NUMS.code;
        Generator.addCode(`sonar.setRGB(${nums},0x00,0x00,0x00)`);
    }

    //% block="LED超声波传感器灯 [NUM] [RGB] 呼吸周期 [TIME] 秒" blockType="command"
    //% NUM.shadow="dropdown" NUM.options="num" NUM.defl="1"
    //% RGB.shadow="dropdown" RGB.options="rgb" RGB.defl="1"
    //% TIME.shadow="number" TIME.defl="1"
    export function aimech_set_led_ultrasonic_breath(parameter: any, block: any) {
        const num = parameter.NUM.code;
        const rgb = parameter.RGB.code;
        const time = parameter.TIME.code;
        Generator.addCode(`sonar.setBreathingCycle(${num},${rgb},${time} * 1000)`);
    }

    //% block="LED超声波传感器进入随机变色模式" blockType="command"
    export function aimech_set_led_ultrasonic_random(parameter: any, block: any) {
        Generator.addCode(`sonar.startSymphony()`);
    }

    // WonderEcho 初始化创建共享 asr2 对象，后续识别与播报积木都依赖该对象。
    //% block="初始化WonderEcho语音模块接口 [PORT]" blockType="command"
    //% PORT.shadow="dropdown" PORT.options="aimech_iicport" PORT.defl="1"
    export function aimech_wonderecho_init(parameter: any, block: any) {
        const port = parameter.PORT.code;
        Generator.addImport(`import Hiwonder_DEV`);
        Generator.addObject("", "", `asr2 = Hiwonder_DEV.DEV_ASR(Hiwonder_DEV.Port(${port}))`);
    }

    //% block="更新并获取WonderEcho识别结果" blockType="command"
    export function wonderecho_get_results(parameter: any, block: any) {
        Generator.addCode(`wonderecho_result = asr2.getResult()`);
    }

    //% block="WonderEcho语音模块识别到 [WORD]" blockType="boolean"
    //% WORD.shadow="dropdown" WORD.options="mechdog_word" WORD.defl="1"
    export function wonderecho_results(parameter: any, block: any) {
        const word = parameter.WORD.code;
        Generator.addCode(`(wonderecho_result == ${word})`);
    }

    //% block="获取WonderEcho语音模块识别词ID" blockType="reporter"
    export function wonderecho_get_result_num(parameter: any, block: any) {
        Generator.addCode(`wonderecho_result`);
    }

    // 设备库常量名称按硬件 API 保持 ASR_CMDMAND，不在生成阶段纠正拼写。
    //% block="WonderEcho语音模块播放命令词 [WORD]" blockType="command"
    //% WORD.shadow="dropdown" WORD.options="mechdog_speech_cmd_word" WORD.defl="1"
    export function wonderecho_speech_cmd(parameter: any, block: any) {
        const word = parameter.WORD.code;
        Generator.addCode(`asr2.speak(asr2.ASR_CMDMAND, ${word})`);
    }

    //% block="WonderEcho语音模块播放命令词编号 [NUM]" blockType="command"
    //% NUM.shadow="number" NUM.defl=1
    export function wonderecho_speech_cmd_number(parameter: any, block: any) {
        const num = parameter.NUM.code;
        Generator.addCode(`asr2.speak(asr2.ASR_CMDMAND, ${num})`);
    }

    //% block="WonderEcho语音模块播放播报词 [WORD]" blockType="command"
    //% WORD.shadow="dropdown" WORD.options="mechdog_speech_play_word" WORD.defl="1"
    export function wonderecho_speech_play(parameter: any, block: any) {
        const word = parameter.WORD.code;
        Generator.addCode(`asr2.speak(asr2.ASR_ANNOUNCER, ${word})`);
    }

    //% block="WonderEcho语音模块播放播报词编号 [NUM]" blockType="command"
    //% NUM.shadow="number" NUM.defl=1
    export function wonderecho_speech_play_number(parameter: any, block: any) {
        const num = parameter.NUM.code;
        Generator.addCode(`asr2.speak(asr2.ASR_ANNOUNCER, ${num})`);
    }

    // K230 初始化创建共享设备对象，后续控制和结果读取都复用该接口。
    //% block="初始化K230视觉模块接口 [PORT]" blockType="command"
    //% PORT.shadow="dropdown" PORT.options="aimech_iicport" PORT.defl="1"
    export function k230_aimech_init(parameter: any, block: any) {
        const port = parameter.PORT.code;
        Generator.addImport(`import Hiwonder_DEV`);
        Generator.addObject("", "", `k230 = Hiwonder_DEV.DEV_K230(Hiwonder_DEV.Port(${port}))`);
    }

    //% block="设置K230运行模式 [MODE]" blockType="command"
    //% MODE.shadow="dropdown" MODE.options="k230_mode" MODE.defl="0"
    export function k230_set_mode(parameter: any, block: any) {
        const mode = parameter.MODE.code;
        Generator.addCode(`k230.set_mode(${mode})`);
    }

    // 菜单值使用 Python 的 True/False 字面量，保持旧版硬件接口参数类型。
    //% block="K230 [MODE] 运行检测" blockType="command"
    //% MODE.shadow="dropdown" MODE.options="k230_start" MODE.defl="True"
    export function k230_set_run(parameter: any, block: any) {
        const mode = parameter.MODE.code;
        Generator.addCode(`k230.set_run_enabled(${mode})`);
    }

    //% block="设置K230音量 [VALUE]" blockType="command"
    //% VALUE.shadow="number" VALUE.defl=60
    export function k230_set_volumn(parameter: any, block: any) {
        const value = parameter.VALUE.code;
        Generator.addCode(`k230.set_volumn(${value})`);
    }

    //% block="设置K230连接的WIFI名 [VALUE1] 密码 [VALUE2]" blockType="command"
    //% VALUE1.shadow="string" VALUE1.defl=" "
    //% VALUE2.shadow="string" VALUE2.defl=" "
    export function k230_set_wifi(parameter: any, block: any) {
        const ssid = parameter.VALUE1.code;
        const password = parameter.VALUE2.code;
        Generator.addCode(`k230.set_wifi(${ssid},${password})`);
    }

    //% block="更新并保存K230结果数据" blockType="command"
    export function k230_update_detect_result(parameter: any, block: any) {
        Generator.addCode(`k230.update_result()`);
    }

    // MCP 工具配置写入全局变量，K230 初始化时按 _mcp_k230_ 前缀收集。
    //% block="设置动作组MCP工具参数 工具描述 [COMMAND] 阻塞超时时长 [BLOCK]" blockType="command"
    //% COMMAND.shadow="string" COMMAND.defl=" "
    //% BLOCK.shadow="number" BLOCK.defl=5
    export function k230_mcp_action_setting(parameter: any, block: any) {
        Generator.addObject("", "", `_mcp_k230_run_action={"type":"function","function":{"name":"run_action","description":{COMMAND.compactJson},"parameters":{"type":"object","properties":{"name":{"type":"string","description":"要求执行的动作名称"}},"required":["name"]}},"block":{BLOCK}}`);
    }

    //% block="设置运动MCP工具参数 工具描述 [COMMAND] 阻塞超时时长 [BLOCK]" blockType="command"
    //% COMMAND.shadow="string" COMMAND.defl=" "
    //% BLOCK.shadow="number" BLOCK.defl=5
    export function k230_mcp_move_setting(parameter: any, block: any) {
        Generator.addObject("", "", `_mcp_k230_move={"type":"function","function":{"name":"move","description":{COMMAND.compactJson},"parameters":{"type":"object","properties":{"x":{"type":"string","description":"x方向前进的距离, 单位m"},"y":{"type":"string","description":"y方向前进的距离,单位m"}},"required":["x","y"]}},"block":{BLOCK}}`);
    }

    // 自定义工具名称同时用于 Python 变量名和 JSON name，必须是静态字符串。
    //% block="设置MCP工具参数 工具名称 [NAME] 工具描述 [COMMAND] 返回参数 [PARAMS] 阻塞超时时长 [BLOCK]" blockType="command"
    //% NAME.shadow="string" NAME.defl="tool"
    //% COMMAND.shadow="string" COMMAND.defl=" "
    //% PARAMS.shadow="string" PARAMS.defl=" "
    //% BLOCK.shadow="number" BLOCK.defl=5
    export function k230_mcp_setting(parameter: any, block: any) {
        Generator.addObject("", "", `_mcp_k230_{NAME.identifier}={"type":"function","function":{"name":{NAME.jsonValue},"description":{COMMAND.compactJson},"parameters":{"type":"object","properties":{"params":{PARAMS.compactJson}}}},"block":{BLOCK}}`);
    }

    //% block="K230识别结果存在?" blockType="boolean"
    export function k230_result_exists(parameter: any, block: any) {
        Generator.addCode(`k230.result_available()`);
    }

    //% block="获取K230识别结果" blockType="reporter"
    export function k230_get_result(parameter: any, block: any) {
        Generator.addCode(`k230.result_get()`);
    }

    // 发送在线大模型响应后保留旧版 50ms 间隔，避免连续 IIC 消息覆盖。
    //% block="K230发送响应结果 [VALUE]" blockType="command"
    //% VALUE.shadow="string" VALUE.defl=" "
    export function k230_send_mcp_result(parameter: any, block: any) {
        const value = parameter.VALUE.code;
        Generator.addImport(`import time`);
        Generator.addCode(`k230.send_mcp_result(${value})`);
        Generator.addCode(`time.sleep(0.05)`);
    }

    // 默认 MCP 工具变量由 config 按麦轮底盘产品注入。
    //% block="设置K230默认MCP工具" blockType="command"
    export function k230_aimecanum_set_mcp_default(parameter: any, block: any) {
    }

    // 默认 MCP 工具变量由 config 按四足产品注入。
    //% block="设置K230默认MCP工具" blockType="command"
    export function k230_aiquadruped_set_mcp_default(parameter: any, block: any) {
    }

    // 默认 MCP 工具变量由 config 按四足竞赛版产品注入。
    //% block="设置K230默认MCP工具" blockType="command"
    export function k230_aiquadrupedpro_set_mcp_default(parameter: any, block: any) {
    }

    // 默认 MCP 工具变量由 config 按六足产品注入。
    //% block="设置K230默认MCP工具" blockType="command"
    export function k230_aihexa_set_mcp_default(parameter: any, block: any) {
    }

    // 默认工具菜单按当前产品在共享模块组合阶段切换。
    //% block="[RESULT] 是否存在默认MCP工具名称 [VALUE]?" blockType="boolean"
    //% RESULT.shadow="string" RESULT.defl=" "
    //% VALUE.shadow="dropdown" VALUE.options="mcp_names" VALUE.defl="Bat_Battery_power"
    export function k230_get_default_mcp_name(parameter: any, block: any) {
        const result = parameter.RESULT.code;
        const value = parameter.VALUE.code;
        Generator.addCode(`'${value}' in ${result}`);
    }

    // 在线模型返回值按工具名和参数名两级索引，RESULT 保持为可嵌套表达式。
    //% block="[RESULT] 获取蜂鸣器返回参数 [VALUE] 值" blockType="reporter"
    //% RESULT.shadow="string" RESULT.defl=" "
    //% VALUE.shadow="dropdown" VALUE.options="buzzer_params" VALUE.defl="freq"
    export function k230_get_buzzer_params(parameter: any, block: any) {
        const result = parameter.RESULT.code;
        const value = parameter.VALUE.code;
        Generator.addCode(`${result}['Buzzer_playTone']['${value}']`);
    }

    //% block="[RESULT] 获取RGB彩灯返回参数 [VALUE] 值" blockType="reporter"
    //% RESULT.shadow="string" RESULT.defl=" "
    //% VALUE.shadow="dropdown" VALUE.options="rgb_light_params" VALUE.defl="red"
    export function k230_get_rgb_light_params(parameter: any, block: any) {
        const result = parameter.RESULT.code;
        const value = parameter.VALUE.code;
        Generator.addCode(`${result}['RGB_setRGB']['${value}']`);
    }

    //% block="[RESULT] 获取发光超声波RGB彩灯返回参数 [VALUE] 值" blockType="reporter"
    //% RESULT.shadow="string" RESULT.defl=" "
    //% VALUE.shadow="dropdown" VALUE.options="rgb_light_params" VALUE.defl="red"
    export function k230_get_sonar_rgb_params(parameter: any, block: any) {
        const result = parameter.RESULT.code;
        const value = parameter.VALUE.code;
        Generator.addCode(`${result}['sonar_setRGB']['${value}']`);
    }

    //% block="[RESULT] 获取机械臂夹爪返回参数 [VALUE] 值" blockType="reporter"
    //% RESULT.shadow="string" RESULT.defl=" "
    //% VALUE.shadow="dropdown" VALUE.options="arm_claw_params" VALUE.defl="angle"
    export function k230_get_arm_claw_params(parameter: any, block: any) {
        const result = parameter.RESULT.code;
        const value = parameter.VALUE.code;
        Generator.addCode(`${result}['arm_claw']['${value}']`);
    }

    // 产品范围和差异菜单由 config 声明，Python 字典键保持旧硬件返回协议。
    //% block="[RESULT] 获取姿态设置返回参数 [VALUE] 值" blockType="reporter"
    //% RESULT.shadow="string" RESULT.defl=" "
    //% VALUE.shadow="dropdown" VALUE.options="robot_set_pose_params" VALUE.defl="x_offset"
    export function k230_get_robot_set_pose_params(parameter: any, block: any) {
        const result = parameter.RESULT.code;
        const value = parameter.VALUE.code;
        Generator.addCode(`${result}['robot_set_pose']['${value}']`);
    }

    //% block="[RESULT] 获取机器人运动返回参数 [VALUE] 值" blockType="reporter"
    //% RESULT.shadow="string" RESULT.defl=" "
    //% VALUE.shadow="dropdown" VALUE.options="robot_move_params" VALUE.defl="x"
    export function k230_get_robot_move_params(parameter: any, block: any) {
        const result = parameter.RESULT.code;
        const value = parameter.VALUE.code;
        Generator.addCode(`${result}['robot_move']['${value}']`);
    }

    //% block="[RESULT] 获取机器人动作组返回参数 [VALUE] 值" blockType="reporter"
    //% RESULT.shadow="string" RESULT.defl=" "
    //% VALUE.shadow="dropdown" VALUE.options="robot_runAction_params" VALUE.defl="num"
    export function k230_get_robot_runAction_params(parameter: any, block: any) {
        const result = parameter.RESULT.code;
        const value = parameter.VALUE.code;
        Generator.addCode(`${result}['robot_runAction']['${value}']`);
    }

    //% block="[RESULT] 获取电机速度设置返回参数 [VALUE] 值" blockType="reporter"
    //% RESULT.shadow="string" RESULT.defl=" "
    //% VALUE.shadow="dropdown" VALUE.options="motor_speed_params" VALUE.defl="right_back"
    export function k230_motor_speed_params(parameter: any, block: any) {
        const result = parameter.RESULT.code;
        const value = parameter.VALUE.code;
        Generator.addCode(`${result}['mcar_set_motors_speed']['${value}']`);
    }

    //% block="[RESULT] 获取移动距离设置返回参数 [VALUE] 值" blockType="reporter"
    //% RESULT.shadow="string" RESULT.defl=" "
    //% VALUE.shadow="dropdown" VALUE.options="move_distance_params" VALUE.defl="distance_cm"
    export function k230_get_move_distance_params(parameter: any, block: any) {
        const result = parameter.RESULT.code;
        const value = parameter.VALUE.code;
        Generator.addCode(`${result}['mcar_move_distance']['${value}']`);
    }

    //% block="[RESULT] 获取机械臂运动返回参数 [VALUE] 值" blockType="reporter"
    //% RESULT.shadow="string" RESULT.defl=" "
    //% VALUE.shadow="dropdown" VALUE.options="arm_move_to_yz_params" VALUE.defl="y"
    export function k230_get_arm_move_to_yz_params(parameter: any, block: any) {
        const result = parameter.RESULT.code;
        const value = parameter.VALUE.code;
        Generator.addCode(`${result}['arm_move_to_yz']['${value}']`);
    }

    // K230 各视觉模式共享 result_available/result_len，模式由基础积木提前切换。
    //% block="K230检测到人脸?" blockType="boolean"
    export function k230_face_detected(parameter: any, block: any) {
        Generator.addCode(`k230.result_available()`);
    }

    //% block="K230检测到的人脸数量" blockType="reporter"
    export function k230_face_count(parameter: any, block: any) {
        Generator.addCode(`k230.result_len()`);
    }

    //% block="K230存在名称为 [VALUE] 的人脸?" blockType="boolean"
    //% VALUE.shadow="string" VALUE.defl=" "
    export function k230_face_exists(parameter: any, block: any) {
        const faceName = parameter.VALUE.code;
        Generator.addCode(`k230.find_result('extra',${faceName})`);
    }

    // POS=1 是 extra 数组中的置信度，其余选项直接读取人脸结果的坐标字段。
    //% block="获取K230人脸 [VALUE] 的 [POS]" blockType="reporter"
    //% VALUE.shadow="string" VALUE.defl=" "
    //% POS.shadow="dropdown" POS.options="face_args2" POS.defl="1"
    export function k230_face_recognition_get_arg_by_name(parameter: any, block: any) {
        const faceName = parameter.VALUE.code;
        const pos = parameter.POS.code;
        Generator.addCode(`k230.get_key_result('extra',${faceName},'${pos}')`);
    }

    //% block="K230人脸姿态检测到人脸?" blockType="boolean"
    export function k230_face2_detected(parameter: any, block: any) {
        Generator.addCode(`k230.result_available()`);
    }

    //% block="K230人脸姿态检测到的人脸数量" blockType="reporter"
    export function k230_face2_count(parameter: any, block: any) {
        Generator.addCode(`k230.result_len()`);
    }

    //% block="K230靠近中心的人脸姿态朝向 [ORIENTION]" blockType="boolean"
    //% ORIENTION.shadow="dropdown" ORIENTION.options="face_pos_oriention" ORIENTION.defl="Forward"
    export function k230_result_face_pose_get_oriention(parameter: any, block: any) {
        const oriention = parameter.ORIENTION.code;
        Generator.addCode(`k230.near_center_result('extra',0) == '${oriention}'`);
    }

    // 数字项读取 extra 数组，坐标项读取结果对象字段；具体模板由 config 选择。
    //% block="K230靠近中心的人脸姿态 [VALUE]" blockType="reporter"
    //% VALUE.shadow="dropdown" VALUE.options="face2_args" VALUE.defl="0"
    export function k230_face2_near_center(parameter: any, block: any) {
        const value = parameter.VALUE.code;
        Generator.addCode(`k230.near_center_result('${value}')`);
    }

    //% block="K230表情识别检测到人脸?" blockType="boolean"
    export function k230_face3_detected(parameter: any, block: any) {
        Generator.addCode(`k230.result_available()`);
    }

    //% block="K230表情识别检测到的人脸数量" blockType="reporter"
    export function k230_face3_count(parameter: any, block: any) {
        Generator.addCode(`k230.result_len()`);
    }

    // 菜单保存硬件返回的英文表情名称，生成代码时按旧接口作为字符串比较。
    //% block="K230靠近中心的人脸表情为 [VALUE]" blockType="boolean"
    //% VALUE.shadow="dropdown" VALUE.options="facial_result" VALUE.defl="Happiness"
    export function k230_facial_detect(parameter: any, block: any) {
        const value = parameter.VALUE.code;
        Generator.addCode(`k230.near_center_result('extra',0) == '${value}'`);
    }

    // 数字项读取 extra 数组，坐标项读取结果对象字段；具体模板由 config 选择。
    //% block="获取K230靠近中心人脸表情的 [POS] 参数" blockType="reporter"
    //% POS.shadow="dropdown" POS.options="face_args" POS.defl="0"
    export function k230_get_facial_args(parameter: any, block: any) {
        const pos = parameter.POS.code;
        Generator.addCode(`k230.near_center_result('${pos}')`);
    }

    //% block="K230检测到注视方向?" blockType="boolean"
    export function k230_gaze_detected(parameter: any, block: any) {
        Generator.addCode(`k230.result_available()`);
    }

    //% block="K230检测到的注视方向数量" blockType="reporter"
    export function k230_gaze_count(parameter: any, block: any) {
        Generator.addCode(`k230.result_len()`);
    }

    //% block="K230靠近中心的注视方向为 [NAME]" blockType="boolean"
    //% NAME.shadow="dropdown" NAME.options="gaze_name" NAME.defl="Up"
    export function k230_gaze_near_center_result(parameter: any, block: any) {
        const name = parameter.NAME.code;
        Generator.addCode(`k230.near_center_result('extra',0) == '${name}'`);
    }

    // 数字项读取 extra 数组，坐标项读取结果对象字段；具体模板由 config 选择。
    //% block="K230靠近中心的注视方向 [VALUE]" blockType="reporter"
    //% VALUE.shadow="dropdown" VALUE.options="gaze_result" VALUE.defl="0"
    export function k230_gaze_near_center(parameter: any, block: any) {
        const value = parameter.VALUE.code;
        Generator.addCode(`k230.near_center_result('${value}')`);
    }

    //% block="K230检测到人体?" blockType="boolean"
    export function k230_person_detected(parameter: any, block: any) {
        Generator.addCode(`k230.result_available()`);
    }

    //% block="K230检测到的人体数量" blockType="reporter"
    export function k230_person_count(parameter: any, block: any) {
        Generator.addCode(`k230.result_len()`);
    }

    //% block="K230靠近中心的人体 [VALUE]" blockType="reporter"
    //% VALUE.shadow="dropdown" VALUE.options="axis_result" VALUE.defl="x"
    export function k230_person_near_center(parameter: any, block: any) {
        const value = parameter.VALUE.code;
        Generator.addCode(`k230.near_center_result('${value}')`);
    }

    //% block="K230检测到人体姿态?" blockType="boolean"
    export function k230_person_point_detected(parameter: any, block: any) {
        Generator.addCode(`k230.result_available()`);
    }

    //% block="K230检测到的人体姿态数量" blockType="reporter"
    export function k230_person2_count(parameter: any, block: any) {
        Generator.addCode(`k230.result_len()`);
    }

    //% block="K230检测到人体姿态 [NAME]?" blockType="boolean"
    //% NAME.shadow="string" NAME.defl=" "
    export function k230_person_keypoint_detect_name(parameter: any, block: any) {
        const name = parameter.NAME.code;
        Generator.addCode(`k230.find_result('id',${name})`);
    }

    // 数字项读取 keypoints 数组，名称和置信度直接读取结果字段；具体模板由 config 选择。
    //% block="获取K230人体姿态 [NAME] 的 [POS] 参数" blockType="reporter"
    //% NAME.shadow="string" NAME.defl=" "
    //% POS.shadow="dropdown" POS.options="person_keypoint_detect" POS.defl="id"
    export function k230_result_person_keypoint_get_arg(parameter: any, block: any) {
        const name = parameter.NAME.code;
        const pos = parameter.POS.code;
        Generator.addCode(`k230.get_key_result('id',${name},'${pos}')`);
    }

    // 数字项读取 keypoints 数组，名称和置信度直接读取结果字段；具体模板由 config 选择。
    //% block="获取K230靠近中心的人体关键点 [POS] 参数" blockType="reporter"
    //% POS.shadow="dropdown" POS.options="person_keypoint_detect" POS.defl="id"
    export function k230_person_keypoint_near_center(parameter: any, block: any) {
        const pos = parameter.POS.code;
        Generator.addCode(`k230.near_center_result('${pos}')`);
    }

    //% block="K230检测到手掌?" blockType="boolean"
    export function k230_hand_detected(parameter: any, block: any) {
        Generator.addCode(`k230.result_available()`);
    }

    //% block="K230检测到的手掌数量" blockType="reporter"
    export function k230_hand_count(parameter: any, block: any) {
        Generator.addCode(`k230.result_len()`);
    }

    //% block="K230检测到手掌姿态 [NAME]?" blockType="boolean"
    //% NAME.shadow="string" NAME.defl=" "
    export function k230_hand_detected_posture(parameter: any, block: any) {
        const name = parameter.NAME.code;
        Generator.addCode(`k230.find_result('id',${name})`);
    }

    // 数字项读取 keypoints 数组，其余选项直接读取手掌结果字段；具体模板由 config 选择。
    //% block="获取K230手掌姿态 [NAME] 的 [POS] 参数" blockType="reporter"
    //% NAME.shadow="string" NAME.defl=" "
    //% POS.shadow="dropdown" POS.options="hand_menu" POS.defl="id"
    export function k230_result_hand_keypoint_get_arg(parameter: any, block: any) {
        const name = parameter.NAME.code;
        const pos = parameter.POS.code;
        Generator.addCode(`k230.get_key_result('id',${name},'${pos}')`);
    }

    // 数字项读取 keypoints 数组，其余选项直接读取中心手掌结果字段；具体模板由 config 选择。
    //% block="获取K230靠近中心的手掌 [VALUE] 参数" blockType="reporter"
    //% VALUE.shadow="dropdown" VALUE.options="hand_menu" VALUE.defl="id"
    export function k230_hand_near_center(parameter: any, block: any) {
        const value = parameter.VALUE.code;
        Generator.addCode(`k230.near_center_result('${value}')`);
    }

    //% block="K230检测到手势?" blockType="boolean"
    export function k230_gesture_detected(parameter: any, block: any) {
        Generator.addCode(`k230.result_available()`);
    }

    //% block="K230检测到的手势数量" blockType="reporter"
    export function k230_gesture_count(parameter: any, block: any) {
        Generator.addCode(`k230.result_len()`);
    }

    //% block="K230靠近中心的手势为 [VALUE]?" blockType="boolean"
    //% VALUE.shadow="dropdown" VALUE.options="hand_gesture" VALUE.defl="ok"
    export function k230_result_hand_gesture_get_arg(parameter: any, block: any) {
        const value = parameter.VALUE.code;
        Generator.addCode(`k230.near_center_result('extra',0) == '${value}'`);
    }

    // 手势名称和位置都是固定菜单字段，按旧接口直接读取对应手势的边框属性。
    //% block="获取K230 [NAME] 手势的 [POS] 参数" blockType="reporter"
    //% NAME.shadow="dropdown" NAME.options="hand_gesture" NAME.defl="ok"
    //% POS.shadow="dropdown" POS.options="axis_result" POS.defl="x"
    export function k230_result_hand_gesture_get_pos_arg_by_name(parameter: any, block: any) {
        const name = parameter.NAME.code;
        const pos = parameter.POS.code;
        Generator.addCode(`k230.get_key_result('extra','${name}','${pos}')`);
    }

    // 名称项读取 extra[0]，坐标项读取结果对象字段；具体模板由 config 选择。
    //% block="获取K230靠近中心手势识别结果的 [POS] 参数" blockType="reporter"
    //% POS.shadow="dropdown" POS.options="face_args3" POS.defl="0"
    export function k230_result_hand_gesture_get_pos_arg(parameter: any, block: any) {
        const pos = parameter.POS.code;
        Generator.addCode(`k230.near_center_result('${pos}')`);
    }

    //% block="K230检测到跌倒?" blockType="boolean"
    export function k230_fall_detected(parameter: any, block: any) {
        Generator.addCode(`k230.result_available()`);
    }

    //% block="K230检测到的跌倒数量" blockType="reporter"
    export function k230_fall_count(parameter: any, block: any) {
        Generator.addCode(`k230.result_len()`);
    }

    //% block="K230靠近中心的目标处于跌倒状态?" blockType="boolean"
    export function k230_fall_near_center_result(parameter: any, block: any) {
        Generator.addCode(`k230.near_center_result('extra',0) == 1`);
    }

    // 置信度读取 extra[1]，坐标和宽高读取结果字段；具体模板由 config 选择。
    //% block="获取K230靠近中心跌倒检测的 [VALUE] 参数" blockType="reporter"
    //% VALUE.shadow="dropdown" VALUE.options="face_args2" VALUE.defl="1"
    export function k230_fall_near_center(parameter: any, block: any) {
        const value = parameter.VALUE.code;
        Generator.addCode(`k230.near_center_result('${value}')`);
    }

    //% block="K230检测到追踪目标?" blockType="boolean"
    export function k230_target_detected(parameter: any, block: any) {
        Generator.addCode(`k230.result_available()`);
    }

    //% block="获取K230靠近中心追踪目标的 [VALUE] 参数" blockType="reporter"
    //% VALUE.shadow="dropdown" VALUE.options="axis_result" VALUE.defl="x"
    export function k230_target_near_center(parameter: any, block: any) {
        const value = parameter.VALUE.code;
        Generator.addCode(`k230.near_center_result('${value}')`);
    }

    //% block="K230检测到动态手势?" blockType="boolean"
    export function k230_dynamic_gesture_detected(parameter: any, block: any) {
        Generator.addCode(`k230.result_available()`);
    }

    //% block="K230动态手势为 [GESTURE]?" blockType="boolean"
    //% GESTURE.shadow="string" GESTURE.defl=" "
    export function k230_result_dynamic_gesture_get_arg(parameter: any, block: any) {
        const gesture = parameter.GESTURE.code;
        Generator.addCode(`k230.near_center_result('value') == ${gesture}`);
    }

    //% block="K230识别到自学习 [NAME] 画面?" blockType="boolean"
    //% NAME.shadow="string" NAME.defl=" "
    export function k230_result_self_learn_get_arg(parameter: any, block: any) {
        const name = parameter.NAME.code;
        Generator.addCode(`k230.find_result('extra',${name})`);
    }

    // 置信度读取匹配结果的 extra[1]，坐标和宽高读取普通字段；具体模板由 config 选择。
    //% block="获取K230自学习 [NAME] 的 [POS] 参数" blockType="reporter"
    //% NAME.shadow="string" NAME.defl=" "
    //% POS.shadow="dropdown" POS.options="face_args2" POS.defl="1"
    export function k230_result_self_learn_get_pos_arg(parameter: any, block: any) {
        const name = parameter.NAME.code;
        const pos = parameter.POS.code;
        Generator.addCode(`k230.get_key_result('extra',${name},'${pos}')`);
    }

    //% block="设置K230单颜色检测目标为 [COLOR]" blockType="command"
    //% COLOR.shadow="dropdown" COLOR.options="color_li" COLOR.defl="red"
    export function k230_set_single_color(parameter: any, block: any) {
        const color = parameter.COLOR.code;
        Generator.addCode(`k230.set_color_target('${color}')`);
    }

    // colorName 保持旧生成器规则，将自由输入中的中文颜色名转换为硬件英文值。
    //% block="设置K230单颜色检测目标为 [COLOR]" blockType="command"
    //% COLOR.shadow="string" COLOR.defl=" "
    export function k230_set_single_color_arg(parameter: any, block: any) {
        Generator.addCode(`k230.set_color_target({COLOR.colorName})`);
    }

    //% block="K230单颜色检测到颜色?" blockType="boolean"
    export function k230_single_color_detected(parameter: any, block: any) {
        Generator.addCode(`k230.result_available()`);
    }

    // 名称读取 color 字段，其余选项读取 blobs[0]；具体模板由 config 选择。
    //% block="获取K230单颜色检测的 [POS] 参数" blockType="reporter"
    //% POS.shadow="dropdown" POS.options="color_angle_axis_result" POS.defl="color"
    export function k230_result_single_color_get_pos_arg(parameter: any, block: any) {
        const pos = parameter.POS.code;
        Generator.addCode(`k230.near_center_result('blobs',0,'${pos}')`);
    }

    //% block="设置K230多颜色检测列表 [COLOR]" blockType="command"
    //% COLOR.shadow="string" COLOR.defl=" "
    export function k230_set_multi_color_arg(parameter: any, block: any) {
        const color = parameter.COLOR.code;
        Generator.addCode(`k230.set_multi_color_list(${color})`);
    }

    //% block="K230多颜色检测到颜色?" blockType="boolean"
    export function k230_color_detected(parameter: any, block: any) {
        Generator.addCode(`k230.result_available()`);
    }

    //% block="K230检测到的颜色数量" blockType="reporter"
    export function k230_color_count(parameter: any, block: any) {
        Generator.addCode(`k230.result_len()`);
    }

    //% block="K230检测到颜色 [NAME]?" blockType="boolean"
    //% NAME.shadow="string" NAME.defl=" "
    export function k230_color_near_center_name(parameter: any, block: any) {
        Generator.addCode(`k230.find_result('color',{NAME.colorName})`);
    }

    // 名称读取 color 字段，其余选项读取 blobs[0]；具体模板由 config 选择。
    //% block="获取K230靠近中心颜色的 [VALUE] 参数" blockType="reporter"
    //% VALUE.shadow="dropdown" VALUE.options="color_angle_axis_result" VALUE.defl="color"
    export function k230_color_near_center(parameter: any, block: any) {
        const value = parameter.VALUE.code;
        Generator.addCode(`k230.near_center_result('blobs',0,'${value}')`);
    }

    // 名称输入沿用中文颜色转换，color 字段和 blobs 字段由 config 分支选择。
    //% block="获取K230颜色 [NAME] 检测结果的 [POS] 参数" blockType="reporter"
    //% NAME.shadow="string" NAME.defl=" "
    //% POS.shadow="dropdown" POS.options="color_angle_axis_result" POS.defl="color"
    export function k230_result_multi_color_get_pos_arg(parameter: any, block: any) {
        const pos = parameter.POS.code;
        Generator.addCode(`k230.get_key_result('color',{NAME.colorName},'blobs',0,'${pos}')`);
    }

    //% block="设置K230线检测颜色为 [COLOR]" blockType="command"
    //% COLOR.shadow="dropdown" COLOR.options="color_li" COLOR.defl="red"
    export function k230_set_line_color(parameter: any, block: any) {
        const color = parameter.COLOR.code;
        Generator.addCode(`k230.set_color_target('${color}')`);
    }

    // 旧线检测自由输入直接传给硬件接口，不执行颜色名称转换。
    //% block="设置K230线检测颜色为 [COLOR]" blockType="command"
    //% COLOR.shadow="string" COLOR.defl=" "
    export function k230_set_line_color_arg(parameter: any, block: any) {
        const color = parameter.COLOR.code;
        Generator.addCode(`k230.set_color_target(${color})`);
    }

    //% block="K230检测到线?" blockType="boolean"
    export function k230_line_detected(parameter: any, block: any) {
        Generator.addCode(`k230.result_available()`);
    }

    //% block="获取K230线检测结果 [VALUE]" blockType="reporter"
    //% VALUE.shadow="dropdown" VALUE.options="line_result" VALUE.defl="center_pos"
    export function k230_result_line_detect_get_arg(parameter: any, block: any) {
        const value = parameter.VALUE.code;
        Generator.addCode(`k230.result_get(0,'${value}')`);
    }

    //% block="K230检测到文字?" blockType="boolean"
    export function k230_ocr_detected(parameter: any, block: any) {
        Generator.addCode(`k230.result_available()`);
    }

    //% block="K230检测到的文字数量" blockType="reporter"
    export function k230_ocr_count(parameter: any, block: any) {
        Generator.addCode(`k230.result_len()`);
    }

    //% block="获取K230文字识别结果" blockType="reporter"
    export function k230_result_ocr_get_arg(parameter: any, block: any) {
        Generator.addCode(`k230.near_center_result('text')`);
    }

    //% block="获取K230文字识别结果的 [POINT] 参数" blockType="reporter"
    //% POINT.shadow="dropdown" POINT.options="ocr_point" POINT.defl="0"
    export function k230_result_ocr_get_pos_arg(parameter: any, block: any) {
        const point = parameter.POINT.code;
        Generator.addCode(`k230.near_center_result('points',${point})`);
    }

    //% block="K230检测到车牌?" blockType="boolean"
    export function k230_license_plate_detected(parameter: any, block: any) {
        Generator.addCode(`k230.result_available()`);
    }

    //% block="K230检测到的车牌数量" blockType="reporter"
    export function k230_license_plate_count(parameter: any, block: any) {
        Generator.addCode(`k230.result_len()`);
    }

    //% block="获取K230车牌识别结果" blockType="reporter"
    export function k230_result_lpr_get_arg(parameter: any, block: any) {
        Generator.addCode(`k230.near_center_result('text')`);
    }

    //% block="获取K230车牌识别结果的 [POINT] 参数" blockType="reporter"
    //% POINT.shadow="dropdown" POINT.options="ocr_point" POINT.defl="0"
    export function k230_result_lpr_get_pos_arg(parameter: any, block: any) {
        const point = parameter.POINT.code;
        Generator.addCode(`k230.near_center_result('points',${point})`);
    }

    // 物体分类和物体检测共用结果存在与数量接口。
    //% block="K230检测到物体?" blockType="boolean"
    export function k230_object_detected(parameter: any, block: any) {
        Generator.addCode(`k230.result_available()`);
    }

    //% block="K230检测到的物体数量" blockType="reporter"
    export function k230_object_count(parameter: any, block: any) {
        Generator.addCode(`k230.result_len()`);
    }

    // 分类名称读取 extra[0]，中心坐标读取普通字段；具体模板由 config 选择。
    //% block="获取K230物体分类结果的 [POS] 参数" blockType="reporter"
    //% POS.shadow="dropdown" POS.options="obj_menu" POS.defl="0"
    export function k230_object_classify_parameter(parameter: any, block: any) {
        const pos = parameter.POS.code;
        Generator.addCode(`k230.near_center_result('${pos}')`);
    }

    //% block="K230检测到 [NAME]?" blockType="boolean"
    //% NAME.shadow="dropdown" NAME.options="objs" NAME.defl="person"
    export function k230_object_named_detected(parameter: any, block: any) {
        const name = parameter.NAME.code;
        Generator.addCode(`k230.find_result('extra','${name}')`);
    }

    // 名称与置信度读取 extra[0/1]，坐标和宽高读取普通字段；具体模板由 config 选择。
    //% block="获取K230物体检测结果的 [POS] 参数" blockType="reporter"
    //% POS.shadow="dropdown" POS.options="face_args" POS.defl="0"
    export function k230_object_parameter(parameter: any, block: any) {
        const pos = parameter.POS.code;
        Generator.addCode(`k230.near_center_result('${pos}')`);
    }

    //% block="K230检测到垃圾?" blockType="boolean"
    export function k230_trash_detected(parameter: any, block: any) {
        Generator.addCode(`k230.result_available()`);
    }

    //% block="K230检测到的垃圾数量" blockType="reporter"
    export function k230_trash_count(parameter: any, block: any) {
        Generator.addCode(`k230.result_len()`);
    }

    //% block="K230靠近中心的垃圾名称为 [VALUE]?" blockType="boolean"
    //% VALUE.shadow="dropdown" VALUE.options="garbage" VALUE.defl="BananaPeel"
    export function k230_result_garbage_get_name_arg(parameter: any, block: any) {
        const value = parameter.VALUE.code;
        Generator.addCode(`k230.near_center_result('extra',0) == '${value}'`);
    }

    //% block="获取K230靠近中心垃圾的 [POS] 参数" blockType="reporter"
    //% POS.shadow="dropdown" POS.options="name_confidence" POS.defl="0"
    export function k230_trash_near_center(parameter: any, block: any) {
        const pos = parameter.POS.code;
        Generator.addCode(`k230.near_center_result('extra',${pos})`);
    }

    //% block="获取K230靠近中心垃圾的 [POS] 坐标" blockType="reporter"
    //% POS.shadow="dropdown" POS.options="ocr_point" POS.defl="0"
    export function k230_result_garbage_get_pos_arg(parameter: any, block: any) {
        const pos = parameter.POS.code;
        Generator.addCode(`k230.near_center_result('points',${pos})`);
    }

    // 交通检测名称来自固定菜单，按旧硬件接口要求作为字符串比较。
    //% block="K230检测到交通标志?" blockType="boolean"
    export function k230_traffic_sign_detected(parameter: any, block: any) {
        Generator.addCode(`k230.result_available()`);
    }

    //% block="K230检测到的交通标志数量" blockType="reporter"
    export function k230_traffic_sign_count(parameter: any, block: any) {
        Generator.addCode(`k230.result_len()`);
    }

    //% block="K230靠近中心的交通检测结果名称为 [NAME]?" blockType="boolean"
    //% NAME.shadow="dropdown" NAME.options="traffic_sign" NAME.defl="go"
    export function k230_result_traffic_get_name_arg(parameter: any, block: any) {
        const name = parameter.NAME.code;
        Generator.addCode(`k230.near_center_result('extra',0) == '${name}'`);
    }

    // 名称和置信度读取 extra[0/1]，坐标和宽高读取普通字段；具体模板由 config 选择。
    //% block="获取K230靠近中心交通标志的 [POS] 参数" blockType="reporter"
    //% POS.shadow="dropdown" POS.options="face_args" POS.defl="0"
    export function k230_traffic_sign_near_center(parameter: any, block: any) {
        const pos = parameter.POS.code;
        Generator.addCode(`k230.near_center_result('${pos}')`);
    }

    // AprilTag 文本由表达式输入，生成时不额外包裹引号。
    //% block="K230检测到AprilTag?" blockType="boolean"
    export function k230_april_tag_detected(parameter: any, block: any) {
        Generator.addCode(`k230.result_available()`);
    }

    //% block="K230检测到的AprilTag数量" blockType="reporter"
    export function k230_april_tag_count(parameter: any, block: any) {
        Generator.addCode(`k230.result_len()`);
    }

    //% block="K230靠近中心的AprilTag文本为 [NAME]?" blockType="boolean"
    //% NAME.shadow="string" NAME.defl=" "
    export function k230_result_apriltag_get_name_arg(parameter: any, block: any) {
        const name = parameter.NAME.code;
        Generator.addCode(`k230.near_center_result('extra',0) == ${name}`);
    }

    //% block="获取K230靠近中心AprilTag的 [POS] 参数" blockType="reporter"
    //% POS.shadow="dropdown" POS.options="name_confidence" POS.defl="0"
    export function k230_april_tag_near_center(parameter: any, block: any) {
        const pos = parameter.POS.code;
        Generator.addCode(`k230.near_center_result('extra',${pos})`);
    }

    //% block="获取K230靠近中心AprilTag的 [POS] 坐标" blockType="reporter"
    //% POS.shadow="dropdown" POS.options="ocr_point" POS.defl="0"
    export function k230_result_apriltag_get_pos_arg(parameter: any, block: any) {
        const pos = parameter.POS.code;
        Generator.addCode(`k230.near_center_result('points',${pos})`);
    }

    // DM 码文本使用表达式输入，检测结果的文本保存在 extra[0]。
    //% block="K230检测到DM码?" blockType="boolean"
    export function k230_dm_code_detected(parameter: any, block: any) {
        Generator.addCode(`k230.result_available()`);
    }

    //% block="K230检测到的DM码数量" blockType="reporter"
    export function k230_dm_code_count(parameter: any, block: any) {
        Generator.addCode(`k230.result_len()`);
    }

    //% block="K230靠近中心的DM码文本为 [NAME]?" blockType="boolean"
    //% NAME.shadow="string" NAME.defl=" "
    export function k230_result_dmcode_get_name_arg(parameter: any, block: any) {
        const name = parameter.NAME.code;
        Generator.addCode(`k230.near_center_result('extra',0) == ${name}`);
    }

    //% block="获取K230靠近中心DM码的文本" blockType="reporter"
    export function k230_dm_code_near_center(parameter: any, block: any) {
        Generator.addCode(`k230.near_center_result('extra',0)`);
    }

    //% block="获取K230靠近中心DM码的 [POS] 坐标" blockType="reporter"
    //% POS.shadow="dropdown" POS.options="ocr_point" POS.defl="0"
    export function k230_result_dmcode_get_pos_arg(parameter: any, block: any) {
        const pos = parameter.POS.code;
        Generator.addCode(`k230.near_center_result('points',${pos})`);
    }

    // 二维码文本使用表达式输入，坐标和宽高读取普通结果字段。
    //% block="K230检测到二维码?" blockType="boolean"
    export function k230_qr_code_detected(parameter: any, block: any) {
        Generator.addCode(`k230.result_available()`);
    }

    //% block="K230检测到的二维码数量" blockType="reporter"
    export function k230_qr_code_count(parameter: any, block: any) {
        Generator.addCode(`k230.result_len()`);
    }

    //% block="K230靠近中心的二维码文本为 [NAME]?" blockType="boolean"
    //% NAME.shadow="string" NAME.defl=" "
    export function k230_result_orcode_get_arg(parameter: any, block: any) {
        const name = parameter.NAME.code;
        Generator.addCode(`k230.near_center_result('extra',0) == ${name}`);
    }

    //% block="获取K230靠近中心二维码的文本" blockType="reporter"
    export function k230_qr_code_near_center(parameter: any, block: any) {
        Generator.addCode(`k230.near_center_result('extra',0)`);
    }

    //% block="获取K230靠近中心二维码的 [POS] 参数" blockType="reporter"
    //% POS.shadow="dropdown" POS.options="axis_result" POS.defl="x"
    export function k230_result_orcode_get_pos_arg(parameter: any, block: any) {
        const pos = parameter.POS.code;
        Generator.addCode(`k230.near_center_result('${pos}')`);
    }

    // 条形码文本使用表达式输入，坐标和宽高读取普通结果字段。
    //% block="K230检测到条形码?" blockType="boolean"
    export function k230_barcode_detected(parameter: any, block: any) {
        Generator.addCode(`k230.result_available()`);
    }

    //% block="K230检测到的条形码数量" blockType="reporter"
    export function k230_barcode_count(parameter: any, block: any) {
        Generator.addCode(`k230.result_len()`);
    }

    //% block="K230靠近中心的条形码文本为 [NAME]?" blockType="boolean"
    //% NAME.shadow="string" NAME.defl=" "
    export function k230_result_barcode_get_arg(parameter: any, block: any) {
        const name = parameter.NAME.code;
        Generator.addCode(`k230.near_center_result('extra',0) == ${name}`);
    }

    //% block="获取K230靠近中心条形码的文本" blockType="reporter"
    export function k230_barcode_near_center(parameter: any, block: any) {
        Generator.addCode(`k230.near_center_result('extra',0)`);
    }

    //% block="获取K230靠近中心条形码的 [POS] 参数" blockType="reporter"
    //% POS.shadow="dropdown" POS.options="axis_result" POS.defl="x"
    export function k230_result_barcode_get_pos_arg(parameter: any, block: any) {
        const pos = parameter.POS.code;
        Generator.addCode(`k230.near_center_result('${pos}')`);
    }

    // WonderLens 在大型 AI 机甲上通过指定 IIC 接口初始化，后续识别积木共享 cam 对象。
    //% block="初始化 WonderLens IIC接口 [IICPORT]" blockType="command"
    //% IICPORT.shadow="dropdown" IICPORT.options="aimech_iicport" IICPORT.defl="1"
    export function aimech_wondercamInitI2c(parameter: any, block: any) {
        const port = parameter.IICPORT.code;
        Generator.addImport(`import Hiwonder_DEV`);
        Generator.addObject("", "", `cam = Hiwonder_DEV.WonderCam(Hiwonder_DEV.Port(${port}))`);
    }

    // miniHexa 使用板载 IIC 接口，初始化时不接收端口参数。
    //% block="初始化 WonderLens IIC接口" blockType="command"
    export function minihexa_wondercamInitI2c(parameter: any, block: any) {
        Generator.addImport(`import Hiwonder_DEV`);
        Generator.addObject("", "", `cam = Hiwonder_DEV.WonderCam()`);
    }

    //% block="WonderLens 当前固件版本" blockType="reporter"
    export function getFwVersion(parameter: any, block: any) {
        Generator.addCode(`cam.getFwVersion()`);
    }

    // 菜单值由配置映射为 WonderLens 功能常量，保证生成结果与旧版一致。
    //% block="功能 [NUM]" blockType="reporter"
    //% NUM.shadow="dropdown" NUM.options="funcNum" NUM.defl="0"
    export function getFuncNumber(parameter: any, block: any) {
        const num = parameter.NUM.code;
        Generator.addCode(`${num}`);
    }

    //% block="WonderLens 当前功能" blockType="reporter"
    export function getCurrentFunc(parameter: any, block: any) {
        Generator.addCode(`cam.getCurrentFunc()`);
    }

    //% block="WonderLens 切换至功能 [NUM]" blockType="command"
    //% NUM.shadow="dropdown" NUM.options="funcNum" NUM.defl="0"
    export function switchFunc(parameter: any, block: any) {
        const num = parameter.NUM.code;
        Generator.addCode(`cam.switchFunc(${num})`);
    }

    //% block="[ONOFF] LED" blockType="command"
    //% ONOFF.shadow="dropdown" ONOFF.options="onOff" ONOFF.defl="1"
    export function setLed(parameter: any, block: any) {
        const onOff = parameter.ONOFF.code;
        Generator.addCode(`cam.setLed(${onOff})`);
    }

    //% block="WonderLens 更新并获取结果" blockType="command"
    export function wondercamUpdateResult(parameter: any, block: any) {
        Generator.addCode(`cam.updateResult()`);
    }

    //% block="检测到人脸?" blockType="boolean"
    export function isAnyFaceDetected(parameter: any, block: any) {
        Generator.addCode(`cam.isAnyFaceDetected()`);
    }

    //% block="WonderLens 检测到的人脸数量" blockType="reporter"
    export function numOfDetectedFaces(parameter: any, block: any) {
        Generator.addCode(`cam.numOfDetectedFaces()`);
    }
}
