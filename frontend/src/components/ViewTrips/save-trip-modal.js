import React from 'react';

import app from '../Firebase';
import { Button, Modal, Form }  from 'react-bootstrap';

import * as DB from '../../constants/database.js';
import { formatTripData } from '../Utils/filter-input.js';
import { createFormGroup } from './save-trip-form-elements.js';

const db = app.firestore();


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
    this.titleRef = React.createRef();
    this.descriptionRef = React.createRef();
    this.destinationRef = React.createRef();
    this.startDateRef = React.createRef();
    this.endDateRef = React.createRef();

    this.isAddTripForm = this.props.tripId === null;

    // For edit trips, create the number of collaborator input box refs as one
    // less than the number of collaborators specified in prop `defaultFormObj`
    // (do not include current user in list).
    //
    // TODO(Issue #71): Give user option to remove themself as a collaborator
    //                  from current trip.
    const collaboratorsRefArr = [];
    if (this.isAddTripForm) {
      collaboratorsRefArr.push(React.createRef());
    } else {
      const numCollaborators =
          this.props.defaultFormObj[DB.TRIPS_COLLABORATORS].length;
      for (let i = 1; i < numCollaborators; i++) {
        collaboratorsRefArr.push(React.createRef())
      }
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
   * @param {!Object} tripData Data the new trip document will contain.
   */
  addNewTrip(tripData) {
    db.collection(DB.COLLECTION_TRIPS)
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
   * @param {!string} tripId The document ID of the trip that is updated.
   * @param {!Object} tripData Data the new trip document will contain.
   */
  updateExistingTrip(tripId, tripData) {
    db.collection(DB.COLLECTION_TRIPS)
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
  saveTrip = async () => {
    const rawTripData = {
      [DB.TRIPS_TITLE]: this.titleRef.current.value,
      [DB.TRIPS_DESCRIPTION]: this.descriptionRef.current.value,
      [DB.TRIPS_DESTINATION]: this.destinationRef.current.value,
      [DB.TRIPS_START_DATE]: this.startDateRef.current.value,
      [DB.TRIPS_END_DATE]: this.endDateRef.current.value,
      [DB.TRIPS_COLLABORATORS]:
          this.state.collaboratorsRefArr.map(ref => ref.current.value),
    };
    const tripData = await formatTripData(rawTripData);

    if (this.isAddTripForm) {
      this.addNewTrip(tripData);
    } else {
      this.updateExistingTrip(this.props.tripId, tripData);
    }
  }

  /**
   * Handles submission of the form which includes:
   *  - Creation of the trip.
   *  - Closing the modal.
   */
  handleSubmitForm = async () => {
    await this.saveTrip();
    this.props.handleClose();
  }

  /** Gets the Modal title based the type of modal (edit or add trip). */
  getModalTitle = () => {
    if (this.isAddTripForm) {
      return 'Add New Trip';
    }
    return 'Edit Trip';
  }

  /** Returns the default form value for the trip field specified by `field`.
   *
   * @param {!string} field A trip document field
   *     (the constants in `database.js`).
   * @return {?string} Default form value for edit trip modal or null for
   *     add trip modals.
   */
  getDefaultFormField = (field) => {
    if (this.isAddTripForm) {
      return null;
    }
    return this.props.defaultFormObj[field];
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
            {createFormGroup(
                 'tripTitleGroup',                         // controlId
                 'Trip Title',                             // formLabel
                 'text',                                   // inputType
                  this.titleRef,                           // ref
                  'Enter Trip Title',                      // placeholder
                  this.getDefaultFormField(DB.TRIPS_TITLE) // defaultVal
            )}
            {createFormGroup(
                  'tripDescGroup',                               // controlId
                  'Trip Description',                            // formLabel
                  'text',                                        // inputType
                  this.descriptionRef,                           // ref
                  'Enter Trip Description',                      // placeholder
                  this.getDefaultFormField(DB.TRIPS_DESCRIPTION) // defaultVal
            )}
            {createFormGroup(
                  'tripDestGroup',                               // controlId
                  'Trip Destination',                            // formLabel
                  'text',                                        // inputType
                  this.destinationRef,                           // ref
                  'Enter Trip Destination',                      // placeholder
                  this.getDefaultFormField(DB.TRIPS_DESTINATION) // defaultVal
            )}
            {createFormGroup(
                  'tripStartDateGroup',                         // controlId
                  'Start Date',                                 // formLabel
                  'date',                                       // inputType
                  this.startDateRef,                            // ref
                  '',                                           // placeholder
                  this.getDefaultFormField(DB.TRIPS_START_DATE) // defaultVal
            )}
            {createFormGroup(
                  'tripEndDateGroup',                         // controlId
                  'End Date',                                 // formLabel
                  'date',                                     // inputType
                  this.endDateRef,                            // ref
                  '',                                         // placeholder
                  this.getDefaultFormField(DB.TRIPS_END_DATE) // defaultVal
            )}
            {createFormGroup(
                  'tripCollabsGroup',                             // controlId
                  'Trip Collaborators',                           // formLabel
                  'emails',                                       // inputType
                  this.state.collaboratorsRefArr,                 // ref
                  'person@email.xyz',                             // placeholder
                  this.getDefaultFormField(DB.TRIPS_COLLABORATORS) // defaultVal
            )}
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
