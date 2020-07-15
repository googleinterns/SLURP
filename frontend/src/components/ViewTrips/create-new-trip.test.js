import * as firebase from 'firebase/app';
import 'firebase/firebase-firestore';

import { getUidFromUserEmail } from './temp-auth-utils.js'
import { getTripName, getTripDestination, getTimestampFromDateString,
         getCollaboratorUidArray }  from './create-new-trip.js'


describe('getTripName tests', () => {
  test('No name entered in form', () => {
    const expectedTripName = 'Untitled Trip';
    const testRawName = '';

    const testTripName = getTripName(testRawName);

    expect(testTripName).toEqual(expectedTripName);
  });

  test('Name entered in form', () => {
    const testRawName = 'Trip to No Man\'s Land';
    const expectedTripName = testRawName;

    const testTripName = getTripName(testRawName);

    expect(testTripName).toEqual(expectedTripName);
  });
});

describe('getTripDestination tests', () => {
  test('No destination entered in form', () => {
    const expectedTripDestination = 'No Destination';
    const testRawDestination = '';

    const testTripDestination = getTripDestination(testRawDestination);

    expect(testTripDestination).toEqual(expectedTripDestination);
  });

  test('Destination entered in form', () => {
    const testRawDestination = 'Belgium';
    const expectedTripDestination = testRawDestination;

    const testTripDestination = getTripDestination(testRawDestination);

    expect(testTripDestination).toEqual(expectedTripDestination);
  });
});

const mockTimeNow = 0;
jest.mock('firebase/app', () => ({
    firestore: {
      Timestamp: {
          now: () => mockTimeNow,
          fromDate: (date) => date
      }
    }
}));
describe('getTimeStampFromDateString tests', () => {
  test('No date entered in form', () => {
    const expectedTimestamp = mockTimeNow;
    const testRawDate = '';

    const testTimestamp = getTimestampFromDateString(testRawDate);

    expect(testTimestamp).toEqual(expectedTimestamp);
  });

  test('Date entered in form', () => {
    const testDate = new Date(2020, 5, 4); // July 4, 2020
    const expectedTimestamp = firebase.firestore.Timestamp.fromDate(testDate);

    // This is the type of string (yyy-mm-dd) that is returned from the form
    // input type 'date'.
    const testRawDate = testDate.toISOString().substring(0,10);
    const testTimestamp = getTimestampFromDateString(testRawDate);

    expect(testTimestamp).toEqual(expectedTimestamp);
  });
});

const mockCurUserEmail = 'cur.user@email.com';
// TODO(Issue #55): Replace mock with real auth file once integrated.
jest.mock('./temp-auth-utils.js', () => ({
    getCurUserEmail: () => mockCurUserEmail,
    getUidFromUserEmail: (userEmail) => '_' + userEmail + '_'
}));
describe('getCollaboratorUidArray tests', () => {
  test('No collaborators entered', () => {
    const expectedUidArr = [getUidFromUserEmail(mockCurUserEmail)];
    // This is the list that is created when there are no collaborators added
    // (automatically one empty string from the constructor created ref).
    const testEmailArr = [''];

    const testUidArr = getCollaboratorUidArray(testEmailArr);

    expect(testUidArr).toEqual(expectedUidArr);
  });

  test('Some added collaborators', () => {
    const person1Email = 'p1@gmail.com';
    const person2Email = 'p2@outlook.com';
    const expectedUidArr = [getUidFromUserEmail(mockCurUserEmail),
        getUidFromUserEmail(person1Email), getUidFromUserEmail(person2Email)];
    const testEmailArr = [person1Email, person2Email];

    const testUidArr = getCollaboratorUidArray(testEmailArr);

    expect(testUidArr).toEqual(expectedUidArr);
  });

  test('Some added collaborators and some blank entries', () => {
    const person1Email = 'p1@gmail.com';
    const person2Email = 'p2@outlook.com';
    const expectedUidArr = [getUidFromUserEmail(mockCurUserEmail),
        getUidFromUserEmail(person1Email), getUidFromUserEmail(person2Email)];
    const testEmailArr = ['', person1Email, '', person2Email, ''];

    const testUidArr = getCollaboratorUidArray(testEmailArr);

    expect(testUidArr).toEqual(expectedUidArr);
  });
});
