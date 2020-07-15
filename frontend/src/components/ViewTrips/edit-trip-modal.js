import React from 'react';

import SaveTripModal from './save-trip-modal.js'

/**
 * Component corresponding to add trips modal.
 *
 * @param {Object} props These are the props for this component:
 * - db: Firestore database instance.
 * - show: Boolean that determines if the add trips modal should be displayed.
 * - handleClose: The function that handles closing the add trips modal.
 * - refreshTripsContainer: Function that handles refreshing the TripsContainer
 *        component upon trip creation (Remove when fix Issue #62).
 * - key: Special React attribute that ensures a new AddTripModal instance is
 *        created whenever this key is updated
 *
 * @extends React.Component
 */
class SaveTripModal extends React.Component {
  /** @inheritdoc */
  render() {
    return (
      <SaveTripModal
        db={this.props.db}
        show={this.props.show}
        handleClose={this.props.handleClose}
        refreshTripsContainer={this.props.refreshTripsContainer}
        key={this.props.key}
      />
    );
  }
};

export default SaveTripModal;
