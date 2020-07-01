/**
 * This file exists to provide an example of how to use the Jest module. It has nothing to do with the functionality of the overall project.
 */
const sumfunctions = require('./sum.js');

test('adds 1 + 2 to equal 3', () => {
  expect(sumfunctions.sum(1, 2)).toBe(3);
});
