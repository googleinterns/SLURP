import * as firebase from 'firebase/app';

/**
 * Format a timestamp (in milliseconds) into a pretty string with just the time like
 * '10.19 AM'.
 *
 * @param {int} msTimestamp Timestamp in milliseconds of desired date.
 * @param {string} timezone Timezone in which to convert.
 * @returns {string} Time formatted into desired pretty string.
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
 * Format a timestamp (in milliseconds) into a pretty string with just the date, like
 *  'Monday, January 19, 1970'.
 *
 * @param {int} msTimestamp Timestamp in milliseconds of desired date.
 * @param {string} timezone Timezone in which to convert.
 * @returns {string} Time formatted into desired pretty string.
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
 * Format a timestamp (in milliseconds) into a pretty string like 
 * 'Monday, January 19, 1970, 02:48 AM'.
 * 
 * @param {int} msTimestamp Timestamp in milliseconds of desired date.
 * @param {string} timezone Timezone in which to convert.
 * @returns {string} Time formatted into desired pretty string.
 */
export function timestampToFormatted(msTimestamp, timezone = 'America/New_York') {
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
