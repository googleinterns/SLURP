import * as DB from '../../constants/database.js';
import app from '../Firebase';
import Firebase from 'firebase';

const db = app.firestore();

/**
 * Sort a list of trip activities by date. 
 * @param {Array} tripActivities Array of activities.
 * @returns List of trip activities in the form
 * [ ['MM/DD/YYYY', [activities on that day]], ...] in chronological order by date.
 */
export function sortByDate(tripActivities) {
  let activities = new Map(); // { MM/DD/YYYY: [activities] }.
  for (let activity of tripActivities) {
    const activityDate = new Date(activity[DB.ACTIVITIES_START_TIME]);
    const dateKey = activityDate.toLocaleDateString()
    if (activities.has(dateKey)) {
      activities.get(dateKey).add(activity);
    } else {
      activities.set(dateKey, new Set([activity]));
    }
  }

  // Sort activities by date.
  let activitiesSorted = Array.from(activities).sort(compareActivities);
  
  return activitiesSorted;
}

/**
 * Put a and b in display order. 
 * @param {dictionary} a Dictionary representing activity a and its fields. 
 * @param {dictionary} b Dictionary representing activity b and its fields.
 */
export function compareActivities(a, b) {
  if (a[DB.ACTIVITIES_START_TIME] < b[DB.ACTIVITIES_START_TIME]) {
    return -1;
  } else if (a[DB.ACTIVITIES_START_TIME] > b[DB.ACTIVITIES_START_TIME]) {
    return 1;
  } else if (a[DB.ACTIVITIES_END_TIME] > b[DB.ACTIVITIES_END_TIME]) {
    return 1;
  }
  return -1;
}


/**
 * Get the field of field name `fieldName` from `activity  or the default value.
 * 
 * @param {Object} activity Activity to get field from.
 * @param {string} fieldName Name of the field in the activity to get. 
 * @param defaultValue Default value to return if activity[fieldName] can't be found. 
 * Can be any type.
 * @param {string} prefix The prefix to put before a returned value if the field exists.
 * @returns `activity[fieldName]` if possible, else `defaultValue`. Can be any type.
 */
export function getField(activity, fieldName, defaultValue=null, prefix=''){
  if (activity[fieldName] === null || activity[fieldName] === undefined) {
    return defaultValue;
  }
  return prefix + activity[fieldName];
}

/**
 * Write contents into an activity in the database.
 * 
 * @param {string} tripId Database ID of the trip whose actiivty should be modified.
 * @param {string} activityId Database ID of the activity to be modified.
 * @param {Object} newValues Dictionary of the new values in {fieldName: newValue} form
 * @returns {boolean} true if the write was successful, false otherwise.
 */
export async function writeActivity(tripId, activityId, newValues) {
  // todo: check if tripId or activityId is not valid. (#58)
  newValues = {
    ...newValues, 
    'fillerstamp': Firebase.firestore.Timestamp.now()
  };

  const act = db.collection(DB.COLLECTION_TRIPS).doc(tripId)
    .collection(DB.COLLECTION_ACTIVITIES).doc(activityId);
  
  try {
    // Note: newValues cannot contain lists. Check documentation for update().
    const a = await act.update(newValues);
    return a ? true : false;
  } catch (e) {
    console.log(e);
    return false;
  }
}