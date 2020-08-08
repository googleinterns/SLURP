import * as activityFns from './activityfns.js';
import * as time from '../Utils/time.js';
import * as DB from '../../constants/database.js';
import * as moment from 'moment-timezone';

const ten = Date.UTC(2020, 4, 2, 10,  0);          // May 2, 2020 10:00
const eleven = Date.UTC(2020, 4, 2, 11, 0);        // May 2, 2020 11:00
const elevenThirty = Date.UTC(2020, 4, 2, 11, 30); // May 2, 2020 11:30
const twelve = Date.UTC(2020, 4, 2, 12, 0);        // May 2, 2020 12:00
const one = Date.UTC(2020, 4, 2, 13, 0);           // May 2, 2020 13:00
const may102pm = Date.UTC(2020, 4, 10, 14, 0);     // May 10, 2020 14:00
const may014pm = Date.UTC(2020, 4, 1, 16, 0);      // May 1, 2020 16:00
const may153am = Date.UTC(2020, 4, 15, 3, 0);      // May 15, 2020 3:00

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
  
  test('compareActivities on different days', () => {
    const may10 = createActivity(may102pm, may102pm);
    const may15 = createActivity(may153am, may153am);
    const may01 = createActivity(may014pm, may014pm);
    expect(activityFns.compareActivities(may10, may01)).toBe(1);
    expect(activityFns.compareActivities(may15, may01)).toBe(1);
  })
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
    expected.set(time.getISODate(ten), new Set([act1, act2, act3]));
    expected = Array.from(expected);

    expect(activityFns.sortByDate(tripActivities)).toEqual(expected);
  })

  test('sortByDate all differentDates', () =>   {
    const tripActivities = [act3, act4, act5];
    
    let expected = new Map();
    expected.set(time.getISODate(ten), new Set([act3]));
    expected.set(time.getISODate(may102pm), new Set([act4]));
    expected.set(time.getISODate(may153am), new Set([act5]));
    expected = Array.from(expected);

    expect(activityFns.sortByDate(tripActivities)).toEqual(expected);
  })

  test('sortByDate mixed dates', () => {
    const tripActivities = [act3, act4, act1, act5, act2];
    
    let expected = new Map();
    expected.set(time.getISODate(ten), new Set([act3, act1, act2]));
    expected.set(time.getISODate(may102pm), new Set([act4]));
    expected.set(time.getISODate(may153am), new Set([act5]));
    expected = Array.from(expected);

    expect(activityFns.sortByDate(tripActivities)).toEqual(expected);
  })
})

test('getField', () => {
  const activity = {field1: 'yes'};
  expect(activityFns.getField(activity, 'field1', 'nooo')).toBe('yes');
  expect(activityFns.getField(activity, 'field2', 4)).toBe(4);
  expect(activityFns.getField(activity, 'field1', 'nooo', 'aww ')).toBe('aww yes');
  expect(activityFns.getField(activity, 'field2', 4, ' and')).toBe(4);
  expect(activityFns.getField(activity, 'field2')).toBeNull();
})

test('getRefValue', () => {
  const fakeRef = {current: {value: 'parasailing!'}};
  expect(activityFns.getRefValue(fakeRef, 'parasailing!')).toBeNull();
  expect(activityFns.getRefValue(fakeRef, 'parasailing!', 'swimming.')).toBe('swimming.');
  expect(activityFns.getRefValue(fakeRef, 'swimming')).toBe('parasailing!');
  expect(activityFns.getRefValue(fakeRef, 'swimming', 'jumping')).toBe('parasailing!');
});

describe('displayTimes', () => {
  function createInfoActivity(startDate, startTime, startTz, endDate, endTime, endTz) {
    return {
      [DB.ACTIVITIES_START_TIME] : moment.tz(startDate + " " + startTime, startTz).valueOf(),
      [DB.ACTIVITIES_START_TZ] : startTz,
      [DB.ACTIVITIES_END_TIME] : moment.tz(endDate + " " + endTime, endTz).valueOf(), 
      [DB.ACTIVITIES_END_TZ] : endTz,
    }
  }
  
  test('displayTimes', () => {
    const aug5 = "2020-08-05";
    const aug6 = "2020-08-06";
    const nineThirty = "09:30";
    const tenThirty = "10:30";
    const chicago = "America/Chicago";
    const singapore = "Asia/Singapore";
    
    console.log(createInfoActivity(aug5, nineThirty, chicago, aug5, tenThirty, chicago));

    expect(activityFns.displayTimes(createInfoActivity(aug5, nineThirty, chicago, aug5, tenThirty, chicago))).toEqual(`9:30 AM - 10:30 AM`);
    expect(activityFns.displayTimes(createInfoActivity(aug5, nineThirty, chicago, aug5, tenThirty, singapore))).toEqual(`9:30 AM America/Chicago - 10:30 AM Asia/Singapore`);
    expect(activityFns.displayTimes(createInfoActivity(aug5, nineThirty, chicago, aug6, tenThirty, chicago))).toEqual(`9:30 AM - August 6, 2020 10:30 AM`);
    expect(activityFns.displayTimes(createInfoActivity(aug5, nineThirty, chicago, aug6, tenThirty, singapore))).toEqual(`9:30 AM America/Chicago - August 6, 2020 10:30 AM Asia/Singapore`);
  })
});

