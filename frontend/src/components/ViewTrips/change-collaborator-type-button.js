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
 * @property {string} props.curCollabField The collab uid arr field that the
 *     current collaborator uid is an element of in the trip with id
 *     `props.tripId`.
 * @property {string} props.newCollabField The collab uid arr field that the
 *     current collaborator uid is added to (in trip with id `props.tripId`)
 *     once the button is presssed.
 * @property {string} props.text The inner text of the button.
 */
const ChangeCollabTypeButton = (props) => {
  /**
   * Updates the collaborator fields by moving the current user uid from
   * the uid arr corresponding to `props.curCollabField` to uid arr
   * corresponding to `props.newCollabField`.
   */
  function getUpdatedCollabUidArrObj() {
    const curUserUid = authUtils.getCurUserUid();
    let curCollabUidSet = new Set(props.tripData[props.curCollabField]);
    curCollabUidSet.delete(curUserUid);
    let curCollabUidArr = Array.from(curCollabUidSet);

    let newCollabUidSet = new Set(props.tripData[props.newCollabField]);
    newCollabUidSet.add(curUserUid);
    let newCollabUidArr = Array.from(newCollabUidSet);

    return { [props.curCollabField]: curCollabUidArr,
             [props.newCollabField]: newCollabUidArr
           };
  }

  /**
   * Gets the updated collaborator fields and then updates those fields in
   * the trip document.
   */
  function changeUserCollabType() {
    const collabData = getUpdatedCollabUidArrObj();

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

