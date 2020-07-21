import React from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { getField, writeActivity } from './activityfns.js';
import * as DB from '../../constants/database.js'
import { countryList } from '../../constants/countries.js';
import * as time from '../Utils/time.js';
import app from '../Firebase';

const db = app.firestore();

/**
 * The form that's used when the user is editing an activity
 * 
 * @param {Object} props This component expects the following props:
 * - `activity` The activity to display.
 * - `submitFunction` The function to run upon submission to trigger card flip.
 */
class EditActivity extends React.Component {
  /** @inheritdoc */
  constructor(props){
    super(props);

    this.state = {startTz: false, endTz: false};

    // Bind state users/modifiers to `this`.
    this.editActivity = this.editActivity.bind(this);
    this.finishEditActivity = this.finishEditActivity.bind(this);
    this.deleteActivity = this.deleteActivity.bind(this);

    // References. 
    this.editTitleRef = React.createRef();
    this.editStartDateRef = React.createRef();
    this.editEndDateRef = React.createRef();
    this.editStartTimeRef = React.createRef();
    this.editEndTimeRef = React.createRef();
    this.editDescriptionRef = React.createRef();
    this.editStartLocRef = React.createRef();
    this.editEndLocRef = React.createRef();
    this.startTz = React.createRef();
    this.endTz = React.createRef();
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
    if (this.editStartLocRef.current.value !== 'No Change'){
      newVals[DB.ACTIVITIES_START_COUNTRY] = this.editStartLocRef.current.value;
    }
    if (this.editEndLocRef.current.value !== 'No Change'){
      newVals[DB.ACTIVITIES_END_COUNTRY] = this.editEndLocRef.current.value;
    }
    if (Object.keys(newVals).length !== 0) {
      writeActivity(this.props.activity.tripId, this.props.activity.id, newVals);
    }
  }

  /** Runs when the `submit` button on the form is pressed.  */
  finishEditActivity(event) {
    event.preventDefault();
    this.editActivity();
    this.props.submitFunction();
  }

  startTimeTzUpdate = () => { this.setState({startTz : !this.state.startTz})};
  endTimeTzUpdate = () => { this.setState({endTz : !this.state.endTz})};

  /**
   * Returns a dropdown of all the timezones.
   * 
   * @param st either 'start' or 'end' depending on whether the timezone is for the start or end timezone.
   */
  timezonePicker(st) {
    return (
      <div>
      <Form.Control as='select'
        ref={st === 'start' ? this.startTz : this.endTz}
        key={st === 'start' ? this.state.startTz : this.state.endTz}
      >
        {time.timezonesForCountry(this.editStartLocRef).map((item, index) => {
            return (<option key={index}>{item}</option>);
          })}
      </Form.Control>
      </div>
    )
  }
  /**
   * Create a dropdown of all the countries.
   * 
   * @param ref The reference to attach to the dropdown.
   * @param tzchange The function to run to update the time zone picker.
   */
  countriesDropdown(ref, tzref) {
    return (
      <Form.Control as='select' ref={ref} onChange={tzref}>
        <option key='-1'>No Change</option>
        {countryList.map((item, index) => {
          return (
            <option key={index}>{item}</option>
          );
        })}
      </Form.Control>
    );
  }

  /**
   * Delete this activity. 
   * 
   * @returns true if the activity was successfully deleted.
   */
  async deleteActivity() {
    if (window.confirm(`Are you sure you want to delete ${this.props.activity[DB.ACTIVITIES_TITLE]}?`
        + 'This action cannot be undone!')) {
      await db.collection(DB.COLLECTION_TRIPS).doc(this.props.activity.tripId)
        .collection(DB.COLLECTION_ACTIVITIES).doc(this.props.activity.id)
        .delete();
      return true;
    } else {
      return false;
    }
  }

  render() {
    const activity = this.props.activity;
    const TITLEWIDTH = 3;
    const COUNTRYWIDTH = 6;
    const DATEWIDTH = 4;
    const TIMEWIDTH = 2;
    const TZPICKERWIDTH = 3;
    return (
      <Form className='activity-editor' onSubmit={this.finishEditActivity}>
        <Form.Group as={Row} controlId='formActivityTitle'>
          <Col sm={TITLEWIDTH}><Form.Label>Title:</Form.Label></Col>
          <Col><Form.Control type='text' placeholder={activity[DB.ACTIVITIES_TITLE]} ref={this.editTitleRef}/></Col>
        </Form.Group>
        <Form.Group as={Row} controlId='formActivityStartLocation'>
          <Col sm={TITLEWIDTH}><Form.Label>Start Location:</Form.Label></Col>
          <Col sm={COUNTRYWIDTH}>{this.countriesDropdown(this.editStartLocRef, this.startTimeTzUpdate)}</Col>
        </Form.Group>
        <Form.Group as={Row} controlId='formActivityStartLocation'>
          <Col sm={TITLEWIDTH}><Form.Label>End Location:</Form.Label></Col>
          <Col sm={COUNTRYWIDTH}>{this.countriesDropdown(this.editEndLocRef, this.endTimeTzUpdate)}</Col>
        </Form.Group>
        <Form.Group as={Row} controlId='formActivityStartTime'>
          <Col sm={TITLEWIDTH}><Form.Label>From:</Form.Label></Col>
          <Col sm={DATEWIDTH}><Form.Control type='date' label='date' ref={this.editStartDateRef}/></Col>
          <Col sm={TIMEWIDTH}><Form.Control type='time' label='time' ref={this.editStartTimeRef}/></Col>
          <Col sm={TZPICKERWIDTH}>{this.timezonePicker('start')}</Col>
        </Form.Group>
        <Form.Group as={Row} controlId='formActivityEndTime'>
          <Col sm={TITLEWIDTH}><Form.Label>To:</Form.Label></Col>
          <Col sm={DATEWIDTH}><Form.Control type='date' label='date' ref={this.editEndDateRef}/></Col>
          <Col sm={TIMEWIDTH}><Form.Control type='time' label='time' ref={this.editEndTimeRef}/></Col>
          <Col sm={TZPICKERWIDTH}>{this.timezonePicker('end')}</Col>
        </Form.Group>
        <Form.Group as={Row} controlId='formActivityTitle'>
          <Col sm={TITLEWIDTH}><Form.Label>Description:</Form.Label></Col>
          <Col><Form.Control type='text' 
            placeholder={getField(activity, DB.ACTIVITIES_DESCRIPTION, 'Add some details!')}
            ref={this.editDescriptionRef} />
          </Col>
        </Form.Group>
        <Form.Group as='row' controlId='buttons'>
          <Button type='submit' className='float-right'>Done!</Button>
          <Button type='button' onClick={this.deleteActivity}> 
            Delete
          </Button>
        </Form.Group>
      </Form>
    );
  }
}

export default EditActivity;
