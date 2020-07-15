import * as firebase from 'firebase/app';
import 'firebase/firebase-firestore';
import { getUidFromUserEmail} from './temp-auth-utils.js'

import { getTripName, getTripDestination, getTimestampFromDateString,
         getCollaboratorUidArray }  from './create-new-trip.js'


describe('getTripName tests', () => {
  test('No name entered in form', () => {
    const testRawName = '';

    const testTripName = getTripName(testRawName);

    const expectedTripName = 'Untitled Trip';
    expect(testTripName).toEqual(expectedTripName);
  });

  test('Name entered in form', () => {
    const testRawName = 'Trip to No Man\'s Land';

    const testTripName = getTripName(testRawName);

    expect(testTripName).toEqual(testRawName);
  });
});

describe('getTripDestination tests', () => {
  test('No destination entered in form', () => {
    const testRawDestination = '';

    const testTripDestination = getTripDestination(testRawDestination);

    const expectedTripDestination = 'No Destination';
    expect(testTripDestination).toEqual(expectedTripDestination);
  });

  test('Destination entered in form', () => {
    const testRawDestination = 'Belgium';

    const testTripDestination = getTripDestination(testRawDestination);

    expect(testTripDestination).toEqual(testRawDestination);
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
    const testRawDate = '';

    const testTimestamp = getTimestampFromDateString(testRawDate);

    const expectedTimestamp = mockTimeNow;
    expect(testTimestamp).toBe(expectedTimestamp);
  });

  test('Date entered in form', () => {
    const testDate = new Date(2020, 5, 4); // July 4, 2020

    // This is the type of string (yyy-mm-dd) that is returned from the form
    // input type 'date'.
    const testRawDate = testDate.toISOString().substring(0,10);
    const testTimestamp = getTimestampFromDateString(testRawDate);

    const expectedTimestamp = firebase.firestore.Timestamp.fromDate(testDate);
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
    // This is the list that is created when there are no collaborators added
    // (automatically one empty string from the constructor created ref).
    const testEmailArr = [''];

    const testUidArr = getCollaboratorUidArray(testEmailArr);

    const expectedUidArr = [getUidFromUserEmail(mockCurUserEmail)];
    expect(testUidArr).toEqual(expectedUidArr);
  });

  test('Some added collaborators', () => {
    const person1Email = 'p1@gmail.com';
    const person2Email = 'p2@outlook.com';
    const testEmailArr = [person1Email, person2Email];

    const testUidArr = getCollaboratorUidArray(testEmailArr);

    const expectedUidArr = [getUidFromUserEmail(mockCurUserEmail),
        getUidFromUserEmail(person1Email), getUidFromUserEmail(person2Email)];
    expect(testUidArr).toEqual(expectedUidArr);
  });

  test('Some added collaborators and some blank entries', () => {
    const person1Email = 'p1@gmail.com';
    const person2Email = 'p2@outlook.com';
    const testEmailArr = ['', person1Email, '', person2Email, ''];

    const testUidArr = getCollaboratorUidArray(testEmailArr);

    const expectedUidArr = [getUidFromUserEmail(mockCurUserEmail),
        getUidFromUserEmail(person1Email), getUidFromUserEmail(person2Email)];
    expect(testUidArr).toEqual(expectedUidArr);
  });
});
