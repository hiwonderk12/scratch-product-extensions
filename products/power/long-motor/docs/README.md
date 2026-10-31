# 长电机维护

[src/index.ts](../src/index.ts) 以一个 class 维护 14 个旧积木、集中四语和内联 Python。当前初版 `0.0.1`，使用库配置 `0.0.3`；源码与开发内置不代表已经发布 Release。

## 使用与适配

先在 WonderLab“主控扩展 → 控制器”选择 AIBlocksBoard，再从“模块扩展”加载“长电机”。仅对 `aiblocksboard` 开放 `hiwonder-direct`，七款机器人不能套用此接口。M1～M4 的协议值为 `1`～`4`，不是 IIC A～D 或 GPIO。菜单是固定字段，不接受报告积木；翻译文字，不翻译字段名和实际值。

保留电机模式、舵机模式和组合控制三个分组，完整旧类型均为 `actuator_` 加下表后缀。

| 积木后缀 | 生成行为 |
| - | - |
| `long_motor_set_speed` | 速度百分比乘 `8` 和方向后调用 `set_speed` |
| `long_motor_set_control` | `set_motor_distance_ctl`，保留单位、方向和等待菜单 |
| `long_motor_set_speed_zero` | `set_speed(0)` |
| `long_motor_read_speed` | `read_speed()` 数值表达式 |
| `long_motor_read_pose_relative` | `read_pose_relative()` 数值表达式 |
| `long_motor_set_0_degrees_relative` | 相对角度归零 |
| `long_motor_set_run` | `set_pose(NUM, SPEED * 8, False, DELAY)` |
| `long_motor_read_pose_absolute` | `__read_pose()` 数值表达式 |
| `long_motor_init_car` | 显式收集左右电机与 `Hiwonder.car(...)` 对象 |
| `long_motor_set_car_run` | `car.run`，保留距离／圈／秒协议值 |
| `long_motorset_car_rotate` | `car.rotate`，保留旧后缀拼写及左右符号 |
| `long_motor_set_car_move` | 左右速度乘 `8` 后调用 `car.move` |
| `long_motor_set_car_stop` | `car.move(0,0)` |
| `long_motor_set_car_rotate_bias` | `car.set_rotate_bias` |

使用某个电机时收集 `uart = Hiwonder.UART(115200)`、`motor_通道 = Hiwonder.Motor(uart,通道)` 和 `motor_通道.set_mode(0)`，生成器去重，不初始化未使用通道。两轮初始化保留旧工程的同通道选择；小车控制必须先显式初始化，不补默认尺寸或轮距。

主板入口提供 Hiwonder、time、Hiwonder_IIC import，不换成 Hiwonder_DEV。两个保留的 `MODE` 参数不参与旧输出，继续固定生成 `False`，不误实现成新功能。旧生成器中未被实际声明引用的函数不额外开放。

~~~sh
npm run ext -- check power/long-motor
npm run ext -- pack power/long-motor
~~~

官方主控和模块须使用相同完整配置快照，按[版本与工程合同](../../../../docs/versions-and-projects.md)显式切换，旧工程保留原版本。检查和打包不操作硬件，真实电机、SDK 部署和方向仍需设备验收。
