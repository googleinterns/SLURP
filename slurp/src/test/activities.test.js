const activityFns = require('../main/webapp/scripts/activities.js');

// Date objects to be used in tests. 
let ten, eleven, elevenThirty, twelve, one;
// Activity "objects" to be used in tests.
let tenTpTwelve, elevenToOne, elevenToElevenThirty, tenToEleven, elevenToTwelve;

function createActivity(startTime, endTime){
  return {'start_time': startTime, 'end_time': endTime};
}

beforeEach(() => {
  // Declare times to be used in 
  ten = new Date(Date.UTC(2020,  4, 2, 10,  0));
  eleven = new Date(Date.UTC(2020, 4, 2, 11, 0));
  elevenThirty = new Date(Date.UTC(2020, 4, 2, 11, 30));
  twelve = new Date(Date.UTC(2020, 4, 2, 12, 0));
  one = new Date(Date.UTC(2020, 4, 2, 13, 0));

  tenToTwelve = createActivity(ten, twelve);
  elevenToOne = createActivity(eleven, one);
  elevenToElevenThirty = createActivity(eleven, elevenThirty);
  tenToEleven = createActivity(ten, eleven);
  elevenToTwelve = createActivity(eleven, twelve);
})

test('Overlapping activities', () => {
  expect(activityFns.compareActivities(elevenToOne, tenToTwelve)).toBe(1);
})

test('One activity completely during another', () => {
  expect(activityFns.compareActivities(tenToTwelve, elevenToElevenThirty)).toBe(-1);
})

test('Activities with same start time', () => {
  expect(activityFns.compareActivities(tenToEleven, tenToTwelve)).toBe(-1);
})

test('Sequential activities', () => {
  expect(activityFns.compareActivities(tenToEleven, elevenToTwelve)).toBe(-1);
})

test('Activities with same end time', () => {
  expect(activityFns.compareActivities(elevenToTwelve, tenToTwelve)).toBe(1);
})
