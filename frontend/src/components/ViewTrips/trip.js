import React from 'react';
import Button from 'react-bootstrap/Button';

import ViewActivitiesButton from './view-activities-button.js';

/**
 * Temporary hardcoded function that returns the current users email given their
 * uid.
 *
 * TODO(Issue 55): Remove this function and replace any calls to it with Auth
 *                 component function.
 *
 * @param {*} uid
 */
function _getUserEmailFromUid(uid) {
  return uid.substring(1, uid.length - 1);
}

/**
 * Returns the date range of the trip associated with the Trip document data
 * `tripObj`.
 *
 * @param {firebase.firestore.DocumentData} tripObj Object containing the fields
 *    and values for a Trip document.
 * @return Date range of the trip (if it exists).
 */
export function getDateRange(tripObj) {
  const startDate = tripObj.start_date.toDate();
  const endDate = tripObj.end_date.toDate();
  return `${startDate.getMonth() + 1}/${startDate.getDate()}/`  +
      `${startDate.getFullYear()} - ${endDate.getMonth() + 1}/` +
      `${endDate.getDate()}/${endDate.getFullYear()}`;
}

export function getCollaboratorEmails(collaboratorUidArr) {
  const collaboratorEmailArr =
      collaboratorUidArr.map(uid => _getUserEmailFromUid(uid));
  return collaboratorEmailArr.join(', ');
}

/**
 * Component corresponding to the container containing an individual trip.
 *
 * Trip object fields are cleaned and vetted with firestore security rules
 * when trips are added and/or editted. Thus, no error checking is done here
 * on the 'display' side.
 *
 * @param {Object} props These are the props for this component:
 * - tripObj: JS object holding a Trip document fields and corresponding values.
 * - tripId: Document ID for the current Trip document.
 */
const Trip = (props) => {
  return (
    <div>
      <h2>{props.tripObj.name}</h2>
      <p>{props.tripObj.description}</p>
      <p>{getDateRange(props.tripObj)}</p>
      <p>{props.tripObj.destination}</p>
      <p>{getCollaboratorEmails(props.tripObj.collaborators)}</p>

      {/* TODO(Issue 15): Add edit trip page. */}
      <Button type='button' onClick={null} variant='primary'>Edit</Button>
      <ViewActivitiesButton tripId={props.tripId} />
    </div>
  );
};

export default Trip;
