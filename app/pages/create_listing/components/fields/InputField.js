import { Field } from 'redux-form';
import PropTypes from 'prop-types';
import React from 'react';

import Input from '../../../../shared/components/Input';

function InputFieldComponent(field) {
  const { input, meta, ...rest } = field;
  const { invalid, touched } = meta;

  return (
    <Input
      {...input}
      {...rest}
      invalid={touched && invalid}
    />
  );
}

const propTypes = {
  required: PropTypes.bool,
  errorMessage: PropTypes.string,
};

const defaultProps = {
  required: false,
  errorMessage: '',
};

export default class InputField extends React.PureComponent {
  constructor(props) {
    super(props);
    this.validate = this.validate.bind(this);
  }

  validate(value) {
    const { errorMessage } = this.props;

    if (value) {
      return '';
    }

    return errorMessage;
  }

  render() {
    const { required, errorMessage, ...rest } = this.props;

    return (
      <Field
        component={InputFieldComponent}
        validate={required ? this.validate : undefined}
        {...rest}
      /> 
    );
  }
}

InputField.propTypes = propTypes;
InputField.defaultProps = defaultProps;
