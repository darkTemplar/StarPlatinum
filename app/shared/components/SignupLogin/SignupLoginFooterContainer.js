import { connect } from 'react-redux';

import SignupLoginFooter from './SignupLoginFooter';
import switchSignupLoginMode from '../../redux/actions/actionCreators/switchSignupLoginMode';

export default connect(({ auth }) => ({
  mode: auth.mode,
}), {
  switchSignupLoginMode,
})(SignupLoginFooter);
