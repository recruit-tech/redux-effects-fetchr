import { createAction } from 'redux-actions';

/*
 * Action types
 */
export const FETCHR = 'EFFECT_FETCHR';

/*
 * Action creators
 */
const createFetchrAction = createAction(FETCHR);

export const fetchrCreate = (resource, params, body, config) => (
  createFetchrAction({ type: 'create', resource, params, body, config })
);

export const fetchrRead = (resource, params, config) => (
  createFetchrAction({ type: 'read', resource, params, config })
);

export const fetchrUpdate = (resource, params, body, config) => (
  createFetchrAction({ type: 'update', resource, params, body, config })
);

export const fetchrDelete = (resource, params, config) => (
  createFetchrAction({ type: 'delete', resource, params, config })
);

/*
 * Middleware
 */
export default function fetchrMiddleware(fetchr) {
  return ({ dispatch }) => (next) => (action) => {
    if (action.type !== FETCHR) {
      return next(action);
    }

    const { type, resource, params, body, config } = action.payload;
    return (type === 'read' || type === 'delete')
      ? fetchr[type](resource, params, config)
      : fetchr[type](resource, params, body, config);
  };
}
