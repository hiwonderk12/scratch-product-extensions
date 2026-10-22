# 风扇

一个硬件包、一个主要 src/index.ts；messages 集中维护四语，getInfo/getPython 按适配选择完整声明和 Python。图片位于 assets/fan.svg。通用接口见[原生 API](../../../../docs/native-api.md)。

## 按主控选择接口

| variant | 活跃 namespace / opcode | 端口与默认值 | SDK / 对象 |
| - | - | - | - |
| hiwonder-dev-port | actuator / aimech_fan_iic_set_module_speed | actuator.aimech_iicport，默认 1 | Hiwonder_DEV.DEV_FAN / iic_fan_PORT |
| hiwonder-dev-port-aidoggy | actuator / aimech_fan_iic_set_module_speed | actuator.aidoggy_iicport，默认 3 | Hiwonder_DEV.DEV_FAN / iic_fan_PORT |
| hiwonder-port | display / fan_module_speed | display.fanport，6/8、默认 6 | Hiwonder_Fan.Fan / fan_PORT |

前两种对应当前库公开支持；hiwonder-port 保留旧实现，但没有真实主控支持项，不因提供源码、端口表或隔离验证而开放。支持关系、适配和端口统一从[库配置](../../../../docs/configuration.md)维护。

所有积木的 SPEED 默认 80，控件 slider100。DEV 分支生成 iic_fan_PORT = Hiwonder_DEV.DEV_FAN(Hiwonder_DEV.Port(PORT))，普通端口分支生成 fan_PORT = Hiwonder_Fan.Fan(Hiwonder.Port(PORT))，随后调用 set_speed(SPEED)。导入、初始化与对象名按所选接口保留，固件必须提供对应 SDK；不用另一分支的对象替代。

## 双前缀兼容

metadata.json 保留主 namespace actuator，并用 namespaces 声明 actuator/display。getInfo 每次只返回当前适配的一套声明，两个分支分别显式写 id 字面量；getPython 返回相同分支的 opcode。单实例不同时注册两套互斥驱动。

display 分支调用 context.defaultPort('fan_module_speed', 'PORT', 'display')；第三参数只指定绑定前缀，不改变主控支持关系。actuator 分支仍可省略第三参数。

两个完整旧类型都不能删除或重命名。当前主控恢复不匹配的前缀/积木时不得偷偷切换驱动；应明确保持未接管，让客户端按旧项目兼容流程处理。

## 维护检查

逐分支验证全部菜单值、正负速度、独立对象/初始化去重、旧项目恢复、四语切换、与其他 actuator/display 模块共存及部分卸载。未知 variant、未声明/未支持的 namespace 必须拒绝。编译检查使用 `node tools/cli/index.mjs check output/fan`，打包用同命令的 pack。

```sh
node tools/cli/index.mjs check output/fan
node tools/cli/index.mjs pack output/fan
```
