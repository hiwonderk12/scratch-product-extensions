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
    aidoggy_io_port: {
        acceptReporters: false,
        items: [
            {text: 'E', value: '5'},
            {text: 'F', value: '6'}
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

export default class TouchSensorBlocks implements NativeExtension {
    constructor (private readonly context: ExtensionContext) {}

    // 积木身份、端口控件和SDK共同由适配选择，AiDoggy IO按端口命名对象。
    private adapter (): {opcode: string; menu: string; board: boolean; io: boolean} {
        if (this.context.variant === 'hiwonder-iic') {
            return {opcode: 'aiblocksboard_read_touch', menu: 'aiblocks_iicport', board: true, io: false};
        }
        if (this.context.variant === 'hiwonder-dev-io-aidoggy') {
            return {opcode: 'aidoggy_read_touch', menu: 'aidoggy_io_port', board: false, io: true};
        }
        if (this.context.variant === 'wonderlab') {
            return {opcode: 'aimech_read_touch', menu: 'aimech_iicport', board: false, io: false};
        }
        throw new Error('input/touch-sensor: 未支持的主控适配 ' + this.context.variant);
    }

    getInfo (): ExtensionInfo {
        const {opcode, menu} = this.adapter();
        return {
            id: "sensor",
            name: this.context.t(product.name),
            color1: "#7B68EE",
            color2: "#7B68EE",
            color3: "#7B68EE",
            menus: {
                [menu]: PORT_MENUS[menu]
            },
            blocks: [
                {
                    subCategory: this.context.t(product.name)
                },
                {
                    opcode,
                    blockType: "Boolean",
                    disableMonitor: true,
                    text: this.context.t('block.aimech_read_touch'),
                    arguments: {
                        PORT: {
                            type: "string",
                            defaultValue: this.context.defaultPort(opcode, 'PORT'),
                            menu,
                            literal: true
                        }
                    }
                }
            ]
        };
    }

    // 仅使用积木时收集初始化；对象名、端口字面值及生成接口保持旧工程语义。
    getPython () {
        const {opcode, board, io} = this.adapter();
        return {
            [opcode]: {
                template: io ? 'touch_{PORT}.read()' : 'touch.read_state()',
                imports: [
                    board ? "import Hiwonder_IIC" : "import Hiwonder_DEV"
                ],
                variables: [
                    ...(board ? ['iic = Hiwonder_IIC.IIC()'] : []),
                    board ? 'touch = Hiwonder_IIC.DEV_TOUCH(iic,{PORT})' :
                        io ? 'touch_{PORT} = Hiwonder_DEV.DEV_TOUCH_IO(Hiwonder_DEV.Port({PORT}))' :
                            'touch = Hiwonder_DEV.DEV_TOUCH(Hiwonder_DEV.Port({PORT}))'
                ]
            }
        };
    }
}
