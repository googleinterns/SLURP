// Copyright 2019 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     https://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

/**
 * Handles the error returned by FirebaseUI when user login is unsuccessful.
 *
 * @param {firebaseui.auth.AuthUIError} error The error returned by FirebaseUI
 * when user login is unsuccessful. See FirebaseUI documentation for error
 * properties.
 */
function handleAuthError(error) {
  // TODO: Issue #27, display a generic error message instead of printing to
  // console.
  console.log(error);
}

const firebaseUiConfig = {
  signInSuccessUrl: 'view-trips.html',
  signInOptions: [
    // TODO: Issue #26, incorporate other providers besides Google.
    firebase.auth.GoogleAuthProvider.PROVIDER_ID
  ],
  callbacks: {
    // Called on unsuccessful sign-in.
    signInFailure: function(error) {
      return handleAuthError(error);
    }
  }
};

const firebaseAuthUi = new firebaseui.auth.AuthUI(firebase.auth());
firebaseAuthUi.start('#firebaseui-login', firebaseUiConfig);
