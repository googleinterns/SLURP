import * as firebase from 'firebase/app';

import app from '../Firebase/';

import { COLLECTION_TRIPS } from '../../constants/database.js';
import { getCurUserEmail, getUidFromUserEmail } from './temp-auth-utils.js'

const db = app.firestore();

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
function formatTripData(rawTripObj) {
  const formattedTripObj =
  {
    trip_creation_time: firebase.firestore.Timestamp.now(),
    name:               getTripName(rawTripObj.name),
    description:        rawTripObj.description,
    destination:        getTripDestination(rawTripObj.destination),
    start_date:         getTimestampFromDateString(rawTripObj.startDate),
    end_date:           getTimestampFromDateString(rawTripObj.endDate),
    collaborators:      getCollaboratorUidArray(rawTripObj.collaboratorEmails)
  };

  return formattedTripObj;
}

/**
 * Adds a new Trip document to firestore with data in `tripObj` and returns a
 * Promise containing a reference to the newly created document.
 *
 * @param {firebase.firestore.Firestore} db The Firestore database instance.
 * @param {Object} tripObj A JS Object containing the Trip document fields.
 * @return {Promise<firebase.firestore.DocumentReference>} Promise with the
 *     document reference upon successful creation of the trip document.
 */
export function addTripToFirestore(db, tripObj) {
  return db.collection(COLLECTION_TRIPS)
    .add(tripObj)
}

/**
 * Formats/cleans form data and creates new Trip document in firestore.
 *
 * @param {Object} rawTripObj A JS Object containing the raw form data from the
 *    add trip form.
 */
function createTrip(rawTripObj) {
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
