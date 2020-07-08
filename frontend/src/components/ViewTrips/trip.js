import React from 'react';

import Button from 'react-bootstrap/Button';

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
    if('name' in tripObj) {
      return tripObj.name;
    }
    throw new Error(`Property 'name' is not defined in 'tripObj.'`);
  } catch (error) {
    console.log(`Error in fetching trip title: ${error}`);
    return 'Unable to fetch trip title';
  }
}


function createDescriptionElement(tripObj) {
  let description;
  try {
    description = tripObj.description;
  } catch (error) {
    console.log(`Error in fetching trip description: ${error}`);
    description = 'Unable to fetch trip description';
  }
  return ( <p>{description}</p> )
}

function createDateRangeElement(tripObj) {
  let dateRange;
  try {
    const startDate = tripObj.start_date.toDate();
    const endDate = tripObj.end_date.toDate();
    dateRange = `${startDate.getMonth()}/${startDate.getDate()}/
        ${startDate.getFullYear()} - ${endDate.getMonth()}/${endDate.getDate()}
        /${startDate.getFullYear()}`;
  } catch (error) {
    console.log(`Error in fetching trip start/end date(s): ${error}`);
    dateRange = 'Unable to fetch trip start and/or end date(s)';
  }
  return ( <p>{dateRange}</p> )
}

function createDestinationElement(tripObj) {
  let destination;
  try {
    destination = tripObj.destination;
  } catch (error) {
    console.log(`Error in fetching trip destination: ${error}`);
    destination = 'Unable to fetch trip destination';
  }
  return ( <p>{destination}</p> );
}

function createCollaboratorElement(tripObj) {
  const /** !Array<string> */ collaboratorArr = tripObj.collaborators;
  let collaborators = '';
  try {
    collaboratorArr.forEach((collaborator, index) => {
      if (index < collaboratorArr.length - 1) {
        collaborators += `${collaborator}, `;
      } else {
        collaborators += collaborator;
      }
    });
  } catch (error) {
    console.log(`Error in fetching trip collaborators: ${error}`);
    collaborators = 'Unable to fetch trip collaborators';
  }
  return ( <p>{collaborators}</p> );
}

// TODO(Issue 15): Add edit trip page.
function createEditTripButton() {
  return ( <Button type='button' variant='primary'>Edit</Button> );
}

function createViewActivitiesButton(tripId) {
  return (
      <Button type='button' onClick={this.handleClick} variant='primary'>
        View Activities!
      </Button>
  );
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
  return (
    <div>
      <h2>{createTitleElement(props.tripObj)}</h2>
        {/* {this.createDescriptionElement(this.props.tripObj)}
        {this.createDateRangeElement(this.props.tripObj)}
        {this.createDestinationElement(this.props.tripObj)}
        {this.createCollaboratorElement(this.props.tripObj)}
        {this.createEditTripButton()}
        {this.createViewActivitiesButton(this.props.tripId)} */}
      <p>Doc Id: {props.tripId}</p>
    </div>
  );
};

export default Trip;
export { createTitleElement };
