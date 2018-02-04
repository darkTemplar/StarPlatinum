import { Shape, Types } from 'react-validators';

export const withReduxFormFieldProps = {
  // props to pass onto input element
  input: Types.object.isRequired,

  // meta info about the field
  meta: Types.object.isRequired,
};

export default Shape(withReduxFormFieldProps);
