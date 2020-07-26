import React from 'react';

import app from '../Firebase';
import { Button, Modal, Form }  from 'react-bootstrap';

import * as DB from '../../constants/database.js';
import { formatTripData } from '../Utils/filter-input.js';
import { createFormGroup } from './save-trip-form-elements.js';

const db = app.firestore();

/**
 * {@link TripData} defined originally in `ViewTrips/trip.js`.
 */

/**
 * An object containing the default input data for a SaveTripModal form.
 * @typedef {Object} DefaultFormData
 * @property {string} title The trips's title.
 * @property {string} description A description of the trip.
 * @property {string} destination The general destination of the trip.
 * @property {string} start_date Start date string in the form 'YYYY-MM-DD'.
 * @property {string} end_date End date string in the form 'YYYY-MM-DD'.
 * @property {!string[]} collaborators An array of collaborator emails.
 */

/**
 * Component corresponding to the save trips modal.
 *
 * This component acts as a 'pseudo-parent' of the AddTripModal and
 * EditTripModal components. The only differences in the implementation between
 * the two fake components are dervied from the props  `tripid` and
 * `defaultFormData` (see below). The primary difference between the add and
 * edit trip modals is the former displays placeholder values in the empty form
 * fields whereas the latter displays the current values of the trip in the
 * respective form fields.
 *
 * @property {Object} props These are the props for this component:
 * @property {boolean} props.show Determines if the save trip modal should
 *     be displayed.
 * @property {Function} props.handleClose Event handler responsible for closing
 *     the save trips modal.
 * @property {?string} props.tripId For editting an existing trip, this will
 *     contain the document id associated with the trip. For adding a new trip,
 *     this will be null.
 * @property {?DefaultFormData} props.defaultFormData: Object containing the
 *     default values for the form input text boxes. For adding a new trip, this
 *     will be null.
 * @property {*} props.key: Special React attribute that ensures a new
 *     `SaveTripModal` instance is created whenever this key is updated.
 * @extends React.Component
 */
class SaveTripModal extends React.Component {
  /** @override */
  constructor(props) {
    super(props);

    // Create Refs to reference form input elements
    this.titleRef = React.createRef();
    this.descriptionRef = React.createRef();
    this.destinationRef = React.createRef();
    this.startDateRef = React.createRef();
    this.endDateRef = React.createRef();

    this.isAddTripForm = this.props.tripId === null;

    /** 
     * For edit trips, create the number of collaborator input box refs as one
     * less than the number of collaborators specified in prop `defaultFormData`
     * (do not include current user in list).
     *
     * TODO(Issue #71): Give user option to remove themself as a collaborator
     *                  from current trip.
     */
    const collaboratorsRefArr = [];
    if (this.isAddTripForm) {
      collaboratorsRefArr.push(React.createRef());
    } else {
      const numCollaborators =
          this.props.defaultFormData[DB.TRIPS_COLLABORATORS].length;
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
   * Creates a new Trip document in firestore with the data in `tripData`.
   *
   * @param {!TripData} tripData Data object the new trip document will contain.
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
   * Updates an existing Trip document with id `tripId` in firestore with the
   * data in `tripData`.
   *
   * @param {!string} tripId The document ID of the trip that is updated.
   * @param {!TripData} tripData Data object the new trip document will contain.
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
  saveTrip() {
    const rawTripData = {};
    rawTripData[DB.TRIPS_TITLE] = this.titleRef.current.value;
    rawTripData[DB.TRIPS_DESCRIPTION] = this.descriptionRef.current.value;
    rawTripData[DB.TRIPS_DESTINATION] = this.destinationRef.current.value;
    rawTripData[DB.TRIPS_START_DATE] = this.startDateRef.current.value;
    rawTripData[DB.TRIPS_END_DATE] = this.endDateRef.current.value;
    rawTripData[DB.TRIPS_COLLABORATORS] =
        this.state.collaboratorsRefArr.map(ref => ref.current.value);

    const tripData = formatTripData(rawTripData);

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
  handleSubmitForm = () => {
    this.saveTrip();
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
   * @param {string} field A trip document field (the constants in `database.js`).
   * @return {?string} Default form value for edit trip modal or null for
   *     add trip modals.
   */
  getDefaultFormField = (field) => {
    if (this.isAddTripForm) {
      return null;
    }
    return this.props.defaultFormData[field];
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
