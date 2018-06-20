import {
  CREATE_LISTING_REQUEST,
  CREATE_LISTING_SUCCESS,
} from '../actions/actionTypes';

function getInitialState() {
  return {
    createdListingId: null,
  };
}

export default function createListingReducer(state = getInitialState(), action = {}) {
  switch (action.type) {
    case CREATE_LISTING_REQUEST: {
      return {
        ...state,
        createdListingId: null,
      };
    }
    case CREATE_LISTING_SUCCESS: {
      return {
        ...state,
        createdListingId: action.payload.createdListingId,
      };
    }
    default: {
      return state;
    }
  }
}
