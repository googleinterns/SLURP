import React, {useState, useEffect} from 'react';

import { Accordion, Button, Card } from 'react-bootstrap';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import authUtils from '../AuthUtils';
import { timestampToISOString, getDateRangeString } from '../Utils/time.js';
import DeleteTripButton from './delete-trip-button.js';
import ViewActivitiesButton from './view-activities-button.js';
import * as DB from '../../constants/database.js';

/**
 * A trip object containing the data stored in a trip document in Firestore.
 * @typedef {Object} TripData
 * @property {string} title The trips's title.
 * @property {string} description A description of the trip.
 * @property {string} destination The general destination of the trip.
 * @property {firebase.firestore.Timestamp} start_date Start date Firestore
 *     timestamp object.
 * @property {firebase.firestore.Timestamp} end_date End date Firestore
 *     timestamp object
 * @property {!string[]} collaborators An array of collaborator uids.
 */

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
 * @property {Object} props These are the props for this component:
 * @property {TripData} props.tripData Object holding a Trip document data.
 * @property {string} props.tripId The document id associated with the trip.
 * @property {Function} props.handleEditTrip Event handler responsible for
 *     displaying the edit trip modal.
 */
const Trip = (props) => {
  // Unpack trip document data.
  const title = props.tripData[DB.TRIPS_TITLE];
  const description = props.tripData[DB.TRIPS_DESCRIPTION];
  const destination = props.tripData[DB.TRIPS_DESTINATION];
  const startDateTimestamp = props.tripData[DB.TRIPS_START_DATE];
  const endDateTimestamp = props.tripData[DB.TRIPS_END_DATE];
  const collaboratorUidArr = props.tripData[DB.TRIPS_COLLABORATORS];
  const [collaboratorEmailsStr, setCollaboratorEmailsStr] = useState('');

  useEffect(() => {
    // Only set state collaboratorEmailsStr if component is mounted. This is
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
    return () => { componentStillMounted = false; };
  }, [collaboratorUidArr]);

  // Re-package trip document data with correctly formatted data for the
  // SaveTripModal component to use when filling out form input default values.
  const formattedTripData = {
    [DB.TRIPS_TITLE]: title,
    [DB.TRIPS_DESCRIPTION]: description,
    [DB.TRIPS_DESTINATION]: destination,
    [DB.TRIPS_START_DATE]: timestampToISOString(startDateTimestamp),
    [DB.TRIPS_END_DATE]: timestampToISOString(endDateTimestamp),
    [DB.TRIPS_COLLABORATORS]: collaboratorEmailsStr.split(', '),
  };

  return (
    <Card>
      <Accordion.Toggle as={Card.Header} eventKey={props.eventKey}>
        <h4>{title}</h4>
      </Accordion.Toggle>
      <Accordion.Collapse eventKey={props.eventKey}>
        <Card.Body>
          <FontAwesomeIcon icon={['fas', 'map-marker-alt']} />
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
        </Card.Body>
      </Accordion.Collapse>
    </Card>
  );
};

export default Trip;
