import type {ExtensionContext, ExtensionInfo, NativeExtension} from '../../../../tools/sdk';

// 模块积木、菜单、集中四语文案和 Python 规则只在本文件维护。
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

export const product = {
    name: "product.name",
    supportedLocales: [
        "zh-cn",
        "en",
        "zh-tw",
        "ko"
    ]
} as const;

const PORT_MENUS: Record<string, {acceptReporters: boolean; items: Array<{text: string; value: string}>}> = {
    aiblocks_iicport: {
        acceptReporters: false,
        items: [
            {text: 'A', value: '1'},
            {text: 'B', value: '2'},
            {text: 'C', value: '3'},
            {text: 'D', value: '4'}
        ]
    },
    aimech_iicport: {
        acceptReporters: false,
        items: [
            {text: 'A', value: '1'},
            {text: 'B', value: '2'},
            {text: 'C', value: '3'},
            {text: 'D', value: '4'},
            {text: 'E', value: '5'},
            {text: 'J', value: '9'},
            {text: 'K', value: '10'}
        ]
    }
};

export default class SoundSensorBlocks implements NativeExtension {
    constructor (private readonly context: ExtensionContext) {}

    // 同时选择积木身份、端口菜单和驱动；wonderlab是已登记的五AI适配，不作默认回退。
    private adapter (): {opcode: string; portMenu: string; board: boolean} {
        if (this.context.variant === 'hiwonder-iic') {
            return {opcode: 'aiblocksboard_read_sound', portMenu: 'aiblocks_iicport', board: true};
        }
        if (this.context.variant === 'wonderlab') {
            return {opcode: 'aimech_read_sound', portMenu: 'aimech_iicport', board: false};
        }
        throw new Error('input/sound-sensor: 未知适配 ' + this.context.variant);
    }

    getInfo (): ExtensionInfo {
        const {opcode, portMenu} = this.adapter();
        return {
            id: "sensor",
            name: this.context.t(product.name),
            color1: "#7B68EE",
            color2: "#7B68EE",
            color3: "#7B68EE",
            menus: {
                [portMenu]: PORT_MENUS[portMenu]
            },
            blocks: [
                {
                    subCategory: this.context.t(product.name)
                },
                {
                    opcode,
                    blockType: "reporter",
                    disableMonitor: true,
                    text: this.context.t('block.aimech_read_sound'),
                    arguments: {
                        PORT: {
                            type: "string",
                            defaultValue: this.context.defaultPort(opcode, 'PORT'),
                            menu: portMenu,
                            literal: true
                        }
                    }
                }
            ]
        };
    }

    // 仅使用积木时收集初始化；对象名、端口字面值及生成接口保持旧工程语义。
    getPython () {
        const {opcode, board} = this.adapter();
        return {
            [opcode]: {
                template: "sound.read_value()",
                imports: [
                    board ? "import Hiwonder_IIC" : "import Hiwonder_DEV"
                ],
                variables: [
                    ...(board ? ["iic = Hiwonder_IIC.IIC()"] : []),
                    board ? "sound = Hiwonder_IIC.DEV_SOUND(iic,{PORT})" :
                        "sound = Hiwonder_DEV.DEV_SOUND(Hiwonder_DEV.Port({PORT}))"
                ]
            }
        };
    }
}
