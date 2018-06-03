import { connect } from 'react-redux';

import SignupLogin from './';
import hideSignupLogin from
  '../../redux/actions/actionCreators/hideSignupLogin';
import signup from '../../redux/actions/actionCreators/signup';

export default connect(({ auth }) => ({
  isVisible: auth.isVisible,
}), { hideSignupLogin, signup })(SignupLogin);
