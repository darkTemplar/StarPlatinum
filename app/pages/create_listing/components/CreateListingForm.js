import { reducer as formReducer, reduxForm } from 'redux-form';
import PropTypes from 'prop-types';
import React from 'react';

import { FORM_NAME } from '../constants/form';
import { withStyles } from '../../../shared/hocs/withStyles';
import BasicListingDetailsSection from './BasicListingDetailsSection';
import Button from '../../../shared/components/Button';
import OtherInformationSection from './OtherInformationSection';
import PreferencesSectionContainer from '../containers/PreferencesSectionContainer';
import Spacing from '../../../shared/components/Spacing';
import UploadDisclosuresSection from './UploadDisclosuresSection';
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

export class UnstyledListingForm extends React.PureComponent {
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
        <Spacing bottom={4}>
          <UploadDisclosuresSection />
        </Spacing>
        <Spacing bottom={4}>
          <OtherInformationSection />
        </Spacing>
        <Spacing bottom={4}>
          <PreferencesSectionContainer
            preferencesOptions={[
              { value: '', label: 'Select One' },
              { value: 0, label: 'foo' },
              { value: 1, label: 'foobar' },
              { value: 2, label: 'foobat' },
              { value: 3, label: 'barfoo' },
              { value: 4, label: 'foofoo' },
            ]}
          />
        </Spacing>
        <Button type="submit">
          Create
        </Button>
      </form>
    );
  }
}

UnstyledListingForm.propTypes = propTypes;
UnstyledListingForm.contextTypes = contextTypes;

export default withStyles(() => ({
  item: {
  },
}), { pureComponent: true })(reduxForm({
  form: FORM_NAME,
  reenableInitialize: true,
})(UnstyledListingForm));
