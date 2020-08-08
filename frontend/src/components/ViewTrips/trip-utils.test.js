import * as TripUtils  from './trip-utils.js';

const mockCurUserEmail = 'cur.user@email.com';
const USER_A_EMAIL = 'apple@email.com';
const USER_B_EMAIL = 'banana@email.com';
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
    const expectedUidArr = [];
    // This is the list that is created when there are no collaborators added
    // (automatically one empty string from the constructor created ref).
    const testEmailArr = [''];

    const testUidArr = await TripUtils.getCollaboratorUidArray(testEmailArr);

    expect(testUidArr).toEqual(expectedUidArr);
  });

  test('Some added collaborators and some blank entries', async () => {
    const expectedUidArr = [`_${USER_A_EMAIL}_`,
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

// Note: Although getNewAcceptedCollabArr handles array's of uids, the strings
//       in each array do not have to have a specific form. Thus, the
//       user emails can be used as test string array` elements.
describe('getNewAcceptedCollabArr tests', () => {
  test('No previous accepted collabs', () => {
    const expectedNewAcceptedCollabUidArr = [];
    const testFormCollabUidArr = [USER_A_EMAIL, USER_B_EMAIL, USER_Z_EMAIL];
    const testCurAcceptedCollabUidArr = [];

    const testNewAcceptedCollabUidArr = TripUtils.getNewAcceptedCollabUidArr(
                            testFormCollabUidArr, testCurAcceptedCollabUidArr);

    expect(testNewAcceptedCollabUidArr).toEqual(expectedNewAcceptedCollabUidArr);
  });

  test('One previous accepted collab', () => {
    const expectedNewAcceptedCollabUidArr = [USER_A_EMAIL];
    const testFormCollabUidArr = [USER_A_EMAIL, USER_B_EMAIL, USER_Z_EMAIL];
    const testCurAcceptedCollabUidArr = [USER_A_EMAIL];

    const testNewAcceptedCollabUidArr = TripUtils.getNewAcceptedCollabUidArr(
                            testFormCollabUidArr, testCurAcceptedCollabUidArr);

    expect(testNewAcceptedCollabUidArr).toEqual(expectedNewAcceptedCollabUidArr);
  });

  test('Two current accepted collab and one accepted collab deleted in ' +
       'the collabs listed in the form.', () => {
    const expectedNewAcceptedCollabUidArr = [USER_B_EMAIL];
    const testFormCollabUidArr = [USER_B_EMAIL, USER_Z_EMAIL];
    const testCurAcceptedCollabUidArr = [USER_A_EMAIL, USER_B_EMAIL];

    const testNewAcceptedCollabUidArr = TripUtils.getNewAcceptedCollabUidArr(
                            testFormCollabUidArr, testCurAcceptedCollabUidArr);

    expect(testNewAcceptedCollabUidArr).toEqual(expectedNewAcceptedCollabUidArr);
  });
});

// Note:
//     - Although getNewPendingCollabArr handles array's of uids, the strings
//       in each array do not have to have a specific form. Thus, the
//       user emails can be used as test string array` elements.
//     - Each of the test names and inputs are the same as the group of tests
//       above ('getNewAcceptedCollabArr' tests). There is no mention of whether
//       or not there are current pending collaborators because
//       'getNewPendingCollabUidArr' uses only the current accepted collabs to
//       determine the new/current pending collabs.
describe('getNewPendingCollabArr tests', () => {
  test('No current accepted collabs', () => {
    const expectedNewPendingCollabUidArr = [USER_A_EMAIL, USER_B_EMAIL, USER_Z_EMAIL];
    const testFormCollabUidArr = [USER_A_EMAIL, USER_B_EMAIL, USER_Z_EMAIL];
    const testCurAcceptedCollabUidArr = [];

    const testNewPendingCollabUidArr = TripUtils.getNewPendingCollabUidArr(
                            testFormCollabUidArr, testCurAcceptedCollabUidArr);

    expect(testNewPendingCollabUidArr).toEqual(expectedNewPendingCollabUidArr);
  });

  test('One current accepted collab', () => {
    const expectedNewPendingCollabUidArr = [USER_B_EMAIL, USER_Z_EMAIL];
    const testFormCollabUidArr = [USER_A_EMAIL, USER_B_EMAIL, USER_Z_EMAIL];
    const testCurAcceptedCollabUidArr = [USER_A_EMAIL];

    const testNewPendingCollabUidArr = TripUtils.getNewPendingCollabUidArr(
                            testFormCollabUidArr, testCurAcceptedCollabUidArr);

    expect(testNewPendingCollabUidArr).toEqual(expectedNewPendingCollabUidArr);
  });

  test('Two current accepted collab and one accepted collab deleted in ' +
       'the collabs listed in the form.', () => {
    const expectedNewPendingCollabUidArr = [USER_Z_EMAIL];
    const testFormCollabUidArr = [USER_B_EMAIL, USER_Z_EMAIL];
    const testCurAcceptedCollabUidArr = [USER_A_EMAIL, USER_B_EMAIL];

    const testNewPendingCollabUidArr = TripUtils.getNewPendingCollabUidArr(
                            testFormCollabUidArr, testCurAcceptedCollabUidArr);

    expect(testNewPendingCollabUidArr).toEqual(expectedNewPendingCollabUidArr);
  });
});
