# 八路灰度巡线传感器维护说明

`src/index.ts` 在同文件维护 class/getInfo、集中四语、菜单与内联 Python。包身份在 `metadata.json`，namespace 为 sensor。旧实现没有卡片/积木图标，本包不为迁移凭空添加图片或空 assets 目录。

## 支持边界

目前没有真实公开主控支持项；源码实现采用 hiwonder-dev-port，仅用隔离配置保留旧接口。来源中的分类标识 wondercode-line-8 是历史兼容数据，不意味着本模块应从 WonderLab 删除或对 WonderCode 开放。实际支持关系仍由[库配置](../../../../docs/configuration.md)决定。

## 初始化与生成

`linefollower8_init` 显式收集 import Hiwonder_DEV 与 `linefollow8 = Hiwonder_DEV.DEV_LINE_FOLLOW_8(Hiwonder_DEV.Port({PORT}))`。端口菜单 aimech_iicport 为 A/B/C/D/E/J/K，实际值 1/2/3/4/5/9/10、默认 1。其他判断/读取不隐式初始化。

| opcode | 规则 |
| - | - |
| linefollower8_init | 显式初始化独立 linefollow8 |
| linefollower8_one_status | linefollows8Mask 值 1/2/4/8/16/32/64/128，◌=0 选择 (result & NUM) == 0，●=1 选择 > 0 |
| linefollower8_status | LINE 为 line8/LINE8，默认 00，生成 result == 0x{LINE} |
| linefollower8_get_value | linefollows8 的 NUM 是连续编号 1～8，调用 linefollow8.read_AnalogQuantity(NUM) |

result 指 linefollow8.get_result_data()。通道位掩码和灰度读取编号分开；不要给本模块擅自补六路阈值或偏差积木。LINE8 shadow 保存完整一字节两位十六进制 00～ff，不截成六位；`a5` 应生成 `0xa5`，不能输出 `0x"a5"`。

四语只翻译显示，旧 opcode、参数和菜单值不变。按[开发手册](../../../../docs/development.md)与[原生 API](../../../../docs/native-api.md)在隔离快照验证所有端口、通道×状态、256 个整组掩码、八个灰度通道、真实旧 SB3 与语言切换。不得为了测试开放公开支持，源码兼容不代表真机可用。
