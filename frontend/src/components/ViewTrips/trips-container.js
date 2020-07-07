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
 * @return {Promise<!Object>} Promise object containing the query results as a
 *    `QuerySnapshot` object. This `QuerySnapshot` contains zero or more Trip
 *    documents (`DocumentSnapshot` objects).
 */
function queryUserTrips(userEmail) {
  return db.collection(DATABASE.TRIP_COLLECTION)
      .where(DATABASE.COLLABORATORS_FIELD, 'array-contains', userEmail)
      .get();
}

/**
 * Grabs Trips query result from `queryUserTrips()` and returns an array of
 * `<Trip>` elements as defined in `trip.js`.
 *
 * @param {Promise<!Object>} querySnapshot Promise object containing the query
 *    results as a `QuerySnapshot` object.
 * @return {Promise<!Array<ReactElement>>} Promise object containing an array
 *    of Trip React/HTML elements corresponding to the Trip docsuments included
 *    in 'querySnapshot`.
 */
function serveTrips(querySnapshot) {
  return new Promise(function(resolve) {
    const tripsContainer = querySnapshot.docs.map(doc =>
        ( <Trip key={doc.id} tripObj={doc.data()} tripId={doc.id} /> ));
    resolve(tripsContainer);
  });
}

/**
 * Returns a `<div>` element with the specified error message.
 *
 * @param {string} error Error message in `componentDidMount()` catch statement.
 * @return {Promise<HTMLDivElement>} Promise object containing a `<div>` element
 *    with the error message `error` inside.
 */
function getErrorElement(error) {
  return new Promise(function(resolve) {
    console.log(`Error in Trips Container: ${error}`);
    resolve(( <div><p>Error: Unable to load your trips.</p></div> ));
  });
}

/**
 * Component corresponding to the container containing a users trips.
 *
 * @extends React.Component
 */
class TripsContainer extends React.Component {
  constructor() {
    super();
    this.state = {trips: []};
  }

  async componentDidMount() {
    try {
      const querySnapshot = await queryUserTrips(getUserEmail());
      let tripsContainer = await serveTrips(querySnapshot);
      this.setState({trips: tripsContainer});
    }
    catch (error) {
      this.setState({trips: getErrorElement(error)});
    }
  }

  render() {
    return (
      <div>{this.state.trips}</div>
    );
  }
}

export default TripsContainer;
export {queryUserTrips, serveTrips, getErrorElement};
