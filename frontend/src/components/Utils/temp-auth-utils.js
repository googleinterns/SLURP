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
 * @return {string} Fake user uid string the form '_userEmail_'.
 */
export function getCurUserUid() {
  return getUserUidArrFromUserEmailArr([authUtils.getCurUserEmail()]).pop();
}

/**
 * Temporary 'fake'/hardcoded function that returns the an array of 'fake' user
 * uids given an array of user emails.
 *
 * @param {!Array<string>} userEmailArr Array of user email strings.
 * @return {!Array<string>} Array of fake uuids corresponding to the user
 *     emails in `userEmailArr`.
 */
export function getUserUidArrFromUserEmailArr(userEmailArr) {
  return userEmailArr.map(userEmail => '_' + userEmail + '_');
}

/**
 * Temporary 'fake'/hardcoded function that returns the an array of user emails
 * given an array of 'fake' user uids.
 *
 * @param {!Array<string>} uuidArr Array of fake user uids that are
 *     in the form '_userEmail_'.
 * @return {!Array<string>} Array of user emails corresponding to the user
 *     uids in `uuidArr`.
 */
export function getUserEmailArrFromUserUidArr(uuidArr) {
  return uuidArr.map(uuid => uuid.substring(1, uuid.length - 1));
}

const fakeAuthUtils = {
  getCurUserUid,
  getUserUidArrFromUserEmailArr,
  getUserEmailArrFromUserUidArr,
}

export default fakeAuthUtils;