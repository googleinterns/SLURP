import { moveCurUserEmailToFront } from './trip.js'

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
