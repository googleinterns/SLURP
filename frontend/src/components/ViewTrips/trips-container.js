import React from 'react';

import app from '../Firebase/';

import * as DB from '../../constants/database.js';
import { getCurUserUid } from '../Utils/temp-auth-utils.js'
import Trip from './trip.js';

const db = app.firestore();

/**
 * Returns a promise of a query object containg the array of Trip Documents
 * corresponding to the trips that the current user is a collaborator on.
 *
 * @param {firebase.firestore.Firestore} db The Firestore database instance.
 * @return {Promise<!firebase.firestore.QuerySnapshot>} Promise object
 *    containing the query results with zero or more Trip  documents.
 */
function queryUserTrips(db) {
  const curUserUid = getCurUserUid();
  return db.collection(DB.COLLECTION_TRIPS)
      .where(DB.TRIPS_COLLABORATORS, 'array-contains', curUserUid)
      .orderBy(DB.TRIPS_CREATION_TIME, 'desc')
      .get();
}

/**
 * Grabs Trips query result from `queryUserTrips()` and returns an array of
 * `<Trip>` elements as defined in `trip.js`.
 *
 * @param {Promise<!firebase.firestore.QuerySnapshot>} querySnapshot Promise
 *    object containing the query results with zero or more Trip documents.
 * @return {Promise<!Array<Trip>>} Promise object containing an array
 *    of Trip React/HTML elements corresponding to the Trip documents included
 *    in `querySnapshot`.
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
 * Component corresponding to the container containing a user's trips.
 * props
 *
 * @param {Object} props These are the props for this component:
 * - key: Special React attribute that ensures a new TripsContainer instance is
 *        created whenever this key is updated (Remove when fix Issue #62).
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
      const querySnapshot = await queryUserTrips(db);
      let tripsContainer = await serveTrips(querySnapshot);
      this.setState({ trips: tripsContainer });
    }
    catch (error) {
      let errorElement = await getErrorElement(error);
      this.setState({ trips: errorElement });
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
