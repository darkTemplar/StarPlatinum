import { Field } from 'redux-form';
import React from 'react';

import { FORM_FIELD_SQFT } from '../../constants/form';
import {
  css,
  withStyles,
  withStylesPropTypes,
} from '../../../../shared/hocs/withStyles';
import Title from '../../../../shared/components/Title';
import Select from '../../../../shared/components/Select';
import SquareFeetField from './SquareFeetField';

const propTypes = {
  ...withStylesPropTypes,
};

function select(field) {
  return <Select
              name="bathrooms"
              id="create-listing-bathrooms"
              label="BATHROOMS"
              borderlessLeft
              options={[{
                value: 1,
                label: 1,
              }, {
                value: 2,
                label: 2,
              }]}
              {...field.input}
            />;
}

function BasicListingDetailsSection({
  styles,
}) {
  return (
    <div>
      <Title level={3}>
        Basic Listing Details
      </Title>
      <div {...css(styles.item)}>
        <Field
          name={FORM_FIELD_SQFT}
          component={SquareFeetField}
        />
      </div>
      <div {...css(styles.item)}>
        <Field
          name="bathrooms"
          component={select}
        />
      </div>
    </div>
  );
}

BasicListingDetailsSection.propTypes = propTypes;

export default withStyles(() => ({
  item: {
    float: 'left',
    width: '25%',
  },
}), { pureComponent: true })(BasicListingDetailsSection);
