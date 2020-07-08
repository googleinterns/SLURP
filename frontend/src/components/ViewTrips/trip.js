import React from 'react';

function createTitleElement(tripObj) {
  let title;
  try {
    title = tripObj.name;
  } catch (error) {
    console.log(`Error in fetching trip title: ${error}`);
    title = 'Unable to fetch trip title';
  }
  return ( <h2>{title}</h2> );
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
      <p>{createTitleElement(props.tripObj)} Doc Id: {props.tripId}</p>
    </div>
  );
};

export default Trip;
