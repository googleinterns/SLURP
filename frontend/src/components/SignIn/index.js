import React from 'react';
import { Redirect } from 'react-router-dom';
import { AuthContext } from '../Auth';

import * as firebase from 'firebase/app';
import app from '../Firebase';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';

import { VIEW_TRIPS } from '../../constants/routes';

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
 * SignIn component that defines the sign-in page of the application. If the
 * the user is already logged in, they will immediately be redirected to the
 * VIEW_TRIPS page. Otherwise, they be given a number of providers through which
 * they can sign in.
 */
class SignIn extends React.Component {
  static contextType = AuthContext;

  /** @inheritdoc */
  render() {
    // Immediately go to VIEW_TRIPS page if the user is already logged in.
    if (this.context !== null) {
      return <Redirect to={VIEW_TRIPS} />;
    }

    return (
      <div>
        <h1>Please sign in:</h1>
          <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={app.auth()}/>
      </div>
    );
  }
}

export default SignIn;
