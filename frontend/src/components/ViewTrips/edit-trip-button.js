import React from 'react';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from 'react-bootstrap/Button';

/**
 * @typedef { DefaultFormData } FormattedTripData
 * {@link FormattedTripData} is an alias for the `typedef`
 * {@link DefaultFormData} defined in `ViewTrips/save-trip-modal.js`.
 */

/**
 * Component that opens the edit trip modal upon click.
 *
 * @property {Object} props These are the props for this component:
 * @property {string} props.tripId The document id associated with the trip.
 * @property {FormattedTripData} props.formattedTripData Re-packaged trip
 *     document data that holds the formatted data for the `SaveTripModal` form
 *     input default values.
 * @property {Function} props.handleEditTrip Event handler responsible for
 *     displaying the edit trip modal.
 */
const EditTripButton = (props) => {
  return (
    <Button
      type='button'
      variant='link'
      onClick={() => props.handleEditTrip(props.tripId, props.formattedTripData)}
    >
      <FontAwesomeIcon icon='edit' className='fa-icon'/>
    </Button>
  );
}

export default EditTripButton;
