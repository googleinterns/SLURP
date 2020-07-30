import React from 'react';
import { useHistory } from 'react-router-dom';

import Button from 'react-bootstrap/Button';

import { VIEW_TRIPS } from '../../constants/routes';

/**
 * A simple Button component that redirects the user back to the VIEW_TRIPS page
 * that is rendered with each of this file's error components.
 */
const GoToTripsButton = () => {
  const history = useHistory();

  function goToTrips() {
    history.push(VIEW_TRIPS);
  }

  return (
    <Button type='button' onClick={goToTrips} variant='primary' size='lg'>
      Go Back to Your Trips
    </Button>
  );
}

export default GoToTripsButton;
