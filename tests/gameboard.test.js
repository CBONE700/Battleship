import { Gameboard } from '../src/gameboard.js';
const gameboard = new Gameboard();

test('Gameboard is instantiated properly', () => {
  expect(gameboard).toBeInstanceOf(Gameboard);
});

test('Place ship left facing', () => {
  gameboard.placeShip(4, 4, 'x', gameboard.ships[0]);
  expect(gameboard.board[4][4]).toBe('carrier');
  expect(gameboard.board[4][5]).toBe('carrier');
  expect(gameboard.board[4][6]).toBe('carrier');
  expect(gameboard.board[4][7]).toBe('carrier');
  expect(gameboard.board[4][8]).toBe('carrier');
});

test('Place ship right facing', () => {
  gameboard.placeShip(5, 6, 'x', gameboard.ships[1]);
  expect(gameboard.board[5][6]).toBe('battleship');
  expect(gameboard.board[5][7]).toBe('battleship');
  expect(gameboard.board[5][8]).toBe('battleship');
  expect(gameboard.board[5][9]).toBe('battleship');
});

test('Place ship up facing', () => {
  gameboard.placeShip(7, 7, 'y', gameboard.ships[2]);
  expect(gameboard.board[7][7]).toBe('cruiser');
  expect(gameboard.board[8][7]).toBe('cruiser');
  expect(gameboard.board[9][7]).toBe('cruiser');
});

test('Place ship down facing', () => {
  gameboard.placeShip(2, 9, 'y', gameboard.ships[3]);
  expect(gameboard.board[2][9]).toBe('submarine');
  expect(gameboard.board[3][9]).toBe('submarine');
  expect(gameboard.board[4][9]).toBe('submarine');
  console.log(gameboard.board);
});

test('Place ship over taken space', () => {
  gameboard.placeShip(2, 9, 'y', gameboard.ships[4]);
  expect(gameboard.board[2][9]).toBe('submarine');
  expect(gameboard.board[3][9]).toBe('submarine');
});

test('Place ship that is already placed', () => {
  gameboard.placeShip(0, 0, 'x', gameboard.ships[3]);
  expect(gameboard.board[0][0]).toBe(0);
  expect(gameboard.board[0][1]).toBe(0);
  expect(gameboard.board[0][2]).toBe(0);
});

test('Receive attack function', () => {
  gameboard.receiveAttack(2, 9);
  expect(gameboard.ships[3].hits).toBe(1);

  //Ensure you cant double hit somewhere
  gameboard.receiveAttack(2, 9);
  expect(gameboard.ships[3].hits).toBe(1);

  expect(gameboard.hitBoard[2][9]).toBe(1);
});
