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
 * Fetches the previously entered comments from the server and inserts each
 * comment as a list item of the 'comments-thread-container' <ul> element.
 *
 * The number of comments displayed is determined by
 * getNumCommentstoDisplay().
 */
function getTrips() {
  const tripsContainer = document.getElementById('trips-container');
  const userEmail = getUserEmail();
  db.collection('trips')
      .where('collaborators', 'array-contains', userEmail)
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          console.log(typeof doc.data());
          console.log(doc.data());
          tripsContainer.appendChild(createTripElement(doc.id));
        });
      })
      .catch(error => {
        console.log('Error in getCommentsThread: ' + error);
        tripsContainer.appendChild(
            createErrorElement('Error: Unable to load your trips.'));
      })
}

function getUserEmail() {
  return 'matt.murdock';
}

/**
 * Creates an <li> element containing the comment data.
 *
 * Each comment contains a message text, image, landmark name/location,
 * and landmark latitude-longitude coordinates. However, both the blobKey
 * and landmark fields of the comment JSON object can be null. If the
 * blobKey value null, no image element is included in the parent <li> element.
 * If the landmark value is null, no landmark information is included.
 *
 * @param {object} commentInJson A string that contains a JSON object of an
 *    individual comment. This JSON object contains fields for message text,
 *    image, landmark name, and landmark latitude-longitude coordinates.
 * @return {HTMLDivElement} The div element containing the trip data.
 */
function createTripElement(tripId) {
  const divElement = document.createElement('div');
  const textElement = document.createElement('p');
  textElement.innerText = tripId;
  divElement.appendChild(textElement);

  return divElement;
}

function createErrorElement(errorMessage) {
  const divElement = document.createElement('div');
  const textElement = document.createElement('p');
  textElement.innerText = errorMessage;
  divElement.appendChild(textElement);

  return divElement;
}

/**
 * Wrapper function that calls functions that need to be executed upon loading
 * view-trips.html.
 *
 * This method prevents the need to use inline scripting on the
 * body html element.
 */
function loadPage() {
  getTrips();
}
window.onload = loadPage;
