import React from 'react';

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

import createTrip from './create-new-trip.js';

/**
 * Returns a Form.Control element with input type 'text' and other props
 * specified by the function parameters.
 *
 * @param {string} defaultVal Text default value in the form input
 * @param {React.RefObject} ref Ref attached to the value inputted in the form.
 * @param {boolean} isNewTripForm True if form is adding new trip, false if
 *     form is editting existing trip.
 * @return {JSX.Element} The Form.Control element.
 */
function createTextFormControl(defaultVal, ref, isNewTripForm) {
  if (isNewTripForm) {
    return (
      <Form.Control
        type="text"
        placeholder={defaultVal}
        ref={ref}
      />
    );
  }
  return (
    <Form.Control
      type="text"
      defaultValue={defaultVal}
      ref={ref}
    />
  );
}

/**
 * Returns a Form.Control element with input type 'date' and other props
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
 * Returns a Form.Control element with input type 'email' and other props
 * specified by the function parameters.
 *
 * @param {string} defaultVal Text default value in the form input
 * @param {React.RefObject} ref Ref attached to the value inputted in the form.
 * @param {number} idx Index of the email Form.Control used for key prop.
 * @param {boolean} isNewTripForm True if form is adding new trip, false if
 *     form is editting existing trip.
 * @return {JSX.Element} The Form.Control element.
 */
function createEmailFormControl(defaultVal, ref, idx, isNewTripForm) {
  if (isNewTripForm) {
    return (
      <Form.Control
        type="email"
        placeholder={defaultVal}
        ref={ref}
        key={idx}
      />
    );
  }
  return (
    <Form.Control
      type="email"
      defaultValue={defaultVal}
      ref={ref}
      key={idx}
    />
  );
}

/**
 * Returns multiple Form.Control elements with input type 'email' and other
 * props specified by the function parameters.
 *
 * TODO(Issue #67): Email verification before submitting the form.
 *
 * @param {string} defaultVal Text placehold in the form input
 * @param {React.RefObject} refArr The list of refs attached to the emails
 *     inputted in the form.
 * @param {boolean} isNewTripForm True if form is adding new trip, false if
 *     form is editting existing trip.
 * @return {JSX.Element} The Form.Control element.
 */
function createMultiFormControl(defaultVal, refArr, isNewTripForm) {
  return (
    <>
      {refArr.map((ref, idx) =>
        createEmailFormControl(defaultVal, ref, idx, isNewTripForm)
      )}
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
 * @param {string} defaultVal Text default value in the form input.
 * @param {React.RefObject} ref Ref attatched to the valued inputted in the form.
 * @param {string} subFormText Subtext instructions under a form input.
 * @param {boolean} isNewTripForm True if form is adding new trip, false if
 *     form is editting existing trip.
 * @return {JSX.Element} The Form.Group element.
 */
function createFormGroup(controlId, formLabel, inputType,
                          defaultVal, ref, isNewTripForm) {
  let formControl;
  switch(inputType) {
    case 'text':
      formControl = createTextFormControl(defaultVal, ref, isNewTripForm);
      break;
    case 'date':
      formControl = createDateFormControl(defaultVal, ref);
      break;
    case 'emails':
      formControl = createMultiFormControl(defaultVal, ref, isNewTripForm);
      break;
    default:
      console.error('There should be no other input type')
  }

  return (
    <>
      <Form.Label>{formLabel}</Form.Label>
      <Form.Group controlId={controlId}>
          {formControl}
      </Form.Group>
    </>
  )
}

/**
 * Component corresponding to the save trips modal.
 *
 * This component "acts" as a parent of the (non-existant) AddTripModal and
 * EditTripModal components. The only differences in the implementation between
 * the two fake components are dervied from the props `title`, `tripid`, and
 * `defaultFormObj` (see below).
 *
 * @param {Object} props These are the props for this component:
 * - db: Firestore database instance.
 * - show: Boolean that determines if the add trips modal should be displayed.
 * - handleClose: Event handler responsible for closing the add trips modal.
 * - refreshTripsContainer: Handler that refreshes the TripsContainer
 *        component upon trip creation (Remove when fix Issue #62).
 * - title: The title of the modal.
 * - tripId: For adding a new trip, this will be null. For editting an existing
 *        trip, this will the document id associated with the trip.
 * - defaultFormObj: Object containing the placeholder/default values for the
 *        form input text boxes.
 * - key: Special React attribute that ensures a new AddTripModal instance is
 *        created whenever this key is updated
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
    // collaborators specified in prop `defaultFormObj`
    const collaboratorsRefArr = [];
    for (let i = 0; i < this.props.defaultFormObj.collaborators.length; i++) {
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
    createTrip(this.props.db, this.props.tripId,
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
    const isNewTripForm = this.props.tripId === null;

    return (
      <Modal show={this.props.show} onHide={this.props.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{this.props.title}</Modal.Title>
        </Modal.Header>

        <Form>
          <Modal.Body>
            {createFormGroup('tripNameGroup', 'Trip Name', 'text',
                this.props.defaultFormObj.name, this.nameRef, isNewTripForm)}
            {createFormGroup('tripDescripGroup', 'Trip Description', 'text',
                this.props.defaultFormObj.description, this.descriptionRef,
                isNewTripForm)}
            {createFormGroup('tripDestGroup', 'Trip Destination', 'text',
                this.props.defaultFormObj.destination, this.destinationRef,
                isNewTripForm)}
            {createFormGroup('tripStartDateGroup', 'Start Date', 'date',
                this.props.defaultFormObj.startDate, this.startDateRef,
                isNewTripForm)}
            {createFormGroup('tripEndDateGroup', 'End Date', 'date',
                this.props.defaultFormObj.endDate, this.endDateRef,
                isNewTripForm)}
            {createFormGroup('tripCollabsGroup', 'Trip Collaborators', 'emails',
                this.props.defaultFormObj.collaborators,
                this.state.collaboratorsRefArr, isNewTripForm)}
            <Button onClick={this.addCollaboratorRef}>
              Add Another Collaborator
            </Button>
          </Modal.Body>

          <Modal.Footer>
            <Button variant='secondary' onClick={this.props.handleClose}>
              Close
            </Button>
            <Button variant='primary' onClick={this.handleCreateNewTrip}>
              Save Trip
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    );
  }
};

export default SaveTripModal;
