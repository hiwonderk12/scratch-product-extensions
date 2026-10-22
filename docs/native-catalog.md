# 原生候选目录与下载

面向维护产品包和课程的开发人员。先阅读[原生类接口](native-api.md)和[版本与项目恢复](versions-and-projects.md)。本页只说明测试渠道，不授权上传资源或切换正式发行源。

## 职责分离

- 源码索引library/modules.json描述源码目录；catalog.json描述可下载的包版本，两者不互相替代。
- 原生发行目录使用formatVersion 2，只维护profile、发行状态、模块身份、版本和资源地址。
- 名称、简介、四语、图片、主控支持、端口和适配配置来自原生ZIP，不在目录重复维护。
- ZIP直接包含CommonJS类、extension.json、library.json与资源，不转换为旧清单，不要求SHA256字段。
- 安装仍执行版本不可变检查。HTTPS和不要求摘要不等于代码可信；只安装自己审阅过或可信维护者提供的包。

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

1. 打开用户拓展，点击“原生测试目录”。该入口不会自动请求预填地址，也不替换旧正式渠道。
2. 输入可访问且允许编辑器跨域请求的HTTPS目录地址。候选目录需勾选“允许候选包”。
3. 点击“读取目录”。未安装版本先显示moduleId、版本和远端状态；图片、翻译等在下载后从包读取。
4. 点击远端卡片只安装，不执行类、不自动加入当前作品，也不替换活动旧版。
5. 从已安装卡片选择版本加载；已有版本切换仍需确认，配置变化须有明确配套集合。存在多个候选时不猜latest。
6. 保存作品，安装其他版本后重开，仍恢复版本锁指定的已安装版本。离线恢复不需要再次请求目录。

“断开测试目录”只隐藏当前窗口的远端候选，不删除已安装资源。目录地址和候选授权不作为正式源持久化；重新打开窗口后需重新选择。读取失败保留已安装包及当前作品，404、超时、大小超限或身份不符不能显示安装成功。

目录上限1MiB，单ZIP下载上限10MiB，单次请求默认15秒；支持流式响应时会在读取期间限制累计下载大小。目录身份、profile、version和libraryVersion必须与下载包一致；同版本不同内容拒绝覆盖。导出未修改的包保留原有元数据文本，避免仅因JSON空白被改写而变成不同内容。

## 来源与发行边界

源码仓库为hiwonderk12/scratch-product-extensions；WonderLab源码分支为wonderlab。编辑器预填该分支的catalog地址仅供手动选择，不表示Release已有ZIP。未上传实际资源时，不得手写不存在的下载链接并称为发布完成。Gitee不是已确定的新协议源。

原生候选入口和旧formatVersion 1读取路径相互独立；旧正式源没有因本功能自动切换。正式发行、完整集合选择界面、课程与硬件验收仍需独立确认。当前候选工具不提供上传、发布或自动升级命令。
