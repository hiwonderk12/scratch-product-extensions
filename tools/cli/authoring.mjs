import fs from 'node:fs';
import path from 'node:path';
import {randomUUID} from 'node:crypto';
import {readNativeAuthoring} from './authoring-config.mjs';
import {createModuleFiles} from './authoring-templates.mjs';

// 作者生成器只规划和定点修改本库源码；不更新支持关系、版本、发行目录或软件核心。
const categories = ['robots', 'input', 'output', 'power', 'communication'];
const requireValue = (condition, message) => { if (!condition) throw new Error(message); };
const object = value => value !== null && typeof value === 'object' && !Array.isArray(value);
const quoted = value => JSON.stringify(value);
const checkKeys = (value, allowed, label) => {
    requireValue(object(value), `${label}: 必须是对象`);
    for (const key of Object.keys(value)) requireValue(allowed.includes(key), `${label}: 不支持字段 ${key}`);
};
const slug = value => typeof value === 'string' && /^[a-z][a-z0-9]*(?:-[a-z0-9]+)*$/.test(value) &&
    !/^(con|prn|aux|nul|com[1-9]|lpt[1-9])$/.test(value);
const moduleIdentity = moduleId => {
    const parts = moduleId.split('/');
    requireValue(parts.length === 2 && categories.includes(parts[0]) && slug(parts[1]), `模块路径不合法：${moduleId}`);
    return parts;
};

// 对写入路径逐级拒绝符号链接/目录联接，防止参数或已有路径将写入引到库外。
const safeFile = (root, relative) => {
    const filename = path.resolve(root, relative);
    requireValue(filename.startsWith(root + path.sep), `路径越界：${relative}`);
    let current = root;
    for (const part of path.relative(root, filename).split(path.sep)) {
        current = path.join(current, part);
        if (fs.existsSync(current)) requireValue(!fs.lstatSync(current).isSymbolicLink(), `拒绝符号链接/联接：${current}`);
    }
    return filename;
};
const jsonFile = filename => {
    try { return JSON.parse(fs.readFileSync(filename, 'utf8')); }
    catch (error) { throw new Error(`${filename}: ${error.message}`); }
};
const localized = (value, locales, label) => {
    checkKeys(value, locales, label);
    for (const locale of locales) requireValue(typeof value[locale] === 'string' && value[locale].trim(), `${label}: 缺少 ${locale} 文案`);
};
const parseFlags = (argumentsList, allowed) => {
    const flags = {};
    for (let index = 0; index < argumentsList.length; index++) {
        const flag = argumentsList[index];
        requireValue(allowed.includes(flag) && !Object.hasOwn(flags, flag), `未知或重复参数：${flag}`);
        if (flag === '--dry-run') flags[flag] = true;
        else {
            const value = argumentsList[++index];
            requireValue(typeof value === 'string' && value && !value.startsWith('--'), `参数缺少值：${flag}`);
            flags[flag] = value;
        }
    }
    requireValue(flags['--spec'], '需要 --spec JSON文件，明确文案和生成规则');
    return flags;
};
const unwrap = (node, ts) => {
    while (node && (ts.isAsExpression(node) || ts.isSatisfiesExpression(node) || ts.isParenthesizedExpression(node))) node = node.expression;
    return node;
};
const properties = (node, ts, label) => {
    requireValue(node && ts.isObjectLiteralExpression(node), `${label}: 需要普通对象字面量，分支/动态写法请手工维护`);
    const result = new Map();
    for (const property of node.properties) {
        requireValue(ts.isPropertyAssignment(property) && !ts.isComputedPropertyName(property.name), `${label}: 不自动修改展开/动态属性`);
        requireValue(!result.has(property.name.text), `${label}: 属性重复 ${property.name.text}`);
        result.set(property.name.text, property.initializer);
    }
    return result;
};
const parseSource = (filename, text, ts) => {
    const source = ts.createSourceFile(filename, text, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
    if (source.parseDiagnostics.length) {
        const diagnostic = source.parseDiagnostics[0];
        const position = source.getLineAndCharacterOfPosition(diagnostic.start || 0);
        throw new Error(`${filename}:${position.line + 1}:${position.character + 1}: ${ts.flattenDiagnosticMessageText(diagnostic.messageText, '\n')}`);
    }
    readNativeAuthoring(source, ts);
    return source;
};

// 插入只落在目标字面量的尾部与必要逗号处，其他源码、注释和换行保持不变。
const insertions = (source, ts) => {
    const changes = new Map();
    const appended = new Set();
    const newline = source.text.includes('\r\n') ? '\r\n' : '\n';
    const add = (position, text) => changes.set(position, (changes.get(position) || '') + text);
    const append = (container, entry) => {
        const entries = ts.isArrayLiteralExpression(container) ? container.elements : container.properties;
        if (!appended.has(container) && entries.length && !entries.hasTrailingComma) add(entries[entries.length - 1].end, ',');
        appended.add(container);
        const start = container.getStart(source);
        const line = source.text.lastIndexOf('\n', start) + 1;
        const indent = source.text.slice(line, start).match(/^\s*/)[0];
        const close = container.end - 1;
        const closeLine = source.text.lastIndexOf('\n', close) + 1;
        const ownLine = /^\s*$/.test(source.text.slice(closeLine, close));
        const entryText = entry.split('\n').map(part => indent + '    ' + part).join(newline);
        add(ownLine ? closeLine : close, (ownLine ? '' : newline) + entryText + ',' + newline + (ownLine ? '' : indent));
    };
    return {append, result: () => {
        let text = source.text;
        for (const [position, inserted] of [...changes].sort(([first], [second]) => second - first)) {
            text = text.slice(0, position) + inserted + text.slice(position);
        }
        return text;
    }};
};

const findAuthoring = (source, ts) => {
    const classes = source.statements.filter(statement => ts.isClassDeclaration(statement) &&
        statement.modifiers?.some(modifier => modifier.kind === ts.SyntaxKind.DefaultKeyword));
    requireValue(classes.length === 1, '需要唯一的默认导出产品类');
    const directReturn = methodName => {
        const methods = classes[0].members.filter(member => ts.isMethodDeclaration(member) && member.name.getText(source) === methodName);
        const statements = methods[0]?.body?.statements;
        requireValue(methods.length === 1 && statements?.length === 1 && ts.isReturnStatement(statements[0]),
            `${methodName}: 仅自动生成直接返回对象的普通类，含适配分支时请手工维护`);
        const value = unwrap(statements[0].expression, ts);
        properties(value, ts, methodName);
        return value;
    };
    const declarations = source.statements.filter(ts.isVariableStatement).flatMap(statement => [...statement.declarationList.declarations]);
    const messages = unwrap(declarations.find(declaration => declaration.name.getText(source) === 'messages')?.initializer, ts);
    const translations = properties(messages, ts, 'messages');
    for (const [locale, catalog] of translations) properties(catalog, ts, locale);
    const info = directReturn('getInfo');
    const python = directReturn('getPython');
    const infoProperties = properties(info, ts, 'getInfo');
    const blocks = infoProperties.get('blocks');
    requireValue(blocks && ts.isArrayLiteralExpression(blocks), 'getInfo.blocks: 需要直接数组，动态列表请手工维护');
    return {translations, info, infoProperties, blocks, python};
};

// 从实时作者源码检查完整类型归属，不依赖可能尚未重建的兼容索引。
const assertOpcodeAvailable = (root, namespace, opcode, ts) => {
    for (const category of categories) {
        const directory = safeFile(root, `products/${category}`);
        if (!fs.existsSync(directory)) continue;
        for (const id of fs.readdirSync(directory)) {
            const metadataFile = safeFile(root, `products/${category}/${id}/metadata.json`);
            if (!fs.existsSync(metadataFile)) continue;
            const metadata = jsonFile(metadataFile);
            if (metadata.format !== 'hiwonder-native-extension' || !(metadata.namespaces || [metadata.namespace]).includes(namespace)) continue;
            const filename = safeFile(root, `products/${category}/${id}/${metadata.source}`);
            const source = ts.createSourceFile(filename, fs.readFileSync(filename, 'utf8'), ts.ScriptTarget.Latest, true);
            const visit = node => {
                if (ts.isPropertyAssignment(node) && node.name.text === 'opcode' && ts.isStringLiteral(node.initializer) && node.initializer.text === opcode) {
                    throw new Error(`完整类型归属冲突/重复：${namespace}_${opcode} 已存在于 ${category}/${id}`);
                }
                ts.forEachChild(node, visit);
            };
            visit(source);
        }
    }
};

const planGeneration = (root, argumentsList, ts) => {
    const [, kind, moduleId, name, ...argumentsRest] = argumentsList;
    moduleIdentity(moduleId || '');
    requireValue(['block', 'menu'].includes(kind) && /^[a-zA-Z][a-zA-Z0-9_]*$/.test(name || ''), '用法：generate block|menu 大类/模块 标识 --spec JSON文件 [--type command|reporter|boolean] [--dry-run]');
    const flags = parseFlags(argumentsRest, kind === 'block' ? ['--spec', '--type', '--dry-run'] : ['--spec', '--dry-run']);
    const specification = jsonFile(path.resolve(flags['--spec']));
    const metadata = jsonFile(safeFile(root, `products/${moduleId}/metadata.json`));
    requireValue(metadata.format === 'hiwonder-native-extension' && !metadata.namespaces, `${moduleId}: 多命名空间/非原生包请手工维护`);
    requireValue(typeof metadata.source === 'string' && metadata.source, `${moduleId}: 缺少作者源码路径`);
    const entry = safeFile(safeFile(root, `products/${moduleId}`), metadata.source);
    const file = path.relative(root, entry).split(path.sep).join('/');
    const before = fs.readFileSync(safeFile(root, file), 'utf8');
    const source = parseSource(file, before, ts);
    const authoring = findAuthoring(source, ts);
    const edits = insertions(source, ts);
    const locales = [...authoring.translations.keys()];
    const fields = [];
    const addMessage = (key, text) => {
        localized(text, locales, key);
        for (const [locale, catalog] of authoring.translations) {
            requireValue(!properties(catalog, ts, locale).has(key), `${locale}: 文案 key 已存在 ${key}`);
            edits.append(catalog, `${quoted(key)}: ${quoted(text[locale])}`);
        }
    };
    const menuNode = authoring.infoProperties.get('menus');
    const menus = menuNode ? properties(menuNode, ts, 'menus') : new Map();
    if (kind === 'menu') {
        checkKeys(specification, ['items', 'acceptReporters'], 'menu');
        requireValue(typeof specification.acceptReporters === 'boolean' && Array.isArray(specification.items) && specification.items.length,
            'menu: 需要 acceptReporters 和非空 items');
        requireValue(!menus.has(name), `菜单已存在：${name}`);
        const values = new Set();
        const items = specification.items.map(item => {
            checkKeys(item, ['value', 'text'], 'menu.items');
            requireValue(typeof item.value === 'string' && item.value && !values.has(item.value), '菜单 value 必须为非空且唯一的字符串');
            values.add(item.value);
            const key = `menu.${name}.${item.value}`;
            addMessage(key, item.text);
            return `{text: this.context.t(${quoted(key)}), value: ${quoted(item.value)}}`;
        });
        const menu = `${quoted(name)}: {acceptReporters: ${specification.acceptReporters}, items: [\n    ${items.join(',\n    ')}\n]}`;
        edits.append(menuNode || authoring.info, menuNode ? menu : `menus: {\n    ${menu.split('\n').join('\n    ')}\n}`);
        fields.push(`messages.*.menu.${name}.*`, `getInfo.menus.${name}`);
    } else {
        checkKeys(specification, ['text', 'arguments', 'python'], 'block');
        requireValue(['command', 'reporter', 'boolean'].includes(flags['--type']), '需要 --type command|reporter|boolean；帽子/事件请手工维护');
        assertOpcodeAvailable(root, metadata.namespace, name, ts);
        const pythonRules = properties(authoring.python, ts, 'getPython');
        requireValue(!pythonRules.has(name), `Python 规则已存在：${name}`);
        const args = specification.arguments || {};
        requireValue(object(args), 'arguments 必须为对象');
        const rendered = Object.entries(args).map(([argument, definition]) => {
            requireValue(/^[A-Z][A-Z0-9_]*$/.test(argument), `参数名需要大写标识符：${argument}`);
            checkKeys(definition, ['type', 'defaultValue', 'menu', 'literal'], argument);
            requireValue(['string', 'number', 'boolean'].includes(definition.type) && ['string', 'number', 'boolean'].includes(typeof definition.defaultValue),
                `${argument}: 自动生成仅支持基础类型及显式默认值，已有自定义控件请手工维护`);
            requireValue(definition.literal === undefined || typeof definition.literal === 'boolean', `${argument}: literal 必须为布尔值`);
            requireValue(definition.menu === undefined || menus.has(definition.menu), `${argument}: 菜单不存在，请先生成菜单`);
            return `${argument}: ${quoted({...definition, type: definition.type === 'boolean' ? 'Boolean' : definition.type})}`;
        });
        localized(specification.text, locales, 'block.text');
        const placeholders = [...specification.text['zh-cn'].matchAll(/\[([A-Za-z][A-Za-z0-9_]*)\]/g)].map(match => match[1]);
        requireValue(JSON.stringify([...new Set(placeholders)].sort()) === JSON.stringify(Object.keys(args).sort()), '积木占位符与参数名不一致');
        const python = specification.python;
        checkKeys(python, ['template', 'imports', 'variables', 'setups'], 'python');
        requireValue(typeof python.template === 'string' && python.template.trim(), 'python.template 不能为空，未实现能力不能填空模板');
        for (const key of ['imports', 'variables', 'setups']) {
            requireValue(python[key] === undefined || (Array.isArray(python[key]) && python[key].every(value => typeof value === 'string' && value.trim())),
                `python.${key} 必须为非空字符串数组`);
        }
        for (const value of Object.values(python).flat()) {
            for (const match of value.matchAll(/\{([A-Z][A-Z0-9_]*)\}/g)) requireValue(Object.hasOwn(args, match[1]), `Python 引用未知参数：${match[1]}`);
        }
        const key = 'block.' + name;
        addMessage(key, specification.text);
        const blockType = flags['--type'] === 'boolean' ? 'Boolean' : flags['--type'];
        edits.append(authoring.blocks, `{\n    opcode: ${quoted(name)},\n    blockType: ${quoted(blockType)},\n    text: this.context.t(${quoted(key)}),\n    arguments: {${rendered.join(', ')}}\n}`);
        edits.append(authoring.python, `${quoted(name)}: ${quoted(python)}`);
        fields.push(`messages.*.${key}`, `getInfo.blocks.${name}`, `getPython.${name}`);
    }
    const after = edits.result();
    parseSource(file, after, ts);
    return {root, dryRun: flags['--dry-run'] === true, fields, changes: [{file, before, after}]};
};

// 先生成完整计划并校验，不在规划或 dry-run 阶段写任何文件。
const planAuthoringCommand = (directory, argumentsList, ts) => {
    const root = fs.realpathSync(directory);
    const library = jsonFile(safeFile(root, 'library.config.json'));
    requireValue(['wonderlab', 'wondercode'].includes(library.profile), '库配置 profile 无效');
    if (['generate', 'g'].includes(argumentsList[0])) return planGeneration(root, argumentsList, ts);
    const [command, kind, id, ...argumentsRest] = argumentsList;
    requireValue(command === 'new' && ['product', 'module'].includes(kind) && slug(id), '用法：new product|module 标识 --spec JSON文件 [--category input|output|power|communication] [--dry-run]');
    requireValue(library.profile !== 'wonderlab' || !id.startsWith('wondercode-'), 'WonderLab 分支不创建 WonderCode 产品，请切换对应产品分支');
    const flags = parseFlags(argumentsRest, kind === 'module' ? ['--category', '--namespace', '--spec', '--dry-run'] : ['--namespace', '--spec', '--dry-run']);
    const category = kind === 'product' ? 'robots' : flags['--category'];
    requireValue(categories.includes(category) && (kind === 'product' || category !== 'robots'), 'module 需要非 robots 的 --category；机器人使用 new product');
    requireValue(library.categories.some(item => item.id === category), `库配置尚未声明分类 ${category}`);
    const moduleId = `${category}/${id}`;
    const namespace = flags['--namespace'] || ({input: 'sensor', output: 'display', power: 'actuator', communication: 'communication'}[category] || id.replaceAll('-', ''));
    requireValue(/^[a-z][a-z0-9]*$/.test(namespace), 'namespace 需要字母开头的字母数字标识符');
    requireValue(!fs.existsSync(safeFile(root, 'products/' + moduleId)), `模块已存在，拒绝覆盖：${moduleId}`);
    const spec = jsonFile(path.resolve(flags['--spec']));
    checkKeys(spec, ['name', 'description'], 'product');
    const locales = ['zh-cn', 'en', 'zh-tw', 'ko'];
    localized(spec.name, locales, 'product.name');
    if (spec.description !== undefined) localized(spec.description, locales, 'product.description');
    assertOpcodeAvailable(root, namespace, id.replaceAll('-', '_') + '_print_text', ts);
    const files = createModuleFiles({moduleId, namespace, ...spec});
    parseSource(`products/${moduleId}/src/index.ts`, files['src/index.ts'], ts);
    return {root, dryRun: flags['--dry-run'] === true, fields: ['messages/product/getInfo/getPython', 'metadata', 'test/smoke', 'docs'],
        changes: Object.entries(files).map(([file, after]) => ({file: `products/${moduleId}/${file}`, before: null, after}))};
};

// 所有文件先预检和暂存；已有源码原子替换，新文件排他创建；失败仅清理本命令创建的文件/空目录。
const applyAuthoringPlan = plan => {
    if (plan.dryRun) return;
    const check = change => {
        const filename = safeFile(plan.root, change.file);
        requireValue(change.before === null ? !fs.existsSync(filename) :
            fs.readFileSync(filename, 'utf8') === change.before, `文件已存在或计划后发生变化，请重新生成：${change.file}`);
        return filename;
    };
    plan.changes.forEach(check);
    const directories = [];
    const staged = [];
    const created = [];
    const updated = [];
    const ensureDirectory = directory => {
        if (fs.existsSync(directory)) return;
        ensureDirectory(path.dirname(directory));
        fs.mkdirSync(directory);
        directories.push(directory);
    };
    try {
        for (const change of plan.changes) {
            const filename = check(change);
            ensureDirectory(path.dirname(filename));
            const temporary = filename + '.' + randomUUID() + '.tmp';
            staged.push({change, filename, temporary});
            fs.writeFileSync(temporary, change.after, {encoding: 'utf8', flag: 'wx'});
        }
        plan.changes.forEach(check);
        for (const {change, filename, temporary} of staged) {
            if (change.before === null) {
                fs.copyFileSync(temporary, filename, fs.constants.COPYFILE_EXCL);
                created.push(filename);
            } else {
                fs.renameSync(temporary, filename);
                updated.push({filename, before: change.before});
            }
        }
    } catch (error) {
        for (const {filename, before} of updated.reverse()) fs.writeFileSync(filename, before, 'utf8');
        for (const filename of created.reverse()) fs.unlinkSync(filename);
        throw error;
    } finally {
        for (const {temporary} of staged) if (fs.existsSync(temporary)) fs.unlinkSync(temporary);
        for (const directory of directories.reverse()) if (fs.readdirSync(directory).length === 0) fs.rmdirSync(directory);
    }
};

export {planAuthoringCommand, applyAuthoringPlan, safeFile};
