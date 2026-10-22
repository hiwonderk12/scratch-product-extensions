# IIC 风扇维护说明

主要维护 `src/index.ts`：四语 messages、`getInfo()` 的菜单/参数和 `getPython()` 的初始化/转速模板。包入口与版本在 `metadata.json`，块图标在 `assets/fan.svg`；不再维护旧注解或逐 opcode 模板文件。

## 主控适配与兼容

| variant | 完整旧类型 | 菜单 |
| - | - | - |
| `hiwonder-dev-port` | `display_aimech_fan_iic_set_module_speed` | `aimech_iicport` |
| `hiwonder-iic` | `display_aiblocks_fan_iic_set_module_speed` | `aiblocks_iicport` |

当前五种 AI 系列主控选择 DEV 分支，IIC 分支仅保留旧驱动能力，不能据此宣称对应主控已整体支持。真实支持关系、variant、菜单端口和默认值在[库配置](../../../../docs/configuration.md)维护。

两套旧 opcode、`PORT` / `SPEED` 参数、菜单实际值保持不变。`SPEED` 必须使用现有 `slider100` 控件，默认 `80`，不能退回普通数字控件。`PORT` 使用 literal 菜单，默认值由 `context.defaultPort()` 读取。

## Python 模板

DEV 分支：

```python
import Hiwonder_DEV
iic_fan_{PORT} = Hiwonder_DEV.DEV_FAN(Hiwonder_DEV.Port({PORT}))
iic_fan_{PORT}.set_speed({SPEED})
```

IIC 分支：

```python
import Hiwonder_IIC
iic = Hiwonder_IIC.IIC()
iic_fan_{PORT} = Hiwonder_IIC.DEV_FAN(iic,{PORT},0x56)
iic_fan_{PORT}.set_speed({SPEED})
```

上面展示模板占位符，不是可直接运行的 Python。`0x56` 是当前 IIC 模板的设备地址，不能省略或直接沿用其他旧包中的地址。按使用收集导入、共享总线与端口对象初始化；同端口多个命令只初始化一次。

`getInfo()` 与 `getPython()` 同时选择同一适配，只提供对应积木；未知 variant 明确报错。译文集中维护 `zh-cn/en/zh-tw/ko`，保留 `[PORT]` / `[SPEED]` 占位符。维护后验证两驱动的完整生成结果、端口、初始化去重、旧作品及四语切换，打包命令见[原生接口](../../../../docs/native-api.md)。
