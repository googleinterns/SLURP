import React from 'react';

import Button from 'react-bootstrap/Button';

import { getUserEmailFromUid } from './temp-auth-utils.js'
import ViewActivitiesButton from './view-activities-button.js';

/**
 * Returns the date range of the trip associated with the Trip document data
 * `tripObj`.
 *
 * Note: tripObj will always contain valid star_date and end_date fields.
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

function timestampToISOString(timestamp) {
  return timestamp.toDate().toISOString().substring(0,10);
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
 * - handleEditTrip: Handler that displays the edit trip modal.
 * - key: Special React attribute that ensures a new Trip instance is
 *        created whenever this key is updated
 */
const Trip = (props) => {
  const name = props.tripObj.name;
  const description = props.tripObj.description;
  const destination = props.tripObj.destination;
  const collaboratorEmailsStr =
      getCollaboratorEmails(props.tripObj.collaborators);

  const placeholderObj = {
    name:          name,
    description:   description,
    destination:   destination,
    startDate:     timestampToISOString(props.tripObj.start_date),
    endDate:       timestampToISOString(props.tripObj.end_date),
    collaborators: collaboratorEmailsStr.split(', ')
  };

  return (
    <div>
      <h2>{name}</h2>
      <p>{description}</p>
      <p>{getDateRange(props.tripObj)}</p>
      <p>{destination}</p>
      <p>{collaboratorEmailsStr}</p>

      <Button
        type='button'
        onClick={() => props.handleEditTrip(props.tripId, placeholderObj)}
        variant='primary'
      >
        Edit
      </Button>
      <ViewActivitiesButton tripId={props.tripId} />
    </div>
  );
};

export default Trip;
