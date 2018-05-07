import { TOGGLE_NAV_EXPAND } from '../actions/actionTypes';

const initialState = {
  isNavExpanded: false,
};

export default function navReducer(state = initialState, action = {}) {
  switch (action.type) {
    case TOGGLE_NAV_EXPAND: {
      return {
        ...state,
        isNavExpanded: !state.isNavExpanded,
      };
    }
    default: {
      return state;
    }
  }
}
