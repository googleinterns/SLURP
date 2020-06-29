// Copyright 2019 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     https://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

/**
 * Temporary hardcoded function that returns the current users email.
 *
 * The hardcoded string was created based on one of the manually created test
 * Trip Documents. This function will be implemented in the user authentication
 * JS module using Firebase's Authentication API.
 *
 * TODO(Issue 16): Remove this function once implemented in authentication
 *                 module.
 */
function getUserEmail() {
  return 'matt.murdock';
}


/**
 * Creates an <div> element containing the HTML of an error message when the
 * query in getTrips() fails to fetch the users trips.
 *
 * @param {string} errorMessage The error message that should be placed in the
 *    created div element and displayed on the view-trips page.
 * @return {HTMLDivElement} The div element containing the error message.
 */
function createErrorElement(errorMessage) {
  const divElement = document.createElement('div');
  const textElement = document.createElement('p');
  textElement.innerText = errorMessage;
  divElement.appendChild(textElement);

  return divElement;
}

/**
 * Creates an <div> element containing the HTML for an individual trip.
 *
 * Temporarily, only the title and associated document ID are included in a
 * text element for each trip <div> element. This is done to simple test the
 * query functionality.
 *
 * TODO(Issue 17): Feed all the Trip Doc data to the UI.
 *
 * @param {object} tripObj A JS object containg the fields (key value pairs) of
 *    of a Trip Document.
 * @param {string} tripId The Id associated with the current Trip Document.
 * @return {HTMLDivElement} The div element containing the trip data.
 */
function createTripElement(tripObj, tripId) {
  const tripElement = document.createElement('div');

  const titleEl = document.createElement('p');
  titleEl.innerText = `Title: ${tripObj.name} | Document Id: ${tripId}`;
  tripElement.appendChild(titleEl);

  return tripElement;
}

/**
 * Returns a promise of a query object containg the array of Trip Documents
 * corresponding to the trips that the current user is a collaborator on.
 *
 * @param {string} userEmail The email corresponding to the current user
 *    logged in.
 * @return {Promise} Promise object containing the query results as a
 *    QuerySnapshot object. This QuerySnapshot contains zero or more Trip
 *    documents as DocumentSnapshot objects.
 */
function queryUserTrips(userEmail) {
  return db.collection(TRIP_COLLECTION)
      .where(COLLABORATORS_FIELD, 'array-contains', userEmail)
      .get();
}

/**
 * Grabs Trip Documents for user from queryUserTrips(), get HTML for each
 * individual trip, and append each trip to the trip container on the view
 * trips page.
 */
function serveTrips() {
  queryUserTrips(getUserEmail())
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          document.getElementById('trips-container')
              .appendChild(createTripElement(doc.data(), doc.id));
        });
      })
      .catch(error => {
        console.log(`Error in getCommentsThread: ${error}`);
        document.getElementById('trips-container')
            .appendChild(
                createErrorElement('Error: Unable to load your trips.'));
      });
}

/**
 * Wrapper function that calls functions that need to be executed upon loading
 * view-trips.html.
 *
 * This method prevents the need to use inline scripting on the
 * body html element.
 */
function loadPage() {
  serveTrips();
}
window.onload = loadPage;

/**
 * Export functions that are tested in view-trips.test.js.
 */
if (typeof exports !== 'undefined'){
  module.exports.queryUserTrips = queryUserTrips;
}
