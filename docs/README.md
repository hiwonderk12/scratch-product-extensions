# 积木拓展库文档

按你要完成的任务选择入口，无需先阅读全部接口与内部规则。

## 第一次使用或制作

- **安装现成包**：[导入与使用](importing.md)，包括软件要求、配套 ZIP、选主控和离线重开。
- **手写第一个包**：[TypeScript 入门教程](getting-started.md)，从[最小单积木源码](examples/minimal-text/src/index.ts)开始，目录直接检查和单包打包，不需要生成命令或配套主控。
- **用户包格式与更新**：[独立包格式](standalone-package.md)，本包主控适配、资源、覆盖与离线恢复；官方库版本规则不作为新手前置知识。
- **直接查完整写法**：[详细中文注释的 index.ts](examples/handwritten-text/src/index.ts)与[示例覆盖索引](examples/handwritten-text/README.md)，包含类、字段、控件和全部 Python 生成规则。
- **想借助 AI**：[可选辅助指南](ai-assisted.md)。不是教程的前提，也不能代替人工检查。

## 修改已有积木与深入开发

独立主板维护：[AIBlocksBoard](../products/controllers/aiblocksboard/docs/README.md)，说明控制器分类、板载积木、IIC SDK 入口、数字按键与蓝牙；外接模块按实际支持单独开放，不与机器人套件混用。

1. [仓库说明](../README.md)：用途、适用软件和使用入口。
2. [类与上下文 API](native-api.md)：constructor、getInfo、getPython、dispose、语言／端口／资源、元数据与安全边界。
3. [积木、菜单与控件](blocks-and-menus.md)：blockType 全部可用值、参数、菜单、分组、图标和隐藏兼容。
4. [Python 生成规则](python-generation.md)：全部模板字段、输出示例、去重、分支、入口和事件。
5. [主控支持关系与端口](configuration.md)、[版本与项目](versions-and-projects.md)：手写支持配置、驱动、快照与不可变版本。
6. [模块维护手册](development.md)：已有产品修改与兼容审阅；产品中的 docs 说明真实 SDK，例如 [AI机甲双驱车](../products/robots/aimech/docs/README.md)。
7. [检查、打包与可选生成 CLI](cli.md)、[维护 Skill](../.agents/skills/product-extension/SKILL.md)：共享交付工具，创建／生成仅为辅助。

## 版本与课程

[包版本与项目恢复](versions-and-projects.md)：不可变版本、库快照配套、安装与升级分离、旧项目兼容基线、版本锁和离线备份。

[官方 Release、版本索引与原生下载](native-catalog.md)：各版本 ZIP 放入对应 Release，一个 JSON 记录历史与下载地址；从既有 ZIP 生成索引，明确启用测试渠道，不自动升级作品或切正式源。

[初始 0.0.1 正式库基线](releases/wonderlab-library-v0.0.1.md)：分层目录、Release 单包资产、上传顺序及升级边界。

## 产品维护示例

主控差异示例：[红外避障](../products/input/infrared-sensor/docs/README.md)、[WonderEcho](../products/input/wonder-echo/docs/README.md)、[LED 超声波](../products/input/led-ultrasonic/docs/README.md)。分别检查原始 IO、Port 包装与板载无参构造；菜单、默认值、import、对象名和读取方法须与所选 variant 一致，不能只更换端口文字。

动力与风扇：[总线舵机](../products/power/bus-servo/docs/README.md)、[IIC 转 PWM](../products/power/iic-pwm/docs/README.md)、[风扇](../products/output/fan/docs/README.md)。重点保留专用滑块、显式初始化、AiDoggy 独立端口与按适配选择旧前缀；普通端口风扇未开放真实支持。

主板直控动力模块：[主控适配边界](../products/power/README.md)。长电机、180°和 360°直接舵机的旧版支持仅为 AIBlocksBoard，不属于当前七主控的可用模块，三项已提供 class 和四语，使用 `hiwonder-direct`，不能以 IIC 转 PWM 或总线舵机实现替代。

巡线系列：[四路](../products/input/line-4/docs/README.md)、[旋钮四路](../products/input/line-4-rotary/docs/README.md)、[六路](../products/input/line-6/docs/README.md)、[八路](../products/input/line-8/docs/README.md)。重点是独立 SDK 对象、位掩码与连续通道编号的区别、亮灭模板选择及 LINE shadow；八路仅保留实现，不代表公开支持已开放。

输入模块维护示例：[颜色识别](../products/input/color-sensor/docs/README.md)、[外接 IMU](../products/input/imu-sensor/docs/README.md)、[温湿度](../products/input/temperature-humidity/docs/README.md)、[普通超声波](../products/input/ultrasonic/docs/README.md)、[LED 超声波](../products/input/led-ultrasonic/docs/README.md)。重点区分显式初始化、主控对象隔离、菜单协议值及未开放支持。

输出模块维护示例：[点阵屏](../products/output/dot-matrix/docs/README.md)说明多驱动与独立端口，[RGB 灯带](../products/output/rgb-light/docs/README.md)说明颜色与全部灯分支，[MP3](../products/output/mp3/docs/README.md)说明显式初始化和命令菜单。源码存在不代表主控支持已开放。

## 文档约定

- 教程负责带你完成任务，API 手册负责接口合同；示例注释解释当前写法，参考索引只负责定位，不另立一套规则。
- 公开资料说明如何开发和维护，以实际源码/工具支持为准；未实现的 API 或命令不写成现成功能。
- 新模块和产品提供中文说明，其他语言按需要补充；翻译不能改变参数标识和菜单实际值。
- 产品说明维护源码位置、使用方式、参数/端口、生成结果与兼容约束。
- 目录中不存放执行日志、阶段计划、内部代码审阅、对话交接、本机绝对路径或单轮验收统计。
- CLI、作者 SDK 和 Skill 的用法应随实际工具版本更新，共用同一份开发规则。
