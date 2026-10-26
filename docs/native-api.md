# 原生类与上下文 API

主路径是直接维护 TypeScript 类；从[手写第一个包](getting-started.md)开始，无须运行骨架或积木生成命令。
字段参考分为本页的类、上下文及元数据，[积木与菜单](blocks-and-menus.md)和[Python 生成](python-generation.md)。

需要边看代码边学习时，打开[详细注释的单文件参考](examples/handwritten-text/src/index.ts)及其[阅读与适配说明](examples/handwritten-text/README.md)：声明字段和全部 PythonTemplate 字段在源码旁解释，包含可选硬件端口分支；不必把所有演示积木复制到生产包。

光敏、土壤及其他基础输入模块位于 `products/input/`，RGB 模块位于 `products/output/rgb-module/`，机器人位于 `products/robots/`。已迁移模块直接导出 TypeScript 类，标准编译成 CommonJS，客户端实例化后消费 `getInfo()` 与 `getPython()`，没有并行维护的旧作者目录。

同一传感器可能因主控不同而使用不同初始化接口。主控支持条目配置 `variant`，类通过 `context.variant` 在同一个 index 中选择 Python 依赖和初始化规则；`context.ports()` / `defaultPort()` 只管理端口，不能代替驱动适配。具体职责和验收要求见[主控差异初始化](configuration.md#同一模块按主控选择初始化接口)。

## 检查与打包

**独立用户包**直接对目录执行 `check ./docs/examples/handwritten-text`、`pack ./docs/examples/handwritten-text`（命令前缀 `node tools/cli/index.mjs`），无需官方库配置。包内可通过 metadata.support 声明 products/default/ports，由同一类的 context.variant 选择生成规则，见[独立包合同](standalone-package.md)。

下面的模块 ID、库快照及配套版本章节只适用于**官方产品库维护**，不约束普通用户包。两类包复用下文的类、上下文和 Python 接口，不转换旧 manifest。

CLI 的创建、积木/菜单生成是可选辅助，见[CLI手册](cli.md)。手写和生成使用同一套类接口、检查及打包工具，没有第二套长期维护源。

Node.js 20 及以上。结构检查无外部依赖；编译检查和打包需要根 `package.json` 声明的 TypeScript、JSZip 开发依赖。首次开发按已有锁文件运行 `npm ci --ignore-scripts --no-audit --no-fund` 准备本库依赖，然后执行：

```sh
npm run ext -- check
npm run ext -- check input/light-sensor
npm run ext -- pack input/light-sensor
npm run ext -- pack input/soil-sensor
npm run ext -- check robots/aimech
npm run ext -- pack robots/aimech
```

`check <模块>` 使用标准 TypeScript 编译器检查并在内存中生成入口。`pack` 将相同结果和资源写入 `dist/wonderlab/<大类>/<模块>/<版本>/<模块>-<版本>.zip`，同版本已有文件时报错。命令不会发布远端文件、更新 catalog 或转换成旧格式。

## 版本与项目恢复

包身份为profile/moduleId/version，同版本内容不可覆盖。配置快照也是包内容，改变快照时需递增配套包版本。安装多个版本不会自动升级当前项目，固定恢复与明确切换规则见[包版本与项目恢复](versions-and-projects.md)。

## 作者接口

模块元数据示例：

```json
{
  "id": "light-sensor",
  "format": "hiwonder-native-extension",
  "formatVersion": 1,
  "apiVersion": 1,
  "version": "0.1.0",
  "namespace": "sensor",
  "mode": "python",
  "source": "src/index.ts",
  "entry": "index.cjs",
  "legacySources": []
}
```

`namespace` 保留旧完整类型的前缀。模块标识 `input/light-sensor` 与 VM 命名空间 `sensor` 各自独立；多个独立模块可以共享旧前缀。已迁模块的 `legacySources` 为空，索引直接从类声明盘点旧标识；此字段不进入压缩包。

```ts
import type {ExtensionContext, ExtensionInfo, NativeExtension} from '../../../../tools/sdk';

export const messages = {
    'zh-cn': {
        'product.name': '光线传感器',
        'block.aimech_read_light': '接口 [PORT] 光敏模拟值(0~100)'
    },
    en: {
        'product.name': 'Light sensor',
        'block.aimech_read_light': 'Port [PORT] light analog value (0~100)'
    },
    'zh-tw': {
        'product.name': '光線感測器',
        'block.aimech_read_light': '介面 [PORT] 光敏類比值（0~100）'
    },
    ko: {
        'product.name': '조도 센서',
        'block.aimech_read_light': '포트 [PORT] 조도 아날로그 값(0~100)'
    }
} as const;

export const product = {
    name: 'product.name',
    supportedLocales: ['zh-cn', 'en', 'zh-tw', 'ko']
} as const;

export default class LightSensorBlocks implements NativeExtension {
    constructor (private readonly context: ExtensionContext) {}

    getInfo (): ExtensionInfo {
        return {
            id: 'sensor',
            name: this.context.t(product.name),
            blocks: [{
                opcode: 'aimech_read_light',
                blockType: 'reporter',
                text: this.context.t('block.aimech_read_light'),
                arguments: {PORT: {
                    type: 'string', menu: 'aimech_iicport', literal: true,
                    defaultValue: this.context.defaultPort('aimech_read_light', 'PORT')
                }}
            }],
            menus: {aimech_iicport: {
                acceptReporters: false,
                items: this.context.ports('sensor.aimech_iicport')
            }}
        };
    }

    getPython () {
        return {aimech_read_light: {
            imports: ['import Hiwonder_DEV'],
            variables: ['light = Hiwonder_DEV.DEV_LIGHT(Hiwonder_DEV.Port({PORT}))'],
            template: 'light.read_value()'
        }};
    }
}
```

完整类型仍是 `sensor_aimech_read_light`，PORT 参数、`aimech_iicport` 菜单名及其实际值保持不变。`literal` 用于保留原数值端口生成语义；不要给任意用户文本设置此标志。

一个产品主要维护一个 `src/index.ts`：集中文案配置、类、菜单和简单 Python 都在这里。不按功能或 opcode 拆文件；复杂辅助函数或运行库才可放 `python/`，没有独立实现就不创建该目录。

Python 字段、占位符、去重和实际输出结构见[Python 生成规则](python-generation.md)，接口类型保存在 tools/sdk/index.d.ts。光敏等既有产品示例保留原 SDK 初始化和对象命名；新增多端口产品应明确隔离对象名，不能认为同名变量会自动合并成多个实例。依赖由用到该积木时收集，不无条件初始化全部硬件。

## 类方法与生命周期

| 方法 | 调用者、参数和返回值 | 职责与限制 |
| - | - | - |
| constructor(context) | 宿主以 new 默认导出类(context) 创建实例 | 保存 ExtensionContext，准备无副作用的内部状态；不打开串口、初始化设备或固定翻译 |
| getInfo() | 宿主同步调用，返回 ExtensionInfo | 描述当前适配的积木、菜单、颜色和图标；语言刷新及合并时可重复调用，不能返回 Promise |
| getPython() | 宿主同步调用，返回 opcode → PythonTemplate 对象 | 与 getInfo 使用同一适配分支；每个积木含字符串 template，不执行设备 Python |
| dispose() | 可选，无参数；返回 void 或 Promise<void> | 卸载、替换或已创建实例的失败回滚时清理自己持有的资源，宿主等待清理完成 |

dispose 的最小合法写法为 dispose (): void {}；没有自有资源就省略，不必添加空方法。
如果自己注册了监听，在 dispose 中解除同一监听；不要清理其他模块的对象或工程内容。
异步清理必须返回 Promise，不能发起后台清理后立即返回。清理异常会记录警告，不构成硬件安全停机保证。
构造函数自身抛错时尚无完整实例，不能指望 dispose 替它回滚外部操作。

Python 模式不按 opcode 调用作者的同名 TS 方法。舞台 reporter 返回空字符串，boolean 返回 false，command 不执行硬件。
新增积木只需补声明和生成规则，不要照搬 VM 实时运行扩展的硬件执行方法。

## context 方法参考

context 由软件根据所选主控、包资源和当前语言提供，不需要作者自己创建。
它不公开 VM、文件系统或设备连接 API；下列方法不能解释为相应权限授权。
除 dispose 外，下述读取方法均为同步。

### variant

- 用途：只读字符串，选择主控对应的驱动规则。
- 来源：主控支持条目的 variant；机器人包自身使用当前 profile，例如 wonderlab。
- 示例：const devDriver = this.context.variant === 'hiwonder-dev'; 在 getInfo/getPython 中据此共同选择参数和依赖。
- 常见错误：只分支 getInfo 的端口，不分支 getPython 的 import、构造参数和对象名。
- 限制：它不是主控型号自动探测器；允许哪些 variant 应在产品手册列明，未知值需明确报错而非猜测引脚。

### t(key)

- 用途：读取同 index 导出的集中 messages。
- 参数：稳定字符串 key；新作者写 this.context.t('block.show_text') 或 this.context.t(product.name)。
- 返回：当前界面语言的字符串。缺少相应译文时按语言别名、基础语言和中文兜底，不自动翻译。
- 示例：text: this.context.t('block.show_text')，在 getInfo() 内调用以支持实时切换。
- 常见错误：中文 key 缺失会报错；不能在构造函数中缓存最终译文，也不能翻译菜单 value。
- 限制：宿主兼容旧 LocalizedText 对象，但新作者检查要求集中字面量配置与静态 key，不接受动态拼 key。

完整四语 messages/product 示例见本页作者接口；声明的语言需覆盖全部 key、保留占位符数量和名称。
例如 en-US 先尝试精确译文再 en；ko-KR 可匹配 ko；zh-Hans/CN/SG 对应简中，zh-Hant/TW/HK 对应繁中。
未提供译文的语言回退中文，不改变参数值、Python 或包版本。

### ports(group)

- 用途：读取当前主控允许的端口组菜单。
- 参数：库配置中的完整组名字符串，例如 sensor.aimech_iicport。
- 返回：Array<{text: string; value: string}>；显示标签按当前语言解析，value 保持原值。
- 示例：items: this.context.ports('sensor.aimech_iicport')，放在 getInfo().menus 对应项。
- 常见错误：主控未配置该组会报错，不能通过调用方法绕过支持表。
- 限制：不创建端口、不验证实际接线，也不决定初始化驱动。

### defaultPort(opcode, argument, namespace?)

- 用途：读取当前主控、模块的默认参数绑定。
- 参数：积木 opcode、参数名，以及可选活跃 namespace；省略第三项时用 metadata.namespace。
- 返回：配置中的 string 端口值。
- 示例：defaultValue: this.context.defaultPort('aimech_read_light', 'PORT')，与上面的端口菜单配对。
- 常见错误：缺少 namespace_opcode.argument 绑定，或默认值不在端口组内，会报错。
- 限制：不会自动选择首个端口；多前缀适配时需传入本分支前缀，不能误用主前缀。

端口组及绑定的完整手写配置见[主控与端口](configuration.md)。菜单不是支持配置的替代物。

### asset(filename)

- 用途：取得已打包图片资源供图标等声明使用。
- 参数：模块根相对路径，使用 /，例如 assets/icon.svg；编译检查要求路径字符串字面量。
- 返回：资源字符串，图片在加载后为 data URI，不是设备路径或本机文件名。
- 示例：menuIconURI: this.context.asset('assets/icon.svg')；作者把原图保存为 assets/icon.svg。
- 常见错误：引用不存在、未收集的文件或目录外路径会报错；不应手工把原图编码进源码。
- 限制：不能当作任意二进制读取接口；默认收集 assets/ 中实际文件。

### python(filename)

- 用途：读取打包的 Python 文本作为复杂模板或规则片段。
- 参数：模块根相对路径字面量，例如 python/example.py。
- 返回：文本内容，经 trimEnd() 去除末尾空白。
- 示例：template: this.context.python('python/example.py')，对应文件放在模块的 python/ 目录。
- 常见错误：文件不存在、引用越界或依赖末尾换行拼接会失败或产生错误程序。
- 限制：读取和打包不等于向硬件部署，runtimeFiles 也不提供自动部署；简单 Python 仍直接内联。

asset/python 均拒绝绝对路径、.. 等越界引用。资源路径以模块根为起点，而非 src/。

## 包元数据字段

metadata.json 是作者输入；extension.json 是打包结果，不需手写另一套。

| 字段 | 说明 |
| - | - |
| id | 模块短标识，匹配所在目录名；完整 moduleId 由分类/目录确定 |
| format / formatVersion / apiVersion | 当前固定 hiwonder-native-extension / 1 / 1，不自行增加来宣称新能力 |
| version | 不可变内容的语义版本，重新发行有变化的内容须递增 |
| namespace | 默认完整积木前缀，不同于模块路径 |
| namespaces | 可选历史前缀数组，含主 namespace；下方说明互斥活跃分支 |
| mode | 当前为 python；不能只改成 c 就获得 C 后端 |
| kind | 机器人主控填写 robot，普通模块省略 |
| source / entry | 通常 src/index.ts / index.cjs，标准编译后直接加载类 |
| icon | 可选卡片图片路径，如 assets/icon.png；不向 catalog 重复维护图片 |
| legacySources | 已迁移原生包使用空数组，仅供源码检查，不进入发行包 |

名称、简介及 supportedLocales 来自 index 的 product/messages，不能在元数据和 catalog 中再维护一套翻译。
包还携带 library.json 固定配置快照，支持关系不写进类里硬编码主控名单。

## 手写、生成器与检查的不同边界

| 层次 | 实际边界 |
| - | - |
| 手写 TypeScript | 可写同文件辅助函数、适配分支及已有控件，不受普通积木生成器的 AST 编辑范围限制 |
| CLI 生成 | 只定点修改其理解的类/字段；遇动态返回或复杂分支应手写，不删分支来迁就生成器 |
| 作者静态检查 | messages/product 为导出的 const 字面量；t/asset/python 使用静态引用；索引用显式 opcode:、PORT: 等普通属性声明 |
| 编译打包 | 允许类型导入；当前只生成一个运行入口，不支持额外运行时 TS 入口、require npm 包或分文件运行依赖 |
| 软件宿主 | 校验命名空间、主控支持、菜单和重复 opcode；模块检查不能替代软件加载、Python 生成或上传验收 |

手写自由不表示静态检查能理解任意 TS：不要动态生成 opcode 或通过展开、计算属性构造导出的文案对象。
保持一个产品一个主要 index，避免为了缩短文件增加未经支持的运行期模块系统。

### 外部包信任边界

当前宿主执行原生 CommonJS 类，不是纯 JSON 解析，也不是安全沙箱。
context API 的范围不等于阻止恶意代码访问运行环境。检查和打包不会证明第三方源码可信。
只导入可信来源、可审阅的包；不要把不可信 ZIP 当安全样本执行，设备与上传验收另行进行。

## 按适配选择旧命名空间

单 namespace 包继续只声明 metadata.namespace，现有类无需改变。有多个历史前缀的包可额外声明 namespaces，例如风扇的主 namespace 为 actuator、namespaces 为 ["actuator", "display"]；数组必须非空、唯一并包含主 namespace，值只含字母或数字。

类仍使用标准 getInfo()，按 context.variant 返回一套 ExtensionInfo；每个分支显式写 id 字面量，并将该分支的 opcode 字面量就近放在声明中，便于无执行的静态索引校验。getPython() 必须返回同一分支规则，不创建多份产品包，也不转换旧 manifest。

客户端验证 getInfo.id 属于包的声明，并在主控配置提供 legacyNamespaces 时验证其允许范围；注册、Python、作品恢复、卡片定位和卸载都使用活跃 id。namespace 仅作为默认兼容前缀，不强迫所有驱动使用它。同一实例一次只启用一个前缀；这不是同时执行两套互斥驱动的 API。

defaultPort(opcode, argument, namespace?) 的第三参数可指定当前分支前缀，省略时使用 metadata.namespace。它只寻找当前主控支持条目的绑定，不自动添加端口或开放支持。实例见[风扇手册](../products/output/fan/docs/README.md)。

## 集中 i18n 配置

机器人及光敏、土壤原生包均提供简体中文、英文、繁体中文、韩文完整配置；新增产品仍按中文必需、额外语言按实际需求声明的通用规则维护。声明某种语言就必须覆盖全部 key，不能以中文回退代替完成。

`messages` 按语言集中维护，`getInfo()` 中用 `context.t('block.<opcode>')`、`context.t('menu.<菜单>.<实际值>')` 等稳定 key 引用。不要在每个积木中嵌入语言对象；菜单 value、参数名和 Python 不翻译。音符、数值、端口字母等语言无关内容直接写字符串。

`product.name` 和可选 `product.description` 保存文案 key，`supportedLocales` 声明已覆盖的语言。卡片与工具箱默认使用同一个名称 key。编译工具静态读取字面量配置，生成 `extension.json` 的多语言 name/description/supportedLocales；作者不在 `metadata.json` 重复维护名称、简介或译文，也不向 catalog 添加文字表。未声明的可选语言允许保留部分译文。

`check <模块>` 在标准编译前检查以下内容，并报告源码路径、文案 key 和语言：

- `messages['zh-cn']` 定义全部 key，文案非空，调用 key 必须存在。
- 其他语言的 key 必须有中文原文，不能独立定义未知 key。
- `supportedLocales` 包含 `zh-cn`；声明的每种语言覆盖全部 key，不能用中文回退冒充完整支持。
- 所有译文的 `[PORT]` 等占位符名称和次数与中文一致，可调整顺序。
- 语言代码采用小写连字符，如 `zh-cn`、`zh-tw`、`en`、`ko`；拒绝重复属性或非规范写法。
- 导出配置使用 const 字面量，不使用展开、动态计算或导入运行时代码；`t()` 参数是字符串 key 或 `product.name/description`。

运行时容忍语言请求的大小写和下划线，按精确代码、简繁别名、基础语言、中文兜底选择。`zh-Hant`/`zh-HK`/`zh-MO` 使用已有 `zh-tw`，`zh-Hans`/`zh-SG` 使用 `zh-cn`；显式脚本优先于地区，精确地区译文优先于别名。不自动生成或转换译文。

文案在每次 `getInfo()` 时解析。语言切换走客户端现有 VM 刷新链路，不重新加载包；参数、菜单实际值、旧作品和 Python 不随语言变化。新增普通积木主要在本文件添加中文 key、getInfo 声明和 getPython 规则，并按需补译文。

兼容已保存作品时可以声明 `hideFromPalette: true` 的旧积木：它只从工具箱隐藏，仍须保留 opcode、参数、菜单 shadow 和 getPython 规则。主控专用入口可以与隐藏旧别名共用生成规则；不要通过删旧类型或猜测重映射引脚完成适配。共享菜单的 text/value/顺序和 acceptReporters 必须一致，对象属性的书写顺序不应影响共存。

## 上下文与运行边界

### 工具箱层级分类

ExtensionInfo.blocks 支持 ExtensionBlock 与 ExtensionSubcategory 两种声明。普通产品使用仅含 subCategory 的内联标题；独立层级导航只用于有对应交互设计的产品，不自动把所有标题变成侧栏分类。

WonderLens 使用下面的根/子分类声明，文字取自同文件集中 messages：

```ts
const categories = [
    {
        subCategory: context.t('product.name'),
        toolboxCategoryId: 'sensor__wonder-lens',
        toolboxIconURI: context.asset('assets/cam.svg')
    },
    {
        subCategory: context.t('product.name') + ' · ' + context.t('group.wonder-lens-face'),
        toolboxCategoryId: 'sensor__wonder-lens__wonder-lens-face',
        toolboxParentId: 'sensor__wonder-lens',
        toolboxSubcategoryLabel: context.t('group.wonder-lens-face')
    }
];
```

| 字段 | 维护规则 |
| - | - |
| subCategory | 必填显示文字，普通标题或独立分类的完整名称 |
| toolboxCategoryId | 可选稳定 ID；有此字段才导出独立工具箱分类，不随语言改变 |
| toolboxParentId | 子分类指向同包的根 ID；根分类不填写 |
| toolboxSubcategoryLabel | 子分类的短显示名，随语言刷新，与 parent 一起填写 |
| toolboxIconURI | 可选根分类图标，通过 context.asset 读取已打包资源 |

每个分类后必须有实际积木，不输出空分类。宿主拼接同 namespace 模块时，若上一模块结束于独立分类、下一模块没有起始标题，会补该模块的普通内联标题，避免后续积木落入上一产品的末级分类。普通产品不因此获得 toolboxCategoryId 或 parent 字段；加载顺序、语言切换和卸载都不能改变旧 opcode 或分类归属。

WonderLens 的完整 11 子分类与三种驱动见[产品维护说明](../products/input/wonder-lens/docs/README.md)。新增模块不要复制其导航 ID。


### 机器人与高级生成

机器人包放在 `robots/<产品>`，元数据声明 `kind: "robot"`，库配置的 `products.<产品>.product` 指向该目录。机器人本身不用加入自己的 `modules` 支持列表，客户端可在未选择主控时加载它。

`getInfo().blocks` 可插入 `{subCategory: context.t('group.motion')}`，在同一工具箱内分组。布尔形状使用 VM 标准值 `blockType: 'Boolean'`；滑块、颜色等参数直接使用已有控件类型。菜单与积木在同文件维护，文字通过集中 messages 引用，参数名和菜单 value 不翻译。

`getPython()` 为每个 opcode 提供生成规则：

- `section: 'main'` 与 `launcher: 'Hiwonder.startMain({MAIN})'` 声明主程序。
- `section: 'setup'` 的帽子生成顶层初始化；`entryTemplate` / `entryFooter` 分别定义事件函数与回调注册。
- `templateSelector: {argument: 'WHEEL', cases: {'0': 'chassis.set_velocity({SPEED},{SPEED})'}}` 根据菜单值选择模板，未命中使用普通 `template`；示例 API 需按实际设备确认。
- `forcedVariables: [{name: 'imu', code: 'imu = Hiwonder.IMU()\nimu.calibrate()'}]` 按变量名替换普通初始化，保留设备校准规则；具体代码以产品定义为准。

Python 直接内联字符串；确有独立职责的复杂资源仍可使用 `context.python(path)`。资源引用必须存在并被打包，目录可选不会掩盖缺文件。增加已有类型的积木不需要修改软件解析器。

| 接口 | 行为 |
| - | - |
| `variant` | 当前主控支持配置中的适配标识 |
| `t('block.opcode')` | 从导出的 messages 取文案，按 VM 当前语言选择；未知 key 报错 |
| `ports(group)` | 从当前主控允许的端口组返回菜单，不在类中复制端口表 |
| `defaultPort(opcode, argument)` | 查完整旧类型/参数的默认值，值必须在端口组中 |
| `python(path)` | 读取包内独立模板，移除文件末尾换行 |
| `asset(path)` | 读取包内图片 data URI；路径相对模块根目录 |
| `dispose()`（类可选） | 卸载实例时释放其资源 |

多驱动模块需要同时在 `getInfo()` 与 `getPython()` 选择相同适配。数码管、IIC 风扇和 OLED 使用 `hiwonder-dev-port` / `hiwonder-iic`，每次仅返回当前初始化分支及其共用积木；源码保留全部旧 opcode，不把另一主控的初始化积木混入当前工具箱。未知适配直接报错。配置与驱动对应见[主控配置示例](configuration.md#数码管与-iic-风扇的适配示例)和[OLED 共用绘图](configuration.md#oled-的初始化与共用绘图)。

此版本只接入 Python 生成模式。舞台预览使用 reporter 空字符串、boolean false、command 空操作，不执行设备逻辑。当前入口仅使用类型导入和宿主上下文，不包含其他运行时 TS 依赖；菜单采用同文件的静态声明。

压缩包包含 `extension.json`、`index.cjs`、`library.json` 和实际存在的资源。`python/`、`assets/` 均可省略；已发行原生包的模板资源和语言对象写法仍可读取。客户端校验协议与 profile，直接加载类；同前缀的重复 opcode 或不一致的同名菜单会报错。若旧加载器已经占用 `sensor`，先移除旧传感器，再加载原生模块。

## 本地使用与旧作品

巡线类直接声明 line4/line6/line8 类型，运行时使用同名 shadow 和 LINE4/LINE6/LINE8 字段；Python 模板保留 0x{LINE}/0x{VALUE}。字段保存两位十六进制，不要将其模拟为父块普通文本，否则可能把 a～f 加上字符串引号。亮灭状态通过 templateSelector 保留 == 0/> 0 分支；通道位掩码不等于灰度通道连续编号。示例见[巡线产品手册入口](README.md)，八路没有真实公开支持项。

常规输入使用单 index、集中四语和内联 Python。颜色/IMU/温湿度/LED 超声波的初始化积木收集对象，其余读取/控制不隐式创建硬件；普通超声波在 reporter 中按端口收集 sonar_PORT。外接 imu_sensor、主控 imu、LED sonar 不能互相覆盖。LED 的 COLOR.rgb 与 slider255 保留真实控件生成，呼吸周期输入秒转毫秒。产品示例从[文档入口](README.md)进入；普通超声波当前无公开主控支持项。

点阵屏通过 getInfo/getPython 共同选择 DEV、AiDoggy DEV 端口或 IIC 分支；`{MATRIX.bitmap}` 生成位图，ledmatrix 的实际 Scratch shadow 为 led_matrix。RGB 灯带的 square_color 使用 `{COLOR.rgb}`，NUMS=15 为全部灯分支。MP3 的显式初始化和控制菜单分支保留旧规则。三包说明分别见[点阵屏](../products/output/dot-matrix/docs/README.md)、[灯带](../products/output/rgb-light/docs/README.md)、[MP3](../products/output/mp3/docs/README.md)，后两者没有实际主控开放配置。

在配套客户端选择受支持主控，再从“用户拓展”导入压缩包。支持关系来自包内配置；暂不支持当前主控的包可先保存为未加载状态。可独立加载、移除、删除或导出每个模块，缓存按 WonderLab/WonderCode profile 隔离。

机器人 ZIP 首次导入先保存为未加载状态，再点卡片“加载”。切换主控沿用清空当前积木的确认流程，移除已加载机器人同时卸载其模块；缓存文件仍保留。已加载同一机器人的 ZIP 可重新导入替换，配置快照冲突时保留原运行态。旧客户端内置产品入口仍独立保留，远端发行渠道尚未切换。

打开旧作品时，缓存中的已启用原生模块只有完整覆盖作品所需普通 opcode 才接管对应命名空间。作品还含有未迁移的旧积木时，继续走旧整包恢复，避免只恢复部分积木。已有端口值原样保留，不用新版默认值重写。

配套客户端已提供原生安装、项目版本锁与测试目录链路，规则见[版本手册](versions-and-projects.md)；CLI新建、普通积木/菜单生成及开发Skill可用，见[CLI手册](cli.md)。真实预览、更多维护命令、正式远端发行与人工/硬件验收仍是独立事项。未提供该协议的旧客户端不能读取这些新包。


## 原生候选目录

已有ZIP可用catalog命令生成独立的candidate目录，不再转成旧清单。参数、目录协议、HTTPS测试入口、版本校验与发行边界见[原生候选目录与下载](native-catalog.md)。
