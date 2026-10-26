import fs from 'node:fs';
import path from 'node:path';
import {createNativeCandidateCatalog} from './native-catalog.mjs';

// 产品保存发行历史；总目录只从实际 ZIP 汇总身份，不执行产品类或上传资源。
const RELEASE_BASE_URL = 'https://github.com/hiwonderk12/scratch-product-extensions/releases/download/';
const categories = ['robots', 'input', 'output', 'power', 'communication'];
const safeName = /^[a-zA-Z0-9][a-zA-Z0-9._-]*$/;
const versionPattern = /^\d+\.\d+\.\d+(?:-[0-9A-Za-z.-]+)?$/;

const plainPath = (root, relative = '') => {
    let current = path.resolve(root);
    if (fs.lstatSync(current).isSymbolicLink()) throw new Error('发行输入不允许目录联接或符号链接：' + current);
    for (const part of relative.split('/').filter(Boolean)) {
        current = path.join(current, part);
        if (fs.lstatSync(current).isSymbolicLink()) throw new Error('发行输入不允许目录联接或符号链接：' + current);
    }
    return current;
};

// 源码检查不依赖本地 dist；通过产品发行历史校验正式目录身份、状态和固定下载来源。
const validateNativeReleaseCatalog = (catalog, {profile, productsDirectory}) => {
    if (catalog?.formatVersion !== 2 || catalog.profile !== profile || !Array.isArray(catalog.packages)) {
        throw new Error('catalog.json: 渠道或格式错误');
    }
    if (catalog.status === 'development' && catalog.packages.length === 0) return catalog;
    if (!['candidate', 'published'].includes(catalog.status) || !catalog.packages.length) {
        throw new Error('catalog.json: development仅允许空目录；发行目录必须有有效状态和条目');
    }
    const identities = new Set();
    for (const item of catalog.packages) {
        if (!item || !/^(robots|input|output|power|communication)\/[a-z0-9][a-z0-9-]*$/.test(item.moduleId) ||
            !versionPattern.test(item.version) || !versionPattern.test(item.libraryVersion)) {
            throw new Error('catalog.json: 产品或版本无效');
        }
        const identity = `${item.moduleId}@${item.version}`;
        if (identities.has(identity)) throw new Error('catalog.json: 重复发行版本：' + identity);
        identities.add(identity);
        const history = JSON.parse(fs.readFileSync(plainPath(productsDirectory, `${item.moduleId}/release.json`), 'utf8'));
        const releases = history.releases?.filter(release => release.version === item.version);
        const release = releases?.length === 1 ? releases[0] : null;
        if (!release || !['candidate', 'published'].includes(release.status) ||
            !safeName.test(release.tag) || !safeName.test(release.asset) || !release.asset.endsWith('.zip') ||
            release.status !== item.status || (catalog.status === 'published' && item.status !== 'published') ||
            release.asset !== item.asset || item.downloadUrl !== `${RELEASE_BASE_URL}${release.tag}/${release.asset}`) {
            throw new Error('catalog.json: 条目与产品发行历史不一致：' + identity);
        }
    }
    return catalog;
};

// candidate 可验证完整历史；published 只汇总已明确标记发布的记录，不自动提升候选状态。
const writeNativeReleaseCatalog = async ({productsDirectory, inputDirectory, outputFile, profile,
    status = 'candidate'}, JSZip) => {
    if (!['candidate', 'published'].includes(status)) throw new Error('发行目录status必须为candidate或published');
    plainPath(productsDirectory);
    plainPath(inputDirectory);
    const archives = [];
    const histories = new Map();
    for (const category of categories) {
        if (!fs.existsSync(path.join(productsDirectory, category))) continue;
        const directory = plainPath(productsDirectory, category);
        for (const entry of fs.readdirSync(directory, {withFileTypes: true})) {
            if (entry.isSymbolicLink()) throw new Error('发行产品目录不允许链接');
            if (!entry.isDirectory()) continue;
            const relative = `${category}/${entry.name}`;
            const releasePath = path.join(directory, entry.name, 'release.json');
            if (!fs.existsSync(releasePath)) continue;
            plainPath(productsDirectory, `${relative}/release.json`);
            const metadataPath = plainPath(productsDirectory, `${relative}/metadata.json`);
            const metadata = JSON.parse(fs.readFileSync(metadataPath, 'utf8'));
            if (metadata.id !== entry.name) throw new Error('产品metadata.id与目录不一致：' + relative);
            const history = JSON.parse(fs.readFileSync(releasePath, 'utf8'));
            if (!Array.isArray(history.releases)) throw new Error('release.json必须包含releases数组：' + relative);
            for (const release of history.releases) {
                if (!release || !['candidate', 'published'].includes(release.status) ||
                    typeof release.version !== 'string' || typeof release.tag !== 'string' ||
                    !safeName.test(release.tag) || typeof release.asset !== 'string' ||
                    !safeName.test(release.asset) || !release.asset.endsWith('.zip')) {
                    throw new Error('发行记录版本、状态、tag或asset无效：' + relative);
                }
                const identity = `${relative}@${release.version}`;
                if (histories.has(identity)) throw new Error('重复发行版本：' + identity);
                histories.set(identity, release);
                if (status === 'published' && release.status !== 'published') continue;
                const relativePath = `${release.tag}/${release.asset}`;
                const data = fs.readFileSync(plainPath(inputDirectory, relativePath));
                const zip = await JSZip.loadAsync(data);
                const descriptorFile = zip.file('extension.json');
                if (!descriptorFile) throw new Error('发行ZIP缺少extension.json：' + identity);
                const descriptor = JSON.parse(await descriptorFile.async('string'));
                if (descriptor.moduleId !== relative || descriptor.version !== release.version) {
                    throw new Error('发行记录与实际ZIP身份不一致：' + identity);
                }
                archives.push({relativePath, data});
            }
        }
    }
    // 复用目录工具的完整快照冲突、版本、重复身份、资源及 profile 校验。
    const catalog = await createNativeCandidateCatalog(archives, {profile, baseUrl: RELEASE_BASE_URL}, JSZip);
    catalog.status = status;
    catalog.packages = catalog.packages.map(item => ({...item,
        status: histories.get(`${item.moduleId}@${item.version}`).status}));
    fs.writeFileSync(outputFile, JSON.stringify(catalog, null, 2) + '\n', {flag: 'wx'});
    return catalog;
};

export {RELEASE_BASE_URL, validateNativeReleaseCatalog, writeNativeReleaseCatalog};
