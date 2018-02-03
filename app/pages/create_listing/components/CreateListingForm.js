import { reducer as formReducer, reduxForm, Field } from 'redux-form';
import PropTypes from 'prop-types';
import React from 'react';

import { FORM_NAME, FORM_FIELD_SQFT } from '../constants/form';
import Input from '../../../shared/components/Input';
import Select from '../../../shared/components/Select';
import SquareFeetField from './fields/SquareFeetField';

const propTypes = {
  // redux form provided onSubmit handler
  handleSubmit: PropTypes.func.isRequired,

  // required onSubmit function
  onSubmit: PropTypes.func.isRequired,
};

const contextTypes = {
  store: PropTypes.object,
};

function select(field) {
  return <Select
              name="bathrooms"
              id="create-listing-bathrooms"
              label="BATHROOMS"
              options={[{
                value: 1,
                label: 1,
              }, {
                value: 2,
                label: 2,
              }]}
              {...field.input}
            />;
}

export class CreateListingForm extends React.PureComponent {
  constructor(props, context) {
    super(props, context);
    this.context.store.injectAll({ form: formReducer });
  }

  render() {
    return (
      <form onSubmit={this.props.handleSubmit}>
        <Field
          name={FORM_FIELD_SQFT}
          component={SquareFeetField}
        />
        <Field
          name="bathrooms"
          component={select}
        />
      </form>
    );
  }
}

CreateListingForm.contextTypes = contextTypes;

export default reduxForm({
  form: FORM_NAME,
})(CreateListingForm);