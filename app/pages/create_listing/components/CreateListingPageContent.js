import PropTypes from 'prop-types';
import React from 'react';
import Router from 'next/router';

import { FORM_FIELD_BATHROOMS, FORM_FIELD_BEDROOMS } from '../constants/form';
import CreateListingForm from './CreateListingForm';
import Spacing from '../../../shared/components/Spacing';
import Text from '../../../shared/components/Text';
import Title from '../../../shared/components/Title';

const propTypes = {
  createListing: PropTypes.func.isRequired,
  createdListingId: PropTypes.number,
};

const defaultProps = {
  createdListingId: null,
};

export default class CreateListingPageContent extends React.PureComponent {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidUpdate() {
    if (this.props.createdListingId) {
      // navigate to view listing page
      Router.push(`/view_listing?listingId=${this.props.createdListingId}`, `/listing/${this.props.createdListingId}`);
    }
  }

  onSubmit(values) {
    // TODO remove temp hacky logic
    values.final_expiry = values.initial_expiry;
    values.files = values.images.map(image => [image.data, 1]);
    this.props.createListing(values);
  }

  render() {
    return (
      <div>
        <Spacing top={1} bottom={2}>
          <Title level={1}>Let's Get Started</Title>
          <Text muted>You'll be sharing disclosures and collecting offers in no time</Text>
        </Spacing>
        <CreateListingForm
          onSubmit={this.onSubmit}
          initialValues={{
            shareDisclosure: true,
            [FORM_FIELD_BEDROOMS]: 1,
            [FORM_FIELD_BATHROOMS]: 1,
          }}
        />
      </div>
    );
  }
}

CreateListingPageContent.propTypes = propTypes;
CreateListingPageContent.defaultProps = defaultProps;
