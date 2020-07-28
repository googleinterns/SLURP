import React from 'react';
import ActivityList from './activitylist.js';

import app from '../Firebase';

import { getUserUid } from '../AuthUtils';
import ActivityList from './activitylist.js';
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
      // TODO (Issue #74): Redirect to an error page instead.
      return (
        <div>
          Oops, looks like something went wrong. Please wait a few minutes and
          try again.
        </div>
      );
    }
    // Case where the trip details are still being fetched.
    if (this.state.isLoading) {
      // TODO (Issue #25): Please remember to make this a blank div in the
      // deployed build lol.
      return <div>Loading Part 2: Electric Boogaloo</div>;
    }
    // Case where the trip could not be found. A field is returned undefined if
    // the trip does not exist, so we check that the retrieved collaborators is
    // undefined.
    else if (this.state.collaborators === undefined) {
      // TODO (Issue #74): Redirect to an error page instead.
      return <div>Sorry, we couldn't find the trip you were looking for.</div>;
    }
    // Case where the current user is not authorized to view the page
    else if (!this.state.collaborators.includes(getUserUid())) {
      // TODO (Issue #74): Redirect to an error page instead.
      return <div>Sorry, you're not authorized to view this trip.</div>;
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
