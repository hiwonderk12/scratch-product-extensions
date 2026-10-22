# K230 视觉模块维护手册

面向熟悉 TypeScript、Python 和 Git 的维护人员。主要修改 `src/index.ts`：类的 `getInfo()` 声明积木、菜单和控件，集中 `messages` 维护中文、英文、繁体中文和韩文，`getPython()` 就近维护生成规则。不要恢复旧注解格式、聚合传感器文件或逐 opcode 的 Python 文件。

## 文件职责

| 文件 | 职责 |
| - | - |
| `src/index.ts` | K230VisionBlocks、product、四语 messages、菜单及 Python |
| `metadata.json` | sensor 命名空间、类入口、版本和卡片资源路径 |
| `assets/k230.svg` | 积木图标 |
| `assets/cards/sensor.png` | 拓展库卡片图片 |

源码保留 127 个不同 opcode，但不同主控的可见积木和菜单不同，不能把所有 MCP 工具无条件合并。

## 主控适配

主控支持由库配置决定，不在软件本体中新增产品判断。

| 主控 | variant | 活跃积木数 | 菜单数 |
| - | - | - | - |
| aimech | hiwonder-dev-dual-drive | 118 | 29 |
| aimecanum | hiwonder-dev-mecanum | 121 | 31 |
| aiquadruped | hiwonder-dev-quadruped | 121 | 31 |
| aiquadrupedpro | hiwonder-dev-quadruped-pro | 122 | 32 |
| aihexa | hiwonder-dev-hexa | 122 | 32 |

共享支持集 `library/support/ai-series.json` 使用双驱动车适配。其他四主控在各自 `library/boards/<主控>.json` 覆盖 K230 条目。同名模块配置整体覆盖，不是递归合并，覆盖时必须同时保留 `legacyNamespaces` 和 `portGroups`。

这五个适配使用相同的 DEV_K230 驱动，但默认 MCP 工具、可见 getter、菜单不同。不能因为驱动相同而合并 variant。aidoggy、minihexa、aiblocksboard 和未知主控当前不开放；不要为测试擅自添加支持。

初始化积木 `sensor_k230_aimech_init` 的 PORT 绑定 `sensor.aimech_iicport`，默认值为字符串 1。A/B/C/D/E/J/K 对应 1/2/3/4/5/9/10。端口显示文字、值和默认绑定由库配置维护。

## Python 与设备语义

初始化保持：

~~~python
import Hiwonder_DEV
k230 = Hiwonder_DEV.DEV_K230(Hiwonder_DEV.Port(1))
~~~

- 只有初始化积木收集驱动和设备对象；读取、更新、控制不隐式初始化。
- `k230_update_detect_result` 显式刷新结果；读取不自动刷新。
- `k230_send_mcp_result` 发送后保留 `time.sleep(0.05)`。
- 启停菜单的 True/False 是 Python 字面量，不添加引号。
- 保留旧 opcode 和参数名，包括 volumn、oriention、orcode 等拼写。
- getPython 只返回 getInfo 当前可见 opcode 的模板，不注册其他主控专属规则。

## MCP 配置

双驱动车不显示默认 MCP 工具块；其他四主控分别显示各自的 `k230_<主控>_set_mcp_default`。默认工具声明按主控保留，不能随 UI 语言翻译 JSON 内面向设备和模型的协议描述。

自定义 MCP 的 NAME 必须是静态字符串；标识符通过原生模板的 identifier 规则生成。连接运行时表达式仍应拒绝，不能把表达式源码当作函数名。COMMAND、PARAMS 保持 largetext 控件，按原 jsonValue、compactJson 规则处理引号、换行和 JSON；修改时验证完整生成程序，不能只检查模板字符串。

四足的移动 getter 历史默认 VALUE 为 x，即使其替换菜单不含 x，也不能在兼容迁移中擅自修改。麦轮车、四足、竞赛四足和六足的 MCP 名称及参数菜单须分别维护。

## 菜单、视觉分支与多语言

17 处 templateSelector 保留 177 个 case，以及未命中值的 fallback。人体和手部关键点读取还受 NAME 参数影响，修改时须验证关联组合，不能只看单个菜单。颜色名称转换保留中英文与未知值 fallback。

文案只在集中 messages 修改；积木和菜单通过 key 引用，不在 text 中直接写语言对象。四语 key 与参数占位符必须完整一致。菜单只翻译 text，不改 value、顺序、默认值、Python 标识符或 MCP 协议内容。

K230 使用普通内联 subCategory，不声明 WonderLens 专属的独立分类导航或 parent。共享 sensor 分类中与 WonderLens、普通传感器共存时，K230 不能被归入 WonderLens 的末级子分类。

## 检查与打包

按[开发手册](../../../../docs/development.md)、[原生 API](../../../../docs/native-api.md)和[配置手册](../../../../docs/configuration.md)执行结构检查和标准类编译打包。直接生成 index.cjs 类压缩包，不回转旧 manifest。修改支持关系或端口后，共同加载的包必须携带一致版本的 library.json 快照；不要混用不同快照。

本手册描述源码合同，不代表固件兼容、硬件或正式发行验收。新增设备接口能力时仍需软件配套支持。
