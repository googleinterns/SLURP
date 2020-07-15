import React from 'react';

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

import createTrip from './create-new-trip.js';

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
 * Returns a Form.Control element with input type 'text' and other fields
 * specified by the function parameters.
 *
 * @param {React.RefObject} refArr The list of refs attached to the emails
 *     inputted in the form.
 * @return {JSX.Element} The Form.Control element.
 */
function createDateFormControl(defaultValue, ref) {
  return (
    <Form.Control
      type="date"
      ref={ref}
      defaultValue={defaultValue}
    />
  );
}

/**
 * Returns a Form.Control element with input type 'text' and other fields
 * specified by the function parameters.
 *
 * TODO(Issue #67): Email verification before submitting the form.
 *
 * @param {string} placeholder Text placehold in the form input
 * @param {React.RefObject} refArr The list of refs attached to the emails
 *     inputted in the form.
 * @return {JSX.Element} The Form.Control element.
 */
function createMultiFormControl(placeholder, refArr) {
  return (
    <>
      {refArr.map((ref, idx) => {
        return (
          <Form.Control
            type="email"
            placeholder={placeholder}
            ref={ref}
            key={idx}
          />
        );
      })}
    </>
  );
}

/**
 * Returns a Form.Group element with components specified by the input args.
 *
 * @param {string} controlId prop that accessibly wires the nested label and
 *                           input prop.
 * @param {string} formLabel Label/title for the form input.
 * @param {string} inputType Input type of the form.
 * @param {string} placeholder Text placeholder in the form input.
 * @param {React.RefObject} ref Ref attatched to the valued inputted in the form.
 * @param {string} subFormText Subtext instructions under a form input.
 * @return {JSX.Element} The Form.Group element.
 */
function createFormGroup(controlId, formLabel, inputType, placeholder, ref) {
  let formControl;
  switch(inputType) {
    case 'text':
      formControl = createTextFormControl(placeholder, ref);
      break;
    case 'date':
      formControl = createDateFormControl(placeholder, ref);
      break;
    case 'emails':
      formControl = createMultiFormControl(placeholder, ref);
      break;
    default:
      console.error('There should be no other input type')
  }

  return (
    <>
      <Form.Label>{formLabel}</Form.Label>
      <Form.Group controlId={controlId}>
          {formControl}
        {/* Temporary instructions until fix Issue #52 */}
      </Form.Group>
    </>
  )
}

/**
 * Component corresponding to the save trips modal.
 *
 * This component acts as a parent comonent of the AddTripModal and
 * EditTripModal components. The only difference between the two is the prop
 * `placeholderObj` that is passed in containing the default values for the
 * form input boxes.
 *
 * @param {Object} props These are the props for this component:
 * - db: Firestore database instance.
 * - show: Boolean that determines if the add trips modal should be displayed.
 * - handleClose: The function that handles closing the add trips modal.
 * - refreshTripsContainer: Function that handles refreshing the TripsContainer
 *        component upon trip creation (Remove when fix Issue #62).
 * - key: Special React attribute that ensures a new AddTripModal instance is
 *        created whenever this key is updated
 * - placeholderObj: ...
 *
 * @extends React.Component
 */
class SaveTripModal extends React.Component {
  /** @inheritdoc */
  constructor(props) {
    super(props);

    // Create Refs to reference form input elements
    this.nameRef = React.createRef();
    this.descriptionRef = React.createRef();
    this.destinationRef = React.createRef();
    this.startDateRef = React.createRef();
    this.endDateRef = React.createRef();

    // Create the number of collaborator input box refs as number of
    // collaborators specified in the placeholderObj
    const collaboratorsRefArr = [];
    for (let i = 0; i < this.props.placeholderObj.collaborators.length; i++) {
      collaboratorsRefArr.push(React.createRef())
    }
    this.state = { collaboratorsRefArr: collaboratorsRefArr }
  }

  addCollaboratorRef = () => {
    this.setState({ collaboratorsRefArr:
                    this.state.collaboratorsRefArr.concat([React.createRef()]) }
                 );
  }

  /**
   * Upon submission of the form, a new Trip document is created and the add
   * trip modal is closed.
   *
   * @param e Event object corresponding to (add trip) submit button click.
   */
  handleCreateNewTrip = (e) => {
    e.preventDefault();
    createTrip(this.props.db,
        {
          name: this.nameRef.current.value,
          description: this.descriptionRef.current.value,
          destination: this.destinationRef.current.value,
          startDate: this.startDateRef.current.value,
          endDate: this.endDateRef.current.value,
          collaboratorEmails:
              this.state.collaboratorsRefArr.map(ref => ref.current.value)
        });

    this.props.refreshTripsContainer();
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
                    this.props.placeholderObj.name, this.nameRef)}
            {createFormGroup('tripDescripGroup', 'Trip Description', 'text',
                    this.props.placeholderObj.description, this.descriptionRef)}
            {createFormGroup('tripDestGroup', 'Trip Destination', 'text',
                    this.props.placeholderObj.destination, this.destinationRef)}
            {createFormGroup('tripStartDateGroup', 'Start Date', 'date',
                    this.props.placeholderObj.startDate, this.startDateRef)}
            {createFormGroup('tripEndDateGroup', 'End Date', 'date',
                    this.props.placeholderObj.endDate, this.endDateRef)}
            {createFormGroup('tripCollabsGroup', 'Trip Collaborators', 'emails',
                    this.props.placeholderObj.collaborators,
                    this.state.collaboratorsRefArr)}
            <Button onClick={this.addCollaboratorRef}>
              Add Another Collaborator
            </Button>
          </Modal.Body>

          <Modal.Footer>
            <Button variant='secondary' onClick={this.props.handleClose}>
              Close
            </Button>
            <Button variant='primary' onClick={this.handleCreateNewTrip}>
              Add Trip
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    );
  }
};

export default SaveTripModal;
