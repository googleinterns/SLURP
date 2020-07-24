import * as DB from '../../constants/database.js';
import app from '../Firebase';
import { firestore } from 'firebase';

const db = app.firestore();

/**
 * An activity object. 
 * @typedef {Object} ActivityInfo
 * @property {string} id The activity's ID in the database.
 * @property {string} tripId The activity's tripId in the database.
 * @property {string} title The activity's title.
 * @property {long} start_time Number of seconds since epoch of activity's start time.
 * @property {long} end_time Number of seconds since epoch of activity's end time.
 * @property {string} [description] The activity's description.
 */

/**
 * A single activity day. A single instance looks like:
 * <pre><code> ['MM/DD/YYYY', [activities on that day]]</code></pre>
 * @typedef {Array.<string, ActivityInfo[]>} DayOfActivities
 * 
 */

/**
 * Sort a list of trip activities by date. 
 * @param {!ActivityInfo[]} tripActivities Array of activities.
 * @return {DayOfActivities[]} List of {@link DayOfActivities}
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
 * Put<code>a</code> and<code>b</code> in display order. 
 * This function is a comparator.
 * @param {!ActivityInfo} a Dictionary representing activity a and its fields. 
 * @param {!ActivityInfo} b Dictionary representing activity b and its fields.
 * @return {int} <code>-1</code> if <code>a</code> comes before <code>b</code>, else <code>1</code>. 
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
 * @param {!ActivityInfo} activity The activity from which to get the field.
 * @param {!string} fieldName Name of field to get.
 * @param {*} [defaultValue=null] Value if field is not found/is null.
 * @param {string} [prefix=''] The prefix to put before a returned value if the field exists.
 * @return {*} <code>activity[fieldName]</code> if possible, else <code>defaultValue</code>.
 */
export function getField(activity, fieldName, defaultValue=null, prefix=''){
  if (activity[fieldName] === null || activity[fieldName] === undefined) {
    return defaultValue;
  }
  return prefix + activity[fieldName];
}

/**
 * Write contents into an activity already existing in the database.
 * 
 * @param {!string} tripId Database ID of the trip whose actiivty should be modified.
 * @param {!string} activityId Database ID of the activity to be modified.
 * @param {Object} newValues Dictionary of the new values in <code>{fieldName: newValue}</code> form
 * @return {boolean} <code>true</code> if the write was successful, <code>false</code> otherwise. 
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

/**
 * Get the value of a reference. 
 * 
 * Note: This function breaks if <code>ref.current</code> is null. This is intentional.
 * 
 * @param {!Reference} ref Reference to get the value of.
 * @param {?string} ignoreValue The "null" or "none" value that ref could be.
 * @param {?string} [defaultValue=null] Value to return if ref.current.value === ignoreValue.
 * @return defaultValue if ref.current.value === ignoreValue, else ref.current.value.
 */
export function getRefValue(ref, ignoreValue, defaultValue=null) {
  if (ref.current.value === ignoreValue) {
    return defaultValue;
  } 
  return ref.current.value;
}