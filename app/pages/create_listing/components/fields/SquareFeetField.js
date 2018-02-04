import React from 'react';

import Input from '../../../../shared/components/Input';
import { FORM_FIELD_SQFT } from '../../constants/form';
import ReduxFormFieldShape from '../../shapes/ReduxFormFieldShape';

const propTypes = {
 
};

export default function SquareFeetField(field) {
  return (
    <div>
      <Input
        id="create-listing-bedrooms"
        type="text"
        name={FORM_FIELD_SQFT}
        label="SQFT"
        {...field.input}
      />
    </div>
  );
}

SquareFeetField.propTypes = propTypes;