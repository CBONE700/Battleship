import { Gameboard } from './gameboard.js';

export class Player {
  constructor(comp) {
    this.gameboard = new Gameboard();
    this.comp = comp;
  }
}
