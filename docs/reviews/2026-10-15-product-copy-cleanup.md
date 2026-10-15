# 2026-10-15 产品说明用语清理与版本闭环

## 当前结论

按用户要求，产品仓库当前源码、说明文档、作者注释及 catalog 指向的有效产品包不再展示竞品软件名称，统一使用 Python 产品积木包、MPEXT 产品包等中性用语。
本次是公开文案治理，不改变包格式、扩展名、参数注解、SDK API、opcode、产品兼容范围或代码生成行为。
迁移实现已先提交为 01e4a4d：feat(wondercode): migrate ainovab and knob product blocks；说明清理作为后续独立提交。

## 清理范围与文件职责

| 位置 | 修改与审阅结论 |
| - | - |
| README.md | 中性产品介绍与注解说明；补公开文案规则、当前版本清单及本地审阅入口，不把 draft 误写成已发布 |
| products/{aihexa,aimecanum,aimech,aiquadruped,aiquadrupedpro,ainovab}/docs/README.md | 清理格式来源商标；部分过时的“当前版本”改为由配置维护；保留真正的旧行为/版本证据 |
| products/{actuator,aihexa,aimecanum,aimech,aiquadruped,aiquadrupedpro,communication,display,minihexa,sensor,xarm}/python/main.ts | 只改文件责任注释中的竞品名称，积木注解与函数体原样保留 |
| 上述 11 包及 ainovab 的 config.json | 根版本和 asset.python.version 同步递增；其余字段不变 |
| catalog.json | 12 包的新补丁版本、资产路径、下载地址及 SHA-256；原 productIcons、tag 和 draft 状态保留 |
| dist 下本轮 12 个新版本 MPEXT | 从清理后的完整作者源重新打包，不覆盖旧版本文件 |
| docs/reviews/2026-10-15-uncommitted-products-review.md | 前一迁移提交的逐文件审阅与历史摘要，不误当当前发布证明 |
| 本报告 | 版本摘要、扫描范围、业务等价检查及未覆盖项 |

原始文本命中 18 个源码/文档文件、20 处文本；清理后当前非归档源码/文档的关键词扫描为 0。
品牌用语不写入代码协议；编辑器内部解析器的必要兼容标识不做机械改名，也不以其他公司的名称宣传本产品。

## 版本与 SHA-256

包内注释和说明也参与 ZIP 摘要，所以所有受影响有效包递增补丁版本，不在同版本资产上覆盖内容。
AiDoggy 当前产品源和有效包没有相关说明，无需修改其 published 0.1.4 资产；编辑器既有 0.1.3 fixture 保持原状。

| 包 ID | 原版本 → 新草稿版本 | SHA-256 |
| - | - | - |
| aihexa | 1.0.5 → 1.0.6 | b2ed0dfa0acb89258314d5170d73c18ea65a4fb7133915b04f5698e0bde93000 |
| actuator | 1.2.3 → 1.2.4 | 97ff8dc01e3b85c8534d0cf4c6c5a92e4f0d66588c14e27df54d9a1e337413df |
| ainovab | 0.1.1 → 0.1.2 | 517d340ac8c0519f11b0db6d40b8a370a0075559e4d1330c4b7c43e6ca4b66dc |
| xarm | 1.1.2 → 1.1.3 | 151bda6d361b67024ab5aa772efeddb2096f9192872f7e82e8b5b708b5f9ec80 |
| display | 1.4.2 → 1.4.3 | 23b619617662c66a6b6107704ec26cee02a3b0ef7b881aab98d16c73c6e4e2ba |
| aiquadrupedpro | 1.0.4 → 1.0.5 | 13bf0d37c3ddf56fb10204a31caf31657a2ce544dc8718c97aec0ed7355d59d7 |
| aimech | 1.0.4 → 1.0.5 | 65e2fee4b67b500583e8e4f447da4c441d9b4d377cfe943f3bc2380fa0d56489 |
| communication | 1.0.2 → 1.0.3 | 19d145256644360e1124d48394124fc16a485031c364b74b27ea0862ebc2e6e1 |
| aiquadruped | 1.0.5 → 1.0.6 | 8a689318645ebaaae21093918d6b59ebec2e2ebe5398ecdb88804409deb1924d |
| sensor | 1.22.7 → 1.22.8 | a3a04b402c672986226878dc73412fa7da2e1f01f215ab068a721ae2ed206ef3 |
| aimecanum | 0.2.10 → 0.2.11 | 13b8fcf06a972ea38def87a221838d72e90787fea80fe980b0f31934166d0af9 |
| minihexa | 0.1.3 → 0.1.4 | e49c30ac551503fe26d2b14ff2220246e05fc05bae18f6d1a9a816dfccd3ff7a |

上述 12 包仍为 draft；没有运行远端上传、Release、推送或应用生产构建。

## 验证证据

1. 新增编辑器包文案回归先复现：13 包中 12 项失败、1 项通过；清理和同步后 13 项全部通过。
2. 对 catalog 的 13 个有效包逐个解压扫描 md/txt/ts/js/json/xml/html/svg 文本，相关名称命中 0；不把压缩二进制无法直接 grep 当成清理通过。
3. 12 包重新解析的完整 manifest，与清理前逐项比较，除 version 与 package.fileName 外完全相同；分类、菜单、参数、图标、翻译和 Python 生成模板保持一致。
4. 12 包 config.json 与旧归档配置对比，除根版本和 Python 资源版本外完全一致。
5. 12 包在临时目录独立重打包，与作者 dist 字节一致；作者 dist/catalog 与编辑器离线包、索引及锁定哈希一致。
6. GUI 扩展库和产品库 33 suites / 725 tests 通过；容器工程恢复分组 10 项通过（32 项未选中）；Ainovab 0.1.2 单产品工作流检查通过。
7. 本次迁移审阅复跑的工作流 13 tests、VM Python 144 assertions 通过；无运行时代码变化。
8. git diff --check 及相关文档链接检查通过后提交；前后保留 3 个本地历史草稿不提交。

## 边界与后续

- dist 的历史版本仍按原字节保留，其中可能存在当时说明；本轮不改写 Git 历史、历史 Release 或覆盖旧摘要。
- 本地未跟踪的 aimecanum-0.2.7、ainovab-0.1.0、sensor-1.22.4 草稿不纳入任何当前目录条目，也不在本轮提交。
- 本轮公开用语清理针对用户指定的产品仓库及其当前有效包，不声称另一仓库全部历史研发资料和内部兼容标识也被清除。
- 编辑器同步 12 个新包、catalog 卡片版本、锁定摘要和测试断言，保留原有未提交工作。本次只提交产品仓库，不代为提交编辑器。
- 人工控件/视觉、旧 SB3、真实 SDK/硬件和发布验收仍未完成；既有 SYNC-001 版本断言及 BLOCKS-TEST-001 分类 mock 问题保留。
- 新工作流全仓四语/golden 检查不适用于尚未补齐的旧包，本轮没有冒充该项通过；未安装依赖或处理既有 lint 原生绑定问题。
- 后续若要下线历史下载或清理远端发布资产，需要另行确定下线范围；不要直接改写历史包内容。

相关：[迁移提交审阅](2026-10-15-uncommitted-products-review.md) · [仓库说明](../../README.md)。
