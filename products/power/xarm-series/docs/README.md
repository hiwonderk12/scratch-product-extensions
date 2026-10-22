# AI 机甲串联机械臂

单 src/index.ts 维护 class / getInfo、集中中英繁韩 messages、菜单及内联 getPython。assets/claw.svg 为实际积木资源，不创建空 Python 目录。见[原生 API](../../../../docs/native-api.md)与[库配置](../../../../docs/configuration.md)。

## 适配与兼容前缀

hiwonder-actuator 激活 actuator、颜色 #2D87C9；hiwonder-xarm 激活 xarm、颜色 #00B2EE。两分支均保留“AI机甲串联机械臂”子分类，使用同一 Hiwonder.Arm_3DOF 驱动；metadata 声明两个允许前缀，但一个实例只激活其一。getInfo 分支显式声明 id/opcode，不移到分支外隐藏归属。

当前公开支持 aimech、aimecanum、aiquadruped、aiquadrupedpro、aihexa、aidoggy，均选择 hiwonder-actuator。xarm 前缀仅保留历史兼容能力，不对其他主控擅自开放。

| opcode | 参数默认值 | Python |
| - | - | - |
| aimech_3dof_arm_init | ARM=0；VALUE1=55、VALUE2=76、VALUE3=27、VALUE4=120 | 显式收集 dof3Arm = Hiwonder.Arm_3DOF(VALUE1,VALUE2,VALUE3,VALUE4,ARM) |
| aimech_3dof_arm_move | VALUE1=0、VALUE2=0、VALUE3=0、VALUE4=1000 | dof3Arm.move_to_yz(VALUE1,VALUE2,VALUE3,VALUE4) |

ARM 菜单 arm_3dof 的短/长机械臂分别为 0 / 1；只翻译文字，不更改值或给 Python 数字加引号。构造参数顺序与积木参数排列不同，ARM 放在最后，不能机械重排。移动坐标单位为毫米、姿态角度为度、时长为毫秒；运动积木不自动补初始化。导入按需收集 import Hiwonder，相同初始化去重。

## 维护验证

验证两个前缀、两种臂型、非默认尺寸/坐标/角度/时长、初始化依赖与完整 Python；和基础/连杆机械臂共同恢复与卸载不互相删除。四语切换保留菜单、保存值、参数与 Python，未知适配明确拒绝。

```sh
node tools/cli/index.mjs check power/xarm-series
node tools/cli/index.mjs pack power/xarm-series
```

固件、硬件及专业译文审校需另行完成。
