import {
  BOOTSTRAP
} from './actionTypes';

export function bootstrap(data) {
  return {
    type: BOOTSTRAP,
    payload: {
      data,
    },
  };
}
