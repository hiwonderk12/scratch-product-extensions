# 官方 Release、版本索引与原生下载

面向维护产品包和课程的开发人员。先阅读[原生类接口](native-api.md)和[版本与项目恢复](versions-and-projects.md)。本页只说明测试渠道，不授权上传资源或切换正式发行源。

## 职责分离

- 源码索引library/modules.json描述源码目录；catalog.json描述可下载的包版本，两者不互相替代。
- 原生发行目录使用formatVersion 2，只维护profile、发行状态、模块身份、版本和资源地址。
- 名称、简介、四语、图片、主控支持、端口和适配配置来自原生ZIP，不在目录重复维护。
- ZIP直接包含CommonJS类、extension.json、library.json与资源，不转换为旧清单，不要求SHA256字段。
- 安装仍执行版本不可变检查。HTTPS和不要求摘要不等于代码可信；只安装自己审阅过或可信维护者提供的包。

## 官方发行：Release 保存 ZIP，一个 JSON 记录版本

官方包不需要额外的版本管理服务。各版本 ZIP 上传到 GitHub 对应 Release，一个 catalog.json 汇总仍需提供的版本：

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

维护顺序：

1. 修改产品单 index 类和 metadata.version，检查并打包。纯积木或文案变化不要求机械递增库配置版本；支持关系、端口或适配改变时才按[配置合同](configuration.md)处理。
2. 在对应 Release 上传单个模块 ZIP，而不是把多个 ZIP 再压成一个分发包。文件名须与 asset 和下载地址完全一致。
3. 在产品 release.json 追加发行历史，用下面的 catalog --releases 命令校验实际 ZIP 并汇总总索引，保留仍需恢复的旧版本及原地址；命令不会覆盖现有索引。
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

1. WonderLab 的“检查版本”读取 wonderlab 分支根 catalog.json，使用原生 formatVersion 2，不再请求旧仓库。默认仅允许 published；空 development 目录会提示暂无可安装版本，不表示已是最新版。
2. 测试时打开用户拓展，点击“原生测试目录”。该入口不会自动请求预填地址。
3. 输入可访问的 HTTPS 目录地址（如同分支 catalog-demo.json）。候选目录需勾选“允许候选包”。
4. 点击“读取目录”。未安装版本先显示moduleId、版本和远端状态；图片、翻译等在下载后从包读取。
5. 点击远端卡片只安装，不执行类、不自动加入当前作品，也不替换活动旧版。
6. 从已安装卡片选择版本加载；已有版本切换仍需确认，配置变化须有明确配套集合。存在多个候选时不猜latest。
7. 保存作品，安装其他版本后重开，仍恢复版本锁指定的已安装版本。离线恢复不需要再次请求目录。

“检查版本”显示每个模块的远端最新版本、是否已安装及当前项目版本，不自动下载或升级。成功后转到用户拓展显示可下载卡片。已连接测试目录时，本窗口的检查继续使用该地址及明确授予的候选权限；断开后恢复默认官方源。网络失败明确提示失败，保留已安装资源和作品。必须使用包含本次入口接线的新软件构建；旧安装包不会因 GitHub 增加 ZIP 自动获得新加载器。

桌面端对 GitHub Raw JSON 与 Release ZIP 使用受限主进程下载，避免依赖编辑器页的跨域响应；只接受 GitHub HTTPS 来源及受信任下载跳转，目录／包大小与总超时固定，发送方须为编辑器 Tab，不关闭 webSecurity。其他 HTTPS 来源和普通浏览器仍需满足正常跨域规则，主进程不作为任意网站代理。

“断开测试目录”只隐藏当前窗口的远端候选，不删除已安装资源。目录地址和候选授权不作为正式源持久化；重新打开窗口后需重新选择。读取失败保留已安装包及当前作品，404、超时、大小超限或身份不符不能显示安装成功。

目录上限1MiB，单ZIP下载上限10MiB，单次请求默认15秒；支持流式响应时会在读取期间限制累计下载大小，桌面 GitHub 通道至多跟随五次受信任重定向。目录身份、profile、version和libraryVersion必须与下载包一致；同版本不同内容拒绝覆盖。文本文件仅 CRLF/LF 行尾不同视为相同内容，不因此要求递增产品版本；改动代码、字段、空白或资源仍需新版本。比较不会改写原包，导出保留原有元数据文本。

## 来源与发行边界

唯一官方仓库为hiwonderk12/scratch-product-extensions；WonderLab源码分支为wonderlab。“检查版本”默认读取该分支的catalog地址，不表示Release已有ZIP。未上传实际资源时，不得将不存在的下载链接称为发布完成。Gitee不是已确定的新协议源。

WonderLab 正常检查不再调用旧 formatVersion 1 解析器，也不会在原生下载失败时降级旧包。其他调用方的旧格式解析仍保留，不把新目录伪装成旧协议。正式发行、课程与硬件验收仍需独立确认。工具不提供上传、发布或自动升级命令。

## 按产品维护 release.json

可在 `products/input/light-sensor/release.json` 维护历史（可选文件，不是积木声明）：

```json
{
  "releases": [
    {
      "version": "0.1.0",
      "tag": "wonderlab-demo-20261023-v1",
      "asset": "light-sensor-0.1.0.zip",
      "status": "candidate",
      "notes": "首次候选，待人工上传与验证"
    },
    {
      "version": "0.1.1-demo.20261023",
      "tag": "wonderlab-demo-20261023-v2",
      "asset": "light-sensor-0.1.1-demo.20261023.zip",
      "status": "candidate",
      "notes": "四语文案新版演示，保留旧版用于课程恢复"
    }
  ]
}
```

这些值仅为演示。产品 `metadata.json` 表示当前作者源码版本，不能改成历史版本以迁就索引。
工具按产品目录确定 moduleId，从实际 ZIP 校验 version 与库配置快照；库配置版本无需再手填。
`notes` 留在产品历史供维护者阅读，不进入下载协议。

本地 ZIP 按 `资源根目录/Release-tag/asset.zip` 保存，tag 只允许字母、数字、点、下划线和短横线，不支持斜杠。然后执行：

```sh
node tools/cli/index.mjs catalog --releases ./products --input ./dist/release-assets --output ./dist/catalog-candidate.json --status candidate
```

- 只读取存在 release.json 的产品；其他产品无需为首轮演示补齐历史。
- 默认 candidate，验证所有 candidate/published 历史。缺 ZIP、身份不符、重复版本、同配置版本快照冲突或输入链接均失败，不生成半份索引。
- 下载地址固定生成到 `hiwonderk12/scratch-product-extensions` 的对应 Release，不接受另一个仓库或镜像参数。
- `--status published` 只汇总历史中已明确标记 published 的记录；不会把候选自动转正，零条目报错。该参数仅生成 JSON，不代表完成 GitHub 或应用验收。
- 输出必须为新文件。审阅差异后再人工更新仓库根 catalog.json；不要丢弃仍需恢复的历史条目。
- 软件只读取总索引，不逐个请求产品 release.json。普通用户独立包无需此文件或官方版本管理。

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

联调时，在“用户拓展 → 原生测试目录”填写目标分支上的该 JSON Raw 地址，勾选允许候选包。
保持根 `catalog.json` 的正式渠道独立；只有经审阅后才人工更新它。
下载、显式加载、原版本工程恢复分别验证，安装新版不应静默升级当前工程。
