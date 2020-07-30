import React from 'react';

import app from '../Firebase/';

import * as DB from '../../constants/database.js';
import { getCurUserUid } from '../Utils/temp-auth-utils.js'
import Trip from './trip.js';

const db = app.firestore();

/**
 * Returns a `<div>` element with an error message. The error message `error`
 * will be logged but not seen by the user.
 *
 * TODO(Issue #98): Turn this func into component and add to Errors directory.
 *
 * @param {string} error Error message in `componentDidMount` catch statement.
 * @return {HTMLDivElement} `<div>` element containing the error message that
 *     the user will see on the view trips page.
 */
function getErrorElement(error) {
  console.log(`Error in Trips Container: ${error}`);

  return (
    <div>
      <p>Oops, it looks like we were unable to load your trips.
                    Please wait a few minutes and try again.
      </p>
    </div>
  );
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
    this.state = {tripsContainer: []};
  }

  /**
   * When the TripsContainer mounts, a listener is attached to the QuerySnapshot
   * event that grabs all trip documents where the current user uid is contained
   * in the collaborator uid array (collaborators field). This allows real-time
   * updates for all collaborators on a trip whenever a trip is updated (add,
   * edit, or delete).
   *
   * In the case where there is an error, an error component is returned in
   * place of the array of trips.
   *
   * @override
   */
  async componentDidMount() {
    const curUserUid = getCurUserUid();
    db.collection(DB.COLLECTION_TRIPS)
        .where(DB.TRIPS_COLLABORATORS, 'array-contains', curUserUid)
        .orderBy(DB.TRIPS_CREATION_TIME, 'desc')
        .onSnapshot(querySnapshot => {
          const tripsArr = querySnapshot.docs.map(doc =>
              ( <Trip
                  tripData={doc.data()}
                  tripId={doc.id}
                  handleEditTrip={this.props.handleEditTrip}
                  key={doc.id}
                />
              )
          );

          this.setState({ tripsContainer: tripsArr });
        }, (error) => {
          const errorElement = getErrorElement(error);
          this.setState({ tripsContainer: errorElement });
        });
  }

  /** @inheritdoc */
  render() {
    return (
      <div>{this.state.tripsContainer}</div>
    );
  }
}

export default TripsContainer;
