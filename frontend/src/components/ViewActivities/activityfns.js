import * as DB from '../../constants/database.js';
import app from '../Firebase';
import { firestore } from 'firebase';

const db = app.firestore();

/**
 * An activity object. 
 * @typedef {Object} Activity
 * @property {string} id The activity's ID in the database.
 * @property {string} tripId The activity's tripId in the database.
 * @property {string} title The activity's title.
 * @property {long} start_time Number of seconds since epoch of activity's start time.
 * @property {long} end_time Number of seconds since epoch of activity's end time.
 * @property {string} [description] The activity's description.
 */

/**
 * A single activity day. A single instance looks like:
 * <pre><code> ['MM/DD/YYYY', [activities on that day]] </pre></code>
 * @typedef {Array.<string, Activity[]>} DayOfActivities
 * 
 */

/**
 * Sort a list of trip activities by date. 
 * @param {Activity[]} tripActivities Array of activities.
 * @return {DayOfActivities[]} List of trip activities in the form
 * <pre><code>[ , ...]</pre></code> 
 * in chronological order by date.
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
 * This function is a comparator.
 * @param {Activity} a Dictionary representing activity a and its fields. 
 * @param {Activity} b Dictionary representing activity b and its fields.
 * @return {int} -1 if a comes before b, else 1. 
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
 * Get the field of field name fieldName from activity  or the default value.
 * 
 * @param {Activity} activity The activity from which to get the field.
 * @param {string} fieldName Name of field to get.
 * @param {*} defaultValue Value if field is not found/is null.
 * @returns {*} activity[fieldName] if possible, else defaultValue.
 */
export function getField(activity, fieldName, defaultValue){
  if (activity[fieldName] === null || activity[fieldName] === undefined) {
    return defaultValue;
  }
  return activity[fieldName];
}

/**
 * Write contents into an activity in the database.
 * 
 * @param {string} tripId Database ID of the trip whose actiivty should be modified.
 * @param {string} activityId Database ID of the activity to be modified.
 * @param {Object} newValues Dictionary of the new values in {fieldName: newValue} form
 * @returns {boolean} `true` if the write was successful, `false` otherwise. 
 */
export async function writeActivity(tripId, activityId, newValues) {
  // todo: check if tripId or activityId is not valid. (#58)
  newValues = {
    ...newValues, 
    'fillerstamp': firestore.Timestamp.now()
  };

  const act = db.collection(DB.COLLECTION_TRIPS).doc(tripId)
    .collection(DB.COLLECTION_ACTIVITIES).doc(activityId);
  
  try {
    // Note: newValues cannot contain lists. Check documentation for update().
    await act.update(newValues);
    return true;
  } catch (e) {
    console.log(e);
    return false;
  }
}