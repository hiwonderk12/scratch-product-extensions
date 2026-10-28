# 官方产品库的配套包维护参考

本页仅用于官方产品库维护，不是普通用户拓展开发流程。独立用户包请阅读[单包入门教程](getting-started.md)，不要为用户包执行本页的主控配套步骤。

目标：不用创建或生成命令，直接编写一个产品类，生成可一起使用的主控与文本模块 ZIP。
示例只生成 Python 文本，不调用硬件。完成打包不等于已在桌面或设备验收。

## 开始前：取得配套源码并找到根目录

需要会编辑 TypeScript、Node.js 20+ 和随 Node 提供的 npm，不需要硬件或软件主仓。
从公开仓库 <https://github.com/hiwonderk12/scratch-product-extensions> 取得 **wonderlab** 分支，勿选其他产品分支。

- 使用 Git：在自己的开发目录运行下列命令，再进入下载的目录。

~~~sh
git clone --branch wonderlab --single-branch https://github.com/hiwonderk12/scratch-product-extensions.git
cd scratch-product-extensions
git branch --show-current
git rev-parse HEAD
~~~

- 不使用 Git：在仓库网页选择 wonderlab 分支，点 Code → Download ZIP，解压后进入内层仓库目录。不要在 ZIP 内直接编辑，也不要停在多包一层的解压目录。
- 使用提供者给出的配套源码：核对其来源分支和提交号；若没有 Git 信息，保留提供者的版本说明。不能只看 package.json 的 version 判断工具修订。

本页、示例与工具必须来自同一份源码。若远端或旧副本没有 `docs/examples/minimal-text/src/index.ts`，先向提供者索取包含本教程的配套修订；不要把新教程混配旧工具，也不假定未发布内容已在 GitHub 可下载。

Windows 下，用资源管理器进入同时包含 package.json、package-lock.json、tools 和 library.config.json 的目录，在地址栏输入 powershell 后回车。在新终端核对：

~~~powershell
Get-Location
Test-Path package-lock.json
Test-Path tools/cli/index.mjs
Test-Path docs/examples/minimal-text/src/index.ts
node --version
npm --version
~~~

**成功标志**：三个 Test-Path 均为 True，Node 主版本至少为 20；Git 下载时分支为 wonderlab，完整提交号与提供者指定修订一致。
出现 False 先检查工作目录和源码版本；找不到 node/npm 则先完成 Node 安装，不要在其他项目目录安装本库依赖。

## 准备依赖

以下命令都在上述仓库根目录执行。按已有锁文件准备本库依赖；已有依赖时跳过安装：

~~~sh
npm ci --ignore-scripts --no-audit --no-fund
~~~

这是公开库的依赖安装，不需要软件主仓、GUI 构建或固件下载。不复制或联接其他项目的 node_modules。
保留锁文件，不用 npm update。此命令跳过安装生命周期脚本，不会构建 GUI 或部署设备；本教程的检查、打包不依赖这些脚本。

~~~sh
npm run ext -- --help
~~~

**成功标志**：安装命令正常结束，help 列出 check、pack-set 等命令。
失败时保留 npm 的完整错误；网络问题先检查下载条件，依赖冲突先核对锁文件与 Node 版本，不删除锁文件或换用软件主仓依赖。命令说明见 [CLI](cli.md)。

## 复制最小作者示例

只复制[最小 metadata.json](examples/minimal-text/metadata.json)和[最小 src/index.ts](examples/minimal-text/src/index.ts)，没有图片、Python 资源、端口、线程或事件：

~~~text
products/output/hello-text/
├─ metadata.json
└─ src/index.ts
~~~

Windows PowerShell 可使用下面的复制命令。目标已存在时停止，改用新的学习副本，不覆盖已有模块：

~~~powershell
New-Item -ItemType Directory -Path products/output/hello-text -ErrorAction Stop
Copy-Item docs/examples/minimal-text/metadata.json products/output/hello-text/metadata.json
Copy-Item -Recurse docs/examples/minimal-text/src products/output/hello-text/src
~~~

不用运行 new、generate 或 support add，也不用创建 spec。
示例的类型导入相对于上述目录；不要只复制类到任意深度后仍沿用原相对路径。

包的主要维护入口是一个 index：

- messages 集中维护简体中文、英文、繁体中文、韩文。
- product 指向显示名 key，声明完整支持的语言。
- getInfo() 声明 show_text 指令及字符串参数 TEXT。
- getPython() 将其绑定到 print({TEXT})。不要再给 {TEXT} 添加引号，生成器负责转义。

初次学习只改 TEXT 的 defaultValue 即可，例如改成“我的第一块积木”；四语标签仍在 messages 中集中维护。
**成功标志**：目录中只有上述两个文件，getInfo 只有一个 show_text，getPython 只有一条 print 规则，无须从大型参考中猜测该删什么。

更多形状、菜单和 Python 字段见[完整参考源码](examples/handwritten-text/src/index.ts)及[覆盖索引](examples/handwritten-text/README.md)。
它与最小例是同一教学身份的两种选择，不能作为两个同名模块同时复制、安装；不要用完整例覆盖已发行的同版本包。

metadata.json 维护身份与入口，不重复填写翻译表。
完整积木类型 textdemo_show_text 由 namespace 和 opcode 组成；发布后保留它以及参数名 TEXT。
新建其他模块要选择未被占用的稳定标识；修改旧包不能改标识来规避兼容工作。

## 手写主控支持配置

模块存在不代表主控已允许加载。本次只接入 AI机甲双驱车 aimech，先不学习其他主控和端口。
打开学习副本的 library/boards/aimech.json，找到 modules。修改前，它只有下面这一项（空白排版可以不同）：

~~~json
"modules": {
  "power/xarm": {
    "variant": "hiwonder",
    "legacyNamespaces": ["xarm"],
    "portGroups": {}
  }
}
~~~

修改后，完整文件如下；保留 power/xarm，在它后面加逗号和新条目，不要遗漏大括号：

~~~json
{
  "product": "robots/aimech",
  "extends": "library/support/ai-series.json",
  "modules": {
    "power/xarm": {
      "variant": "hiwonder",
      "legacyNamespaces": ["xarm"],
      "portGroups": {}
    },
    "output/hello-text": {
      "variant": "text-demo",
      "legacyNamespaces": ["textdemo"],
      "portGroups": {}
    }
  }
}
~~~

这次只需要照例填写三项：variant 使用 text-demo（本例的适配名称），legacyNamespaces 与 metadata.namespace 同为 textdemo，portGroups 留空，因为没有端口。
这些值不是硬件 SDK，也不是待翻译文案。**成功标志**：只为 aimech 增加 output/hello-text，原有配置不变。
若原文件已经不同，不要整体替换，先对照[主控与端口配置](configuration.md)保留已有条目。

不要为一次演示更改公共 ai-series 支持集，避免把模块无意开放给其他主控。

## 为变化的内容选择新版本

本次只改三个文件的 version，不改产品标识，也不手改索引。下表的“原版本”必须与配套源码一致：

| 文件 | 原版本 | 示例版本 |
| - | - | - |
| library.config.json | 0.0.1 | 0.0.2-demo.1 |
| products/robots/aimech/metadata.json | 0.0.1 | 0.0.2-demo.1 |
| products/output/hello-text/metadata.json | 新包 | 0.0.1 |

在前两个文件中找到 `"version": "原版本"`，仅把值改成表中示例版本；新模块的 0.0.1 已在复制的 metadata 内，无须再改。
**成功标志**：配置为 0.0.2-demo.1，主控为 0.0.2-demo.1，模块仍为 0.0.1；修改范围明确，没有降级或覆盖原主控版本。

选版规则：对本次演示的正式三段基线 x.y.z，使用 x.y.(z+1)-demo.1。已有预发行版、原版本与表不符或准备再次改已打包内容时，不猜新号、不照抄降级，按[版本与项目](versions-and-projects.md)选更高版本或取得本教程配套修订。
教程专项会核对表中原版本和真实基线，过期会失败，而不是静默继续。

为什么主控也要升级：主控包和模块包都包含库配置快照。增加支持关系改变了快照，不能用原主控版本重新发行不同内容。

其他已经启用的模块若需要与该新快照共存，也须递增版本、重新打包并加入配套。
本教程只用新主控与文本模块验证空白工程，不声称内置旧快照可直接混用。

## 检查作者源码与索引

在副本根目录执行：

~~~sh
npm run ext -- check output/hello-text
npm run ext -- check --write-indexes
npm run ext -- check
npm run ext -- check output/hello-text
~~~

第一条检查 TypeScript、集中四语与资源引用，不运行产品类或硬件。
索引生成只更新 library/modules.json 和 library/legacy-index.json，审阅差异中应增加新模块与 textdemo_show_text。
全库 check 校验目录、归属和支持配置，不代替模块编译，更不代替软件内生成。

**成功标志**：模块检查输出“原生类编译检查通过：output/hello-text”，全库检查输出“检查通过”；索引差异只有预期新模块与其完整类型。
失败时先按报错中的文件位置检查 JSON 逗号、四语 key／占位符或版本／支持条目；对照[类 API](native-api.md)和[配置说明](configuration.md)，不要跳过检查直接交付 ZIP。

## 生成同快照配套

先预览输出，再打包到尚不存在的目录：

~~~sh
npm run ext -- pack-set aimech output/hello-text --output dist/hello-text-demo --dry-run
npm run ext -- pack-set aimech output/hello-text --output dist/hello-text-demo
~~~

结果包括：

- aimech-0.0.2-demo.1.zip：配套主控。
- hello-text-0.0.1.zip：手写文本模块。
- package-set.json：版本、文件与配套关系说明，不是导入包。

**成功标志**：dry-run 输出“DRY-RUN：未写入文件”，真实打包输出“配套操作完成”；dist/hello-text-demo 中有上述三个文件，清单库配置版本为 0.0.2-demo.1。
打包失败时按 [CLI](cli.md)检查完整报错。提示目录已存在时换新的输出目录；提示缺支持或版本冲突时回到前两节修正，不单独交付模块或强行覆盖。

单包交付可用 npm run ext -- pack output/hello-text，但它不会生成主控配套。
重复打包不要覆盖已存在的版本目录；选择新的输出目录，内容变化时递增相关版本。
输出位置与更多参数见[CLI](cli.md)。

## 在配套软件验证

只下载源码或只成功打包，都不能证明软件支持该协议。
在[满足要求的桌面软件](importing.md)中，用空白项目分别导入两个 ZIP，选择配套主控版本，再添加文本模块。
加入“显示文本”积木，默认参数的预期生成片段是：

~~~python
print("你好，课程")
~~~

完整程序还会包含主控及项目其他积木的代码。这里给出生成合同，不代替应用内生成测试。
切换四语应只改变标签，不能改变 TEXT、包版本或 Python。
随后保存工程、退出并断网重开，确认素材、代码和版本恢复；按[导入验收清单](importing.md)核对。

**公开库开发闭环**到“独立检查通过并生成正确配套”为止。
**桌面验收**另行记录导入、四语交互、保存和离线恢复；桌面暂时不可运行不阻塞继续编写模块。

## 接着开发

- [类与上下文 API](native-api.md)：生命周期、资源、语言、端口与边界。
- [积木、菜单与控件](blocks-and-menus.md)：声明字段与可复制例子。
- [Python 生成规则](python-generation.md)：模板、依赖、分支与事件。
- [主控适配](configuration.md)：支持范围、初始化和端口配置。
- [可选 CLI 生成](cli.md)和[AI 辅助](ai-assisted.md)：也可生成同一个 index，不是开发前提。
