# 迷你六足机器人产品包

`metadata.json` 声明产品版本、卡片图片与类入口；`src/index.ts` 维护积木、控件、菜单、集中 i18n 配置和内联 Python。

按[原生接口](../../../../docs/native-api.md)执行 `check robots/minihexa` 和 `pack robots/minihexa`。模块支持与端口由 `library/boards/minihexa.json` 维护。

保持 `MOVE`、`ORIENTION` 等参数名和原始菜单值，方向分支由 `templateSelector` 选择。主程序用 `Hiwonder.startMain({MAIN})` 收尾，按键事件先定义函数再注册回调。

`messages` 按语言集中维护文案，积木通过 `context.t(key)` 引用；`product.name` 与卡片名称同源。简体中文、英文、繁体中文、韩文均提供完整 key 配置，参数名和菜单实际值不翻译。普通修改主要在同一个 index 完成；仅有独立职责的复杂 Python 才另建资源文件。
