# redux-effects-fetchr

[fetchr](https://www.npmjs.com/package/fetchr)
binding for
[redux-effects](https://www.npmjs.com/package/redux-effects)
family.

## Installation

```
npm install --save redux-effects-fetchr
```

## Usage

Installing the middleware:

```javascript
import { createStore, applyMiddleware } from 'redux';
import Fetchr from 'fetchr';
import stepsMiddleware from 'redux-effects-steps';
import fetchrMiddleware from 'redux-effects-fetchr';
import rootReducer from './reducers';

const fetchr = new Fetchr({
  xhrPath: '/api'
});

const store = createStore(
  rootReducer,
  applyMiddleware(
    stepsMiddleware,
    fetchrMiddleware(fetchr)
  )
);
```

Defining action creators:

```javascript
import { createAction } from 'redux-actions';
import { steps } from 'redux-effects-steps';
import { fetchrRead } from 'redux-effects-fetchr';

const fetchUserRequest = createAction('FETCH_USER_REQUEST');
const fetchUserSuccess = createAction('FETCH_USER_SUCCESS');
const fetchUserFail = createAction('FETCH_USER_FAIL');

function fetchUser(user) {
  return steps(
    fetchUserRequest(),
    fetchrRead('users', { user }),
    [fetchUserSuccess, fetchUserFail]
  );
}
```

Using it:

```javascript
const promise = store.dispatch(fetchUser({ user }));
```

## API (Action Creators)

### `fetchrCreate(resource, params = {}, body = {}, config = {})`

Call the create method of a service. See
[fetchr API docs](https://github.com/yahoo/fetchr/blob/master/docs/fetchr.md#createresource-params-body-config-callback)
for more info.

### `fetchrDelete(resource, params = {}, config = {})`

Call the delete method of a service. See
[fetchr API docs](https://github.com/yahoo/fetchr/blob/master/docs/fetchr.md#deleteresource-params-config-callback)
for more info.

### `fetchrRead(resource, params = {}, config = {})`

Call the read method of a service. See
[fetchr API docs](https://github.com/yahoo/fetchr/blob/master/docs/fetchr.md#readresource-params-config-callback)
for more info.

### `fetchrUpdate(resource, params = {}, body = {}, config = {})`

Call the update method of a service. See
[fetchr API docs](https://github.com/yahoo/fetchr/blob/master/docs/fetchr.md#updateresource-params-body-config-callback)
for more info.
