// 静态读取作者的集中 i18n 配置，不执行产品类或硬件代码。
const readNativeAuthoring = (source, ts) => {
    const fail = (node, message) => {
        const {line, character} = source.getLineAndCharacterOfPosition(node.getStart(source));
        throw new Error(`${source.fileName}:${line + 1}:${character + 1}: ${message}`);
    };
    const literal = node => {
        if (ts.isAsExpression(node) || ts.isSatisfiesExpression(node) || ts.isParenthesizedExpression(node)) {
            return literal(node.expression);
        }
        if (ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node)) return node.text;
        if (ts.isArrayLiteralExpression(node)) return node.elements.map(literal);
        if (ts.isObjectLiteralExpression(node)) {
            const result = {};
            for (const property of node.properties) {
                if (!ts.isPropertyAssignment(property) || ts.isComputedPropertyName(property.name)) {
                    fail(property, '配置只允许普通字面量属性，不使用展开、方法或动态属性');
                }
                const key = property.name.text;
                if (Object.hasOwn(result, key)) fail(property, `配置属性重复：${key}`);
                result[key] = literal(property.initializer);
            }
            return result;
        }
        fail(node, '配置只允许字符串、数组和普通对象字面量');
    };
    const exports = {};
    for (const statement of source.statements) {
        if (!ts.isVariableStatement(statement) || !statement.modifiers?.some(item => item.kind === ts.SyntaxKind.ExportKeyword)) continue;
        for (const declaration of statement.declarationList.declarations) {
            if (['messages', 'product'].includes(declaration.name.text)) {
                if (!(statement.declarationList.flags & ts.NodeFlags.Const) || !declaration.initializer) {
                    fail(declaration, 'messages 和 product 必须是有初值的 const');
                }
                exports[declaration.name.text] = literal(declaration.initializer);
            }
        }
    }
    if (!exports.messages && !exports.product) return {};
    const {messages, product} = exports;
    const object = value => value && typeof value === 'object' && !Array.isArray(value);
    const check = (condition, message) => { if (!condition) fail(source, message); };
    check(object(messages) && object(messages['zh-cn']), 'messages 缺少 zh-cn 配置');
    check(object(product), '缺少 product 配置');
    check(Array.isArray(product.supportedLocales) && product.supportedLocales.includes('zh-cn'),
        'product.supportedLocales 必须包含 zh-cn');
    check(new Set(product.supportedLocales).size === product.supportedLocales.length, 'supportedLocales 重复');
    const chinese = messages['zh-cn'];
    const placeholders = text => (text.match(/\[[\w]+\]/g) || []).sort().join(',');
    for (const [locale, translations] of Object.entries(messages)) {
        check(/^[a-z]{2,3}(?:-[a-z0-9]+)*$/.test(locale), `语言代码需要规范形式：${locale}`);
        check(object(translations), `${locale} 文案必须是对象`);
        for (const [key, text] of Object.entries(translations)) {
            check(typeof text === 'string' && text.trim(), `${locale}/${key} 文案不能为空`);
            check(Object.hasOwn(chinese, key), `${locale}/${key} 缺少 zh-cn key`);
            check(typeof chinese[key] === 'string' && chinese[key].trim(), `zh-cn/${key} 文案不能为空`);
            check(placeholders(text) === placeholders(chinese[key]),
                `${locale}/${key} 占位符不一致：需要 ${placeholders(chinese[key])}，实际 ${placeholders(text)}`);
        }
    }
    for (const locale of product.supportedLocales) {
        check(Object.hasOwn(messages, locale), `声明语言缺少文案配置：${locale}`);
        for (const key of Object.keys(chinese)) {
            check(typeof messages[locale][key] === 'string' && messages[locale][key].trim(), `声明语言缺译文：${locale}/${key}`);
        }
    }
    const requireKey = (key, node) => {
        if (typeof key !== 'string' || !Object.hasOwn(chinese, key)) fail(node, `文案 key 不存在：${key}`);
    };
    requireKey(product.name, source);
    if (product.description !== undefined) requireKey(product.description, source);
    // 限定静态 key，防止拼接出的文案名称逃过覆盖和占位符检查。
    const visit = node => {
        if (ts.isCallExpression(node) && ts.isPropertyAccessExpression(node.expression) &&
            node.expression.expression.getText(source) === 'this.context' && node.expression.name.text === 't') {
            const argument = node.arguments[0];
            if (!argument) fail(node, 't() 需要文案 key');
            let key;
            if (ts.isStringLiteral(argument)) key = argument.text;
            else if (ts.isPropertyAccessExpression(argument) && argument.expression.getText(source) === 'product') {
                key = product[argument.name.text];
            } else fail(argument, 't() 只接受字符串 key 或 product.name/description，不嵌入语言对象');
            requireKey(key, argument);
        }
        ts.forEachChild(node, visit);
    };
    visit(source);
    const translated = key => Object.fromEntries(Object.entries(messages)
        .filter(([, translations]) => Object.hasOwn(translations, key))
        .map(([locale, translations]) => [locale, translations[key]]));
    return {name: translated(product.name),
        ...(product.description === undefined ? {} : {description: translated(product.description)}),
        supportedLocales: product.supportedLocales};
};

export {readNativeAuthoring};
