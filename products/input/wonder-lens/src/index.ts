// WonderLens 作者入口：集中维护三种初始化、完整功能、层级分类、四语与 Python。
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

export default class WonderLensBlocks implements NativeExtension {
    constructor (private readonly context: ExtensionContext) {}

    private checkVariant (): void {
        if (!['hiwonder-dev-port', 'hiwonder-dev-onboard', 'hiwonder-iic'].includes(this.context.variant)) {
            throw new Error('wonder-lens: 未支持的主控适配 ' + this.context.variant);
        }
    }

    getInfo (): ExtensionInfo {
        this.checkVariant();
        let initialization: ExtensionBlock;
        if (this.context.variant === 'hiwonder-dev-port') {
            initialization = {
                opcode: "aimech_wondercamInitI2c",
                blockType: "command",
                text: this.context.t('block.aimech_wondercamInitI2c'),
                blockIconURI: this.context.asset('assets/cam.svg'),
                arguments: {
                    IICPORT: {
                        type: "string",
                        defaultValue: this.context.defaultPort('aimech_wondercamInitI2c', 'IICPORT'),
                        menu: "aimech_iicport",
                        literal: true
                    }
                }
            };
        } else if (this.context.variant === 'hiwonder-dev-onboard') {
            initialization = {
                opcode: "minihexa_wondercamInitI2c",
                blockType: "command",
                text: this.context.t('block.minihexa_wondercamInitI2c'),
                blockIconURI: this.context.asset('assets/cam.svg'),
                arguments: {}
            };
        } else {
            initialization = {
                opcode: "aiblocks_wondercamInitI2c",
                blockType: "command",
                text: this.context.t('block.aiblocks_wondercamInitI2c'),
                blockIconURI: this.context.asset('assets/cam.svg'),
                arguments: {
                    IICPORT: {
                        type: "string",
                        defaultValue: this.context.defaultPort('aiblocks_wondercamInitI2c', 'IICPORT'),
                        menu: "aiblocks_iicport",
                        literal: true
                    }
                }
            };
        }
        const menus: NonNullable<ExtensionInfo['menus']> = {
            funcNum: {
                acceptReporters: false,
                items: [
                    {
                        text: this.context.t('menu.funcNum.0'),
                        value: "0"
                    },
                    {
                        text: this.context.t('menu.funcNum.1'),
                        value: "1"
                    },
                    {
                        text: this.context.t('menu.funcNum.2'),
                        value: "2"
                    },
                    {
                        text: this.context.t('menu.funcNum.3'),
                        value: "3"
                    },
                    {
                        text: this.context.t('menu.funcNum.4'),
                        value: "4"
                    },
                    {
                        text: this.context.t('menu.funcNum.5'),
                        value: "5"
                    },
                    {
                        text: this.context.t('menu.funcNum.6'),
                        value: "6"
                    },
                    {
                        text: this.context.t('menu.funcNum.7'),
                        value: "7"
                    },
                    {
                        text: this.context.t('menu.funcNum.8'),
                        value: "8"
                    },
                    {
                        text: this.context.t('menu.funcNum.9'),
                        value: "9"
                    },
                    {
                        text: this.context.t('menu.funcNum.10'),
                        value: "10"
                    },
                    {
                        text: this.context.t('menu.funcNum.11'),
                        value: "11"
                    }
                ]
            },
            onOff: {
                acceptReporters: false,
                items: [
                    {
                        text: this.context.t('menu.onOff.1'),
                        value: "1"
                    },
                    {
                        text: this.context.t('menu.onOff.0'),
                        value: "0"
                    }
                ]
            },
            wonderLensColorResult: {
                acceptReporters: false,
                items: [
                    {
                        text: this.context.t('menu.wonderLensColorResult.0'),
                        value: "0"
                    },
                    {
                        text: this.context.t('menu.wonderLensColorResult.1'),
                        value: "1"
                    },
                    {
                        text: this.context.t('menu.wonderLensColorResult.2'),
                        value: "2"
                    },
                    {
                        text: this.context.t('menu.wonderLensColorResult.3'),
                        value: "3"
                    }
                ]
            },
            wonderLensLandmarkIds: {
                acceptReporters: false,
                items: [
                    {
                        text: this.context.t('menu.wonderLensLandmarkIds.1'),
                        value: "1"
                    },
                    {
                        text: this.context.t('menu.wonderLensLandmarkIds.2'),
                        value: "2"
                    },
                    {
                        text: this.context.t('menu.wonderLensLandmarkIds.3'),
                        value: "3"
                    },
                    {
                        text: this.context.t('menu.wonderLensLandmarkIds.4'),
                        value: "4"
                    },
                    {
                        text: this.context.t('menu.wonderLensLandmarkIds.5'),
                        value: "5"
                    }
                ]
            },
            wonderLensLineResult: {
                acceptReporters: false,
                items: [
                    {
                        text: this.context.t('menu.wonderLensLineResult.0'),
                        value: "0"
                    },
                    {
                        text: this.context.t('menu.wonderLensLineResult.1'),
                        value: "1"
                    },
                    {
                        text: this.context.t('menu.wonderLensLineResult.2'),
                        value: "2"
                    },
                    {
                        text: this.context.t('menu.wonderLensLineResult.3'),
                        value: "3"
                    },
                    {
                        text: this.context.t('menu.wonderLensLineResult.4'),
                        value: "4"
                    },
                    {
                        text: this.context.t('menu.wonderLensLineResult.5'),
                        value: "5"
                    }
                ]
            },
            wonderLensNumberIds: {
                acceptReporters: false,
                items: [
                    {
                        text: "1",
                        value: "1"
                    },
                    {
                        text: "2",
                        value: "2"
                    },
                    {
                        text: "3",
                        value: "3"
                    },
                    {
                        text: "4",
                        value: "4"
                    },
                    {
                        text: "5",
                        value: "5"
                    },
                    {
                        text: "6",
                        value: "6"
                    }
                ]
            },
            wonderLensObjects: {
                acceptReporters: false,
                items: [
                    {
                        text: this.context.t('menu.wonderLensObjects.1'),
                        value: "1"
                    },
                    {
                        text: this.context.t('menu.wonderLensObjects.2'),
                        value: "2"
                    },
                    {
                        text: this.context.t('menu.wonderLensObjects.3'),
                        value: "3"
                    },
                    {
                        text: this.context.t('menu.wonderLensObjects.4'),
                        value: "4"
                    },
                    {
                        text: this.context.t('menu.wonderLensObjects.5'),
                        value: "5"
                    },
                    {
                        text: this.context.t('menu.wonderLensObjects.6'),
                        value: "6"
                    },
                    {
                        text: this.context.t('menu.wonderLensObjects.7'),
                        value: "7"
                    },
                    {
                        text: this.context.t('menu.wonderLensObjects.8'),
                        value: "8"
                    },
                    {
                        text: this.context.t('menu.wonderLensObjects.9'),
                        value: "9"
                    },
                    {
                        text: this.context.t('menu.wonderLensObjects.10'),
                        value: "10"
                    },
                    {
                        text: this.context.t('menu.wonderLensObjects.11'),
                        value: "11"
                    },
                    {
                        text: this.context.t('menu.wonderLensObjects.12'),
                        value: "12"
                    },
                    {
                        text: this.context.t('menu.wonderLensObjects.13'),
                        value: "13"
                    },
                    {
                        text: this.context.t('menu.wonderLensObjects.14'),
                        value: "14"
                    },
                    {
                        text: this.context.t('menu.wonderLensObjects.15'),
                        value: "15"
                    },
                    {
                        text: this.context.t('menu.wonderLensObjects.16'),
                        value: "16"
                    },
                    {
                        text: this.context.t('menu.wonderLensObjects.17'),
                        value: "17"
                    },
                    {
                        text: this.context.t('menu.wonderLensObjects.18'),
                        value: "18"
                    },
                    {
                        text: this.context.t('menu.wonderLensObjects.19'),
                        value: "19"
                    },
                    {
                        text: this.context.t('menu.wonderLensObjects.20'),
                        value: "20"
                    }
                ]
            },
            wonderLensTagResult: {
                acceptReporters: false,
                items: [
                    {
                        text: this.context.t('menu.wonderLensTagResult.0'),
                        value: "0"
                    },
                    {
                        text: this.context.t('menu.wonderLensTagResult.1'),
                        value: "1"
                    },
                    {
                        text: this.context.t('menu.wonderLensTagResult.2'),
                        value: "2"
                    },
                    {
                        text: this.context.t('menu.wonderLensTagResult.3'),
                        value: "3"
                    },
                    {
                        text: this.context.t('menu.wonderLensTagResult.4'),
                        value: "4"
                    },
                    {
                        text: this.context.t('menu.wonderLensTagResult.5'),
                        value: "5"
                    },
                    {
                        text: this.context.t('menu.wonderLensTagResult.6'),
                        value: "6"
                    },
                    {
                        text: this.context.t('menu.wonderLensTagResult.7'),
                        value: "7"
                    },
                    {
                        text: this.context.t('menu.wonderLensTagResult.8'),
                        value: "8"
                    },
                    {
                        text: this.context.t('menu.wonderLensTagResult.9'),
                        value: "9"
                    }
                ]
            }
        };
        if (this.context.variant !== 'hiwonder-dev-onboard') {
            const menu = this.context.variant === 'hiwonder-dev-port' ? 'aimech_iicport' : 'aiblocks_iicport';
            menus[menu] = {acceptReporters: false, items: this.context.ports('sensor.' + menu)};
        }
        return {
            id: "sensor",
            name: this.context.t(product.name),
            color1: "#7B68EE",
            color2: "#7B68EE",
            color3: "#7B68EE",
            menus: menus,
            blocks: [
                {
                    subCategory: this.context.t(product.name),
                    toolboxCategoryId: "sensor__wonder-lens",
                    toolboxIconURI: this.context.asset('assets/cam_menu.svg')
                },
                initialization,
                {
                    opcode: "getFwVersion",
                    blockType: "reporter",
                    disableMonitor: true,
                    text: this.context.t('block.getFwVersion'),
                    blockIconURI: this.context.asset('assets/cam.svg'),
                    arguments: {}
                },
                {
                    opcode: "getFuncNumber",
                    blockType: "reporter",
                    disableMonitor: true,
                    text: this.context.t('block.getFuncNumber'),
                    blockIconURI: this.context.asset('assets/cam.svg'),
                    arguments: {
                        NUM: {
                            type: "string",
                            defaultValue: "0",
                            menu: "funcNum",
                            literal: true
                        }
                    }
                },
                {
                    opcode: "getCurrentFunc",
                    blockType: "reporter",
                    disableMonitor: true,
                    text: this.context.t('block.getCurrentFunc'),
                    blockIconURI: this.context.asset('assets/cam.svg'),
                    arguments: {}
                },
                {
                    opcode: "switchFunc",
                    blockType: "command",
                    text: this.context.t('block.switchFunc'),
                    blockIconURI: this.context.asset('assets/cam.svg'),
                    arguments: {
                        NUM: {
                            type: "string",
                            defaultValue: "0",
                            menu: "funcNum",
                            literal: true
                        }
                    }
                },
                {
                    opcode: "setLed",
                    blockType: "command",
                    text: this.context.t('block.setLed'),
                    blockIconURI: this.context.asset('assets/cam.svg'),
                    arguments: {
                        ONOFF: {
                            type: "string",
                            defaultValue: "1",
                            menu: "onOff",
                            literal: true
                        }
                    }
                },
                {
                    opcode: "wondercamUpdateResult",
                    blockType: "command",
                    text: this.context.t('block.wondercamUpdateResult'),
                    blockIconURI: this.context.asset('assets/cam.svg'),
                    arguments: {}
                },
                {
                    subCategory: 'WonderLens · ' + this.context.t('group.wonder-lens-face'),
                    toolboxCategoryId: "sensor__wonder-lens__wonder-lens-face",
                    toolboxParentId: "sensor__wonder-lens",
                    toolboxSubcategoryLabel: this.context.t('group.wonder-lens-face')
                },
                {
                    opcode: "isAnyFaceDetected",
                    blockType: "Boolean",
                    disableMonitor: true,
                    text: this.context.t('block.isAnyFaceDetected'),
                    blockIconURI: this.context.asset('assets/cam.svg'),
                    arguments: {}
                },
                {
                    opcode: "numOfDetectedFaces",
                    blockType: "reporter",
                    disableMonitor: true,
                    text: this.context.t('block.numOfDetectedFaces'),
                    blockIconURI: this.context.asset('assets/cam.svg'),
                    arguments: {}
                },
                {
                    opcode: "isAnyLearnedFaceRec",
                    blockType: "Boolean",
                    disableMonitor: true,
                    text: this.context.t('block.isAnyLearnedFaceRec'),
                    blockIconURI: this.context.asset('assets/cam.svg'),
                    arguments: {}
                },
                {
                    opcode: "numOfLearnedFaceRec",
                    blockType: "reporter",
                    disableMonitor: true,
                    text: this.context.t('block.numOfLearnedFaceRec'),
                    blockIconURI: this.context.asset('assets/cam.svg'),
                    arguments: {}
                },
                {
                    opcode: "isAnyUnlearnedFaceDetected",
                    blockType: "Boolean",
                    disableMonitor: true,
                    text: this.context.t('block.isAnyUnlearnedFaceDetected'),
                    blockIconURI: this.context.asset('assets/cam.svg'),
                    arguments: {}
                },
                {
                    opcode: "isFaceOfIdRec",
                    blockType: "Boolean",
                    disableMonitor: true,
                    text: this.context.t('block.isFaceOfIdRec'),
                    blockIconURI: this.context.asset('assets/cam.svg'),
                    arguments: {
                        NUM: {
                            type: "number",
                            defaultValue: 1
                        }
                    }
                },
                {
                    opcode: "getFaceOfId",
                    blockType: "reporter",
                    disableMonitor: true,
                    text: this.context.t('block.getFaceOfId'),
                    blockIconURI: this.context.asset('assets/cam.svg'),
                    arguments: {
                        NUM: {
                            type: "number",
                            defaultValue: 1
                        },
                        POS: {
                            type: "string",
                            defaultValue: "0",
                            menu: "wonderLensColorResult",
                            literal: true
                        }
                    }
                },
                {
                    opcode: "getUnlearnedFaceOfIndex",
                    blockType: "reporter",
                    disableMonitor: true,
                    text: this.context.t('block.getUnlearnedFaceOfIndex'),
                    blockIconURI: this.context.asset('assets/cam.svg'),
                    arguments: {
                        NUM: {
                            type: "number",
                            defaultValue: 1
                        },
                        POS: {
                            type: "string",
                            defaultValue: "0",
                            menu: "wonderLensColorResult",
                            literal: true
                        }
                    }
                },
                {
                    subCategory: 'WonderLens · ' + this.context.t('group.wonder-lens-object'),
                    toolboxCategoryId: "sensor__wonder-lens__wonder-lens-object",
                    toolboxParentId: "sensor__wonder-lens",
                    toolboxSubcategoryLabel: this.context.t('group.wonder-lens-object')
                },
                {
                    opcode: "isAnyObjDetected",
                    blockType: "Boolean",
                    disableMonitor: true,
                    text: this.context.t('block.isAnyObjDetected'),
                    blockIconURI: this.context.asset('assets/cam.svg'),
                    arguments: {}
                },
                {
                    opcode: "isObjOfIdDetected",
                    blockType: "Boolean",
                    disableMonitor: true,
                    text: this.context.t('block.isObjOfIdDetected'),
                    blockIconURI: this.context.asset('assets/cam.svg'),
                    arguments: {
                        NUM: {
                            type: "string",
                            defaultValue: "1",
                            menu: "wonderLensObjects",
                            literal: true
                        }
                    }
                },
                {
                    opcode: "getObjTotal",
                    blockType: "reporter",
                    disableMonitor: true,
                    text: this.context.t('block.getObjTotal'),
                    blockIconURI: this.context.asset('assets/cam.svg'),
                    arguments: {
                        NUM: {
                            type: "string",
                            defaultValue: "1",
                            menu: "wonderLensObjects",
                            literal: true
                        }
                    }
                },
                {
                    opcode: "getObjOfId",
                    blockType: "reporter",
                    disableMonitor: true,
                    text: this.context.t('block.getObjOfId'),
                    blockIconURI: this.context.asset('assets/cam.svg'),
                    arguments: {
                        INDEX: {
                            type: "number",
                            defaultValue: 1
                        },
                        NUM: {
                            type: "string",
                            defaultValue: "1",
                            menu: "wonderLensObjects",
                            literal: true
                        },
                        POS: {
                            type: "string",
                            defaultValue: "0",
                            menu: "wonderLensColorResult",
                            literal: true
                        }
                    }
                },
                {
                    subCategory: 'WonderLens · ' + this.context.t('group.wonder-lens-classification'),
                    toolboxCategoryId: "sensor__wonder-lens__wonder-lens-classification",
                    toolboxParentId: "sensor__wonder-lens",
                    toolboxSubcategoryLabel: this.context.t('group.wonder-lens-classification')
                },
                {
                    opcode: "getClMaxProbId",
                    blockType: "reporter",
                    disableMonitor: true,
                    text: this.context.t('block.getClMaxProbId'),
                    blockIconURI: this.context.asset('assets/cam.svg'),
                    arguments: {}
                },
                {
                    opcode: "getClnMaxProb",
                    blockType: "reporter",
                    disableMonitor: true,
                    text: this.context.t('block.getClnMaxProb'),
                    blockIconURI: this.context.asset('assets/cam.svg'),
                    arguments: {}
                },
                {
                    opcode: "getClnProbOfId",
                    blockType: "reporter",
                    disableMonitor: true,
                    text: this.context.t('block.getClnProbOfId'),
                    blockIconURI: this.context.asset('assets/cam.svg'),
                    arguments: {
                        INDEX: {
                            type: "number",
                            defaultValue: 1
                        }
                    }
                },
                {
                    subCategory: 'WonderLens · ' + this.context.t('group.wonder-lens-feature'),
                    toolboxCategoryId: "sensor__wonder-lens__wonder-lens-feature",
                    toolboxParentId: "sensor__wonder-lens",
                    toolboxSubcategoryLabel: this.context.t('group.wonder-lens-feature')
                },
                {
                    opcode: "getFLMaxProbId",
                    blockType: "reporter",
                    disableMonitor: true,
                    text: this.context.t('block.getFLMaxProbId'),
                    blockIconURI: this.context.asset('assets/cam.svg'),
                    arguments: {}
                },
                {
                    opcode: "getFLnMaxProb",
                    blockType: "reporter",
                    disableMonitor: true,
                    text: this.context.t('block.getFLnMaxProb'),
                    blockIconURI: this.context.asset('assets/cam.svg'),
                    arguments: {}
                },
                {
                    opcode: "getFLnProbOfId",
                    blockType: "reporter",
                    disableMonitor: true,
                    text: this.context.t('block.getFLnProbOfId'),
                    blockIconURI: this.context.asset('assets/cam.svg'),
                    arguments: {
                        INDEX: {
                            type: "number",
                            defaultValue: 1
                        }
                    }
                },
                {
                    subCategory: 'WonderLens · ' + this.context.t('group.wonder-lens-color'),
                    toolboxCategoryId: "sensor__wonder-lens__wonder-lens-color",
                    toolboxParentId: "sensor__wonder-lens",
                    toolboxSubcategoryLabel: this.context.t('group.wonder-lens-color')
                },
                {
                    opcode: "isAnyColorDetectd",
                    blockType: "Boolean",
                    disableMonitor: true,
                    text: this.context.t('block.isAnyColorDetectd'),
                    blockIconURI: this.context.asset('assets/cam.svg'),
                    arguments: {}
                },
                {
                    opcode: "numOfColorDetected",
                    blockType: "reporter",
                    disableMonitor: true,
                    text: this.context.t('block.numOfColorDetected'),
                    blockIconURI: this.context.asset('assets/cam.svg'),
                    arguments: {}
                },
                {
                    opcode: "isColorOfIdDetected",
                    blockType: "Boolean",
                    disableMonitor: true,
                    text: this.context.t('block.isColorOfIdDetected'),
                    blockIconURI: this.context.asset('assets/cam.svg'),
                    arguments: {
                        NUM: {
                            type: "number",
                            defaultValue: 1
                        }
                    }
                },
                {
                    opcode: "getColorOfId",
                    blockType: "reporter",
                    disableMonitor: true,
                    text: this.context.t('block.getColorOfId'),
                    blockIconURI: this.context.asset('assets/cam.svg'),
                    arguments: {
                        NUM: {
                            type: "number",
                            defaultValue: 1
                        },
                        POS: {
                            type: "string",
                            defaultValue: "0",
                            menu: "wonderLensColorResult",
                            literal: true
                        }
                    }
                },
                {
                    subCategory: 'WonderLens · ' + this.context.t('group.wonder-lens-line'),
                    toolboxCategoryId: "sensor__wonder-lens__wonder-lens-line",
                    toolboxParentId: "sensor__wonder-lens",
                    toolboxSubcategoryLabel: this.context.t('group.wonder-lens-line')
                },
                {
                    opcode: "isAnyLineDetected",
                    blockType: "Boolean",
                    disableMonitor: true,
                    text: this.context.t('block.isAnyLineDetected'),
                    blockIconURI: this.context.asset('assets/cam.svg'),
                    arguments: {}
                },
                {
                    opcode: "setRoi",
                    blockType: "command",
                    text: this.context.t('block.setRoi'),
                    blockIconURI: this.context.asset('assets/cam.svg'),
                    arguments: {
                        XPOS: {
                            type: "number",
                            defaultValue: 0
                        },
                        YPOS: {
                            type: "number",
                            defaultValue: 0
                        },
                        WIDTH: {
                            type: "number",
                            defaultValue: 320
                        },
                        HEIGHT: {
                            type: "number",
                            defaultValue: 240
                        }
                    }
                },
                {
                    opcode: "numOfLineDetected",
                    blockType: "reporter",
                    disableMonitor: true,
                    text: this.context.t('block.numOfLineDetected'),
                    blockIconURI: this.context.asset('assets/cam.svg'),
                    arguments: {}
                },
                {
                    opcode: "isLineOfIdDetected",
                    blockType: "Boolean",
                    disableMonitor: true,
                    text: this.context.t('block.isLineOfIdDetected'),
                    blockIconURI: this.context.asset('assets/cam.svg'),
                    arguments: {
                        NUM: {
                            type: "number",
                            defaultValue: 1
                        }
                    }
                },
                {
                    opcode: "getLineOfId",
                    blockType: "reporter",
                    disableMonitor: true,
                    text: this.context.t('block.getLineOfId'),
                    blockIconURI: this.context.asset('assets/cam.svg'),
                    arguments: {
                        NUM: {
                            type: "number",
                            defaultValue: 1
                        },
                        POS: {
                            type: "string",
                            defaultValue: "0",
                            menu: "wonderLensLineResult",
                            literal: true
                        }
                    }
                },
                {
                    subCategory: 'WonderLens · ' + this.context.t('group.wonder-lens-tag'),
                    toolboxCategoryId: "sensor__wonder-lens__wonder-lens-tag",
                    toolboxParentId: "sensor__wonder-lens",
                    toolboxSubcategoryLabel: this.context.t('group.wonder-lens-tag')
                },
                {
                    opcode: "isAnyTagDetected",
                    blockType: "Boolean",
                    disableMonitor: true,
                    text: this.context.t('block.isAnyTagDetected'),
                    blockIconURI: this.context.asset('assets/cam.svg'),
                    arguments: {}
                },
                {
                    opcode: "numOfTagDetected",
                    blockType: "reporter",
                    disableMonitor: true,
                    text: this.context.t('block.numOfTagDetected'),
                    blockIconURI: this.context.asset('assets/cam.svg'),
                    arguments: {}
                },
                {
                    opcode: "isTagOfIdDetected",
                    blockType: "Boolean",
                    disableMonitor: true,
                    text: this.context.t('block.isTagOfIdDetected'),
                    blockIconURI: this.context.asset('assets/cam.svg'),
                    arguments: {
                        NUM: {
                            type: "number",
                            defaultValue: 1
                        }
                    }
                },
                {
                    opcode: "numOfTagIdDetected",
                    blockType: "reporter",
                    disableMonitor: true,
                    text: this.context.t('block.numOfTagIdDetected'),
                    blockIconURI: this.context.asset('assets/cam.svg'),
                    arguments: {
                        NUM: {
                            type: "number",
                            defaultValue: 1
                        }
                    }
                },
                {
                    opcode: "getDataOfTagIdIndex",
                    blockType: "reporter",
                    disableMonitor: true,
                    text: this.context.t('block.getDataOfTagIdIndex'),
                    blockIconURI: this.context.asset('assets/cam.svg'),
                    arguments: {
                        INDEX: {
                            type: "number",
                            defaultValue: 1
                        },
                        NUM: {
                            type: "number",
                            defaultValue: 1
                        },
                        POS: {
                            type: "string",
                            defaultValue: "0",
                            menu: "wonderLensTagResult",
                            literal: true
                        }
                    }
                },
                {
                    subCategory: 'WonderLens · ' + this.context.t('group.wonder-lens-qr'),
                    toolboxCategoryId: "sensor__wonder-lens__wonder-lens-qr",
                    toolboxParentId: "sensor__wonder-lens",
                    toolboxSubcategoryLabel: this.context.t('group.wonder-lens-qr')
                },
                {
                    opcode: "isAnyQrCodeDetected",
                    blockType: "Boolean",
                    disableMonitor: true,
                    text: this.context.t('block.isAnyQrCodeDetected'),
                    blockIconURI: this.context.asset('assets/cam.svg'),
                    arguments: {}
                },
                {
                    opcode: "lenOfQrCodeData",
                    blockType: "reporter",
                    disableMonitor: true,
                    text: this.context.t('block.lenOfQrCodeData'),
                    blockIconURI: this.context.asset('assets/cam.svg'),
                    arguments: {}
                },
                {
                    opcode: "getStrFromQrCode",
                    blockType: "reporter",
                    disableMonitor: true,
                    text: this.context.t('block.getStrFromQrCode'),
                    blockIconURI: this.context.asset('assets/cam.svg'),
                    arguments: {}
                },
                {
                    opcode: "getBytesFromCode",
                    blockType: "reporter",
                    disableMonitor: true,
                    text: this.context.t('block.getBytesFromCode'),
                    blockIconURI: this.context.asset('assets/cam.svg'),
                    arguments: {}
                },
                {
                    subCategory: 'WonderLens · ' + this.context.t('group.wonder-lens-barcode'),
                    toolboxCategoryId: "sensor__wonder-lens__wonder-lens-barcode",
                    toolboxParentId: "sensor__wonder-lens",
                    toolboxSubcategoryLabel: this.context.t('group.wonder-lens-barcode')
                },
                {
                    opcode: "isAnyBarCodeDetected",
                    blockType: "Boolean",
                    disableMonitor: true,
                    text: this.context.t('block.isAnyBarCodeDetected'),
                    blockIconURI: this.context.asset('assets/cam.svg'),
                    arguments: {}
                },
                {
                    opcode: "lenOfBarCode",
                    blockType: "reporter",
                    disableMonitor: true,
                    text: this.context.t('block.lenOfBarCode'),
                    blockIconURI: this.context.asset('assets/cam.svg'),
                    arguments: {}
                },
                {
                    opcode: "getStrFromBarCode",
                    blockType: "reporter",
                    disableMonitor: true,
                    text: this.context.t('block.getStrFromBarCode'),
                    blockIconURI: this.context.asset('assets/cam.svg'),
                    arguments: {}
                },
                {
                    opcode: "getBytesFromBarCode",
                    blockType: "reporter",
                    disableMonitor: true,
                    text: this.context.t('block.getBytesFromBarCode'),
                    blockIconURI: this.context.asset('assets/cam.svg'),
                    arguments: {}
                },
                {
                    subCategory: 'WonderLens · ' + this.context.t('group.wonder-lens-number'),
                    toolboxCategoryId: "sensor__wonder-lens__wonder-lens-number",
                    toolboxParentId: "sensor__wonder-lens",
                    toolboxSubcategoryLabel: this.context.t('group.wonder-lens-number')
                },
                {
                    opcode: "getNumTagMaxProbId",
                    blockType: "reporter",
                    disableMonitor: true,
                    text: this.context.t('block.getNumTagMaxProbId'),
                    blockIconURI: this.context.asset('assets/cam.svg'),
                    arguments: {}
                },
                {
                    opcode: "getNumTagMaxProb",
                    blockType: "reporter",
                    disableMonitor: true,
                    text: this.context.t('block.getNumTagMaxProb'),
                    blockIconURI: this.context.asset('assets/cam.svg'),
                    arguments: {}
                },
                {
                    opcode: "getNumTagProbOfId",
                    blockType: "reporter",
                    disableMonitor: true,
                    text: this.context.t('block.getNumTagProbOfId'),
                    blockIconURI: this.context.asset('assets/cam.svg'),
                    arguments: {
                        INDEX: {
                            type: "string",
                            defaultValue: "1",
                            menu: "wonderLensNumberIds",
                            literal: true
                        }
                    }
                },
                {
                    subCategory: 'WonderLens · ' + this.context.t('group.wonder-lens-landmark'),
                    toolboxCategoryId: "sensor__wonder-lens__wonder-lens-landmark",
                    toolboxParentId: "sensor__wonder-lens",
                    toolboxSubcategoryLabel: this.context.t('group.wonder-lens-landmark')
                },
                {
                    opcode: "getOrientionTagMaxProbId",
                    blockType: "reporter",
                    disableMonitor: true,
                    text: this.context.t('block.getOrientionTagMaxProbId'),
                    blockIconURI: this.context.asset('assets/cam.svg'),
                    arguments: {}
                },
                {
                    opcode: "getOrientionTagMaxProb",
                    blockType: "reporter",
                    disableMonitor: true,
                    text: this.context.t('block.getOrientionTagMaxProb'),
                    blockIconURI: this.context.asset('assets/cam.svg'),
                    arguments: {}
                },
                {
                    opcode: "getOrientionTagProbOfId",
                    blockType: "reporter",
                    disableMonitor: true,
                    text: this.context.t('block.getOrientionTagProbOfId'),
                    blockIconURI: this.context.asset('assets/cam.svg'),
                    arguments: {
                        ORIENTION: {
                            type: "string",
                            defaultValue: "1",
                            menu: "wonderLensLandmarkIds",
                            literal: true
                        }
                    }
                }
            ]
        };
    }

    // 每个适配只注册自己的初始化；读取和更新不隐式创建 cam，也不执行硬件操作。
    getPython (): Record<string, PythonTemplate> {
        this.checkVariant();
        let initialization: Record<string, PythonTemplate>;
        if (this.context.variant === 'hiwonder-dev-port') {
            initialization = {
                aimech_wondercamInitI2c: {
                    template: "",
                    imports: [
                        "import Hiwonder_DEV"
                    ],
                    variables: [
                        "cam = Hiwonder_DEV.WonderCam(Hiwonder_DEV.Port({IICPORT}))"
                    ]
                }
            };
        } else if (this.context.variant === 'hiwonder-dev-onboard') {
            initialization = {
                minihexa_wondercamInitI2c: {
                    template: "",
                    imports: [
                        "import Hiwonder_DEV"
                    ],
                    variables: [
                        "cam = Hiwonder_DEV.WonderCam()"
                    ]
                }
            };
        } else {
            initialization = {
                aiblocks_wondercamInitI2c: {
                    template: "",
                    imports: [
                        "import Hiwonder_IIC"
                    ],
                    variables: [
                        "iic = Hiwonder_IIC.IIC()",
                        "cam = Hiwonder_IIC.WonderCam(iic,{IICPORT})"
                    ]
                }
            };
        }
        return {
            ...initialization,
            getFwVersion: {
                template: "cam.getFwVersion()"
            },
            getFuncNumber: {
                template: "{NUM}",
                templateSelector: {
                    argument: "NUM",
                    cases: {
                        "0": "cam.FuncNone",
                        "1": "cam.FaceDetect",
                        "2": "cam.ObjectDetect",
                        "3": "cam.Classification",
                        "4": "cam.FeatureLearning",
                        "5": "cam.ColorDetect",
                        "6": "cam.LineFollowing",
                        "7": "cam.AprilTag",
                        "8": "cam.QrCode",
                        "9": "cam.BarCode",
                        "10": "cam.NumberRecognition",
                        "11": "cam.LandmarkRecognition"
                    }
                }
            },
            getCurrentFunc: {
                template: "cam.getCurrentFunc()"
            },
            switchFunc: {
                template: "cam.switchFunc({NUM})",
                templateSelector: {
                    argument: "NUM",
                    cases: {
                        "0": "cam.switchFunc(cam.FuncNone)",
                        "1": "cam.switchFunc(cam.FaceDetect)",
                        "2": "cam.switchFunc(cam.ObjectDetect)",
                        "3": "cam.switchFunc(cam.Classification)",
                        "4": "cam.switchFunc(cam.FeatureLearning)",
                        "5": "cam.switchFunc(cam.ColorDetect)",
                        "6": "cam.switchFunc(cam.LineFollowing)",
                        "7": "cam.switchFunc(cam.AprilTag)",
                        "8": "cam.switchFunc(cam.QrCode)",
                        "9": "cam.switchFunc(cam.BarCode)",
                        "10": "cam.switchFunc(cam.NumberRecognition)",
                        "11": "cam.switchFunc(cam.LandmarkRecognition)"
                    }
                }
            },
            setLed: {
                template: "cam.setLed({ONOFF})",
                templateSelector: {
                    argument: "ONOFF",
                    cases: {
                        "0": "cam.setLed(cam.LED_OFF)",
                        "1": "cam.setLed(cam.LED_ON)"
                    }
                }
            },
            wondercamUpdateResult: {
                template: "cam.updateResult()"
            },
            isAnyFaceDetected: {
                template: "cam.isAnyFaceDetected()"
            },
            numOfDetectedFaces: {
                template: "cam.numOfDetectedFaces()"
            },
            isAnyLearnedFaceRec: {
                template: "cam.isAnyLearnedFaceRec()"
            },
            numOfLearnedFaceRec: {
                template: "cam.numOfLearnedFaceRec()"
            },
            isAnyUnlearnedFaceDetected: {
                template: "cam.isAnyUnlearnedFaceDetected()"
            },
            isFaceOfIdRec: {
                template: "cam.isFaceOfIdRec({NUM})"
            },
            getFaceOfId: {
                template: "cam.getFaceOfId({NUM})[{POS}]"
            },
            getUnlearnedFaceOfIndex: {
                template: "cam.getUnlearnedFaceOfIndex({NUM})[{POS}]"
            },
            isAnyObjDetected: {
                template: "cam.isAnyObjDetected()"
            },
            isObjOfIdDetected: {
                template: "cam.isObjOfIdDetected({NUM})",
                templateSelector: {
                    argument: "NUM",
                    cases: {
                        "1": "cam.isObjOfIdDetected(cam.Aeroplane)",
                        "2": "cam.isObjOfIdDetected(cam.Bicycle)",
                        "3": "cam.isObjOfIdDetected(cam.Bird)",
                        "4": "cam.isObjOfIdDetected(cam.Boat)",
                        "5": "cam.isObjOfIdDetected(cam.Bottle)",
                        "6": "cam.isObjOfIdDetected(cam.Bus)",
                        "7": "cam.isObjOfIdDetected(cam.Car)",
                        "8": "cam.isObjOfIdDetected(cam.Cat)",
                        "9": "cam.isObjOfIdDetected(cam.Chair)",
                        "10": "cam.isObjOfIdDetected(cam.Cow)",
                        "11": "cam.isObjOfIdDetected(cam.Diningtable)",
                        "12": "cam.isObjOfIdDetected(cam.Dog)",
                        "13": "cam.isObjOfIdDetected(cam.Horse)",
                        "14": "cam.isObjOfIdDetected(cam.Motorbike)",
                        "15": "cam.isObjOfIdDetected(cam.Person)",
                        "16": "cam.isObjOfIdDetected(cam.Pottedplant)",
                        "17": "cam.isObjOfIdDetected(cam.Sheep)",
                        "18": "cam.isObjOfIdDetected(cam.Sofa)",
                        "19": "cam.isObjOfIdDetected(cam.Train)",
                        "20": "cam.isObjOfIdDetected(cam.Monitor)"
                    }
                }
            },
            getObjTotal: {
                template: "cam.numOfObjOfIdDetected({NUM})",
                templateSelector: {
                    argument: "NUM",
                    cases: {
                        "1": "cam.numOfObjOfIdDetected(cam.Aeroplane)",
                        "2": "cam.numOfObjOfIdDetected(cam.Bicycle)",
                        "3": "cam.numOfObjOfIdDetected(cam.Bird)",
                        "4": "cam.numOfObjOfIdDetected(cam.Boat)",
                        "5": "cam.numOfObjOfIdDetected(cam.Bottle)",
                        "6": "cam.numOfObjOfIdDetected(cam.Bus)",
                        "7": "cam.numOfObjOfIdDetected(cam.Car)",
                        "8": "cam.numOfObjOfIdDetected(cam.Cat)",
                        "9": "cam.numOfObjOfIdDetected(cam.Chair)",
                        "10": "cam.numOfObjOfIdDetected(cam.Cow)",
                        "11": "cam.numOfObjOfIdDetected(cam.Diningtable)",
                        "12": "cam.numOfObjOfIdDetected(cam.Dog)",
                        "13": "cam.numOfObjOfIdDetected(cam.Horse)",
                        "14": "cam.numOfObjOfIdDetected(cam.Motorbike)",
                        "15": "cam.numOfObjOfIdDetected(cam.Person)",
                        "16": "cam.numOfObjOfIdDetected(cam.Pottedplant)",
                        "17": "cam.numOfObjOfIdDetected(cam.Sheep)",
                        "18": "cam.numOfObjOfIdDetected(cam.Sofa)",
                        "19": "cam.numOfObjOfIdDetected(cam.Train)",
                        "20": "cam.numOfObjOfIdDetected(cam.Monitor)"
                    }
                }
            },
            getObjOfId: {
                template: "cam.getObjOfId({NUM},{INDEX})[{POS}]",
                templateSelector: {
                    argument: "NUM",
                    cases: {
                        "1": "cam.getObjOfId(cam.Aeroplane,{INDEX})[{POS}]",
                        "2": "cam.getObjOfId(cam.Bicycle,{INDEX})[{POS}]",
                        "3": "cam.getObjOfId(cam.Bird,{INDEX})[{POS}]",
                        "4": "cam.getObjOfId(cam.Boat,{INDEX})[{POS}]",
                        "5": "cam.getObjOfId(cam.Bottle,{INDEX})[{POS}]",
                        "6": "cam.getObjOfId(cam.Bus,{INDEX})[{POS}]",
                        "7": "cam.getObjOfId(cam.Car,{INDEX})[{POS}]",
                        "8": "cam.getObjOfId(cam.Cat,{INDEX})[{POS}]",
                        "9": "cam.getObjOfId(cam.Chair,{INDEX})[{POS}]",
                        "10": "cam.getObjOfId(cam.Cow,{INDEX})[{POS}]",
                        "11": "cam.getObjOfId(cam.Diningtable,{INDEX})[{POS}]",
                        "12": "cam.getObjOfId(cam.Dog,{INDEX})[{POS}]",
                        "13": "cam.getObjOfId(cam.Horse,{INDEX})[{POS}]",
                        "14": "cam.getObjOfId(cam.Motorbike,{INDEX})[{POS}]",
                        "15": "cam.getObjOfId(cam.Person,{INDEX})[{POS}]",
                        "16": "cam.getObjOfId(cam.Pottedplant,{INDEX})[{POS}]",
                        "17": "cam.getObjOfId(cam.Sheep,{INDEX})[{POS}]",
                        "18": "cam.getObjOfId(cam.Sofa,{INDEX})[{POS}]",
                        "19": "cam.getObjOfId(cam.Train,{INDEX})[{POS}]",
                        "20": "cam.getObjOfId(cam.Monitor,{INDEX})[{POS}]"
                    }
                }
            },
            getClMaxProbId: {
                template: "cam.getClMaxProbId()"
            },
            getClnMaxProb: {
                template: "cam.getClMaxProb()"
            },
            getClnProbOfId: {
                template: "cam.getClProbOfId({INDEX})"
            },
            getFLMaxProbId: {
                template: "cam.getFLMaxProbId()"
            },
            getFLnMaxProb: {
                template: "cam.getFLMaxProb()"
            },
            getFLnProbOfId: {
                template: "cam.getFLProbOfId({INDEX})"
            },
            isAnyColorDetectd: {
                template: "cam.isAnyColorDetected()"
            },
            numOfColorDetected: {
                template: "cam.numOfColorDetected()"
            },
            isColorOfIdDetected: {
                template: "cam.isColorOfIdDetected({NUM})"
            },
            getColorOfId: {
                template: "cam.getColorOfId({NUM})[{POS}]"
            },
            isAnyLineDetected: {
                template: "cam.isAnyLineDetected()"
            },
            setRoi: {
                template: "cam.setRoi({XPOS},{YPOS},{WIDTH},{HEIGHT})"
            },
            numOfLineDetected: {
                template: "cam.numOfLineDetected()"
            },
            isLineOfIdDetected: {
                template: "cam.isLineOfIdDetected({NUM})"
            },
            getLineOfId: {
                template: "cam.getLineOfId({NUM})[{POS}]"
            },
            isAnyTagDetected: {
                template: "cam.isAnyTagDetected()"
            },
            numOfTagDetected: {
                template: "cam.numOfTagDetected()"
            },
            isTagOfIdDetected: {
                template: "cam.isTagOfIdDetected({NUM})"
            },
            numOfTagIdDetected: {
                template: "cam.numOfTagIdDetected({NUM})"
            },
            getDataOfTagIdIndex: {
                template: "cam.getDataOfTagIdIndex({NUM},{INDEX})[{POS}]"
            },
            isAnyQrCodeDetected: {
                template: "cam.isAnyQrCodeDetected()"
            },
            lenOfQrCodeData: {
                template: "cam.lenOfQrCodeData()"
            },
            getStrFromQrCode: {
                template: "cam.getStrFromQrCode()"
            },
            getBytesFromCode: {
                template: "cam.getBytesFromCode()"
            },
            isAnyBarCodeDetected: {
                template: "cam.isAnyBarCodeDetected()"
            },
            lenOfBarCode: {
                template: "cam.lenOfBarCode()"
            },
            getStrFromBarCode: {
                template: "cam.getStrFromBarCode()"
            },
            getBytesFromBarCode: {
                template: "cam.getBytesFromBarCode()"
            },
            getNumTagMaxProbId: {
                template: "cam.getNumMaxProbOfId()"
            },
            getNumTagMaxProb: {
                template: "cam.getNumMaxProb()"
            },
            getNumTagProbOfId: {
                template: "cam.getNumProbOfId({INDEX})"
            },
            getOrientionTagMaxProbId: {
                template: "cam.getLandmarkMaxProbId()"
            },
            getOrientionTagMaxProb: {
                template: "cam.getLandmarkMaxProb()"
            },
            getOrientionTagProbOfId: {
                template: "cam.getLandmarkProbOfId({ORIENTION})"
            }
        };
    }
}
