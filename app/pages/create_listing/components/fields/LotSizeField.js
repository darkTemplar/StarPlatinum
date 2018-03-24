import { Field } from 'redux-form';
import React from 'react';

import { FORM_FIELD_LOT_SIZE } from '../../constants/form';
import Input from '../../../../shared/components/Input';

function SquareFeetInput(field) {
  const { input, meta, ...rest } = field;

  return (
    <Input
      id="create-listing-lot"
      type="text"
      label="LOT SIZE"
      {...input}
      {...rest}
    />
  );
}

export default function SquareFeetField(props) {
  return (
    <Field
      name={FORM_FIELD_LOT_SIZE}
      component={SquareFeetInput}
      {...props}
    />
  );
}
