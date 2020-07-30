import * as firebase from 'firebase/app';

import authUtils from '../AuthUtils';
import { getTimestampFromISODateString } from './time.js'
import * as DB from '../../constants/database.js';

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
 * Return a promise containing an array of collaborator uids given the emails
 * provided in the add trip form.
 *
 * TODO(#72 & #67): Remove 'remove empty fields' once there is better way to
 * remove collaborators (#72) and there is email validation (#67).
 *
 * @param {!Array<string>} collaboratorEmailsArr Array of emails corresponding
 *     to the  collaborators of the trip (not including the trip creator email).
 * @return {Promise<!Array<string>>} Array of all collaborator uids (including trip
 *     creator uid).
 */
export async function getCollaboratorUidArray(collaboratorEmailArr) {
  collaboratorEmailArr = [authUtils.getCurUserEmail()]
                             .concat(collaboratorEmailArr);
  console.log(collaboratorEmailArr);

  // Removes empty fields (temporary until fix #67 & #72).
  const cleanedCollaboratorEmailArr = collaboratorEmailArr.filter(email => {
    // Comes in as undefined even though The passed in array has empty string.
    // look into this... IN panic right now becasue presentation.
    return email !== undefined;
  });
  console.log(cleanedCollaboratorEmailArr);

  return await authUtils.getUserUidArrFromUserEmailArr(cleanedCollaboratorEmailArr);
}

/**
 * Returns a promise containing the formatted and cleaned trip object that will
 * be used as the data for the created Trip document.
 *
 * We know that rawTripObj will contain all of the necessary fields because each
 * key-value pair is explicitly included. This means, only the value
 * corresponding to each key needs to be checked.
 * For text element inputs, React has built in protections against injection/XSS
 * attacks. Thus, no sanitization is needed for text inputs besides providing a
 * default value in a Trip field where applicable.
 *
 * @param {!Object} rawTripObj A JS Object containing the raw form data from the
 *     add trip form.
 * @return {Promise<!Object>} Formatted/cleaned version of `rawTripObj` holding the data
 *     for the new Trip document that is to be created.
 */
export async function formatTripData(rawTripObj) {
  const defaultName = "Untitled Trip";
  const defaultDestination = "No Destination"
  const collaboratorUidArr = await getCollaboratorUidArray(rawTripObj.collaboratorEmails);

  const formattedTripObj = {
    [DB.TRIPS_UPDATE_TIMESTAMP]: firebase.firestore.Timestamp.now(),
    [DB.TRIPS_TITLE]: getCleanedTextInput(rawTripObj[DB.TRIPS_TITLE], defaultName),
    [DB.TRIPS_DESCRIPTION]: rawTripObj[DB.TRIPS_DESCRIPTION],
    [DB.TRIPS_DESTINATION]:
        getCleanedTextInput(rawTripObj[DB.TRIPS_DESTINATION], defaultDestination),
    [DB.TRIPS_START_DATE]:
        getTimestampFromISODateString(rawTripObj[DB.TRIPS_START_DATE]),
    [DB.TRIPS_END_DATE]:
        getTimestampFromISODateString(rawTripObj[DB.TRIPS_END_DATE]),
    [DB.TRIPS_COLLABORATORS]: collaboratorUidArr,
  };

  return formattedTripObj;
}
