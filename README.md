# 产品积木拓展库

本仓库集中发布产品积木拓展包。你可以在图形化编程软件中导入 `.sbext` 或 Mind+ Python `.mpext` 文件，为对应产品添加积木和 Python 代码生成支持。

## 参数输入控件

输入控件由产品包的 `config.json` 声明。编辑器按参数类型注册控件，新产品可直接复用已支持的类型。
功能积木仍由 `python/main.ts` 中的函数定义；例如 `set_motor_speed_all` 是功能积木，`slider150p` 是速度参数的输入方式。

在 `scratchEditor.blocks.<opcode>.arguments.<参数名>.type` 中选择类型：

```json
{
  "scratchEditor": {
    "blocks": {
      "set_motor_speed_all": {
        "arguments": {
          "SPEED1": {"type": "slider150p"},
          "SPEED2": {"type": "slider150p"}
        }
      },
      "set_led_color": {
        "arguments": {
          "COLOR": {"type": "square_color"}
        }
      }
    }
  }
}
```

`python/main.ts` 保留 Mind+ 标准 `shadow="number"` / `shadow="string"` 注解和默认值。
编辑器读取包内 `scratchEditor` 元数据后应用专用控件；需要覆盖初始值时，在同一参数对象中声明 `defaultValue`。
每次修改控件声明都应升级包版本、重新打包并同步 catalog 与编辑器离线快照。

| 类型示例 | 输入方式 |
| --- | --- |
| `number` | 普通数字输入 |
| `slider150` | 0～150 的整数滑块，支持手填 |
| `slider150p` | -150～150 的整数滑块，支持手填 |
| `slider180` | -180～180 的整数滑块，支持手填 |
| `square_color` | 方形颜色输入与离散色板 |
| `largetext` | 多行文本编辑，确认后保存 |
| `ledmatrix` | 16×8 点阵编辑 |
| `line4` / `line6` / `line8` | 对应路数的巡线位掩码选择 |

滑块预设类型为 `slider`、`slider100`、`slider90`、`slider127`、`slider150`、`slider150p`、
`slider180`、`slider180z`、`slider360`、`slider200`、`slider200p`、`slider255`、`slider270`、
`slider8`、`slider30`、`slider2500`、`slider1000`、`slider1000p`、`slider0180`、`slider10`。
这些名称对应预设范围；拖动受范围约束，导入与手填保留原数值。

## 产品卡片图标

编辑器拓展库的实际图片由所属产品包维护，统一保存在
`products/<package-id>/python/_images/product-cards/`。`catalog.json` 对应的 `packages[]` 条目通过
`productIcons` 声明卡片 ID 与包内相对路径：

```json
{
  "packageId": "aiquadrupedpro",
  "productIcons": {
    "aiquadrupedpro": "python/_images/product-cards/aiquadrupedpro.png"
  }
}
```

一个 MPEXT 可以对应多张模块卡片，因此卡片 ID 不要求等于 `packageId`。共享包内的 WonderLab 与
WonderCode 素材使用各自卡片 ID 命名，不能因产品同名而交叉复用。尚未完成代码迁移的产品可以使用
`status: "planned"` 条目发布卡片素材；该条目不参与积木包下载。

打包工具会递归收集产品目录，`product-cards/` 中的实际图片会随产品源码进入 MPEXT。图片更新只修改所属
产品目录及映射；`python/_images/icon.svg` 或 `icon.png` 仍只负责积木分类菜单图标。

## 可用产品

| 产品 | 当前版本 | 下载 |
| - | - | - |
| AiDoggy | 0.1.4 | [Releases](https://github.com/heyanjun963/scratch-product-extensions/releases) |
| AI机甲双驱车 | 1.0.4（本地草稿） | [Releases](https://github.com/heyanjun963/scratch-product-extensions/releases) |
| AI机甲麦轮车 | 0.2.9（本地草稿） | [Releases](https://github.com/heyanjun963/scratch-product-extensions/releases) |
| miniHexa | 0.1.3（本地草稿） | [Releases](https://github.com/heyanjun963/scratch-product-extensions/releases) |

本批次 8 个产品包统一使用 `python-blocks-v1.0.1` Release；上传验收完成后在远程 catalog 中标记为 `published`。

## 下载与安装

1. 打开本仓库的 [Releases](https://github.com/heyanjun963/scratch-product-extensions/releases) 页面。
2. 找到与你的产品匹配的版本。
3. 在 **Assets** 中下载扩展名为 `.sbext` 或 `.mpext` 的文件。
4. 在软件中打开“拓展库”，进入“用户拓展”。
5. 使用本地导入功能选择下载的 `.sbext` 或 `.mpext` 文件。

请勿下载 GitHub 自动生成的 **Source code** 压缩包。该文件只包含仓库源码，不能作为拓展包导入。

## 版本与发布批次

产品版本由各自的 `version` 字段维护，客户端使用它判断更新。一次 Release 可以包含多个产品包，所有包共享产品仓库配置中的 `releaseTag`。当前批次标签为：

```text
python-blocks-v1.0.1
```

例如，`aihexa-1.0.2.mpext` 和 `aimecanum-0.2.6.mpext` 都从上述 Release 下载。升级前请阅读 Release 的更新说明；需要使用旧版本时，可以在 Releases 页面下载历史发布包。

## 校验下载文件

每个发布版本都在 `catalog.json` 中提供 SHA256。下载完成后可以验证文件是否完整。

Windows PowerShell：

```powershell
(Get-FileHash ".\aimecanum-0.2.6.mpext" -Algorithm SHA256).Hash.ToLower()
```

macOS 或 Linux：

```sh
sha256sum ./aimecanum-0.2.6.mpext
```

计算结果应与 `catalog.json` 中对应版本的 `sha256` 完全一致。

## 问题反馈

使用中遇到问题时，请在 [Issues](https://github.com/heyanjun963/scratch-product-extensions/issues) 提交反馈，并提供：

- 产品名称和型号。
- 软件版本。
- 拓展包版本或 Release 标签。
- 问题复现步骤和错误截图。
