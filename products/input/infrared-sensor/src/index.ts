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
    minihexa_io_single_port: {
        acceptReporters: false,
        items: [
            {text: 'IO32-IO14', value: '32'},
            {text: 'IO18-IO19', value: '18'}
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

export default class InfraredSensorBlocks implements NativeExtension {
    constructor (private readonly context: ExtensionContext) {}

    // miniHexa保留原始IO；板端、AiDoggy与五AI分别使用IIC、aidoggy_iicport与DEV端口。
    private usesRawIo (): boolean {
        if (!['wonderlab', 'hiwonder-dev-raw-io', 'hiwonder-iic', 'hiwonder-dev-port-aidoggy'].includes(this.context.variant)) {
            throw new Error('input/infrared-sensor: 未支持的主控适配 ' + this.context.variant);
        }
        return this.context.variant === 'hiwonder-dev-raw-io';
    }

    getInfo (): ExtensionInfo {
        const usesRawIo = this.usesRawIo();
        const board = this.context.variant === 'hiwonder-iic';
        const {opcode} = board ? {opcode: 'aiblocks_get_avoid_value'} : {opcode: 'aimech_get_avoid_value'};
        const portMenu = board ? 'aiblocks_iicport' :
            usesRawIo ? 'minihexa_io_single_port' :
            this.context.variant === 'hiwonder-dev-port-aidoggy' ? 'aidoggy_iicport' : 'aimech_iicport';
        const block: ExtensionBlock = {
            opcode,
            blockType: "Boolean",
            disableMonitor: true,
            ...(usesRawIo ? {hideFromPalette: true} : {}),
            text: this.context.t('block.aimech_get_avoid_value'),
            blockIconURI: this.context.asset('assets/avoid.svg'),
            arguments: {
                PORT: {
                    type: "string",
                    defaultValue: this.context.defaultPort(opcode, 'PORT'),
                    menu: portMenu,
                    literal: true
                }
            }
        };
        return {
            id: "sensor",
            name: this.context.t(product.name),
            color1: "#7B68EE",
            color2: "#7B68EE",
            color3: "#7B68EE",
            menus: {
                [portMenu]: PORT_MENUS[portMenu],
                ...(usesRawIo ? {aimech_iicport: PORT_MENUS.aimech_iicport} : {})
            },
            blocks: [
                {
                    subCategory: this.context.t(product.name)
                },
                ...(usesRawIo ? [{...block, opcode: "minihexa_get_avoid_value", hideFromPalette: false}] : []),
                block
            ]
        };
    }

    // 仅使用积木时收集初始化；对象名、端口字面值及生成接口保持旧工程语义。
    getPython (): Record<string, PythonTemplate> {
        const usesRawIo = this.usesRawIo();
        if (this.context.variant === 'hiwonder-iic') {
            return {aiblocks_get_avoid_value: {
                template: 'ir_{PORT}.read_state()', imports: ['import Hiwonder_IIC'],
                variables: ['iic = Hiwonder_IIC.IIC()', 'ir_{PORT} = Hiwonder_IIC.DEV_IR(iic,{PORT})']
            }};
        }
        const rule = {
            template: usesRawIo ? "avoid_{PORT}.read()" : "ir_{PORT}.read_state()",
            imports: ["import Hiwonder_DEV"],
            variables: [usesRawIo ? "avoid_{PORT} = Hiwonder_DEV.DEV_IR({PORT})" :
                "ir_{PORT} = Hiwonder_DEV.DEV_IR(Hiwonder_DEV.Port({PORT}))"]
        };
        return usesRawIo ? {minihexa_get_avoid_value: rule, aimech_get_avoid_value: rule} :
            {aimech_get_avoid_value: rule};
    }
}
