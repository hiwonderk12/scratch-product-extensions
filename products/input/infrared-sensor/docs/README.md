# 红外检测传感器维护说明

主要维护 src/index.ts 中的类、集中四语 messages 与内联 getPython。不要根据主控名称在软件本体硬编码驱动；库配置通过 variant 选择完整接口。

| variant | 主控 | 初始化及读取 | 活动端口 |
| - | - | - | - |
| wonderlab | 五种 AI 主控 | ir_PORT = Hiwonder_DEV.DEV_IR(Hiwonder_DEV.Port(PORT))；read_state() | sensor.aimech_iicport，A/B/C/D/E/J/K，默认1 |
| hiwonder-dev-raw-io | MiniHexa | avoid_PORT = Hiwonder_DEV.DEV_IR(PORT)；read() | sensor.minihexa_io_single_port，IO32-IO14=32、IO18-IO19=18，默认32 |

两种适配都显式收集 import Hiwonder_DEV，但参数包装、对象名和读取方法不同，不能仅替换端口值。未知 variant 拒绝。

MiniHexa 对外使用 minihexa_get_avoid_value；原 aimech_get_avoid_value 保留为隐藏兼容块，按 MiniHexa 生成规则读取，PORT 参数名不改。旧 aimech_iicport 菜单声明保留以恢复已保存的 shadow，不表示 MiniHexa 新增这些硬件端口。已有作品显式值不自动映射；历史错误端口需人工选回合法 IO，不能猜测 A 对应哪个引脚。

隐藏兼容块使用 SDK 的 hideFromPalette，只从工具箱隐藏，不删除运行方法、Python 规则或作品中的积木。四语切换不改变 opcode、字段、菜单实际值或生成代码。主控支持范围未扩大。

变更后按[开发手册](../../../../docs/development.md)、[配置](../../../../docs/configuration.md)与[原生 API](../../../../docs/native-api.md)验证两个驱动分支、全部端口、旧菜单恢复、共存与卸载。固件和真机行为需另行验收。
