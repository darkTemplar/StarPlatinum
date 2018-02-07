import { reducer as formReducer, reduxForm } from 'redux-form';
import PropTypes from 'prop-types';
import React from 'react';

import { FORM_NAME } from '../constants/form';
import { withStyles } from '../../../shared/hocs/withStyles';
import BasicListingDetailsSection from './BasicListingDetailsSection';
import Spacing from '../../../shared/components/Spacing';
import UploadPhotosSection from './UploadPhotosSection';

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
        <Spacing bottom={4}>
          <BasicListingDetailsSection />
        </Spacing>
        <Spacing bottom={4}>
          <UploadPhotosSection />
        </Spacing>
      </form>
    );
  }
}

CreateListingForm.propTypes = propTypes;
CreateListingForm.contextTypes = contextTypes;

export default withStyles(() => ({
  item: {
  },
}), { pureComponent: true })(reduxForm({
  form: FORM_NAME,
})(CreateListingForm));
