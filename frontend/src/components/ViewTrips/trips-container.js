import React from 'react';
import Trip from './trip';

import * as DATABASE from '../../constants/database';


/**
 * Returns a promise of a query object containg the array of Trip Documents
 * corresponding to the trips that the current user is a collaborator on.
 *
 * @param {Object} db The Firestore database instance.
 * @param {string} userEmail The email corresponding to the current user
 *    logged in.
 * @return {Promise<!Object>} Promise object containing the query results as a
 *    `QuerySnapshot` object. This `QuerySnapshot` contains zero or more Trip
 *    documents (`DocumentSnapshot` objects).
 */
function queryUserTrips(db, userEmail) {
  return db.collection(DATABASE.COLLECTION_TRIPS)
      .where(DATABASE.TRIPS_COLLABORATORS, 'array-contains', userEmail)
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
  /** @inheritdoc */
  constructor(props) {
    super(props);
    this.state = {trips: []};
  }

  /** @inheritdoc */
  async componentDidMount() {
    try {
      const querySnapshot = await queryUserTrips(
          this.props.db, this.props.userEmail);
      let tripsContainer = await serveTrips(querySnapshot);
      this.setState({trips: tripsContainer});
    }
    catch (error) {
      this.setState({trips: getErrorElement(error)});
    }
  }

  /** @inheritdoc */
  render() {
    return (
      <div>{this.state.trips}</div>
    );
  }
}

export default TripsContainer;
export {queryUserTrips, serveTrips, getErrorElement};
