import * as firebase from 'firebase/app';
import 'firebase/firebase-firestore';

import { getDateRange } from './trip.js'

test('getDateRange test', () => {
  // Dates used for both test and expected date strings.
  const startMonth = 12;
  const startDay = 17;
  const startYear = 1995;
  const endMonth = 5;
  const endDay = 24;
  const endYear = 1996;

  // Note that the months in JS dates are 0 indexed rather than 1 indexed so
  // they must be decremented by 1 in order for the month to be correct.
  const testStartDateTimestamp = firebase.firestore.Timestamp.fromDate(
      new Date(startYear, startMonth - 1, startDay));
  const testEndDateTimestamp = firebase.firestore.Timestamp.fromDate(
      new Date(endYear, endMonth - 1, endDay));
  const testDateRange = getDateRange(testStartDateTimestamp,
                                     testEndDateTimestamp);

  const expectedDateRange = `${startMonth}/${startDay}/${startYear} - ` +
        `${endMonth}/${endDay}/${endYear}`;
  expect(testDateRange).toEqual(expectedDateRange);
})
