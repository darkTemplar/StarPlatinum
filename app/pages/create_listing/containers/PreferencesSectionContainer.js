import { connect } from 'react-redux';

import {
  FORM_FIELD_PREFERENCES_1,
  FORM_FIELD_PREFERENCES_2,
  FORM_FIELD_PREFERENCES_3,
} from '../constants/form';
import PreferencesSection from '../components/PreferencesSection';
import getAgentPreferences from '../selectors/getAgentPreferences';
import getFormValueSelector from '../selectors/getFormValueSelector';

export default connect(state => ({
  preferencesOptions: getAgentPreferences(state),
  preferencesValues: getFormValueSelector()(
    state,
    FORM_FIELD_PREFERENCES_1,
    FORM_FIELD_PREFERENCES_2,
    FORM_FIELD_PREFERENCES_3,
  ),
}))(PreferencesSection);
