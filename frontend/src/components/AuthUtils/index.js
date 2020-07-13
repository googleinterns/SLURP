/**
 * TODO: Write description! Talk about how these functions must only be called
 * from inside a private route component.
 */

import { AuthUtilsConsumer, getCurrentUser } from './AuthUtilsConsumer.js';
import { SIGN_IN } from '../../constants/routes.js';

/**
 * TODO: document!
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
