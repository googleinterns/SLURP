import React from 'react';
import Button from 'react-bootstrap/Button';

import '../../styles/add-trip.css'


/**
 * Component corresponding to add trips modal.
 */
const AddTrip = (props) => {
  const showHideClass = props.show ? "modal-container show" :
                                     "modal-container hide";

  /**
   * Creates a new Trip document, adds it to Firestore, and closes the modal.
   */
  function submitNewTrip() {
    // TODO(Issue #43): Create doc and add to firestore here

    props.handleClose();
  }

  return (
    <div className={showHideClass}>
      <div className="surrounding-modal" onClick={props.handleClose}></div>
      <div className="modal-main">
        {/* TODO(Issue #43): Add trips functionality */}
        <p>Enter the stuff for a new trip: ...</p>
        <Button type='button' onClick={submitNewTrip}>
          Submit New Trip
        </Button>

        <Button type='button' onClick={props.handleClose}>
          Close
        </Button>
      </div>
    </div>
  );
};

export default AddTrip;
