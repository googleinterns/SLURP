import * as firebase from 'firebase/app';
import 'firebase/firebase-firestore';

import { getDateRange } from './trip.js'

test('getDateRange test', () => {
  const startMonth = 12;
  const startDay = 17;
  const startYear = 1995;
  const endMonth = 5;
  const endDay = 24;
  const endYear = 1996;
  const testStartDate = firebase.firestore.Timestamp.fromDate(
      new Date(startYear, startMonth - 1, startDay));
  const testEndDate = firebase.firestore.Timestamp.fromDate(
      new Date(endYear, endMonth - 1, endDay));
  const testTripObj = {start_date: testStartDate, end_date: testEndDate};

  const actualDateRange = getDateRange(testTripObj);
  const expectedDateRange = `${startMonth}/${startDay}/${startYear} - ` +
        `${endMonth}/${endDay}/${endYear}`;

  expect(actualDateRange).toEqual(expectedDateRange);
})
