# AI机甲双驱车产品包

本目录是 `aimech` Python 拓展的唯一作者源。

- `config.json`：维护产品版本、分类顺序、帽子积木入口和菜单分支模板。
- `python/main.ts`：维护旧 VM 中 40 个启用积木及其 Python 生成规则。
- `python/_menus/index.json`：维护启用积木引用的菜单显示文本和原始 value。

旧 VM 中已注释的 8 个串口积木不在本包范围内。发布前需人工对照积木文案、菜单顺序和 Python 输出，并重点验证 IMU 校准会覆盖普通 IMU 初始化。
