import React from 'react';
import { Col, Form, Row } from 'react-bootstrap';

// This file was written after #87 was created. 
// As a result, some fields and functions may not be used yet. 
const TITLEWIDTH = 3;
const COUNTRYWIDTH = 6;
const DATEWIDTH = 4;
const TIMEWIDTH = 2;
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
 * @return {JSX.Element} a location dropdown form group.
 */
export function locationElementFormGroup(controlId, formLabel, dropdown) {
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
  dateDefault, timeRef, timeDefault, tzpicker) {
  return (
    <Form.Group as={Row} controlId={controlId}>
      <Col sm={TITLEWIDTH}><Form.Label>{formLabel}</Form.Label></Col>
      <Col sm={DATEWIDTH}>
        <Form.Control type='date' label='date' ref={dateRef} defaultValue={dateDefault}/>
      </Col>
      <Col sm={TIMEWIDTH}>
        <Form.Control type='time' label='time' ref={timeRef}
          defaultValue={timeDefault}/>
      </Col>
      <Col sm={TZPICKERWIDTH}>{tzpicker}</Col>
    </Form.Group>
  );
}
