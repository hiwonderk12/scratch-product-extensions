# WonderLens 维护说明

本包主要维护 [src/index.ts](../src/index.ts)：原生类声明积木、菜单、集中多语言和内联 Python。资源放在 assets，发行信息放在 [metadata.json](../metadata.json)。不另建按 opcode 拆分的文件或空 python 目录。

## 主控与接口

主控是否支持本包由 [库配置](../../../../docs/configuration.md) 决定，不能在软件或类中另建主控白名单。类按配置的 variant 同时选择积木、端口菜单和 Python SDK：

| variant | 初始化 opcode | SDK 与构造 |
| - | - | - |
| hiwonder-dev-port | aimech_wondercamInitI2c | Hiwonder_DEV.WonderCam(Hiwonder_DEV.Port(IICPORT)) |
| hiwonder-dev-onboard | minihexa_wondercamInitI2c | Hiwonder_DEV.WonderCam()；无端口参数/菜单 |
| hiwonder-iic | aiblocks_wondercamInitI2c | Hiwonder_IIC.IIC()，再 Hiwonder_IIC.WonderCam(iic,IICPORT) |

公开支持维持五种 AI 主控 aimech、aimecanum、aiquadruped、aiquadrupedpro、aihexa，以及板载接口 minihexa；aidoggy 不支持本包。独立 IIC 接口保留课程标识，但当前没有公开支持主控，不能因源码含此分支就宣称已开放。

DEV 端口从 sensor.aimech_iicport 获取，菜单 A/B/C/D/E/J/K 对应 1/2/3/4/5/9/10，默认 1。独立 IIC 分支需要支持配置及 sensor.aiblocks_iicport 端口表；真实库尚未配置该组合。新增支持必须同时审核 SDK、初始化方式、端口表和默认绑定，不能只改端口值。

## 积木与分类

保留 sensor 命名空间及全部 55 个旧 opcode。每次按主控只启用一个初始化入口，加 52 个共用积木，即 53 个可见积木；不要把三种初始化同时展示。

| 分类 | 积木数 | 职责 |
| - | - | - |
| 根分类 | 7 | 初始化、固件/功能、模式切换、补光灯、结果更新 |
| 人脸识别 | 8 | 已学习/未学习人脸、ID、坐标 |
| 物体识别 | 4 | 检测、数量、按对象和索引读取 |
| 图像分类 | 3 | 最大置信度、ID 与指定分类置信度 |
| 特征学习 | 3 | 最大置信度、ID 与指定学习置信度 |
| 颜色识别 | 4 | 检测、总数、按 ID 获取位置 |
| 巡线识别 | 5 | ROI、检测、总数、按 ID 获取线数据 |
| 标签识别 | 5 | AprilTag ID、数量与索引数据 |
| 二维码识别 | 4 | 检测、长度、字符串与 bytes |
| 条形码识别 | 4 | 检测、长度、字符串与 bytes |
| 数字识别 | 3 | 最大置信度数字与指定数字置信度 |
| 路标识别 | 3 | 最大置信度编号与指定路标置信度 |

根 ID 固定 sensor__wonder-lens；11 个子分类使用 sensor__wonder-lens__wonder-lens-*，toolboxParentId 仅指根 ID。分类显示名和 toolboxSubcategoryLabel 走集中 messages，不能翻译 ID、opcode 或 Python。普通模块只使用内联 subCategory，不复制 WonderLens 的层级字段。详见 [原生 API](../../../../docs/native-api.md#工具箱层级分类)。

全部积木与根分类保留 cam.svg 图标和 #7B68EE 颜色。菜单顺序、value、参数名、默认值及 SDK 数组下标不可随译文调整。

## Python 生成规则

只有初始化积木收集 import 和 cam 构造；相同依赖由生成器去重。读取、切换模式和更新结果都不自动初始化。wondercamUpdateResult 显式调用 cam.updateResult()，其他读取不隐式刷新结果。课程需要自行安排初始化和更新顺序。

六处 templateSelector 保留完整菜单映射：getFuncNumber / switchFunc 各 12 项、setLed 两项、isObjOfIdDetected / getObjTotal / getObjOfId 各 20 项，共 86 个选择分支；未命中值继续使用普通 template，不另加隐式默认模式。

setRoi 保持 XPOS、YPOS、WIDTH、HEIGHT 顺序与默认 0、0、320、240。getDataOfTagIdIndex 的显示顺序虽为 INDEX、NUM、POS，生成仍是 cam.getDataOfTagIdIndex(NUM,INDEX)[POS]。不要改正 isAnyColorDetectd、getOrientionTag* 或 ORIENTION 等课程标识；它们与 Python SDK 的方法名可以不同。

## 多语言维护

messages 集中维护简体中文、英文、繁体中文和韩文。积木用 block.*，菜单用 menu.*，分类用 group.*，产品名用 product.name；getInfo 只引用 key，不内嵌语言对象。数字菜单、端口字母和 SDK 常量保持语言无关。

修改任一文案时同步四语，并保留参数占位符的名称和次数。已有英文文案按兼容基准保留；拼写及专业术语调整需单独审校。界面语言不改变菜单 value、项目保存参数或设备固件的语言。

## 本地检查

在库根目录执行已有 CLI：

```sh
node tools/cli/index.mjs check input/wonder-lens
```

具体命令以 [开发手册](../../../../docs/development.md) 为准；检查通过不代表已经完成专业译文、应用视觉或真机验收。不要自动扩大主控支持或手工修改生成索引。
