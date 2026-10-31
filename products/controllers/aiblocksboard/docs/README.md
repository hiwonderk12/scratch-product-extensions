# AIBlocksBoard 主板维护

AIBlocksBoard（AI积木控制器，`aiblocksboard`）属于独立控制器，不属于七款机器人套件。产品源为 [src/index.ts](../src/index.ts)，采用一个 class、集中四语和内联 Python 规则；`aiblocks` 功能标识不能替代此主控。

## 软件中使用

包含本包的 WonderLab 开发内置中，打开“主控扩展 → 控制器 → AI积木控制器”。加载后提供主程序、启动、板载资源、输出打印、按键和蓝牙积木。界面语言支持简体中文、英语、繁体中文和韩语；切换语言不会修改 opcode、菜单值或工程字段。

主控包当前为 `0.0.2`，使用库配置 `0.0.3`。源码和开发内置不等于已上传 Release；远端可下载身份只以实际产品历史 catalog 为准。不要原地覆盖旧包，或将主板包伪装成普通用户模块导入。

## 板载积木

| 功能 | 完整旧标识后缀 | 生成行为 |
| - | - | - |
| 主程序／启动 | `start_thread`、`start_run_thread` | 主循环启动器／启动阶段；共同收集 `Hiwonder`、`time`、`Hiwonder_IIC` |
| 蜂鸣器 | `buzzer_tone_set`、`buzzer_tone_set_arg`、`buzzer_tone_set_volume`、`close_buzzer` | 共用 `beep = Hiwonder.Buzzer()`；菜单节拍 `0` 使用持续播放，而非停止 |
| 电量 | `get_battery_level` | `Hiwonder.Battery_power()`，单位 mV |
| 输出 | `print_str`、`print_number` | 打印后延时 `0.05` 秒；字符串由生成器转义 |
| 按键 | `when_key_click_thread`、`key_is_pressed` | 数字按键 `0`／`1`，初始化 `Hiwonder.Button(0)`／`Hiwonder.Button(1)`，事件通过 `Clicked` 绑定 |
| 蓝牙初始化 | `set_ble_mode` | `from Hiwonder_BLE import BLE` 与 `ble = BLE(MODE, NAME)`，无额外运行语句 |
| 蓝牙状态 | `ble_is_connected`、`get_ble_mac`、`ble_wait_end` | 连接状态、MAC 和接收数据包含判断 |
| 蓝牙读写 | `read_ble_data`、`get_ble_cmd`、`get_ble_args`、`ble_write` | 读取串口命令、解析命令／参数、发送数据 |

完整类型统一为 `aiblocksboard_<后缀>`。三个事件积木为 `hat`，条件判断使用大写 `Boolean`；读取使用 `reporter`，其他为 `command`。全部五个菜单为固定菜单，不接受报告积木：音调 `tones`、节拍 `rhythms`、播放模式 `buzzer_mode`、按键 `keys`、蓝牙模式 `blemode`。

蜂鸣器模式保留 Python 值 `False`／`True`；蓝牙模式保留 `BLE.MODE_BLE_SLAVE`／`BLE.MODE_BLE_MASTER`，不得翻译实际值。按键参数是数字通道，不照搬机器人套件的带引号按键名称。

## 生成规则

主程序使用 `launcher: 'Hiwonder.startMain({MAIN})'`，启动积木使用 `section: 'setup'`。按键事件通过 `entryTemplate` 定义函数，再由 `entryFooter` 注册回调；同一按键的事件与读取共用一个初始化对象，不依赖旧装饰器文本后处理。

普通播放收集 `beep.playTone(TONES,RHYTHMS,MODE)`；菜单节拍 `0` 分支收集 `beep.onoff(True, TONES)`。不要把该菜单翻译成停止或改用 `Hiwonder_DEV`：本主板入口使用的是 `Hiwonder_IIC` SDK。

蓝牙读取积木依赖显式初始化；主板 class 不会替用户补一个默认名称或隐式连接。打包检查不代表设备已经安装对应 SDK，也不证明真实蓝牙或按键已验收。

## 外接模块边界

主控配置位于 [library/boards/aiblocksboard.json](../../../../library/boards/aiblocksboard.json)，当前仅加入长电机、180°及360°直接舵机，统一采用 `hiwonder-direct`，保留旧 `actuator` 类型。部分现有模块虽然保留 IIC 分支，也必须逐项核实端口、初始化、旧作品和 SDK 后才能加入支持，不能直接继承机器人系列配置。

[长电机与直接舵机](../../../power/README.md)已作为三个独立 class 模块提供，只有在模块页加载后才挂载；不合并进本主控包，也不为七款机器人开放。

## 检查与打包

在仓库根目录执行：

~~~powershell
npm run ext -- check controllers/aiblocksboard
npm run ext -- pack controllers/aiblocksboard
~~~

生成 ZIP 包含真实图片、可读 CommonJS class、元数据和完整库配置。包内没有旧 manifest 声明或硬件固件，打包不会连接设备或发布远端。

可选的 `generate block/menu controllers/aiblocksboard ...` 仍修改同一个 index；不使用生成命令也可完整维护。`new product` 当前创建机器人骨架，独立控制器按本目录手写结构维护；`new module --category controllers` 不属于普通用户模块路径。
