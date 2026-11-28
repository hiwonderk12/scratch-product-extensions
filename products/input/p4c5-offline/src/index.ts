// P4C5 离线识别原生包；积木与模板独立维护，固定协议值不随界面语言变化。
import type {ExtensionContext, ExtensionInfo, NativeExtension, PythonTemplate} from '../../../../tools/sdk';
import zhCN from './locales/zh-cn.json';
import en from './locales/en.json';
import zhTW from './locales/zh-tw.json';
import ko from './locales/ko.json';

export const messages = {'zh-cn': zhCN, en: en, 'zh-tw': zhTW, ko: ko} as const;
export const product = {name: 'product.name', supportedLocales: ['zh-cn', 'en', 'zh-tw', 'ko']} as const;

export default class P4C5Offline implements NativeExtension {
    constructor (private readonly context: ExtensionContext) {}

    // 仅接受已登记的 AiDoggy 适配，其他主控不能借共享名字生成不同固件接口。
    getInfo (): ExtensionInfo {
        if (this.context.variant !== 'hiwonder-aidoggy') throw new Error('input/p4c5-offline: 不支持此适配');
        return {
            id: "sensor",
            menuIconURI: this.context.asset("assets/sensor.png"),
            "name": this.context.t("product.name"),
            "color1": "#7B68EE",
            "color2": "#7B68EE",
            "color3": "#7B68EE",
            "menus": {
                "wonderecho_word": {
                    "acceptReporters": false,
                    "items": [
                        {
                            "text": this.context.t("menu.wonderecho_word.0"),
                            "value": "1"
                        },
                        {
                            "text": this.context.t("menu.wonderecho_word.1"),
                            "value": "2"
                        },
                        {
                            "text": this.context.t("menu.wonderecho_word.2"),
                            "value": "3"
                        },
                        {
                            "text": this.context.t("menu.wonderecho_word.3"),
                            "value": "4"
                        },
                        {
                            "text": this.context.t("menu.wonderecho_word.4"),
                            "value": "5"
                        },
                        {
                            "text": this.context.t("menu.wonderecho_word.5"),
                            "value": "6"
                        },
                        {
                            "text": this.context.t("menu.wonderecho_word.6"),
                            "value": "7"
                        },
                        {
                            "text": this.context.t("menu.wonderecho_word.7"),
                            "value": "8"
                        },
                        {
                            "text": this.context.t("menu.wonderecho_word.8"),
                            "value": "9"
                        },
                        {
                            "text": this.context.t("menu.wonderecho_word.9"),
                            "value": "0xA"
                        },
                        {
                            "text": this.context.t("menu.wonderecho_word.10"),
                            "value": "0xB"
                        },
                        {
                            "text": this.context.t("menu.wonderecho_word.11"),
                            "value": "0xC"
                        },
                        {
                            "text": this.context.t("menu.wonderecho_word.12"),
                            "value": "0xD"
                        },
                        {
                            "text": this.context.t("menu.wonderecho_word.13"),
                            "value": "0xE"
                        },
                        {
                            "text": this.context.t("menu.wonderecho_word.14"),
                            "value": "0xF"
                        },
                        {
                            "text": this.context.t("menu.wonderecho_word.15"),
                            "value": "0x10"
                        },
                        {
                            "text": this.context.t("menu.wonderecho_word.16"),
                            "value": "0x11"
                        },
                        {
                            "text": this.context.t("menu.wonderecho_word.17"),
                            "value": "0x12"
                        },
                        {
                            "text": this.context.t("menu.wonderecho_word.18"),
                            "value": "0x13"
                        },
                        {
                            "text": this.context.t("menu.wonderecho_word.19"),
                            "value": "0x14"
                        },
                        {
                            "text": this.context.t("menu.wonderecho_word.20"),
                            "value": "0x15"
                        },
                        {
                            "text": this.context.t("menu.wonderecho_word.21"),
                            "value": "0x16"
                        },
                        {
                            "text": this.context.t("menu.wonderecho_word.22"),
                            "value": "0x17"
                        },
                        {
                            "text": this.context.t("menu.wonderecho_word.23"),
                            "value": "0x18"
                        },
                        {
                            "text": this.context.t("menu.wonderecho_word.24"),
                            "value": "0x19"
                        },
                        {
                            "text": this.context.t("menu.wonderecho_word.25"),
                            "value": "0x1A"
                        },
                        {
                            "text": this.context.t("menu.wonderecho_word.26"),
                            "value": "0x1B"
                        },
                        {
                            "text": this.context.t("menu.wonderecho_word.27"),
                            "value": "0x1C"
                        },
                        {
                            "text": this.context.t("menu.wonderecho_word.28"),
                            "value": "0x1D"
                        },
                        {
                            "text": this.context.t("menu.wonderecho_word.29"),
                            "value": "0x1E"
                        },
                        {
                            "text": this.context.t("menu.wonderecho_word.30"),
                            "value": "0x1F"
                        },
                        {
                            "text": this.context.t("menu.wonderecho_word.31"),
                            "value": "0x20"
                        },
                        {
                            "text": this.context.t("menu.wonderecho_word.32"),
                            "value": "0x21"
                        },
                        {
                            "text": this.context.t("menu.wonderecho_word.33"),
                            "value": "0x22"
                        },
                        {
                            "text": this.context.t("menu.wonderecho_word.34"),
                            "value": "0x23"
                        },
                        {
                            "text": this.context.t("menu.wonderecho_word.35"),
                            "value": "0x24"
                        },
                        {
                            "text": this.context.t("menu.wonderecho_word.36"),
                            "value": "0x25"
                        },
                        {
                            "text": this.context.t("menu.wonderecho_word.37"),
                            "value": "0x26"
                        },
                        {
                            "text": this.context.t("menu.wonderecho_word.38"),
                            "value": "0x27"
                        },
                        {
                            "text": this.context.t("menu.wonderecho_word.39"),
                            "value": "0x28"
                        },
                        {
                            "text": this.context.t("menu.wonderecho_word.40"),
                            "value": "0x29"
                        },
                        {
                            "text": this.context.t("menu.wonderecho_word.41"),
                            "value": "0x2A"
                        },
                        {
                            "text": this.context.t("menu.wonderecho_word.42"),
                            "value": "0x2B"
                        },
                        {
                            "text": this.context.t("menu.wonderecho_word.43"),
                            "value": "0x62"
                        },
                        {
                            "text": this.context.t("menu.wonderecho_word.44"),
                            "value": "0x63"
                        },
                        {
                            "text": this.context.t("menu.wonderecho_word.45"),
                            "value": "0x64"
                        },
                        {
                            "text": this.context.t("menu.wonderecho_word.46"),
                            "value": "0x65"
                        },
                        {
                            "text": this.context.t("menu.wonderecho_word.47"),
                            "value": "0x66"
                        },
                        {
                            "text": this.context.t("menu.wonderecho_word.48"),
                            "value": "0x67"
                        },
                        {
                            "text": this.context.t("menu.wonderecho_word.49"),
                            "value": "0x68"
                        },
                        {
                            "text": this.context.t("menu.wonderecho_word.50"),
                            "value": "0x69"
                        },
                        {
                            "text": this.context.t("menu.wonderecho_word.51"),
                            "value": "0x6A"
                        },
                        {
                            "text": this.context.t("menu.wonderecho_word.52"),
                            "value": "0x6B"
                        },
                        {
                            "text": this.context.t("menu.wonderecho_word.53"),
                            "value": "0x6C"
                        },
                        {
                            "text": this.context.t("menu.wonderecho_word.54"),
                            "value": "0x6D"
                        },
                        {
                            "text": this.context.t("menu.wonderecho_word.55"),
                            "value": "0x6E"
                        },
                        {
                            "text": this.context.t("menu.wonderecho_word.56"),
                            "value": "0x6F"
                        },
                        {
                            "text": this.context.t("menu.wonderecho_word.57"),
                            "value": "0x71"
                        },
                        {
                            "text": this.context.t("menu.wonderecho_word.58"),
                            "value": "0x72"
                        },
                        {
                            "text": this.context.t("menu.wonderecho_word.59"),
                            "value": "0x73"
                        },
                        {
                            "text": this.context.t("menu.wonderecho_word.60"),
                            "value": "0x74"
                        },
                        {
                            "text": this.context.t("menu.wonderecho_word.61"),
                            "value": "0x75"
                        },
                        {
                            "text": this.context.t("menu.wonderecho_word.62"),
                            "value": "0x76"
                        },
                        {
                            "text": this.context.t("menu.wonderecho_word.63"),
                            "value": "0x77"
                        },
                        {
                            "text": this.context.t("menu.wonderecho_word.64"),
                            "value": "0x78"
                        },
                        {
                            "text": this.context.t("menu.wonderecho_word.65"),
                            "value": "0x79"
                        },
                        {
                            "text": this.context.t("menu.wonderecho_word.66"),
                            "value": "0x7A"
                        },
                        {
                            "text": this.context.t("menu.wonderecho_word.67"),
                            "value": "0x7B"
                        },
                        {
                            "text": this.context.t("menu.wonderecho_word.68"),
                            "value": "0x7C"
                        }
                    ]
                },
                "wonderecho_speech_word": {
                    "acceptReporters": false,
                    "items": [
                        {
                            "text": this.context.t("menu.wonderecho_speech_word.0"),
                            "value": "1"
                        },
                        {
                            "text": this.context.t("menu.wonderecho_speech_word.1"),
                            "value": "2"
                        },
                        {
                            "text": this.context.t("menu.wonderecho_speech_word.2"),
                            "value": "3"
                        },
                        {
                            "text": this.context.t("menu.wonderecho_speech_word.3"),
                            "value": "4"
                        },
                        {
                            "text": this.context.t("menu.wonderecho_speech_word.4"),
                            "value": "5"
                        },
                        {
                            "text": this.context.t("menu.wonderecho_speech_word.5"),
                            "value": "6"
                        },
                        {
                            "text": this.context.t("menu.wonderecho_speech_word.6"),
                            "value": "7"
                        },
                        {
                            "text": this.context.t("menu.wonderecho_speech_word.7"),
                            "value": "8"
                        },
                        {
                            "text": this.context.t("menu.wonderecho_speech_word.8"),
                            "value": "9"
                        },
                        {
                            "text": this.context.t("menu.wonderecho_speech_word.9"),
                            "value": "0xA"
                        },
                        {
                            "text": this.context.t("menu.wonderecho_speech_word.10"),
                            "value": "0xB"
                        },
                        {
                            "text": this.context.t("menu.wonderecho_speech_word.11"),
                            "value": "0xC"
                        },
                        {
                            "text": this.context.t("menu.wonderecho_speech_word.12"),
                            "value": "0xD"
                        },
                        {
                            "text": this.context.t("menu.wonderecho_speech_word.13"),
                            "value": "0xE"
                        },
                        {
                            "text": this.context.t("menu.wonderecho_speech_word.14"),
                            "value": "0xF"
                        },
                        {
                            "text": this.context.t("menu.wonderecho_speech_word.15"),
                            "value": "0x10"
                        },
                        {
                            "text": this.context.t("menu.wonderecho_speech_word.16"),
                            "value": "0x11"
                        },
                        {
                            "text": this.context.t("menu.wonderecho_speech_word.17"),
                            "value": "0x12"
                        }
                    ]
                },
                "p4c5offline_color_config_param": {
                    "acceptReporters": false,
                    "items": [
                        {
                            "text": this.context.t("menu.p4c5offline_color_config_param.0"),
                            "value": "mode"
                        },
                        {
                            "text": this.context.t("menu.p4c5offline_color_config_param.1"),
                            "value": "registered_color_count"
                        }
                    ]
                },
                "p4c5offline_color_result": {
                    "acceptReporters": false,
                    "items": [
                        {
                            "text": this.context.t("menu.p4c5offline_color_result.0"),
                            "value": "index"
                        },
                        {
                            "text": this.context.t("menu.p4c5offline_color_result.1"),
                            "value": "x"
                        },
                        {
                            "text": this.context.t("menu.p4c5offline_color_result.2"),
                            "value": "y"
                        },
                        {
                            "text": this.context.t("menu.p4c5offline_color_result.3"),
                            "value": "width"
                        },
                        {
                            "text": this.context.t("menu.p4c5offline_color_result.4"),
                            "value": "height"
                        }
                    ]
                },
                "p4c5offline_line_result": {
                    "acceptReporters": false,
                    "items": [
                        {
                            "text": this.context.t("menu.p4c5offline_line_result.0"),
                            "value": "detected"
                        },
                        {
                            "text": this.context.t("menu.p4c5offline_line_result.1"),
                            "value": "start_x"
                        },
                        {
                            "text": this.context.t("menu.p4c5offline_line_result.2"),
                            "value": "start_y"
                        },
                        {
                            "text": this.context.t("menu.p4c5offline_line_result.3"),
                            "value": "end_x"
                        },
                        {
                            "text": this.context.t("menu.p4c5offline_line_result.4"),
                            "value": "end_y"
                        },
                        {
                            "text": this.context.t("menu.p4c5offline_line_result.5"),
                            "value": "angle_deg"
                        },
                        {
                            "text": this.context.t("menu.p4c5offline_line_result.6"),
                            "value": "offset"
                        }
                    ]
                },
                "p4c5_gesture_list": {
                    "acceptReporters": false,
                    "items": [
                        {
                            "text": this.context.t("menu.p4c5_gesture_list.0"),
                            "value": "one"
                        },
                        {
                            "text": this.context.t("menu.p4c5_gesture_list.1"),
                            "value": "two"
                        },
                        {
                            "text": this.context.t("menu.p4c5_gesture_list.2"),
                            "value": "three"
                        },
                        {
                            "text": this.context.t("menu.p4c5_gesture_list.3"),
                            "value": "four"
                        },
                        {
                            "text": this.context.t("menu.p4c5_gesture_list.4"),
                            "value": "five"
                        },
                        {
                            "text": this.context.t("menu.p4c5_gesture_list.5"),
                            "value": "like"
                        },
                        {
                            "text": this.context.t("menu.p4c5_gesture_list.6"),
                            "value": "dislike"
                        },
                        {
                            "text": this.context.t("menu.p4c5_gesture_list.7"),
                            "value": "ok"
                        },
                        {
                            "text": this.context.t("menu.p4c5_gesture_list.8"),
                            "value": "call"
                        },
                        {
                            "text": this.context.t("menu.p4c5_gesture_list.9"),
                            "value": "no_gesture"
                        }
                    ]
                },
                "p4c5offline_hand_gesture_result": {
                    "acceptReporters": false,
                    "items": [
                        {
                            "text": this.context.t("menu.p4c5offline_hand_gesture_result.0"),
                            "value": "gesture_id"
                        },
                        {
                            "text": this.context.t("menu.p4c5offline_hand_gesture_result.1"),
                            "value": "gesture"
                        },
                        {
                            "text": this.context.t("menu.p4c5offline_hand_gesture_result.2"),
                            "value": "x"
                        },
                        {
                            "text": this.context.t("menu.p4c5offline_hand_gesture_result.3"),
                            "value": "y"
                        },
                        {
                            "text": this.context.t("menu.p4c5offline_hand_gesture_result.4"),
                            "value": "width"
                        },
                        {
                            "text": this.context.t("menu.p4c5offline_hand_gesture_result.5"),
                            "value": "height"
                        }
                    ]
                },
                "p4c5offline_apriltag_result": {
                    "acceptReporters": false,
                    "items": [
                        {
                            "text": this.context.t("menu.p4c5offline_apriltag_result.0"),
                            "value": "id"
                        },
                        {
                            "text": this.context.t("menu.p4c5offline_apriltag_result.1"),
                            "value": "x"
                        },
                        {
                            "text": this.context.t("menu.p4c5offline_apriltag_result.2"),
                            "value": "y"
                        },
                        {
                            "text": this.context.t("menu.p4c5offline_apriltag_result.3"),
                            "value": "width"
                        },
                        {
                            "text": this.context.t("menu.p4c5offline_apriltag_result.4"),
                            "value": "height"
                        },
                        {
                            "text": this.context.t("menu.p4c5offline_apriltag_result.5"),
                            "value": "rotation"
                        },
                        {
                            "text": this.context.t("menu.p4c5offline_apriltag_result.6"),
                            "value": "x_translation"
                        },
                        {
                            "text": this.context.t("menu.p4c5offline_apriltag_result.7"),
                            "value": "y_translation"
                        },
                        {
                            "text": this.context.t("menu.p4c5offline_apriltag_result.8"),
                            "value": "z_translation"
                        },
                        {
                            "text": this.context.t("menu.p4c5offline_apriltag_result.9"),
                            "value": "x_rotation"
                        },
                        {
                            "text": this.context.t("menu.p4c5offline_apriltag_result.10"),
                            "value": "y_rotation"
                        },
                        {
                            "text": this.context.t("menu.p4c5offline_apriltag_result.11"),
                            "value": "z_rotation"
                        }
                    ]
                },
                "p4c5offline_face_result": {
                    "acceptReporters": false,
                    "items": [
                        {
                            "text": this.context.t("menu.p4c5offline_face_result.0"),
                            "value": "index"
                        },
                        {
                            "text": this.context.t("menu.p4c5offline_face_result.1"),
                            "value": "x"
                        },
                        {
                            "text": this.context.t("menu.p4c5offline_face_result.2"),
                            "value": "y"
                        },
                        {
                            "text": this.context.t("menu.p4c5offline_face_result.3"),
                            "value": "width"
                        },
                        {
                            "text": this.context.t("menu.p4c5offline_face_result.4"),
                            "value": "height"
                        }
                    ]
                },
                "p4c5offline_animal_result": {
                    "acceptReporters": false,
                    "items": [
                        {
                            "text": this.context.t("menu.p4c5offline_animal_result.0"),
                            "value": "x"
                        },
                        {
                            "text": this.context.t("menu.p4c5offline_animal_result.1"),
                            "value": "y"
                        },
                        {
                            "text": this.context.t("menu.p4c5offline_animal_result.2"),
                            "value": "width"
                        },
                        {
                            "text": this.context.t("menu.p4c5offline_animal_result.3"),
                            "value": "height"
                        }
                    ]
                },
                "p4c5offline_target_result": {
                    "acceptReporters": false,
                    "items": [
                        {
                            "text": this.context.t("menu.p4c5offline_target_result.0"),
                            "value": "0"
                        },
                        {
                            "text": this.context.t("menu.p4c5offline_target_result.1"),
                            "value": "1"
                        },
                        {
                            "text": this.context.t("menu.p4c5offline_target_result.2"),
                            "value": "2"
                        },
                        {
                            "text": this.context.t("menu.p4c5offline_target_result.3"),
                            "value": "3"
                        },
                        {
                            "text": this.context.t("menu.p4c5offline_target_result.4"),
                            "value": "4"
                        },
                        {
                            "text": this.context.t("menu.p4c5offline_target_result.5"),
                            "value": "14"
                        },
                        {
                            "text": this.context.t("menu.p4c5offline_target_result.6"),
                            "value": "15"
                        },
                        {
                            "text": this.context.t("menu.p4c5offline_target_result.7"),
                            "value": "16"
                        },
                        {
                            "text": this.context.t("menu.p4c5offline_target_result.8"),
                            "value": "17"
                        },
                        {
                            "text": this.context.t("menu.p4c5offline_target_result.9"),
                            "value": "18"
                        },
                        {
                            "text": this.context.t("menu.p4c5offline_target_result.10"),
                            "value": "19"
                        },
                        {
                            "text": this.context.t("menu.p4c5offline_target_result.11"),
                            "value": "24"
                        },
                        {
                            "text": this.context.t("menu.p4c5offline_target_result.12"),
                            "value": "25"
                        },
                        {
                            "text": this.context.t("menu.p4c5offline_target_result.13"),
                            "value": "39"
                        },
                        {
                            "text": this.context.t("menu.p4c5offline_target_result.14"),
                            "value": "46"
                        },
                        {
                            "text": this.context.t("menu.p4c5offline_target_result.15"),
                            "value": "47"
                        },
                        {
                            "text": this.context.t("menu.p4c5offline_target_result.16"),
                            "value": "56"
                        },
                        {
                            "text": this.context.t("menu.p4c5offline_target_result.17"),
                            "value": "58"
                        },
                        {
                            "text": this.context.t("menu.p4c5offline_target_result.18"),
                            "value": "62"
                        },
                        {
                            "text": this.context.t("menu.p4c5offline_target_result.19"),
                            "value": "63"
                        },
                        {
                            "text": this.context.t("menu.p4c5offline_target_result.20"),
                            "value": "64"
                        },
                        {
                            "text": this.context.t("menu.p4c5offline_target_result.21"),
                            "value": "66"
                        },
                        {
                            "text": this.context.t("menu.p4c5offline_target_result.22"),
                            "value": "67"
                        },
                        {
                            "text": this.context.t("menu.p4c5offline_target_result.23"),
                            "value": "73"
                        }
                    ]
                },
                "p4c5offline_pose_result": {
                    "acceptReporters": false,
                    "items": [
                        {
                            "text": this.context.t("menu.p4c5offline_pose_result.0"),
                            "value": "index"
                        },
                        {
                            "text": this.context.t("menu.p4c5offline_pose_result.1"),
                            "value": "x"
                        },
                        {
                            "text": this.context.t("menu.p4c5offline_pose_result.2"),
                            "value": "y"
                        },
                        {
                            "text": this.context.t("menu.p4c5offline_pose_result.3"),
                            "value": "width"
                        },
                        {
                            "text": this.context.t("menu.p4c5offline_pose_result.4"),
                            "value": "height"
                        }
                    ]
                },
                "person_keypoint_id_param": {
                    "acceptReporters": false,
                    "items": [
                        {
                            "text": this.context.t("menu.person_keypoint_id_param.0"),
                            "value": "0"
                        },
                        {
                            "text": this.context.t("menu.person_keypoint_id_param.1"),
                            "value": "1"
                        },
                        {
                            "text": this.context.t("menu.person_keypoint_id_param.2"),
                            "value": "2"
                        },
                        {
                            "text": this.context.t("menu.person_keypoint_id_param.3"),
                            "value": "3"
                        },
                        {
                            "text": this.context.t("menu.person_keypoint_id_param.4"),
                            "value": "4"
                        },
                        {
                            "text": this.context.t("menu.person_keypoint_id_param.5"),
                            "value": "5"
                        },
                        {
                            "text": this.context.t("menu.person_keypoint_id_param.6"),
                            "value": "6"
                        },
                        {
                            "text": this.context.t("menu.person_keypoint_id_param.7"),
                            "value": "7"
                        },
                        {
                            "text": this.context.t("menu.person_keypoint_id_param.8"),
                            "value": "8"
                        },
                        {
                            "text": this.context.t("menu.person_keypoint_id_param.9"),
                            "value": "9"
                        },
                        {
                            "text": this.context.t("menu.person_keypoint_id_param.10"),
                            "value": "10"
                        },
                        {
                            "text": this.context.t("menu.person_keypoint_id_param.11"),
                            "value": "11"
                        },
                        {
                            "text": this.context.t("menu.person_keypoint_id_param.12"),
                            "value": "12"
                        },
                        {
                            "text": this.context.t("menu.person_keypoint_id_param.13"),
                            "value": "13"
                        },
                        {
                            "text": this.context.t("menu.person_keypoint_id_param.14"),
                            "value": "14"
                        },
                        {
                            "text": this.context.t("menu.person_keypoint_id_param.15"),
                            "value": "15"
                        },
                        {
                            "text": this.context.t("menu.person_keypoint_id_param.16"),
                            "value": "16"
                        }
                    ]
                },
                "person_keypoint_param": {
                    "acceptReporters": false,
                    "items": [
                        {
                            "text": this.context.t("menu.person_keypoint_param.0"),
                            "value": "x"
                        },
                        {
                            "text": this.context.t("menu.person_keypoint_param.1"),
                            "value": "y"
                        }
                    ]
                },
                "p4c5offline_qrcode_result": {
                    "acceptReporters": false,
                    "items": [
                        {
                            "text": this.context.t("menu.p4c5offline_qrcode_result.0"),
                            "value": "id"
                        },
                        {
                            "text": this.context.t("menu.p4c5offline_qrcode_result.1"),
                            "value": "x"
                        },
                        {
                            "text": this.context.t("menu.p4c5offline_qrcode_result.2"),
                            "value": "y"
                        },
                        {
                            "text": this.context.t("menu.p4c5offline_qrcode_result.3"),
                            "value": "width"
                        },
                        {
                            "text": this.context.t("menu.p4c5offline_qrcode_result.4"),
                            "value": "height"
                        },
                        {
                            "text": this.context.t("menu.p4c5offline_qrcode_result.5"),
                            "value": "text"
                        }
                    ]
                }
            },
            "blocks": [
                {
                    opcode: "p4c5_offline_init",
                    "blockType": "command",
                    "text": this.context.t("block.p4c5_offline_init"),
                    "arguments": {}
                },
                {
                    "subCategory": this.context.t("group.1")
                },
                {
                    opcode: "p4c5_offline_speech_update",
                    "blockType": "command",
                    "text": this.context.t("block.p4c5_offline_speech_update"),
                    "arguments": {}
                },
                {
                    opcode: "p4c5_offline_is_detect_speech",
                    "blockType": "Boolean",
                    "text": this.context.t("block.p4c5_offline_is_detect_speech"),
                    "isEdgeActivated": false,
                    "disableMonitor": true,
                    "arguments": {}
                },
                {
                    opcode: "p4c5_offline_is_detect_speech_name",
                    "blockType": "Boolean",
                    "text": this.context.t("block.p4c5_offline_is_detect_speech_name"),
                    "isEdgeActivated": false,
                    "disableMonitor": true,
                    "arguments": {
                        VALUE: {
                            "type": "string",
                            "defaultValue": "1",
                            "menu": "wonderecho_word",
                            "literal": true
                        }
                    }
                },
                {
                    opcode: "p4c5_offline_detect_speech_num",
                    "blockType": "reporter",
                    "text": this.context.t("block.p4c5_offline_detect_speech_num"),
                    "isEdgeActivated": false,
                    "disableMonitor": true,
                    "arguments": {}
                },
                {
                    opcode: "p4c5_offline_play_voice_prompt",
                    "blockType": "command",
                    "text": this.context.t("block.p4c5_offline_play_voice_prompt"),
                    "arguments": {
                        NAME: {
                            "type": "string",
                            "defaultValue": "1",
                            "menu": "wonderecho_speech_word",
                            "literal": true
                        }
                    }
                },
                {
                    opcode: "p4c5_offline_play_voice_prompt_num",
                    "blockType": "command",
                    "text": this.context.t("block.p4c5_offline_play_voice_prompt_num"),
                    "arguments": {
                        NUM: {
                            "type": "number",
                            "defaultValue": 1
                        }
                    }
                },
                {
                    "subCategory": this.context.t("group.8")
                },
                {
                    opcode: "p4c5_offline_color_update",
                    "blockType": "command",
                    "text": this.context.t("block.p4c5_offline_color_update"),
                    "arguments": {}
                },
                {
                    opcode: "p4c5_offline_get_color_config",
                    "blockType": "reporter",
                    "text": this.context.t("block.p4c5_offline_get_color_config"),
                    "isEdgeActivated": false,
                    "disableMonitor": true,
                    "arguments": {
                        VALUE: {
                            "type": "string",
                            "defaultValue": "mode",
                            "menu": "p4c5offline_color_config_param",
                            "literal": true
                        }
                    }
                },
                {
                    opcode: "p4c5_offline_set_color_mode",
                    "blockType": "command",
                    "text": this.context.t("block.p4c5_offline_set_color_mode"),
                    "arguments": {
                        TARGETS: {
                            "type": "string",
                            "defaultValue": " "
                        }
                    }
                },
                {
                    opcode: "p4c5_offline_is_detect_color",
                    "blockType": "Boolean",
                    "text": this.context.t("block.p4c5_offline_is_detect_color"),
                    "isEdgeActivated": false,
                    "disableMonitor": true,
                    "arguments": {}
                },
                {
                    opcode: "p4c5_offline_get_center_color_result",
                    "blockType": "reporter",
                    "text": this.context.t("block.p4c5_offline_get_center_color_result"),
                    "isEdgeActivated": false,
                    "disableMonitor": true,
                    "arguments": {
                        PARAM: {
                            "type": "string",
                            "defaultValue": "index",
                            "menu": "p4c5offline_color_result",
                            "literal": true
                        }
                    }
                },
                {
                    "subCategory": this.context.t("group.14")
                },
                {
                    opcode: "p4c5_offline_set_line_mode",
                    "blockType": "command",
                    "text": this.context.t("block.p4c5_offline_set_line_mode"),
                    "arguments": {
                        TARGETS: {
                            "type": "string",
                            "defaultValue": " "
                        }
                    }
                },
                {
                    opcode: "p4c5_offline_line_update",
                    "blockType": "command",
                    "text": this.context.t("block.p4c5_offline_line_update"),
                    "arguments": {}
                },
                {
                    opcode: "p4c5_offline_is_detect_line",
                    "blockType": "Boolean",
                    "text": this.context.t("block.p4c5_offline_is_detect_line"),
                    "isEdgeActivated": false,
                    "disableMonitor": true,
                    "arguments": {}
                },
                {
                    opcode: "p4c5_offline_get_center_line_result",
                    "blockType": "reporter",
                    "text": this.context.t("block.p4c5_offline_get_center_line_result"),
                    "isEdgeActivated": false,
                    "disableMonitor": true,
                    "arguments": {
                        PARAM: {
                            "type": "string",
                            "defaultValue": "detected",
                            "menu": "p4c5offline_line_result",
                            "literal": true
                        }
                    }
                },
                {
                    "subCategory": this.context.t("group.19")
                },
                {
                    opcode: "p4c5_offline_gesture_update",
                    "blockType": "command",
                    "text": this.context.t("block.p4c5_offline_gesture_update"),
                    "arguments": {}
                },
                {
                    opcode: "p4c5_offline_is_detect_gesture",
                    "blockType": "Boolean",
                    "text": this.context.t("block.p4c5_offline_is_detect_gesture"),
                    "isEdgeActivated": false,
                    "disableMonitor": true,
                    "arguments": {}
                },
                {
                    opcode: "p4c5_offline_is_detect_gesture_name",
                    "blockType": "Boolean",
                    "text": this.context.t("block.p4c5_offline_is_detect_gesture_name"),
                    "isEdgeActivated": false,
                    "disableMonitor": true,
                    "arguments": {
                        VALUE: {
                            "type": "string",
                            "defaultValue": "one",
                            "menu": "p4c5_gesture_list",
                            "literal": true
                        }
                    }
                },
                {
                    opcode: "p4c5_offline_get_center_gesture_result",
                    "blockType": "reporter",
                    "text": this.context.t("block.p4c5_offline_get_center_gesture_result"),
                    "isEdgeActivated": false,
                    "disableMonitor": true,
                    "arguments": {
                        PARAM: {
                            "type": "string",
                            "defaultValue": "gesture_id",
                            "menu": "p4c5offline_hand_gesture_result",
                            "literal": true
                        }
                    }
                },
                {
                    "subCategory": this.context.t("group.24")
                },
                {
                    opcode: "p4c5_offline_set_apriltag_family",
                    "blockType": "command",
                    "text": this.context.t("block.p4c5_offline_set_apriltag_family"),
                    "arguments": {
                        FAMILY: {
                            "type": "string",
                            "defaultValue": "36H11"
                        }
                    }
                },
                {
                    opcode: "p4c5_offline_apriltag_update",
                    "blockType": "command",
                    "text": this.context.t("block.p4c5_offline_apriltag_update"),
                    "arguments": {}
                },
                {
                    opcode: "p4c5_offline_is_detect_apriltag",
                    "blockType": "Boolean",
                    "text": this.context.t("block.p4c5_offline_is_detect_apriltag"),
                    "isEdgeActivated": false,
                    "disableMonitor": true,
                    "arguments": {}
                },
                {
                    opcode: "p4c5_offline_get_center_apriltag_result",
                    "blockType": "reporter",
                    "text": this.context.t("block.p4c5_offline_get_center_apriltag_result"),
                    "isEdgeActivated": false,
                    "disableMonitor": true,
                    "arguments": {
                        PARAM: {
                            "type": "string",
                            "defaultValue": "id",
                            "menu": "p4c5offline_apriltag_result",
                            "literal": true
                        }
                    }
                },
                {
                    "subCategory": this.context.t("group.29")
                },
                {
                    opcode: "p4c5_offline_face_update",
                    "blockType": "command",
                    "text": this.context.t("block.p4c5_offline_face_update"),
                    "arguments": {}
                },
                {
                    opcode: "p4c5_offline_is_detect_face",
                    "blockType": "Boolean",
                    "text": this.context.t("block.p4c5_offline_is_detect_face"),
                    "isEdgeActivated": false,
                    "disableMonitor": true,
                    "arguments": {}
                },
                {
                    opcode: "p4c5_offline_get_center_face_result",
                    "blockType": "reporter",
                    "text": this.context.t("block.p4c5_offline_get_center_face_result"),
                    "isEdgeActivated": false,
                    "disableMonitor": true,
                    "arguments": {
                        PARAM: {
                            "type": "string",
                            "defaultValue": "index",
                            "menu": "p4c5offline_face_result",
                            "literal": true
                        }
                    }
                },
                {
                    "subCategory": this.context.t("group.33")
                },
                {
                    opcode: "p4c5_offline_cat_update",
                    "blockType": "command",
                    "text": this.context.t("block.p4c5_offline_cat_update"),
                    "arguments": {}
                },
                {
                    opcode: "p4c5_offline_is_detect_cat",
                    "blockType": "Boolean",
                    "text": this.context.t("block.p4c5_offline_is_detect_cat"),
                    "isEdgeActivated": false,
                    "disableMonitor": true,
                    "arguments": {}
                },
                {
                    opcode: "p4c5_offline_get_center_cat_result",
                    "blockType": "reporter",
                    "text": this.context.t("block.p4c5_offline_get_center_cat_result"),
                    "isEdgeActivated": false,
                    "disableMonitor": true,
                    "arguments": {
                        PARAM: {
                            "type": "string",
                            "defaultValue": "x",
                            "menu": "p4c5offline_animal_result",
                            "literal": true
                        }
                    }
                },
                {
                    "subCategory": this.context.t("group.37")
                },
                {
                    opcode: "p4c5_offline_dog_update",
                    "blockType": "command",
                    "text": this.context.t("block.p4c5_offline_dog_update"),
                    "arguments": {}
                },
                {
                    opcode: "p4c5_offline_is_detect_dog",
                    "blockType": "Boolean",
                    "text": this.context.t("block.p4c5_offline_is_detect_dog"),
                    "isEdgeActivated": false,
                    "disableMonitor": true,
                    "arguments": {}
                },
                {
                    opcode: "p4c5_offline_get_center_dog_result",
                    "blockType": "reporter",
                    "text": this.context.t("block.p4c5_offline_get_center_dog_result"),
                    "isEdgeActivated": false,
                    "disableMonitor": true,
                    "arguments": {
                        PARAM: {
                            "type": "string",
                            "defaultValue": "x",
                            "menu": "p4c5offline_animal_result",
                            "literal": true
                        }
                    }
                },
                {
                    "subCategory": this.context.t("group.41")
                },
                {
                    opcode: "p4c5_offline_pedestrian_update",
                    "blockType": "command",
                    "text": this.context.t("block.p4c5_offline_pedestrian_update"),
                    "arguments": {}
                },
                {
                    opcode: "p4c5_offline_is_detect_pedestrian",
                    "blockType": "Boolean",
                    "text": this.context.t("block.p4c5_offline_is_detect_pedestrian"),
                    "isEdgeActivated": false,
                    "disableMonitor": true,
                    "arguments": {}
                },
                {
                    opcode: "p4c5_offline_get_center_pedestrian_result",
                    "blockType": "reporter",
                    "text": this.context.t("block.p4c5_offline_get_center_pedestrian_result"),
                    "isEdgeActivated": false,
                    "disableMonitor": true,
                    "arguments": {
                        PARAM: {
                            "type": "string",
                            "defaultValue": "index",
                            "menu": "p4c5offline_color_result",
                            "literal": true
                        }
                    }
                },
                {
                    "subCategory": this.context.t("group.45")
                },
                {
                    opcode: "p4c5_offline_target_update",
                    "blockType": "command",
                    "text": this.context.t("block.p4c5_offline_target_update"),
                    "arguments": {}
                },
                {
                    opcode: "p4c5_offline_is_detect_target",
                    "blockType": "Boolean",
                    "text": this.context.t("block.p4c5_offline_is_detect_target"),
                    "isEdgeActivated": false,
                    "disableMonitor": true,
                    "arguments": {}
                },
                {
                    opcode: "p4c5_offline_get_center_target_result_check",
                    "blockType": "Boolean",
                    "text": this.context.t("block.p4c5_offline_get_center_target_result_check"),
                    "isEdgeActivated": false,
                    "disableMonitor": true,
                    "arguments": {
                        VALUE: {
                            "type": "string",
                            "defaultValue": "0",
                            "menu": "p4c5offline_target_result",
                            "literal": true
                        }
                    }
                },
                {
                    opcode: "p4c5_offline_get_center_target_result",
                    "blockType": "reporter",
                    "text": this.context.t("block.p4c5_offline_get_center_target_result"),
                    "isEdgeActivated": false,
                    "disableMonitor": true,
                    "arguments": {
                        PARAM: {
                            "type": "string",
                            "defaultValue": "index",
                            "menu": "p4c5offline_color_result",
                            "literal": true
                        }
                    }
                },
                {
                    "subCategory": this.context.t("group.50")
                },
                {
                    opcode: "p4c5_offline_posture_update",
                    "blockType": "command",
                    "text": this.context.t("block.p4c5_offline_posture_update"),
                    "arguments": {}
                },
                {
                    opcode: "p4c5_offline_is_detect_posture",
                    "blockType": "Boolean",
                    "text": this.context.t("block.p4c5_offline_is_detect_posture"),
                    "isEdgeActivated": false,
                    "disableMonitor": true,
                    "arguments": {}
                },
                {
                    opcode: "p4c5_offline_get_center_posture_result",
                    "blockType": "reporter",
                    "text": this.context.t("block.p4c5_offline_get_center_posture_result"),
                    "isEdgeActivated": false,
                    "disableMonitor": true,
                    "arguments": {
                        PARAM: {
                            "type": "string",
                            "defaultValue": "index",
                            "menu": "p4c5offline_pose_result",
                            "literal": true
                        }
                    }
                },
                {
                    opcode: "p4c5_offline_get_center_posture_keypoint",
                    "blockType": "reporter",
                    "text": this.context.t("block.p4c5_offline_get_center_posture_keypoint"),
                    "isEdgeActivated": false,
                    "disableMonitor": true,
                    "arguments": {
                        VALUE: {
                            "type": "string",
                            "defaultValue": "0",
                            "menu": "person_keypoint_id_param",
                            "literal": true
                        },
                        PARAM: {
                            "type": "string",
                            "defaultValue": "x",
                            "menu": "person_keypoint_param",
                            "literal": true
                        }
                    }
                },
                {
                    "subCategory": this.context.t("group.55")
                },
                {
                    opcode: "p4c5_offline_qrcode_update",
                    "blockType": "command",
                    "text": this.context.t("block.p4c5_offline_qrcode_update"),
                    "arguments": {}
                },
                {
                    opcode: "p4c5_offline_is_detect_qrcode",
                    "blockType": "Boolean",
                    "text": this.context.t("block.p4c5_offline_is_detect_qrcode"),
                    "isEdgeActivated": false,
                    "disableMonitor": true,
                    "arguments": {}
                },
                {
                    opcode: "p4c5_offline_get_center_qrcode_result",
                    "blockType": "reporter",
                    "text": this.context.t("block.p4c5_offline_get_center_qrcode_result"),
                    "isEdgeActivated": false,
                    "disableMonitor": true,
                    "arguments": {
                        PARAM: {
                            "type": "string",
                            "defaultValue": "id",
                            "menu": "p4c5offline_qrcode_result",
                            "literal": true
                        }
                    }
                }
            ]
        };
    }

    // 离线结果更新、中心目标与关键点接口使用各自固定模式名称。
    getPython (): Record<string, PythonTemplate> {
        return {
            "p4c5_offline_init": {
                "template": "",
                "variables": [
                    "P4C5offline = Hiwonder.DEV_WonderLLM_P4C5_offline()"
                ],
                "imports": [
                    "import Hiwonder"
                ]
            },
            "p4c5_offline_speech_update": {
                "template": "P4C5offline.update(\"speech\")"
            },
            "p4c5_offline_is_detect_speech": {
                "template": "P4C5offline.result_available(\"speech\")"
            },
            "p4c5_offline_is_detect_speech_name": {
                "template": "P4C5offline.getResultValue(\"speech\", 0,\"data\") == {VALUE}"
            },
            "p4c5_offline_detect_speech_num": {
                "template": "P4C5offline.getResultValue(\"speech\", 0,\"data\")"
            },
            "p4c5_offline_play_voice_prompt": {
                "template": "P4C5offline.play_voice_prompt({NAME})"
            },
            "p4c5_offline_play_voice_prompt_num": {
                "template": "P4C5offline.play_voice_prompt({NUM})"
            },
            "p4c5_offline_color_update": {
                "template": "P4C5offline.update(\"color\")"
            },
            "p4c5_offline_get_color_config": {
                "template": "P4C5offline.get_color_config().get('{VALUE}')"
            },
            "p4c5_offline_set_color_mode": {
                "template": "P4C5offline.set_vision_mode(0, {TARGETS})"
            },
            "p4c5_offline_is_detect_color": {
                "template": "P4C5offline.result_available(\"color\")"
            },
            "p4c5_offline_get_center_color_result": {
                "template": "P4C5offline.getResultNearCenter(\"color\",\"{PARAM}\")"
            },
            "p4c5_offline_set_line_mode": {
                "template": "P4C5offline.set_vision_mode(1, {TARGETS})"
            },
            "p4c5_offline_line_update": {
                "template": "P4C5offline.update(\"line\")"
            },
            "p4c5_offline_is_detect_line": {
                "template": "P4C5offline.result_available(\"line\")"
            },
            "p4c5_offline_get_center_line_result": {
                "template": "P4C5offline.getResultValue(\"line\", 0, \"{PARAM}\")"
            },
            "p4c5_offline_gesture_update": {
                "template": "P4C5offline.update(\"hand_gesture\")"
            },
            "p4c5_offline_is_detect_gesture": {
                "template": "P4C5offline.result_available(\"hand_gesture\")"
            },
            "p4c5_offline_is_detect_gesture_name": {
                "template": "P4C5offline.getResultNearCenter(\"hand_gesture\",\"gesture\")==\"{VALUE}\""
            },
            "p4c5_offline_get_center_gesture_result": {
                "template": "P4C5offline.getResultNearCenter(\"hand_gesture\",\"{PARAM}\")"
            },
            "p4c5_offline_set_apriltag_family": {
                "template": "P4C5offline.set_apriltag_family({FAMILY})"
            },
            "p4c5_offline_apriltag_update": {
                "template": "P4C5offline.update(\"apriltag\")"
            },
            "p4c5_offline_is_detect_apriltag": {
                "template": "P4C5offline.result_available(\"apriltag\")"
            },
            "p4c5_offline_get_center_apriltag_result": {
                "template": "P4C5offline.getResultNearCenter(\"apriltag\",\"{PARAM}\")"
            },
            "p4c5_offline_face_update": {
                "template": "P4C5offline.update(\"face\")"
            },
            "p4c5_offline_is_detect_face": {
                "template": "P4C5offline.result_available(\"face\")"
            },
            "p4c5_offline_get_center_face_result": {
                "template": "P4C5offline.getResultNearCenter(\"face\",\"{PARAM}\")"
            },
            "p4c5_offline_cat_update": {
                "template": "P4C5offline.update(\"cat\")"
            },
            "p4c5_offline_is_detect_cat": {
                "template": "P4C5offline.result_available(\"cat\")"
            },
            "p4c5_offline_get_center_cat_result": {
                "template": "P4C5offline.getResultNearCenter(\"cat\",\"{PARAM}\")"
            },
            "p4c5_offline_dog_update": {
                "template": "P4C5offline.update(\"dog\")"
            },
            "p4c5_offline_is_detect_dog": {
                "template": "P4C5offline.result_available(\"dog\")"
            },
            "p4c5_offline_get_center_dog_result": {
                "template": "P4C5offline.getResultNearCenter(\"dog\",\"{PARAM}\")"
            },
            "p4c5_offline_pedestrian_update": {
                "template": "P4C5offline.update(\"pedestrian\")"
            },
            "p4c5_offline_is_detect_pedestrian": {
                "template": "P4C5offline.result_available(\"pedestrian\")"
            },
            "p4c5_offline_get_center_pedestrian_result": {
                "template": "P4C5offline.getResultNearCenter(\"pedestrian\",\"{PARAM}\")"
            },
            "p4c5_offline_target_update": {
                "template": "P4C5offline.update(\"yolo11n\")"
            },
            "p4c5_offline_is_detect_target": {
                "template": "P4C5offline.result_available(\"yolo11n\")"
            },
            "p4c5_offline_get_center_target_result_check": {
                "template": "P4C5offline.getResultNearCenter(\"yolo11n\",\"index\")=={VALUE}"
            },
            "p4c5_offline_get_center_target_result": {
                "template": "P4C5offline.getResultNearCenter(\"yolo11n\",\"{PARAM}\")"
            },
            "p4c5_offline_posture_update": {
                "template": "P4C5offline.update(\"pose\")"
            },
            "p4c5_offline_is_detect_posture": {
                "template": "P4C5offline.result_available(\"pose\")"
            },
            "p4c5_offline_get_center_posture_result": {
                "template": "P4C5offline.getResultNearCenter(\"pose\",\"{PARAM}\")"
            },
            "p4c5_offline_get_center_posture_keypoint": {
                "template": "P4C5offline.getPoseKeypointValue({VALUE},\"{PARAM}\")"
            },
            "p4c5_offline_qrcode_update": {
                "template": "P4C5offline.update(\"qrcode\")"
            },
            "p4c5_offline_is_detect_qrcode": {
                "template": "P4C5offline.result_available(\"qrcode\")"
            },
            "p4c5_offline_get_center_qrcode_result": {
                "template": "P4C5offline.getResultNearCenter(\"qrcode\",\"{PARAM}\")"
            }
        };
    }
}
