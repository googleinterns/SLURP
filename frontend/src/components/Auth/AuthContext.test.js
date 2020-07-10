import React, { useContext } from 'react';
import { render, act, screen, cleanup } from '@testing-library/react';
import { AuthContext, AuthProvider } from './index';

jest.useFakeTimers();

// Mock the the Firebase Auth onAuthStateChanged function, which pauses for 1
// second before returning a fake user with only a name field set.
const mockOnAuthStateChanged = jest.fn(cb => {
  setTimeout(() => {
    cb({ name: 'Keiffer' })
  }, 1000);
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

describe('AuthProvider component', () => {
  beforeEach(() => {
    render(<AuthProvider />);
  });

  afterEach(() => {
    cleanup();
  });

  it('initially displays "Loading"', () => {
    act(() => jest.advanceTimersByTime(500));
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('returns a provider when onAuthStateChanged is called', () => {
    act(() => jest.advanceTimersByTime(2000));
    expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
  });
});

describe('AuthContext Consumer component', () => {
  // A Consumer component for AuthContext that just displays the current
  // user.
  const TestAuthContextConsumerComponent = () => {
    const {currentUser} = useContext(AuthContext);

    return (
      <div>
        <div>{currentUser.name}</div>
      </div>
    );
  }

  beforeEach(() => {
    render(
      <AuthProvider>
        <TestAuthContextConsumerComponent />
      </AuthProvider>
    );
  })

  afterEach(() => {
    cleanup();
  })

  it('initially displays "Loading"', () => {
    act(() => jest.advanceTimersByTime(500));
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('displays the current user when they are authenticated', () => {
    act(() => jest.advanceTimersByTime(2000));
    expect(screen.getByText('Keiffer')).toBeInTheDocument();
  })
});
