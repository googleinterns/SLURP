import * as DB from '../../constants/database.js';

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
 * @param {Object} activity 
 * @param {string} fieldName 
 * @param defaultValue 
 * @returns `activity[fieldName]` if possible, else `defaultValue`.
 */
export function getField(activity, fieldName, defaultValue){
  if (activity[fieldName] === null || activity[fieldName] === undefined) {
    return defaultValue;
  }
  return activity[fieldName];
}