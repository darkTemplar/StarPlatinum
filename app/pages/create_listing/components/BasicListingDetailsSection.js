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
              label="BATHROOMS"
              name={FORM_FIELD_BEDROOMS}
              parse={number}
              options={[]}
              borderlessRight
            />
          </div>
          <div {...css(styles.item)}>
            <SelectField
              id="create-listing-bathrooms"
              label="BATHROOMS"
              name={FORM_FIELD_BATHROOMS}
              parse={number}
              options={[]}
              borderlessRight
            />
          </div>
          <div {...css(styles.item)}>
            <InputField
              id="create-listing-sqft"
              type="text"
              label="SQFT"
              name={FORM_FIELD_SQFT}
            />
          </div>
          <div {...css(styles.item)}>
            <InputField
              id="create-listing-lot"
              type="text"
              label="LOT SIZE"
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
