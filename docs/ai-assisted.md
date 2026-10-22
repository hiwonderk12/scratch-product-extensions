# 可选的 AI 辅助制作

不使用 AI 也可以完成[第一个积木包](getting-started.md)。AI 主要帮助整理文案、参数和模板，不能代替 SDK 核对与软件验收。

## 给 AI 哪些资料

可复制下面的任务说明，补充自己的需求：

```text
我在本库的 wonderlab 分支制作一个独立积木模块。
目标主控：填写软件中的产品名称。
积木文字、参数类型、默认值和菜单：逐项列出。
期望 Python：提供准确示例；没有 SDK 时只做 print 文本演示。
资料：提供真实 SDK 文档、初始化方式、端口和已有运行示例。
请先阅读 docs/getting-started.md、docs/native-api.md 和 docs/configuration.md。
输出单 index.ts 类、集中四语文案和内联 Python，使用 CLI dry-run 后再修改。
明确需要哪些同配置配套包，不猜硬件接口，不自动发布或覆盖旧版本。
```

## 人工核对与交付

检查四语占位符、菜单真实值、生成 Python、按主控选择的 import/初始化/端口及版本变更。
最终源码在 `products/<分类>/<模块>/src/index.ts`，配套文件位置由 `pack-set` 输出。
按导入教程实际检查软件、保存和离线重开；硬件能力必须另做设备验证。
不要向 AI 提供密钥、个人信息或未经允许公开的课程资料。

使用支持仓库 Skill 的工具时，可选用[产品维护 Skill](../.agents/skills/product-extension/SKILL.md)，仍以公开教程和接口为准。
