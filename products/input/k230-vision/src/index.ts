// K230 作者入口：功能分组只改变侧栏，旧 opcode、主控分支及 Python 规则保持独立。
import type {ExtensionBlock, ExtensionContext, ExtensionInfo, NativeExtension, PythonTemplate} from '../../../../tools/sdk';

export const messages = {
    "zh-cn": {
        "group.online": "在线大模型",
        "group.face": "人脸识别",
        "group.face-pose": "人脸姿态",
        "group.expression": "表情识别",
        "group.gaze": "注视方向",
        "group.person": "人体检测",
        "group.person-points": "人体关键点",
        "group.hand": "手掌关键点",
        "group.gesture": "手势识别",
        "group.fall": "跌倒检测",
        "group.target": "目标追踪",
        "group.dynamic-gesture": "动态手势",
        "group.self-learn": "自学习",
        "group.single-color": "单颜色检测",
        "group.multi-color": "多颜色检测",
        "group.line": "线检测",
        "group.ocr": "文字识别",
        "group.license-plate": "车牌识别",
        "group.object-classify": "物体分类",
        "group.object": "物体检测",
        "group.trash": "垃圾分类",
        "group.traffic": "交通检测",
        "group.apriltag": "AprilTag识别",
        "group.dm-code": "DM码识别",
        "group.qr-code": "二维码识别",
        "group.barcode": "条形码识别",
        "product.name": "K230视觉模块",
        "block.k230_aimech_init": "初始化K230视觉模块接口 [PORT]",
        "block.k230_set_mode": "设置K230运行模式 [MODE]",
        "block.k230_set_run": "K230 [MODE] 运行检测",
        "block.k230_set_volumn": "设置K230音量 [VALUE]",
        "block.k230_set_wifi": "设置K230连接的WIFI名 [VALUE1] 密码 [VALUE2]",
        "block.k230_update_detect_result": "更新并保存K230结果数据",
        "block.k230_mcp_action_setting": "设置动作组MCP工具参数 工具描述 [COMMAND] 阻塞超时时长 [BLOCK]",
        "block.k230_mcp_move_setting": "设置运动MCP工具参数 工具描述 [COMMAND] 阻塞超时时长 [BLOCK]",
        "block.k230_mcp_setting": "设置MCP工具参数 工具名称 [NAME] 工具描述 [COMMAND] 返回参数 [PARAMS] 阻塞超时时长 [BLOCK]",
        "block.k230_result_exists": "K230识别结果存在?",
        "block.k230_get_result": "获取K230识别结果",
        "block.k230_send_mcp_result": "K230发送响应结果 [VALUE]",
        "block.k230_aimecanum_set_mcp_default": "设置K230默认MCP工具",
        "block.k230_aiquadruped_set_mcp_default": "设置K230默认MCP工具",
        "block.k230_aiquadrupedpro_set_mcp_default": "设置K230默认MCP工具",
        "block.k230_aihexa_set_mcp_default": "设置K230默认MCP工具",
        "block.k230_get_default_mcp_name": "[RESULT] 是否存在默认MCP工具名称 [VALUE]?",
        "block.k230_get_buzzer_params": "[RESULT] 获取蜂鸣器返回参数 [VALUE] 值",
        "block.k230_get_rgb_light_params": "[RESULT] 获取RGB彩灯返回参数 [VALUE] 值",
        "block.k230_get_sonar_rgb_params": "[RESULT] 获取发光超声波RGB彩灯返回参数 [VALUE] 值",
        "block.k230_get_arm_claw_params": "[RESULT] 获取机械臂夹爪返回参数 [VALUE] 值",
        "block.k230_get_robot_set_pose_params": "[RESULT] 获取姿态设置返回参数 [VALUE] 值",
        "block.k230_get_robot_move_params": "[RESULT] 获取机器人运动返回参数 [VALUE] 值",
        "block.k230_get_robot_runAction_params": "[RESULT] 获取机器人动作组返回参数 [VALUE] 值",
        "block.k230_motor_speed_params": "[RESULT] 获取电机速度设置返回参数 [VALUE] 值",
        "block.k230_get_move_distance_params": "[RESULT] 获取移动距离设置返回参数 [VALUE] 值",
        "block.k230_get_arm_move_to_yz_params": "[RESULT] 获取机械臂运动返回参数 [VALUE] 值",
        "block.k230_face_detected": "K230检测到人脸?",
        "block.k230_face_count": "K230检测到的人脸数量",
        "block.k230_face_exists": "K230存在名称为 [VALUE] 的人脸?",
        "block.k230_face_recognition_get_arg_by_name": "获取K230人脸 [VALUE] 的 [POS]",
        "block.k230_face2_detected": "K230人脸姿态检测到人脸?",
        "block.k230_face2_count": "K230人脸姿态检测到的人脸数量",
        "block.k230_result_face_pose_get_oriention": "K230靠近中心的人脸姿态朝向 [ORIENTION]",
        "block.k230_face2_near_center": "K230靠近中心的人脸姿态 [VALUE]",
        "block.k230_face3_detected": "K230表情识别检测到人脸?",
        "block.k230_face3_count": "K230表情识别检测到的人脸数量",
        "block.k230_facial_detect": "K230靠近中心的人脸表情为 [VALUE]",
        "block.k230_get_facial_args": "获取K230靠近中心人脸表情的 [POS] 参数",
        "block.k230_gaze_detected": "K230检测到注视方向?",
        "block.k230_gaze_count": "K230检测到的注视方向数量",
        "block.k230_gaze_near_center_result": "K230靠近中心的注视方向为 [NAME]",
        "block.k230_gaze_near_center": "K230靠近中心的注视方向 [VALUE]",
        "block.k230_person_detected": "K230检测到人体?",
        "block.k230_person_count": "K230检测到的人体数量",
        "block.k230_person_near_center": "K230靠近中心的人体 [VALUE]",
        "block.k230_person_point_detected": "K230检测到人体姿态?",
        "block.k230_person2_count": "K230检测到的人体姿态数量",
        "block.k230_person_keypoint_detect_name": "K230检测到人体姿态 [NAME]?",
        "block.k230_result_person_keypoint_get_arg": "获取K230人体姿态 [NAME] 的 [POS] 参数",
        "block.k230_person_keypoint_near_center": "获取K230靠近中心的人体关键点 [POS] 参数",
        "block.k230_hand_detected": "K230检测到手掌?",
        "block.k230_hand_count": "K230检测到的手掌数量",
        "block.k230_hand_detected_posture": "K230检测到手掌姿态 [NAME]?",
        "block.k230_result_hand_keypoint_get_arg": "获取K230手掌姿态 [NAME] 的 [POS] 参数",
        "block.k230_hand_near_center": "获取K230靠近中心的手掌 [VALUE] 参数",
        "block.k230_gesture_detected": "K230检测到手势?",
        "block.k230_gesture_count": "K230检测到的手势数量",
        "block.k230_result_hand_gesture_get_arg": "K230靠近中心的手势为 [VALUE]?",
        "block.k230_result_hand_gesture_get_pos_arg_by_name": "获取K230 [NAME] 手势的 [POS] 参数",
        "block.k230_result_hand_gesture_get_pos_arg": "获取K230靠近中心手势识别结果的 [POS] 参数",
        "block.k230_fall_detected": "K230检测到跌倒?",
        "block.k230_fall_count": "K230检测到的跌倒数量",
        "block.k230_fall_near_center_result": "K230靠近中心的目标处于跌倒状态?",
        "block.k230_fall_near_center": "获取K230靠近中心跌倒检测的 [VALUE] 参数",
        "block.k230_target_detected": "K230检测到追踪目标?",
        "block.k230_target_near_center": "获取K230靠近中心追踪目标的 [VALUE] 参数",
        "block.k230_dynamic_gesture_detected": "K230检测到动态手势?",
        "block.k230_result_dynamic_gesture_get_arg": "K230动态手势为 [GESTURE]?",
        "block.k230_result_self_learn_get_arg": "K230识别到自学习 [NAME] 画面?",
        "block.k230_result_self_learn_get_pos_arg": "获取K230自学习 [NAME] 的 [POS] 参数",
        "block.k230_set_single_color": "设置K230单颜色检测目标为 [COLOR]",
        "block.k230_set_single_color_arg": "设置K230单颜色检测目标为 [COLOR]",
        "block.k230_single_color_detected": "K230单颜色检测到颜色?",
        "block.k230_result_single_color_get_pos_arg": "获取K230单颜色检测的 [POS] 参数",
        "block.k230_set_multi_color_arg": "设置K230多颜色检测列表 [COLOR]",
        "block.k230_color_detected": "K230多颜色检测到颜色?",
        "block.k230_color_count": "K230检测到的颜色数量",
        "block.k230_color_near_center_name": "K230检测到颜色 [NAME]?",
        "block.k230_color_near_center": "获取K230靠近中心颜色的 [VALUE] 参数",
        "block.k230_result_multi_color_get_pos_arg": "获取K230颜色 [NAME] 检测结果的 [POS] 参数",
        "block.k230_set_line_color": "设置K230线检测颜色为 [COLOR]",
        "block.k230_set_line_color_arg": "设置K230线检测颜色为 [COLOR]",
        "block.k230_line_detected": "K230检测到线?",
        "block.k230_result_line_detect_get_arg": "获取K230线检测结果 [VALUE]",
        "block.k230_ocr_detected": "K230检测到文字?",
        "block.k230_ocr_count": "K230检测到的文字数量",
        "block.k230_result_ocr_get_arg": "获取K230文字识别结果",
        "block.k230_result_ocr_get_pos_arg": "获取K230文字识别结果的 [POINT] 参数",
        "block.k230_license_plate_detected": "K230检测到车牌?",
        "block.k230_license_plate_count": "K230检测到的车牌数量",
        "block.k230_result_lpr_get_arg": "获取K230车牌识别结果",
        "block.k230_result_lpr_get_pos_arg": "获取K230车牌识别结果的 [POINT] 参数",
        "block.k230_object_detected": "K230检测到物体?",
        "block.k230_object_count": "K230检测到的物体数量",
        "block.k230_object_classify_parameter": "获取K230物体分类结果的 [POS] 参数",
        "block.k230_object_named_detected": "K230检测到 [NAME]?",
        "block.k230_object_parameter": "获取K230物体检测结果的 [POS] 参数",
        "block.k230_trash_detected": "K230检测到垃圾?",
        "block.k230_trash_count": "K230检测到的垃圾数量",
        "block.k230_result_garbage_get_name_arg": "K230靠近中心的垃圾名称为 [VALUE]?",
        "block.k230_trash_near_center": "获取K230靠近中心垃圾的 [POS] 参数",
        "block.k230_result_garbage_get_pos_arg": "获取K230靠近中心垃圾的 [POS] 坐标",
        "block.k230_traffic_sign_detected": "K230检测到交通标志?",
        "block.k230_traffic_sign_count": "K230检测到的交通标志数量",
        "block.k230_result_traffic_get_name_arg": "K230靠近中心的交通检测结果名称为 [NAME]?",
        "block.k230_traffic_sign_near_center": "获取K230靠近中心交通标志的 [POS] 参数",
        "block.k230_april_tag_detected": "K230检测到AprilTag?",
        "block.k230_april_tag_count": "K230检测到的AprilTag数量",
        "block.k230_result_apriltag_get_name_arg": "K230靠近中心的AprilTag文本为 [NAME]?",
        "block.k230_april_tag_near_center": "获取K230靠近中心AprilTag的 [POS] 参数",
        "block.k230_result_apriltag_get_pos_arg": "获取K230靠近中心AprilTag的 [POS] 坐标",
        "block.k230_dm_code_detected": "K230检测到DM码?",
        "block.k230_dm_code_count": "K230检测到的DM码数量",
        "block.k230_result_dmcode_get_name_arg": "K230靠近中心的DM码文本为 [NAME]?",
        "block.k230_dm_code_near_center": "获取K230靠近中心DM码的文本",
        "block.k230_result_dmcode_get_pos_arg": "获取K230靠近中心DM码的 [POS] 坐标",
        "block.k230_qr_code_detected": "K230检测到二维码?",
        "block.k230_qr_code_count": "K230检测到的二维码数量",
        "block.k230_result_orcode_get_arg": "K230靠近中心的二维码文本为 [NAME]?",
        "block.k230_qr_code_near_center": "获取K230靠近中心二维码的文本",
        "block.k230_result_orcode_get_pos_arg": "获取K230靠近中心二维码的 [POS] 参数",
        "block.k230_barcode_detected": "K230检测到条形码?",
        "block.k230_barcode_count": "K230检测到的条形码数量",
        "block.k230_result_barcode_get_arg": "K230靠近中心的条形码文本为 [NAME]?",
        "block.k230_barcode_near_center": "获取K230靠近中心条形码的文本",
        "block.k230_result_barcode_get_pos_arg": "获取K230靠近中心条形码的 [POS] 参数",
        "menu.arm_claw_params.angle": "角度",
        "menu.arm_move_to_yz_params.y": "机械臂末端Y坐标",
        "menu.arm_move_to_yz_params.z": "机械臂末端Z坐标",
        "menu.arm_move_to_yz_params.angle": "机械臂末端的倾角",
        "menu.arm_move_to_yz_params.timeout": "运动时间(ms)",
        "menu.axis_result.x": "中心X坐标",
        "menu.axis_result.y": "中心Y坐标",
        "menu.axis_result.w": "宽度",
        "menu.axis_result.h": "高度",
        "menu.buzzer_params.freq": "蜂鸣器频率",
        "menu.buzzer_params.time_count": "鸣响时间(ms)",
        "menu.color_angle_axis_result.color": "名称",
        "menu.color_angle_axis_result.angle": "角度",
        "menu.color_angle_axis_result.cx": "中心X坐标",
        "menu.color_angle_axis_result.cy": "中心Y坐标",
        "menu.color_angle_axis_result.w": "宽度",
        "menu.color_angle_axis_result.h": "高度",
        "menu.color_li.red": "红",
        "menu.color_li.green": "绿",
        "menu.color_li.blue": "蓝",
        "menu.color_li.black": "黑",
        "menu.color_li.white": "白",
        "menu.face2_args.0": "姿态",
        "menu.face2_args.1": "置信度",
        "menu.face2_args.2": "翻滚角(roll)",
        "menu.face2_args.3": "俯仰角(pitch)",
        "menu.face2_args.4": "偏航角(yaw)",
        "menu.face2_args.x": "中心X坐标",
        "menu.face2_args.y": "中心Y坐标",
        "menu.face2_args.w": "宽度",
        "menu.face2_args.h": "高度",
        "menu.face_args.0": "名称",
        "menu.face_args.1": "置信度",
        "menu.face_args.x": "中心X坐标",
        "menu.face_args.y": "中心Y坐标",
        "menu.face_args.w": "宽度",
        "menu.face_args.h": "高度",
        "menu.face_args2.1": "置信度",
        "menu.face_args2.x": "中心X坐标",
        "menu.face_args2.y": "中心Y坐标",
        "menu.face_args2.w": "宽度",
        "menu.face_args2.h": "高度",
        "menu.face_args3.0": "名称",
        "menu.face_args3.x": "中心X坐标",
        "menu.face_args3.y": "中心Y坐标",
        "menu.face_args3.w": "宽度",
        "menu.face_args3.h": "高度",
        "menu.face_pos_oriention.Forward": "前",
        "menu.face_pos_oriention.Down": "下",
        "menu.face_pos_oriention.Left": "左",
        "menu.face_pos_oriention.Right": "右",
        "menu.face_pos_oriention.unknown": "未知",
        "menu.facial_result.Happiness": "高兴",
        "menu.facial_result.Angry": "愤怒",
        "menu.facial_result.Disgust": "厌恶",
        "menu.facial_result.Fear": "恐惧",
        "menu.facial_result.Neutral": "中性",
        "menu.facial_result.Sadness": "伤心",
        "menu.facial_result.Surprise": "惊讶",
        "menu.garbage.BananaPeel": "香蕉皮",
        "menu.garbage.BrokenBones": "碎骨头",
        "menu.garbage.CigaretteEnd": "烟头",
        "menu.garbage.DisposableChopsticks": "一次性筷子",
        "menu.garbage.Ketchup": "番茄酱",
        "menu.garbage.Marker": "记号笔",
        "menu.garbage.OralLiquidBottle": "口服液瓶",
        "menu.garbage.Plate": "盘子",
        "menu.garbage.PlasticBottle": "塑料瓶",
        "menu.garbage.StorageBattery": "蓄电池",
        "menu.garbage.Toothbrush": "牙刷",
        "menu.garbage.Umbrella": "雨伞",
        "menu.gaze_name.Up": "上",
        "menu.gaze_name.Down": "下",
        "menu.gaze_name.Left": "左",
        "menu.gaze_name.Right": "右",
        "menu.gaze_name.unknow": "未知",
        "menu.gaze_result.0": "名称",
        "menu.gaze_result.1": "置信度",
        "menu.gaze_result.2": "眼睛中心X坐标",
        "menu.gaze_result.3": "眼睛中心Y坐标",
        "menu.gaze_result.4": "目标中心X坐标",
        "menu.gaze_result.5": "目标中心Y坐标",
        "menu.gaze_result.x": "中心X坐标",
        "menu.gaze_result.y": "中心Y坐标",
        "menu.gaze_result.w": "宽度",
        "menu.gaze_result.h": "高度",
        "menu.hand_gesture.ok": "OK手势",
        "menu.hand_gesture.fist": "拳头",
        "menu.hand_gesture.five": "数字5",
        "menu.hand_gesture.gun": "手枪",
        "menu.hand_gesture.love": "比心",
        "menu.hand_gesture.one": "数字1",
        "menu.hand_gesture.six": "数字6",
        "menu.hand_gesture.three": "数字3",
        "menu.hand_gesture.thumbUp": "点赞",
        "menu.hand_gesture.yeah": "胜利",
        "menu.hand_menu.id": "名称",
        "menu.hand_menu.score": "置信度",
        "menu.hand_menu.x": "中心X坐标",
        "menu.hand_menu.y": "中心Y坐标",
        "menu.hand_menu.w": "宽度",
        "menu.hand_menu.h": "高度",
        "menu.hand_menu.0": "手腕X坐标",
        "menu.hand_menu.1": "手腕Y坐标",
        "menu.hand_menu.2": "拇指点1X坐标",
        "menu.hand_menu.3": "拇指点1Y坐标",
        "menu.hand_menu.4": "拇指点2X坐标",
        "menu.hand_menu.5": "拇指点2Y坐标",
        "menu.hand_menu.6": "拇指点3X坐标",
        "menu.hand_menu.7": "拇指点3Y坐标",
        "menu.hand_menu.8": "拇指点4X坐标",
        "menu.hand_menu.9": "拇指点4Y坐标",
        "menu.hand_menu.10": "食指点1X坐标",
        "menu.hand_menu.11": "食指点1Y坐标",
        "menu.hand_menu.12": "食指点2X坐标",
        "menu.hand_menu.13": "食指点2Y坐标",
        "menu.hand_menu.14": "食指点3X坐标",
        "menu.hand_menu.15": "食指点3Y坐标",
        "menu.hand_menu.16": "食指点4X坐标",
        "menu.hand_menu.17": "食指点4Y坐标",
        "menu.hand_menu.18": "中指点1X坐标",
        "menu.hand_menu.19": "中指点1Y坐标",
        "menu.hand_menu.20": "中指点2X坐标",
        "menu.hand_menu.21": "中指点2Y坐标",
        "menu.hand_menu.22": "中指点3X坐标",
        "menu.hand_menu.23": "中指点3Y坐标",
        "menu.hand_menu.24": "中指点4X坐标",
        "menu.hand_menu.25": "中指点4Y坐标",
        "menu.hand_menu.26": "无名指点1X坐标",
        "menu.hand_menu.27": "无名指点1Y坐标",
        "menu.hand_menu.28": "无名指点2X坐标",
        "menu.hand_menu.29": "无名指点2Y坐标",
        "menu.hand_menu.30": "无名指点3X坐标",
        "menu.hand_menu.31": "无名指点3Y坐标",
        "menu.hand_menu.32": "无名指点4X坐标",
        "menu.hand_menu.33": "无名指点4Y坐标",
        "menu.hand_menu.34": "小指点1X坐标",
        "menu.hand_menu.35": "小指点1Y坐标",
        "menu.hand_menu.36": "小指点2X坐标",
        "menu.hand_menu.37": "小指点2Y坐标",
        "menu.hand_menu.38": "小指点3X坐标",
        "menu.hand_menu.39": "小指点3Y坐标",
        "menu.hand_menu.40": "小指点4X坐标",
        "menu.hand_menu.41": "小指点4Y坐标",
        "menu.k230_mode.0": "空模式",
        "menu.k230_mode.13": "在线大模型",
        "menu.k230_mode.1": "人脸识别",
        "menu.k230_mode.2": "人脸姿态",
        "menu.k230_mode.3": "表情识别",
        "menu.k230_mode.4": "注视方向",
        "menu.k230_mode.5": "人体检测",
        "menu.k230_mode.6": "人体关键点",
        "menu.k230_mode.7": "手部关键点",
        "menu.k230_mode.8": "手势识别",
        "menu.k230_mode.9": "跌倒检测",
        "menu.k230_mode.10": "目标跟踪",
        "menu.k230_mode.11": "动态手势",
        "menu.k230_mode.12": "自学习",
        "menu.k230_mode.14": "单颜色检测",
        "menu.k230_mode.15": "多颜色检测",
        "menu.k230_mode.16": "线检测",
        "menu.k230_mode.18": "文字识别",
        "menu.k230_mode.19": "车牌识别",
        "menu.k230_mode.20": "物体分类",
        "menu.k230_mode.21": "物体检测",
        "menu.k230_mode.22": "垃圾分类",
        "menu.k230_mode.23": "交通检测",
        "menu.k230_mode.24": "AprilTag识别",
        "menu.k230_mode.25": "DM码识别",
        "menu.k230_mode.26": "二维码识别",
        "menu.k230_mode.27": "条形码识别",
        "menu.k230_start.True": "启动",
        "menu.k230_start.False": "停止",
        "menu.line_result.center_pos": "中心X坐标",
        "menu.line_result.angle": "角度",
        "menu.line_result.color": "颜色",
        "menu.name_confidence.0": "文本",
        "menu.name_confidence.1": "置信度",
        "menu.obj_menu.0": "名称",
        "menu.obj_menu.x": "中心X坐标",
        "menu.obj_menu.y": "中心Y坐标",
        "menu.objs.person": "人",
        "menu.objs.bicycle": "自行车",
        "menu.objs.car": "小汽车",
        "menu.objs.motorcycle": "摩托车",
        "menu.objs.airplane": "飞机",
        "menu.objs.bus": "公交车",
        "menu.objs.train": "火车",
        "menu.objs.truck": "卡车",
        "menu.objs.boat": "船",
        "menu.objs.traffic light": "交通信号灯",
        "menu.objs.fire hydrant": "消防栓",
        "menu.objs.stop sign": "停车牌",
        "menu.objs.parking meter": "停车收费系统",
        "menu.objs.bench": "长椅",
        "menu.objs.bird": "鸟",
        "menu.objs.cat": "猫",
        "menu.objs.dog": "狗",
        "menu.objs.horse": "马",
        "menu.objs.sheep": "羊",
        "menu.objs.cow": "牛",
        "menu.objs.elephant": "大象",
        "menu.objs.bear": "熊",
        "menu.objs.zebra": "斑马",
        "menu.objs.giraffe": "长颈鹿",
        "menu.objs.backpack": "背包",
        "menu.objs.umbrella": "雨伞",
        "menu.objs.handbag": "手提包",
        "menu.objs.tie": "领带",
        "menu.objs.suitcase": "行李箱",
        "menu.objs.frisbee": "飞盘",
        "menu.objs.skis": "滑雪板",
        "menu.objs.snowboard": "雪板",
        "menu.objs.sports ball": "运动球",
        "menu.objs.kite": "风筝",
        "menu.objs.baseball bat": "棒球棒",
        "menu.objs.baseball glove": "棒球手套",
        "menu.objs.skateboard": "滑板",
        "menu.objs.surfboard": "冲浪板",
        "menu.objs.tennis racket": "网球拍",
        "menu.objs.bottle": "瓶子",
        "menu.objs.wine glass": "酒杯",
        "menu.objs.cup": "杯子",
        "menu.objs.fork": "叉子",
        "menu.objs.knife": "刀",
        "menu.objs.spoon": "勺子",
        "menu.objs.bowl": "碗",
        "menu.objs.banana": "香蕉",
        "menu.objs.apple": "苹果",
        "menu.objs.sandwich": "三明治",
        "menu.objs.orange": "橙子",
        "menu.objs.broccoli": "西兰花",
        "menu.objs.carrot": "胡萝卜",
        "menu.objs.hot dog": "热狗",
        "menu.objs.pizza": "披萨",
        "menu.objs.donut": "甜甜圈",
        "menu.objs.cake": "蛋糕",
        "menu.objs.chair": "椅子",
        "menu.objs.couch": "沙发",
        "menu.objs.potted plant": "盆栽",
        "menu.objs.bed": "床",
        "menu.objs.dining table": "餐桌",
        "menu.objs.toilet": "马桶",
        "menu.objs.tv": "电视",
        "menu.objs.laptop": "笔记本电脑",
        "menu.objs.mouse": "鼠标",
        "menu.objs.remote": "遥控器",
        "menu.objs.keyboard": "键盘",
        "menu.objs.cell phone": "手机",
        "menu.objs.microwave": "微波炉",
        "menu.objs.oven": "烤箱",
        "menu.objs.toaster": "烤面包机",
        "menu.objs.sink": "水槽",
        "menu.objs.refrigerator": "冰箱",
        "menu.objs.book": "书",
        "menu.objs.clock": "时钟",
        "menu.objs.vase": "花瓶",
        "menu.objs.scissors": "剪刀",
        "menu.objs.teddy bear": "泰迪熊",
        "menu.objs.hair drier": "吹风机",
        "menu.objs.toothbrush": "牙刷",
        "menu.ocr_point.0": "左上X",
        "menu.ocr_point.1": "左上Y",
        "menu.ocr_point.2": "右上X",
        "menu.ocr_point.3": "右上Y",
        "menu.ocr_point.4": "右下X",
        "menu.ocr_point.5": "右下Y",
        "menu.ocr_point.6": "左下X",
        "menu.ocr_point.7": "左下Y",
        "menu.person_keypoint_detect.id": "名称",
        "menu.person_keypoint_detect.score": "置信度",
        "menu.person_keypoint_detect.0": "鼻子X坐标",
        "menu.person_keypoint_detect.1": "鼻子Y坐标",
        "menu.person_keypoint_detect.2": "左眼X坐标",
        "menu.person_keypoint_detect.3": "左眼Y坐标",
        "menu.person_keypoint_detect.4": "右眼X坐标",
        "menu.person_keypoint_detect.5": "右眼Y坐标",
        "menu.person_keypoint_detect.6": "左耳X坐标",
        "menu.person_keypoint_detect.7": "左耳Y坐标",
        "menu.person_keypoint_detect.8": "右耳X坐标",
        "menu.person_keypoint_detect.9": "右耳Y坐标",
        "menu.person_keypoint_detect.10": "左肩X坐标",
        "menu.person_keypoint_detect.11": "左肩Y坐标",
        "menu.person_keypoint_detect.12": "右肩X坐标",
        "menu.person_keypoint_detect.13": "右肩Y坐标",
        "menu.person_keypoint_detect.14": "左肘X坐标",
        "menu.person_keypoint_detect.15": "左肘Y坐标",
        "menu.person_keypoint_detect.16": "右肘X坐标",
        "menu.person_keypoint_detect.17": "右肘Y坐标",
        "menu.person_keypoint_detect.18": "左腕X坐标",
        "menu.person_keypoint_detect.19": "左腕Y坐标",
        "menu.person_keypoint_detect.20": "右腕X坐标",
        "menu.person_keypoint_detect.21": "右腕Y坐标",
        "menu.person_keypoint_detect.22": "左髋X坐标",
        "menu.person_keypoint_detect.23": "左髋Y坐标",
        "menu.person_keypoint_detect.24": "右髋X坐标",
        "menu.person_keypoint_detect.25": "右髋Y坐标",
        "menu.person_keypoint_detect.26": "左膝X坐标",
        "menu.person_keypoint_detect.27": "左膝Y坐标",
        "menu.person_keypoint_detect.28": "右膝X坐标",
        "menu.person_keypoint_detect.29": "右膝Y坐标",
        "menu.person_keypoint_detect.30": "左踝X坐标",
        "menu.person_keypoint_detect.31": "左踝Y坐标",
        "menu.person_keypoint_detect.32": "右踝X坐标",
        "menu.person_keypoint_detect.33": "右踝Y坐标",
        "menu.rgb_light_params.red": "红色",
        "menu.rgb_light_params.green": "绿色",
        "menu.rgb_light_params.blue": "蓝色",
        "menu.robot_runAction_params.num": "动作编号",
        "menu.robot_runAction_params.count": "动作执行次数",
        "menu.traffic_sign.go": "前进",
        "menu.traffic_sign.back": "后退",
        "menu.traffic_sign.Left": "左转",
        "menu.traffic_sign.Right": "右转",
        "menu.traffic_sign.stop": "停止",
        "menu.arm_move_to_yz_params2.y": "机械臂末端Y坐标",
        "menu.arm_move_to_yz_params2.z": "机械臂末端Z坐标",
        "menu.arm_move_to_yz_params2.timeout": "运动时间(ms)",
        "menu.mcp_names3.Bat_Battery_power": "电池电压",
        "menu.mcp_names3.Buzzer_playTone": "蜂鸣器播放",
        "menu.mcp_names3.RGB_setRGB": "设置RGB灯",
        "menu.mcp_names3.mcar_set_motors_speed": "电机速度",
        "menu.mcp_names3.mcar_move_distance": "移动距离",
        "menu.mcp_names3.arm_move_to_yz": "机械臂运动",
        "menu.mcp_names3.arm_claw": "机械爪控制",
        "menu.mcp_names3.sonar_getDistance": "发光超声波测距",
        "menu.mcp_names3.sonar_setRGB": "发光超声波颜色设置",
        "menu.motor_speed_params.right_back": "右后轮电机速度",
        "menu.motor_speed_params.right_front": "右前轮电机速度",
        "menu.motor_speed_params.left_back": "左后轮电机速度",
        "menu.motor_speed_params.left_front": "左前轮电机速度",
        "menu.motor_speed_params.time_count": "持续时间(ms)",
        "menu.move_distance_params.distance_cm": "移动距离(cm)",
        "menu.move_distance_params.angle_deg": "移动方向",
        "menu.move_distance_params.rpm": "转动速度(rpm)",
        "menu.mcp_names2.Bat_Battery_power": "电池电压",
        "menu.mcp_names2.Buzzer_playTone": "蜂鸣器播放",
        "menu.mcp_names2.RGB_setRGB": "设置RGB灯",
        "menu.mcp_names2.robot_move": "机器人移动",
        "menu.mcp_names2.arm_move_to_yz": "机械臂运动",
        "menu.mcp_names2.arm_claw": "机械爪控制",
        "menu.mcp_names2.sonar_getDistance": "发光超声波测距",
        "menu.mcp_names2.sonar_setRGB": "发光超声波颜色设置",
        "menu.mcp_names2.robot_runAction": "动作组运行",
        "menu.robot_move_params2.state": "方向",
        "menu.robot_move_params2.steps": "步数",
        "menu.robot_move_params2.time": "每一步运动时间",
        "menu.robot_move_params2.leg1": "大腿移动幅度",
        "menu.robot_move_params2.leg2": "小腿外翻幅度",
        "menu.robot_move_params2.turn_offset": "偏差角",
        "menu.mcp_names.Bat_Battery_power": "电池电压",
        "menu.mcp_names.Buzzer_playTone": "蜂鸣器播放",
        "menu.mcp_names.RGB_setRGB": "设置RGB灯",
        "menu.mcp_names.robot_move": "机器人移动",
        "menu.mcp_names.robot_set_pose": "机器人姿态",
        "menu.mcp_names.arm_move_to_yz": "机械臂运动",
        "menu.mcp_names.arm_claw": "机械爪控制",
        "menu.mcp_names.sonar_getDistance": "发光超声波测距",
        "menu.mcp_names.sonar_setRGB": "发光超声波颜色设置",
        "menu.mcp_names.robot_runAction": "动作组运行",
        "menu.robot_move_params.x": "X轴方向速度",
        "menu.robot_move_params.y": "Y轴方向速度",
        "menu.robot_move_params.z": "中心旋转速度",
        "menu.robot_move_params.height": "抬腿高度",
        "menu.robot_move_params.period": "每一步运动周期(ms)",
        "menu.robot_move_params.step": "步数",
        "menu.robot_set_pose_params.x_offset": "X轴方向偏移",
        "menu.robot_set_pose_params.y_offset": "Y轴方向偏移",
        "menu.robot_set_pose_params.z_offset": "身体抬升降低",
        "menu.robot_set_pose_params.run_time": "变化时间(ms)"
    },
    "en": {
        "group.online": "Online large model",
        "group.face": "face recognition",
        "group.face-pose": "face pose",
        "group.expression": "Expression recognition",
        "group.gaze": "gaze direction",
        "group.person": "Human detection",
        "group.person-points": "key points of human body",
        "group.hand": "Palm key points",
        "group.gesture": "Gesture recognition",
        "group.fall": "Fall detection",
        "group.target": "target tracking",
        "group.dynamic-gesture": "dynamic gestures",
        "group.self-learn": "self-study",
        "group.single-color": "Single color detection",
        "group.multi-color": "Multi-color detection",
        "group.line": "Line detection",
        "group.ocr": "text recognition",
        "group.license-plate": "license plate recognition",
        "group.object-classify": "Object classification",
        "group.object": "Object detection",
        "group.trash": "Garbage classification",
        "group.traffic": "traffic detection",
        "group.apriltag": "AprilTag recognition",
        "group.dm-code": "DM code identification",
        "group.qr-code": "QR code recognition",
        "group.barcode": "Barcode recognition",
        "product.name": "K230 vision module",
        "block.k230_aimech_init": "Initialize K230 vision module at port [PORT]",
        "block.k230_set_mode": "Set K230 mode to [MODE]",
        "block.k230_set_run": "K230 [MODE] detection",
        "block.k230_set_volumn": "Set K230 volume to [VALUE]",
        "block.k230_set_wifi": "Set K230 Wi-Fi name [VALUE1] password [VALUE2]",
        "block.k230_update_detect_result": "Update and store K230 results",
        "block.k230_mcp_action_setting": "Configure action-group MCP tool description [COMMAND] blocking timeout [BLOCK]",
        "block.k230_mcp_move_setting": "Configure movement MCP tool description [COMMAND] blocking timeout [BLOCK]",
        "block.k230_mcp_setting": "Configure MCP tool name [NAME] description [COMMAND] return parameters [PARAMS] blocking timeout [BLOCK]",
        "block.k230_result_exists": "K230 result available?",
        "block.k230_get_result": "Get K230 recognition results",
        "block.k230_send_mcp_result": "K230 send response [VALUE]",
        "block.k230_aimecanum_set_mcp_default": "Set K230 default MCP tools",
        "block.k230_aiquadruped_set_mcp_default": "Set K230 default MCP tools",
        "block.k230_aiquadrupedpro_set_mcp_default": "Set K230 default MCP tools",
        "block.k230_aihexa_set_mcp_default": "Set K230 default MCP tools",
        "block.k230_get_default_mcp_name": "[RESULT] contains default MCP tool [VALUE]?",
        "block.k230_get_buzzer_params": "[RESULT] get buzzer return parameter [VALUE]",
        "block.k230_get_rgb_light_params": "[RESULT] get RGB light return parameter [VALUE]",
        "block.k230_get_sonar_rgb_params": "[RESULT] get RGB ultrasonic light return parameter [VALUE]",
        "block.k230_get_arm_claw_params": "[RESULT] get robot arm gripper return parameter [VALUE]",
        "block.k230_get_robot_set_pose_params": "[RESULT] get pose setting return parameter [VALUE]",
        "block.k230_get_robot_move_params": "[RESULT] get robot movement return parameter [VALUE]",
        "block.k230_get_robot_runAction_params": "[RESULT] get robot action group return parameter [VALUE]",
        "block.k230_motor_speed_params": "[RESULT] get motor speed setting return parameter [VALUE]",
        "block.k230_get_move_distance_params": "[RESULT] get travel distance setting return parameter [VALUE]",
        "block.k230_get_arm_move_to_yz_params": "[RESULT] get robot arm movement return parameter [VALUE]",
        "block.k230_face_detected": "K230 detects face?",
        "block.k230_face_count": "K230 detected face count",
        "block.k230_face_exists": "K230 has face named [VALUE]?",
        "block.k230_face_recognition_get_arg_by_name": "Get K230 face [VALUE] [POS]",
        "block.k230_face2_detected": "K230 detects face in pose detection?",
        "block.k230_face2_count": "K230 detected face in pose detection count",
        "block.k230_result_face_pose_get_oriention": "K230 face nearest center faces [ORIENTION]",
        "block.k230_face2_near_center": "Get K230 face pose nearest center parameter [VALUE]",
        "block.k230_face3_detected": "K230 detects face in expression recognition?",
        "block.k230_face3_count": "K230 detected face in expression recognition count",
        "block.k230_facial_detect": "K230 face nearest center has expression [VALUE]",
        "block.k230_get_facial_args": "Get K230 facial expression nearest center parameter [POS]",
        "block.k230_gaze_detected": "K230 detects gaze direction?",
        "block.k230_gaze_count": "K230 detected gaze direction count",
        "block.k230_gaze_near_center_result": "K230 gaze nearest center is [NAME]",
        "block.k230_gaze_near_center": "Get K230 gaze direction nearest center parameter [VALUE]",
        "block.k230_person_detected": "K230 detects person?",
        "block.k230_person_count": "K230 detected person count",
        "block.k230_person_near_center": "Get K230 person nearest center parameter [VALUE]",
        "block.k230_person_point_detected": "K230 detects human pose?",
        "block.k230_person2_count": "K230 detected human pose count",
        "block.k230_person_keypoint_detect_name": "K230 detects human pose [NAME]?",
        "block.k230_result_person_keypoint_get_arg": "Get K230 human pose [NAME] parameter [POS]",
        "block.k230_person_keypoint_near_center": "Get K230 human keypoint nearest center parameter [POS]",
        "block.k230_hand_detected": "K230 detects hand?",
        "block.k230_hand_count": "K230 detected hand count",
        "block.k230_hand_detected_posture": "K230 detects hand pose [NAME]?",
        "block.k230_result_hand_keypoint_get_arg": "Get K230 hand pose [NAME] parameter [POS]",
        "block.k230_hand_near_center": "Get K230 hand nearest center parameter [VALUE]",
        "block.k230_gesture_detected": "K230 detects hand gesture?",
        "block.k230_gesture_count": "K230 detected hand gesture count",
        "block.k230_result_hand_gesture_get_arg": "K230 gesture nearest center is [VALUE]?",
        "block.k230_result_hand_gesture_get_pos_arg_by_name": "Get K230 gesture [NAME] parameter [POS]",
        "block.k230_result_hand_gesture_get_pos_arg": "Get K230 hand gesture recognition result nearest center parameter [POS]",
        "block.k230_fall_detected": "K230 detects fall?",
        "block.k230_fall_count": "K230 detected fall count",
        "block.k230_fall_near_center_result": "K230 target nearest center has fallen?",
        "block.k230_fall_near_center": "Get K230 fall detection result nearest center parameter [VALUE]",
        "block.k230_target_detected": "K230 detects tracking target?",
        "block.k230_target_near_center": "Get K230 tracking target nearest center parameter [VALUE]",
        "block.k230_dynamic_gesture_detected": "K230 detects dynamic gesture?",
        "block.k230_result_dynamic_gesture_get_arg": "K230 dynamic gesture is [GESTURE]?",
        "block.k230_result_self_learn_get_arg": "K230 recognizes learned image [NAME]?",
        "block.k230_result_self_learn_get_pos_arg": "Get K230 learned image [NAME] parameter [POS]",
        "block.k230_set_single_color": "Set K230 single-color target to [COLOR]",
        "block.k230_set_single_color_arg": "Set K230 single-color target to [COLOR]",
        "block.k230_single_color_detected": "K230 detects color in single-color detection?",
        "block.k230_result_single_color_get_pos_arg": "Get K230 single-color detection result nearest center parameter [POS]",
        "block.k230_set_multi_color_arg": "Set K230 multi-color detection list [COLOR]",
        "block.k230_color_detected": "K230 detects color in multi-color detection?",
        "block.k230_color_count": "K230 detected color in multi-color detection count",
        "block.k230_color_near_center_name": "K230 detects color [NAME]?",
        "block.k230_color_near_center": "Get K230 color nearest center parameter [VALUE]",
        "block.k230_result_multi_color_get_pos_arg": "Get K230 color [NAME] result parameter [POS]",
        "block.k230_set_line_color": "Set K230 line detection color to [COLOR]",
        "block.k230_set_line_color_arg": "Set K230 line detection color to [COLOR]",
        "block.k230_line_detected": "K230 detects line?",
        "block.k230_result_line_detect_get_arg": "Get K230 line detection result [VALUE]",
        "block.k230_ocr_detected": "K230 detects text?",
        "block.k230_ocr_count": "K230 detected text count",
        "block.k230_result_ocr_get_arg": "Get K230 text recognition result",
        "block.k230_result_ocr_get_pos_arg": "Get K230 text recognition result parameter [POINT]",
        "block.k230_license_plate_detected": "K230 detects license plate?",
        "block.k230_license_plate_count": "K230 detected license plate count",
        "block.k230_result_lpr_get_arg": "Get K230 license plate recognition result",
        "block.k230_result_lpr_get_pos_arg": "Get K230 license plate recognition result parameter [POINT]",
        "block.k230_object_detected": "K230 detects object?",
        "block.k230_object_count": "K230 detected object count",
        "block.k230_object_classify_parameter": "Get K230 object classification result parameter [POS]",
        "block.k230_object_named_detected": "K230 detects [NAME]?",
        "block.k230_object_parameter": "Get K230 object detection result parameter [POS]",
        "block.k230_trash_detected": "K230 detects waste item?",
        "block.k230_trash_count": "K230 detected waste item count",
        "block.k230_result_garbage_get_name_arg": "K230 waste nearest center is named [VALUE]?",
        "block.k230_trash_near_center": "Get K230 waste item nearest center parameter [POS]",
        "block.k230_result_garbage_get_pos_arg": "Get K230 waste nearest center [POS] coordinate",
        "block.k230_traffic_sign_detected": "K230 detects traffic sign?",
        "block.k230_traffic_sign_count": "K230 detected traffic sign count",
        "block.k230_result_traffic_get_name_arg": "K230 traffic result nearest center is named [NAME]?",
        "block.k230_traffic_sign_near_center": "Get K230 traffic sign nearest center parameter [POS]",
        "block.k230_april_tag_detected": "K230 detects AprilTag?",
        "block.k230_april_tag_count": "K230 detected AprilTag count",
        "block.k230_result_apriltag_get_name_arg": "K230 AprilTag nearest center text is [NAME]?",
        "block.k230_april_tag_near_center": "Get K230 AprilTag nearest center parameter [POS]",
        "block.k230_result_apriltag_get_pos_arg": "Get K230 AprilTag nearest center [POS] coordinate",
        "block.k230_dm_code_detected": "K230 detects Data Matrix code?",
        "block.k230_dm_code_count": "K230 detected Data Matrix code count",
        "block.k230_result_dmcode_get_name_arg": "K230 Data Matrix code nearest center text is [NAME]?",
        "block.k230_dm_code_near_center": "Get K230 Data Matrix code nearest center text",
        "block.k230_result_dmcode_get_pos_arg": "Get K230 Data Matrix code nearest center [POS] coordinate",
        "block.k230_qr_code_detected": "K230 detects QR code?",
        "block.k230_qr_code_count": "K230 detected QR code count",
        "block.k230_result_orcode_get_arg": "K230 QR code nearest center text is [NAME]?",
        "block.k230_qr_code_near_center": "Get K230 QR code nearest center text",
        "block.k230_result_orcode_get_pos_arg": "Get K230 QR code nearest center [POS] parameter",
        "block.k230_barcode_detected": "K230 detects barcode?",
        "block.k230_barcode_count": "K230 detected barcode count",
        "block.k230_result_barcode_get_arg": "K230 barcode nearest center text is [NAME]?",
        "block.k230_barcode_near_center": "Get K230 barcode nearest center text",
        "block.k230_result_barcode_get_pos_arg": "Get K230 barcode nearest center [POS] parameter",
        "menu.arm_claw_params.angle": "Angle",
        "menu.arm_move_to_yz_params.y": "Arm end-effector Y coordinate",
        "menu.arm_move_to_yz_params.z": "Arm end-effector Z coordinate",
        "menu.arm_move_to_yz_params.angle": "Arm end-effector tilt",
        "menu.arm_move_to_yz_params.timeout": "Movement time (ms)",
        "menu.axis_result.x": "Center X coordinate",
        "menu.axis_result.y": "Center Y coordinate",
        "menu.axis_result.w": "Width",
        "menu.axis_result.h": "Height",
        "menu.buzzer_params.freq": "Buzzer frequency",
        "menu.buzzer_params.time_count": "Tone duration (ms)",
        "menu.color_angle_axis_result.color": "Name",
        "menu.color_angle_axis_result.angle": "Angle",
        "menu.color_angle_axis_result.cx": "Center X coordinate",
        "menu.color_angle_axis_result.cy": "Center Y coordinate",
        "menu.color_angle_axis_result.w": "Width",
        "menu.color_angle_axis_result.h": "Height",
        "menu.color_li.red": "Red",
        "menu.color_li.green": "Green",
        "menu.color_li.blue": "Blue",
        "menu.color_li.black": "Black",
        "menu.color_li.white": "White",
        "menu.face2_args.0": "Pose",
        "menu.face2_args.1": "Confidence",
        "menu.face2_args.2": "Roll angle",
        "menu.face2_args.3": "Pitch angle",
        "menu.face2_args.4": "Yaw angle",
        "menu.face2_args.x": "Center X coordinate",
        "menu.face2_args.y": "Center Y coordinate",
        "menu.face2_args.w": "Width",
        "menu.face2_args.h": "Height",
        "menu.face_args.0": "Name",
        "menu.face_args.1": "Confidence",
        "menu.face_args.x": "Center X coordinate",
        "menu.face_args.y": "Center Y coordinate",
        "menu.face_args.w": "Width",
        "menu.face_args.h": "Height",
        "menu.face_args2.1": "Confidence",
        "menu.face_args2.x": "Center X coordinate",
        "menu.face_args2.y": "Center Y coordinate",
        "menu.face_args2.w": "Width",
        "menu.face_args2.h": "Height",
        "menu.face_args3.0": "Name",
        "menu.face_args3.x": "Center X coordinate",
        "menu.face_args3.y": "Center Y coordinate",
        "menu.face_args3.w": "Width",
        "menu.face_args3.h": "Height",
        "menu.face_pos_oriention.Forward": "Forward",
        "menu.face_pos_oriention.Down": "Down",
        "menu.face_pos_oriention.Left": "Left",
        "menu.face_pos_oriention.Right": "Right",
        "menu.face_pos_oriention.unknown": "Unknown",
        "menu.facial_result.Happiness": "Happiness",
        "menu.facial_result.Angry": "Anger",
        "menu.facial_result.Disgust": "Disgust",
        "menu.facial_result.Fear": "Fear",
        "menu.facial_result.Neutral": "Neutral",
        "menu.facial_result.Sadness": "Sadness",
        "menu.facial_result.Surprise": "Surprise",
        "menu.garbage.BananaPeel": "Banana peel",
        "menu.garbage.BrokenBones": "Broken bones",
        "menu.garbage.CigaretteEnd": "Cigarette butt",
        "menu.garbage.DisposableChopsticks": "Disposable chopsticks",
        "menu.garbage.Ketchup": "Ketchup",
        "menu.garbage.Marker": "Marker",
        "menu.garbage.OralLiquidBottle": "Oral liquid bottle",
        "menu.garbage.Plate": "Plate",
        "menu.garbage.PlasticBottle": "Plastic bottle",
        "menu.garbage.StorageBattery": "Storage battery",
        "menu.garbage.Toothbrush": "Toothbrush",
        "menu.garbage.Umbrella": "Umbrella",
        "menu.gaze_name.Up": "Up",
        "menu.gaze_name.Down": "Down",
        "menu.gaze_name.Left": "Left",
        "menu.gaze_name.Right": "Right",
        "menu.gaze_name.unknow": "Unknown",
        "menu.gaze_result.0": "Name",
        "menu.gaze_result.1": "Confidence",
        "menu.gaze_result.2": "Eye center X coordinate",
        "menu.gaze_result.3": "Eye center Y coordinate",
        "menu.gaze_result.4": "Target center X coordinate",
        "menu.gaze_result.5": "Target center Y coordinate",
        "menu.gaze_result.x": "Center X coordinate",
        "menu.gaze_result.y": "Center Y coordinate",
        "menu.gaze_result.w": "Width",
        "menu.gaze_result.h": "Height",
        "menu.hand_gesture.ok": "OK gesture",
        "menu.hand_gesture.fist": "Fist",
        "menu.hand_gesture.five": "Number 5",
        "menu.hand_gesture.gun": "Finger gun",
        "menu.hand_gesture.love": "Finger heart",
        "menu.hand_gesture.one": "Number 1",
        "menu.hand_gesture.six": "Number 6",
        "menu.hand_gesture.three": "Number 3",
        "menu.hand_gesture.thumbUp": "Thumbs up",
        "menu.hand_gesture.yeah": "Victory",
        "menu.hand_menu.id": "Name",
        "menu.hand_menu.score": "Confidence",
        "menu.hand_menu.x": "Center X coordinate",
        "menu.hand_menu.y": "Center Y coordinate",
        "menu.hand_menu.w": "Width",
        "menu.hand_menu.h": "Height",
        "menu.hand_menu.0": "Wrist X coordinate",
        "menu.hand_menu.1": "Wrist Y coordinate",
        "menu.hand_menu.2": "Thumb point 1 X coordinate",
        "menu.hand_menu.3": "Thumb point 1 Y coordinate",
        "menu.hand_menu.4": "Thumb point 2 X coordinate",
        "menu.hand_menu.5": "Thumb point 2 Y coordinate",
        "menu.hand_menu.6": "Thumb point 3 X coordinate",
        "menu.hand_menu.7": "Thumb point 3 Y coordinate",
        "menu.hand_menu.8": "Thumb point 4 X coordinate",
        "menu.hand_menu.9": "Thumb point 4 Y coordinate",
        "menu.hand_menu.10": "Index finger point 1 X coordinate",
        "menu.hand_menu.11": "Index finger point 1 Y coordinate",
        "menu.hand_menu.12": "Index finger point 2 X coordinate",
        "menu.hand_menu.13": "Index finger point 2 Y coordinate",
        "menu.hand_menu.14": "Index finger point 3 X coordinate",
        "menu.hand_menu.15": "Index finger point 3 Y coordinate",
        "menu.hand_menu.16": "Index finger point 4 X coordinate",
        "menu.hand_menu.17": "Index finger point 4 Y coordinate",
        "menu.hand_menu.18": "Middle finger point 1 X coordinate",
        "menu.hand_menu.19": "Middle finger point 1 Y coordinate",
        "menu.hand_menu.20": "Middle finger point 2 X coordinate",
        "menu.hand_menu.21": "Middle finger point 2 Y coordinate",
        "menu.hand_menu.22": "Middle finger point 3 X coordinate",
        "menu.hand_menu.23": "Middle finger point 3 Y coordinate",
        "menu.hand_menu.24": "Middle finger point 4 X coordinate",
        "menu.hand_menu.25": "Middle finger point 4 Y coordinate",
        "menu.hand_menu.26": "Ring finger point 1 X coordinate",
        "menu.hand_menu.27": "Ring finger point 1 Y coordinate",
        "menu.hand_menu.28": "Ring finger point 2 X coordinate",
        "menu.hand_menu.29": "Ring finger point 2 Y coordinate",
        "menu.hand_menu.30": "Ring finger point 3 X coordinate",
        "menu.hand_menu.31": "Ring finger point 3 Y coordinate",
        "menu.hand_menu.32": "Ring finger point 4 X coordinate",
        "menu.hand_menu.33": "Ring finger point 4 Y coordinate",
        "menu.hand_menu.34": "Little finger point 1 X coordinate",
        "menu.hand_menu.35": "Little finger point 1 Y coordinate",
        "menu.hand_menu.36": "Little finger point 2 X coordinate",
        "menu.hand_menu.37": "Little finger point 2 Y coordinate",
        "menu.hand_menu.38": "Little finger point 3 X coordinate",
        "menu.hand_menu.39": "Little finger point 3 Y coordinate",
        "menu.hand_menu.40": "Little finger point 4 X coordinate",
        "menu.hand_menu.41": "Little finger point 4 Y coordinate",
        "menu.k230_mode.0": "Idle mode",
        "menu.k230_mode.13": "Online large language model",
        "menu.k230_mode.1": "Face recognition",
        "menu.k230_mode.2": "Face pose",
        "menu.k230_mode.3": "Expression recognition",
        "menu.k230_mode.4": "Gaze direction",
        "menu.k230_mode.5": "Person detection",
        "menu.k230_mode.6": "Human keypoints",
        "menu.k230_mode.7": "Hand keypoints",
        "menu.k230_mode.8": "Hand gesture recognition",
        "menu.k230_mode.9": "Fall detection",
        "menu.k230_mode.10": "Target tracking",
        "menu.k230_mode.11": "Dynamic gesture",
        "menu.k230_mode.12": "Self-learning",
        "menu.k230_mode.14": "Single-color detection",
        "menu.k230_mode.15": "Multi-color detection",
        "menu.k230_mode.16": "Line detection",
        "menu.k230_mode.18": "Text recognition",
        "menu.k230_mode.19": "License plate recognition",
        "menu.k230_mode.20": "Object classification",
        "menu.k230_mode.21": "Object detection",
        "menu.k230_mode.22": "Waste classification",
        "menu.k230_mode.23": "Traffic detection",
        "menu.k230_mode.24": "AprilTag recognition",
        "menu.k230_mode.25": "Data Matrix recognition",
        "menu.k230_mode.26": "QR code recognition",
        "menu.k230_mode.27": "Barcode recognition",
        "menu.k230_start.True": "Start",
        "menu.k230_start.False": "Stop",
        "menu.line_result.center_pos": "Center X coordinate",
        "menu.line_result.angle": "Angle",
        "menu.line_result.color": "Color",
        "menu.name_confidence.0": "Text",
        "menu.name_confidence.1": "Confidence",
        "menu.obj_menu.0": "Name",
        "menu.obj_menu.x": "Center X coordinate",
        "menu.obj_menu.y": "Center Y coordinate",
        "menu.objs.person": "Person",
        "menu.objs.bicycle": "Bicycle",
        "menu.objs.car": "Car",
        "menu.objs.motorcycle": "Motorcycle",
        "menu.objs.airplane": "Airplane",
        "menu.objs.bus": "Bus",
        "menu.objs.train": "Train",
        "menu.objs.truck": "Truck",
        "menu.objs.boat": "Boat",
        "menu.objs.traffic light": "Traffic light",
        "menu.objs.fire hydrant": "Fire hydrant",
        "menu.objs.stop sign": "Stop sign",
        "menu.objs.parking meter": "Parking meter",
        "menu.objs.bench": "Bench",
        "menu.objs.bird": "Bird",
        "menu.objs.cat": "Cat",
        "menu.objs.dog": "Dog",
        "menu.objs.horse": "Horse",
        "menu.objs.sheep": "Sheep",
        "menu.objs.cow": "Cow",
        "menu.objs.elephant": "Elephant",
        "menu.objs.bear": "Bear",
        "menu.objs.zebra": "Zebra",
        "menu.objs.giraffe": "Giraffe",
        "menu.objs.backpack": "Backpack",
        "menu.objs.umbrella": "Umbrella",
        "menu.objs.handbag": "Handbag",
        "menu.objs.tie": "Tie",
        "menu.objs.suitcase": "Suitcase",
        "menu.objs.frisbee": "Frisbee",
        "menu.objs.skis": "Skis",
        "menu.objs.snowboard": "Snowboard",
        "menu.objs.sports ball": "Sports ball",
        "menu.objs.kite": "Kite",
        "menu.objs.baseball bat": "Baseball bat",
        "menu.objs.baseball glove": "Baseball glove",
        "menu.objs.skateboard": "Skateboard",
        "menu.objs.surfboard": "Surfboard",
        "menu.objs.tennis racket": "Tennis racket",
        "menu.objs.bottle": "Bottle",
        "menu.objs.wine glass": "Wine glass",
        "menu.objs.cup": "Cup",
        "menu.objs.fork": "Fork",
        "menu.objs.knife": "Knife",
        "menu.objs.spoon": "Spoon",
        "menu.objs.bowl": "Bowl",
        "menu.objs.banana": "Banana",
        "menu.objs.apple": "Apple",
        "menu.objs.sandwich": "Sandwich",
        "menu.objs.orange": "Orange",
        "menu.objs.broccoli": "Broccoli",
        "menu.objs.carrot": "Carrot",
        "menu.objs.hot dog": "Hot dog",
        "menu.objs.pizza": "Pizza",
        "menu.objs.donut": "Donut",
        "menu.objs.cake": "Cake",
        "menu.objs.chair": "Chair",
        "menu.objs.couch": "Couch",
        "menu.objs.potted plant": "Potted plant",
        "menu.objs.bed": "Bed",
        "menu.objs.dining table": "Dining table",
        "menu.objs.toilet": "Toilet",
        "menu.objs.tv": "TV",
        "menu.objs.laptop": "Laptop",
        "menu.objs.mouse": "Mouse",
        "menu.objs.remote": "Remote",
        "menu.objs.keyboard": "Keyboard",
        "menu.objs.cell phone": "Cell phone",
        "menu.objs.microwave": "Microwave",
        "menu.objs.oven": "Oven",
        "menu.objs.toaster": "Toaster",
        "menu.objs.sink": "Sink",
        "menu.objs.refrigerator": "Refrigerator",
        "menu.objs.book": "Book",
        "menu.objs.clock": "Clock",
        "menu.objs.vase": "Vase",
        "menu.objs.scissors": "Scissors",
        "menu.objs.teddy bear": "Teddy bear",
        "menu.objs.hair drier": "Hair dryer",
        "menu.objs.toothbrush": "Toothbrush",
        "menu.ocr_point.0": "Top-left X",
        "menu.ocr_point.1": "Top-left Y",
        "menu.ocr_point.2": "Top-right X",
        "menu.ocr_point.3": "Top-right Y",
        "menu.ocr_point.4": "Bottom-right X",
        "menu.ocr_point.5": "Bottom-right Y",
        "menu.ocr_point.6": "Bottom-left X",
        "menu.ocr_point.7": "Bottom-left Y",
        "menu.person_keypoint_detect.id": "Name",
        "menu.person_keypoint_detect.score": "Confidence",
        "menu.person_keypoint_detect.0": "Nose X coordinate",
        "menu.person_keypoint_detect.1": "Nose Y coordinate",
        "menu.person_keypoint_detect.2": "Left eye X coordinate",
        "menu.person_keypoint_detect.3": "Left eye Y coordinate",
        "menu.person_keypoint_detect.4": "Right eye X coordinate",
        "menu.person_keypoint_detect.5": "Right eye Y coordinate",
        "menu.person_keypoint_detect.6": "Left ear X coordinate",
        "menu.person_keypoint_detect.7": "Left ear Y coordinate",
        "menu.person_keypoint_detect.8": "Right ear X coordinate",
        "menu.person_keypoint_detect.9": "Right ear Y coordinate",
        "menu.person_keypoint_detect.10": "Left shoulder X coordinate",
        "menu.person_keypoint_detect.11": "Left shoulder Y coordinate",
        "menu.person_keypoint_detect.12": "Right shoulder X coordinate",
        "menu.person_keypoint_detect.13": "Right shoulder Y coordinate",
        "menu.person_keypoint_detect.14": "Left elbow X coordinate",
        "menu.person_keypoint_detect.15": "Left elbow Y coordinate",
        "menu.person_keypoint_detect.16": "Right elbow X coordinate",
        "menu.person_keypoint_detect.17": "Right elbow Y coordinate",
        "menu.person_keypoint_detect.18": "Left wrist X coordinate",
        "menu.person_keypoint_detect.19": "Left wrist Y coordinate",
        "menu.person_keypoint_detect.20": "Right wrist X coordinate",
        "menu.person_keypoint_detect.21": "Right wrist Y coordinate",
        "menu.person_keypoint_detect.22": "Left hip X coordinate",
        "menu.person_keypoint_detect.23": "Left hip Y coordinate",
        "menu.person_keypoint_detect.24": "Right hip X coordinate",
        "menu.person_keypoint_detect.25": "Right hip Y coordinate",
        "menu.person_keypoint_detect.26": "Left knee X coordinate",
        "menu.person_keypoint_detect.27": "Left knee Y coordinate",
        "menu.person_keypoint_detect.28": "Right knee X coordinate",
        "menu.person_keypoint_detect.29": "Right knee Y coordinate",
        "menu.person_keypoint_detect.30": "Left ankle X coordinate",
        "menu.person_keypoint_detect.31": "Left ankle Y coordinate",
        "menu.person_keypoint_detect.32": "Right ankle X coordinate",
        "menu.person_keypoint_detect.33": "Right ankle Y coordinate",
        "menu.rgb_light_params.red": "Red",
        "menu.rgb_light_params.green": "Green",
        "menu.rgb_light_params.blue": "Blue",
        "menu.robot_runAction_params.num": "Action number",
        "menu.robot_runAction_params.count": "Action repeat count",
        "menu.traffic_sign.go": "Forward",
        "menu.traffic_sign.back": "Backward",
        "menu.traffic_sign.Left": "Turn left",
        "menu.traffic_sign.Right": "Turn right",
        "menu.traffic_sign.stop": "Stop",
        "menu.arm_move_to_yz_params2.y": "Arm end-effector Y coordinate",
        "menu.arm_move_to_yz_params2.z": "Arm end-effector Z coordinate",
        "menu.arm_move_to_yz_params2.timeout": "Movement time (ms)",
        "menu.mcp_names3.Bat_Battery_power": "Battery voltage",
        "menu.mcp_names3.Buzzer_playTone": "Play buzzer",
        "menu.mcp_names3.RGB_setRGB": "Set RGB light",
        "menu.mcp_names3.mcar_set_motors_speed": "Motor speed",
        "menu.mcp_names3.mcar_move_distance": "Travel distance",
        "menu.mcp_names3.arm_move_to_yz": "Robot arm movement",
        "menu.mcp_names3.arm_claw": "Gripper control",
        "menu.mcp_names3.sonar_getDistance": "RGB ultrasonic ranging",
        "menu.mcp_names3.sonar_setRGB": "Set RGB ultrasonic color",
        "menu.motor_speed_params.right_back": "Rear-right motor speed",
        "menu.motor_speed_params.right_front": "Front-right motor speed",
        "menu.motor_speed_params.left_back": "Rear-left motor speed",
        "menu.motor_speed_params.left_front": "Front-left motor speed",
        "menu.motor_speed_params.time_count": "Duration (ms)",
        "menu.move_distance_params.distance_cm": "Travel distance (cm)",
        "menu.move_distance_params.angle_deg": "Movement direction",
        "menu.move_distance_params.rpm": "Rotation speed (rpm)",
        "menu.mcp_names2.Bat_Battery_power": "Battery voltage",
        "menu.mcp_names2.Buzzer_playTone": "Play buzzer",
        "menu.mcp_names2.RGB_setRGB": "Set RGB light",
        "menu.mcp_names2.robot_move": "Robot movement",
        "menu.mcp_names2.arm_move_to_yz": "Robot arm movement",
        "menu.mcp_names2.arm_claw": "Gripper control",
        "menu.mcp_names2.sonar_getDistance": "RGB ultrasonic ranging",
        "menu.mcp_names2.sonar_setRGB": "Set RGB ultrasonic color",
        "menu.mcp_names2.robot_runAction": "Run action group",
        "menu.robot_move_params2.state": "Direction",
        "menu.robot_move_params2.steps": "Step count",
        "menu.robot_move_params2.time": "Time per step",
        "menu.robot_move_params2.leg1": "Upper-leg movement range",
        "menu.robot_move_params2.leg2": "Lower-leg outward range",
        "menu.robot_move_params2.turn_offset": "Offset angle",
        "menu.mcp_names.Bat_Battery_power": "Battery voltage",
        "menu.mcp_names.Buzzer_playTone": "Play buzzer",
        "menu.mcp_names.RGB_setRGB": "Set RGB light",
        "menu.mcp_names.robot_move": "Robot movement",
        "menu.mcp_names.robot_set_pose": "Robot pose",
        "menu.mcp_names.arm_move_to_yz": "Robot arm movement",
        "menu.mcp_names.arm_claw": "Gripper control",
        "menu.mcp_names.sonar_getDistance": "RGB ultrasonic ranging",
        "menu.mcp_names.sonar_setRGB": "Set RGB ultrasonic color",
        "menu.mcp_names.robot_runAction": "Run action group",
        "menu.robot_move_params.x": "X-axis velocity",
        "menu.robot_move_params.y": "Y-axis velocity",
        "menu.robot_move_params.z": "Center rotation speed",
        "menu.robot_move_params.height": "Leg lift height",
        "menu.robot_move_params.period": "Step period (ms)",
        "menu.robot_move_params.step": "Step count",
        "menu.robot_set_pose_params.x_offset": "X-axis offset",
        "menu.robot_set_pose_params.y_offset": "Y-axis offset",
        "menu.robot_set_pose_params.z_offset": "Body lift/lower offset",
        "menu.robot_set_pose_params.run_time": "Transition time (ms)"
    },
    "zh-tw": {
        "group.online": "線上大模型",
        "group.face": "人臉辨識",
        "group.face-pose": "人臉姿態",
        "group.expression": "表情識別",
        "group.gaze": "注視方向",
        "group.person": "人體偵測",
        "group.person-points": "人體關鍵點",
        "group.hand": "手掌關鍵點",
        "group.gesture": "手勢識別",
        "group.fall": "跌倒偵測",
        "group.target": "目標追蹤",
        "group.dynamic-gesture": "動態手勢",
        "group.self-learn": "自學習",
        "group.single-color": "單顏色偵測",
        "group.multi-color": "多顏色檢測",
        "group.line": "線檢測",
        "group.ocr": "文字識別",
        "group.license-plate": "車牌識別",
        "group.object-classify": "物件分類",
        "group.object": "物體偵測",
        "group.trash": "垃圾分類",
        "group.traffic": "交通偵測",
        "group.apriltag": "AprilTag識別",
        "group.dm-code": "DM碼識別",
        "group.qr-code": "QR 圖碼識別",
        "group.barcode": "條碼識別",
        "product.name": "K230視覺模組",
        "block.k230_aimech_init": "初始化K230視覺模組介面 [PORT]",
        "block.k230_set_mode": "設定K230執行模式 [MODE]",
        "block.k230_set_run": "K230 [MODE] 執行偵測",
        "block.k230_set_volumn": "設定K230音量 [VALUE]",
        "block.k230_set_wifi": "設定K230連線的WIFI名稱 [VALUE1] 密碼 [VALUE2]",
        "block.k230_update_detect_result": "更新並儲存K230結果資料",
        "block.k230_mcp_action_setting": "設定動作組MCP工具參數 工具描述 [COMMAND] 阻塞逾時時間 [BLOCK]",
        "block.k230_mcp_move_setting": "設定運動MCP工具參數 工具描述 [COMMAND] 阻塞逾時時間 [BLOCK]",
        "block.k230_mcp_setting": "設定MCP工具參數 工具名稱 [NAME] 工具描述 [COMMAND] 回傳參數 [PARAMS] 阻塞逾時時間 [BLOCK]",
        "block.k230_result_exists": "K230辨識結果存在?",
        "block.k230_get_result": "取得K230辨識結果",
        "block.k230_send_mcp_result": "K230傳送回應結果 [VALUE]",
        "block.k230_aimecanum_set_mcp_default": "設定K230預設MCP工具",
        "block.k230_aiquadruped_set_mcp_default": "設定K230預設MCP工具",
        "block.k230_aiquadrupedpro_set_mcp_default": "設定K230預設MCP工具",
        "block.k230_aihexa_set_mcp_default": "設定K230預設MCP工具",
        "block.k230_get_default_mcp_name": "[RESULT] 是否存在預設MCP工具名稱 [VALUE]?",
        "block.k230_get_buzzer_params": "[RESULT] 取得蜂鳴器回傳參數 [VALUE] 值",
        "block.k230_get_rgb_light_params": "[RESULT] 取得RGB彩燈回傳參數 [VALUE] 值",
        "block.k230_get_sonar_rgb_params": "[RESULT] 取得發光超音波RGB彩燈回傳參數 [VALUE] 值",
        "block.k230_get_arm_claw_params": "[RESULT] 取得機械臂夾爪回傳參數 [VALUE] 值",
        "block.k230_get_robot_set_pose_params": "[RESULT] 取得姿態設定回傳參數 [VALUE] 值",
        "block.k230_get_robot_move_params": "[RESULT] 取得機器人運動回傳參數 [VALUE] 值",
        "block.k230_get_robot_runAction_params": "[RESULT] 取得機器人動作組回傳參數 [VALUE] 值",
        "block.k230_motor_speed_params": "[RESULT] 取得馬達速度設定回傳參數 [VALUE] 值",
        "block.k230_get_move_distance_params": "[RESULT] 取得移動距離設定回傳參數 [VALUE] 值",
        "block.k230_get_arm_move_to_yz_params": "[RESULT] 取得機械臂運動回傳參數 [VALUE] 值",
        "block.k230_face_detected": "K230偵測到人臉?",
        "block.k230_face_count": "K230偵測到的人臉數量",
        "block.k230_face_exists": "K230存在名稱為 [VALUE] 的人臉?",
        "block.k230_face_recognition_get_arg_by_name": "取得K230人臉 [VALUE] 的 [POS]",
        "block.k230_face2_detected": "K230偵測到人臉姿態偵測的人臉?",
        "block.k230_face2_count": "K230偵測到的人臉姿態偵測的人臉數量",
        "block.k230_result_face_pose_get_oriention": "K230靠近中心的人臉姿態朝向 [ORIENTION]",
        "block.k230_face2_near_center": "取得K230靠近中心人臉姿態的 [VALUE] 參數",
        "block.k230_face3_detected": "K230偵測到表情辨識的人臉?",
        "block.k230_face3_count": "K230偵測到的表情辨識的人臉數量",
        "block.k230_facial_detect": "K230靠近中心的人臉表情為 [VALUE]",
        "block.k230_get_facial_args": "取得K230靠近中心人臉表情的 [POS] 參數",
        "block.k230_gaze_detected": "K230偵測到注視方向?",
        "block.k230_gaze_count": "K230偵測到的注視方向數量",
        "block.k230_gaze_near_center_result": "K230靠近中心的注視方向為 [NAME]",
        "block.k230_gaze_near_center": "取得K230靠近中心注視方向的 [VALUE] 參數",
        "block.k230_person_detected": "K230偵測到人體?",
        "block.k230_person_count": "K230偵測到的人體數量",
        "block.k230_person_near_center": "取得K230靠近中心人體的 [VALUE] 參數",
        "block.k230_person_point_detected": "K230偵測到人體姿態?",
        "block.k230_person2_count": "K230偵測到的人體姿態數量",
        "block.k230_person_keypoint_detect_name": "K230偵測到人體姿態 [NAME]?",
        "block.k230_result_person_keypoint_get_arg": "取得K230人體姿態 [NAME] 的 [POS] 參數",
        "block.k230_person_keypoint_near_center": "取得K230靠近中心人體關鍵點的 [POS] 參數",
        "block.k230_hand_detected": "K230偵測到手掌?",
        "block.k230_hand_count": "K230偵測到的手掌數量",
        "block.k230_hand_detected_posture": "K230偵測到手掌姿態 [NAME]?",
        "block.k230_result_hand_keypoint_get_arg": "取得K230手掌姿態 [NAME] 的 [POS] 參數",
        "block.k230_hand_near_center": "取得K230靠近中心手掌的 [VALUE] 參數",
        "block.k230_gesture_detected": "K230偵測到手勢?",
        "block.k230_gesture_count": "K230偵測到的手勢數量",
        "block.k230_result_hand_gesture_get_arg": "K230靠近中心的手勢為 [VALUE]?",
        "block.k230_result_hand_gesture_get_pos_arg_by_name": "取得K230 [NAME] 手勢的 [POS] 參數",
        "block.k230_result_hand_gesture_get_pos_arg": "取得K230靠近中心手勢辨識結果的 [POS] 參數",
        "block.k230_fall_detected": "K230偵測到跌倒?",
        "block.k230_fall_count": "K230偵測到的跌倒數量",
        "block.k230_fall_near_center_result": "K230靠近中心的目標處於跌倒狀態?",
        "block.k230_fall_near_center": "取得K230靠近中心跌倒偵測結果的 [VALUE] 參數",
        "block.k230_target_detected": "K230偵測到追蹤目標?",
        "block.k230_target_near_center": "取得K230靠近中心追蹤目標的 [VALUE] 參數",
        "block.k230_dynamic_gesture_detected": "K230偵測到動態手勢?",
        "block.k230_result_dynamic_gesture_get_arg": "K230動態手勢為 [GESTURE]?",
        "block.k230_result_self_learn_get_arg": "K230辨識到自學習 [NAME] 畫面?",
        "block.k230_result_self_learn_get_pos_arg": "取得K230自學習 [NAME] 的 [POS] 參數",
        "block.k230_set_single_color": "設定K230單色偵測目標為 [COLOR]",
        "block.k230_set_single_color_arg": "設定K230單色偵測目標為 [COLOR]",
        "block.k230_single_color_detected": "K230偵測到單色偵測的顏色?",
        "block.k230_result_single_color_get_pos_arg": "取得K230靠近中心單色偵測結果的 [POS] 參數",
        "block.k230_set_multi_color_arg": "設定K230多色偵測清單 [COLOR]",
        "block.k230_color_detected": "K230偵測到多色偵測的顏色?",
        "block.k230_color_count": "K230偵測到的多色偵測的顏色數量",
        "block.k230_color_near_center_name": "K230偵測到顏色 [NAME]?",
        "block.k230_color_near_center": "取得K230靠近中心顏色的 [VALUE] 參數",
        "block.k230_result_multi_color_get_pos_arg": "取得K230顏色 [NAME] 偵測結果的 [POS] 參數",
        "block.k230_set_line_color": "設定K230線偵測顏色為 [COLOR]",
        "block.k230_set_line_color_arg": "設定K230線偵測顏色為 [COLOR]",
        "block.k230_line_detected": "K230偵測到線?",
        "block.k230_result_line_detect_get_arg": "取得K230線偵測結果 [VALUE]",
        "block.k230_ocr_detected": "K230偵測到文字?",
        "block.k230_ocr_count": "K230偵測到的文字數量",
        "block.k230_result_ocr_get_arg": "取得K230文字辨識結果",
        "block.k230_result_ocr_get_pos_arg": "取得K230文字辨識結果的 [POINT] 參數",
        "block.k230_license_plate_detected": "K230偵測到車牌?",
        "block.k230_license_plate_count": "K230偵測到的車牌數量",
        "block.k230_result_lpr_get_arg": "取得K230車牌辨識結果",
        "block.k230_result_lpr_get_pos_arg": "取得K230車牌辨識結果的 [POINT] 參數",
        "block.k230_object_detected": "K230偵測到物體?",
        "block.k230_object_count": "K230偵測到的物體數量",
        "block.k230_object_classify_parameter": "取得K230物體分類結果的 [POS] 參數",
        "block.k230_object_named_detected": "K230偵測到 [NAME]?",
        "block.k230_object_parameter": "取得K230物體偵測結果的 [POS] 參數",
        "block.k230_trash_detected": "K230偵測到垃圾?",
        "block.k230_trash_count": "K230偵測到的垃圾數量",
        "block.k230_result_garbage_get_name_arg": "K230靠近中心的垃圾名稱為 [VALUE]?",
        "block.k230_trash_near_center": "取得K230靠近中心垃圾的 [POS] 參數",
        "block.k230_result_garbage_get_pos_arg": "取得K230靠近中心垃圾的 [POS] 座標",
        "block.k230_traffic_sign_detected": "K230偵測到交通標誌?",
        "block.k230_traffic_sign_count": "K230偵測到的交通標誌數量",
        "block.k230_result_traffic_get_name_arg": "K230靠近中心的交通偵測結果名稱為 [NAME]?",
        "block.k230_traffic_sign_near_center": "取得K230靠近中心交通標誌的 [POS] 參數",
        "block.k230_april_tag_detected": "K230偵測到AprilTag?",
        "block.k230_april_tag_count": "K230偵測到的AprilTag數量",
        "block.k230_result_apriltag_get_name_arg": "K230靠近中心的AprilTag文字為 [NAME]?",
        "block.k230_april_tag_near_center": "取得K230靠近中心AprilTag的 [POS] 參數",
        "block.k230_result_apriltag_get_pos_arg": "取得K230靠近中心AprilTag的 [POS] 座標",
        "block.k230_dm_code_detected": "K230偵測到DM碼?",
        "block.k230_dm_code_count": "K230偵測到的DM碼數量",
        "block.k230_result_dmcode_get_name_arg": "K230靠近中心的DM碼文字為 [NAME]?",
        "block.k230_dm_code_near_center": "取得K230靠近中心DM碼的文字",
        "block.k230_result_dmcode_get_pos_arg": "取得K230靠近中心DM碼的 [POS] 座標",
        "block.k230_qr_code_detected": "K230偵測到二維碼?",
        "block.k230_qr_code_count": "K230偵測到的二維碼數量",
        "block.k230_result_orcode_get_arg": "K230靠近中心的二維碼文字為 [NAME]?",
        "block.k230_qr_code_near_center": "取得K230靠近中心二維碼的文字",
        "block.k230_result_orcode_get_pos_arg": "取得K230靠近中心二維碼的 [POS] 參數",
        "block.k230_barcode_detected": "K230偵測到條碼?",
        "block.k230_barcode_count": "K230偵測到的條碼數量",
        "block.k230_result_barcode_get_arg": "K230靠近中心的條碼文字為 [NAME]?",
        "block.k230_barcode_near_center": "取得K230靠近中心條碼的文字",
        "block.k230_result_barcode_get_pos_arg": "取得K230靠近中心條碼的 [POS] 參數",
        "menu.arm_claw_params.angle": "角度",
        "menu.arm_move_to_yz_params.y": "機械臂末端Y座標",
        "menu.arm_move_to_yz_params.z": "機械臂末端Z座標",
        "menu.arm_move_to_yz_params.angle": "機械臂末端傾角",
        "menu.arm_move_to_yz_params.timeout": "運動時間(ms)",
        "menu.axis_result.x": "中心X座標",
        "menu.axis_result.y": "中心Y座標",
        "menu.axis_result.w": "寬度",
        "menu.axis_result.h": "高度",
        "menu.buzzer_params.freq": "蜂鳴器頻率",
        "menu.buzzer_params.time_count": "鳴響時間(ms)",
        "menu.color_angle_axis_result.color": "名稱",
        "menu.color_angle_axis_result.angle": "角度",
        "menu.color_angle_axis_result.cx": "中心X座標",
        "menu.color_angle_axis_result.cy": "中心Y座標",
        "menu.color_angle_axis_result.w": "寬度",
        "menu.color_angle_axis_result.h": "高度",
        "menu.color_li.red": "紅",
        "menu.color_li.green": "綠",
        "menu.color_li.blue": "藍",
        "menu.color_li.black": "黑",
        "menu.color_li.white": "白",
        "menu.face2_args.0": "姿態",
        "menu.face2_args.1": "信賴度",
        "menu.face2_args.2": "翻滾角(roll)",
        "menu.face2_args.3": "俯仰角(pitch)",
        "menu.face2_args.4": "偏航角(yaw)",
        "menu.face2_args.x": "中心X座標",
        "menu.face2_args.y": "中心Y座標",
        "menu.face2_args.w": "寬度",
        "menu.face2_args.h": "高度",
        "menu.face_args.0": "名稱",
        "menu.face_args.1": "信賴度",
        "menu.face_args.x": "中心X座標",
        "menu.face_args.y": "中心Y座標",
        "menu.face_args.w": "寬度",
        "menu.face_args.h": "高度",
        "menu.face_args2.1": "信賴度",
        "menu.face_args2.x": "中心X座標",
        "menu.face_args2.y": "中心Y座標",
        "menu.face_args2.w": "寬度",
        "menu.face_args2.h": "高度",
        "menu.face_args3.0": "名稱",
        "menu.face_args3.x": "中心X座標",
        "menu.face_args3.y": "中心Y座標",
        "menu.face_args3.w": "寬度",
        "menu.face_args3.h": "高度",
        "menu.face_pos_oriention.Forward": "前",
        "menu.face_pos_oriention.Down": "下",
        "menu.face_pos_oriention.Left": "左",
        "menu.face_pos_oriention.Right": "右",
        "menu.face_pos_oriention.unknown": "未知",
        "menu.facial_result.Happiness": "高興",
        "menu.facial_result.Angry": "憤怒",
        "menu.facial_result.Disgust": "厭惡",
        "menu.facial_result.Fear": "恐懼",
        "menu.facial_result.Neutral": "中性",
        "menu.facial_result.Sadness": "傷心",
        "menu.facial_result.Surprise": "驚訝",
        "menu.garbage.BananaPeel": "香蕉皮",
        "menu.garbage.BrokenBones": "碎骨頭",
        "menu.garbage.CigaretteEnd": "菸蒂",
        "menu.garbage.DisposableChopsticks": "免洗筷",
        "menu.garbage.Ketchup": "番茄醬",
        "menu.garbage.Marker": "麥克筆",
        "menu.garbage.OralLiquidBottle": "口服液瓶",
        "menu.garbage.Plate": "盤子",
        "menu.garbage.PlasticBottle": "塑膠瓶",
        "menu.garbage.StorageBattery": "蓄電池",
        "menu.garbage.Toothbrush": "牙刷",
        "menu.garbage.Umbrella": "雨傘",
        "menu.gaze_name.Up": "上",
        "menu.gaze_name.Down": "下",
        "menu.gaze_name.Left": "左",
        "menu.gaze_name.Right": "右",
        "menu.gaze_name.unknow": "未知",
        "menu.gaze_result.0": "名稱",
        "menu.gaze_result.1": "信賴度",
        "menu.gaze_result.2": "眼睛中心X座標",
        "menu.gaze_result.3": "眼睛中心Y座標",
        "menu.gaze_result.4": "目標中心X座標",
        "menu.gaze_result.5": "目標中心Y座標",
        "menu.gaze_result.x": "中心X座標",
        "menu.gaze_result.y": "中心Y座標",
        "menu.gaze_result.w": "寬度",
        "menu.gaze_result.h": "高度",
        "menu.hand_gesture.ok": "OK手勢",
        "menu.hand_gesture.fist": "拳頭",
        "menu.hand_gesture.five": "數字5",
        "menu.hand_gesture.gun": "手槍",
        "menu.hand_gesture.love": "比心",
        "menu.hand_gesture.one": "數字1",
        "menu.hand_gesture.six": "數字6",
        "menu.hand_gesture.three": "數字3",
        "menu.hand_gesture.thumbUp": "按讚",
        "menu.hand_gesture.yeah": "勝利",
        "menu.hand_menu.id": "名稱",
        "menu.hand_menu.score": "信賴度",
        "menu.hand_menu.x": "中心X座標",
        "menu.hand_menu.y": "中心Y座標",
        "menu.hand_menu.w": "寬度",
        "menu.hand_menu.h": "高度",
        "menu.hand_menu.0": "手腕X座標",
        "menu.hand_menu.1": "手腕Y座標",
        "menu.hand_menu.2": "拇指點1X座標",
        "menu.hand_menu.3": "拇指點1Y座標",
        "menu.hand_menu.4": "拇指點2X座標",
        "menu.hand_menu.5": "拇指點2Y座標",
        "menu.hand_menu.6": "拇指點3X座標",
        "menu.hand_menu.7": "拇指點3Y座標",
        "menu.hand_menu.8": "拇指點4X座標",
        "menu.hand_menu.9": "拇指點4Y座標",
        "menu.hand_menu.10": "食指點1X座標",
        "menu.hand_menu.11": "食指點1Y座標",
        "menu.hand_menu.12": "食指點2X座標",
        "menu.hand_menu.13": "食指點2Y座標",
        "menu.hand_menu.14": "食指點3X座標",
        "menu.hand_menu.15": "食指點3Y座標",
        "menu.hand_menu.16": "食指點4X座標",
        "menu.hand_menu.17": "食指點4Y座標",
        "menu.hand_menu.18": "中指點1X座標",
        "menu.hand_menu.19": "中指點1Y座標",
        "menu.hand_menu.20": "中指點2X座標",
        "menu.hand_menu.21": "中指點2Y座標",
        "menu.hand_menu.22": "中指點3X座標",
        "menu.hand_menu.23": "中指點3Y座標",
        "menu.hand_menu.24": "中指點4X座標",
        "menu.hand_menu.25": "中指點4Y座標",
        "menu.hand_menu.26": "無名指點1X座標",
        "menu.hand_menu.27": "無名指點1Y座標",
        "menu.hand_menu.28": "無名指點2X座標",
        "menu.hand_menu.29": "無名指點2Y座標",
        "menu.hand_menu.30": "無名指點3X座標",
        "menu.hand_menu.31": "無名指點3Y座標",
        "menu.hand_menu.32": "無名指點4X座標",
        "menu.hand_menu.33": "無名指點4Y座標",
        "menu.hand_menu.34": "小指點1X座標",
        "menu.hand_menu.35": "小指點1Y座標",
        "menu.hand_menu.36": "小指點2X座標",
        "menu.hand_menu.37": "小指點2Y座標",
        "menu.hand_menu.38": "小指點3X座標",
        "menu.hand_menu.39": "小指點3Y座標",
        "menu.hand_menu.40": "小指點4X座標",
        "menu.hand_menu.41": "小指點4Y座標",
        "menu.k230_mode.0": "空模式",
        "menu.k230_mode.13": "線上大型語言模型",
        "menu.k230_mode.1": "人臉辨識",
        "menu.k230_mode.2": "人臉姿態",
        "menu.k230_mode.3": "表情辨識",
        "menu.k230_mode.4": "注視方向",
        "menu.k230_mode.5": "人體偵測",
        "menu.k230_mode.6": "人體關鍵點",
        "menu.k230_mode.7": "手部關鍵點",
        "menu.k230_mode.8": "手勢辨識",
        "menu.k230_mode.9": "跌倒偵測",
        "menu.k230_mode.10": "目標追蹤",
        "menu.k230_mode.11": "動態手勢",
        "menu.k230_mode.12": "自學習",
        "menu.k230_mode.14": "單色偵測",
        "menu.k230_mode.15": "多色偵測",
        "menu.k230_mode.16": "線偵測",
        "menu.k230_mode.18": "文字辨識",
        "menu.k230_mode.19": "車牌辨識",
        "menu.k230_mode.20": "物體分類",
        "menu.k230_mode.21": "物體偵測",
        "menu.k230_mode.22": "垃圾分類",
        "menu.k230_mode.23": "交通偵測",
        "menu.k230_mode.24": "AprilTag辨識",
        "menu.k230_mode.25": "DM碼辨識",
        "menu.k230_mode.26": "二維碼辨識",
        "menu.k230_mode.27": "條碼辨識",
        "menu.k230_start.True": "啟動",
        "menu.k230_start.False": "停止",
        "menu.line_result.center_pos": "中心X座標",
        "menu.line_result.angle": "角度",
        "menu.line_result.color": "顏色",
        "menu.name_confidence.0": "文字",
        "menu.name_confidence.1": "信賴度",
        "menu.obj_menu.0": "名稱",
        "menu.obj_menu.x": "中心X座標",
        "menu.obj_menu.y": "中心Y座標",
        "menu.objs.person": "人",
        "menu.objs.bicycle": "腳踏車",
        "menu.objs.car": "小汽車",
        "menu.objs.motorcycle": "機車",
        "menu.objs.airplane": "飛機",
        "menu.objs.bus": "公車",
        "menu.objs.train": "火車",
        "menu.objs.truck": "卡車",
        "menu.objs.boat": "船",
        "menu.objs.traffic light": "交通號誌",
        "menu.objs.fire hydrant": "消防栓",
        "menu.objs.stop sign": "停車標誌",
        "menu.objs.parking meter": "停車收費系統",
        "menu.objs.bench": "長椅",
        "menu.objs.bird": "鳥",
        "menu.objs.cat": "貓",
        "menu.objs.dog": "狗",
        "menu.objs.horse": "馬",
        "menu.objs.sheep": "羊",
        "menu.objs.cow": "牛",
        "menu.objs.elephant": "大象",
        "menu.objs.bear": "熊",
        "menu.objs.zebra": "斑馬",
        "menu.objs.giraffe": "長頸鹿",
        "menu.objs.backpack": "背包",
        "menu.objs.umbrella": "雨傘",
        "menu.objs.handbag": "手提包",
        "menu.objs.tie": "領帶",
        "menu.objs.suitcase": "行李箱",
        "menu.objs.frisbee": "飛盤",
        "menu.objs.skis": "滑雪板",
        "menu.objs.snowboard": "雪板",
        "menu.objs.sports ball": "運動球",
        "menu.objs.kite": "風箏",
        "menu.objs.baseball bat": "棒球棒",
        "menu.objs.baseball glove": "棒球手套",
        "menu.objs.skateboard": "滑板",
        "menu.objs.surfboard": "衝浪板",
        "menu.objs.tennis racket": "網球拍",
        "menu.objs.bottle": "瓶子",
        "menu.objs.wine glass": "酒杯",
        "menu.objs.cup": "杯子",
        "menu.objs.fork": "叉子",
        "menu.objs.knife": "刀",
        "menu.objs.spoon": "湯匙",
        "menu.objs.bowl": "碗",
        "menu.objs.banana": "香蕉",
        "menu.objs.apple": "蘋果",
        "menu.objs.sandwich": "三明治",
        "menu.objs.orange": "柳橙",
        "menu.objs.broccoli": "花椰菜",
        "menu.objs.carrot": "紅蘿蔔",
        "menu.objs.hot dog": "熱狗",
        "menu.objs.pizza": "披薩",
        "menu.objs.donut": "甜甜圈",
        "menu.objs.cake": "蛋糕",
        "menu.objs.chair": "椅子",
        "menu.objs.couch": "沙發",
        "menu.objs.potted plant": "盆栽",
        "menu.objs.bed": "床",
        "menu.objs.dining table": "餐桌",
        "menu.objs.toilet": "馬桶",
        "menu.objs.tv": "電視",
        "menu.objs.laptop": "筆記型電腦",
        "menu.objs.mouse": "滑鼠",
        "menu.objs.remote": "遙控器",
        "menu.objs.keyboard": "鍵盤",
        "menu.objs.cell phone": "手機",
        "menu.objs.microwave": "微波爐",
        "menu.objs.oven": "烤箱",
        "menu.objs.toaster": "烤麵包機",
        "menu.objs.sink": "水槽",
        "menu.objs.refrigerator": "冰箱",
        "menu.objs.book": "書",
        "menu.objs.clock": "時鐘",
        "menu.objs.vase": "花瓶",
        "menu.objs.scissors": "剪刀",
        "menu.objs.teddy bear": "泰迪熊",
        "menu.objs.hair drier": "吹風機",
        "menu.objs.toothbrush": "牙刷",
        "menu.ocr_point.0": "左上X",
        "menu.ocr_point.1": "左上Y",
        "menu.ocr_point.2": "右上X",
        "menu.ocr_point.3": "右上Y",
        "menu.ocr_point.4": "右下X",
        "menu.ocr_point.5": "右下Y",
        "menu.ocr_point.6": "左下X",
        "menu.ocr_point.7": "左下Y",
        "menu.person_keypoint_detect.id": "名稱",
        "menu.person_keypoint_detect.score": "信賴度",
        "menu.person_keypoint_detect.0": "鼻子X座標",
        "menu.person_keypoint_detect.1": "鼻子Y座標",
        "menu.person_keypoint_detect.2": "左眼X座標",
        "menu.person_keypoint_detect.3": "左眼Y座標",
        "menu.person_keypoint_detect.4": "右眼X座標",
        "menu.person_keypoint_detect.5": "右眼Y座標",
        "menu.person_keypoint_detect.6": "左耳X座標",
        "menu.person_keypoint_detect.7": "左耳Y座標",
        "menu.person_keypoint_detect.8": "右耳X座標",
        "menu.person_keypoint_detect.9": "右耳Y座標",
        "menu.person_keypoint_detect.10": "左肩X座標",
        "menu.person_keypoint_detect.11": "左肩Y座標",
        "menu.person_keypoint_detect.12": "右肩X座標",
        "menu.person_keypoint_detect.13": "右肩Y座標",
        "menu.person_keypoint_detect.14": "左肘X座標",
        "menu.person_keypoint_detect.15": "左肘Y座標",
        "menu.person_keypoint_detect.16": "右肘X座標",
        "menu.person_keypoint_detect.17": "右肘Y座標",
        "menu.person_keypoint_detect.18": "左腕X座標",
        "menu.person_keypoint_detect.19": "左腕Y座標",
        "menu.person_keypoint_detect.20": "右腕X座標",
        "menu.person_keypoint_detect.21": "右腕Y座標",
        "menu.person_keypoint_detect.22": "左髖X座標",
        "menu.person_keypoint_detect.23": "左髖Y座標",
        "menu.person_keypoint_detect.24": "右髖X座標",
        "menu.person_keypoint_detect.25": "右髖Y座標",
        "menu.person_keypoint_detect.26": "左膝X座標",
        "menu.person_keypoint_detect.27": "左膝Y座標",
        "menu.person_keypoint_detect.28": "右膝X座標",
        "menu.person_keypoint_detect.29": "右膝Y座標",
        "menu.person_keypoint_detect.30": "左踝X座標",
        "menu.person_keypoint_detect.31": "左踝Y座標",
        "menu.person_keypoint_detect.32": "右踝X座標",
        "menu.person_keypoint_detect.33": "右踝Y座標",
        "menu.rgb_light_params.red": "紅色",
        "menu.rgb_light_params.green": "綠色",
        "menu.rgb_light_params.blue": "藍色",
        "menu.robot_runAction_params.num": "動作編號",
        "menu.robot_runAction_params.count": "動作執行次數",
        "menu.traffic_sign.go": "前進",
        "menu.traffic_sign.back": "後退",
        "menu.traffic_sign.Left": "左轉",
        "menu.traffic_sign.Right": "右轉",
        "menu.traffic_sign.stop": "停止",
        "menu.arm_move_to_yz_params2.y": "機械臂末端Y座標",
        "menu.arm_move_to_yz_params2.z": "機械臂末端Z座標",
        "menu.arm_move_to_yz_params2.timeout": "運動時間(ms)",
        "menu.mcp_names3.Bat_Battery_power": "電池電壓",
        "menu.mcp_names3.Buzzer_playTone": "蜂鳴器播放",
        "menu.mcp_names3.RGB_setRGB": "設定RGB燈",
        "menu.mcp_names3.mcar_set_motors_speed": "馬達速度",
        "menu.mcp_names3.mcar_move_distance": "移動距離",
        "menu.mcp_names3.arm_move_to_yz": "機械臂運動",
        "menu.mcp_names3.arm_claw": "機械爪控制",
        "menu.mcp_names3.sonar_getDistance": "發光超音波測距",
        "menu.mcp_names3.sonar_setRGB": "發光超音波顏色設定",
        "menu.motor_speed_params.right_back": "右後輪馬達速度",
        "menu.motor_speed_params.right_front": "右前輪馬達速度",
        "menu.motor_speed_params.left_back": "左後輪馬達速度",
        "menu.motor_speed_params.left_front": "左前輪馬達速度",
        "menu.motor_speed_params.time_count": "持續時間(ms)",
        "menu.move_distance_params.distance_cm": "移動距離(cm)",
        "menu.move_distance_params.angle_deg": "移動方向",
        "menu.move_distance_params.rpm": "轉動速度(rpm)",
        "menu.mcp_names2.Bat_Battery_power": "電池電壓",
        "menu.mcp_names2.Buzzer_playTone": "蜂鳴器播放",
        "menu.mcp_names2.RGB_setRGB": "設定RGB燈",
        "menu.mcp_names2.robot_move": "機器人移動",
        "menu.mcp_names2.arm_move_to_yz": "機械臂運動",
        "menu.mcp_names2.arm_claw": "機械爪控制",
        "menu.mcp_names2.sonar_getDistance": "發光超音波測距",
        "menu.mcp_names2.sonar_setRGB": "發光超音波顏色設定",
        "menu.mcp_names2.robot_runAction": "動作組執行",
        "menu.robot_move_params2.state": "方向",
        "menu.robot_move_params2.steps": "步數",
        "menu.robot_move_params2.time": "每一步運動時間",
        "menu.robot_move_params2.leg1": "大腿移動幅度",
        "menu.robot_move_params2.leg2": "小腿外翻幅度",
        "menu.robot_move_params2.turn_offset": "偏差角",
        "menu.mcp_names.Bat_Battery_power": "電池電壓",
        "menu.mcp_names.Buzzer_playTone": "蜂鳴器播放",
        "menu.mcp_names.RGB_setRGB": "設定RGB燈",
        "menu.mcp_names.robot_move": "機器人移動",
        "menu.mcp_names.robot_set_pose": "機器人姿態",
        "menu.mcp_names.arm_move_to_yz": "機械臂運動",
        "menu.mcp_names.arm_claw": "機械爪控制",
        "menu.mcp_names.sonar_getDistance": "發光超音波測距",
        "menu.mcp_names.sonar_setRGB": "發光超音波顏色設定",
        "menu.mcp_names.robot_runAction": "動作組執行",
        "menu.robot_move_params.x": "X軸方向速度",
        "menu.robot_move_params.y": "Y軸方向速度",
        "menu.robot_move_params.z": "中心旋轉速度",
        "menu.robot_move_params.height": "抬腿高度",
        "menu.robot_move_params.period": "每一步運動週期(ms)",
        "menu.robot_move_params.step": "步數",
        "menu.robot_set_pose_params.x_offset": "X軸方向偏移",
        "menu.robot_set_pose_params.y_offset": "Y軸方向偏移",
        "menu.robot_set_pose_params.z_offset": "身體抬升降低",
        "menu.robot_set_pose_params.run_time": "變化時間(ms)"
    },
    "ko": {
        "group.online": "온라인 대형 모델",
        "group.face": "얼굴 인식",
        "group.face-pose": "얼굴 포즈",
        "group.expression": "표정 인식",
        "group.gaze": "시선 방향",
        "group.person": "인간 탐지",
        "group.person-points": "인체의 핵심 포인트",
        "group.hand": "손바닥 핵심 포인트",
        "group.gesture": "제스처 인식",
        "group.fall": "넘어짐 감지",
        "group.target": "표적 추적",
        "group.dynamic-gesture": "역동적인 제스처",
        "group.self-learn": "자율 학습",
        "group.single-color": "단일 색상 감지",
        "group.multi-color": "다색 감지",
        "group.line": "라인 감지",
        "group.ocr": "텍스트 인식",
        "group.license-plate": "번호판 인식",
        "group.object-classify": "객체 분류",
        "group.object": "객체 감지",
        "group.trash": "쓰레기 분류",
        "group.traffic": "교통 감지",
        "group.apriltag": "4월태그 인식",
        "group.dm-code": "DM 코드 식별",
        "group.qr-code": "QR 코드 인식",
        "group.barcode": "바코드 인식",
        "product.name": "K230 비전 모듈",
        "block.k230_aimech_init": "K230 비전 모듈 포트 [PORT] 초기화",
        "block.k230_set_mode": "K230 실행 모드 [MODE] 설정",
        "block.k230_set_run": "K230 감지 [MODE]",
        "block.k230_set_volumn": "K230 음량 [VALUE] 설정",
        "block.k230_set_wifi": "K230 Wi-Fi 이름 [VALUE1] 비밀번호 [VALUE2] 설정",
        "block.k230_update_detect_result": "K230 결과 데이터 갱신 및 저장",
        "block.k230_mcp_action_setting": "동작 그룹 MCP 도구 설명 [COMMAND] 차단 제한 시간 [BLOCK] 설정",
        "block.k230_mcp_move_setting": "이동 MCP 도구 설명 [COMMAND] 차단 제한 시간 [BLOCK] 설정",
        "block.k230_mcp_setting": "MCP 도구 이름 [NAME] 설명 [COMMAND] 반환 매개변수 [PARAMS] 차단 제한 시간 [BLOCK] 설정",
        "block.k230_result_exists": "K230 인식 결과가 있는가?",
        "block.k230_get_result": "K230 인식 결과 가져오기",
        "block.k230_send_mcp_result": "K230 응답 결과 [VALUE] 전송",
        "block.k230_aimecanum_set_mcp_default": "K230 기본 MCP 도구 설정",
        "block.k230_aiquadruped_set_mcp_default": "K230 기본 MCP 도구 설정",
        "block.k230_aiquadrupedpro_set_mcp_default": "K230 기본 MCP 도구 설정",
        "block.k230_aihexa_set_mcp_default": "K230 기본 MCP 도구 설정",
        "block.k230_get_default_mcp_name": "[RESULT] 에 기본 MCP 도구 이름 [VALUE] 이 있는가?",
        "block.k230_get_buzzer_params": "[RESULT] 의 부저 반환 매개변수 [VALUE] 값 가져오기",
        "block.k230_get_rgb_light_params": "[RESULT] 의 RGB 조명 반환 매개변수 [VALUE] 값 가져오기",
        "block.k230_get_sonar_rgb_params": "[RESULT] 의 RGB 초음파 조명 반환 매개변수 [VALUE] 값 가져오기",
        "block.k230_get_arm_claw_params": "[RESULT] 의 로봇 팔 그리퍼 반환 매개변수 [VALUE] 값 가져오기",
        "block.k230_get_robot_set_pose_params": "[RESULT] 의 자세 설정 반환 매개변수 [VALUE] 값 가져오기",
        "block.k230_get_robot_move_params": "[RESULT] 의 로봇 이동 반환 매개변수 [VALUE] 값 가져오기",
        "block.k230_get_robot_runAction_params": "[RESULT] 의 로봇 동작 그룹 반환 매개변수 [VALUE] 값 가져오기",
        "block.k230_motor_speed_params": "[RESULT] 의 모터 속도 설정 반환 매개변수 [VALUE] 값 가져오기",
        "block.k230_get_move_distance_params": "[RESULT] 의 이동 거리 설정 반환 매개변수 [VALUE] 값 가져오기",
        "block.k230_get_arm_move_to_yz_params": "[RESULT] 의 로봇 팔 이동 반환 매개변수 [VALUE] 값 가져오기",
        "block.k230_face_detected": "K230 얼굴 감지?",
        "block.k230_face_count": "K230 감지된 얼굴 수",
        "block.k230_face_exists": "K230 이름이 [VALUE] 인 얼굴이 있는가?",
        "block.k230_face_recognition_get_arg_by_name": "K230 얼굴 [VALUE] 의 [POS] 가져오기",
        "block.k230_face2_detected": "K230 자세 감지 얼굴 감지?",
        "block.k230_face2_count": "K230 감지된 자세 감지 얼굴 수",
        "block.k230_result_face_pose_get_oriention": "K230 중앙에 가장 가까운 얼굴 방향이 [ORIENTION]",
        "block.k230_face2_near_center": "K230 중앙에 가장 가까운 얼굴 자세의 매개변수 [VALUE] 가져오기",
        "block.k230_face3_detected": "K230 표정 인식 얼굴 감지?",
        "block.k230_face3_count": "K230 감지된 표정 인식 얼굴 수",
        "block.k230_facial_detect": "K230 중앙에 가장 가까운 얼굴 표정이 [VALUE]",
        "block.k230_get_facial_args": "K230 중앙에 가장 가까운 얼굴 표정의 매개변수 [POS] 가져오기",
        "block.k230_gaze_detected": "K230 시선 방향 감지?",
        "block.k230_gaze_count": "K230 감지된 시선 방향 수",
        "block.k230_gaze_near_center_result": "K230 중앙에 가장 가까운 시선 방향이 [NAME]",
        "block.k230_gaze_near_center": "K230 중앙에 가장 가까운 시선 방향의 매개변수 [VALUE] 가져오기",
        "block.k230_person_detected": "K230 사람 감지?",
        "block.k230_person_count": "K230 감지된 사람 수",
        "block.k230_person_near_center": "K230 중앙에 가장 가까운 사람의 매개변수 [VALUE] 가져오기",
        "block.k230_person_point_detected": "K230 사람 자세 감지?",
        "block.k230_person2_count": "K230 감지된 사람 자세 수",
        "block.k230_person_keypoint_detect_name": "K230 사람 자세 [NAME] 감지?",
        "block.k230_result_person_keypoint_get_arg": "K230 사람 자세 [NAME] 의 매개변수 [POS] 가져오기",
        "block.k230_person_keypoint_near_center": "K230 중앙에 가장 가까운 사람 키포인트의 매개변수 [POS] 가져오기",
        "block.k230_hand_detected": "K230 손 감지?",
        "block.k230_hand_count": "K230 감지된 손 수",
        "block.k230_hand_detected_posture": "K230 손 자세 [NAME] 감지?",
        "block.k230_result_hand_keypoint_get_arg": "K230 손 자세 [NAME] 의 매개변수 [POS] 가져오기",
        "block.k230_hand_near_center": "K230 중앙에 가장 가까운 손의 매개변수 [VALUE] 가져오기",
        "block.k230_gesture_detected": "K230 손 제스처 감지?",
        "block.k230_gesture_count": "K230 감지된 손 제스처 수",
        "block.k230_result_hand_gesture_get_arg": "K230 중앙에 가장 가까운 제스처가 [VALUE] 인가?",
        "block.k230_result_hand_gesture_get_pos_arg_by_name": "K230 [NAME] 제스처의 매개변수 [POS] 가져오기",
        "block.k230_result_hand_gesture_get_pos_arg": "K230 중앙에 가장 가까운 손 제스처 인식 결과의 매개변수 [POS] 가져오기",
        "block.k230_fall_detected": "K230 넘어짐 감지?",
        "block.k230_fall_count": "K230 감지된 넘어짐 수",
        "block.k230_fall_near_center_result": "K230 중앙에 가장 가까운 대상이 넘어졌는가?",
        "block.k230_fall_near_center": "K230 중앙에 가장 가까운 넘어짐 감지 결과의 매개변수 [VALUE] 가져오기",
        "block.k230_target_detected": "K230 추적 대상 감지?",
        "block.k230_target_near_center": "K230 중앙에 가장 가까운 추적 대상의 매개변수 [VALUE] 가져오기",
        "block.k230_dynamic_gesture_detected": "K230 동적 제스처 감지?",
        "block.k230_result_dynamic_gesture_get_arg": "K230 동적 제스처가 [GESTURE] 인가?",
        "block.k230_result_self_learn_get_arg": "K230 학습한 이미지 [NAME] 인식?",
        "block.k230_result_self_learn_get_pos_arg": "K230 학습한 이미지 [NAME] 의 매개변수 [POS] 가져오기",
        "block.k230_set_single_color": "K230 단일 색상 감지 대상 [COLOR] 설정",
        "block.k230_set_single_color_arg": "K230 단일 색상 감지 대상 [COLOR] 설정",
        "block.k230_single_color_detected": "K230 단일 색상 감지?",
        "block.k230_result_single_color_get_pos_arg": "K230 중앙에 가장 가까운 단일 색상 감지 결과의 매개변수 [POS] 가져오기",
        "block.k230_set_multi_color_arg": "K230 다중 색상 감지 목록 [COLOR] 설정",
        "block.k230_color_detected": "K230 다중 색상 감지?",
        "block.k230_color_count": "K230 감지된 다중 색상 수",
        "block.k230_color_near_center_name": "K230 색상 [NAME] 감지?",
        "block.k230_color_near_center": "K230 중앙에 가장 가까운 색상의 매개변수 [VALUE] 가져오기",
        "block.k230_result_multi_color_get_pos_arg": "K230 색상 [NAME] 감지 결과의 매개변수 [POS] 가져오기",
        "block.k230_set_line_color": "K230 선 감지 색상 [COLOR] 설정",
        "block.k230_set_line_color_arg": "K230 선 감지 색상 [COLOR] 설정",
        "block.k230_line_detected": "K230 선 감지?",
        "block.k230_result_line_detect_get_arg": "K230 선 감지 결과 [VALUE] 가져오기",
        "block.k230_ocr_detected": "K230 문자 감지?",
        "block.k230_ocr_count": "K230 감지된 문자 수",
        "block.k230_result_ocr_get_arg": "K230 문자 인식 결과 가져오기",
        "block.k230_result_ocr_get_pos_arg": "K230 문자 인식 결과의 매개변수 [POINT] 가져오기",
        "block.k230_license_plate_detected": "K230 차량 번호판 감지?",
        "block.k230_license_plate_count": "K230 감지된 차량 번호판 수",
        "block.k230_result_lpr_get_arg": "K230 차량 번호판 인식 결과 가져오기",
        "block.k230_result_lpr_get_pos_arg": "K230 차량 번호판 인식 결과의 매개변수 [POINT] 가져오기",
        "block.k230_object_detected": "K230 물체 감지?",
        "block.k230_object_count": "K230 감지된 물체 수",
        "block.k230_object_classify_parameter": "K230 물체 분류 결과의 매개변수 [POS] 가져오기",
        "block.k230_object_named_detected": "K230 [NAME] 감지?",
        "block.k230_object_parameter": "K230 물체 감지 결과의 매개변수 [POS] 가져오기",
        "block.k230_trash_detected": "K230 쓰레기 감지?",
        "block.k230_trash_count": "K230 감지된 쓰레기 수",
        "block.k230_result_garbage_get_name_arg": "K230 중앙에 가장 가까운 쓰레기 이름이 [VALUE] 인가?",
        "block.k230_trash_near_center": "K230 중앙에 가장 가까운 쓰레기의 매개변수 [POS] 가져오기",
        "block.k230_result_garbage_get_pos_arg": "K230 중앙에 가장 가까운 쓰레기의 [POS] 좌표 가져오기",
        "block.k230_traffic_sign_detected": "K230 교통 표지 감지?",
        "block.k230_traffic_sign_count": "K230 감지된 교통 표지 수",
        "block.k230_result_traffic_get_name_arg": "K230 중앙에 가장 가까운 교통 감지 결과 이름이 [NAME] 인가?",
        "block.k230_traffic_sign_near_center": "K230 중앙에 가장 가까운 교통 표지의 매개변수 [POS] 가져오기",
        "block.k230_april_tag_detected": "K230 AprilTag 감지?",
        "block.k230_april_tag_count": "K230 감지된 AprilTag 수",
        "block.k230_result_apriltag_get_name_arg": "K230 중앙에 가장 가까운 AprilTag 텍스트가 [NAME] 인가?",
        "block.k230_april_tag_near_center": "K230 중앙에 가장 가까운 AprilTag의 매개변수 [POS] 가져오기",
        "block.k230_result_apriltag_get_pos_arg": "K230 중앙에 가장 가까운 AprilTag의 [POS] 좌표 가져오기",
        "block.k230_dm_code_detected": "K230 데이터 매트릭스 코드 감지?",
        "block.k230_dm_code_count": "K230 감지된 데이터 매트릭스 코드 수",
        "block.k230_result_dmcode_get_name_arg": "K230 중앙에 가장 가까운 데이터 매트릭스 코드 텍스트가 [NAME] 인가?",
        "block.k230_dm_code_near_center": "K230 중앙에 가장 가까운 데이터 매트릭스 코드 텍스트 가져오기",
        "block.k230_result_dmcode_get_pos_arg": "K230 중앙에 가장 가까운 데이터 매트릭스 코드의 [POS] 좌표 가져오기",
        "block.k230_qr_code_detected": "K230 QR 코드 감지?",
        "block.k230_qr_code_count": "K230 감지된 QR 코드 수",
        "block.k230_result_orcode_get_arg": "K230 중앙에 가장 가까운 QR 코드 텍스트가 [NAME] 인가?",
        "block.k230_qr_code_near_center": "K230 중앙에 가장 가까운 QR 코드 텍스트 가져오기",
        "block.k230_result_orcode_get_pos_arg": "K230 중앙에 가장 가까운 QR 코드의 [POS] 매개변수 가져오기",
        "block.k230_barcode_detected": "K230 바코드 감지?",
        "block.k230_barcode_count": "K230 감지된 바코드 수",
        "block.k230_result_barcode_get_arg": "K230 중앙에 가장 가까운 바코드 텍스트가 [NAME] 인가?",
        "block.k230_barcode_near_center": "K230 중앙에 가장 가까운 바코드 텍스트 가져오기",
        "block.k230_result_barcode_get_pos_arg": "K230 중앙에 가장 가까운 바코드의 [POS] 매개변수 가져오기",
        "menu.arm_claw_params.angle": "각도",
        "menu.arm_move_to_yz_params.y": "로봇 팔 끝점 Y 좌표",
        "menu.arm_move_to_yz_params.z": "로봇 팔 끝점 Z 좌표",
        "menu.arm_move_to_yz_params.angle": "로봇 팔 끝점 기울기",
        "menu.arm_move_to_yz_params.timeout": "이동 시간(ms)",
        "menu.axis_result.x": "중심 X 좌표",
        "menu.axis_result.y": "중심 Y 좌표",
        "menu.axis_result.w": "너비",
        "menu.axis_result.h": "높이",
        "menu.buzzer_params.freq": "부저 주파수",
        "menu.buzzer_params.time_count": "소리 지속 시간(ms)",
        "menu.color_angle_axis_result.color": "이름",
        "menu.color_angle_axis_result.angle": "각도",
        "menu.color_angle_axis_result.cx": "중심 X 좌표",
        "menu.color_angle_axis_result.cy": "중심 Y 좌표",
        "menu.color_angle_axis_result.w": "너비",
        "menu.color_angle_axis_result.h": "높이",
        "menu.color_li.red": "빨강",
        "menu.color_li.green": "초록",
        "menu.color_li.blue": "파랑",
        "menu.color_li.black": "검정",
        "menu.color_li.white": "흰색",
        "menu.face2_args.0": "자세",
        "menu.face2_args.1": "신뢰도",
        "menu.face2_args.2": "롤 각도",
        "menu.face2_args.3": "피치 각도",
        "menu.face2_args.4": "요 각도",
        "menu.face2_args.x": "중심 X 좌표",
        "menu.face2_args.y": "중심 Y 좌표",
        "menu.face2_args.w": "너비",
        "menu.face2_args.h": "높이",
        "menu.face_args.0": "이름",
        "menu.face_args.1": "신뢰도",
        "menu.face_args.x": "중심 X 좌표",
        "menu.face_args.y": "중심 Y 좌표",
        "menu.face_args.w": "너비",
        "menu.face_args.h": "높이",
        "menu.face_args2.1": "신뢰도",
        "menu.face_args2.x": "중심 X 좌표",
        "menu.face_args2.y": "중심 Y 좌표",
        "menu.face_args2.w": "너비",
        "menu.face_args2.h": "높이",
        "menu.face_args3.0": "이름",
        "menu.face_args3.x": "중심 X 좌표",
        "menu.face_args3.y": "중심 Y 좌표",
        "menu.face_args3.w": "너비",
        "menu.face_args3.h": "높이",
        "menu.face_pos_oriention.Forward": "앞",
        "menu.face_pos_oriention.Down": "아래",
        "menu.face_pos_oriention.Left": "왼쪽",
        "menu.face_pos_oriention.Right": "오른쪽",
        "menu.face_pos_oriention.unknown": "알 수 없음",
        "menu.facial_result.Happiness": "기쁨",
        "menu.facial_result.Angry": "분노",
        "menu.facial_result.Disgust": "혐오",
        "menu.facial_result.Fear": "두려움",
        "menu.facial_result.Neutral": "중립",
        "menu.facial_result.Sadness": "슬픔",
        "menu.facial_result.Surprise": "놀람",
        "menu.garbage.BananaPeel": "바나나 껍질",
        "menu.garbage.BrokenBones": "뼛조각",
        "menu.garbage.CigaretteEnd": "담배꽁초",
        "menu.garbage.DisposableChopsticks": "일회용 젓가락",
        "menu.garbage.Ketchup": "케첩",
        "menu.garbage.Marker": "마커",
        "menu.garbage.OralLiquidBottle": "경구용 액체약 병",
        "menu.garbage.Plate": "접시",
        "menu.garbage.PlasticBottle": "플라스틱병",
        "menu.garbage.StorageBattery": "축전지",
        "menu.garbage.Toothbrush": "칫솔",
        "menu.garbage.Umbrella": "우산",
        "menu.gaze_name.Up": "위",
        "menu.gaze_name.Down": "아래",
        "menu.gaze_name.Left": "왼쪽",
        "menu.gaze_name.Right": "오른쪽",
        "menu.gaze_name.unknow": "알 수 없음",
        "menu.gaze_result.0": "이름",
        "menu.gaze_result.1": "신뢰도",
        "menu.gaze_result.2": "눈 중심 X 좌표",
        "menu.gaze_result.3": "눈 중심 Y 좌표",
        "menu.gaze_result.4": "대상 중심 X 좌표",
        "menu.gaze_result.5": "대상 중심 Y 좌표",
        "menu.gaze_result.x": "중심 X 좌표",
        "menu.gaze_result.y": "중심 Y 좌표",
        "menu.gaze_result.w": "너비",
        "menu.gaze_result.h": "높이",
        "menu.hand_gesture.ok": "OK 제스처",
        "menu.hand_gesture.fist": "주먹",
        "menu.hand_gesture.five": "숫자 5",
        "menu.hand_gesture.gun": "손가락 총",
        "menu.hand_gesture.love": "손가락 하트",
        "menu.hand_gesture.one": "숫자 1",
        "menu.hand_gesture.six": "숫자 6",
        "menu.hand_gesture.three": "숫자 3",
        "menu.hand_gesture.thumbUp": "엄지 척",
        "menu.hand_gesture.yeah": "승리",
        "menu.hand_menu.id": "이름",
        "menu.hand_menu.score": "신뢰도",
        "menu.hand_menu.x": "중심 X 좌표",
        "menu.hand_menu.y": "중심 Y 좌표",
        "menu.hand_menu.w": "너비",
        "menu.hand_menu.h": "높이",
        "menu.hand_menu.0": "손목 X 좌표",
        "menu.hand_menu.1": "손목 Y 좌표",
        "menu.hand_menu.2": "엄지 지점 1 X 좌표",
        "menu.hand_menu.3": "엄지 지점 1 Y 좌표",
        "menu.hand_menu.4": "엄지 지점 2 X 좌표",
        "menu.hand_menu.5": "엄지 지점 2 Y 좌표",
        "menu.hand_menu.6": "엄지 지점 3 X 좌표",
        "menu.hand_menu.7": "엄지 지점 3 Y 좌표",
        "menu.hand_menu.8": "엄지 지점 4 X 좌표",
        "menu.hand_menu.9": "엄지 지점 4 Y 좌표",
        "menu.hand_menu.10": "검지 지점 1 X 좌표",
        "menu.hand_menu.11": "검지 지점 1 Y 좌표",
        "menu.hand_menu.12": "검지 지점 2 X 좌표",
        "menu.hand_menu.13": "검지 지점 2 Y 좌표",
        "menu.hand_menu.14": "검지 지점 3 X 좌표",
        "menu.hand_menu.15": "검지 지점 3 Y 좌표",
        "menu.hand_menu.16": "검지 지점 4 X 좌표",
        "menu.hand_menu.17": "검지 지점 4 Y 좌표",
        "menu.hand_menu.18": "중지 지점 1 X 좌표",
        "menu.hand_menu.19": "중지 지점 1 Y 좌표",
        "menu.hand_menu.20": "중지 지점 2 X 좌표",
        "menu.hand_menu.21": "중지 지점 2 Y 좌표",
        "menu.hand_menu.22": "중지 지점 3 X 좌표",
        "menu.hand_menu.23": "중지 지점 3 Y 좌표",
        "menu.hand_menu.24": "중지 지점 4 X 좌표",
        "menu.hand_menu.25": "중지 지점 4 Y 좌표",
        "menu.hand_menu.26": "약지 지점 1 X 좌표",
        "menu.hand_menu.27": "약지 지점 1 Y 좌표",
        "menu.hand_menu.28": "약지 지점 2 X 좌표",
        "menu.hand_menu.29": "약지 지점 2 Y 좌표",
        "menu.hand_menu.30": "약지 지점 3 X 좌표",
        "menu.hand_menu.31": "약지 지점 3 Y 좌표",
        "menu.hand_menu.32": "약지 지점 4 X 좌표",
        "menu.hand_menu.33": "약지 지점 4 Y 좌표",
        "menu.hand_menu.34": "소지 지점 1 X 좌표",
        "menu.hand_menu.35": "소지 지점 1 Y 좌표",
        "menu.hand_menu.36": "소지 지점 2 X 좌표",
        "menu.hand_menu.37": "소지 지점 2 Y 좌표",
        "menu.hand_menu.38": "소지 지점 3 X 좌표",
        "menu.hand_menu.39": "소지 지점 3 Y 좌표",
        "menu.hand_menu.40": "소지 지점 4 X 좌표",
        "menu.hand_menu.41": "소지 지점 4 Y 좌표",
        "menu.k230_mode.0": "유휴 모드",
        "menu.k230_mode.13": "온라인 대규모 언어 모델",
        "menu.k230_mode.1": "얼굴 인식",
        "menu.k230_mode.2": "얼굴 자세",
        "menu.k230_mode.3": "표정 인식",
        "menu.k230_mode.4": "시선 방향",
        "menu.k230_mode.5": "사람 감지",
        "menu.k230_mode.6": "사람 키포인트",
        "menu.k230_mode.7": "손 키포인트",
        "menu.k230_mode.8": "손 제스처 인식",
        "menu.k230_mode.9": "넘어짐 감지",
        "menu.k230_mode.10": "대상 추적",
        "menu.k230_mode.11": "동적 제스처",
        "menu.k230_mode.12": "자가 학습",
        "menu.k230_mode.14": "단일 색상 감지",
        "menu.k230_mode.15": "다중 색상 감지",
        "menu.k230_mode.16": "선 감지",
        "menu.k230_mode.18": "문자 인식",
        "menu.k230_mode.19": "차량 번호판 인식",
        "menu.k230_mode.20": "물체 분류",
        "menu.k230_mode.21": "물체 감지",
        "menu.k230_mode.22": "쓰레기 분류",
        "menu.k230_mode.23": "교통 감지",
        "menu.k230_mode.24": "AprilTag 인식",
        "menu.k230_mode.25": "데이터 매트릭스 인식",
        "menu.k230_mode.26": "QR 코드 인식",
        "menu.k230_mode.27": "바코드 인식",
        "menu.k230_start.True": "시작",
        "menu.k230_start.False": "정지",
        "menu.line_result.center_pos": "중심 X 좌표",
        "menu.line_result.angle": "각도",
        "menu.line_result.color": "색상",
        "menu.name_confidence.0": "텍스트",
        "menu.name_confidence.1": "신뢰도",
        "menu.obj_menu.0": "이름",
        "menu.obj_menu.x": "중심 X 좌표",
        "menu.obj_menu.y": "중심 Y 좌표",
        "menu.objs.person": "사람",
        "menu.objs.bicycle": "자전거",
        "menu.objs.car": "자동차",
        "menu.objs.motorcycle": "오토바이",
        "menu.objs.airplane": "비행기",
        "menu.objs.bus": "버스",
        "menu.objs.train": "기차",
        "menu.objs.truck": "트럭",
        "menu.objs.boat": "보트",
        "menu.objs.traffic light": "교통 신호등",
        "menu.objs.fire hydrant": "소화전",
        "menu.objs.stop sign": "정지 표지판",
        "menu.objs.parking meter": "주차 요금기",
        "menu.objs.bench": "벤치",
        "menu.objs.bird": "새",
        "menu.objs.cat": "고양이",
        "menu.objs.dog": "개",
        "menu.objs.horse": "말",
        "menu.objs.sheep": "양",
        "menu.objs.cow": "소",
        "menu.objs.elephant": "코끼리",
        "menu.objs.bear": "곰",
        "menu.objs.zebra": "얼룩말",
        "menu.objs.giraffe": "기린",
        "menu.objs.backpack": "배낭",
        "menu.objs.umbrella": "우산",
        "menu.objs.handbag": "핸드백",
        "menu.objs.tie": "넥타이",
        "menu.objs.suitcase": "여행 가방",
        "menu.objs.frisbee": "원반",
        "menu.objs.skis": "스키",
        "menu.objs.snowboard": "스노보드",
        "menu.objs.sports ball": "스포츠 공",
        "menu.objs.kite": "연",
        "menu.objs.baseball bat": "야구 방망이",
        "menu.objs.baseball glove": "야구 글러브",
        "menu.objs.skateboard": "스케이트보드",
        "menu.objs.surfboard": "서핑보드",
        "menu.objs.tennis racket": "테니스 라켓",
        "menu.objs.bottle": "병",
        "menu.objs.wine glass": "와인 잔",
        "menu.objs.cup": "컵",
        "menu.objs.fork": "포크",
        "menu.objs.knife": "칼",
        "menu.objs.spoon": "숟가락",
        "menu.objs.bowl": "그릇",
        "menu.objs.banana": "바나나",
        "menu.objs.apple": "사과",
        "menu.objs.sandwich": "샌드위치",
        "menu.objs.orange": "오렌지",
        "menu.objs.broccoli": "브로콜리",
        "menu.objs.carrot": "당근",
        "menu.objs.hot dog": "핫도그",
        "menu.objs.pizza": "피자",
        "menu.objs.donut": "도넛",
        "menu.objs.cake": "케이크",
        "menu.objs.chair": "의자",
        "menu.objs.couch": "소파",
        "menu.objs.potted plant": "화분",
        "menu.objs.bed": "침대",
        "menu.objs.dining table": "식탁",
        "menu.objs.toilet": "변기",
        "menu.objs.tv": "텔레비전",
        "menu.objs.laptop": "노트북",
        "menu.objs.mouse": "마우스",
        "menu.objs.remote": "리모컨",
        "menu.objs.keyboard": "키보드",
        "menu.objs.cell phone": "휴대전화",
        "menu.objs.microwave": "전자레인지",
        "menu.objs.oven": "오븐",
        "menu.objs.toaster": "토스터",
        "menu.objs.sink": "싱크대",
        "menu.objs.refrigerator": "냉장고",
        "menu.objs.book": "책",
        "menu.objs.clock": "시계",
        "menu.objs.vase": "꽃병",
        "menu.objs.scissors": "가위",
        "menu.objs.teddy bear": "테디 베어",
        "menu.objs.hair drier": "헤어드라이어",
        "menu.objs.toothbrush": "칫솔",
        "menu.ocr_point.0": "왼쪽 위 X",
        "menu.ocr_point.1": "왼쪽 위 Y",
        "menu.ocr_point.2": "오른쪽 위 X",
        "menu.ocr_point.3": "오른쪽 위 Y",
        "menu.ocr_point.4": "오른쪽 아래 X",
        "menu.ocr_point.5": "오른쪽 아래 Y",
        "menu.ocr_point.6": "왼쪽 아래 X",
        "menu.ocr_point.7": "왼쪽 아래 Y",
        "menu.person_keypoint_detect.id": "이름",
        "menu.person_keypoint_detect.score": "신뢰도",
        "menu.person_keypoint_detect.0": "코 X 좌표",
        "menu.person_keypoint_detect.1": "코 Y 좌표",
        "menu.person_keypoint_detect.2": "왼쪽 눈 X 좌표",
        "menu.person_keypoint_detect.3": "왼쪽 눈 Y 좌표",
        "menu.person_keypoint_detect.4": "오른쪽 눈 X 좌표",
        "menu.person_keypoint_detect.5": "오른쪽 눈 Y 좌표",
        "menu.person_keypoint_detect.6": "왼쪽 귀 X 좌표",
        "menu.person_keypoint_detect.7": "왼쪽 귀 Y 좌표",
        "menu.person_keypoint_detect.8": "오른쪽 귀 X 좌표",
        "menu.person_keypoint_detect.9": "오른쪽 귀 Y 좌표",
        "menu.person_keypoint_detect.10": "왼쪽 어깨 X 좌표",
        "menu.person_keypoint_detect.11": "왼쪽 어깨 Y 좌표",
        "menu.person_keypoint_detect.12": "오른쪽 어깨 X 좌표",
        "menu.person_keypoint_detect.13": "오른쪽 어깨 Y 좌표",
        "menu.person_keypoint_detect.14": "왼쪽 팔꿈치 X 좌표",
        "menu.person_keypoint_detect.15": "왼쪽 팔꿈치 Y 좌표",
        "menu.person_keypoint_detect.16": "오른쪽 팔꿈치 X 좌표",
        "menu.person_keypoint_detect.17": "오른쪽 팔꿈치 Y 좌표",
        "menu.person_keypoint_detect.18": "왼쪽 손목 X 좌표",
        "menu.person_keypoint_detect.19": "왼쪽 손목 Y 좌표",
        "menu.person_keypoint_detect.20": "오른쪽 손목 X 좌표",
        "menu.person_keypoint_detect.21": "오른쪽 손목 Y 좌표",
        "menu.person_keypoint_detect.22": "왼쪽 엉덩관절 X 좌표",
        "menu.person_keypoint_detect.23": "왼쪽 엉덩관절 Y 좌표",
        "menu.person_keypoint_detect.24": "오른쪽 엉덩관절 X 좌표",
        "menu.person_keypoint_detect.25": "오른쪽 엉덩관절 Y 좌표",
        "menu.person_keypoint_detect.26": "왼쪽 무릎 X 좌표",
        "menu.person_keypoint_detect.27": "왼쪽 무릎 Y 좌표",
        "menu.person_keypoint_detect.28": "오른쪽 무릎 X 좌표",
        "menu.person_keypoint_detect.29": "오른쪽 무릎 Y 좌표",
        "menu.person_keypoint_detect.30": "왼쪽 발목 X 좌표",
        "menu.person_keypoint_detect.31": "왼쪽 발목 Y 좌표",
        "menu.person_keypoint_detect.32": "오른쪽 발목 X 좌표",
        "menu.person_keypoint_detect.33": "오른쪽 발목 Y 좌표",
        "menu.rgb_light_params.red": "빨강",
        "menu.rgb_light_params.green": "초록",
        "menu.rgb_light_params.blue": "파랑",
        "menu.robot_runAction_params.num": "동작 번호",
        "menu.robot_runAction_params.count": "동작 반복 횟수",
        "menu.traffic_sign.go": "전진",
        "menu.traffic_sign.back": "후진",
        "menu.traffic_sign.Left": "좌회전",
        "menu.traffic_sign.Right": "우회전",
        "menu.traffic_sign.stop": "정지",
        "menu.arm_move_to_yz_params2.y": "로봇 팔 끝점 Y 좌표",
        "menu.arm_move_to_yz_params2.z": "로봇 팔 끝점 Z 좌표",
        "menu.arm_move_to_yz_params2.timeout": "이동 시간(ms)",
        "menu.mcp_names3.Bat_Battery_power": "배터리 전압",
        "menu.mcp_names3.Buzzer_playTone": "부저 재생",
        "menu.mcp_names3.RGB_setRGB": "RGB 조명 설정",
        "menu.mcp_names3.mcar_set_motors_speed": "모터 속도",
        "menu.mcp_names3.mcar_move_distance": "이동 거리",
        "menu.mcp_names3.arm_move_to_yz": "로봇 팔 이동",
        "menu.mcp_names3.arm_claw": "그리퍼 제어",
        "menu.mcp_names3.sonar_getDistance": "RGB 초음파 거리 측정",
        "menu.mcp_names3.sonar_setRGB": "RGB 초음파 색상 설정",
        "menu.motor_speed_params.right_back": "오른쪽 뒤 바퀴 모터 속도",
        "menu.motor_speed_params.right_front": "오른쪽 앞 바퀴 모터 속도",
        "menu.motor_speed_params.left_back": "왼쪽 뒤 바퀴 모터 속도",
        "menu.motor_speed_params.left_front": "왼쪽 앞 바퀴 모터 속도",
        "menu.motor_speed_params.time_count": "지속 시간(ms)",
        "menu.move_distance_params.distance_cm": "이동 거리(cm)",
        "menu.move_distance_params.angle_deg": "이동 방향",
        "menu.move_distance_params.rpm": "회전 속도(rpm)",
        "menu.mcp_names2.Bat_Battery_power": "배터리 전압",
        "menu.mcp_names2.Buzzer_playTone": "부저 재생",
        "menu.mcp_names2.RGB_setRGB": "RGB 조명 설정",
        "menu.mcp_names2.robot_move": "로봇 이동",
        "menu.mcp_names2.arm_move_to_yz": "로봇 팔 이동",
        "menu.mcp_names2.arm_claw": "그리퍼 제어",
        "menu.mcp_names2.sonar_getDistance": "RGB 초음파 거리 측정",
        "menu.mcp_names2.sonar_setRGB": "RGB 초음파 색상 설정",
        "menu.mcp_names2.robot_runAction": "동작 그룹 실행",
        "menu.robot_move_params2.state": "방향",
        "menu.robot_move_params2.steps": "걸음 수",
        "menu.robot_move_params2.time": "한 걸음 이동 시간",
        "menu.robot_move_params2.leg1": "허벅지 이동 범위",
        "menu.robot_move_params2.leg2": "종아리 바깥쪽 이동 범위",
        "menu.robot_move_params2.turn_offset": "보정 각도",
        "menu.mcp_names.Bat_Battery_power": "배터리 전압",
        "menu.mcp_names.Buzzer_playTone": "부저 재생",
        "menu.mcp_names.RGB_setRGB": "RGB 조명 설정",
        "menu.mcp_names.robot_move": "로봇 이동",
        "menu.mcp_names.robot_set_pose": "로봇 자세",
        "menu.mcp_names.arm_move_to_yz": "로봇 팔 이동",
        "menu.mcp_names.arm_claw": "그리퍼 제어",
        "menu.mcp_names.sonar_getDistance": "RGB 초음파 거리 측정",
        "menu.mcp_names.sonar_setRGB": "RGB 초음파 색상 설정",
        "menu.mcp_names.robot_runAction": "동작 그룹 실행",
        "menu.robot_move_params.x": "X축 속도",
        "menu.robot_move_params.y": "Y축 속도",
        "menu.robot_move_params.z": "중심 회전 속도",
        "menu.robot_move_params.height": "다리 들어 올림 높이",
        "menu.robot_move_params.period": "한 걸음 주기(ms)",
        "menu.robot_move_params.step": "걸음 수",
        "menu.robot_set_pose_params.x_offset": "X축 오프셋",
        "menu.robot_set_pose_params.y_offset": "Y축 오프셋",
        "menu.robot_set_pose_params.z_offset": "몸체 상승/하강 오프셋",
        "menu.robot_set_pose_params.run_time": "전환 시간(ms)"
    }
};

export const product = {name: 'product.name', supportedLocales: ['zh-cn', 'en', 'zh-tw', 'ko']} as const;

export default class K230VisionBlocks implements NativeExtension {
    constructor (private readonly context: ExtensionContext) {}

    private checkVariant (): void {
        if (!["hiwonder-dev-dual-drive","hiwonder-dev-mecanum","hiwonder-dev-quadruped","hiwonder-dev-quadruped-pro","hiwonder-dev-hexa"].includes(this.context.variant)) {
            throw new Error('k230-vision: 未支持的主控适配 ' + this.context.variant);
        }
    }

    getInfo (): ExtensionInfo {
        this.checkVariant();
        const menus: NonNullable<ExtensionInfo['menus']> = {
            aimech_iicport: {
                acceptReporters: false,
                items: this.context.ports('sensor.aimech_iicport')
            },
            arm_claw_params: {
                acceptReporters: false,
                items: [
                    {
                        text: this.context.t("menu.arm_claw_params.angle"),
                        value: "angle"
                    }
                ]
            },
            arm_move_to_yz_params: {
                acceptReporters: false,
                items: [
                    {
                        text: this.context.t("menu.arm_move_to_yz_params.y"),
                        value: "y"
                    },
                    {
                        text: this.context.t("menu.arm_move_to_yz_params.z"),
                        value: "z"
                    },
                    {
                        text: this.context.t("menu.arm_move_to_yz_params.angle"),
                        value: "angle"
                    },
                    {
                        text: this.context.t("menu.arm_move_to_yz_params.timeout"),
                        value: "timeout"
                    }
                ]
            },
            axis_result: {
                acceptReporters: false,
                items: [
                    {
                        text: this.context.t("menu.axis_result.x"),
                        value: "x"
                    },
                    {
                        text: this.context.t("menu.axis_result.y"),
                        value: "y"
                    },
                    {
                        text: this.context.t("menu.axis_result.w"),
                        value: "w"
                    },
                    {
                        text: this.context.t("menu.axis_result.h"),
                        value: "h"
                    }
                ]
            },
            buzzer_params: {
                acceptReporters: false,
                items: [
                    {
                        text: this.context.t("menu.buzzer_params.freq"),
                        value: "freq"
                    },
                    {
                        text: this.context.t("menu.buzzer_params.time_count"),
                        value: "time_count"
                    }
                ]
            },
            color_angle_axis_result: {
                acceptReporters: false,
                items: [
                    {
                        text: this.context.t("menu.color_angle_axis_result.color"),
                        value: "color"
                    },
                    {
                        text: this.context.t("menu.color_angle_axis_result.angle"),
                        value: "angle"
                    },
                    {
                        text: this.context.t("menu.color_angle_axis_result.cx"),
                        value: "cx"
                    },
                    {
                        text: this.context.t("menu.color_angle_axis_result.cy"),
                        value: "cy"
                    },
                    {
                        text: this.context.t("menu.color_angle_axis_result.w"),
                        value: "w"
                    },
                    {
                        text: this.context.t("menu.color_angle_axis_result.h"),
                        value: "h"
                    }
                ]
            },
            color_li: {
                acceptReporters: false,
                items: [
                    {
                        text: this.context.t("menu.color_li.red"),
                        value: "red"
                    },
                    {
                        text: this.context.t("menu.color_li.green"),
                        value: "green"
                    },
                    {
                        text: this.context.t("menu.color_li.blue"),
                        value: "blue"
                    },
                    {
                        text: this.context.t("menu.color_li.black"),
                        value: "black"
                    },
                    {
                        text: this.context.t("menu.color_li.white"),
                        value: "white"
                    }
                ]
            },
            face2_args: {
                acceptReporters: false,
                items: [
                    {
                        text: this.context.t("menu.face2_args.0"),
                        value: "0"
                    },
                    {
                        text: this.context.t("menu.face2_args.1"),
                        value: "1"
                    },
                    {
                        text: this.context.t("menu.face2_args.2"),
                        value: "2"
                    },
                    {
                        text: this.context.t("menu.face2_args.3"),
                        value: "3"
                    },
                    {
                        text: this.context.t("menu.face2_args.4"),
                        value: "4"
                    },
                    {
                        text: this.context.t("menu.face2_args.x"),
                        value: "x"
                    },
                    {
                        text: this.context.t("menu.face2_args.y"),
                        value: "y"
                    },
                    {
                        text: this.context.t("menu.face2_args.w"),
                        value: "w"
                    },
                    {
                        text: this.context.t("menu.face2_args.h"),
                        value: "h"
                    }
                ]
            },
            face_args: {
                acceptReporters: false,
                items: [
                    {
                        text: this.context.t("menu.face_args.0"),
                        value: "0"
                    },
                    {
                        text: this.context.t("menu.face_args.1"),
                        value: "1"
                    },
                    {
                        text: this.context.t("menu.face_args.x"),
                        value: "x"
                    },
                    {
                        text: this.context.t("menu.face_args.y"),
                        value: "y"
                    },
                    {
                        text: this.context.t("menu.face_args.w"),
                        value: "w"
                    },
                    {
                        text: this.context.t("menu.face_args.h"),
                        value: "h"
                    }
                ]
            },
            face_args2: {
                acceptReporters: false,
                items: [
                    {
                        text: this.context.t("menu.face_args2.1"),
                        value: "1"
                    },
                    {
                        text: this.context.t("menu.face_args2.x"),
                        value: "x"
                    },
                    {
                        text: this.context.t("menu.face_args2.y"),
                        value: "y"
                    },
                    {
                        text: this.context.t("menu.face_args2.w"),
                        value: "w"
                    },
                    {
                        text: this.context.t("menu.face_args2.h"),
                        value: "h"
                    }
                ]
            },
            face_args3: {
                acceptReporters: false,
                items: [
                    {
                        text: this.context.t("menu.face_args3.0"),
                        value: "0"
                    },
                    {
                        text: this.context.t("menu.face_args3.x"),
                        value: "x"
                    },
                    {
                        text: this.context.t("menu.face_args3.y"),
                        value: "y"
                    },
                    {
                        text: this.context.t("menu.face_args3.w"),
                        value: "w"
                    },
                    {
                        text: this.context.t("menu.face_args3.h"),
                        value: "h"
                    }
                ]
            },
            face_pos_oriention: {
                acceptReporters: false,
                items: [
                    {
                        text: this.context.t("menu.face_pos_oriention.Forward"),
                        value: "Forward"
                    },
                    {
                        text: this.context.t("menu.face_pos_oriention.Down"),
                        value: "Down"
                    },
                    {
                        text: this.context.t("menu.face_pos_oriention.Left"),
                        value: "Left"
                    },
                    {
                        text: this.context.t("menu.face_pos_oriention.Right"),
                        value: "Right"
                    },
                    {
                        text: this.context.t("menu.face_pos_oriention.unknown"),
                        value: "unknown"
                    }
                ]
            },
            facial_result: {
                acceptReporters: false,
                items: [
                    {
                        text: this.context.t("menu.facial_result.Happiness"),
                        value: "Happiness"
                    },
                    {
                        text: this.context.t("menu.facial_result.Angry"),
                        value: "Angry"
                    },
                    {
                        text: this.context.t("menu.facial_result.Disgust"),
                        value: "Disgust"
                    },
                    {
                        text: this.context.t("menu.facial_result.Fear"),
                        value: "Fear"
                    },
                    {
                        text: this.context.t("menu.facial_result.Neutral"),
                        value: "Neutral"
                    },
                    {
                        text: this.context.t("menu.facial_result.Sadness"),
                        value: "Sadness"
                    },
                    {
                        text: this.context.t("menu.facial_result.Surprise"),
                        value: "Surprise"
                    }
                ]
            },
            garbage: {
                acceptReporters: false,
                items: [
                    {
                        text: this.context.t("menu.garbage.BananaPeel"),
                        value: "BananaPeel"
                    },
                    {
                        text: this.context.t("menu.garbage.BrokenBones"),
                        value: "BrokenBones"
                    },
                    {
                        text: this.context.t("menu.garbage.CigaretteEnd"),
                        value: "CigaretteEnd"
                    },
                    {
                        text: this.context.t("menu.garbage.DisposableChopsticks"),
                        value: "DisposableChopsticks"
                    },
                    {
                        text: this.context.t("menu.garbage.Ketchup"),
                        value: "Ketchup"
                    },
                    {
                        text: this.context.t("menu.garbage.Marker"),
                        value: "Marker"
                    },
                    {
                        text: this.context.t("menu.garbage.OralLiquidBottle"),
                        value: "OralLiquidBottle"
                    },
                    {
                        text: this.context.t("menu.garbage.Plate"),
                        value: "Plate"
                    },
                    {
                        text: this.context.t("menu.garbage.PlasticBottle"),
                        value: "PlasticBottle"
                    },
                    {
                        text: this.context.t("menu.garbage.StorageBattery"),
                        value: "StorageBattery"
                    },
                    {
                        text: this.context.t("menu.garbage.Toothbrush"),
                        value: "Toothbrush"
                    },
                    {
                        text: this.context.t("menu.garbage.Umbrella"),
                        value: "Umbrella"
                    }
                ]
            },
            gaze_name: {
                acceptReporters: false,
                items: [
                    {
                        text: this.context.t("menu.gaze_name.Up"),
                        value: "Up"
                    },
                    {
                        text: this.context.t("menu.gaze_name.Down"),
                        value: "Down"
                    },
                    {
                        text: this.context.t("menu.gaze_name.Left"),
                        value: "Left"
                    },
                    {
                        text: this.context.t("menu.gaze_name.Right"),
                        value: "Right"
                    },
                    {
                        text: this.context.t("menu.gaze_name.unknow"),
                        value: "unknow"
                    }
                ]
            },
            gaze_result: {
                acceptReporters: false,
                items: [
                    {
                        text: this.context.t("menu.gaze_result.0"),
                        value: "0"
                    },
                    {
                        text: this.context.t("menu.gaze_result.1"),
                        value: "1"
                    },
                    {
                        text: this.context.t("menu.gaze_result.2"),
                        value: "2"
                    },
                    {
                        text: this.context.t("menu.gaze_result.3"),
                        value: "3"
                    },
                    {
                        text: this.context.t("menu.gaze_result.4"),
                        value: "4"
                    },
                    {
                        text: this.context.t("menu.gaze_result.5"),
                        value: "5"
                    },
                    {
                        text: this.context.t("menu.gaze_result.x"),
                        value: "x"
                    },
                    {
                        text: this.context.t("menu.gaze_result.y"),
                        value: "y"
                    },
                    {
                        text: this.context.t("menu.gaze_result.w"),
                        value: "w"
                    },
                    {
                        text: this.context.t("menu.gaze_result.h"),
                        value: "h"
                    }
                ]
            },
            hand_gesture: {
                acceptReporters: false,
                items: [
                    {
                        text: this.context.t("menu.hand_gesture.ok"),
                        value: "ok"
                    },
                    {
                        text: this.context.t("menu.hand_gesture.fist"),
                        value: "fist"
                    },
                    {
                        text: this.context.t("menu.hand_gesture.five"),
                        value: "five"
                    },
                    {
                        text: this.context.t("menu.hand_gesture.gun"),
                        value: "gun"
                    },
                    {
                        text: this.context.t("menu.hand_gesture.love"),
                        value: "love"
                    },
                    {
                        text: this.context.t("menu.hand_gesture.one"),
                        value: "one"
                    },
                    {
                        text: this.context.t("menu.hand_gesture.six"),
                        value: "six"
                    },
                    {
                        text: this.context.t("menu.hand_gesture.three"),
                        value: "three"
                    },
                    {
                        text: this.context.t("menu.hand_gesture.thumbUp"),
                        value: "thumbUp"
                    },
                    {
                        text: this.context.t("menu.hand_gesture.yeah"),
                        value: "yeah"
                    }
                ]
            },
            hand_menu: {
                acceptReporters: false,
                items: [
                    {
                        text: this.context.t("menu.hand_menu.id"),
                        value: "id"
                    },
                    {
                        text: this.context.t("menu.hand_menu.score"),
                        value: "score"
                    },
                    {
                        text: this.context.t("menu.hand_menu.x"),
                        value: "x"
                    },
                    {
                        text: this.context.t("menu.hand_menu.y"),
                        value: "y"
                    },
                    {
                        text: this.context.t("menu.hand_menu.w"),
                        value: "w"
                    },
                    {
                        text: this.context.t("menu.hand_menu.h"),
                        value: "h"
                    },
                    {
                        text: this.context.t("menu.hand_menu.0"),
                        value: "0"
                    },
                    {
                        text: this.context.t("menu.hand_menu.1"),
                        value: "1"
                    },
                    {
                        text: this.context.t("menu.hand_menu.2"),
                        value: "2"
                    },
                    {
                        text: this.context.t("menu.hand_menu.3"),
                        value: "3"
                    },
                    {
                        text: this.context.t("menu.hand_menu.4"),
                        value: "4"
                    },
                    {
                        text: this.context.t("menu.hand_menu.5"),
                        value: "5"
                    },
                    {
                        text: this.context.t("menu.hand_menu.6"),
                        value: "6"
                    },
                    {
                        text: this.context.t("menu.hand_menu.7"),
                        value: "7"
                    },
                    {
                        text: this.context.t("menu.hand_menu.8"),
                        value: "8"
                    },
                    {
                        text: this.context.t("menu.hand_menu.9"),
                        value: "9"
                    },
                    {
                        text: this.context.t("menu.hand_menu.10"),
                        value: "10"
                    },
                    {
                        text: this.context.t("menu.hand_menu.11"),
                        value: "11"
                    },
                    {
                        text: this.context.t("menu.hand_menu.12"),
                        value: "12"
                    },
                    {
                        text: this.context.t("menu.hand_menu.13"),
                        value: "13"
                    },
                    {
                        text: this.context.t("menu.hand_menu.14"),
                        value: "14"
                    },
                    {
                        text: this.context.t("menu.hand_menu.15"),
                        value: "15"
                    },
                    {
                        text: this.context.t("menu.hand_menu.16"),
                        value: "16"
                    },
                    {
                        text: this.context.t("menu.hand_menu.17"),
                        value: "17"
                    },
                    {
                        text: this.context.t("menu.hand_menu.18"),
                        value: "18"
                    },
                    {
                        text: this.context.t("menu.hand_menu.19"),
                        value: "19"
                    },
                    {
                        text: this.context.t("menu.hand_menu.20"),
                        value: "20"
                    },
                    {
                        text: this.context.t("menu.hand_menu.21"),
                        value: "21"
                    },
                    {
                        text: this.context.t("menu.hand_menu.22"),
                        value: "22"
                    },
                    {
                        text: this.context.t("menu.hand_menu.23"),
                        value: "23"
                    },
                    {
                        text: this.context.t("menu.hand_menu.24"),
                        value: "24"
                    },
                    {
                        text: this.context.t("menu.hand_menu.25"),
                        value: "25"
                    },
                    {
                        text: this.context.t("menu.hand_menu.26"),
                        value: "26"
                    },
                    {
                        text: this.context.t("menu.hand_menu.27"),
                        value: "27"
                    },
                    {
                        text: this.context.t("menu.hand_menu.28"),
                        value: "28"
                    },
                    {
                        text: this.context.t("menu.hand_menu.29"),
                        value: "29"
                    },
                    {
                        text: this.context.t("menu.hand_menu.30"),
                        value: "30"
                    },
                    {
                        text: this.context.t("menu.hand_menu.31"),
                        value: "31"
                    },
                    {
                        text: this.context.t("menu.hand_menu.32"),
                        value: "32"
                    },
                    {
                        text: this.context.t("menu.hand_menu.33"),
                        value: "33"
                    },
                    {
                        text: this.context.t("menu.hand_menu.34"),
                        value: "34"
                    },
                    {
                        text: this.context.t("menu.hand_menu.35"),
                        value: "35"
                    },
                    {
                        text: this.context.t("menu.hand_menu.36"),
                        value: "36"
                    },
                    {
                        text: this.context.t("menu.hand_menu.37"),
                        value: "37"
                    },
                    {
                        text: this.context.t("menu.hand_menu.38"),
                        value: "38"
                    },
                    {
                        text: this.context.t("menu.hand_menu.39"),
                        value: "39"
                    },
                    {
                        text: this.context.t("menu.hand_menu.40"),
                        value: "40"
                    },
                    {
                        text: this.context.t("menu.hand_menu.41"),
                        value: "41"
                    }
                ]
            },
            k230_mode: {
                acceptReporters: false,
                items: [
                    {
                        text: this.context.t("menu.k230_mode.0"),
                        value: "0"
                    },
                    {
                        text: this.context.t("menu.k230_mode.13"),
                        value: "13"
                    },
                    {
                        text: this.context.t("menu.k230_mode.1"),
                        value: "1"
                    },
                    {
                        text: this.context.t("menu.k230_mode.2"),
                        value: "2"
                    },
                    {
                        text: this.context.t("menu.k230_mode.3"),
                        value: "3"
                    },
                    {
                        text: this.context.t("menu.k230_mode.4"),
                        value: "4"
                    },
                    {
                        text: this.context.t("menu.k230_mode.5"),
                        value: "5"
                    },
                    {
                        text: this.context.t("menu.k230_mode.6"),
                        value: "6"
                    },
                    {
                        text: this.context.t("menu.k230_mode.7"),
                        value: "7"
                    },
                    {
                        text: this.context.t("menu.k230_mode.8"),
                        value: "8"
                    },
                    {
                        text: this.context.t("menu.k230_mode.9"),
                        value: "9"
                    },
                    {
                        text: this.context.t("menu.k230_mode.10"),
                        value: "10"
                    },
                    {
                        text: this.context.t("menu.k230_mode.11"),
                        value: "11"
                    },
                    {
                        text: this.context.t("menu.k230_mode.12"),
                        value: "12"
                    },
                    {
                        text: this.context.t("menu.k230_mode.14"),
                        value: "14"
                    },
                    {
                        text: this.context.t("menu.k230_mode.15"),
                        value: "15"
                    },
                    {
                        text: this.context.t("menu.k230_mode.16"),
                        value: "16"
                    },
                    {
                        text: this.context.t("menu.k230_mode.18"),
                        value: "18"
                    },
                    {
                        text: this.context.t("menu.k230_mode.19"),
                        value: "19"
                    },
                    {
                        text: this.context.t("menu.k230_mode.20"),
                        value: "20"
                    },
                    {
                        text: this.context.t("menu.k230_mode.21"),
                        value: "21"
                    },
                    {
                        text: this.context.t("menu.k230_mode.22"),
                        value: "22"
                    },
                    {
                        text: this.context.t("menu.k230_mode.23"),
                        value: "23"
                    },
                    {
                        text: this.context.t("menu.k230_mode.24"),
                        value: "24"
                    },
                    {
                        text: this.context.t("menu.k230_mode.25"),
                        value: "25"
                    },
                    {
                        text: this.context.t("menu.k230_mode.26"),
                        value: "26"
                    },
                    {
                        text: this.context.t("menu.k230_mode.27"),
                        value: "27"
                    }
                ]
            },
            k230_start: {
                acceptReporters: false,
                items: [
                    {
                        text: this.context.t("menu.k230_start.True"),
                        value: "True"
                    },
                    {
                        text: this.context.t("menu.k230_start.False"),
                        value: "False"
                    }
                ]
            },
            line_result: {
                acceptReporters: false,
                items: [
                    {
                        text: this.context.t("menu.line_result.center_pos"),
                        value: "center_pos"
                    },
                    {
                        text: this.context.t("menu.line_result.angle"),
                        value: "angle"
                    },
                    {
                        text: this.context.t("menu.line_result.color"),
                        value: "color"
                    }
                ]
            },
            name_confidence: {
                acceptReporters: false,
                items: [
                    {
                        text: this.context.t("menu.name_confidence.0"),
                        value: "0"
                    },
                    {
                        text: this.context.t("menu.name_confidence.1"),
                        value: "1"
                    }
                ]
            },
            obj_menu: {
                acceptReporters: false,
                items: [
                    {
                        text: this.context.t("menu.obj_menu.0"),
                        value: "0"
                    },
                    {
                        text: this.context.t("menu.obj_menu.x"),
                        value: "x"
                    },
                    {
                        text: this.context.t("menu.obj_menu.y"),
                        value: "y"
                    }
                ]
            },
            objs: {
                acceptReporters: false,
                items: [
                    {
                        text: this.context.t("menu.objs.person"),
                        value: "person"
                    },
                    {
                        text: this.context.t("menu.objs.bicycle"),
                        value: "bicycle"
                    },
                    {
                        text: this.context.t("menu.objs.car"),
                        value: "car"
                    },
                    {
                        text: this.context.t("menu.objs.motorcycle"),
                        value: "motorcycle"
                    },
                    {
                        text: this.context.t("menu.objs.airplane"),
                        value: "airplane"
                    },
                    {
                        text: this.context.t("menu.objs.bus"),
                        value: "bus"
                    },
                    {
                        text: this.context.t("menu.objs.train"),
                        value: "train"
                    },
                    {
                        text: this.context.t("menu.objs.truck"),
                        value: "truck"
                    },
                    {
                        text: this.context.t("menu.objs.boat"),
                        value: "boat"
                    },
                    {
                        text: this.context.t("menu.objs.traffic light"),
                        value: "traffic light"
                    },
                    {
                        text: this.context.t("menu.objs.fire hydrant"),
                        value: "fire hydrant"
                    },
                    {
                        text: this.context.t("menu.objs.stop sign"),
                        value: "stop sign"
                    },
                    {
                        text: this.context.t("menu.objs.parking meter"),
                        value: "parking meter"
                    },
                    {
                        text: this.context.t("menu.objs.bench"),
                        value: "bench"
                    },
                    {
                        text: this.context.t("menu.objs.bird"),
                        value: "bird"
                    },
                    {
                        text: this.context.t("menu.objs.cat"),
                        value: "cat"
                    },
                    {
                        text: this.context.t("menu.objs.dog"),
                        value: "dog"
                    },
                    {
                        text: this.context.t("menu.objs.horse"),
                        value: "horse"
                    },
                    {
                        text: this.context.t("menu.objs.sheep"),
                        value: "sheep"
                    },
                    {
                        text: this.context.t("menu.objs.cow"),
                        value: "cow"
                    },
                    {
                        text: this.context.t("menu.objs.elephant"),
                        value: "elephant"
                    },
                    {
                        text: this.context.t("menu.objs.bear"),
                        value: "bear"
                    },
                    {
                        text: this.context.t("menu.objs.zebra"),
                        value: "zebra"
                    },
                    {
                        text: this.context.t("menu.objs.giraffe"),
                        value: "giraffe"
                    },
                    {
                        text: this.context.t("menu.objs.backpack"),
                        value: "backpack"
                    },
                    {
                        text: this.context.t("menu.objs.umbrella"),
                        value: "umbrella"
                    },
                    {
                        text: this.context.t("menu.objs.handbag"),
                        value: "handbag"
                    },
                    {
                        text: this.context.t("menu.objs.tie"),
                        value: "tie"
                    },
                    {
                        text: this.context.t("menu.objs.suitcase"),
                        value: "suitcase"
                    },
                    {
                        text: this.context.t("menu.objs.frisbee"),
                        value: "frisbee"
                    },
                    {
                        text: this.context.t("menu.objs.skis"),
                        value: "skis"
                    },
                    {
                        text: this.context.t("menu.objs.snowboard"),
                        value: "snowboard"
                    },
                    {
                        text: this.context.t("menu.objs.sports ball"),
                        value: "sports ball"
                    },
                    {
                        text: this.context.t("menu.objs.kite"),
                        value: "kite"
                    },
                    {
                        text: this.context.t("menu.objs.baseball bat"),
                        value: "baseball bat"
                    },
                    {
                        text: this.context.t("menu.objs.baseball glove"),
                        value: "baseball glove"
                    },
                    {
                        text: this.context.t("menu.objs.skateboard"),
                        value: "skateboard"
                    },
                    {
                        text: this.context.t("menu.objs.surfboard"),
                        value: "surfboard"
                    },
                    {
                        text: this.context.t("menu.objs.tennis racket"),
                        value: "tennis racket"
                    },
                    {
                        text: this.context.t("menu.objs.bottle"),
                        value: "bottle"
                    },
                    {
                        text: this.context.t("menu.objs.wine glass"),
                        value: "wine glass"
                    },
                    {
                        text: this.context.t("menu.objs.cup"),
                        value: "cup"
                    },
                    {
                        text: this.context.t("menu.objs.fork"),
                        value: "fork"
                    },
                    {
                        text: this.context.t("menu.objs.knife"),
                        value: "knife"
                    },
                    {
                        text: this.context.t("menu.objs.spoon"),
                        value: "spoon"
                    },
                    {
                        text: this.context.t("menu.objs.bowl"),
                        value: "bowl"
                    },
                    {
                        text: this.context.t("menu.objs.banana"),
                        value: "banana"
                    },
                    {
                        text: this.context.t("menu.objs.apple"),
                        value: "apple"
                    },
                    {
                        text: this.context.t("menu.objs.sandwich"),
                        value: "sandwich"
                    },
                    {
                        text: this.context.t("menu.objs.orange"),
                        value: "orange"
                    },
                    {
                        text: this.context.t("menu.objs.broccoli"),
                        value: "broccoli"
                    },
                    {
                        text: this.context.t("menu.objs.carrot"),
                        value: "carrot"
                    },
                    {
                        text: this.context.t("menu.objs.hot dog"),
                        value: "hot dog"
                    },
                    {
                        text: this.context.t("menu.objs.pizza"),
                        value: "pizza"
                    },
                    {
                        text: this.context.t("menu.objs.donut"),
                        value: "donut"
                    },
                    {
                        text: this.context.t("menu.objs.cake"),
                        value: "cake"
                    },
                    {
                        text: this.context.t("menu.objs.chair"),
                        value: "chair"
                    },
                    {
                        text: this.context.t("menu.objs.couch"),
                        value: "couch"
                    },
                    {
                        text: this.context.t("menu.objs.potted plant"),
                        value: "potted plant"
                    },
                    {
                        text: this.context.t("menu.objs.bed"),
                        value: "bed"
                    },
                    {
                        text: this.context.t("menu.objs.dining table"),
                        value: "dining table"
                    },
                    {
                        text: this.context.t("menu.objs.toilet"),
                        value: "toilet"
                    },
                    {
                        text: this.context.t("menu.objs.tv"),
                        value: "tv"
                    },
                    {
                        text: this.context.t("menu.objs.laptop"),
                        value: "laptop"
                    },
                    {
                        text: this.context.t("menu.objs.mouse"),
                        value: "mouse"
                    },
                    {
                        text: this.context.t("menu.objs.remote"),
                        value: "remote"
                    },
                    {
                        text: this.context.t("menu.objs.keyboard"),
                        value: "keyboard"
                    },
                    {
                        text: this.context.t("menu.objs.cell phone"),
                        value: "cell phone"
                    },
                    {
                        text: this.context.t("menu.objs.microwave"),
                        value: "microwave"
                    },
                    {
                        text: this.context.t("menu.objs.oven"),
                        value: "oven"
                    },
                    {
                        text: this.context.t("menu.objs.toaster"),
                        value: "toaster"
                    },
                    {
                        text: this.context.t("menu.objs.sink"),
                        value: "sink"
                    },
                    {
                        text: this.context.t("menu.objs.refrigerator"),
                        value: "refrigerator"
                    },
                    {
                        text: this.context.t("menu.objs.book"),
                        value: "book"
                    },
                    {
                        text: this.context.t("menu.objs.clock"),
                        value: "clock"
                    },
                    {
                        text: this.context.t("menu.objs.vase"),
                        value: "vase"
                    },
                    {
                        text: this.context.t("menu.objs.scissors"),
                        value: "scissors"
                    },
                    {
                        text: this.context.t("menu.objs.teddy bear"),
                        value: "teddy bear"
                    },
                    {
                        text: this.context.t("menu.objs.hair drier"),
                        value: "hair drier"
                    },
                    {
                        text: this.context.t("menu.objs.toothbrush"),
                        value: "toothbrush"
                    }
                ]
            },
            ocr_point: {
                acceptReporters: false,
                items: [
                    {
                        text: this.context.t("menu.ocr_point.0"),
                        value: "0"
                    },
                    {
                        text: this.context.t("menu.ocr_point.1"),
                        value: "1"
                    },
                    {
                        text: this.context.t("menu.ocr_point.2"),
                        value: "2"
                    },
                    {
                        text: this.context.t("menu.ocr_point.3"),
                        value: "3"
                    },
                    {
                        text: this.context.t("menu.ocr_point.4"),
                        value: "4"
                    },
                    {
                        text: this.context.t("menu.ocr_point.5"),
                        value: "5"
                    },
                    {
                        text: this.context.t("menu.ocr_point.6"),
                        value: "6"
                    },
                    {
                        text: this.context.t("menu.ocr_point.7"),
                        value: "7"
                    }
                ]
            },
            person_keypoint_detect: {
                acceptReporters: false,
                items: [
                    {
                        text: this.context.t("menu.person_keypoint_detect.id"),
                        value: "id"
                    },
                    {
                        text: this.context.t("menu.person_keypoint_detect.score"),
                        value: "score"
                    },
                    {
                        text: this.context.t("menu.person_keypoint_detect.0"),
                        value: "0"
                    },
                    {
                        text: this.context.t("menu.person_keypoint_detect.1"),
                        value: "1"
                    },
                    {
                        text: this.context.t("menu.person_keypoint_detect.2"),
                        value: "2"
                    },
                    {
                        text: this.context.t("menu.person_keypoint_detect.3"),
                        value: "3"
                    },
                    {
                        text: this.context.t("menu.person_keypoint_detect.4"),
                        value: "4"
                    },
                    {
                        text: this.context.t("menu.person_keypoint_detect.5"),
                        value: "5"
                    },
                    {
                        text: this.context.t("menu.person_keypoint_detect.6"),
                        value: "6"
                    },
                    {
                        text: this.context.t("menu.person_keypoint_detect.7"),
                        value: "7"
                    },
                    {
                        text: this.context.t("menu.person_keypoint_detect.8"),
                        value: "8"
                    },
                    {
                        text: this.context.t("menu.person_keypoint_detect.9"),
                        value: "9"
                    },
                    {
                        text: this.context.t("menu.person_keypoint_detect.10"),
                        value: "10"
                    },
                    {
                        text: this.context.t("menu.person_keypoint_detect.11"),
                        value: "11"
                    },
                    {
                        text: this.context.t("menu.person_keypoint_detect.12"),
                        value: "12"
                    },
                    {
                        text: this.context.t("menu.person_keypoint_detect.13"),
                        value: "13"
                    },
                    {
                        text: this.context.t("menu.person_keypoint_detect.14"),
                        value: "14"
                    },
                    {
                        text: this.context.t("menu.person_keypoint_detect.15"),
                        value: "15"
                    },
                    {
                        text: this.context.t("menu.person_keypoint_detect.16"),
                        value: "16"
                    },
                    {
                        text: this.context.t("menu.person_keypoint_detect.17"),
                        value: "17"
                    },
                    {
                        text: this.context.t("menu.person_keypoint_detect.18"),
                        value: "18"
                    },
                    {
                        text: this.context.t("menu.person_keypoint_detect.19"),
                        value: "19"
                    },
                    {
                        text: this.context.t("menu.person_keypoint_detect.20"),
                        value: "20"
                    },
                    {
                        text: this.context.t("menu.person_keypoint_detect.21"),
                        value: "21"
                    },
                    {
                        text: this.context.t("menu.person_keypoint_detect.22"),
                        value: "22"
                    },
                    {
                        text: this.context.t("menu.person_keypoint_detect.23"),
                        value: "23"
                    },
                    {
                        text: this.context.t("menu.person_keypoint_detect.24"),
                        value: "24"
                    },
                    {
                        text: this.context.t("menu.person_keypoint_detect.25"),
                        value: "25"
                    },
                    {
                        text: this.context.t("menu.person_keypoint_detect.26"),
                        value: "26"
                    },
                    {
                        text: this.context.t("menu.person_keypoint_detect.27"),
                        value: "27"
                    },
                    {
                        text: this.context.t("menu.person_keypoint_detect.28"),
                        value: "28"
                    },
                    {
                        text: this.context.t("menu.person_keypoint_detect.29"),
                        value: "29"
                    },
                    {
                        text: this.context.t("menu.person_keypoint_detect.30"),
                        value: "30"
                    },
                    {
                        text: this.context.t("menu.person_keypoint_detect.31"),
                        value: "31"
                    },
                    {
                        text: this.context.t("menu.person_keypoint_detect.32"),
                        value: "32"
                    },
                    {
                        text: this.context.t("menu.person_keypoint_detect.33"),
                        value: "33"
                    }
                ]
            },
            rgb_light_params: {
                acceptReporters: false,
                items: [
                    {
                        text: this.context.t("menu.rgb_light_params.red"),
                        value: "red"
                    },
                    {
                        text: this.context.t("menu.rgb_light_params.green"),
                        value: "green"
                    },
                    {
                        text: this.context.t("menu.rgb_light_params.blue"),
                        value: "blue"
                    }
                ]
            },
            robot_runAction_params: {
                acceptReporters: false,
                items: [
                    {
                        text: this.context.t("menu.robot_runAction_params.num"),
                        value: "num"
                    },
                    {
                        text: this.context.t("menu.robot_runAction_params.count"),
                        value: "count"
                    }
                ]
            },
            traffic_sign: {
                acceptReporters: false,
                items: [
                    {
                        text: this.context.t("menu.traffic_sign.go"),
                        value: "go"
                    },
                    {
                        text: this.context.t("menu.traffic_sign.back"),
                        value: "back"
                    },
                    {
                        text: this.context.t("menu.traffic_sign.Left"),
                        value: "Left"
                    },
                    {
                        text: this.context.t("menu.traffic_sign.Right"),
                        value: "Right"
                    },
                    {
                        text: this.context.t("menu.traffic_sign.stop"),
                        value: "stop"
                    }
                ]
            },
            arm_move_to_yz_params2: {
                acceptReporters: false,
                items: [
                    {
                        text: this.context.t("menu.arm_move_to_yz_params2.y"),
                        value: "y"
                    },
                    {
                        text: this.context.t("menu.arm_move_to_yz_params2.z"),
                        value: "z"
                    },
                    {
                        text: this.context.t("menu.arm_move_to_yz_params2.timeout"),
                        value: "timeout"
                    }
                ]
            },
            mcp_names3: {
                acceptReporters: false,
                items: [
                    {
                        text: this.context.t("menu.mcp_names3.Bat_Battery_power"),
                        value: "Bat_Battery_power"
                    },
                    {
                        text: this.context.t("menu.mcp_names3.Buzzer_playTone"),
                        value: "Buzzer_playTone"
                    },
                    {
                        text: this.context.t("menu.mcp_names3.RGB_setRGB"),
                        value: "RGB_setRGB"
                    },
                    {
                        text: this.context.t("menu.mcp_names3.mcar_set_motors_speed"),
                        value: "mcar_set_motors_speed"
                    },
                    {
                        text: this.context.t("menu.mcp_names3.mcar_move_distance"),
                        value: "mcar_move_distance"
                    },
                    {
                        text: this.context.t("menu.mcp_names3.arm_move_to_yz"),
                        value: "arm_move_to_yz"
                    },
                    {
                        text: this.context.t("menu.mcp_names3.arm_claw"),
                        value: "arm_claw"
                    },
                    {
                        text: this.context.t("menu.mcp_names3.sonar_getDistance"),
                        value: "sonar_getDistance"
                    },
                    {
                        text: this.context.t("menu.mcp_names3.sonar_setRGB"),
                        value: "sonar_setRGB"
                    }
                ]
            },
            motor_speed_params: {
                acceptReporters: false,
                items: [
                    {
                        text: this.context.t("menu.motor_speed_params.right_back"),
                        value: "right_back"
                    },
                    {
                        text: this.context.t("menu.motor_speed_params.right_front"),
                        value: "right_front"
                    },
                    {
                        text: this.context.t("menu.motor_speed_params.left_back"),
                        value: "left_back"
                    },
                    {
                        text: this.context.t("menu.motor_speed_params.left_front"),
                        value: "left_front"
                    },
                    {
                        text: this.context.t("menu.motor_speed_params.time_count"),
                        value: "time_count"
                    }
                ]
            },
            move_distance_params: {
                acceptReporters: false,
                items: [
                    {
                        text: this.context.t("menu.move_distance_params.distance_cm"),
                        value: "distance_cm"
                    },
                    {
                        text: this.context.t("menu.move_distance_params.angle_deg"),
                        value: "angle_deg"
                    },
                    {
                        text: this.context.t("menu.move_distance_params.rpm"),
                        value: "rpm"
                    }
                ]
            },
            mcp_names2: {
                acceptReporters: false,
                items: [
                    {
                        text: this.context.t("menu.mcp_names2.Bat_Battery_power"),
                        value: "Bat_Battery_power"
                    },
                    {
                        text: this.context.t("menu.mcp_names2.Buzzer_playTone"),
                        value: "Buzzer_playTone"
                    },
                    {
                        text: this.context.t("menu.mcp_names2.RGB_setRGB"),
                        value: "RGB_setRGB"
                    },
                    {
                        text: this.context.t("menu.mcp_names2.robot_move"),
                        value: "robot_move"
                    },
                    {
                        text: this.context.t("menu.mcp_names2.arm_move_to_yz"),
                        value: "arm_move_to_yz"
                    },
                    {
                        text: this.context.t("menu.mcp_names2.arm_claw"),
                        value: "arm_claw"
                    },
                    {
                        text: this.context.t("menu.mcp_names2.sonar_getDistance"),
                        value: "sonar_getDistance"
                    },
                    {
                        text: this.context.t("menu.mcp_names2.sonar_setRGB"),
                        value: "sonar_setRGB"
                    },
                    {
                        text: this.context.t("menu.mcp_names2.robot_runAction"),
                        value: "robot_runAction"
                    }
                ]
            },
            robot_move_params2: {
                acceptReporters: false,
                items: [
                    {
                        text: this.context.t("menu.robot_move_params2.state"),
                        value: "state"
                    },
                    {
                        text: this.context.t("menu.robot_move_params2.steps"),
                        value: "steps"
                    },
                    {
                        text: this.context.t("menu.robot_move_params2.time"),
                        value: "time"
                    },
                    {
                        text: this.context.t("menu.robot_move_params2.leg1"),
                        value: "leg1"
                    },
                    {
                        text: this.context.t("menu.robot_move_params2.leg2"),
                        value: "leg2"
                    },
                    {
                        text: this.context.t("menu.robot_move_params2.turn_offset"),
                        value: "turn_offset"
                    }
                ]
            },
            mcp_names: {
                acceptReporters: false,
                items: [
                    {
                        text: this.context.t("menu.mcp_names.Bat_Battery_power"),
                        value: "Bat_Battery_power"
                    },
                    {
                        text: this.context.t("menu.mcp_names.Buzzer_playTone"),
                        value: "Buzzer_playTone"
                    },
                    {
                        text: this.context.t("menu.mcp_names.RGB_setRGB"),
                        value: "RGB_setRGB"
                    },
                    {
                        text: this.context.t("menu.mcp_names.robot_move"),
                        value: "robot_move"
                    },
                    {
                        text: this.context.t("menu.mcp_names.robot_set_pose"),
                        value: "robot_set_pose"
                    },
                    {
                        text: this.context.t("menu.mcp_names.arm_move_to_yz"),
                        value: "arm_move_to_yz"
                    },
                    {
                        text: this.context.t("menu.mcp_names.arm_claw"),
                        value: "arm_claw"
                    },
                    {
                        text: this.context.t("menu.mcp_names.sonar_getDistance"),
                        value: "sonar_getDistance"
                    },
                    {
                        text: this.context.t("menu.mcp_names.sonar_setRGB"),
                        value: "sonar_setRGB"
                    },
                    {
                        text: this.context.t("menu.mcp_names.robot_runAction"),
                        value: "robot_runAction"
                    }
                ]
            },
            robot_move_params: {
                acceptReporters: false,
                items: [
                    {
                        text: this.context.t("menu.robot_move_params.x"),
                        value: "x"
                    },
                    {
                        text: this.context.t("menu.robot_move_params.y"),
                        value: "y"
                    },
                    {
                        text: this.context.t("menu.robot_move_params.z"),
                        value: "z"
                    },
                    {
                        text: this.context.t("menu.robot_move_params.height"),
                        value: "height"
                    },
                    {
                        text: this.context.t("menu.robot_move_params.period"),
                        value: "period"
                    },
                    {
                        text: this.context.t("menu.robot_move_params.step"),
                        value: "step"
                    }
                ]
            },
            robot_set_pose_params: {
                acceptReporters: false,
                items: [
                    {
                        text: this.context.t("menu.robot_set_pose_params.x_offset"),
                        value: "x_offset"
                    },
                    {
                        text: this.context.t("menu.robot_set_pose_params.y_offset"),
                        value: "y_offset"
                    },
                    {
                        text: this.context.t("menu.robot_set_pose_params.z_offset"),
                        value: "z_offset"
                    },
                    {
                        text: "pitch",
                        value: "pitch"
                    },
                    {
                        text: "roll",
                        value: "roll"
                    },
                    {
                        text: "yaw",
                        value: "yaw"
                    },
                    {
                        text: this.context.t("menu.robot_set_pose_params.run_time"),
                        value: "run_time"
                    }
                ]
            }
        };
        const blocks: ExtensionInfo['blocks'] = [
            {
                subCategory: this.context.t(product.name),
                toolboxCategoryId: 'sensor__k230-vision',
                toolboxIconURI: this.context.asset('assets/k230_menu.png')
            },
                {
                    opcode: "k230_aimech_init",
                    blockType: "command",
                    text: this.context.t("block.k230_aimech_init"),
                    blockIconURI: this.context.asset('assets/k230.svg'),
                    arguments: {
                        PORT: {
                            type: "string",
                            defaultValue: this.context.defaultPort('k230_aimech_init', 'PORT'),
                            menu: "aimech_iicport",
                            literal: true
                        }
                    }
                },
                {
                    opcode: "k230_set_mode",
                    blockType: "command",
                    text: this.context.t("block.k230_set_mode"),
                    blockIconURI: this.context.asset('assets/k230.svg'),
                    arguments: {
                        MODE: {
                            type: "string",
                            defaultValue: "0",
                            menu: "k230_mode",
                            literal: true
                        }
                    }
                },
                {
                    opcode: "k230_set_run",
                    blockType: "command",
                    text: this.context.t("block.k230_set_run"),
                    blockIconURI: this.context.asset('assets/k230.svg'),
                    arguments: {
                        MODE: {
                            type: "string",
                            defaultValue: "True",
                            menu: "k230_start",
                            literal: true
                        }
                    }
                },
                {
                    opcode: "k230_set_volumn",
                    blockType: "command",
                    text: this.context.t("block.k230_set_volumn"),
                    blockIconURI: this.context.asset('assets/k230.svg'),
                    arguments: {
                        VALUE: {
                            type: "slider",
                            defaultValue: 60
                        }
                    }
                },
                {
                    opcode: "k230_set_wifi",
                    blockType: "command",
                    text: this.context.t("block.k230_set_wifi"),
                    blockIconURI: this.context.asset('assets/k230.svg'),
                    arguments: {
                        VALUE1: {
                            type: "string",
                            defaultValue: " "
                        },
                        VALUE2: {
                            type: "string",
                            defaultValue: " "
                        }
                    }
                },
                {
                    opcode: "k230_update_detect_result",
                    blockType: "command",
                    text: this.context.t("block.k230_update_detect_result"),
                    blockIconURI: this.context.asset('assets/k230.svg'),
                    arguments: {

                    }
                },
                {
                    subCategory: this.context.t(product.name) + ' · ' + this.context.t('group.online'),
                    toolboxCategoryId: 'sensor__k230-vision__online',
                    toolboxParentId: 'sensor__k230-vision',
                    toolboxSubcategoryLabel: this.context.t('group.online')
                },
                {
                    opcode: "k230_mcp_action_setting",
                    blockType: "command",
                    text: this.context.t("block.k230_mcp_action_setting"),
                    blockIconURI: this.context.asset('assets/k230.svg'),
                    arguments: {
                        COMMAND: {
                            type: "largetext",
                            defaultValue: " "
                        },
                        BLOCK: {
                            type: "number",
                            defaultValue: 5
                        }
                    }
                },
                {
                    opcode: "k230_mcp_move_setting",
                    blockType: "command",
                    text: this.context.t("block.k230_mcp_move_setting"),
                    blockIconURI: this.context.asset('assets/k230.svg'),
                    arguments: {
                        COMMAND: {
                            type: "largetext",
                            defaultValue: " "
                        },
                        BLOCK: {
                            type: "number",
                            defaultValue: 5
                        }
                    }
                },
                {
                    opcode: "k230_mcp_setting",
                    blockType: "command",
                    text: this.context.t("block.k230_mcp_setting"),
                    blockIconURI: this.context.asset('assets/k230.svg'),
                    arguments: {
                        NAME: {
                            type: "string",
                            defaultValue: "tool"
                        },
                        COMMAND: {
                            type: "largetext",
                            defaultValue: " "
                        },
                        PARAMS: {
                            type: "largetext",
                            defaultValue: " "
                        },
                        BLOCK: {
                            type: "number",
                            defaultValue: 5
                        }
                    }
                },
                {
                    opcode: "k230_result_exists",
                    blockType: "Boolean",
                    disableMonitor: true,
                    text: this.context.t("block.k230_result_exists"),
                    blockIconURI: this.context.asset('assets/k230.svg'),
                    arguments: {

                    }
                },
                {
                    opcode: "k230_get_result",
                    blockType: "reporter",
                    disableMonitor: true,
                    text: this.context.t("block.k230_get_result"),
                    blockIconURI: this.context.asset('assets/k230.svg'),
                    arguments: {

                    }
                },
                {
                    opcode: "k230_send_mcp_result",
                    blockType: "command",
                    text: this.context.t("block.k230_send_mcp_result"),
                    blockIconURI: this.context.asset('assets/k230.svg'),
                    arguments: {
                        VALUE: {
                            type: "string",
                            defaultValue: " "
                        }
                    }
                },
                ...((this.context.variant === "hiwonder-dev-mecanum") ? [
                    {
                    opcode: "k230_aimecanum_set_mcp_default",
                    blockType: "command",
                    text: this.context.t("block.k230_aimecanum_set_mcp_default"),
                    blockIconURI: this.context.asset('assets/k230.svg'),
                    arguments: {

                    }
                } satisfies ExtensionBlock
                ] : []),
                ...((this.context.variant === "hiwonder-dev-quadruped") ? [
                    {
                    opcode: "k230_aiquadruped_set_mcp_default",
                    blockType: "command",
                    text: this.context.t("block.k230_aiquadruped_set_mcp_default"),
                    blockIconURI: this.context.asset('assets/k230.svg'),
                    arguments: {

                    }
                } satisfies ExtensionBlock
                ] : []),
                ...((this.context.variant === "hiwonder-dev-quadruped-pro") ? [
                    {
                    opcode: "k230_aiquadrupedpro_set_mcp_default",
                    blockType: "command",
                    text: this.context.t("block.k230_aiquadrupedpro_set_mcp_default"),
                    blockIconURI: this.context.asset('assets/k230.svg'),
                    arguments: {

                    }
                } satisfies ExtensionBlock
                ] : []),
                ...((this.context.variant === "hiwonder-dev-hexa") ? [
                    {
                    opcode: "k230_aihexa_set_mcp_default",
                    blockType: "command",
                    text: this.context.t("block.k230_aihexa_set_mcp_default"),
                    blockIconURI: this.context.asset('assets/k230.svg'),
                    arguments: {

                    }
                } satisfies ExtensionBlock
                ] : []),
                ...((this.context.variant === "hiwonder-dev-mecanum" || this.context.variant === "hiwonder-dev-quadruped" || this.context.variant === "hiwonder-dev-quadruped-pro" || this.context.variant === "hiwonder-dev-hexa") ? [
                    {
                    opcode: "k230_get_default_mcp_name",
                    blockType: "Boolean",
                    disableMonitor: true,
                    text: this.context.t("block.k230_get_default_mcp_name"),
                    blockIconURI: this.context.asset('assets/k230.svg'),
                    arguments: {
                        RESULT: {
                            type: "string",
                            defaultValue: " "
                        },
                        VALUE: {
                            type: "string",
                            defaultValue: "Bat_Battery_power",
                            menu: this.context.variant === "hiwonder-dev-mecanum" ? "mcp_names3" : this.context.variant === "hiwonder-dev-quadruped" ? "mcp_names2" : "mcp_names",
                            literal: true
                        }
                    }
                } satisfies ExtensionBlock
                ] : []),
                {
                    opcode: "k230_get_buzzer_params",
                    blockType: "reporter",
                    disableMonitor: true,
                    text: this.context.t("block.k230_get_buzzer_params"),
                    blockIconURI: this.context.asset('assets/k230.svg'),
                    arguments: {
                        RESULT: {
                            type: "string",
                            defaultValue: " "
                        },
                        VALUE: {
                            type: "string",
                            defaultValue: "freq",
                            menu: "buzzer_params",
                            literal: true
                        }
                    }
                },
                {
                    opcode: "k230_get_rgb_light_params",
                    blockType: "reporter",
                    disableMonitor: true,
                    text: this.context.t("block.k230_get_rgb_light_params"),
                    blockIconURI: this.context.asset('assets/k230.svg'),
                    arguments: {
                        RESULT: {
                            type: "string",
                            defaultValue: " "
                        },
                        VALUE: {
                            type: "string",
                            defaultValue: "red",
                            menu: "rgb_light_params",
                            literal: true
                        }
                    }
                },
                {
                    opcode: "k230_get_sonar_rgb_params",
                    blockType: "reporter",
                    disableMonitor: true,
                    text: this.context.t("block.k230_get_sonar_rgb_params"),
                    blockIconURI: this.context.asset('assets/k230.svg'),
                    arguments: {
                        RESULT: {
                            type: "string",
                            defaultValue: " "
                        },
                        VALUE: {
                            type: "string",
                            defaultValue: "red",
                            menu: "rgb_light_params",
                            literal: true
                        }
                    }
                },
                {
                    opcode: "k230_get_arm_claw_params",
                    blockType: "reporter",
                    disableMonitor: true,
                    text: this.context.t("block.k230_get_arm_claw_params"),
                    blockIconURI: this.context.asset('assets/k230.svg'),
                    arguments: {
                        RESULT: {
                            type: "string",
                            defaultValue: " "
                        },
                        VALUE: {
                            type: "string",
                            defaultValue: "angle",
                            menu: "arm_claw_params",
                            literal: true
                        }
                    }
                },
                ...((this.context.variant === "hiwonder-dev-quadruped-pro" || this.context.variant === "hiwonder-dev-hexa") ? [
                    {
                    opcode: "k230_get_robot_set_pose_params",
                    blockType: "reporter",
                    disableMonitor: true,
                    text: this.context.t("block.k230_get_robot_set_pose_params"),
                    blockIconURI: this.context.asset('assets/k230.svg'),
                    arguments: {
                        RESULT: {
                            type: "string",
                            defaultValue: " "
                        },
                        VALUE: {
                            type: "string",
                            defaultValue: "x_offset",
                            menu: "robot_set_pose_params",
                            literal: true
                        }
                    }
                } satisfies ExtensionBlock
                ] : []),
                ...((this.context.variant === "hiwonder-dev-quadruped" || this.context.variant === "hiwonder-dev-quadruped-pro" || this.context.variant === "hiwonder-dev-hexa") ? [
                    {
                    opcode: "k230_get_robot_move_params",
                    blockType: "reporter",
                    disableMonitor: true,
                    text: this.context.t("block.k230_get_robot_move_params"),
                    blockIconURI: this.context.asset('assets/k230.svg'),
                    arguments: {
                        RESULT: {
                            type: "string",
                            defaultValue: " "
                        },
                        VALUE: {
                            type: "string",
                            defaultValue: "x",
                            menu: this.context.variant === "hiwonder-dev-quadruped" ? "robot_move_params2" : "robot_move_params",
                            literal: true
                        }
                    }
                } satisfies ExtensionBlock
                ] : []),
                ...((this.context.variant === "hiwonder-dev-dual-drive" || this.context.variant === "hiwonder-dev-quadruped" || this.context.variant === "hiwonder-dev-quadruped-pro" || this.context.variant === "hiwonder-dev-hexa") ? [
                    {
                    opcode: "k230_get_robot_runAction_params",
                    blockType: "reporter",
                    disableMonitor: true,
                    text: this.context.t("block.k230_get_robot_runAction_params"),
                    blockIconURI: this.context.asset('assets/k230.svg'),
                    arguments: {
                        RESULT: {
                            type: "string",
                            defaultValue: " "
                        },
                        VALUE: {
                            type: "string",
                            defaultValue: "num",
                            menu: "robot_runAction_params",
                            literal: true
                        }
                    }
                } satisfies ExtensionBlock
                ] : []),
                ...((this.context.variant === "hiwonder-dev-mecanum") ? [
                    {
                    opcode: "k230_motor_speed_params",
                    blockType: "reporter",
                    disableMonitor: true,
                    text: this.context.t("block.k230_motor_speed_params"),
                    blockIconURI: this.context.asset('assets/k230.svg'),
                    arguments: {
                        RESULT: {
                            type: "string",
                            defaultValue: " "
                        },
                        VALUE: {
                            type: "string",
                            defaultValue: "right_back",
                            menu: "motor_speed_params",
                            literal: true
                        }
                    }
                } satisfies ExtensionBlock
                ] : []),
                ...((this.context.variant === "hiwonder-dev-mecanum") ? [
                    {
                    opcode: "k230_get_move_distance_params",
                    blockType: "reporter",
                    disableMonitor: true,
                    text: this.context.t("block.k230_get_move_distance_params"),
                    blockIconURI: this.context.asset('assets/k230.svg'),
                    arguments: {
                        RESULT: {
                            type: "string",
                            defaultValue: " "
                        },
                        VALUE: {
                            type: "string",
                            defaultValue: "distance_cm",
                            menu: "move_distance_params",
                            literal: true
                        }
                    }
                } satisfies ExtensionBlock
                ] : []),
                {
                    opcode: "k230_get_arm_move_to_yz_params",
                    blockType: "reporter",
                    disableMonitor: true,
                    text: this.context.t("block.k230_get_arm_move_to_yz_params"),
                    blockIconURI: this.context.asset('assets/k230.svg'),
                    arguments: {
                        RESULT: {
                            type: "string",
                            defaultValue: " "
                        },
                        VALUE: {
                            type: "string",
                            defaultValue: "y",
                            menu: this.context.variant === "hiwonder-dev-mecanum" ? "arm_move_to_yz_params2" : "arm_move_to_yz_params",
                            literal: true
                        }
                    }
                },
                {
                    subCategory: this.context.t(product.name) + ' · ' + this.context.t('group.face'),
                    toolboxCategoryId: 'sensor__k230-vision__face',
                    toolboxParentId: 'sensor__k230-vision',
                    toolboxSubcategoryLabel: this.context.t('group.face')
                },
                {
                    opcode: "k230_face_detected",
                    blockType: "Boolean",
                    disableMonitor: true,
                    text: this.context.t("block.k230_face_detected"),
                    blockIconURI: this.context.asset('assets/k230.svg'),
                    arguments: {

                    }
                },
                {
                    opcode: "k230_face_count",
                    blockType: "reporter",
                    disableMonitor: true,
                    text: this.context.t("block.k230_face_count"),
                    blockIconURI: this.context.asset('assets/k230.svg'),
                    arguments: {

                    }
                },
                {
                    opcode: "k230_face_exists",
                    blockType: "Boolean",
                    disableMonitor: true,
                    text: this.context.t("block.k230_face_exists"),
                    blockIconURI: this.context.asset('assets/k230.svg'),
                    arguments: {
                        VALUE: {
                            type: "string",
                            defaultValue: " "
                        }
                    }
                },
                {
                    opcode: "k230_face_recognition_get_arg_by_name",
                    blockType: "reporter",
                    disableMonitor: true,
                    text: this.context.t("block.k230_face_recognition_get_arg_by_name"),
                    blockIconURI: this.context.asset('assets/k230.svg'),
                    arguments: {
                        VALUE: {
                            type: "string",
                            defaultValue: " "
                        },
                        POS: {
                            type: "string",
                            defaultValue: "1",
                            menu: "face_args2",
                            literal: true
                        }
                    }
                },
                {
                    subCategory: this.context.t(product.name) + ' · ' + this.context.t('group.face-pose'),
                    toolboxCategoryId: 'sensor__k230-vision__face-pose',
                    toolboxParentId: 'sensor__k230-vision',
                    toolboxSubcategoryLabel: this.context.t('group.face-pose')
                },
                {
                    opcode: "k230_face2_detected",
                    blockType: "Boolean",
                    disableMonitor: true,
                    text: this.context.t("block.k230_face2_detected"),
                    blockIconURI: this.context.asset('assets/k230.svg'),
                    arguments: {

                    }
                },
                {
                    opcode: "k230_face2_count",
                    blockType: "reporter",
                    disableMonitor: true,
                    text: this.context.t("block.k230_face2_count"),
                    blockIconURI: this.context.asset('assets/k230.svg'),
                    arguments: {

                    }
                },
                {
                    opcode: "k230_result_face_pose_get_oriention",
                    blockType: "Boolean",
                    disableMonitor: true,
                    text: this.context.t("block.k230_result_face_pose_get_oriention"),
                    blockIconURI: this.context.asset('assets/k230.svg'),
                    arguments: {
                        ORIENTION: {
                            type: "string",
                            defaultValue: "Forward",
                            menu: "face_pos_oriention",
                            literal: true
                        }
                    }
                },
                {
                    opcode: "k230_face2_near_center",
                    blockType: "reporter",
                    disableMonitor: true,
                    text: this.context.t("block.k230_face2_near_center"),
                    blockIconURI: this.context.asset('assets/k230.svg'),
                    arguments: {
                        VALUE: {
                            type: "string",
                            defaultValue: "0",
                            menu: "face2_args",
                            literal: true
                        }
                    }
                },
                {
                    subCategory: this.context.t(product.name) + ' · ' + this.context.t('group.expression'),
                    toolboxCategoryId: 'sensor__k230-vision__expression',
                    toolboxParentId: 'sensor__k230-vision',
                    toolboxSubcategoryLabel: this.context.t('group.expression')
                },
                {
                    opcode: "k230_face3_detected",
                    blockType: "Boolean",
                    disableMonitor: true,
                    text: this.context.t("block.k230_face3_detected"),
                    blockIconURI: this.context.asset('assets/k230.svg'),
                    arguments: {

                    }
                },
                {
                    opcode: "k230_face3_count",
                    blockType: "reporter",
                    disableMonitor: true,
                    text: this.context.t("block.k230_face3_count"),
                    blockIconURI: this.context.asset('assets/k230.svg'),
                    arguments: {

                    }
                },
                {
                    opcode: "k230_facial_detect",
                    blockType: "Boolean",
                    disableMonitor: true,
                    text: this.context.t("block.k230_facial_detect"),
                    blockIconURI: this.context.asset('assets/k230.svg'),
                    arguments: {
                        VALUE: {
                            type: "string",
                            defaultValue: "Happiness",
                            menu: "facial_result",
                            literal: true
                        }
                    }
                },
                {
                    opcode: "k230_get_facial_args",
                    blockType: "reporter",
                    disableMonitor: true,
                    text: this.context.t("block.k230_get_facial_args"),
                    blockIconURI: this.context.asset('assets/k230.svg'),
                    arguments: {
                        POS: {
                            type: "string",
                            defaultValue: "0",
                            menu: "face_args",
                            literal: true
                        }
                    }
                },
                {
                    subCategory: this.context.t(product.name) + ' · ' + this.context.t('group.gaze'),
                    toolboxCategoryId: 'sensor__k230-vision__gaze',
                    toolboxParentId: 'sensor__k230-vision',
                    toolboxSubcategoryLabel: this.context.t('group.gaze')
                },
                {
                    opcode: "k230_gaze_detected",
                    blockType: "Boolean",
                    disableMonitor: true,
                    text: this.context.t("block.k230_gaze_detected"),
                    blockIconURI: this.context.asset('assets/k230.svg'),
                    arguments: {

                    }
                },
                {
                    opcode: "k230_gaze_count",
                    blockType: "reporter",
                    disableMonitor: true,
                    text: this.context.t("block.k230_gaze_count"),
                    blockIconURI: this.context.asset('assets/k230.svg'),
                    arguments: {

                    }
                },
                {
                    opcode: "k230_gaze_near_center_result",
                    blockType: "Boolean",
                    disableMonitor: true,
                    text: this.context.t("block.k230_gaze_near_center_result"),
                    blockIconURI: this.context.asset('assets/k230.svg'),
                    arguments: {
                        NAME: {
                            type: "string",
                            defaultValue: "Up",
                            menu: "gaze_name",
                            literal: true
                        }
                    }
                },
                {
                    opcode: "k230_gaze_near_center",
                    blockType: "reporter",
                    disableMonitor: true,
                    text: this.context.t("block.k230_gaze_near_center"),
                    blockIconURI: this.context.asset('assets/k230.svg'),
                    arguments: {
                        VALUE: {
                            type: "string",
                            defaultValue: "0",
                            menu: "gaze_result",
                            literal: true
                        }
                    }
                },
                {
                    subCategory: this.context.t(product.name) + ' · ' + this.context.t('group.person'),
                    toolboxCategoryId: 'sensor__k230-vision__person',
                    toolboxParentId: 'sensor__k230-vision',
                    toolboxSubcategoryLabel: this.context.t('group.person')
                },
                {
                    opcode: "k230_person_detected",
                    blockType: "Boolean",
                    disableMonitor: true,
                    text: this.context.t("block.k230_person_detected"),
                    blockIconURI: this.context.asset('assets/k230.svg'),
                    arguments: {

                    }
                },
                {
                    opcode: "k230_person_count",
                    blockType: "reporter",
                    disableMonitor: true,
                    text: this.context.t("block.k230_person_count"),
                    blockIconURI: this.context.asset('assets/k230.svg'),
                    arguments: {

                    }
                },
                {
                    opcode: "k230_person_near_center",
                    blockType: "reporter",
                    disableMonitor: true,
                    text: this.context.t("block.k230_person_near_center"),
                    blockIconURI: this.context.asset('assets/k230.svg'),
                    arguments: {
                        VALUE: {
                            type: "string",
                            defaultValue: "x",
                            menu: "axis_result",
                            literal: true
                        }
                    }
                },
                {
                    subCategory: this.context.t(product.name) + ' · ' + this.context.t('group.person-points'),
                    toolboxCategoryId: 'sensor__k230-vision__person-points',
                    toolboxParentId: 'sensor__k230-vision',
                    toolboxSubcategoryLabel: this.context.t('group.person-points')
                },
                {
                    opcode: "k230_person_point_detected",
                    blockType: "Boolean",
                    disableMonitor: true,
                    text: this.context.t("block.k230_person_point_detected"),
                    blockIconURI: this.context.asset('assets/k230.svg'),
                    arguments: {

                    }
                },
                {
                    opcode: "k230_person2_count",
                    blockType: "reporter",
                    disableMonitor: true,
                    text: this.context.t("block.k230_person2_count"),
                    blockIconURI: this.context.asset('assets/k230.svg'),
                    arguments: {

                    }
                },
                {
                    opcode: "k230_person_keypoint_detect_name",
                    blockType: "Boolean",
                    disableMonitor: true,
                    text: this.context.t("block.k230_person_keypoint_detect_name"),
                    blockIconURI: this.context.asset('assets/k230.svg'),
                    arguments: {
                        NAME: {
                            type: "string",
                            defaultValue: " "
                        }
                    }
                },
                {
                    opcode: "k230_result_person_keypoint_get_arg",
                    blockType: "reporter",
                    disableMonitor: true,
                    text: this.context.t("block.k230_result_person_keypoint_get_arg"),
                    blockIconURI: this.context.asset('assets/k230.svg'),
                    arguments: {
                        NAME: {
                            type: "string",
                            defaultValue: " "
                        },
                        POS: {
                            type: "string",
                            defaultValue: "id",
                            menu: "person_keypoint_detect",
                            literal: true
                        }
                    }
                },
                {
                    opcode: "k230_person_keypoint_near_center",
                    blockType: "reporter",
                    disableMonitor: true,
                    text: this.context.t("block.k230_person_keypoint_near_center"),
                    blockIconURI: this.context.asset('assets/k230.svg'),
                    arguments: {
                        POS: {
                            type: "string",
                            defaultValue: "id",
                            menu: "person_keypoint_detect",
                            literal: true
                        }
                    }
                },
                {
                    subCategory: this.context.t(product.name) + ' · ' + this.context.t('group.hand'),
                    toolboxCategoryId: 'sensor__k230-vision__hand',
                    toolboxParentId: 'sensor__k230-vision',
                    toolboxSubcategoryLabel: this.context.t('group.hand')
                },
                {
                    opcode: "k230_hand_detected",
                    blockType: "Boolean",
                    disableMonitor: true,
                    text: this.context.t("block.k230_hand_detected"),
                    blockIconURI: this.context.asset('assets/k230.svg'),
                    arguments: {

                    }
                },
                {
                    opcode: "k230_hand_count",
                    blockType: "reporter",
                    disableMonitor: true,
                    text: this.context.t("block.k230_hand_count"),
                    blockIconURI: this.context.asset('assets/k230.svg'),
                    arguments: {

                    }
                },
                {
                    opcode: "k230_hand_detected_posture",
                    blockType: "Boolean",
                    disableMonitor: true,
                    text: this.context.t("block.k230_hand_detected_posture"),
                    blockIconURI: this.context.asset('assets/k230.svg'),
                    arguments: {
                        NAME: {
                            type: "string",
                            defaultValue: " "
                        }
                    }
                },
                {
                    opcode: "k230_result_hand_keypoint_get_arg",
                    blockType: "reporter",
                    disableMonitor: true,
                    text: this.context.t("block.k230_result_hand_keypoint_get_arg"),
                    blockIconURI: this.context.asset('assets/k230.svg'),
                    arguments: {
                        NAME: {
                            type: "string",
                            defaultValue: " "
                        },
                        POS: {
                            type: "string",
                            defaultValue: "id",
                            menu: "hand_menu",
                            literal: true
                        }
                    }
                },
                {
                    opcode: "k230_hand_near_center",
                    blockType: "reporter",
                    disableMonitor: true,
                    text: this.context.t("block.k230_hand_near_center"),
                    blockIconURI: this.context.asset('assets/k230.svg'),
                    arguments: {
                        VALUE: {
                            type: "string",
                            defaultValue: "id",
                            menu: "hand_menu",
                            literal: true
                        }
                    }
                },
                {
                    subCategory: this.context.t(product.name) + ' · ' + this.context.t('group.gesture'),
                    toolboxCategoryId: 'sensor__k230-vision__gesture',
                    toolboxParentId: 'sensor__k230-vision',
                    toolboxSubcategoryLabel: this.context.t('group.gesture')
                },
                {
                    opcode: "k230_gesture_detected",
                    blockType: "Boolean",
                    disableMonitor: true,
                    text: this.context.t("block.k230_gesture_detected"),
                    blockIconURI: this.context.asset('assets/k230.svg'),
                    arguments: {

                    }
                },
                {
                    opcode: "k230_gesture_count",
                    blockType: "reporter",
                    disableMonitor: true,
                    text: this.context.t("block.k230_gesture_count"),
                    blockIconURI: this.context.asset('assets/k230.svg'),
                    arguments: {

                    }
                },
                {
                    opcode: "k230_result_hand_gesture_get_arg",
                    blockType: "Boolean",
                    disableMonitor: true,
                    text: this.context.t("block.k230_result_hand_gesture_get_arg"),
                    blockIconURI: this.context.asset('assets/k230.svg'),
                    arguments: {
                        VALUE: {
                            type: "string",
                            defaultValue: "ok",
                            menu: "hand_gesture",
                            literal: true
                        }
                    }
                },
                {
                    opcode: "k230_result_hand_gesture_get_pos_arg_by_name",
                    blockType: "reporter",
                    disableMonitor: true,
                    text: this.context.t("block.k230_result_hand_gesture_get_pos_arg_by_name"),
                    blockIconURI: this.context.asset('assets/k230.svg'),
                    arguments: {
                        NAME: {
                            type: "string",
                            defaultValue: "ok",
                            menu: "hand_gesture",
                            literal: true
                        },
                        POS: {
                            type: "string",
                            defaultValue: "x",
                            menu: "axis_result",
                            literal: true
                        }
                    }
                },
                {
                    opcode: "k230_result_hand_gesture_get_pos_arg",
                    blockType: "reporter",
                    disableMonitor: true,
                    text: this.context.t("block.k230_result_hand_gesture_get_pos_arg"),
                    blockIconURI: this.context.asset('assets/k230.svg'),
                    arguments: {
                        POS: {
                            type: "string",
                            defaultValue: "0",
                            menu: "face_args3",
                            literal: true
                        }
                    }
                },
                {
                    subCategory: this.context.t(product.name) + ' · ' + this.context.t('group.fall'),
                    toolboxCategoryId: 'sensor__k230-vision__fall',
                    toolboxParentId: 'sensor__k230-vision',
                    toolboxSubcategoryLabel: this.context.t('group.fall')
                },
                {
                    opcode: "k230_fall_detected",
                    blockType: "Boolean",
                    disableMonitor: true,
                    text: this.context.t("block.k230_fall_detected"),
                    blockIconURI: this.context.asset('assets/k230.svg'),
                    arguments: {

                    }
                },
                {
                    opcode: "k230_fall_count",
                    blockType: "reporter",
                    disableMonitor: true,
                    text: this.context.t("block.k230_fall_count"),
                    blockIconURI: this.context.asset('assets/k230.svg'),
                    arguments: {

                    }
                },
                {
                    opcode: "k230_fall_near_center_result",
                    blockType: "Boolean",
                    disableMonitor: true,
                    text: this.context.t("block.k230_fall_near_center_result"),
                    blockIconURI: this.context.asset('assets/k230.svg'),
                    arguments: {

                    }
                },
                {
                    opcode: "k230_fall_near_center",
                    blockType: "reporter",
                    disableMonitor: true,
                    text: this.context.t("block.k230_fall_near_center"),
                    blockIconURI: this.context.asset('assets/k230.svg'),
                    arguments: {
                        VALUE: {
                            type: "string",
                            defaultValue: "1",
                            menu: "face_args2",
                            literal: true
                        }
                    }
                },
                {
                    subCategory: this.context.t(product.name) + ' · ' + this.context.t('group.target'),
                    toolboxCategoryId: 'sensor__k230-vision__target',
                    toolboxParentId: 'sensor__k230-vision',
                    toolboxSubcategoryLabel: this.context.t('group.target')
                },
                {
                    opcode: "k230_target_detected",
                    blockType: "Boolean",
                    disableMonitor: true,
                    text: this.context.t("block.k230_target_detected"),
                    blockIconURI: this.context.asset('assets/k230.svg'),
                    arguments: {

                    }
                },
                {
                    opcode: "k230_target_near_center",
                    blockType: "reporter",
                    disableMonitor: true,
                    text: this.context.t("block.k230_target_near_center"),
                    blockIconURI: this.context.asset('assets/k230.svg'),
                    arguments: {
                        VALUE: {
                            type: "string",
                            defaultValue: "x",
                            menu: "axis_result",
                            literal: true
                        }
                    }
                },
                {
                    subCategory: this.context.t(product.name) + ' · ' + this.context.t('group.dynamic-gesture'),
                    toolboxCategoryId: 'sensor__k230-vision__dynamic-gesture',
                    toolboxParentId: 'sensor__k230-vision',
                    toolboxSubcategoryLabel: this.context.t('group.dynamic-gesture')
                },
                {
                    opcode: "k230_dynamic_gesture_detected",
                    blockType: "Boolean",
                    disableMonitor: true,
                    text: this.context.t("block.k230_dynamic_gesture_detected"),
                    blockIconURI: this.context.asset('assets/k230.svg'),
                    arguments: {

                    }
                },
                {
                    opcode: "k230_result_dynamic_gesture_get_arg",
                    blockType: "Boolean",
                    disableMonitor: true,
                    text: this.context.t("block.k230_result_dynamic_gesture_get_arg"),
                    blockIconURI: this.context.asset('assets/k230.svg'),
                    arguments: {
                        GESTURE: {
                            type: "string",
                            defaultValue: " "
                        }
                    }
                },
                {
                    subCategory: this.context.t(product.name) + ' · ' + this.context.t('group.self-learn'),
                    toolboxCategoryId: 'sensor__k230-vision__self-learn',
                    toolboxParentId: 'sensor__k230-vision',
                    toolboxSubcategoryLabel: this.context.t('group.self-learn')
                },
                {
                    opcode: "k230_result_self_learn_get_arg",
                    blockType: "Boolean",
                    disableMonitor: true,
                    text: this.context.t("block.k230_result_self_learn_get_arg"),
                    blockIconURI: this.context.asset('assets/k230.svg'),
                    arguments: {
                        NAME: {
                            type: "string",
                            defaultValue: " "
                        }
                    }
                },
                {
                    opcode: "k230_result_self_learn_get_pos_arg",
                    blockType: "reporter",
                    disableMonitor: true,
                    text: this.context.t("block.k230_result_self_learn_get_pos_arg"),
                    blockIconURI: this.context.asset('assets/k230.svg'),
                    arguments: {
                        NAME: {
                            type: "string",
                            defaultValue: " "
                        },
                        POS: {
                            type: "string",
                            defaultValue: "1",
                            menu: "face_args2",
                            literal: true
                        }
                    }
                },
                {
                    subCategory: this.context.t(product.name) + ' · ' + this.context.t('group.single-color'),
                    toolboxCategoryId: 'sensor__k230-vision__single-color',
                    toolboxParentId: 'sensor__k230-vision',
                    toolboxSubcategoryLabel: this.context.t('group.single-color')
                },
                {
                    opcode: "k230_set_single_color",
                    blockType: "command",
                    text: this.context.t("block.k230_set_single_color"),
                    blockIconURI: this.context.asset('assets/k230.svg'),
                    arguments: {
                        COLOR: {
                            type: "string",
                            defaultValue: "red",
                            menu: "color_li",
                            literal: true
                        }
                    }
                },
                {
                    opcode: "k230_set_single_color_arg",
                    blockType: "command",
                    text: this.context.t("block.k230_set_single_color_arg"),
                    blockIconURI: this.context.asset('assets/k230.svg'),
                    arguments: {
                        COLOR: {
                            type: "string",
                            defaultValue: " "
                        }
                    }
                },
                {
                    opcode: "k230_single_color_detected",
                    blockType: "Boolean",
                    disableMonitor: true,
                    text: this.context.t("block.k230_single_color_detected"),
                    blockIconURI: this.context.asset('assets/k230.svg'),
                    arguments: {

                    }
                },
                {
                    opcode: "k230_result_single_color_get_pos_arg",
                    blockType: "reporter",
                    disableMonitor: true,
                    text: this.context.t("block.k230_result_single_color_get_pos_arg"),
                    blockIconURI: this.context.asset('assets/k230.svg'),
                    arguments: {
                        POS: {
                            type: "string",
                            defaultValue: "color",
                            menu: "color_angle_axis_result",
                            literal: true
                        }
                    }
                },
                {
                    subCategory: this.context.t(product.name) + ' · ' + this.context.t('group.multi-color'),
                    toolboxCategoryId: 'sensor__k230-vision__multi-color',
                    toolboxParentId: 'sensor__k230-vision',
                    toolboxSubcategoryLabel: this.context.t('group.multi-color')
                },
                {
                    opcode: "k230_set_multi_color_arg",
                    blockType: "command",
                    text: this.context.t("block.k230_set_multi_color_arg"),
                    blockIconURI: this.context.asset('assets/k230.svg'),
                    arguments: {
                        COLOR: {
                            type: "string",
                            defaultValue: " "
                        }
                    }
                },
                {
                    opcode: "k230_color_detected",
                    blockType: "Boolean",
                    disableMonitor: true,
                    text: this.context.t("block.k230_color_detected"),
                    blockIconURI: this.context.asset('assets/k230.svg'),
                    arguments: {

                    }
                },
                {
                    opcode: "k230_color_count",
                    blockType: "reporter",
                    disableMonitor: true,
                    text: this.context.t("block.k230_color_count"),
                    blockIconURI: this.context.asset('assets/k230.svg'),
                    arguments: {

                    }
                },
                {
                    opcode: "k230_color_near_center_name",
                    blockType: "Boolean",
                    disableMonitor: true,
                    text: this.context.t("block.k230_color_near_center_name"),
                    blockIconURI: this.context.asset('assets/k230.svg'),
                    arguments: {
                        NAME: {
                            type: "string",
                            defaultValue: " "
                        }
                    }
                },
                {
                    opcode: "k230_color_near_center",
                    blockType: "reporter",
                    disableMonitor: true,
                    text: this.context.t("block.k230_color_near_center"),
                    blockIconURI: this.context.asset('assets/k230.svg'),
                    arguments: {
                        VALUE: {
                            type: "string",
                            defaultValue: "color",
                            menu: "color_angle_axis_result",
                            literal: true
                        }
                    }
                },
                {
                    opcode: "k230_result_multi_color_get_pos_arg",
                    blockType: "reporter",
                    disableMonitor: true,
                    text: this.context.t("block.k230_result_multi_color_get_pos_arg"),
                    blockIconURI: this.context.asset('assets/k230.svg'),
                    arguments: {
                        NAME: {
                            type: "string",
                            defaultValue: " "
                        },
                        POS: {
                            type: "string",
                            defaultValue: "color",
                            menu: "color_angle_axis_result",
                            literal: true
                        }
                    }
                },
                {
                    subCategory: this.context.t(product.name) + ' · ' + this.context.t('group.line'),
                    toolboxCategoryId: 'sensor__k230-vision__line',
                    toolboxParentId: 'sensor__k230-vision',
                    toolboxSubcategoryLabel: this.context.t('group.line')
                },
                {
                    opcode: "k230_set_line_color",
                    blockType: "command",
                    text: this.context.t("block.k230_set_line_color"),
                    blockIconURI: this.context.asset('assets/k230.svg'),
                    arguments: {
                        COLOR: {
                            type: "string",
                            defaultValue: "red",
                            menu: "color_li",
                            literal: true
                        }
                    }
                },
                {
                    opcode: "k230_set_line_color_arg",
                    blockType: "command",
                    text: this.context.t("block.k230_set_line_color_arg"),
                    blockIconURI: this.context.asset('assets/k230.svg'),
                    arguments: {
                        COLOR: {
                            type: "string",
                            defaultValue: " "
                        }
                    }
                },
                {
                    opcode: "k230_line_detected",
                    blockType: "Boolean",
                    disableMonitor: true,
                    text: this.context.t("block.k230_line_detected"),
                    blockIconURI: this.context.asset('assets/k230.svg'),
                    arguments: {

                    }
                },
                {
                    opcode: "k230_result_line_detect_get_arg",
                    blockType: "reporter",
                    disableMonitor: true,
                    text: this.context.t("block.k230_result_line_detect_get_arg"),
                    blockIconURI: this.context.asset('assets/k230.svg'),
                    arguments: {
                        VALUE: {
                            type: "string",
                            defaultValue: "center_pos",
                            menu: "line_result",
                            literal: true
                        }
                    }
                },
                {
                    subCategory: this.context.t(product.name) + ' · ' + this.context.t('group.ocr'),
                    toolboxCategoryId: 'sensor__k230-vision__ocr',
                    toolboxParentId: 'sensor__k230-vision',
                    toolboxSubcategoryLabel: this.context.t('group.ocr')
                },
                {
                    opcode: "k230_ocr_detected",
                    blockType: "Boolean",
                    disableMonitor: true,
                    text: this.context.t("block.k230_ocr_detected"),
                    blockIconURI: this.context.asset('assets/k230.svg'),
                    arguments: {

                    }
                },
                {
                    opcode: "k230_ocr_count",
                    blockType: "reporter",
                    disableMonitor: true,
                    text: this.context.t("block.k230_ocr_count"),
                    blockIconURI: this.context.asset('assets/k230.svg'),
                    arguments: {

                    }
                },
                {
                    opcode: "k230_result_ocr_get_arg",
                    blockType: "reporter",
                    disableMonitor: true,
                    text: this.context.t("block.k230_result_ocr_get_arg"),
                    blockIconURI: this.context.asset('assets/k230.svg'),
                    arguments: {

                    }
                },
                {
                    opcode: "k230_result_ocr_get_pos_arg",
                    blockType: "reporter",
                    disableMonitor: true,
                    text: this.context.t("block.k230_result_ocr_get_pos_arg"),
                    blockIconURI: this.context.asset('assets/k230.svg'),
                    arguments: {
                        POINT: {
                            type: "string",
                            defaultValue: "0",
                            menu: "ocr_point",
                            literal: true
                        }
                    }
                },
                {
                    subCategory: this.context.t(product.name) + ' · ' + this.context.t('group.license-plate'),
                    toolboxCategoryId: 'sensor__k230-vision__license-plate',
                    toolboxParentId: 'sensor__k230-vision',
                    toolboxSubcategoryLabel: this.context.t('group.license-plate')
                },
                {
                    opcode: "k230_license_plate_detected",
                    blockType: "Boolean",
                    disableMonitor: true,
                    text: this.context.t("block.k230_license_plate_detected"),
                    blockIconURI: this.context.asset('assets/k230.svg'),
                    arguments: {

                    }
                },
                {
                    opcode: "k230_license_plate_count",
                    blockType: "reporter",
                    disableMonitor: true,
                    text: this.context.t("block.k230_license_plate_count"),
                    blockIconURI: this.context.asset('assets/k230.svg'),
                    arguments: {

                    }
                },
                {
                    opcode: "k230_result_lpr_get_arg",
                    blockType: "reporter",
                    disableMonitor: true,
                    text: this.context.t("block.k230_result_lpr_get_arg"),
                    blockIconURI: this.context.asset('assets/k230.svg'),
                    arguments: {

                    }
                },
                {
                    opcode: "k230_result_lpr_get_pos_arg",
                    blockType: "reporter",
                    disableMonitor: true,
                    text: this.context.t("block.k230_result_lpr_get_pos_arg"),
                    blockIconURI: this.context.asset('assets/k230.svg'),
                    arguments: {
                        POINT: {
                            type: "string",
                            defaultValue: "0",
                            menu: "ocr_point",
                            literal: true
                        }
                    }
                },
                {
                    subCategory: this.context.t(product.name) + ' · ' + this.context.t('group.object-classify'),
                    toolboxCategoryId: 'sensor__k230-vision__object-classify',
                    toolboxParentId: 'sensor__k230-vision',
                    toolboxSubcategoryLabel: this.context.t('group.object-classify')
                },
                {
                    opcode: "k230_object_detected",
                    blockType: "Boolean",
                    disableMonitor: true,
                    text: this.context.t("block.k230_object_detected"),
                    blockIconURI: this.context.asset('assets/k230.svg'),
                    arguments: {

                    }
                },
                {
                    opcode: "k230_object_count",
                    blockType: "reporter",
                    disableMonitor: true,
                    text: this.context.t("block.k230_object_count"),
                    blockIconURI: this.context.asset('assets/k230.svg'),
                    arguments: {

                    }
                },
                {
                    opcode: "k230_object_classify_parameter",
                    blockType: "reporter",
                    disableMonitor: true,
                    text: this.context.t("block.k230_object_classify_parameter"),
                    blockIconURI: this.context.asset('assets/k230.svg'),
                    arguments: {
                        POS: {
                            type: "string",
                            defaultValue: "0",
                            menu: "obj_menu",
                            literal: true
                        }
                    }
                },
                {
                    subCategory: this.context.t(product.name) + ' · ' + this.context.t('group.object'),
                    toolboxCategoryId: 'sensor__k230-vision__object',
                    toolboxParentId: 'sensor__k230-vision',
                    toolboxSubcategoryLabel: this.context.t('group.object')
                },
                {
                    opcode: "k230_object_named_detected",
                    blockType: "Boolean",
                    disableMonitor: true,
                    text: this.context.t("block.k230_object_named_detected"),
                    blockIconURI: this.context.asset('assets/k230.svg'),
                    arguments: {
                        NAME: {
                            type: "string",
                            defaultValue: "person",
                            menu: "objs",
                            literal: true
                        }
                    }
                },
                {
                    opcode: "k230_object_parameter",
                    blockType: "reporter",
                    disableMonitor: true,
                    text: this.context.t("block.k230_object_parameter"),
                    blockIconURI: this.context.asset('assets/k230.svg'),
                    arguments: {
                        POS: {
                            type: "string",
                            defaultValue: "0",
                            menu: "face_args",
                            literal: true
                        }
                    }
                },
                {
                    subCategory: this.context.t(product.name) + ' · ' + this.context.t('group.trash'),
                    toolboxCategoryId: 'sensor__k230-vision__trash',
                    toolboxParentId: 'sensor__k230-vision',
                    toolboxSubcategoryLabel: this.context.t('group.trash')
                },
                {
                    opcode: "k230_trash_detected",
                    blockType: "Boolean",
                    disableMonitor: true,
                    text: this.context.t("block.k230_trash_detected"),
                    blockIconURI: this.context.asset('assets/k230.svg'),
                    arguments: {

                    }
                },
                {
                    opcode: "k230_trash_count",
                    blockType: "reporter",
                    disableMonitor: true,
                    text: this.context.t("block.k230_trash_count"),
                    blockIconURI: this.context.asset('assets/k230.svg'),
                    arguments: {

                    }
                },
                {
                    opcode: "k230_result_garbage_get_name_arg",
                    blockType: "Boolean",
                    disableMonitor: true,
                    text: this.context.t("block.k230_result_garbage_get_name_arg"),
                    blockIconURI: this.context.asset('assets/k230.svg'),
                    arguments: {
                        VALUE: {
                            type: "string",
                            defaultValue: "BananaPeel",
                            menu: "garbage",
                            literal: true
                        }
                    }
                },
                {
                    opcode: "k230_trash_near_center",
                    blockType: "reporter",
                    disableMonitor: true,
                    text: this.context.t("block.k230_trash_near_center"),
                    blockIconURI: this.context.asset('assets/k230.svg'),
                    arguments: {
                        POS: {
                            type: "string",
                            defaultValue: "0",
                            menu: "name_confidence",
                            literal: true
                        }
                    }
                },
                {
                    opcode: "k230_result_garbage_get_pos_arg",
                    blockType: "reporter",
                    disableMonitor: true,
                    text: this.context.t("block.k230_result_garbage_get_pos_arg"),
                    blockIconURI: this.context.asset('assets/k230.svg'),
                    arguments: {
                        POS: {
                            type: "string",
                            defaultValue: "0",
                            menu: "ocr_point",
                            literal: true
                        }
                    }
                },
                {
                    subCategory: this.context.t(product.name) + ' · ' + this.context.t('group.traffic'),
                    toolboxCategoryId: 'sensor__k230-vision__traffic',
                    toolboxParentId: 'sensor__k230-vision',
                    toolboxSubcategoryLabel: this.context.t('group.traffic')
                },
                {
                    opcode: "k230_traffic_sign_detected",
                    blockType: "Boolean",
                    disableMonitor: true,
                    text: this.context.t("block.k230_traffic_sign_detected"),
                    blockIconURI: this.context.asset('assets/k230.svg'),
                    arguments: {

                    }
                },
                {
                    opcode: "k230_traffic_sign_count",
                    blockType: "reporter",
                    disableMonitor: true,
                    text: this.context.t("block.k230_traffic_sign_count"),
                    blockIconURI: this.context.asset('assets/k230.svg'),
                    arguments: {

                    }
                },
                {
                    opcode: "k230_result_traffic_get_name_arg",
                    blockType: "Boolean",
                    disableMonitor: true,
                    text: this.context.t("block.k230_result_traffic_get_name_arg"),
                    blockIconURI: this.context.asset('assets/k230.svg'),
                    arguments: {
                        NAME: {
                            type: "string",
                            defaultValue: "go",
                            menu: "traffic_sign",
                            literal: true
                        }
                    }
                },
                {
                    opcode: "k230_traffic_sign_near_center",
                    blockType: "reporter",
                    disableMonitor: true,
                    text: this.context.t("block.k230_traffic_sign_near_center"),
                    blockIconURI: this.context.asset('assets/k230.svg'),
                    arguments: {
                        POS: {
                            type: "string",
                            defaultValue: "0",
                            menu: "face_args",
                            literal: true
                        }
                    }
                },
                {
                    subCategory: this.context.t(product.name) + ' · ' + this.context.t('group.apriltag'),
                    toolboxCategoryId: 'sensor__k230-vision__apriltag',
                    toolboxParentId: 'sensor__k230-vision',
                    toolboxSubcategoryLabel: this.context.t('group.apriltag')
                },
                {
                    opcode: "k230_april_tag_detected",
                    blockType: "Boolean",
                    disableMonitor: true,
                    text: this.context.t("block.k230_april_tag_detected"),
                    blockIconURI: this.context.asset('assets/k230.svg'),
                    arguments: {

                    }
                },
                {
                    opcode: "k230_april_tag_count",
                    blockType: "reporter",
                    disableMonitor: true,
                    text: this.context.t("block.k230_april_tag_count"),
                    blockIconURI: this.context.asset('assets/k230.svg'),
                    arguments: {

                    }
                },
                {
                    opcode: "k230_result_apriltag_get_name_arg",
                    blockType: "Boolean",
                    disableMonitor: true,
                    text: this.context.t("block.k230_result_apriltag_get_name_arg"),
                    blockIconURI: this.context.asset('assets/k230.svg'),
                    arguments: {
                        NAME: {
                            type: "string",
                            defaultValue: " "
                        }
                    }
                },
                {
                    opcode: "k230_april_tag_near_center",
                    blockType: "reporter",
                    disableMonitor: true,
                    text: this.context.t("block.k230_april_tag_near_center"),
                    blockIconURI: this.context.asset('assets/k230.svg'),
                    arguments: {
                        POS: {
                            type: "string",
                            defaultValue: "0",
                            menu: "name_confidence",
                            literal: true
                        }
                    }
                },
                {
                    opcode: "k230_result_apriltag_get_pos_arg",
                    blockType: "reporter",
                    disableMonitor: true,
                    text: this.context.t("block.k230_result_apriltag_get_pos_arg"),
                    blockIconURI: this.context.asset('assets/k230.svg'),
                    arguments: {
                        POS: {
                            type: "string",
                            defaultValue: "0",
                            menu: "ocr_point",
                            literal: true
                        }
                    }
                },
                {
                    subCategory: this.context.t(product.name) + ' · ' + this.context.t('group.dm-code'),
                    toolboxCategoryId: 'sensor__k230-vision__dm-code',
                    toolboxParentId: 'sensor__k230-vision',
                    toolboxSubcategoryLabel: this.context.t('group.dm-code')
                },
                {
                    opcode: "k230_dm_code_detected",
                    blockType: "Boolean",
                    disableMonitor: true,
                    text: this.context.t("block.k230_dm_code_detected"),
                    blockIconURI: this.context.asset('assets/k230.svg'),
                    arguments: {

                    }
                },
                {
                    opcode: "k230_dm_code_count",
                    blockType: "reporter",
                    disableMonitor: true,
                    text: this.context.t("block.k230_dm_code_count"),
                    blockIconURI: this.context.asset('assets/k230.svg'),
                    arguments: {

                    }
                },
                {
                    opcode: "k230_result_dmcode_get_name_arg",
                    blockType: "Boolean",
                    disableMonitor: true,
                    text: this.context.t("block.k230_result_dmcode_get_name_arg"),
                    blockIconURI: this.context.asset('assets/k230.svg'),
                    arguments: {
                        NAME: {
                            type: "string",
                            defaultValue: " "
                        }
                    }
                },
                {
                    opcode: "k230_dm_code_near_center",
                    blockType: "reporter",
                    disableMonitor: true,
                    text: this.context.t("block.k230_dm_code_near_center"),
                    blockIconURI: this.context.asset('assets/k230.svg'),
                    arguments: {

                    }
                },
                {
                    opcode: "k230_result_dmcode_get_pos_arg",
                    blockType: "reporter",
                    disableMonitor: true,
                    text: this.context.t("block.k230_result_dmcode_get_pos_arg"),
                    blockIconURI: this.context.asset('assets/k230.svg'),
                    arguments: {
                        POS: {
                            type: "string",
                            defaultValue: "0",
                            menu: "ocr_point",
                            literal: true
                        }
                    }
                },
                {
                    subCategory: this.context.t(product.name) + ' · ' + this.context.t('group.qr-code'),
                    toolboxCategoryId: 'sensor__k230-vision__qr-code',
                    toolboxParentId: 'sensor__k230-vision',
                    toolboxSubcategoryLabel: this.context.t('group.qr-code')
                },
                {
                    opcode: "k230_qr_code_detected",
                    blockType: "Boolean",
                    disableMonitor: true,
                    text: this.context.t("block.k230_qr_code_detected"),
                    blockIconURI: this.context.asset('assets/k230.svg'),
                    arguments: {

                    }
                },
                {
                    opcode: "k230_qr_code_count",
                    blockType: "reporter",
                    disableMonitor: true,
                    text: this.context.t("block.k230_qr_code_count"),
                    blockIconURI: this.context.asset('assets/k230.svg'),
                    arguments: {

                    }
                },
                {
                    opcode: "k230_result_orcode_get_arg",
                    blockType: "Boolean",
                    disableMonitor: true,
                    text: this.context.t("block.k230_result_orcode_get_arg"),
                    blockIconURI: this.context.asset('assets/k230.svg'),
                    arguments: {
                        NAME: {
                            type: "string",
                            defaultValue: " "
                        }
                    }
                },
                {
                    opcode: "k230_qr_code_near_center",
                    blockType: "reporter",
                    disableMonitor: true,
                    text: this.context.t("block.k230_qr_code_near_center"),
                    blockIconURI: this.context.asset('assets/k230.svg'),
                    arguments: {

                    }
                },
                {
                    opcode: "k230_result_orcode_get_pos_arg",
                    blockType: "reporter",
                    disableMonitor: true,
                    text: this.context.t("block.k230_result_orcode_get_pos_arg"),
                    blockIconURI: this.context.asset('assets/k230.svg'),
                    arguments: {
                        POS: {
                            type: "string",
                            defaultValue: "x",
                            menu: "axis_result",
                            literal: true
                        }
                    }
                },
                {
                    subCategory: this.context.t(product.name) + ' · ' + this.context.t('group.barcode'),
                    toolboxCategoryId: 'sensor__k230-vision__barcode',
                    toolboxParentId: 'sensor__k230-vision',
                    toolboxSubcategoryLabel: this.context.t('group.barcode')
                },
                {
                    opcode: "k230_barcode_detected",
                    blockType: "Boolean",
                    disableMonitor: true,
                    text: this.context.t("block.k230_barcode_detected"),
                    blockIconURI: this.context.asset('assets/k230.svg'),
                    arguments: {

                    }
                },
                {
                    opcode: "k230_barcode_count",
                    blockType: "reporter",
                    disableMonitor: true,
                    text: this.context.t("block.k230_barcode_count"),
                    blockIconURI: this.context.asset('assets/k230.svg'),
                    arguments: {

                    }
                },
                {
                    opcode: "k230_result_barcode_get_arg",
                    blockType: "Boolean",
                    disableMonitor: true,
                    text: this.context.t("block.k230_result_barcode_get_arg"),
                    blockIconURI: this.context.asset('assets/k230.svg'),
                    arguments: {
                        NAME: {
                            type: "string",
                            defaultValue: " "
                        }
                    }
                },
                {
                    opcode: "k230_barcode_near_center",
                    blockType: "reporter",
                    disableMonitor: true,
                    text: this.context.t("block.k230_barcode_near_center"),
                    blockIconURI: this.context.asset('assets/k230.svg'),
                    arguments: {

                    }
                },
                {
                    opcode: "k230_result_barcode_get_pos_arg",
                    blockType: "reporter",
                    disableMonitor: true,
                    text: this.context.t("block.k230_result_barcode_get_pos_arg"),
                    blockIconURI: this.context.asset('assets/k230.svg'),
                    arguments: {
                        POS: {
                            type: "string",
                            defaultValue: "x",
                            menu: "axis_result",
                            literal: true
                        }
                    }
                }
        ];
        const usedMenus = new Set(blocks.flatMap(block => 'opcode' in block ?
            Object.values(block.arguments || {}).flatMap(argument => argument.menu ? [argument.menu] : []) : []));
        return {
            id: 'sensor',
            name: this.context.t(product.name),
            color1: '#7B68EE',
            color2: '#7B68EE',
            color3: '#7B68EE',
            blocks,
            menus: Object.fromEntries(Object.entries(menus).filter(([name]) => usedMenus.has(name)))
        };
    }

    getPython (): Record<string, PythonTemplate> {
        this.checkVariant();
        const templates: Record<string, PythonTemplate> = {
            k230_aimech_init: {
                template: "",
                imports: [
                    "import Hiwonder_DEV"
                ],
                variables: [
                    "k230 = Hiwonder_DEV.DEV_K230(Hiwonder_DEV.Port({PORT}))"
                ]
            },
            k230_set_mode: {
                template: "k230.set_mode({MODE})"
            },
            k230_set_run: {
                template: "k230.set_run_enabled({MODE})"
            },
            k230_set_volumn: {
                template: "k230.set_volumn({VALUE})"
            },
            k230_set_wifi: {
                template: "k230.set_wifi({VALUE1},{VALUE2})"
            },
            k230_update_detect_result: {
                template: "k230.update_result()"
            },
            k230_mcp_action_setting: {
                template: "",
                variables: [
                    "_mcp_k230_run_action={\"type\":\"function\",\"function\":{\"name\":\"run_action\",\"description\":{COMMAND.compactJson},\"parameters\":{\"type\":\"object\",\"properties\":{\"name\":{\"type\":\"string\",\"description\":\"要求执行的动作名称\"}},\"required\":[\"name\"]}},\"block\":{BLOCK}}"
                ]
            },
            k230_mcp_move_setting: {
                template: "",
                variables: [
                    "_mcp_k230_move={\"type\":\"function\",\"function\":{\"name\":\"move\",\"description\":{COMMAND.compactJson},\"parameters\":{\"type\":\"object\",\"properties\":{\"x\":{\"type\":\"string\",\"description\":\"x方向前进的距离, 单位m\"},\"y\":{\"type\":\"string\",\"description\":\"y方向前进的距离,单位m\"}},\"required\":[\"x\",\"y\"]}},\"block\":{BLOCK}}"
                ]
            },
            k230_mcp_setting: {
                template: "",
                variables: [
                    "_mcp_k230_{NAME.identifier}={\"type\":\"function\",\"function\":{\"name\":{NAME.jsonValue},\"description\":{COMMAND.compactJson},\"parameters\":{\"type\":\"object\",\"properties\":{\"params\":{PARAMS.compactJson}}}},\"block\":{BLOCK}}"
                ]
            },
            k230_result_exists: {
                template: "k230.result_available()"
            },
            k230_get_result: {
                template: "k230.result_get()"
            },
            k230_send_mcp_result: {
                template: "k230.send_mcp_result({VALUE})\ntime.sleep(0.05)",
                imports: [
                    "import time"
                ]
            },
            k230_aimecanum_set_mcp_default: {
                template: "",
                variables: [
                    "_mcp_k230_Bat_Battery_power = {\"type\":\"function\",\"function\":{\"name\":\"Bat_Battery_power\",\"description\":\"查询电量时调用，会返回电池电量，单位mV,一般在3100-4200mV之间，电量越低数值越小，低于3400mV请及时充电\",\"parameters\":{\"type\":\"object\",\"properties\":{}}},\"block\":3}",
                    "_mcp_k230_Buzzer_playTone = {\"type\":\"function\",\"function\":{\"name\":\"Buzzer_playTone\",\"description\":\"蜂鸣器鸣响\",\"parameters\":{\"type\":\"object\",\"properties\":{\"freq\":{\"type\":\"integer\",\"description\":\"蜂鸣器频率，范围200-3000Hz,默认为1500Hz\"},\"time_count\":{\"type\":\"integer\",\"description\":\"鸣响时间，单位ms，默认为100ms\"}},\"required\":[\"freq\",\"time_count\"]}},\"block\":3}",
                    "_mcp_k230_RGB_setRGB = {\"type\":\"function\",\"function\":{\"name\":\"RGB_setRGB\",\"description\":\"设置RGB灯时调用，值的范围都是0-255\",\"parameters\":{\"type\":\"object\",\"properties\":{\"red\":{\"type\":\"integer\"},\"green\":{\"type\":\"integer\"},\"blue\":{\"type\":\"integer\"}},\"required\":[\"red\",\"green\",\"blue\"]}},\"block\":3}",
                    "_mcp_k230_mcar_move_distance = {\"type\":\"function\",\"function\":{\"name\":\"mcar_move_distance\",\"description\":\"需要平移运动时调用\",\"parameters\":{\"type\":\"object\",\"properties\":{\"distance_cm\":{\"type\":\"integer\",\"description\":\"运动距离，单位cm，一般不超过200cm，且距离为0时是不动的\"},\"angle_deg\":{\"type\":\"integer\",\"description\":\"平移运动的方向，0度为正前方，左边为正，是逆时针；右边为负，是顺时针\"},\"rpm\":{\"type\":\"integer\",\"description\":\"转动速度，单位rpm，在20-100rpm之间选择\"}},\"required\":[\"distance_cm\",\"angle_deg\",\"rpm\"]}},\"block\":10}",
                    "_mcp_k230_mcar_set_motors_speed = {\"type\":\"function\",\"function\":{\"name\":\"mcar_set_motors_speed\",\"description\":\"设置4个电机的速度，单位rpm，范围在-100到100之间，所有轮子正数为向前旋转，负数为向后旋转。比如边走边左转就可以设置左边2个轮子为40rpm，右边2个为60rpm；以50rpm的速度原地旋转5秒，差不多是一圈\",\"parameters\":{\"type\":\"object\",\"properties\":{\"right_back\":{\"type\":\"integer\",\"description\":\"右后轮电机速度\"},\"right_front\":{\"type\":\"integer\",\"description\":\"右前轮电机速度\"},\"left_back\":{\"type\":\"integer\",\"description\":\"左后轮电机速度\"},\"left_front\":{\"type\":\"integer\",\"description\":\"左前轮电机速度\"},\"time_count\":{\"type\":\"integer\",\"description\":\"持续时间，单位ms，根据运动距离和速度自动计算，通常在500-5000ms，不能超过5000ms，默认为1000ms\"}},\"required\":[\"right_back\",\"right_front\",\"left_back\",\"left_front\",\"time_count\"]}},\"block\":10}",
                    "_mcp_k230_arm_move_to_yz = {\"type\":\"function\",\"function\":{\"name\":\"arm_move_to_yz\",\"description\":\"控制机械臂运动时调用，默认机械臂末端保持水平，默认为move_to_yz(83,83, 600)\",\"parameters\":{\"type\":\"object\",\"properties\":{\"y\":{\"type\":\"integer\",\"description\":\"机械臂末端Y坐标，单位mm，上前越大，向后越小\"},\"z\":{\"type\":\"integer\",\"description\":\"机械臂末端Z坐标，单位mm，往上越大，往下越小\"},\"timeout\":{\"type\":\"integer\",\"description\":\"运动时间，单位ms，根据运动距离和速度自动计算，通常在500-2000ms，不能超过5000ms，默认为1000ms\"}},\"required\":[\"y\",\"z\",\"timeout\"]}},\"block\":10}",
                    "_mcp_k230_arm_claw = {\"type\":\"function\",\"function\":{\"name\":\"arm_claw\",\"description\":\"控制机械臂夹爪的打开和闭合\",\"parameters\":{\"type\":\"object\",\"properties\":{\"angle\":{\"type\":\"integer\",\"description\":\"夹爪的开合角度，范围在500-1000，默认为500闭合，1000完全张开\"},\"time_count\":{\"type\":\"integer\",\"description\":\"运动时间，单位ms，根据运动距离和速度自动计算，通常在100-1000ms，不能超过1000ms，默认为100ms\"}},\"required\":[\"angle\"]}},\"block\":5}",
                    "_mcp_k230_sonar_getDistance = {\"type\":\"function\",\"function\":{\"name\":\"sonar_getDistance\",\"description\":\"超声波测距时调用，返回值为测量到的距离，单位cm，一般在2-400cm之间\",\"parameters\":{\"type\":\"object\",\"properties\":{}}},\"block\":3}",
                    "_mcp_k230_sonar_setRGB = {\"type\":\"function\",\"function\":{\"name\":\"sonar_setRGB\",\"description\":\"设置超声波模块上的RGB灯颜色，参数范围都是0-255\",\"parameters\":{\"type\":\"object\",\"properties\":{\"red\":{\"type\":\"integer\"},\"green\":{\"type\":\"integer\"},\"blue\":{\"type\":\"integer\"}},\"required\":[\"red\",\"green\",\"blue\"]}},\"block\":3}"
                ]
            },
            k230_aiquadruped_set_mcp_default: {
                template: "",
                variables: [
                    "_mcp_k230_Bat_Battery_power = {\"type\":\"function\",\"function\":{\"name\":\"Bat_Battery_power\",\"description\":\"查询电量时调用，会返回电池电量，单位mV,一般在3100-4200mV之间，电量越低数值越小，低于3400mV请及时充电\",\"parameters\":{\"type\":\"object\",\"properties\":{}}},\"block\":3}",
                    "_mcp_k230_Buzzer_playTone = {\"type\":\"function\",\"function\":{\"name\":\"Buzzer_playTone\",\"description\":\"蜂鸣器鸣响\",\"parameters\":{\"type\":\"object\",\"properties\":{\"freq\":{\"type\":\"integer\",\"description\":\"蜂鸣器频率，范围200-3000Hz,默认为1500Hz\"},\"time_count\":{\"type\":\"integer\",\"description\":\"鸣响时间，单位ms，默认为100ms\"}},\"required\":[\"freq\",\"time_count\"]}},\"block\":3}",
                    "_mcp_k230_RGB_setRGB = {\"type\":\"function\",\"function\":{\"name\":\"RGB_setRGB\",\"description\":\"设置RGB灯时调用，值的范围都是0-255\",\"parameters\":{\"type\":\"object\",\"properties\":{\"red\":{\"type\":\"integer\"},\"green\":{\"type\":\"integer\"},\"blue\":{\"type\":\"integer\"}},\"required\":[\"red\",\"green\",\"blue\"]}},\"block\":3}",
                    "_mcp_k230_robot_move = {\"type\":\"function\",\"function\":{\"name\":\"robot_move\",\"description\":\"控制四足底盘运动时调用，控制运动几步\",\"parameters\":{\"type\":\"object\",\"properties\":{\"state\":{\"type\":\"integer\",\"description\":\"运动控制：0-前进，1-后退，2-左平移，3-右平移，4-原地左转，5-原地右转。只能选择这几个值\"},\"steps\":{\"type\":\"integer\",\"description\":\"运动步数，范围[1,127]\"},\"time\":{\"type\":\"integer\",\"description\":\"每一步的运动时间，单位ms，默认为500ms，范围为[500ms,2000ms]\"},\"leg1\":{\"type\":\"integer\",\"description\":\"大腿移动幅度，范围[1,25]，默认为25。数值越大，跨的步子越大\"},\"leg2\":{\"type\":\"integer\",\"description\":\"小腿外翻幅度，范围[1,10]，默认为10。数值越大，小腿外翻的幅度越大\"},\"turn_offset\":{\"type\":\"integer\",\"description\":\"转向偏移，范围[-10,10]，负为左转，正为右转。注意：这个只在前进/后退状态时才会生效\"}},\"required\":[\"state\",\"steps\",\"time\",\"leg1\",\"leg2\",\"turn_offset\"]}},\"block\":10}",
                    "_mcp_k230_2dof_arm_move_to_yz = {\"type\":\"function\",\"function\":{\"name\":\"arm_move_to_yz\",\"description\":\"控制机械臂运动时调用，默认机械臂末端保持水平，默认为arm_move_to_yz(196,82,0,1000)，当机器返回limit时，代表已经到限位了，若返回ok，则已到达位置\",\"parameters\":{\"type\":\"object\",\"properties\":{\"y\":{\"type\":\"integer\",\"description\":\"机械臂末端Y坐标，单位mm，上前越大，向后越小\"},\"z\":{\"type\":\"integer\",\"description\":\"机械臂末端Z坐标，单位mm，往上越大，往下越小\"},\"angle\":{\"type\":\"integer\",\"description\":\"机械臂末端的倾角，0为水平，往下为负\"},\"timeout\":{\"type\":\"integer\",\"description\":\"运动时间，单位ms，根据运动距离和速度自动计算，通常在500-2000ms，不能超过5000ms，默认为1000ms\"}},\"required\":[\"y\",\"z\",\"angle\",\"timeout\"]}},\"block\":10}",
                    "_mcp_k230_arm_claw = {\"type\":\"function\",\"function\":{\"name\":\"arm_claw\",\"description\":\"控制机械臂夹爪的打开和闭合\",\"parameters\":{\"type\":\"object\",\"properties\":{\"angle\":{\"type\":\"integer\",\"description\":\"夹爪的开合角度，范围在500-1000，默认为500闭合，1000完全张开\"},\"time_count\":{\"type\":\"integer\",\"description\":\"运动时间，单位ms，根据运动距离和速度自动计算，通常在100-1000ms，不能超过1000ms，默认为100ms\"}},\"required\":[\"angle\"]}},\"block\":5}",
                    "_mcp_k230_sonar_getDistance = {\"type\":\"function\",\"function\":{\"name\":\"sonar_getDistance\",\"description\":\"超声波测距时调用，返回值为测量到的距离，单位cm，一般在2-400cm之间\",\"parameters\":{\"type\":\"object\",\"properties\":{}}},\"block\":3}",
                    "_mcp_k230_sonar_setRGB = {\"type\":\"function\",\"function\":{\"name\":\"sonar_setRGB\",\"description\":\"设置超声波模块上的RGB灯颜色，参数范围都是0-255\",\"parameters\":{\"type\":\"object\",\"properties\":{\"red\":{\"type\":\"integer\"},\"green\":{\"type\":\"integer\"},\"blue\":{\"type\":\"integer\"}},\"required\":[\"red\",\"green\",\"blue\"]}},\"block\":3}",
                    "_mcp_k230_robot_runAction = {\"type\":\"function\",\"function\":{\"name\":\"robot_runAction\",\"description\":\"控制机器人执行动作，动作组开始执行时就会回复，时长未知，所以只需说动作已执行\",\"parameters\":{\"type\":\"object\",\"properties\":{\"num\":{\"type\":\"string\",\"description\":\"动作编号\"},\"count\":{\"type\":\"integer\",\"description\":\"动作执行的次数，默认为1，最大为10，超过10会被当做10执行\"}},\"required\":[\"num\",\"count\"]}},\"block\":10}"
                ]
            },
            k230_aiquadrupedpro_set_mcp_default: {
                template: "",
                variables: [
                    "_mcp_k230_Bat_Battery_power = {\"type\":\"function\",\"function\":{\"name\":\"Bat_Battery_power\",\"description\":\"查询电量时调用，会返回电池电量，单位mV,一般在3100-4200mV之间，电量越低数值越小，低于3400mV请及时充电\",\"parameters\":{\"type\":\"object\",\"properties\":{}}},\"block\":3}",
                    "_mcp_k230_Buzzer_playTone = {\"type\":\"function\",\"function\":{\"name\":\"Buzzer_playTone\",\"description\":\"蜂鸣器鸣响\",\"parameters\":{\"type\":\"object\",\"properties\":{\"freq\":{\"type\":\"integer\",\"description\":\"蜂鸣器频率，范围200-3000Hz,默认为1500Hz\"},\"time_count\":{\"type\":\"integer\",\"description\":\"鸣响时间，单位ms，默认为100ms\"}},\"required\":[\"freq\",\"time_count\"]}},\"block\":3}",
                    "_mcp_k230_RGB_setRGB = {\"type\":\"function\",\"function\":{\"name\":\"RGB_setRGB\",\"description\":\"设置RGB灯时调用，值的范围都是0-255\",\"parameters\":{\"type\":\"object\",\"properties\":{\"red\":{\"type\":\"integer\"},\"green\":{\"type\":\"integer\"},\"blue\":{\"type\":\"integer\"}},\"required\":[\"red\",\"green\",\"blue\"]}},\"block\":3}",
                    "_mcp_k230_robot_move = {\"type\":\"function\",\"function\":{\"name\":\"robot_move\",\"description\":\"控制四足底盘运动时调用，控制运动几步\",\"parameters\":{\"type\":\"object\",\"properties\":{\"x\":{\"type\":\"integer\",\"description\":\"x轴方向速度，正整数为右平移，负整数为左平移，默认为20，范围[-20,20]\"},\"y\":{\"type\":\"integer\",\"description\":\"y轴方向速度，正整数为前进，负整数为后退，默认为20，范围[-20,20]\"},\"z\":{\"type\":\"integer\",\"description\":\"中心旋转速度，左转逆时针为正，右转顺时针为负，默认为15，范围[-15,15]\"},\"height\":{\"type\":\"integer\",\"description\":\"抬腿高度，单位mm，默认为15\"},\"period\":{\"type\":\"integer\",\"description\":\"每一步运动周期，单位ms，默认500ms，范围[500,2000]\"},\"step\":{\"type\":\"integer\",\"description\":\"步数，默认5步，范围[0,15]\"}},\"required\":[\"x\",\"y\",\"z\",\"height\",\"period\",\"step\"]}},\"block\":10}",
                    "_mcp_k230_2dof_arm_move_to_yz = {\"type\":\"function\",\"function\":{\"name\":\"arm_move_to_yz\",\"description\":\"控制机械臂运动时调用，默认机械臂末端保持水平，默认为arm_move_to_yz(196,82,0,1000)，当机器返回limit时，代表已经到限位了，若返回ok，则已到达位置\",\"parameters\":{\"type\":\"object\",\"properties\":{\"y\":{\"type\":\"integer\",\"description\":\"机械臂末端Y坐标，单位mm，上前越大，向后越小\"},\"z\":{\"type\":\"integer\",\"description\":\"机械臂末端Z坐标，单位mm，往上越大，往下越小\"},\"angle\":{\"type\":\"integer\",\"description\":\"机械臂末端的倾角，0为水平，往下为负\"},\"timeout\":{\"type\":\"integer\",\"description\":\"运动时间，单位ms，根据运动距离和速度自动计算，通常在500-2000ms，不能超过5000ms，默认为1000ms\"}},\"required\":[\"y\",\"z\",\"angle\",\"timeout\"]}},\"block\":10}",
                    "_mcp_k230_arm_claw = {\"type\":\"function\",\"function\":{\"name\":\"arm_claw\",\"description\":\"控制机械臂夹爪的打开和闭合\",\"parameters\":{\"type\":\"object\",\"properties\":{\"angle\":{\"type\":\"integer\",\"description\":\"夹爪的开合角度，范围在500-1000，默认为500闭合，1000完全张开\"},\"time_count\":{\"type\":\"integer\",\"description\":\"运动时间，单位ms，根据运动距离和速度自动计算，通常在100-1000ms，不能超过1000ms，默认为100ms\"}},\"required\":[\"angle\"]}},\"block\":5}",
                    "_mcp_k230_sonar_getDistance = {\"type\":\"function\",\"function\":{\"name\":\"sonar_getDistance\",\"description\":\"超声波测距时调用，返回值为测量到的距离，单位cm，一般在2-400cm之间\",\"parameters\":{\"type\":\"object\",\"properties\":{}}},\"block\":3}",
                    "_mcp_k230_sonar_setRGB = {\"type\":\"function\",\"function\":{\"name\":\"sonar_setRGB\",\"description\":\"设置超声波模块上的RGB灯颜色，参数范围都是0-255\",\"parameters\":{\"type\":\"object\",\"properties\":{\"red\":{\"type\":\"integer\"},\"green\":{\"type\":\"integer\"},\"blue\":{\"type\":\"integer\"}},\"required\":[\"red\",\"green\",\"blue\"]}},\"block\":3}",
                    "_mcp_k230_robot_runAction = {\"type\":\"function\",\"function\":{\"name\":\"robot_runAction\",\"description\":\"控制机器人执行动作，动作组开始执行时就会回复，时长未知，所以只需说动作已执行\",\"parameters\":{\"type\":\"object\",\"properties\":{\"num\":{\"type\":\"string\",\"description\":\"动作编号\"},\"count\":{\"type\":\"integer\",\"description\":\"动作执行的次数，默认为1，最大为10，超过10会被当做10执行\"}},\"required\":[\"num\",\"count\"]}},\"block\":10}",
                    "_mcp_k230_robot_set_pose = {\"type\":\"function\",\"function\":{\"name\":\"robot_set_pose\",\"description\":\"控制身体姿态时调用\",\"parameters\":{\"type\":\"object\",\"properties\":{\"x_offset\":{\"type\":\"integer\",\"description\":\"x轴方向偏移，正整数为右平移，负整数为左平移，默认为10，范围[-20,20]\"},\"y_offset\":{\"type\":\"integer\",\"description\":\"y轴方向偏移，正整数为向前平移，负整数为向后平移，默认为10，范围[-20,20]\"},\"z_offset\":{\"type\":\"integer\",\"description\":\"身体抬升降低，正为抬升，默认为10，范围[-15,20]\"},\"pitch\":{\"type\":\"integer\",\"description\":\"pitch角度偏转，范围[-20,20]\"},\"roll\":{\"type\":\"integer\",\"description\":\"roll角度偏转，范围[-20,20]\"},\"yaw\":{\"type\":\"integer\",\"description\":\"yaw角度偏转，范围[-20,20]\"},\"run_time\":{\"type\":\"integer\",\"description\":\"变化时间，单位ms，默认500ms\"}},\"required\":[\"x_offset\",\"y_offset\",\"z_offset\",\"pitch\",\"roll\",\"yaw\",\"run_time\"]}},\"block\":10}"
                ]
            },
            k230_aihexa_set_mcp_default: {
                template: "",
                variables: [
                    "_mcp_k230_Bat_Battery_power = {\"type\":\"function\",\"function\":{\"name\":\"Bat_Battery_power\",\"description\":\"查询电量时调用，会返回电池电量，单位mV,一般在3100-4200mV之间，电量越低数值越小，低于3400mV请及时充电\",\"parameters\":{\"type\":\"object\",\"properties\":{}}},\"block\":3}",
                    "_mcp_k230_Buzzer_playTone = {\"type\":\"function\",\"function\":{\"name\":\"Buzzer_playTone\",\"description\":\"蜂鸣器鸣响\",\"parameters\":{\"type\":\"object\",\"properties\":{\"freq\":{\"type\":\"integer\",\"description\":\"蜂鸣器频率，范围200-3000Hz,默认为1500Hz\"},\"time_count\":{\"type\":\"integer\",\"description\":\"鸣响时间，单位ms，默认为100ms\"}},\"required\":[\"freq\",\"time_count\"]}},\"block\":3}",
                    "_mcp_k230_RGB_setRGB = {\"type\":\"function\",\"function\":{\"name\":\"RGB_setRGB\",\"description\":\"设置RGB灯时调用，值的范围都是0-255\",\"parameters\":{\"type\":\"object\",\"properties\":{\"red\":{\"type\":\"integer\"},\"green\":{\"type\":\"integer\"},\"blue\":{\"type\":\"integer\"}},\"required\":[\"red\",\"green\",\"blue\"]}},\"block\":3}",
                    "_mcp_k230_robot_move = {\"type\":\"function\",\"function\":{\"name\":\"robot_move\",\"description\":\"控制六足底盘运动时调用，控制运动几步\",\"parameters\":{\"type\":\"object\",\"properties\":{\"x\":{\"type\":\"integer\",\"description\":\"x轴方向速度，正整数为右平移，负整数为左平移，默认为20，范围[-20,20]\"},\"y\":{\"type\":\"integer\",\"description\":\"y轴方向速度，正整数为前进，负整数为后退，默认为20，范围[-20,20]\"},\"z\":{\"type\":\"integer\",\"description\":\"中心旋转速度，左转逆时针为正，右转顺时针为负，默认为15，范围[-15,15]\"},\"height\":{\"type\":\"integer\",\"description\":\"抬腿高度，单位mm，默认为15\"},\"period\":{\"type\":\"integer\",\"description\":\"每一步运动周期，单位ms，默认500ms，范围[500,2000]\"},\"step\":{\"type\":\"integer\",\"description\":\"步数，默认5步，范围[0,15]\"}},\"required\":[\"x\",\"y\",\"z\",\"height\",\"period\",\"step\"]}},\"block\":10}",
                    "_mcp_k230_2dof_arm_move_to_yz = {\"type\":\"function\",\"function\":{\"name\":\"arm_move_to_yz\",\"description\":\"控制机械臂运动时调用，默认机械臂末端保持水平，默认为arm_move_to_yz(196,82,0,1000)，当机器返回limit时，代表已经到限位了，若返回ok，则已到达位置\",\"parameters\":{\"type\":\"object\",\"properties\":{\"y\":{\"type\":\"integer\",\"description\":\"机械臂末端Y坐标，单位mm，上前越大，向后越小\"},\"z\":{\"type\":\"integer\",\"description\":\"机械臂末端Z坐标，单位mm，往上越大，往下越小\"},\"angle\":{\"type\":\"integer\",\"description\":\"机械臂末端的倾角，0为水平，往下为负\"},\"timeout\":{\"type\":\"integer\",\"description\":\"运动时间，单位ms，根据运动距离和速度自动计算，通常在500-2000ms，不能超过5000ms，默认为1000ms\"}},\"required\":[\"y\",\"z\",\"angle\",\"timeout\"]}},\"block\":10}",
                    "_mcp_k230_arm_claw = {\"type\":\"function\",\"function\":{\"name\":\"arm_claw\",\"description\":\"控制机械臂夹爪的打开和闭合\",\"parameters\":{\"type\":\"object\",\"properties\":{\"angle\":{\"type\":\"integer\",\"description\":\"夹爪的开合角度，范围在500-1000，默认为500闭合，1000完全张开\"},\"time_count\":{\"type\":\"integer\",\"description\":\"运动时间，单位ms，根据运动距离和速度自动计算，通常在100-1000ms，不能超过1000ms，默认为100ms\"}},\"required\":[\"angle\"]}},\"block\":5}",
                    "_mcp_k230_sonar_getDistance = {\"type\":\"function\",\"function\":{\"name\":\"sonar_getDistance\",\"description\":\"超声波测距时调用，返回值为测量到的距离，单位cm，一般在2-400cm之间\",\"parameters\":{\"type\":\"object\",\"properties\":{}}},\"block\":3}",
                    "_mcp_k230_sonar_setRGB = {\"type\":\"function\",\"function\":{\"name\":\"sonar_setRGB\",\"description\":\"设置超声波模块上的RGB灯颜色，参数范围都是0-255\",\"parameters\":{\"type\":\"object\",\"properties\":{\"red\":{\"type\":\"integer\"},\"green\":{\"type\":\"integer\"},\"blue\":{\"type\":\"integer\"}},\"required\":[\"red\",\"green\",\"blue\"]}},\"block\":3}",
                    "_mcp_k230_robot_runAction = {\"type\":\"function\",\"function\":{\"name\":\"robot_runAction\",\"description\":\"控制机器人执行动作，动作组开始执行时就会回复，时长未知，所以只需说动作已执行\",\"parameters\":{\"type\":\"object\",\"properties\":{\"num\":{\"type\":\"string\",\"description\":\"动作编号\"},\"count\":{\"type\":\"integer\",\"description\":\"动作执行的次数，默认为1，最大为10，超过10会被当做10执行\"}},\"required\":[\"num\",\"count\"]}},\"block\":10}",
                    "_mcp_k230_robot_set_pose = {\"type\":\"function\",\"function\":{\"name\":\"robot_set_pose\",\"description\":\"控制身体姿态时调用\",\"parameters\":{\"type\":\"object\",\"properties\":{\"x_offset\":{\"type\":\"integer\",\"description\":\"x轴方向偏移，正整数为右平移，负整数为左平移，默认为10，范围[-20,20]\"},\"y_offset\":{\"type\":\"integer\",\"description\":\"y轴方向偏移，正整数为向前平移，负整数为向后平移，默认为10，范围[-20,20]\"},\"z_offset\":{\"type\":\"integer\",\"description\":\"身体抬升降低，正为抬升，默认为10，范围[-15,20]\"},\"pitch\":{\"type\":\"integer\",\"description\":\"pitch角度偏转，范围[-20,20]\"},\"roll\":{\"type\":\"integer\",\"description\":\"roll角度偏转，范围[-20,20]\"},\"yaw\":{\"type\":\"integer\",\"description\":\"yaw角度偏转，范围[-20,20]\"},\"run_time\":{\"type\":\"integer\",\"description\":\"变化时间，单位ms，默认500ms\"}},\"required\":[\"x_offset\",\"y_offset\",\"z_offset\",\"pitch\",\"roll\",\"yaw\",\"run_time\"]}},\"block\":10}"
                ]
            },
            k230_get_default_mcp_name: {
                template: "'{VALUE}' in {RESULT}"
            },
            k230_get_buzzer_params: {
                template: "{RESULT}['Buzzer_playTone']['{VALUE}']"
            },
            k230_get_rgb_light_params: {
                template: "{RESULT}['RGB_setRGB']['{VALUE}']"
            },
            k230_get_sonar_rgb_params: {
                template: "{RESULT}['sonar_setRGB']['{VALUE}']"
            },
            k230_get_arm_claw_params: {
                template: "{RESULT}['arm_claw']['{VALUE}']"
            },
            k230_get_robot_set_pose_params: {
                template: "{RESULT}['robot_set_pose']['{VALUE}']"
            },
            k230_get_robot_move_params: {
                template: "{RESULT}['robot_move']['{VALUE}']"
            },
            k230_get_robot_runAction_params: {
                template: "{RESULT}['robot_runAction']['{VALUE}']"
            },
            k230_motor_speed_params: {
                template: "{RESULT}['mcar_set_motors_speed']['{VALUE}']"
            },
            k230_get_move_distance_params: {
                template: "{RESULT}['mcar_move_distance']['{VALUE}']"
            },
            k230_get_arm_move_to_yz_params: {
                template: "{RESULT}['arm_move_to_yz']['{VALUE}']"
            },
            k230_face_detected: {
                template: "k230.result_available()"
            },
            k230_face_count: {
                template: "k230.result_len()"
            },
            k230_face_exists: {
                template: "k230.find_result('extra',{VALUE})"
            },
            k230_face_recognition_get_arg_by_name: {
                template: "k230.get_key_result('extra',{VALUE},'{POS}')",
                templateSelector: {
                    argument: "POS",
                    cases: {
                        "1": "k230.get_key_result('extra',{VALUE},'extra',1)"
                    }
                }
            },
            k230_face2_detected: {
                template: "k230.result_available()"
            },
            k230_face2_count: {
                template: "k230.result_len()"
            },
            k230_result_face_pose_get_oriention: {
                template: "k230.near_center_result('extra',0) == '{ORIENTION}'"
            },
            k230_face2_near_center: {
                template: "k230.near_center_result('{VALUE}')",
                templateSelector: {
                    argument: "VALUE",
                    cases: {
                        "0": "k230.near_center_result('extra',0)",
                        "1": "k230.near_center_result('extra',1)",
                        "2": "k230.near_center_result('extra',2)",
                        "3": "k230.near_center_result('extra',3)",
                        "4": "k230.near_center_result('extra',4)"
                    }
                }
            },
            k230_face3_detected: {
                template: "k230.result_available()"
            },
            k230_face3_count: {
                template: "k230.result_len()"
            },
            k230_facial_detect: {
                template: "k230.near_center_result('extra',0) == '{VALUE}'"
            },
            k230_get_facial_args: {
                template: "k230.near_center_result('{POS}')",
                templateSelector: {
                    argument: "POS",
                    cases: {
                        "0": "k230.near_center_result('extra',0)",
                        "1": "k230.near_center_result('extra',1)"
                    }
                }
            },
            k230_gaze_detected: {
                template: "k230.result_available()"
            },
            k230_gaze_count: {
                template: "k230.result_len()"
            },
            k230_gaze_near_center_result: {
                template: "k230.near_center_result('extra',0) == '{NAME}'"
            },
            k230_gaze_near_center: {
                template: "k230.near_center_result('{VALUE}')",
                templateSelector: {
                    argument: "VALUE",
                    cases: {
                        "0": "k230.near_center_result('extra',0)",
                        "1": "k230.near_center_result('extra',1)",
                        "2": "k230.near_center_result('extra',2)",
                        "3": "k230.near_center_result('extra',3)",
                        "4": "k230.near_center_result('extra',4)",
                        "5": "k230.near_center_result('extra',5)"
                    }
                }
            },
            k230_person_detected: {
                template: "k230.result_available()"
            },
            k230_person_count: {
                template: "k230.result_len()"
            },
            k230_person_near_center: {
                template: "k230.near_center_result('{VALUE}')"
            },
            k230_person_point_detected: {
                template: "k230.result_available()"
            },
            k230_person2_count: {
                template: "k230.result_len()"
            },
            k230_person_keypoint_detect_name: {
                template: "k230.find_result('id',{NAME})"
            },
            k230_result_person_keypoint_get_arg: {
                template: "k230.get_key_result('id',{NAME},'{POS}')",
                templateSelector: {
                    argument: "POS",
                    cases: {
                        "0": "k230.get_key_result('id',{NAME},'keypoints',0)",
                        "1": "k230.get_key_result('id',{NAME},'keypoints',1)",
                        "2": "k230.get_key_result('id',{NAME},'keypoints',2)",
                        "3": "k230.get_key_result('id',{NAME},'keypoints',3)",
                        "4": "k230.get_key_result('id',{NAME},'keypoints',4)",
                        "5": "k230.get_key_result('id',{NAME},'keypoints',5)",
                        "6": "k230.get_key_result('id',{NAME},'keypoints',6)",
                        "7": "k230.get_key_result('id',{NAME},'keypoints',7)",
                        "8": "k230.get_key_result('id',{NAME},'keypoints',8)",
                        "9": "k230.get_key_result('id',{NAME},'keypoints',9)",
                        "10": "k230.get_key_result('id',{NAME},'keypoints',10)",
                        "11": "k230.get_key_result('id',{NAME},'keypoints',11)",
                        "12": "k230.get_key_result('id',{NAME},'keypoints',12)",
                        "13": "k230.get_key_result('id',{NAME},'keypoints',13)",
                        "14": "k230.get_key_result('id',{NAME},'keypoints',14)",
                        "15": "k230.get_key_result('id',{NAME},'keypoints',15)",
                        "16": "k230.get_key_result('id',{NAME},'keypoints',16)",
                        "17": "k230.get_key_result('id',{NAME},'keypoints',17)",
                        "18": "k230.get_key_result('id',{NAME},'keypoints',18)",
                        "19": "k230.get_key_result('id',{NAME},'keypoints',19)",
                        "20": "k230.get_key_result('id',{NAME},'keypoints',20)",
                        "21": "k230.get_key_result('id',{NAME},'keypoints',21)",
                        "22": "k230.get_key_result('id',{NAME},'keypoints',22)",
                        "23": "k230.get_key_result('id',{NAME},'keypoints',23)",
                        "24": "k230.get_key_result('id',{NAME},'keypoints',24)",
                        "25": "k230.get_key_result('id',{NAME},'keypoints',25)",
                        "26": "k230.get_key_result('id',{NAME},'keypoints',26)",
                        "27": "k230.get_key_result('id',{NAME},'keypoints',27)",
                        "28": "k230.get_key_result('id',{NAME},'keypoints',28)",
                        "29": "k230.get_key_result('id',{NAME},'keypoints',29)",
                        "30": "k230.get_key_result('id',{NAME},'keypoints',30)",
                        "31": "k230.get_key_result('id',{NAME},'keypoints',31)",
                        "32": "k230.get_key_result('id',{NAME},'keypoints',32)",
                        "33": "k230.get_key_result('id',{NAME},'keypoints',33)"
                    }
                }
            },
            k230_person_keypoint_near_center: {
                template: "k230.near_center_result('{POS}')",
                templateSelector: {
                    argument: "POS",
                    cases: {
                        "0": "k230.near_center_result('keypoints',0)",
                        "1": "k230.near_center_result('keypoints',1)",
                        "2": "k230.near_center_result('keypoints',2)",
                        "3": "k230.near_center_result('keypoints',3)",
                        "4": "k230.near_center_result('keypoints',4)",
                        "5": "k230.near_center_result('keypoints',5)",
                        "6": "k230.near_center_result('keypoints',6)",
                        "7": "k230.near_center_result('keypoints',7)",
                        "8": "k230.near_center_result('keypoints',8)",
                        "9": "k230.near_center_result('keypoints',9)",
                        "10": "k230.near_center_result('keypoints',10)",
                        "11": "k230.near_center_result('keypoints',11)",
                        "12": "k230.near_center_result('keypoints',12)",
                        "13": "k230.near_center_result('keypoints',13)",
                        "14": "k230.near_center_result('keypoints',14)",
                        "15": "k230.near_center_result('keypoints',15)",
                        "16": "k230.near_center_result('keypoints',16)",
                        "17": "k230.near_center_result('keypoints',17)",
                        "18": "k230.near_center_result('keypoints',18)",
                        "19": "k230.near_center_result('keypoints',19)",
                        "20": "k230.near_center_result('keypoints',20)",
                        "21": "k230.near_center_result('keypoints',21)",
                        "22": "k230.near_center_result('keypoints',22)",
                        "23": "k230.near_center_result('keypoints',23)",
                        "24": "k230.near_center_result('keypoints',24)",
                        "25": "k230.near_center_result('keypoints',25)",
                        "26": "k230.near_center_result('keypoints',26)",
                        "27": "k230.near_center_result('keypoints',27)",
                        "28": "k230.near_center_result('keypoints',28)",
                        "29": "k230.near_center_result('keypoints',29)",
                        "30": "k230.near_center_result('keypoints',30)",
                        "31": "k230.near_center_result('keypoints',31)",
                        "32": "k230.near_center_result('keypoints',32)",
                        "33": "k230.near_center_result('keypoints',33)"
                    }
                }
            },
            k230_hand_detected: {
                template: "k230.result_available()"
            },
            k230_hand_count: {
                template: "k230.result_len()"
            },
            k230_hand_detected_posture: {
                template: "k230.find_result('id',{NAME})"
            },
            k230_result_hand_keypoint_get_arg: {
                template: "k230.get_key_result('id',{NAME},'{POS}')",
                templateSelector: {
                    argument: "POS",
                    cases: {
                        "0": "k230.get_key_result('id',{NAME},'keypoints',0)",
                        "1": "k230.get_key_result('id',{NAME},'keypoints',1)",
                        "2": "k230.get_key_result('id',{NAME},'keypoints',2)",
                        "3": "k230.get_key_result('id',{NAME},'keypoints',3)",
                        "4": "k230.get_key_result('id',{NAME},'keypoints',4)",
                        "5": "k230.get_key_result('id',{NAME},'keypoints',5)",
                        "6": "k230.get_key_result('id',{NAME},'keypoints',6)",
                        "7": "k230.get_key_result('id',{NAME},'keypoints',7)",
                        "8": "k230.get_key_result('id',{NAME},'keypoints',8)",
                        "9": "k230.get_key_result('id',{NAME},'keypoints',9)",
                        "10": "k230.get_key_result('id',{NAME},'keypoints',10)",
                        "11": "k230.get_key_result('id',{NAME},'keypoints',11)",
                        "12": "k230.get_key_result('id',{NAME},'keypoints',12)",
                        "13": "k230.get_key_result('id',{NAME},'keypoints',13)",
                        "14": "k230.get_key_result('id',{NAME},'keypoints',14)",
                        "15": "k230.get_key_result('id',{NAME},'keypoints',15)",
                        "16": "k230.get_key_result('id',{NAME},'keypoints',16)",
                        "17": "k230.get_key_result('id',{NAME},'keypoints',17)",
                        "18": "k230.get_key_result('id',{NAME},'keypoints',18)",
                        "19": "k230.get_key_result('id',{NAME},'keypoints',19)",
                        "20": "k230.get_key_result('id',{NAME},'keypoints',20)",
                        "21": "k230.get_key_result('id',{NAME},'keypoints',21)",
                        "22": "k230.get_key_result('id',{NAME},'keypoints',22)",
                        "23": "k230.get_key_result('id',{NAME},'keypoints',23)",
                        "24": "k230.get_key_result('id',{NAME},'keypoints',24)",
                        "25": "k230.get_key_result('id',{NAME},'keypoints',25)",
                        "26": "k230.get_key_result('id',{NAME},'keypoints',26)",
                        "27": "k230.get_key_result('id',{NAME},'keypoints',27)",
                        "28": "k230.get_key_result('id',{NAME},'keypoints',28)",
                        "29": "k230.get_key_result('id',{NAME},'keypoints',29)",
                        "30": "k230.get_key_result('id',{NAME},'keypoints',30)",
                        "31": "k230.get_key_result('id',{NAME},'keypoints',31)",
                        "32": "k230.get_key_result('id',{NAME},'keypoints',32)",
                        "33": "k230.get_key_result('id',{NAME},'keypoints',33)",
                        "34": "k230.get_key_result('id',{NAME},'keypoints',34)",
                        "35": "k230.get_key_result('id',{NAME},'keypoints',35)",
                        "36": "k230.get_key_result('id',{NAME},'keypoints',36)",
                        "37": "k230.get_key_result('id',{NAME},'keypoints',37)",
                        "38": "k230.get_key_result('id',{NAME},'keypoints',38)",
                        "39": "k230.get_key_result('id',{NAME},'keypoints',39)",
                        "40": "k230.get_key_result('id',{NAME},'keypoints',40)",
                        "41": "k230.get_key_result('id',{NAME},'keypoints',41)"
                    }
                }
            },
            k230_hand_near_center: {
                template: "k230.near_center_result('{VALUE}')",
                templateSelector: {
                    argument: "VALUE",
                    cases: {
                        "0": "k230.near_center_result('keypoints',0)",
                        "1": "k230.near_center_result('keypoints',1)",
                        "2": "k230.near_center_result('keypoints',2)",
                        "3": "k230.near_center_result('keypoints',3)",
                        "4": "k230.near_center_result('keypoints',4)",
                        "5": "k230.near_center_result('keypoints',5)",
                        "6": "k230.near_center_result('keypoints',6)",
                        "7": "k230.near_center_result('keypoints',7)",
                        "8": "k230.near_center_result('keypoints',8)",
                        "9": "k230.near_center_result('keypoints',9)",
                        "10": "k230.near_center_result('keypoints',10)",
                        "11": "k230.near_center_result('keypoints',11)",
                        "12": "k230.near_center_result('keypoints',12)",
                        "13": "k230.near_center_result('keypoints',13)",
                        "14": "k230.near_center_result('keypoints',14)",
                        "15": "k230.near_center_result('keypoints',15)",
                        "16": "k230.near_center_result('keypoints',16)",
                        "17": "k230.near_center_result('keypoints',17)",
                        "18": "k230.near_center_result('keypoints',18)",
                        "19": "k230.near_center_result('keypoints',19)",
                        "20": "k230.near_center_result('keypoints',20)",
                        "21": "k230.near_center_result('keypoints',21)",
                        "22": "k230.near_center_result('keypoints',22)",
                        "23": "k230.near_center_result('keypoints',23)",
                        "24": "k230.near_center_result('keypoints',24)",
                        "25": "k230.near_center_result('keypoints',25)",
                        "26": "k230.near_center_result('keypoints',26)",
                        "27": "k230.near_center_result('keypoints',27)",
                        "28": "k230.near_center_result('keypoints',28)",
                        "29": "k230.near_center_result('keypoints',29)",
                        "30": "k230.near_center_result('keypoints',30)",
                        "31": "k230.near_center_result('keypoints',31)",
                        "32": "k230.near_center_result('keypoints',32)",
                        "33": "k230.near_center_result('keypoints',33)",
                        "34": "k230.near_center_result('keypoints',34)",
                        "35": "k230.near_center_result('keypoints',35)",
                        "36": "k230.near_center_result('keypoints',36)",
                        "37": "k230.near_center_result('keypoints',37)",
                        "38": "k230.near_center_result('keypoints',38)",
                        "39": "k230.near_center_result('keypoints',39)",
                        "40": "k230.near_center_result('keypoints',40)",
                        "41": "k230.near_center_result('keypoints',41)"
                    }
                }
            },
            k230_gesture_detected: {
                template: "k230.result_available()"
            },
            k230_gesture_count: {
                template: "k230.result_len()"
            },
            k230_result_hand_gesture_get_arg: {
                template: "k230.near_center_result('extra',0) == '{VALUE}'"
            },
            k230_result_hand_gesture_get_pos_arg_by_name: {
                template: "k230.get_key_result('extra','{NAME}','{POS}')"
            },
            k230_result_hand_gesture_get_pos_arg: {
                template: "k230.near_center_result('{POS}')",
                templateSelector: {
                    argument: "POS",
                    cases: {
                        "0": "k230.near_center_result('extra',0)"
                    }
                }
            },
            k230_fall_detected: {
                template: "k230.result_available()"
            },
            k230_fall_count: {
                template: "k230.result_len()"
            },
            k230_fall_near_center_result: {
                template: "k230.near_center_result('extra',0) == 1"
            },
            k230_fall_near_center: {
                template: "k230.near_center_result('{VALUE}')",
                templateSelector: {
                    argument: "VALUE",
                    cases: {
                        "1": "k230.near_center_result('extra',1)"
                    }
                }
            },
            k230_target_detected: {
                template: "k230.result_available()"
            },
            k230_target_near_center: {
                template: "k230.near_center_result('{VALUE}')"
            },
            k230_dynamic_gesture_detected: {
                template: "k230.result_available()"
            },
            k230_result_dynamic_gesture_get_arg: {
                template: "k230.near_center_result('value') == {GESTURE}"
            },
            k230_result_self_learn_get_arg: {
                template: "k230.find_result('extra',{NAME})"
            },
            k230_result_self_learn_get_pos_arg: {
                template: "k230.get_key_result('extra',{NAME},'{POS}')",
                templateSelector: {
                    argument: "POS",
                    cases: {
                        "1": "k230.get_key_result('extra',{NAME},'extra',1)"
                    }
                }
            },
            k230_set_single_color: {
                template: "k230.set_color_target('{COLOR}')"
            },
            k230_set_single_color_arg: {
                template: "k230.set_color_target({COLOR.colorName})"
            },
            k230_single_color_detected: {
                template: "k230.result_available()"
            },
            k230_result_single_color_get_pos_arg: {
                template: "k230.near_center_result('blobs',0,'{POS}')",
                templateSelector: {
                    argument: "POS",
                    cases: {
                        color: "k230.near_center_result('color')"
                    }
                }
            },
            k230_set_multi_color_arg: {
                template: "k230.set_multi_color_list({COLOR})"
            },
            k230_color_detected: {
                template: "k230.result_available()"
            },
            k230_color_count: {
                template: "k230.result_len()"
            },
            k230_color_near_center_name: {
                template: "k230.find_result('color',{NAME.colorName})"
            },
            k230_color_near_center: {
                template: "k230.near_center_result('blobs',0,'{VALUE}')",
                templateSelector: {
                    argument: "VALUE",
                    cases: {
                        color: "k230.near_center_result('color')"
                    }
                }
            },
            k230_result_multi_color_get_pos_arg: {
                template: "k230.get_key_result('color',{NAME.colorName},'blobs',0,'{POS}')",
                templateSelector: {
                    argument: "POS",
                    cases: {
                        color: "k230.get_key_result('color',{NAME.colorName},'color')"
                    }
                }
            },
            k230_set_line_color: {
                template: "k230.set_color_target('{COLOR}')"
            },
            k230_set_line_color_arg: {
                template: "k230.set_color_target({COLOR})"
            },
            k230_line_detected: {
                template: "k230.result_available()"
            },
            k230_result_line_detect_get_arg: {
                template: "k230.result_get(0,'{VALUE}')"
            },
            k230_ocr_detected: {
                template: "k230.result_available()"
            },
            k230_ocr_count: {
                template: "k230.result_len()"
            },
            k230_result_ocr_get_arg: {
                template: "k230.near_center_result('text')"
            },
            k230_result_ocr_get_pos_arg: {
                template: "k230.near_center_result('points',{POINT})"
            },
            k230_license_plate_detected: {
                template: "k230.result_available()"
            },
            k230_license_plate_count: {
                template: "k230.result_len()"
            },
            k230_result_lpr_get_arg: {
                template: "k230.near_center_result('text')"
            },
            k230_result_lpr_get_pos_arg: {
                template: "k230.near_center_result('points',{POINT})"
            },
            k230_object_detected: {
                template: "k230.result_available()"
            },
            k230_object_count: {
                template: "k230.result_len()"
            },
            k230_object_classify_parameter: {
                template: "k230.near_center_result('{POS}')",
                templateSelector: {
                    argument: "POS",
                    cases: {
                        "0": "k230.near_center_result('extra',0)"
                    }
                }
            },
            k230_object_named_detected: {
                template: "k230.find_result('extra','{NAME}')"
            },
            k230_object_parameter: {
                template: "k230.near_center_result('{POS}')",
                templateSelector: {
                    argument: "POS",
                    cases: {
                        "0": "k230.near_center_result('extra',0)",
                        "1": "k230.near_center_result('extra',1)"
                    }
                }
            },
            k230_trash_detected: {
                template: "k230.result_available()"
            },
            k230_trash_count: {
                template: "k230.result_len()"
            },
            k230_result_garbage_get_name_arg: {
                template: "k230.near_center_result('extra',0) == '{VALUE}'"
            },
            k230_trash_near_center: {
                template: "k230.near_center_result('extra',{POS})"
            },
            k230_result_garbage_get_pos_arg: {
                template: "k230.near_center_result('points',{POS})"
            },
            k230_traffic_sign_detected: {
                template: "k230.result_available()"
            },
            k230_traffic_sign_count: {
                template: "k230.result_len()"
            },
            k230_result_traffic_get_name_arg: {
                template: "k230.near_center_result('extra',0) == '{NAME}'"
            },
            k230_traffic_sign_near_center: {
                template: "k230.near_center_result('{POS}')",
                templateSelector: {
                    argument: "POS",
                    cases: {
                        "0": "k230.near_center_result('extra',0)",
                        "1": "k230.near_center_result('extra',1)"
                    }
                }
            },
            k230_april_tag_detected: {
                template: "k230.result_available()"
            },
            k230_april_tag_count: {
                template: "k230.result_len()"
            },
            k230_result_apriltag_get_name_arg: {
                template: "k230.near_center_result('extra',0) == {NAME}"
            },
            k230_april_tag_near_center: {
                template: "k230.near_center_result('extra',{POS})"
            },
            k230_result_apriltag_get_pos_arg: {
                template: "k230.near_center_result('points',{POS})"
            },
            k230_dm_code_detected: {
                template: "k230.result_available()"
            },
            k230_dm_code_count: {
                template: "k230.result_len()"
            },
            k230_result_dmcode_get_name_arg: {
                template: "k230.near_center_result('extra',0) == {NAME}"
            },
            k230_dm_code_near_center: {
                template: "k230.near_center_result('extra',0)"
            },
            k230_result_dmcode_get_pos_arg: {
                template: "k230.near_center_result('points',{POS})"
            },
            k230_qr_code_detected: {
                template: "k230.result_available()"
            },
            k230_qr_code_count: {
                template: "k230.result_len()"
            },
            k230_result_orcode_get_arg: {
                template: "k230.near_center_result('extra',0) == {NAME}"
            },
            k230_qr_code_near_center: {
                template: "k230.near_center_result('extra',0)"
            },
            k230_result_orcode_get_pos_arg: {
                template: "k230.near_center_result('{POS}')"
            },
            k230_barcode_detected: {
                template: "k230.result_available()"
            },
            k230_barcode_count: {
                template: "k230.result_len()"
            },
            k230_result_barcode_get_arg: {
                template: "k230.near_center_result('extra',0) == {NAME}"
            },
            k230_barcode_near_center: {
                template: "k230.near_center_result('extra',0)"
            },
            k230_result_barcode_get_pos_arg: {
                template: "k230.near_center_result('{POS}')"
            }
        };
        return Object.fromEntries(this.getInfo().blocks.flatMap(block => 'opcode' in block ?
            [[block.opcode, templates[block.opcode]]] : []));
    }
}
