import React from 'react';
import { useHistory } from 'react-router-dom';

import Button from 'react-bootstrap/Button';

import { SIGN_IN } from '../../constants/routes.js';

/**
 * SignInButton component used for the Landing page to redirect to the SignIn
 * page.
 */
const SignInButton = () => {
  const history = useHistory();

  function goToSignIn() {
    history.push(SIGN_IN);
  }

  return (
    <Button type='button' onClick={goToSignIn} variant='primary' size='lg'>
      Sign In
    </Button>
  );
}

export default SignInButton;
