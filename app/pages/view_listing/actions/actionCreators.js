import { LISTING_API } from '../constants/api';
import { LISTING_STATUS } from '../../../shared/listing/status';
import {
  PUBLISH_REQUEST,
  PUBLISH_SUCCESS,
  PUBLISH_ERROR,
} from './actionTypes';
import { put } from '../../../shared/utils/fetch';

export function publishRequest() {
  return {
    type: PUBLISH_REQUEST,
  };
}

export function publishSuccess() {
  return {
    type: PUBLISH_SUCCESS,
  };
}

export function publishError(error) {
  return {
    type: PUBLISH_ERROR,
    payload: {
      error,
    },
  };
}

export function publishListing(id) {
  return (dispatch) => {
    dispatch(publishRequest());

    return put(`${LISTING_API}/${id}`, {
      body: {
        status: LISTING_STATUS.ACTIVE,
      },
    })
      .then(() => dispatch(publishSuccess()))
      .catch(ex => dispatch(publishError(ex.message)));
  };
}
