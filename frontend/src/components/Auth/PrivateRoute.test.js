import React from 'react';
import { Router, Route } from 'react-router-dom';
import { render, screen, cleanup } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import PrivateRoute from './PrivateRoute.js';

import { SIGN_IN } from '../../constants/routes.js';

const history = createMemoryHistory();

// Mock the useContext function so that, when called in the PrivateRoute
// component, returns null the first time and a fake user the second time.
jest.mock('react', () => (
  {
    ...(jest.requireActual('react')),
    useContext: jest
      .fn()
      .mockReturnValueOnce(null)
      .mockReturnValueOnce({ name: 'Keiffer' })
  }
));

describe('PrivateRoute component', () => {
  const TestComponent = () => {
    return (
      <div>Hello, World!</div>
    );
  };

  beforeEach(() => {
    render(
      <Router history={history}>
        <PrivateRoute component={TestComponent} />
        <Route path={SIGN_IN} />
      </Router>
    );
  });

  afterEach(cleanup);

  // mockOnAuthStateChanged called first time, so user should be null.
  it('redirects to SIGN_IN when the user is not authenticated', () => {
    expect(history.location.pathname).toEqual(SIGN_IN);
  });

  // mockOnAuthStateChanged called second time, so user should not be null.
  it('renders the given component when the user is authenticated', () => {
    expect(screen.getByText('Hello, World!')).toBeInTheDocument();
  });
});
