import React from 'react';

import app from '../Firebase';
import { Button, Modal, Form }  from 'react-bootstrap';

import { COLLECTION_TRIPS } from '../../constants/database.js';
import { formatTripData } from '../Utils/filter-input.js';

const db = app.firestore();

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
 * Returns a Form.Control element with input type 'date' and other fields
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
 * Returns a Form.Control element with input type 'email' and other fields
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
 * @param {string} controlId Prop that accessibly wires the nested label and
 *                           input prop.
 * @param {string} formLabel Label/title for the form input.
 * @param {string} inputType Input type of the form.
 * @param {string} placeholder Text placeholder in the form input.
 * @param {React.RefObject} ref Ref attached to the values inputted in the form.
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
    <Form.Group controlId={controlId}>
      <Form.Label>{formLabel}</Form.Label>
        {formControl}
    </Form.Group>
  )
}

/**
 * Component corresponding to the save trips modal.
 *
 * This component "acts" as a parent of the (non-existent) AddTripModal and
 * EditTripModal components. The only differences in the implementation between
 * the two fake components are dervied from the props `tripid` and
 * `placeholderObj` (see below).
 *
 * @param {Object} props These are the props for this component:
 * - show: Boolean that determines if the save trips modal should be displayed.
 * - handleClose: Handler that closes the save trips modal upon calling.
 * - refreshTripsContainer: Function that handles refreshing the TripsContainer
 *        component upon trip saving (Remove when fix Issue #62).
 * - tripId: For adding a new trip, this will be null. For editting an existing
 *        trip, this will the document id associated with the trip.
 * - placeholderObj: Object containing the placeholder/default values for the
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

    // Create the number of collaborator input box refs as number of
    // collaborators specified in the placeholderObj
    const collaboratorsRefArr = [];
    for (let i = 0; i < this.props.placeholderObj.collaborators.length; i++) {
      collaboratorsRefArr.push(React.createRef())
    }
    this.state = { collaboratorsRefArr: collaboratorsRefArr }
  }

  /** Adds a new Ref element to the state variable `collaboratorsRefArr`. */
  addCollaboratorRef = () => {
    this.setState({ collaboratorsRefArr:
                      this.state.collaboratorsRefArr.concat([React.createRef()])
                  });
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
          console.log("Document written with ID: ", docRef.id);
        })
        .catch(error => {
          console.error("Error adding document: ", error);
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
          console.log("Document written with ID: ", tripId);
        })
        .catch(error => {
          console.error("Error adding document: ", error);
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
              this.state.collaboratorsRefArr.map(ref => ref.current.value),
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
                    this.props.placeholderObj.name, this.nameRef)}
            {createFormGroup('tripDescGroup', 'Trip Description', 'text',
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
