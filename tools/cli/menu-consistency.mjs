import fs from 'node:fs';
import {createRequire} from 'node:module';
import path from 'node:path';
import {isDeepStrictEqual} from 'node:util';
import vm from 'node:vm';
import {collectNativeModule} from './native-package.mjs';

const DEFAULT_LOCALES = ['zh-cn', 'en', 'zh-tw', 'ko'];
const requireFromRoot = createRequire(import.meta.url);

// 按宿主 nativeText 规则解析字符串或四语对象，仅用于执行 getInfo 做静态一致检查。
const nativeText = (text, locale) => {
    if (typeof text === 'string') return text;
    if (!text?.['zh-cn']) throw new Error('原生包文案缺少中文兜底');
    const language = String(locale || '').trim()
        .replace(/_/g, '-')
        .toLowerCase();
    const parts = language.split('-');
    let alias;
    if (parts[0] === 'zh') {
        if (parts.includes('hant')) alias = 'zh-tw';
        else if (parts.includes('hans')) alias = 'zh-cn';
        else if (parts.some(part => ['tw', 'hk', 'mo'].includes(part))) alias = 'zh-tw';
        else if (parts.some(part => ['cn', 'sg'].includes(part))) alias = 'zh-cn';
    }
    return text[language] || (alias && text[alias]) || text[parts[0]] || text['zh-cn'];
};

// 在隔离 VM 上下文中执行模块类的 getInfo()，避免共享状态污染。
const evaluateModuleInfo = (record, {productId, support, ports, locale}) => {
    const {descriptor, files} = record;
    const portTable = ports;
    const portsFn = group => {
        if (!support.portGroups?.[group] || !Array.isArray(portTable[group])) {
            throw new Error(`${descriptor.moduleId} (${productId}): 未配置端口组 ${group}`);
        }
        return portTable[group].map(port => ({text: nativeText(port.label, locale), value: port.value}));
    };
    const moduleSandbox = {exports: {}};
    const context = {
        variant: support.variant,
        t: key => {
            if (typeof key !== 'string') return nativeText(key, locale);
            const messages = moduleSandbox.exports.messages;
            if (!messages?.['zh-cn'] || !Object.hasOwn(messages['zh-cn'], key)) {
                throw new Error(`${descriptor.moduleId}: 文案 key 不存在：${key}`);
            }
            const text = Object.fromEntries(Object.entries(messages)
                .filter(([, translations]) => Object.hasOwn(translations, key))
                .map(([itemLocale, translations]) => [itemLocale, translations[key]]));
            return nativeText(text, locale);
        },
        ports: portsFn,
        defaultPort: (opcode, argument, namespace = descriptor.namespace) => {
            const binding = `${namespace}_${opcode}.${argument}`;
            for (const [group, config] of Object.entries(support.portGroups || {})) {
                if (Object.hasOwn(config.bindings, binding)) {
                    const value = config.bindings[binding];
                    if (!portsFn(group).some(port => port.value === value)) {
                        throw new Error(`${descriptor.moduleId} (${productId}): 默认端口不在端口组中 ${binding}=${value}`);
                    }
                    return value;
                }
            }
            throw new Error(`${descriptor.moduleId} (${productId}): 缺少端口配置 ${binding}`);
        },
        python: filename => files[filename] ?? '',
        asset: filename => files[filename] ?? ''
    };
    const wrapped = `(function(exports, require, module) {\n${files['index.cjs']}\n})`;
    const runner = vm.runInThisContext(wrapped, {filename: `${descriptor.moduleId}/index.cjs`});
    runner(moduleSandbox.exports, requireFromRoot, moduleSandbox);
    const ExtensionClass = moduleSandbox.exports.default;
    if (typeof ExtensionClass !== 'function') {
        throw new Error(`${descriptor.moduleId}: index.cjs 未导出默认类`);
    }
    return new ExtensionClass(context).getInfo();
};

const normalizeMenuDefinition = (menuDef, contextLabel) => {
    if (!menuDef || typeof menuDef !== 'object' || typeof menuDef.acceptReporters !== 'boolean' || !Array.isArray(menuDef.items)) {
        throw new Error(`${contextLabel}: 菜单声明必须包含 boolean 类型的 acceptReporters 与数组 items`);
    }
    const items = menuDef.items.map((item, index) => {
        if (!item || typeof item !== 'object' || typeof item.text !== 'string' || typeof item.value !== 'string') {
            throw new Error(`${contextLabel}: 菜单项[${index}] 必须为 {text: string, value: string}`);
        }
        return {text: item.text, value: item.value};
    });
    return {acceptReporters: menuDef.acceptReporters, items};
};

// 校验同主控同命名空间共存菜单无冲突，且内联端口菜单与 portGroups / defaultPort 一致。
export const validateRuntimeMenus = ({compiledModules, boards, ports, locales = DEFAULT_LOCALES}) => {
    const checkedPortMenuBindings = new Set();
    for (const [productId, board] of Object.entries(boards)) {
        for (const locale of locales) {
            const seenMenusByNamespace = new Map();
            for (const [moduleId, support] of Object.entries(board.modules || {})) {
                const record = compiledModules.get(moduleId);
                if (!record) continue;
                const info = evaluateModuleInfo(record, {productId, support, ports, locale});
                const namespace = info.id;
                if (!seenMenusByNamespace.has(namespace)) seenMenusByNamespace.set(namespace, new Map());
                const namespaceMenus = seenMenusByNamespace.get(namespace);
                const normalizedMenus = new Map();
                for (const [menuName, rawMenu] of Object.entries(info.menus || {})) {
                    const normalized = normalizeMenuDefinition(rawMenu, `${productId}/${locale}/${moduleId} 菜单 ${menuName}`);
                    normalizedMenus.set(menuName, normalized);
                    const previous = namespaceMenus.get(menuName);
                    if (previous) {
                        if (!isDeepStrictEqual(previous.menu, normalized)) {
                            throw new Error(
                                `同命名空间菜单冲突（${productId} / ${locale} / ${namespace}.${menuName}）：` +
                                `${previous.moduleId} 与 ${moduleId} 的 acceptReporters 或 items 不一致`
                            );
                        }
                    } else {
                        namespaceMenus.set(menuName, {moduleId, menu: normalized});
                    }
                }
                for (const [groupId, group] of Object.entries(support.portGroups || {})) {
                    const portList = ports[groupId];
                    if (!Array.isArray(portList)) {
                        throw new Error(`${productId}/${moduleId}: 缺少端口组 ${groupId}`);
                    }
                    const expectedItems = portList.map(port => ({text: nativeText(port.label, locale), value: port.value}));
                    for (const [binding, defaultValue] of Object.entries(group.bindings || {})) {
                        const dotIndex = binding.lastIndexOf('.');
                        const fullType = binding.slice(0, dotIndex);
                        const argumentName = binding.slice(dotIndex + 1);
                        const underscoreIndex = fullType.indexOf('_');
                        const bindingNamespace = fullType.slice(0, underscoreIndex);
                        const opcode = fullType.slice(underscoreIndex + 1);
                        if (bindingNamespace !== namespace) {
                            throw new Error(`${productId}/${moduleId}: 端口绑定 ${binding} 的命名空间与 getInfo().id (${namespace}) 不一致`);
                        }
                        const block = (info.blocks || []).find(entry => entry && typeof entry === 'object' && entry.opcode === opcode);
                        if (!block) {
                            throw new Error(`${productId}/${moduleId} (${support.variant}): 未在 getInfo().blocks 找到端口绑定积木 ${opcode}`);
                        }
                        const menuName = block.arguments?.[argumentName]?.menu;
                        if (typeof menuName !== 'string' || !normalizedMenus.has(menuName)) {
                            throw new Error(`${productId}/${moduleId} (${support.variant}): 积木 ${binding} 引用的菜单 ${menuName || '(空)'} 未在 getInfo().menus 声明`);
                        }
                        const actualMenu = normalizedMenus.get(menuName);
                        if (!isDeepStrictEqual(actualMenu.items, expectedItems)) {
                            throw new Error(
                                `${productId}/${moduleId} (${support.variant}/${locale}): 端口菜单 ${menuName} 项与端口组 ${groupId} 不一致；` +
                                `实际=${JSON.stringify(actualMenu.items)}，期望=${JSON.stringify(expectedItems)}`
                            );
                        }
                        if (!actualMenu.items.some(item => item.value === String(defaultValue))) {
                            throw new Error(`${productId}/${moduleId} (${support.variant}): defaultPort 默认值 ${binding}=${defaultValue} 不在菜单 ${menuName} 中`);
                        }
                        checkedPortMenuBindings.add(`${productId}::${moduleId}::${binding}`);
                    }
                }
            }
        }
    }
    return {checkedPortMenuBindings: checkedPortMenuBindings.size};
};

// 在 library check 阶段编译全量原生模块并执行跨主控菜单与端口一致检查。
export const validateNativeMenuConsistency = ({root, library, ports, modules, readSupport, ts, locales = DEFAULT_LOCALES}) => {
    const compiledModules = new Map();
    for (const [moduleId, moduleEntry] of modules.entries()) {
        if (moduleEntry.metadata.format !== 'hiwonder-native-extension') continue;
        const sourcePath = path.join(root, 'products', moduleId, moduleEntry.metadata.source);
        const record = collectNativeModule(root, moduleId, ts);
        compiledModules.set(moduleId, {
            ...record,
            sourceText: fs.readFileSync(sourcePath, 'utf8')
        });
    }
    const boards = Object.fromEntries(
        Object.entries(library.products).map(([productId, reference]) => [productId, readSupport(reference)])
    );
    return validateRuntimeMenus({compiledModules, boards, ports, locales});
};
