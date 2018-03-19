import { Field } from 'redux-form';
import React from 'react';

import { FORM_FIELD_GEO } from '../../constants/form';
import GeocompleteContainer from
  '../../../../shared/components/Geocomplete/containers/GeocompleteContainer';

function AddressInput(field) {
  const { input, meta, ...rest } = field;

  return (
    <GeocompleteContainer
      inputProps={{
        ...input,
        ...rest,
      }}
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
      {...props}
    />
  );
}
