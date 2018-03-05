import { Shape, Types } from 'react-validators';

export const withNavbarItemPropTypes = {
  // unique string to identify navbar item
  id: Types.string.isRequired,
  active: Types.bool.isRequired,
  icon: Types.node.isRequired,
  label: Types.string.isRequired,
  url: Types.string.isRequired,
};

export default Shape(withNavbarItemPropTypes);
