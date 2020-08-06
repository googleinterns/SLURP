import React, {useState, useEffect} from 'react';

import { Accordion, Card, Col, Container, Row } from 'react-bootstrap';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import authUtils from '../AuthUtils';
import { getDateRangeString } from "../Utils/time.js";
import { moveCurUserEmailToFront, getCollaboratorField } from "./trip-utils.js";
import DeleteTripButton from './delete-trip-button.js';
import ViewActivitiesButton from './view-activities-button.js';
import EditTripButton from './edit-trip-button.js';
import ChangeCollabTypeButton from './change-collaborator-type-button.js';
import * as DB from '../../constants/database.js';
import '../../styles/trips.css';
import TripView from '../../constants/trip-view';

/**
 * {@link TripView} defined originally in `constants/trip-view.js`.
 */

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
 * @property {!string[]} accepted_collaborator_uid_arr Array of user uids
 *     corresponding to collaborators that have accepted the trip.
 * @property {!string[]} pending_collaborator_uid_arr Array of user uids
 *     corresponding to collaborators that have neither accepted nor rejected
 *     the trip.
 * @property {!string[]} rejected_collaborator_uid_arr Array of user uids
 *     corresponding to collaborators that have rejected the trip.
 */

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
 * @property {TripView} props.tripView The current user's trips page view.
 * @property {string} props.eventKey ...
 */
const Trip = (props) => {
  // Unpack trip document data.
  const title = props.tripData[DB.TRIPS_TITLE];
  const description = props.tripData[DB.TRIPS_DESCRIPTION];
  const destination = props.tripData[DB.TRIPS_DESTINATION];
  const startDateTimestamp = props.tripData[DB.TRIPS_START_DATE];
  const endDateTimestamp = props.tripData[DB.TRIPS_END_DATE];
  const collaboratorUidArr = props.tripData[DB.TRIPS_ACCEPTED_COLLABS].concat(
                                 props.tripData[DB.TRIPS_PENDING_COLLABS]);
  const [collaboratorEmailsStr, setCollaboratorEmailsStr] = useState('');

  // Determine whether or not the current trips view is the active collaborator
  // on the current trip.
  const isActiveCollab = props.tripView === TripView.ACTIVE;

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
                {getTripInfoRow(destination, 'map-marker-alt')}
                {getTripInfoRow(
                    getDateRangeString(startDateTimestamp, endDateTimestamp),
                    'calendar-alt'
                )}
                {getTripInfoRow(description, 'book')}
                {getTripInfoRow(collaboratorEmailsStr, 'user-friends')}
              </Col>
              <Col xs={1}>
                <Row>
                  <DeleteTripButton
                    tripId={props.tripId}
                    canModifyTrip ={isActiveCollab}
                  />
                </Row>
                <Row>
                  <EditTripButton
                    tripId={props.tripId}
                    tripData={props.tripData}
                    handleEditTrip={props.handleEditTrip}
                    canModifyTrip ={isActiveCollab}
                  />
                </Row>
                <Row>
                  <ViewActivitiesButton
                    tripId={props.tripId}
                    canModifyTrip ={isActiveCollab}
                  />
                </Row>
              </Col>
            </Row>
            <Row>
              {!isActiveCollab
                ? <ChangeCollabTypeButton
                    tripId={props.tripId}
                    tripData={props.tripData}
                    curCollabType={getCollaboratorField(props.tripView)}
                    newCollabType={getCollaboratorField(TripView.ACTIVE)}
                    text={'Accept'}
                  />
                : null
              }
              {props.tripView === TripView.PENDING
                ? <ChangeCollabTypeButton
                    tripId={props.tripId}
                    tripData={props.tripData}
                    curCollabType={getCollaboratorField(props.tripView)}
                    newCollabType={getCollaboratorField(TripView.REJECTED)}
                    text={'Reject'}
                  />
                : null
              }
            </Row>
          </Container>
        </Card.Body>
      </Accordion.Collapse>
    </Card>
  );
};

export default Trip;
