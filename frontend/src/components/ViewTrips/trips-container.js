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
function serveTrips(querySnapshot) {
  return new Promise(function(resolve, reject) {
    const tripsContainer = querySnapshot.docs.map(doc =>
        ( <Trip key={doc.id} tripObj={doc.data()} tripId={doc.id} /> ));
    console.log(tripsContainer);
    resolve(tripsContainer);
  });
}

function getErrorElement(error) {
  return new Promise(function(resolve, reject) {
    console.log(`Error in Trips Container: ${error}`);
    resolve(( <div><p>Error: Unable to load your trips.</p></div> ));
  });
}

class TripsContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {trips: []};
  }

  async componentDidMount() {
    try {
      const querySnapshot = await queryUserTrips(getUserEmail());
      let tripsContainer = await serveTrips(querySnapshot);
      console.log(tripsContainer);
      this.setState({trips: tripsContainer});
    }
    catch (error) {
      this.setState({trips: getErrorElement(error)});
    }
  }

  render() {
    console.log(this.state.trips);
    return (
      <div>{this.state.trips}</div>
    );
  }
}

export default TripsContainer;
// export {serveTrips, ...}
