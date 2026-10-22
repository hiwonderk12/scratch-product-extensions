import type {ExtensionContext, ExtensionInfo, NativeExtension, PythonTemplate} from '../../../../tools/sdk';

export const messages = {
    "zh-cn": {
        "product.name": "MP3 模块",
        "block.mp3_init": "初始化 MP3 模块接口 [IICPORT]",
        "block.mp3_play_song_num": "MP3 模块播放第 [VALUE] 首歌曲",
        "block.mp3_play_control": "MP3 模块 [PLAYSTATUS]",
        "block.mp3_play_mode": "设置 MP3 播放模式 [PLAYMODE]",
        "block.mp3_set_volume": "设置 MP3 音量 [VALUE]",
        "menu.play.play": "播放",
        "menu.play.pause": "暂停",
        "menu.play.prev": "上一曲",
        "menu.play.next": "下一曲",
        "menu.mode.on": "单曲循环",
        "menu.mode.off": "取消单曲循环"
    },
    "en": {
        "product.name": "MP3 module",
        "block.mp3_init": "Initialize MP3 module port [IICPORT]",
        "block.mp3_play_song_num": "MP3 module play track [VALUE]",
        "block.mp3_play_control": "MP3 module [PLAYSTATUS]",
        "block.mp3_play_mode": "Set MP3 playback mode [PLAYMODE]",
        "block.mp3_set_volume": "Set MP3 volume [VALUE]",
        "menu.play.play": "play",
        "menu.play.pause": "pause",
        "menu.play.prev": "previous track",
        "menu.play.next": "next track",
        "menu.mode.on": "repeat one",
        "menu.mode.off": "disable repeat one"
    },
    "zh-tw": {
        "product.name": "MP3 模組",
        "block.mp3_init": "初始化 MP3 模組介面 [IICPORT]",
        "block.mp3_play_song_num": "MP3 模組播放第 [VALUE] 首歌曲",
        "block.mp3_play_control": "MP3 模組 [PLAYSTATUS]",
        "block.mp3_play_mode": "設定 MP3 播放模式 [PLAYMODE]",
        "block.mp3_set_volume": "設定 MP3 音量 [VALUE]",
        "menu.play.play": "播放",
        "menu.play.pause": "暫停",
        "menu.play.prev": "上一首",
        "menu.play.next": "下一首",
        "menu.mode.on": "單曲循環",
        "menu.mode.off": "取消單曲循環"
    },
    "ko": {
        "product.name": "MP3 모듈",
        "block.mp3_init": "MP3 모듈 포트 [IICPORT] 초기화하기",
        "block.mp3_play_song_num": "MP3 모듈 트랙 [VALUE] 재생하기",
        "block.mp3_play_control": "MP3 모듈 [PLAYSTATUS]",
        "block.mp3_play_mode": "MP3 재생 모드를 [PLAYMODE] 로 설정하기",
        "block.mp3_set_volume": "MP3 음량을 [VALUE] 로 설정하기",
        "menu.play.play": "재생",
        "menu.play.pause": "일시 정지",
        "menu.play.prev": "이전 트랙",
        "menu.play.next": "다음 트랙",
        "menu.mode.on": "한 곡 반복",
        "menu.mode.off": "한 곡 반복 해제"
    }
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
