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


function getTrips() {
  const tripsContainer = document.getElementById('trips-container');
  db.collection('trips')
      .where('collaborators', 'array-contains', getUserEmail())
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          console.log(doc.data());
          console.log(doc.id);
          tripsContainer.appendChild(createTripElement(doc.data(), doc.id));
        });
      })
      .catch(error => {
        console.log(`Error in getTrips: ${error}`);
        tripsContainer.appendChild(
            createErrorElement('Error: Unable to load your trips.'));
      });
}

function getUserEmail() {
  return 'matt.murdock';
}

function createTripElement(tripObj, tripId) {
  const tripElement = document.createElement('div');

  createTitleElement(tripElement, tripObj);
  createDescriptionElement(tripElement, tripObj);
  createDateRangeElement(tripElement, tripObj);
  createDestinationElement(tripElement, tripObj);
  createCollaboratorElement(tripElement, tripObj);
  createEditTripButton(tripElement, tripObj);
  createViewActivitiesButton(tripElement, tripId);

  return tripElement;
}

function createTitleElement(tripElement, tripObj) {
  const titleEl = document.createElement('h2');
  try {
    titleEl.innerText = tripObj.name;
  } catch (error) {
    console.log(`Error in fetching trip title: ${error}`);
    titleEl.innerText = 'Unable to fetch trip title';
  } finally {
    tripElement.appendChild(titleEl);
  }
}

function createDescriptionElement(tripElement, tripObj) {
  const descriptionEl = document.createElement('p');
  try {
    descriptionEl.innerText = tripObj.description;
  } catch (error) {
    console.log(`Error in fetching trip description: ${error}`);
    descriptionEl.innerText = 'Unable to fetch trip description';
  } finally {
    tripElement.appendChild(descriptionEl);
  }
}

function createDateRangeElement(tripElement, tripObj) {
  const dateRangeEl = document.createElement('p');
  try {
    const startDate = tripObj.start_date.toDate();
    const endDate = tripObj.end_date.toDate();
    dateRangeEl.innerText = `${startDate.getMonth()}/${startDate.getDate()}/
        ${startDate.getFullYear()} - ${endDate.getMonth()}/${endDate.getDate()}
        /${startDate.getFullYear()}`;
  } catch (error) {
    console.log(`Error in fetching trip start/end date(s): ${error}`);
    dateRangeEl.innerText = 'Unable to fetch trip start and/or end date(s)';
  } finally {
    tripElement.appendChild(dateRangeEl);
  }
}

function createDestinationElement(tripElement, tripObj) {
  const destinationEl = document.createElement('p');
  try {
    destinationEl.innerText = tripObj.description;
  } catch (error) {
    console.log(`Error in fetching trip destination: ${error}`);
    destinationEl.innerText = 'Unable to fetch trip destination';
  } finally {
    tripElement.appendChild(destinationEl);
  }
}

function createCollaboratorElement(tripElement, tripObj) {
  const collaboratorsEl = document.createElement('p');
  try {
    const /** !Array<string> */ collaboratorArr = tripObj.collaborators;
    collaboratorArr.forEach((collaborator, index) => {
      if (index < collaboratorArr.length - 1) {
        collaboratorsEl.innerText += `${collaborator}, `;
      } else {
        collaboratorsEl.innerText += collaborator;
      }
    });
  } catch (error) {
    console.log(`Error in fetching trip collaborators: ${error}`);
    collaboratorsEl.innerText = 'Unable to fetch trip collaborators';
  } finally {
    tripElement.appendChild(collaboratorsEl);
  }
}

function createEditTripButton(tripElement, tripObj) {
  const editTripBtn = document.createElement('button');
  editTripBtn.innerText = 'Edit';
  // TODO(Issue 15): Add edit trip page.
  tripElement.appendChild(editTripBtn);
}

function createViewActivitiesButton(tripElement, tripId) {
  const viewActivitiesBtn = document.createElement('button');
  viewActivitiesBtn.innerText = 'View Activities!';
  viewActivitiesBtn.onclick = location.href =
      `../pages/activities.html?trip-id=${tripId}`;
  tripElement.appendChild(viewActivitiesBtn);
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
