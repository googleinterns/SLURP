import React from 'react';
import { useHistory } from 'react-router-dom';

import Button from 'react-bootstrap/Button';

import { VIEW_ACTIVITIES } from '../../constants/routes.js';

/**
 * Component used for the ViewTrips page to redirect to the ViewActivities page.
 */
const ViewActivitiesButton = (props) => {
  const history = useHistory();

  function goToViewActivities() {
    history.push(`${VIEW_ACTIVITIES}/${props.tripId}`);
  }

  return (
    <Button type='button' onClick={goToViewActivities} variant='primary'>
      View Activities!
    </Button>
  );
}

export default ViewActivitiesButton;
