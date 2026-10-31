# 原生 TS 类完整 API 示例包

直接阅读 [src/index.ts](src/index.ts)：集中四语、一个产品类、逐字段中文注释，展示当前 SDK 的全部接口字段和可用 Python 规则。本包是功能参考，不是要求每个产品复制全部积木。

第一次开发请从[最小单积木](../minimal-text/src/index.ts)和[入门教程](../../getting-started.md)开始；[handwritten-text](../handwritten-text/README.md)保留作为较小的综合参考。本包使用独立身份 `output/api-showcase`／`apishowcase`，不与两个文本教学样例共用身份。

## 检查、打包、导入

在公开库根目录、已有依赖的终端运行：

```sh
node tools/cli/index.mjs check ./docs/examples/api-showcase
node tools/cli/index.mjs pack ./docs/examples/api-showcase --output dist/api-showcase/api-showcase-0.0.1.zip
```

成功标志：检查显示“独立用户拓展检查通过”；打包生成一个 ZIP。软件中打开“用户拓展 → 导入本地库”，确认可信来源后选择这个 ZIP，而不是把外层分发目录再压成 ZIP。源码会执行，不要导入不可信包，详见[导入与故障排查](../../importing.md)。

无需创建命令、生成器、配套主控、全库配置快照或远端 catalog。未选择主控时采用纯软件适配，生成 Python 文本，不在舞台即时显示，也不要求电脑安装硬件 SDK。编辑器中应先放“开始示例程序”帽子，再连接指令；散落的指令不是执行入口。

```text
api-showcase/
├─ metadata.json              包身份、资源路径与包内主控支持
├─ src/index.ts               唯一 TS 实现入口，含四语和内联 Python
├─ assets/api-showcase.svg    类与工具箱图标，原始 SVG
├─ assets/value.svg           单块／子导航图标
└─ python/resource-demo.py    演示 context.python 读取的 UTF-8 资源
```

改名开发时复制上述作者文件，并同步调整包 ID、namespace、端口组和绑定键、菜单名及模板变量前缀；仅改显示名称不会改变工程中的积木身份。移动目录后调整 SDK 的 `import type` 相对路径。只有类型导入会被擦除；不要添加第二个运行时 TS 入口。README 不需要打进运行包。

## 类、上下文和四语覆盖索引

接口的权威合同见 [SDK](../../../tools/sdk/index.d.ts)、[类 API](../../native-api.md)。本表定位代码，不建立另一套协议。

| 接口／字段 | 示例位置与含义 |
| - | - |
| `MessageCatalog` | `messages`：简体中文、英语、繁体中文、韩语的同一组 key；占位符完全一致 |
| `ProductDisplay.name/description/supportedLocales` | `product`：名称／简介引用集中 key，声明四语；不是第二份翻译 |
| `constructor(context)` | 宿主注入上下文，校验本包三种 variant；不建立硬件连接 |
| `getInfo()` | 同步返回积木声明；每次重新翻译，不缓存上次界面语言 |
| `getPython()` | 同步返回 opcode 对应规则；与界面语言无关，不在 TS 中执行 Python |
| `dispose()` | 可选清理钩子；本例返回 `Promise<void>`，注释展示同步 `void` 替代写法 |
| `context.variant` | 同一类选择软件、Port 包装或原始 IO 适配；不是编程语言 |
| `context.t(key)` | 翻译标题、积木和菜单文字；参数名、opcode、菜单实际值不翻译 |
| `context.ports(group)` | `getInfo().menus.apishowcase_port`：取得当前适配允许的端口菜单 |
| `context.defaultPort(opcode, argument, namespace?)` | `read_port`：取 `opcode.ARG` 默认绑定；第三参数显式指定 namespace，省略时使用包 namespace |
| `context.asset(filename)` | 返回包内图标资源 URI；传包根相对字面量路径，不手写 base64 |
| `context.python(filename)` | 读取包内 Python 文本并去掉末尾空白；不是部署或执行资源文件 |

`LocalizedText` 是 `{'zh-cn': string, [locale: string]: string}` 的兼容类型。宿主 `t` 的类型签名保留语言对象输入，但当前作者检查要求集中 key，**不要写 `context.t({'zh-cn': '文字', ...})`**，也不要通过别名绕过检查。兼容类型不代表新的作者推荐写法。

`dispose` 只释放本实例自己持有的资源。本例缓存只包含语言无关的 Python 文本，重复清理无害；清理不是硬件急停，也不保证进程崩溃时调用。

## 积木、分类和参数

### `blockType` 的所有公开取值

| 值 | 形状／生成用途 | 实例 |
| - | - | - |
| `'command'` | 上下连接的指令，生成语句 | `show_text` |
| `'reporter'` | 圆角数值／文本表达式，可接其他参数 | `double_value` |
| `'Boolean'` | 六边形条件表达式，标准拼写 | `is_positive` |
| `'hat'` | 帽子；入口、初始化或事件还需对应 Python 规则 | `start_thread`、`setup_demo`、`on_demo` |
| `'boolean'` | SDK 兼容输入；新声明用 `'Boolean'`，不依赖小写获得正确 UI 形状 | 只说明兼容，不另建重复积木 |

当前 SDK 没有公开循环／条件 C 形积木、自定义按钮等 VM 内部完整协议；不要照搬其他扩展 API 的字段后宣称支持。

### 声明字段覆盖

| 接口字段 | 本例写法／作用 |
| - | - |
| `ExtensionInfo.id/name` | `apishowcase` 与 metadata.namespace 一致；name 由集中四语读取 |
| `color1/color2/color3` | 主色、次色、边框色，使用十六进制颜色 |
| `menuIconURI/blockIconURI` | 类级菜单图标和积木默认图标 |
| `blocks/menus` | 按顺序声明积木与分组；菜单名引用对应菜单对象 |
| `ExtensionBlock.opcode/blockType/text/arguments` | `show_text`：稳定操作名、形状、含 `[TEXT]` 的文案、同名参数声明 |
| `ExtensionBlock.blockIconURI` | `show_text` 单独覆盖默认图标 |
| `disableMonitor` | `double_value/read_port`：不提供舞台实时监视 |
| `hideFromPalette` | `legacy_color`：不放入面板，仍保留旧积木及生成规则 |
| `isEdgeActivated` | 帽子上显式为 false；VM 声明不替代 Python 事件订阅 |
| `ExtensionSubcategory.subCategory` | 普通分组标题写法在源码注释；不带 toolbox 字段时不创建层级导航 |
| `toolboxCategoryId/toolboxParentId/toolboxSubcategoryLabel/toolboxIconURI` | 活动示例包含一个根导航和四个子导航；稳定 ID 不翻译，不建立空导航 |
| `ExtensionArgument.type/defaultValue` | 控件类型与初始输入；不是积木形状，也不声明滑块 min/max |
| `menu/literal` | `repeat_text` 允许 reporter；`log_text` 仅固定 Python 常量使用 `literal: true` |
| `menus.*.acceptReporters/items` | 是否允许表达式；每项 `{text, value}`，仅 text 翻译 |

`literal: true` 会原样参与代码生成，不负责转义。仅用于已限制的固定枚举、常量和端口；自由文本不得开启。

### 全部当前可生成控件

- `string/number/angle/Boolean/color`：`show_text`、`basic_controls`。角度例显式转换 `float`；Boolean 是条件槽，不是 command 的同义词。
- `square_color/led_matrix`：`rgb`／`bitmap`，分别演示 RGB 通道和 16×8 点阵的转换。
- `line4/line6/line8`：`line_masks`，默认十六进制掩码；不是普通文本颜色或二进制字符串。
- `largetext`：`json_value/compact_json`，多行文本不等于允许直接执行 Python。
- 五个 `sliders_*` 指令实际展示二十种滑块：`slider`、`slider100`、`slider90`、`slider127`、`slider150`、`slider150p`、`slider180`、`slider180z`、`slider360`、`slider200`、`slider200p`、`slider255`、`slider270`、`slider8`、`slider30`、`slider2500`、`slider1000`、`slider1000p`、`slider0180`、`slider10`。

滑块范围／步进由软件的对应 shadow 控件决定，不按名称推断硬件范围。`note` 和基础 `matrix` 的 UI 声明仅在源码注释列出，目前 Python shadow 读取未完整打通；不要把它们放进可运行示例冒充完成。`IMAGE` 不作为当前 SDK 的完整参数能力，使用资源图标接口。

## `getPython()` 全字段与输出

完整合同见 [Python 生成规则](../../python-generation.md)。只会收集工程实际使用积木的依赖与初始化；代码顺序由生成器组织，不按返回对象的 key 顺序运行。

| 字段 | 用途／示例 |
| - | - |
| `template` | 必需；语句或表达式。帽子仍写空字符串，函数体来自下方积木 |
| `imports` | `log_text/pause/start_thread/read_port`：依赖行，按完整行去重 |
| `variables` | `add_history/read_port`：顶层初始化，按变量名去重；端口名进入对象名以免合并不同接口 |
| `forcedVariables[].name/code` | `reset_history`：强制替换同名普通初始化；不是每次运行到积木都重建对象 |
| `setups` | `add_history`：主逻辑之前准备，按替换后的完整语句去重 |
| `templateSelector.argument/cases` | `choose_text`：按固定原始菜单值选模板；未命中用 `template` |
| `matchInputCode` | `repeat_text` 为 true，比较生成代码 `1/2`，不执行或计算表达式；普通枚举为 false |
| `variableCases` | `branch_store`：只收集命中分支的初始化；键对应 cases，避免两个设备都初始化 |
| `section` | `start_thread/on_demo` 使用 main；`setup_demo` 使用 setup，帽子下语句输出顶层 |
| `launcher` | 软件用 `{MAIN}()`；硬件用 `Hiwonder.startMain({MAIN})`，用于主入口启动 |
| `entryTemplate/entryFooter` | `on_demo`：显式函数头与定义后的回调注册；重复事件自动编号并同步注册名 |
| `runtimeFiles` | `show_resource`：保留运行资源声明；目前不自动部署、执行或添加 import |

### 文本与表达式

默认 `show_text` 接到 `start_thread` 下：

```python
import time

def start_main():
    print("Hello API")

start_main()
```

`double_value(3)` 接到显示积木时，函数体变为 `print((3 * 2))`；`is_positive(-1)` 对应 `print((-1 > 0))`。字符串输入由生成器转义，模板写 `print({TEXT})`，不再给 `{TEXT}` 加一层双引号。

### 分支初始化

`branch_store` 选择 counter 时只生成：

```python
apishowcase_counter = [0]
# 主函数内：
apishowcase_counter[0] += 1
```

不会顺带创建 `apishowcase_history`。菜单文字四语可变，值 `counter/history` 不变。`add_history` 与 `reset_history` 同时使用时，最终初始化是强制的 `apishowcase_history = []`，准备语句 `apishowcase_history.append("ready")` 只出现一次。

### 入口、初始化与回调

硬件适配的 `start_thread` 明确展示：

```ts
start_thread: {
    template: '',
    imports: ['import Hiwonder', 'import time', 'import Hiwonder_DEV'],
    launcher: 'Hiwonder.startMain({MAIN})',
    section: 'main'
}
```

`section: 'main'` 才使自定义帽子作为入口参与收集；仅写 `entryTemplate` 不够。事件示例显式定义 `on_api_demo`，注册同名回调；重复帽子生成 `on_api_demo1`，注册语句也同步改名。不要把显式函数头和用于默认主入口命名的 `{MAIN}` 注册混搭。若需要 `{MAIN}` 写法，函数头和注册处应一致使用该占位符。

回调列表只演示机制，必须再连接“调用示例回调”才触发，不虚构真实设备事件。`setup_demo` 下语句在顶层执行；自定义事件不会自动套普通主入口 launcher。

### 全部格式化后缀

下表为实际默认参数产生的局部结果；完整文件还包含依赖、初始化和入口。

| 后缀 | 积木／默认结果 |
| - | - |
| `.rgb` | `rgb`：`print(0xff,0x00,0x00)` |
| `.bitmap` | `bitmap`：128 个零转为 16 个 `0x0`，以逗号连接传给 print |
| `.jsonValue` | `json_value`：`print("{\"text\": \"Hello API\"}")`，静态文本重新编码，不解析为任意运行对象 |
| `.compactJson` | `compact_json`：`print("\"AB\"")`；兼容语义会删除字符串内部空白并再次编码，不能当普通 JSON 格式化 |
| `.identifier` | `assign_named`：`demo_value = 3`，静态名称规范化为 Python 标识符 |
| `.memberName` | `member_name`：固定菜单 `demo.move` → `apishowcase_move = 3`；不负责修复任意非法名称 |
| `.compactHead/.compactTail` | `insert_parameters`：固定菜单 `[1, 2]` → `print([0,1,2])`；不是通用列表解析器 |
| `.colorName` | 隐藏的 `legacy_color`：旧值 `红` → `'red'`；不是菜单文字国际化 |

## 包内主控适配与 metadata 字段

JSON 不能写注释，所以下表解释 [metadata.json](metadata.json) 的全部字段。新用户包只需维护自己的支持，不修改官方库支持表。

| 字段 | 本包值／作用 |
| - | - |
| `id/category/namespace/version` | `api-showcase/output/apishowcase/0.0.1`：目录身份、积木前缀和作者版本 |
| `format/formatVersion/apiVersion` | 原生包协议名、格式及接口版本，照当前合同使用，不随产品版本递增 |
| `profile/mode` | `wonderlab/python`；当前只支持 Python，不声明空 C 规则 |
| `source/entry` | `src/index.ts/index.cjs`：作者入口和编译入口；不要交付未编译 TS 代替运行入口 |
| `icon` | 包根相对原始 SVG；图片保存在 assets 而不是序列化大对象 |
| `legacySources` | 空数组，本新包没有要保留的历史源码路径 |
| `support.default` | 没有产品专项时采用纯软件演示，**不代表硬件普适** |
| `support.products.*.variant` | 指定产品时选适配，由 class 同时切换端口和代码规则 |
| `portGroups.*.bindings` | 完整 `namespace_opcode.ARG` → 默认端口值；默认必须在该组菜单中 |
| `support.ports.*[].label/value` | 包内菜单，label 可四语、value 稳定；端口组键需与 class 匹配 |

`installation: 'standalone'` 与 `moduleId` 由工具生成，名称／简介由源码 `product` 与 `messages` 生成，不再维护重复文案。

| 当前产品 | variant／默认端口 | 依赖、初始化及读取 |
| - | - | - |
| 未指定／其他 | software／1 | `import math`；`apishowcase_virtual_1 = math.sqrt(1)`；读取该模拟变量 |
| aimech | hiwonder-dev-port／1（A） | `import Hiwonder_DEV`；`DEV_IR(Hiwonder_DEV.Port(1))`；`.read_state()` |
| minihexa | hiwonder-dev-raw-io／32 | `import Hiwonder_DEV`；`DEV_IR(32)`；`.read()` |

同一个 `read_port` 保留积木身份，但初始化随主控变化。代码片段以 `Hiwonder_DEV.` 限定构造函数，完整写法见源码。两个端口生成不同对象名；端口2不会被端口1的变量去重吞掉。硬件分支是既有接口写法参考，需真实 SDK 和设备验证；不改变官方主控的公开支持范围。

## 验证与边界

公开库可运行 `node --test tools/ci/api-showcase.test.mjs`：真实编译／ZIP，逐项核对 SDK 字段与四语、三种适配、全部控件及格式化声明。SDK 新增字段时，覆盖测试会提示补示例，不把“所有 API”当长期不变的口号。

这些检查不证明真实编辑器控件的视觉效果、设备 SDK 安装、上传或硬件行为。当前示例仅 Python；普通 TS 方法不是硬件运行函数，也不需要每个 opcode 再实现一个 TS 执行方法。版本锁、官方历史 catalog、设备部署和多目标引擎分别查对应手册，不混入普通用户包的创建前提。
