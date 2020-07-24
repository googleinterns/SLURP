import React from 'react';
import * as time from '../Utils/time.js';
import * as DB from '../../constants/database.js'
import '../../styles/activities.css';
import { getField, writeActivity } from './activityfns.js';
import { Accordion, Button, Card, Col, Form, Row } from 'react-bootstrap';

/**
 * Return a dropdown of all the timezones.
 * 
 * @return {HTML} Dropdown of all the timezones.
 */
function timezonePicker() {
  // TODO: Make this dropdown. (#51)
  return <div></div>
}

/**
 * React component for a single activity. 
 * 
 * @property {Object} props ReactJS props. 
 * @property {ActivityInfo} props.activity The activity to display.
 *    (MUST contain 'id' field with database activity id and 'tripId' field.)
 */
class Activity extends React.Component {
  /** @override */
  constructor(props) {
    super(props);

    this.state = { editing: false };

    // Bind state users/modifiers to `this`.
    this.setEditActivity = this.setEditActivity.bind(this);
    this.finishEditActivity = this.finishEditActivity.bind(this);
    this.displayCard = this.displayCard.bind(this);
    this.editActivity = this.editActivity.bind(this);

    // References. 
    this.editTitleRef = React.createRef();
    this.editStartDateRef = React.createRef();
    this.editEndDateRef = React.createRef();
    this.editStartTimeRef = React.createRef();
    this.editEndTimeRef = React.createRef();
    this.editDescriptionRef = React.createRef();
  }

  /**
   * Edit an activity in the database upon form submission.
   * TODO: Update times as well! This only does the text field forms (#64).
   */
  editActivity() {
    let newVals = {};
    if (this.editTitleRef.current.value !== '') {
      newVals[DB.ACTIVITIES_TITLE] = this.editTitleRef.current.value;
    }
    if (this.editDescriptionRef.current.value !== '') {
      newVals[DB.ACTIVITIES_DESCRIPTION] = this.editDescriptionRef.current.value;
    }
    if (Object.keys(newVals).length !== 0) {
      writeActivity(this.props.activity.tripId, this.props.activity.id, newVals);
    }
  }

  /**
   * Set the activity into editing mode.
   */
  setEditActivity() {
    this.setState({editing: true});
  }

  /**
   * Set the activity into viewing mode.
   * 
   * @param {event} event The form's event.
   */
  finishEditActivity(event) {
    this.setState({editing: false});
    event.preventDefault();
    this.editActivity();
  };

  /**
   * Display the current activity, either in view or display mode.
   */
  displayCard() {
    let activity = this.props.activity;
    if (!this.state.editing) { // View mode.
      return (
        <Card.Body onClick={this.setEditActivity}>
          <p>Start time: {time.timestampToFormatted(activity[DB.ACTIVITIES_START_TIME])} </p>
          <p>End time: {time.timestampToFormatted(activity[DB.ACTIVITIES_END_TIME])} </p>
        </Card.Body>
      );
    } else { // Edit mode.
      return (
        // TODO: Save form. (#48)
        <Form className='activity-editor' onSubmit={this.finishEditActivity}>
          <Form.Group as={Row} controlId='formActivityTitle'>
            <Col sm={2}><Form.Label>Title:</Form.Label></Col>
            <Col><Form.Control type='text' placeholder={activity[DB.ACTIVITIES_TITLE]} ref={this.editTitleRef}/></Col>
          </Form.Group>
          <Form.Group as={Row} controlId='formActivityStartTime'>
            <Col sm={2}><Form.Label>From:</Form.Label></Col>
            <Col sm={4}><Form.Control type='date' label='date' ref={this.editStartDateRef}/></Col>
            <Col sm={2}><Form.Control type='time' label='time' ref={this.editStartTimeRef}/></Col>
            <Col sm={1}>{timezonePicker()}</Col>
          </Form.Group>
          <Form.Group as={Row} controlId='formActivityEndTime'>
            <Col sm={2}><Form.Label>To:</Form.Label></Col>
            <Col sm={4}><Form.Control type='date' label='date' ref={this.editEndDateRef}/></Col>
            <Col sm={2}><Form.Control type='time' label='time' ref={this.editEndTimeRef}/></Col>
            <Col sm={1}>{timezonePicker()}</Col>
          </Form.Group>
          <Form.Group as={Row} controlId='formActivityDescription'>
            <Col sm={2}><Form.Label>Description:</Form.Label></Col>
            <Col><Form.Control type='text' 
              placeholder={getField(activity, DB.ACTIVITIES_DESCRIPTION, 'Add some details!')}
              ref={this.editDescriptionRef} />
            </Col>
          </Form.Group>
          <Button type='submit' className='float-right'>Done!</Button>
        </Form>
      )
    }
  }

  /** @override */
  render() {
    const activity = this.props.activity;
    return (
      <Accordion defaultActiveKey='1'>  
        <Card>
          <Accordion.Toggle as={Card.Header} eventKey='0' align='center'>
            {activity[DB.ACTIVITIES_TITLE]}
          </Accordion.Toggle>
          <Accordion.Collapse eventKey='0' className={'view-activity' + (this.state.editing? ' edit': '')}>
            { this.displayCard() }
          </Accordion.Collapse>
        </Card>
      </Accordion>
    );
  }
};

export default Activity;
