# AiNova 入门版开发说明

包 ID 为 `ainovab`，面向 WonderCode。版本以当前 `config.json` 和 catalog 为准。

## 源码入口

| 文件 | 用途 |
| - | - |
| `../config.json` | 产品信息、分类、输入控件、主程序与事件配置 |
| `../python/main.ts` | 积木声明与 Python 生成规则 |
| `../python/_menus/index.json` | 端口、按键、方向等菜单的显示文字和实际值 |
| `../python/_locales/` | 当前已提供的积木及菜单翻译 |
| `../python/_images/` | 图标和产品卡片素材 |
| `codegen-cases.json` | 静态模板及参数分支回归 |

开发流程见[产品包维护手册](../../../docs/development.md)。

## 入口与事件

主程序生成普通函数，所有定义完成后调用启动器：

```python
import Hiwonder
import time

def start_main():
    print("Hello")

Hiwonder.startMain(start_main)
```

启动帽子的积木生成顶层初始化语句。按键使用 `.Clicked(callback)` / `.Longpressed(callback)`；红外使用 `.Clicked(key, callback)` / `.Longpressed(key, callback)` / `.Released_lp(callback)`。
注册必须位于回调定义之后，重复事件需要独立的回调函数名。验证完整生成程序，不能只检验单积木模板。

## 参数与兼容约束

- 编码电机保留全部 / M1 / M2 枚举，连接的 `INDEX` 仍为 number；静态菜单分支精确匹配已有规则，连接表达式不在 JavaScript 中求值。
- 普通电机左轮映射 M2、右轮映射 M1；修改单轮控制不能改变另一轮。
- 已有滑块、色板与普通数字输入保持原字段名和控件语义；文案更新不改变旧工程字段。
- LED 固定菜单使用零基索引，全选值为 6；连接的编号遵循既有减 1 规则。
- PID 对象按 `NUM` 创建并去重；BLE 使用前先设置模式，连接的参数索引按 Python `int(NUM) + 1` 生成。
- `read_ble_data` 不新增文字中没有的 `MODE` 输入；已保存的 opcode、参数名与菜单 value 不随文件整理重命名。
- 设备提供 Hiwonder、PID、Hiwonder_BLE 等 SDK；产品包的导入与对象初始化需显式声明，不能依赖其他积木偶然先运行。

维护完成后检查生成分支、旧课程打开/保存及匹配固件上的上传运行。新增或修改说明参照[公开文档约定](../../../docs/README.md)。
