import React from 'react';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from 'react-bootstrap/Button';

/**
 * {@link TripData} defined originally in `ViewTrips/trip.js`.
 */

/**
 * Component that opens the edit trip modal upon click.
 *
 * @property {Object} props These are the props for this component:
 * @property {string} props.tripId The document id associated with the trip.
 * @property {TripData} props.tripData The current trip document data.
 * @property {Function} props.handleEditTrip Event handler responsible for
 *     displaying the edit trip modal.
 */
const EditTripButton = (props) => {
  return (
    <Button
      type='button'
      variant='link'
      onClick={() => props.handleEditTrip(props.tripId, props.tripData)}
    >
      <FontAwesomeIcon icon='edit' className='fa-icon'/>
    </Button>
  );
}

export default EditTripButton;
