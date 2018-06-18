import { Shape, Types } from 'react-validators';

export const withNavbarItemPropTypes = {
  // unique string to identify navbar item
  id: Types.string.isRequired,
  active: Types.bool.isRequired,
  // component to render icon
  icon: Types.func.isRequired,
  label: Types.string.isRequired,
  url: Types.string.isRequired,
  as: Types.string,
};

export default Shape(withNavbarItemPropTypes);
