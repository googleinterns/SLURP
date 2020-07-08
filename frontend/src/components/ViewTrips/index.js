import React from 'react';
import TripsContainer from './trips-container'

/**
 * Temporary hardcoded function that returns the current users email.
 *
 * The hardcoded string was created based on one of the manually created test
 * Trip Documents. This function will be implemented in the user authentication
 * JS module using Firebase's Authentication API.
 *
 * TODO(Issue 16): Remove this function once implemented in authentication
 *                 module.
 */
function getUserEmail() {
  return 'matt.murdock';
}

/**
 * ViewTrips component.
 */
const ViewTrips = () => {
  return (
    <TripsContainer userEmail={getUserEmail()} />
  );
};

export default ViewTrips;



