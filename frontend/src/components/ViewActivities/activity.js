import React from 'react';
import Card from 'react-bootstrap/Card';
import * as time from '../Utils/time.js';
import * as DB from '../../constants/database.js'
import '../../styles/activities.css';
import Accordion from 'react-bootstrap/Accordion';

class Activity extends React.Component {
  /** {@inheritdoc} */
  constructor(props) {
    super(props);

    this.state = { editing: false };

    // Bind state users/modifiers to `this`.
    this.setEditActivity = this.setEditActivity.bind(this);
    this.finishEditActivity = this.finishEditActivity.bind(this);
    this.displayCard = this.displayCard.bind(this);
  }

  /**
   * Set the activity into editing mode.
   */
  setEditActivity() {
    this.setState({editing: true});
  }

  /**
   * Set the activity into viewing mode.
   */
  finishEditActivity() { 
    this.setState({editing: false});
  }

  /**
   * Display the current activity, either in view or display mode.
   */
  displayCard() {
    let activity = this.props.activity;
    if (!this.state.editing) { // View mode.
      return (
        <Card.Body onClick={this.setEditActivity} className="view-activity.view">
        <p>Start time: {time.timestampToFormatted(activity[DB.ACTIVITIES_START_TIME])} </p>
        <p>End time: {time.timestampToFormatted(activity[DB.ACTIVITIES_END_TIME])} </p>
        </Card.Body>
      );
    } else { // Edit mode.
      return (
        <button onClick={this.finishEditActivity} className="view-activity.edit"> button </button>
      )
    }
  }

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
            { this.displayCard() }
          </Accordion.Collapse>
        </Card>
      </Accordion>
    );
  }
};

export default Activity;
