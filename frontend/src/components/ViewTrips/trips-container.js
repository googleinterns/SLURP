import React from 'react';

import app from '../Firebase/';
import Accordion from 'react-bootstrap/Accordion';

import authUtils from '../AuthUtils';
import * as DB from '../../constants/database.js';
import Trip from './trip.js';
import { getCollaboratorField } from './trip-utils.js';

/**
 * {@link TripView} defined originally in `constants/trip-view.js`.
 */

const db = app.firestore();

/**
 * Returns a `<div>` element with a predefined error message after logging the
 * error message `error` obtained from `componentDidMount` catch statement.
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
 * @property {Object} props These are the props for this component:
 * @property {Function} props.handleEditTrip Event handler responsible for
 *     displaying the edit trip modal.
 * @property {TripView} props.tripView ...
 * @extends React.Component
 */
class TripsContainer extends React.Component {
  /** @override */
  constructor(props) {
    super(props);
    this.state = {tripsContainer: []};
  }

  /**
   * When the TripsContainer mounts, a listener is attached to the QuerySnapshot
   * event that grabs all trip documents where the current user uid is contained
   * in the collaborator uid array corresponding to `this.props.tripView`.
   * This allows real-time updates for all collaborators on a trip whenever a
   * trip is updated (add, edit, or delete).
   *
   * In the case where there is an error, an error component is returned in
   * place of the array of trips.
   *
   * @override
   */
  async componentDidMount() {
    const curUserUid = authUtils.getCurUserUid();
    const collaboratorField = getCollaboratorField(this.props.tripView);
    db.collection(DB.COLLECTION_TRIPS)
        .where(collaboratorField, 'array-contains', curUserUid)
        .orderBy(DB.TRIPS_UPDATE_TIMESTAMP, 'desc')
        .onSnapshot(querySnapshot => {
          const tripsArr = querySnapshot.docs.map((doc, idx) =>
              ( <Trip
                  tripData={doc.data()}
                  tripId={doc.id}
                  handleEditTrip={this.props.handleEditTrip}
                  eventKey={String(idx)}
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

  /** @override */
  render() {
    return (
      <Accordion defaultActiveKey="0">
        {this.state.tripsContainer}
      </Accordion>
    );
  }
}

export default TripsContainer;
