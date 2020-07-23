import React from 'react';

import Button from 'react-bootstrap/Button';

import { timestampToISOString } from '../Utils/time.js';
import { getUserEmailArrFromUserUidArr } from '../Utils/temp-auth-utils.js';
import { getDateRangeString } from '../Utils/time.js'
import DeleteTripButton from './delete-trip-button.js';
import ViewActivitiesButton from './view-activities-button.js';
import * as DB from '../../constants/database.js';

/**
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
  // Unpack trip document data.
  const title = props.tripData[DB.TRIPS_TITLE];
  const description = props.tripData[DB.TRIPS_DESCRIPTION];
  const destination = props.tripData[DB.TRIPS_DESTINATION];
  const startDateTimestamp = props.tripData[DB.TRIPS_START_DATE];
  const endDateTimestamp = props.tripData[DB.TRIPS_END_DATE];
  const collaboratorEmailsStr =
      getCollaboratorEmails(props.tripData[DB.TRIPS_COLLABORATORS]);

  // Re-package trip document data with correctly formatted data for the
  // SaveTripModal component to use when filling out form input default values.
  const formattedTripData = {};
  formattedTripData[DB.TRIPS_TITLE] = title;
  formattedTripData[DB.TRIPS_DESCRIPTION] = description;
  formattedTripData[DB.TRIPS_DESTINATION] = destination;
  formattedTripData[DB.TRIPS_START_DATE] =
      timestampToISOString(startDateTimestamp);
  formattedTripData[DB.TRIPS_START_DATE] =
      timestampToISOString(endDateTimestamp);
  formattedTripData[DB.TRIPS_COLLABORATORS] = collaboratorEmailsStr.split(', ');

  return (
    <div>
      <h2>{title}</h2>
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
