# 带完整注释的手写参考包

主要阅读 [src/index.ts](src/index.ts)。它是原生类的写法索引，不是要求新产品复制所有演示积木。
从 show_text 开始，再按实际功能保留所需示例；不要为了接口覆盖给生产产品增加无用积木。
需要全部滑块、层级导航、分支初始化和三种主控适配时，使用独立的[完整 API 示例包](../api-showcase/README.md)；本目录保留较小的综合参考。
本目录就是完整作者包，可直接 `check ./docs/examples/handwritten-text`、`pack ./docs/examples/handwritten-text`（前缀 `node tools/cli/index.mjs`）。生成一个 ZIP 后直接导入，无需复制到 products 或制作配套主控，见[入门教程](../../getting-started.md)。

## 复制范围

如需改名开发，复制 metadata.json、src/、assets/ 和 python/ 到自己的作者目录，不要只复制 index；同步调整 SDK 类型导入路径。本页无需进入运行包：

~~~text
hello-text/
├─ metadata.json
├─ src/index.ts
├─ assets/text-demo.svg
└─ python/fixed-message.py
~~~

图标与模板都在类中实际引用；漏复制会被 check 拒绝。metadata.icon 指向同一原始图标。
源码仍只有一个主要 index，没有按 opcode 或功能拆 TS；唯一 Python 文件用于演示读取资源，不是每个积木都要单独建文件。

## 先看哪几段

| 写法 | 源码位置 / 示例积木 |
| - | - |
| 集中四语、名称与简介同源 | messages、product；逐语言维护全部 key 与占位符 |
| 构造、上下文、同步描述、可选清理 | constructor、getInfo、getPython、dispose |
| getInfo 全部普通字段 | 返回对象的 id/name/color1/2/3/menuIconURI/blockIconURI/blocks/menus |
| command / reporter / Boolean / hat | show_text、double_value、is_positive、start_thread |
| 参数 type/defaultValue/menu/literal | show_text、repeat_text、log_text、可选 read_light |
| 普通分组、独立根／子导航 | subCategory 生效；完整层级导航以注释给出替换方式，默认不启用 |
| disableMonitor / hideFromPalette / isEdgeActivated | double_value、old_show_text、start_thread |
| 数值菜单与固定枚举 | textdemo_repeat_count 允许 reporter；textdemo_case 不允许 |
| imports | log_text、pause、start_thread、可选 read_light |
| variables / setups | add_history：初始化列表与顶层准备，分别按变量名／完整语句去重 |
| forcedVariables.name / code | reset_history：强制替换同名初始化，不是每次运行前重建对象 |
| templateSelector.argument / cases / matchInputCode | choose_text 匹配原始枚举；repeat_text 匹配生成代码 |
| section / launcher | setup_demo 顶层；start_thread 主函数与启动调用 |
| entryTemplate / entryFooter | on_demo：显式 main 入口，函数定义后注册，同名回调的自动编号同步到注册语句 |
| context.asset / context.python / runtimeFiles | show_resource、类／积木图标；运行文件声明不代表设备部署 |
| context.variant / ports / defaultPort | 可选 hiwonder-dev-port 分支，同步改变端口、依赖和对象初始化 |
| 已有控件族 | show_controls、show_sliders、show_rgb、show_bitmap、line_masks、show_json |
| rgb / bitmap / jsonValue / compactJson / identifier / colorName | 对应生成规则均有实际写法；colorName 仅作旧值兼容参考 |

每个声明的字段含义直接写在源码旁，不必先阅读 CLI 实现。
更多约束见[类 API](../../native-api.md)、[积木与菜单](../../blocks-and-menus.md)、[Python 规则](../../python-generation.md)。

## 默认文本适配

入门配置的 variant 为 text-demo：不访问端口，不生成 read_light 积木，不连接硬件。
只使用 show_text，默认预期生成片段仍是：

~~~python
print("你好，课程")
~~~

类中有 SDK 入口示例，不表示每次生成都导入全部 SDK。只有实际使用 start_thread 帽子时才收集其 Hiwonder/time 依赖。
例如在该帽子下连接显示 Hello，核心程序结构为：

~~~python
import Hiwonder
import time

def start_main():
    print("Hello")

Hiwonder.startMain(start_main)
~~~

这段需要目标设备上的 Hiwonder SDK，不是普通桌面 Python 可直接运行的无依赖程序。
不要改成 @Hiwonder.start_main 装饰器，也不要在模板中把 {MAIN} 写死成 start_main；多个入口需要自动编号。
imports 中可按真实设备增加 Hiwonder_DEV，但本例把它留在实际使用 DEV_LIGHT 的可选适配里。

## 可选硬件端口适配

独立用户包在本目录 metadata.json 的 `support.products` 中填写对应主控适配，并在 `support.ports` 配置端口；完整示例见[独立包格式](../../standalone-package.md)。不要修改官方支持表或重打主控。只有在真实主控和固件确实提供 Hiwonder_DEV.DEV_LIGHT / Port 时才使用此分支。

以下仅展示官方库维护时 modules 对象中的旧配套配置位置，普通用户包不采用该外部配置方式：

~~~json
"output/hello-text": {
  "variant": "hiwonder-dev-port",
  "legacyNamespaces": ["textdemo"],
  "portGroups": {
    "sensor.aimech_iicport": {
      "bindings": {"textdemo_read_light.PORT": "1"}
    }
  }
}
~~~

这是 modules 对象中的单项，不是完整 JSON 文件；保留其余主控配置。
使用该例前，库的 ports 表须已有 sensor.aimech_iicport，且真实值包含 1。不要照抄到端口布局不同的主控。
修改支持与快照后，递增库配置及配套包版本，重新检查打包；规则见[版本手册](../../versions-and-projects.md)。

此时 read_light 使用 context.defaultPort('read_light', 'PORT', 'textdemo') 和 context.ports('sensor.aimech_iicport')，默认生成规则对应：

~~~python
import Hiwonder_DEV

# initialize variables
textdemo_light_1 = Hiwonder_DEV.DEV_LIGHT(Hiwonder_DEV.Port(1))
~~~

取值表达式为 textdemo_light_1.read_value()。端口不同会使用不同对象名，不会因都命名为 light 而被初始化去重覆盖。
这里只示范已知 DEV 驱动；其他主控的原始 IO、板载无参构造等必须按真实 SDK 另配分支，不能只换端口文字。
未知 variant 会报错，不能静默猜测设备接口。定向测试使用受控端口上下文，不是硬件或真实主控组合验收。

## 不要误用参考能力

- literal 仅用于可信闭合枚举或经过配置的代码端口；普通用户文本必须正常转义。
- Boolean 参数提供连接槽，不是默认勾选框；默认值用于生成回退，不能承诺显示一个勾选控件。
- note 和基础 matrix 虽能声明 UI，但当前 Python 生成器未专门读取 NOTE/MATRIX shadow 字段；源码仅给注释写法，不放入可用生成积木。angle 的通用回退可能产生字符串，示例用 float 显式转换。
- log_text 使用 Python logging；目标固件必须实际提供该模块，不能据此保证所有微控制器可运行。
- compactJson 会删除内容内部空格，jsonValue / identifier 仅接受静态字符串；不要将它们当任意表达式引擎。
- 旧颜色实际值和隐藏积木只演示兼容写法；没有既有课程合同的新包可以删去这些演示。
- runtimeFiles 不会自动部署 Python；show_resource 通过 context.python 读取并内联文件内容。
- dispose 没有硬件安全停机语义。本例没有自建资源，方法为空；若无清理职责可直接省略。
- 编译、检查和打包不证明设备接口、真实控件、应用内生成及上传可用；完整软件验收另做。

可执行 `node --test tools/ci/handwritten-package.test.mjs` 验证独立配套打包、四语规则、字段覆盖、资源及可选端口声明。
该测试只执行可信仓库示例，不是第三方包沙箱；不依赖软件 GUI，不操作硬件。
