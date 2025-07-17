import { Player } from '../src/player.js';

const player = new Player(false);
const computer = new Player(true);

test('check player is correctly instantiated', () => {
  expect(player).toBeInstanceOf(Player);
  expect(player.comp).toBe(false);
});
test('check computer is correctly instantiated', () => {
  expect(computer).toBeInstanceOf(Player);
  expect(computer.comp).toBe(true);
});
