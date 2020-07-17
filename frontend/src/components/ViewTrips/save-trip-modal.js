import React from 'react';

import app from '../Firebase';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

import { COLLECTION_TRIPS } from '../../constants/database.js';
import { formatTripData } from '../Utils/filter-input.js';

const db = app.firestore();

/**
 * Returns a Form.Control element with input type 'text' and other props
 * specified by the function parameters.
 *
 * @param {string} defaultText Default text value in the form input.
 * @param {React.RefObject} ref Ref attached to the value inputted in the form.
 * @param {boolean} isAddTripForm True if form is adding new trip, false if
 *     form is editting existing trip.
 * @return {JSX.Element} The Form.Control element.
 */
function createTextFormControl(defaultText, ref, isAddTripForm) {
  if (isAddTripForm) {
    return (
      <Form.Control
        type='text'
        placeholder={defaultText}
        ref={ref}
      />
    );
  }
  return (
    <Form.Control
      type='text'
      defaultValue={defaultText}
      ref={ref}
    />
  );
}

/**
 * Returns a Form.Control element with input type 'date' and other props
 * specified by the function parameters.
 *
 * @param {string} defaultDate Default ISO date string in the form input.
 * @param {React.RefObject} refArr The list of refs attached to the emails
 *     inputted in the form.
 * @return {JSX.Element} The Form.Control element.
 */
function createDateFormControl(defaultDate, ref) {
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
 * @param {string} defaultEmail Default text value in the form input.
 * @param {React.RefObject} ref Ref attached to the value inputted in the form.
 * @param {number} idx Index of the email Form.Control used for key prop.
 * @param {boolean} isAddTripForm True if form is adding new trip, false if
 *     form is editting existing trip.
 * @return {JSX.Element} The Form.Control element.
 */
function createEmailFormControl(defaultEmail, ref, idx, isAddTripForm) {
  if (isAddTripForm) {
    return (
      <Form.Control
        type='email'
        placeholder={defaultEmail}
        ref={ref}
        key={idx}
      />
    );
  }
  return (
    <Form.Control
      type='email'
      defaultValue={defaultEmail}
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
 * @param {!Array<string>} defaultEmailArr Array of the emails to be displayed
 *     in the default form fields.
 * @param {!Array<React.RefObject>} refArr Array of refs attached to the
 *     emails inputted in the form.
 * @param {boolean} isAddTripForm True if form is adding new trip, false if
 *     form is editting existing trip.
 * @return {JSX.Element} The Form.Control elements.
 */
function createMultiFormControl(defaultEmailArr, refArr, isAddTripForm) {
  return (
    <>
      {refArr.map((ref, idx) =>
        createEmailFormControl(defaultEmailArr[idx + 1],
                                 ref, idx, isAddTripForm)
      )}
    </>
  );
}

/**
 * Returns a Form.Group element with components specified by the input args.
 *
 * @param {string} controlId Prop that accessibly wires the nested label and
 *                           input prop.
 * @param {string} formLabel Label/title for the form input.
 * @param {string} inputType Input type of the form.
 * @param {string} defaultVal Default value in the form input.
 * @param {React.RefObject} ref Ref attached to the values inputted in the form.
 * @param {string} subFormText Subtext instructions under a form input.
 * @param {boolean} isAddTripForm True if form is adding new trip, false if
 *     form is editting existing trip.
 * @return {JSX.Element} The Form.Group element.
 */
function createFormGroup(controlId, formLabel, inputType,
                          defaultVal, ref, isAddTripForm) {
  let formControl;
  switch(inputType) {
    case 'text':
      formControl = createTextFormControl(defaultVal, ref, isAddTripForm);
      break;
    case 'date':
      formControl = createDateFormControl(defaultVal, ref);
      break;
    case 'emails':
      formControl = createMultiFormControl(defaultVal, ref, isAddTripForm);
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

/**
 * Component corresponding to the save trips modal.
 *
 * This component acts as a 'pseudo-parent' of the AddTripModal and
 * EditTripModal components. The only differences in the implementation between
 * the two fake components are dervied from the props  `tripid` and
 * `defaultFormObj` (see below). The primary difference between the add and
 * edit trip modals is the former displays placeholder values in the empty form
 * fields whereas the latter displays the current values of the trip in the
 * respective form fields.
 *
 * @param {Object} props These are the props for this component:
 * - show: Boolean that determines if the add trips modal should be displayed.
 * - handleClose: Event handler responsible for closing the add trips modal.
 * - refreshTripsContainer: Handler that refreshes the TripsContainer
 *        component upon trip creation (Remove when fix Issue #62).
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

    this.isAddTripForm = this.props.tripId === null;

    // Create the number of collaborator input box refs as one less than the
    // number of collaborators specified in prop `defaultFormObj` (do not
    // include current user in list)
    //
    // TODO(Issue 71): Give user option to remove themself as collab. from trip.
    const collaboratorsRefArr = [];
    for (let i = 1; i < this.props.defaultFormObj.collaborators.length; i++) {
      collaboratorsRefArr.push(React.createRef())
    }
    this.state = { collaboratorsRefArr: collaboratorsRefArr }
  }

  /** Adds a new Ref element to the state variable `collaboratorsRefArr`. */
  addCollaboratorRef = () => {
    this.setState({ collaboratorsRefArr:
                    this.state.collaboratorsRefArr.concat([React.createRef()]) }
                 );
  }

  /**
   * Creates a new Trip document in firestore with data in `tripData`.
   *
   * @param {Object} tripData Data the new trip document will contain.
   */
  addNewTrip(tripData) {
    db.collection(COLLECTION_TRIPS)
        .add(tripData)
        .then(docRef => {
          console.log('Document written with ID: ', docRef.id);
        })
        .catch(error => {
          console.error('Error adding document: ', error);
        });
  }

  /**
   * Updates an existing Trip document in firestore with data in `tripData`.
   *
   * @param {string} tripId The document ID of the trip that is updated.
   * @param {Object} tripData Data the new trip document will contain.
   */
  updateExistingTrip(tripId, tripData) {
    db.collection(COLLECTION_TRIPS)
        .doc(tripId)
        .set(tripData)
        .then(() => {
          console.log('Document written with ID: ', tripId);
        })
        .catch(error => {
          console.error('Error adding document: ', error);
        });
  }

  /**
   * Formats/cleans the form data and saves the Trip document in firestore.
   */
  saveTrip() {
    const tripData = formatTripData(
        {
          name: this.nameRef.current.value,
          description: this.descriptionRef.current.value,
          destination: this.destinationRef.current.value,
          startDate: this.startDateRef.current.value,
          endDate: this.endDateRef.current.value,
          collaboratorEmails:
              this.state.collaboratorsRefArr.map(ref => ref.current.value)
        }
    );

    if (this.isAddTripForm) {
      this.addNewTrip(tripData);
    } else {
      this.updateExistingTrip(this.props.tripId, tripData);
    }

  }

  /**
   * Handles submission of the form which includes:
   *  - Creation of the trip.
   *  - Refreshing the trips container.
   *  - Closing the modal.
   */
  handleSubmitForm = () => {
    this.saveTrip();
    this.props.refreshTripsContainer();
    this.props.handleClose();
  }

  /** Gets the Modal title based the type of modal (edit or add trip). */
  getModalTitle = () => {
    if (this.isAddTripForm) {
      return 'Add New Trip';
    }
    return 'Edit Trip';
  }

  /** @inheritdoc */
  render() {
    return (
      <Modal show={this.props.show} onHide={this.props.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{this.getModalTitle()}</Modal.Title>
        </Modal.Header>

        <Form>
          <Modal.Body>
            {createFormGroup('tripNameGroup', 'Trip Name', 'text',
                this.props.defaultFormObj.name, this.nameRef,
                this.isAddTripForm)}
            {createFormGroup('tripDescGroup', 'Trip Description', 'text',
                this.props.defaultFormObj.description, this.descriptionRef,
                this.isAddTripForm)}
            {createFormGroup('tripDestGroup', 'Trip Destination', 'text',
                this.props.defaultFormObj.destination, this.destinationRef,
                this.isAddTripForm)}
            {createFormGroup('tripStartDateGroup', 'Start Date', 'date',
                this.props.defaultFormObj.startDate, this.startDateRef,
                this.isAddTripForm)}
            {createFormGroup('tripEndDateGroup', 'End Date', 'date',
                this.props.defaultFormObj.endDate, this.endDateRef,
                this.isAddTripForm)}
            {createFormGroup('tripCollabsGroup', 'Trip Collaborators', 'emails',
                this.props.defaultFormObj.collaborators,
                this.state.collaboratorsRefArr, this.isAddTripForm)}
            <Button onClick={this.addCollaboratorRef}>
              Add Another Collaborator
            </Button>
          </Modal.Body>

          <Modal.Footer>
            <Button variant='secondary' onClick={this.props.handleClose}>
              Cancel
            </Button>
            <Button variant='primary' onClick={this.handleSubmitForm}>
              Save Trip
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    );
  }
};

export default SaveTripModal;
