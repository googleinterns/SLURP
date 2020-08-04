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

  test('Current user between two others (alphabetical order)', () => {
    const expectedEmailArr = [mockCurUserEmail, USER_A_EMAIL, USER_Z_EMAIL];
    const testEmailInputArr = [USER_A_EMAIL, mockCurUserEmail, USER_Z_EMAIL];

    const testEmailOutputArr = TripUtils.moveCurUserEmailToFront(testEmailInputArr);

    expect(testEmailOutputArr).toEqual(expectedEmailArr);
  });
});

// Note: Although getCurAcceptedCollabArr handles array's of uids, the strings
//       in each array do not have to have a specific form. Thus, the
//       user emails can be used as test string array` elements.
describe('getCurAcceptedCollabArr tests', () => {
  test('No previous accepted collabs', () => {
    const expectedNewAccepCollabUidArr = [];
    const testFormCollabUidArr = [USER_A_EMAIL, USER_B_EMAIL, USER_Z_EMAIL];
    const testCurAccepCollabUidArr = [];

    const testNewAccepCollabUidArr = TripUtils.getCurAcceptedCollabUidArr(
                                testFormCollabUidArr, testCurAccepCollabUidArr);

    expect(testNewAccepCollabUidArr).toEqual(expectedNewAccepCollabUidArr);
  });

  test('One previous accepted collab', () => {
    const expectedNewAccepCollabUidArr = [USER_A_EMAIL];
    const testFormCollabUidArr = [USER_A_EMAIL, USER_B_EMAIL, USER_Z_EMAIL];
    const testCurAccepCollabUidArr = [USER_A_EMAIL];

    const testNewAccepCollabUidArr = TripUtils.getCurAcceptedCollabUidArr(
                                testFormCollabUidArr, testCurAccepCollabUidArr);

    expect(testNewAccepCollabUidArr).toEqual(expectedNewAccepCollabUidArr);
  });

  test('Two previous accepted collab and one deleted in current collabs', () => {
    const expectedNewAccepCollabUidArr = [USER_B_EMAIL];
    const testFormCollabUidArr = [USER_B_EMAIL, USER_Z_EMAIL];
    const testCurAccepCollabUidArr = [USER_A_EMAIL, USER_B_EMAIL];

    const testNewAccepCollabUidArr = TripUtils.getCurAcceptedCollabUidArr(
                                testFormCollabUidArr, testCurAccepCollabUidArr);

    expect(testNewAccepCollabUidArr).toEqual(expectedNewAccepCollabUidArr);
  });
});

// Note: Although getCurPendingCollabArr handles array's of uids, the strings
//       in each array do not have to have a specific form. Thus, the
//       user emails can be used as test string array` elements.
describe('getCurPending CollabArr tests', () => {
  test('No previous accepted collabs', () => {
    const expectedNewAccepCollabUidArr = [USER_A_EMAIL, USER_B_EMAIL, USER_Z_EMAIL];
    const testFormCollabUidArr = [USER_A_EMAIL, USER_B_EMAIL, USER_Z_EMAIL];
    const testCurAccepCollabUidArr = [];

    const testNewAccepCollabUidArr = TripUtils.getCurPendingCollabUidArr(
                                testFormCollabUidArr, testCurAccepCollabUidArr);

    expect(testNewAccepCollabUidArr).toEqual(expectedNewAccepCollabUidArr);
  });

  test('One previous accepted collab', () => {
    const expectedNewAccepCollabUidArr = [USER_B_EMAIL, USER_Z_EMAIL];
    const testFormCollabUidArr = [USER_A_EMAIL, USER_B_EMAIL, USER_Z_EMAIL];
    const testCurAccepCollabUidArr = [USER_A_EMAIL];

    const testNewAccepCollabUidArr = TripUtils.getCurPendingCollabUidArr(
                                testFormCollabUidArr, testCurAccepCollabUidArr);

    expect(testNewAccepCollabUidArr).toEqual(expectedNewAccepCollabUidArr);
  });

  test('Two previous accepted collab and one deleted in current collabs', () => {
    const expectedNewAccepCollabUidArr = [USER_Z_EMAIL];
    const testFormCollabUidArr = [USER_B_EMAIL, USER_Z_EMAIL];
    const testCurAccepCollabUidArr = [USER_A_EMAIL, USER_B_EMAIL];

    const testNewAccepCollabUidArr = TripUtils.getCurPendingCollabUidArr(
                                testFormCollabUidArr, testCurAccepCollabUidArr);

    expect(testNewAccepCollabUidArr).toEqual(expectedNewAccepCollabUidArr);
  });
});
