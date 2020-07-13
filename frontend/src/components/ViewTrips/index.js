import React from 'react';

import Button from 'react-bootstrap/Button';

import app from '../Firebase/';
import Header from '../Header/';
import AddTrip from './add-trip.js'
import TripsContainer from './trips-container.js';

const db = app.firestore();

/**
 * Temporary hardcoded function that returns the current users email.
 *
 * The hardcoded string was created based on one of the manually created test
 * Trip Documents. This function will be implemented in the user authentication
 * JS module using Firebase's Authentication API.
 *
 * TODO(Issue 16): Remove this function once implemented in authentication
 *                 module.
 * @return Hardcoded user email string.
 */
function getUserEmail() {
  return 'matt.murdock';
}

/**
 * ViewTrips component that defines the page where a user can view and manage
 * their current trips.
 */
class ViewTrips extends React.Component {
  /** @inheritdoc */
  constructor() {
    super();
    this.state = { showModal: false };
  }

  /** Property that sets `showModal` to true --> displays add trip page. */
  showAddTripModal = () => { this.setState({ showModal: true }); }

  /** Property that sets `showModal` to false --> hides add trip page. */
  hideAddTripModal = () => { this.setState({ showModal: false }); }

  /** @inheritdoc */
  render() {
    return (
      <div className="view-trips-page">
        <Header />
        <AddTrip
          show={this.state.showModal}
          handleClose={this.hideAddTripModal}
          userEmail={getUserEmail()} />
        <div className="manage-trips-bar">
          <Button type='button' onClick={this.showAddTripModal}>
            + New Trip
          </Button>
        </div>
        <TripsContainer db={db} userEmail={getUserEmail()} />
      </div>
    );
  }
}

export default ViewTrips;
