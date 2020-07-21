import React from 'react';
import { Button, Form } from 'react-bootstrap';
import { getField, writeActivity, getRefValue } from './activityfns.js';
import * as DB from '../../constants/database.js'
import { countryList } from '../../constants/countries.js';
import * as time from '../Utils/time.js';
import * as formElements from './editActivityFormElements.js';

/**
 * The form that's used when the user is editing an activity.
 * 
 * @param {Object} props This component expects the following props:
 * - `activity` The activity to display.
 * - `submitFunction` The function to run upon submission to trigger card flip.
 */
class EditActivity extends React.Component {
  /** @inheritdoc */
  constructor(props){
    super(props);

    this.state = {startTzRef: false, endTzRef: false};

    // Bind state users/modifiers to `this`.
    this.editActivity = this.editActivity.bind(this);
    this.finishEditActivity = this.finishEditActivity.bind(this);
    this.timezoneDropdown = this.timezoneDropdown.bind(this);

    // References. 
    this.editTitleRef = React.createRef();
    this.editStartDateRef = React.createRef();
    this.editEndDateRef = React.createRef();
    this.editStartTimeRef = React.createRef();
    this.editEndTimeRef = React.createRef();
    this.editDescriptionRef = React.createRef();
    this.editStartLocRef = React.createRef();
    this.editEndLocRef = React.createRef();
    this.editStartTzRef = React.createRef();
    this.editEndTzRef = React.createRef();
  }
  
  /**
   * Edit an activity in the database upon form submission.
   */
  editActivity() {
    const activity = this.props.activity;

    let newVals = {};
    // All the text fields. 
    newVals[DB.ACTIVITIES_TITLE] = 
      getRefValue(this.editTitleRef, '', activity[DB.ACTIVITIES_TITLE])
    newVals[DB.ACTIVITIES_DESCRIPTION] = 
      getRefValue(this.editDescriptionRef, '', activity[DB.ACTIVITIES_DESCRIPTION]);

    newVals[DB.ACTIVITIES_START_COUNTRY] = 
      getRefValue(this.editStartLocRef, 'No Change', activity[DB.ACTIVITIES_START_COUNTRY]);
    newVals[DB.ACTIVITIES_END_COUNTRY] = 
      getRefValue(this.editEndLocRef, 'No Change', activity[DB.ACTIVITIES_END_COUNTRY]);
    
    newVals[DB.ACTIVITIES_START_TZ] = getRefValue(this.editStartTzRef, '', '');
    newVals[DB.ACTIVITIES_END_TZ] = getRefValue(this.editEndTzRef, '', '');

    // Start time fields!
    const startTime = getRefValue(this.editStartTimeRef, '');
    const startDate = getRefValue(this.editStartDateRef, '');
    const startTz = newVals[DB.ACTIVITIES_START_TZ];
    newVals[DB.ACTIVITIES_START_TIME] = time.getFirebaseTime(startTime, startDate, startTz);

    // End time fields!
    const endTime = getRefValue(this.editEndTimeRef, '');
    const endDate = getRefValue(this.editEndDateRef, '');
    const endTz = newVals[DB.ACTIVITIES_END_TZ];
    newVals[DB.ACTIVITIES_END_TIME] = time.getFirebaseTime(endTime, endDate, endTz);

    writeActivity(this.props.activity.tripId, this.props.activity.id, newVals);
  }

  /** Runs when the `submit` button on the form is pressed.  */
  finishEditActivity(event) {
    event.preventDefault();
    this.editActivity();
    this.props.submitFunction();
  }

  // "Flip switch" on timezone dropdown so the dropdown's contents update to the 
  // selected country's timezones. 
  startTimeTzUpdate = () => { this.setState({startTz : !this.state.startTz})};
  endTimeTzUpdate = () => { this.setState({endTz : !this.state.endTz})};

  /**
   * Returns a dropdown of all the timezones.  
   * The dropdown's values change based on the corrresponding country dropdown to
   * reduce scrolling and ensure that the location corresponds to the time zone.
   * 
   * @param st Either 'start' or 'end' depending on whether the 
   * timezone is for the start or end timezone.
   * @param defaultTz The default time zone.
   * @returns HTML dropdown item.
   */
  timezoneDropdown(st, defaultTz) {
    let ref = st === 'start' ? this.editStartLocRef : this.editEndLocRef;
    let dbEntry = st === 'start' ? DB.ACTIVITIES_START_COUNTRY : DB.ACTIVITIES_END_COUNTRY;
    let timezones;
    if (ref.current == null) {
      // If activity[key] DNE, then timezones will just return all tzs anyway
      timezones = time.timezonesForCountry(this.props.activity[dbEntry]);
    } else {
      timezones = time.timezonesForCountry(ref.current.value);
    }

    return (
      <Form.Control as='select'
        ref={st === 'start' ? this.editStartTzRef : this.editEndTzRef}
        key={st === 'start' ? this.state.startTz : this.state.endTz}
        defaultValue={defaultTz}
      >
        {timezones.map((item, index) => {
          return (<option key={index}>{item}</option>);
        })}
      </Form.Control>
    )
  }

  /**
   * Create a dropdown of all the countries. 
   * This dropdown is linked to the corresponding timezone dropdown, 
   * so when the country changes here, the values in the timezone dropdown 
   * change as well. 
   * 
   * @param ref The reference to attach to the dropdown.
   * @param tzref The corresponding time zone reference field. 
   * @param defaultCountry The default country for the dropdown.
   */
  countriesDropdown(ref, tzref, defaultCountry) {
    return (
      <Form.Control as='select' ref={ref} onChange={tzref} defaultValue={defaultCountry}>
        {countryList.map((item, index) => {
          return (<option key={index}>{item}</option>);
        })}
      </Form.Control>
    );
  }


  render() {
    const activity = this.props.activity;
    return (
      <Form className='activity-editor' onSubmit={this.finishEditActivity}>
        {formElements.textElementFormGroup( // TITLE
            'formActivityTitle',          // controlId
            'Title:',                     // formLabel
            activity[DB.ACTIVITIES_TITLE],// placeHolder 
            this.editTitleRef             // ref
          )}
        {formElements.locationElementFormGroup( // START LOCATION
          'formActivityStartLocation', // controlId
          'Start Location:', // formLabel
          this.countriesDropdown(this.editStartLocRef, // defaultValue ref
            this.startTimeTzUpdate, // countriesDropdown tzref
            getField(activity, DB.ACTIVITIES_START_COUNTRY)) // countriesDropdown defaultCountry
          )}
        {formElements.locationElementFormGroup( // END LOCATION
          'formActivityEndLocation', // controlId
          'End Location:', // formLabel
          this.countriesDropdown(this.editEndLocRef, // defaultValue ref
            this.endTimeTzUpdate, // countriesDropdown tzref
            getField(activity, DB.ACTIVITIES_END_COUNTRY)) // countriesDropdown defaultCountry
          )}
        {formElements.dateTimeTzFormGroup( // START TIME
          'formActivityStartTime', // controlId
          'From:', // formLabel
          this.editStartDateRef, // dateRef
          time.getDateBarebones(getField(activity, DB.ACTIVITIES_START_TIME), 
              getField(activity, DB.ACTIVITIES_START_TZ)), // dateDefault 
          this.editStartTimeRef, // timeRef, 
          time.get24hTime(getField(activity, DB.ACTIVITIES_START_TIME), 
              getField(activity, DB.ACTIVITIES_START_TZ)), //timeDefault, 
          this.timezoneDropdown('start') // tzpicker 
          )}
        {formElements.dateTimeTzFormGroup( // END TIME
          'formActivityEndTime', // controlId
          'To:', // formLabel
          this.editEndDateRef, // dateRef
          time.getDateBarebones(getField(activity, DB.ACTIVITIES_END_TIME), 
              getField(activity, DB.ACTIVITIES_END_TZ)), // dateDefault 
          this.editEndTimeRef, // timeRef, 
          time.get24hTime(getField(activity, DB.ACTIVITIES_END_TIME), 
              getField(activity, DB.ACTIVITIES_END_TZ)), //timeDefault, 
          this.timezoneDropdown('end') // tzpicker 
          )}
        {formElements.textElementFormGroup( // DESCRIPTION
            'formActivityDescription', // controlId
            'Description:', // formLabel
            getField(activity, DB.ACTIVITIES_DESCRIPTION, 'Add some details!'), // placeHolder 
            this.editDescriptionRef // ref
          )}
        <Button type='submit' className='float-right'>Done!</Button>
      </Form>
    );
  }
}

export default EditActivity;