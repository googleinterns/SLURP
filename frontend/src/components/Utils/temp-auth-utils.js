/**
 * @fileoverview This is a temporary file that is used to implement 'fake'
 * versions of the Auth utility functions used in the ViewTrips components.
 * As of right now, the only 'real' auth function used is `getCurUserEmail()`
 * but a fake user uid is still used due to the lack of a set of functions
 * that can convert  user email <--> user uid.
 *
 * TODO(Issue #55): Remove this whole file function and replace any imports to
 *                 this file with Auth utils.
 */
import authUtils from '../AuthUtils';

/**
 * Temporary 'fake'/hardcoded function that returns the current users uid.
 *
 * @return {string} Fake user uid string the form `_userEmail_`.
 */
export function getCurUserUid() {
  return '_' + authUtils.getCurUserEmail() + '_';
}

/**
 * Temporary 'fake'/hardcoded function that returns the an array of 'fake' user
 * uids given an array of user emails.
 *
 * @param {!string[]} userEmailArr User email strings.
 * @return {!string[]} Fake uuids corresponding to the user emails
 *     in `userEmailArr`.
 */
export function getUserUidArrFromUserEmailArr(userEmailArr) {
  return userEmailArr.map(userEmail => '_' + userEmail + '_');
}

/**
 * Temporary 'fake'/hardcoded function that returns the an array of user emails
 * given an array of 'fake' user uids.
 *
 * @param {!string[]} userUidArr Fake user uids in the form `_userEmail_`.
 * @return {!string[]} User emails corresponding to the user uids in `uuidArr`.
 */
export function getUserEmailArrFromUserUidArr(userUidArr) {
  return userUidArr.map(userUid => userUid.substring(1, userUid.length - 1));
}

const fakeAuthUtils = {
  getCurUserUid,
  getUserUidArrFromUserEmailArr,
  getUserEmailArrFromUserUidArr,
}

export default fakeAuthUtils;
