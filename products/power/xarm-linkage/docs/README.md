# AI 机甲连杆机械臂

单 src/index.ts 维护 class / getInfo、集中中英繁韩 messages、菜单和内联 getPython；无需额外 Python 文件或空资源目录。见[原生 API](../../../../docs/native-api.md)与[库配置](../../../../docs/configuration.md)。

## 适配与兼容前缀

metadata 声明 actuator / xarm。hiwonder-actuator 返回 actuator、蓝色 #2D87C9 和“AI机甲连杆机械臂”子分类；hiwonder-xarm 返回 xarm、青色 #00B2EE 和“连杆机械臂”子分类。每个实例只激活一个前缀，getInfo 中各分支显式声明 id/opcode，便于静态索引归属。

当前公开支持 aimech、aimecanum、aiquadruped、aiquadrupedpro、aihexa、aidoggy，均选择 hiwonder-actuator。xarm 历史前缀保留在原生类，不表示已对真实主控开放。两个分支使用相同 Hiwonder.Arm_Link SDK，不添加虚构的主控接口差异。

| opcode | 默认值 / 类型 | Python |
| - | - | - |
| aimech_rod_arm_init | 无参数，command | 显式收集 rodArm = Hiwonder.Arm_Link()，无运行语句 |
| aimech_rod_reach_detect | VALUE1=0、VALUE2=0，Boolean | rodArm.is_s1s2_angle(VALUE1,VALUE2) |
| aimech_rod_arm_move | VALUE1=0、VALUE2=0、VALUE3=1000 ms、VALUE4=False | rodArm.move_to_yz(VALUE1,VALUE2,VALUE3,VALUE4) |

导入按实际积木收集 import Hiwonder。检测与运动不会自动补对象初始化，课程应显式连接初始化积木。delay_select 的“不延时/延时”只翻译显示文字，False / True 始终作为 Python 布尔表达式，不加引号。保留坐标、毫秒和旧参数名，不自动换算单位。

## 维护验证

分别验证两个前缀的完整控件/颜色/分组、两菜单值、Boolean 读取、初始化去重，以及和基础/串联机械臂共存、作品恢复、独立卸载。四语切换不能更改保存值或 Python；未知适配须拒绝。

```sh
node tools/cli/index.mjs check power/xarm-linkage
node tools/cli/index.mjs pack power/xarm-linkage
```

固件、硬件及专业译文审校需另行完成。
