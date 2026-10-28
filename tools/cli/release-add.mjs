import fs from 'node:fs';
import path from 'node:path';
import {createNativeCandidateCatalog} from './native-catalog.mjs';
import {RELEASE_BASE_URL, plainPath, readNativeProductCatalogs, writeNewCatalogFile} from './native-releases.mjs';

// 校验一个新 ZIP 并生成单产品追加提案，不覆盖唯一维护源或执行上传。
const writeNativeReleaseAddition = async ({productsDirectory, archiveFile, baselineArchiveFile,
    outputFile, tag, profile, status = 'candidate'}, JSZip) => {
    if (typeof tag !== 'string' || !/^[a-zA-Z0-9][a-zA-Z0-9._-]*$/.test(tag) ||
        !['candidate', 'published'].includes(status)) throw new Error('新发行tag或status无效');
    const histories = readNativeProductCatalogs({productsDirectory, profile});
    const loadArchive = (filename, prefix) => ({relativePath: `${prefix}/${path.basename(filename)}`,
        data: fs.readFileSync(plainPath(filename))});
    const nextArchive = loadArchive(archiveFile, 'new');
    const inspected = await createNativeCandidateCatalog([nextArchive], {profile, baseUrl: RELEASE_BASE_URL}, JSZip);
    const item = inspected.packages[0];
    const previous = histories.find(history => history.moduleId === item.moduleId);
    if (previous?.packages.some(entry => entry.version === item.version)) throw new Error('官方版本已存在，不允许覆盖');
    const metadata = JSON.parse(fs.readFileSync(plainPath(productsDirectory, `${item.moduleId}/metadata.json`), 'utf8'));
    if (metadata.id !== item.moduleId.split('/')[1] || metadata.format !== 'hiwonder-native-extension') {
        throw new Error('新增发行必须对应原生产品作者目录');
    }
    const registered = histories.flatMap(history => history.packages);
    const next = {...item, status, tag, downloadUrl: `${RELEASE_BASE_URL}${tag}/${item.asset}`};
    if (registered.some(entry => entry.downloadUrl === next.downloadUrl)) {
        throw new Error('发行资源地址已登记，新版本不能复用旧tag和资产地址');
    }
    const needsReference = registered.some(entry => entry.libraryVersion === item.libraryVersion);
    if (needsReference && !baselineArchiveFile) throw new Error('复用既有库配置版本需要已审阅的参考ZIP，不能只比较版本号');
    if (baselineArchiveFile) {
        const baseline = loadArchive(baselineArchiveFile, 'baseline');
        const reference = (await createNativeCandidateCatalog([baseline], {profile, baseUrl: RELEASE_BASE_URL}, JSZip)).packages[0];
        if (reference.libraryVersion !== item.libraryVersion || !registered.some(entry =>
            entry.moduleId === reference.moduleId && entry.version === reference.version &&
            entry.libraryVersion === reference.libraryVersion && entry.asset === reference.asset)) {
            throw new Error('参考ZIP必须匹配已登记历史身份、资产及同一库配置版本');
        }
        await createNativeCandidateCatalog([baseline, nextArchive], {profile, baseUrl: RELEASE_BASE_URL}, JSZip);
    }
    const result = {formatVersion: 2, profile, moduleId: item.moduleId,
        status: status === 'candidate' || previous?.status === 'candidate' ? 'candidate' : 'published',
        packages: [...(previous?.packages || []), next]};
    if (Buffer.byteLength(JSON.stringify(result, null, 2) + '\n') > 1024 * 1024) throw new Error('产品历史大小超限');
    return writeNewCatalogFile(outputFile, result);
};

export {writeNativeReleaseAddition};
