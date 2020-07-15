import React from 'react';

import Button from 'react-bootstrap/Button';

import app from '../Firebase/';
import Header from '../Header/';
import AddTripModal from './add-trip.js'
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
                   refreshTripsContainer: false,
                   refreshAddTripModal: false
                 };
  }

  /**
   * Flips `refreshTripsContainer` property which causes that TripsContainer
   * component to be reloaded.
   *
   * This allows a trip creator's view trips page to be updated in real time.
   *
   * In the future, the use of refreshTripContainer and the key prop on Trips
   * container should be removed with the addition of real time listening with
   * onShapshot (Issue #62).
   */
  refreshTripsContainer = () => {
    this.setState({ refreshTripsContainer: !this.state.refreshTripsContainer });
  }

  /**
   * Flips `refreshAddTripModal` property which causes that AddTripModal
   * component to be reloaded.
   *
   * This was done to prevent bugs where multiple component input fields would
   * persist from one instance of the modal to the next when view trips page
   * was not refreshed in between.
   */
  refreshAddTripModal = () => {
    this.setState({ refreshAddTripModal: !this.state.refreshAddTripModal });
  }

  /** Property that refreshes and displays add trip page. */
  showAddTripModal = () => {
    this.refreshAddTripModal()
    this.setState({ showModal: true });
  }

  /** Property that sets `showModal` to false --> hides add trip page. */
  hideAddTripModal = () => { this.setState({ showModal: false }); }

  /** @inheritdoc */
  render() {
    return (
      <div className="view-trips-page">
        <Header />
        <AddTripModal
          db={db}
          show={this.state.showModal}
          handleClose={this.hideAddTripModal}
          refreshTripsContainer={this.refreshTripsContainer}
          key={this.state.refreshAddTripModal}
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
