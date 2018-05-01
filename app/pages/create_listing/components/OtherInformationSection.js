import React from 'react';

import DatetimeField from './fields/DatetimeField';
import CurrencyField from './fields/CurrencyField';
import Spacing from '../../../shared/components/Spacing';
import Title from '../../../shared/components/Title';
import {
  FORM_FIELD_OFFER_DEADLINE,
  FORM_FIELD_TARGET_SALE_PRICE,
  FORM_FIELD_LIST_PRICE,
} from '../constants/form';

export default function OtherInformationSection() {
  return (
    <div>
      <Spacing bottom={1}>
        <Title level={3}>
          Other Information
        </Title>
      </Spacing>
      <DatetimeField
        label="OFFER DEADLINE"
        name={FORM_FIELD_OFFER_DEADLINE}
        id="create-listing-datetime"
        borderlessBottom
      />
      <CurrencyField
        label="LIST PRICE"
        type="text"
        name={FORM_FIELD_LIST_PRICE}
        id="create-listing-list-price"
        borderlessBottom
      />
      <CurrencyField
        type="text"
        label="TARGET SALES PRICE"
        name={FORM_FIELD_TARGET_SALE_PRICE}
        id="create-listing-sale-price"
        borderlessBottom
      />
    </div>
  );
}
