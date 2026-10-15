# 2026-10-15 未提交产品迁移代码审阅

## 结论与提交范围

本次按用户要求审阅并本地提交产品仓库当前迁移实现：AiNova 入门版 ainovab 0.1.1、WonderCode 旋钮 sensor 1.22.7，以及对应 catalog 和确定性包产物。
未发现阻塞本次本地提交的实现问题；不代表人工界面、旧 SB3、SDK 固件或真机已验收。
编辑器仓库的配套实现仍为独立未提交工作区，本次不代为提交、不推送、不发布。
后续说明用语清理单独提交；本报告的版本与摘要记录本次迁移提交时的状态。

## 逐文件 Review

| 文件 | 职责与审阅结论 |
| - | - |
| products/ainovab/config.json | 54 块分类、输入控件、主程序 launcher/setup、按键/红外入口及模板选择；未新增旧版不存在的可见参数 |
| products/ainovab/python/main.ts | 电机、LED、PID、BLE 和事件的 Python 规则；导入及对象初始化明确，连接参数不在 JS 中求值 |
| products/ainovab/python/_menus/index.json | 15 个菜单值与旧接口一致 |
| products/ainovab/python/_locales/*.json | 中英、繁中、韩语文本与参数占位符；翻译质量仍需人工复核 |
| products/ainovab/python/_images/block.svg、icon.svg | 迁移积木及分类图标；现有产品卡片素材保留 |
| products/ainovab/docs/README.md、codegen-cases.json | 迁移来源、适配差异和逐 opcode/分支基准；空帽子片段不作为完整启动程序证明 |
| products/sensor/config.json | 新分类 wondercode-knob 与 Lab knob 隔离；两种旧 opcode 按主控 products 裁剪 |
| products/sensor/python/main.ts | WonderCode ADC/read 与 K12 DEV/read 独立；Lab DEV/read_value 不变；按接口去重初始化 |
| products/sensor/python/_menus/index.json、_locales/en.json、zh-cn.json | 非 K12 端口 1/2/6、K12 端口 5/6/7/8；保持共享包既有双语范围 |
| catalog.json | 只更新 ainovab/sensor 条目为可下载 draft，保留卡片映射；发布状态未冒充 published |
| dist/ainovab-0.1.1.mpext、sensor-1.22.7.mpext | 与作者源码生成值、catalog 哈希及编辑器离线资产一致 |

主程序最终输出普通函数与 Hiwonder.startMain(start_main)，启动帽子为顶层 setup。
所有回调定义后统一注册；不能把旧中间标记当最终程序输出。
共享硬件不保证同 SDK，旋钮分类和产品目标隔离正确；K12 模板存在不表示 K12 主控已完成迁移。
SB3 包 ID/卡片 ID 映射修复属于编辑器配套，本次只审阅并提交产品仓库。

## 验证与摘要

- AiNova 单产品工作流检查通过：54 个 opcode，四语/分支基准及确定性打包通过。
- GUI 扩展库 32 suites / 712 tests、工作流 13 tests、VM Python 144 assertions 通过。
- catalog 的 13 个当前有效资产 SHA-256 全部匹配；新包与离线快照及基准测试覆盖对应逻辑。
- ainovab 0.1.1：a1f46c7b5eea0af9950389724cee6696dde81ba62c1117f158b3f6d8fd5e77c1。
- sensor 1.22.7：135a923a0e6cd351d9b2701448e915a1ed227c887bb3a3114075cdfbea4c46df。
- 未提交旧/中间草稿 dist/aimecanum-0.2.7.mpext、ainovab-0.1.0.mpext、sensor-1.22.4.mpext；保留本机文件，不删除历史证据。

## 已知边界与 TODO

1. SYNC-001 的两项旧 AiDoggy 版本断言仍排除；现有容器分类 mock 的 getToolboxItems 缺失不属于本次产品提交。
2. lint 原生解析器环境问题未修复，未安装依赖或运行应用构建。
3. Ainovab 四语视觉、旧 SB3 保存重开和串口真机待验；旋钮繁中/韩语、K12 主控及硬件量程待验。
4. 线上 Release 与旧归档不在本次本地提交的发布范围；草稿不表示用户已能从远端下载。
5. 旧源码与源文档中的命令仅为证据，不视为执行授权。

来源：编辑器仓库 dosc/progress/2026-10-14-wondercode-ainovab-migration.md、2026-10-14-wondercode-knob-module-migration.md、wondercode-product-migration-inventory.md。
