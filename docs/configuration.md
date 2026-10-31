# 主控支持关系与端口

第一次接入无硬件示例请按[手写教程](getting-started.md)编辑主控配置、递增配套版本，再用 `check` 和 `pack-set` 检查打包；`support add` 只是可选辅助。真实硬件的 variant、端口与 SDK 必须先核实；命令不猜驱动，也不为所有主控开放模块。

## 点阵屏及未开放输出模块

当前作者库配置为 `0.0.3`，包含七款机器人和独立的 [AIBlocksBoard 主板](../products/controllers/aiblocksboard/docs/README.md)，开发内置采用相同快照。根目录仍记录此前正式初始 `0.0.1` 的发行历史，不因源码变动自动发布。旧工程按自己的版本锁恢复；上传及兼容边界见[初始基线指南](releases/wonderlab-library-v0.0.1.md)。

主板直控动力支持改变完整库快照，因此原有原生包均递增修订：普通包当前 `0.0.3`，K230／WonderLens 当前 `0.0.4`，AIBlocksBoard 当前 `0.0.2`，三动力初版 `0.0.1`；共同使用配置 `0.0.3`。既有 Release、产品历史和已安装旧身份保持不变。AIBlocksBoard 只开放板载与三项直控动力，不继承机器人系列支持。

点阵屏常规 AI 使用 `hiwonder-dev-port`，菜单仍是 `display.aiblocks_iicport`，1–4 默认 1；AiDoggy 使用 `hiwonder-dev-port-aidoggy`，`display.aidoggy_iicport`，A–D（1–4）默认 3。IIC 模板使用 `hiwonder-iic`，只保留接口，不据此添加真实主控。详见[点阵屏](../products/output/dot-matrix/docs/README.md)。

`display.rgbport` 与 `display.mp3_port` 仅定义可复用端口表；RGB 灯带和 MP3 的实际支持项仍为空。端口表、隔离验证和源码原生化都不是开放主控授权。当前源码库配置为 0.0.3，以 `library.config.json` 为准。修改配置后，共存包需采用相同完整快照并各自递增包版本重新打包，不能覆盖旧身份或混用冲突缓存。

`library.config.json` 是本分支库配置入口：声明 profile、配置版本、中文保底语言、大类、各主控文件、端口资源和功能占位卡片。原生打包器展开继承，将支持关系和端口写入包内 `library.json`；配套客户端直接读取该快照。旧包路径仍使用原实现，未接入新的远端配置渠道。

## 常规输入模块

现有颜色识别、IMU、温湿度、LED 超声波支持项选择 hiwonder-dev-port，端口组都是 sensor.aimech_iicport，默认值 1，显示 A/B/C/D/E/J/K 对应实际 1/2/3/4/5/9/10。不能照搬点阵屏的 1–4 或 AiDoggy 点阵独立端口；不同模块的端口配置互不替代。

这些模块当前共用 DEV SDK，不因此虚构 IIC 分支。后续若主控使用其他 SDK，需同时在库配置选择 variant 和类的 getInfo/getPython 中增加真实驱动规则，未知适配应拒绝。

sensor.ultra_port 定义普通超声波的 2/6/8，默认 2。普通超声波实现使用 hiwonder-port，但当前没有任何真实主控支持项；仅新增端口表不会开放支持，也不能用隔离测试替代主控验收。

## 巡线系列

现有四路、旋钮四路和六路巡线支持项选择 hiwonder-dev-port；都使用 sensor.aimech_iicport、默认 1，支持范围不因类迁移扩大。八路保留同 SDK 实现，但没有实际公开支持项，只在隔离配置验证。

类内部保留各自构造器和对象名：DEV_LINE_FOLLOW_4/linefollow、DEV_LINE_FOLLOW_4_O/linefollow4、DEV_LINE_FOLLOW_6/linefollow6、DEV_LINE_FOLLOW_8/linefollow8。相同 variant 不表示可以合并设备类型。原分类 wondercode-line-8 只是旧来源标识，不能据此删掉 WonderLab 的兼容积木或宣称跨品牌支持。

## 动力与风扇

总线舵机使用 hiwonder 适配；IIC 转 PWM 使用 hiwonder-dev-port，保留显式初始化、actuator.aimech_iicport 和输出编号 actuator.iic_pwm_port。它们不能按主控名称套用风扇的独立端口覆盖。

风扇常规 AI 使用 hiwonder-dev-port、actuator.aimech_iicport、默认 1；AiDoggy 使用 hiwonder-dev-port-aidoggy、actuator.aidoggy_iicport、默认 3。两者都只允许 actuator 前缀。普通端口风扇使用 hiwonder-port/display，display.fanport 定义 6/8、默认 6，但当前没有真实主控支持条目；端口表不等于开放支持。

类的 getInfo.id 必须属于包的 namespaces 和当前主控条目的 legacyNamespaces。换驱动不仅换端口值，还要选择正确的完整旧类型、对象和 SDK。详见[风扇维护规则](../products/output/fan/docs/README.md)。

## 配置主控

主控文件位于 `library/boards/<主控>.json`。例如 `aimech.json`：

```json
{
  "product": "robots/aimech",
  "extends": "library/support/ai-series.json",
  "modules": {
    "power/xarm": {
      "variant": "hiwonder",
      "legacyNamespaces": ["xarm"],
      "portGroups": {}
    }
  }
}
```

`product` 指向主控源码模块。`modules` 的键为 `<大类>/<模块>`，只列出该主控支持的组合；没有主控支持的模块也可保留作者源码。

机器人包通过 `products.<产品>.product` 识别主控身份，可先于其他模块独立加载，无需在自己的 `modules` 中添加自身。输入等扩展仍必须在该主控的 `modules` 中明确列出。

`extends` 可复用系列支持集，路径相对仓库根目录。主控的同名模块配置整体替换继承条目；将条目设置为 `null` 可移除继承的模块。不要假定缺省字段会深度合并。

`variant` 选择模块的适配分支。`legacyNamespaces` 限定该组合保留的旧实现，例如 `power/xarm-series` 的同一原生类保留 `actuator` 与 `xarm` 两种旧前缀，主控分别通过 `hiwonder-actuator` / `hiwonder-xarm` 选择其一，不能同时激活两套命名空间。

只存在卡片的模块允许保留支持意图，但源码索引必须继续标为 `planned`，不能据此提供下载或生成能力。

## 同一模块按主控选择初始化接口

支持同一个模块不等于使用同一个初始化方法。不同主控可能使用不同驱动、构造函数、IIC 总线、引脚或地址参数；不能只替换端口编号，也不能把一种主控的初始化模板直接复制给其他主控。

本库按以下职责维护差异：

- `library/boards/<主控>.json` 或复用支持集：为该模块配置 `variant` 和 `portGroups`。
- `profile` 区分所属软件分支；`variant` 是模块适配标识，不要求等于 `profile`。多个主控使用相同 SDK 接口时可复用同一个适配标识。
- 宿主按当前主控解析支持条目，将 `variant` 作为 `context.variant` 提供给模块类；端口菜单与默认值继续由库配置提供。
- 模块的 `src/index.ts` 在 `getPython()` 中按适配标识选择实际驱动导入、对象初始化和读写模板；不把可执行 Python 塞进主控 JSON，不在软件本体增加逐产品判断。
- 不支持的主控不应配置该模块。多适配类遇到未知 `variant` 应明确报错，不能静默套用另一种主控的接口。

初始化仍按实际使用的积木收集依赖，不在类构造、`getInfo()` 或语言切换时连接设备、执行 Python 或重新初始化硬件。更换主控后必须重新按目标主控配置加载适配，不能复用上一个主控的初始化选择。

新增或修改主控适配时，为“主控 × 模块 × variant × 端口”建立回归：核对驱动/构造参数、默认及其他合法端口、菜单影子值、完整 Python、初始化去重、切换语言不改变代码，以及未知适配拒绝加载。运行在不同 SDK 上但使用相同完整 opcode 的旧课程也必须保持参数名和已保存 value。

目前共享的 `wonderlab` 适配只表示相应模块的现有实现，不能据此推断所有传感器、所有主控的初始化接口相同。新增差异必须先核对对应 SDK 或旧实现，再增加适配并完成硬件验收。

### 数码管与 IIC 风扇的适配示例

这两个模块在同一个 `src/index.ts` 保留两套旧 opcode，`getInfo()` 和 `getPython()` 按同一个 `context.variant` 选择分支；只提供当前主控对应的积木、菜单和模板，不能同时注册不兼容的旧类型。

| variant | 驱动与初始化 | 端口组 |
| - | - | - |
| `hiwonder-dev-port` | `Hiwonder_DEV.DEV_*(Hiwonder_DEV.Port(PORT))` | `display.aimech_iicport` |
| `hiwonder-iic` | `iic = Hiwonder_IIC.IIC()` 后调用 `Hiwonder_IIC.DEV_*(iic,PORT)`；风扇额外传入 `0x56` | `display.aiblocks_iicport` |

当前 `library/support/ai-series.json` 将数码管和 IIC 风扇配置为 `hiwonder-dev-port`，由五种 AI 系列主控继承。`hiwonder-iic` 保留旧接口和测试能力，但当前库没有开放对应主控的完整支持配置；不要仅因类中存在该分支就新增主控卡片或宣称硬件支持。

为其他主控启用已验证适配时，在其 `modules` 中同时指定匹配的 variant、端口组和完整旧类型绑定。例如数码管的 DEV 分支：

```json
{
  "output/digit-display": {
    "variant": "hiwonder-dev-port",
    "legacyNamespaces": ["display"],
    "portGroups": {
      "display.aimech_iicport": {
        "bindings": {"display_aimech_digit_show_num.PORT": "1"}
      }
    }
  }
}
```

接口和旧类型清单分别见[数码管](../products/output/digit-display/docs/README.md)与[IIC 风扇](../products/output/fan-iic/docs/README.md)。这两个模块的适配选择自历史配置 `0.1.1` 引入，当前 `library.config.json` 为 `0.0.3`，包含 OLED 与点阵屏的显式适配。使用新配置时，递增并打包需要共同启用的主控与模块配套版本，在软件中显式切换整套；同一工程的活动包不能混用不同完整快照。保留旧课程需要的安装版本，不将卸载旧版本作为升级前置，详见[版本与项目](versions-and-projects.md)。

### OLED 的初始化与共用绘图

`output/oled` 使用相同的两种 variant。五种 AI 主控在共享支持集中选择 `hiwonder-dev-port`，绑定 `display_aimech_oled_init.PORT` 与 `display.aimech_iicport`；IIC 分支对应 `display_aiblocks_oled_init.PORT` 与 `display.aiblocks_iicport`，保留旧接口但未开放完整主控配置。

每个适配只提供一种初始化积木，并共用七个 `oled_*` 绘图 opcode；不能用过滤规则将共用绘图积木一并隐藏。DEV 初始化使用 `Hiwonder_DEV.DEV_OLED(Hiwonder_DEV.Port(PORT))`，IIC 初始化使用共享 `iic` 和 `Hiwonder_IIC.DEV_OLED(iic,PORT)`。两个分支都保留 `my_oled` 对象名和显式初始化步骤，不在绘图模板中偷偷补入默认端口初始化。详情见[OLED 维护手册](../products/output/oled/docs/README.md)。

## 配置端口

`library/ports.json` 集中维护可复用端口组的显示名与实际字符串值：

```json
{
  "display.aidoggy_iicport": [
    {"label": "C", "value": "3"},
    {"label": "D", "value": "4"},
    {"label": "E", "value": "5"},
    {"label": "F", "value": "6"}
  ]
}
```

模块支持条目的 `portGroups` 通过组名引用端口，用 `bindings` 指定完整旧积木类型、参数名和默认值：

```json
{
  "display.aidoggy_iicport": {
    "bindings": {
      "display_aimech_matrixLed_show_num.PORT": "3"
    }
  }
}
```

同一模块可以有多个具名端口组。默认值必须属于对应组，显示名调整不改变实际 value；旧课程已有字段不能在新版本恢复时被静默改写。

原生类通过 `context.ports('sensor.aimech_iicport')` 取菜单，通过 `context.defaultPort('aimech_read_light', 'PORT')` 取默认值。软件按当前主控查 `modules['input/light-sensor']`；未列出的模块拒绝加载，不读取软件旧支持矩阵作为补充。

修改配置后更新 `library.config.json` 的 `version`，递增受影响主控及需要共存模块的包版本，再生成同快照配套。已安装快照不会被仓库文件自动改变；当前原生协议支持多版本安装、显式配套选择和工程版本锁，安装新包不会自动升级已打开作品。旧课程仍恢复锁定版本，不能静默改用最新版或通过卸载旧包绕过冲突。功能要求与真实发行版的验收边界见[导入说明](importing.md)，不把开发协议能力当作所有已发行软件均支持。

这些配置保留现有作者源菜单及主控参数覆盖的语义，不代表所有列出的组合已经做过真机验收。原生类以库配置作为支持关系／端口的维护来源；当前已实现模块使用 src/index.ts，不为新包创建 legacy 作者目录或空占位资源目录。

## 通信与语音适配示例

communication/communication 使用 ps3，前缀 communication；input/wonder-echo 使用 hiwonder-dev-port，前缀 sensor，端口由 sensor.aimech_iicport 配置。相同驱动的主控可复用适配，但两模块的公开支持列表不同，不能因为共用系列就自动补齐组合。具体契约见[通信维护说明](../products/communication/communication/docs/README.md)和[语音维护说明](../products/input/wonder-echo/docs/README.md)。

## WonderLens 的端口型与板载初始化

input/wonder-lens 在五种 AI 主控中选择 hiwonder-dev-port，在 minihexa 中选择 hiwonder-dev-onboard。前者通过 sensor.aimech_iicport 和 sensor_aimech_wondercamInitI2c.IICPORT 配置端口与默认值，使用 Hiwonder_DEV.Port 包装端口；后者直接构造 Hiwonder_DEV.WonderCam()，不应注入并不存在的端口参数或菜单。

历史 hiwonder-iic 使用 Hiwonder_IIC.IIC() 及 WonderCam(iic,IICPORT)，不能只修改 DEV 端口值来复用。当前真实库没有此分支的公开支持项和 sensor.aiblocks_iicport 端口表，保留源码不等于开放主控。新增支持时须同时配置真实主控、variant、对应端口表和默认绑定，并验证全部初始化/恢复行为。详见 [WonderLens 手册](../products/input/wonder-lens/docs/README.md)。

当前配置 0.0.3 的共同加载包必须重新收集一致的 library.json 快照；旧快照不会自动被仓库文件替换。此版本号不是正式发行状态。

## K230 的同驱动不同能力适配

input/k230-vision 的五个公开主控均使用 DEV_K230，但可见积木、默认 MCP 工具和参数菜单不同。共享支持集使用 hiwonder-dev-dual-drive；aimecanum、aiquadruped、aiquadrupedpro、aihexa 在各自 board 中分别覆盖为 hiwonder-dev-mecanum、hiwonder-dev-quadruped、hiwonder-dev-quadruped-pro、hiwonder-dev-hexa。模块同名条目整体覆盖，必须同时保留 legacyNamespaces 和 portGroups。

初始化端口仍由 sensor.aimech_iicport 及 sensor_k230_aimech_init.PORT 配置，不增加主控开放范围。getInfo 与 getPython 同步选择可见规则，不在软件本体硬编码产品名称。修改后共同加载包使用一致的 0.0.3 配置快照；详见 [K230 维护手册](../products/input/k230-vision/docs/README.md)。

## 同一 SDK 下的板载、封装端口与原始 IO

variant 不仅区分 import。即使都导入 Hiwonder_DEV，也必须按硬件选择正确构造与读取：

| 模块与主控 | variant | 接口合同 |
| - | - | - |
| 红外 / 五AI | wonderlab | DEV_IR(Hiwonder_DEV.Port(PORT)) 与 read_state() |
| 红外 / MiniHexa | hiwonder-dev-raw-io | DEV_IR(PORT) 与 read()，原始IO32/IO18 |
| 语音、发光超声波 / MiniHexa | hiwonder-dev-onboard | DEV_ASR() / DEV_SONAR()，不传 Port |
| 温湿度、发光超声波 / AiDoggy | hiwonder-dev-port-aidoggy | DEV 构造保留，但活动端口为 sensor.aidoggy_iicport 的A-D |

旧通用 opcode 与菜单保留为兼容声明，不自动重映射已有作品的字段值。portGroups 可以包含仅供旧菜单 shadow 读取的空 bindings；它不开放新模块或新增物理端口。隐藏兼容块仍保留完整 Python 规则；名称和参数不可随显示语言修改。

普通 IIC 点阵不等于 IO 点阵，显示模块的端口表也不能替代传感器端口表。细节见各模块维护说明。修改配置后，共同加载包须重新打包为一致快照；不要覆盖已发行的同版本包，配置快照变化也应纳入下一包版本的身份审阅。

## 更新索引

修改配置后执行 `node tools/cli/check.mjs`。增删目录、源码归属或 opcode 后执行 `node tools/cli/check.mjs --write-indexes`，一并审阅生成的 `library/modules.json` 与 `library/legacy-index.json`。

两个索引由源码生成；卡片图片只在各模块元数据中维护，端口只在库配置中维护，均不复制进 `catalog.json`。
