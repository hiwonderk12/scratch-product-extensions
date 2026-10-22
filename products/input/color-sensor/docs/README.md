# 颜色识别模块维护说明

`src/index.ts` 是唯一主要作者入口，集中维护原生类、四语 messages、菜单和 Python。`metadata.json` 声明包身份，图标在 `assets/color.svg`。namespace 为 sensor，四个 opcode 与参数名按旧教案保留。

## 驱动与初始化

实际支持主控由[库配置](../../../../docs/configuration.md)决定。当前选择 hiwonder-dev-port，初始化使用 `Hiwonder_DEV.DEV_COLOR_RECOGNIZE(Hiwonder_DEV.Port({PORT}))`，对象名为 color。PORT 菜单 aimech_iicport 显示 A/B/C/D/E/J/K，实际值 1/2/3/4/5/9/10，默认 1；不要把显示字母传给 Python。

用户必须显式放置 `aimech_colorsensor_init`。读取与判断规则不自动插入默认端口初始化；重复使用相同初始化时按生成器规则去重。

| opcode | 生成约束 |
| - | - |
| aimech_colorsensor_init | 收集 import Hiwonder_DEV 和 color 对象，无正文命令 |
| aiblocks_check_color | color.get_color_name() == COLOR；aiblocks_colors 的红/绿/蓝值为 1/2/3 |
| aiblocks_get_color | color.get_color_data() |
| aiblocks_get_color_arg | NUM[COLOR]；aiblocks_colors2 的红/绿/蓝值为 0/1/2 |

颜色 ID 和 RGB 数组索引是两套不同值，不能统一为一个菜单。判断块保持 Boolean、读取保持 reporter。四语只翻译 text，绝不改变 value、opcode、参数名。修改后按[开发手册](../../../../docs/development.md)和[原生 API](../../../../docs/native-api.md)检查所有端口、两套颜色菜单、表达式嵌套、旧 SB3 和语言切换；实际固件需另行验收。
