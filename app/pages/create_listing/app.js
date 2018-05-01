import PropTypes from 'prop-types';
import React from 'react';

import { withRedux } from '../../shared/hocs/withRedux';
import CreateListingPageContentContainer from './containers/CreateListingPageContentContainer';
import LayoutContainer from '../../shared/layout/LayoutContainer';
import geocompleteReducer from '../../shared/components/Geocomplete/reducers/geocompleteReducer';

const propTypes = {
  // eslint-disable-next-line
  store: PropTypes.object.isRequired,
};

export class App extends React.PureComponent {
  constructor(props) {
    super(props);
    this.props.store.injectAll({ geocomplete: geocompleteReducer });
  }

  render() {
    return (
      <LayoutContainer>
        <CreateListingPageContentContainer />
      </LayoutContainer>
    );
  }
}

App.propTypes = propTypes;

export default withRedux(App);
