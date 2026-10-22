# RGB 灯带维护说明

入口 `src/index.ts` 集中维护 class/getInfo、四语 messages、菜单和 getPython。元数据在 `metadata.json`，图标为 `assets/strip.svg`。不要与另一个 `output/rgb` 模块合包或互换 opcode。

## 支持边界

实现适配为 hiwonder-port，namespace 是 display。目前公开主控配置未开放本模块；保留源码及旧生成规则不等于支持某个主控，更不等于真机可用。端口组定义本身不会开放支持关系，参见[配置手册](../../../../docs/configuration.md)。

## 旧接口与生成

- `rgb_color_set`：RED/GREEN/BLUE 使用 slider255，保留单灯 setItem 与全部 fill 分支，随后 write。
- `led_color_select`：COLOR 使用 square_color，Python 占位符是 `{COLOR.rgb}`，不能直接输出颜色字符串。单灯 setItem 或全部 fill 后 write。
- `led_close`：单灯设置 0x00,0x00,0x00 后 write；全部关闭仅 clear，不擅自新增 write。
- PORT 使用 rgbport，值 3/8，默认 3。NUMS 显示“全部”的值为 15；显示第 1～15 颗的实际值为 0～14。不得翻译或改写实际值。

初始化对象保留 `myrgb_{PORT} = Hiwonder.Neopixel(Hiwonder.Port({PORT}),15)`，按实际端口去重。旧模板未声明 import Hiwonder，此处保留其依赖语义；不能把源码兼容测试当作独立 Python 程序已可真机执行。若需调整 SDK 导入，应独立核对固件和完整教案，不混在结构迁移中。

四语在同文件 messages 维护。修改后按[开发手册](../../../../docs/development.md)与[原生 API](../../../../docs/native-api.md)验证单灯/全部、两个端口、颜色分量、关闭分支及旧作品/语言切换；未开放模块只能用隔离配置验收，不为测试修改公开支持项。
