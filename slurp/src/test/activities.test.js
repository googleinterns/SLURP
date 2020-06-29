const activityFns = require('../main/webapp/scripts/activities.js');

function createActivity(startTime, endTime){
  return {'start_time': startTime, 'end_time': endTime};
}

test('blank', () => {
  expect(1).toEqual(1);
})

test('compare activities set', () => {
  const ten = new Date(Date.UTC(2020,  4, 2, 10,  0));
  const eleven = new Date(Date.UTC(2020, 4, 2, 11, 0));
  const elevenThirty = new Date(Date.UTC(2020, 4, 2, 11, 30));
  const twelve = new Date(Date.UTC(2020, 4, 2, 12, 0));
  const one = new Date(Date.UTC(2020, 4, 2, 13, 0));

  const tenToTwelve = createActivity(ten, twelve);
  const elevenToOne = createActivity(eleven, one);
  const elevenToElevenThirty = createActivity(eleven, elevenThirty);
  const tenToEleven = createActivity(ten, eleven);
  const elevenToTwelve = createActivity(eleven, twelve);

  expect(activityFns.compareActivities(elevenToOne, tenToTwelve)).toBe(1);
  expect(activityFns.compareActivities(tenToTwelve, elevenToElevenThirty)).toBe(-1);
  expect(activityFns.compareActivities(tenToEleven, tenToTwelve)).toBe(-1);
  expect(activityFns.compareActivities(tenToEleven, elevenToTwelve)).toBe(-1);
  expect(activityFns.compareActivities(elevenToTwelve, tenToTwelve)).toBe(1);
})