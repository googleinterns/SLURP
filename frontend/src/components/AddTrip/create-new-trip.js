
/**
 * Cleans form data and creates new Trip document in firestore.
 *
 * TODO(Issue #43): Create this function and any associated helpers.
 */
function createTrip(name, description, destination,
                    startDate, endDate, collaborators) {
  console.log(`trip title: ${name}`);
  console.log(`trip description: ${description}`);
  console.log(`trip destination: ${destination}`);
  console.log(`trip start date: ${startDate}`);
  console.log(`trip end date: ${endDate}`);
  console.log(`trip collaborators: ${collaborators}`);
}

export default createTrip;
