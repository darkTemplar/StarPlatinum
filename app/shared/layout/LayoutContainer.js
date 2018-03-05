import { connect } from 'react-redux';

import Layout from './';

export default connect(({ nav = {} } = {}) => ({
  isNavExpanded: nav.isNavExpanded,
}))(Layout);
