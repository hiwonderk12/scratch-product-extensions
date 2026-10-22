# 温湿度传感器维护说明

一个 `src/index.ts` 维护原生类、集中四语、菜单和内联 Python，包入口在 `metadata.json`，图标在 `assets/temphumi.svg`。namespace 保持 sensor，旧 opcode、参数和菜单实际值不得重命名。

## 初始化与读取

公开支持项通过[库配置](../../../../docs/configuration.md)选择 hiwonder-dev-port。`aimech_temphumi_init` 收集 import Hiwonder_DEV 和 `temphumi = Hiwonder_DEV.DEV_TH(Hiwonder_DEV.Port({PORT}))`；PORT 菜单 aimech_iicport 显示 A/B/C/D/E/J/K，实际 1/2/3/4/5/9/10，默认 1。

AiDoggy 使用 hiwonder-dev-port-aidoggy，驱动与上述相同，活动菜单改为 sensor.aidoggy_iicport 的 A/B/C/D（1/2/3/4），默认 1。保留旧 aimech_iicport 菜单定义以恢复既有 shadow，但活动 PORT 不使用它。不能从显示模块端口配置推断传感器端口。

用户显式初始化后，`aimech_get_temp_and_humi` 输出 `temphumi.read_Temp_Humi()`，`aimech_get_temp_or_humi` 输出 `temphumi.read_Temp_Humi()[{TEMPHUMI}]`。菜单温度=0、湿度=1；保留原返回值和大小写，不改变单位或增加自动测量/隐式初始化步骤。

四语通过集中 messages/t(key) 维护，菜单显示可翻译，TEMPHUMI 实际值必须保持 0/1。修改后按[开发手册](../../../../docs/development.md)与[原生 API](../../../../docs/native-api.md)验证所有公开主控、端口、两种读取、共存卸载、旧 SB3 和语言切换；源码兼容检查不替代固件/硬件验收。
