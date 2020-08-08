import * as moment from 'moment-timezone';
import { countryCodes } from '../../constants/countries.js';
import { firestore } from 'firebase';

/**
 * Format a timestamp (in milliseconds) into a pretty string with just the time.
 * Example: '10:19 AM'.
 *
 * @param {number} msTimestamp Timestamp in milliseconds of desired date.
 * @param {?string} [timezone=null] Timezone in which to convert.
 * @return {string} Formatted time.
 */
export function timestampToTimeFormatted(msTimestamp, timezone =  null) {
  // Formats from https://momentjs.com/docs/#/displaying/format/
  // LT = Localized time  
  timezone = timezone != null ? timezone.replace(' ', '_') // Reformat date.
                              : ''; // Use GMT.
  return moment.tz(parseFloat(msTimestamp), timezone).format('LT');

}

/**
 * Format a timestamp (in milliseconds) into a pretty string with just the date.
 * Example: 'Monday, January 19, 1970'.
 *
 * @param {number} msTimestamp Timestamp in milliseconds of desired date.
 * @param {?string} [timezone=null] Timezone in which to convert.
 * @return {string} Formatted time.
 */
export function timestampToDateFormatted(msTimestamp, timezone=null) {
  // Formats from https://momentjs.com/docs/#/displaying/format/.
  // dddd = Day of the week (i.e. Monday)
  // LL = "January 19, 1970"  
  timezone = timezone != null ? timezone.replace(' ', '_') // Reformat date.
                              : ''; // Use GMT.
  return moment.tz(parseFloat(msTimestamp), timezone).format('dddd, LL');
}

/**
 * Format a timestamp (in milliseconds) into a pretty string with just the date, 
 * not including the day of the week..
 * Example: 'January 19, 1970'.
 *
 * @param {number} msTimestamp Timestamp in milliseconds of desired date.
 * @param {?string} [timezone=null] Timezone in which to convert.
 * @return {string} Formatted time.
 */
export function timestampToLongDate(msTimestamp, timezone=null) {
  // Formats from https://momentjs.com/docs/#/displaying/format/.
  // LL = "January 19, 1970"
  timezone = timezone != null ? timezone.replace(' ', '_') // Reformat date.
                              : ''; // Use GMT.
  return moment.tz(parseFloat(msTimestamp), timezone).format('LL');
}

/** 
 * Format a timestamp (in milliseconds) into a pretty string.
 * Example: 'Monday, January 19, 1970 02:48 AM PST'.
 *
 * @param {number} msTimestamp Timestamp in milliseconds of desired date.
 * @param {?string} [timezone=null] Timezone in which to convert.
 * @returns {string} Formatted time.
 */
export function timestampToFormatted(msTimestamp, timezone = null) {
  // Formats from https://momentjs.com/docs/#/displaying/format/.
  // LLLL = "Monday, January 19, 1970 2:48 AM"
  // z = "PST"
  timezone = timezone != null ? timezone.replace(' ', '_') // Reformat date.
                              : ''; // Use GMT.
  return moment.tz(parseFloat(msTimestamp), timezone).format('LLLL z');

}

/**
 * Return a Firestore Timestamp corresponding to the date in `dateStr`.
 *
 * Notes:
 * - Because `dateStr` is in ISO date-only form, the created JS Date object will
 * be in UTC time.
 * - The date strings are created in the UTC timezone in order to avoid issues
 * where a user's timezone at last update of the trip is different than the
 * user's current timezone when viewing a trip.
 *
 * @param {string} dateStr String containing a date in ISO form: 'YYYY-MM-DD'.
 * @return {firestore.Timestamp} Firestore timestamp object created.
 */
export function getTimestampFromISODateString(dateStr) {
  if (dateStr === '') {
    return firestore.Timestamp.now();
  }

  const dateUTC = new Date(dateStr);
  return firestore.Timestamp.fromDate(dateUTC);
}

/**
 * Returns the string date range of the trip associated with the Trip document
 * start and end date timestamps.
 *
 * Notes:
 * - The date strings are created in the UTC timezone in order to avoid issues
 * where a user's timezone at last update of the trip is different than the
 * user's current timezone when viewing a trip.
 * - The months retrieved from `getUTCMonth` are 0 indexed rather than 1 indexed
 * so they must be incremented by 1 in order for the month to be correct.
 *
 * @param {!firestore.Timestamp} startDateTimestamp Firestore timestamp
 *     Object corresponding to the trip start date.
 * @param {!firestore.Timestamp} endDateTimestamp Firestore timestamp
 *     Object corresponding to the trip end date.
 * @return {string} Date range of the trip in the form 'MM/DD/YYYY - MM/DD/YYYY'.
 */
export function getDateRangeString(startDateTimestamp, endDateTimestamp) {
  const startDate = startDateTimestamp.toDate();
  const endDate = endDateTimestamp.toDate();
  return `${startDate.getUTCMonth() + 1}/${startDate.getUTCDate()}/`  +
      `${startDate.getUTCFullYear()} - ${endDate.getUTCMonth() + 1}/` +
      `${endDate.getUTCDate()}/${endDate.getUTCFullYear()}`;
}

/**
 * Formats a Firestore timestamp into a date string in ISO format.
 *
 * @param {firestore.Timestamp} timestamp Firestore timestamp object.
 * @return {string} ISO formatted date string: "YYYY-MM-DD or 2020-05-12".
 */
export function timestampToISOString(timestamp) {
  return timestamp.toDate().toISOString().substring(0,10);
}

/**
 * Returns all the time zones in a country (in displayable format).
 * 
 * @param {?string} countryName The name of the country for which to get the time zones.
 * @return {string[]} The list of time zones in the provided country.
 *  Null or unfamiliar values of `countryName` will return the list of all timezones.
 */
export function timezonesForCountry(countryName) {
  let zones;
  try {
    const countryCode = countryCodes[countryName];
    zones = moment.tz.zonesForCountry(countryCode);
  } catch (e) {
    zones = moment.tz.names(); // List of all timezones.
  }
  return zones.map(e => {
    return e.replace(/[_]/g, ' ');
  });
}

/**
 * Get a date in 'YYYY-MM-DD' format.
 *
 * @param {number} msTimestamp Timestamp, in milliseconds since epoch.
 * @param {?string} [timezone=null] The timezone which the string should be returned in.
 * @return {string} The date in 'YYYY-MM-DD' format. 
 *  A null value will return timezone in GMT.
 */
export function getISODate(msTimestamp, timezone=null) {
  timezone = timezone != null ? timezone.replace(' ', '_') // Reformat date.
                              : ''; // Use GMT.
  return moment.tz(parseFloat(msTimestamp), timezone).format(moment.HTML5_FMT.DATE);
}

/**
 * Get a time in 24-hour ('HH:mm') format.
 *
 * @param {number} msTimestamp Timestamp, in milliseconds since epoch.
 * @param {?string} [timezone=null] The timezone which the string should be returned in.
 * @return {string} The time in 24-hour (HH:mm) format.   
 *  A null value will return timezone in GMT.
 */
export function get24hTime(msTimestamp, timezone=null) {
  if (timezone === null) {
    timezone = ''; // Use GMT.
  }
  timezone = timezone.replace(' ', '_');
  return moment.tz(parseFloat(msTimestamp), timezone).format(moment.HTML5_FMT.TIME);
}

/**
 * Get a Firebase Timestamp object for time.
 *
 * @param {string} time The time in 'HH:mm' format.
 * @param {string} date The date in 'YYYY-MM-DD' format.
 * @param {string} tz The timezone in which the date takes place.
 * @return {firestore.Timestamp} Firestore timestamp object at the same time.
 */
export function firebaseTsFromISO(time, date, tz) {
  tz = tz.replace(' ', '_');
  const mtzDate = moment.tz(time + " " + date, "HH:mm YYYY-MM-DD", tz);
  return new firestore.Timestamp(mtzDate.valueOf() / 1000, 0);
}
