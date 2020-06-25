import {parseUrl} from '../main/webapp/scripts/utils.js';

test('single parse no special chars', () => {
  const url = "test.html?key1=value1";
  const urlParams = parseUrl(url);
  expect(urlParams).toEqual({"key1": "value1"});
});

test('multiple parse no special chars', () => {
  const url = "test.html?key1=value1&key2=value2";
  const urlParams = parseUrl(url);
  expect(urlParams).toEqual({"key1": "value1", "key2": "value2"});
});

test('multiple parse with special chars', () => {
  const url = "test.html?key1=!#sJk3r2Iedy2dw[-cc2>&key2=value2";
  const urlParams = parseUrl(url);
  expect(urlParams).toEqual({"key1": "!#sJk3r2Iedy2dw[-cc2>", "key2": "value2"});
});