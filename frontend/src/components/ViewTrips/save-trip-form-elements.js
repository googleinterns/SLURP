import React from 'react';

import { Form }  from 'react-bootstrap';

/**
 * Returns a Form.Control element with input type 'text' and other props
 * specified by the function parameters.
 *
 * @param {React.RefObject} ref Ref attached to the value inputted in the form.
 * @param {!string} placeholder Placeholder text value in the form input.
 * @param {?string} defaultText Optional default text value in the form input.
 *     Null if no default text.
 * @return {JSX.Element} The Form.Control element.
 */
function createTextFormControl(ref, placeholder, defaultText) {
  return (
    <Form.Control
      type='text'
      placeholder={placeholder}
      defaultValue={defaultText}
      ref={ref}
    />
  );
}

/**
 * Returns a Form.Control element with input type 'date' and other props
 * specified by the function parameters.
 *
 * @param {React.RefObject} ref Ref attached to the date inputted in the form.
 * @param {?string} defaultDate Optional default ISO date string placed in the
 *     form input. Null if no default date.
 * @return {JSX.Element} The Form.Control element.
 */
function createDateFormControl(ref, defaultDate) {
  return (
    <Form.Control
      type='date'
      ref={ref}
      defaultValue={defaultDate}
    />
  );
}

/**
 * Returns a Form.Control element with input type 'email' and other props
 * specified by the function parameters.
 *
 * @param {React.RefObject} ref Ref attached to the value inputted in the form.
 * @param {number} idx Index of the email Form.Control used for key prop.
 * @param {!string} placeholder Placeholder text value in the form input.
 * @param {?Array<!string>} defaultEmailArr Array of the emails to be displayed
 *     in the default form fields. Null if no default emails.
 * @return {JSX.Element} The Form.Control element.
 */
function createEmailFormControl(ref, idx, placeholder, defaultEmailArr) {
  if (defaultEmailArr === null) {
    return (
      <Form.Control
        type='email'
        placeholder={placeholder}
        ref={ref}
        key={idx}
      />
    );
  }
  return (
    <Form.Control
      type='email'
      placeholder={placeholder}
      defaultValue={defaultEmailArr[idx + 1]}
      ref={ref}
      key={idx}
    />
  );
}

/**
 * Returns multiple Form.Control elements with input type 'email' and other
 * props specified by the function parameters.
 *
 * One is added to the index of the emails show in order to display all
 * collaborators except the current user.
 *
 * TODO(Issue #67): Email verification before submitting the form.
 *
 * TODO(Issue #72): More intuitive remove collaborator when !`isAddTripForm`.
 *
 * @param {!Array<React.RefObject>} refArr Array of refs attached to the
 *     emails inputted in the form.
 * @param {boolean} isAddTripForm True if form is adding new trip, false if
 *     form is editting existing trip.
 * @param {!string} placeholder Placeholder text value in the form input.
 * @param {?Array<!string>} defaultEmailArr Array of the emails to be displayed
 *     in the default form fields.
 * @return {JSX.Element} The Form.Control elements.
 */
function createMultiFormControl(refArr, placeholder, defaultEmailArr) {
  return (
    <>
      {refArr.map((ref, idx) =>
        createEmailFormControl(ref, idx, placeholder, defaultEmailArr)
      )}
    </>
  );
}

/**
 * Returns a Form.Group element with components specified by the input args.
 *
 * @param {!string} controlId Prop that accessibly wires the nested label and
 *                           input prop.
 * @param {!string} formLabel Label/title for the form input.
 * @param {!string} inputType Input type of the form.
 * @param {!React.RefObject} ref Ref attached to the values inputted in the form.
 * @param {!string} placeholder Placeholder text value in the form input.
 * @param {?string|?Array<!string>} defaultVal Default value in the form input.
 * @return {JSX.Element} The Form.Group element.
 */
export function createFormGroup(controlId, formLabel, inputType,
                          ref, placeholder, defaultVal) {
  let formControl;
  switch(inputType) {
    case 'text':
      formControl = createTextFormControl(ref, placeholder, defaultVal);
      break;
    case 'date':
      formControl = createDateFormControl(ref, defaultVal);
      break;
    case 'emails':
      formControl = createMultiFormControl(ref, placeholder, defaultVal);
      break;
    default:
      console.error('There should be no other input type')
  }

  return (
    <Form.Group controlId={controlId}>
      <Form.Label>{formLabel}</Form.Label>
      {formControl}
    </Form.Group>
  )
}
