import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'

import createTrip from './create-new-trip.js'

/**
 * Returns a Form.Control element with input type 'text' and other fields
 * specified by the function parameters.
 *
 * @param {string} placeholder Text placehold in the form input
 * @param {React.RefObject} ref Ref attached to the value inputted in the form.
 * @return {JSX.Element} The Form.Control element.
 */
function createTextFormControl(placeholder, ref) {
  return (
    <Form.Control
      type="text"
      placeholder={placeholder}
      ref={ref}
    />
  );
}

/**
 * Returns a Form.Group element with components specified by the input args.
 *
 * @param {string} controlId Prop that accessibly wires the nested label and
 *                           input prop.
 * @param {string} formLabel Label/title for the form input.
 * @param {string} inputType Input type of the form.
 * @param {string} placeholder Text placeholder in the form input.
 * @param {React.RefObject} ref Ref attached to the values inputted in the form.
 * @param {string} subFormText Subtext instructions under a form input.
 * @return {JSX.Element} The Form.Group element.
 */
function createFormGroup(controlId, formLabel, inputType,
                                    placeholder, ref, subFormText = '') {
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
 * @param {Object} props These are the props for this component:
 * - show: Boolean that determines if the add trips modal should be displayed.
 * - handleClose: The function that handles closing the add trips modal.
 * - userEmail: The current user's email.
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
   * Upon submission of the form, a new Trip document is created and the add
   * trip modal is closed.
   *
   * TODO(Merge PR #54): Remove console.log statment.
   */
  handleSubmitNewTrip = () => {
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
            {createFormGroup('tripDescGroup', 'Trip Description', 'text',
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
            <Button variant='primary' onClick={this.handleSubmitNewTrip}>
              Add Trip
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    );
  }
};

export default AddTrip;
