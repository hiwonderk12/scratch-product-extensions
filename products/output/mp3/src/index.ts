import type {ExtensionContext, ExtensionInfo, NativeExtension, PythonTemplate} from '../../../../tools/sdk';

import locale0 from './locales/zh-cn.json';
import locale1 from './locales/en.json';
import locale2 from './locales/zh-tw.json';
import locale3 from './locales/ko.json';

export const messages = {
    "zh-cn": locale0,
    "en": locale1,
    "zh-tw": locale2,
    "ko": locale3
} as const;

export const product = {name: 'product.name', supportedLocales: ['zh-cn', 'en', 'zh-tw', 'ko']} as const;

export default class Mp3Blocks implements NativeExtension {
    constructor(private readonly context: ExtensionContext) { }

    private checkAdapter(): void {
        if (this.context.variant !== 'hiwonder-port')
            throw new Error('mp3: 未支持的主控适配 ' + this.context.variant);
    }

    getInfo(): ExtensionInfo {
        this.checkAdapter();
        return {
            id: 'display', name: this.context.t(product.name),
            color1: '#FF6347', color2: '#FF6347', color3: '#FF6347',
            menus: {
                "mp3_port": {
                    "items": this.context.ports('display.mp3_port'),
                    "acceptReporters": false
                },
                "play_mode": {
                    "items": [
                        {
                            "text": this.context.t('menu.mode.on'),
                            "value": "0"
                        },
                        {
                            "text": this.context.t('menu.mode.off'),
                            "value": "1"
                        }
                    ],
                    "acceptReporters": false
                },
                "play_status": {
                    "items": [
                        {
                            "text": this.context.t('menu.play.play'),
                            "value": "0"
                        },
                        {
                            "text": this.context.t('menu.play.pause'),
                            "value": "1"
                        },
                        {
                            "text": this.context.t('menu.play.prev'),
                            "value": "2"
                        },
                        {
                            "text": this.context.t('menu.play.next'),
                            "value": "3"
                        }
                    ],
                    "acceptReporters": false
                }
            },
            blocks: [{ subCategory: this.context.t(product.name) },
                {
                    opcode: "mp3_init",
                    "blockType": "command",
                    "text": this.context.t('block.mp3_init'),
                    "blockIconURI": this.context.asset('assets/mp3.svg'),
                    "arguments": {
                        IICPORT: {
                            "type": "string",
                            "defaultValue": this.context.defaultPort('mp3_init', 'IICPORT'),
                            "menu": "mp3_port",
                            "literal": true
                        }
                    }
                },
                {
                    opcode: "mp3_play_song_num",
                    "blockType": "command",
                    "text": this.context.t('block.mp3_play_song_num'),
                    "blockIconURI": this.context.asset('assets/mp3.svg'),
                    "arguments": {
                        "VALUE": {
                            "type": "number",
                            "defaultValue": 1
                        }
                    }
                },
                {
                    opcode: "mp3_play_control",
                    "blockType": "command",
                    "text": this.context.t('block.mp3_play_control'),
                    "blockIconURI": this.context.asset('assets/mp3.svg'),
                    "arguments": {
                        "PLAYSTATUS": {
                            "type": "string",
                            "defaultValue": "0",
                            "menu": "play_status",
                            "literal": true
                        }
                    }
                },
                {
                    opcode: "mp3_play_mode",
                    "blockType": "command",
                    "text": this.context.t('block.mp3_play_mode'),
                    "blockIconURI": this.context.asset('assets/mp3.svg'),
                    "arguments": {
                        "PLAYMODE": {
                            "type": "string",
                            "defaultValue": "0",
                            "menu": "play_mode",
                            "literal": true
                        }
                    }
                },
                {
                    opcode: "mp3_set_volume",
                    "blockType": "command",
                    "text": this.context.t('block.mp3_set_volume'),
                    "blockIconURI": this.context.asset('assets/mp3.svg'),
                    "arguments": {
                        "VALUE": {
                            "type": "slider30",
                            "defaultValue": 30
                        }
                    }
                }
            ]
        };
    }

    getPython(): Record<string, PythonTemplate> {
        this.checkAdapter();
        return {
            "mp3_init": {
                "template": "",
                "imports": [
                    "from Hiwonder import MP3"
                ],
                "variables": [
                    "mp3 = Hiwonder.MP3(Hiwonder.Port({IICPORT}))"
                ]
            },
            "mp3_play_song_num": {
                "template": "mp3.play({VALUE})"
            },
            "mp3_play_control": {
                "template": "mp3.play()",
                "templateSelector": {
                    "argument": "PLAYSTATUS",
                    "cases": {
                        "0": "mp3.play()",
                        "1": "mp3.pause()",
                        "2": "mp3.prev()",
                        "3": "mp3.next()"
                    }
                }
            },
            "mp3_play_mode": {
                "template": "mp3.loop_on()",
                "templateSelector": {
                    "argument": "PLAYMODE",
                    "cases": {
                        "0": "mp3.loop_on()",
                        "1": "mp3.loop_off()"
                    }
                }
            },
            "mp3_set_volume": {
                "template": "mp3.volume({VALUE})"
            }
        };
    }
}
