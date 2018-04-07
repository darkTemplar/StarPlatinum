import { Field, change } from 'redux-form';
import { connect } from 'react-redux';
import React from 'react';

import { FORM_FIELD_GEO, FORM_NAME } from '../../constants/form';
import GeocompleteContainer from
  '../../../../shared/components/Geocomplete/containers/GeocompleteContainer';

function AddressInput(field) {
  const { input, meta, change, ...rest } = field;

  return (
    <GeocompleteContainer
      {...input}
      {...rest}
      onChange={value => change(FORM_NAME, input.name, value)}
    />
  );
}

const ConnectedAddressInput = connect(undefined, { change })(AddressInput);

export default function AddressField(props) {
  return (
    <Field
      name={FORM_FIELD_GEO}
      id="create-listing-address"
      label="PROPERTY ADDRESS"
      component={ConnectedAddressInput}
      {...props}
    />
  );
}
