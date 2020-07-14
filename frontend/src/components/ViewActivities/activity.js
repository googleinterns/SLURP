import React from 'react';
import * as time from '../Utils/time.js';
import * as DB from '../../constants/database.js'
import '../../styles/activities.css';
import { getField } from './activityfns.js';
import { Accordion, Button, Card, Col, Form, Row } from 'react-bootstrap';

/**
 * Returns a dropdown of all the timezones.
 */
function timezonePicker() {
  // TODO: Make this dropdown. (#51)
  return <div></div>
}

/**
 * A single activity. 
 * 
 * @param {Object} props This component expects the following props:
 * - `activity` {Object} The activity to display.
 */
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
        <Card.Body onClick={this.setEditActivity}>
          <p>Start time: {time.timestampToFormatted(activity[DB.ACTIVITIES_START_TIME])} </p>
          <p>End time: {time.timestampToFormatted(activity[DB.ACTIVITIES_END_TIME])} </p>
        </Card.Body>
      );
    } else { // Edit mode.
      return (
        // TODO: Save form. (#48)
        <Form className="activity-editor" onSubmit={this.finishEditActivity}>
          <Form.Group as={Row} controlId="formActivityTitle">
            <Col sm={2}><Form.Label>Title:</Form.Label></Col>
            <Col><Form.Control type="text" placeholder={activity[DB.ACTIVITIES_TITLE]}/></Col>
          </Form.Group>
          <Form.Group as={Row} controlId="formActivityStartTime">
            <Col sm={2}><Form.Label>From:</Form.Label></Col>
            <Col sm={4}><Form.Control type="date" label="date"/></Col>
            <Col sm={2}><Form.Control type="time" label="time"/></Col>
            <Col sm={1}>{timezonePicker()}</Col>
          </Form.Group>
          <Form.Group as={Row} controlId="formActivityStartTime">
            <Col sm={2}><Form.Label>To:</Form.Label></Col>
            <Col sm={4}><Form.Control type="date" label="date"/></Col>
            <Col sm={2}><Form.Control type="time" label="time"/></Col>
            <Col sm={1}>{timezonePicker()}</Col>
          </Form.Group>
          <Form.Group as={Row} controlId="formActivityTitle">
            <Col sm={2}><Form.Label>Description:</Form.Label></Col>
            <Col><Form.Control type="text" 
              placeholder={getField(activity, DB.ACTIVITIES_DESCRIPTION, "Add some details!") }/>
            </Col>
          </Form.Group>
          <Button type="submit" className="float-right">Done!</Button>
        </Form>
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
          <Accordion.Collapse eventKey='0' className={'view-activity' + (this.state.editing? ' edit': '')}>
            { this.displayCard() }
          </Accordion.Collapse>
        </Card>
      </Accordion>
    );
  }
};

export default Activity;
