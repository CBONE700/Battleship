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

//Create the boards and populate them with ship coordinates
const boards = document.createElement('div');
boards.id = 'boards';
document.body.appendChild(boards);
const playerBoard = document.createElement('div');
const computerBoard = document.createElement('div');
playerBoard.id = 'gameboard';
computerBoard.id = 'hitboard';
boards.appendChild(playerBoard);
boards.appendChild(computerBoard);

for (let y = 0; y < player.gameboard.board.length; y++) {
  for (let x = 0; x < player.gameboard.board[y].length; x++) {
    const playerCell = document.createElement('div');
    playerCell.id = `game${y}${x}`;
    playerBoard.appendChild(playerCell);
    const computerCell = document.createElement('div');
    computerCell.id = `hit${y}${x}`;
    computerBoard.appendChild(computerCell);
    //Display the ships on players side
    if (player.gameboard.board[y][x] !== 0) {
      playerCell.style.backgroundColor = 'black';
    }
    //Display the ships on computers side (TO BE REMOVED!!)
    if (computer.gameboard.board[y][x] !== 0) {
      computerCell.style.backgroundColor = 'black';
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
          if (computer.gameboard.allSunk === true) {
            const body = document.querySelector('body');
            body.removeChild(body.firstElementChild);
            const winnerText = document.createElement('div');
            winnerText.style.fontSize = '40px';
            winnerText.textContent = 'Player Wins!';
            body.appendChild(winnerText);
          }
          if (player.gameboard.allSunk === true) {
            const body = document.querySelector('body');
            body.removeChild(body.firstElementChild);
            const winnerText = document.createElement('div');
            winnerText.style.fontSize = '40px';
            winnerText.textContent = 'Computer Wins!';
            body.appendChild(winnerText);
          }
        }
      });
  }
}
