import React from 'react';
import GoToTripsButton from './GoToTripsButton.js';

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

export default ErrorGeneral
