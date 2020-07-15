import React from 'react';

import Button from 'react-bootstrap/Button';

import app from '../Firebase/';
import Header from '../Header/';
import SaveTripModal from './save-trip-modal.js'
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
                   refreshSaveTripModal: false,
                   modalTitle: null,
                   tripId: null,
                   placeholderObj: {
                                     name:          null,
                                     description:   null,
                                     destination:   null,
                                     startDate:     null,
                                     endDate:       null,
                                     collaborators: []
                                   }
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
   * Flips `refreshSaveTripModal` property which causes that save/edit trip
   * component to be reloaded.
   *
   * This was done to prevent bugs where multiple component input fields would
   * persist from one instance of the modal to the next when view trips page
   * was not refreshed in between.
   */
  refreshSaveTripModal = () => {
    this.setState({ refreshSaveTripModal: !this.state.refreshSaveTripModal });
  }

  /** Property that hides the add/edit trip page. */
  hideSaveTripModal = () => { this.setState({ showModal: false }); }

  /** Property that refreshes and displays the add/edit trip page. */
  showSaveTripModal = () => {
    this.refreshSaveTripModal();
    this.setState({ showModal: true });
  }

  showAddTripModal = () => {
    this.setState({
      title: 'Add New Trip',
      tripId: null,
      placeholderObj: {
        name:          'Enter Trip Name',
        description:   'Enter Trip Description',
        destination:   'Enter Trip Destination',
        startDate:     '',
        endDate:       '',
        collaborators: ['person@email.xyz']
      }
    });
    this.showSaveTripModal();
  }

  showEditTripModal = () => {
    // TODO(Issue #69): Get individual tripId and trip data for placeholderObj
    this.setState({
      title: 'Edit Trip',
      tripId: null,
      placeholderObj: {
        name:          null,
        description:   null,
        destination:   null,
        startDate:     null,
        endDate:       null,
        collaborators: []
      }
    });
    this.showSaveTripModal();
  }

  /** @inheritdoc */
  render() {
    return (
      <div className="view-trips-page">
        <Header />
        <SaveTripModal
          db={db}
          show={this.state.showModal}
          handleClose={this.hideSaveTripModal}
          refreshTripsContainer={this.refreshTripsContainer}
          title={this.state.title}
          tripId={this.state.tripId}
          placeholderObj={this.state.placeholderObj}
          key={this.state.refreshSaveTripModal}
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
