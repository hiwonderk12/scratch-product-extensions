# OLED-12864 维护说明

主要维护 `src/index.ts`：集中 messages、`getInfo()` 的积木/参数/菜单和 `getPython()` 的初始化与绘图模板。`metadata.json` 维护包身份、版本、入口和资源路径；图标在 `assets/oled.svg`。无需独立 `python/` 或旧注解目录；可选目录无文件时删除。

## 适配与旧类型

| variant | 初始化旧类型 | 端口菜单 |
| - | - | - |
| `hiwonder-dev-port` | `display_aimech_oled_init` | `aimech_iicport` |
| `hiwonder-iic` | `display_aiblocks_oled_init` | `aiblocks_iicport` |

五种既有 AI 系列主控通过共享支持集选择 DEV；IIC 保留旧接口，但不表示对应主控已整体开放。主控支持关系、variant、端口与默认值由[库配置](../../../../docs/configuration.md)维护，初始化端口由 `context.defaultPort()` 读取。

同一个类保留九个旧 opcode，每个适配展示一种初始化及下列七个共用绘图积木，合计八个。`getInfo()` / `getPython()` 同步选择适配，未知 variant 报错。

| 完整旧类型 | Python 语义与参数约束 |
| - | - |
| `display_oled_draw_ascii` | `my_oled.text(STR,XPOS,YPOS*10 )`；STR 默认 Hello，XPOS 默认 0，YPOS 为 0–5 行菜单 |
| `display_oled_point` | `my_oled.pixel(XPOS,YPOS,STATUS)`；坐标默认 0，STATUS 默认 1 |
| `display_oled_clear` | `my_oled.fill()`，不增加参数 |
| `display_oled_draw_hline` | `my_oled.hline(XPOS,YPOS,LENGTH)`；默认 10、15、117 |
| `display_oled_draw_vline` | `my_oled.vline(XPOS,YPOS,LENGTH)`；默认 10、15、48 |
| `display_oled_draw_line` | `my_oled.line(XPOS,YPOS,XPOS1,YPOS1)`；默认 10、15、117、15 |
| `display_oled_draw_rect` | SHAPE=0 调用 rect，SHAPE=1 调用 fill_rect；坐标默认 30、5、98、31 |

不要更改 namespace、opcode、参数名、菜单名和值。`oledstatus` 的点亮/关闭值为 `1/0`，`shapetype` 的空心/实心值为 `0/1`；这些都是 literal 菜单且不接受 reporter。矩形填充分支由 `templateSelector` 保留，不可只复制旧 main.ts 的单条 rect 语句而遗漏配置中的 fill_rect。

## 初始化与生成

DEV 分支初始化模板：

```python
import Hiwonder_DEV
my_oled = Hiwonder_DEV.DEV_OLED(Hiwonder_DEV.Port({PORT}))
```

IIC 分支初始化模板：

```python
import Hiwonder_IIC
iic = Hiwonder_IIC.IIC()
my_oled = Hiwonder_IIC.DEV_OLED(iic,{PORT})
```

`{PORT}` 是生成占位符，不是可直接运行的 Python。用户需显式放置初始化积木；绘图积木本身不选择端口或自动初始化。保留 `my_oled` 对象名、字符行乘 10、fill/rect/fill_rect 的实际接口，不擅自增加 show、display 或隐式刷新调用。同样的初始化按实际使用去重，语言切换只刷新文案、不调用硬件。

## 多语言与检查

四语 `zh-cn/en/zh-tw/ko` 在同一个 index 的 messages 中维护，通过 `t(key)` 使用；产品型号、数字行号与端口值不需要翻译。显示文案可翻译，方括号参数占位符不可丢失或改名。切换语言不改用户文本、菜单值和 Python。

按[开发手册](../../../../docs/development.md)检查、按[原生接口](../../../../docs/native-api.md)编译打包；审阅所有主控合法端口、两套初始化、全部菜单值、实心/空心分支、带引号文本及旧 SB3 作品。当前版本 `0.1.6` 的库快照需与同时加载的其他原生模块一致，不能混用旧快照；具体设备仍须真机验收。
