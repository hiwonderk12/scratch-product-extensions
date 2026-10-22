# 积木拓展库文档

按你要完成的任务选择入口，无需先阅读全部接口与内部规则。

## 第一次使用或制作

- **安装现成包**：[导入与使用](importing.md)，包括软件要求、配套 ZIP、选主控和离线重开。
- **制作第一个包**：[显示文本入门教程](getting-started.md)，不需要硬件，包含依赖、创建、修改、支持配置与配套打包。
- **想借助 AI**：[可选辅助指南](ai-assisted.md)。不是教程的前提，也不能代替人工检查。

## 修改已有积木与深入开发

1. [仓库说明](../README.md)：用途、适用软件和使用入口。
2. [模块维护手册](development.md)：源码入口、旧标识、控件和本地检查。
3. [主控支持关系与端口](configuration.md)：按主控配置模块、复用支持集和调整端口。
4. [原生类接口与命令](native-api.md)：类 / 菜单 / Python 模板、标准编译、独立打包与本地导入。
   [课程维护 CLI](cli.md)：五类骨架、积木/菜单生成、dry-run及安全边界；[维护 Skill](../.agents/skills/product-extension/SKILL.md)复用同一规则。
5. 模块中的产品手册：固件接口、参数和生成约束，例如 [AI机甲双驱车](../products/robots/aimech/docs/README.md)。

## 版本与课程

[包版本与项目恢复](versions-and-projects.md)：不可变版本、库快照配套、安装与升级分离、旧项目兼容基线、版本锁和离线备份。

[原生候选目录与下载](native-catalog.md)：从既有ZIP生成轻量目录、明确启用测试渠道、下载后共用不可变安装服务，不自动升级作品或切正式源。

## 产品维护示例

主控差异示例：[红外避障](../products/input/infrared-sensor/docs/README.md)、[WonderEcho](../products/input/wonder-echo/docs/README.md)、[LED 超声波](../products/input/led-ultrasonic/docs/README.md)。分别检查原始 IO、Port 包装与板载无参构造；菜单、默认值、import、对象名和读取方法须与所选 variant 一致，不能只更换端口文字。

动力与风扇：[总线舵机](../products/power/bus-servo/docs/README.md)、[IIC 转 PWM](../products/power/iic-pwm/docs/README.md)、[风扇](../products/output/fan/docs/README.md)。重点保留专用滑块、显式初始化、AiDoggy 独立端口与按适配选择旧前缀；普通端口风扇未开放真实支持。

巡线系列：[四路](../products/input/line-4/docs/README.md)、[旋钮四路](../products/input/line-4-rotary/docs/README.md)、[六路](../products/input/line-6/docs/README.md)、[八路](../products/input/line-8/docs/README.md)。重点是独立 SDK 对象、位掩码与连续通道编号的区别、亮灭模板选择及 LINE shadow；八路仅保留实现，不代表公开支持已开放。

输入模块维护示例：[颜色识别](../products/input/color-sensor/docs/README.md)、[外接 IMU](../products/input/imu-sensor/docs/README.md)、[温湿度](../products/input/temperature-humidity/docs/README.md)、[普通超声波](../products/input/ultrasonic/docs/README.md)、[LED 超声波](../products/input/led-ultrasonic/docs/README.md)。重点区分显式初始化、主控对象隔离、菜单协议值及未开放支持。

输出模块维护示例：[点阵屏](../products/output/dot-matrix/docs/README.md)说明多驱动与独立端口，[RGB 灯带](../products/output/rgb-light/docs/README.md)说明颜色与全部灯分支，[MP3](../products/output/mp3/docs/README.md)说明显式初始化和命令菜单。源码存在不代表主控支持已开放。

## 文档约定

- 公开资料说明如何开发和维护，以实际源码/工具支持为准；未实现的 API 或命令不写成现成功能。
- 新模块和产品提供中文说明，其他语言按需要补充；翻译不能改变参数标识和菜单实际值。
- 产品说明维护源码位置、使用方式、参数/端口、生成结果与兼容约束。
- 目录中不存放执行日志、阶段计划、内部代码审阅、对话交接、本机绝对路径或单轮验收统计。
- CLI、作者 SDK 和 Skill 的用法应随实际工具版本更新，共用同一份开发规则。
