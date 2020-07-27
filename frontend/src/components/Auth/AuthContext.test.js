import React, { useContext } from 'react';
import { render, act, screen, cleanup } from '@testing-library/react';
import { AuthContext, AuthProvider } from './AuthContext.js';

jest.useFakeTimers();

// All times are in milliseconds.
const TIME_BEFORE_USER_IS_LOADED = 500;
const TIME_WHEN_USER_IS_LOADED = 1000;
const TIME_AFTER_USER_IS_LOADED = 2000;

// Mock the the Firebase Auth onAuthStateChanged function, which pauses for the
// time given by TIME_WHEN_USER_IS_LOADED, then returns a fake user with only
// the property `name: 'Keiffer'`.
const mockOnAuthStateChanged = jest.fn(callback => {
  setTimeout(() => {
    callback({ name: 'Keiffer' })
  }, TIME_WHEN_USER_IS_LOADED);
});
jest.mock('firebase/app', () => {
  return {
    initializeApp: () => {
      return {
        auth: () => {
          return {
            onAuthStateChanged: mockOnAuthStateChanged
          }
        }
      }
    }
  }
});

afterEach(cleanup);

describe('AuthProvider component', () => {
  beforeEach(() => { render(<AuthProvider />) });

  it('initially displays "Loading"', () => {
    act(() => jest.advanceTimersByTime(TIME_BEFORE_USER_IS_LOADED));
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('returns a provider when onAuthStateChanged is called', () => {
    act(() => jest.advanceTimersByTime(TIME_AFTER_USER_IS_LOADED));
    expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
  });
});

describe('AuthContext Consumer component', () => {
  // A Consumer component for AuthContext that just displays the current
  // user.
  const TestAuthContextConsumerComponent = () => {
    const currentUser = useContext(AuthContext);

    return (
      <div>
        <div>{currentUser.name}</div>
      </div>
    );
  };

  beforeEach(() => {
    render(
      <AuthProvider>
        <TestAuthContextConsumerComponent />
      </AuthProvider>
    );
  });

  it('initially displays "Loading"', () => {
    act(() => jest.advanceTimersByTime(TIME_BEFORE_USER_IS_LOADED));
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('displays the current user when they are authenticated', () => {
    act(() => jest.advanceTimersByTime(TIME_AFTER_USER_IS_LOADED));
    expect(screen.getByText('Keiffer')).toBeInTheDocument();
  });
});
