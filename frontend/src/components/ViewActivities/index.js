import React from 'react';
import ActivityList from './activitylist.js';

/**
 * The whole view activities page.
 * 
 * @param {Object} props This component expects the following props:
 * - `tripId` {string} The trip's ID. This is sent to the component through the URL. 
 */
class ViewActivities extends React.Component {
  render() {
    return (
      <div className='activity-page'> 
        <ActivityList tripId={this.props.match.params.tripId}/>
      </div>
    )
  }
}

export default ViewActivities;
