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
  typeof resource === 'string'
    ? createFetchrAction({ type: 'create', resource, params, body, config })
    : createFetchrAction({ ...resource, type: 'create' })
);

export const fetchrRead = (resource, params, config) => (
  typeof resource === 'string'
    ? createFetchrAction({ type: 'read', resource, params, config })
    : createFetchrAction({ ...resource, type: 'read' })
);

export const fetchrUpdate = (resource, params, body, config) => (
  typeof resource === 'string'
    ? createFetchrAction({ type: 'update', resource, params, body, config })
    : createFetchrAction({ ...resource, type: 'update' })
);

export const fetchrDelete = (resource, params, config) => (
  typeof resource === 'string'
    ? createFetchrAction({ type: 'delete', resource, params, config })
    : createFetchrAction({ ...resource, type: 'delete' })
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
