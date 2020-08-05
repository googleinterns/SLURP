import React, {useState, useEffect} from 'react';

import Button from 'react-bootstrap/Button';

import authUtils from '../AuthUtils';
import { timestampToISOString, getDateRangeString } from '../Utils/time.js';
import DeleteTripButton from './delete-trip-button.js';
import ViewActivitiesButton from './view-activities-button.js';

/**
 * Return collaborator emails corresponding to the collaborator uid's
 * `collaboratorUidArr` in a comma separated string.
 *
 * @param {!string[]} collaboratorEmailArr Array of user emails sorted in
 *     alphabetical order.
 * @return {!string[]} Array of user emails where first element is the current
 *     user email and the following elements maintain their previous order.
 */
export function moveCurUserEmailToFront(collaboratorEmailArr) {
  collaboratorEmailArr = collaboratorEmailArr.filter(email => {
    return email !== authUtils.getCurUserEmail();
  });
  return [authUtils.getCurUserEmail()].concat(collaboratorEmailArr);
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
 * - refreshTripsContainer: Handler that refreshes the TripsContainer
 *        component upon trip creation (Remove when fix Issue #62).
 * - key: Special React attribute that ensures a new Trip instance is
 *        created whenever this key is updated
 */
const Trip = (props) => {
  const name = props.tripData.name;
  const description = props.tripData.description;
  const destination = props.tripData.destination;
  const startDateTimestamp = props.tripData.start_date;
  const endDateTimestamp = props.tripData.end_date;
  const collaboratorUidArr = props.tripData.collaborators;
  const [collaboratorEmailsStr, setCollaboratorEmailsStr] = useState('');

  useEffect(() => {
    // Only set state `collaboratorEmailsStr` if component is mounted. This is
    // a precautionary to mitigate warnings that occur when setting state on
    // a component that has already unmounted. See more here
    // https://www.robinwieruch.de/react-warning-cant-call-setstate-on-an-unmounted-component.
    let componentStillMounted = true;

    async function fetchCollaboratorEmails() {
      let collaboratorEmailArr =
          await authUtils.getUserEmailArrFromUserUidArr(collaboratorUidArr);
      collaboratorEmailArr = moveCurUserEmailToFront(collaboratorEmailArr);
      if (componentStillMounted) {
        setCollaboratorEmailsStr(collaboratorEmailArr.join(', '));
      }
    }

    fetchCollaboratorEmails();
    // cleanup function that prevents `collaboratorEmailsStr` from being set.
    return () => { componentStillMounted = false; };
  }, [collaboratorUidArr]);

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

      <DeleteTripButton
        tripId={props.tripId}
        refreshTripsContainer={props.refreshTripsContainer}
      />
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
