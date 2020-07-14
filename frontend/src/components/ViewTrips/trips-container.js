import React from 'react';
import Trip from './trip.js';

import * as DB from '../../constants/database.js';

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
 *    created with the form '_`userEmail`_'.
 */
function _getUidFromUserEmail(userEmail) {
  return '_' + userEmail + '_';
}

/**
 * Returns a promise of a query object containg the array of Trip Documents
 * corresponding to the trips that the current user is a collaborator on.
 *
 * @param {firebase.firestore.Firestore} db The Firestore database instance.
 * @param {string} userEmail The email corresponding to the current user
 *    logged in.
 * @return {Promise<!firebase.firestore.QuerySnapshot>} Promise object
 *    containing the query results with zero or more Trip  documents.
 */
function queryUserTrips(db, userEmail) {
  const userUid = _getUidFromUserEmail(userEmail);
  return db.collection(DB.COLLECTION_TRIPS)
      .where(DB.TRIPS_COLLABORATORS, 'array-contains', userUid)
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
 * - db: Firestore database instance.
 * - key: Special React attribute that ensures a new TripsContainer instance is
 *        created whenever this key is updated.
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
          this.props.db, _getUserEmail());
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
