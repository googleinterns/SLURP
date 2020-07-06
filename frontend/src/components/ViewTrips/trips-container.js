import React from 'react';
import app from '../Firebase';
import Trip from './trip';

import * as DATABASE from '../../constants/database';

const db = app.firestore();

/**
 * Temporary hardcoded function that returns the current users email.
 *
 * The hardcoded string was created based on one of the manually created test
 * Trip Documents. This function will be implemented in the user authentication
 * JS module using Firebase's Authentication API.
 *
 * TODO(Issue 16): Remove this function once implemented in authentication
 *                 module.
 */
function getUserEmail() {
  return 'matt.murdock';
}

/**
 * Returns a promise of a query object containg the array of Trip Documents
 * corresponding to the trips that the current user is a collaborator on.
 *
 * @param {string} userEmail The email corresponding to the current user
 *    logged in.
 * @return {Promise} Promise object containing the query results as a
 *    QuerySnapshot object. This QuerySnapshot contains zero or more Trip
 *    documents as DocumentSnapshot objects.
 */
function queryUserTrips(userEmail) {
  return db.collection(DATABASE.TRIP_COLLECTION)
      .where(DATABASE.COLLABORATORS_FIELD, 'array-contains', userEmail)
      .get();
}

/**
 * Grabs Trip Documents for user from queryUserTrips(), get HTML for each
 * individual trip, and append each trip to the trip container on the view
 * trips page.
 */
function serveTrips() {
  queryUserTrips(getUserEmail())
      .then(querySnapshot => {
        let a = (querySnapshot.docs.map(doc => {
          const test = ( <Trip tripObj={doc.data()} tripId={doc.id} /> );
          return test;
        }))
        console.log(a);
        return a;
      })
      .catch(error => {
        console.log(`Error in getCommentsThread: ${error}`);
        return ( <p>Error: Unable to load your trips.</p> );
      });
}

// function serveTrips() {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       resolve([1,2]);
//     }, 1000);
//   });
// }

const TripsContainer = () => {
  console.log(serveTrips());
  return (
    <div>{serveTrips()}</div>
  );
};

export default TripsContainer;
// export {serveTrips, ...}
