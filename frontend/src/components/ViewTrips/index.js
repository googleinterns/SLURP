import React from 'react';

import Button from 'react-bootstrap/Button';

import app from '../Firebase/';
import Header from '../Header/';
import AddTrip from './add-trip.js'
import TripsContainer from './trips-container.js';

const db = app.firestore();

/**
 * ViewTrips component that defines the page where a user can view and manage
 * their current trips.
 */
class ViewTrips extends React.Component {
  /** @inheritdoc */
  constructor() {
    super();
    this.state = { showModal: false,
                   refreshTripsContainer: false };
  }

  refreshTripsContainer = () => {
    this.setState({ refreshTripsContainer: !this.state.refreshTripsContainer });
  }

  /** Property that sets `showModal` to true --> displays add trip page. */
  showAddTripModal = () => { this.setState({ showModal: true }); }

  /** Property that sets `showModal` to false --> hides add trip page. */
  hideAddTripModal = () => {
    this.setState({ showModal: false });
    this.refreshTripsContainer();
  }

  /** @inheritdoc */
  render() {
    return (
      <div className="view-trips-page">
        <Header />
        <AddTrip
          db={db}
          show={this.state.showModal}
          handleClose={this.hideAddTripModal}
        />
        <div className="manage-trips-bar">
          <Button type='button' onClick={this.showAddTripModal}>
            + New Trip
          </Button>
        </div>
        <TripsContainer
          db={db}
          key={this.state.refreshTripsContainer}
        />
      </div>
    );
  }
}

export default ViewTrips;
