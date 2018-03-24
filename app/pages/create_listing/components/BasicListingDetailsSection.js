import React from 'react';

import {
  css,
  withStyles,
  withStylesPropTypes,
} from '../../../shared/hocs/withStyles';
import AddressField from './fields/AddressField';
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
        <AddressField borderlessBottom />
        <div {...css(styles.bfc)}>
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
