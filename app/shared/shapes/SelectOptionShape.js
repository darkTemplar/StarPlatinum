import { Shape, Types } from 'react-validators';

export default Shape({
  value: Types.oneOfType([Types.string, Types.number]).isRequired,
  label: Types.oneOfType([Types.string, Types.number]).isRequired,
});
