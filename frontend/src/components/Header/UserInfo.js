import React from 'react';
import authUtils from '../AuthUtils';

import '../../styles/header.css';
import Button from 'react-bootstrap/Button';

// To set spacing between each element of the component.
const BOOTSTRAP_SPACING_CLASS =
    'm-3 row justify-content-center align-self-center';

/**
 * Renders the user's profile picture (as provided by the service they used to
 * log in), the user's display name, and a Sign Out button. This component is to
 * be used with the Header component.
 */
class UserInfo extends React.Component {
  /** @inheritdoc */
  render() {
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
            onClick={authUtils.signOut}
        >
          Sign Out
        </Button>
      </div>
    );
  }
}

export default UserInfo;
