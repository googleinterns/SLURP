import React from 'react';
import app from '../Firebase';
import { getUserUid } from '../AuthUtils';
import ActivityList from './activitylist.js';
import * as ErrorComponents from '../Errors';

import * as DB from '../../constants/database.js';

/**
 * The view activities page. First checks that the current user is authorized to
 * view the current trip (i.e. they are a collaborator for it). If so, the
 * ActivityList component is displayed as normal. If not, an error is displayed
 * instead.
 *
 * @param {Object} props This component expects the following props:
 * - `tripId` {string} The trip's ID. This is sent to the component through the URL.
 */
class ViewActivities extends React.Component {
  /** @inheritdoc */
  constructor(props) {
    super(props);
    this.tripId = props.match.params.tripId;
    this.state = {
      collaborators: undefined,
      isLoading: true,
      error: undefined
    }
  }

  /** @inheritdoc */
  componentDidMount() {
    app.firestore()
        .collection(DB.COLLECTION_TRIPS)
        .doc(this.tripId)
        .get()
        .then(doc => {
          this.setState({
            collaborators: doc.get(DB.TRIPS_COLLABORATORS),
            isLoading: false,
            error: undefined
          });
        })
        .catch(e => {
          this.setState({
            collaborators: undefined,
            isLoading: true,
            error: e
          })
        });
  }

  /** @inheritdoc */
  render() {
    // Case where there was a Firebase error.
    if (this.state.error !== undefined) {
      return <div><ErrorComponents.ErrorGeneral /></div>;
    }
    // Case where the trip details are still being fetched.
    if (this.state.isLoading) {
      // TODO (Issue #25): Please remember to make this a blank div in the
      // deployed build lol.
      return <div>Loading Part 2: Electric Boogaloo</div>;
    }
    // Case where the trip could not be found or the current user is not
    // authorized to view the trip.
    else if (this.state.collaborators === undefined ||
             !this.state.collaborators.includes(getUserUid())) {
      return <div><ErrorComponents.ErrorTripNotFound /></div>;
    }
    else {
      return (
        <div className='activity-page'>
          <ActivityList tripId={this.tripId}/>
        </div>
      );
    }
  }
}

export default ViewActivities;
