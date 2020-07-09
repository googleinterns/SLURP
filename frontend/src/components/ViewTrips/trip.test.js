import * as firebase from 'firebase/app';
import 'firebase/firebase-firestore';

import { getTitle, getDescription, getDateRange, getDestination,
         getCollaborators } from './trip.js';


// Mock Trips
const mockTripName = 'Trip to somewhere!';
const mockTripDescrip = 'A sample working trip';
const startMonth = 12; // December
const startDay = 17;
const startYear = 1995;
const endMonth = 5;    // May
const endDay = 24;
const endYear = 1996;
const mockTripStartDate = firebase.firestore.Timestamp.fromDate(
    new Date(startYear, startMonth - 1, startDay));
const mockTripEndDate = firebase.firestore.Timestamp.fromDate(
    new Date(endYear, endMonth - 1, endDay));
const mockTripDest = 'A place';
const mockTripCollaborators = ['bob.dude', 'pam.brah'];

const mockTripObjWithFields = jest.fn(() => {
  return {name: mockTripName,
          description: mockTripDescrip,
          start_date: mockTripStartDate,
          end_date: mockTripEndDate,
          destination: mockTripDest,
          collaborators: mockTripCollaborators
         };
});
const mockTripObjNoFields = jest.fn(() => {
  return {someOtherField: 'Not a relevant field.',
          start_date: mockTripStartDate
         };
});
const errorStub = 'Unable to fetch trip ';


describe('getTitle Tests', () => {
  test('Trip object with name field', () => {
    expect(getTitle(mockTripObjWithFields()))
        .toBe(mockTripName);
  });
  test('Trip object with no name field', () => {
    expect(getTitle(mockTripObjNoFields()))
        .toBe(errorStub + 'title');
  });
  test('Null trip object', () => {
    expect(getTitle(null))
        .toBe(errorStub + 'title');
  });
});

describe('getDescription Tests', () => {
  test('Trip object with description field', () => {
    expect(getDescription(mockTripObjWithFields()))
        .toBe(mockTripDescrip);
  });
  test('Trip object with no description field', () => {
    expect(getDescription(mockTripObjNoFields()))
        .toBe(errorStub + 'description');
  });
  test('Null trip object', () => {
    expect(getDescription(null))
        .toBe(errorStub + 'description');
  });
});

describe('getDateRange Tests', () => {
  test('Trip object with dates field', () => {
    expect(getDateRange(mockTripObjWithFields()))
        .toBe(`${startMonth}/${startDay}/${startYear} - ` +
        `${endMonth}/${endDay}/${endYear}`);
  });
  test('Trip object with no end date field', () => {
    expect(getDateRange(mockTripObjNoFields()))
        .toBe(errorStub + 'start and/or end date(s)');
  });
  test('Null trip object', () => {
    expect(getDateRange(null))
        .toBe(errorStub + 'start and/or end date(s)');
  });
});

describe('getDestination Tests', () => {
  test('Trip object with destination field', () => {
    expect(getDestination(mockTripObjWithFields()))
        .toBe(mockTripDest);
  });
  test('Trip object with no destination field', () => {
    expect(getDestination(mockTripObjNoFields()))
        .toBe(errorStub + 'destination');
  });
  test('Null trip object', () => {
    expect(getDestination(null))
        .toBe(errorStub + 'destination');
  });
});

describe('getCollaborators Tests', () => {
  test('Trip object with collaborators field', () => {
    expect(getCollaborators(mockTripObjWithFields()))
        .toBe(mockTripCollaborators.join(', '));
  });
  test('Trip object with no collaborators field', () => {
    expect(getCollaborators(mockTripObjNoFields()))
        .toBe(errorStub + 'collaborators');
  });
  test('Null trip object', () => {
    expect(getCollaborators(null))
        .toBe(errorStub + 'collaborators');
  });
});
