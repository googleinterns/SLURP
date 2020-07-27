import React from 'react';

import { Accordion, Card, Col, Container, Row } from 'react-bootstrap';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { timestampToISOString } from '../Utils/time.js';
import { getUserEmailArrFromUserUidArr } from '../Utils/temp-auth-utils.js';
import { getDateRangeString } from '../Utils/time.js';
import DeleteTripButton from './delete-trip-button.js';
import EditTripButton from './edit-trip-button.js';
import ViewActivitiesButton from './view-activities-button.js';
import * as DB from '../../constants/database.js';
import '../../styles/trips.css';

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
 *
 * @param {!string[]} collaboratorUidArr Array of collaborator uids
 *     stored in trip document.
 * @return {string} Collaborator emails in comma separated string.
 *     Ex: "person1@email.com, person2@email.com".
 */
export function getCollaboratorEmails(collaboratorUidArr) {
  const collaboratorEmailArr = getUserEmailArrFromUserUidArr(collaboratorUidArr);
  return collaboratorEmailArr.join(', ');
}

/**
 * Returns a React Bootstrap `<Row>` element containing some text
 * and its corresponding FontAwesome icon.
 *
 * @param {string} rowText Text for the `<Row>` element.
 * @param {string} icon Text corresponding to the FontAwesome solid-svg icon.
 * @return {JSX.Element} React Bootstrap `<Row>` element. containing some text
 *     with its corresponding FontAwesome icon.
 */
function getTripInfoRow(rowText, icon) {
  if(rowText === '') {
    return (<></>);
  }
  return (
    <Row className='trip-info-row'>
      <Col xs={1}>
        <FontAwesomeIcon icon={icon} className='fa-icon'/>
      </Col>
      <Col xs={11}>
        {rowText}
      </Col>
    </Row>
  )
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
  formattedTripData[DB.TRIPS_END_DATE] =
      timestampToISOString(endDateTimestamp);
  formattedTripData[DB.TRIPS_COLLABORATORS] = collaboratorEmailsStr.split(', ');

  return (
    <Card>
      <Accordion.Toggle as={Card.Header} eventKey={props.eventKey}>
        <h4>{title}</h4>
      </Accordion.Toggle>
      <Accordion.Collapse eventKey={props.eventKey}>
        <Card.Body>
          <Container fluid>
            <Row>
              <Col xs={11}>
                {getTripInfoRow('map-marker-alt', destination)}
                {getTripInfoRow('calendar-alt',
                    getDateRangeString(startDateTimestamp, endDateTimestamp))}
                {getTripInfoRow('book', description)}
                {getTripInfoRow('user-friends', collaboratorEmailsStr)}
              </Col>
              <Col xs={1}>
                <Row>
                  <DeleteTripButton tripId={props.tripId} />
                </Row>
                <Row>
                  <EditTripButton
                    tripId={props.tripId}
                    formattedTripData={formattedTripData}
                    handleEditTrip={props.handleEditTrip}
                  />
                </Row>
                <Row>
                  <ViewActivitiesButton tripId={props.tripId} />
                </Row>
              </Col>
            </Row>
          </Container>
        </Card.Body>
      </Accordion.Collapse>
    </Card>
  );
};

export default Trip;
