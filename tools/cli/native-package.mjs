import fs from 'node:fs';
import path from 'node:path';
import {readNativeAuthoring} from './authoring-config.mjs';

// 作者资源只能从库根目录或模块目录收集，避免打入库外文件。
const sourceFile = (directory, relative) => {
    if (typeof relative !== 'string' || !relative) throw new Error(`${directory}: 文件引用不能为空`);
    const root = fs.realpathSync(directory);
    let filename;
    try {
        filename = fs.realpathSync(path.resolve(root, relative));
    } catch (error) {
        throw new Error(`${directory}: 文件不存在或不可读 ${relative}: ${error.message}`);
    }
    if (!filename.startsWith(`${root}${path.sep}`)) throw new Error(`文件超出目录：${relative}`);
    return filename;
};
const readJson = (root, relative) => JSON.parse(fs.readFileSync(sourceFile(root, relative), 'utf8'));

// 固定库配置快照供本地导入离线使用；复用支持集在这里展开，不转换任何积木声明。
const readLibrarySnapshot = root => {
    const library = readJson(root, 'library.config.json');
    const readSupport = (reference, ancestors = []) => {
        if (ancestors.includes(reference)) throw new Error(`支持配置循环引用：${reference}`);
        const config = readJson(root, reference);
        const modules = config.extends ? readSupport(config.extends, [...ancestors, reference]).modules : {};
        for (const [id, setting] of Object.entries(config.modules)) {
            if (setting === null) delete modules[id];
            else modules[id] = setting;
        }
        return {...config, modules};
    };
    return {
        formatVersion: 1,
        version: library.version,
        profile: library.profile,
        defaultLocale: library.defaultLocale,
        ports: readJson(root, library.ports),
        products: Object.fromEntries(Object.entries(library.products).map(([id, reference]) => {
            const support = readSupport(reference);
            return [id, {product: support.product, modules: support.modules}];
        }))
    };
};

// 标准 TypeScript 编译直接输出 CommonJS 类入口；运行依赖由原生宿主上下文提供。
const collectNativeModule = (root, moduleId, typescript) => {
    if (!/^(robots|input|output|power|communication)\/[a-z0-9-]+$/.test(moduleId)) {
        throw new Error(`模块目录不合法：${moduleId}`);
    }
    const directory = path.join(root, 'products', moduleId);
    return collectNativeDirectory(root, directory, moduleId, typescript, false);
};

// 用户作者目录独立编译，不读取或复制官方库快照，不生成主控配套包。
const collectStandaloneExtension = (directory, typescript) => {
    directory = fs.realpathSync(directory);
    const metadata = readJson(directory, 'metadata.json');
    if (!/^[a-z0-9-]+$/.test(metadata.id) ||
        !['input', 'output', 'power', 'communication'].includes(metadata.category || 'output')) {
        throw new Error('用户拓展需要合法 id 和模块 category，不能替换主控包');
    }
    return collectNativeDirectory(directory, directory, `${metadata.category || 'output'}/${metadata.id}`, typescript, true);
};

const collectNativeDirectory = (root, directory, moduleId, typescript, standalone) => {
    const metadata = readJson(directory, 'metadata.json');
    if (metadata.format !== 'hiwonder-native-extension' || metadata.formatVersion !== 1 ||
        metadata.apiVersion !== 1 || metadata.mode !== 'python' || metadata.entry !== 'index.cjs') {
        throw new Error(`${moduleId}: 尚未提供受支持的原生类入口`);
    }
    const entry = sourceFile(directory, metadata.source);
    const program = typescript.createProgram([entry], {
        target: typescript.ScriptTarget.ES2020,
        module: typescript.ModuleKind.CommonJS,
        newLine: typescript.NewLineKind.LineFeed,
        strict: true,
        types: [],
        skipLibCheck: true,
        noEmitOnError: true
    });
    const files = {};
    const authoringSource = program.getSourceFile(entry);
    const display = readNativeAuthoring(authoringSource, typescript);
    const emit = program.emit(undefined, (filename, text, bom, onError, sources) => {
        if (sources?.some(source => path.resolve(source.fileName) === entry)) files[metadata.entry] = text;
        else throw new Error(`${moduleId}: 运行依赖必须通过宿主上下文提供，不能包含额外编译入口 ${filename}`);
    });
    const diagnostics = [...typescript.getPreEmitDiagnostics(program), ...emit.diagnostics];
    if (emit.emitSkipped || diagnostics.length || !files[metadata.entry]) {
        throw new Error(typescript.formatDiagnosticsWithColorAndContext(diagnostics, {
            getCanonicalFileName: filename => filename,
            getCurrentDirectory: () => root,
            getNewLine: () => '\n'
        }) || `${moduleId}: 未生成 JS 类入口`);
    }
    const collect = relative => {
        const absolute = sourceFile(directory, relative);
        if (fs.statSync(absolute).isDirectory()) {
            for (const name of fs.readdirSync(absolute).sort()) collect(`${relative}/${name}`);
        } else files[relative] = fs.readFileSync(absolute);
    };
    for (const relative of ['python', 'assets']) {
        if (fs.existsSync(path.join(directory, relative))) collect(relative);
    }
    // 可选目录不代表可缺资源；显式引用必须实际存在并进入发行包。
    const checkResources = node => {
        if (typescript.isCallExpression(node) && typescript.isPropertyAccessExpression(node.expression) &&
            node.expression.expression.getText(authoringSource) === 'this.context' &&
            ['python', 'asset'].includes(node.expression.name.text)) {
            const argument = node.arguments[0];
            if (!argument || !typescript.isStringLiteral(argument)) throw new Error(`${entry}: 资源路径必须是字符串字面量`);
            sourceFile(directory, argument.text);
            if (!Object.hasOwn(files, argument.text)) throw new Error(`${entry}: 资源未收集 ${argument.text}`);
        }
        typescript.forEachChild(node, checkResources);
    };
    checkResources(authoringSource);
    const {source, legacySources, ...descriptor} = metadata;
    let extension;
    if (standalone) {
        extension = {...descriptor, ...display, moduleId,
            profile: metadata.profile || 'wonderlab', installation: 'standalone'};
        if (!/^[a-z0-9-]+$/.test(extension.profile) || !/^[a-z0-9]+$/i.test(extension.namespace) ||
            typeof extension.version !== 'string' || !extension.version) throw new Error('用户拓展身份字段无效');
        if (metadata.library || metadata.libraryVersion) throw new Error('用户拓展不应声明全库配置快照');
        files['src/index.ts'] = fs.readFileSync(entry);
        files['metadata.json'] = `${JSON.stringify(extension, null, 2)}\n`;
    } else {
        const library = readLibrarySnapshot(root);
        if (!library.version) throw new Error('library.config.json: 固定库配置必须提供版本');
        extension = {...descriptor, ...display, moduleId, profile: library.profile,
            libraryVersion: library.version, library: 'library.json'};
        files['extension.json'] = `${JSON.stringify(extension, null, 2)}\n`;
        files['library.json'] = `${JSON.stringify(library, null, 2)}\n`;
    }
    if (!extension.name?.['zh-cn']?.trim()) throw new Error(`${entry}: 缺少中文产品名称`);
    return {descriptor: extension, files};
};

// 压缩包只携带编译类、原生元数据、库配置快照与模块资源。
const createNativeArchive = async (collected, JSZip) => {
    const zip = new JSZip();
    for (const [filename, content] of Object.entries(collected.files)) zip.file(filename, content);
    return zip.generateAsync({type: 'uint8array', compression: 'DEFLATE'});
};

export {collectNativeModule, collectStandaloneExtension, createNativeArchive, readLibrarySnapshot, readNativeAuthoring};
