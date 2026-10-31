# 360°直接舵机维护

[src/index.ts](../src/index.ts) 以一个 class、集中四语和内联 Python 提供三个旧积木。当前初版 `0.0.1`，使用库配置 `0.0.3`；源码与开发内置不等于已经发布 Release。

先在“主控扩展 → 控制器”选择 AIBlocksBoard，再从“模块扩展”加载“360°舵机”。仅对 `aiblocksboard` 开放 `hiwonder-direct`，不是 360°电机、总线舵机或 IIC 转 PWM，不能为七款机器人直接启用。

| 完整旧类型 | Python 模板 |
| - | - |
| `actuator_set_servo360_angle_time` | `servos.set_angle_speed({SERVO},{ANGLE},{SPEED},{DELAY},360)` |
| `actuator_set_servo360_run` | `servos.set_angle_increment({SERVO},{ANGLE}*{ORIENTION},{SPEED},{DELAY},360)` |
| `actuator_set_servo360_stop` | `servos.stop({SERVO})` |

S1～S4 固定字段保留值 `1`～`4`；角度为 `slider360`、默认 `10`；速度为 `slider`、默认 `80`；方向 `1`／`-1`，等待 `True`／`False`，默认 `False`。界面语言只翻译文字，不改协议值和工程字段。

规则按需收集 `servos = Hiwonder.Servos_Controller()`，与 [180°舵机](../../servo-180/docs/README.md) 共用一次初始化。接口末参分别为 `360` 和 `180`，不因对象相同而合并 opcode 或角度范围。主板入口提供 Hiwonder、time、Hiwonder_IIC import。块图标为包内原始 `assets/servo.svg`。

~~~sh
npm run ext -- check power/servo-360
npm run ext -- pack power/servo-360
~~~

官方包须与主板采用一致完整快照，按[版本与项目](../../../../docs/versions-and-projects.md)显式切换并保留旧版本。检查和打包不代表真实舵机、等待、方向及 SDK 验收通过。
