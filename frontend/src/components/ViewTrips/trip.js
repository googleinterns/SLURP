import React from 'react';
import { useHistory } from 'react-router-dom';

import Button from 'react-bootstrap/Button';

import * as DB from '../../constants/database';
import { VIEW_ACTIVITIES } from '../../constants/routes';


/**
 * Returns the title of the trip associated with the Trip document data
 * `tripObj`.
 *
 * @param {firebase.firestore.DocumentData} tripObj Object containing the fields
 *    and values for a Trip document.
 * @return Title of the trip (if it exists).
 */
function createTitleElement(tripObj) {
  try {
    if (DB.TRIPS_NAME in tripObj) {
      return tripObj.name;
    }
    throw new Error(`Property '${DB.TRIPS_NAME}' is not defined in 'tripObj.'`);
  } catch (error) {
    console.log(`Error in fetching trip title: ${error}`);
    return 'Unable to fetch trip title';
  }
}

/**
 * Returns the description of the trip associated with the Trip document data
 * `tripObj`.
 *
 * @param {firebase.firestore.DocumentData} tripObj Object containing the fields
 *    and values for a Trip document.
 * @return Description of the trip (if it exists).
 */
function createDescriptionElement(tripObj) {
  try {
    if (DB.TRIPS_DESCRIPTION in tripObj) {
      return tripObj.description;
    }
    throw new Error(
        `Property '${DB.TRIPS_DESCRIPTION}' is not defined in 'tripObj.'`);
  } catch (error) {
    console.log(`Error in fetching trip description: ${error}`);
    return 'Unable to fetch trip description';
  }
}

/**
 * Returns the date range of the trip associated with the Trip document data
 * `tripObj`.
 *
 * @param {firebase.firestore.DocumentData} tripObj Object containing the fields
 *    and values for a Trip document.
 * @return Date range of the trip (if it exists).
 */
function createDateRangeElement(tripObj) {
  try {
    if (DB.TRIPS_START_DATE in tripObj && DB.TRIPS_END_DATE in tripObj) {
      const startDate = tripObj.start_date.toDate();
      const endDate = tripObj.end_date.toDate();
      return `${startDate.getMonth()}/${startDate.getDate()}/
          ${startDate.getFullYear()} - ${endDate.getMonth()}/${endDate.getDate()}
          /${startDate.getFullYear()}`;
    }
    throw new Error(`Property '${DB.TRIPS_START_DATE}' and/or
        '${DB.TRIPS_END_DATE}' is not defined in 'tripObj.'`);
  } catch (error) {
    console.log(`Error in fetching trip start/end date(s): ${error}`);
    return 'Unable to fetch trip start and/or end date(s)';
  }
}

/**
 * Returns the destination of the trip associated with the Trip document data
 * `tripObj`.
 *
 * @param {firebase.firestore.DocumentData} tripObj Object containing the fields
 *    and values for a Trip document.
 * @return Destination of the trip (if it exists).
 */
function createDestinationElement(tripObj) {
  try {
    if (DB.TRIPS_DESTINATION in tripObj) {
      return tripObj.destination;
    }
    throw new Error(
        `Property '${DB.TRIPS_DESTINATION}' is not defined in 'tripObj.'`);
  } catch (error) {
    console.log(`Error in fetching trip destination: ${error}`);
    return 'Unable to fetch trip destination';
  }
}

/**
 * Returns the collaborators of the trip associated with the Trip document data
 * `tripObj`.
 *
 * @param {firebase.firestore.DocumentData} tripObj Object containing the fields
 *    and values for a Trip document.
 * @return Collaborators of the trip (if it exists).
 */
function createCollaboratorElement(tripObj) {
  try {
    if (DB.TRIPS_COLLABORATORS in tripObj) {
      const /** !Array<string> */ collaboratorArr = tripObj.collaborators;
      let collaborators = '';

      collaboratorArr.forEach((collaborator, index) => {
        if (index < collaboratorArr.length - 1) {
          collaborators += `${collaborator}, `;
        } else {
          collaborators += collaborator;
        }
      });

      return collaborators;
    }
    throw new Error(
        `Property '${DB.TRIPS_COLLABORATORS}' is not defined in 'tripObj.'`);
  } catch (error) {
    console.log(`Error in fetching trip collaborators: ${error}`);
    return 'Unable to fetch trip collaborators';
  }
}

/**
 * Component corresponding to the container containing an individual trip.
 *
 * Temporarily, only the title and associated document ID are included in a
 * text element for each trip <div> element. This is done to simple test the
 * query functionality.
 *
 * TODO(Issue 17): Feed all the Trip Doc data to the UI.
 */
const Trip = (props) => {
  const history = useHistory();

  function handleClick() {
    history.push(`${VIEW_ACTIVITIES}/${props.tripId}`);
  }

  return (
    <div>
      <h2>{createTitleElement(props.tripObj)}</h2>
      <p>{createDescriptionElement(props.tripObj)}</p>
      <p>{createDateRangeElement(props.tripObj)}</p>
      <p>{createDestinationElement(props.tripObj)}</p>
      <p>{createCollaboratorElement(props.tripObj)}</p>
      {/* TODO(Issue 15): Add edit trip page. */}
      <Button type='button' onClick={null} variant='primary'>
        Edit
      </Button>
      <Button type='button' onClick={handleClick} variant='primary'>
        View Activities!
      </Button>

    </div>
  );
};

export default Trip;
export { createTitleElement, createDescriptionElement, createDateRangeElement,
    createDestinationElement, createCollaboratorElement };
