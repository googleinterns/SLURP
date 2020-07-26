import * as firebase from 'firebase/app';
import 'firebase/firebase-firestore';

import * as utils from './time.js';

const TZ_CHICAGO = 'America/Chicago';
const TZ_SINGAPORE = 'Asia/Singapore';

test('new york date timestamp format', () => {
  // Month parameter is zero indexed so it's actually the 10th month.
  const testDate = new Date(Date.UTC(2020, 9, 3, 14, 19, 4, 23)).getTime();
  const expected = 'Saturday, October 3, 2020';
  const actual = utils.timestampToDateFormatted(testDate);
  expect(actual).toEqual(expected);
});

test('other date timestamp format', () => {
  const testDate = new Date(Date.UTC(2020, 7, 23, 2, 3, 2, 4)).getTime();
  const expectedCentral = 'Saturday, August 22, 2020';
  const expectedSingapore = 'Sunday, August 23, 2020';
  const actualCentral = utils.timestampToDateFormatted(testDate, TZ_CHICAGO);
  const actualSingapore = utils.timestampToDateFormatted(testDate, TZ_SINGAPORE);
  expect(actualCentral).toEqual(expectedCentral);
  expect(actualSingapore).toEqual(expectedSingapore);
})

test('new york time timestamp format', () => {
  // Month parameter is zero indexed so it's actually the 10th month.
  const testDate = new Date(Date.UTC(2020, 9, 3, 14, 19, 4, 23)).getTime();
  const expected = '10:19 AM';
  const actual = utils.timestampToTimeFormatted(testDate);
  expect(actual).toEqual(expected);
});

test('other time timestamp format', () => {
  const testDate = new Date(Date.UTC(2020, 7, 23, 2, 3, 2, 4)).getTime();
  const expectedCentral = '9:03 PM';
  const expectedSingapore = '10:03 AM';
  const actualCentral = utils.timestampToTimeFormatted(testDate, TZ_CHICAGO);
  const actualSingapore = utils.timestampToTimeFormatted(testDate, TZ_SINGAPORE);
  expect(actualCentral).toEqual(expectedCentral);
  expect(actualSingapore).toEqual(expectedSingapore);
})

test('new york full timestamp format', () => {
  // Month parameter is zero indexed so it's actually the 10th month.
  const testDate = new Date(Date.UTC(2020, 9, 3, 14, 19, 4, 23)).getTime();
  const expected = "Saturday, October 3, 2020, 10:19 AM";
  const actual = utils.timestampToFormatted(testDate);
  expect(actual).toEqual(expected);
});

test('other full timestamp format', () => {
  const testDate = new Date(Date.UTC(2020, 7, 23, 2, 3, 2, 4)).getTime();
  const expectedCentral = "Saturday, August 22, 2020, 9:03 PM";
  const expectedSingapore = "Sunday, August 23, 2020, 10:03 AM";
  const actualCentral = utils.timestampToFormatted(testDate, TZ_CHICAGO);
  const actualSingapore = utils.timestampToFormatted(testDate, TZ_SINGAPORE);
  expect(actualCentral).toEqual(expectedCentral);
  expect(actualSingapore).toEqual(expectedSingapore);
})

const mockTimeNow = 0;
jest.mock('firebase/app', () => ({
    firestore: {
      Timestamp: {
          now: () => mockTimeNow,
          fromDate: (date) => date,
      }
    }
}));
describe('getTimeStampFromDateString tests', () => {
  test('No date entered in form', () => {
    const expectedTimestamp = mockTimeNow;
    const testRawDate = '';

    const testTimestamp = utils.getTimestampFromDateString(testRawDate);

    expect(testTimestamp).toEqual(expectedTimestamp);
  });

  test('Date entered in form', () => {
    const YEAR_2020 = 2020;
    const MONTH_JULY = 5; // Date constructor uses 0 indexed month.
    const DAY_4TH = 4;
    const expectedTimestamp = new Date(YEAR_2020, MONTH_JULY, DAY_4TH);
    // This is the type of string (yyyy-mm-dd) that is returned from the form
    // input type 'date'.
    const testISODateStr = '2020-06-04'; // July 4, 2020

    const testTimestamp = utils.getTimestampFromDateString(testISODateStr);

    expect(testTimestamp).toEqual(expectedTimestamp);
  });
});
