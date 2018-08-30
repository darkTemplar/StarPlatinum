import {
  PUBLISH_REQUEST,
  PUBLISH_SUCCESS,
  PUBLISH_ERROR,
} from '../actions/actionTypes';

function getInitialState() {
  return {
    isPublishing: false,
    publishError: '',
  };
}

export default function previewListingReducer(state = getInitialState(), action = {}) {
  switch (action.type) {
    case PUBLISH_REQUEST: {
      return {
        ...state,
        isPublishing: true,
        publishError: '',
      };
    }
    case PUBLISH_SUCCESS: {
      return {
        ...state,
        isPublishing: false,
      };
    }
    case PUBLISH_ERROR: {
      return {
        ...state,
        isPublishing: false,
        publishError: action.payload.error,
      };
    }
    default: {
      return state;
    }
  }
}
