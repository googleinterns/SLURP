/**
 * Utility functions to get various parameters corresponding to the currently
 * authenticated user. These functions should ONLY be called from private pages,
 * i.e. the user must be authenticated to ensure the parameters can be
 * retrieved.
 */

import app from '../Firebase';
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

/**
 * Checks that the user is logged in by seeing if the current user is set to
 * null (which is what Firebase Auth returns if the user is not logged in). If
 * not, they are redirected to the SIGN_IN page.
 *
 * @returns {Boolean} True if the user is signed in, false otherwise.
 */
function isUserLoggedIn() {
  if (getCurrentUser() === null) {
    redirectToSignIn();
    return false;
  }
  return true;
}

/**
 * @returns {String} The user's display name.
 */
export function getCurUserDisplayName() {
  if (!isUserLoggedIn()) { return null; }
  return getCurrentUser().displayName;
}

/**
 * @returns {String} The user's email.
 */
export function getCurUserEmail() {
  if (!isUserLoggedIn()) { return null; }
  return getCurrentUser().email;
}

/**
 * @returns {String} The user's profile picture URL.
 */
export function getCurUserPhotoUrl() {
  if (!isUserLoggedIn()) { return null; }
  return getCurrentUser().photoURL;
}

/**
 * @returns {String} The user's unique ID.
 */
export function getCurUserUid() {
  if (!isUserLoggedIn()) { return null; }
  return getCurrentUser().uid;
}

export function signOut() {
  app.auth().signOut();
}

// Can also access the auth functions in the named authUtils variable.
const authUtils = {
  getCurUserDisplayName,
  getCurUserEmail,
  getCurUserPhotoUrl,
  getCurUserUid
};
export default authUtils;

// The AuthUtilsConsumer component must be imported into the App component to
// allow these functions to be used.
export { AuthUtilsConsumer };
