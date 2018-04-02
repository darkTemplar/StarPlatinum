import { Field } from 'redux-form';
import React from 'react';

import Input from '../../../../shared/components/Input';
import _formatCurrency from '../../../../shared/utils/formatters/formatCurrency';
import parseIntFromCurrency from '../../../../shared/utils/parsers/parseIntFromCurrency';

export function CurrencyInput({ input, meta, ...rest }) {
  return (
    <Input
      {...input}
      {...rest}
    />
  );
}

function formatCurrency(value) {
  if (!value) {
    return '';
  }

  return _formatCurrency(value, {
    maximumFractionDigits: 0,
    minimumFractionDigits: 0,
    maximumSignificantDigits: 21,
  });
}

export default function CurrencyField(props) {
  return (
    <Field
      component={CurrencyInput}
      parse={parseIntFromCurrency}
      format={formatCurrency}
      {...props}
    />
  );
}
