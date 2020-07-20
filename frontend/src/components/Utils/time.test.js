import * as utils from './time';

const TZ_CHICAGO = 'America/Chicago';
const TZ_SINGAPORE = 'Asia/Singapore';

test('new york date timestamp format', () => {
  // Month parameter is zero indexed so it's actually the 10th month.
  const testDate = new Date(Date.UTC(2020, 9, 3, 14, 19, 4, 23)).getTime();
  const expected = 'Saturday, October 3, 2020';
  const actual = utils.timestampToDateFormatted(testDate);
  expect(actual).toEqual(expected);
});

test('other date timestamp format', () => {
  const testDate = new Date(Date.UTC(2020, 7, 23, 2, 3, 2, 4)).getTime();
  const expectedCentral = 'Saturday, August 22, 2020';
  const expectedSingapore = 'Sunday, August 23, 2020';
  const actualCentral = utils.timestampToDateFormatted(testDate, TZ_CHICAGO);
  const actualSingapore = utils.timestampToDateFormatted(testDate, TZ_SINGAPORE);
  expect(actualCentral).toEqual(expectedCentral);
  expect(actualSingapore).toEqual(expectedSingapore);
})

test('new york time timestamp format', () => {
  // Month parameter is zero indexed so it's actually the 10th month.
  const testDate = new Date(Date.UTC(2020, 9, 3, 14, 19, 4, 23)).getTime();
  const expected = '10:19 AM';
  const actual = utils.timestampToTimeFormatted(testDate);
  expect(actual).toEqual(expected);
});

test('other time timestamp format', () => {
  const testDate = new Date(Date.UTC(2020, 7, 23, 2, 3, 2, 4)).getTime();
  const expectedCentral = '9:03 PM';
  const expectedSingapore = '10:03 AM';
  const actualCentral = utils.timestampToTimeFormatted(testDate, TZ_CHICAGO);
  const actualSingapore = utils.timestampToTimeFormatted(testDate, TZ_SINGAPORE);
  expect(actualCentral).toEqual(expectedCentral);
  expect(actualSingapore).toEqual(expectedSingapore);
})

test('new york full timestamp format', () => {
  // Month parameter is zero indexed so it's actually the 10th month.
  const testDate = new Date(Date.UTC(2020, 9, 3, 14, 19, 4, 23)).getTime();
  const expected = 'Saturday, October 3, 2020, 10:19 AM';
  const actual = utils.timestampToFormatted(testDate);
  expect(actual).toEqual(expected);
});

test('other full timestamp format', () => {
  const testDate = new Date(Date.UTC(2020, 7, 23, 2, 3, 2, 4)).getTime();
  const expectedCentral = 'Saturday, August 22, 2020, 9:03 PM';
  const expectedSingapore = 'Sunday, August 23, 2020, 10:03 AM';
  const actualCentral = utils.timestampToFormatted(testDate, 'America/Chicago');
  const actualSingapore = utils.timestampToFormatted(testDate, 'Asia/Singapore');
  expect(actualCentral).toEqual(expectedCentral);
  expect(actualSingapore).toEqual(expectedSingapore);
})

describe('timezones for country', () => {
  test('legit country no spaces', () => {
    const actual = utils.timezonesForCountry('China');
    const expected = ['Asia/Shanghai', 'Asia/Urumqi'];
    expect(new Set(actual.sort())).toEqual(new Set(expected.sort()));
  })

  test('legit country, yes spaces', () => {
    const actual = utils.timezonesForCountry('United States of America');
    expect(actual).toContain('America/Anchorage');
    expect(actual).toContain('America/New York');
    expect(actual).not.toContain('Africa/Accra');
  })

  test('not legit country (spaces and non spaces)', () => {
    const actual = utils.timezonesForCountry('MURICA');
    expect(actual).toContain('America/New York');
    expect(actual).toContain('Europe/Paris');
    expect(actual).toContain('Africa/Accra');
  })
})

test('new york date barebones format', () => {
  // Month parameter is zero indexed so it's actually the 10th month.
  const testDate = new Date(Date.UTC(2020, 9, 3, 14, 19, 4, 23)).getTime();
  const expected = '2020-10-03';
  const actual = utils.getDateBarebones(testDate);
  expect(actual).toEqual(expected);
});

test('other date barebones format', () => {
  const testDate = new Date(Date.UTC(2020, 7, 23, 2, 3, 2, 4)).getTime();
  const expectedCentral = '2020-08-22';
  const expectedSingapore = '2020-08-23';
  const actualCentral = utils.getDateBarebones(testDate, TZ_CHICAGO);
  const actualSingapore = utils.getDateBarebones(testDate, TZ_SINGAPORE);
  expect(actualCentral).toEqual(expectedCentral);
  expect(actualSingapore).toEqual(expectedSingapore);
});

test('24h crazy queries', () => {  
  const testDate = new Date(Date.UTC(2020, 7, 23, 2, 3, 2, 4)).getTime();
  const expected = "02:03";
  expect(utils.get24hTime(testDate, '')).toBe(expected);
  expect(utils.get24hTime(testDate, null)).toBe(expected);
});

test('UTC time 24h format', () => {
  // Month parameter is zero indexed so it's actually the 10th month.
  const testDate = new Date(Date.UTC(2020, 9, 3, 14, 19, 4, 23)).getTime();
  const expected = '14:19';
  const actual = utils.get24hTime(testDate);
  expect(actual).toEqual(expected);
});

test('other time 24h format', () => {
  const testDate = new Date(Date.UTC(2020, 7, 23, 2, 3, 2, 4)).getTime();
  const expectedCentral = '21:03';
  const expectedSingapore = '10:03';
  const actualCentral = utils.get24hTime(testDate, TZ_CHICAGO);
  const actualSingapore = utils.get24hTime(testDate, TZ_SINGAPORE);
  expect(actualCentral).toEqual(expectedCentral);
  expect(actualSingapore).toEqual(expectedSingapore);
})

test('barebones crazy queries', () => {  
  const testDate = new Date(Date.UTC(2020, 7, 23, 2, 3, 2, 4)).getTime();
  const expected = "2020-08-23";
  expect(utils.getDateBarebones(testDate, '')).toBe(expected);
  expect(utils.getDateBarebones(testDate, null)).toBe(expected);
})