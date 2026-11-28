// 同命名空间共存菜单与内联端口菜单一致检查单元测试。
import assert from 'node:assert/strict';
import test from 'node:test';
import ts from 'typescript';
import {validateRuntimeMenus} from './menu-consistency.mjs';

const compileModule = (moduleId, source, extraMessages = {}) => {
    const wrappedMessages = {
        'zh-cn': {'product.name': '模块', ...extraMessages},
        en: {'product.name': 'Module', ...extraMessages},
        'zh-tw': {'product.name': '模組', ...extraMessages},
        ko: {'product.name': '모듈', ...extraMessages}
    };
    const result = ts.transpileModule(source, {
        compilerOptions: {target: ts.ScriptTarget.ES2020, module: ts.ModuleKind.CommonJS, newLine: ts.NewLineKind.LineFeed}
    });
    const compiled = `${result.outputText}\nexports.messages = ${JSON.stringify(wrappedMessages)};\n`;
    return {
        descriptor: {moduleId, namespace: 'sensor'},
        files: {'index.cjs': compiled}
    };
};

const portsFixture = {
    'sensor.board_iic': [
        {label: 'A', value: '1'},
        {label: 'B', value: '2'}
    ]
};

test('accepts consistent coexisting menus and matching inline port menu with defaultPort', () => {
    const sourceA = `
        export default class ModA {
            constructor(private readonly context: any) {}
            getInfo() {
                return {
                    id: 'sensor',
                    name: this.context.t('product.name'),
                    menus: {
                        board_iic: {acceptReporters: false, items: [{text: 'A', value: '1'}, {text: 'B', value: '2'}]},
                        shared_opt: {acceptReporters: false, items: [{text: 'X', value: '0'}, {text: 'Y', value: '1'}]}
                    },
                    blocks: [{
                        opcode: 'read_a',
                        blockType: 'reporter',
                        text: 'read [PORT]',
                        arguments: {PORT: {type: 'string', menu: 'board_iic', defaultValue: this.context.defaultPort('read_a', 'PORT')}}
                    }]
                };
            }
        }
    `;
    const sourceB = `
        export default class ModB {
            constructor(private readonly context: any) {}
            getInfo() {
                return {
                    id: 'sensor',
                    name: this.context.t('product.name'),
                    menus: {
                        shared_opt: {acceptReporters: false, items: [{text: 'X', value: '0'}, {text: 'Y', value: '1'}]}
                    },
                    blocks: [{opcode: 'read_b', blockType: 'reporter', text: 'b', arguments: {}}]
                };
            }
        }
    `;
    const compiledModules = new Map([
        ['input/a', compileModule('input/a', sourceA)],
        ['input/b', compileModule('input/b', sourceB)]
    ]);
    const boards = {
        board1: {
            modules: {
                'input/a': {
                    variant: 'v1',
                    portGroups: {'sensor.board_iic': {bindings: {'sensor_read_a.PORT': '2'}}}
                },
                'input/b': {variant: 'v1', portGroups: {}}
            }
        }
    };
    const res = validateRuntimeMenus({compiledModules, boards, ports: portsFixture});
    assert.equal(res.checkedPortMenuBindings, 1);
});

test('rejects conflicting coexisting same-namespace menus across items, order, and acceptReporters', () => {
    const makePair = (menuB) => {
        const compiledModules = new Map([
            ['input/a', compileModule('input/a', `
                export default class ModA {
                    getInfo() {
                        return {
                            id: 'sensor', name: 'A',
                            menus: {shared: {acceptReporters: false, items: [{text: 'A', value: '1'}, {text: 'B', value: '2'}]}},
                            blocks: []
                        };
                    }
                }
            `)],
            ['input/b', compileModule('input/b', `
                export default class ModB {
                    getInfo() {
                        return {id: 'sensor', name: 'B', menus: {shared: ${menuB}}, blocks: []};
                    }
                }
            `)]
        ]);
        const boards = {board1: {modules: {'input/a': {variant: 'v1', portGroups: {}}, 'input/b': {variant: 'v1', portGroups: {}}}}};
        return {compiledModules, boards, ports: {}};
    };

    assert.throws(
        () => validateRuntimeMenus(makePair("{acceptReporters: true, items: [{text: 'A', value: '1'}, {text: 'B', value: '2'}]}")),
        /同命名空间菜单冲突.*sensor\.shared.*input\/a.*input\/b/
    );
    assert.throws(
        () => validateRuntimeMenus(makePair("{acceptReporters: false, items: [{text: 'B', value: '2'}, {text: 'A', value: '1'}]}")),
        /同命名空间菜单冲突.*sensor\.shared/
    );
    assert.throws(
        () => validateRuntimeMenus(makePair("{acceptReporters: false, items: [{text: 'A', value: '1'}, {text: 'C', value: '3'}]}")),
        /同命名空间菜单冲突.*sensor\.shared/
    );
});

test('rejects inline port menus that diverge from library/ports.json or omit defaultPort value', () => {
    const buildMod = itemsCode => new Map([
        ['input/a', compileModule('input/a', `
            export default class ModA {
                constructor(private readonly context: any) {}
                getInfo() {
                    return {
                        id: 'sensor',
                        name: this.context.t('product.name'),
                        menus: {board_iic: {acceptReporters: false, items: ${itemsCode}}},
                        blocks: [{
                            opcode: 'read_a',
                            blockType: 'reporter',
                            text: 'read [PORT]',
                            arguments: {PORT: {type: 'string', menu: 'board_iic', defaultValue: '1'}}
                        }]
                    };
                }
            }
        `)]
    ]);
    const boards = {
        board1: {
            modules: {
                'input/a': {variant: 'v1', portGroups: {'sensor.board_iic': {bindings: {'sensor_read_a.PORT': '2'}}}}
            }
        }
    };

    assert.throws(
        () => validateRuntimeMenus({compiledModules: buildMod("[{text: 'A', value: '1'}]"), boards, ports: portsFixture}),
        /端口菜单 board_iic 项与端口组 sensor\.board_iic 不一致/
    );

    const portsSingle = {'sensor.only_a': [{label: 'A', value: '1'}]};
    const badDefaultBoards = {
        board1: {
            modules: {
                'input/a': {variant: 'v1', portGroups: {'sensor.only_a': {bindings: {'sensor_read_a.PORT': '2'}}}}
            }
        }
    };
    assert.throws(
        () => validateRuntimeMenus({compiledModules: buildMod("[{text: 'A', value: '1'}]"), boards: badDefaultBoards, ports: portsSingle}),
        /defaultPort 默认值 sensor_read_a\.PORT=2 不在菜单 board_iic 中/
    );
});
