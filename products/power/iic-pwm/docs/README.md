# IIC 转 PWM 控制模块

主要维护 src/index.ts：原生类、集中四语 messages 和内联 getPython。模块不需要图片或独立 Python 目录，无实际资源时不要创建空目录。通用规范见[原生 API](../../../../docs/native-api.md)。

## 初始化与端口

使用 hiwonder-dev-port 适配和 actuator 命名空间。aimecha_iicpwm_init 显式收集 import Hiwonder_DEV 和 iicpwm = Hiwonder_DEV.DEV_PWMModule(Hiwonder_DEV.Port(PORT))；自身没有执行语句。

端口菜单 actuator.aimech_iicport 的 A/B/C/D/E/J/K 对应 1/2/3/4/5/9/10，默认 1。输出编号来自 actuator.iic_pwm_port，不能和主控 IIC 端口混用。以[当前库配置](../../../../docs/configuration.md)为准。

| opcode | 参数默认值 / 控件 | Python 调用 |
| - | - | - |
| aimecha_iicpwm_init | PORT=1，主控 IIC 端口菜单 | 显式初始化 iicpwm |
| iicpwm_set_pos | NUM=1；ANGLE=90、slider180z；TIME=500 毫秒 | iicpwm.set_angle(NUM,ANGLE,TIME,180) |
| iicpwm_set_speed | NUM=1；SPEED=0、slider100 | iicpwm.set_speed(NUM,SPEED) |

控制积木不自动补设备初始化，课程必须明确连接初始化积木。保留固定的 180° 型号参数和毫秒单位，不自动换算、截断或改动旧 opcode。未知适配明确拒绝。

## 维护检查

验证所有 IIC/输出菜单值、非默认端口、角度/速度控件、显式初始化与同一对象去重。真实旧项目恢复和四语切换应保留菜单、输入与完整 Python。编译检查使用 `node tools/cli/index.mjs check power/iic-pwm`，打包用同命令的 pack；固件与硬件需另行验收。

```sh
node tools/cli/index.mjs check power/iic-pwm
node tools/cli/index.mjs pack power/iic-pwm
```
