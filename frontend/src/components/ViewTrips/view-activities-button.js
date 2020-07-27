import React from 'react';
import { useHistory } from 'react-router-dom';

import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { VIEW_ACTIVITIES } from '../../constants/routes.js';

/**
 * Component that redirects the user from the ViewTrips page to the
 * ViewActivities page corresponding to the trip the button belonged to.
 *
 * @property {Object} props These are the props for this component:
 * @property {string} props.tripId The document id associated with the trip.
 */
const ViewActivitiesButton = (props) => {
  const history = useHistory();

  function goToViewActivities() {
    history.push(`${VIEW_ACTIVITIES}/${props.tripId}`);
  }

  return (
    <Button
      type='button'
      variant='link'
      onClick={goToViewActivities}
    >
      <FontAwesomeIcon icon='hiking' size="lg" className='fa-icon'/>
    </Button>
  );
}

export default ViewActivitiesButton;
