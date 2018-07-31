import { Field, change } from 'redux-form';
import { connect } from 'react-redux';
import React from 'react';

import { FORM_FIELD_GEO, FORM_FIELD_GEO_INPUT, FORM_NAME } from '../../constants/form';
import GeocompleteContainer from
  '../../../../shared/components/Geocomplete/containers/GeocompleteContainer';

function AddressInput(field) {
  const { input, meta, change, ...rest } = field;
  const { invalid, touched } = meta;

  return (
    <GeocompleteContainer
      {...input}
      {...rest}
      invalid={touched && invalid}
      onSelectSuggestion={value => {
        change(FORM_NAME, FORM_FIELD_GEO, value);
      }}
      onChange={input.onChange}
    />
  );
}

const ConnectedAddressInput = connect(undefined, { change })(AddressInput);

export default function AddressField(props) {
  return (
    <Field
      name={FORM_FIELD_GEO_INPUT}
      id="create-listing-address"
      label="PROPERTY ADDRESS"
      component={ConnectedAddressInput}
      validate={(value, allValues) => {
        if (!value || !allValues[FORM_FIELD_GEO]) {
          return 'Address Required';
        }

        return undefined;
      }}
      {...props}
    />
  );
}
