import type {ExtensionBlock, ExtensionContext, ExtensionInfo, NativeExtension, PythonTemplate} from '../../../../tools/sdk';

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
    aidoggy_iicport: {
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

    // 积木身份、端口控件和SDK共同由适配选择；AiDoggy 1.4.0 改用常规 IIC 端口并隐藏保留旧 IO 积木兼容。
    private adapter (): {opcode: string; menu: string; board: boolean; io: boolean; aidoggyPort: boolean} {
        if (this.context.variant === 'hiwonder-iic') {
            return {opcode: 'aiblocksboard_read_touch', menu: 'aiblocks_iicport', board: true, io: false, aidoggyPort: false};
        }
        if (['wonderlab', 'hiwonder-dev-port-aidoggy'].includes(this.context.variant)) {
            const aidoggyPort = this.context.variant === 'hiwonder-dev-port-aidoggy';
            return {
                opcode: 'aimech_read_touch',
                menu: aidoggyPort ? 'aidoggy_iicport' : 'aimech_iicport',
                board: false,
                io: false,
                aidoggyPort
            };
        }
        if (this.context.variant === 'hiwonder-dev-io-aidoggy') {
            return {opcode: 'aidoggy_read_touch', menu: 'aidoggy_io_port', board: false, io: true, aidoggyPort: false};
        }
        throw new Error('input/touch-sensor: 未支持的主控适配 ' + this.context.variant);
    }

    getInfo (): ExtensionInfo {
        const {opcode, menu, aidoggyPort} = this.adapter();
        const legacyAidoggyOpcode = 'aidoggy_read_touch';
        const blocks: Array<ExtensionBlock | {subCategory: string}> = [
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
        ];
        if (aidoggyPort) {
            blocks.push({
                opcode: legacyAidoggyOpcode,
                blockType: "Boolean",
                disableMonitor: true,
                hideFromPalette: true,
                text: this.context.t('block.aimech_read_touch'),
                arguments: {
                    PORT: {
                        type: "string",
                        defaultValue: this.context.defaultPort(legacyAidoggyOpcode, 'PORT'),
                        menu: "aidoggy_io_port",
                        literal: true
                    }
                }
            });
        }
        return {
            id: "sensor",
            name: this.context.t(product.name),
            color1: "#7B68EE",
            color2: "#7B68EE",
            color3: "#7B68EE",
            menus: {
                [menu]: PORT_MENUS[menu],
                ...(aidoggyPort ? {aidoggy_io_port: PORT_MENUS.aidoggy_io_port} : {})
            },
            blocks
        };
    }

    // 仅使用积木时收集初始化；对象名、端口字面值及生成接口保持旧工程语义。
    getPython (): Record<string, PythonTemplate> {
        const {opcode, board, io, aidoggyPort} = this.adapter();
        const legacyIoRule: PythonTemplate = {
            template: 'touch_{PORT}.read()',
            imports: ['import Hiwonder_DEV'],
            variables: ['touch_{PORT} = Hiwonder_DEV.DEV_TOUCH_IO(Hiwonder_DEV.Port({PORT}))']
        };
        if (io) {
            return {[opcode]: legacyIoRule};
        }
        return {
            [opcode]: {
                template: 'touch.read_state()',
                imports: [
                    board ? "import Hiwonder_IIC" : "import Hiwonder_DEV"
                ],
                variables: [
                    ...(board ? ['iic = Hiwonder_IIC.IIC()'] : []),
                    board ? 'touch = Hiwonder_IIC.DEV_TOUCH(iic,{PORT})' :
                        'touch = Hiwonder_DEV.DEV_TOUCH(Hiwonder_DEV.Port({PORT}))'
                ]
            },
            ...(aidoggyPort ? {aidoggy_read_touch: legacyIoRule} : {})
        };
    }
}
