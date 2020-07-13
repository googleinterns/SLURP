/**
 * Utility functions to get various parameters corresponding to the currently
 * authenticated user. These functions should ONLY be called from private pages,
 * i.e. the user must be authenticated to ensure the parameters can be
 * retrieved.
 */

import { AuthUtilsConsumer, getCurrentUser } from './AuthUtilsConsumer.js';
import { SIGN_IN } from '../../constants/routes.js';

/**
 * Called when one of the authentication utility functions are used when the
 * user has not logged in yet. Since the utility functions require that they be
 * called from private pages, this function being called implies that the user
 * managed to access a private page without being authenticated first. So they
 * are immiedately redirected to the SIGN_IN page.
 */
function redirectToSignIn() {
  window.location.href = SIGN_IN;
}

export function getUserDisplayName() {
  if (!getCurrentUser()) {
    redirectToSignIn();
    return null;
  }
  return getCurrentUser().displayName;
}

export function getUserEmail() {
  if (!getCurrentUser()) {
    redirectToSignIn();
    return null;
  }
  return getCurrentUser().email;
}

export function getUserPhotoUrl() {
  if (!getCurrentUser()) {
    redirectToSignIn();
    return null;
  }
  return getCurrentUser().photoURL;
}

export function getUserUid() {
  if (!getCurrentUser()) {
    redirectToSignIn();
    return null;
  }
  return getCurrentUser().uid;
}

// Can also access the auth functions in the named authUtils variable.
const authUtils = {
  getUserDisplayName,
  getUserEmail,
  getUserPhotoUrl,
  getUserUid
};
export default authUtils;

// The AuthUtilsConsumer component must be imported into the App component to
// allow these functions to be used.
export { AuthUtilsConsumer };
