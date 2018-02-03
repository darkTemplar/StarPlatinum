import { reducer as formReducer, reduxForm, Field } from 'redux-form';
import PropTypes from 'prop-types';
import React from 'react';

import { FORM_NAME, FORM_FIELD_SQFT } from '../constants/form';
import { css, withStyles } from '../../../shared/hocs/withStyles';
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
              borderlessLeft
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
        <div {...css(this.props.styles.item)}>
          <Field
            name={FORM_FIELD_SQFT}
            component={SquareFeetField}
          />
        </div>
        <div {...css(this.props.styles.item)}>
          <Field
            name="bathrooms"
            component={select}
          />
        </div>
      </form>
    );
  }
}

CreateListingForm.contextTypes = contextTypes;

export default withStyles(() => ({
  item: {
    float: 'left',
    width: '25%',
  },
}), { pureComponent: true })(
  reduxForm({
    form: FORM_NAME,
  })(CreateListingForm)
);