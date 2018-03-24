import { Field } from 'redux-form';
import React from 'react';

import Datetime from '../../../../shared/components/Datetime';

export function DatetimeInput(props) {
  const { input, meta, ...rest } = props;

  return (
    <Datetime
      {...input}
      {...rest}
    />
  );
}

export default function DatetimeField(props) {
  return (
    <Field
      component={DatetimeInput}
      {...props}
    />
  );
}
