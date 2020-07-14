import React from 'react';
import authUtils from '../AuthUtils';

import Button from 'react-bootstrap/Button';

// To set spacing between each element of the component.
const BOOTSTRAP_SPACING_CLASS = 'm-3 row justify-content-center align-self-center';
// Size in pixels.
const USER_PROFILE_SIDE_LENGTH = 50;

/**
 * Renders the user's profile picture (as provided by the service they used to
 * log in), the user's display name, and a Sign Out button. This component is to
 * be used with the Header component.
 */
class UserInfo extends React.Component {
  render() {
    return (
      <div className='d-flex flex-row'>
        <img className={BOOTSTRAP_SPACING_CLASS}
            src={authUtils.getUserPhotoUrl()}
            height={USER_PROFILE_SIDE_LENGTH}
            width={USER_PROFILE_SIDE_LENGTH}
            alt='Your Profile'
        />
        <p className={BOOTSTRAP_SPACING_CLASS}>
          {authUtils.getUserDisplayName()}
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
