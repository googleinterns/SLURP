import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal'


/**
 * Component corresponding to add trips modal.
 */
const AddTrip = (props) => {
  /**
   * Creates a new Trip document, adds it to Firestore, and closes the modal.
   */
  function submitNewTrip() {
    // TODO(Issue #43): Create doc and add to firestore here

    props.handleClose();
  }

  return (
    <Modal show={props.show} onHide={props.handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add New Trip</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        {/* TODO(Issue #43): Add trips functionality */}
        <p>Enter the stuff for a new trip: ...</p>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={props.handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={submitNewTrip}>
          Submit Trip
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddTrip;
