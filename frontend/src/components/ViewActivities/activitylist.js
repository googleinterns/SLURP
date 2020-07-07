import React from 'react';
import app from '../Firebase';

import ActivityDay from './activityday';
import Accordion from 'react-bootstrap/Accordion';

const db = app.firestore();

class ActivityList extends React.Component {
  /** @inheritdoc */
  constructor(props) {
    super(props);
    this.state = { days : [], tripId: props.tripId };
  }

  async componentDidMount() {
    if (this.state === null) { return; }
    let tripActivities = await getActivityList(this.state.tripId);
    if (tripActivities === null) {
      this.setState({days: null});  
      return;
    } 
    this.setState({days: sortByDate(tripActivities)});
  }

  render() {
    if (this.state === null) { return (<div></div>); }
    if (this.state.days === null) {
      return (<p>An error has occurred :(</p> );
    } else if (this.state.days.length == 0) {
      return (<p>Plan your trip here!</p>);
    }
    return (
      <div>
        <Accordion defaultActiveKey="0">
        {this.state.days.map((item, index) => (
          <ActivityDay key={index}  date={item[0]} activities={item[1]} />
        ))}
        </Accordion>
      </div>
    );
  }
}

export default ActivityList;
