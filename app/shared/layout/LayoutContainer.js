import { connect } from 'react-redux';

import Layout from './';

export default connect(({ nav = {}, auth = {} } = {}) => ({
  isNavExpanded: nav.isNavExpanded,
  currentUser: auth.currentUser,
}))(Layout);
