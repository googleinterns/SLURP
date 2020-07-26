import * as firebase from 'firebase/app';

import authUtils from '../AuthUtils';
import { getUserUidArrFromUserEmailArr } from './temp-auth-utils.js';
import { getTimestampFromDateString } from './time.js';
import * as DB from '../../constants/database.js';

/**
 * {@link TripData} defined originally in `ViewTrips/trip.js`.
 */

/**
 * @typedef { DefaultFormData } RawTripData
 * {@link RawTripData} is an alias for the `typedef` {@link DefaultFormData}
 * defined in `ViewTrips/save-trip-modal.js`.
 */

/**
 * Return a string containing the cleaned text input.
 *
 * For text element inputs, React has built in protections against injection/XSS
 * attacks. Thus, no sanitization is needed for text inputs besides providing a
 * default value in a trip field where applicable.
 *
 * @param {string} rawInput String containing raw form input.
 * @param {string} defaultValue The default value of the text input in case the
 *     rawInput is empty.
 * @return {string} Cleaned string.
 */
export function getCleanedTextInput(rawInput, defaultValue) {
  return rawInput === '' ? defaultValue : rawInput;
}

/**
 * Return an array of collaborator uids given the emails provided in the
 * add trip form.
 *
 * TODO(#72 & #67): Remove 'remove empty fields' once there is better way to
 * remove collaborators (#72) and there is email validation (#67).
 *
 * @param {!string[]} collaboratorEmailsArr Array of emails corresponding
 *     to the  collaborators of the trip (not including the trip creator email).
 * @return {!string[]} Array of all collaborator uids (including trip
 *     creator uid).
 */
export function getCollaboratorUidArray(collaboratorEmailArr) {
  collaboratorEmailArr = [authUtils.getCurUserEmail()]
                          .concat(collaboratorEmailArr);

  // Removes empty fields (temporary until fix #67 & #72).
  while (collaboratorEmailArr.includes('')) {
    const emptyStrIdx = collaboratorEmailArr.indexOf('');
    collaboratorEmailArr.splice(emptyStrIdx, 1);
  }
  return getUserUidArrFromUserEmailArr(collaboratorEmailArr);
}

/**
 * Returns a formatted and cleaned {@link RawTripData} object that will be used
 * to instantiate the the created trip document.
 *
 * We know that {@link RawTripData} will contain all of the necessary fields for
 * a trip document (except timestamp) because each key-value pair is explicitly
 * included. This means, only the value corresponding to each key needs to be
 * checked.
 *
 * @param {!RawTripData} rawTripData A JS Object containing the raw form data
 *     from the add trip form.
 * @return {!TripData} Formatted/cleaned version of {@link RawTripData}
 *     holding the data for the new Trip document that is to be created.
 */
export function formatTripData(rawTripData) {
  const defaultName = "Untitled Trip";
  const defaultDestination = "No Destination"

  const tripData = {};
  tripData[DB.TRIPS_UPDATE_TIMESTAMP] = firebase.firestore.Timestamp.now();
  tripData[DB.TRIPS_TITLE] =
      getCleanedTextInput(rawTripData[DB.TRIPS_TITLE], defaultName);
  tripData[DB.TRIPS_DESCRIPTION] = rawTripData[DB.TRIPS_DESCRIPTION];
  tripData[DB.TRIPS_DESTINATION] =
     getCleanedTextInput(rawTripData[DB.TRIPS_DESTINATION], defaultDestination);
  tripData[DB.TRIPS_START_DATE] =
      getTimestampFromDateString(rawTripData[DB.TRIPS_START_DATE]);
  tripData[DB.TRIPS_END_DATE] =
      getTimestampFromDateString(rawTripData[DB.TRIPS_END_DATE]);
  tripData[DB.TRIPS_COLLABORATORS] =
      getCollaboratorUidArray(rawTripData[DB.TRIPS_COLLABORATORS]);

  return tripData;
}
