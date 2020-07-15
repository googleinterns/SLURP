import React from 'react';

/**
 * Component corresponding to the container containing an individual trip.
 *
 * Trip object fields are cleaned and vetted with firestore security rules
 * when trips are added and/or editted. Thus, no error checking is done here
 * on the 'display' side.
 *
 * TODO(Issue 17): Feed all the Trip Doc data to the UI.
 * Temporarily, only the title and associated document ID are included in a
 * text element for each trip <div> element. This is done to simple test the
 * query functionality.
 *
 * @param {Object} props These are the props for this component:
 * - tripObj: JS object holding a Trip document fields and corresponding values.
 * - tripId: Document ID for the current Trip document.
 */
const Trip = (props) => {
  return (
    <div>
      <h2>{props.tripObj.name}</h2>
      <p>Doc Id: {props.tripId}</p>
    </div>
  );
};

export default Trip;
