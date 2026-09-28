// 输出模块 Mind+ Python 作者源：维护 AI 产品 RGB 和 16×8 点阵屏的 Python 生成规则。
//% color="#ff6347" iconWidth=50 iconHeight=40
namespace display {
    //% block="设置RGB模块接口 [PORT] 红色值 [RED] 绿色值 [GREEN] 蓝色值 [BLUE]" blockType="command"
    //% PORT.shadow="dropdown" PORT.options="aimech_iicport" PORT.defl="1" RED.shadow="number" RED.defl="255" GREEN.shadow="number" GREEN.defl="0" BLUE.shadow="number" BLUE.defl="0"
    export function aimech_rgb_module_color_set(parameter: any, block: any) {
        const port = parameter.PORT.code;
        const red = parameter.RED.code;
        const green = parameter.GREEN.code;
        const blue = parameter.BLUE.code;
        Generator.addImport(`import Hiwonder_DEV`);
        Generator.addObject("", "", `rgbModule_${port} = Hiwonder_DEV.DEV_RGB(Hiwonder_DEV.Port(${port}))`);
        Generator.addCode(`rgbModule_${port}.set_rgb(${red},${green},${blue})`);
    }

    //% block="设置RGB模块接口 [PORT] 颜色 [COLOR]" blockType="command"
    //% PORT.shadow="dropdown" PORT.options="aimech_iicport" PORT.defl="1" COLOR.shadow="string" COLOR.defl="#ff0000"
    export function aimech_rgb_module_color_select(parameter: any, block: any) {
        const port = parameter.PORT.code;
        const color = parameter.COLOR.code;
        Generator.addImport(`import Hiwonder_DEV`);
        Generator.addObject("", "", `rgbModule_${port} = Hiwonder_DEV.DEV_RGB(Hiwonder_DEV.Port(${port}))`);
        Generator.addCode(`rgbModule_${port}.set_rgb(int(${color}[1:3],16),int(${color}[3:5],16),int(${color}[5:7],16))`);
    }

    //% block="设置RGB模块接口 [PORT] 呼吸灯模式,颜色 [COLOR] 变化周期(0.5~20) [CYCLE] 秒" blockType="command"
    //% PORT.shadow="dropdown" PORT.options="aimech_iicport" PORT.defl="1" COLOR.shadow="dropdown" COLOR.options="light_colors" COLOR.defl="0" CYCLE.shadow="number" CYCLE.defl="1"
    export function aimech_rgb_module_breath_one(parameter: any, block: any) {
        const port = parameter.PORT.code;
        const color = parameter.COLOR.code;
        const cycle = parameter.CYCLE.code;
        Generator.addImport(`import Hiwonder_DEV`);
        Generator.addObject("", "", `rgbModule_${port} = Hiwonder_DEV.DEV_RGB(Hiwonder_DEV.Port(${port}))`);
        Generator.addCode(`rgbModule_${port}.set_Breathing(${color},${cycle})`);
    }

    //% block="设置RGB模块接口 [PORT] 炫彩模式" blockType="command"
    //% PORT.shadow="dropdown" PORT.options="aimech_iicport" PORT.defl="1"
    export function aimech_rgb_module_breath(parameter: any, block: any) {
        const port = parameter.PORT.code;
        Generator.addImport(`import Hiwonder_DEV`);
        Generator.addObject("", "", `rgbModule_${port} = Hiwonder_DEV.DEV_RGB(Hiwonder_DEV.Port(${port}))`);
        Generator.addCode(`rgbModule_${port}.setRGBBreathingValue(5,10,15,40)`);
    }

    //% block="关闭RGB模块接口 [PORT] 灯" blockType="command"
    //% PORT.shadow="dropdown" PORT.options="aimech_iicport" PORT.defl="1"
    export function aimech_rgb_module_close(parameter: any, block: any) {
        const port = parameter.PORT.code;
        Generator.addImport(`import Hiwonder_DEV`);
        Generator.addObject("", "", `rgbModule_${port} = Hiwonder_DEV.DEV_RGB(Hiwonder_DEV.Port(${port}))`);
        Generator.addCode(`rgbModule_${port}.set_rgb(0, 0, 0)`);
    }

    //% block="设置点阵屏接口 [PORT] 亮度 [BRIGHT] (1-8)" blockType="command"
    //% PORT.shadow="dropdown" PORT.options="aiblocks_iicport" PORT.defl="1" BRIGHT.shadow="number" BRIGHT.defl="8"
    export function aimech_matrixLed_brightness(parameter: any, block: any) {
        const port = parameter.PORT.code;
        const bright = parameter.BRIGHT.code;
        Generator.addImport(`import Hiwonder_DEV`);
        Generator.addObject("", "", `ledMatrix_${port} = Hiwonder_DEV.DEV_LEDMatrix(Hiwonder_DEV.Port(${port}))`);
        Generator.addCode(`ledMatrix_${port}.setBrightness(${bright})`);
    }

    //% block="点阵屏接口 [PORT] 显示数字 [DATA]" blockType="command"
    //% PORT.shadow="dropdown" PORT.options="aiblocks_iicport" PORT.defl="1" DATA.shadow="number" DATA.defl="0"
    export function aimech_matrixLed_show_num(parameter: any, block: any) {
        const port = parameter.PORT.code;
        const data = parameter.DATA.code;
        Generator.addImport(`import Hiwonder_DEV`);
        Generator.addObject("", "", `ledMatrix_${port} = Hiwonder_DEV.DEV_LEDMatrix(Hiwonder_DEV.Port(${port}))`);
        Generator.addCode(`ledMatrix_${port}.showNum(${data})`);
    }

    //% block="点阵屏接口 [PORT] 位置 x [XPOS] y [YPOS] 显示字符串 [STR] [SCROLL]" blockType="command"
    //% PORT.shadow="dropdown" PORT.options="aiblocks_iicport" PORT.defl="1" XPOS.shadow="number" XPOS.defl="0" YPOS.shadow="number" YPOS.defl="0" STR.shadow="string" STR.defl="Hi" SCROLL.shadow="dropdown" SCROLL.options="scroll" SCROLL.defl="False"
    export function aimech_matrixLed_show_str(parameter: any, block: any) {
        const port = parameter.PORT.code;
        const xpos = parameter.XPOS.code;
        const ypos = parameter.YPOS.code;
        const text = parameter.STR.code;
        const scroll = parameter.SCROLL.code;
        Generator.addImport(`import Hiwonder_DEV`);
        Generator.addObject("", "", `ledMatrix_${port} = Hiwonder_DEV.DEV_LEDMatrix(Hiwonder_DEV.Port(${port}))`);
        Generator.addCode(`ledMatrix_${port}.drawStr(${xpos},${ypos},${text},${scroll})`);
    }

    //% block="点阵屏接口 [PORT] 位置 x [XPOS] y [YPOS] [LEDSTATUS]" blockType="command"
    //% PORT.shadow="dropdown" PORT.options="aiblocks_iicport" PORT.defl="1" XPOS.shadow="number" XPOS.defl="0" YPOS.shadow="number" YPOS.defl="0" LEDSTATUS.shadow="dropdown" LEDSTATUS.options="ledstatus" LEDSTATUS.defl="1"
    export function aimech_matrixLed_pos_onoff(parameter: any, block: any) {
        const port = parameter.PORT.code;
        const xpos = parameter.XPOS.code;
        const ypos = parameter.YPOS.code;
        const status = parameter.LEDSTATUS.code;
        Generator.addImport(`import Hiwonder_DEV`);
        Generator.addObject("", "", `ledMatrix_${port} = Hiwonder_DEV.DEV_LEDMatrix(Hiwonder_DEV.Port(${port}))`);
        Generator.addCode(`ledMatrix_${port}.setLedOnOff(${xpos},${ypos},${status})`);
    }

    //% block="点阵屏接口 [PORT] 绘制 [MATRIX]" blockType="command"
    //% PORT.shadow="dropdown" PORT.options="aiblocks_iicport" PORT.defl="1" MATRIX.shadow="string" MATRIX.defl="11111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111"
    export function aimech_matrix_led(parameter: any, block: any) {
        const port = parameter.PORT.code;
        const matrix = parameter.MATRIX.code;
        Generator.addImport(`import Hiwonder_DEV`);
        Generator.addObject("", "", `ledMatrix_${port} = Hiwonder_DEV.DEV_LEDMatrix(Hiwonder_DEV.Port(${port}))`);
        Generator.addCode(`ledMatrix_${port}.drawBitMap((${matrix}))`);
    }

    //% block="点阵屏接口 [PORT] 清空显示" blockType="command"
    //% PORT.shadow="dropdown" PORT.options="aiblocks_iicport" PORT.defl="1"
    export function aimech_clear_matrix_led(parameter: any, block: any) {
        const port = parameter.PORT.code;
        Generator.addImport(`import Hiwonder_DEV`);
        Generator.addObject("", "", `ledMatrix_${port} = Hiwonder_DEV.DEV_LEDMatrix(Hiwonder_DEV.Port(${port}))`);
        Generator.addCode(`ledMatrix_${port}.clear()`);
    }

    // AIBlocksBoard 点阵屏先建立共享 IIC 总线，再按端口复用设备对象。
    //% block="设置点阵屏接口 [PORT] 亮度 [BRIGHT] (1-8)" blockType="command"
    //% PORT.shadow="dropdown" PORT.options="aiblocks_iicport" PORT.defl="1" BRIGHT.shadow="number" BRIGHT.defl="8"
    export function aiblocksboard_matrixLed_brightness(parameter: any, block: any) {
        const port = parameter.PORT.code;
        const bright = parameter.BRIGHT.code;
        Generator.addImport(`import Hiwonder_IIC`);
        Generator.addObject("", "", `iic = Hiwonder_IIC.IIC()`);
        Generator.addObject("", "", `matrix_${port} = Hiwonder_IIC.DEV_LEDMatrix(iic,${port})`);
        Generator.addCode(`matrix_${port}.setBrightness(${bright})`);
    }

    //% block="点阵屏接口 [PORT] 显示数字 [DATA]" blockType="command"
    //% PORT.shadow="dropdown" PORT.options="aiblocks_iicport" PORT.defl="1" DATA.shadow="number" DATA.defl="0"
    export function aiblocksboard_matrixLed_show_num(parameter: any, block: any) {
        const port = parameter.PORT.code;
        const data = parameter.DATA.code;
        Generator.addImport(`import Hiwonder_IIC`);
        Generator.addObject("", "", `iic = Hiwonder_IIC.IIC()`);
        Generator.addObject("", "", `matrix_${port} = Hiwonder_IIC.DEV_LEDMatrix(iic,${port})`);
        Generator.addCode(`matrix_${port}.showNum(${data})`);
    }

    //% block="点阵屏接口 [PORT] 位置 x [XPOS] y [YPOS] 显示字符串 [STR] [SCROLL]" blockType="command"
    //% PORT.shadow="dropdown" PORT.options="aiblocks_iicport" PORT.defl="1" XPOS.shadow="number" XPOS.defl="0" YPOS.shadow="number" YPOS.defl="0" STR.shadow="string" STR.defl="Hi" SCROLL.shadow="dropdown" SCROLL.options="scroll" SCROLL.defl="False"
    export function aiblocksboard_matrixLed_show_str(parameter: any, block: any) {
        const port = parameter.PORT.code;
        const xpos = parameter.XPOS.code;
        const ypos = parameter.YPOS.code;
        const text = parameter.STR.code;
        const scroll = parameter.SCROLL.code;
        Generator.addImport(`import Hiwonder_IIC`);
        Generator.addObject("", "", `iic = Hiwonder_IIC.IIC()`);
        Generator.addObject("", "", `matrix_${port} = Hiwonder_IIC.DEV_LEDMatrix(iic,${port})`);
        Generator.addCode(`matrix_${port}.drawStr(${xpos},${ypos},${text},${scroll})`);
    }

    //% block="点阵屏接口 [PORT] 位置 x [XPOS] y [YPOS] [LEDSTATUS]" blockType="command"
    //% PORT.shadow="dropdown" PORT.options="aiblocks_iicport" PORT.defl="1" XPOS.shadow="number" XPOS.defl="0" YPOS.shadow="number" YPOS.defl="0" LEDSTATUS.shadow="dropdown" LEDSTATUS.options="ledstatus" LEDSTATUS.defl="1"
    export function aiblocksboard_matrixLed_pos_onoff(parameter: any, block: any) {
        const port = parameter.PORT.code;
        const xpos = parameter.XPOS.code;
        const ypos = parameter.YPOS.code;
        const status = parameter.LEDSTATUS.code;
        Generator.addImport(`import Hiwonder_IIC`);
        Generator.addObject("", "", `iic = Hiwonder_IIC.IIC()`);
        Generator.addObject("", "", `matrix_${port} = Hiwonder_IIC.DEV_LEDMatrix(iic,${port})`);
        Generator.addCode(`matrix_${port}.setLedOnOff(${xpos},${ypos},${status})`);
    }

    //% block="点阵屏接口 [PORT] 绘制 [MATRIX]" blockType="command"
    //% PORT.shadow="dropdown" PORT.options="aiblocks_iicport" PORT.defl="1" MATRIX.shadow="string" MATRIX.defl="11111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111"
    export function aiblocksboard_matrix_led(parameter: any, block: any) {
        const port = parameter.PORT.code;
        const matrix = parameter.MATRIX.code;
        Generator.addImport(`import Hiwonder_IIC`);
        Generator.addObject("", "", `iic = Hiwonder_IIC.IIC()`);
        Generator.addObject("", "", `matrix_${port} = Hiwonder_IIC.DEV_LEDMatrix(iic,${port})`);
        Generator.addCode(`matrix_${port}.drawBitMap((${matrix}))`);
    }

    //% block="点阵屏接口 [PORT] 清空显示" blockType="command"
    //% PORT.shadow="dropdown" PORT.options="aiblocks_iicport" PORT.defl="1"
    export function aiblocksboard_clear_matrix_led(parameter: any, block: any) {
        const port = parameter.PORT.code;
        Generator.addImport(`import Hiwonder_IIC`);
        Generator.addObject("", "", `iic = Hiwonder_IIC.IIC()`);
        Generator.addObject("", "", `matrix_${port} = Hiwonder_IIC.DEV_LEDMatrix(iic,${port})`);
        Generator.addCode(`matrix_${port}.clear()`);
    }

    //% block="数码管接口 [PORT] 显示数字 [NUM]" blockType="command"
    //% PORT.shadow="dropdown" PORT.options="aimech_iicport" PORT.defl="1" NUM.shadow="number" NUM.defl="0"
    export function aimech_digit_show_num(parameter: any, block: any) {
        const port = parameter.PORT.code;
        const num = parameter.NUM.code;
        Generator.addImport(`import Hiwonder_DEV`);
        Generator.addObject("", "", `digit_${port} = Hiwonder_DEV.DEV_NixieTube(Hiwonder_DEV.Port(${port}))`);
        Generator.addCode(`digit_${port}.show_int(${num})`);
    }

    //% block="数码管接口 [PORT] 显示数字 [NUM]" blockType="command"
    //% PORT.shadow="dropdown" PORT.options="aiblocks_iicport" PORT.defl="1" NUM.shadow="number" NUM.defl="0"
    export function aiblocksboard_digit_show_num(parameter: any, block: any) {
        const port = parameter.PORT.code;
        const num = parameter.NUM.code;
        Generator.addImport(`import Hiwonder_IIC`);
        Generator.addObject("", "", `iic = Hiwonder_IIC.IIC()`);
        Generator.addObject("", "", `digit_${port} = Hiwonder_IIC.DEV_NixieTube(iic,${port})`);
        Generator.addCode(`digit_${port}.show_int(${num})`);
    }

    //% block="初始化 OLED 接口 [PORT]" blockType="command"
    //% PORT.shadow="dropdown" PORT.options="aimech_iicport" PORT.defl="1"
    export function aimech_oled_init(parameter: any, block: any) {
        const port = parameter.PORT.code;
        Generator.addImport(`import Hiwonder_DEV`);
        Generator.addObject("", "", `my_oled = Hiwonder_DEV.DEV_OLED(Hiwonder_DEV.Port(${port}))`);
    }

    //% block="初始化 OLED 接口 [PORT]" blockType="command"
    //% PORT.shadow="dropdown" PORT.options="aiblocks_iicport" PORT.defl="1"
    export function aiblocks_oled_init(parameter: any, block: any) {
        const port = parameter.PORT.code;
        Generator.addImport(`import Hiwonder_IIC`);
        Generator.addObject("", "", `iic = Hiwonder_IIC.IIC()`);
        Generator.addObject("", "", `my_oled = Hiwonder_IIC.DEV_OLED(iic,${port})`);
    }

    //% block="OLED 显示字符 [STR] 坐标 X [XPOS] Y [YPOS]" blockType="command"
    //% STR.shadow="string" STR.defl="Hello" XPOS.shadow="number" XPOS.defl="0" YPOS.shadow="dropdown" YPOS.options="oled_char_row" YPOS.defl="0"
    export function oled_draw_ascii(parameter: any, block: any) {
        const str = parameter.STR.code;
        const xpos = parameter.XPOS.code;
        const ypos = parameter.YPOS.code;
        Generator.addCode(`my_oled.text(${str},${xpos},${ypos}*10 )`);
    }

    //% block="OLED 在坐标 X [XPOS] Y [YPOS] [STATUS]" blockType="command"
    //% XPOS.shadow="number" XPOS.defl="0" YPOS.shadow="number" YPOS.defl="0" STATUS.shadow="dropdown" STATUS.options="oledstatus" STATUS.defl="1"
    export function oled_point(parameter: any, block: any) {
        const xpos = parameter.XPOS.code;
        const ypos = parameter.YPOS.code;
        const status = parameter.STATUS.code;
        Generator.addCode(`my_oled.pixel(${xpos},${ypos},${status})`);
    }

    //% block="OLED 清空显示" blockType="command"
    export function oled_clear(parameter: any, block: any) {
        Generator.addCode(`my_oled.fill()`);
    }

    //% block="OLED 画水平线 起点 X [XPOS] Y [YPOS] 长度 [LENGTH]" blockType="command"
    //% XPOS.shadow="number" XPOS.defl="10" YPOS.shadow="number" YPOS.defl="15" LENGTH.shadow="number" LENGTH.defl="117"
    export function oled_draw_hline(parameter: any, block: any) {
        const xpos = parameter.XPOS.code;
        const ypos = parameter.YPOS.code;
        const length = parameter.LENGTH.code;
        Generator.addCode(`my_oled.hline(${xpos},${ypos},${length})`);
    }

    //% block="OLED 画垂直线 起点 X [XPOS] Y [YPOS] 长度 [LENGTH]" blockType="command"
    //% XPOS.shadow="number" XPOS.defl="10" YPOS.shadow="number" YPOS.defl="15" LENGTH.shadow="number" LENGTH.defl="48"
    export function oled_draw_vline(parameter: any, block: any) {
        const xpos = parameter.XPOS.code;
        const ypos = parameter.YPOS.code;
        const length = parameter.LENGTH.code;
        Generator.addCode(`my_oled.vline(${xpos},${ypos},${length})`);
    }

    //% block="OLED 画直线 起点 X [XPOS] Y [YPOS] 终点 X [XPOS1] Y [YPOS1]" blockType="command"
    //% XPOS.shadow="number" XPOS.defl="10" YPOS.shadow="number" YPOS.defl="15" XPOS1.shadow="number" XPOS1.defl="117" YPOS1.shadow="number" YPOS1.defl="15"
    export function oled_draw_line(parameter: any, block: any) {
        const xpos = parameter.XPOS.code;
        const ypos = parameter.YPOS.code;
        const xpos1 = parameter.XPOS1.code;
        const ypos1 = parameter.YPOS1.code;
        Generator.addCode(`my_oled.line(${xpos},${ypos},${xpos1},${ypos1})`);
    }

    //% block="OLED 画 [SHAPE] 矩形 左上 X [XPOS] Y [YPOS] 右下 X [XPOS1] Y [YPOS1]" blockType="command"
    //% SHAPE.shadow="dropdown" SHAPE.options="shapetype" SHAPE.defl="0" XPOS.shadow="number" XPOS.defl="30" YPOS.shadow="number" YPOS.defl="5" XPOS1.shadow="number" XPOS1.defl="98" YPOS1.shadow="number" YPOS1.defl="31"
    export function oled_draw_rect(parameter: any, block: any) {
        const xpos = parameter.XPOS.code;
        const ypos = parameter.YPOS.code;
        const xpos1 = parameter.XPOS1.code;
        const ypos1 = parameter.YPOS1.code;
        Generator.addCode(`my_oled.rect(${xpos},${ypos},${xpos1},${ypos1})`);
    }

    // MP3 分类保持旧版对象名与播放控制接口，初始化积木只负责导入和创建对象。
    //% block="初始化 MP3 模块接口 [IICPORT]" blockType="command"
    //% IICPORT.shadow="dropdown" IICPORT.options="mp3_port" IICPORT.defl="3"
    export function mp3_init(parameter: any, block: any) {
        const port = parameter.IICPORT.code;
        Generator.addImport(`from Hiwonder import MP3`);
        Generator.addObject("", "", `mp3 = Hiwonder.MP3(Hiwonder.Port(${port}))`);
    }

    //% block="MP3 模块播放第 [VALUE] 首歌曲" blockType="command"
    //% VALUE.shadow="number" VALUE.defl="1"
    export function mp3_play_song_num(parameter: any, block: any) {
        const value = parameter.VALUE.code;
        Generator.addCode(`mp3.play(${value})`);
    }

    //% block="MP3 模块 [PLAYSTATUS]" blockType="command"
    //% PLAYSTATUS.shadow="dropdown" PLAYSTATUS.options="play_status" PLAYSTATUS.defl="0"
    export function mp3_play_control(parameter: any, block: any) {
        Generator.addCode(`mp3.play()`);
    }

    //% block="设置 MP3 播放模式 [PLAYMODE]" blockType="command"
    //% PLAYMODE.shadow="dropdown" PLAYMODE.options="play_mode" PLAYMODE.defl="0"
    export function mp3_play_mode(parameter: any, block: any) {
        Generator.addCode(`mp3.loop_on()`);
    }

    //% block="设置 MP3 音量 [VALUE]" blockType="command"
    //% VALUE.shadow="number" VALUE.defl="30"
    export function mp3_set_volume(parameter: any, block: any) {
        const value = parameter.VALUE.code;
        Generator.addCode(`mp3.volume(${value})`);
    }

    // RGB 灯带按端口复用对象；“全部”与单灯由 manifest 的模板选择器分流。
    //% block="设置 RGB 灯带接口 [PORT] 灯 [NUMS] 红 [RED] 绿 [GREEN] 蓝 [BLUE]" blockType="command"
    //% PORT.shadow="dropdown" PORT.options="rgbport" PORT.defl="3" NUMS.shadow="dropdown" NUMS.options="nums" NUMS.defl="15" RED.shadow="number" RED.defl="255" GREEN.shadow="number" GREEN.defl="0" BLUE.shadow="number" BLUE.defl="0"
    export function rgb_color_set(parameter: any, block: any) {
        const port = parameter.PORT.code;
        const index = parameter.NUMS.code;
        const red = parameter.RED.code;
        const green = parameter.GREEN.code;
        const blue = parameter.BLUE.code;
        Generator.addObject("", "", `myrgb_${port} = Hiwonder.Neopixel(Hiwonder.Port(${port}),15)`);
        Generator.addCode(`myrgb_${port}.setItem(${index},${red},${green},${blue})\nmyrgb_${port}.write()`);
    }

    //% block="设置 RGB 灯带接口 [PORT] 灯 [NUMS] 颜色 [COLOR]" blockType="command"
    //% PORT.shadow="dropdown" PORT.options="rgbport" PORT.defl="3" NUMS.shadow="dropdown" NUMS.options="nums" NUMS.defl="15" COLOR.shadow="string" COLOR.defl="#ff0000"
    export function led_color_select(parameter: any, block: any) {
        const port = parameter.PORT.code;
        const index = parameter.NUMS.code;
        const color = parameter.COLOR.code;
        Generator.addObject("", "", `myrgb_${port} = Hiwonder.Neopixel(Hiwonder.Port(${port}),15)`);
        Generator.addCode(`myrgb_${port}.setItem(${index},int(${color}[1:3],16),int(${color}[3:5],16),int(${color}[5:7],16))\nmyrgb_${port}.write()`);
    }

    //% block="关闭 RGB 灯带接口 [PORT] 灯 [NUMS]" blockType="command"
    //% PORT.shadow="dropdown" PORT.options="rgbport" PORT.defl="3" NUMS.shadow="dropdown" NUMS.options="nums" NUMS.defl="15"
    export function led_close(parameter: any, block: any) {
        const port = parameter.PORT.code;
        const index = parameter.NUMS.code;
        Generator.addObject("", "", `myrgb_${port} = Hiwonder.Neopixel(Hiwonder.Port(${port}),15)`);
        Generator.addCode(`myrgb_${port}.setItem(${index},0x00,0x00,0x00)\nmyrgb_${port}.write()`);
    }

    // 黑色与白色风扇在旧版共用同一 opcode 和 Python 接口，因此内置包只保留一份控制积木。
    //% block="设置风扇接口 [PORT] 转速 [SPEED]" blockType="command"
    //% PORT.shadow="dropdown" PORT.options="fanport" PORT.defl="6" SPEED.shadow="number" SPEED.defl="80"
    export function fan_module_speed(parameter: any, block: any) {
        const port = parameter.PORT.code;
        const speed = parameter.SPEED.code;
        Generator.addImport(`import Hiwonder_Fan`);
        Generator.addObject("", "", `fan_${port} = Hiwonder_Fan.Fan(Hiwonder.Port(${port}))`);
        Generator.addCode(`fan_${port}.set_speed(${speed})`);
    }

    // AIBlocksBoard IIC 风扇固定使用旧版 0x58 设备地址。
    //% block="设置 IIC 风扇接口 [PORT] 转速 [SPEED]" blockType="command"
    //% PORT.shadow="dropdown" PORT.options="aiblocks_iicport" PORT.defl="1" SPEED.shadow="number" SPEED.defl="80"
    export function aiblocks_fan_iic_set_module_speed(parameter: any, block: any) {
        const port = parameter.PORT.code;
        const speed = parameter.SPEED.code;
        Generator.addImport(`import Hiwonder_IIC`);
        Generator.addObject("", "", `iic = Hiwonder_IIC.IIC()`);
        Generator.addObject("", "", `iic_fan_${port} = Hiwonder_IIC.DEV_FAN(iic,${port},0x58)`);
        Generator.addCode(`iic_fan_${port}.set_speed(${speed})`);
    }
}
