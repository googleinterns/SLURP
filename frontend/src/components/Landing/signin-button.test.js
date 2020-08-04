import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import renderer from 'react-test-renderer';

import SignInButton from './signin-button.js';
import { SIGN_IN } from '../../constants/routes.js';

// Mock the push function from react-router-dom's useHistory.
const mockHistoryPush = jest.fn();
jest.mock('react-router-dom', () => ({
  useHistory: () => ({
    push: mockHistoryPush
  })
}));

describe('SignInButton component', () => {
  it('renders correctly', () => {
    const tree = renderer
      .create(<SignInButton />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('redirects to signin page on click', () => {
    const { getByText } = render(<SignInButton />);
    fireEvent.click(getByText(/Go/));
    expect(mockHistoryPush).toBeCalledWith(SIGN_IN);
  })
});
