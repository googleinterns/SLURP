import { createTitleElement } from './trip.js';

// Mock trip objects
const mockTripName = 'Sample working trip';
const mockTripObjWithName = jest.fn(() => {
  return {name: mockTripName}
});
const mockTripObjNoName = jest.fn(() => {
  return {someOtherField: 'Not a name of a trip'}
});

describe('createTitleElement Tests', () => {
  test('Trip object with name field', () => {
    expect(createTitleElement(mockTripObjWithName()))
        .toBe(mockTripName);
  });
  test('Trip object with no name field', () => {
    expect(createTitleElement(mockTripObjNoName()))
        .toBe('Unable to fetch trip title');
  });
  test('Null trip object with name field', () => {
    expect(createTitleElement(null))
        .toBe('Unable to fetch trip title');
  });
});
