import { applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createInjectableStore } from 'redux-injectable-store';
import thunk from 'redux-thunk';

import authReducer from '../reducers/authReducer';
import bootstrapCurrentUser from '../actions/actionCreators/bootstrapCurrentUser';
import navReducer from '../reducers/navReducer';

const enhancer = composeWithDevTools(applyMiddleware(thunk));

let store;

function setupStore(_store, bootstrapData = {}) {
  _store.injectAll({
    nav: navReducer,
    auth: authReducer,
  });

  // bootstrap auth information
  if (bootstrapData.user) {
    _store.dispatch(bootstrapCurrentUser(bootstrapData.user));
  }
}

export default function configureStore(bootstrapData = {}) {
  if (typeof window !== 'undefined') {
    if (!store) {
      store = createInjectableStore(
        {},
        enhancer,
      );

      setupStore(store, bootstrapData);
    }

    return store;
  }

  // do not cache on server as this should be done per request
  const serverStore = createInjectableStore(
    {},
    enhancer,
  );

  setupStore(serverStore, bootstrapData);

  return serverStore;
}
