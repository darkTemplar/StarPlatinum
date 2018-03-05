import { applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createInjectableStore } from 'redux-injectable-store';
import thunk from 'redux-thunk';

import navReducer from '../reducers/navReducer';

const enhancer = composeWithDevTools(applyMiddleware(thunk));

let store;

export default function configureStore() {
  if (typeof window !== 'undefined') {
    if (!store) {
      store = createInjectableStore(
        {},
        enhancer,
      );
    }

    store.injectAll({ nav: navReducer });

    return store;
  }

  return createInjectableStore(
    {},
    enhancer,
  );
}
