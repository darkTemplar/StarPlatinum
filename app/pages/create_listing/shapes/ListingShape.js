import { Types, Shape } from 'react-validators';

import { LISTING_STATUS } from '../../../shared/listing/status';

export default Shape({
  id: Types.number.isRequired,
  area: Types.number.isRequired,
  baths: Types.number.isRequired,
  beds: Types.number.isRequired,
  // datetime string
  final_expiry: Types.string.isRequired,
  initial_expiry: Types.string.isRequired,
  listing_price: Types.number.isRequired,
  sale_price: Types.number.isRequired,
  status: Types.oneOf(Object.values(LISTING_STATUS)).isRequired,
});
