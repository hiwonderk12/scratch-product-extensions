// K230 作者入口：功能分组只改变侧栏，旧 opcode、主控分支及 Python 规则保持独立。
import type {ExtensionBlock, ExtensionContext, ExtensionInfo, NativeExtension, PythonTemplate} from '../../../../tools/sdk';

import locale0 from './locales/zh-cn.json';

import locale1 from './locales/en.json';

import locale2 from './locales/zh-tw.json';

import locale3 from './locales/ko.json';

export const messages = {
    "zh-cn": locale0,
    "en": locale1,
    "zh-tw": locale2,
    "ko": locale3
};

export const product = {name: 'product.name', supportedLocales: ['zh-cn', 'en', 'zh-tw', 'ko']} as const;

export default class K230VisionBlocks implements NativeExtension {
    constructor (private readonly context: ExtensionContext) {}

    // 板端使用 DEV_K230 + Port，驱动导入由初始化模板显式收集。
    private checkVariant (): void {
        if (!["hiwonder-dev-port","hiwonder-dev-dual-drive","hiwonder-dev-mecanum","hiwonder-dev-quadruped","hiwonder-dev-quadruped-pro","hiwonder-dev-hexa"].includes(this.context.variant)) {
            throw new Error('k230-vision: 未支持的主控适配 ' + this.context.variant);
        }
    }

    getInfo (): ExtensionInfo {
        this.checkVariant();
        const portMenu = this.context.variant === 'hiwonder-dev-port' ? 'aiblocks_iicport' : 'aimech_iicport';
        const menus: NonNullable<ExtensionInfo['menus']> = {
            [portMenu]: {
                acceptReporters: false,
                items: this.context.ports('sensor.' + portMenu)
            },
            tts_person: {
                acceptReporters: false,
                items: [
                    {text: this.context.t('menu.tts_person.0'), value: "Cherry"},
                    {text: this.context.t('menu.tts_person.1'), value: "Dylan"},
                    {text: this.context.t('menu.tts_person.2'), value: "Elias"},
                    {text: this.context.t('menu.tts_person.3'), value: "Eric"},
                    {text: this.context.t('menu.tts_person.4'), value: "Ethan"},
                    {text: this.context.t('menu.tts_person.5'), value: "Jada"},
                    {text: this.context.t('menu.tts_person.6'), value: "Jennifer"},
                    {text: this.context.t('menu.tts_person.7'), value: "Katerina"},
                    {text: this.context.t('menu.tts_person.8'), value: "Kiki"},
                    {text: this.context.t('menu.tts_person.9'), value: "Li"},
                    {text: this.context.t('menu.tts_person.10'), value: "Marcus"},
                    {text: this.context.t('menu.tts_person.11'), value: "Nofish"},
                    {text: this.context.t('menu.tts_person.12'), value: "Peter"},
                    {text: this.context.t('menu.tts_person.13'), value: "Rocky"},
                    {text: this.context.t('menu.tts_person.14'), value: "Roy"},
                    {text: this.context.t('menu.tts_person.15'), value: "Ryan"},
                    {text: this.context.t('menu.tts_person.16'), value: "Sunny"},
                    {text: this.context.t('menu.tts_person.17'), value: "en_female_dacey_uranus_bigtts"},
                    {text: this.context.t('menu.tts_person.18'), value: "en_male_tim_uranus_bigtts"},
                    {text: this.context.t('menu.tts_person.19'), value: "zh_female_yingyujiaoxue_uranus_bigtts"},
                    {text: this.context.t('menu.tts_person.20'), value: "zh_female_vv_uranus_bigtts"},
                    {text: this.context.t('menu.tts_person.21'), value: "zh_male_m191_uranus_bigtts"},
                    {text: this.context.t('menu.tts_person.22'), value: "zh_female_peiqi_uranus_bigtts"},
                    {text: this.context.t('menu.tts_person.23'), value: "zh_male_ruyayichen_uranus_bigtts"},
                    {text: this.context.t('menu.tts_person.24'), value: "zh_female_xiaoxue_uranus_bigtts"},
                    {text: this.context.t('menu.tts_person.25'), value: "zh_male_liufei_uranus_bigtts"},
                    {text: this.context.t('menu.tts_person.26'), value: "zh_male_dayi_uranus_bigtts"},
                    {text: this.context.t('menu.tts_person.27'), value: "zh_female_xiaohe_uranus_bigtts"},
                    {text: this.context.t('menu.tts_person.28'), value: "zh_male_taocheng_uranus_bigtts"},
                    {text: this.context.t('menu.tts_person.29'), value: "zh_male_shaonianzixin_uranus_bigtts"},
                    {text: this.context.t('menu.tts_person.30'), value: "zh_female_sajiaoxuemei_uranus_bigtts"},
                    {text: this.context.t('menu.tts_person.31'), value: "zh_female_kefunvsheng_uranus_bigtts"},
                    {text: this.context.t('menu.tts_person.32'), value: "zh_female_liuchangnv_uranus_bigtts"},
                    {text: this.context.t('menu.tts_person.33'), value: "zh_female_qingxinnvsheng_uranus_bigtts"},
                    {text: this.context.t('menu.tts_person.34'), value: "zh_female_shuangkuaisisi_uranus_bigtts"},
                    {text: this.context.t('menu.tts_person.35'), value: "zh_male_sunwukong_uranus_bigtts"},
                    {text: this.context.t('menu.tts_person.36'), value: "zh_female_tianmeixiaoyuan_uranus_bigtts"},
                    {text: this.context.t('menu.tts_person.37'), value: "zh_female_tianmeitaozi_uranus_bigtts"},
                    {text: this.context.t('menu.tts_person.38'), value: "zh_female_cancan_uranus_bigtts"},
                    {text: this.context.t('menu.tts_person.39'), value: "zh_female_linjianvhai_uranus_bigtts"},
                    {text: this.context.t('menu.tts_person.40'), value: "zh_female_meilinvyou_uranus_bigtts"},
                    {text: this.context.t('menu.tts_person.41'), value: "zh_male_sophie_uranus_bigtts"},
                    {text: this.context.t('menu.tts_person.42'), value: "zh_female_jitangnv_uranus_bigtts"},
                    {text: this.context.t('menu.tts_person.43'), value: "zh_female_mizai_uranus_bigtts"}
                ]
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
                            menu: portMenu,
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
                    opcode: 'k230_tts_set_apikey', blockType: 'command', disableMonitor: true,
                    text: this.context.t('block.k230_tts_set_apikey'),
                    blockIconURI: this.context.asset('assets/k230.svg'),
                    arguments: {VALUE: {type: 'string', defaultValue: ' '}}
                },
                {
                    opcode: 'k230_tts_set_person', blockType: 'command', disableMonitor: true,
                    text: this.context.t('block.k230_tts_set_person'),
                    blockIconURI: this.context.asset('assets/k230.svg'),
                    arguments: {VALUE: {type: 'string', menu: 'tts_person', defaultValue: 'Cherry', literal: true}}
                },
                {
                    opcode: 'k230_tts_speak', blockType: 'command', disableMonitor: true,
                    text: this.context.t('block.k230_tts_speak'),
                    blockIconURI: this.context.asset('assets/k230.svg'),
                    arguments: {VALUE: {type: 'string', defaultValue: ' '}}
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
                            defaultValue: " "
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
                ...((this.context.variant === "hiwonder-dev-port" || this.context.variant === "hiwonder-dev-dual-drive" || this.context.variant === "hiwonder-dev-quadruped" || this.context.variant === "hiwonder-dev-quadruped-pro" || this.context.variant === "hiwonder-dev-hexa") ? [
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
                template: "k230.set_volume({VALUE})"
            },
            k230_set_wifi: {
                template: "k230.set_wifi({VALUE1},{VALUE2})"
            },
            k230_tts_set_apikey: {
                template: "k230.set_llm_key({VALUE})\nk230.set_speech_url('wss://hiwonder.cc/v1/audio/realtime/speech')"
            },
            // 音色名称采用固定协议常量，不读取随界面语言变化的菜单标签。
            k230_tts_set_person: {
                template: "k230.set_tts_voice(\"Cherry - 芊悦\", \"Cherry\")",
                templateSelector: {argument: 'VALUE', cases: {
                    "Cherry": "k230.set_tts_voice(\"Cherry - 芊悦\", \"Cherry\")",
                    "Dylan": "k230.set_tts_voice(\"Dylan - 北京晓东\", \"Dylan\")",
                    "Elias": "k230.set_tts_voice(\"Elias - 墨讲师\", \"Elias\")",
                    "Eric": "k230.set_tts_voice(\"Eric - 四川程川\", \"Eric\")",
                    "Ethan": "k230.set_tts_voice(\"Ethan - 晨煦\", \"Ethan\")",
                    "Jada": "k230.set_tts_voice(\"Jada - 上海阿珍\", \"Jada\")",
                    "Jennifer": "k230.set_tts_voice(\"Jennifer - 詹妮弗\", \"Jennifer\")",
                    "Katerina": "k230.set_tts_voice(\"Katerina - 卡捷琳娜\", \"Katerina\")",
                    "Kiki": "k230.set_tts_voice(\"Kiki - 粤语阿清\", \"Kiki\")",
                    "Li": "k230.set_tts_voice(\"Li - 南京老李\", \"Li\")",
                    "Marcus": "k230.set_tts_voice(\"Marcus - 陕西秦川\", \"Marcus\")",
                    "Nofish": "k230.set_tts_voice(\"Nofish - 不吃鱼\", \"Nofish\")",
                    "Peter": "k230.set_tts_voice(\"Peter - 天津李彼得\", \"Peter\")",
                    "Rocky": "k230.set_tts_voice(\"Rocky - 粤语阿强\", \"Rocky\")",
                    "Roy": "k230.set_tts_voice(\"Roy - 闽南阿杰\", \"Roy\")",
                    "Ryan": "k230.set_tts_voice(\"Ryan - 甜茶\", \"Ryan\")",
                    "Sunny": "k230.set_tts_voice(\"Sunny - 四川晴儿\", \"Sunny\")",
                    "en_female_dacey_uranus_bigtts": "k230.set_tts_voice(\"Dacey\", \"en_female_dacey_uranus_bigtts\")",
                    "en_male_tim_uranus_bigtts": "k230.set_tts_voice(\"Tim\", \"en_male_tim_uranus_bigtts\")",
                    "zh_female_yingyujiaoxue_uranus_bigtts": "k230.set_tts_voice(\"Tina老师 2.0\", \"zh_female_yingyujiaoxue_uranus_bigtts\")",
                    "zh_female_vv_uranus_bigtts": "k230.set_tts_voice(\"Vivi 2.0\", \"zh_female_vv_uranus_bigtts\")",
                    "zh_male_m191_uranus_bigtts": "k230.set_tts_voice(\"云舟 2.0\", \"zh_male_m191_uranus_bigtts\")",
                    "zh_female_peiqi_uranus_bigtts": "k230.set_tts_voice(\"佩奇猪 2.0\", \"zh_female_peiqi_uranus_bigtts\")",
                    "zh_male_ruyayichen_uranus_bigtts": "k230.set_tts_voice(\"儒雅逸辰 2.0\", \"zh_male_ruyayichen_uranus_bigtts\")",
                    "zh_female_xiaoxue_uranus_bigtts": "k230.set_tts_voice(\"儿童绘本 2.0\", \"zh_female_xiaoxue_uranus_bigtts\")",
                    "zh_male_liufei_uranus_bigtts": "k230.set_tts_voice(\"刘飞 2.0\", \"zh_male_liufei_uranus_bigtts\")",
                    "zh_male_dayi_uranus_bigtts": "k230.set_tts_voice(\"大壹 2.0\", \"zh_male_dayi_uranus_bigtts\")",
                    "zh_female_xiaohe_uranus_bigtts": "k230.set_tts_voice(\"小何 2.0\", \"zh_female_xiaohe_uranus_bigtts\")",
                    "zh_male_taocheng_uranus_bigtts": "k230.set_tts_voice(\"小天 2.0\", \"zh_male_taocheng_uranus_bigtts\")",
                    "zh_male_shaonianzixin_uranus_bigtts": "k230.set_tts_voice(\"少年梓辛/Brayan 2.0\", \"zh_male_shaonianzixin_uranus_bigtts\")",
                    "zh_female_sajiaoxuemei_uranus_bigtts": "k230.set_tts_voice(\"撒娇学妹 2.0\", \"zh_female_sajiaoxuemei_uranus_bigtts\")",
                    "zh_female_kefunvsheng_uranus_bigtts": "k230.set_tts_voice(\"暖阳女声 2.0\", \"zh_female_kefunvsheng_uranus_bigtts\")",
                    "zh_female_liuchangnv_uranus_bigtts": "k230.set_tts_voice(\"流畅女声 2.0\", \"zh_female_liuchangnv_uranus_bigtts\")",
                    "zh_female_qingxinnvsheng_uranus_bigtts": "k230.set_tts_voice(\"清新女声 2.0\", \"zh_female_qingxinnvsheng_uranus_bigtts\")",
                    "zh_female_shuangkuaisisi_uranus_bigtts": "k230.set_tts_voice(\"爽快思思 2.0\", \"zh_female_shuangkuaisisi_uranus_bigtts\")",
                    "zh_male_sunwukong_uranus_bigtts": "k230.set_tts_voice(\"猴哥 2.0\", \"zh_male_sunwukong_uranus_bigtts\")",
                    "zh_female_tianmeixiaoyuan_uranus_bigtts": "k230.set_tts_voice(\"甜美小源 2.0\", \"zh_female_tianmeixiaoyuan_uranus_bigtts\")",
                    "zh_female_tianmeitaozi_uranus_bigtts": "k230.set_tts_voice(\"甜美桃子 2.0\", \"zh_female_tianmeitaozi_uranus_bigtts\")",
                    "zh_female_cancan_uranus_bigtts": "k230.set_tts_voice(\"知性灿灿 2.0\", \"zh_female_cancan_uranus_bigtts\")",
                    "zh_female_linjianvhai_uranus_bigtts": "k230.set_tts_voice(\"邻家女孩 2.0\", \"zh_female_linjianvhai_uranus_bigtts\")",
                    "zh_female_meilinvyou_uranus_bigtts": "k230.set_tts_voice(\"魅力女友 2.0\", \"zh_female_meilinvyou_uranus_bigtts\")",
                    "zh_male_sophie_uranus_bigtts": "k230.set_tts_voice(\"魅力苏菲 2.0\", \"zh_male_sophie_uranus_bigtts\")",
                    "zh_female_jitangnv_uranus_bigtts": "k230.set_tts_voice(\"鸡汤女 2.0\", \"zh_female_jitangnv_uranus_bigtts\")",
                    "zh_female_mizai_uranus_bigtts": "k230.set_tts_voice(\"黑猫侦探社咪仔 2.0\", \"zh_female_mizai_uranus_bigtts\")"
                }}
            },
            k230_tts_speak: {template: "k230.tts_speak({VALUE})"},
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
