import React from 'react';
import * as firebase from 'firebase/app';
import app from '../Firebase';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';

import {VIEW_TRIPS} from '../../constants/routes.js';

// Configure FirebaseUI.
const uiConfig = {
  signInFlow: 'popup',
  signInSuccessUrl: VIEW_TRIPS,
  signInOptions: [
    // TODO (Issue #26): Incorporate other providers besides Google.
    firebase.auth.GoogleAuthProvider.PROVIDER_ID
  ],
  callbacks: {
    // Called on unsuccesful sign-in.
    signInFailure: (error) => handleAuthError(error)
  }
};

/**
 * Handles the error returned by FirebaseUI when user login is unsuccessful.
 *
 * @param {firebaseui.auth.AuthUIError} error The error returned by FirebaseUI
 * when user login is unsuccessful. See FirebaseUI documentation for error
 * properties.
 */
function handleAuthError(error) {
  // TODO (Issue #27): Display a generic error message instead of printing to
  // console.
  console.log(error);
}

/**
 * SignIn component that defines the sign-in page of the application.
 */
class SignIn extends React.Component {
  /** @inheritdoc */
  render() {
    return (
      <div>
        <h1>Please sign in:</h1>
          <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={app.auth()}/>
      </div>
    );
  }
}

export default SignIn;
