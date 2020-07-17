import React from 'react';
import { useHistory } from 'react-router-dom';

import Button from 'react-bootstrap/Button';

import { LANDING } from '../../constants/routes.js';

/**
 * Component that redirects the user back to the landing page when they
 * encounter a 404 error.
 */
const LandingButton = () => {
  const history = useHistory();

  function goToLanding() {
    history.push(LANDING);
  }

  return (
    <Button type='button' onClick={goToLanding} variant='primary' size='lg'>
      Return to Home
    </Button>
  );
}

export default LandingButton;
