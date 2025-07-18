import { Gameboard } from './gameboard.js';

export class Player {
  constructor(name) {
    this.gameboard = new Gameboard();
    this.name = name;
  }
}
