import { Field } from 'redux-form';
import PropTypes from 'prop-types';
import React from 'react';

import { FORM_FIELD_SHARE_DISCLOSURES } from '../../constants/form';
import Checkbox from '../../../../shared/components/Checkbox';

const propTypes = {
  // redux form provided input props
  input: PropTypes.object,
};

export function ShareDisclosureActivityCheckbox(props) {
  const { input } = props;

  return (
    <Checkbox
      {...input}
      id="share-disclosure"
      label="Share disclosure download activity with buyer agents"
      checked={input.value}
    />
  );
}

ShareDisclosureActivityCheckbox.propTypes = propTypes;

export default function ShareDisclosureActivityField() {
  return (
    <Field
      name={FORM_FIELD_SHARE_DISCLOSURES}
      component={ShareDisclosureActivityCheckbox}
    />
  );
}
