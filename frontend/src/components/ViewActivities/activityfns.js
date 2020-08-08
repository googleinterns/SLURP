import * as DB from '../../constants/database.js';
import app from '../Firebase';
import { firestore } from 'firebase';
import * as moment from 'moment-timezone';
import * as time from '../Utils/time.js';

const db = app.firestore();

/**
 * An activity object. 
 * @typedef {Object} ActivityInfo
 * @property {string} id The activity's ID in the database.
 * @property {string} tripId The activity's tripId in the database.
 * @property {string} title The activity's title.
 * @property {long} start_time Number of seconds since epoch of activity's start time.
 * @property {long} end_time Number of seconds since epoch of activity's end time.
 * @property {string} start_tz The timezone in which the activity starts.
 * @property {string} end_tz The timezone in which the activity ends.
 * @property {string} [start_country] The country in which the activity starts.
 * @property {string} [end_country] The country in which the activity ends.
 * @property {string} [description] The activity's description.
 */

/**
 * A single activity day. A single instance looks like:
 * ```['MM/DD/YYYY', [activities on that day]]```
 * @typedef {Array.<string, ActivityInfo[]>} DayOfActivities
 */

/**
 * Get the field of field name `fieldName` from `activity`  or the default value.
 * 
 * @param {ActivityInfo} activity Activity to get field from.
 * @param {string} fieldName Name of the field in the activity to get. 
 * @param {?*} [defaultValue=null] Default value to return if activity[fieldName] 
 *  can't be found. Can be any type.
 * @param {string} [prefix=''] The prefix to put before a returned value if the 
 *  field exists.
 * @return {*} `activity[fieldName]` if possible, else `defaultValue`. Can be any type.
 */
export function getField (activity, fieldName, defaultValue = null, prefix = '') {
  if (activity[fieldName] === null || activity[fieldName] === undefined) {
    return defaultValue;
  }
  return prefix + activity[fieldName];
}

/**
 * Sort a list of trip activities by date. 
 * @param {ActivityInfo[]} tripActivities Array of activities.
 * @return {DayOfActivities[]} List of {@link DayOfActivities}
 * in chronological order by date.
 */
export function sortByDate(tripActivities) {
  if (tripActivities === undefined) {
    return null;
  }
  let activities = new Map(); // { MM/DD/YYYY: [activities] }.
  for (let activity of tripActivities) {
    const dateKey = time.getISODate(activity[DB.ACTIVITIES_START_TIME], 
      getField(activity, DB.ACTIVITIES_START_TZ));
    if (activities.has(dateKey)) {
      activities.get(dateKey).add(activity);
    } else {
      activities.set(dateKey, new Set([activity]));
    }
  }
  // Sort activities by date.  
  let activitiesSorted = Array.from(activities).sort((a, b) => {
    const aDate = moment.utc(a[0], "YYYY-MM-DD").valueOf();
    const bDate = moment.utc(b[0], "YYYY-MM-DD").valueOf();
    return aDate < bDate ? -1 : 1;
  });
  return activitiesSorted;
}

/**
 * Put`a and `b` in display order. 
 * This function is a comparator.
 * @param {ActivityInfo} a Dictionary representing activity `a` and its fields. 
 * @param {ActivityInfo} b Dictionary representing activity `b` and its fields.
 * @return {int} `-1` if `a` comes before `b`, else `1`. 
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
 * Write contents into an activity already existing in the database.
 * 
 * @param {string} tripId Database ID of the trip whose actiivty should be modified.
 * @param {string} activityId Database ID of the activity to be modified.
 * @param {Object} newValues Dictionary of the new values in `{fieldName: newValue}`
 *  form. None of the entries can be lists. 
 * @return {boolean} `true` if the write was successful, `false` otherwise. 
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
 * Note: This function breaks if `ref.current` is null. This is intentional.
 * 
 * @param {!React.RefObject} ref Reference to get the value of.
 * @param {?string} ignoreValue The "null" or "none" value that ref could be.
 * @param {?string} [defaultValue=null] Value to return if ref.current.value === ignoreValue.
 * @return defaultValue if ref.current.value === ignoreValue, else ref.current.value.
 */
export function getRefValue(ref, ignoreValue='', defaultValue=null) {
  if (ref.current.value === ignoreValue) {
    return defaultValue;
  } 
  return ref.current.value;
}
  
/**
 * Pretty format start and end times/days to be displayed. 
 * 
 * Examples:
 * 9:30 AM - 10:30 AM
 * 9:30 AM America/Chicago - 10:30 AM America/New York
 * 9:30 AM - August 9, 2020 10:30 AM
 * 9:30 AM America/Chicago - August 9, 2020 10:30 AM America/New York
 * 
 * Exact output depends on input's date and timezone. 
 * 
 * @param {!ActivityInfo} activity The activity to display.
 * @return {string} The text to display.
 */
export function displayTimes(activity) { 
  const startDay = time.timestampToLongDate(
    getField(activity, DB.ACTIVITIES_START_TIME), 
    getField(activity, DB.ACTIVITIES_START_TZ)
    );
  const endDay = time.timestampToLongDate(
    getField(activity, DB.ACTIVITIES_END_TIME), 
    getField(activity, DB.ACTIVITIES_END_TZ)
    );    
  const startTime = time.timestampToTimeFormatted(
    getField(activity, DB.ACTIVITIES_START_TIME), 
    getField(activity, DB.ACTIVITIES_START_TZ)
    );
  const endTime = time.timestampToTimeFormatted(
    getField(activity, DB.ACTIVITIES_END_TIME), 
    getField(activity, DB.ACTIVITIES_END_TZ)
    );
  const startTz = getField(activity, DB.ACTIVITIES_START_TZ);
  const endTz = getField(activity, DB.ACTIVITIES_END_TZ);
  // Start and end time are on the same day.
  if (startDay === endDay) {
    // They're in the same timezone.
    if (startTz === endTz) { return `${startTime} - ${endTime}`; }
    // They're in different timezones.
    return `${startTime} ${startTz} - ${endTime} ${endTz}`;
  }

  // Start and end time aren't on the same day.
  // They're in the same timezone.
  if (startTz === endTz) { return `${startTime} - ${endDay}, ${endTime}`; }
  // They're in different timezones. 
  return `${startTime} ${startTz} - ${endDay}, ${endTime} ${endTz}`;
}