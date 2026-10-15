# AI机甲四足机器人产品包

本目录是 `aiquadruped` Python 拓展的唯一作者源。

- `config.json`：维护产品版本、分类顺序、帽子积木入口和菜单分支模板。
- `python/main.ts`：维护旧 VM 中 38 个启用积木及其 Python 生成规则。
- `python/_menus/index.json`：维护启用积木引用的菜单显示文本和原始 value。

旧 generator 中未被当前工具箱引用的 7 个兼容积木不在本包范围内。发布前需人工对照积木文案、菜单顺序和 Python 输出，并重点验证四足运动参数与 IMU 校准。
