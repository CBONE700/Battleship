import { Ship } from '../src/ship.js';

test('Ship is instantiated properly', () => {
  const ship = new Ship(3);
  expect(ship).toBeInstanceOf(Ship);
  expect(ship.length).toBe(3);
  expect(ship.hits).toBe(0);
  expect(ship.sunk).toBe(false);
  ship.hit();
  ship.hit();
  ship.isSunk();
  expect(ship.hits).toBe(2);
  expect(ship.sunk).toBe(false);
  ship.hit();
  ship.isSunk();
  expect(ship.hits).toBe(3);
  expect(ship.sunk).toBe(true);
});
