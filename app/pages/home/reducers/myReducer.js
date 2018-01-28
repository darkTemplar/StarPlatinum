import {
  BOOTSTRAP,
} from '../actions/actionTypes';

const initialState = {
  foo: 1,
};

export default function myReducer(state = initialState, action = {}) {
  switch (action.type) {
    case BOOTSTRAP: {
      return {
        ...initialState,
        ...action.payload.data,
      };
    }
    default: {
      return state;
    }
  }
}