import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {collectNativeModule, collectStandaloneExtension, createNativeArchive} from './native-package.mjs';

// 原生包命令仅标准编译和收集资源，不生成旧作者格式或旧 manifest。
const [command, moduleId, ...extra] = process.argv.slice(2);
const root = fileURLToPath(new URL('../../', import.meta.url));
if (!command || ['--help', '-h', 'help'].includes(command)) {
    console.log('原生包维护命令（不自动启用主控支持、上传或发布）：\n' +
        '  new product 标识 --spec JSON文件 [--namespace 命名空间] [--dry-run]\n' +
        '  new module 标识 --category input|output|power|communication --spec JSON文件 [--namespace 命名空间] [--dry-run]\n' +
        '  generate|g block 大类/模块 opcode --type command|reporter|boolean --spec JSON文件 [--dry-run]\n' +
        '  generate|g menu 大类/模块 菜单名 --spec JSON文件 [--dry-run]\n' +
        '  check 作者目录 | pack 作者目录 [--output ZIP路径]（用户拓展：直接导入一个 ZIP）\n' +
        '  check [大类/模块] | check --write-indexes | pack 大类/模块（官方库维护）\n' +
        '  support add 主控 大类/模块 --spec JSON文件 [--dry-run]\n' +
        '  pack-set 主控 大类/模块... --output 库内新目录 [--dry-run]\n' +
        '  catalog --input ZIP目录 --base-url HTTPS资源目录 --output 新目录JSON\n' +
        '  catalog --releases products目录 --input Release资源目录 --output 新目录JSON [--status candidate|published]\n' +
        '  catalog --products products目录 --output 新根JSON [--status candidate|published] [--layout products|flat]\n' +
        '  catalog --split 已校验平铺索引JSON --output-dir 新预览目录（不修改正式索引）\n' +
        '  release add --archive 新ZIP --tag TAG --output 新产品提案JSON [--baseline-archive 已审阅参考ZIP] [--status candidate|published]\n' +
        '新增命令的规格与限制见 docs/cli.md；test/preview/build 尚未提供独立命令。');
} else if (['support', 'pack-set'].includes(command)) {
    const {planSupportCommand, planPackageSet} = await import('./package-set.mjs');
    const {applyAuthoringPlan} = await import('./authoring.mjs');
    let plan;
    if (command === 'support') plan = planSupportCommand(root, process.argv.slice(3));
    else {
        const {default: ts} = await import('typescript');
        const {default: JSZip} = await import('jszip');
        plan = await planPackageSet(root, process.argv.slice(3), ts, JSZip);
    }
    applyAuthoringPlan(plan);
    console.log(plan.dryRun ? 'DRY-RUN：未写入文件' : '配套操作完成');
    for (const change of plan.changes) console.log(`${change.before === null ? 'CREATE' : 'UPDATE'} ${path.resolve(root, change.file)}`);
    for (const detail of plan.details || []) console.log(detail);
    console.log('配套范围（先主控后模块）：' + plan.modules.join('、'));
    console.log('使用空白项目验证；已有项目启用的其他模块也需同快照并递增包版本后加入配套。');
    console.log(command === 'support' ? '审阅配置后重建索引、检查，再 pack-set；未更改公共支持集或发布。' :
        '分别导入以上 ZIP，先选择该主控版本再启用模块。package-set.json 是交付清单，不导入软件。');
} else if (['new', 'generate', 'g'].includes(command)) {
    const {default: typescript} = await import('typescript');
    const {planAuthoringCommand, applyAuthoringPlan} = await import('./authoring.mjs');
    const plan = planAuthoringCommand(root, process.argv.slice(2), typescript);
    applyAuthoringPlan(plan);
    console.log(plan.dryRun ? 'DRY-RUN：未写入文件' : '作者源码已更新');
    for (const change of plan.changes) console.log(`${change.before === null ? 'CREATE' : 'UPDATE'} ${change.file}`);
    console.log('字段：' + plan.fields.join('、'));
    console.log('未修改支持、端口、版本或发行目录；请审阅后检查模块并显式重建索引。');
} else if (command === 'check' && (!moduleId || (moduleId === '--write-indexes' && !extra.length))) {
    process.argv.splice(2, 1);
    await import('./check.mjs');
} else if (['check', 'pack'].includes(command) && moduleId &&
    fs.existsSync(path.resolve(moduleId, 'metadata.json'))) {
    if (extra.length && !(command === 'pack' && extra.length === 2 && extra[0] === '--output')) {
        throw new Error('用法：check 作者目录 或 pack 作者目录 [--output ZIP路径]');
    }
    const {default: ts} = await import('typescript');
    const collected = collectStandaloneExtension(path.resolve(moduleId), ts);
    if (command === 'pack') {
        const {default: JSZip} = await import('jszip');
        const filename = path.resolve(extra[1] || path.join(root, 'dist',
            `${collected.descriptor.id}-${collected.descriptor.version}-standalone.zip`));
        const data = await createNativeArchive(collected, JSZip);
        fs.mkdirSync(path.dirname(filename), {recursive: true});
        if (fs.existsSync(filename) && (!fs.lstatSync(filename).isFile() || fs.lstatSync(filename).isSymbolicLink())) {
            throw new Error(`用户包输出不能覆盖目录或链接：${filename}`);
        }
        fs.writeFileSync(filename, data);
        console.log(`用户拓展包：${filename}\n在“用户拓展 → 导入本地库”直接选择此 ZIP，无需导入主控配套。`);
    } else console.log(`独立用户拓展检查通过：${moduleId}`);
} else if ((command === 'check' || command === 'pack') && moduleId && extra.length === 0) {
    const typescript = await import('typescript');
    const collected = collectNativeModule(root, moduleId, typescript.default);
    if (command === 'pack') {
        const {default: JSZip} = await import('jszip');
        const data = await createNativeArchive(collected, JSZip);
        const {descriptor} = collected;
        const directory = path.join(root, 'dist', descriptor.profile, moduleId, descriptor.version);
        const filename = path.join(directory, `${descriptor.id}-${descriptor.version}.zip`);
        fs.mkdirSync(directory, {recursive: true});
        fs.writeFileSync(filename, data, {flag: 'wx'});
        console.log(filename);
    } else console.log(`原生类编译检查通过：${moduleId}`);
} else if (command === 'release' && moduleId === 'add') {
    const flags = new Map();
    for (let index = 0; index < extra.length; index += 2) {
        const flag = extra[index];
        const value = extra[index + 1];
        if (!['--archive', '--tag', '--output', '--baseline-archive', '--status'].includes(flag) || !value || flags.has(flag)) {
            throw new Error('用法：release add --archive ZIP --tag TAG --output 新产品提案JSON [--baseline-archive 已审阅参考ZIP]');
        }
        flags.set(flag, value);
    }
    if (!flags.has('--archive') || !flags.has('--tag') || !flags.has('--output')) {
        throw new Error('release add需要--archive、--tag和--output');
    }
    const {default: JSZip} = await import('jszip');
    const {writeNativeReleaseAddition} = await import('./release-add.mjs');
    const library = JSON.parse(fs.readFileSync(path.join(root, 'library.config.json'), 'utf8'));
    const proposal = await writeNativeReleaseAddition({productsDirectory: path.join(root, 'products'),
        archiveFile: path.resolve(flags.get('--archive')), tag: flags.get('--tag'),
        baselineArchiveFile: flags.has('--baseline-archive') ? path.resolve(flags.get('--baseline-archive')) : undefined,
        outputFile: path.resolve(flags.get('--output')), profile: library.profile, status: flags.get('--status') || 'candidate'}, JSZip);
    console.log(`${proposal.status}产品历史追加提案已生成：${proposal.moduleId}；原历史未改、未上传或发布。`);
    console.log('参考ZIP来源由维护者审阅；候选提案不得直接覆盖正式产品目录，先上传资产再审阅正式状态。');
} else if (command === 'catalog') {
    const argumentsList = [moduleId, ...extra];
    const flags = new Map();
    for (let index = 0; index < argumentsList.length; index += 2) {
        const flag = argumentsList[index];
        const value = argumentsList[index + 1];
        if (!['--input', '--base-url', '--output', '--releases', '--status', '--split', '--output-dir', '--products', '--layout'].includes(flag) ||
            !value || flags.has(flag)) {
            throw new Error('用法：catalog --input ZIP目录 --base-url HTTPS资源目录 --output 新目录JSON');
        }
        flags.set(flag, value);
    }
    const {default: JSZip} = await import('jszip');
    const library = JSON.parse(fs.readFileSync(path.join(root, 'library.config.json'), 'utf8'));
    let catalog;
    if (flags.has('--products')) {
        if (!flags.has('--output') || [...flags.keys()].some(flag => !['--products', '--output', '--status', '--layout'].includes(flag))) {
            throw new Error('catalog --products仅接受--output、--status和--layout');
        }
        const {createNativeRootCatalog, writeNewCatalogFile} = await import('./native-releases.mjs');
        catalog = createNativeRootCatalog({productsDirectory: path.resolve(flags.get('--products')),
            profile: library.profile, status: flags.get('--status') || 'candidate', layout: flags.get('--layout') || 'products'});
        writeNewCatalogFile(path.resolve(flags.get('--output')), catalog);
        console.log('仅校验产品历史并派生根索引，未复验历史ZIP；未修改正式索引。');
    } else if (flags.has('--layout')) {
        throw new Error('--layout仅用于catalog --products');
    } else if (flags.has('--split')) {
        if (flags.size !== 2 || !flags.has('--output-dir')) {
            throw new Error('catalog --split仅接受--output-dir，不混用ZIP生成或状态修改');
        }
        const {writeNativeProductCatalogs} = await import('./product-catalogs.mjs');
        catalog = writeNativeProductCatalogs({catalogFile: path.resolve(flags.get('--split')),
            productsDirectory: path.join(root, 'products'), outputDirectory: path.resolve(flags.get('--output-dir')),
            profile: library.profile});
    } else if (flags.has('--output-dir')) {
        throw new Error('--output-dir仅用于catalog --split');
    } else if (flags.has('--releases')) {
        if (!flags.has('--input') || !flags.has('--output') || flags.has('--base-url')) {
            throw new Error('catalog --releases需要--input、--output；不接受--base-url');
        }
        const {writeNativeReleaseCatalog} = await import('./native-releases.mjs');
        catalog = await writeNativeReleaseCatalog({productsDirectory: path.resolve(flags.get('--releases')),
            inputDirectory: path.resolve(flags.get('--input')), outputFile: path.resolve(flags.get('--output')),
            status: flags.get('--status') || 'candidate', profile: library.profile}, JSZip);
    } else {
        if (flags.size !== 3 || !flags.has('--input') || !flags.has('--base-url') || !flags.has('--output')) {
            throw new Error('catalog需要--input、--base-url和--output');
        }
        const {writeNativeCandidateCatalog} = await import('./native-catalog.mjs');
        catalog = await writeNativeCandidateCatalog({inputDirectory: path.resolve(flags.get('--input')),
            outputFile: path.resolve(flags.get('--output')), baseUrl: flags.get('--base-url'), profile: library.profile}, JSZip);
    }
    console.log(catalog.formatVersion === 3 ?
        `分层目录预览已生成：${catalog.products.length}个产品；未校验历史ZIP内容、未修改正式索引、未上传或发布` :
        `${catalog.status}目录已生成：${catalog.packages.length}个版本；未上传或发布`);
} else throw new Error('未知命令，请使用 node tools/cli/index.mjs --help 查看实际可用命令');
