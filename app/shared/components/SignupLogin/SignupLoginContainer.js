import { connect } from 'react-redux';

import SignupLogin from './';
import hideSignupLogin from
  '../../redux/actions/actionCreators/hideSignupLogin';
import login from '../../redux/actions/actionCreators/login';
import signup from '../../redux/actions/actionCreators/signup';

export default connect(({ auth }) => ({
  isVisible: auth.isVisible,
  mode: auth.mode,
}), { hideSignupLogin, signup, login })(SignupLogin);
