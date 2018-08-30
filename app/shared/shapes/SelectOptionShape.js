import { Shape, Types } from 'react-validators';

export default Shape({
  // can be null
  value: Types.oneOfType([Types.string, Types.number]),
  label: Types.oneOfType([Types.string, Types.number]).isRequired,
});
