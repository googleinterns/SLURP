import * as firebase from 'firebase/app';
import { COLLECTION_TRIPS } from '../../constants/database.js';

function getUidFromUserEmail(userEmail) {
  return userEmail;
}

export function getTimestampFromDateString(dateStr) {
  console.log(dateStr);
  return firebase.firestore.Timestamp.now();
}

export function getCollaboratorUidArray(userEmail, collaboratorEmailsStr) {
  const collaboratorEmailArr = collaboratorEmailsStr.split(', ');
  collaboratorEmailArr.push(userEmail);
  return collaboratorEmailArr.map(userEmail => getUidFromUserEmail(userEmail));
}

/**
 *
 * We know that tripObj will contain all of the necessary fields because each
 * key-value pair is explicitly included. This means, only the value
 * corresponding to each key needs to be checked.
 *
 * For text element inputs, React has built in protections against injection/XSS
 * attacks. Thus, no sanitization is needed for text inputs besides providing a
 * default value in a Trip field where applicable.
 *
 * @param {*} tripObj
 */
export function sanitizeTripData(tripObj, userEmail) {
  const name = tripObj.name === '' ? 'Untitled Trip' : tripObj.name;
  const destination = tripObj.destination === '' ? 'No Destination' :
                                                   tripObj.destination;
  const startDate = getTimestampFromDateString(tripObj.startDate);
  const endDate = getTimestampFromDateString(tripObj.endDate);
  const tripCreationTime = firebase.firestore.Timestamp.now();
  const collaborators = getCollaboratorUidArray(userEmail,
                                                tripObj.collaboratorEmails);

  return {
    name: name,
    description: tripObj.description,
    destination: destination,
    start_date: startDate,
    end_date: endDate,
    trip_creation_time: tripCreationTime,
    collaborators: collaborators
  }
}

function addTripToFirestore(db, tripObj) {
  return db.collection(COLLECTION_TRIPS)
    .add(tripObj)
}

/**
 * Cleans form data and creates new Trip document in firestore.
 */
function createTrip(db, userEmail, tripObj) {
  const sanitizedTripObj = sanitizeTripData(tripObj, userEmail);
  console.log(sanitizedTripObj);

  addTripToFirestore(db, sanitizedTripObj)
      .then(docRef => {
        console.log("Document written with ID: ", docRef.id);
      })
      .catch(error => {
        console.error("Error adding document: ", error);
      });
}

export default createTrip;
