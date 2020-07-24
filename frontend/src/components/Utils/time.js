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
 * TODO(Issue #89): Remove this function when integrating timezones for the
 * ViewTrips components.
 *
 * @param {string} dateStr String containing a date in the form 'YYYY-MM-DD'.
 * @return {firebase.firestore.Timestamp} Firestore timestamp object.
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
 * Formats a Firestore timestamp into a date string in ISO format.
 *
 * TODO(Issue #89): Remove this function when integrating timezones for the
 * ViewTrips components.
 *
 * TODO(Issue #89): Remove this function when integrating timezones for the
 * ViewTrips components.
 *
 * @param {firebase.firestore.Timestamp} timestamp Firestore timestamp object.
 * @return {string} ISO formatted date string: "YYYY-MM-DD or 2020-05-12".
 */
export function timestampToISOString(timestamp) {
  return timestamp.toDate().toISOString().substring(0,10);
}


/**
 * Returns the string date range of the trip associated with the Trip document
 * start and end date timestamps.
 *
 * TODO(Issue #89): Remove this function when integrating timezones for the
 * ViewTrips components.
 *
 * @param {!firebase.firestore.Timestamp} startDateTimestamp Firestore timestamp
 *     Object corresponding to the trip start date.
 * @param {!firebase.firestore.Timestamp} endDateTimestamp Firestore timestamp
 *     Object corresponding to the trip end date.
 * @return {string} Date range of the trip in the form 'MM/DD/YYYY - MM/DD/YYYY'.
 */
export function getDateRangeString(startDateTimestamp, endDateTimestamp) {
  const startDate = startDateTimestamp.toDate().toLocaleDateString('en-US');
  const endDate = endDateTimestamp.toDate().toLocaleDateString('en-US');
  return startDate + ' - ' + endDate;
}
