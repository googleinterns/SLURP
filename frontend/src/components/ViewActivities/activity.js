import React from 'react';
import Card from 'react-bootstrap/Card';
import * as time from '../Utils/time.js';
import * as DB from '../../constants/database.js'
import '../../styles/activities.css';
import Accordion from 'react-bootstrap/Accordion';

class Activity extends React.Component {
  /** @inheritdoc */
  render() {
    const activity = this.props.activity;
    return (
      <Accordion defaultActiveKey='1'>  
        <Card>
        <Accordion.Toggle as={Card.Header} eventKey='0' align='center' >
          {activity[DB.ACTIVITIES_TITLE]}
        </Accordion.Toggle>
        <Accordion.Collapse eventKey='0'>
          <Card.Body>
          <p>Start time: {time.timestampToFormatted(activity[DB.ACTIVITIES_START_TIME])} </p>
          <p>End time: {time.timestampToFormatted(activity[DB.ACTIVITIES_END_TIME])} </p>
          </Card.Body>
          </Accordion.Collapse>
        </Card>
      </Accordion>
    );
  }
};

export default Activity;
