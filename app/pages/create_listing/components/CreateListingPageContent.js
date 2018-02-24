import PropTypes from 'prop-types';
import React from 'react';

import {
  css,
  withStyles,
  withStylesPropTypes,
} from '../../../shared/hocs/withStyles';
import CreateListingForm from './CreateListingForm';
import Spacing from '../../../shared/components/Spacing';
import Text from '../../../shared/components/Text';
import Title from '../../../shared/components/Title';

const propTypes = {
  createListing: PropTypes.func.isRequired,
  ...withStylesPropTypes,
};

export class CreateListingPageContent extends React.PureComponent {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(values) {
    this.props.createListing(values);
  }

  render() {
    const { styles } = this.props;

    return (
      <div {...css(styles.page)}>
        <Spacing top={1} bottom={2}>
          <Title level={1}>Let's Get Started</Title>
          <Text muted>You'll be sharing disclosures and collecting offers in no time</Text>
        </Spacing>
        <CreateListingForm
          onSubmit={this.onSubmit}
          initialValues={{
            shareDisclosure: true,
          }}
        />
      </div>
    );
  }
}

CreateListingPageContent.propTypes = propTypes;

export default withStyles(({ unit }) => ({
  page: {
    padding: unit * 2,
  },
}), { pureComponent: true })(CreateListingPageContent);
