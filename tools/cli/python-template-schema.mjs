// 声明式延迟发射只接受可静态审查的类型名单和模板，不执行作者扫描代码。
export const validateDeferredEmission = (value, label) => {
    const fail = () => { throw new Error(label + ': deferredEmission 必须声明非空 after/before 类型数组及 template'); };
    if (!value || typeof value !== 'object' || Array.isArray(value) ||
        Object.keys(value).some(key => !['after', 'before', 'template'].includes(key))) fail();
    for (const key of ['after', 'before']) {
        const types = value[key];
        if (!Array.isArray(types) || !types.length || new Set(types).size !== types.length ||
            types.some(type => typeof type !== 'string' || !/^[a-z0-9]+_[a-z0-9_]+$/i.test(type))) fail();
    }
    if (typeof value.template !== 'string' || !value.template.trim()) fail();
};

// 检查完整库和单包编译共用此入口；动态构造的延迟规则不属于当前作者合同。
export const validateSourceDeferredEmissions = (source, ts, label) => {
    const read = node => {
        if (ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node)) return node.text;
        if (ts.isArrayLiteralExpression(node)) return node.elements.map(read);
        if (ts.isObjectLiteralExpression(node)) return Object.fromEntries(node.properties.map(property => {
            if (!ts.isPropertyAssignment(property)) throw new Error(label + ': deferredEmission 不接受动态属性');
            return [property.name.getText(source).replace(/^['"]|['"]$/g, ''), read(property.initializer)];
        }));
        throw new Error(label + ': deferredEmission 必须是静态声明');
    };
    const visit = node => {
        if (ts.isPropertyAssignment(node) && node.name.getText(source).replace(/^['"]|['"]$/g, '') === 'deferredEmission') {
            validateDeferredEmission(read(node.initializer), label);
        }
        ts.forEachChild(node, visit);
    };
    visit(source);
};

