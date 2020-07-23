import * as moment from 'moment-timezone';
import { countryCodes } from '../../constants/countries.js';

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
  return date.toLocaleTimeString('en-US', formatOptions);
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
 * 'Monday, January 19, 1970, 02:48 AM'
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
 * Returns all the time zones in a country (in pretty format).
 * 
 * @param {string} countryName The name of the country for which to get the time zones.
 * @returns {Array.<string>} The list of time zones in the provided country.
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
 * Get a date in 'YYYY-MM-DD' form. 
 * 
 * @param {number} msTimestamp Timestamp, in milliseconds since epoch.
 * @param {string} timezone The timezone which the string should be returned in.
 * @returns {string} The date in 'YYYY-MM-DD' form. 
 */
export function getISODate(msTimestamp, timezone=null) {
  if (timezone === null) {
    return moment.tz(parseFloat(msTimestamp), '').format('YYYY-MM-DD'); // GMT
  }
  return moment.tz(parseFloat(msTimestamp), timezone).format('YYYY-MM-DD');
}

/**
 * Get a time in 24-hour ('HH:mm') form. 
 * 
 * @param {number} msTimestamp Timestamp, in milliseconds since epoch.
 * @param {string} timezone The timezone which the string should be returned in.
 * @returns {string} The time in 24-hour (HH:mm) form.   
 */
export function get24hTime(msTimestamp, timezone=null) {
  if (timezone === null) {
    return moment.tz(parseFloat(msTimestamp), '').format('HH:mm'); // GMT
  }
  return moment.tz(parseFloat(msTimestamp), timezone).format('HH:mm');
}