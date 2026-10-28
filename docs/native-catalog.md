# 官方 Release、版本索引与原生下载

面向维护官方产品包和课程的开发人员。先阅读[原生类接口](native-api.md)和[版本与项目恢复](versions-and-projects.md)。本页说明正式／候选索引合同，不表示资源已经上传，也不授权发布。

## 职责分离

初始版本联调参见[0.0.1 测试基线上传与切版](releases/wonderlab-initial-v0.0.1-test.md)。它使用独立测试目录，不覆盖旧正式根或产品发行历史。

- 源码索引library/modules.json描述源码目录；catalog.json描述可下载的包版本，两者不互相替代。
- 平铺发行目录／产品历史使用 formatVersion 2；新的分层总目录使用 formatVersion 3，只引用各产品历史，不复制积木或图片。
- 名称、简介、四语、图片、主控支持、端口和适配配置来自原生ZIP，不在目录重复维护。
- ZIP直接包含CommonJS类、extension.json、library.json与资源，不转换为旧清单，不要求SHA256字段。
- 安装仍执行版本不可变检查。HTTPS和不要求摘要不等于代码可信；只安装自己审阅过或可信维护者提供的包。

## 分层目录：总目录管理产品，产品目录管理历史

产品历史的唯一维护源是 `products/<分类>/<产品>/catalog.json`；根索引由工具派生。分层根只登记产品，兼容平铺根登记历史身份。ZIP 仍放在对应 GitHub Release，本地 `dist/` 只是忽略的暂存目录；源码仍只有最新的一个主要 `src/index.ts`。

根目录示例（formatVersion 3）：

~~~json
{
  "formatVersion": 3,
  "profile": "wonderlab",
  "status": "published",
  "products": [
    {
      "moduleId": "input/light-sensor",
      "catalog": "products/input/light-sensor/catalog.json"
    }
  ]
}
~~~

对应产品历史（formatVersion 2，增加明确的 moduleId）：

~~~json
{
  "formatVersion": 2,
  "profile": "wonderlab",
  "status": "published",
  "moduleId": "input/light-sensor",
  "packages": [
    {
      "moduleId": "input/light-sensor",
      "version": "0.1.0",
      "libraryVersion": "0.1.11",
      "status": "published",
      "tag": "wonderlab-library-v0.1.11",
      "asset": "light-sensor-0.1.0.zip",
      "downloadUrl": "https://github.com/hiwonderk12/scratch-product-extensions/releases/download/wonderlab-library-v0.1.11/light-sensor-0.1.0.zip"
    }
  ]
}
~~~

这些说明结构，不构成线上可访问性证明。历史追加在产品的 `packages[]`，根条目不随该产品增加版本而复制；根、产品顶层和每条历史的身份／profile 必须匹配。子目录只能是示例中的同源固定相对路径，不能跨站、使用绝对 URL 或递归引用下一级总目录。

新版宿主已实现双层读取，仍兼容原平铺目录。检查版本时最多并发读取四个产品，当前一次完整加载最多 256 个产品、整棵 JSON 合计 1 MiB；所有产品成功才更新界面和缓存。任一产品失败保留旧的完整索引，不能把其他产品的局部结果显示成检查成功。后续可按产品优化刷新，但当前不是按需懒加载。候选许可逐层检查；候选根不能借正式子目录去掉候选标记。

缓存保存校验后的平铺身份集合，来源仍归属于用户选择的根 URL；不缓存类、ZIP 或图片。选版、版本锁、离线恢复与用户独立包规则不变。

### 当前可用的迁移预览

~~~sh
node tools/cli/index.mjs catalog --split catalog.json --output-dir dist/catalog-products-preview
~~~

输出父目录必须已存在，输出目录必须不存在，路径不得含目录联接。命令对照产品 catalog 验证平铺基线，再在新目录生成根索引和每产品历史；保留版本、库版本、状态、原下载地址、tag 和维护说明。不读取旧 ZIP、不从当前源码重造历史，也不允许混用 `--status` 或其他生成参数。它不覆盖仓库根目录或产品目录，不上传／发布；写入失败的预览不能拿去发布。

**切换边界**：产品 catalog 已是唯一历史维护源，不再保留 `release.json`。仓库正式根目前仍是平铺 formatVersion 2 的兼容派生产物，未自动切换线上入口。工具已支持从产品历史生成根索引、校验新 ZIP 并输出追加提案；提案不会直接改作者源或正式索引。

旧客户端不认识 formatVersion 3。先用独立测试根文件联调，再明确软件兼容版本和升级路径，之后才能激活正式根；单独复制一份旧索引并不能让硬编码旧入口的客户端自动兼容。正式切换及上传仍须人工确认，本命令不执行。

## 兼容平铺发行：Release 保存 ZIP，一个 JSON 记录版本

现有平铺格式继续兼容，以下示例描述当前正式根的派生产物；产品历史已分目录维护，但正式根尚未激活 v3。各版本 ZIP 上传到 GitHub 对应 Release，一个根索引汇总仍需提供的版本：

~~~json
{
  "formatVersion": 2,
  "profile": "wonderlab",
  "status": "candidate",
  "packages": [
    {
      "moduleId": "input/light-sensor",
      "version": "1.0.0",
      "libraryVersion": "1.0.0",
      "status": "candidate",
      "asset": "light-sensor-1.0.0.zip",
      "downloadUrl": "https://github.com/hiwonderk12/scratch-product-extensions/releases/download/wonderlab-1.0.0/light-sensor-1.0.0.zip"
    },
    {
      "moduleId": "input/light-sensor",
      "version": "1.0.1",
      "libraryVersion": "1.0.0",
      "status": "candidate",
      "asset": "light-sensor-1.0.1.zip",
      "downloadUrl": "https://github.com/hiwonderk12/scratch-product-extensions/releases/download/wonderlab-1.0.1/light-sensor-1.0.1.zip"
    }
  ]
}
~~~

这些是格式示例，不表示对应 Release 已存在。新旧版本可以使用不同 Release 地址，无须搬动旧 ZIP。索引仅记录身份、版本、状态和地址，不放图片、积木声明或全库主控配置。

### 最新源码与历史资源如何保存

同一产品只维护当前最新的 `src/index.ts` class、四语和资源，不在源码目录复制 `v1/`、`v2/` 等历史实现。旧课程恢复使用当时打包的 ZIP，不用最新源码重新生成旧版本。

| 位置 | 保存内容 | 是否提交 Git |
| - | - | - |
| `products/<分类>/<产品>/metadata.json`、`src/index.ts`、资源 | 最新作者版本 | 是 |
| 产品 `catalog.json` | 唯一历史维护源：包版本、库版本、Release tag、资产名、地址、状态及可选 notes | 是 |
| 根 `catalog.json` | 从产品历史派生；当前正式 v2 保持旧客户端兼容，v3 根先独立联调 | 是 |
| `dist/release-assets/<tag>/<asset>.zip` | 本机打包及上传暂存文件；`.gitignore` 已忽略整个 `dist/` | 否 |
| GitHub 对应 Release 的单包资产 | 不可变的历史可安装 ZIP，保留包内原库配置快照 | 不作为 Git 源文件；人工上传 |

兼容格式及分层产品历史都使用 `formatVersion: 2` 的平铺 `packages[]`：同一个 `moduleId` 可有多条不同 `version`，不另建 latest 索引或扫描所有 Release。新分层根使用 version 3 区分产品引用，不能在 version 2 上改字段冒充兼容。`moduleId@version` 在当前 profile 中唯一；正式发布输入中各条目也必须 published。

- `version` 是该 ZIP 的产品版本，不是最新源码版本，也不是集合 tag。
- `libraryVersion` 来自该 ZIP 原有的库快照，不能把历史条目批量改成当前 `library/config.json` 的版本。
- `asset` 是 Release 内资产名；`downloadUrl` 是目标仓库固定的 HTTPS Release 下载地址。不得填写 `D:\\...`、本机 `dist/`、blob 页面或临时签名 URL。
- 新版本追加新身份。已有身份的 tag、资产、下载地址与 ZIP 内容保持不变，不重新打包后覆盖原版。更新总索引时保留旧条目，不只保留最高版本；也不要删除旧 tag 或资产。
- 同版不同内容仍按官方不可变规则拒绝覆盖。普通用户独立包的单份覆盖规则不受这里的历史索引约束。

根索引是软件版本发现入口；分层根会进一步读取产品历史。不要恢复重复的 `release.json`，检查工具会拒绝两份维护源。软件缓存的是上次完整校验的目录，已安装存储保存的才是真正可执行的包，两者都不替代 GitHub 的历史资产。

维护顺序：

1. 修改产品单 index 类和 metadata.version，检查并打包。纯积木或文案变化不要求机械递增库配置版本；支持关系、端口或适配改变时才按[配置合同](configuration.md)处理。
2. 在对应 Release 上传单个模块 ZIP，而不是把多个 ZIP 再压成一个分发包。文件名须与 asset 和下载地址完全一致。
3. 使用下文 `release add` 校验新 ZIP 并生成产品历史追加提案；审阅后更新唯一产品源，再派生根索引。保留旧版本及原地址，候选提案不能直接替换已激活的正式产品历史。
4. 首轮使用 candidate，显式勾选“允许候选包”。GitHub Release 是否为预发行与本协议的 candidate 是两个独立设置，不能互相代替。
5. 上传 ZIP 后再上传索引。GitHub Raw 能直接返回 JSON、资源匿名可下载后，再交给软件检查。不要填写 GitHub blob 页面、登录页、草稿资源或临时签名跳转地址。

首次联调可把这个 JSON 以 catalog-demo.json 上传到 wonderlab 分支，在软件中手动选择其 Raw 地址，不覆盖正式 catalog.json。验收完成后再决定正式索引与 published 状态，本工具不替用户发布。

用户独立包仍按[一个目录、一个 ZIP](standalone-package.md)导入与覆盖，不要求登记官方索引或维护 Release 历史。

## 从既有ZIP生成候选目录

先用已有pack命令打包需要的模块。catalog命令只读取已经存在的ZIP，不重新编译、不修改包、不上传、不发布。

~~~sh
node tools/cli/index.mjs catalog --input candidate-resources --base-url https://example.invalid/extensions/candidate/ --output candidate-catalog.json
~~~

三个参数都必需。input目录递归查找ZIP，不允许符号链接；目录及文件名须以字母或数字开头，其余由字母、数字、点、下划线或连字符组成。output的父目录须已存在，已存在的文件拒绝覆盖，因此不能直接覆盖仓库现有catalog.json。生成结果始终为candidate，不能用该命令标记正式发布。

工具从每个ZIP读取身份和库快照，检查profile、版本、入口与配置文件、重复模块版本及同库版本的完整快照一致性。不会执行包内类。空集合、旧格式ZIP、其他软件系列、重复身份、快照冲突或不安全URL会失败。

base-url为HTTPS资源目录，ZIP相对于input的路径会原样逐段编码并拼接到该目录。example.invalid仅是占位地址，不能下载。若使用不支持子目录的Release资产，应先把原始ZIP整理到平铺暂存目录，使用互不冲突的文件名；整理不应修改ZIP内容。真实资源必须先按这些路径上传并可访问，再分享候选目录。

## 目录协议

~~~json
{
  "formatVersion": 2,
  "profile": "wonderlab",
  "status": "candidate",
  "packages": [
    {
      "moduleId": "input/light-sensor",
      "version": "1.0.0",
      "libraryVersion": "1.0.0",
      "status": "candidate",
      "asset": "light-sensor-1.0.0.zip",
      "downloadUrl": "https://example.invalid/extensions/candidate/light-sensor-1.0.0.zip"
    }
  ]
}
~~~

示例版本不是当前产品发行版本。moduleId及其version在同一profile中唯一；version和libraryVersion使用三段版本号，可带预发行后缀。asset是单个ZIP文件名，downloadUrl是无账号、密码和片段的绝对HTTPS地址。

客户端默认只接受published；candidate必须明确启用测试渠道。development只允许空packages，表示没有可安装资源，不代表下载功能已经发布。候选目录内的条目不能通过写成published来绕过候选授权。草稿或其他不支持状态不会静默升级为可安装。

## 在编辑器验证

1. WonderLab 的“检查版本”读取 wonderlab 分支根 catalog.json；新版宿主支持平铺 version 2 和分层 version 3，当前正式文件仍是 version 2，不再请求旧仓库。默认仅允许 published；空 development 目录会提示暂无可安装版本，不表示已是最新版。
2. 在主控扩展或模块扩展页点击“原生测试目录”进行测试。该高级入口不会自动请求预填地址。
3. 输入可访问的 HTTPS 目录地址（如同分支 catalog-demo.json）。候选目录需勾选“允许候选包”。
4. 点击“读取目录”，结果原位归入对应主控／模块页，每个产品一张卡片，不跳到用户拓展。点击版本数字查看全部已知版本；未安装项需要下载，主控适配在读到包后校验。没有本地元数据的新产品可能只显示 moduleId。
5. 对需要的版本点击“下载”，只安装、不执行类、不自动加入当前作品，也不替换活动旧版。
6. 在版本下拉中显式选择“使用”；首次启用和已有版本切换都需确认，配置变化须有明确配套集合。当前工程版本与推荐下载版本分开显示，不猜 latest 替换锁定版本。
7. 保存作品，安装其他版本后重开，仍恢复版本锁指定的已安装版本。离线恢复不需要再次请求目录。

“检查版本”在当前页显示简要结果，详情按需打开，不清空搜索和分类；卡片下拉保留全部已登记历史，而非仅最高版本。已连接测试目录时，本窗口的检查继续使用该地址及明确授予的候选权限；断开后恢复默认官方源和对应缓存。网络失败明确提示失败，保留有效目录、已安装资源和作品。必须使用包含这些功能的软件构建；旧安装包不会因 GitHub 增加 ZIP 自动获得新界面。

桌面端对 GitHub Raw JSON 与 Release ZIP 使用受限主进程下载，避免依赖编辑器页的跨域响应；只接受 GitHub HTTPS 来源及受信任下载跳转，目录／包大小与总超时固定，发送方须为编辑器 Tab，不关闭 webSecurity。其他 HTTPS 来源和普通浏览器仍需满足正常跨域规则，主进程不作为任意网站代理。

校验成功的轻量目录按 profile、规范化 HTTPS 来源和候选许可隔离保存，并记录上次校验时间；不缓存类源码、图片或 ZIP 内容。重开先读取默认正式源缓存，不自动联网，也不自动恢复测试来源或候选授权。显式选择相同来源和许可后，可查看该来源以前的缓存；这不表示已联网或可下载。

缓存会标记“尚未联网刷新”。只有内置或已下载的准确版本可离线使用；远端历史项仍需下载，锁定 V2 缺包时不退回内置 V1。坏目录、旧请求、坏缓存和写入容量不足不删除已安装资源或覆盖上一份有效索引；保存目录失败时本次有效结果仍可在当前窗口查看。远端新目录不再列出的版本，只要本地仍安装或内置，仍保留在版本选择中。

“断开测试目录”不删除历史缓存或安装资源，返回默认正式源，不沿用候选授权。404、超时、大小超限或身份不符不能显示安装成功，也不能说“已是最新版”。实际退出重开、视觉与离线点击仍需对应软件版本的人工验收，不用索引测试代替。

目录上限1MiB，单ZIP下载上限10MiB，单次请求默认15秒；支持流式响应时会在读取期间限制累计下载大小，桌面 GitHub 通道至多跟随五次受信任重定向。目录身份、profile、version和libraryVersion必须与下载包一致；同版本不同内容拒绝覆盖。文本文件仅 CRLF/LF 行尾不同视为相同内容，不因此要求递增产品版本；改动代码、字段、空白或资源仍需新版本。比较不会改写原包，导出保留原有元数据文本。

## 来源与发行边界

唯一官方仓库为hiwonderk12/scratch-product-extensions；WonderLab源码分支为wonderlab。“检查版本”默认读取该分支的catalog地址，不表示Release已有ZIP。未上传实际资源时，不得将不存在的下载链接称为发布完成。Gitee不是已确定的新协议源。

WonderLab 正常检查不再调用旧 formatVersion 1 解析器，也不会在原生下载失败时降级旧包。其他调用方的旧格式解析仍保留，不把新目录伪装成旧协议。正式发行、课程与硬件验收仍需独立确认。工具不提供上传、发布或自动升级命令。

## 按产品维护 catalog.json

产品历史格式见[分层目录](#分层目录总目录管理产品产品目录管理历史)。每条记录包含 `moduleId`、`version`、`libraryVersion`、`status`、`asset`、`downloadUrl`、`tag`，可附 `notes`。tag 只允许字母、数字、点、下划线和短横线，不支持斜杠；地址必须对应官方仓库的 tag 和资产名。

`metadata.json` 表示当前作者源码版本，不必等于历史版本。`tag` 和 `notes` 供维护者审阅，宿主不依赖它们执行积木；普通用户独立包无需官方历史文件。旧历史不因当前源码或库配置升级而重写。

### 从历史源生成根索引，无需旧 ZIP

```sh
node tools/cli/index.mjs catalog --products ./products --output ./dist/catalog-products-proposal.json --status published
node tools/cli/index.mjs catalog --products ./products --output ./dist/catalog-flat-proposal.json --status published --layout flat
```

第一条输出 v3 产品根，第二条输出 v2 兼容根；默认 layout 为 products，默认 status 为 candidate。输出父目录须存在，输出文件不得已存在；路径不得包含联接或符号链接。不能混用 `--input`、`--releases`、`--split` 等模式。

命令校验产品历史的身份、版本、状态、固定地址及重复项；不读取旧 ZIP，也不验证线上可下载性。`npm run check` 另会核对仓库根与所选状态的全部历史，防止根漏列已发布产品或历史版本。审阅后同步更新派生根，不能人工长期维护两份历史。

### 仅校验新 ZIP，生成历史追加提案

```sh
node tools/cli/index.mjs release add --archive ./dist/release-assets/NEW-TAG/light-sensor-NEW-VERSION.zip --tag NEW-TAG --baseline-archive ./dist/release-assets/OLD-TAG/light-sensor-OLD-VERSION.zip --output ./dist/light-sensor-history-proposal.json
```

把示例路径和 tag 换成实际资源。工具不自动打包、下载、上传或更新作者源：

- 新 ZIP 必须对应已有原生产品作者目录；检查原生描述、入口和库快照，从 ZIP 读取包版本及库版本，不从最新源码填补。
- 新 `moduleId@version` 已登记就失败；官方同版不能覆盖，普通用户同版覆盖规则不变。
- 不同版本也不能复用已登记的同一 tag／资产地址；一个 ZIP 不可能同时代表两个包身份，必须保留旧 Release 资产。
- 复用任何已登记的 `libraryVersion` 时，必须通过 `--baseline-archive` 提供一份已审阅参考 ZIP。其模块、版本、库版本、资产名须匹配历史；工具比较新旧完整库快照，不只比较版本号。无需全部历史 ZIP；全新库版本可省略参考。
- 参考 ZIP 的来源由维护者确认。工具不联网、不增加协议 SHA256 要求，也不能仅凭本地文件证明线上资源未变。
- 旧 `packages[]` 原样保留，再追加一条带官方固定地址的新历史；不自动修改旧候选的状态。输出只允许新文件，校验失败不创建提案。

默认新记录和提案顶层均为 candidate。**候选提案先保存在独立位置并用测试源验证，不得直接覆盖激活中的正式产品 catalog**。正式产品顶层为 published 时，所有历史也必须 published；否则不允许进入 published 根，避免正式客户端读到未授权候选而整树失败。

完成资源上传及审阅后，可显式用 `--status published` 生成正式提案；此参数只表达所请求的新记录状态，不证明验收或上传完成。旧候选不会随之转正。确认提案差异后人工替换产品源，再生成兼容根或已批准的分层根；先保证资源和子目录可用，再更新根引用。

### 全部历史 ZIP 的完整归档校验

```sh
node tools/cli/index.mjs catalog --releases ./products --input ./dist/release-assets --output ./dist/catalog-archive-checked.json --status published
```

此命令读取同一份产品 catalog，但要求纳入输出的**每份**历史 ZIP 均存在于 `<input>/<tag>/<asset>`，并核对身份、库版本和完整快照。缺 ZIP、身份不符、同版本快照冲突或路径链接均失败，不写索引。默认 candidate 包含所有历史；published 只选正式产品历史，不自动提升候选。

三种操作不要混淆：纯根生成只验证登记；增量追加验证新 ZIP 及必要参考；全量归档验证所有纳入的本地 ZIP。它们都不证明 GitHub 当前可访问，不执行上传或覆盖正式入口。不能为通过检查删除旧历史，也不能用最新源码重打旧版本。

## 整体候选集合

首个正式库基线改由根 `catalog.json` 指向 `wonderlab-library-v0.1.11`，见[使用与限制](releases/wonderlab-library-v0.1.11.md)。
下方测试目录继续保留，不移动原测试 tag，不将测试目录当作正常更新入口。

`catalog-test-20261026.json` 是 WonderLab 整体测试候选目录，指向目标仓库
`hiwonderk12/scratch-product-extensions` 的 `wonderlab-integration-test-20261026` Release。
它包含现有 41 个原生产品包，不包含 4 个 planned 模块，也不增加任何主控支持组合。
主控、模块保留各自版本，包内库配置均为 `0.1.11`；集合 tag 不是模块版本。

维护者创建该 tag 对应的测试 Release 后，需要上传候选目录所列的全部单包 ZIP。
源码 tag、目录 JSON 或 GitHub 自动生成的源码 ZIP，都不能替代这些资源。
此目录本身不证明资源已经上传或完成整库人工验收。

联调时，在主控／模块页的“原生测试目录”填写目标分支上的该 JSON Raw 地址，勾选允许候选包。
保持根 `catalog.json` 的正式渠道独立；只有经审阅后才人工更新它。
下载、显式加载、原版本工程恢复分别验证，安装新版不应静默升级当前工程。
