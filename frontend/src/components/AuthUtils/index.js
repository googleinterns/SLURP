/**
 * TODO: Write description! Talk about how these functions must only be called
 * from inside a private route component.
 */

import React, { useContext } from 'react';
import { AuthContext } from '../Auth';
import { SIGN_IN } from '../../constants/routes.js';

let currentUser;

/**
 * TODO: document!
 */
export const AuthUtilsConsumer = (props) => {
  currentUser = useContext(AuthContext);
  return (
    <div>{props.children}</div>
  );
}

/**
 * TODO: document!
 */
function redirectToSignIn() {
  window.location.href = SIGN_IN;
}

export function getUserDisplayName() {
  if (!currentUser) {
    redirectToSignIn();
    return null;
  }
  return currentUser.displayName;
}

export function getUserEmail() {
  if (!currentUser) {
    redirectToSignIn();
    return null;
  }
  return currentUser.displayName;
}

export function getUserPhotoUrl() {
  if (!currentUser) {
    redirectToSignIn();
    return null;
  }
  return currentUser.displayName;
}

export function getUserUid() {
  if (!currentUser) {
    redirectToSignIn();
    return null;
  }
  return currentUser.displayName;
}

// Can also access the auth functions in the named authUtils variable.
const authUtils = {
  getUserDisplayName,
  getUserEmail,
  getUserPhotoUrl,
  getUserUid
};
export default authUtils;
