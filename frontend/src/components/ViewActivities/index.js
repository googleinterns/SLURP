import React from 'react';
import ActivityList from './activitylist.js';

/**
 * React component for the whole 'view activities' page.
 * 
 * @property {Object} props ReactJS props. 
 * @property {ActivityInfo} props.tripId This is sent to the component through the URL.
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
