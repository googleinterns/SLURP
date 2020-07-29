import React from 'react';
import { useHistory } from 'react-router-dom';

import Button from 'react-bootstrap/Button';

import authUtils from '../AuthUtils';
import { LANDING } from '../../constants/routes.js';
import '../../styles/header.css';

// To set spacing between each element of the component.
const BOOTSTRAP_SPACING_CLASS =
    'm-3 row justify-content-center align-self-center';

/**
 * Renders the user's profile picture (as provided by the service they used to
 * log in), the user's display name, and a Sign Out button. This component is to
 * be used with the Header component.
 */
const UserInfo = () => {
  const history = useHistory();

  /**
   * Redirects the user to the LANDING page first before actually signing them
   * out.
   */
  function signOutAndRedirectToLanding() {
    history.push(LANDING);
    authUtils.signOut();
  }

  return (
    <div className='d-flex flex-row'>
      <img
          className={BOOTSTRAP_SPACING_CLASS}
          src={authUtils.getCurUserPhotoUrl()}
          alt='Your Profile'
      />
      <p className={BOOTSTRAP_SPACING_CLASS}>
        {authUtils.getCurUserDisplayName()}
      </p>
      <Button
          className={BOOTSTRAP_SPACING_CLASS}
          variant='secondary'
          onClick={signOutAndRedirectToLanding}
      >
        Sign Out
      </Button>
    </div>
  );
}

export default UserInfo;
