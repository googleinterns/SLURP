import React from 'react';
import app from '../Firebase';
import ActivityList from './activitylist.js';

import * as ROUTES from '../../constants/routes.js';
import * as DB from '../../constants/database.js';

/**
 * The whole view activities page.
 *
 * @param {Object} props This component expects the following props:
 * - `tripId` {string} The trip's ID. This is sent to the component through the URL.
 */
class ViewActivities extends React.Component {
  /** @inheritdoc */
  constructor(props) {
    super(props);
    this.tripId = props.match.params.tripId;
    this.state = { collaborators: undefined }
  }

  /** @inheritdoc */
  componentDidMount() {
    app.firestore()
        .collection(DB.COLLECTION_TRIPS)
        .doc(this.tripId)
        .get()
        .then(doc => {
          this.setState({ collaborators: doc.get(DB.TRIPS_COLLABORATORS) });
        });
  }

  /** @inheritdoc */
  render() {
    return (
      <div className='activity-page'>
        <ActivityList tripId={this.tripId}/>
      </div>
    )
  }
}

export default ViewActivities;
