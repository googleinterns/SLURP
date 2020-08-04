import * as firebase from 'firebase/app';

import authUtils, { getCurUserUid } from '../AuthUtils';
import { getTimestampFromISODateString } from '../Utils/time.js'
import * as DB from '../../constants/database.js';
import * as msgs from '../../constants/messages.js';
import TripView from '../../constants/trip-view.js';

/**
 * {@link TripData} defined originally in `ViewTrips/trip.js`.
 */

/**
 * {@link RawTripData} defined originally in `ViewTrips/save-trip-modal.js`.
 */

/**
 * {@link TripView} defined originally in `constants/trip-view.js`.
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
 * Return a promise containing an array of collaborator uids given the emails
 * provided in the add trip form (all but the trip creator).
 *
 * TODO(#72 & #67): Remove 'remove empty fields' once there is better way to
 * remove collaborators (#72) and there is email validation (#67).
 *
 * @param {!string[]} collaboratorEmailsArr Array of emails corresponding
 *     to the  collaborators of the trip (not including the trip creator email).
 * @return {Promise<!string[]>} Promise that resolves to an array of the
 *     collaborator uids corrsponding to the emails in `collaboratorEmailsArr`.
 */
export async function getCollaboratorUidArray(collaboratorEmailArr) {
  const cleanedCollaboratorEmailArr = collaboratorEmailArr.filter(email => {
    return email !== '';
  });

  return await authUtils.getUserUidArrFromUserEmailArr(cleanedCollaboratorEmailArr);
}

/**
 * Returns the new `accepted_collaborator_uid_arr` field value for the updated
 * trip document.
 *
 * @param {!string[]} curCollabUidArr Array of the collaborator uids corresponding
 *     to the emails in the `collaborator_email_arr` field of the
 *     {@link RawTripData} instance coming from the `SaveTripModal` component.
 * @param {!string[]} prevAccepCollabUidArr Array stored in the field
 *     `accepted_collaborator_uid_arr` of {@link TripData} corresponding to the
 *     current trip document.
 * @return {!string[]} Array containing the set intersection of two params
 *     `curCollabUidArr` and `prevAccepCollabUidArr` converted to sets.
 */
export function getNewAcceptedCollabArr(curCollabUidArr, prevAccepCollabUidArr) {
  const curCollabUidSet = new Set(curCollabUidArr);
  const prevAccepCollabUidSet = new Set(prevAccepCollabUidArr);
  return [...curCollabUidSet].filter(el => prevAccepCollabUidSet.has(el));
}

/**
 * Returns the new `pending_collaborator_uid_arr` field value for the updated
 * trip document.
 *
 * @param {!string[]} curCollabUidArr Array of the collaborator uids corresponding
 *     to the emails in the `collaborator_email_arr` field of the
 *     {@link RawTripData} instance coming from the `SaveTripModal` component.
 * @param {!string[]} prevAccepCollabUidArr Array stored in the field
 *     `accepted_collaborator_uid_arr` of {@link TripData} corresponding to the
 *     current trip document.
 * @return {!string[]} Array containing the set difference of two params
 *     `curCollabUidArr` and `prevAccepCollabUidArr` converted to sets.
 */
export function getNewPendingCollabArr(curCollabUidArr, prevAccepCollabUidArr) {
  const curCollabUidSet = new Set(curCollabUidArr);
  const prevAccepCollabUidSet = new Set(prevAccepCollabUidArr);
  return [...curCollabUidSet].filter(el => !prevAccepCollabUidSet.has(el));
}

/**
 * Returns a promise containing the formatted and cleaned {@link RawTripData}
 * that will be used to instantiate the the created trip document.
 *
 * We know that {@link RawTripData} will contain all of the necessary fields for
 * a trip document (except updated timestamp) because each key-value pair is
 * explicitly included. This means, only the value corresponding to each key
 * needs to be checked.
 * For text element inputs, React has built in protections against injection/XSS
 * attacks. Thus, no sanitization is needed for text inputs besides providing a
 * default value in a Trip field where applicable.
 *
 * @param {!RawTripData} rawTripData A JS Object containing the raw form data
 *     from the add trip form.
 * @return {Promise<!TripData>} Promise that resoleves to the formatted/cleaned
 *     version of {@link RawTripData} holding the data for the new Trip document
 *     that is to be created.
 */
export async function formatTripData(rawTripData, prevTripData) {
  let curUserUidArr = [getCurUserUid()];
  const curCollabUidArr = await getCollaboratorUidArray(
                                    rawTripData[DB.RAW_COLLAB_EMAILS]);

  let acceptedCollabUidArr;
  let pendingCollabUidArr;
  let rejectedCollabUidArr;
  if (prevTripData === null) {
    acceptedCollabUidArr = curUserUidArr;
    pendingCollabUidArr = curCollabUidArr;
    rejectedCollabUidArr = [];
  } else {
    acceptedCollabUidArr = curUserUidArr.concat(getNewAcceptedCollabArr(
                                curCollabUidArr,
                                prevTripData[DB.TRIPS_ACCEPTED_COLLABS]));
    pendingCollabUidArr = getNewPendingCollabArr(curCollabUidArr,
                                prevTripData[DB.TRIPS_ACCEPTED_COLLABS]);
    rejectedCollabUidArr = prevTripData[DB.TRIPS_REJECTED_COLLABS];
  }

  const tripData = {
    [DB.TRIPS_UPDATE_TIMESTAMP]: firebase.firestore.Timestamp.now(),
    [DB.TRIPS_TITLE]: getCleanedTextInput(rawTripData[DB.TRIPS_TITLE],
                                msgs.TRIPS_TITLE_DEFAULT),
    [DB.TRIPS_DESCRIPTION]: rawTripData[DB.TRIPS_DESCRIPTION],
    [DB.TRIPS_DESTINATION]: getCleanedTextInput(rawTripData[DB.TRIPS_DESTINATION],
                                msgs.TRIPS_DESTINATION_DEFAULT),
    [DB.TRIPS_START_DATE]: getTimestampFromISODateString(
                                rawTripData[DB.TRIPS_START_DATE]),
    [DB.TRIPS_END_DATE]: getTimestampFromISODateString(
                                rawTripData[DB.TRIPS_END_DATE]),
    [DB.TRIPS_ACCEPTED_COLLABS]: acceptedCollabUidArr,
    [DB.TRIPS_PENDING_COLLABS]: pendingCollabUidArr,
    [DB.TRIPS_REJECTED_COLLABS]: rejectedCollabUidArr,
  };

  return tripData;
}

/**
 * Return the collaborator uid array corresponding to `this.props.tripView`
 *
 * @return {*} The collaborator uid array.
 */
export function getCollaboratorField(tripView) {
  switch(tripView) {
    case TripView.ACTIVE:
      return DB.TRIPS_ACCEPTED_COLLABS;
    case TripView.PENDING:
      return DB.TRIPS_PENDING_COLLABS;
    case TripView.REJECTED:
      return DB.TRIPS_REJECTED_COLLABS;
    default:
      console.error(`Trip view of ${tripView} was unexpected.
                      Returning accepted collaborators field.`);
      return DB.TRIPS_ACCEPTED_COLLABS;
  }
}

/**
 * Return collaborator emails corresponding to the collaborator uid's
 * `collaboratorUidArr` in a comma separated string.
 *
 * @param {!string[]} collaboratorEmailArr Array of user emails sorted in
 *     alphabetical order.
 * @return {!string[]} Array of user emails where first element is the current
 *     user email and the following elements maintain their previous order.
 */
export function moveCurUserEmailToFront(collaboratorEmailArr) {
  collaboratorEmailArr = collaboratorEmailArr.filter(email => {
    return email !== authUtils.getCurUserEmail();
  });
  return [authUtils.getCurUserEmail()].concat(collaboratorEmailArr);
}
