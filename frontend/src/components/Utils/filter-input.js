import * as firebase from 'firebase/app';

import { getCurUserEmail, getUidFromUserEmail } from './temp-auth-utils.js'

/**
 * Return a string containing the cleaned text input.
 *
 * @param {string} rawInput String containing raw form input.
 * @return {string} Cleaned string.
 */
export function getCleanedTextInput(rawInput, defaultValue) {
  return rawInput === '' ? defaultValue : rawInput;
}

/**
 * Return a Firestore Timestamp corresponding to the date in `dateStr`.
 *
 * @param {string} dateStr String containing a date in the form 'yyyy-mm-dd'.
 * @return {firebase.firestore.Timestamp} Firestore timestamp object created.
 */
export function getTimestampFromDateString(dateStr) {
  const dateParts = dateStr.split('-').map(str => +str);
  if (dateParts.length === 1 && dateParts[0] === 0) {
    return firebase.firestore.Timestamp.now();
  }

  const date = new Date(dateParts[0], dateParts[1] - 1, dateParts[2]);
  return firebase.firestore.Timestamp.fromDate(date);
}

/**
 * Return an array of collaborator uids given the emails provided in the
 * add trip form.
 *
 * TODO(#72 & #67): Remove 'remove empty fields' once there is better way to
 * remove collaborators (#72) and there is email validation (#67).
 *
 * @param {!Array{string}} collaboratorEmailsArr Array of emails corresponding
 *     to the  collaborators of the trip (not including the trip creator email).
 * @return {!Array{string}} Array of all collaborator uids (including trip
 *     creator uid).
 */
export function getCollaboratorUidArray(collaboratorEmailArr) {
  collaboratorEmailArr = [getCurUserEmail()].concat(collaboratorEmailArr);

  // Removes empty fields (temporary).
  while (collaboratorEmailArr.includes('')) {
    const emptyStrIdx = collaboratorEmailArr.indexOf('');
    collaboratorEmailArr.splice(emptyStrIdx, 1);
  }
  return collaboratorEmailArr.map(userEmail => getUidFromUserEmail(userEmail));
}

/**
 * Returns a formatted and cleaned trip object that will be used as the data
 * for the created Trip document.
 *
 * We know that rawTripObj will contain all of the necessary fields because each
 * key-value pair is explicitly included. This means, only the value
 * corresponding to each key needs to be checked.
 * For text element inputs, React has built in protections against injection/XSS
 * attacks. Thus, no sanitization is needed for text inputs besides providing a
 * default value in a Trip field where applicable.
 *
 * @param {Object} rawTripObj A JS Object containing the raw form data from the
 *     add trip form.
 * @return {Object} Formatted/cleaned version of `rawTripObj` holding the data
 *     for the new Trip document that is to be created.
 */
export function formatTripData(rawTripObj) {
  const defaultName = "Untitled Trip";
  const defaultDestination = "No Destination"

  const formattedTripObj =
  {
    trip_creation_time: firebase.firestore.Timestamp.now(),
    name:               getCleanedTextInput(rawTripObj.name, defaultName),
    description:        rawTripObj.description,
    destination:        getCleanedTextInput(rawTripObj.destination,
                                                 defaultDestination),
    start_date:         getTimestampFromDateString(rawTripObj.startDate),
    end_date:           getTimestampFromDateString(rawTripObj.endDate),
    collaborators:      getCollaboratorUidArray(rawTripObj.collaboratorEmails)
  };

  return formattedTripObj;
}
