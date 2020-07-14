import * as firebase from 'firebase/app';
import { COLLECTION_TRIPS } from '../../constants/database.js';

/**
 * Temporary hardcoded function that returns the current users email.
 *
 * TODO(Issue 55): Remove this function and replace any calls to it with Auth
 *                 component function.
 *
 * @return Hardcoded user email string.
 */
function _getUserEmail() {
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
function _getUidFromUserEmail(userEmail) {
  return '_' + userEmail + '_';
}

/**
 * Return a string containing the trip name given the trip name entered in the
 * add trip form.
 *
 * @param {string} rawName String containing trip name entered in add trip form.
 * @return {string} Cleaned trip name.
 */
export function getTripName(rawName) {
  return rawName === '' ? 'Untitled Trip' : rawName;
}

/**
 * Return a string containing the trip destination given the trip destination
 * entered in the add trip form.
 *
 * @param {string} rawName String containing trip description entered in the
 *     add trip form.
 * @return {string} Cleaned trip description.
 */
export function getTripDestination(rawDestination) {
  return rawDestination === '' ? 'No Destination' : rawDestination;
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
    return firebase.firestore.Timestamp.now()
  }

  const date = new Date(dateParts[0], dateParts[1] - 1, dateParts[2]);
  return firebase.firestore.Timestamp.fromDate(date);
}

/**
 * Return an array of collaborator uids given the emails provided in the
 * add trip form.
 *
 * @param {!Array{string}} collaboratorEmailsArr Array of emails corresponding
 *     to the  collaborators of the trip (not including the trip creator email).
 * @return {!Array{string}} Array of all collaborator uids (including trip
 *     creator uid).
 */
export function getCollaboratorUidArr(collaboratorEmailArr) {
  collaboratorEmailArr = [_getUserEmail()].concat(collaboratorEmailArr);
  return collaboratorEmailArr.map(userEmail => _getUidFromUserEmail(userEmail));
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
function formatTripData(rawTripObj) {
  const formattedTripObj =
  {
    trip_creation_time: firebase.firestore.Timestamp.now(),
    name:               getTripName(rawTripObj.name),
    description:        getTripDestination(rawTripObj.destination),
    destination:        rawTripObj.description,
    start_date:         getTimestampFromDateString(rawTripObj.startDate),
    end_date:           getTimestampFromDateString(rawTripObj.endDate),
    collaborators:      getCollaboratorUidArr(rawTripObj.collaboratorEmails)
  };

  return formattedTripObj;
}

/**
 * Adds a new Trip document to firestore with data in `tripObj` and returns a
 * Promise containing a reference to the newly created document.
 *
 * @param {firebase.firestore.Firestore} db The Firestore database instance.
 * @param {Object} tripObj A JS Object containing the Trip document fields.
 */
export function addTripToFirestore(db, tripObj) {
  return db.collection(COLLECTION_TRIPS)
    .add(tripObj)
}

/**
 * Formats/cleans form data and creates new Trip document in firestore.
 *
 * @param {firebase.firestore.Firestore} db The Firestore database instance.
 * @param {Object} rawTripObj A JS Object containing the raw form data from the
 *    add trip form.
 */
function createTrip(db, rawTripObj) {
  const formattedTripObj = formatTripData(rawTripObj);

  addTripToFirestore(db, formattedTripObj)
      .then(docRef => {
        console.log("Document written with ID: ", docRef.id);
      })
      .catch(error => {
        console.error("Error adding document: ", error);
      });
}

export default createTrip;
