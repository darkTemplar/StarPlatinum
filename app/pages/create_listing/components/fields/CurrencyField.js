import { Field } from 'redux-form';
import React from 'react';

import PriceInput from '../../../../shared/components/PriceInput';

export function CurrencyInput({ input, meta, ...rest }) {
  return (
    <PriceInput
      {...input}
      {...rest}
    />
  );
}

export default function CurrencyField(props) {
  return (
    <Field
      component={CurrencyInput}
      {...props}
    />
  );
}
