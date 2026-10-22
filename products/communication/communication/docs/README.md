# PS3 手柄通信模块

主要维护 src/index.ts：原生 class / getInfo、集中中英繁韩 messages、菜单和内联 getPython。通用接口见[原生 API](../../../../docs/native-api.md)，支持配置见[库配置](../../../../docs/configuration.md)。没有实际块图标或外部 Python 文件时，不创建空目录。

## 主控与初始化

使用 ps3 适配、communication 前缀，工具箱子分类为“PS3手柄”。当前公开支持 aimech、aimecanum、aiquadruped、aiquadrupedpro、aihexa、aidoggy；minihexa 未开放。未知适配应明确拒绝，不静默套用其他驱动。

只有 ps3_init 收集 import PS3 并输出 PS3.init(STR)。读取、断开、LED 与震动积木不会自动导入或连接手柄；课程须显式安排初始化。STR 是普通字符串，生成器负责转义和加引号，不能把 MAC 地址当 Python 标识符。

| opcode | 默认值 / 类型 | Python |
| - | - | - |
| ps3_init | STR=10:00:00:00:00:00，string | PS3.init(STR) |
| ps3_get_address | reporter | PS3.get_address() |
| ps3_disconnect | command | PS3.deinit() |
| ps3_is_connected | Boolean | PS3.isconnected() |
| ps3_set_led | VALUE1/2/3/4=1 | PS3.setleds([VALUE1,VALUE2,VALUE3,VALUE4]) |
| ps3_set_rumble | VALUE1=60、slider；VALUE2=3000 ms | PS3.set_rumble(VALUE1, VALUE2) |
| ps3_get_keys | PS3_KEYS=SELECT，Boolean | PS3.get_button(PS3.PS3_KEYS) |
| ps3_get_axis | HANDLE_AXIS=RX，reporter | PS3.get_axis(PS3.HANDLE_AXIS) |
| ps3_get_sensor | ACCEL=ACCEL_X，reporter | PS3.get_sensor(PS3.ACCEL) |

表中的 PS3.PS3_KEYS / PS3.HANDLE_AXIS / PS3.ACCEL 表示用所选菜单值拼接 SDK 常量，例如 PS3.TRIANGLE / PS3.LY / PS3.ACCEL_Y，并非把参数名原样发给设备。震动时长单位为毫秒，保留设备最大 5000 ms 的文字说明；不在迁移模板中自行增加截断或换算。

## 菜单与多语言

accel 两项、on_off 两项、ps3_handle_axis 四项和 ps3_keys 十七项，顺序/value 保持。中文自然语言标签在集中 messages 翻译，PS3 按键字母与图形保持语言无关的显示文字。菜单 value 是数字或 SDK 常量片段，不能翻译、加引号或改变大小写。

## 维护验证

验证全部菜单值、LED 数组顺序、震动控件/毫秒、MAC 字符串转义、显式初始化与导入去重。旧作品实际加载和四语切换应保持字段与完整 Python，和输入传感器共存及独立卸载不互相影响。

```sh
node tools/cli/index.mjs check communication/communication
node tools/cli/index.mjs pack communication/communication
```

固件、硬件及专业译文审校需另行完成。
