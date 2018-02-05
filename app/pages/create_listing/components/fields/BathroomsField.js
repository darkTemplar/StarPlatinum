import { Field } from 'redux-form';
import React from 'react';

import { FORM_FIELD_BATHROOMS } from '../../constants/form';
import Select from '../../../../shared/components/Select';

function BathroomsSelect(field) {
  const { input, meta, ...rest } = field;

  return (
    <Select
      name={FORM_FIELD_BATHROOMS}
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

export default function BathroomsField(props) {
  return (
    <Field
      name={FORM_FIELD_BATHROOMS}
      component={BathroomsSelect}
      {...props}
    />
  );
}