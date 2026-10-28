# 手写第一个 TypeScript 积木包

目标：维护一个作者目录，检查并生成 **一个 ZIP**，在软件“用户拓展 → 导入本地库”选择该 ZIP，直接挂载积木并持久化。无需制作配套主控，不需要修改官方支持表，也没有用户包多版本选择流程。

当前只生成 Python；“显示文本”示例生成 `print(...)`，不代表 Scratch 舞台或设备屏幕会即时显示文字。

## 开始前

需要 TypeScript 基础、Node.js 20+ 和 npm。从公开仓库 `hiwonderk12/scratch-product-extensions` 的 **wonderlab** 分支取得源码，进入同时包含 package.json、package-lock.json、tools、docs 的仓库根目录。

~~~sh
git clone --branch wonderlab --single-branch https://github.com/hiwonderk12/scratch-product-extensions.git
cd scratch-product-extensions
git rev-parse HEAD
npm ci
~~~

不使用 Git 时，在网页选择 wonderlab 分支，Code → Download ZIP，解压后进入内层仓库目录。Windows 可在该目录的资源管理器地址栏输入 powershell 打开终端。不要直接导入 GitHub 源码 ZIP。

本页、SDK、工具和示例须来自同一修订。确认 `node tools/cli/index.mjs --help` 列出“check 作者目录 / pack 作者目录”；旧工具没有此能力，不能用旧配套打包流程冒充单包。当前为开发预览，最低正式软件发行版本尚未确认，旧版软件不支持此安装格式。

安装成功标志：命令正常结束，`node tools/cli/index.mjs --help` 能显示帮助。失败时保留完整错误、Node 版本及源码提交号，不删除锁文件或使用 npm update。

## 选择一个作者目录

最小入门包：`docs/examples/minimal-text`。完整注释参考：`docs/examples/handwritten-text`，包括菜单、资源、控件、入口、事件和 Python 字段。

可以原地检查，也可复制整个目录后修改；不要只复制 index。每个包仍主要维护一个 `src/index.ts`。

~~~text
my-extension/
├─ metadata.json
├─ src/index.ts
├─ assets/          可选，原始图片
└─ python/          可选，较复杂的 Python 资源
~~~

## 修改元数据与类

metadata.json 声明包身份、入口与可选适配。例如：

~~~json
{
  "id": "my-text",
  "format": "hiwonder-native-extension",
  "formatVersion": 1,
  "apiVersion": 1,
  "version": "0.0.1",
  "namespace": "mytext",
  "mode": "python",
  "source": "src/index.ts",
  "entry": "index.cjs"
}
~~~

- id 使用小写字母、数字、连字符；namespace 使用字母和数字，与 `getInfo().id` 一致，不占用官方或其他包的标识。已使用包的 namespace、opcode、参数名和菜单 value 应保持稳定。
- 默认 profile 为 wonderlab、category 为 output；需要时可显式填写。用户包不替换主控。
- version 是作者的说明信息；重新导入按同一模块替换当前内容，只保留一份，不要求协调主控版本或库配置版本。同版内容也可覆盖，建议自行使用 Git 留存历史。
- 不填写 library、libraryVersion；主控差异、端口和默认值写在包内 support，见[独立包格式](standalone-package.md)。没有 support 时 variant 为 default；完整参考的 metadata 已指定 text-demo。
- SDK 类型导入路径须指向当前源码副本的 tools/sdk；移动目录后同步调整，仅用于编译，不是运行期依赖。

修改 `src/index.ts` 中的集中 messages、`getInfo()` 与 `getPython()`。细节见[类 API](native-api.md)、[积木与菜单](blocks-and-menus.md)、[Python 规则](python-generation.md)。不需要为每个 Python opcode 再写一个 TS 硬件执行方法。

## 检查与打包

在仓库根目录直接检查目录，不执行创建、生成或 support 命令：

~~~sh
node tools/cli/index.mjs check ./docs/examples/minimal-text
node tools/cli/index.mjs pack ./docs/examples/minimal-text --output ./dist/my-text.zip
~~~

完整参考也可直接打包：

~~~sh
node tools/cli/index.mjs check ./docs/examples/handwritten-text
node tools/cli/index.mjs pack ./docs/examples/handwritten-text --output ./dist/handwritten-text.zip
~~~

成功标志：显示“独立用户拓展检查通过”和生成 ZIP 的绝对路径。重复打包更新同一个普通 ZIP 文件，不要求更改版本号或文件名；输出是目录或链接时拒绝覆盖。

工具只做标准 TypeScript → CommonJS 编译、提取类中的展示文案及收集原始资源；不转换成旧 JSON 积木声明。源码 ZIP 不能替代编译包。

## 导入、验证和重开

1. 使用支持独立用户包的当前软件构建，打开 Python 积木编辑器。
2. 打开“用户拓展 → 导入本地库”，选择刚生成的 **单个 ZIP**，不是包含若干 ZIP 的分发套件。
3. 导入成功后直接出现分类与积木，无硬件依赖的默认适配无需先选择主控。
4. 将“显示文本”接到可用的主程序／初始化帽子下，再核对 Python 包含 `print(...)`。散落的普通积木不转码；最小例只声明显示积木，不自带入口。如当前工程没有入口，使用完整参考的“当初始化时”，无需连接硬件。CLI 检查不替代应用内生成检查。
5. 切换简体中文、英文、繁体中文、韩文，确认文案改变但参数、菜单值和 Python 不变。
6. 保存项目、退出并断网重开：包资源来自桌面本地磁盘；项目按用户包标识使用已安装的当前内容，不锁定历史用户包版本。

重复导入同一模块会替换其当前包并刷新当前编辑器，不出现配套版本选择。请关闭其他打开的相关项目再更新，已有课程需要的 opcode 不应删除。卸载应用或删除本地包后，项目本身不携带可执行包，需重新导入可信作者提供的 ZIP。

原生包会执行作者 JavaScript，只导入可信来源。四语、硬件 SDK、资源部署、真实安装软件验收各有边界；能检查和打包不等于设备已验证。

官方产品库维护仍使用既有[主控配置](configuration.md)与[版本合同](versions-and-projects.md)，这些不是普通用户拓展的前置步骤。
