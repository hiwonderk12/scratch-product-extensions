# 数码管维护说明

主要维护 `src/index.ts`：集中四语 messages、`getInfo()` 的菜单/参数和 `getPython()` 的初始化/显示模板。`metadata.json` 只维护包身份、版本、入口与资源路径；卡片名称从 index 的 `product.name` 生成。图标位于 `assets/digit.svg`。

## 主控适配与兼容

| variant | 完整旧类型 | 菜单 / 默认值 |
| - | - | - |
| `hiwonder-dev-port` | `display_aimech_digit_show_num` | `aimech_iicport` / 库配置绑定 |
| `hiwonder-iic` | `display_aiblocksboard_digit_show_num` | `aiblocks_iicport` / 库配置绑定 |

当前五种 AI 系列主控通过共享支持集选择 DEV 分支。IIC 分支保留旧 API，不表示对应主控已整体开放；启用需先完成支持配置与实际设备校验，见[主控配置](../../../../docs/configuration.md)。

`getInfo()` 只返回选中分支，`getPython()` 也只返回相同 opcode 的规则；未知 variant 报错，不回退为其他驱动。两套旧 opcode、参数 `PORT` / `NUM`、菜单名和值不能重命名。数字参数为 `number`，默认 `0`；端口为不可接 reporter 的 literal 菜单，默认值由 `context.defaultPort()` 读取。

## Python 模板

DEV 分支：

```python
import Hiwonder_DEV
digit_{PORT} = Hiwonder_DEV.DEV_NixieTube(Hiwonder_DEV.Port({PORT}))
digit_{PORT}.show_int({NUM})
```

IIC 分支：

```python
import Hiwonder_IIC
iic = Hiwonder_IIC.IIC()
digit_{PORT} = Hiwonder_IIC.DEV_NixieTube(iic,{PORT})
digit_{PORT}.show_int({NUM})
```

上面是模板占位符，不是可直接执行的 Python。宿主按实际使用的积木收集导入和初始化；同端口对象和共享总线去重，不在切换语言时执行硬件调用。

文案在同一 index 的 `messages` 按 `zh-cn/en/zh-tw/ko` 维护，使用 `t(key)` 引用；译文保留 `[PORT]` / `[NUM]` 占位符，不翻译 opcode 或端口值。维护后按[开发手册](../../../../docs/development.md)检查与打包，并验证两适配、全部配置端口、旧作品和语言切换。
