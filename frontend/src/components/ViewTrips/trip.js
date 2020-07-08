import React from 'react';

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
      <p>Doc Id: {props.tripId}</p>
    </div>
  );
};

export default Trip;
export { createTitleElement };
