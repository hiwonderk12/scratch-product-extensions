// 完整旧类型允许按互斥主控分属不同正式包；运行时仍拒绝同命名空间冲突。
export const validateLegacyOwners = (blocks, boards) => {
    for (const [type, owner] of Object.entries(blocks)) {
        if (!owner.alternatives) continue;
        const owners = [owner.module, ...owner.alternatives];
        for (const moduleId of owners) {
            if (!Object.values(boards).some(modules => Object.hasOwn(modules, moduleId))) {
                throw new Error(type + ': ' + moduleId + ' 共享旧类型必须有明确主控');
            }
        }
        for (const [board, modules] of Object.entries(boards)) {
            if (owners.filter(id => Object.hasOwn(modules, id)).length > 1) {
                throw new Error(type + ': 完整旧类型在主控 ' + board + ' 重复');
            }
        }
    }
};

