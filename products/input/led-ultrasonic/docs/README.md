# LED 超声波传感器维护说明

`src/index.ts` 集中维护类/getInfo、四语 messages、菜单和 Python。元数据在 `metadata.json`，图标在 `assets/ultra.svg`，namespace 为 sensor，原七个 opcode 保持，另提供旧软件的 minihexa_led_ultrasonic_init。

## 显式初始化与驱动

五种 AI 主控选择 hiwonder-dev-port，`aimech_led_ultrasonic_init` 收集 import Hiwonder_DEV 与 `sonar = Hiwonder_DEV.DEV_SONAR(Hiwonder_DEV.Port({PORT}))`。端口菜单 aimech_iicport：A/B/C/D/E/J/K 对应 1/2/3/4/5/9/10，默认 1。

AiDoggy 使用 hiwonder-dev-port-aidoggy，SDK 和构造相同，但活动菜单为 sensor.aidoggy_iicport 的 A/B/C/D（1/2/3/4），不能套用输出模块或 AI 系列端口。MiniHexa 使用 hiwonder-dev-onboard，通过 minihexa_led_ultrasonic_init 生成 `sonar = Hiwonder_DEV.DEV_SONAR()`，没有 Port 包装或可选端口。

MiniHexa 的旧通用 aimech_led_ultrasonic_init 保留为隐藏兼容块，PORT 名称和已保存值不改，但按当前主控生成正确的无参初始化。旧 aimech_iicport 菜单声明继续保留用于恢复 shadow，不应视为新的硬件端口支持。配置与默认绑定由[库配置](../../../../docs/configuration.md)维护。

测距和灯光复用此 sonar 对象，不在读取/控制积木中偷偷补默认端口初始化。普通超声波使用另一套 SDK 和 sonar_PORT，不能互换或覆盖。

| opcode | 规则 |
| - | - |
| aimech_led_ultrasonic_init | 显式初始化 sonar |
| aimech_get_led_ultrasonic_distance | sonar.getDistance()，文案单位 cm |
| aimech_set_led_ultrasonic_color | square_color 控件；sonar.setRGB(NUMS,{COLOR.rgb}) |
| aimech_set_led_ultrasonic_color_arg | RED/GREEN/BLUE 为 slider255；setRGB(NUMS,RED,GREEN,BLUE) |
| aimech_close_led_ultrasonic | setRGB(NUMS,0x00,0x00,0x00)，不新增写入或刷新 |
| aimech_set_led_ultrasonic_breath | setBreathingCycle(NUM,RGB,TIME * 1000)，输入秒转换为毫秒 |
| aimech_set_led_ultrasonic_random | sonar.startSymphony() |

nums 菜单全部=0、灯编号 1/2；num 菜单只有 1/2，不能把全部值 0 加入呼吸周期选择。rgb 的红/绿/蓝为 1/2/3，TIME 默认 1 秒。保留旧菜单数字展示，不未经固件核对添加灯位解释或修改保存值。颜色选择器必须通过 COLOR.rgb 输出三个硬件分量，不能直接拼接 #RRGGBB 字符串。

四语只翻译显示，不改参数、协议值和 Python。修改后按[开发手册](../../../../docs/development.md)与[原生 API](../../../../docs/native-api.md)验证灯号/颜色/端口、非整秒呼吸周期、slider255/square_color 的旧作品恢复、共存卸载和语言切换；真机固件仍需独立验收。
