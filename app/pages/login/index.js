import React from 'react';

import LoginApp from './app';

export default function Login(props) {
  return (
    <LoginApp {...props} />
  );
}

Login.getInitialProps = () => {
  return {};
};
