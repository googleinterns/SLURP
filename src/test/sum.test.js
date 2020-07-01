/**
 * This file exists to provide an example of how to use the Jest module. It has nothing to do with the functionality of the overall project.
 */
const sumfunctions = require('../main/webapp/scripts/sum');

test('adds 1 + 2 to equal 3', () => {
  expect(sumfunctions.sum(1, 2)).toBe(3);
});
