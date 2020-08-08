import React from 'react';

import app from '../Firebase/';
import Accordion from 'react-bootstrap/Accordion';

import authUtils from '../AuthUtils';
import * as DB from '../../constants/database.js';
import Trip from './trip.js';
import { getCollaboratorField } from './trip-utils.js';
import TripView from '../../constants/trip-view';

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
 * @property {TripView} props.tripView The current user's trips page view.
 * @extends React.Component
 */
class TripsContainer extends React.Component {
  /**
   * - `tripsContainer` holds the current trips to be displayed on the
   * view trips page.
   * - `...Trips` holds the trips where the user is a collaborator of that
   * type (e.g. accepted trips holds all trips where user uid is contained
   * within the field `accepted_collaborator_uid_arr`)
   * - `tripsArrsUpdated` determines whether or not `tripsContainer` should
   * be updated in `componentDidUpdate` based on new trip data pulled from the
   * listeners created in `componentDidMount`
   *
   * @override
   */
  constructor(props) {
    super(props);
    this.state = { tripsContainer: [],
                   acceptedTrips: [],
                   pendingTrips: [],
                   rejectedTrips: [],
                   tripArrsUpdated: false };
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
  componentDidMount() {
    const curUserUid = authUtils.getCurUserUid();
    const tripViewArr = [TripView.ACTIVE, TripView.PENDING, TripView.REJECTED];

    for (let tripView of tripViewArr) {
      const collaboratorField = getCollaboratorField(tripView);
      const tripViewTripsState = tripView === TripView.ACTIVE ? 'acceptedTrips' :
                                 tripView === TripView.PENDING ? 'pendingTrips' :
                                                                 'rejectedTrips';

      db.collection(DB.COLLECTION_TRIPS)
          .where(collaboratorField, 'array-contains', curUserUid)
          .orderBy(DB.TRIPS_UPDATE_TIMESTAMP, 'desc')
          .onSnapshot(querySnapshot => {
            const tripsArr = querySnapshot.docs.map((doc, idx) =>
                ( <Trip
                    tripData={doc.data()}
                    tripId={doc.id}
                    handleEditTrip={this.props.handleEditTrip}
                    eventKey={String(idx)} // Event key must be string
                    key={doc.id}
                  />
                )
            );

            this.setState({ [tripViewTripsState]: tripsArr,
                            tripArrsUpdated: true
                          });
          }, (error) => {
            const errorElement = getErrorElement(error);
            this.setState({ tripsContainer: errorElement });
          });
    }
  }

  // Checks to make sure tripsContainer does not contain error element and
  // that the tripView state has changed since last update.
  /**
   * Updates `tripContainer` state if the following conditions are met:
   * - The trips query did not produce an error
   * - The trip view (tab) changed  OR  one of the trip array states
   * (e.g. acceptedTrips state) was updated from the listeners created in
   * `componentDidMount`.
   *
   * @param {Object} prevProps The components props prior to the current update.
   * @override
   */
  componentDidUpdate(prevProps) {
    const tripsQuerySuccessful = Array.isArray(this.state.tripsContainer);
    let tripViewChanged = true;
    if (prevProps !== undefined) {
      tripViewChanged = prevProps.tripView !== this.props.tripView;
    }

    if (tripsQuerySuccessful && (tripViewChanged || this.state.tripArrsUpdated)) {
      switch(this.props.tripView) {
        case TripView.ACTIVE:
          this.setState({ tripsContainer: this.state.acceptedTrips });
          break;
        case TripView.PENDING:
          this.setState({ tripsContainer: this.state.pendingTrips });
          break;
        case TripView.REJECTED:
          this.setState({ tripsContainer: this.state.rejectedTrips });
          break;
        default:
          console.error(`Trip view of ${this.props.tripView} was unexpected.
                          Setting trips container to include accepted trips.`);
          this.setState({ tripsContainer: this.state.acceptedTrips });
      }

      this.setState({ tripArrsUpdated: false });
    }
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
