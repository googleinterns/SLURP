const utils = require('../main/webapp/scripts/utils.js');

test('single parse no special chars', () => {
  const url = "test.html?key1=value1";
  const urlParams = utils.parseUrl(url);
  expect(urlParams).toEqual({"key1": "value1"});
});

test('multiple parse no special chars', () => {
  const url = "test.html?key1=value1&key2=value2";
  const urlParams = utils.parseUrl(url);
  expect(urlParams).toEqual({"key1": "value1", "key2": "value2"});
});

test('multiple parse with special chars', () => {
  const url = "test.html?key1=!#sJk3r2Iedy2dw[-cc2>&key2=value2";
  const urlParams = utils.parseUrl(url);
  expect(urlParams).toEqual({"key1": "!#sJk3r2Iedy2dw[-cc2>", "key2": "value2"});
});

test('new york timestamp format', () => {
  // Month parameter is zero indexed so it's actually the 10th month.
  const testDate = new Date(Date.UTC(2020, 9, 3, 14, 19, 4, 23)).getTime();
  const expected = "Saturday, October 3, 2020, 10:19 AM";
  const actual = utils.timestampToFormatted(testDate);
  expect(actual).toEqual(expected);
});

test('other timestamp format', () => {
  const testDate = new Date(Date.UTC(2020, 7, 23, 2, 3, 2, 4)).getTime();
  const expectedCentral = "Saturday, August 22, 2020, 09:03 PM";
  const expectedSingapore = "Sunday, August 23, 2020, 10:03 AM";
  const actualCentral = utils.timestampToFormatted(testDate, "America/Chicago");
  const actualSingapore = utils.timestampToFormatted(testDate, "Asia/Singapore");
  expect(actualCentral).toEqual(expectedCentral);
  expect(actualSingapore).toEqual(expectedSingapore);
})