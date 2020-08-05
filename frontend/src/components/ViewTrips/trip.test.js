import * as firebase from 'firebase/app';
import 'firebase/firebase-firestore';

import { getDateRange, moveCurUserEmailToFront } from './trip.js'

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
  const testStartDate = firebase.firestore.Timestamp.fromDate(
      new Date(startYear, startMonth - 1, startDay));
  const testEndDate = firebase.firestore.Timestamp.fromDate(
      new Date(endYear, endMonth - 1, endDay));
  const testTripObj = {start_date: testStartDate, end_date: testEndDate};
  const testDateRange = getDateRange(testTripObj);

  const expectedDateRange = `${startMonth}/${startDay}/${startYear} - ` +
        `${endMonth}/${endDay}/${endYear}`;
  expect(testDateRange).toEqual(expectedDateRange);
})

const mockCurUserEmail = 'cur.user@email.com';
const USER_A_EMAIL = 'apple@email.com';
const USER_Z_EMAIL = 'zamboni@email.com';
jest.mock('../AuthUtils', () => ({
    getCurUserEmail: () => mockCurUserEmail,
}));
describe('moveCurUserEmailToFront tests', () => {
  test('No users (error is caught in getUserEmailArrFromUserUidArr)', async () => {
    const expectedEmailArr = [mockCurUserEmail];
    const testEmailInputArr = [];

    const testEmailOutputArr = moveCurUserEmailToFront(testEmailInputArr);

    expect(testEmailOutputArr).toEqual(expectedEmailArr);
  });

  test('Only the current user', async () => {
    const expectedEmailArr = [mockCurUserEmail];
    const testEmailInputArr = [mockCurUserEmail];

    const testEmailOutputArr = moveCurUserEmailToFront(testEmailInputArr);

    expect(testEmailOutputArr).toEqual(expectedEmailArr);
  });

  test('Current user between two others (alphabetical order)', async () => {
    const expectedEmailArr = [mockCurUserEmail, USER_A_EMAIL, USER_Z_EMAIL];
    const testEmailInputArr = [USER_A_EMAIL, mockCurUserEmail, USER_Z_EMAIL];

    const testEmailOutputArr = moveCurUserEmailToFront(testEmailInputArr);

    expect(testEmailOutputArr).toEqual(expectedEmailArr);
  });
});
