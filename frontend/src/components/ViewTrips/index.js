import React from 'react';
import app from '../Firebase';
import TripsContainer from './trips-container.js'

const db = app.firestore();

/**
 * Temporary hardcoded function that returns the current users email.
 *
 * The hardcoded string was created based on one of the manually created test
 * Trip Documents. This function will be implemented in the user authentication
 * JS module using Firebase's Authentication API.
 *
 * TODO(Issue 16): Remove this function once implemented in authentication
 *                 module.
 * @return Hardcoded user email string.
 */
function getUserEmail() {
  return 'matt.murdock';
}

/**
 * ViewTrips component that defines the page where a user can view and manage
 * their current trips.
 */
const ViewTrips = () => {
  return (
    <TripsContainer db={db} userEmail={getUserEmail()} />
  );
};

export default ViewTrips;



