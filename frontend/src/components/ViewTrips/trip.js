import React from 'react';


/**
 * Creates an <div> element containing the HTML for an individual trip.
 *
 * Temporarily, only the title and associated document ID are included in a
 * text element for each trip <div> element. This is done to simple test the
 * query functionality.
 *
 * TODO(Issue 17): Feed all the Trip Doc data to the UI.
 */
const Trip = (props) => {
  return (
      <div><p>'Title: {props.tripObj} | Document Id: {props.tripId}' </p>
      </div >
  )
};

export default Trip;
