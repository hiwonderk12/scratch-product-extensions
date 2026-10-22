# 点阵屏维护说明

入口为同目录上级的 `src/index.ts`，在一个文件维护原生类、集中四语 messages、菜单和 Python；包身份与资源路径在 `metadata.json`，图标在 `assets/dot.svg`。

## 主控与驱动

| variant | SDK / 对象 | 端口菜单 / 默认值 |
| - | - | - |
| hiwonder-dev-port | Hiwonder_DEV.DEV_LEDMatrix(Hiwonder_DEV.Port(PORT)) / ledMatrix_PORT | aiblocks_iicport，1–4 / 1 |
| hiwonder-dev-port-aidoggy | 同 DEV SDK / ledMatrix_PORT | aidoggy_iicport，A–D（1–4）/ 3 |
| hiwonder-iic | Hiwonder_IIC.IIC() + Hiwonder_IIC.DEV_LEDMatrix(iic,PORT) / matrix_PORT | aiblocks_iicport，1–4 / 1 |

实际支持关系由[库配置](../../../../docs/configuration.md)决定。IIC 分支保留旧接口，并不表示已对某个真实主控开放。getInfo/getPython 使用相同适配；未知 variant 抛错，不能只改端口但仍用错误的 SDK。

IIC 点阵和 IO 点阵是不同接口：本模块的 AiDoggy 适配仍使用 DEV_LEDMatrix，而非 DEV_LEDMatrix_IO。IO 点阵的 aidoggy_* opcode、E/F 端口和独立分类不能直接覆盖本模块；需要该硬件时应单独评估源码、支持项和兼容范围。

## 积木与生成规则

DEV 的六个 opcode 是 `aimech_matrixLed_brightness`、`aimech_matrixLed_show_num`、`aimech_matrixLed_show_str`、`aimech_matrixLed_pos_onoff`、`aimech_matrix_led`、`aimech_clear_matrix_led`。IIC 对应 `aiblocksboard_` 前缀，包括 `aiblocksboard_clear_matrix_led`；namespace 都是 display。一次仅提供当前分支的六块，不能为了整理名称更改旧类型。

亮度使用 slider8，默认 8；图案使用 ledmatrix，默认 128 位全亮。Python 模板的 `{MATRIX.bitmap}` 由生成器提取位图；参数控件类型是 ledmatrix，Scratch 底层 shadow 名为 led_matrix。不要把 shadow 名误写为参数类型，也不要把位串直接当 Python 字符串。

方法分别是 setBrightness、showNum、drawStr、setLedOnOff、drawBitMap、clear。滚动菜单实际值是 False/True，像素开关是 1/0。初始化按使用到的端口去重，IIC 总线对象共用；不增加隐式刷新调用。

## 维护检查

文案集中维护 zh-cn/en/zh-tw/ko，通过 t(key) 引用；翻译只改变显示，不改菜单 value、方括号参数名、旧 opcode 或 Python。修改后按[开发手册](../../../../docs/development.md)检查，并验证三种适配、合法端口、全部菜单、非默认 bitmap、引号文本、旧 SB3 与语言切换。标准编译打包见[原生 API](../../../../docs/native-api.md)。实际设备与固件需另行验收。
