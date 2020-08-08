import React from 'react';
import { Col, Form, Row } from 'react-bootstrap';

// This file was written after #87 was created. 
// As a result, some fields and functions may not be used yet. 
const TITLEWIDTH = 2;
const COUNTRYWIDTH = 8;
const TZPICKERWIDTH = 3;

/**
 * Create a Text element Form Group for the editActivity form. 
 * 
 * @param {string} controlId FormGroup's control ID.
 * @param {string} formLabel The label of the field for this FormGroup. 
 * @param {string} placeHolder The input's placeholder. 
 * @param {?React.RefObject} ref The input's reference.
 * @return {JSX.Element} A text element form group.
 */
export function textElementFormGroup(controlId, formLabel, placeHolder, ref) {
  return (
    <Form.Group as={Row} controlId={controlId}>
      <Col sm={TITLEWIDTH}><Form.Label>{formLabel}</Form.Label></Col>
      <Col>
        <Form.Control type='text'
        placeholder={placeHolder}
        ref={ref}/>
      </Col>
    </Form.Group>
  );
}

/**
 * Create a Location Dropdown element Form Group for the editActivity form. 
 * 
 * @param {string} controlId FormGroup's control ID.
 * @param {string} formLabel The label of the field for this FormGroup. 
 * @param {string} dropdown The dropdown. 
 * @return {JSX.Element} A location dropdown form group.
 */
export function locationElementFormGroup(controlId, formLabel, dropdown, show=true) {
  if (!show) { return (<div></div>); }
  return (
    <Form.Group as={Row} controlId={controlId}>
      <Col xs={TITLEWIDTH}><Form.Label>{formLabel}</Form.Label></Col>
      <Col sm={COUNTRYWIDTH}>{dropdown}</Col>
    </Form.Group>
  );
}

/**
 * Create a Form Group for inserting date, time, and timezone for
 * the editActivity form..
 * 
 * @param {string} controlId FormGroup's control ID. 
 * @param {string} formLabel Label of the field for this FormGroup. 
 * @param {?React.RefObject} dateRef Date's reference. 
 * @param {string} dateDefault Default date. 
 * @param {?React.RefObject} timeRef Time's reference. 
 * @param {React.RefObject} timeDefault Default time. 
 * @param {JSX.Element} tzpicker Timezone picker dropdown. 
 * @return {JSX.Element} A FormGroup for date, time, and timezone.  
 */
export function dateTimeTzFormGroup(controlId, formLabel, dateRef,
  dateDefault, timeRef, timeDefault, tzpicker, onChangeDate=null, key=null, show=true) {
  if (!show) {return (<div></div>); }
  return (
  <Form.Group as={Row} controlId={controlId} key={key}>
      <Col sm={TITLEWIDTH}><Form.Label>{formLabel}</Form.Label></Col>
      <Col md="auto">
        <Form.Control 
          type='date' 
          label='date' 
          ref={dateRef} 
          onChange={onChangeDate} 
          defaultValue={dateDefault}
          />
      </Col>
      <Col sm={"auto"}>
        <Form.Control type='time' label='time' ref={timeRef} 
          defaultValue={timeDefault}/>
      </Col>
      <Col sm={TZPICKERWIDTH}>{tzpicker}</Col>
    </Form.Group>
  );
}

/**
 * Create a From Group with a checkbox.
 * 
 * @param {string} controlId FormGroup's control ID. 
 * @param {string} formLabel Label of the field for this FormGroup. 
 * @param {React.RefObject} ref The input's reference.
 * @param {function} onChange The function to call onChange.
 * @param {boolean} defaultValue The default value of the checkbox (true for checked).
 * @return {JSX.Element} A FormGroup with the checkbox.
 */
export function flightCheck(controlId, formLabel, ref, onChange, defaultValue) {
  return (
    <Form.Group as={Row} controlId={controlId}>
      <Col sm={TITLEWIDTH+1}><Form.Label>{formLabel}</Form.Label></Col>
      <Col sm={TITLEWIDTH}> 
      <Form.Control
        type={"checkbox"}
        ref={ref} 
        onChange={onChange}
        defaultChecked={defaultValue}
         />
      </Col>
    </Form.Group>
  )
}
