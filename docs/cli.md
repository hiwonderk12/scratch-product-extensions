# 检查、打包与可选生成 CLI

## 普通用户包：只检查和打包作者目录

~~~sh
node tools/cli/index.mjs check ./docs/examples/handwritten-text
node tools/cli/index.mjs pack ./docs/examples/handwritten-text --output ./dist/handwritten-text.zip
~~~

目录包含 metadata.json、src/index.ts 及可选 assets/python。标准编译后输出一个可直接在“用户拓展 → 导入本地库”导入的 ZIP；没有配套主控、库快照或多版本选择。`--output` 可省略，默认输出 dist/标识-版本-standalone.zip；重复打包更新同一普通 ZIP，拒绝覆盖目录或链接。详见[独立包格式](standalone-package.md)。

## 官方库维护与可选生成

可以直接[手写 TypeScript 类](getting-started.md)，只用检查、索引生成和打包交付；不必调用 new、generate 或 support add。
类与控件能力以[原生 API](native-api.md)和[积木声明](blocks-and-menus.md)为准，不能把生成器的限制当成手写能力的限制。

在仓库根目录使用 Node.js 20+ 和项目已声明的 TypeScript、JSZip 依赖。先查看 `npm run ext -- --help`。命令不安装依赖、不上传、不提交或发布，也不自动更新软件本体。

## 已实现的命令

分层目录预览：`catalog --split catalog.json --output-dir dist/catalog-products-preview`。
对照唯一产品 catalog 历史源校验平铺输入，再生成根与全部子目录；保留 tag 和 notes，不需要旧 ZIP、不改正式文件或发行身份。输出父目录须存在，输出目录不得已存在。不能与 `--status` 或 ZIP 生成参数混用，详见[分层目录与切换边界](native-catalog.md#分层目录总目录管理产品产品目录管理历史)。

纯根索引生成：`catalog --products ./products --output ./dist/catalog-products-proposal.json --status published [--layout products|flat]`。
默认 layout 为 products（v3 根），flat 为 v2 兼容根；默认 status 为 candidate。当前正式根已采用 v3，仅校验产品历史登记，不复验历史 ZIP。不能混用其他生成模式，输出只允许新文件；生成不等于上传或发布。

追加新发行：`release add --archive 新ZIP --tag TAG --output 新产品提案JSON [--baseline-archive 已审阅参考ZIP] [--status candidate|published]`。
检查新 ZIP 并原样保留已登记旧历史，默认输出候选提案，不直接改产品源或根。复用已登记库版本时必须给一份身份与资产名匹配的已审阅参考 ZIP，并比较完整快照；全新库版本可省略。不允许同版覆盖、现有输出覆盖或目录联接。参考来源仍由维护者确认；候选提案不能覆盖已激活正式产品历史。

官方多 Release 历史汇总：`catalog --releases ./products --input ./dist/release-assets --output ./dist/catalog-candidate.json --status candidate`。
读取产品 `catalog.json`，要求所有纳入输出的历史 ZIP 存在并校验完整快照，再生成兼容平铺索引，详见[官方发行与索引](native-catalog.md#按产品维护-catalogjson)。它是全量归档校验，不等同于纯根生成或单新 ZIP 追加；所有命令都不自动上传、覆盖正式源或证明线上可用性。

| 命令 | 作用 |
| - | - |
| `new product <id> --spec 文件` | 创建 `products/robots/<id>` 主控包骨架，不注册主控支持配置 |
| `new module <id> --category <分类> --spec 文件` | 创建 input/output/power/communication 中的独立模块包 |
| `generate block <分类/id> <opcode> --type <类型> --spec 文件` | 同一 index 内定点增加文案、声明、参数和内联 Python |
| `generate menu <分类/id> <名称> --spec 文件` | 同一 index 内定点增加四语显示文字和固定菜单值 |
| `g` | `generate` 短别名 |
| 上述命令的 `--dry-run` | 只列出拟改文件/字段，不写源码、索引、支持或临时文件 |
| `check [分类/id]` | 不带模块检查结构/支持关系/索引；指定模块则标准 TS 编译并检查集中 i18n/资源 |
| `check --write-indexes` | 显式重建源码目录和完整旧类型索引，不修改支持范围 |
| `pack <分类/id>` / `catalog ...` | 原生包打包 / 从既有ZIP生成候选目录，见[原生API](native-api.md)和[目录手册](native-catalog.md) |
| `support add <主控> <分类/id> --spec 文件 [--dry-run]` | 显式增加该主控的一个模块支持项，更新给定库配置/主控包版本，不改共享支持集 |
| `pack-set <主控> <分类/id>... --output 新目录 [--dry-run]` | 标准编译指定主控及模块，输出同快照 ZIP 和交付清单 |

`new` 和 `generate` 均拒绝覆盖重名包、积木、菜单或文案 key；没有 `--force`。错误参数、分支不明、文案不完整或规划后源码被修改时，不强行落盘。生成器只更新其列出的文件，保留其他源码、注释和原换行。

## 可选：从骨架到普通积木

先用[产品规格示例](examples/module.json)提供真实名称，四语不得用中文复制充当翻译。`description` 可省略，提供时也需四语。默认 namespace：输入 sensor、输出 display、动力 actuator、通信 communication；主控由 id 去连字符生成，可通过 `--namespace` 显式指定，已有兼容包不得借此改名。

```sh
npm run ext -- new module lesson-demo --category input --spec docs/examples/module.json --dry-run
npm run ext -- new module lesson-demo --category input --spec docs/examples/module.json
npm run ext -- g menu input/lesson-demo speed --spec docs/examples/menu.json --dry-run
npm run ext -- g menu input/lesson-demo speed --spec docs/examples/menu.json
npm run ext -- g block input/lesson-demo double_value --type reporter --spec docs/examples/block.json --dry-run
npm run ext -- g block input/lesson-demo double_value --type reporter --spec docs/examples/block.json
npm run ext -- check input/lesson-demo
node --test products/input/lesson-demo/test/smoke.mjs
```

每个新包只有 `metadata.json`、`src/index.ts`、`test/smoke.mjs` 和 `docs/README.md`。骨架内提供文本输出的通用示例，不伪造硬件读数；没有空 python/assets 目录，不为每个 opcode 拆文件。主控骨架示例：`npm run ext -- new product lesson-board --spec docs/examples/module.json --dry-run`。

### 规格文件不是第二套作者源

`--spec` 是一次生成的输入：输出始终是维护人员熟悉的单 index 类、集中 messages/product 和 getPython。生成后直接修改 index，打包不再读取 spec；不要长期同步维护两份配置。示例 JSON 可以保留作生成教程，实际课程规格可放工作目录或在审阅后自行移除。

block 规格包括 `text`、可选 `arguments`、`python`：

- `text` 对应目标 index 中的语言表；当前现有包均四语，翻译参数占位符须与中文一致。新包默认四语，生成器不自动机翻。
- 参数名使用大写，需与 `[VALUE]`、`{VALUE}` 一致；本批生成器支持 string/number/boolean，必须提供默认值。可提供 `menu` 引用**已存在**的菜单及布尔 `literal`。
- `--type` 仅 command/reporter/boolean；小写 boolean 输入生成标准 `blockType: 'Boolean'`，参数规格的 boolean 也生成 `type: 'Boolean'`。`python.template` 必须是非空实现，可提供字符串数组 imports/variables/setups。复杂选择器、事件、独立资源或自定义控件继续手工在 index 声明，不能塞空模板。
- 生成前检查完整类型归属，不能在共享 namespace 中添加其他模块已占用的 opcode。已有 opcode、参数名、菜单 value 不随界面语言改变。

menu 规格包含 `acceptReporters` 和非空 `items`；每项 `text` 为语言表，`value` 为唯一的非空字符串。只有显示文字翻译，不能翻译实际值。生成菜单不会自动替某个积木接线，需在参数 `menu` 指定其名称。

## 主控适配、索引与版本

首次制作请走[完整手写教程](getting-started.md)，其中包含不依赖 support add 的配置示例。创建与生成命令不接入主控；需要辅助修改已有主控时，可用以下显式操作：

```sh
npm run ext -- support add aimech output/hello-text --spec docs/examples/text-support.json --dry-run
npm run ext -- support add aimech output/hello-text --spec docs/examples/text-support.json
npm run ext -- check --write-indexes
npm run ext -- check
npm run ext -- pack-set aimech output/hello-text --output dist/hello-text-demo
```

支持 spec 必填 `variant`、`portGroups`、`libraryVersion` 和 `productVersion`；见[文本示例](examples/text-support.json)。
前两项必须符合真实类实现和现有端口表，无硬件文本示例端口为空。
后两项必须显式递增三段数字版本，可带预发行后缀；命令不会猜下一版本或修改官方发行配置。
单前缀模块默认选择其声明前缀，多前缀模块还需提供非空 `legacyNamespaces` 数组。
已支持条目拒绝重复添加，复杂适配调整请手工审阅。端口绑定写法见[配置手册](configuration.md)，命令检查引用/默认值，但不证明驱动或固件正确。

`pack-set` 的 `--output` 必须是库内不存在的新目录，拒绝越界、联接和覆盖；dry-run 也会编译，但不写临时资源或输出。
命令自动包含所选主控，只打显式列出的模块，先完成全部编译再写入；任意失败不留下部分配套文件。
清单 `package-set.json` 不是软件导入协议，软件仍分别导入每个原生 ZIP。
已有项目的其他活动模块也需要同配置新版，必须分别递增它们的包版本并列入配套；工具不会自动枚举或打全部主控支持模块。
第一次使用空白工程，保留旧包供原课程恢复；不要把新配置下的包冒充已经安装的旧身份。

创建包**不自动开放主控支持**、添加主控注册表或变更端口。按[库配置手册](configuration.md)确认各主控的驱动 import、接口/总线/地址、端口、variant、初始化方式和所选命名空间，不能只换端口假定初始化相同。主控包仍需显式添加 `library.config.json`/`library/boards/` 中的对应配置。

新增目录或完整类型后，审阅源码，执行 `npm run ext -- check --write-indexes`，再执行 `npm run ext -- check`。命令不会自动递增包版本或库配置版本；改变已发行内容或配置快照需按[版本合同](versions-and-projects.md)维护配套版本，不原地覆盖。

## 自动生成的边界

AST 插入只支持唯一默认导出类、getInfo/getPython 各自直接返回对象、blocks 直接数组及普通 messages 对象。含 variant 分支、多命名空间、动态数组/展开的复杂包会拒绝自动生成并提示手工维护，而不是猜某一分支或重排整份文件。未知字段/非Python目标也会拒绝；C 等目标尚未实现。

`test/smoke.mjs` 只编译并执行**可信本地作者类**的通用示例，不执行 Python 或硬件。Node vm 不是安全沙箱，不对不可信源码使用此冒烟。CLI检查/作者冒烟不能代替应用内原生加载、控件、四语、完整Python、上传门禁或SB3恢复测试；这些必须在配套软件中验证。`npm test` 运行CLI自身回归，不测试所有产品硬件。

独立 `ext test`、真实 `preview`、`build` 命令尚未实现；不要将静态页面或本地冒烟称为真实预览。新硬件、上传/连接协议和C后端依旧可能需要软件本体调整。CLI/Skill不自动修改这些边界，也不代替合并审阅、硬件和发行授权。

## 自动验证手写示例

安装本库自己的锁定依赖后，可执行 `node --test tools/ci/handwritten-package.test.mjs`。
它复制公开作者文件，在 dist/handwritten-* 的独立副本手写支持与版本，运行真实检查和配套打包，不调用创建／生成命令。
副本通过目录父级解析本库自己的依赖，不读取软件主仓依赖，不建立 node_modules 联接、不递归清理；输出和命令日志保留供检查。
测试还核对两包快照一致、可信示例类四语 key 与参数／Python 规则不变，以及缺译文和占位符错误确实失败。
这不是软件宿主或完整 Python 生成器测试；应用内导入、四语交互、上传与离线重开仍单独验证。

旧 tools/ci/first-package.mjs 属于可选生成路径的脚本，不是手写教程的前置步骤。涉及复用依赖联接的环境不使用该脚本做清理或恢复。

## AI 辅助维护

仓库[产品维护 Skill](../.agents/skills/product-extension/SKILL.md)复用本手册、API和配置规则；它不会引入另一套作者格式，或将普通维护请求当作推送/发布授权。
