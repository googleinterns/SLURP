const ACTIVITY_START_TIME = 'start_time';
const ACTIVITY_END_TIME = 'end_time';

/**
 * Make a dropdown object with provided title and HTML content.
 * @param {string} title The title of the to-be dropdown (what's displayed when the dropdown is closed).
 * @param {string} content The content of the to-be dropdown (what's displayed when the dropdown is open).
 * @param {string} location The parent HTML element of the to-be dropdown.
 * @returns HTML div object with the created dropdown.
 */
function makeDropdown(title, content) {
  const randomId = getRandomUuid();

  let newButton = document.createElement('button');
  newButton.innerHTML = title;
  newButton.setAttribute('data-toggle', 'collapse');
  newButton.setAttribute('href', '#'+randomId);
  newButton.setAttribute('aria-expanded', 'false');

  let newDropdownContent = document.createElement('div');
  newDropdownContent.innerHTML = content;
  newDropdownContent.classList.add('collapse');
  newDropdownContent.setAttribute('tabindex', 0);
  newDropdownContent.id = randomId;

  let newDiv = document.createElement('div');
  newDiv.id = "dropdown_" + randomId;
  newDiv.appendChild(newButton);
  newDiv.appendChild(newDropdownContent);

  return newDiv;
}

/**
 * Extract all the activity's data and put it in HTML form. 
 * @param {dictionary} activityData The activity's detailed information.
 * @return {string} HTML element(s) representing the activity content, to be 
 * put in a dropdown.
 */
function makeActivityContent(activityData) {
  let bigdiv = document.createElement("div");
  
  let title = document.createElement("p");
  title.innerHTML = activityData["title"];
  bigdiv.appendChild(title);

  let starttime = document.createElement("p");
  starttime.innerHTML = "start time: " + timestampToTimeFormatted(activityData[ACTIVITY_START_TIME]);
  bigdiv.appendChild(starttime);

  let endtime = document.createElement("p");
  endtime.innerHTML = "end time: " + timestampToTimeFormatted(activityData[ACTIVITY_END_TIME]);
  bigdiv.appendChild(endtime);

  return bigdiv;
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
 * Sort a list of trip activities by date. 
 * @param {Array} tripActivities Array of activities.
 * @returns Dictionary of trip activities in the form {"MM/DD/YYYY": [activities on that day], ...}.
 */
function sortByDate(tripActivities) {
  let activities = {}; // { [MM/DD/YYYY]: [activities] }.
  for (let activity of tripActivities) {
    const activityDate = new Date(activity[ACTIVITY_START_TIME]);
    const dateKey = activityDate.toLocaleDateString()
    if (dateKey in activities) {
      activities[dateKey].add(activity);
    } else {
      activities[dateKey] = new Set([activity]);
    }
  }
  return activities;
}

/**
 * Make the inner and top-level content for a day.
 * @param {array} activities The list of activities for the day
 * @return Dictionary of structure {"title": HTML, "content", HTML} with the title 
 * and content of the dropdown for the given day.
 */
function getDayHTML(activities){
  activities = Array.from(activities);

  if (activities === undefined || activities.length == 0) {
    return;
  }

  const startTime = activities[0][ACTIVITY_START_TIME];
  const startDate = timestampToDateFormatted(startTime);

  activities.sort(compareActivities);
  let activitiesDiv = document.createElement("div");
  for (var activity of activities) {
    let activityElement = makeActivityContent(activity);
    activitiesDiv.appendChild(activityElement);
  }
  
  return {"title": startDate, "content": activitiesDiv.outerHTML};
}

/**
 * Fetch activities from the TripID provided in the URL and 
 * display the trips in #activity-list
 */
async function fetchAndDisplayActivities() {
  const url = window.location.href;
  const urlParams = parseUrl(url);
  const tripId = urlParams['tripid'];

  const activityListElement = document.getElementById("activity-list");

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
      console.log('Error getting trip details for tripId', tripId);
    }).then( function(tripActivities) {
      const tripActivitiesByDay = sortByDate(tripActivities);

      // Display each day in a  dropdown format.
      for (const [date, activities] of Object.entries(tripActivitiesByDay)) {
        const dayContent = getDayHTML(activities);
        const dropdown = makeDropdown(dayContent["title"], dayContent["content"]);
        activityListElement.appendChild(dropdown);
      }
    }); 
}

if (typeof exports !== 'undefined'){
  module.exports = {compareActivities, sortByDate};
}