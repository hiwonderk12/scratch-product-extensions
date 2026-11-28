// SDK 声明式延迟合同：配置错误在作者检查阶段拒绝，不延后到课程生成。
import assert from 'node:assert/strict';
import test from 'node:test';
import ts from 'typescript';
import {validateDeferredEmission, validateSourceDeferredEmissions} from './python-template-schema.mjs';

test('deferred emission accepts explicit match/stop lists and rejects malformed declarations', () => {
    const rule = {after: ['demo_config'], before: ['demo_init'], template: 'device.start()'};
    assert.doesNotThrow(() => validateDeferredEmission(rule, 'demo'));
    for (const value of [null, {}, {...rule, after: []}, {...rule, before: []}, {...rule, after: ['x', 'x']},
        {...rule, before: [2]}, {...rule, template: ''}, {...rule, unexpected: true}]) {
        assert.throws(() => validateDeferredEmission(value, 'demo'), /demo.*deferredEmission/);
    }
});



test('source check rejects dynamic and unknown declarations but accepts the SDK literal form', () => {
    const check = value => validateSourceDeferredEmissions(ts.createSourceFile('extension.ts',
        'const rule = {deferredEmission: ' + value + '};', ts.ScriptTarget.Latest, true), ts, 'extension');
    assert.doesNotThrow(() => check('{after: ["demo_config"], before: ["demo_init"], template: "device.start()"}'));
    for (const value of ['externalRule', '{...externalRule}',
        '{after: ["demo_config"], before: [], template: "x"}',
        '{after: ["demo_config"], before: ["demo_init"], template: "x", code: "y"}']) {
        assert.throws(() => check(value), /extension.*deferredEmission/);
    }
});
