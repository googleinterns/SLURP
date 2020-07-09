import React from 'react';

import Button from 'react-bootstrap/Button';

import * as DB from '../../constants/database';
import ViewActivitiesButton from './view-activities-button';


/**
 * Returns the title of the trip associated with the Trip document data
 * `tripObj`.
 *
 * @param {firebase.firestore.DocumentData} tripObj Object containing the fields
 *    and values for a Trip document.
 * @return Title of the trip (if it exists).
 */
function getTitle(tripObj) {
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
function getDescription(tripObj) {
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
function getDateRange(tripObj) {
  try {
    if (DB.TRIPS_START_DATE in tripObj && DB.TRIPS_END_DATE in tripObj) {
      const startDate = tripObj.start_date.toDate();
      const endDate = tripObj.end_date.toDate();
      return `${startDate.getMonth() + 1}/${startDate.getDate()}/`  +
          `${startDate.getFullYear()} - ${endDate.getMonth() + 1}/` +
          `${endDate.getDate()}/${endDate.getFullYear()}`;
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
function getDestination(tripObj) {
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
function getCollaborators(tripObj) {
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
 */
const Trip = (props) => {
  return (
    <div>
      <h2>{getTitle(props.tripObj)}</h2>
      <p>{getDescription(props.tripObj)}</p>
      <p>{getDateRange(props.tripObj)}</p>
      <p>{getDestination(props.tripObj)}</p>
      <p>{getCollaborators(props.tripObj)}</p>
      {/* TODO(Issue 15): Add edit trip page. */}
      <Button type='button' onClick={null} variant='primary'>Edit</Button>
      <ViewActivitiesButton tripId={props.tripId} />
    </div>
  );
};

export default Trip;
export { getTitle, getDescription, getDateRange, getDestination,
         getCollaborators };
