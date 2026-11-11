// WonderEcho 作者入口：四语菜单与显式语音初始化集中维护。
import type {ExtensionBlock, ExtensionContext, ExtensionInfo, NativeExtension, PythonTemplate} from '../../../../tools/sdk';

import locale0 from './locales/zh-cn.json';
import locale1 from './locales/en.json';
import locale2 from './locales/zh-tw.json';
import locale3 from './locales/ko.json';

export const messages = {
    "zh-cn": locale0,
    en: locale1,
    "zh-tw": locale2,
    ko: locale3
} as const;

export const product = {name: 'product.name', supportedLocales: ['zh-cn', 'en', 'zh-tw', 'ko']} as const;

export default class WonderEchoBlocks implements NativeExtension {
    constructor (private readonly context: ExtensionContext) {}

    private checkVariant (): void {
        if (!['hiwonder-dev-port', 'hiwonder-dev-onboard'].includes(this.context.variant)) {
            throw new Error('input/wonder-echo: 未支持的主控适配 ' + this.context.variant);
        }
    }

    getInfo (): ExtensionInfo {
        this.checkVariant();
        const onboard = this.context.variant === 'hiwonder-dev-onboard';
        return {
            id: "sensor",
            name: this.context.t(product.name),
            color1: "#7B68EE",
            color2: "#7B68EE",
            color3: "#7B68EE",
            menus: {
                aimech_iicport: {
                    acceptReporters: false,
                    items: this.context.ports('sensor.aimech_iicport')
                },
                mechdog_speech_cmd_word: {
                    acceptReporters: false,
                    items: [
                        {
                            text: this.context.t('menu.moving-forward'),
                            value: "1"
                        },
                        {
                            text: this.context.t('menu.moving-backward'),
                            value: "2"
                        },
                        {
                            text: this.context.t('menu.turning-left'),
                            value: "3"
                        },
                        {
                            text: this.context.t('menu.turning-right'),
                            value: "4"
                        },
                        {
                            text: this.context.t('menu.lean-forward'),
                            value: "5"
                        },
                        {
                            text: this.context.t('menu.lean-backward'),
                            value: "6"
                        },
                        {
                            text: this.context.t('menu.lean-left'),
                            value: "7"
                        },
                        {
                            text: this.context.t('menu.lean-right'),
                            value: "8"
                        },
                        {
                            text: this.context.t('menu.received'),
                            value: "9"
                        },
                        {
                            text: this.context.t('menu.received'),
                            value: "0xd"
                        },
                        {
                            text: this.context.t('menu.received'),
                            value: "0xe"
                        },
                        {
                            text: this.context.t('menu.turning-light-on'),
                            value: "0x12"
                        },
                        {
                            text: this.context.t('menu.turning-light-off'),
                            value: "0x13"
                        },
                        {
                            text: this.context.t('menu.door-opened'),
                            value: "0x14"
                        },
                        {
                            text: this.context.t('menu.door-closed'),
                            value: "0x15"
                        },
                        {
                            text: this.context.t('menu.turning-pump-on'),
                            value: "0x16"
                        },
                        {
                            text: this.context.t('menu.turning-pump-off'),
                            value: "0x17"
                        },
                        {
                            text: this.context.t('menu.received'),
                            value: "0x18"
                        },
                        {
                            text: this.context.t('menu.received'),
                            value: "0x19"
                        },
                        {
                            text: this.context.t('menu.hello'),
                            value: "0x1A"
                        },
                        {
                            text: this.context.t('menu.introduction'),
                            value: "0x1B"
                        },
                        {
                            text: this.context.t('menu.watch-this'),
                            value: "0x1C"
                        },
                        {
                            text: this.context.t('menu.received'),
                            value: "0x62"
                        }
                    ]
                },
                mechdog_speech_play_word: {
                    acceptReporters: false,
                    items: [
                        {
                            text: this.context.t('menu.recyclables'),
                            value: "1"
                        },
                        {
                            text: this.context.t('menu.food-waste'),
                            value: "2"
                        },
                        {
                            text: this.context.t('menu.hazardous-waste'),
                            value: "3"
                        },
                        {
                            text: this.context.t('menu.other-waste'),
                            value: "4"
                        },
                        {
                            text: this.context.t('menu.obstacle-ahead'),
                            value: "5"
                        },
                        {
                            text: this.context.t('menu.parking-complete'),
                            value: "6"
                        },
                        {
                            text: this.context.t('menu.resume-travel'),
                            value: "7"
                        },
                        {
                            text: this.context.t('menu.left-turn-detected'),
                            value: "8"
                        },
                        {
                            text: this.context.t('menu.right-turn-detected'),
                            value: "9"
                        },
                        {
                            text: this.context.t('menu.stop-detected'),
                            value: "0xA"
                        },
                        {
                            text: this.context.t('menu.red-light-detected'),
                            value: "0xB"
                        },
                        {
                            text: this.context.t('menu.green-light-detected'),
                            value: "0xC"
                        },
                        {
                            text: this.context.t('menu.u-turn-detected'),
                            value: "0xD"
                        },
                        {
                            text: this.context.t('menu.turn-detected'),
                            value: "0xE"
                        },
                        {
                            text: this.context.t('menu.welcome'),
                            value: "0xF"
                        },
                        {
                            text: this.context.t('menu.grabbing-object'),
                            value: "0x10"
                        },
                        {
                            text: this.context.t('menu.object-out-of-range'),
                            value: "0x11"
                        },
                        {
                            text: this.context.t('menu.grabbing-complete'),
                            value: "0x12"
                        }
                    ]
                },
                mechdog_word: {
                    acceptReporters: false,
                    items: [
                        {
                            text: this.context.t('menu.forward'),
                            value: "1"
                        },
                        {
                            text: this.context.t('menu.backward'),
                            value: "2"
                        },
                        {
                            text: this.context.t('menu.left'),
                            value: "3"
                        },
                        {
                            text: this.context.t('menu.right'),
                            value: "4"
                        },
                        {
                            text: this.context.t('menu.lean-forward'),
                            value: "5"
                        },
                        {
                            text: this.context.t('menu.lean-backward'),
                            value: "6"
                        },
                        {
                            text: this.context.t('menu.lean-left'),
                            value: "7"
                        },
                        {
                            text: this.context.t('menu.lean-right'),
                            value: "8"
                        },
                        {
                            text: this.context.t('menu.stop'),
                            value: "9"
                        },
                        {
                            text: this.context.t('menu.attention'),
                            value: "0xA"
                        },
                        {
                            text: this.context.t('menu.lie-down'),
                            value: "0xB"
                        },
                        {
                            text: this.context.t('menu.sit'),
                            value: "0xC"
                        },
                        {
                            text: this.context.t('menu.speed-up'),
                            value: "0xD"
                        },
                        {
                            text: this.context.t('menu.slow-down'),
                            value: "0xE"
                        },
                        {
                            text: this.context.t('menu.raise-body'),
                            value: "0xF"
                        },
                        {
                            text: this.context.t('menu.lower-body'),
                            value: "0x10"
                        },
                        {
                            text: this.context.t('menu.make-sound'),
                            value: "0x11"
                        },
                        {
                            text: this.context.t('menu.light-on'),
                            value: "0x12"
                        },
                        {
                            text: this.context.t('menu.light-off'),
                            value: "0x13"
                        },
                        {
                            text: this.context.t('menu.open-door'),
                            value: "0x14"
                        },
                        {
                            text: this.context.t('menu.close-door'),
                            value: "0x15"
                        },
                        {
                            text: this.context.t('menu.pump-on'),
                            value: "0x16"
                        },
                        {
                            text: this.context.t('menu.pump-off'),
                            value: "0x17"
                        },
                        {
                            text: this.context.t('menu.extend-rack'),
                            value: "0x18"
                        },
                        {
                            text: this.context.t('menu.retract-rack'),
                            value: "0x19"
                        },
                        {
                            text: this.context.t('menu.hello'),
                            value: "0x1A"
                        },
                        {
                            text: this.context.t('menu.introduce-yourself'),
                            value: "0x1B"
                        },
                        {
                            text: this.context.t('menu.show-skills'),
                            value: "0x1C"
                        },
                        {
                            text: this.context.t('menu.march-in-place'),
                            value: "0x1D"
                        },
                        {
                            text: this.context.t('menu.shake-head'),
                            value: "0x1E"
                        },
                        {
                            text: this.context.t('menu.lunge-forward'),
                            value: "0x1F"
                        },
                        {
                            text: this.context.t('menu.lunge-backward'),
                            value: "0x20"
                        },
                        {
                            text: this.context.t('menu.combat-mode'),
                            value: "0x21"
                        },
                        {
                            text: this.context.t('menu.crouch'),
                            value: "0x22"
                        },
                        {
                            text: this.context.t('menu.shake-body'),
                            value: "0x23"
                        },
                        {
                            text: this.context.t('menu.fan-on'),
                            value: "0x24"
                        },
                        {
                            text: this.context.t('menu.fan-off'),
                            value: "0x25"
                        },
                        {
                            text: this.context.t('menu.rotate-servo'),
                            value: "0x26"
                        },
                        {
                            text: this.context.t('menu.red-light-on'),
                            value: "0x27"
                        },
                        {
                            text: this.context.t('menu.green-light-on'),
                            value: "0x28"
                        },
                        {
                            text: this.context.t('menu.blue-light-on'),
                            value: "0x29"
                        },
                        {
                            text: this.context.t('menu.smile'),
                            value: "0x2A"
                        },
                        {
                            text: this.context.t('menu.cry'),
                            value: "0x2B"
                        },
                        {
                            text: this.context.t('menu.face-recognition'),
                            value: "0x62"
                        },
                        {
                            text: this.context.t('menu.tag-recognition'),
                            value: "0x63"
                        },
                        {
                            text: this.context.t('menu.waste-sorting'),
                            value: "0x64"
                        },
                        {
                            text: this.context.t('menu.color-recognition'),
                            value: "0x65"
                        },
                        {
                            text: this.context.t('menu.line-following'),
                            value: "0x66"
                        },
                        {
                            text: this.context.t('menu.color-tracking'),
                            value: "0x67"
                        },
                        {
                            text: this.context.t('menu.obstacle-avoidance'),
                            value: "0x68"
                        },
                        {
                            text: this.context.t('menu.sort-red'),
                            value: "0x69"
                        },
                        {
                            text: this.context.t('menu.sort-green'),
                            value: "0x6A"
                        },
                        {
                            text: this.context.t('menu.sort-blue'),
                            value: "0x6B"
                        },
                        {
                            text: this.context.t('menu.dance'),
                            value: "0x6C"
                        },
                        {
                            text: this.context.t('menu.push-ups'),
                            value: "0x6D"
                        },
                        {
                            text: this.context.t('menu.kick-left'),
                            value: "0x6E"
                        },
                        {
                            text: this.context.t('menu.kick-right'),
                            value: "0x6F"
                        },
                        {
                            text: this.context.t('menu.twist-body'),
                            value: "0x71"
                        },
                        {
                            text: this.context.t('menu.sit-ups'),
                            value: "0x72"
                        },
                        {
                            text: this.context.t('menu.bow'),
                            value: "0x73"
                        },
                        {
                            text: this.context.t('menu.spread-hands'),
                            value: "0x74"
                        },
                        {
                            text: this.context.t('menu.wave'),
                            value: "0x75"
                        },
                        {
                            text: this.context.t('menu.march-in-place'),
                            value: "0x76"
                        },
                        {
                            text: this.context.t('menu.stand-after-fall'),
                            value: "0x77"
                        },
                        {
                            text: this.context.t('menu.stride'),
                            value: "0x78"
                        },
                        {
                            text: this.context.t('menu.hook-left'),
                            value: "0x79"
                        },
                        {
                            text: this.context.t('menu.hook-right'),
                            value: "0x7A"
                        },
                        {
                            text: this.context.t('menu.stop-playback-detected'),
                            value: "0x7B"
                        },
                        {
                            text: this.context.t('menu.sort-yellow'),
                            value: "0x7C"
                        }
                    ]
                }
            },
            blocks: [
                {
                    subCategory: this.context.t(product.name)
                },
                ...(onboard ? [{
                    opcode: "minihexa_wonderecho_init",
                    blockType: "command",
                    text: this.context.t('block.minihexa_wonderecho_init'),
                    blockIconURI: this.context.asset('assets/asr.svg'),
                    arguments: {}
                } satisfies ExtensionBlock] : []),
                {
                    opcode: "aimech_wonderecho_init",
                    ...(onboard ? {hideFromPalette: true} : {}),
                    blockType: "command",
                    text: this.context.t('block.aimech_wonderecho_init'),
                    blockIconURI: this.context.asset('assets/asr.svg'),
                    arguments: {
                        PORT: {
                            type: "string",
                            defaultValue: this.context.defaultPort('aimech_wonderecho_init', 'PORT'),
                            menu: "aimech_iicport",
                            literal: true
                        }
                    }
                },
                {
                    opcode: "wonderecho_get_results",
                    blockType: "command",
                    text: this.context.t('block.wonderecho_get_results'),
                    blockIconURI: this.context.asset('assets/asr.svg'),
                    arguments: {}
                },
                {
                    opcode: "wonderecho_results",
                    blockType: "Boolean",
                    disableMonitor: true,
                    text: this.context.t('block.wonderecho_results'),
                    blockIconURI: this.context.asset('assets/asr.svg'),
                    arguments: {
                        WORD: {
                            type: "string",
                            defaultValue: "1",
                            menu: "mechdog_word",
                            literal: true
                        }
                    }
                },
                {
                    opcode: "wonderecho_get_result_num",
                    blockType: "reporter",
                    disableMonitor: true,
                    text: this.context.t('block.wonderecho_get_result_num'),
                    blockIconURI: this.context.asset('assets/asr.svg'),
                    arguments: {}
                },
                {
                    opcode: "wonderecho_speech_cmd",
                    blockType: "command",
                    text: this.context.t('block.wonderecho_speech_cmd'),
                    blockIconURI: this.context.asset('assets/asr.svg'),
                    arguments: {
                        WORD: {
                            type: "string",
                            defaultValue: "1",
                            menu: "mechdog_speech_cmd_word",
                            literal: true
                        }
                    }
                },
                {
                    opcode: "wonderecho_speech_cmd_number",
                    blockType: "command",
                    text: this.context.t('block.wonderecho_speech_cmd_number'),
                    blockIconURI: this.context.asset('assets/asr.svg'),
                    arguments: {
                        NUM: {
                            type: "number",
                            defaultValue: 1
                        }
                    }
                },
                {
                    opcode: "wonderecho_speech_play",
                    blockType: "command",
                    text: this.context.t('block.wonderecho_speech_play'),
                    blockIconURI: this.context.asset('assets/asr.svg'),
                    arguments: {
                        WORD: {
                            type: "string",
                            defaultValue: "1",
                            menu: "mechdog_speech_play_word",
                            literal: true
                        }
                    }
                },
                {
                    opcode: "wonderecho_speech_play_number",
                    blockType: "command",
                    text: this.context.t('block.wonderecho_speech_play_number'),
                    blockIconURI: this.context.asset('assets/asr.svg'),
                    arguments: {
                        NUM: {
                            type: "number",
                            defaultValue: 1
                        }
                    }
                }
            ]
        };
    }

    // 仅初始化积木创建 asr2；ASR_CMDMAND 是设备 API 的原始常量名。
    getPython (): Record<string, PythonTemplate> {
        this.checkVariant();
        const templates: Record<string, PythonTemplate> = {
            aimech_wonderecho_init: {
                template: "",
                imports: [
                    "import Hiwonder_DEV"
                ],
                variables: [
                    "asr2 = Hiwonder_DEV.DEV_ASR(Hiwonder_DEV.Port({PORT}))"
                ]
            },
            wonderecho_get_results: {
                template: "wonderecho_result = asr2.getResult()"
            },
            wonderecho_results: {
                template: "(wonderecho_result == {WORD})"
            },
            wonderecho_get_result_num: {
                template: "wonderecho_result"
            },
            wonderecho_speech_cmd: {
                template: "asr2.speak(asr2.ASR_CMDMAND, {WORD})"
            },
            wonderecho_speech_cmd_number: {
                template: "asr2.speak(asr2.ASR_CMDMAND, {NUM})"
            },
            wonderecho_speech_play: {
                template: "asr2.speak(asr2.ASR_ANNOUNCER, {WORD})"
            },
            wonderecho_speech_play_number: {
                template: "asr2.speak(asr2.ASR_ANNOUNCER, {NUM})"
            }
        };
        if (this.context.variant === 'hiwonder-dev-onboard') {
            templates.aimech_wonderecho_init.variables = ["asr2 = Hiwonder_DEV.DEV_ASR()"];
            templates.minihexa_wonderecho_init = templates.aimech_wonderecho_init;
        }
        return templates;
    }
}
