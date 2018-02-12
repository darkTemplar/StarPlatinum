import { Field } from 'redux-form';
import React from 'react';

import { FORM_FIELD_BEDROOMS } from '../../constants/form';
import Select from '../../../../shared/components/Select';
import number from '../../../../shared/form/parsers/number';

function BedroomsSelect(field) {
  const { input, meta, ...rest } = field;

  return (
    <Select
      id="create-listing-bathrooms"
      label="BATHROOMS"
      options={[{
        value: 1,
        label: 1,
      }, {
        value: 2,
        label: 2,
      }]}
      {...input}
      {...rest}
    />
  );
}

export default function BedroomsField(props) {
  return (
    <Field
      name={FORM_FIELD_BEDROOMS}
      component={BedroomsSelect}
      parse={number}
      {...props}
    />
  );
}
