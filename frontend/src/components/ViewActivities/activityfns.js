import * as DBFIELDS from '../../constants/database.js';
import app from '../Firebase';

const db = app.firestore();

/**
 * Put a and b in display order. 
 * 
 * @param {dictionary} a Dictionary representing activity a and its fields. 
 * @param {dictionary} b Dictionary representing activity b and its fields.
 */
export function compareActivities(a, b) {
  if (a[DBFIELDS.ACTIVITIES_START_TIME] < b[DBFIELDS.ACTIVITIES_START_TIME]) {
    return -1;
  } else if (a[DBFIELDS.ACTIVITIES_START_TIME] > b[DBFIELDS.ACTIVITIES_START_TIME]) {
    return 1;
  } else if (a[DBFIELDS.ACTIVITIES_END_TIME] > b[DBFIELDS.ACTIVITIES_END_TIME]) {
    return 1;
  }
  return -1;
}

/**
 * Gets the list of activities from the server. 
 * 
 * @param {string} tripId The trip ID.
 */
export async function getActivityList(tripId) {
  return new Promise(function(resolve, reject) {
    let tripActivities = [];
    console.log(tripId);
    
    db.collection(DBFIELDS.COLLECTION_TRIPS).doc(tripId)
        .collection(DBFIELDS.COLLECTION_ACTIVITIES).get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
        let data = doc.data();
        data['id'] = doc.id;
        
        // TODO: if start date != end date, split into 2 days. (#37)

        // Eliminate nanoseconds, convert to milliseconds.
        data[DBFIELDS.ACTIVITIES_START_TIME] =
          data[DBFIELDS.ACTIVITIES_START_TIME]['seconds'] * 1000;         
        data[DBFIELDS.ACTIVITIES_END_TIME] = 
          data[DBFIELDS.ACTIVITIES_END_TIME]['seconds'] * 1000;

        tripActivities.push(data);
      })
    }).catch(error => {
      tripActivities = null;
    }).then( () => resolve(tripActivities) );
  })
}

/**
 * Sort a list of trip activities by date. 
 * 
 * @param {Array} tripActivities Array of activities.
 * @returns List of trip activities in the form
 * [ ['MM/DD/YYYY', [activities on that day]], ...] in chronological order by date.
 */
export function sortByDate(tripActivities) {
  let activities = new Map(); // { MM/DD/YYYY: [activities] }.
  for (let activity of tripActivities) {
    const activityDate = new Date(activity[DBFIELDS.ACTIVITIES_START_TIME]);
    const dateKey = activityDate.toLocaleDateString()
    if (activities.has(dateKey)) {
      activities.get(dateKey).add(activity);
    } else {
      activities.set(dateKey, new Set([activity]));
    }
  }

  // Sort activities by date.
  return Array.from(activities).sort(compareActivities);
}