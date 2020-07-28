import authUtils from './index.js';
import { getCurrentUser } from './AuthUtilsConsumer.js';
import { SIGN_IN } from '../../constants/routes.js';

const mockDisplayName = 'Sam Smith';
const mockEmail = 'samsmith@email.com';
const mockPhotoURL = 'http://www.photo-hosters.com/qwerty';
const mockUid = '1234567890';
const mockAuthenticatedUser = {
  displayName: mockDisplayName,
  email: mockEmail,
  photoURL: mockPhotoURL,
  uid: mockUid
};
const mockUnauthenticatedUser = null;

jest.mock('./AuthUtilsConsumer.js', () => ({
  getCurrentUser: jest.fn()
}));

describe('auth utility functions when authenticated', () => {
  beforeEach(() => {
    getCurrentUser.mockImplementation(() => mockAuthenticatedUser);
    expect(getCurrentUser()).toBe(mockAuthenticatedUser);
  })

  test('getCurUserDisplayName function', () => {
    expect(authUtils.getCurUserDisplayName()).toBe(mockDisplayName);
  });

  test('getCurUserEmail function', () => {
    expect(authUtils.getCurUserEmail()).toBe(mockEmail);
  });

  test('getCurUserPhotoUrl function', () => {
    expect(authUtils.getCurUserPhotoUrl()).toBe(mockPhotoURL);
  });

  test('getCurUserUid function', () => {
    expect(authUtils.getCurUserUid()).toBe(mockUid);
  });
});

// All utility functions in this scenario should do the same thing: redirect to
// the SIGN_IN page.
describe('auth utility functions when not authenticated', () => {
  // Delete the default window.location object set by Jest to use my own mock.
  beforeAll(() => {
    delete window.location;
  });

  beforeEach(() => {
    window.location = {
      href: ''
    }
    getCurrentUser.mockImplementation(() => mockUnauthenticatedUser);
    expect(getCurrentUser()).toBe(mockUnauthenticatedUser);
  });

  test('getCurUserDisplayName function', () => {
    authUtils.getCurUserDisplayName();
    expect(window.location.href).toBe(SIGN_IN);
  });

  test('getCurUserEmail function', () => {
    authUtils.getCurUserEmail();
    expect(window.location.href).toBe(SIGN_IN);
  });

  test('getCurUserPhotoUrl function', () => {
    authUtils.getCurUserPhotoUrl();
    expect(window.location.href).toBe(SIGN_IN);
  });

  test('getCurUserUid function', () => {
    authUtils.getCurUserUid();
    expect(window.location.href).toBe(SIGN_IN);
  });
});
