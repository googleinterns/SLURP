const ACTIVITY_START_TIME = 'start_time';
const ACTIVITY_END_TIME = 'end_time';

/**
 * Make a dropdown object under the HTML element with ID #location,
 * with provided title and HTML content.
 * @param {string} title The title of the to-be dropdown (what's displayed when the dropdown is closed).
 * @param {string} content The content of the to-be dropdown (what's displayed when the dropdown is open).
 * @param {string} location The parent HTML element of the to-be dropdown.
 */
function makeDropdown(title, content, location) {
  const element = document.getElementById(location);

  const randomId = getRandomUuid();

  let newButton = document.createElement('button');
  newButton.innerHTML = title;
  newButton.setAttribute('data-toggle', 'collapse');
  newButton.setAttribute('data-parent', '#'+location);
  newButton.setAttribute('href', '#'+randomId);
  newButton.setAttribute('aria-expanded', 'false');

  let newDropdownContent = document.createElement('div');
  newDropdownContent.innerHTML = content;
  newDropdownContent.classList.add('collapse');
  newDropdownContent.setAttribute('tabindex', 0);
  newDropdownContent.id = randomId;

  element.appendChild(newButton);
  element.appendChild(newDropdownContent);
}

/**
 * Extract all the activity's data and put it in HTML form. 
 * @param {dictionary} activityData The activity's detailed information.
 * @return {string} HTML element(s) representing the activity content, to be 
 * put in a dropdown.
 */
function makeActivityContent(activityData) {
  let content = '<p>';
  content += ('Description: ' + activityData['description']);
  content += ('<br>Start time: ' + activityData['start_time']);
  content += ('<br>End time: ' + activityData['end_time']);
  content += ('</p>');
  return content;
}

/**
 * Put a and b in display order. 
 * @param {dictionary} a Dictionary representing activity a and its fields. 
 * @param {dictionary} b Dictionary representing activity b and its fields.
 */
function compareActivities(a, b) {
  if (a[ACTIVITY_START_TIME] < b[ACTIVITY_START_TIME]) {
    return -1;
  } else if (a[ACTIVITY_START_TIME] > b[ACTIVITY_START_TIME]) {
    return 1;
  } else if (a[ACTIVITY_END_TIME] > b[ACTIVITY_END_TIME]) {
    return 1;
  }
  return -1;
}

/**
 * 
 */
function sortByDate(tripActivities) {
  let activities = {}; // { Date.getTime(): [activities] }.
  for (let activity of tripActivities) {
    activityDate = new Date(activity[ACTIVITY_START_TIME]).getDate();
    if (activityDate.getTime() in activities) {
      activities[activityDate.getTime()].push(activity);
    } else {
      activities[activityDate.getTime()] = [activity];
    }
  }
  return activities;
}

/**
 * Fetch activities from the TripID provided in the URL and 
 * display the trips in #activity-list
 */
async function fetchAndDisplayActivities() {
  const url = window.location.href;
  const urlParams = parseUrl(url);
  const tripId = urlParams['tripid'];

  db.collection(TRIP_COLLECTION).doc(tripId)
    .collection(ACTIVITY_COLLECTION).get().then(function(querySnapshot) {
      let tripActivities = [];
      querySnapshot.forEach(function(doc) {
        // If start date != end date, then split into 2 days and enter twice.
        let data = doc.data();
        data['id'] = doc.id;

        // Eliminate nanoseconds, convert to milliseconds.
        data[ACTIVITY_START_TIME] = data[ACTIVITY_START_TIME]["seconds"] * 1000;         
        data[ACTIVITY_END_TIME] = data[ACTIVITY_END_TIME]["seconds"] * 1000;

        tripActivities.push(data);
      });
      return tripActivities;
    }).catch( function(error) {
      console.log('Error getting trip details for tripId ' + tripId);
    }).then( function(tripActivities) {
      // Split into days
      // Display each day.
    });
}