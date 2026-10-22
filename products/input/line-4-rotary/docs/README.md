# 旋钮四路巡线传感器维护说明

主要维护 `src/index.ts`：原生类、集中中英繁韩 messages、菜单和内联 getPython。包身份和原图标分别在 `metadata.json`、`assets/linefollow.svg`，namespace 为 sensor。

## 独立设备与显式初始化

当前支持配置选择 hiwonder-dev-port，`linefollower4_init` 收集 import Hiwonder_DEV 和 `linefollow4 = Hiwonder_DEV.DEV_LINE_FOLLOW_4_O(Hiwonder_DEV.Port({PORT}))`。端口菜单 aimech_iicport 为 A/B/C/D/E/J/K，实际 1/2/3/4/5/9/10，默认 1。

必须保留 DEV_LINE_FOLLOW_4_O 与 linefollow4，不得换成普通四路的 DEV_LINE_FOLLOW_4/linefollow。用户显式初始化后，其他积木复用对象，不自动补默认端口。

| opcode | 规则 |
| - | - |
| linefollower4_init | 显式初始化旋钮版独立对象 |
| linefollower4_one_status | linefollows4Mask 值 1/2/4/8；linedot2 的 ◌=0 选择 == 0，●=1 选择 > 0 |
| linefollower4_status_result | VALUE 为 line4/LINE4，默认 00，生成 linefollow4.get_result_data() == 0x{VALUE} |
| linefollower4_read_offset | linefollow4.read_offset() |

四个 opcode 全部保留，不增加来源中未启用的状态积木。LINE4 shadow 保存两位十六进制 00～0f，不能按文本加引号。状态选择器的两个表达式不可合并成 > LINE。

支持范围见[库配置](../../../../docs/configuration.md)。四语只改变显示，参数/菜单实际值不变。修改后按[开发手册](../../../../docs/development.md)与[原生 API](../../../../docs/native-api.md)验证普通四路/旋钮版共存及独立卸载、通道×状态、全部 16 个掩码、端口、旧 SB3 与语言切换；硬件另行验收。
