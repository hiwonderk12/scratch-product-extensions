# 模块维护手册

面向熟悉 Git、TypeScript 和 Python 的开发人员。先查 `library/modules.json` 定位模块，再从其 `metadata.json` 进入源码。`native-source` 表示已有类入口，`legacy-source` 表示仅有旧实现，`planned` 表示仅有卡片或支持意图；源码状态不代表正式发行。

当前现有源码均使用原生类，不为新包创建 legacy 目录。首次制作从[文本示例](getting-started.md)开始；新建、积木/菜单生成、支持接入及配套打包见[CLI手册](cli.md)。

## 每个模块的文件

点阵屏、RGB 灯带和 MP3 的维护示例见各模块 `docs/README.md`。源码中的 opcode、端口参数使用普通标识符属性（如 `opcode:`、`PORT: {…}`），以匹配当前结构检查；翻译 key 则可使用带点的字符串。集中 messages 保留四语，参数类型与实际 Scratch shadow 名可能不同（ledmatrix / led_matrix），修改控件需同时验证旧作品恢复与生成占位符。

| 位置 | 职责 |
| - | - |
| `products/<大类>/<模块>/metadata.json` | 原生包身份、版本、图片路径和入口 |
| 同目录 `src/index.ts` | 类 / getInfo、菜单、集中 messages/product 配置和 getPython 内联规则 |
| 同目录 `python/`（可选） | 确有独立职责的复杂 Python 实现，不按片段拆文件 |
| 同目录 `assets/` | 卡片展示资源，路径相对模块目录 |
| 同目录 `docs/`（若存在） | 产品开发说明、模板分支用例 |

主控、输入、输出、动力和通信分别放在 `robots`、`input`、`output`、`power`、`communication`。风扇属于输出；机械臂属于动力。不要恢复包含全部传感器的聚合 `main.ts`。

## 修改已有积木

1. 确认固件 API 和完整旧类型，在 `library/legacy-index.json` 查其所属模块。
2. 修改该模块的声明与模板，保留 namespace、opcode、参数名、菜单实际值和入口收尾行为。
3. 文案修改 index 内 messages，图片路径修改模块元数据，不向 catalog 添加图片或译文表。
4. 调整主控支持范围或端口时维护[库配置](configuration.md)。新原生包携带固定版本配置快照，重新打包后由配套客户端读取；旧包加载路径仍使用旧配置，不能混淆两者。
5. 执行结构检查；类型归属或目录变化后生成索引。审阅 Python 导入、初始化去重、表达式/命令和最终程序，再验证旧课程工程。

控件直接在 `getInfo().blocks[].arguments.<参数>.type` 声明，例如 `slider150p`。模板分支、产品参数、帽子积木和事件注册规则必须保持完整。

同一机械臂或风扇可在 `metadata.namespaces` 声明多个历史前缀，各自有完整旧类型；已迁模块的 `legacySources` 为空，不能仅按函数名去重。`input/line-8` 的旧分类名 `wondercode-line-8` 属于 WonderLab 兼容数据，不应按前缀删除。

## 主控差异核对

先核对产品支持配置，再核对 import、总线、构造参数、Port 包装、对象名、读取方法和端口表。相同 SDK 不表示相同初始化：MiniHexa 的语音/发光超声波为板载无参，红外传原始 IO；AiDoggy 的传感器 IIC 表与显示/动力历史端口不可混用。详细规则见各模块手册。已有 opcode 或菜单需调整时保留隐藏兼容声明和原始保存值，不根据界面语言或主控名称猜测引脚映射。

## 检查与验证范围

巡线模块须同时核对 main.ts 与旧 config 的 templateSelector：◌=0 选择位与结果 == 0，●=1 选择 > 0，不能只搬基础 > LINE 文本。通道掩码菜单值为 2 的幂，灰度读取通道则是连续 1～N。line4/6/8 是独立 shadow，字段 LINE4/6/8 保存两位十六进制，必须经真实输入槽验证含 a～f 的值不被当作普通字符串。普通四路、旋钮四路、六路、八路对象各自独立；阈值仍保留原 number 控件和默认值。

输入模块的初始化方式不能机械统一：颜色/IMU/温湿度/LED 超声波保留显式初始化，读取和控制不自动补端口；普通超声波 reporter 按实际端口收集 sonar_PORT 对象。外接 IMU 必须使用 imu_sensor，不能覆盖主控 imu 校准；普通超声波不能覆盖 LED 模块的 sonar。LED 颜色用 COLOR.rgb，分量控件用 slider255，呼吸周期保持输入秒乘 1000。说明见各模块产品手册。

```sh
node tools/cli/check.mjs
node tools/cli/check.mjs --write-indexes
```

命令可从任意工作目录通过脚本路径调用，不依赖软件主项目或第三方 npm 包。检查器只处理源码结构与配置，不执行 Python，也不验证硬件结果或新版客户端加载。

本分支使用 `new`、`generate`、`support add`、`check`、`pack` 和 `pack-set`，见[CLI手册](cli.md)。旧聚合包命令不适用；真实预览尚未提供，不将任意源码 ZIP 当作用户可导入包。

K230 的同驱动不同主控能力、17 处模板选择、MCP 静态名称和 largetext 示例见 [K230 维护手册](../products/input/k230-vision/docs/README.md)。五个 variant 同步控制 getInfo/getPython，不把主控过滤移回软件。K230 只有普通内联分组，不使用 WonderLens 独立导航字段。

## 新类接口约束

多历史前缀模块先确认旧接口是互斥适配还是同时启用。互斥适配在一个类的 getInfo/getPython 中选择一套 namespace/opcode，metadata.namespaces 声明全部前缀；保留每个分支的显式 id 与旧积木类型，不用删前缀代替兼容。第三参数 defaultPort(opcode, argument, namespace) 可读取非主前缀绑定，参见[风扇](../products/output/fan/docs/README.md)。

原生模块用 TypeScript 类的 `getInfo()` 声明积木和菜单，文案通过 key 引用同 index 的集中 messages 配置，`getPython()` 直接维护简单 Python。光敏、土壤是简单样板，机器人提供主程序、事件、分支和专用控件示例。编译和可选资源收集直接生成类入口压缩包，不转成旧作者文件或旧 manifest。

完成迁移的目录不保留 `legacy/`，`legacySources` 置空。产品手册放到本模块 `docs/`；原有译文放入 messages 的对应语言和 key，名称/可选简介通过 product 引用并由工具生成发行字段。基准从 Git 历史和旧版本资产追溯，不维护两份有效源码。

可选目录只在确实含有文件时保留。简单 Python 已收回 index 后，删除空的 `python/`；迁出旧资源后，自底向上清理空 `legacy/` 及子目录，不保留空 `assets/` 或 `docs/` 作为占位。清理前核对模块根路径和隐藏文件，只删除实际为空的目录，不递归删除仍有内容的目录，也不使用占位文件规避清理。

中文是必需语言，其他语言在协议层可选；本分支现有产品及 CLI 骨架维护简中、英文、繁中、韩文四语，变更不得丢失已有译文。原生上下文 `t(key)` 动态选择语言，缺少目标语言回退中文；supportedLocales 只声明全部 key 齐全的语言。单模块编译检查负责文案 key、覆盖和占位符校验，结构检查不代替编译检查。语言别名与开发示例见[原生接口](native-api.md)。

普通产品内容和已有控件范围内的更新由库维护；新增控件类型、上传协议或设备连接能力需要软件提供对应能力。按已提供的 `tools/sdk/index.d.ts` 开发原生类，不直接引用软件内部模块。

## 审阅与发布

PR 说明具体硬件、积木行为、参数与生成结果、旧课程验证范围。负责人审阅后再发布独立版本，不覆盖同版本历史文件。

`catalog.json` 只登记已完成原生加载验证的发行集合。固定版本的库配置、兼容索引、元数据和模块包必须同时可读后，才能切换软件渠道；源码索引不能代替发行索引。

公开开发说明不存放内部执行日志、审阅记录或本机路径。
