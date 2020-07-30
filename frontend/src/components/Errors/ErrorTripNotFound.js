import React from 'react';
import GoToTripsButton from './GoToTripsButton.js';

/**
 * Error component displayed when a nonexistent trip is queried for in the
 * database.
 */
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

export default ErrorTripNotFound;
