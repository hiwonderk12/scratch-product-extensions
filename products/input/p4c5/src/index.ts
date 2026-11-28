// P4C5 在线对话原生包；积木与模板独立维护，固定协议值不随界面语言变化。
import type {ExtensionContext, ExtensionInfo, NativeExtension, PythonTemplate} from '../../../../tools/sdk';
import zhCN from './locales/zh-cn.json';
import en from './locales/en.json';
import zhTW from './locales/zh-tw.json';
import ko from './locales/ko.json';

export const messages = {'zh-cn': zhCN, en: en, 'zh-tw': zhTW, ko: ko} as const;
export const product = {name: 'product.name', supportedLocales: ['zh-cn', 'en', 'zh-tw', 'ko']} as const;

export default class P4C5Online implements NativeExtension {
    constructor (private readonly context: ExtensionContext) {}

    // 仅接受已登记的 AiDoggy 适配，其他主控不能借共享名字生成不同固件接口。
    getInfo (): ExtensionInfo {
        if (this.context.variant !== 'hiwonder-aidoggy') throw new Error('input/p4c5: 不支持此适配');
        return {
            id: "sensor",
            menuIconURI: this.context.asset("assets/sensor.png"),
            "name": this.context.t("product.name"),
            "color1": "#7B68EE",
            "color2": "#7B68EE",
            "color3": "#7B68EE",
            "menus": {
                "aidoggy_iicport": {acceptReporters: false, items: this.context.ports("sensor.aidoggy_iicport")},
                "aitv_set": {
                    "acceptReporters": false,
                    "items": [
                        {
                            "text": this.context.t("menu.aitv_set.0"),
                            "value": "0"
                        },
                        {
                            "text": this.context.t("menu.aitv_set.1"),
                            "value": "2"
                        }
                    ]
                },
                "aidoggy_mcp": {
                    "acceptReporters": false,
                    "items": [
                        {
                            "text": this.context.t("menu.aidoggy_mcp.0"),
                            "value": "1"
                        },
                        {
                            "text": this.context.t("menu.aidoggy_mcp.1"),
                            "value": "2"
                        },
                        {
                            "text": this.context.t("menu.aidoggy_mcp.2"),
                            "value": "3"
                        },
                        {
                            "text": this.context.t("menu.aidoggy_mcp.3"),
                            "value": "4"
                        },
                        {
                            "text": this.context.t("menu.aidoggy_mcp.4"),
                            "value": "5"
                        },
                        {
                            "text": this.context.t("menu.aidoggy_mcp.5"),
                            "value": "6"
                        },
                        {
                            "text": this.context.t("menu.aidoggy_mcp.6"),
                            "value": "7"
                        }
                    ]
                },
                "trueorfalse": {
                    "acceptReporters": false,
                    "items": [
                        {
                            "text": this.context.t("menu.trueorfalse.0"),
                            "value": "true"
                        },
                        {
                            "text": this.context.t("menu.trueorfalse.1"),
                            "value": "false"
                        }
                    ]
                },
                "speak_llm": {
                    "acceptReporters": false,
                    "items": [
                        {
                            "text": this.context.t("menu.speak_llm.0"),
                            "value": "volcengine"
                        },
                        {
                            "text": this.context.t("menu.speak_llm.1"),
                            "value": "aliyun"
                        }
                    ]
                },
                "voice_person": {
                    "acceptReporters": false,
                    "items": [
                        {
                            "text": this.context.t("menu.voice_person.0"),
                            "value": "wanwanxiaohe"
                        },
                        {
                            "text": this.context.t("menu.voice_person.1"),
                            "value": "linjianvhai"
                        },
                        {
                            "text": this.context.t("menu.voice_person.2"),
                            "value": "yuanboxiaoshu"
                        },
                        {
                            "text": this.context.t("menu.voice_person.3"),
                            "value": "yangguangqingnian"
                        },
                        {
                            "text": this.context.t("menu.voice_person.4"),
                            "value": "wanqudashu"
                        },
                        {
                            "text": this.context.t("menu.voice_person.5"),
                            "value": "daimengchuanmei"
                        },
                        {
                            "text": this.context.t("menu.voice_person.6"),
                            "value": "guangzhoudege"
                        },
                        {
                            "text": this.context.t("menu.voice_person.7"),
                            "value": "beijingxiaoye"
                        },
                        {
                            "text": this.context.t("menu.voice_person.8"),
                            "value": "haoyuxiaoge"
                        },
                        {
                            "text": this.context.t("menu.voice_person.9"),
                            "value": "guangxiyuanzhou"
                        },
                        {
                            "text": this.context.t("menu.voice_person.10"),
                            "value": "meituojieer"
                        },
                        {
                            "text": this.context.t("menu.voice_person.11"),
                            "value": "yuzhouzixuan"
                        },
                        {
                            "text": this.context.t("menu.voice_person.12"),
                            "value": "gaolengyujie"
                        },
                        {
                            "text": this.context.t("menu.voice_person.13"),
                            "value": "aojiaobazong"
                        },
                        {
                            "text": this.context.t("menu.voice_person.14"),
                            "value": "meilinvyou"
                        },
                        {
                            "text": this.context.t("menu.voice_person.15"),
                            "value": "shenyeboke"
                        },
                        {
                            "text": this.context.t("menu.voice_person.16"),
                            "value": "roumeinvyou"
                        },
                        {
                            "text": this.context.t("menu.voice_person.17"),
                            "value": "sajiaoxuemei"
                        },
                        {
                            "text": this.context.t("menu.voice_person.18"),
                            "value": "shuangkuaisisi"
                        },
                        {
                            "text": this.context.t("menu.voice_person.19"),
                            "value": "jingqiangkanye"
                        },
                        {
                            "text": this.context.t("menu.voice_person.20"),
                            "value": "shaonianzhixin"
                        },
                        {
                            "text": this.context.t("menu.voice_person.21"),
                            "value": "wennuanahu"
                        },
                        {
                            "text": this.context.t("menu.voice_person.22"),
                            "value": "mengyatou"
                        }
                    ]
                },
                "ali_voice": {
                    "acceptReporters": false,
                    "items": [
                        {
                            "text": this.context.t("menu.ali_voice.0"),
                            "value": "longwan"
                        },
                        {
                            "text": this.context.t("menu.ali_voice.1"),
                            "value": "longcheng"
                        },
                        {
                            "text": this.context.t("menu.ali_voice.2"),
                            "value": "longhua"
                        },
                        {
                            "text": this.context.t("menu.ali_voice.3"),
                            "value": "longxiaochun"
                        },
                        {
                            "text": this.context.t("menu.ali_voice.4"),
                            "value": "longxiaxia"
                        },
                        {
                            "text": this.context.t("menu.ali_voice.5"),
                            "value": "longxiaocheng"
                        },
                        {
                            "text": this.context.t("menu.ali_voice.6"),
                            "value": "longxiaobai"
                        },
                        {
                            "text": this.context.t("menu.ali_voice.7"),
                            "value": "longlaotie"
                        },
                        {
                            "text": this.context.t("menu.ali_voice.8"),
                            "value": "longshu"
                        },
                        {
                            "text": this.context.t("menu.ali_voice.9"),
                            "value": "longshuo"
                        },
                        {
                            "text": this.context.t("menu.ali_voice.10"),
                            "value": "longjing"
                        },
                        {
                            "text": this.context.t("menu.ali_voice.11"),
                            "value": "longmiao"
                        },
                        {
                            "text": this.context.t("menu.ali_voice.12"),
                            "value": "longyue"
                        },
                        {
                            "text": this.context.t("menu.ali_voice.13"),
                            "value": "longyuan"
                        },
                        {
                            "text": this.context.t("menu.ali_voice.14"),
                            "value": "longfei"
                        },
                        {
                            "text": this.context.t("menu.ali_voice.15"),
                            "value": "Stella"
                        },
                        {
                            "text": this.context.t("menu.ali_voice.16"),
                            "value": "Bella"
                        },
                        {
                            "text": this.context.t("menu.ali_voice.17"),
                            "value": "hanyunv"
                        },
                        {
                            "text": this.context.t("menu.ali_voice.18"),
                            "value": "riyunv"
                        }
                    ]
                },
                "aitv_actions": {
                    "acceptReporters": false,
                    "items": [
                        {
                            "text": this.context.t("menu.aitv_actions.0"),
                            "value": "0"
                        },
                        {
                            "text": this.context.t("menu.aitv_actions.1"),
                            "value": "1"
                        },
                        {
                            "text": this.context.t("menu.aitv_actions.2"),
                            "value": "2"
                        }
                    ]
                },
                "aidoggy_mcp_names": {
                    "acceptReporters": false,
                    "items": [
                        {
                            "text": this.context.t("menu.aidoggy_mcp_names.0"),
                            "value": "robot_move"
                        },
                        {
                            "text": this.context.t("menu.aidoggy_mcp_names.1"),
                            "value": "robot_action"
                        },
                        {
                            "text": this.context.t("menu.aidoggy_mcp_names.2"),
                            "value": "buzzer"
                        },
                        {
                            "text": this.context.t("menu.aidoggy_mcp_names.3"),
                            "value": "arm_action"
                        },
                        {
                            "text": this.context.t("menu.aidoggy_mcp_names.4"),
                            "value": "body_offset"
                        },
                        {
                            "text": this.context.t("menu.aidoggy_mcp_names.5"),
                            "value": "body_angle"
                        },
                        {
                            "text": this.context.t("menu.aidoggy_mcp_names.6"),
                            "value": "robot_status"
                        }
                    ]
                },
                "aidoggy_move_args": {
                    "acceptReporters": false,
                    "items": [
                        {
                            "text": this.context.t("menu.aidoggy_move_args.0"),
                            "value": "go"
                        },
                        {
                            "text": this.context.t("menu.aidoggy_move_args.1"),
                            "value": "turn"
                        },
                        {
                            "text": this.context.t("menu.aidoggy_move_args.2"),
                            "value": "duration"
                        }
                    ]
                },
                "aidoggy_go_args": {
                    "acceptReporters": false,
                    "items": [
                        {
                            "text": this.context.t("menu.aidoggy_go_args.0"),
                            "value": "forward"
                        },
                        {
                            "text": this.context.t("menu.aidoggy_go_args.1"),
                            "value": "backward"
                        },
                        {
                            "text": this.context.t("menu.aidoggy_go_args.2"),
                            "value": "left"
                        },
                        {
                            "text": this.context.t("menu.aidoggy_go_args.3"),
                            "value": "right"
                        },
                        {
                            "text": this.context.t("menu.aidoggy_go_args.4"),
                            "value": "forward-left"
                        },
                        {
                            "text": this.context.t("menu.aidoggy_go_args.5"),
                            "value": "forward-right"
                        },
                        {
                            "text": this.context.t("menu.aidoggy_go_args.6"),
                            "value": "backward-left"
                        },
                        {
                            "text": this.context.t("menu.aidoggy_go_args.7"),
                            "value": "backward-right"
                        }
                    ]
                },
                "aidoggy_turn_args": {
                    "acceptReporters": false,
                    "items": [
                        {
                            "text": this.context.t("menu.aidoggy_turn_args.0"),
                            "value": "left"
                        },
                        {
                            "text": this.context.t("menu.aidoggy_turn_args.1"),
                            "value": "right"
                        }
                    ]
                },
                "aidoggy_buzzer_args": {
                    "acceptReporters": false,
                    "items": [
                        {
                            "text": this.context.t("menu.aidoggy_buzzer_args.0"),
                            "value": "freq"
                        },
                        {
                            "text": this.context.t("menu.aidoggy_buzzer_args.1"),
                            "value": "on_time"
                        },
                        {
                            "text": this.context.t("menu.aidoggy_buzzer_args.2"),
                            "value": "off_time"
                        },
                        {
                            "text": this.context.t("menu.aidoggy_buzzer_args.3"),
                            "value": "count"
                        }
                    ]
                },
                "aidoggy_arm_args": {
                    "acceptReporters": false,
                    "items": [
                        {
                            "text": this.context.t("menu.aidoggy_arm_args.0"),
                            "value": "grab"
                        },
                        {
                            "text": this.context.t("menu.aidoggy_arm_args.1"),
                            "value": "release"
                        },
                        {
                            "text": this.context.t("menu.aidoggy_arm_args.2"),
                            "value": "open"
                        },
                        {
                            "text": this.context.t("menu.aidoggy_arm_args.3"),
                            "value": "close"
                        }
                    ]
                },
                "aidoggy_body_offset_args": {
                    "acceptReporters": false,
                    "items": [
                        {
                            "text": this.context.t("menu.aidoggy_body_offset_args.0"),
                            "value": "body_x"
                        },
                        {
                            "text": this.context.t("menu.aidoggy_body_offset_args.1"),
                            "value": "body_y"
                        },
                        {
                            "text": this.context.t("menu.aidoggy_body_offset_args.2"),
                            "value": "height"
                        },
                        {
                            "text": this.context.t("menu.aidoggy_body_offset_args.3"),
                            "value": "duration"
                        }
                    ]
                },
                "aidoggy_body_angle_args": {
                    "acceptReporters": false,
                    "items": [
                        {
                            "text": this.context.t("menu.aidoggy_body_angle_args.0"),
                            "value": "pitch"
                        },
                        {
                            "text": this.context.t("menu.aidoggy_body_angle_args.1"),
                            "value": "yaw"
                        },
                        {
                            "text": this.context.t("menu.aidoggy_body_angle_args.2"),
                            "value": "roll"
                        },
                        {
                            "text": this.context.t("menu.aidoggy_body_angle_args.3"),
                            "value": "duration"
                        }
                    ]
                },
                "aidoggy_robot_status_args": {
                    "acceptReporters": false,
                    "items": [
                        {
                            "text": this.context.t("menu.aidoggy_robot_status_args.0"),
                            "value": "battery"
                        },
                        {
                            "text": this.context.t("menu.aidoggy_robot_status_args.1"),
                            "value": "imu"
                        }
                    ]
                }
            },
            "blocks": [
                {
                    opcode: "p4c5_aidoggy_init",
                    "blockType": "command",
                    "text": this.context.t("block.p4c5_aidoggy_init"),
                    "isEdgeActivated": false,
                    "arguments": {
                        PORT: {
                            "type": "string",
                            "defaultValue": this.context.defaultPort("p4c5_aidoggy_init", "PORT"),
                            "menu": "aidoggy_iicport",
                            "literal": true
                        }
                    }
                },
                {
                    opcode: "aitv_control",
                    "blockType": "command",
                    "text": this.context.t("block.aitv_control"),
                    "isEdgeActivated": false,
                    "arguments": {
                        CONTROL: {
                            "type": "string",
                            "defaultValue": "0",
                            "menu": "aitv_set",
                            "literal": true
                        }
                    }
                },
                {
                    opcode: "init_aidoggy_mcp_setting",
                    "blockType": "command",
                    "text": this.context.t("block.init_aidoggy_mcp_setting"),
                    "isEdgeActivated": false,
                    "arguments": {}
                },
                {
                    opcode: "aidoggy_mcps",
                    "blockType": "reporter",
                    "text": this.context.t("block.aidoggy_mcps"),
                    "isEdgeActivated": false,
                    "disableMonitor": true,
                    "arguments": {
                        CMD: {
                            "type": "string",
                            "defaultValue": "1",
                            "menu": "aidoggy_mcp",
                            "literal": true
                        }
                    }
                },
                {
                    opcode: "mcp_setting",
                    "blockType": "reporter",
                    "text": this.context.t("block.mcp_setting"),
                    "isEdgeActivated": false,
                    "disableMonitor": true,
                    "arguments": {
                        NAME: {
                            "type": "string",
                            "defaultValue": " "
                        },
                        COMMAND: {
                            "type": "largetext",
                            "defaultValue": " ",
                            "literal": true
                        },
                        CMDNAME: {
                            "type": "string",
                            "defaultValue": " "
                        },
                        PARAMS: {
                            "type": "largetext",
                            "defaultValue": " ",
                            "literal": true
                        },
                        BLOCK: {
                            "type": "string",
                            "defaultValue": "true",
                            "menu": "trueorfalse",
                            "literal": true
                        },
                        RETURN: {
                            "type": "string",
                            "defaultValue": "true",
                            "menu": "trueorfalse",
                            "literal": true
                        }
                    }
                },
                {
                    "subCategory": this.context.t("group.5")
                },
                {
                    opcode: "select_voice_model",
                    "blockType": "command",
                    "text": this.context.t("block.select_voice_model"),
                    "isEdgeActivated": false,
                    "arguments": {
                        MODEL: {
                            "type": "string",
                            "defaultValue": "volcengine",
                            "menu": "speak_llm",
                            "literal": true
                        }
                    }
                },
                {
                    opcode: "init_speech_setting",
                    "blockType": "command",
                    "text": this.context.t("block.init_speech_setting"),
                    "isEdgeActivated": false,
                    "arguments": {
                        APPID: {
                            "type": "string",
                            "defaultValue": " "
                        },
                        TOKEN: {
                            "type": "string",
                            "defaultValue": " "
                        }
                    }
                },
                {
                    opcode: "set_speech_person",
                    "blockType": "command",
                    "text": this.context.t("block.set_speech_person"),
                    "isEdgeActivated": false,
                    "arguments": {
                        PERSON: {
                            "type": "string",
                            "defaultValue": "wanwanxiaohe",
                            "menu": "voice_person",
                            "literal": true
                        }
                    }
                },
                {
                    opcode: "set_speech_person_ali",
                    "blockType": "command",
                    "text": this.context.t("block.set_speech_person_ali"),
                    "isEdgeActivated": false,
                    "arguments": {
                        PERSON: {
                            "type": "string",
                            "defaultValue": "longwan",
                            "menu": "ali_voice",
                            "literal": true
                        }
                    }
                },
                {
                    opcode: "set_speech_person_arg",
                    "blockType": "command",
                    "text": this.context.t("block.set_speech_person_arg"),
                    "isEdgeActivated": false,
                    "arguments": {
                        PERSON: {
                            "type": "string",
                            "defaultValue": "zh_female_wanwanxiaohe_moon_bigtts"
                        }
                    }
                },
                {
                    opcode: "speech_text",
                    "blockType": "command",
                    "text": this.context.t("block.speech_text"),
                    "isEdgeActivated": false,
                    "arguments": {
                        TEXT: {
                            "type": "string",
                            "defaultValue": " "
                        }
                    }
                },
                {
                    opcode: "abort_llm",
                    "blockType": "command",
                    "text": this.context.t("block.abort_llm"),
                    "isEdgeActivated": false,
                    "arguments": {}
                },
                {
                    "subCategory": this.context.t("group.13")
                },
                {
                    opcode: "vision_text",
                    "blockType": "command",
                    "text": this.context.t("block.vision_text"),
                    "isEdgeActivated": false,
                    "arguments": {
                        TEXT: {
                            "type": "largetext",
                            "defaultValue": " ",
                            "literal": true
                        }
                    }
                },
                {
                    "subCategory": this.context.t("group.15")
                },
                {
                    opcode: "aitv_send_msg",
                    "blockType": "command",
                    "text": this.context.t("block.aitv_send_msg"),
                    "isEdgeActivated": false,
                    "arguments": {
                        VALUE: {
                            "type": "string",
                            "defaultValue": " "
                        }
                    }
                },
                {
                    opcode: "aitv_send_action",
                    "blockType": "command",
                    "text": this.context.t("block.aitv_send_action"),
                    "isEdgeActivated": false,
                    "arguments": {
                        ACTION: {
                            "type": "string",
                            "defaultValue": "0",
                            "menu": "aitv_actions",
                            "literal": true
                        }
                    }
                },
                {
                    opcode: "aitv_send_status",
                    "blockType": "command",
                    "text": this.context.t("block.aitv_send_status"),
                    "isEdgeActivated": false,
                    "arguments": {
                        VALUE: {
                            "type": "string",
                            "defaultValue": " "
                        }
                    }
                },
                {
                    "subCategory": this.context.t("group.19")
                },
                {
                    opcode: "get_aitv_message",
                    "blockType": "reporter",
                    "text": this.context.t("block.get_aitv_message"),
                    "isEdgeActivated": false,
                    "disableMonitor": true,
                    "arguments": {}
                },
                {
                    opcode: "get_aitv_status",
                    "blockType": "reporter",
                    "text": this.context.t("block.get_aitv_status"),
                    "isEdgeActivated": false,
                    "disableMonitor": true,
                    "arguments": {}
                },
                {
                    opcode: "aidoggy_get_default_mcp_name",
                    "blockType": "Boolean",
                    "text": this.context.t("block.aidoggy_get_default_mcp_name"),
                    "isEdgeActivated": false,
                    "disableMonitor": true,
                    "arguments": {
                        RESULT: {
                            "type": "string",
                            "defaultValue": " "
                        },
                        VALUE: {
                            "type": "string",
                            "defaultValue": "robot_move",
                            "menu": "aidoggy_mcp_names",
                            "literal": true
                        }
                    }
                },
                {
                    opcode: "aidoggy_get_robot_move_args",
                    "blockType": "reporter",
                    "text": this.context.t("block.aidoggy_get_robot_move_args"),
                    "isEdgeActivated": false,
                    "disableMonitor": true,
                    "arguments": {
                        RESULT: {
                            "type": "string",
                            "defaultValue": " "
                        },
                        VALUE: {
                            "type": "string",
                            "defaultValue": "go",
                            "menu": "aidoggy_move_args",
                            "literal": true
                        }
                    }
                },
                {
                    opcode: "aidoggy_get_robot_go_args",
                    "blockType": "reporter",
                    "text": this.context.t("block.aidoggy_get_robot_go_args"),
                    "isEdgeActivated": false,
                    "disableMonitor": true,
                    "arguments": {
                        VALUE: {
                            "type": "string",
                            "defaultValue": "forward",
                            "menu": "aidoggy_go_args",
                            "literal": true
                        }
                    }
                },
                {
                    opcode: "aidoggy_get_robot_turn_args",
                    "blockType": "reporter",
                    "text": this.context.t("block.aidoggy_get_robot_turn_args"),
                    "isEdgeActivated": false,
                    "disableMonitor": true,
                    "arguments": {
                        VALUE: {
                            "type": "string",
                            "defaultValue": "left",
                            "menu": "aidoggy_turn_args",
                            "literal": true
                        }
                    }
                },
                {
                    opcode: "aidoggy_get_robot_action_args",
                    "blockType": "reporter",
                    "text": this.context.t("block.aidoggy_get_robot_action_args"),
                    "isEdgeActivated": false,
                    "disableMonitor": true,
                    "arguments": {
                        RESULT: {
                            "type": "string",
                            "defaultValue": " "
                        }
                    }
                },
                {
                    opcode: "aidoggy_get_buzzer_args",
                    "blockType": "reporter",
                    "text": this.context.t("block.aidoggy_get_buzzer_args"),
                    "isEdgeActivated": false,
                    "disableMonitor": true,
                    "arguments": {
                        RESULT: {
                            "type": "string",
                            "defaultValue": " "
                        },
                        VALUE: {
                            "type": "string",
                            "defaultValue": "freq",
                            "menu": "aidoggy_buzzer_args",
                            "literal": true
                        }
                    }
                },
                {
                    opcode: "aidoggy_get_arm_args",
                    "blockType": "Boolean",
                    "text": this.context.t("block.aidoggy_get_arm_args"),
                    "isEdgeActivated": false,
                    "disableMonitor": true,
                    "arguments": {
                        RESULT: {
                            "type": "string",
                            "defaultValue": " "
                        },
                        VALUE: {
                            "type": "string",
                            "defaultValue": "grab",
                            "menu": "aidoggy_arm_args",
                            "literal": true
                        }
                    }
                },
                {
                    opcode: "aidoggy_get_body_offset_args",
                    "blockType": "reporter",
                    "text": this.context.t("block.aidoggy_get_body_offset_args"),
                    "isEdgeActivated": false,
                    "disableMonitor": true,
                    "arguments": {
                        RESULT: {
                            "type": "string",
                            "defaultValue": " "
                        },
                        VALUE: {
                            "type": "string",
                            "defaultValue": "body_x",
                            "menu": "aidoggy_body_offset_args",
                            "literal": true
                        }
                    }
                },
                {
                    opcode: "aidoggy_get_body_angle_args",
                    "blockType": "reporter",
                    "text": this.context.t("block.aidoggy_get_body_angle_args"),
                    "isEdgeActivated": false,
                    "disableMonitor": true,
                    "arguments": {
                        RESULT: {
                            "type": "string",
                            "defaultValue": " "
                        },
                        VALUE: {
                            "type": "string",
                            "defaultValue": "pitch",
                            "menu": "aidoggy_body_angle_args",
                            "literal": true
                        }
                    }
                },
                {
                    opcode: "aidoggy_get_robot_status_args",
                    "blockType": "Boolean",
                    "text": this.context.t("block.aidoggy_get_robot_status_args"),
                    "isEdgeActivated": false,
                    "disableMonitor": true,
                    "arguments": {
                        RESULT: {
                            "type": "string",
                            "defaultValue": " "
                        },
                        VALUE: {
                            "type": "string",
                            "defaultValue": "battery",
                            "menu": "aidoggy_robot_status_args",
                            "literal": true
                        }
                    }
                },
                {
                    opcode: "aidoggy_send_imu",
                    "blockType": "command",
                    "text": this.context.t("block.aidoggy_send_imu"),
                    "isEdgeActivated": false,
                    "disableMonitor": true,
                    "arguments": {}
                },
                {
                    opcode: "aidoggy_send_battery",
                    "blockType": "command",
                    "text": this.context.t("block.aidoggy_send_battery"),
                    "isEdgeActivated": false,
                    "disableMonitor": true,
                    "arguments": {}
                }
            ]
        };
    }

    // 初始化的启动尾语句由宿主按声明延迟到最后一个 MCP 配置之后。
    getPython (): Record<string, PythonTemplate> {
        return {
            "p4c5_aidoggy_init": {
                "template": "",
                "imports": [
                    "import Hiwonder"
                ],
                "variables": [
                    "AiBlock_LLM = Hiwonder.DEV_WonderLLM_P4C5()"
                ],
                "deferredEmission": {
                    "after": [
                        "sensor_init_aidoggy_mcp_setting",
                        "sensor_mcp_setting"
                    ],
                    "before": [
                        "sensor_p4c5_aidoggy_init"
                    ],
                    "template": "AiBlock_LLM.start()"
                }
            },
            "aitv_control": {
                "template": "",
                "templateSelector": {
                    "argument": "CONTROL",
                    "cases": {
                        "0": "AiBlock_LLM.stop()",
                        "1": "AiBlock_LLM.start()",
                        "2": "AiBlock_LLM.sleep()"
                    }
                }
            },
            "init_aidoggy_mcp_setting": {
                "template": "AiBlock_LLM.send_message(mcp_robot_move)\ntime.sleep(0.05)\nAiBlock_LLM.send_message(mcp_robot_action)\ntime.sleep(0.05)\nAiBlock_LLM.send_message(mcp_buzzer)\ntime.sleep(0.05)\nAiBlock_LLM.send_message(mcp_arm_action)\ntime.sleep(0.05)\nAiBlock_LLM.send_message(mcp_body_offset)\ntime.sleep(0.05)\nAiBlock_LLM.send_message(mcp_body_angle)\ntime.sleep(0.05)\nAiBlock_LLM.send_message(mcp_robot_status)\ntime.sleep(0.05)",
                "variables": [
                    "mcp_robot_move = {\"tool_name\":\"robot_move\",\"command\":\"按方向和时间运动，不支持直接指定距离或速度。go仅可选字符串'None'不平移、forward前进、backward后退、left左平移、right右平移、forward-left、forward-right、backward-left、backward-right；turn仅可选字符串'None'不转弯、left左转、right右转。go和turn可组合，两者均为'None'时停止。平移分量固定120mm/s，转速固定80度/s，左转正、右转负。duration为整数毫秒，范围1~30000，省略或小于等于0时使用4000，超出30000截断为30000；未指定时间或步数时使用4000，步数按每步约350ms估算。运动时间结束自动停止。角度与距离只能按时间估算，不能保证精确到达。\",\"params\":[[\"robot_move\",\"string\",\"\"],[\"go\",\"string\"],[\"turn\",\"string\"],[\"duration\",\"int\"]],\"block\":\"true\",\"return\":\"false\"}",
                    "mcp_robot_action = {\"tool_name\":\"robot_action\",\"command\":\"执行内置动作组。action必须提供，使用以下名称，大小写一致：3axis_preset三轴旋转、action_pitch_preset俯仰、action_roll_preset横滚、action_yaw_preset偏航、squat_preset下蹲、waveMotion_preset波浪运动、pee_preset撒尿、sway_preset摆动、handshake握手、coquetry撒娇、go_prone趴下、happy_trot欢快小跑、head_rubbing蹭头、nod点头、shake_buttocks摇屁股、shake_head摇头、sit_down坐下、stretch_oneself伸懒腰、suspicious_tilt疑惑歪头、stand_preset站立复位、sitting_salute坐姿敬礼、sitting_wave_hand坐姿招手。按动作组内容执行，等待执行完毕后返回；不要使用列表外的名称。\",\"params\":[[\"robot_action\",\"int\",\"0\"],[\"action\",\"string\"]],\"block\":\"true\",\"return\":\"false\"}",
                    "mcp_buzzer = {\"tool_name\":\"buzzer\",\"command\":\"控制蜂鸣器。freq为频率Hz，on_time为单次鸣响毫秒，off_time为间隔毫秒，count为次数；四项均为0~65535的整数，禁止负数和超范围值。省略时分别默认1000、100、100、1。freq=0或count=0关闭；count=65535循环鸣响，on_time=0且freq非0表示持续鸣响。程序发送后等待500ms返回完成通知，不表示整个鸣响序列已结束。\",\"params\":[[\"buzzer\",\"string\",\"\"],[\"freq\",\"int\"],[\"on_time\",\"int\"],[\"off_time\",\"int\"],[\"count\",\"int\"]],\"block\":\"true\",\"return\":\"false\"}",
                    "mcp_arm_action = {\"tool_name\":\"arm_action\",\"command\":\"控制已安装的21~24号机械臂舵机。action必须提供，仅可选grab、release、open、close。grab在1000ms内将机械臂伸到夹取位置并张开夹爪，不自动闭合；close在500ms内关闭夹爪；release在1000ms内将机械臂恢复到收回位置，不自动张开夹爪；open在500ms内张开夹爪。抓取需依次grab、等待至少1000ms、close、等待至少500ms、release；放下物品需在目标放置位置调用open。位置和时间固定，不接受额外舵机位置参数。完成通知在命令发送后立即返回，动作间仍需等待对应时间，避免覆盖上一动作。\",\"params\":[[\"arm_action\",\"string\",\"\"],[\"action\",\"string\"]],\"block\":\"true\",\"return\":\"false\"}",
                    "mcp_body_offset = {\"tool_name\":\"body_offset\",\"command\":\"设置身体目标坐标偏移。body_x、body_y、height必须全部提供数值，单位mm，每项范围-30~30，超范围自动截断。数值为目标偏移，不是在原值上累加；0表示对应偏移复位。当前代码不接受缺失值、None或字符串'None'；只改一项时其余项需填写已知当前值，不能假设0表示保持。身体旋转角保持原值。duration为整数毫秒，默认500，范围0~65535，超范围由库截断。发送后立即返回完成通知，不等待姿态过渡结束。例如往前偏移10：{'body_offset':'','body_x':20,'body_y':0,'height':0,'duration': 500}\",\"params\":[[\"body_offset\",\"string\",\"\"],[\"body_x\",\"int\"],[\"body_y\",\"int\"],[\"height\",\"int\"],[\"duration\",\"int\"]],\"block\":\"true\",\"return\":\"false\"}",
                    "mcp_body_angle = {\"tool_name\":\"body_angle\",\"command\":\"设置身体目标姿态角，pitch为俯仰、roll为横滚、yaw为偏航，三项必须全部提供数值，单位度，每项范围-30~30，超范围自动截断。数值为目标角度，不是在原值上累加；0表示对应角度复位。当前代码不接受缺失值、None或字符串'None'；只改一项时其余项需填写已知当前值，不能假设0表示保持。身体坐标偏移和高度保持原值。duration为整数毫秒，默认500，范围0~65535，超范围由库截断。发送后立即返回完成通知，不等待姿态过渡结束。例如前倾：{'body_angle':'','pitch':20,'roll':0,'yaw':0,'duration': 500}\",\"params\":[[\"body_angle\",\"string\",\"\"],[\"pitch\",\"int\"],[\"roll\",\"int\"],[\"yaw\",\"int\"],[\"duration\",\"int\"]],\"block\":\"true\",\"return\":\"false\"}",
                    "mcp_robot_status = {\"tool_name\":\"robot_status\",\"command\":\"获取机器狗实时状态。get_status可选battery读取电池电压、imu读取IMU姿态，也可同时传入battery,imu。battery单位mV；imu返回heading、pitch、roll，单位为度。仅支持读取，不支持设置或校准。\",\"params\":[[\"robot_status\",\"string\",\"\"],[\"get_status\",\"string\"]],\"block\":\"true\",\"return\":\"true\"}"
                ],
                "imports": [
                    "import time"
                ]
            },
            "aidoggy_mcps": {
                "template": "mcp_robot_move",
                "templateSelector": {
                    "argument": "CMD",
                    "cases": {
                        "1": "mcp_robot_move",
                        "2": "mcp_robot_action",
                        "3": "mcp_buzzer",
                        "4": "mcp_arm_action",
                        "5": "mcp_body_offset",
                        "6": "mcp_body_angle",
                        "7": "mcp_robot_status"
                    },
                    "variableCases": {
                        "1": [
                            "mcp_robot_move = {\"tool_name\":\"robot_move\",\"command\":\"按方向和时间运动，不支持直接指定距离或速度。go仅可选字符串'None'不平移、forward前进、backward后退、left左平移、right右平移、forward-left、forward-right、backward-left、backward-right；turn仅可选字符串'None'不转弯、left左转、right右转。go和turn可组合，两者均为'None'时停止。平移分量固定120mm/s，转速固定80度/s，左转正、右转负。duration为整数毫秒，范围1~30000，省略或小于等于0时使用4000，超出30000截断为30000；未指定时间或步数时使用4000，步数按每步约350ms估算。运动时间结束自动停止。角度与距离只能按时间估算，不能保证精确到达。\",\"params\":[[\"robot_move\",\"string\",\"\"],[\"go\",\"string\"],[\"turn\",\"string\"],[\"duration\",\"int\"]],\"block\":\"true\",\"return\":\"false\"}"
                        ],
                        "2": [
                            "mcp_robot_action = {\"tool_name\":\"robot_action\",\"command\":\"执行内置动作组。action必须提供，使用以下名称，大小写一致：3axis_preset三轴旋转、action_pitch_preset俯仰、action_roll_preset横滚、action_yaw_preset偏航、squat_preset下蹲、waveMotion_preset波浪运动、pee_preset撒尿、sway_preset摆动、handshake握手、coquetry撒娇、go_prone趴下、happy_trot欢快小跑、head_rubbing蹭头、nod点头、shake_buttocks摇屁股、shake_head摇头、sit_down坐下、stretch_oneself伸懒腰、suspicious_tilt疑惑歪头、stand_preset站立复位、sitting_salute坐姿敬礼、sitting_wave_hand坐姿招手。按动作组内容执行，等待执行完毕后返回；不要使用列表外的名称。\",\"params\":[[\"robot_action\",\"int\",\"0\"],[\"action\",\"string\"]],\"block\":\"true\",\"return\":\"false\"}"
                        ],
                        "3": [
                            "mcp_buzzer = {\"tool_name\":\"buzzer\",\"command\":\"控制蜂鸣器。freq为频率Hz，on_time为单次鸣响毫秒，off_time为间隔毫秒，count为次数；四项均为0~65535的整数，禁止负数和超范围值。省略时分别默认1000、100、100、1。freq=0或count=0关闭；count=65535循环鸣响，on_time=0且freq非0表示持续鸣响。程序发送后等待500ms返回完成通知，不表示整个鸣响序列已结束。\",\"params\":[[\"buzzer\",\"string\",\"\"],[\"freq\",\"int\"],[\"on_time\",\"int\"],[\"off_time\",\"int\"],[\"count\",\"int\"]],\"block\":\"true\",\"return\":\"false\"}"
                        ],
                        "4": [
                            "mcp_arm_action = {\"tool_name\":\"arm_action\",\"command\":\"控制已安装的21~24号机械臂舵机。action必须提供，仅可选grab、release、open、close。grab在1000ms内将机械臂伸到夹取位置并张开夹爪，不自动闭合；close在500ms内关闭夹爪；release在1000ms内将机械臂恢复到收回位置，不自动张开夹爪；open在500ms内张开夹爪。抓取需依次grab、等待至少1000ms、close、等待至少500ms、release；放下物品需在目标放置位置调用open。位置和时间固定，不接受额外舵机位置参数。完成通知在命令发送后立即返回，动作间仍需等待对应时间，避免覆盖上一动作。\",\"params\":[[\"arm_action\",\"string\",\"\"],[\"action\",\"string\"]],\"block\":\"true\",\"return\":\"false\"}"
                        ],
                        "5": [
                            "mcp_body_offset = {\"tool_name\":\"body_offset\",\"command\":\"设置身体目标坐标偏移。body_x、body_y、height必须全部提供数值，单位mm，每项范围-30~30，超范围自动截断。数值为目标偏移，不是在原值上累加；0表示对应偏移复位。当前代码不接受缺失值、None或字符串'None'；只改一项时其余项需填写已知当前值，不能假设0表示保持。身体旋转角保持原值。duration为整数毫秒，默认500，范围0~65535，超范围由库截断。发送后立即返回完成通知，不等待姿态过渡结束。例如往前偏移10：{'body_offset':'','body_x':20,'body_y':0,'height':0,'duration': 500}\",\"params\":[[\"body_offset\",\"string\",\"\"],[\"body_x\",\"int\"],[\"body_y\",\"int\"],[\"height\",\"int\"],[\"duration\",\"int\"]],\"block\":\"true\",\"return\":\"false\"}"
                        ],
                        "6": [
                            "mcp_body_angle = {\"tool_name\":\"body_angle\",\"command\":\"设置身体目标姿态角，pitch为俯仰、roll为横滚、yaw为偏航，三项必须全部提供数值，单位度，每项范围-30~30，超范围自动截断。数值为目标角度，不是在原值上累加；0表示对应角度复位。当前代码不接受缺失值、None或字符串'None'；只改一项时其余项需填写已知当前值，不能假设0表示保持。身体坐标偏移和高度保持原值。duration为整数毫秒，默认500，范围0~65535，超范围由库截断。发送后立即返回完成通知，不等待姿态过渡结束。例如前倾：{'body_angle':'','pitch':20,'roll':0,'yaw':0,'duration': 500}\",\"params\":[[\"body_angle\",\"string\",\"\"],[\"pitch\",\"int\"],[\"roll\",\"int\"],[\"yaw\",\"int\"],[\"duration\",\"int\"]],\"block\":\"true\",\"return\":\"false\"}"
                        ],
                        "7": [
                            "mcp_robot_status = {\"tool_name\":\"robot_status\",\"command\":\"获取机器狗实时状态。get_status可选battery读取电池电压、imu读取IMU姿态，也可同时传入battery,imu。battery单位mV；imu返回heading、pitch、roll，单位为度。仅支持读取，不支持设置或校准。\",\"params\":[[\"robot_status\",\"string\",\"\"],[\"get_status\",\"string\"]],\"block\":\"true\",\"return\":\"true\"}"
                        ]
                    }
                }
            },
            "select_voice_model": {
                "template": "AiBlock_LLM.set_tts_model(\"{MODEL}\")"
            },
            "init_speech_setting": {
                "template": "AiBlock_LLM.send_message({\"command\":\"app_id\",\"params\":{APPID}})\ntime.sleep(0.05)\nAiBlock_LLM.send_message({\"command\":\"access_token\",\"params\":{TOKEN}})\ntime.sleep(0.05)",
                "imports": [
                    "import time"
                ]
            },
            "set_speech_person": {
                "template": "AiBlock_LLM.set_voice({PERSON.compactJson})"
            },
            "set_speech_person_ali": {
                "template": "AiBlock_LLM.set_voice({PERSON.compactJson})"
            },
            "set_speech_person_arg": {
                "template": "AiBlock_LLM.set_voice_direct({PERSON})"
            },
            "speech_text": {
                "template": "AiBlock_LLM.tts({TEXT})"
            },
            "abort_llm": {
                "template": "AiBlock_LLM.abort()"
            },
            "vision_text": {
                "template": "AiBlock_LLM.vision({TEXT.jsonValue})"
            },
            "aitv_send_msg": {
                "template": "AiBlock_LLM.send_message({VALUE})\ntime.sleep(0.05)",
                "imports": [
                    "import time"
                ]
            },
            "aitv_send_action": {
                "template": "",
                "templateSelector": {
                    "argument": "ACTION",
                    "cases": {
                        "0": "AiBlock_LLM.send_action_finish(\"true\")\ntime.sleep(0.05)",
                        "1": "AiBlock_LLM.send_message(AiBlock_LLM.en_message_text_out_dict)\ntime.sleep(0.05)",
                        "2": "AiBlock_LLM.send_message(AiBlock_LLM.di_message_text_out_dict)\ntime.sleep(0.05)"
                    }
                },
                "imports": [
                    "import time"
                ]
            },
            "aitv_send_status": {
                "template": "AiBlock_LLM.send_status({VALUE})"
            },
            "get_aitv_message": {
                "template": "AiBlock_LLM.get_message()"
            },
            "get_aitv_status": {
                "template": "AiBlock_LLM.status"
            },
            "aidoggy_get_default_mcp_name": {
                "template": "'{VALUE}' in {RESULT}"
            },
            "aidoggy_get_robot_move_args": {
                "template": "{RESULT}.get(\"{VALUE}\")"
            },
            "aidoggy_get_robot_go_args": {
                "template": "\"{VALUE}\""
            },
            "aidoggy_get_robot_turn_args": {
                "template": "\"{VALUE}\""
            },
            "aidoggy_get_robot_action_args": {
                "template": "{RESULT}.get(\"action\")"
            },
            "aidoggy_get_buzzer_args": {
                "template": "{RESULT}.get(\"{VALUE}\")"
            },
            "aidoggy_get_arm_args": {
                "template": "{RESULT}.get(\"action\") == \"{VALUE}\""
            },
            "aidoggy_get_body_offset_args": {
                "template": "{RESULT}.get(\"{VALUE}\")"
            },
            "aidoggy_get_body_angle_args": {
                "template": "{RESULT}.get(\"{VALUE}\")"
            },
            "aidoggy_get_robot_status_args": {
                "template": "'{VALUE}' in {RESULT}"
            },
            "aidoggy_send_imu": {
                "template": "AiBlock_LLM.send_message(imu.get_angle())\ntime.sleep(0.05)",
                "variables": [
                    "imu = Hiwonder.IMU()"
                ],
                "imports": [
                    "import Hiwonder",
                    "import time"
                ]
            },
            "aidoggy_send_battery": {
                "template": "AiBlock_LLM.send_message(rsys.read_battery_voltage())\ntime.sleep(0.05)",
                "variables": [
                    "rsys = Hiwonder.Robot_System()"
                ],
                "imports": [
                    "import Hiwonder",
                    "import time"
                ]
            },
            "mcp_setting": {
                "template": "{NAME.memberName}",
                "variables": [
                    "{NAME.memberName} = {\"tool_name\":{NAME},\"command\":{COMMAND.jsonValue},\"params\":{PARAMS.compactHead}[{CMDNAME}, \"string\"],{PARAMS.compactTail},\"block\":{BLOCK.jsonValue},\"return\":{RETURN.jsonValue}}"
                ]
            }
        };
    }
}
