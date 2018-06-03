import { forbidExtraProps } from 'airbnb-prop-types';
import PropTypes from 'prop-types';
import React from 'react';

import Button from '../Button';
import Input from '../Input';
import Modal from '../Modal';
import Spacing from '../Spacing';
import UserShape from '../../shapes/UserShape';

export const MODES = {
  SIGNUP: 'signup',
  LOGIN: 'login',
};

const propTypes = forbidExtraProps({
  mode: PropTypes.oneOf(Object.values(MODES)),
  currentUser: UserShape,
  hideSignupLogin: PropTypes.func.isRequired,
  isVisible: PropTypes.bool,
  isLoading: PropTypes.bool,
  signup: PropTypes.func.isRequired,
});

const defaultProps = {
  mode: MODES.SIGNUP,
  currentUser: null,
  isVisible: false,
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

  onSubmit() {
    this.props.signup(this.state);
  }

  onChangeEmail(value) {
    this.setState({ email: value });
  }

  onChangePassword(value) {
    this.setState({ password: value });
  }

  render() {
    const { currentUser, isVisible, hideSignupLogin, isLoading } = this.props;

    if (currentUser) {
      return null;
    }

    return (
      <Modal
        isOpen={isVisible}
        onClose={hideSignupLogin}
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
              disabled={isLoading}
              loading={isLoading}
            >
              Sign up
            </Button>
          </Spacing>
        </form>
      </Modal>
    );
  }
}

SignupLogin.propTypes = propTypes;
SignupLogin.defaultProps = defaultProps;
