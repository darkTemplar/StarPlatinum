import React from 'react';

import {
  css,
  withStyles,
  withStylesPropTypes,
} from '../../../shared/hocs/withStyles';
import BathroomsField from './fields/BathroomsField';
import BedroomsField from './fields/BedroomsField';
import SquareFeetField from './fields/SquareFeetField';
import Title from '../../../shared/components/Title';
import Spacing from '../../../shared/components/Spacing';

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
      <div {...css(styles.item)}>
        <BedroomsField borderlessRight />
      </div>
      <div {...css(styles.item)}>
        <BathroomsField borderlessRight />
      </div>
      <div {...css(styles.item)}>
        <SquareFeetField borderlessRight />
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
