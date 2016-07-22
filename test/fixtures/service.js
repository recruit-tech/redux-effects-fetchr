import assert from 'assert';

export default {
  name: 'test',

  create(req, resource, params, body, config, cb) {
    if (params.type === 'fail') {
      return cb(new Error('Bad Request'), null);
    }

    assert.deepEqual(params, { type: 'success' });
    assert.deepEqual(body, { foo: true, bar: false })
    cb(null, { message: 'created' });
  },

  read(req, resource, params, config, cb) {
    if (params.type === 'fail') {
      return cb(new Error('Internal Server Error'), null);
    }

    assert.deepEqual(params, { type: 'success' });
    cb(null, { message: 'got' });
  },

  update(req, resource, params, body, config, cb) {
    if (params.type === 'fail') {
      return cb(new Error('Unauthorized'), null);
    }

    assert.deepEqual(params, { type: 'success' });
    assert.deepEqual(body, { foo: true, bar: false })
    cb(null, { message: 'updated' });
  },

  delete(req, resource, params, config, cb) {
    if (params.type === 'fail') {
      return cb(new Error('Method Not Allowed'), null);
    }

    assert.deepEqual(params, { type: 'success' });
    cb(null, { message: 'deleted' });
  },
};
