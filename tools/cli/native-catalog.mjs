import fs from 'node:fs';
import path from 'node:path';

const versionPattern = /^\d+\.\d+\.\d+(?:-[0-9A-Za-z.-]+)?$/;
const canonical = value => JSON.stringify(value, (key, entry) => entry && typeof entry === 'object' && !Array.isArray(entry) ?
    Object.fromEntries(Object.keys(entry).sort().map(name => [name, entry[name]])) : entry);
const parseBaseURL = value => {
    const url = new URL(value);
    if (url.protocol !== 'https:' || url.username || url.password || url.search || url.hash) {
        throw new Error('候选资源base-url必须是无认证、查询及片段的HTTPS目录');
    }
    if (!url.pathname.endsWith('/')) url.pathname += '/';
    return url;
};
const createNativeCandidateCatalog = async (archives, {profile, baseUrl}, JSZip) => {
    if (typeof profile !== 'string' || !/^[a-z0-9-]+$/.test(profile)) throw new Error('候选目录profile无效');
    if (!archives.length) throw new Error('候选目录至少需要一个原生ZIP');
    const base = parseBaseURL(baseUrl);
    const identities = new Set();
    const snapshots = new Map();
    const packages = [];
    for (const {relativePath, data} of archives) {
        if (typeof relativePath !== 'string' || relativePath.includes('\\') ||
            relativePath.split('/').some(part => !part || part === '.' || part === '..' || !/^[a-zA-Z0-9][a-zA-Z0-9._-]*$/.test(part)) ||
            !relativePath.endsWith('.zip')) throw new Error('候选ZIP相对路径无效');
        if (data.byteLength > 10 * 1024 * 1024) throw new Error('候选ZIP超过下载大小上限');
        const zip = await JSZip.loadAsync(data);
        if (!zip.file('extension.json')) throw new Error('候选ZIP缺少原生extension.json');
        const descriptor = JSON.parse(await zip.file('extension.json').async('string'));
        if (descriptor.format !== 'hiwonder-native-extension' || descriptor.formatVersion !== 1 ||
            descriptor.apiVersion !== 1 || descriptor.mode !== 'python' || descriptor.profile !== profile ||
            !/^(robots|controllers|input|output|power|communication)\/[a-z0-9-]+$/.test(descriptor.moduleId) ||
            descriptor.id !== descriptor.moduleId.split('/')[1] || typeof descriptor.namespace !== 'string' ||
            !/^[a-z0-9]+$/i.test(descriptor.namespace) || !descriptor.name?.['zh-cn']?.trim()) {
            throw new Error('候选ZIP原生身份或profile无效');
        }
        if (typeof descriptor.version !== 'string' || typeof descriptor.libraryVersion !== 'string' ||
            !versionPattern.test(descriptor.version) || !versionPattern.test(descriptor.libraryVersion)) {
            throw new Error('候选ZIP版本无效');
        }
        for (const filename of [descriptor.entry, descriptor.library, ...(descriptor.icon ? [descriptor.icon] : [])]) {
            if (typeof filename !== 'string' || filename.includes('\\') || filename.includes(':') ||
                filename.split('/').some(part => !part || part === '.' || part === '..') || !zip.file(filename)) {
                throw new Error('候选ZIP入口或配置缺失');
            }
        }
        const library = JSON.parse(await zip.file(descriptor.library).async('string'));
        if (library.formatVersion !== 1 || library.profile !== profile || library.version !== descriptor.libraryVersion ||
            !library.products || !library.ports) throw new Error('候选ZIP库快照不一致');
        const snapshot = canonical(library);
        if (snapshots.has(library.version) && snapshots.get(library.version) !== snapshot) {
            throw new Error('同库配置版本的完整快照不同');
        }
        snapshots.set(library.version, snapshot);
        const identity = descriptor.moduleId + '@' + descriptor.version;
        if (identities.has(identity)) throw new Error('候选目录重复模块版本：' + identity);
        identities.add(identity);
        packages.push({moduleId: descriptor.moduleId, version: descriptor.version, libraryVersion: library.version,
            status: 'candidate', asset: path.posix.basename(relativePath),
            downloadUrl: new URL(relativePath.split('/').map(encodeURIComponent).join('/'), base).toString()});
    }
    packages.sort((first, second) => (first.moduleId + '@' + first.version).localeCompare(second.moduleId + '@' + second.version));
    return {formatVersion: 2, profile, status: 'candidate', packages};
};
const writeNativeCandidateCatalog = async ({inputDirectory, outputFile, baseUrl, profile}, JSZip) => {
    const archives = [];
    const visit = relative => {
        const directory = path.join(inputDirectory, relative);
        for (const entry of fs.readdirSync(directory, {withFileTypes: true})) {
            if (entry.isSymbolicLink()) throw new Error('候选资源目录不允许符号链接');
            const child = path.posix.join(relative, entry.name);
            if (entry.isDirectory()) visit(child);
            else if (entry.isFile() && entry.name.endsWith('.zip')) {
                archives.push({relativePath: child, data: fs.readFileSync(path.join(inputDirectory, child))});
            }
        }
    };
    visit('');
    const catalog = await createNativeCandidateCatalog(archives, {profile, baseUrl}, JSZip);
    fs.writeFileSync(outputFile, JSON.stringify(catalog, null, 2) + '\n', {flag: 'wx'});
    return catalog;
};

export {createNativeCandidateCatalog, writeNativeCandidateCatalog};
