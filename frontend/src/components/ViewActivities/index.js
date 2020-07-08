import React from 'react';
import ActivityList from './activitylist';

class ViewActivities extends React.Component {
  /** @inheritdoc */
  constructor(props) {
    super(props);
    this.state = {tripId: props.match.params.tripId};
  }

  /** @inheritdoc */
  render() {
    return (
      <div className="activity-page"> 
        <ActivityList tripId={this.state.tripId}/>
      </div>
    )
  }
}

export default ViewActivities;
