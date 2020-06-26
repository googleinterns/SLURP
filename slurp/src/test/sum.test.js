const sumfunctions = require('./sum.js');

test('adds 1 + 2 to equal 3', () => {
  expect(sumfunctions.sum(1, 2)).toBe(3);
});
