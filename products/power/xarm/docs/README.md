# AI 机甲机械臂

主要维护 src/index.ts：原生类、集中四语 messages 与内联 getPython。菜单显示文案也在本文件；菜单值 _armId / _clawId 是 Python 标识符，不能翻译或加引号。通用接口见[原生 API](../../../../docs/native-api.md)。

## 主控与初始化

使用 hiwonder 适配、xarm 命名空间，当前公开支持仅 aimech，以[库配置](../../../../docs/configuration.md)为准。工具箱子分类保留“机械臂”，产品卡片名为“AI机甲机械臂”。全部积木复用 assets/claw.svg。

| opcode | 默认值 / 控件 | Python 语义 |
| - | - | - |
| aimech_set_arm_id | SERVO=2，number | setup 收集 _armId = SERVO |
| aimech_set_claw_id | SERVO=1，number | setup 收集 _clawId = SERVO |
| aimech_servo_enable | ARM=_armId | busservos.load(ARM) |
| aimech_servo_disable | ARM=_armId | busservos.unload(ARM) |
| aimech_set_servo_pose_time | ARM=_armId；POS=500、slider1000；TIME=500 ms | busservos.run(ARM,POS,TIME) |
| aimech_get_angle | ARM=_armId，reporter | busservos.get_position(ARM) |
| aimech_set_servo_stop | ARM=_armId | busservos.stop(ARM) |

除 ID 设置积木外，按需收集 import Hiwonder、_clawId = 1、_armId = 2、busservos = Hiwonder.BusServo()，重复使用时去重。ID 设置保留 setup 阶段，位于默认变量之后；不要改成普通运行语句或变量初始化，否则会改变课程代码的执行顺序。参数不自动截断或转换单位。

## 维护验证

验证两个菜单值、非默认 ID、多次设置的顺序、位置控件和初始化去重；旧作品恢复及四语切换必须保留原值与完整 Python。未知适配明确拒绝，不为其他主控擅自开放。

```sh
node tools/cli/index.mjs check power/xarm
node tools/cli/index.mjs pack power/xarm
```

固件、硬件及专业译文审校需另行完成。
