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
 * Fetch activities from the TripID provided in the URL and 
 * display the trips in #activity-list.
 */
function fetchAndDisplayActivities() {
  const url = window.location.href;
  const urlParams = parseUrl(url);
  const tripId = urlParams['tripid'];

  //TODO: CHANGE THIS INTO 1. AGGREGATE LIST, 2. MAKE DROPDOWN.
  db.collection(TRIP_COLLECTION).doc(tripId)
    .collection(ACTIVITY_COLLECTION).get()
      .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        const activityData = doc.data();
        console.log(activityData);
        const activityTitle = activityData['title'];
        const activityContent = makeActivityContent(activityData);

        makeDropdown(activityTitle, activityContent, 'activity-list');
      });
    }).catch( function(error) {
      console.log('Error getting trip details for tripId ' + tripId);
    });
}
