# 动力模块的主控适配边界

产品目录存在不等于当前主控可以使用。添加支持前，需要同时确认主控支持表、真实接口、生成代码及主控 SDK；不能只替换端口菜单或复制另一个模块的 import。

## AIBlocksBoard 直控动力模块

| 模块 | 旧版实际开放主控 | 当前库状态 | 旧版接口 |
| - | - | - | - |
| [long-motor 长电机](long-motor/docs/README.md) | `aiblocksboard`（AIBlocksBoard） | 原生 class，初版 0.0.1 | `Hiwonder.UART(115200)`、`Hiwonder.Motor(uart, id)`，小车模式使用 `Hiwonder.car(...)` |
| [servo-180 180°舵机](servo-180/docs/README.md) | `aiblocksboard`（AIBlocksBoard） | 原生 class，初版 0.0.1 | `Hiwonder.Servos_Controller()`，角度控制传入 `180` |
| [servo-360 360°舵机](servo-360/docs/README.md) | `aiblocksboard`（AIBlocksBoard） | 原生 class，初版 0.0.1 | `Hiwonder.Servos_Controller()`，角度控制传入 `360` |

当前库的七个机器人主控 aimech、aimecanum、aiquadruped、aiquadrupedpro、aihexa、minihexa、aidoggy 均未开放这三项。[AIBlocksBoard 主板](../controllers/aiblocksboard/docs/README.md)提供板载积木及这三项动力支持，variant 为 `hiwonder-direct`，共同配置 `0.0.3`。`aiblocks` 与 `aiblocksboard` 是不同的旧标识，不能因为名称相似就互相替代。

旧版长电机实际声明 14 个积木，两个舵机各 3 个。旧生成器中另有未被当前声明引用的函数，不能把函数存在当作已开放功能。

## 端口与初始化不是同一概念

- 长电机使用 M1～M4，实际值 `1`～`4`；初始化固定 UART 波特率 `115200`，并为所用电机设置模式。M1 不是 IIC 的端口 A，也不是 GPIO 编号。
- 两种舵机使用 S1～S4，实际值 `1`～`4`；生成规则收集一个 `servos = Hiwonder.Servos_Controller()`，再生成角度、增量或停止指令。
- 旧 AIBlocksBoard 主入口收集 `import Hiwonder`、`import time` 和 `import Hiwonder_IIC`；上述动力积木本身并没有分别声明这些 import。不能因此认定任意 Python 主控都具有相同 SDK。
- 直接舵机、总线舵机及 [IIC 转 PWM](iic-pwm/docs/README.md) 不是同一接口。当前其他主控支持 IIC 转 PWM，不代表可加载这里的直接舵机模块。

## 其他适配与验收边界

三模块的 opcode、菜单分支、四语、初始化去重及项目恢复可做自动化验证；设备行为仍需真机验收。其他主控须有各自 SDK 的明确依据，不自动继承直控支持。涉及官方库配置时遵守[版本与项目合同](../../docs/versions-and-projects.md)，不原地改写旧快照；普通用户包按自身 support 适配，不据此扩大官方范围。源码领先发行时，不伪造不存在的 Release 或历史目录。
