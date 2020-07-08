/**
 * Test file for the SignInButton component.
 */

import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import renderer from 'react-test-renderer';

import SignInButton from './signin-button';
import { SIGN_IN } from '../../constants/routes';

// Mock the push function from react-router-dom's useHistory.
const mockHistoryPush = jest.fn();
jest.mock('react-router-dom', () => ({
  useHistory: () => ({
    push: mockHistoryPush
  })
}));

// SignInButton tests.
describe('SignInButton component', () => {
  it('renders correctly', () => {
    const tree = renderer
      .create(<SignInButton />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('redirects to signin page on click', () => {
    const { getByText } = render(<SignInButton />);
    fireEvent.click(getByText('Sign In'));
    expect(mockHistoryPush).toBeCalledWith(SIGN_IN);
  })
});
