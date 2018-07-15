import { Field, change } from 'redux-form';
import { connect } from 'react-redux';
import React from 'react';

import { FORM_FIELD_GEO, FORM_NAME } from '../../constants/form';
import GeocompleteContainer from
  '../../../../shared/components/Geocomplete/containers/GeocompleteContainer';

function AddressInput(field) {
  const { input, meta, ...rest } = field;
  const { invalid, touched } = meta;

  return (
    <GeocompleteContainer
      {...input}
      {...rest}
      invalid={touched && invalid}
      onChange={input.onChange}
    />
  );
}

export default function AddressField(props) {
  return (
    <Field
      name={FORM_FIELD_GEO}
      id="create-listing-address"
      label="PROPERTY ADDRESS"
      component={AddressInput}
      validate={value => value ? undefined : 'Address Required'}
      {...props}
    />
  );
}
