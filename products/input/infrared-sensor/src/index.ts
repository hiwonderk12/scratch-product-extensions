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

export default class InfraredSensorBlocks implements NativeExtension {
    constructor (private readonly context: ExtensionContext) {}

    private usesRawIo (): boolean {
        if (!['wonderlab', 'hiwonder-dev-raw-io'].includes(this.context.variant)) {
            throw new Error('input/infrared-sensor: 未支持的主控适配 ' + this.context.variant);
        }
        return this.context.variant === 'hiwonder-dev-raw-io';
    }

    getInfo (): ExtensionInfo {
        const usesRawIo = this.usesRawIo();
        const portMenu = usesRawIo ? 'minihexa_io_single_port' : 'aimech_iicport';
        const block: ExtensionBlock = {
            opcode: "aimech_get_avoid_value",
            blockType: "Boolean",
            disableMonitor: true,
            ...(usesRawIo ? {hideFromPalette: true} : {}),
            text: this.context.t('block.aimech_get_avoid_value'),
            blockIconURI: this.context.asset('assets/avoid.svg'),
            arguments: {
                PORT: {
                    type: "string",
                    defaultValue: this.context.defaultPort('aimech_get_avoid_value', 'PORT'),
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
                [portMenu]: {
                    items: this.context.ports('sensor.' + portMenu),
                    acceptReporters: false
                },
                ...(usesRawIo ? {aimech_iicport: {items: this.context.ports('sensor.aimech_iicport'), acceptReporters: false}} : {})
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
