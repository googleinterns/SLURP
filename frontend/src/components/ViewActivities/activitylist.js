import React from 'react';
import app from '../Firebase';
import * as activityFns from './activityfns';
import ActivityDay from './activityday';
import Accordion from 'react-bootstrap/Accordion';
import '../../styles/activities.css';

class ActivityList extends React.Component {
  /** @inheritdoc */
  constructor(props) {
    super(props);
    this.state = { days : [], tripId: props.tripId };
  }

  /** @inheritdoc */
  async componentDidMount() {
    if (this.state === null) { return; }
    let tripActivities = await activityFns.getActivityList(this.state.tripId);
    if (tripActivities === null) {
      this.setState({days: null});  
      return;
    } 
    this.setState({days: activityFns.sortByDate(tripActivities)});
  }

  /** @inheritdoc */
  render() {
    if (this.state === null) { return (<div></div>); }
    if (this.state.days === null) {
      return (<p>An error has occurred :(</p> );
    } else if (this.state.days.length == 0) {
      return (<p>Plan your trip here!</p>);
    }
    return (
      <div className="activity-list">
        {this.state.days.map((item, index) => (
          <Accordion defaultActiveKey="1" key={index} className="activity-day-dropdown">
            <ActivityDay date={item[0]} activities={item[1]} />
          </Accordion>
        ))}
      </div>
    );
  }
}

export default ActivityList;
