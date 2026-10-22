# 总线舵机

主要维护 src/index.ts：getInfo 声明积木、菜单和控件，messages 集中维护简中/英文/繁中/韩文，getPython 就近声明 Python。图片位于 assets/servo.svg。通用规范见[原生 API](../../../../docs/native-api.md)。

## SDK 与支持

库配置选择 hiwonder 适配，保留 actuator 命名空间。支持关系由[库配置](../../../../docs/configuration.md)管理，不在类中按主控产品名判断。

每个使用积木收集 import Hiwonder 和 busservos = Hiwonder.BusServo()，生成器按需去重；不用积木时不初始化硬件。

| opcode | 参数默认值 / 控件 | Python 调用 |
| - | - | - |
| set_bus_servo | SERVO=1；POS=0、slider1000；TIME=100 毫秒 | busservos.run(SERVO,POS,TIME) |
| set_bus_servo_motor_speed | SERVO=1；SPEED=200、slider1000p | busservos.set_mode(SERVO,1,SPEED) |
| load_bus_servo | SERVO=1 | busservos.load(SERVO) |
| unload_bus_servo | SERVO=1 | busservos.unload(SERVO) |
| get_bus_servo_pos | SERVO=1；报告值 | busservos.get_position(SERVO) |

不要把舵机编号改成端口菜单，不改变位置/速度滑块或时间单位，不在模板额外截断参数。旧作品的参数名、完整积木类型和已有输入值保持不变。未知适配明确拒绝。

## 维护检查

修改后检查所有 opcode、默认值、正负速度与位置边界、报告值、完整 Python 和初始化去重；切换四语不改变参数或生成结果。编译检查使用 `node tools/cli/index.mjs check power/bus-servo`，打包用同命令的 pack。源码检查不能替代固件与硬件验收。

```sh
node tools/cli/index.mjs check power/bus-servo
node tools/cli/index.mjs pack power/bus-servo
```
