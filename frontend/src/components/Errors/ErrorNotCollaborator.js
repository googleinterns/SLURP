import React from 'react';
import GoToTripsButton from './GoToTripsButton.js';

/**
 * Error component displayed for when the current user is not listed as a
 * collaborator for the trip they are trying to access.
 */
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

export default ErrorNotCollaborator;
