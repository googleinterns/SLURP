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

  test('getUserDisplayName function', () => {
    expect(authUtils.getUserDisplayName()).toBe(mockDisplayName);
  });

  test('getUserEmail function', () => {
    expect(authUtils.getUserEmail()).toBe(mockEmail);
  });

  test('getUserPhotoUrl function', () => {
    expect(authUtils.getUserPhotoUrl()).toBe(mockPhotoURL);
  });

  test('getUserUid function', () => {
    expect(authUtils.getUserUid()).toBe(mockUid);
  });
});

// All utility functions in this scenario should do the same thing: redirect to
// the SIGN_IN page.
describe('auth utility functions when not authenticated', () => {
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

  afterEach(() => {
    expect(window.location.href).toBe(SIGN_IN);
  })

  test('getUserDisplayName function', () => {
    authUtils.getUserDisplayName();
  });

  test('getUserEmail function', () => {
    authUtils.getUserEmail();
  });

  test('getUserPhotoUrl function', () => {
    authUtils.getUserPhotoUrl();
  });

  test('getUserUid function', () => {
    authUtils.getUserUid();
  });
});
