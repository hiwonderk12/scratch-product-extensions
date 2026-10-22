# MP3 模块维护说明

主要维护 `src/index.ts`：原生类、集中 zh-cn/en/zh-tw/ko 文案、菜单与内联 Python。发行入口在 `metadata.json`，原 SVG 在 `assets/mp3.svg`。

## 支持边界

namespace 为 display，适配为 hiwonder-port，未知适配拒绝。目前公开主控配置没有实际支持项；保留源码与生成规则不代表已对主控开放。参见[支持配置](../../../../docs/configuration.md)，隔离测试配置不得写回真实支持表。

## 积木与菜单

| opcode | 约束 |
| - | - |
| mp3_init | IICPORT 为 mp3_port 菜单，3/4/5/6/9，默认 3 |
| mp3_play_song_num | VALUE 默认 1，调用 mp3.play(VALUE) |
| mp3_play_control | VALUE 0/1/2/3 分别 play/pause/prev/next |
| mp3_play_mode | VALUE 0/1 分别 loop_on/loop_off |
| mp3_set_volume | VALUE 使用 slider30，默认 30 |

初始化保留旧文本：

```python
from Hiwonder import MP3
mp3 = Hiwonder.MP3(Hiwonder.Port({IICPORT}))
```

`{IICPORT}` 是模板占位符，示例不是可直接运行的 Python。旧导入文本与构造器引用按兼容基准保留，仍需实际固件环境核对其全局依赖；不能在结构迁移时未经验证改写 SDK。用户必须显式放置初始化积木，播放/音量规则不自动补默认端口或重复创建对象。

四语只翻译 text，不改变命令值、参数名和 Python。修改后依[开发手册](../../../../docs/development.md)与[原生 API](../../../../docs/native-api.md)检查全部控制/循环菜单、各端口、slider30、共存卸载及旧作品语言切换。真机与固件运行验收独立于源码兼容测试。
