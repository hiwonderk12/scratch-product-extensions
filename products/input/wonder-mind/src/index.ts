// WonderMind 单类维护积木、集中四语和 Python；五款现有主控共用旧版 MCP_Tools 接口。
import type {ExtensionContext, ExtensionInfo, NativeExtension, PythonTemplate} from '../../../../tools/sdk';

export const messages = {
    "zh-cn": {
        "product.name": "WonderMind",
        "menu.aitv_onOff.0": "打开",
        "menu.aitv_onOff.1": "关闭",
        "menu.aitv_onOff.2": "Standby",
        "menu.aitv_cmd.0": "Robot March",
        "menu.aitv_cmd.1": "Robot turns",
        "menu.aitv_cmd.2": "Set fan speed",
        "menu.aitv_cmd.3": "Set up RGB lights",
        "menu.aitv_cmd.4": "Set up dot matrix screen",
        "menu.aitv_cmd.5": "sensor data",
        "menu.aitv_cmd.6": "Ultrasonic detection",
        "menu.aitv_cmd.7": "battery voltage",
        "menu.aitv_cmd.8": "dialogue text",
        "menu.aitv_cmd.9": "Camera detection",
        "menu.aitv_cmd.10": "End of play",
        "menu.aitv_arg.0": "speed",
        "menu.aitv_arg.1": "Duration",
        "menu.aitv_arg.2": "Colorful mode",
        "menu.aitv_arg.3": "red channel",
        "menu.aitv_arg.4": "green channel",
        "menu.aitv_arg.5": "blue channel",
        "menu.aitv_arg.6": "brightness",
        "menu.aitv_arg.7": "text",
        "menu.aitv_arg.8": "angle",
        "menu.aitv_arg.9": "distance",
        "menu.trueorfalse.0": "Yes",
        "menu.trueorfalse.1": "No",
        "menu.aitv_mcp.0": "Robot travel control",
        "menu.aitv_mcp.1": "Robot steering control",
        "menu.aitv_mcp.2": "fan control",
        "menu.aitv_mcp.3": "Lantern module control",
        "menu.aitv_mcp.4": "LED dot matrix module control",
        "menu.aitv_mcp.5": "sensor data",
        "menu.aitv_actions.0": "Action end information",
        "menu.aitv_actions.1": "Enable conversation message output",
        "menu.aitv_actions.2": "Turn off conversation message output",
        "menu.speak_llm.0": "bean bag",
        "menu.speak_llm.1": "Ali",
        "block.aitv_aimech_init": "Initialization at port [PORT]",
        "block.init_mcp_setting": "Perform MCP default configuration",
        "block.aitv_mcps": "[CMD] MCP Configuration",
        "block.aitv_control": "Set [CONTROL] status",
        "block.select_voice_model": "Select speech large model [MODEL]",
        "block.init_speech_setting": "Initialize the voice broadcast configuration, app_id is [APPID], access_token is [TOKEN]",
        "block.set_speech_person": "Configure the beanbag voice broadcast tone to [PERSON]",
        "block.set_speech_person_ali": "Configure the Ali voice broadcast tone color to [PERSON]",
        "block.set_speech_person_arg": "Configure the voice announcement tone as [PERSON]",
        "block.speech_text": "Play text [TEXT]",
        "block.abort_llm": "Pause large model conversation",
        "block.vision_text": "Detect current camera image [TEXT]",
        "block.aitv_send_msg": "Send message [VALUE]",
        "block.aitv_send_action": "Send [ACTION] message command",
        "block.aitv_send_status": "Send status command [VALUE]",
        "block.get_aitv_message": "Get return data",
        "block.get_aitv_status": "Get built-in data status",
        "block.aitv_cmds": "Command [CMD]",
        "block.aitv_args": "Parameter [CMD]",
        "block.mcp_setting": "Set MCP tool parameters, tool name [NAME], tool description [COMMAND], command name [CMDNAME], return parameter [PARAMS], whether to block until the call is completed [BLOCK], whether to return data [RETURN]"
    },
    "en": {
        "product.name": "WonderMind",
        "menu.aitv_onOff.0": "ON",
        "menu.aitv_onOff.1": "OFF",
        "menu.aitv_onOff.2": "Standby",
        "menu.aitv_cmd.0": "Robot March",
        "menu.aitv_cmd.1": "Robot turns",
        "menu.aitv_cmd.2": "Set fan speed",
        "menu.aitv_cmd.3": "Set up RGB lights",
        "menu.aitv_cmd.4": "Set up dot matrix screen",
        "menu.aitv_cmd.5": "sensor data",
        "menu.aitv_cmd.6": "Ultrasonic detection",
        "menu.aitv_cmd.7": "battery voltage",
        "menu.aitv_cmd.8": "dialogue text",
        "menu.aitv_cmd.9": "Camera detection",
        "menu.aitv_cmd.10": "End of play",
        "menu.aitv_arg.0": "speed",
        "menu.aitv_arg.1": "Duration",
        "menu.aitv_arg.2": "Colorful mode",
        "menu.aitv_arg.3": "red channel",
        "menu.aitv_arg.4": "green channel",
        "menu.aitv_arg.5": "blue channel",
        "menu.aitv_arg.6": "brightness",
        "menu.aitv_arg.7": "text",
        "menu.aitv_arg.8": "angle",
        "menu.aitv_arg.9": "distance",
        "menu.trueorfalse.0": "Yes",
        "menu.trueorfalse.1": "No",
        "menu.aitv_mcp.0": "Robot travel control",
        "menu.aitv_mcp.1": "Robot steering control",
        "menu.aitv_mcp.2": "fan control",
        "menu.aitv_mcp.3": "Lantern module control",
        "menu.aitv_mcp.4": "LED dot matrix module control",
        "menu.aitv_mcp.5": "sensor data",
        "menu.aitv_actions.0": "Action end information",
        "menu.aitv_actions.1": "Enable conversation message output",
        "menu.aitv_actions.2": "Turn off conversation message output",
        "menu.speak_llm.0": "bean bag",
        "menu.speak_llm.1": "Ali",
        "block.aitv_aimech_init": "Initialization at port [PORT]",
        "block.init_mcp_setting": "Perform MCP default configuration",
        "block.aitv_mcps": "[CMD] MCP Configuration",
        "block.aitv_control": "Set [CONTROL] status",
        "block.select_voice_model": "Select speech large model [MODEL]",
        "block.init_speech_setting": "Initialize the voice broadcast configuration, app_id is [APPID], access_token is [TOKEN]",
        "block.set_speech_person": "Configure the beanbag voice broadcast tone to [PERSON]",
        "block.set_speech_person_ali": "Configure the Ali voice broadcast tone color to [PERSON]",
        "block.set_speech_person_arg": "Configure the voice announcement tone as [PERSON]",
        "block.speech_text": "Play text [TEXT]",
        "block.abort_llm": "Pause large model conversation",
        "block.vision_text": "Detect current camera image [TEXT]",
        "block.aitv_send_msg": "Send message [VALUE]",
        "block.aitv_send_action": "Send [ACTION] message command",
        "block.aitv_send_status": "Send status command [VALUE]",
        "block.get_aitv_message": "Get return data",
        "block.get_aitv_status": "Get built-in data status",
        "block.aitv_cmds": "Command [CMD]",
        "block.aitv_args": "Parameter [CMD]",
        "block.mcp_setting": "Set MCP tool parameters, tool name [NAME], tool description [COMMAND], command name [CMDNAME], return parameter [PARAMS], whether to block until the call is completed [BLOCK], whether to return data [RETURN]"
    },
    "zh-tw": {
        "product.name": "WonderMind",
        "menu.aitv_onOff.0": "打開",
        "menu.aitv_onOff.1": "關閉",
        "menu.aitv_onOff.2": "Standby",
        "menu.aitv_cmd.0": "Robot March",
        "menu.aitv_cmd.1": "Robot turns",
        "menu.aitv_cmd.2": "Set fan speed",
        "menu.aitv_cmd.3": "Set up RGB lights",
        "menu.aitv_cmd.4": "Set up dot matrix screen",
        "menu.aitv_cmd.5": "sensor data",
        "menu.aitv_cmd.6": "Ultrasonic detection",
        "menu.aitv_cmd.7": "battery voltage",
        "menu.aitv_cmd.8": "dialogue text",
        "menu.aitv_cmd.9": "Camera detection",
        "menu.aitv_cmd.10": "End of play",
        "menu.aitv_arg.0": "speed",
        "menu.aitv_arg.1": "Duration",
        "menu.aitv_arg.2": "Colorful mode",
        "menu.aitv_arg.3": "red channel",
        "menu.aitv_arg.4": "green channel",
        "menu.aitv_arg.5": "blue channel",
        "menu.aitv_arg.6": "brightness",
        "menu.aitv_arg.7": "text",
        "menu.aitv_arg.8": "angle",
        "menu.aitv_arg.9": "distance",
        "menu.trueorfalse.0": "Yes",
        "menu.trueorfalse.1": "No",
        "menu.aitv_mcp.0": "Robot travel control",
        "menu.aitv_mcp.1": "Robot steering control",
        "menu.aitv_mcp.2": "fan control",
        "menu.aitv_mcp.3": "Lantern module control",
        "menu.aitv_mcp.4": "LED dot matrix module control",
        "menu.aitv_mcp.5": "sensor data",
        "menu.aitv_actions.0": "Action end information",
        "menu.aitv_actions.1": "Enable conversation message output",
        "menu.aitv_actions.2": "Turn off conversation message output",
        "menu.speak_llm.0": "bean bag",
        "menu.speak_llm.1": "Ali",
        "block.aitv_aimech_init": "Initialization at port [PORT]",
        "block.init_mcp_setting": "Perform MCP default configuration",
        "block.aitv_mcps": "[CMD] MCP Configuration",
        "block.aitv_control": "Set [CONTROL] status",
        "block.select_voice_model": "Select speech large model [MODEL]",
        "block.init_speech_setting": "Initialize the voice broadcast configuration, app_id is [APPID], access_token is [TOKEN]",
        "block.set_speech_person": "Configure the beanbag voice broadcast tone to [PERSON]",
        "block.set_speech_person_ali": "Configure the Ali voice broadcast tone color to [PERSON]",
        "block.set_speech_person_arg": "Configure the voice announcement tone as [PERSON]",
        "block.speech_text": "Play text [TEXT]",
        "block.abort_llm": "Pause large model conversation",
        "block.vision_text": "Detect current camera image [TEXT]",
        "block.aitv_send_msg": "Send message [VALUE]",
        "block.aitv_send_action": "Send [ACTION] message command",
        "block.aitv_send_status": "Send status command [VALUE]",
        "block.get_aitv_message": "Get return data",
        "block.get_aitv_status": "Get built-in data status",
        "block.aitv_cmds": "Command [CMD]",
        "block.aitv_args": "Parameter [CMD]",
        "block.mcp_setting": "Set MCP tool parameters, tool name [NAME], tool description [COMMAND], command name [CMDNAME], return parameter [PARAMS], whether to block until the call is completed [BLOCK], whether to return data [RETURN]"
    },
    "ko": {
        "product.name": "WonderMind",
        "menu.aitv_onOff.0": "켜기",
        "menu.aitv_onOff.1": "끄기",
        "menu.aitv_onOff.2": "Standby",
        "menu.aitv_cmd.0": "Robot March",
        "menu.aitv_cmd.1": "Robot turns",
        "menu.aitv_cmd.2": "Set fan speed",
        "menu.aitv_cmd.3": "Set up RGB lights",
        "menu.aitv_cmd.4": "Set up dot matrix screen",
        "menu.aitv_cmd.5": "sensor data",
        "menu.aitv_cmd.6": "Ultrasonic detection",
        "menu.aitv_cmd.7": "battery voltage",
        "menu.aitv_cmd.8": "dialogue text",
        "menu.aitv_cmd.9": "Camera detection",
        "menu.aitv_cmd.10": "End of play",
        "menu.aitv_arg.0": "speed",
        "menu.aitv_arg.1": "Duration",
        "menu.aitv_arg.2": "Colorful mode",
        "menu.aitv_arg.3": "red channel",
        "menu.aitv_arg.4": "green channel",
        "menu.aitv_arg.5": "blue channel",
        "menu.aitv_arg.6": "brightness",
        "menu.aitv_arg.7": "text",
        "menu.aitv_arg.8": "angle",
        "menu.aitv_arg.9": "distance",
        "menu.trueorfalse.0": "Yes",
        "menu.trueorfalse.1": "No",
        "menu.aitv_mcp.0": "Robot travel control",
        "menu.aitv_mcp.1": "Robot steering control",
        "menu.aitv_mcp.2": "fan control",
        "menu.aitv_mcp.3": "Lantern module control",
        "menu.aitv_mcp.4": "LED dot matrix module control",
        "menu.aitv_mcp.5": "sensor data",
        "menu.aitv_actions.0": "Action end information",
        "menu.aitv_actions.1": "Enable conversation message output",
        "menu.aitv_actions.2": "Turn off conversation message output",
        "menu.speak_llm.0": "bean bag",
        "menu.speak_llm.1": "Ali",
        "block.aitv_aimech_init": "Initialization at port [PORT]",
        "block.init_mcp_setting": "Perform MCP default configuration",
        "block.aitv_mcps": "[CMD] MCP Configuration",
        "block.aitv_control": "Set [CONTROL] status",
        "block.select_voice_model": "Select speech large model [MODEL]",
        "block.init_speech_setting": "Initialize the voice broadcast configuration, app_id is [APPID], access_token is [TOKEN]",
        "block.set_speech_person": "Configure the beanbag voice broadcast tone to [PERSON]",
        "block.set_speech_person_ali": "Configure the Ali voice broadcast tone color to [PERSON]",
        "block.set_speech_person_arg": "Configure the voice announcement tone as [PERSON]",
        "block.speech_text": "Play text [TEXT]",
        "block.abort_llm": "Pause large model conversation",
        "block.vision_text": "Detect current camera image [TEXT]",
        "block.aitv_send_msg": "Send message [VALUE]",
        "block.aitv_send_action": "Send [ACTION] message command",
        "block.aitv_send_status": "Send status command [VALUE]",
        "block.get_aitv_message": "Get return data",
        "block.get_aitv_status": "Get built-in data status",
        "block.aitv_cmds": "Command [CMD]",
        "block.aitv_args": "Parameter [CMD]",
        "block.mcp_setting": "Set MCP tool parameters, tool name [NAME], tool description [COMMAND], command name [CMDNAME], return parameter [PARAMS], whether to block until the call is completed [BLOCK], whether to return data [RETURN]"
    }
} as const;

export const product = {name: 'product.name', supportedLocales: ['zh-cn', 'en', 'zh-tw', 'ko']} as const;

export default class WonderMindBlocks implements NativeExtension {
    constructor (private readonly context: ExtensionContext) {}

    // 支持表仅开放旧版五款 AI 机甲；不借用其他主控的初始化接口。
    private checkVariant (): void {
        if (this.context.variant !== 'wonderlab') throw new Error('input/wonder-mind: 未支持的主控适配 ' + this.context.variant);
    }

    // 五款主控的旧端口值相同；沿用本地菜单，不改已发行公共配置快照或伪造默认端口绑定。
    getInfo (): ExtensionInfo {
        this.checkVariant();
        return {
            id: "sensor",
            "name": this.context.t(product.name),
            "color1": "#7B68EE",
            "color2": "#7B68EE",
            "color3": "#7B68EE",
            "menus": {
                "aitv_onOff": {
                    "acceptReporters": false,
                    "items": [
                        {
                            "text": this.context.t("menu.aitv_onOff.0"),
                            "value": "1"
                        },
                        {
                            "text": this.context.t("menu.aitv_onOff.1"),
                            "value": "0"
                        },
                        {
                            "text": this.context.t("menu.aitv_onOff.2"),
                            "value": "2"
                        }
                    ]
                },
                "aimech_iicport": {
                    "acceptReporters": false,
                    "items": [
                        {
                            "text": "A",
                            "value": "1"
                        },
                        {
                            "text": "B",
                            "value": "2"
                        },
                        {
                            "text": "C",
                            "value": "3"
                        },
                        {
                            "text": "D",
                            "value": "4"
                        },
                        {
                            "text": "E",
                            "value": "5"
                        },
                        {
                            "text": "J",
                            "value": "9"
                        },
                        {
                            "text": "K",
                            "value": "10"
                        }
                    ]
                },
                "aitv_cmd": {
                    "acceptReporters": false,
                    "items": [
                        {
                            "text": this.context.t("menu.aitv_cmd.0"),
                            "value": "straight"
                        },
                        {
                            "text": this.context.t("menu.aitv_cmd.1"),
                            "value": "rotated"
                        },
                        {
                            "text": this.context.t("menu.aitv_cmd.2"),
                            "value": "setModuleFan"
                        },
                        {
                            "text": this.context.t("menu.aitv_cmd.3"),
                            "value": "setModuleRGB"
                        },
                        {
                            "text": this.context.t("menu.aitv_cmd.4"),
                            "value": "setMatrixLED"
                        },
                        {
                            "text": this.context.t("menu.aitv_cmd.5"),
                            "value": "getSensorStatus"
                        },
                        {
                            "text": this.context.t("menu.aitv_cmd.6"),
                            "value": "ultrasonic"
                        },
                        {
                            "text": this.context.t("menu.aitv_cmd.7"),
                            "value": "battery"
                        },
                        {
                            "text": this.context.t("menu.aitv_cmd.8"),
                            "value": "message_text"
                        },
                        {
                            "text": this.context.t("menu.aitv_cmd.9"),
                            "value": "vision"
                        },
                        {
                            "text": this.context.t("menu.aitv_cmd.10"),
                            "value": "playback_end"
                        }
                    ]
                },
                "aitv_arg": {
                    "acceptReporters": false,
                    "items": [
                        {
                            "text": this.context.t("menu.aitv_arg.0"),
                            "value": "speed"
                        },
                        {
                            "text": this.context.t("menu.aitv_arg.1"),
                            "value": "duration"
                        },
                        {
                            "text": this.context.t("menu.aitv_arg.2"),
                            "value": "colorful"
                        },
                        {
                            "text": this.context.t("menu.aitv_arg.3"),
                            "value": "R"
                        },
                        {
                            "text": this.context.t("menu.aitv_arg.4"),
                            "value": "G"
                        },
                        {
                            "text": this.context.t("menu.aitv_arg.5"),
                            "value": "B"
                        },
                        {
                            "text": this.context.t("menu.aitv_arg.6"),
                            "value": "light"
                        },
                        {
                            "text": this.context.t("menu.aitv_arg.7"),
                            "value": "text"
                        },
                        {
                            "text": this.context.t("menu.aitv_arg.8"),
                            "value": "angle"
                        },
                        {
                            "text": this.context.t("menu.aitv_arg.9"),
                            "value": "distance"
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
                "aitv_mcp": {
                    "acceptReporters": false,
                    "items": [
                        {
                            "text": this.context.t("menu.aitv_mcp.0"),
                            "value": "1"
                        },
                        {
                            "text": this.context.t("menu.aitv_mcp.1"),
                            "value": "2"
                        },
                        {
                            "text": this.context.t("menu.aitv_mcp.2"),
                            "value": "3"
                        },
                        {
                            "text": this.context.t("menu.aitv_mcp.3"),
                            "value": "4"
                        },
                        {
                            "text": this.context.t("menu.aitv_mcp.4"),
                            "value": "5"
                        },
                        {
                            "text": this.context.t("menu.aitv_mcp.5"),
                            "value": "6"
                        }
                    ]
                },
                "voice_person": {
                    "acceptReporters": false,
                    "items": [
                        {
                            "text": "湾湾小何",
                            "value": "wanwanxiaohe"
                        },
                        {
                            "text": "邻家女孩",
                            "value": "linjianvhai"
                        },
                        {
                            "text": "渊博小叔",
                            "value": "yuanboxiaoshu"
                        },
                        {
                            "text": "阳光青年",
                            "value": "yangguangqingnian"
                        },
                        {
                            "text": "湾区大叔",
                            "value": "wanqudashu"
                        },
                        {
                            "text": "呆萌川妹",
                            "value": "daimengchuanmei"
                        },
                        {
                            "text": "广州德哥",
                            "value": "guangzhoudege"
                        },
                        {
                            "text": "北京小爷",
                            "value": "beijingxiaoye"
                        },
                        {
                            "text": "浩宇小哥",
                            "value": "haoyuxiaoge"
                        },
                        {
                            "text": "广西远舟",
                            "value": "guangxiyuanzhou"
                        },
                        {
                            "text": "妹陀洁儿",
                            "value": "meituojieer"
                        },
                        {
                            "text": "豫州子轩",
                            "value": "yuzhouzixuan"
                        },
                        {
                            "text": "高冷御姐",
                            "value": "gaolengyujie"
                        },
                        {
                            "text": "傲娇霸总",
                            "value": "aojiaobazong"
                        },
                        {
                            "text": "魅力女友",
                            "value": "meilinvyou"
                        },
                        {
                            "text": "深夜播客",
                            "value": "shenyeboke"
                        },
                        {
                            "text": "柔美女友",
                            "value": "roumeinvyou"
                        },
                        {
                            "text": "撒娇学妹",
                            "value": "sajiaoxuemei"
                        },
                        {
                            "text": "爽快思思",
                            "value": "shuangkuaisisi"
                        },
                        {
                            "text": "京腔侃爷",
                            "value": "jingqiangkanye"
                        },
                        {
                            "text": "少年梓辛",
                            "value": "shaonianzhixin"
                        },
                        {
                            "text": "温暖阿虎",
                            "value": "wennuanahu"
                        },
                        {
                            "text": "萌丫头",
                            "value": "mengyatou"
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
                "ali_voice": {
                    "acceptReporters": false,
                    "items": [
                        {
                            "text": "龙婉",
                            "value": "longwan"
                        },
                        {
                            "text": "龙橙",
                            "value": "longcheng"
                        },
                        {
                            "text": "龙华",
                            "value": "longhua"
                        },
                        {
                            "text": "龙小淳",
                            "value": "longxiaochun"
                        },
                        {
                            "text": "龙小夏",
                            "value": "longxiaxia"
                        },
                        {
                            "text": "龙小诚",
                            "value": "longxiaocheng"
                        },
                        {
                            "text": "龙小白",
                            "value": "longxiaobai"
                        },
                        {
                            "text": "龙老铁",
                            "value": "longlaotie"
                        },
                        {
                            "text": "龙书",
                            "value": "longshu"
                        },
                        {
                            "text": "龙硕",
                            "value": "longshuo"
                        },
                        {
                            "text": "龙婧",
                            "value": "longjing"
                        },
                        {
                            "text": "龙妙",
                            "value": "longmiao"
                        },
                        {
                            "text": "龙悦",
                            "value": "longyue"
                        },
                        {
                            "text": "龙媛",
                            "value": "longyuan"
                        },
                        {
                            "text": "龙飞",
                            "value": "longfei"
                        },
                        {
                            "text": "Stella",
                            "value": "Stella"
                        },
                        {
                            "text": "Bella",
                            "value": "Bella"
                        },
                        {
                            "text": "韩语女",
                            "value": "hanyunv"
                        },
                        {
                            "text": "日语女",
                            "value": "riyunv"
                        }
                    ]
                }
            },
            "blocks": [
                {
                    "subCategory": this.context.t('product.name')
                },
                {
                    opcode: "aitv_aimech_init",
                    "text": this.context.t("block.aitv_aimech_init"),
                    "isEdgeActivated": false,
                    "blockType": "command",
                    "arguments": {
                        "PORT": {
                            "type": "string",
                            "menu": "aimech_iicport",
                            "defaultValue": "1",
                            "literal": true
                        }
                    }
                },
                {
                    opcode: "init_mcp_setting",
                    "text": this.context.t("block.init_mcp_setting"),
                    "isEdgeActivated": false,
                    "blockType": "command",
                    "arguments": {

                    }
                },
                {
                    opcode: "aitv_mcps",
                    "text": this.context.t("block.aitv_mcps"),
                    "isEdgeActivated": false,
                    "disableMonitor": true,
                    "blockType": "reporter",
                    "arguments": {
                        "CMD": {
                            "type": "string",
                            "menu": "aitv_mcp",
                            "defaultValue": "1",
                            "literal": true
                        }
                    }
                },
                {
                    opcode: "aitv_control",
                    "text": this.context.t("block.aitv_control"),
                    "isEdgeActivated": false,
                    "blockType": "command",
                    "arguments": {
                        "CONTROL": {
                            "type": "string",
                            "menu": "aitv_onOff",
                            "defaultValue": "1",
                            "literal": true
                        }
                    }
                },
                {
                    opcode: "select_voice_model",
                    "text": this.context.t("block.select_voice_model"),
                    "isEdgeActivated": false,
                    "blockType": "command",
                    "arguments": {
                        "MODEL": {
                            "type": "string",
                            "menu": "speak_llm",
                            "defaultValue": "volcengine",
                            "literal": true
                        }
                    }
                },
                {
                    opcode: "init_speech_setting",
                    "text": this.context.t("block.init_speech_setting"),
                    "isEdgeActivated": false,
                    "blockType": "command",
                    "arguments": {
                        "APPID": {
                            "type": "string",
                            "defaultValue": " "
                        },
                        "TOKEN": {
                            "type": "string",
                            "defaultValue": " "
                        }
                    }
                },
                {
                    opcode: "set_speech_person",
                    "text": this.context.t("block.set_speech_person"),
                    "isEdgeActivated": false,
                    "blockType": "command",
                    "arguments": {
                        "PERSON": {
                            "type": "string",
                            "menu": "voice_person",
                            "defaultValue": "wanwanxiaohe",
                            "literal": true
                        }
                    }
                },
                {
                    opcode: "set_speech_person_ali",
                    "text": this.context.t("block.set_speech_person_ali"),
                    "isEdgeActivated": false,
                    "blockType": "command",
                    "arguments": {
                        "PERSON": {
                            "type": "string",
                            "menu": "ali_voice",
                            "defaultValue": "longwan",
                            "literal": true
                        }
                    }
                },
                {
                    opcode: "set_speech_person_arg",
                    "text": this.context.t("block.set_speech_person_arg"),
                    "isEdgeActivated": false,
                    "blockType": "command",
                    "arguments": {
                        "PERSON": {
                            "type": "string",
                            "defaultValue": "zh_female_wanwanxiaohe_moon_bigtts"
                        }
                    }
                },
                {
                    opcode: "speech_text",
                    "text": this.context.t("block.speech_text"),
                    "isEdgeActivated": false,
                    "blockType": "command",
                    "arguments": {
                        "TEXT": {
                            "type": "string",
                            "defaultValue": " "
                        }
                    }
                },
                {
                    opcode: "abort_llm",
                    "text": this.context.t("block.abort_llm"),
                    "isEdgeActivated": false,
                    "blockType": "command",
                    "arguments": {

                    }
                },
                {
                    opcode: "vision_text",
                    "text": this.context.t("block.vision_text"),
                    "isEdgeActivated": false,
                    "blockType": "command",
                    "arguments": {
                        "TEXT": {
                            "type": "largetext",
                            "defaultValue": " ",
                            "literal": true
                        }
                    }
                },
                {
                    opcode: "aitv_send_msg",
                    "text": this.context.t("block.aitv_send_msg"),
                    "isEdgeActivated": false,
                    "blockType": "command",
                    "arguments": {
                        "VALUE": {
                            "type": "string",
                            "defaultValue": " "
                        }
                    }
                },
                {
                    opcode: "aitv_send_action",
                    "text": this.context.t("block.aitv_send_action"),
                    "isEdgeActivated": false,
                    "blockType": "command",
                    "arguments": {
                        "ACTION": {
                            "type": "string",
                            "menu": "aitv_actions",
                            "defaultValue": "0",
                            "literal": true
                        }
                    }
                },
                {
                    opcode: "aitv_send_status",
                    "text": this.context.t("block.aitv_send_status"),
                    "isEdgeActivated": false,
                    "blockType": "command",
                    "arguments": {
                        "VALUE": {
                            "type": "string",
                            "defaultValue": " "
                        }
                    }
                },
                {
                    opcode: "get_aitv_message",
                    "text": this.context.t("block.get_aitv_message"),
                    "isEdgeActivated": false,
                    "disableMonitor": true,
                    "blockType": "reporter",
                    "arguments": {

                    }
                },
                {
                    opcode: "get_aitv_status",
                    "text": this.context.t("block.get_aitv_status"),
                    "isEdgeActivated": false,
                    "disableMonitor": true,
                    "blockType": "reporter",
                    "arguments": {

                    }
                },
                {
                    opcode: "aitv_cmds",
                    "text": this.context.t("block.aitv_cmds"),
                    "isEdgeActivated": false,
                    "disableMonitor": true,
                    "blockType": "reporter",
                    "arguments": {
                        "CMD": {
                            "type": "string",
                            "menu": "aitv_cmd",
                            "defaultValue": "straight",
                            "literal": true
                        }
                    }
                },
                {
                    opcode: "aitv_args",
                    "text": this.context.t("block.aitv_args"),
                    "isEdgeActivated": false,
                    "disableMonitor": true,
                    "blockType": "reporter",
                    "arguments": {
                        "CMD": {
                            "type": "string",
                            "menu": "aitv_arg",
                            "defaultValue": "speed",
                            "literal": true
                        }
                    }
                },
                {
                    opcode: "mcp_setting",
                    "text": this.context.t("block.mcp_setting"),
                    "isEdgeActivated": false,
                    "disableMonitor": true,
                    "blockType": "reporter",
                    "arguments": {
                        "NAME": {
                            "type": "string",
                            "defaultValue": " "
                        },
                        "COMMAND": {
                            "type": "largetext",
                            "defaultValue": " ",
                            "literal": true
                        },
                        "CMDNAME": {
                            "type": "string",
                            "defaultValue": " "
                        },
                        "PARAMS": {
                            "type": "largetext",
                            "defaultValue": " ",
                            "literal": true
                        },
                        "BLOCK": {
                            "type": "string",
                            "menu": "trueorfalse",
                            "defaultValue": "true",
                            "literal": true
                        },
                        "RETURN": {
                            "type": "string",
                            "menu": "trueorfalse",
                            "defaultValue": "true",
                            "literal": true
                        }
                    }
                }
            ]
        };
    }

    // MCP 下拉只收集所选工具的变量；初始化、发送和读取保留旧执行次序。
    getPython (): Record<string, PythonTemplate> {
        this.checkVariant();
        return {
            "aitv_aimech_init": {
                "template": "",
                "imports": [
                    "from mcp_tools import MCP_Tools"
                ],
                "variables": [
                    "AiBlock_LLM = MCP_Tools(0x56,{PORT})"
                ]
            },
            "init_mcp_setting": {
                "template": "AiBlock_LLM.send_message(mcp_dict_setGoStraight)\ntime.sleep(0.05)\nAiBlock_LLM.send_message(mcp_dict_setRotated)\ntime.sleep(0.05)\nAiBlock_LLM.send_message(mcp_dict_setModuleFan)\ntime.sleep(0.05)\nAiBlock_LLM.send_message(mcp_dict_setModuleRGB)\ntime.sleep(0.05)\nAiBlock_LLM.send_message(mcp_dict_setMatrixLED)\ntime.sleep(0.05)\nAiBlock_LLM.send_message(mcp_dict_getSensorStatus)\ntime.sleep(0.05)",
                "variables": [
                    "mcp_dict_setGoStraight = {\"tool_name\":\"self.robot.GoStraight\",\"command\":\"Control the robot to move forward and backward, main parameters: 1. Speed: percentage; 2. Duration: in milliseconds; 3. Moving distance: Unit: centimeters; When moving forward, the speed and distance are positive, while when moving backward, they are negative; Distance and duration have a binary relationship, with one parameter given and the other set to 0\",\"params\":[[\"straight\",\"string\"],[\"speed\",\"int\",\"20\",\"-100\",\"100\"],[\"duration\",\"int\",\"0\",\"0\",\"60000\"],[\"distance\",\"int\",\"0\",\"-1000\",\"1000\"]],\"block\":\"true\",\"return\":\"false\"}",
                    "mcp_dict_setRotated = {\"tool_name\":\"self.robot.setRotated\",\"command\":\"Control the left and right rotation of the robot, main parameters: 1. Speed: percentage; 2. Duration: in milliseconds; 3. Angle: unit degree; When turning left, the speed and angle are positive, while when turning right, they are negative; The angle and duration have a binary relationship, with one parameter given and the other set to 0\",\"params\":[[\"rotated\",\"string\"],[\"speed\",\"int\",\"20\",\"-100\",\"100\"],[\"duration\",\"int\",\"0\",\"0\",\"60000\"],[\"angle\",\"int\",\"0\",\"-1800\",\"1800\"]],\"block\":\"true\",\"return\":\"false\"}",
                    "mcp_dict_setModuleFan = {\"tool_name\":\"self.robot.setModuleFan\",\"command\":\"Control the small fan module of the robot, with parameters including: 1 speed, Control the speed of the small fan, with positive values indicating clockwise rotation and negative values indicating counterclockwise rotation\",\"params\":[[\"setModuleFan\",\"string\"],[\"speed\",\"int\",\"-100\",\"100\"]],\"block\":\"false\",\"return\":\"false\"}",
                    "mcp_dict_setModuleRGB = {\"tool_name\":\"self.robot.setModuleRGB\",\"command\":\"Control the robot's color light module, with parameters including: 1. When colorful is True, control it to dazzling mode. Other parameters do not take effect. 2 R：0~255,  Control the brightness or change value of the red color, 3 G：0~255， Control the green brightness or change value, 4 B：0~255， Control blue brightness or change value\",\"params\":[[\"setModuleRGB\",\"string\"],[\"colorful\",\"bool\"],[\"R\",\"int\",\"0\",\"255\"],[\"G\",\"int\",\"0\",\"255\"],[\"B\",\"int\",\"0\",\"255\"]],\"block\":\"false\",\"return\":\"false\"}",
                    "mcp_dict_setMatrixLED = {\"tool_name\":\"self.robot.setMatrixLED\",\"command\":\"Control the LED dot matrix module of the robot, with parameters including: 1. light as brightness, default 3 levels, 2. text as the displayed string\",\"params\":[[\"setMatrixLED\",\"string\"],[\"light\",\"int\",\"1\",\"8\"],[\"text\",\"string\"]],\"block\":\"false\",\"return\":\"false\"}",
                    "mcp_dict_getSensorStatus = {\"tool_name\":\"self.robot.getSensorStatus\",\"command\":\"Obtain sensor status: Ultrasonic detection distance, unit: centimeters; Battery voltage value, unit: millivolts; If battery voltage is required, send 'battery'. If ultrasonic detection distance is needed, send 'ultrasonic'.\",\"params\":[[\"getSensorStatus\",\"string\"]],\"block\":\"true\",\"return\":\"true\"}"
                ]
            },
            "aitv_mcps": {
                "template": "",
                "templateSelector": {
                    "argument": "CMD",
                    "cases": {
                        "1": "mcp_dict_setGoStraight",
                        "2": "mcp_dict_setRotated",
                        "3": "mcp_dict_setModuleFan",
                        "4": "mcp_dict_setModuleRGB",
                        "5": "mcp_dict_setMatrixLED",
                        "6": "mcp_dict_getSensorStatus"
                    },
                    "variableCases": {
                        "1": [
                            "mcp_dict_setGoStraight = {\"tool_name\":\"self.robot.GoStraight\",\"command\":\"Control the robot to move forward and backward, main parameters: 1. Speed: percentage; 2. Duration: in milliseconds; 3. Moving distance: Unit: centimeters; When moving forward, the speed and distance are positive, while when moving backward, they are negative; Distance and duration have a binary relationship, with one parameter given and the other set to 0\",\"params\":[[\"straight\",\"string\"],[\"speed\",\"int\",\"20\",\"-100\",\"100\"],[\"duration\",\"int\",\"0\",\"0\",\"60000\"],[\"distance\",\"int\",\"0\",\"-1000\",\"1000\"]],\"block\":\"true\",\"return\":\"false\"}"
                        ],
                        "2": [
                            "mcp_dict_setRotated = {\"tool_name\":\"self.robot.setRotated\",\"command\":\"Control the left and right rotation of the robot, main parameters: 1. Speed: percentage; 2. Duration: in milliseconds; 3. Angle: unit degree; When turning left, the speed and angle are positive, while when turning right, they are negative; The angle and duration have a binary relationship, with one parameter given and the other set to 0\",\"params\":[[\"rotated\",\"string\"],[\"speed\",\"int\",\"20\",\"-100\",\"100\"],[\"duration\",\"int\",\"0\",\"0\",\"60000\"],[\"angle\",\"int\",\"0\",\"-1800\",\"1800\"]],\"block\":\"true\",\"return\":\"false\"}"
                        ],
                        "3": [
                            "mcp_dict_setModuleFan = {\"tool_name\":\"self.robot.setModuleFan\",\"command\":\"Control the small fan module of the robot, with parameters including: 1 speed, Control the speed of the small fan, with positive values indicating clockwise rotation and negative values indicating counterclockwise rotation\",\"params\":[[\"setModuleFan\",\"string\"],[\"speed\",\"int\",\"-100\",\"100\"]],\"block\":\"false\",\"return\":\"false\"}"
                        ],
                        "4": [
                            "mcp_dict_setModuleRGB = {\"tool_name\":\"self.robot.setModuleRGB\",\"command\":\"Control the robot's color light module, with parameters including: 1. When colorful is True, control it to dazzling mode. Other parameters do not take effect. 2 R：0~255,  Control the brightness or change value of the red color, 3 G：0~255， Control the green brightness or change value, 4 B：0~255， Control blue brightness or change value\",\"params\":[[\"setModuleRGB\",\"string\"],[\"colorful\",\"bool\"],[\"R\",\"int\",\"0\",\"255\"],[\"G\",\"int\",\"0\",\"255\"],[\"B\",\"int\",\"0\",\"255\"]],\"block\":\"false\",\"return\":\"false\"}"
                        ],
                        "5": [
                            "mcp_dict_setMatrixLED = {\"tool_name\":\"self.robot.setMatrixLED\",\"command\":\"Control the LED dot matrix module of the robot, with parameters including: 1. light as brightness, default 3 levels, 2. text as the displayed string\",\"params\":[[\"setMatrixLED\",\"string\"],[\"light\",\"int\",\"1\",\"8\"],[\"text\",\"string\"]],\"block\":\"false\",\"return\":\"false\"}"
                        ],
                        "6": [
                            "mcp_dict_getSensorStatus = {\"tool_name\":\"self.robot.getSensorStatus\",\"command\":\"Obtain sensor status: Ultrasonic detection distance, unit: centimeters; Battery voltage value, unit: millivolts; If battery voltage is required, send 'battery'. If ultrasonic detection distance is needed, send 'ultrasonic'.\",\"params\":[[\"getSensorStatus\",\"string\"]],\"block\":\"true\",\"return\":\"true\"}"
                        ]
                    }
                }
            },
            "aitv_control": {
                "template": "AiBlock_LLM\n",
                "templateSelector": {
                    "argument": "CONTROL",
                    "cases": {
                        "0": "AiBlock_LLM.stop()",
                        "1": "AiBlock_LLM.start()",
                        "2": "AiBlock_LLM.sleep()"
                    }
                }
            },
            "select_voice_model": {
                "template": "AiBlock_LLM.set_tts_model(\"{MODEL}\")"
            },
            "init_speech_setting": {
                "template": "AiBlock_LLM.send_message({\"command\":\"app_id\",\"params\":{APPID}})\ntime.sleep(0.05)\nAiBlock_LLM.send_message({\"command\":\"access_token\",\"params\":{TOKEN}})\ntime.sleep(0.05)"
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
                "template": "AiBlock_LLM.vision(\"{TEXT}\")"
            },
            "aitv_send_msg": {
                "template": "AiBlock_LLM.send_message({VALUE})\ntime.sleep(0.05)"
            },
            "aitv_send_action": {
                "template": "time.sleep(0.05)",
                "templateSelector": {
                    "argument": "ACTION",
                    "cases": {
                        "0": "AiBlock_LLM.send_action_finish(\"true\")\ntime.sleep(0.05)",
                        "1": "AiBlock_LLM.send_message(AiBlock_LLM.en_message_text_out_dict)\ntime.sleep(0.05)",
                        "2": "AiBlock_LLM.send_message(AiBlock_LLM.di_message_text_out_dict)\ntime.sleep(0.05)"
                    }
                }
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
            "aitv_cmds": {
                "template": "\"{CMD}\""
            },
            "aitv_args": {
                "template": "\"{CMD}\""
            },
            "mcp_setting": {
                "template": "{NAME.memberName}",
                "variables": [
                    "{NAME.memberName} = {\"tool_name\":{NAME},\"command\":\"{COMMAND}\",\"params\":{PARAMS.compactHead}[{CMDNAME}, \"string\"],{PARAMS.compactTail},\"block\":\"{BLOCK}\",\"return\":\"{RETURN}\"}"
                ]
            }
        };
    }
}
