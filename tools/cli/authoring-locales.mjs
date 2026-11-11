// 静态展开相邻 JSON 译文，保留作者文件位置；运行包仍只有一个自包含类入口。
const prepareNativeLocales = (source, ts, readCatalog) => {
    const catalogs = new Map();
    const replacements = [];
    const imports = new Map();
    const fail = message => { throw new Error(`${source.fileName}: ${message}`); };
    for (const statement of source.statements) {
        if (!ts.isImportDeclaration(statement) || statement.importClause?.isTypeOnly) continue;
        const reference = statement.moduleSpecifier.text;
        if (!reference.endsWith('.json')) continue;
        const match = /^\.\/locales\/([a-z]{2,3}(?:-[a-z0-9]+)*)\.json$/.exec(reference);
        if (!match) fail(`语言文件路径必须为 ./locales/<语言代码>.json：${reference}`);
        const clause = statement.importClause;
        if (!clause?.name || clause.namedBindings) fail('语言文件只支持默认导入');
        const name = clause.name.text;
        if (imports.has(name)) fail(`语言导入重复：${name}`);
        imports.set(name, {locale: match[1], reference, declaration: clause.name, statement});
    }
    if (!imports.size) return {source, catalogs};
    const declarations = source.statements.filter(ts.isVariableStatement)
        .flatMap(statement => [...statement.declarationList.declarations]);
    let messages = declarations.find(declaration => declaration.name.text === 'messages')?.initializer;
    while (messages && (ts.isAsExpression(messages) || ts.isSatisfiesExpression(messages) || ts.isParenthesizedExpression(messages))) messages = messages.expression;
    if (!messages || !ts.isObjectLiteralExpression(messages)) fail('语言导入只能用于 messages 的语言属性');
    for (const property of messages.properties) {
        if (!ts.isPropertyAssignment(property) || !ts.isIdentifier(property.initializer)) continue;
        const imported = imports.get(property.initializer.text);
        if (!imported) continue;
        const locale = property.name.text;
        if (ts.isComputedPropertyName(property.name) || locale !== imported.locale || catalogs.has(locale)) {
            fail(`messages 语言属性必须与文件名一致且唯一：${imported.reference}`);
        }
        const before = readCatalog(imported.reference);
        let value;
        try { value = JSON.parse(before); }
        catch (error) { fail(`${imported.reference}: ${error.message}`); }
        if (!value || Array.isArray(value) || typeof value !== 'object' ||
            !Object.values(value).every(text => typeof text === 'string' && text.trim())) {
            fail(`${imported.reference}: 语言文件必须为非空字符串文案对象`);
        }
        const json = ts.parseJsonText(imported.reference, before);
        if (json.statements[0].expression.properties.length !== Object.keys(value).length) {
            fail(`${imported.reference}: 配置属性重复`);
        }
        catalogs.set(locale, {...imported, before, value, node: property.initializer});
        replacements.push([property.initializer.getStart(source), property.initializer.end, JSON.stringify(value, null, 4)]);
    }
    // 仅替换 messages 中的唯一引用；禁止其他代码依赖编译时移除的导入。
    for (const [name, imported] of imports) {
        const catalog = catalogs.get(imported.locale);
        if (!catalog || catalog.declaration !== imported.declaration) fail(`语言导入 ${name} 只能用于 messages`);
        const visit = node => {
            const propertyName = node.parent && ((ts.isPropertyAssignment(node.parent) && node.parent.name === node) ||
                (ts.isPropertyAccessExpression(node.parent) && node.parent.name === node));
            if (ts.isIdentifier(node) && node.text === name && !propertyName && node !== imported.declaration && node !== catalog.node) {
                fail(`语言导入 ${name} 只能用于 messages`);
            }
            ts.forEachChild(node, visit);
        };
        visit(source);
        replacements.push([imported.statement.getStart(source), imported.statement.end, '']);
    }
    let text = source.text;
    for (const [start, end, value] of replacements.sort((first, second) => second[0] - first[0])) {
        text = text.slice(0, start) + value + text.slice(end);
    }
    return {source: ts.createSourceFile(source.fileName, text, ts.ScriptTarget.ES2020, true), catalogs};
};

export {prepareNativeLocales};
