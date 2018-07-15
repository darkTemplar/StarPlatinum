import React from 'react';

import {
  FORM_FIELD_BATHROOMS,
  FORM_FIELD_BEDROOMS,
  FORM_FIELD_LOT_SIZE,
  FORM_FIELD_SQFT,
} from '../constants/form';
import {
  css,
  withStyles,
  withStylesPropTypes,
} from '../../../shared/hocs/withStyles';
import AddressField from './fields/AddressField';
import Card from '../../../shared/components/Card';
import InputField from './fields/InputField';
import SelectField from './fields/SelectField';
import Spacing from '../../../shared/components/Spacing';
import Title from '../../../shared/components/Title';
import number from '../../../shared/form/parsers/number';

const propTypes = {
  ...withStylesPropTypes,
};

const MAX_BEDS = 15;
const MAX_BATHS = 15;

const bedsOptions = Array.apply(null, new Array(MAX_BEDS)).map((_, i) => ({
  label: `${i + 1}`,
  value: i + 1,
}));
const bathsOptions = Array.apply(null, new Array(MAX_BATHS)).map((_, i) => ({
  label: `${i + 1}`,
  value: i + 1,
}));

function BasicListingDetailsSection({
  styles,
}) {
  return (
    <div>
      <Spacing bottom={1}>
        <Title level={3}>
          Basic Listing Details
        </Title>
      </Spacing>
      <Card>
        <AddressField borderlessBottom />
        <div {...css(styles.bfc)}>
          <div {...css(styles.item)}>
            <SelectField
              id="create-listing-bathrooms"
              label="BEDROOMS"
              name={FORM_FIELD_BEDROOMS}
              parse={number}
              options={bedsOptions}
              borderlessRight
            />
          </div>
          <div {...css(styles.item)}>
            <SelectField
              id="create-listing-bathrooms"
              label="BATHROOMS"
              name={FORM_FIELD_BATHROOMS}
              parse={number}
              options={bathsOptions}
              borderlessRight
            />
          </div>
          <div {...css(styles.item)}>
            <InputField
              required
              errorMessage="Required"
              id="create-listing-sqft"
              type="number"
              label="SQFT"
              parse={number}
              name={FORM_FIELD_SQFT}
              borderlessRight
            />
          </div>
          <div {...css(styles.item)}>
            <InputField
              required
              errorMessage="Required"
              id="create-listing-lot"
              type="number"
              label="LOT SIZE"
              parse={number}
              name={FORM_FIELD_LOT_SIZE}
            />
          </div>
        </div>
        <span {...css(styles.clearfix)} />
      </Card>
    </div>
  );
}

BasicListingDetailsSection.propTypes = propTypes;

export default withStyles(({ responsive }) => ({
  item: {
    float: 'left',
    width: '100%',

    [responsive.mediumAndAbove]: {
      width: '25%',
    },
  },

  clearfix: {
    content: '',
    display: 'block',
    clear: 'both',
  },

  bfc: {
    overflow: 'hidden',
  },
}), { pureComponent: true })(BasicListingDetailsSection);
