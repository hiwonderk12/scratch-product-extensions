# 积木、菜单与控件

本页说明当前原生类可声明的界面能力。先完成[手写教程](getting-started.md)，再按需扩展同一个 src/index.ts。
这些声明用于编辑器与 Python 生成，不是设备执行方法。新增控件类型仍需软件本体支持。

## getInfo() 字段

每次调用同步返回 ExtensionInfo，显示文案此时通过 context.t() 读取，不在构造函数中固定翻译。

| 字段 | 类型 / 必需性 | 用途与约束 |
| - | - | - |
| id | string，必需 | 活跃 namespace；须在包声明与当前主控允许范围内，不随语言改变 |
| name | string，必需 | 工具箱名称；推荐 this.context.t(product.name)，与卡片同源 |
| color1 / color2 / color3 | string，可选 | 主色、次色、边框色，如 #3498db |
| blocks | 数组，必需 | 按显示顺序排列积木或分组标题；不输出空分类 |
| menus | 菜单名到菜单声明的对象，可选 | 参数通过 menu 引用，静态 items 同文件维护 |
| menuIconURI | string，可选 | 分类图标；使用 context.asset('assets/…') |
| blockIconURI | string，可选 | 默认积木图标；积木自身可覆盖 |

### 每个积木

| 字段 | 类型 / 必需性 | 用途与约束 |
| - | - | - |
| opcode | string，必需 | 稳定方法标识，完整保存类型为 id_opcode；同前缀不能重名 |
| blockType | string，必需 | 见下表；不要自行发明新类型 |
| text | string，必需 | 翻译后的积木文字；[TEXT] 对应参数名 TEXT |
| arguments | 参数对象，可选 | 参数名、类型、默认值和菜单 |
| blockIconURI | string，可选 | 此积木的资源图标 |
| disableMonitor | boolean，可选 | 禁用 reporter 的监视器入口；不会使舞台获得硬件读数 |
| hideFromPalette | boolean，可选 | 隐藏工具箱项但保留旧工程恢复和生成能力 |
| isEdgeActivated | boolean，可选 | 帽子运行时的边沿声明；不自动生成 Python 事件订阅 |

| blockType | 形状 / 生成语义 | 示例模板 |
| - | - | - |
| command | 上下可拼接的指令块，生成一条或多条语句 | print({TEXT}) |
| reporter | 圆角数值或文本表达式，可接入参数槽，不自行加 print | ({VALUE} * 2) |
| Boolean | 六边形布尔表达式，大小写敏感，使用 VM 标准值 Boolean | ({VALUE} > 0) |
| hat | 顶部帽子块，无上方接口、下接指令；程序入口或事件函数须另配生成规则 | 见[入口与事件](python-generation.md#入口与事件) |

当前作者协议不提供任意控制 C 形积木、动态 JS 菜单或实时设备读数 API。
帽子只声明形状不等于已实现硬件回调。不要为每个 opcode 再补一个空的 TS 执行方法。

blockType 区分大小写。SDK 类型和预览占位兼容代码虽还列有小写 boolean，但当前 VM 的六边形分支匹配 Boolean，不能据此前者推断界面正确。
新作者统一使用上表四个值：'command'、'reporter'、'Boolean'、'hat'。
可选生成命令使用小写参数 --type boolean，工具会输出标准 blockType: 'Boolean'；规格中参数 type: 'boolean' 也会输出 type: 'Boolean'，无需手工修正大小写。手写源码直接使用标准值。
Scratch 的 event、button、label、conditional、loop 等其他值不属于本库当前公开作者接口，不照搬使用。

例如同一类中声明一个正数判断，可以写成：

~~~ts
{
    opcode: 'is_positive',
    blockType: 'Boolean',
    text: this.context.t('block.is_positive'),
    arguments: {VALUE: {type: 'number', defaultValue: 1}},
    disableMonitor: true
}
~~~

messages 四语补齐 block.is_positive（均保留 [VALUE]），getPython() 配置 is_positive: {template: '({VALUE} > 0)'}。
它返回条件表达式，不是能接到上一条和下一条指令的 command。把相同规则改成 reporter 会改变形状；只改模板不改变积木类型。

## 参数与菜单

ExtensionArgument 的字段：

| 字段 | 类型 / 必需性 | 说明 |
| - | - | - |
| type | string，必需 | 现有控件类型；SDK 的宽字符串不是任意类型都可用的承诺 |
| defaultValue | string / number / boolean，必需 | 初始字段值；菜单需使用 value，不是显示文字 |
| menu | string，可选 | 引用 getInfo().menus 中的稳定菜单名 |
| literal | boolean，可选 | Python 生成时按字面代码拼入；仅限可信枚举或标识符，见下文 |

菜单为 {acceptReporters: boolean, items: [{text: string, value: string}]}。
text 可翻译，value、参数名和菜单名不翻译。acceptReporters 决定能否接入 reporter，和 literal 是否原样生成是两件事。
共享 namespace 下同名菜单必须有一致的文字、实际值、顺序与 acceptReporters；新菜单尽量使用模块特有的名称。

### 阅读手写示例中的菜单和表达式

以下摘录已包含在[详细注释的文本示例](examples/handwritten-text/src/index.ts)中，不是另一套产品类；不要向该参考包重复追加同名 opcode。新建其他积木时可以按这个模式修改名称、文案和规则。messages 四语对应项为：

~~~ts
// 各语言对象内部的新增项。
// zh-cn
'block.repeat_text': '将文本 [TEXT] 重复 [COUNT] 次',
'menu.repeat.once': '一次',
'menu.repeat.twice': '两次'
// en
'block.repeat_text': 'Repeat text [TEXT] [COUNT] times',
'menu.repeat.once': 'Once',
'menu.repeat.twice': 'Twice'
// zh-tw
'block.repeat_text': '將文字 [TEXT] 重複 [COUNT] 次',
'menu.repeat.once': '一次',
'menu.repeat.twice': '兩次'
// ko
'block.repeat_text': '텍스트 [TEXT]을(를) [COUNT]번 반복',
'menu.repeat.once': '한 번',
'menu.repeat.twice': '두 번'
~~~

getInfo().blocks 中的对应声明为：

~~~ts
{
    opcode: 'repeat_text',
    blockType: 'reporter',
    text: this.context.t('block.repeat_text'),
    arguments: {
        TEXT: {type: 'string', defaultValue: 'Hi'},
        COUNT: {type: 'number', defaultValue: 2, menu: 'textdemo_repeat_count'}
    }
}
~~~

同一 getInfo() 的对应菜单声明为：

~~~ts
menus: {
    textdemo_repeat_count: {
        acceptReporters: true,
        items: [
            {text: this.context.t('menu.repeat.once'), value: '1'},
            {text: this.context.t('menu.repeat.twice'), value: '2'}
        ]
    }
}
~~~

基础 getPython() 规则为 repeat_text: {template: '({TEXT} * {COUNT})'}；完整参考还增加 matchInputCode 分支演示，对 COUNT=1 作简化。
默认值对应的预期表达式是 ("Hi" * 2)，接入原 show_text 后预期为 print(("Hi" * 2))。
这是 Python 生成合同示例，不是浏览器执行方法。

### literal 的安全边界

普通字符串应交给生成器转义，不要设置 literal: true。
端口编号、可信 Python 枚举可按既有产品规则使用 literal，但菜单可接 reporter 时仍要考虑来源。
将自由文本设为 literal 会把用户输入作为 Python 代码拼接，可能造成代码注入；它不是“修复引号”的开关。
新硬件示例必须依据实际 SDK 确定端口值是否需要原样数字、标识符或带引号字符串。

## 已有参数控件

| 类型 | 用途与注意事项 |
| - | - |
| string / number / angle / Boolean | 文本、数值、角度、布尔连接；不要把 type 与 blockType 混淆 |
| color / note / matrix | 已有颜色、音符、基础矩阵 UI；note/matrix 的 Python shadow 取值尚不完整，见下文限制 |
| slider、slider100、slider90、slider127、slider150、slider150p、slider180、slider180z、slider360 | 已有专用滑块 |
| slider200、slider200p、slider255、slider270、slider8、slider30、slider2500、slider1000、slider1000p、slider0180、slider10 | 其他已有滑块；不要仅凭名字猜最小值、步进与范围 |
| square_color | 方形颜色；生成模板可使用 {COLOR.rgb} |
| largetext | 大文本；仍须按字符串或指定格式安全生成 |
| led_matrix | 点阵 shadow，保存 LEDMATRIX 二进制字符串，使用 {MATRIX.bitmap} |
| line4 / line6 / line8 | 巡线控件，保存 LINE4 / LINE6 / LINE8 两位十六进制字符串 |

点阵使用 16 列 × 8 行的 128 位字符串；作者参数名可以是 MATRIX，shadow 类型仍为 led_matrix。
巡线示例模板可用 0x{LINE}；实际参数名和位掩码意义以[四路巡线](../products/input/line-4/docs/README.md)等产品为准。
控件例子参见[点阵屏](../products/output/dot-matrix/docs/README.md)、[总线舵机](../products/power/bus-servo/docs/README.md)和[LED 超声波](../products/input/led-ultrasonic/docs/README.md)。
CLI 的普通积木生成器只覆盖基础类型；手写可以使用本表已有类型，但新增控件仍需软件实现。

UI 能声明不等于已完成代码生成：当前 note/MATRIX shadow 没有专门的 Python 读取分支，会回退默认值而非保证读取用户修改值。
[详细注释参考](examples/handwritten-text/src/index.ts)仅以注释列出 note、基础 matrix 的声明，不放进实际生成积木。
angle 使用 math_angle / NUM，可走通用回退但可能生成字符串；数值 SDK 调用需显式转换，示例用 float({ANGLE})。
这些是现有边界，不应以模板存在或编译通过冒充完整支持。

## 分组、资源与旧积木

普通标题直接放入 blocks：{subCategory: this.context.t('group.motion')}，并在 messages 补齐各语言。
ExtensionSubcategory 还支持 toolboxCategoryId、toolboxParentId、toolboxSubcategoryLabel 和 toolboxIconURI。
只有明确需要独立层级导航的产品才使用这些字段，规则见[层级分类](native-api.md#工具箱层级分类)；不要照抄 WonderLens 的分类 ID。

图标原文件放模块 assets/，在 metadata.icon 或 context.asset('assets/icon.svg') 引用，不手工转换成大段 base64。
隐藏旧积木须保留原 opcode、参数、菜单实际值及 getPython 规则；隐藏不是删除兼容。
新增积木后重建索引、编译检查并核对输出；发布版本规则见[版本手册](versions-and-projects.md)。
