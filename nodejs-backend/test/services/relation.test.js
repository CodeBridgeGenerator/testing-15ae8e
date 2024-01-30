const assert = require('assert');
const app = require('../../src/app');

describe('\'relation\' service', () => {
  it('registered the service', () => {
    const service = app.service('relation');

    assert.ok(service, 'Registered the service (relation)');
  });
});
