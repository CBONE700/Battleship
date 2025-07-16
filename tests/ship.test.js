import { Ship } from '../src/ship.js';
const ship = new Ship('Cruiser', 3);

test('Ship is instantiated properly', () => {
  expect(ship).toBeInstanceOf(Ship);
  expect(ship.length).toBe(3);
  expect(ship.hits).toBe(0);
  expect(ship.sunk).toBe(false);
  expect(ship.placed).toBe(false);
});

test('Ship.hit and Ship.isSunk are working', () => {
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
