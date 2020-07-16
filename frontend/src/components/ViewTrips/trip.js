import React from 'react';

import Button from 'react-bootstrap/Button';

import { getUserEmailFromUid } from './temp-auth-utils.js'
import ViewActivitiesButton from './view-activities-button.js';

/**
 * Returns the date range of the trip associated with the Trip document data
 * `tripData`.
 *
 * Note: tripData will always contain valid star_date and end_date fields.
 *
 * @param {firebase.firestore.DocumentData} tripData Object containing the fields
 *    and values for a Trip document.
 * @return Date range of the trip (if it exists).
 */
export function getDateRange(tripData) {
  const startDate = tripData.start_date.toDate();
  const endDate = tripData.end_date.toDate();
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
 * - tripData: Object holding a Trip document fields and corresponding values.
 * - tripId: Document ID for the current Trip document.
 * - handleEditTrip: Handler that displays the edit trip modal.
 * - key: Special React attribute that ensures a new Trip instance is
 *        created whenever this key is updated
 */
const Trip = (props) => {
  const name = props.tripData.name;
  const description = props.tripData.description;
  const destination = props.tripData.destination;
  const collaboratorEmailsStr =
      getCollaboratorEmails(props.tripData.collaborators);

  const placeholderObj = {
    name:          name,
    description:   description,
    destination:   destination,
    startDate:     timestampToISOString(props.tripData.start_date),
    endDate:       timestampToISOString(props.tripData.end_date),
    collaborators: collaboratorEmailsStr.split(', ')
  };

  return (
    <div>
      <h2>{name}</h2>
      <p>{destination}</p>
      <p>{getDateRange(props.tripData)}</p>
      <p>{description}</p>
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
