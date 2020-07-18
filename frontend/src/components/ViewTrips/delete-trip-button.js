import React from 'react';

import app from '../Firebase/';
import Button from 'react-bootstrap/Button';

import * as DB from '../../constants/database.js';

const db = app.firestore();

/**
 * Component used to delete a Trip.
 *
 *
 * @param {Object} props These are the props for this component:
 * - tripId: Document ID for the current Trip document.
 * - refreshTripsContainer: Handler that refreshes the TripsContainer
 *        component upon trip creation (Remove when fix Issue #62).
 */
const DeleteTripsButton = (props) => {
   /**
   * Deletes documents in query with a batch delete.
   *
   * This was derived from the delete collection snippets in the documentation
   * at https://firebase.google.com/docs/firestore/manage-data/delete-data.
    *
    * @param {firebase.firestore.Firestore} db Firestore database instance.
    * @param {firebase.firestore.Query} query Query containing documents from
    *     the activities subcollection of a trip documents.
    * @param {Function} resolve Resolve function that returns a void Promise.
    */
  async function deleteQueryBatch(db, query, resolve) {
    const snapshot = await query.get();

    const batchSize = snapshot.size;
    if (batchSize === 0) {
      // When there are no documents left, we are done
      resolve();
      return;
    }

    // Delete documents in a batch
    const batch = db.batch();
    snapshot.docs.forEach((doc) => {
      batch.delete(doc.ref);
    });
    await batch.commit();

    // Recurse on the next process tick, to avoid
    // exploding the stack.
    process.nextTick(() => {
      deleteQueryBatch(db, query, resolve);
    });
  }

  /**
   * Deletes a trips subcollection of activities corrsponding to the
   * `tripId` prop.
   *
   * This was derived from the delete collection snippets in the documentation
   * at https://firebase.google.com/docs/firestore/manage-data/delete-data.
   *
   * TODO(Issue #81): Consider deleting data with callabable cloud function
   * https://firebase.google.com/docs/firestore/solutions/delete-collections
   */
  async function deleteTripActivities() {
    const query = db.collection(DB.COLLECTION_TRIPS)
        .doc(props.tripId)
        .collection(DB.COLLECTION_ACTIVITIES)
        .orderBy(DB.ACTIVITIES_TITLE)
        .limit(3);

    return new Promise((resolve, reject) => {
      deleteQueryBatch(db, query, resolve).catch(reject);
    });
  }

  /**
   * Deletes a trip and its subcollection of activities corrsponding to the
   * `tripId` prop and then refreshes the TripsContainer component.
   * TODO(Issue #62): Remove refreshTripsContainer.
   */
  async function deleteTrip() {
    await deleteTripActivities();

    db.collection(DB.COLLECTION_TRIPS)
        .doc(props.tripId)
        .delete()
        .then(() => {
          console.log("Document successfully deleted with id: ", props.tripId);
        }).catch(error => {
          console.error("Error removing document: ", error);
        });

    props.refreshTripsContainer();
  }

  return (
    <Button
      type='button'
      variant='primary'
      onClick={deleteTrip} >
      Delete Trip
    </Button>
  );
}

export default DeleteTripsButton;
