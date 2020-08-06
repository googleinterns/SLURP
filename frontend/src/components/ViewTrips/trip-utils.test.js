import * as TripUtils  from './trip-utils.js';

const mockCurUserEmail = 'cur.user@email.com';
const USER_A_EMAIL = 'apple@email.com';
const USER_Z_EMAIL = 'zamboni@email.com';
jest.mock('../AuthUtils', () => ({
    getCurUserEmail: () => mockCurUserEmail,
    getUserUidArrFromUserEmailArr: (userEmailArr) => {
          return new Promise(resolve => {
            resolve(userEmailArr.map(userEmail => '_' + userEmail + '_'));
          });
        },
}));

describe('getCleanedTextInput tests', () => {
  test('No input entered in form (empty string)', () => {
    const testDefaultValue = 'Untitled Trip';
    const testRawName = '';
    const expectedTripName = testDefaultValue;

    const testTripName = TripUtils.getCleanedTextInput(testRawName,
                                                       testDefaultValue);

    expect(testTripName).toEqual(expectedTripName);
  });

  test('Input entered into form', () => {
    const testDefaultValue = 'Untitled Trip';
    const testRawName = 'Trip to No Man\'s Land';
    const expectedTripName = testRawName;

    const testTripName = TripUtils.getCleanedTextInput(testRawName,
                                                       testDefaultValue);

    expect(testTripName).toEqual(expectedTripName);
  });
});

describe('getCollaboratorUidArray tests', () => {
  test('No collaborators entered', async () => {
    const expectedUidArr = [`_${mockCurUserEmail}_`];
    // This is the list that is created when there are no collaborators added
    // (automatically one empty string from the constructor created ref).
    const testEmailArr = [''];

    const testUidArr = await TripUtils.getCollaboratorUidArray(testEmailArr);

    expect(testUidArr).toEqual(expectedUidArr);
  });

  test('Some added collaborators', async () => {
    const expectedUidArr = [`_${mockCurUserEmail}_`,
                            `_${USER_A_EMAIL}_`,
                            `_${USER_Z_EMAIL}_`];
    const testEmailArr = [USER_A_EMAIL, USER_Z_EMAIL];

    const testUidArr = await TripUtils.getCollaboratorUidArray(testEmailArr);

    expect(testUidArr).toEqual(expectedUidArr);
  });

  test('Some added collaborators and some blank entries', async () => {
    const expectedUidArr = [`_${mockCurUserEmail}_`,
                            `_${USER_A_EMAIL}_`,
                            `_${USER_Z_EMAIL}_`];
    const testEmailArr = ['', USER_A_EMAIL, '', USER_Z_EMAIL, ''];

    const testUidArr = await TripUtils.getCollaboratorUidArray(testEmailArr);

    expect(testUidArr).toEqual(expectedUidArr);
  });
});

describe('moveCurUserEmailToFront tests', () => {
  test('No users (error is caught in getUserEmailArrFromUserUidArr)', () => {
    const expectedEmailArr = [mockCurUserEmail];
    const testEmailInputArr = [];

    const testEmailOutputArr = TripUtils.moveCurUserEmailToFront(testEmailInputArr);

    expect(testEmailOutputArr).toEqual(expectedEmailArr);
  });

  test('Only the current user', () => {
    const expectedEmailArr = [mockCurUserEmail];
    const testEmailInputArr = [mockCurUserEmail];

    const testEmailOutputArr = TripUtils.moveCurUserEmailToFront(testEmailInputArr);

    expect(testEmailOutputArr).toEqual(expectedEmailArr);
  });

  /**
   * The collaborator emails are returned in alphabetical order from
   * `getUserEmailArrFromUserUidArr` in `AuthUtils` so this test sets up a
   * similar situation to a common case for function in "production". In terms
   * of alphabetization in this test, all that this function needs to ensure is
   * that the current user is moved to the front and the other elements in the
   * array maintain their original order.
   */
  test('Current user between two others (alphabetical order)', () => {
    const expectedEmailArr = [mockCurUserEmail, USER_A_EMAIL, USER_Z_EMAIL];
    const testEmailInputArr = [USER_A_EMAIL, mockCurUserEmail, USER_Z_EMAIL];

    const testEmailOutputArr = TripUtils.moveCurUserEmailToFront(testEmailInputArr);

    expect(testEmailOutputArr).toEqual(expectedEmailArr);
  });
});
