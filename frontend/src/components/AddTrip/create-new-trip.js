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
 * Return a Firestore Timestamp corresponding to the date in `dateStr`.
 *
 * @param {string} dateStr String containing a date in the form 'mm/dd/yyyy'.
 *     This is temporary and will be replaced in the fix for Issue 52.
 * @return {firebase.firestore.Timestamp} Firestore timestamp object created.
 */
export function getTimestampFromDateString(dateStr) {
  return firebase.firestore.Timestamp.now();
}

/**
 * Return an array of collaborator uids from the emails in
 * `collaboratorEmailsStr`.
 *
 * @param {string} collaboratorEmailsStr String containing a comma separated
 *     sequence of emails. This is temporary and will be replaced in the fix
 *     for Issue 52.
 * @return {!Array{string}} Array of collaborator uids.
 */
export function getCollaboratorUidArray(collaboratorEmailsStr) {
  const collaboratorEmailArr = collaboratorEmailsStr.split(', ');
  collaboratorEmailArr.push(_getUserEmail());
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
 */
export function formatTripData(rawTripObj) {
  const name = rawTripObj.name === '' ? 'Untitled Trip' : rawTripObj.name;
  const destination = rawTripObj.destination === '' ? 'No Destination' :
                                                      rawTripObj.destination;
  const startDate = getTimestampFromDateString(rawTripObj.startDate);
  const endDate = getTimestampFromDateString(rawTripObj.endDate);
  const tripCreationTime = firebase.firestore.Timestamp.now();
  const collaboratorUids =
      getCollaboratorUidArray(rawTripObj.collaboratorEmails);

  return {
    name: name,
    description: rawTripObj.description,
    destination: destination,
    start_date: startDate,
    end_date: endDate,
    trip_creation_time: tripCreationTime,
    collaborators: collaboratorUids
  }
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
