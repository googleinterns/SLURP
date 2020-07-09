import React from 'react';
import ActivityList from './activitylist.js';

class ViewActivities extends React.Component {
  /** @inheritdoc */
  render() {
    return (
      <div className='activity-page'> 
        <ActivityList tripId={this.props.match.params.tripId}/>
      </div>
    )
  }
}

export default ViewActivities;
