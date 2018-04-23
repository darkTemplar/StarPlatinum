import { formValueSelector } from 'redux-form';

import { FORM_NAME } from '../constants/form';

let selector = null;

export default function getFormValueSelector() {
  if (!selector) {
    selector = formValueSelector(FORM_NAME);
  }

  return selector;
}
