import { reducer as formReducer, reduxForm, Field } from 'redux-form';
import PropTypes from 'prop-types';
import React from 'react';

import { FORM_NAME } from '../constants/form';

const propTypes = {
  // redux form provided onSubmit handler
  handleSubmit: PropTypes.func.isRequired,

  // required onSubmit function
  onSubmit: PropTypes.func.isRequired,
};

const contextTypes = {
  store: PropTypes.object,
};

export class CreateListingForm extends React.PureComponent {
  constructor(props, context) {
    super(props, context);
    this.context.store.injectAll({ form: formReducer });
  }

  render() {
    return (
      <form onSubmit={this.props.handleSubmit}>
        <div>
          <label htmlFor="firstName">First Name</label>
          <Field name="firstName" component="input" type="text" />
        </div>
      </form>
    );
  }
}

CreateListingForm.contextTypes = contextTypes;

export default reduxForm({
  form: FORM_NAME,
})(CreateListingForm);