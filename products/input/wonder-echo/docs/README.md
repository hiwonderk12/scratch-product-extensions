# WonderEcho 语音模块

单 src/index.ts 维护 class / getInfo、集中中英繁韩 messages、全部菜单及内联 getPython。assets/asr.svg 为实际积木图标；不创建空 Python 目录。见[原生 API](../../../../docs/native-api.md)及[库配置](../../../../docs/configuration.md)。

## 主控、端口与显式初始化

sensor 前缀保持。五种 AI 主控使用 hiwonder-dev-port，端口菜单来自 sensor.aimech_iicport 的 A/B/C/D/E/J/K，value 为 1/2/3/4/5/9/10；默认 PORT=1，由主控支持条目配置。MiniHexa 使用 hiwonder-dev-onboard，不开放 aidoggy。

MiniHexa 的 minihexa_wonderecho_init 生成 `asr2 = Hiwonder_DEV.DEV_ASR()`，不传 Port 参数。旧软件声明中未进入生成函数的 IICPORT 不应被当作必需的初始化接口。旧通用 aimech_wonderecho_init 作为隐藏兼容块保留 PORT 和菜单 shadow，生成仍按板载无参规则，不重命名已保存值。

相同 SDK 的主控复用本适配；若新主控需要不同 SDK/总线/构造参数，应在本文件增加明确 variant 分支并补支持配置与测试，不能仅替换端口或在软件本体写产品判断。未知适配明确拒绝。

| opcode | 默认值 / 类型 | Python 语义 |
| - | - | - |
| aimech_wonderecho_init | PORT=1 | 按需 import Hiwonder_DEV；创建 asr2 = Hiwonder_DEV.DEV_ASR(Hiwonder_DEV.Port(PORT)) |
| wonderecho_get_results | command | wonderecho_result = asr2.getResult() |
| wonderecho_results | WORD=1，Boolean | (wonderecho_result == WORD) |
| wonderecho_get_result_num | reporter | wonderecho_result |
| wonderecho_speech_cmd | WORD=1 | asr2.speak(asr2.ASR_CMDMAND, WORD) |
| wonderecho_speech_cmd_number | NUM=1 | asr2.speak(asr2.ASR_CMDMAND, NUM) |
| wonderecho_speech_play | WORD=1 | asr2.speak(asr2.ASR_ANNOUNCER, WORD) |
| wonderecho_speech_play_number | NUM=1 | asr2.speak(asr2.ASR_ANNOUNCER, NUM) |

只有初始化积木创建 asr2，其他块不隐式初始化。识别判断与读取只引用已经更新的 wonderecho_result，不自行调用 getResult()；课程须先连接初始化与更新结果积木。重复相同初始化/导入应去重。

ASR_CMDMAND 是设备 SDK 的既定常量名，不能按英语拼写改成 ASR_COMMAND。命令词和播报词必须使用各自常量，不互换。

## 菜单与多语言

mechdog_word 保留 69 个识别词、mechdog_speech_cmd_word 保留 23 个命令播报词、mechdog_speech_play_word 保留 18 个播报词，连同 7 个端口共 117 个菜单项。旧菜单名称、顺序、重复文字、编号与十六进制大小写均保持；同样显示“收到”的不同编号不能合并，“原地踏步”的两个编号也不能删掉一个。

语音文字按稳定 menu.* key 在同文件 messages 维护。相同文案可以复用译文，但每个菜单项仍保留各自 value；显示语言切换不会改变协议编号、固件词库或设备实际发声语言。0x1A、0x7C 等值作为 Python 数字表达式生成，不翻译、不加引号，也不强制改成十进制。

## 维护验证

覆盖每个菜单值、全部端口与默认绑定、未初始化/未刷新时的生成行为、对象/导入去重、ASR_CMDMAND / ASR_ANNOUNCER 与八个原有完整类型及新增兼容的 minihexa_wonderecho_init。验证实际旧作品恢复、非默认 shadow、四语菜单加载/切换和 Python 不变；与普通 sensor 前缀模块共同恢复、卸载语音后保留其他传感器。

```sh
node tools/cli/index.mjs check input/wonder-echo
node tools/cli/index.mjs pack input/wonder-echo
```

固件、硬件及专业译文审校需另行完成。
