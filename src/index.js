import { Player } from './player.js';
import './style.css';

let player = new Player('Player');
let computer = new Player('Computer');

//Create Title
const title = document.createElement('div');
title.id = 'title';
title.textContent = 'BATTLESHIP';
title.style.fontSize = '64px';
document.body.appendChild(title);

//Create home screen that allows you to create a name for the player and then start the game
const home = document.createElement('div');
home.id = 'home';
const nameTitle = document.createElement('div');
nameTitle.id = 'nameTitle';
nameTitle.textContent = 'Enter Player Name:';
const name = document.createElement('input');
name.id = 'name';
name.setAttribute('type', 'text');
const homeBtn = document.createElement('button');
homeBtn.id = 'homeBtn';
homeBtn.textContent = 'Start Game';
home.appendChild(nameTitle);
home.appendChild(name);
home.appendChild(homeBtn);
document.body.appendChild(home);

//When game is started, move to screen that allows you to place ships
homeBtn.addEventListener('click', () => {
  const placeScreen = document.createElement('div');
  placeScreen.id = 'placeScreen';
  document.body.appendChild(placeScreen);
  //reassign player and computer for replayability
  player = new Player(name.value);
  computer = new Player('Computer');
  //To be randomised
  let computerShip = 0;
  while (!computer.gameboard.allPlaced()) {
    let binary = Math.random() < 0.5 ? 'y' : 'x';
    if (!computer.gameboard.ships[computerShip].placed) {
      computer.gameboard.placeShip(
        Math.floor(Math.random() * 10),
        Math.floor(Math.random() * 10),
        binary,
        computer.gameboard.ships[computerShip]
      );
      if (computer.gameboard.ships[computerShip].placed) computerShip++;
    }
  }
  console.log(computer.gameboard.board);
  const instruction = document.createElement('div');
  let current = 0;
  instruction.textContent = `${player.name}, place your ${player.gameboard.ships[current].name}:`;
  placeScreen.appendChild(instruction);
  const axisBtn = document.createElement('button');
  axisBtn.textContent = 'Axis: X';
  axisBtn.id = 'x';
  axisBtn.addEventListener('click', () => {
    if (axisBtn.id === 'x') {
      axisBtn.id = 'y';
      axisBtn.textContent = 'Axis: Y';
    } else {
      axisBtn.id = 'x';
      axisBtn.textContent = 'Axis: X';
    }
  });
  placeScreen.appendChild(axisBtn);
  const placeBoard = document.createElement('div');
  placeBoard.id = 'placeboard';
  placeScreen.appendChild(placeBoard);
  for (let y = 0; y < player.gameboard.board.length; y++) {
    for (let x = 0; x < player.gameboard.board[y].length; x++) {
      const placeCell = document.createElement('div');
      placeCell.id = `place${y}${x}`;
      placeBoard.appendChild(placeCell);
      //When a cell is clicked, attempt to place a ship there.
      placeCell.addEventListener('click', () => {
        for (let ship of player.gameboard.ships) {
          if (ship.placed === false) {
            player.gameboard.placeShip(y, x, axisBtn.id, ship);
            if (ship.placed === true) {
              for (let i = 0; i < ship.length; i++) {
                if (axisBtn.id === 'x') {
                  const cell = document.querySelector(`#place${y}${x + i}`);
                  cell.style.backgroundColor = 'black';
                } else {
                  const cell = document.querySelector(`#place${y + i}${x}`);
                  cell.style.backgroundColor = 'black';
                }
              }
              current++;
              //If all ships are placed, move to the game screen
              if (player.gameboard.allPlaced()) {
                document.body.removeChild(placeScreen);
                const boards = document.createElement('div');
                boards.id = 'boards';
                const playerBoard = document.createElement('div');
                const computerBoard = document.createElement('div');
                playerBoard.id = 'gameboard';
                computerBoard.id = 'hitboard';
                boards.appendChild(playerBoard);
                boards.appendChild(computerBoard);
                document.body.appendChild(boards);

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
                              playerBoard.querySelector(
                                `#game${playerY}${playerX}`
                              ).style.backgroundColor !== 'red'
                            ) {
                              playerBoard.querySelector(
                                `#game${playerY}${playerX}`
                              ).style.backgroundColor = 'red';
                              player.gameboard.receiveAttack(playerY, playerX);
                              player.gameboard.checkIfSunk();
                              success = true;
                            }
                          }
                          if (
                            computer.gameboard.allSunk === true ||
                            player.gameboard.allSunk === true
                          ) {
                            const body = document.querySelector('body');
                            body.removeChild(boards);
                            const winnerText = document.createElement('div');
                            winnerText.style.fontSize = '40px';
                            if (computer.gameboard.allSunk === true) {
                              winnerText.textContent = `${player.name} Wins!`;
                            } else {
                              winnerText.textContent = `${computer.name} Wins!`;
                            }
                            body.appendChild(winnerText);
                            const replayBtn = document.createElement('button');
                            replayBtn.id = 'replayBtn';
                            replayBtn.textContent = 'Play Again';
                            replayBtn.addEventListener('click', () => {
                              body.removeChild(winnerText);
                              body.removeChild(replayBtn);
                              body.appendChild(home);
                            });
                            body.appendChild(replayBtn);
                          }
                        }
                      });
                  }
                }
              } else {
                instruction.textContent = `${player.name}, place your ${player.gameboard.ships[current].name}:`;
              }
            }
            break;
          }
        }
      });
    }
  }
  document.body.appendChild(placeScreen);
  document.body.removeChild(home);
});
