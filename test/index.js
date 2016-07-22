import { test } from 'eater/runner';
import assert from 'assert';
import mustCall from 'must-call';
import { createStore, applyMiddleware } from 'redux';
import Fetchr from 'fetchr';
import { default as fetchrMiddleware, fetchrCreate, fetchrRead, fetchrUpdate, fetchrDelete } from '../src';
import service from './fixtures/service';

Fetchr.registerService(service);

const store = createStore(
  () => null,
  {},
  applyMiddleware(fetchrMiddleware(new Fetchr({ req: {} })))
);

testSuccessWithBody('create', fetchrCreate, { foo: true, bar: false }, 'created');
testFailure('create', fetchrCreate, 'Bad Request');

testSuccess('read', fetchrRead, 'got');
testFailure('read', fetchrRead, 'Internal Server Error');

testSuccessWithBody('update', fetchrUpdate, { foo: true, bar: false }, 'updated');
testFailure('update', fetchrUpdate, 'Unauthorized');

testSuccess('delete', fetchrDelete, 'deleted');
testFailure('delete', fetchrDelete, 'Method Not Allowed');

function testSuccess(type, actionCreator, expectedMessage) {
  test(`${type}, success`, () => {
    store.dispatch(actionCreator('test', { type: 'success' })).then(
      mustCall((result) => {
        assert.deepEqual(result.data, { message: expectedMessage });
      }),
      assert.fail
    );
  });
}

function testSuccessWithBody(type, actionCreator, body, expectedMessage) {
  test(`${type}, success`, () => {
    store.dispatch(actionCreator('test', { type: 'success' }, body)).then(
      mustCall((result) => {
        assert.deepEqual(result.data, { message: expectedMessage });
      }),
      assert.fail
    );
  });
}

function testFailure(type, actionCreator, expectedErrorMessage) {
  test(`${type}, failure`, () => {
    store.dispatch(actionCreator('test', { type: 'fail' })).then(
      assert.fail,
      mustCall((error) => {
        assert.deepEqual(error, new Error(expectedErrorMessage));
      })
    );
  });
}
