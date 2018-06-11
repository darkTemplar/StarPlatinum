import { forbidExtraProps } from 'airbnb-prop-types';
import PropTypes from 'prop-types';
import React from 'react';

import { MODES } from './constants';
import Button from '../Button';
import Input from '../Input';
import Modal from '../Modal';
import SignupLoginFooterContainer from './SignupLoginFooterContainer';
import Spacing from '../Spacing';
import Text from '../Text';
import UserShape from '../../shapes/UserShape';

const propTypes = forbidExtraProps({
  mode: PropTypes.oneOf(Object.values(MODES)).isRequired,
  currentUser: UserShape,
  hideSignupLogin: PropTypes.func.isRequired,
  error: PropTypes.string,
  isVisible: PropTypes.bool,
  isLoading: PropTypes.bool,
  signup: PropTypes.func.isRequired,
  login: PropTypes.func.isRequired,
});

const defaultProps = {
  error: '',
  currentUser: null,
  isVisible: false,
  isLoading: false,
};

export default class SignupLogin extends React.PureComponent {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.state = {
      email: '',
      password: '',
    };
  }

  componentWillReceiveProps({ isLoading, error }) {
    if (this.props.isLoading && !isLoading && !error) {
      this.props.hideSignupLogin();
    }
  }

  onSubmit() {
    const { mode, signup, login } = this.props;

    if (mode === MODES.SIGNUP) {
      signup(this.state);
    } else {
      login(this.state);
    }
  }

  onChangeEmail(value) {
    this.setState({ email: value });
  }

  onChangePassword(value) {
    this.setState({ password: value });
  }

  render() {
    const { mode, currentUser, isVisible, hideSignupLogin, isLoading } = this.props;

    if (currentUser) {
      return null;
    }

    const ctaLabel = mode === MODES.SIGNUP ? 'Sign up' : 'Log in';

    return (
      <Modal
        isOpen={isVisible}
        onClose={hideSignupLogin}
        footer={<SignupLoginFooterContainer />}
      >
        <form action="javascript:void(0);" onSubmit={this.onSubmit}>
          <Input
            type="email"
            name="signup-email"
            label="E-MAIL"
            onChange={this.onChangeEmail}
            borderlessBottom
          />
          <Input
            type="password"
            name="signup-password"
            label="PASSWORD"
            onChange={this.onChangePassword}
          />
          <Spacing top={2}>
            <Button
              type="submit"
              size="lg"
              disabled={isLoading}
              loading={isLoading}
              block
            >
              <Text inverse>{ctaLabel}</Text>
            </Button>
          </Spacing>
        </form>
      </Modal>
    );
  }
}

SignupLogin.propTypes = propTypes;
SignupLogin.defaultProps = defaultProps;
