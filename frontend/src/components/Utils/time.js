import * as moment from 'moment-timezone';
import { countryCodes } from '../../constants/countries.js';
import * as firebase from 'firebase/app';

/**
 * Format a timestamp (in milliseconds) into a pretty string with just the time like
 * '10.19 AM'.
 *
 * @param {int} msTimestamp Timestamp in milliseconds of desired date.
 * @param {string} timezone Timezone in which to convert.
 * @return {string} Time formatted into desired pretty string.
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
 * @return {string} Time formatted into desired pretty string.
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
 * @return {string} Time formatted into desired pretty string.
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
 * @param {string} dateStr String containing a date in the form 'YYYY-MM-DD'.
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
 * Formats a Firestore timestamp into a date string in ISO format.
 *
 * @param {firebase.firestore.Timestamp} timestamp Firestore timestamp object.
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