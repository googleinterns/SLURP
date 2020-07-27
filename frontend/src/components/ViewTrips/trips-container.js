import React from 'react';

import app from '../Firebase/';
import Accordion from 'react-bootstrap/Accordion';

import * as DB from '../../constants/database.js';
import { getCurUserUid } from '../Utils/temp-auth-utils.js'
import Trip from './trip.js';

const db = app.firestore();

/**
 * Returns a `<div>` element with the specified error message.
 *
 * TODO(Issue #9.): Turn this func into component and add to Errors directory.
 *
 * @param {string} error Error message in `componentDidMount` catch statement.
 * @return {Promise<HTMLDivElement>} Promise object containing a `<div>` element
 *    with the error message `error` inside.
 */
function getErrorElement(error) {
  return new Promise(function(resolve) {
    console.log(`Error in Trips Container: ${error}`);
    resolve(
      <div>
        <p>Oops, it looks like we were unable to load your trips.
                      Please wait a few minutes and try again.
        </p>
      </div>
  );
  });
}

/**
 * Component corresponding to the container containing a user's trips.
 * props
 *
 * @property {Object} props These are the props for this component:
 * @property {Function} props.handleEditTrip Event handler responsible for
 *     displaying the edit trip modal.
 * @extends React.Component
 */
class TripsContainer extends React.Component {
  /** @override */
  constructor(props) {
    super(props);
    this.state = { trips: [] };
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
        .orderBy(DB.TRIPS_UPDATE_TIMESTAMP, 'desc')
        .onSnapshot(querySnapshot => {
          const trips = querySnapshot.docs.map((doc, idx) =>
              ( <Trip
                  tripData={doc.data()}
                  tripId={doc.id}
                  handleEditTrip={this.props.handleEditTrip}
                  eventKey={String(idx)}
                  key={doc.id}
                />
              )
          );

          this.setState({ trips: trips });
        }, async (error) => {
          const errorElement = await getErrorElement(error);
          this.setState({ trips: errorElement });
        });
  }

  /** @override */
  render() {
    if (this.state.trips === undefined || this.state.trips.length === 0) {
      return (
        <div></div>
      );
    }
    return (
      <Accordion defaultActiveKey="0">
        {this.state.trips}
      </Accordion>
    );
  }
}

export default TripsContainer;
