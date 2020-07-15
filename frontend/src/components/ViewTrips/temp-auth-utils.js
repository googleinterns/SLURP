/**
 * Temporary hardcoded function that returns the current users email.
 *
 * TODO(Issue 55): Remove this function and replace any calls to it with Auth
 *                 component function.
 *
 * @return Hardcoded user email string.
 */
function getCurUserEmail() {
  return 'matt.murdock';
}

/**
 * Temporary hardcoded function that returns the user's uid given the user's
 * email.
 *
 * TODO(Issue 55): Remove this function and replace any calls to it with Auth
 *                 component function.
 *
 * @param {string} userEmail A users email.
 * @return {string} The 'fake' uid associated with the user email that is
 *     created with the form '_`userEmail`_'.
 */
function getUidFromUserEmail(userEmail) {
  return '_' + userEmail + '_';
}

/**
 * Temporary hardcoded function that returns the a user's email given the
 * fake uid that was stored in the Trip document.
 *
 * TODO(Issue 55): Remove this function and replace any calls to it with Auth
 *                 component function.
 *
 * @param {string} uid Fake string uid that is in the form '_userEmail_'.
 * @return {string} The email corresponding to the fake uid.
 */
function _getUserEmailFromUid(uid) {
  return uid.substring(1, uid.length - 1);
}
