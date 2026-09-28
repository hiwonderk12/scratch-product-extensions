# AI机甲麦轮车拓展包

本目录提供 AI机甲麦轮车的图形化积木和 Python 代码生成源码。

## 安装

当前发布版本从 Releases 页面提供 `.mpext` 文件。在软件中打开“拓展库”，进入“用户拓展”后使用本地导入功能安装。

不要下载 GitHub 自动生成的 Source code 压缩包，它不是可安装的拓展包。

## 版本

拓展包使用语义化版本号。`0.2.8` 已对齐旧版 WonderLab 的 M1 简中文案、菜单、颜色和图标，并保留旧教案 RGB 灯编号字段。升级前请查看对应 Release 的更新说明和兼容信息。

## 源码说明

- `config.json`：Mind+ 产品元数据、分类及 Scratch 兼容字段。
- `python/main.ts`：Mind+ 积木声明和受限 Python Generator 规则。
- `python/_menus/index.json`：积木下拉菜单。
