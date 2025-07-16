//Class that will be used to instantiate ship objects
export class Ship {
  //Only need to take in length as hits and sunk are default values. May need to eventually add coordinates
  constructor(name, length) {
    this.name = name;
    this.length = length;
    this.hits = 0;
    this.sunk = false;
    this.placed = false;
  }
  //Increase hits when a ship is hit
  hit() {
    this.hits++;
  }
  //Check if a ship is sunk or not
  isSunk() {
    if (this.hits >= this.length) {
      this.sunk = true;
    }
  }
}
