---
name: product-extension
description: 创建或维护本仓库的原生产品积木包，使用CLI生成单文件类、菜单与Python规则，维护四语、主控适配、端口和旧项目兼容。用于本库积木及课程维护，不用于新增软件上传协议或实现C后端。
---

# 产品积木维护

## 定位与生成

- 首次制作先用[完整教程](../../../docs/getting-started.md)与[导入说明](../../../docs/importing.md)，不要要求新手先理解内部标识；AI辅助是可选方式。

- 核对分支、profile和实时Git，保留既有修改。WonderLab/WonderCode产品内容隔离，不整分支合并产品目录。
- 从[维护手册](../../../docs/development.md)、library/modules.json定位模块，再读metadata、index和模块文档。核对完整旧类型、参数名、菜单value和初始化，不因显示文案变化重命名旧接口。
- 先读[CLI](../../../docs/cli.md)，用已实现的new product/module、generate|g block/menu。规格提供真实文案和非空Python，先dry-run审阅，再按用户授权落盘。
- 输出以单index为唯一作者源：class/getInfo、集中messages/product、菜单和内联getPython。不复制spec当长期配置，不按opcode拆文件，不生成旧manifest或namespace注解格式。
- AST拒绝适配分支、多命名空间或动态返回时，在原index中手工定点维护，不绕过检查删除分支或整文件格式化。
- 中文兜底，新包默认四语，声明语言完整且占位符一致。翻译不改菜单value、Python及用户字段；缺可靠译文时明确说明，不将复制中文称为翻译完成。

## 适配与验证

- 按[主控/端口手册](../../../docs/configuration.md)确定支持与variant；同一传感器逐主控核对import、驱动、构造函数、总线/原始IO、地址和显式初始化，不只换端口。
- 新包不自动开放支持。无主控/固件依据不扩支持、不开发planned硬件或改变上传协议。
- 使用显式 `support add --spec ... --dry-run` 审阅单主控接入与配套版本；再以 `pack-set` 生成同快照主控及所需模块。已有活动模块也需同配置新版，不承诺模块单包与内置旧快照直接共存。
- 执行模块check和相关测试，变更目录/完整类型时显式重建索引并审阅diff，不删除旧类型来通过检查。
- 作者冒烟仅测可信本地结构，不是安全沙箱或真实预览。配套应用仍验原生加载、四语、字段/Python不变、模块共存卸载、SB3固定版本离线恢复和导出/上传门禁。
- Python仍是唯一实现目标，不放宽协议或加空C模板冒充支持。API按[原生接口](../../../docs/native-api.md)，不另建schema。

## 交付

按[版本与项目](../../../docs/versions-and-projects.md)维护不可变包/配置快照身份，安装不升级作品。打包、catalog生成、Git合并、上传和正式发布是不同动作，需各自授权。

公开库只留开发手册、API/CLI/Skill和产品维护资料。执行记录、内部Review、验收证据与交接放配套主项目dosc；报告实际测试、未验项及未提交/未发布状态。
