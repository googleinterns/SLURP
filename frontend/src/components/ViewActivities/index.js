import React from 'react';
import App from '../Firebase';
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
      <div> <ActivityList tripId={this.state.tripId}/></div>
    )
  }
}

export default ViewActivities;
