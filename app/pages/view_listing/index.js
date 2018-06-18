import { forbidExtraProps } from 'airbnb-prop-types';
import PropTypes from 'prop-types';
import React from 'react';

import withPage from '../../shared/page/withPage';

export class ViewListing extends React.PureComponent {
  render() {
    return (
      <div>
        Hello World
      </div>
    );
  }
}

export default withPage(ViewListing);
