import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import ViewActivities from './index.js';
import authUtils from '../AuthUtils';

const FAKE_USER = 'totally-legit-user';
const FAKE_TRIPID = '12345';
const RESULT_AUTHORIZED = FAKE_TRIPID;
const RESULT_NOT_AUTHORIZED =
    'Sorry, you\'re not authorized to view this trip.';
const RESULT_TRIP_DOESNT_EXIST =
    'Sorry, we couldn\'t find the trip you were looking for.';

// Mock the getUserUid auth utility function to return a fake UID as given by
// FAKE_USER.
jest.mock('../AuthUtils');
authUtils.getUserUid.mockReturnValue(FAKE_USER);

// Mock the ActivityList component to simply render the passed-in tripId.
jest.mock('./activitylist.js', () => (props) => (
    <div>{props.tripId}</div>
));

// Mock the different collaborator fields that can be returned from Firebase
// Firestore. The first time, it returns an array containing the fake user. The
// second time, it returns an array that does not contain the fake user. The
// third time, it returns undefined (imitating Firebase being unable to find the
// trip).
const mockGet = jest.fn()
    .mockResolvedValueOnce({ get: function() {return [FAKE_USER]} })
    .mockResolvedValueOnce({ get: function() {return []} })
    .mockResolvedValueOnce({ get: function() {return undefined} });
jest.mock('firebase/app', () => {
  return {
    initializeApp: () => {
      return {
        firestore: () => {
          return {
            collection: (collectionPath) => {
              return {
                doc: (documentPath) => {
                  return {
                    get: mockGet
                    };
                  }
                };
              }
            };
          }
        };
      }
    };
  });

describe('ViewActivities page', () => {
  beforeEach(() => {
    render(<ViewActivities match={{params: {tripId: FAKE_TRIPID}}}/>);
  });

  afterEach(cleanup);

  it('Displays ActivityList when the user is a collaborator', () => {
    expect(screen.getByText(RESULT_AUTHORIZED)).toBeInTheDocument();
  });

  it('Displays the relevant error when the user is not a collaborator', () => {
    expect(screen.getByText(RESULT_NOT_AUTHORIZED)).toBeInTheDocument();
  });

  it('Displays the relevant error when the trip could not be found', () => {
    expect(screen.getByText(RESULT_TRIP_DOESNT_EXIST)).toBeInTheDocument();
  })
});
