import React from 'react';
import Card from 'react-bootstrap/Card';
import * as time from '../Utils/time.js';
import * as DBUTILS from '../../constants/database.js'
import '../../styles/activities.css';
import Accordion from 'react-bootstrap/Accordion';

class Activity extends React.Component {
  /** @inheritdoc */
  render() {
    const activity = this.props.activity;
    return (
      <Card>
      <Accordion.Toggle as={Card.Header} eventKey='0' align='center' >
        {activity['title']}
      </Accordion.Toggle>
      <Accordion.Collapse eventKey='0'>
        <Card.Body>
        <p>start time: {time.timestampToFormatted(activity[DBUTILS.ACTIVITIES_START_TIME])} </p>
        <p>end time: {time.timestampToFormatted(activity[DBUTILS.ACTIVITIES_END_TIME])} </p>
        </Card.Body>
        </Accordion.Collapse>
      </Card>
    );
  }
};

export default Activity;
