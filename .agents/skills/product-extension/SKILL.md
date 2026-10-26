---
name: product-extension
description: 编写或维护原生 TypeScript class 积木包，维护四语、Python 和主控端口适配，检查作者目录并打包可直接导入的单个 ZIP。适用于手写用户包、修改官方产品及可选生成辅助，不用于编辑器运行时、上传协议或 C 后端。
---

# 原生产品积木开发

以手写 TypeScript 类为主，CLI 负责共同的检查与打包；创建／生成和 AI 均为可选辅助。遵循用户选择，不先要求规格文件或生成命令。

## 用户拓展优先使用独立单包

- docs/examples/minimal-text 和 docs/examples/handwritten-text 本身就是完整作者目录，不默认复制进 products、修改 library.config、递增主控版本或制作 pack-set。
- 使用 node tools/cli/index.mjs check ./作者目录，再 pack ./作者目录 --output ./dist/单包.zip。标准编译一个 CommonJS 类，保留原始资源，不执行原始 TS、不生成旧 manifest。
- 软件“用户拓展 → 导入本地库”选择单包即可挂载并持久化。同一模块仅保留当前内容，重新导入覆盖，不添加多版本选择；项目使用当前已安装用户包。
- 主控差异由本包 metadata.support 的 products/default/ports 声明，不修改官方支持表；没有硬件兼容依据时不添加通用 default。详见 docs/standalone-package.md。
- 多 ZIP 分发套件不是可导入包，不交付外层 ZIP 并声称可直接导入；应从作者源码重新生成单包。
- 下文中的全库快照、不可变发行、配套主控和版本锁只用于官方产品库维护，不得作为普通用户包的前置要求。保留官方旧课程合同，不批量删除其恢复能力。

## 按任务阅读

| 用户任务 | 先看什么 |
| - | - |
| 第一次手写，无硬件依据 | [入门教程](../../../docs/getting-started.md)及[最小类](../../../docs/examples/minimal-text/src/index.ts)、[元数据](../../../docs/examples/minimal-text/metadata.json) |
| 查方法、字段、控件或 Python 用法 | [类与上下文 API](../../../docs/native-api.md)、[积木与菜单](../../../docs/blocks-and-menus.md)、[Python 规则](../../../docs/python-generation.md)；按任务选读 |
| 要完整带注释的写法 | [完整单文件参考](../../../docs/examples/handwritten-text/src/index.ts)及[覆盖索引](../../../docs/examples/handwritten-text/README.md)，不要求新手先删减整包 |
| 改已有产品或传感器 | [维护手册](../../../docs/development.md)、目标模块 metadata／src/index.ts／docs，再按需读[主控端口配置](../../../docs/configuration.md) |
| 检查、打包、更新或导入 | [CLI](../../../docs/cli.md)、[版本与项目](../../../docs/versions-and-projects.md)、[软件导入](../../../docs/importing.md) |

教程引导任务，API 是接口合同，示例注释解释具体写法；不要把 Skill 或规格文件维护成第二套协议。

## 确认工作范围

- 核对用户指定源码位置、分支、library.config.json 的 profile 与实时 Git，保留既有修改。WonderLab／WonderCode 产品分支隔离，不整分支混入另一产品内容。
- 第一次使用先确认仓库根目录、Node 要求、锁文件和教程配套修订。缺示例或命令时核对来源，不假定未发布内容已在远端可下载；不替用户安装、升级或改锁。软件最低兼容发行版尚未确认时先说明开发预览边界，不承诺普通旧版可直接导入。
- 新手从 minimal-text 的两个作者文件开始：一个显示文本积木、四语和 print 规则，无端口、事件、图片或 Python 资源。本例仅生成 Python print，不在 Scratch 舞台即时显示或控制设备屏幕。完整参考与最小例使用同一教学身份，是备选样例，不能复制成两个同名模块或覆盖已发行同版本内容。
- 维护现有模块时先确认完整类型 namespace_opcode、参数名、菜单 value 和公开支持组合。改文案不改保存身份；不删除兼容积木来让检查通过。

## 直接编写一个 index.ts

- 每个硬件独立目录，主要维护 metadata.json 与单个 src/index.ts。使用 class、集中 messages／product、getInfo() 和内联 getPython()；不按 opcode 拆文件，不生成旧 manifest 或 namespace 注解格式。
- constructor(context) 保存宿主上下文，不在构造时固定译文或初始化设备。getInfo() 每次通过 context.t(key) 解析当前文案；getPython() 返回 opcode 对应的生成规则，不运行 Python。无自有资源可省略 dispose()。
- context 的翻译、端口、默认绑定、variant、资源和 Python 文本方法按 API 使用。类型导入只用于编译；不要假定宿主具备 npm 模块加载或额外运行期 TS 入口。复杂拆分须先确认打包器能力。
- 手写 blockType 使用 command、reporter、Boolean、hat，大小写敏感；事件形状不等于已有事件注册。Python 模式不要求为每个 opcode 再写一个设备执行 TS 方法。
- messages 集中维护中文、英文、繁体中文和韩文；中文兜底，所声明语言必须完整，参数占位符一致。翻译只改显示文字，不改标识、菜单实际值或用户输入；专业译文缺依据时如实标注待审。
- 普通分组不启用层级导航；专用控件遵守当前生成边界。note／基础 matrix 的 UI 不能当作 Python shadow 已完整支持，angle 的数值处理和资源限制先查参考说明。

## Python 与主控适配

- 简单规则直接放 getPython()；template 对指令写语句、对 reporter／Boolean 写表达式。字符串参数由生成器转义，不给 {TEXT} 再套引号，不把用户自由文本当 literal 代码。
- imports、variables、setups 等依赖按实际使用积木收集；入口、事件、选择器及 forcedVariables 等高级字段从 Python 手册与完整例选用，不复制无关 SDK 导入。Hiwonder 主入口用 launcher: 'Hiwonder.startMain({MAIN})'，不生成装饰器替代它。
- 同一模块按 context.variant 分支时，核对每个公开主控的 import、驱动、构造函数、总线／原始 IO、地址、端口菜单、默认绑定和显式初始化；不能只改端口文字。context.ports／defaultPort 依赖库配置，不在软件本体硬编码新支持表。
- 图片放模块 assets，复杂 Python 文本按需要放 python；context.asset／python 的引用必须存在。runtimeFiles 进入包不代表自动部署到设备。
- 当前仅支持 Python。未来多目标沿用共享产品类和目标规则的规划，不添加空 C 模板或放宽校验冒充支持；新控件、协议、连接能力仍可能需要软件本体改动。

## 支持配置、版本与共同交付

- 源码存在不等于主控已支持。允许手写 library/boards 下的单主控条目，按教程保留旧项；也可选 support add 的显式 spec／dry-run。不要为示例扩公共支持集、开放未确认主控或实现 planned 硬件。
- 内容变化按版本手册递增身份；仅模块类变化时递增受影响模块版本，不无条件升级全部包。库配置快照变化时，主控与需要共存的模块须生成同完整快照的配套版本。先读取实际基线，不把教程演示号当永久固定版本；同版本不同内容不能覆盖。安装新版不自动升级项目，不为切换配置删除旧课程依赖的安装版本。
- 在库根目录检查。下面是教程模块的命令，维护其他模块时替换主控、模块与新输出目录；这是操作参考，不是可无条件整段执行的只读检查。check --write-indexes 会写索引，pack-set --dry-run 也会编译；只执行任务需要且已授权的步骤：

```sh
npm run ext -- check output/hello-text
npm run ext -- check --write-indexes
npm run ext -- check
npm run ext -- pack-set aimech output/hello-text --output dist/hello-text-demo --dry-run
npm run ext -- pack-set aimech output/hello-text --output dist/hello-text-demo
```

- 模块 check 编译 TS 并查文案／资源；全库 check 查结构与支持，不能互相替代。仅在目录／完整类型有变化时重建索引并审阅差异；版本与支持内容变化也要核对。普通单包 pack 不生成配套主控，不能承诺单个模块 ZIP 配内置旧快照即用。
- 可选 new／generate 的规格仅用于创建和定点插入，不是长期作者源。先 dry-run；CLI --type boolean 及参数规格 boolean 会输出标准 Boolean，无须用户手改。生成器拒绝动态／分支类时手工维护原 index，不删除分支来迎合工具。
- 按影响运行针对性测试。教程版本／配置示例变更时跑 tools/ci/minimal-package.test.mjs，完整例变更跑 tools/ci/handwritten-package.test.mjs，生成器变更跑 tools/cli/authoring.test.mjs；不为文案更新重复所有软件回归。

## 验收与交付边界

- 报告源码位置、实际检查结果、配套 ZIP／package-set.json、版本与导入步骤。package-set.json 是说明清单，不是导入包。说明失败如何处理，不只交一堆 ZIP。
- 只执行可信包的类测试；原生包会执行作者代码，不是安全沙箱。静态检查、可信类四语测试和打包成功不等于真实应用生成、预览或硬件验收。
- 应用侧另验首次导入、四语切换不改字段／Python、多版本选择、旧课程转换、图片／声音与手写代码保存、SB3 固定版本离线重开。最低兼容软件版本未确认时明确标为开发预览，不猜版本或声称桌面通过。
- GUI／设备环境不可用时列独立待验，不将环境恢复变成纯公开库开发前置。不自动安装、补装、下载固件或启动软件；不把本 Skill 当作这些操作或提交／推送／发布的授权。
- 公开库只保存开发手册、API／CLI／Skill 和产品维护资料；执行记录、内部审阅和验收证据放配套主项目 dosc。交付区分已实现、实际测试、未验、未提交与未发布。
