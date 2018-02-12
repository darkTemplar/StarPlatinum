import {
  CREATE_LISTING_REQUEST,
  CREATE_LISTING_SUCCESS,
  CREATE_LISTING_ERROR,
} from './actionTypes';
import { CREATE_LISTING_API_ENDPOINT } from '../constants/api';
import { post } from '../../../shared/utils/fetch';

export function createListingRequest() {
  return {
    type: CREATE_LISTING_REQUEST,
  };
}

export function createListingSuccess() {
  return {
    type: CREATE_LISTING_SUCCESS,
  };
}

export function createListingError(errorMessage) {
  return {
    type: CREATE_LISTING_ERROR,
    payload: {
      errorMessage,
    },
  };
}

export function createListing(listing) {
  return (dispatch) => {
    dispatch(createListingRequest);

    post(CREATE_LISTING_API_ENDPOINT, {
      body: listing,
    })
      .then((response) => {
        console.log(response);
      })
      .catch((ex) => dispatch(createListingError(ex.message)));
  };
}
