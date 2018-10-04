import { Types, Shape } from 'react-validators';

export default Shape({
  city: Types.string,
  country: Types.string,
  id: Types.number.isRequired,
  place_id: Types.string.isRequired,
  postal_code: Types.string,
  route: Types.string,
  state: Types.string,
  street_number: Types.string,
  unit_number: Types.string,
  formatted_address: Types.string,
});
