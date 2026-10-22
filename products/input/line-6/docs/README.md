# 六路巡线传感器维护说明

`src/index.ts` 集中维护原生类、四语 messages、菜单和 Python。元数据在 `metadata.json`，图标在 `assets/linefollow.svg`，namespace 保持 sensor。

## 驱动与端口

当前支持项选择 hiwonder-dev-port。`aimech_linefollower6_init` 显式收集 import Hiwonder_DEV 与 `linefollow6 = Hiwonder_DEV.DEV_LINE_FOLLOW_6(Hiwonder_DEV.Port({PORT}))`。PORT 菜单 aimech_iicport：A/B/C/D/E/J/K 对应 1/2/3/4/5/9/10，默认 1。读取与设置规则不隐式初始化，其他路数模块不能覆盖 linefollow6。

| opcode | 规则 |
| - | - |
| aimech_linefollower6_init | 显式初始化 linefollow6 |
| linefollower6_one_status | NUM 使用 linefollows6Mask，值 1/2/4/8/16/32；◌=0 生成 (result & NUM) == 0，●=1 生成 > 0 |
| linefollower6_status | LINE 为 line6/LINE6，默认 00，生成 result == 0x{LINE} |
| linefollower6_set_threshold | VALUE 仍为 number、默认 7；调用 set_ThresholdRatioReg(VALUE)，文案范围 1～9 |
| linefollower6_get_value | NUM 使用 linefollows6，连续编号 1～6，调用 read_AnalogQuantity(NUM) |
| linefollower6_read_offset | linefollow6.read_offset() |

result 指 linefollow6.get_result_data()。位掩码菜单与灰度读取的通道编号不是同一语义，不能复用错表。阈值保持旧 number 控件，不在结构迁移中改为滑块或额外截断。方法大小写按固件接口保留。

LINE6 shadow 保存两位十六进制 00～3f；通过独立 shadow 生成 `0x21`、`0x3f`，不按普通文本加引号。模板选择器保留亮灭两个分支，不能只读取旧作者源的单条基础表达式。

支持范围见[库配置](../../../../docs/configuration.md)。依[开发手册](../../../../docs/development.md)与[原生 API](../../../../docs/native-api.md)检查全部端口、通道×状态、64 个整组掩码、六个灰度通道、阈值 1/7/9、旧作品/四语与其他传感器共存；实际硬件另行验收。
