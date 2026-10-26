# 可选的 AI 辅助制作

不使用 AI 或生成命令也可以完成[手写第一个积木包](getting-started.md)。主要维护入口是单个 TypeScript 类；AI 主要帮助整理文案、参数和模板，不能代替 SDK 核对与软件验收。
给 AI 同时提供[类与上下文 API](native-api.md)、[积木字段](blocks-and-menus.md)和[Python 规则](python-generation.md)。生成命令只是可选方式，不另建长期规格源。

## 给 AI 哪些资料

可复制下面的任务说明，补充自己的需求：

```text
我在本库的 wonderlab 分支制作一个独立积木模块。
目标主控：填写软件中的产品名称。
积木文字、参数类型、默认值和菜单：逐项列出。
期望 Python：提供准确示例；没有 SDK 时只做 print 文本演示。
资料：提供真实 SDK 文档、初始化方式、端口和已有运行示例。
请先阅读 docs/getting-started.md、docs/native-api.md 和 docs/configuration.md。
优先手写单 index.ts 类、集中四语文案和内联 Python；只有选择 CLI 创建／生成辅助时才先 dry-run，不把生成命令当手写前提。
明确需要哪些同配置配套包，不猜硬件接口，不自动发布或覆盖旧版本。
```

## 人工核对与交付

检查四语占位符、菜单真实值、生成 Python、按主控选择的 import/初始化/端口及版本变更。
最终源码在 `products/<分类>/<模块>/src/index.ts`，配套文件位置由 `pack-set` 输出。
按导入教程实际检查软件、保存和离线重开；硬件能力必须另做设备验证。
不要向 AI 提供密钥、个人信息或未经允许公开的课程资料。

## 使用产品维护 Skill

在支持仓库 Skill 的工具中，打开这份完整仓库，再选择或明确请求使用 [product-extension](../.agents/skills/product-extension/SKILL.md)。它通过仓库相对路径引用手册与示例；不要只复制一个 SKILL.md 就假定相关资料也已安装。仓库不会自动修改全局 AI 配置，选择方式取决于你的工具。

可从下面的请求开始：

- “使用 product-extension，按最小文本例手写一个积木，只做检查与配套打包，不调用创建或生成命令。”
- “使用 product-extension，为已有模块增加带数字参数的积木，保持旧 opcode，补四语和 Python 测试。”
- “使用 product-extension，核对这个传感器在两种主控下的 import、初始化和端口，先列差异，不擅自扩支持。”

Skill 会按任务定位最小教程、完整注释参考、API、主控配置或版本手册。检查、打包、真实软件导入和硬件验收分别报告；使用 Skill 不等于授权安装依赖、启动桌面、提交、推送或发布。仍以公开教程和接口合同为准，AI 不是完成手写教程的前提。
