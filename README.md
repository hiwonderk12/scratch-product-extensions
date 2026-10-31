# WonderLab 积木拓展库

为 WonderLab 添加自定义积木，用于课程活动和硬件控制。
你可以使用现成积木包，也可以从“显示文本”示例开始，制作自己的积木包。
当前支持生成 **Python** 代码。

## 适用软件

需要支持独立原生类积木包的 WonderLab 桌面软件；当前为开发预览，最低正式发行版本尚未确认。
普通 Scratch 或未提供这些能力的旧版软件不能直接使用。
具体要求与入口见[导入与使用](docs/importing.md)。

## 使用现成积木包

从可信作者获取适配的单包 ZIP，在“用户拓展 → 导入本地库”直接导入；普通用户包无需导入配套主控或管理多版本。
官方包的正式入口为本分支根 `catalog.json`：根目录登记产品，各产品目录中的 `catalog.json` 保存发行历史。初始集合为 `wonderlab-library-v0.0.1`，现有产品与库配置均为 `0.0.1`。
目录中的资源须在对应 GitHub Release 上传后才能下载；GitHub 的源码 **Download ZIP 不是积木安装包**。
使用范围、配套软件和上传步骤见[初始正式库基线](docs/releases/wonderlab-library-v0.0.1.md)。

## 制作第一个积木包

按[手写 TypeScript 入门教程](docs/getting-started.md)，直接维护一个作者目录和 `src/index.ts`，检查并打包为一个 ZIP。
原生类是主要开发方式；CLI 创建／生成和 AI 都是可选辅助，不要求先学习生成器或维护规格文件。
不需要硬件、不需要修改软件源码，也不需要先了解内部标识。
查全部 SDK 字段和控件写法，使用[完整 API 示例包](docs/examples/api-showcase/README.md)，含逐字段中文注释、四语与三种主控适配，可直接检查、单包打包；较小的 `docs/examples/handwritten-text` 参考仍保留。[独立包格式](docs/standalone-package.md)说明可选资源与包内主控适配。

## 文档与帮助

- [导入与使用](docs/importing.md)：软件要求、安装、离线重开与常见问题。
- [手写第一个积木包](docs/getting-started.md)：完整源码、目录检查、单包打包与直接导入。
- [类与上下文 API](docs/native-api.md)、[积木与菜单](docs/blocks-and-menus.md)、[Python 生成](docs/python-generation.md)：方法、字段、示例和支持边界。
- [文档导航](docs/README.md)：已有积木维护、接口、端口与命令参考。
- [可选 AI 辅助](docs/ai-assisted.md)：描述需求、准备资料与人工核对。

遇到问题时，请提供软件版本、包版本、操作步骤和完整错误信息；不要上传含个人信息的课程文件。
