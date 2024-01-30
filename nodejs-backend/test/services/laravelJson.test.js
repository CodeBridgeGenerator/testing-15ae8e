const assert = require('assert');
const app = require('../../src/app');

describe('\'laravelJson\' service', () => {
  it('registered the service', () => {
    const service = app.service('laravelJson');

    assert.ok(service, 'Registered the service (laravelJson)');
  });
});
