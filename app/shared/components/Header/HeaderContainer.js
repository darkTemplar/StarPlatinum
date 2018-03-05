import { connect } from 'react-redux';

import Header from './';
import toggleNavExpand from '../../redux/actions/actionCreators/toggleNavExpand';

export default connect(undefined, { toggleNavExpand })(Header);
