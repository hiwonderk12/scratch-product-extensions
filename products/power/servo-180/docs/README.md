# 180°直接舵机维护

[src/index.ts](../src/index.ts) 以一个 class、集中四语和内联 Python 提供三个旧积木。当前初版 `0.0.1`，使用库配置 `0.0.3`；源码与开发内置不代表 Release 已发行。

先在“主控扩展 → 控制器”选择 AIBlocksBoard，再从“模块扩展”加载“180°舵机”。仅对 `aiblocksboard` 开放 `hiwonder-direct`，不是总线舵机或 IIC 转 PWM；七款机器人不支持此接口。

| 完整旧类型 | Python 模板 |
| - | - |
| `actuator_set_servo_angle_time` | `servos.set_angle_speed({SERVO},{ANGLE},{SPEED},{DELAY},180)` |
| `actuator_set_servo_run` | `servos.set_angle_increment({SERVO},{ANGLE}*{ORIENTION},{SPEED},{DELAY},180)` |
| `actuator_set_servo_stop` | `servos.stop({SERVO})` |

S1～S4 保留值 `1`～`4`，不是 IIC 端口。角度控件为 `slider0180`、默认 `10`；速度控件为 `slider`、默认 `80`。方向 `1`／`-1`，等待 `True`／`False`，默认不等待。固定菜单不接受报告积木。

规则收集一次 `servos = Hiwonder.Servos_Controller()`，与 [360°舵机](../../servo-360/docs/README.md) 共用对象。主板入口提供 Hiwonder、time 和 Hiwonder_IIC import，不换成 DEV 或总线接口。块图标使用包内原始 `assets/servo.svg`，不在 TS 中内嵌 base64。

~~~sh
npm run ext -- check power/servo-180
npm run ext -- pack power/servo-180
~~~

配套主控及模块须具有相同完整配置快照，按[版本与项目](../../../../docs/versions-and-projects.md)显式切换，不覆盖旧课程身份。四语、代码与打包验证不代表真实角度、等待、速度及设备 SDK 已验收。
