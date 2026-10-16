# 2026-10-15 WonderCode 光敏与土壤迁移审阅

## 当前状态

sensor 从 1.22.8 升为 **1.22.9**，catalog 保持 draft；新增 wondercode-light、wondercode-soil 两张卡片所需的六分支。
编辑器当前仅对 Ainovab 开放加载，加上旋钮共三张卡片；未迁移的主控与其他模块不开放。
本轮修改未提交、未推送、未发布；不覆盖已有 dist 历史版本，不修改其他产品包。

## 文件职责

| 文件 | 作用 |
| - | - |
| products/sensor/config.json | 主/资产版本、两分类、六分支产品过滤和旧图标 |
| products/sensor/python/main.ts | 光敏四板型、土壤两板型的显式导入、初始化及读数 |
| products/sensor/python/_menus/index.json | Tonybot 原 IO 配对菜单，实际值 2/13/19/25/32 |
| products/sensor/python/_locales/en.json、zh-cn.json | 新增旧简中/英文文案，不影响既有条目 |
| catalog.json、dist/sensor-1.22.9.mpext、README.md | 单包草稿资产、摘要和版本记录 |

## 语义差异

- 普通光敏：Hiwonder_ADC.LightSensor(Hiwonder.Port(port)).read()；1/2/6 接口，保留 ADPORT。
- K12 光敏：Hiwonder_DEV.DEV_LIGHT(Hiwonder_DEV.Port(port)).read_value()；5/6/7/8 接口，保留 PORT。
- MechDog 光敏：Hiwonder.LightSensor().read()；旧固定接口 3，无参数。
- Tonybot 光敏：Hiwonder.LightSensor(port).read()；PORT 保存单 IO 数值而非配对显示文字。
- 普通土壤：Hiwonder_ADC.SoilSensor(Hiwonder.Port(port)).read()；保留 ADPORT。
- K12 土壤：Hiwonder_DEV.DEV_SOIL(Hiwonder_DEV.Port(port)).read()；保留 ADPORT，不能套光敏 read_value。
- WonderLab 的原光敏/土壤百分比积木、方法和分类不变；生成的 sensor_ 旧 opcode 保留，reporter 禁止监视器。

## 证据与验证

旧证据：D:/code/wonder lab/snapshots/wondercode-2.2.8-2021-02-25/sources 的 sensor/index.js、python-generator.js 与 editor-msgs.js。
完整字段、源码行号、20 组基准、文件职责与人工待办见编辑器 D:/code/WonderCode/dosc/progress/2026-10-15-wondercode-light-soil-module-migration.md。

- GUI 相关 34 suites / 760 tests、容器恢复专项 10 项、VM 144 assertions、工作流框架 13 项通过；不包含既有同步断言失败。
- 20 单端口 + 2 多模块完整 Python 程序通过 AST 与 SDK spy。
- 236 个原共享积木、20 分类及所有已有翻译条目不变，其他产品 catalog 条目不变。
- 独立重打包与作者/编辑器包字节一致：4,154,509 bytes。
- SHA-256：83b5f37b059ca011363668e9153e31ee68f5a2e2eac94d9cc4d7e2bce7330eb6。
- 当前有效包说明文本扫描回归通过；内部兼容格式不改名，不恢复竞品宣传说明。

## 限制与 TODO

通用四语工作流的 sensor 全包检查在既有 en.json 缺少 sensor.aimech_read_knob|block 处失败，HEAD 原文件也缺失；历史共享源仅简中/英文，部分条目依赖回退。
本轮用已有单包打包器和转换/生成/确定性检查，不降低通用门禁；WC-SENSOR-I18N-CHECK（全包四语与 codegen-cases）另行补齐。
未安装依赖、未运行应用构建、未做应用人工、旧 SB3 或硬件验收；K12/MechDog/Tonybot 只是模板保留，整机仍未开放。
Review 未发现本轮自动迁移阻塞项，不能据此认定可发布；待人工确认分类、菜单、混合加载、量程与固件 API。
