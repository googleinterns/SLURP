import * as firebase from 'firebase/app';

/**
 * Format a timestamp (in milliseconds) into a pretty string with just the time.
 *
 * @param {int} msTimestamp
 * @param {string} timezone
 * @returns {string} Time formatted into a string like '10:19 AM'.
 */
export function timestampToTimeFormatted(msTimestamp, timezone = 'America/New_York') {
  const date = new Date(msTimestamp);
  const formatOptions = {
    hour: 'numeric',
    minute: '2-digit',
    timeZone: timezone
  };
  return date.toLocaleTimeString('en-US', formatOptions);;
}

/**
 * Format a timestamp (in milliseconds) into a pretty string with just the date.
 *
 * @param {int} msTimestamp
 * @param {string} timezone
 * @returns {string} Time formatted into a string like 'Monday, January 19, 1970'.
 */
export function timestampToDateFormatted(msTimestamp, timezone='America/New_York') {
  const date = new Date(msTimestamp);
  const formatOptions = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: timezone
  };
  return date.toLocaleDateString('en-US', formatOptions);
}

/**
 * Format a timestamp (in milliseconds) into a pretty string.
 *
 * @param {int} msTimestamp
 * @param {string} timezone
 * @returns {string} Time formatted into a string like
 * "Monday, January 19, 1970, 02:48 AM"
 */
export function timestampToFormatted(msTimestamp, timezone = "America/New_York") {
  let date = new Date(msTimestamp);
  let formatOptions = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    timeZone: timezone
  };
  return date.toLocaleString('en-US', formatOptions);
}

/**
 * Return a Firestore Timestamp corresponding to the date in `dateStr`.
 *
 * @param {string} dateStr String containing a date in the form 'yyyy-mm-dd'.
 * @return {firebase.firestore.Timestamp} Firestore timestamp object created.
 */
export function getTimestampFromDateString(dateStr) {
  const dateParts = dateStr.split('-').map(str => +str);
  if (dateParts.length === 1 && dateParts[0] === 0) {
    return firebase.firestore.Timestamp.now();
  }

  const date = new Date(dateParts[0], dateParts[1] - 1, dateParts[2]);
  return firebase.firestore.Timestamp.fromDate(date);
}

/**
 * Returns a date string in ISO format.
 *
 * @param {firebase.firestore.Timestamp} timestamp Firestore timestamp object.
 * @return {string} ISO formatted date string.
 */
export function timestampToISOString(timestamp) {
  return timestamp.toDate().toISOString().substring(0,10);
}
