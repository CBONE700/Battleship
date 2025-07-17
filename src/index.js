import { Player } from './player.js';
import './style.css';

const player = new Player(false);
const computer = new Player(true);

//Populate player gameboard with ship positions
player.gameboard.placeShip(3, 2, 'x', player.gameboard.ships[0]);
player.gameboard.placeShip(5, 2, 'x', player.gameboard.ships[1]);
player.gameboard.placeShip(7, 7, 'y', player.gameboard.ships[2]);
player.gameboard.placeShip(2, 9, 'y', player.gameboard.ships[3]);
player.gameboard.placeShip(0, 0, 'x', player.gameboard.ships[4]);

//Populate computer gameboard with ship positions
computer.gameboard.placeShip(4, 4, 'x', computer.gameboard.ships[0]);
computer.gameboard.placeShip(5, 6, 'x', computer.gameboard.ships[1]);
computer.gameboard.placeShip(7, 7, 'y', computer.gameboard.ships[2]);
computer.gameboard.placeShip(2, 9, 'y', computer.gameboard.ships[3]);
computer.gameboard.placeShip(0, 0, 'x', computer.gameboard.ships[4]);

//Populate the DOM with ship positions
const playerBoard = document.getElementById('gameboard');
const computerBoard = document.getElementById('hitboard');
for (let y = 0; y < player.gameboard.board.length; y++) {
  for (let x = 0; x < player.gameboard.board[y].length; x++) {
    if (player.gameboard.board[y][x] !== 0) {
      const cell = playerBoard.querySelector(`#game${y}${x}`);
      cell.style.backgroundColor = 'black';
    }
    if (computer.gameboard.board[y][x] !== 0) {
      const cell = computerBoard.querySelector(`#hit${y}${x}`);
      cell.style.backgroundColor = 'black';
    }
  }
}
