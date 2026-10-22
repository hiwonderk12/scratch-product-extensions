# AI机甲双驱车产品包

本目录是 `aimech` Python 拓展的唯一作者源。

- `metadata.json`：版本、卡片图片与类入口。
- `src/index.ts`：40 个积木、分组、控件、就近菜单与 集中 i18n 配置和内联 Python。


通过[原生包命令](../../../../docs/native-api.md)检查和打包，主控支持的模块与端口在 `library/boards/aimech.json` 配置。

旧 VM 中已注释的 8 个串口积木不在本包范围内。发布前需人工对照积木文案、菜单顺序和 Python 输出，并重点验证 IMU 校准会覆盖普通 IMU 初始化。

`messages` 按语言集中维护文案，积木通过 `context.t(key)` 引用；`product.name` 与卡片名称同源。简体中文、英文、繁体中文、韩文均提供完整 key 配置，参数名和菜单实际值不翻译。普通修改主要在同一个 index 完成；仅有独立职责的复杂 Python 才另建资源文件。
