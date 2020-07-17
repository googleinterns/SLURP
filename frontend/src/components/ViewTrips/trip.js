import React from 'react';

import Button from 'react-bootstrap/Button';

import { getUserEmailFromUid } from '../Utils/temp-auth-utils.js'
import ViewActivitiesButton from './view-activities-button.js';

/**
 * Returns the date range of the trip associated with the Trip document data
 * `tripObj`.
 *
 * Notes:
 *  - tripObj will always contain valid start_date and end_date fields.
 *  - When the Firestore Timestamps contained in `tripObj` converted to js
 *    dates, the months are 0 indexed rather than 1 indexed so they must be
 *    incremented by 1 in order for the month to be correct.
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
      collaboratorUidArr.map(uid => getUserEmailFromUid(uid));
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
      <p>{props.tripObj.destination}</p>
      <p>{getDateRange(props.tripObj)}</p>
      <p>{props.tripObj.description}</p>
      <p>{getCollaboratorEmails(props.tripObj.collaborators)}</p>

      {/* TODO(Issue 15): Add edit trip page. */}
      <Button type='button' onClick={null} variant='primary'>Edit</Button>
      <ViewActivitiesButton tripId={props.tripId} />
    </div>
  );
};

export default Trip;
