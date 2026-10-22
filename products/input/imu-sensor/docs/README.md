# 外接 IMU 传感器维护说明

主要维护 `src/index.ts` 的 class/getInfo、集中中英繁韩 messages、菜单及 getPython。元数据和图标分别在 `metadata.json`、`assets/acceleration.svg`。namespace 保持 sensor，不改已有四个 opcode。

## 驱动与对象隔离

当前公开支持项选择 hiwonder-dev-port。`aimech_imu_init` 显式收集 import Hiwonder_DEV 和 `imu_sensor = Hiwonder_DEV.DEV_IMU(Hiwonder_DEV.Port({PORT}))`。PORT 为 aimech_iicport：A/B/C/D/E/J/K 对应 1/2/3/4/5/9/10，默认 1。

外接模块对象必须是 imu_sensor；主控自己的 imu 初始化/校准使用 imu，两者不能合并或覆盖。读取规则不隐式补默认端口初始化，也不自动校准。

| opcode | 语义 |
| - | - |
| aimech_imu_init | 显式初始化外接 imu_sensor |
| get_euler_angle_element_value | imu_sensor.read_euler()[VALUE] |
| get_euler_angle | imu_sensor.read_euler() |
| get_euler_angle_element | 仅输出 VALUE 索引，不读取传感器 |

euler_element 菜单保持旧排列：Z 轴=0、X 轴=1、Y 轴=2。不得按常见 XYZ 顺序重新编号；轴选择 reporter 也不能改成读取表达式。文案可翻译，协议值不可改。

支持范围见[配置手册](../../../../docs/configuration.md)。修改后按[开发手册](../../../../docs/development.md)与[原生 API](../../../../docs/native-api.md)验证所有轴/端口、主控 imu 校准与外接 imu_sensor 共存、完整 Python、旧作品和四语切换，实际 SDK/硬件另行验收。
