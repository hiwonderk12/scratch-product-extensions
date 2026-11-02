// 测试副本在用例结束后清理，包括断言失败；只删除本次创建且仍位于原父目录的目录。
import fs from 'node:fs';
import path from 'node:path';

export const createTemporaryDirectory = (context, parent, prefix) => {
    const base = fs.realpathSync(parent);
    const directory = fs.mkdtempSync(path.join(base, prefix));
    context.after(() => {
        if (!fs.existsSync(directory)) return;
        if (fs.lstatSync(directory).isSymbolicLink() ||
            fs.realpathSync(path.dirname(directory)) !== base ||
            path.dirname(fs.realpathSync(directory)) !== base ||
            !path.basename(directory).startsWith(prefix)) {
            throw new Error(`测试副本路径已改变，拒绝清理：${directory}`);
        }
        fs.rmSync(directory, {recursive: true, force: true});
    });
    return directory;
};
