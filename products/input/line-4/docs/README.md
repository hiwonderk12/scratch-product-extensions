# 四路巡线传感器维护说明

`src/index.ts` 集中维护 class/getInfo、四语 messages、菜单和 Python；元数据在 `metadata.json`，图标在 `assets/linefollow.svg`。namespace 为 sensor，五个旧 opcode 与参数名保持不变。

## 初始化与驱动

现有主控支持项通过[库配置](../../../../docs/configuration.md)选择 hiwonder-dev-port。`aimech_linefollower_init` 显式收集 import Hiwonder_DEV 与 `linefollow = Hiwonder_DEV.DEV_LINE_FOLLOW_4(Hiwonder_DEV.Port({PORT}))`。PORT 菜单 aimech_iicport 显示 A/B/C/D/E/J/K，实际值 1/2/3/4/5/9/10，默认 1。其他读取/判断不隐式初始化。

| opcode | 生成规则 |
| - | - |
| aimech_linefollower_init | 显式初始化 linefollow |
| linefollower_one_status | NUM 是 1/2/4/8 位掩码；LINE=0 为 (result & NUM) == 0，LINE=1 为 (result & NUM) > 0 |
| linefollower_status | LINE 使用 line4，默认 00，生成 result == 0x{LINE} |
| linefollower_status_result | VALUE 使用 line4，默认 00，生成 result == 0x{VALUE} |
| linefollower_read_offset | linefollow.read_offset() |

result 指 `linefollow.get_result_data()`。菜单 linedot2 保持 ◌=0、●=1；模板选择器来自旧配置，不能只复制 main.ts 中的基础 > LINE 表达式。两个整组判断 opcode 都保留，不能因功能相近合并。

## 控件与兼容

line4 是独立 shadow，字段名 LINE4，保存两位十六进制 00～0f。含 a～f 的值通过 shadow 进入生成器，形成 `0x0a`，不能把它当普通文本拼成 `0x"0a"`。通道显示 1～4，但实际值是位掩码，不是连续编号。

普通四路对象 linefollow 与旋钮版 linefollow4/DEV_LINE_FOLLOW_4_O 不同，不能合并初始化。文案集中维护 zh-cn/en/zh-tw/ko，符号、数字端口、协议值不翻译。依[开发手册](../../../../docs/development.md)和[原生 API](../../../../docs/native-api.md)检查全部端口、通道×状态、16 种整组掩码、旧作品和语言切换；真实设备需独立验收。
