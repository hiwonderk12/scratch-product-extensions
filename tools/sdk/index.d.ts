/** 原生产品积木接口：类声明直接交给 VM，模板直接交给 Python 生成器。 */
export type LocalizedText = {'zh-cn': string; [locale: string]: string};
export type MessageCatalog = {'zh-cn': Record<string, string>; [locale: string]: Record<string, string>};
export interface ProductDisplay {
    name: string;
    description?: string;
    supportedLocales: readonly string[];
}

export interface ExtensionContext {
    readonly variant: string;
    t(key: string | LocalizedText): string;
    ports(group: string): Array<{text: string; value: string}>;
    defaultPort(opcode: string, argument: string, namespace?: string): string;
    python(filename: string): string;
    asset(filename: string): string;
}

export interface ExtensionArgument {
    type: string;
    defaultValue: string | number | boolean;
    menu?: string;
    literal?: boolean;
}

export interface ExtensionBlock {
    opcode: string;
    blockType: 'command' | 'reporter' | 'boolean' | 'Boolean' | 'hat';
    text: string;
    arguments?: Record<string, ExtensionArgument>;
    blockIconURI?: string;
    disableMonitor?: boolean;
    hideFromPalette?: boolean;
    isEdgeActivated?: boolean;
}

export interface ExtensionSubcategory {
    subCategory: string;
    toolboxCategoryId?: string;
    toolboxParentId?: string;
    toolboxSubcategoryLabel?: string;
    toolboxIconURI?: string;
}

export interface ExtensionInfo {
    id: string;
    name: string;
    color1?: string;
    color2?: string;
    color3?: string;
    blocks: Array<ExtensionBlock | ExtensionSubcategory>;
    menuIconURI?: string;
    blockIconURI?: string;
    menus?: Record<string, {acceptReporters: boolean; items: Array<{text: string; value: string}>}>;
}

export interface PythonTemplate {
    template: string;
    templateSelector?: {argument: string; cases: Record<string, string>; matchInputCode?: boolean};
    runtimeFiles?: string[];
    imports?: string[];
    variables?: string[];
    forcedVariables?: Array<{name: string; code: string}>;
    setups?: string[];
    entryTemplate?: string;
    entryFooter?: string;
    launcher?: string;
    section?: string;
}

export interface NativeExtension {
    getInfo(): ExtensionInfo;
    getPython(): Record<string, PythonTemplate>;
    dispose?(): void | Promise<void>;
}
