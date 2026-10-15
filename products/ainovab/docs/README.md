# AiNova 入门版（WonderCode）

更新：2026-10-14。包 ID：`ainovab`，草稿版本：`0.1.1`。仅适配 WonderCode profile。

## 作者源与旧版证据

- `config.json`：主程序、CoreX 控制器及九个子分类、固定菜单分支、事件签名、自定义输入。
- `python/main.ts`：54 个启用 opcode 的 Mind+ 标准接口和声明式 Python 模板。
- `python/_menus/index.json` 与 `_locales/{zh-cn,en,zh-tw,ko}.json`：15 个实际菜单与旧四语文案。
- `python/_images/icon.svg`、`block.svg`：从旧 ASAR 的实际资源复制；保留已有卡片 PNG。
- `docs/codegen-cases.json`：253 个静态模板用例；动态回退及真实 VM 输出由编辑器回归验证。

只读基准为 `D:/code/wonder lab/snapshots/wondercode-2.2.8-2021-02-25`：
`sources/scratch-vm/src/extensions/ainovab/index.js`、`sources/gui/src/lib/python-generator.js`、`sources/scratch-l10n/locales/editor-msgs.js`。
软件版本 2.2.8，应用包版本 0.1.0，不按快照目录名推断实际软件版本。
ASAR SHA256：`56ecd940208d66d37d4c116dd84c22cb2447a036bbbcbb49af7099c4654d7fce`。

## 迁移规则

- 最终程序不保留装饰器：主程序使用 `def start_main():` 和 `Hiwonder.startMain(start_main)`；启动帽子的语句输出到顶层，先于主函数。
- 按键使用 `.Clicked(callback)` / `.Longpressed(callback)`，红外使用 `.Clicked(key,callback)` / `.Longpressed(key,callback)` / `.Released_lp(callback)`；所有函数定义后统一注册。
- 编码电机保留全部 / M1 / M2 枚举。可连接的 INDEX 仍为 number；显式 `templateSelector.matchInputCode: true` 仅精确匹配生成代码 0 / 1 / 2，其他表达式原样输出，不在 JS 中求值。
- 普通电机左轮映射 M2、右轮映射 M1，与旧版一致；方向在所选关键字参数中用 Python 条件表达式控制，不触碰另一轮。
- 保留 `slider200`、`slider`、`slider100`、`slider255` 与 `square_color`；音量 VALUE 保留普通 number。
- 单颗 LED 固定菜单使用零基索引，全选值 6 使用 fill / clear；可连接 NUMS 保留减 1；色板展开十六进制 RGB。
- PID 按实际使用的 NUM 创建对应 `mypid_NUM`，同名去重，保留默认 P / I / D。
- BLE 先设置模式再使用数据接口；保留 ble=None 全局声明、从机 / 主机枚举及命令索引 0。参数索引改为 `int(NUM)+1`，保留常量零基行为并让连接表达式可运行，不复制旧生成器的 NaN。

## 明确适配差异

0. 0.1.0 错把旧单积木生成器的装饰器标记作为最终代码。0.1.1 核对 `workspaceToCode` 的 `thread_add` 与 `finish` 收尾，修正七个帽子与重复回调命名；编辑器新增 54 个旧最终程序冻结回归，不以静态模板用例证明入口语义。
1. `read_ble_data` 旧定义有 MODE，但积木文本无占位符，Python 也不使用它；迁移中不新增可见下拉，不保留无效隐藏参数，读取逻辑仍为 `ble.read_uart_until('$')`。
2. 韩文 `en_motorDrawPutData` 原文遗漏 YPOS，本包补齐占位符与说明。
3. 每个直接使用 Hiwonder 的积木补足 import；编码电机 API 统一声明 `en_motor = Hiwonder.EncoderMotor`，不再依赖另一个积木偶然先声明别名。
4. 四语键完整性已验证，文案主要来自旧软件；翻译质量仍需人工复核。

## 不在本轮范围

- 未启用的五个旧生成器不迁移：motor_speed_num_set、motor_speed_num_stop、ir_pressed、ir_longpressed、en_motorDrawMainProc。
- Arduino 生成、AiNova 标准版、其他 WonderCode 主控及共享模块不迁移。
- 依赖设备已有的 Hiwonder、PID、Hiwonder_BLE SDK；不联网安装固件或第三方模块。
- 草稿包与编辑器离线快照已校验；人工界面、旧项目恢复、固件 API、真实串口上传尚未验收。未提交、推送或发布。

完整进度与盘点见编辑器仓库 `dosc/progress/2026-10-14-wondercode-ainovab-migration.md` 和 `dosc/progress/wondercode-product-migration-inventory.md`。
