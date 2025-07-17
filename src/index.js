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
    //Display the ships on players side
    if (player.gameboard.board[y][x] !== 0) {
      const cell = playerBoard.querySelector(`#game${y}${x}`);
      cell.style.backgroundColor = 'black';
    }
    //Display the ships on computers side (TO BE REMOVED!!)
    if (computer.gameboard.board[y][x] !== 0) {
      const cell = computerBoard.querySelector(`#hit${y}${x}`);
      cell.style.backgroundColor = 'black';
    }
    //Add and event listener to the computers cells that kicks off a turn
    computerBoard
      .querySelector(`#hit${y}${x}`)
      .addEventListener('click', (e) => {
        if (
          //Only continue the action if the cell hasn't already been hit, or if the game isn't over
          e.target.style.backgroundColor !== 'red' &&
          computer.gameboard.allSunk !== true &&
          player.gameboard.allSunk !== true
        ) {
          //Set the selected cells background to red and call the receive attack and check if sunk to register the attack and check if game over
          e.target.style.backgroundColor = 'red';
          computer.gameboard.receiveAttack(y, x);
          computer.gameboard.checkIfSunk();
          //Randomly select a square for the computer to attack and ensure it hasn't already been attacked and repeat above sequence
          let success = false;
          while (success !== true) {
            const playerY = Math.floor(Math.random() * 10);
            const playerX = Math.floor(Math.random() * 10);
            if (
              playerBoard.querySelector(`#game${playerY}${playerX}`).style
                .backgroundColor !== 'red'
            ) {
              playerBoard.querySelector(
                `#game${playerY}${playerX}`
              ).style.backgroundColor = 'red';
              player.gameboard.receiveAttack(playerY, playerX);
              player.gameboard.checkIfSunk();
              success = true;
            }
          }
        }
      });
  }
}
