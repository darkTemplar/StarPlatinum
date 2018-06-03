import { connect } from 'react-redux';

import Header from './';
import showSignupLogin from
  '../../redux/actions/actionCreators/showSignupLogin';
import toggleNavExpand from '../../redux/actions/actionCreators/toggleNavExpand';

export default connect(({ auth }) => ({ currentUser: auth.currentUser }), { toggleNavExpand, showSignupLogin })(Header);
