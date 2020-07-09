import React from 'react';
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
import Activity from './activity.js';
import * as activityFns from './activityfns.js';
import * as utils from '../Utils/utils.js'

class ActivityDay extends React.Component {
  /** @inheritdoc */
  render() {
    const sortedActivities = 
        Array.from(this.props.activities).sort(activityFns.compareActivities);
    const date = new Date(this.props.date);
    const id = date.getTime();
    return (
      <Card>
        <Accordion.Toggle as={Card.Header} eventKey='0' align='center'>
          {utils.timestampToDateFormatted(date.getTime())}
        </Accordion.Toggle>
        <Accordion.Collapse eventKey='0'>
          <Card.Body>
            {sortedActivities.map((activity, index) => (
            <Activity activity={activity} key={index + id}/>
            ))}
          </Card.Body>
        </Accordion.Collapse>
      </Card>
    );
  }
}

export default ActivityDay;
