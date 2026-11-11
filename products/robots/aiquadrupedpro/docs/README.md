# AI机甲四足竞赛版产品包

四语译文在相邻的 `src/locales/{zh-cn,en,zh-tw,ko}.json` 管理，入口 `messages` 仅绑定语言表；格式与校验见[原生 API](../../../../docs/native-api.md#集中-i18n-配置)。

本目录是 `aiquadrupedpro` Python 拓展的唯一作者源。

- `metadata.json`：产品版本、卡片与类入口。
- `src/index.ts`：44 个积木、分组、控件、菜单、集中 i18n 配置和内联 Python。


按[原生接口](../../../../docs/native-api.md)检查和打包，支持关系与端口维护在库配置中。

旧 generator 中被后续同名函数覆盖的实现、未进入当前工具箱的兼容函数和未使用菜单不在本包范围内。发布前需人工对照积木文案、菜单顺序和 Python 输出，并重点验证三自由度运动参数、足端初始化和 IMU 校准。

`src/locales/<语言>.json` 按语言维护文案，入口 `messages` 仅绑定语言表，积木通过 `context.t(key)` 引用；`product.name` 与卡片名称同源。简体中文、英文、繁体中文、韩文均提供完整 key 配置，参数名和菜单实际值不翻译。业务规则修改在 index 完成，译文修改对应语言JSON；仅有独立职责的复杂 Python 才另建资源文件。
