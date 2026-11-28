# Python 生成规则

产品类同步返回 getPython(): Record<string, PythonTemplate>。
每个可用 opcode 都要有规则，隐藏旧积木也不能省略；分组标题不是 opcode。
同一个类共享积木、四语和主控适配，当前只支持 Python，不提供 C 生成或编译能力。

[完整 API 示例包](examples/api-showcase/README.md#getpython-全字段与输出)提供所有字段、分支初始化和格式化后缀的真实写法与输出；代码旁逐项中文注释，不需要查看生成器实现。

## 所有模板字段

| 字段 | 类型 | 用途与限制 |
| - | - | - |
| template | string，必需 | 指令语句或表达式；入口可为空字符串，不能省略该字段 |
| imports | string[] | 仅在使用该积木时收集导入；相同字符串去重，不做参数占位替换 |
| variables | string[] | 参数替换后收集顶层初始化，按赋值左侧名称去重；同名普通初始化保留第一个 |
| forcedVariables | {name, code}[] | 用明确的 name 替换同名普通初始化；code 支持参数替换，慎用于设备共享对象 |
| setups | string[] | 顶层初始化语句，参数替换后按完整代码去重 |
| templateSelector | {argument, cases, matchInputCode?, variableCases?} | 根据参数选择 template；可按相同分支追加变量初始化，未命中不追加；不切换 imports、入口等其他字段 |
| deferredEmission | {after: string[], before: string[], template: string} | 在后续 next 链最后匹配语句后发射尾语句；包含值输入中的匹配，不进入分支栈；遇 before 截断，无匹配立即发射 |
| section | string | 入口约定 main / setup；setup 帽子下内容生成顶层语句，main 收集主函数 |
| launcher | string | 主函数启动语句，{MAIN} 为实际函数名，如 Hiwonder.startMain({MAIN}) |
| entryTemplate | string | 事件函数头；使用实际 SDK 签名，不含函数体积木 |
| entryFooter | string | 函数定义之后的注册语句；显式函数头须引用同名回调，若头部用 {MAIN}，注册也一致使用 {MAIN} |
| runtimeFiles | string[] | 当前原生链路仅保留字段，不会据此自动部署运行库、复制到设备或追加 import |

依赖按实际使用的积木收集。不要在构造函数中初始化所有设备，也不要无条件给全包添加全部 import。
getInfo() 与 getPython() 必须根据同一个 context.variant 选择驱动；只改端口菜单会导致错误代码。

光线与土壤模块保留机器人wonderlab分支，并提供板端hiwonder-iic分支：前者使用Hiwonder_DEV.Port，后者先建立Hiwonder_IIC.IIC，再传入iic和端口。土壤地址0x5A在板端是传感器构造器第三参数，在机器人端是Port第二参数，不可机械替换导入名。板端使用aiblocks_iicport的A–D端口与原aiblocksboard_*积木身份；主控支持和默认bindings仍由library/boards配置，不由软件推断。

颜色模块同样按variant同时选择初始化opcode、menu及驱动：hiwonder-iic使用aiblocks_colorsensor_init、aiblocks_iicport和Hiwonder_IIC.COLOR_RECOGNIZE_module(iic,port)；hiwonder-dev-port使用aimech_colorsensor_init、aimech_iicport和Hiwonder_DEV.DEV_COLOR_RECOGNIZE(Hiwonder_DEV.Port(port))；hiwonder-dev-port-aidoggy保留同一DEV构造器，但使用aidoggy_colorsensor_init及aidoggy_iicport。五AI端口为A–E/J/K，板端与AiDoggy为A–D，不能只因SDK相同复用菜单。颜色判断菜单原值为1/2/3，RGB通道索引为0/1/2；NUM仍为可接表达式的number输入。三个初始化积木复用相同四语文案，读取积木不隐式补初始化，板端总线与光线／土壤共享。

## 参数替换与字符串

参数声明 [TEXT]、arguments.TEXT 和模板 {TEXT} 必须使用相同名称。
普通字符串 shadow 由生成器产生 JSON 风格双引号和转义，因此：

~~~ts
getPython (): Record<string, PythonTemplate> {
    return {
        show_text: {template: 'print({TEXT})'},
        double_value: {template: '({VALUE} * 2)'},
        is_positive: {template: '({VALUE} > 0)'}
    };
}
~~~

TEXT 为 Hello 时，指令预期为 print("Hello")；VALUE 为 3 时，后两项分别为 (3 * 2) 和 (3 > 0)。
表达式不要自行包 print，否则接到其他积木会生成错误代码。
不要写 print("{TEXT}")，也不要为了去掉双引号给自由文本使用 literal。
引号、反斜线及换行交给生成器，不由作者逐个拼接；连接表达式时按 Python 运算优先级加括号。

### 已有格式化占位符

| 写法 | 结果 / 前提 |
| - | - |
| {COLOR.rgb} | 十六进制 RGB 分量，如 0xff,0x00,0x00 |
| {COLOR.colorName} | 兼容既有中文颜色名到英文名称的转换，不是任意翻译函数 |
| {MATRIX.bitmap} | 将点阵二进制内容生成位图参数；须配合实际控件 |
| {TEXT.compactJson} | 将静态字符串值还原后删除空白，再单次JSON编码；literal固定菜单直接使用原值，不接收运行时表达式，不适合普通用户文本 |
| {TEXT.jsonValue} | 对静态字符串值做 JSON 编码；不是任意动态表达式序列化 |
| {TEXT.identifier} | 将静态字符串转换为合法 Python 标识符，不适合运行时动态表达式 |
| {NAME.memberName} | 静态字符串解码后取工具路径最后一段，并规整为合法 Python 标识符；literal 固定菜单保留原值语义，不适合普通文本 |
| {PARAMS.compactHead} / {PARAMS.compactTail} | 删除 ASCII 空格后取首字符／剩余内容，供既有 MCP 参数列表插入使用；不解析或校验 Python，不用于任意用户文本 |

只支持现有格式名；未知格式不是表达式计算引擎。
资源、设备调用的完整使用例见[产品导航](README.md#产品维护示例)。

## 声明式延迟尾语句

`deferredEmission.after` 与 `before` 使用完整积木类型名（命名空间加 opcode），均为非空、无重复的静态字符串数组，`template` 为非空字符串。CLI 检查与单包编译使用同一校验，不接受动态规则或展开属性。

~~~ts
prepare: {
    template: 'session.configure()',
    deferredEmission: {
        after: ['demo_add_tool'],
        before: ['demo_prepare'],
        template: 'session.start()'
    }
}
~~~

先输出 prepare 本身，在同一后续链最后一个 add_tool（含嵌入值输入）之后输出 start；遇下一个 prepare 提前停止扫描。没有匹配时紧接 prepare 输出。禁用块不参与匹配；无关链不影响位置，每次生成独立计算。尾语句占位符使用声明它的初始化块参数，不读取目标块参数。生成器不依赖具体产品名或固件接口名。

## 初始化、去重与顺序

以下是纯 Python、无硬件依赖的增量规则示例，配套 getInfo() 需有 reset_demo 指令和 next_demo reporter：

~~~ts
reset_demo: {
    imports: ['import time'],
    variables: ['demo_values = []'],
    setups: ['demo_values.append("ready")'],
    template: 'demo_values.clear()'
},
next_demo: {
    variables: ['demo_values = []'],
    template: 'len(demo_values)'
}
~~~

两种积木都用到时，demo_values = [] 仅保留一份。导入、对象初始化和 setup 在主逻辑前输出：

~~~python
import time

# initialize variables
demo_values = []

demo_values.append("ready")
demo_values.clear()
~~~

同名变量的不同初始化不会自动报冲突：普通 variables 首个保留，forcedVariables 会强制替换。
因此独立设备应命名隔离，例如 sensor_{PORT}，不能让不同端口或模块都写 device = ...。
variables 中没有赋值时以整段文本为键；不要把依赖执行顺序的业务流程塞进变量区。
setups 按完整字符串去重，不按设备或函数名去重。

输出主要顺序为 imports → variables → 辅助函数 → setups → 入口函数 → 全部回调注册 → 主入口启动。
当前开发版在所有事件注册完成后才执行 launcher，不依赖帽子在画布上的排列顺序；旧软件需更新生成器才能获得该行为。
这里描述生成规则，不保证设备 SDK 的线程、时序或幂等性；真实硬件仍须测试。

## 菜单分支与主控分支

`acceptReporters: true` 的菜单在编辑器中使用扩展菜单 shadow 保存选项，字段名是菜单键；不要把测试用的父积木字段当成唯一真实输入。当前开发版按声明的菜单键读取 shadow，数字参数按数值生成，接入 reporter 时仍递归生成表达式。字符串参数保留字符串转义；`literal: true` 才直接使用作者约定的固定代码值。

同一个驱动内的枚举分支可用：

~~~ts
choose_text: {
    template: 'print("default")',
    templateSelector: {
        argument: 'MODE',
        cases: {'1': 'print("first")', '2': 'print("second")'}
    }
}
~~~

MODE 的原始菜单实际值为 2 时预期 print("second")；不是按翻译后的菜单 text 匹配。
matchInputCode: true 改为匹配已生成的参数代码，必须考虑数字和引号的精确形式。
分支可同时声明 `variableCases: {'1': ['first_tool = {...}'], '2': ['second_tool = {...}']}`，键必须来自 cases，值为字符串数组；只按当前选项追加初始化，再按变量名去重，不预先加入所有工具。公共 variables 仍会先收集。未声明 variableCases 的既有规则不变。
需要不同 import 或入口签名时，在 getPython() 内按 context.variant 返回整套规则。上述 MCP 格式器保留既有文本拼接语义，不验证作者提供的参数表或自动修正非法 Python；开发者仍需检查最终输出。
主控支持表、端口与默认值必须同步，详见[主控差异初始化](configuration.md#同一模块按主控选择初始化接口)。

## 入口与事件

### 主程序

将以下规则绑定到主程序 hat：

~~~ts
start_main: {
    imports: ['import Hiwonder', 'import time'],
    template: '',
    section: 'main',
    launcher: 'Hiwonder.startMain({MAIN})'
}
~~~

帽子下连接显示 Hello 的指令，预期核心输出为：

~~~python
import Hiwonder
import time

def start_main():
  print("Hello")

Hiwonder.startMain(start_main)
~~~

不是 @Hiwonder.start_main 装饰器。未指定 launcher 时使用直接函数调用；多个入口会生成 start_main、start_main1 等独立函数。
section: 'setup' 帽子下的内容在顶层执行，不套主函数。

### 自定义事件

下面用 Python 列表说明“定义后注册”的机制，不虚构设备 SDK：

~~~ts
on_demo: {
    template: '',
    section: 'main',
    variables: ['callbacks = []'],
    entryTemplate: 'def on_demo():',
    entryFooter: 'callbacks.append(on_demo)'
}
~~~

帽子下连接显示 Hello 时，预期结构为：

~~~python
# initialize variables
callbacks = []

def on_demo():
  print("Hello")

callbacks.append(on_demo)
~~~

此示例不主动触发回调；真实事件须依据实际 SDK 添加注册与启动规则。
自定义帽子必须声明 section: 'main' 才参与入口收集。显式函数头和注册处引用同一个回调名，重复帽子自动编号，注册语句同步变化；不要在函数头写 on_demo，却在注册处混用默认主入口占位符 {MAIN}。若需要占位符形式，可同时使用 entryTemplate: 'def {MAIN}():' 与 entryFooter: 'callbacks.append({MAIN})'。
指定 entryTemplate 后，不再自动套主入口 launcher。entryTemplate 和 entryFooter 支持参数替换，但作者负责合法签名。

## 温湿度的主控与菜单合同

温湿度模块的hiwonder-iic适配使用aiblocksboard_temphumi_init、aiblocks_iicport的A–D／1–4，生成import Hiwonder_IIC、共享iic = Hiwonder_IIC.IIC()及temphumi = Hiwonder_IIC.DEV_TH(iic,port)。五AI的hiwonder-dev-port使用aimech_temphumi_init、aimech_iicport的A–E/J/K，生成Hiwonder_DEV.DEV_TH(Hiwonder_DEV.Port(port))。AiDoggy的hiwonder-dev-port-aidoggy沿用aimech_temphumi_init与同一DEV构造器，仅PORT绑定aidoggy_iicport的A–D；不要套用颜色模块的AiDoggy独立opcode规则。

共享读取保留aimech_get_temp_and_humi和aimech_get_temp_or_humi。TEMPHUMI为string类型、literal且不可接reporter的temphumi菜单，温度0、湿度1，默认0；对应temphumi.read_Temp_Humi()及索引[0]／[1]，不是两个另取名字的SDK方法。读取不自动补初始化；板端总线与颜色／光线／土壤共用。既有AiDoggy共享菜单声明保留，实际PORT不得绑定五AI的J/K端口。

## Python 文件与交付边界

复杂模板可放模块 python/，再用 this.context.python('python/example.py') 读取；末尾空白会被 trimEnd() 去掉。
简单模板直接内联在同一个 index。不要按 opcode 机械拆文件，也不要依赖末尾换行拼接 Python。
python/ 被收集到 ZIP 不表示文件自动安装到硬件。runtimeFiles 当前不具备这条部署闭环；需设备已有运行库或另行明确的受支持流程。

模块检查验证编译、四语与资源，不执行软件生成器；打包成功不代表 Python 语法、SDK 兼容或设备行为已验证。
提交前还应在配套应用验证实际生成、缺失能力门禁、旧作品及语言切换不改代码；不能用 CLI 检查代替上传能力验收。

## 外接IMU的主控与菜单合同

input/imu-sensor的hiwonder-iic适配使用aiblocks_imu_init与aiblocks_iicport（A–D／1–4），显式生成import Hiwonder_IIC、共享iic = Hiwonder_IIC.IIC()和imu_sensor = Hiwonder_IIC.DEV_IMU(iic,port)。hiwonder-dev-port保留aimech_imu_init、aimech_iicport（A–E/J/K／1–5、9、10），生成import Hiwonder_DEV及imu_sensor = Hiwonder_DEV.DEV_IMU(Hiwonder_DEV.Port(port))。当前不为AiDoggy或miniHexa声明外接IMU支持。

两个VALUE参数都使用不可接reporter的euler_element字面量string菜单，默认0，原值顺序为Z轴0、X轴1、Y轴2，不能按XYZ重排。get_euler_angle_element_value输出imu_sensor.read_euler()[VALUE]，get_euler_angle输出整个read_euler()，get_euler_angle_element只输出索引本身。读取不隐式补初始化；外接imu_sensor不覆盖机器人主控自带imu的初始化或校准。板端与其他IIC输入共用一条总线声明。

当前初始化只声明PORT，不将旧课程残留CALI字段解释为外接传感器校准指令；未知适配直接拒绝，不回退到任一SDK。新增硬件或校准能力须另行定义产品参数和目标SDK合同。

## 旋钮、声音、雨滴与按键的主控适配

这四类输入的板端适配为hiwonder-iic，五AI机器人保留已登记的wonderlab适配名；wonderlab不是未知variant的默认SDK回退。未知适配直接拒绝。两族均只有PORT参数，使用string、literal且不可接reporter的端口下拉，默认1；板端aiblocks_iicport为A–D／1–4，机器人aimech_iicport为A–E/J/K／1–5、9、10。当前未为这四类输入声明AiDoggy或miniHexa支持。

| 模块 | 板端opcode | 机器人opcode | 驱动与读取 |
| - | - | - | - |
| input/knob | aiblocksboard_read_knob | aimech_read_knob | DEV_KNOB；knob.read_value() |
| input/sound-sensor | aiblocksboard_read_sound | aimech_read_sound | DEV_SOUND；sound.read_value() |
| input/rain-sensor | aiblocksboard_get_rain_drop_value | aimech_get_rain_drop_value | DEV_RAIN；板端raindrop.read_value()，机器人rain.read_value() |
| input/button-module | aiblocks_key_is_pressed | aimech_key_is_pressed | DEV_BUTTON；key.read_state()，布尔积木 |

板端读取积木被使用时收集import Hiwonder_IIC、共享iic = Hiwonder_IIC.IIC()及对象 = Hiwonder_IIC.DEV_*(iic,port)。机器人使用import Hiwonder_DEV及对象 = Hiwonder_DEV.DEV_*(Hiwonder_DEV.Port(port))。雨滴的板端对象名必须为raindrop，机器人为rain；其余对象分别为knob、sound、key。三种模拟值使用reporter，按键保持Boolean用于条件，不增加阈值或额外参数。

这些积木不新增独立初始化opcode，也不在仅加载模块时无条件生成设备对象；与IMU、颜色、温湿度的显式初始化合同区分。板端总线与其他IIC模块共用，不能按模块重复声明总线。
