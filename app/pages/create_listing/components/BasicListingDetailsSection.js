import React from 'react';

import {
  css,
  withStyles,
  withStylesPropTypes,
} from '../../../shared/hocs/withStyles';
import BathroomsField from './fields/BathroomsField';
import BedroomsField from './fields/BedroomsField';
import Card from '../../../shared/components/Card';
import LotSizeField from './fields/LotSizeField';
import Spacing from '../../../shared/components/Spacing';
import SquareFeetField from './fields/SquareFeetField';
import Title from '../../../shared/components/Title';

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
        <div {...css(styles.item)}>
          <BedroomsField borderlessRight />
        </div>
        <div {...css(styles.item)}>
          <BathroomsField borderlessRight />
        </div>
        <div {...css(styles.item)}>
          <SquareFeetField borderlessRight />
        </div>
        <div {...css(styles.item)}>
          <LotSizeField />
        </div>
        <span {...css(styles.clearfix)} />
      </Card>
    </div>
  );
}

BasicListingDetailsSection.propTypes = propTypes;

export default withStyles(() => ({
  item: {
    float: 'left',
    width: '25%',
  },

  clearfix: {
    content: '',
    display: 'block',
    clear: 'both',
  },
}), { pureComponent: true })(BasicListingDetailsSection);
