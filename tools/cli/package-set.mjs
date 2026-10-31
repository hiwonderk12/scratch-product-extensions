import fs from 'node:fs';
import path from 'node:path';
import {safeFile} from './authoring.mjs';
import {collectNativeModule, createNativeArchive, readLibrarySnapshot} from './native-package.mjs';

// 显式接入单个主控并输出同快照配套包，不修改公共支持集或官方发行目录。
const requireValue = (condition, message) => { if (!condition) throw new Error(message); };
const readJson = (root, relative) => JSON.parse(fs.readFileSync(safeFile(root, relative), 'utf8'));
const modulePattern = /^(input|output|power|communication)\/[a-z][a-z0-9-]*$/;
const versionPattern = /^(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)(?:-[0-9A-Za-z]+(?:[.-][0-9A-Za-z]+)*)?$/;
const object = value => value && typeof value === 'object' && !Array.isArray(value);
const parseFlags = (args, allowed) => {
    const flags = {};
    for (let index = 0; index < args.length; index++) {
        const flag = args[index];
        requireValue(allowed.includes(flag) && !Object.hasOwn(flags, flag), `未知或重复参数：${flag}`);
        if (flag === '--dry-run') flags[flag] = true;
        else {
            const value = args[++index];
            requireValue(value && !value.startsWith('--'), `参数缺少值：${flag}`);
            flags[flag] = value;
        }
    }
    return flags;
};
const boardReference = (library, boardId) => {
    requireValue(Object.hasOwn(library.products, boardId), `主控不存在：${boardId}`);
    return library.products[boardId];
};
const checkNextVersion = (next, current, label) => {
    requireValue(typeof next === 'string' && versionPattern.test(next), `${label}需要三段版本号，可附带 -demo.1`);
    const numbers = value => value.split('-')[0].split('.').map(Number);
    const oldParts = numbers(current);
    const newParts = numbers(next);
    const difference = newParts.map((part, index) => part - oldParts[index]).find(part => part !== 0);
    requireValue(difference > 0, `${label}必须显式递增数字版本，不覆盖现有版本：${current}`);
};

// 规划配置、主控包版本三个定点修改；由作者计划共用的预检/回滚流程落盘。
const planSupportCommand = (directory, args) => {
    const root = fs.realpathSync(directory);
    const [command, boardId, moduleId, ...rest] = args;
    requireValue(command === 'add' && modulePattern.test(moduleId), '用法：support add 主控 大类/模块 --spec JSON文件 [--dry-run]');
    const flags = parseFlags(rest, ['--spec', '--dry-run']);
    requireValue(flags['--spec'], '需要 --spec 显式声明适配、端口和配套版本');
    const library = readJson(root, 'library.config.json');
    const reference = boardReference(library, boardId);
    const board = readJson(root, reference);
    const snapshot = readLibrarySnapshot(root);
    requireValue([`robots/${boardId}`, `controllers/${boardId}`].includes(board.product), `主控产品引用不一致：${boardId}`);
    requireValue(!Object.hasOwn(snapshot.products[boardId].modules, moduleId), `主控已支持 ${moduleId}，请手工审阅已有适配，不重复添加`);
    const metadataPath = `products/${board.product}/metadata.json`;
    const product = readJson(root, metadataPath);
    const module = readJson(root, `products/${moduleId}/metadata.json`);
    requireValue(product.format === 'hiwonder-native-extension' && module.format === 'hiwonder-native-extension', '仅支持已有原生产品和模块，不接入占位模块');
    const spec = JSON.parse(fs.readFileSync(path.resolve(flags['--spec']), 'utf8'));
    requireValue(object(spec), '支持配置必须是对象');
    for (const key of Object.keys(spec)) requireValue(['variant', 'legacyNamespaces', 'portGroups', 'libraryVersion', 'productVersion'].includes(key), `支持配置未知字段：${key}`);
    requireValue(typeof spec.variant === 'string' && spec.variant.trim(), '需要实际实现的 variant；文本示例使用 text-demo');
    const namespaces = module.namespaces || [module.namespace];
    requireValue(spec.legacyNamespaces || namespaces.length === 1, '多前缀模块必须显式选择 legacyNamespaces');
    const selected = spec.legacyNamespaces || namespaces;
    requireValue(Array.isArray(selected) && selected.length && new Set(selected).size === selected.length &&
        selected.every(namespace => namespaces.includes(namespace)), '所选命名空间不属于模块声明');
    requireValue(object(spec.portGroups), '需要 portGroups 对象；无硬件示例填 {}');
    const source = fs.readFileSync(safeFile(root, `products/${moduleId}/${module.source}`), 'utf8');
    for (const [groupId, group] of Object.entries(spec.portGroups)) {
        requireValue(snapshot.ports[groupId] && object(group) && Object.keys(group).length === 1 && object(group.bindings), `端口组或 bindings 无效：${groupId}`);
        for (const [binding, defaultValue] of Object.entries(group.bindings)) {
            const match = /^([a-z0-9]+)_(\w+)\.(\w+)$/.exec(binding);
            requireValue(match && selected.includes(match[1]) &&
                new RegExp(`opcode:\\s*['"]${match[2]}['"]`).test(source) &&
                new RegExp(`\\b${match[3]}:\\s*\\{`).test(source), `端口绑定不属于模块积木/参数：${binding}`);
            requireValue(snapshot.ports[groupId].some(item => item.value === String(defaultValue)), `默认值不在端口组中：${binding}=${defaultValue}`);
        }
    }
    checkNextVersion(spec.libraryVersion, library.version, 'libraryVersion');
    checkNextVersion(spec.productVersion, product.version, 'productVersion');
    const values = [[reference, {...board, modules: {...board.modules, [moduleId]: {
        variant: spec.variant, legacyNamespaces: selected, portGroups: spec.portGroups
    }}}], ['library.config.json', {...library, version: spec.libraryVersion}], [metadataPath, {...product, version: spec.productVersion}]];
    return {root, dryRun: flags['--dry-run'] === true, modules: [board.product, moduleId],
        details: [`库配置：${library.version} → ${spec.libraryVersion}；主控包：${product.version} → ${spec.productVersion}`,
            '配置快照全局变化：旧快照包不能与本次配套混用；其他主控或模块按实际使用范围另行递增版本打包。'],
        changes: values.map(([file, value]) => ({file, before: fs.readFileSync(safeFile(root, file), 'utf8'), after: JSON.stringify(value, null, 2) + '\n'}))};
};

// 先编译全部选择，再排他写入新目录；清单只是交付说明，不是另一种积木包协议。
const planPackageSet = async (directory, args, ts, JSZip) => {
    const root = fs.realpathSync(directory);
    const [boardId, ...rest] = args;
    const flagIndex = rest.findIndex(value => value.startsWith('--'));
    const modules = flagIndex < 0 ? rest : rest.slice(0, flagIndex);
    requireValue(modules.length && new Set(modules).size === modules.length && modules.every(moduleId => modulePattern.test(moduleId)), '用法：pack-set 主控 大类/模块... --output 新目录 [--dry-run]');
    const flags = parseFlags(flagIndex < 0 ? [] : rest.slice(flagIndex), ['--output', '--dry-run']);
    requireValue(flags['--output'], '需要 --output 库内新目录，不覆盖既有发行产物');
    const output = safeFile(root, flags['--output']);
    requireValue(!fs.existsSync(output), `配套输出目录已存在，选择新目录：${output}`);
    const library = readJson(root, 'library.config.json');
    boardReference(library, boardId);
    const snapshot = readLibrarySnapshot(root);
    const board = snapshot.products[boardId];
    for (const moduleId of modules) requireValue(board.modules[moduleId], `主控 ${boardId} 未支持 ${moduleId}；先显式接入再打包`);
    const ids = [board.product, ...modules];
    const changes = [];
    const packages = [];
    for (const moduleId of ids) {
        const collected = collectNativeModule(root, moduleId, ts);
        requireValue(JSON.stringify(JSON.parse(collected.files['library.json'])) === JSON.stringify(snapshot),
            '打包过程中库配置发生变化，请重新生成整套配套');
        const {descriptor} = collected;
        requireValue(versionPattern.test(descriptor.version), `${moduleId}: 包版本不适用于文件名`);
        const filename = `${descriptor.id}-${descriptor.version}.zip`;
        packages.push({moduleId, version: descriptor.version, file: filename});
        changes.push({file: path.relative(root, path.join(output, filename)), before: null,
            after: await createNativeArchive(collected, JSZip)});
    }
    const manifest = {formatVersion: 1, profile: snapshot.profile, productId: boardId, libraryVersion: snapshot.version, packages};
    changes.push({file: path.relative(root, path.join(output, 'package-set.json')), before: null, after: JSON.stringify(manifest, null, 2) + '\n'});
    return {root, dryRun: flags['--dry-run'] === true, modules: ids, changes,
        details: [`标准编译、四语及资源检查通过：${ids.length} 个包；主控 ${boardId}；库配置 ${snapshot.version}`]};
};

export {planSupportCommand, planPackageSet};
