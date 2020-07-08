import * as activityFns from './activityfns';

// Date objects to be used in tests. All on May 2nd, 2020. 
const ten = new Date(Date.UTC(2020,  4, 2, 10,  0));
const eleven = new Date(Date.UTC(2020, 4, 2, 11, 0));
const elevenThirty = new Date(Date.UTC(2020, 4, 2, 11, 30));
const twelve = new Date(Date.UTC(2020, 4, 2, 12, 0));
const one = new Date(Date.UTC(2020, 4, 2, 13, 0));

// Date objects to be used in tests. All on different days.
const may102pm = new Date(Date.UTC(2020, 4, 10, 14, 0));
const may014pm = new Date(Date.UTC(2020, 4, 1, 16, 0));
const may153am = new Date(Date.UTC(2020, 4, 15, 3, 0));

function createActivity(startTime, endTime){
  return {'start_time': startTime, 'end_time': endTime};
}

describe('Same day activity compareActivities', () => {
  const tenToTwelve = createActivity(ten, twelve);
  const elevenToOne = createActivity(eleven, one);
  const elevenToElevenThirty = createActivity(eleven, elevenThirty);
  const tenToEleven = createActivity(ten, eleven);
  const elevenToTwelve = createActivity(eleven, twelve);

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
})

test('compareActivities on different days', () => {
  const may10 = createActivity(may102pm, may102pm);
  const may15 = createActivity(may153am, may153am);
  const may01 = createActivity(may014pm, may014pm);
  expect(activityFns.compareActivities(may10, may01)).toBe(1);
  expect(activityFns.compareActivities(may15, may01)).toBe(1);
})

describe('sortByDate tests', () => {
  const act1 = createActivity(ten, eleven);
  const act2 = createActivity(elevenThirty, twelve);
  const act3 = createActivity(twelve, one);
  const act4 = createActivity(may102pm, may102pm);
  const act5 = createActivity(may153am, may153am);

  test('sortByDate all same date', () => {
    const tripActivities = [act1, act2, act3];

    let expected = new Map();
    expected.set(ten.toLocaleDateString(), new Set([act1, act2, act3]));
    expected = Array.from(expected);

    expect(activityFns.sortByDate(tripActivities)).toEqual(expected);
  })

  test('sortByDate all differentDates', () =>   {
    const tripActivities = [act3, act4, act5];
    
    let expected = new Map();
    expected.set(ten.toLocaleDateString(), new Set([act3]));
    expected.set(may102pm.toLocaleDateString(), new Set([act4]));
    expected.set(may153am.toLocaleDateString(), new Set([act5]));
    expected = Array.from(expected);

    expect(activityFns.sortByDate(tripActivities)).toEqual(expected);
  })

  test('sortByDate mixed dates', () => {
    const tripActivities = [act3, act4, act1, act5, act2];
    
    let expected = new Map();
    expected.set(ten.toLocaleDateString(), new Set([act3, act1, act2]));
    expected.set(may102pm.toLocaleDateString(), new Set([act4]));
    expected.set(may153am.toLocaleDateString(), new Set([act5]));
    expected = Array.from(expected);

    expect(activityFns.sortByDate(tripActivities)).toEqual(expected);
  })
})