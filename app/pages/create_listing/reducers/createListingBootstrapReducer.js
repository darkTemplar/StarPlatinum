import { BOOTSTRAP_CREATE_LISTING } from '../actions/actionTypes';

function getInitialState() {
  return {
    bootstrapData: {},
  };
}

export default function createListingBootstrapReducer(state = getInitialState(), action = {}) {
  switch (action.type) {
    case BOOTSTRAP_CREATE_LISTING: {
      return {
        ...state,
        bootstrapData: action.payload.bootstrapData,
      };
    }
    default: {
      return state;
    }
  }
}
