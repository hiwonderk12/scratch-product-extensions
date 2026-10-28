import fs from 'node:fs';
import path from 'node:path';
import {createNativeCandidateCatalog} from './native-catalog.mjs';

// 产品 catalog 是唯一历史源；根索引派生登记，完整归档校验与纯索引生成分别报告。
const RELEASE_BASE_URL = 'https://github.com/hiwonderk12/scratch-product-extensions/releases/download/';
const categories = ['robots', 'input', 'output', 'power', 'communication'];
const safeName = /^[a-zA-Z0-9][a-zA-Z0-9._-]*$/;
const versionPattern = /^\d+\.\d+\.\d+(?:-[0-9A-Za-z.-]+)?$/;

const plainPath = (root, relative = '') => {
    const absolute = path.resolve(root, relative);
    const drive = path.parse(absolute).root;
    let current = drive;
    for (const part of absolute.slice(drive.length).split(path.sep).filter(Boolean)) {
        current = path.join(current, part);
        if (fs.lstatSync(current).isSymbolicLink()) throw new Error('发行输入不允许目录联接或符号链接：' + current);
    }
    return current;
};

const identity = item => `${item.moduleId}@${item.version}`;
const packageFields = item => ({moduleId: item.moduleId, version: item.version, libraryVersion: item.libraryVersion,
    status: item.status, asset: item.asset, downloadUrl: item.downloadUrl});
const sortedPackages = packages => packages.map(packageFields).sort((left, right) => identity(left).localeCompare(identity(right)));
const jsonText = value => JSON.stringify(value, null, 2) + '\n';

// 仅读取产品历史，不依赖旧源码或归档 ZIP，并拒绝第二份发行维护源。
const readNativeProductCatalogs = ({profile, productsDirectory}) => {
    plainPath(productsDirectory);
    const histories = [];
    const locations = new Set();
    let size = 0;
    for (const category of categories) {
        if (!fs.existsSync(path.join(productsDirectory, category))) continue;
        const directory = plainPath(productsDirectory, category);
        for (const entry of fs.readdirSync(directory, {withFileTypes: true})) {
            if (entry.isSymbolicLink()) throw new Error('发行产品目录不允许链接');
            if (!entry.isDirectory()) continue;
            const moduleId = `${category}/${entry.name}`;
            if (fs.existsSync(path.join(directory, entry.name, 'release.json'))) {
                throw new Error(`产品只维护catalog.json，不能保留重复release.json：${moduleId}`);
            }
            const filename = path.join(directory, entry.name, 'catalog.json');
            if (!fs.existsSync(filename)) continue;
            plainPath(productsDirectory, `${moduleId}/catalog.json`);
            size += fs.statSync(filename).size;
            if (size > 1024 * 1024 || histories.length >= 256) throw new Error('产品历史目录总大小或数量超限');
            const metadata = JSON.parse(fs.readFileSync(plainPath(productsDirectory, `${moduleId}/metadata.json`), 'utf8'));
            const history = JSON.parse(fs.readFileSync(filename, 'utf8'));
            if (!/^(robots|input|output|power|communication)\/[a-z0-9][a-z0-9-]*$/.test(moduleId) ||
                metadata.id !== entry.name || history.formatVersion !== 2 || history.profile !== profile ||
                history.moduleId !== moduleId || !['candidate', 'published'].includes(history.status) ||
                !Array.isArray(history.packages) || !history.packages.length) {
                throw new Error(`产品catalog.json身份、状态或格式无效：${moduleId}`);
            }
            const versions = new Set();
            for (const item of history.packages) {
                if (!item || item.moduleId !== moduleId || typeof item.version !== 'string' ||
                    typeof item.libraryVersion !== 'string' || !versionPattern.test(item.version) ||
                    !versionPattern.test(item.libraryVersion) || typeof item.tag !== 'string' || !safeName.test(item.tag) ||
                    typeof item.asset !== 'string' || !safeName.test(item.asset) || !item.asset.endsWith('.zip') ||
                    !['candidate', 'published'].includes(item.status) ||
                    (history.status === 'published' && item.status !== 'published') ||
                    item.downloadUrl !== `${RELEASE_BASE_URL}${item.tag}/${item.asset}` ||
                    (item.notes !== undefined && typeof item.notes !== 'string')) {
                    throw new Error(`产品发行历史无效：${moduleId}`);
                }
                if (versions.has(item.version)) throw new Error(`重复发行版本：${identity(item)}`);
                if (locations.has(item.downloadUrl)) throw new Error(`重复发行资源地址：${item.downloadUrl}`);
                versions.add(item.version);
                locations.add(item.downloadUrl);
            }
            histories.push(history);
        }
    }
    return histories.sort((left, right) => left.moduleId.localeCompare(right.moduleId));
};

// published 只登记正式产品历史；候选提案须独立验证，不能悄悄替换已激活产品目录。
const createNativeRootCatalog = ({profile, productsDirectory, status = 'candidate', layout = 'products'}) => {
    if (!['candidate', 'published'].includes(status) || !['products', 'flat'].includes(layout)) {
        throw new Error('发行目录status或layout无效');
    }
    const histories = readNativeProductCatalogs({profile, productsDirectory})
        .filter(history => status === 'candidate' || history.status === 'published');
    if (!histories.length) throw new Error('发行目录至少需要一个对应状态的产品历史');
    const catalog = layout === 'flat' ? {formatVersion: 2, profile, status,
        packages: sortedPackages(histories.flatMap(history => history.packages))} : {formatVersion: 3, profile, status,
        products: histories.map(history => ({moduleId: history.moduleId, catalog: `products/${history.moduleId}/catalog.json`}))};
    const size = Buffer.byteLength(jsonText(catalog)) + (layout === 'products' ? histories.reduce((total, history) =>
        total + fs.statSync(plainPath(productsDirectory, `${history.moduleId}/catalog.json`)).size, 0) : 0);
    if (size > 1024 * 1024) throw new Error('发行目录树总大小超限');
    return catalog;
};

// 不依赖 dist 或旧源码；兼容根 v2 和新根 v3，并检查遗漏而非只核对已有条目。
const validateNativeReleaseCatalog = (catalog, {profile, productsDirectory}) => {
    if (!catalog || ![2, 3].includes(catalog.formatVersion) || catalog.profile !== profile ||
        (catalog.formatVersion === 2 ? !Array.isArray(catalog.packages) || Object.hasOwn(catalog, 'products') :
            !Array.isArray(catalog.products) || Object.hasOwn(catalog, 'packages'))) throw new Error('catalog.json: 渠道或格式错误');
    const entries = catalog.formatVersion === 2 ? catalog.packages : catalog.products;
    if (catalog.status === 'development') {
        if (entries.length || readNativeProductCatalogs({profile, productsDirectory}).some(history => history.status === 'published')) {
            throw new Error('catalog.json: development必须为空且不能遗漏已发布历史');
        }
        return catalog;
    }
    const expected = createNativeRootCatalog({profile, productsDirectory, status: catalog.status,
        layout: catalog.formatVersion === 2 ? 'flat' : 'products'});
    const identities = new Set();
    for (const item of entries) {
        if (!item || typeof item.moduleId !== 'string') throw new Error('catalog.json: 发行条目身份无效');
        const key = catalog.formatVersion === 2 ? identity(item) : item.moduleId;
        if (identities.has(key)) throw new Error(`catalog.json: 重复发行身份：${key}`);
        identities.add(key);
    }
    const actual = catalog.formatVersion === 2 ? sortedPackages(entries) : entries.map(item =>
        ({moduleId: item.moduleId, catalog: item.catalog})).sort((left, right) => left.moduleId.localeCompare(right.moduleId));
    if (JSON.stringify(actual) !== JSON.stringify(expected.packages || expected.products)) {
        throw new Error('catalog.json: 条目与产品发行历史不一致或存在遗漏');
    }
    return catalog;
};

// 只创建新提案文件，已有正式索引与通过联接指向的目录均不能覆盖。
const writeNewCatalogFile = (outputFile, catalog) => {
    plainPath(path.dirname(path.resolve(outputFile)));
    fs.writeFileSync(outputFile, jsonText(catalog), {flag: 'wx'});
    return catalog;
};

// 保留完整归档验收入口：每份历史 ZIP 都要存在并与唯一产品目录一致。
const writeNativeReleaseCatalog = async ({productsDirectory, inputDirectory, outputFile, profile,
    status = 'candidate'}, JSZip) => {
    const expected = createNativeRootCatalog({productsDirectory, profile, status, layout: 'flat'});
    const histories = readNativeProductCatalogs({productsDirectory, profile}).flatMap(history => history.packages);
    plainPath(inputDirectory);
    const archives = [];
    for (const item of expected.packages) {
        const release = histories.find(candidate => identity(candidate) === identity(item));
        const relativePath = `${release.tag}/${release.asset}`;
        archives.push({relativePath, data: fs.readFileSync(plainPath(inputDirectory, relativePath))});
    }
    const catalog = await createNativeCandidateCatalog(archives, {profile, baseUrl: RELEASE_BASE_URL}, JSZip);
    const actual = sortedPackages(catalog.packages.map(item => ({...item,
        status: expected.packages.find(candidate => identity(candidate) === identity(item))?.status})));
    if (JSON.stringify(actual) !== JSON.stringify(expected.packages)) throw new Error('发行记录与实际ZIP身份或库版本不一致');
    return writeNewCatalogFile(outputFile, expected);
};

export {RELEASE_BASE_URL, plainPath, readNativeProductCatalogs, createNativeRootCatalog,
    validateNativeReleaseCatalog, writeNewCatalogFile, writeNativeReleaseCatalog};
