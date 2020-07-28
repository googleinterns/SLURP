import React from 'react';
import { render, fireEvent } from '@testing-library/react';

import ViewActivitiesButton from './view-activities-button.js';
import { VIEW_ACTIVITIES } from '../../constants/routes.js';

// Mock the push function from react-router-dom's useHistory.
const mockHistoryPush = jest.fn();
jest.mock('react-router-dom', () => ({
  useHistory: () => ({
    push: mockHistoryPush
  })
}));

describe('SignInButton component', () => {
  test('Redirects to ViewActivities page on click', () => {
    const testTripId = 'abc123';
    const { getByText } = render(<ViewActivitiesButton tripId={testTripId}/>);
    fireEvent.click(getByText('View Activities!'));
    expect(mockHistoryPush).toBeCalledWith(`${VIEW_ACTIVITIES}/${testTripId}`);
  })
});
