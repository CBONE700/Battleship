import { Ship } from '../src/ship.js';

export class Gameboard {
  constructor() {
    //10x10 board for playing battleship
    this.board = [
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    ];
    this.hitBoard = [
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    ];
    //Array to hold ship objects
    this.ships = [
      new Ship('carrier', 5),
      new Ship('battleship', 4),
      new Ship('cruiser', 3),
      new Ship('submarine', 3),
      new Ship('destroyer', 2),
    ];
    //Check if all the ships are sunk
    this.allSunk = false;
  }
  //Function for playing ships on the board
  placeShip(y, x, direction, ship) {
    //Check if ship already placed
    if (ship.placed === false) {
      //Check direction
      if (direction === 'x') {
        if (x + ship.length > 10) {
          return;
        }
        for (let i = 0; i < ship.length; i++) {
          if (this.board[y][x + i] !== 0) {
            return;
          }
          this.board[y][x + i] = ship.name;
        }
      } else if (direction === 'y') {
        if (y + ship.length > 10) {
          return;
        }
        for (let i = 0; i < ship.length; i++) {
          if (this.board[y + i][x] !== 0) {
            return;
          }
          this.board[y + i][x] = ship.name;
        }
      }
      //Record that the ship is placed
      ship.placed = true;
    }
  }
  //Going to need to create some form of loop if someone tries to double hit
  //Function for registering attacks
  receiveAttack(y, x) {
    //Check if the position has been attacked already
    if (this.hitBoard[y][x] === 0) {
      //Register the attack
      this.hitBoard[y][x] = 1;
      //Check if there is a ship at the location
      if (this.board[y][x] !== 0) {
        for (let item of this.ships) {
          //increase the hitcount
          if (item.name === this.board[y][x]) {
            item.hit();
            //check if the ship is sunk
            item.isSunk();
          }
        }
      }
    }
  }
  //Function to check if all ships are sunk
  checkIfSunk() {
    for (let ship of this.ships) {
      if (ship.sunk == false) {
        return;
      }
    }
    this.allSunk = true;
  }
}
