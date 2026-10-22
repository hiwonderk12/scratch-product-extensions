# AI机甲四足机器人产品包

本目录是 `aiquadruped` Python 拓展的唯一作者源。

- `metadata.json`：产品版本、卡片与类入口。
- `src/index.ts`：38 个积木、分组、控件、菜单、集中 i18n 配置和内联 Python。


按[原生接口](../../../../docs/native-api.md)检查和打包，支持关系与端口维护在库配置中。

旧 generator 中未被当前工具箱引用的 7 个兼容积木不在本包范围内。发布前需人工对照积木文案、菜单顺序和 Python 输出，并重点验证四足运动参数与 IMU 校准。

`messages` 按语言集中维护文案，积木通过 `context.t(key)` 引用；`product.name` 与卡片名称同源。简体中文、英文、繁体中文、韩文均提供完整 key 配置，参数名和菜单实际值不翻译。普通修改主要在同一个 index 完成；仅有独立职责的复杂 Python 才另建资源文件。
