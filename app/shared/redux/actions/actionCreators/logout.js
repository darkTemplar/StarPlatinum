import { LOGOUT_ENDPOINT } from '../../../constants/api/auth';
import { del } from '../../../utils/fetch';

// TODO use redux actions and lifecycle methods
export default function logout() {
  return (dispatch, getState) => {
    const { auth: { currentUser } } = getState();

    if (currentUser) {
      return del(LOGOUT_ENDPOINT)
        .then(
          response => window.location.reload(),
          (ex) => {
            
          },
        );
    }

    throw new Error('Do not call logout when user is not logged in');
  };
}
