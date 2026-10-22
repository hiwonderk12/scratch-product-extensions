# 普通超声波传感器维护说明

主要作者入口 `src/index.ts` 集中维护原生类、四语 messages、端口菜单和 Python。包身份在 `metadata.json`，图标在 `assets/ultra.svg`。不要与 LED 超声波模块合包；两者有不同驱动与初始化合同。

## 支持边界与旧接口

当前没有任何真实公开主控支持项。hiwonder-port 类实现及 sensor.ultra_port 端口表仅保留旧行为，不代表模块已经对某主控开放。隔离验证配置不能写回公开主控表，详见[配置手册](../../../../docs/configuration.md)。

唯一旧 opcode 为 `get_ultrasonic_distance`，完整旧类型为 `sensor_get_ultrasonic_distance`，参数名 ULTRA_PORT，端口菜单 ultra_port 值 2/6/8，默认 2。它是 reporter：使用时收集 import Hiwonder，按端口创建 `sonar_{ULTRA_PORT} = Hiwonder.Sonar(Hiwonder.Port({ULTRA_PORT}))`，输出 `sonar_{ULTRA_PORT}.read()`。

不同端口使用不同对象，同端口初始化去重。不要改成固定 sonar，否则会覆盖 LED 模块显式初始化的 sonar；也不要改用 Hiwonder_DEV.DEV_SONAR 或把本 reporter 改为必须另行初始化的接口。距离文案保留 cm，不未经固件核对更改单位。

四语文案在同文件维护，端口值与旧标识不翻译。按[开发手册](../../../../docs/development.md)与[原生 API](../../../../docs/native-api.md)验证三端口、对象隔离、同端口去重、旧 SB3 与语言切换。未开放模块只做隔离兼容验证，不能宣称真机可用。
