import React from 'react';

import SaveTripModal from './save-trip-modal.js'

/**
 * Component corresponding to the edit trips modal.
 *
 *  TODO(Issue #69): Integrate EditTripModal into Trip component.
 *
 * @param {Object} props These are the props for this component:
 * - db: Firestore database instance.
 * - show: Boolean that determines if the add trips modal should be displayed.
 * - handleClose: The function that handles closing the add trips modal.
 * - refreshTripsContainer: Function that handles refreshing the TripsContainer
 *        component upon trip creation (Remove when fix Issue #62).
 * - key: Special React attribute that ensures a new EditTripModal instance is
 *        newly created whenever this key is updated.
 *
 * @extends React.Component
 */
const EditTripModal = (props) => {
  const placeholderObj =
  {
    name:          null,
    description:   null,
    destination:   null,
    startDate:     null,
    endDate:       null,
    collaborators: [null]
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

export default EditTripModal;
