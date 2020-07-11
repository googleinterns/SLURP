import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'

import createTrip from './create-new-trip.js'

function createTextFormControl(placeholder, ref) {
  return (
    <Form.Control
      type="text"
      placeholder={placeholder}
      ref={ref}
    />
  );
}

function createFormGroup(controlId, formLabel, inputType,
                                    placeholder, ref, subFormText) {
  let formControl;
  if (inputType === 'text') {
    formControl = createTextFormControl(placeholder, ref)
  } else {
    // TODO(Issue #52): Create diff form inputs for start & end dates
    //                  and collaborator emails.
    console.error('Only text form inputs are implemented as of now');
  }

  return (
    <Form.Group controlId={controlId}>
      <Form.Label>{formLabel}</Form.Label>
        {formControl}
      {/* Temporary instructions until fix Issue #52 */}
      <Form.Text className="text-muted">
        {subFormText}
      </Form.Text>
    </Form.Group>
  )
}

/**
 * Component corresponding to add trips modal.
 *
 * @extends React.Component
 */
class AddTrip extends React.Component {
  /** @inheritdoc */
  constructor(props) {
    super(props);

    this.nameRef = React.createRef();
    this.descriptionRef = React.createRef();
    this.destinationRef = React.createRef();
    this.startDateRef = React.createRef();
    this.endDateRef = React.createRef();
    this.collaboratorsRef = React.createRef();
  }

  /**
   * Upon submission of form, creates a new Trip document, adds it to Firestore,
   * and closes the add trip modal.
   */
  submitNewTrip = () => {
    console.log('New trip submitted.');
    createTrip({name: this.nameRef.current.value,
               description: this.descriptionRef.current.value,
               destination: this.destinationRef.current.value,
               startDate: this.startDateRef.current.value,
               endDate: this.endDateRef.current.value,
               collaborators: this.collaboratorsRef.current.value
    });

    this.props.handleClose();
  }

  /** @inheritdoc */
  render() {
    return (
      <Modal show={this.props.show} onHide={this.props.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Trip</Modal.Title>
        </Modal.Header>

        <Form>
          <Modal.Body>
            {createFormGroup('tripNameGroup', 'Trip Name', 'text',
                             'Enter Trip Name', this.nameRef)}
            {createFormGroup('tripDescripGroup', 'Trip Description', 'text',
                             'Enter Trip Description', this.descriptionRef)}
            {createFormGroup('tripDestGroup', 'Trip Destination', 'text',
                             'Enter Trip Destination', this.destinationRef)}
            {createFormGroup('tripStartDateGroup', 'Start Date', 'text',
                            'Enter Trip Start Date', this.startDateRef,
                            'Enter date in the form: \'mm/dd/yyy\'')}
            {createFormGroup('tripEndDateGroup', 'End Date', 'text',
                          'Enter Trip End Date', this.endDateRef,
                          'Enter date in the form: \'mm/dd/yyy\'')}
            {createFormGroup('tripCollabsGroup', 'Trip Collaborators', 'text',
                           'Enter Collaborator Emails', this.collaboratorsRef,
                           'Enter emails in the form: \'user1@email.com, ...,' +
                           ' userx@email.com\'')}
          </Modal.Body>

          <Modal.Footer>
            <Button variant='secondary' onClick={this.props.handleClose}>
              Close
            </Button>
            <Button variant='primary' type='submit' onClick={this.submitNewTrip}>
              Add Trip
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    );
  }
};

export default AddTrip;
