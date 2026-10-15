# AI机甲四足竞赛版产品包

本目录是 `aiquadrupedpro` Python 拓展的唯一作者源。

- `config.json`：维护产品版本、分类顺序、帽子积木入口和方向分支模板。
- `python/main.ts`：维护旧 VM 中 44 个启用积木及其最终生效的 Python 生成规则。
- `python/_menus/index.json`：维护启用积木引用的菜单显示文本和原始 value。

旧 generator 中被后续同名函数覆盖的实现、未进入当前工具箱的兼容函数和未使用菜单不在本包范围内。发布前需人工对照积木文案、菜单顺序和 Python 输出，并重点验证三自由度运动参数、足端初始化和 IMU 校准。
