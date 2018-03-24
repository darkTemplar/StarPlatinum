import { Field } from 'redux-form';
import React from 'react';

import { FORM_FIELD_SQFT } from '../../constants/form';
import Input from '../../../../shared/components/Input';

function SquareFeetInput(field) {
  const { input, meta, ...rest } = field;

  return (
    <Input
      id="create-listing-bedrooms"
      type="text"
      label="SQFT"
      {...input}
      {...rest}
    />
  );
}

export default function SquareFeetField(props) {
  return (
    <Field
      name={FORM_FIELD_SQFT}
      component={SquareFeetInput}
      {...props}
    />
  );
}
