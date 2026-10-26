import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {validateNativeReleaseCatalog} from './native-releases.mjs';

// 检查库侧目录、支持关系和旧标识归属，仅生成源码索引，不转换积木或打包。
const root = fileURLToPath(new URL('../../', import.meta.url));
const writeIndexes = process.argv.includes('--write-indexes');
if (process.argv.slice(2).some(argument => argument !== '--write-indexes')) {
    throw new Error('用法：node tools/cli/check.mjs [--write-indexes]');
}

const assert = (condition, message) => {
    if (!condition) throw new Error(message);
};

// 外部元数据引用必须落在所属目录内，错误直接给出引用位置。
const resolveFile = (base, relative) => {
    assert(typeof relative === 'string' && relative.length > 0, `${base}: 文件引用不能为空`);
    const absolute = path.resolve(base, relative);
    assert(absolute.startsWith(`${path.resolve(base)}${path.sep}`), `${base}: 引用越界 ${relative}`);
    assert(fs.existsSync(absolute) && fs.statSync(absolute).isFile(), `文件不存在：${absolute}`);
    return absolute;
};
const readJson = filename => {
    try {
        return JSON.parse(fs.readFileSync(filename, 'utf8'));
    } catch (error) {
        throw new Error(`${filename}: ${error.message}`);
    }
};
const strings = value => {
    if (typeof value === 'string') return [value];
    if (!value || typeof value !== 'object') return [];
    return Object.values(value).flatMap(strings);
};
const menuReferences = value => {
    if (!value || typeof value !== 'object') return [];
    return Object.entries(value).flatMap(([key, item]) =>
        key === 'menu' && typeof item === 'string' ? [item] : menuReferences(item));
};

const library = readJson(resolveFile(root, 'library.config.json'));
assert(['wonderlab', 'wondercode'].includes(library.profile), 'library.config.json: 未知软件渠道');
assert(library.defaultLocale === 'zh-cn', 'library.config.json: 保底语言必须为 zh-cn');
const ports = readJson(resolveFile(root, library.ports));
for (const [groupId, items] of Object.entries(ports)) {
    assert(Array.isArray(items) && items.length > 0 && items.every(item =>
        typeof item.label === 'string' && typeof item.value === 'string'), `${library.ports}/${groupId}: 端口需要显示名和字符串值`);
    assert(new Set(items.map(item => item.value)).size === items.length, `${library.ports}/${groupId}: 端口值重复`);
}

// 主控可复用同系列支持集；同名条目整体覆盖，null 显式移除继承模块。
const readSupport = (reference, ancestors = []) => {
    assert(!ancestors.includes(reference), `支持配置循环引用：${[...ancestors, reference].join(' -> ')}`);
    const support = readJson(resolveFile(root, reference));
    assert(support.modules && typeof support.modules === 'object' && !Array.isArray(support.modules), `${reference}: 缺少 modules`);
    const inherited = support.extends ? readSupport(support.extends, [...ancestors, reference]).modules : {};
    const modules = {...inherited};
    for (const [moduleId, setting] of Object.entries(support.modules)) {
        if (setting === null) delete modules[moduleId];
        else modules[moduleId] = setting;
    }
    return {...support, modules};
};
const categories = new Set(library.categories.map(category => category.id));
assert(categories.size === library.categories.length, 'library.config.json: 分类重复');
const modules = new Map();
const blocks = {};
const codeCategories = new Set(['wondercode-knob', 'wondercode-light', 'wondercode-soil']);
const productsDirectory = path.join(root, 'products');

for (const category of fs.readdirSync(productsDirectory).sort()) {
    assert(categories.has(category), `products/${category}: 未声明的大类`);
    for (const id of fs.readdirSync(path.join(productsDirectory, category)).sort()) {
        const moduleId = `${category}/${id}`;
        const directory = path.join(productsDirectory, moduleId);
        const metadata = readJson(resolveFile(directory, 'metadata.json'));
        assert(metadata.id === id, `${moduleId}: metadata.id 与目录不一致`);
        assert(library.profile !== 'wonderlab' || !id.startsWith('wondercode-'), `${moduleId}: 混入 WonderCode 卡片`);
        if (metadata.format !== 'hiwonder-native-extension') {
            assert(typeof metadata.name?.['zh-cn'] === 'string' && metadata.name['zh-cn'].trim(), `${moduleId}: 缺少中文名称`);
        }
        assert(Array.isArray(metadata.legacySources), `${moduleId}: 缺少 legacySources`);
        if (metadata.icon) resolveFile(directory, metadata.icon);
        if (metadata.format === 'hiwonder-native-extension') {
            assert(metadata.formatVersion === 1 && metadata.apiVersion === 1 && metadata.mode === 'python',
                `${moduleId}: 不支持的原生协议`);
            assert(metadata.version && metadata.namespace && metadata.entry === 'index.cjs', `${moduleId}: 原生元数据不完整`);
            resolveFile(directory, metadata.source);
        }
        const namespaces = new Map();
        if (metadata.format === 'hiwonder-native-extension') {
            const source = fs.readFileSync(resolveFile(directory, metadata.source), 'utf8');
            assert(metadata.name?.['zh-cn'] || (/export const messages\s*=/.test(source) && /export const product\s*=/.test(source)),
                `${moduleId}: 缺少名称或集中 i18n 配置；完整文案检查请执行 check ${moduleId}`);
            const declared = metadata.namespaces === undefined ? [metadata.namespace] : metadata.namespaces;
            assert(Array.isArray(declared) && declared.includes(metadata.namespace) &&
                new Set(declared).size === declared.length && declared.every(name => /^[a-z0-9]+$/i.test(name)),
            moduleId + ': 原生命名空间声明无效');
            // 多前缀类的每个 getInfo 分支显式写 id，静态索引按声明分区，不执行作者代码。
            const positions = [...source.matchAll(/\bid:\s*['"]([a-z0-9]+)['"]/gi)];
            const sections = declared.length === 1 ? [{namespace: metadata.namespace, source}] :
                positions.map((match, index) => ({namespace: match[1],
                    source: source.slice(match.index, positions[index + 1]?.index || source.length)}));
            assert(sections.length === declared.length && new Set(sections.map(item => item.namespace)).size === declared.length &&
                sections.every(item => declared.includes(item.namespace)), moduleId + ': getInfo 分支与命名空间声明不一致');
            for (const section of sections) {
                const functions = [...section.source.matchAll(/\bopcode:\s*['"](\w+)['"]/g)].map(match => match[1]);
                const opcodes = new Set(functions);
                assert(opcodes.size > 0 && opcodes.size === functions.length, moduleId + ': 原生 opcode 为空或重复');
                for (const opcode of opcodes) {
                    const type = section.namespace + '_' + opcode;
                    assert(!Object.hasOwn(blocks, type), moduleId + ': 完整旧类型重复 ' + type);
                    blocks[type] = {module: moduleId, source: metadata.source};
                }
                namespaces.set(section.namespace, {config: {id: section.namespace}, source: section.source, opcodes, native: true});
            }
        }
        for (const relative of metadata.legacySources) {
            const sourceDirectory = path.resolve(directory, relative);
            const config = readJson(resolveFile(directory, `${relative}/config.json`));
            assert(!namespaces.has(config.id), `${moduleId}: 旧命名空间重复 ${config.id}`);
            const pythonDirectory = path.resolve(sourceDirectory, config.asset.python.dir);
            const sourcePath = resolveFile(sourceDirectory, `${config.asset.python.dir}${config.asset.python.main}`);
            const source = fs.readFileSync(sourcePath, 'utf8');
            const namespace = source.match(/\bnamespace\s+(\w+)\s*\{/);
            assert(namespace?.[1] === config.id, `${sourcePath}: namespace 与旧 config.id 不一致`);
            const functions = [...source.matchAll(/\bexport function (\w+)\s*\(/g)].map(match => match[1]);
            const opcodes = new Set(functions);
            assert(opcodes.size === functions.length, `${sourcePath}: 函数重复`);
            const categoryBlocks = config.scratchEditor.categories.flatMap(group => {
                assert(library.profile !== 'wonderlab' || !codeCategories.has(group.id), `${moduleId}: 混入 Code 分类 ${group.id}`);
                const checkChildren = parent => {
                    for (const child of parent.subcategories || []) {
                        assert(child.blocks.every(opcode => parent.blocks.includes(opcode)), `${moduleId}/${child.id}: 子分类越界`);
                        checkChildren(child);
                    }
                };
                checkChildren(group);
                return group.blocks;
            });
            assert(categoryBlocks.length === opcodes.size && new Set(categoryBlocks).size === opcodes.size &&
                categoryBlocks.every(opcode => opcodes.has(opcode)), `${sourcePath}: 分类与函数不一致`);
            for (const opcode of Object.keys(config.scratchEditor.blocks || {})) {
                assert(opcodes.has(opcode), `${moduleId}: 配置引用未声明积木 ${opcode}`);
            }
            const menus = readJson(resolveFile(pythonDirectory, '_menus/index.json'));
            const references = [
                ...[...source.matchAll(/\.options="([^"]+)"/g)].map(match => match[1]),
                ...menuReferences(config.scratchEditor)
            ];
            for (const menu of references) {
                assert(Array.isArray(menus[menu]?.menu), `${sourcePath}: 缺少菜单 ${menu}`);
            }
            for (const filename of config.asset.python.files) resolveFile(pythonDirectory, filename);
            for (const image of strings(config.scratchEditor).filter(value => value.startsWith('_images/'))) {
                resolveFile(pythonDirectory, image);
            }
            for (const opcode of opcodes) {
                const type = `${config.id}_${opcode}`;
                assert(!Object.hasOwn(blocks, type), `${moduleId}: 完整旧类型重复 ${type}`);
                blocks[type] = {module: moduleId, source: relative};
            }
            namespaces.set(config.id, {config, source, menus, opcodes});
        }
        modules.set(moduleId, {metadata, namespaces});
    }
}

// 支持关系和端口由库配置检查；占位模块可以保留支持意图，但不能伪装成已有实现。
for (const [productId, reference] of Object.entries(library.products)) {
    const filename = resolveFile(root, reference);
    const board = readSupport(reference);
    assert(board.product === `robots/${productId}` && modules.has(board.product), `${filename}: 主控引用错误`);
    for (const [moduleId, setting] of Object.entries(board.modules)) {
        const module = modules.get(moduleId);
        assert(module, `${filename}: 模块不存在 ${moduleId}`);
        assert(typeof setting.variant === 'string' && setting.variant.length > 0, `${filename}/${moduleId}: 缺少适配名`);
        for (const namespace of setting.legacyNamespaces) {
            assert(module.namespaces.size === 0 || module.namespaces.has(namespace), `${filename}/${moduleId}: 缺少旧实现 ${namespace}`);
        }
        for (const [groupId, group] of Object.entries(setting.portGroups)) {
            assert(ports[groupId], `${filename}/${moduleId}: 缺少端口组 ${groupId}`);
            const values = ports[groupId].map(item => item.value);
            for (const [binding, defaultValue] of Object.entries(group.bindings)) {
                const separator = binding.lastIndexOf('.');
                const type = binding.slice(0, separator);
                const argument = binding.slice(separator + 1);
                assert(blocks[type]?.module === moduleId, `${filename}: 端口引用错误 ${binding}`);
                assert(values.includes(String(defaultValue)), `${filename}: 默认端口不在端口组中 ${binding}=${defaultValue}`);
                const namespace = module.namespaces.get(type.slice(0, type.indexOf('_')));
                assert(namespace && setting.legacyNamespaces.includes(namespace.config.id), `${filename}: 未选择端口对应的旧命名空间 ${binding}`);
                assert(namespace.native ? new RegExp(`\\b${argument}:\\s*\\{`).test(namespace.source) :
                    namespace.source.includes(`${argument}.options=`), `${filename}: 端口参数不存在 ${binding}`);
            }
        }
    }
}
const placeholders = readJson(resolveFile(root, library.placeholders));
assert(placeholders.every(item => item.name?.['zh-cn']), '占位卡片必须提供中文名称');
const catalog = readJson(resolveFile(root, 'catalog.json'));
assert(catalog.profile === library.profile && catalog.formatVersion === 2, 'catalog.json: 渠道或格式错误');
assert(!Object.hasOwn(catalog, 'sha256') && !Object.hasOwn(catalog, 'productIcons'), 'catalog.json: 不维护摘要或图片表');
validateNativeReleaseCatalog(catalog, {profile: library.profile, productsDirectory: path.join(root, 'products')});

const indexes = {
    'library/modules.json': {
        formatVersion: 1,
        profile: library.profile,
        modules: [...modules].map(([moduleId, {metadata, namespaces}]) => ({
            moduleId,
            metadata: `products/${moduleId}/metadata.json`,
            sourceState: metadata.format === 'hiwonder-native-extension' ? 'native-source' : namespaces.size ? 'legacy-source' : 'planned'
        }))
    },
    'library/legacy-index.json': {
        formatVersion: 1,
        profile: library.profile,
        blocks: Object.fromEntries(Object.entries(blocks).sort(([first], [second]) => first.localeCompare(second)))
    }
};
for (const [relative, index] of Object.entries(indexes)) {
    const filename = path.join(root, relative);
    const content = `${JSON.stringify(index, null, 2)}\n`;
    if (writeIndexes) fs.writeFileSync(filename, content, 'utf8');
    else assert(fs.existsSync(filename) && fs.readFileSync(filename, 'utf8') === content, `${relative}: 索引过期，执行 --write-indexes 更新`);
}
console.log(`检查通过：${modules.size} 个模块目录，${Object.keys(library.products).length} 个主控配置，${Object.keys(blocks).length} 个完整旧积木标识。`);
