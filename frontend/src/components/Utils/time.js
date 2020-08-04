import * as moment from 'moment-timezone';
import { countryCodes } from '../../constants/countries.js';
import { firestore } from 'firebase';

/**
 * Format a timestamp (in milliseconds) into a pretty string with just the time.
 * Example: '10:19 AM'.
 *
 * @param {int} msTimestamp Timestamp in milliseconds of desired date.
 * @param {string} timezone Timezone in which to convert.
 * @return {string} Formatted time.
 */
export function timestampToTimeFormatted(msTimestamp, timezone = 'America/New_York') {
  // Formats from https://momentjs.com/docs/#/displaying/format/
  // LT = Localized time
  return moment.tz(parseFloat(msTimestamp), timezone).format('LT');

}

/**
 * Format a timestamp (in milliseconds) into a pretty string with just the date.
 * Example: 'Monday, January 19, 1970'.
 *
 * @param {int} msTimestamp Timestamp in milliseconds of desired date.
 * @param {string} timezone Timezone in which to convert.
 * @return {string} Formatted time.
 */
export function timestampToDateFormatted(msTimestamp, timezone='America/New_York') {
  // Formats from https://momentjs.com/docs/#/displaying/format/.
  // dddd = Day of the week (i.e. Monday)
  // LL = "January 19, 1970"
  return moment.tz(parseFloat(msTimestamp), timezone).format('dddd, LL');
}

/** 
 * Format a timestamp (in milliseconds) into a pretty string.
 * Example: 'Monday, January 19, 1970 02:48 AM PST'.
 * 
 * @param {int} msTimestamp Timestamp in milliseconds of desired date.
 * @param {string} timezone Timezone in which to convert.
 * @returns {string} Formatted time.
 */
export function timestampToFormatted(msTimestamp, timezone = 'America/New_York') {
  // Formats from https://momentjs.com/docs/#/displaying/format/.
  // LLLL = "Monday, January 19, 1970 2:48 AM"
  // z = "PST"
  return moment.tz(parseFloat(msTimestamp), timezone).format('LLLL z');

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
 * @param {string} countryName The name of the country for which to get the time zones.
 * @return {string[]} The list of time zones in the provided country.
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
 * @param {string} timezone The timezone which the string should be returned in.
 * @return {string} The date in 'YYYY-MM-DD' format. 
 */
export function getISODate(msTimestamp, timezone=null) {
  if (timezone === null) {
    timezone = ''; // Use GMT. 
  }
  return moment.tz(parseFloat(msTimestamp), timezone).format(moment.HTML5_FMT.DATE);
}

/**
 * Get a time in 24-hour ('HH:mm') format. 
 * 
 * @param {number} msTimestamp Timestamp, in milliseconds since epoch.
 * @param {string} timezone The timezone which the string should be returned in.
 * @return {string} The time in 24-hour (HH:mm) format.   
 */
export function get24hTime(msTimestamp, timezone = null) {
  if (timezone === null) {
    timezone = ''; // Use GMT. 
  }
  return moment.tz(parseFloat(msTimestamp), timezone).format(moment.HTML5_FMT.TIME);
}

/**
 * Get the firebase timestamp of a date.
 * 
 * @param {!string} date The date of the event.
 * @param {?string} [time=null] The time of the event.
 * @param {?string} [tz=null] The timezone of the event.
 * @return The Firebase timestamp.
 */
export function firebaseTsFromISO(date, time=null, tz=null) {
  const calcTime = time === null ? '00:00' : time;
  const calcTz = tz === null ? '' : tz;

  if (date === '') {    
    return firestore.Timestamp.now();
  }

  const mtzDate = moment.tz(calcTime + " " + date, "HH:mm YYYY-MM-DD", calcTz);
  return new firestore.Timestamp(mtzDate.valueOf() / 1000, 0);
}