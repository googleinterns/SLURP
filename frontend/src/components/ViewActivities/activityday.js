import React from 'react';
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';

import Activity from './activity';
import compareActivities from './activityfns';

class ActivityDay extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date: props.date, 
      activities: Array.from(props.activities).sort(compareActivities)
    };
  }

  render() {
    let id = new Date(this.state.date).getTime();
    return (
      <Card>
        <Accordion.Toggle as={Card.Header} eventKey="0">
          {this.state.date}
        </Accordion.Toggle>
        <Accordion.Collapse eventKey="0">
          <Card.Body>
            {this.state.activities.map((activity, index) => (
            <Activity activity={activity} key={index + this.state.date}/>
            ))}
          </Card.Body>
        </Accordion.Collapse>
      </Card>
    );
  }
}

export default ActivityDay;
