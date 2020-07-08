import React from 'react';
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
import Activity from './activity';
import * as activityFns from './activityfns';
import * as utils from '../Utils/utils.js'

class ActivityDay extends React.Component {
  /** @inheritdoc */
  constructor(props) {
    super(props);
    this.state = {
      date: props.date, 
      activities: Array.from(props.activities).sort(activityFns.compareActivities)
    };
  }

  /** @inheritdoc */
  render() {
    let date = new Date(this.state.date);
    return (
      <Card>
        <Accordion.Toggle as={Card.Header} eventKey="0" align="center" >
          {utils.timestampToDateFormatted(date.getTime())}
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
