import fs from 'node:fs';
import path from 'node:path';
import {plainPath, readNativeProductCatalogs, validateNativeReleaseCatalog} from './native-releases.mjs';

// 将已登记的平铺索引拆成发布预览；不重打历史包、不改正式目录或发行身份。
const writeNativeProductCatalogs = ({catalogFile, productsDirectory, outputDirectory, profile}) => {
    const source = path.resolve(catalogFile);
    const destination = path.resolve(outputDirectory);
    const parent = path.dirname(destination);
    const drive = path.parse(parent).root;
    let current = drive;
    for (const part of parent.slice(drive.length).split(path.sep).filter(Boolean)) {
        current = path.join(current, part);
        if (fs.lstatSync(current).isSymbolicLink()) throw new Error('分层目录输出不允许联接或符号链接');
    }
    if (fs.existsSync(destination)) throw new Error('分层目录输出已存在，不允许覆盖');
    plainPath(source);
    if (fs.statSync(source).size > 1024 * 1024) {
        throw new Error('分层目录输入链接或大小无效');
    }
    const catalog = validateNativeReleaseCatalog(JSON.parse(fs.readFileSync(source, 'utf8')), {profile, productsDirectory});
    if (catalog.formatVersion !== 2) throw new Error('--split需要平铺v2索引');
    const histories = new Map(readNativeProductCatalogs({profile, productsDirectory})
        .filter(history => catalog.packages.some(item => item.moduleId === history.moduleId))
        .map(history => [history.moduleId, history]));
    if (histories.size > 256) throw new Error('分层目录产品数量超限');
    const products = [...histories.keys()].sort().map(moduleId => ({moduleId, catalog: `products/${moduleId}/catalog.json`}));
    const root = {formatVersion: 3, profile, status: catalog.status, products};
    const files = products.map(product => [product.catalog, histories.get(product.moduleId)]);
    files.push(['catalog.json', root]);
    const serialized = files.map(([relative, value]) => [relative, JSON.stringify(value, null, 2) + '\n']);
    if (serialized.reduce((size, [, text]) => size + Buffer.byteLength(text), 0) > 1024 * 1024) {
        throw new Error('分层目录树总大小超限');
    }
    // 先完成全部预检再创建新目录，根索引最后写；失败产物不可上传为正式目录。
    fs.mkdirSync(destination);
    for (const [relative, text] of serialized) {
        const filename = path.join(destination, relative);
        fs.mkdirSync(path.dirname(filename), {recursive: true});
        fs.writeFileSync(filename, text, {flag: 'wx'});
    }
    return root;
};

export {writeNativeProductCatalogs};
