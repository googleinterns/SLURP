/**
 * This file exists to provide an example of how to use the Jest module. It has nothing to do with the functionality of the overall project.
 */
import { sum } from './sum';

test('adds 1 + 2 to equal 3', () => {
  expect(sum(1, 2)).toBe(3);
});
