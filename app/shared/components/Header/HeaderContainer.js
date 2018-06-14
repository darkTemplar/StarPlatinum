import { connect } from 'react-redux';

import Header from './';
import showLogin from '../../redux/actions/actionCreators/showLogin';
import showSignup from '../../redux/actions/actionCreators/showSignup';
import logout from '../../redux/actions/actionCreators/logout';
import toggleNavExpand from '../../redux/actions/actionCreators/toggleNavExpand';

export default connect(({ auth }) => ({
  currentUser: auth.currentUser,
}), {
  toggleNavExpand,
  logout,
  showLogin,
  showSignup,
})(Header);
