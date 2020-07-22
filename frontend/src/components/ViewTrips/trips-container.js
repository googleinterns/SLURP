import React from 'react';

import app from '../Firebase/';

import * as DB from '../../constants/database.js';
import { getCurUserUid } from '../Utils/temp-auth-utils.js'
import Trip from './trip.js';

const db = app.firestore();

/**
 * Returns a `<div>` element with the specified error message.
 *
 * @param {!string} error Error message in `componentDidMount` catch statement.
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
 * - handleEditTrip: Handler that displays the edit trip modal.
 * @extends React.Component
 */
class TripsContainer extends React.Component {
  /** @inheritdoc */
  constructor(props) {
    super(props);
    this.state = {trips: []};
  }

  serveUserTrips = () => {
    const curUserUid = getCurUserUid();
    db.collection(DB.COLLECTION_TRIPS)
        .where(DB.TRIPS_COLLABORATORS, 'array-contains', curUserUid)
        .orderBy(DB.TRIPS_CREATION_TIME, 'desc')
        .onSnapshot(querySnapshot => {
          const tripsContainer = querySnapshot.docs.map(doc =>
              ( <Trip
                  tripData={doc.data()}
                  tripId={doc.id}
                  handleEditTrip={this.props.handleEditTrip}
                  key={doc.id}
                />
              )
          );

          this.setState({ trips: tripsContainer });
        }, (error) => {
          let errorElement = getErrorElement(error);
          this.setState({ trips: errorElement });
        });
  }

  /** @inheritdoc */
  async componentDidMount() {
    this.serveUserTrips();
  }

  /** @inheritdoc */
  render() {
    return (
      <div>{this.state.trips}</div>
    );
  }
}

export default TripsContainer;
