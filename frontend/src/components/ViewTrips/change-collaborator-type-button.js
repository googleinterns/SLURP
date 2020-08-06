import React from 'react';

import app from '../Firebase';
import Button from 'react-bootstrap/Button';

import authUtils from '../AuthUtils';
import * as DB from '../../constants/database.js';

const db = app.firestore();

/**
 * {@link TripData} defined originally in `ViewTrips/trip.js`.
 */

/**
 * Component that opens the edit trip modal upon click.
 *
 * @property {Object} props These are the props for this component:
 * @property {string} props.tripId The document id associated with the trip.
 * @property {TripData} props.tripData The current trip document data.
 * @property {string} props.curCollabType The current collaborator type of the
 *     user for the trip specified by `props.tripId`.
 * @property {string} props.newCollabType The collaborator type that the user
 *     is changed to (for the trip) once the button is pressed.
 * @property {string} props.text The inner text of the button.
 */
const ChangeCollabTypeButton = (props) => {
  /**
   *
   */
  function getNewCollabUidArrObj() {
    const curUserUid = authUtils.getCurUserUid();
    let curCollabUidSet = new Set(props.tripData[props.curCollabType]);
    curCollabUidSet.delete(curUserUid);
    let curCollabUidArr = Array.from(curCollabUidSet);

    let newCollabUidArr = props.tripData[props.newCollabType].push(curUserUid);

    return { [props.curCollabType]: curCollabUidArr,
             [props.newCollabType]: newCollabUidArr
           };
  }

  /**
   *
   */
  function changeUserCollabType() {
    const collabData = getNewCollabUidArrObj();

    db.collection(DB.COLLECTION_TRIPS)
        .doc(props.tripId)
        .set(collabData, { merge: true })
        .then(() => {
          console.log('Collaborators updated for trip with ID: ', props.tripId);
        })
        .catch(error => {
          console.error('Error updated collaborators for trip: ', error);
        });
  }

  return (
    <Button
      type='button'
      variant='primary'
      onClick={changeUserCollabType}
    >
      {props.text}
    </Button>
  );
}

export default ChangeCollabTypeButton;

