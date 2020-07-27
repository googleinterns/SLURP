import * as moment from 'moment-timezone';
import { countryCodes } from '../../constants/countries.js';
import { firestore } from 'firebase';

/**
 * Format a timestamp (in milliseconds) into a pretty string with just the time.
 * Example: '10:19 AM'.
 *
 * @param {number} msTimestamp // propagate from #88
 * @param {string} timezone 
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
 * @param {number} msTimestamp // propagate from #88
 * @param {string} timezone 
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
 * @param {number} msTimestamp # propagate from #88
 * @param {string} timezone 
 * @returns {string} Formatted time.
 */
export function timestampToFormatted(msTimestamp, timezone = 'America/New_York') {
  // Formats from https://momentjs.com/docs/#/displaying/format/.
  // LLLL = "Monday, January 19, 1970 2:48 AM"
  // z = "PST"
  return moment.tz(parseFloat(msTimestamp), timezone).format('LLLL z');
}

/**
 * Returns all the time zones in a country (in pretty format).
 * 
 * @param {string} countryName The name of the country for which to get the time zones.
 * @return {Array.<string>} The list of time zones in the provided country.
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
export function get24hTime(msTimestamp, timezone=null) {
  if (timezone === null) {
    timezone = ''; // Use GMT. 
  }
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
  const mtzDate = moment.tz(time + " " + date, "HH:mm YYYY-MM-DD", tz);
  return new firestore.Timestamp(mtzDate.valueOf() / 1000, 0);
}