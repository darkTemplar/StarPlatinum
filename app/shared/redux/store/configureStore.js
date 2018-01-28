import { applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createInjectableStore } from 'redux-injectable-store';
import thunk from 'redux-thunk';

const enhancer = composeWithDevTools(
  applyMiddleware(
    thunk,
  ),
);

let store;

export default function configureStore() {
  if (typeof window !== 'undefined') {
    if (!store) {
      store = createInjectableStore(
        {},
        enhancer,
      );
    }

    return store;
  }

  return createInjectableStore(
    {},
    enhancer,
  );
}
