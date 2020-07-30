import React from 'react';

import Button from 'react-bootstrap/Button';

import { timestampToISOString, getDateRangeString } from '../Utils/time.js';
import { getUserEmailArrFromUserUidArr } from '../Utils/temp-auth-utils.js';
import DeleteTripButton from './delete-trip-button.js';
import ViewActivitiesButton from './view-activities-button.js';

/**
 * Return collaborator emails corresponding to the collaborator uid's
 * `collaboratorUidArr` in a comma separated string.
 *
 * @param {!Array<string>} collaboratorUidArr Array of collaborator uids
 *     stored in trip document.
 * @returns {string} Collaborator emails in comma separated string.
 *     Ex: "person1@email.com, person2@email.com".
 */
export function getCollaboratorEmails(collaboratorUidArr) {
  const collaboratorEmailArr = getUserEmailArrFromUserUidArr(collaboratorUidArr);
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
  const startDateTimestamp = props.tripData.start_date;
  const endDateTimestamp = props.tripData.end_date;
  const collaboratorEmailsStr = getCollaboratorEmails(props.tripData.collaborators);

  const formattedTripData = {
    name:          name,
    description:   description,
    destination:   destination,
    start_date:    timestampToISOString(startDateTimestamp),
    end_date:      timestampToISOString(endDateTimestamp),
    collaborators: collaboratorEmailsStr.split(', ')
  };

  return (
    <div>
      <h2>{name}</h2>
      <p>{destination}</p>
      <p>{getDateRangeString(startDateTimestamp, endDateTimestamp)}</p>
      <p>{description}</p>
      <p>{collaboratorEmailsStr}</p>

      <DeleteTripButton tripId={props.tripId} />
      <Button
        type='button'
        onClick={() => props.handleEditTrip(props.tripId, formattedTripData)}
        variant='primary'
      >
        Edit
      </Button>
      <ViewActivitiesButton tripId={props.tripId} />
    </div>
  );
};

export default Trip;
