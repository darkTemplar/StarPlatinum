import PropTypes from 'prop-types';
import React from 'react';
import Router from 'next/router';

import {
  FORM_FIELD_BATHROOMS,
  FORM_FIELD_BEDROOMS,
  FORM_FIELD_FILES,
  FORM_FIELD_PHOTOS,
  FORM_FIELD_DISCLOSURES,
  FILE_TYPE_IMAGE,
  FILE_TYPE_DISCLOSURES
} from '../constants/form';
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
    this.onSubmitFail = this.onSubmitFail.bind(this);
  }

  componentDidUpdate() {
    if (this.props.createdListingId) {
      // navigate to view listing page
      Router.push(`/view_listing?listingId=${this.props.createdListingId}`, `/listing/${this.props.createdListingId}`);
    }
  }

  onSubmit(values) {
    // TODO remove temp hacky logic
    delete values.place;
    values.final_expiry = values.initial_expiry;
    values[FORM_FIELD_FILES] = [
      ...(values[FORM_FIELD_PHOTOS] || []).map(image => [image.data, FILE_TYPE_IMAGE]),
      ...(values[FORM_FIELD_DISCLOSURES] || []).map(image => [image.data, FILE_TYPE_DISCLOSURES]),
    ],
    this.props.createListing(values);
  }

  onSubmitFail(errors) {
    if (errors) {
      const firstError = Object.keys(errors)[0];

      if (firstError) {
        const domNode = document.querySelector(`[name="${firstError}"]`);

        if (domNode) {
          domNode.scrollIntoView({ behavior: 'smooth' });
        }
      }
    }
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
          onSubmitFail={this.onSubmitFail}
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
