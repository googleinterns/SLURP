import React from 'react';

import Button from 'react-bootstrap/Button';

import Header from '../Header/';
import SaveTripModal from './save-trip-modal.js'
import TripsContainer from './trips-container.js';
import TripViews from '../../constants/trip-views.js';

/**
 * {@link RawTripData} defined originally in `ViewTrips/save-trip-modal.js`.
 */

/**
 * ViewTrips component that defines the page where a user can view and manage
 * their current trips.
 */
class ViewTrips extends React.Component {
  /** @override */
  constructor() {
    super();
    this.state = { showModal: false,
                   refreshSaveTripModal: false,
                   tripId: null,
                   defaultFormData: null,
                   tripView: TripViews.ACTIVE,
                 };
  }

  /**
   * Handler that updates the `tripView` state.
   *
   * @param {TripViews} tripView The new trip view state.
   */
  changeTripView = (tripView) => {
    this.setState({ tripView: tripView });
  }

  /**
   * Handler that flips `refreshSaveTripModal` property which causes that
   * save/edit trip component to be reloaded.
   *
   * This was done to prevent bugs where multiple component input fields would
   * persist from one instance of the modal to the next when view trips page
   * was not refreshed in between.
   */
  refreshSaveTripModal = () => {
    this.setState({ refreshSaveTripModal: !this.state.refreshSaveTripModal });
  }

  /** Handler that hides the add/edit trip page. */
  hideSaveTripModal = () => { this.setState({ showModal: false }); }

  /** Handler that refreshes and displays the add/edit trip page. */
  showSaveTripModal = () => {
    this.refreshSaveTripModal();
    this.setState({ showModal: true });
  }

  /**
   * Handler that displays the add trip page.
   *
   * Sets state for the states `tripId` and `placeholderObj` in order
   * to ensure the modal has the visual characteristics of an "add trip" modal
   * and creates a new Trip document in the database.
   */
  showAddTripModal = () => {
    this.setState({
      tripId: null,
      defaultFormData: null,
    });
    this.showSaveTripModal();
  }

  /**
   * Handler that displays the edit trip page.
   *
   * Sets state for the states `tripId` and `placeholderObj` in order
   * to ensure the modal has the visual characteristics of an "edit trip" modal
   * and overwrites and existing Trip document in the database.
   *
  * @param {string} tripId Document ID for the current Trip document.
  * @param {!RawTripData} tripFormData Contains the default form data for the
  *     Trip document that that will be editted.
   */
  showEditTripModal = (tripId, tripFormData) => {
    this.setState({
      tripId: tripId,
      defaultFormData: tripFormData,
    });
    this.showSaveTripModal();
  }

  /** @override */
  render() {
    return (
      <div className="view-trips-page">
        <Header />
        <SaveTripModal
          show={this.state.showModal}
          handleClose={this.hideSaveTripModal}
          tripId={this.state.tripId}
          defaultFormData={this.state.defaultFormData}
          key={this.state.refreshSaveTripModal}
        />
        <div className="manage-trips-bar">
          <Button type='button' onClick={this.showAddTripModal}>
            + New Trip
          </Button>
        </div>
        <TripsContainer
          handleEditTrip={this.showEditTripModal}
        />
      </div>
    );
  }
}

export default ViewTrips;
