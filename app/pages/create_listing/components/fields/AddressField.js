import { Field, change } from 'redux-form';
import { connect } from 'react-redux';
import React from 'react';

import { FORM_FIELD_GEO, FORM_FIELD_GEO_INPUT, FORM_NAME } from '../../constants/form';
import { css, withStyles } from '../../../../shared/hocs/withStyles';
import GeocompleteContainer from
  '../../../../shared/components/Geocomplete/containers/GeocompleteContainer';
import Spacing from '../../../../shared/components/Spacing';
import googleImageSrc from '../../../../shared/images/google_search_image.png';

function AddressInput(props) {
  const { input, meta, change, styles, ...rest } = props;
  const { invalid, touched } = meta;

  return (
    <GeocompleteContainer
      {...input}
      {...rest}
      invalid={touched && invalid}
      onSelectSuggestion={value => {
        change(FORM_NAME, FORM_FIELD_GEO, value);
      }}
      onChange={input.onChange}
      suffix={(
        <Spacing inline right={2}>
          <img src={googleImageSrc} height={24} {...css(styles.imageAdjust)} />
        </Spacing>
      )}
    />
  );
}

const StyledAddressInput = withStyles(({ unit }) => ({
  imageAdjust: {
    position: 'relative',
    top: unit,
  },
}))(AddressInput);

const ConnectedAddressInput = connect(undefined, { change })(StyledAddressInput);

export default function AddressField(props) {
  return (
    <Field
      name={FORM_FIELD_GEO_INPUT}
      id="create-listing-address"
      label="PROPERTY ADDRESS"
      component={ConnectedAddressInput}
      validate={(value, allValues) => {
        if (!value || !allValues[FORM_FIELD_GEO]) {
          return 'Address Required';
        }

        return undefined;
      }}
      {...props}
    />
  );
}
