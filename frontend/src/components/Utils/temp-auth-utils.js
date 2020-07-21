/**
 * @fileoverview This is a temporary file that is used to implement 'fake'
 * versions of the Auth utility functions used in the ViewTrips components.
 *
 * TODO(Issue #55): Remove this whole file function and replace any imports to
 *                 this file with Auth utils.
 */


/**
 * Temporary hardcoded function that returns the current users email.
 *
 * @return {!string} Hardcoded user email string.
 */
export function getCurUserEmail() {
  return 'matt.murdock';
}

/**
 * Temporary hardcoded function that returns the current users uid.
 *
 * @return {!string} Hardcoded user uid string.
 */
export function getCurUserUid() {
  return getUserUidFromUserEmail(getCurUserEmail());
}

/**
 * Temporary hardcoded function that returns the user's uid given the user's
 * email.
 *
 * @param {!string} userEmail A users email.
 * @return {!string} The 'fake' uid associated with the user email that is
 *     created with the form '_`userEmail`_'.
 */
export function getUserUidFromUserEmail(userEmail) {
  return '_' + userEmail + '_';
}

/**
 * Temporary hardcoded function that returns the a user's email given the
 * fake uid that was stored in the Trip document.
 *
 * @param {!string} uid Fake string uid that is in the form '_userEmail_'.
 * @return {!string} The email corresponding to the fake uid.
 */
export function getUserEmailFromUid(uid) {
  return uid.substring(1, uid.length - 1);
}

const authUtils = {
  getCurUserEmail,
  getCurUserUid,
  getUserUidFromUserEmail,
  getUserEmailFromUid
}

export default authUtils;
