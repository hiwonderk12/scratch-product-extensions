# AiDoggy 产品包

`metadata.json` 声明产品版本、卡片图片与类入口；`src/index.ts` 维护积木、控件、菜单、集中 i18n 配置和内联 Python。

按[原生接口](../../../../docs/native-api.md)执行 `check robots/aidoggy` 和 `pack robots/aidoggy`。模块支持与端口由 `library/boards/aidoggy.json` 维护，机器人本身无需加入自己的模块列表。

保持动作组参数 `ACTION`、`BLOCK` 及菜单 value 原样，`BLOCK` 通过 `literal: true` 输出 Python 布尔字面值。方向菜单通过 `templateSelector` 选择内联转向代码。缺少目标语言的文案回退中文。

`messages` 按语言集中维护文案，积木通过 `context.t(key)` 引用；`product.name` 与卡片名称同源。简体中文、英文、繁体中文、韩文均提供完整 key 配置，参数名和菜单实际值不翻译。普通修改主要在同一个 index 完成；仅有独立职责的复杂 Python 才另建资源文件。
