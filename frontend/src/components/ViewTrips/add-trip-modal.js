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
const AddTripModal = (props) => {
  const placeholderObj =
  {
    name:               'Enter Trip Name',
    description:        'Enter Trip Description',
    destination:        'Enter Trip Destination',
    start_date:         '',
    end_date:           '',
    collaborators:      'person@email.xyz'
  };

  return (
    <SaveTripModal
      db={props.db}
      show={props.show}
      handleClose={props.handleClose}
      refreshTripsContainer={props.refreshTripsContainer}
      key={props.key}
      placeholderObj={placeholderObj}
    />
  );
};

export default AddTripModal;
