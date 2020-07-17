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

/**
 * Error component for any general error that occurs, such as failure fetching
 * from Firebase.
 */
class ErrorGeneral extends React.Component {
  /** @inheritdoc */
  render() {
    return (
      <div>
        <p>
          Oops, looks like something went wrong. Please wait a few minutes and
          try again.
        </p>
        <GoToTripsButton />
      </div>
    );
  }
}

class ErrorNotCollaborator extends React.Component {
  /** @inheritdoc */
  render() {
    return (
      <div>
        <p>Sorry, you're not authorized to view this trip.</p>
        <GoToTripsButton />
      </div>
    );
  }
}

class ErrorTripNotFound extends React.Component {
  /** @inheritdoc */
  render() {
    return (
      <div>
        <p>Sorry, we couldn't find the trip you were looking for.</p>
        <GoToTripsButton />
      </div>
    );
  }
}

export {
  ErrorGeneral,
  ErrorNotCollaborator,
  ErrorTripNotFound
};
