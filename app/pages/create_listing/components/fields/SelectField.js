import { Field } from 'redux-form';
import React from 'react';

import Select from '../../../../shared/components/Select';

function SelectFieldComponent(field) {
  const { input, meta, ...rest } = field;

  return (
    <Select
      {...input}
      {...rest}
    />
  );
}

export default function SelectField(props) {
  return (
    <Field
      component={SelectFieldComponent}
      {...props}
    />
  );
}
