// 共享旧身份只能属于互斥主控；同一主控可共存的包仍必须全局无冲突。
import assert from 'node:assert/strict';
import test from 'node:test';
import {validateLegacyOwners} from './legacy-owners.mjs';

test('legacy owners require nonempty disjoint board support, never a duplicate on one board', () => {
    const blocks = {sensor_shared: {module: 'input/a', alternatives: ['input/b']}};
    assert.doesNotThrow(() => validateLegacyOwners(blocks, {one: {'input/a': {}}, two: {'input/b': {}}}));
    assert.throws(() => validateLegacyOwners(blocks, {one: {'input/a': {}, 'input/b': {}}}), /sensor_shared.*one/);
    assert.throws(() => validateLegacyOwners(blocks, {one: {'input/a': {}}}), /input\/b.*主控/);
});
