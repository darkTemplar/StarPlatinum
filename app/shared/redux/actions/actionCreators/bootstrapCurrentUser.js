import { BOOTSTRAP_CURRENT_USER } from '../actionTypes';

export default function bootstrapCurrentUser(user) {
  return {
    type: BOOTSTRAP_CURRENT_USER,
    payload: {
      user,
    },
  };
}
