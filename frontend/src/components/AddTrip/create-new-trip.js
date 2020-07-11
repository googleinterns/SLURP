
/**
 * Cleans form data and creates new Trip document in firestore.
 *
 * TODO(Issue #43): Create this function and any associated helpers.
 */
function createTrip(tripObj) {
  console.log(`trip title: ${tripObj.name}`);
  console.log(`trip description: ${tripObj.description}`);
  console.log(`trip destination: ${tripObj.destination}`);
  console.log(`trip start date: ${tripObj.startDate}`);
  console.log(`trip end date: ${tripObj.endDate}`);
  console.log(`trip collaborators: ${tripObj.collaborators}`);
}

export default createTrip;
