import { Field } from 'redux-form';
import React from 'react';

import Input from '../../../../shared/components/Input';

function InputFieldComponent(field) {
  const { input, meta, ...rest } = field;

  return (
    <Input
      {...input}
      {...rest}
    />
  );
}

export default function InputField(props) {
  return (
    <Field
      component={InputFieldComponent}
      {...props}
    />
  );
}
