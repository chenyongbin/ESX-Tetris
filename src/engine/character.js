export default class Character {
  constructor(offsetX, ...states) {
    this.states = states;
    this.offsetX = offsetX;
    this.offsetY = 0;
    this.stateIndex = 0;
    this.prevCoordinates = [];
    this.coordinates = this.states[this.stateIndex].map(({ x, y }) => ({
      x: x + this.offsetX,
      y: y + this.offsetY
    }));

    this.getRawCoordinates = this.getRawCoordinates.bind(this);
    this.getCoordinates = this.getCoordinates.bind(this);
    this.left = this.left.bind(this);
    this.right = this.right.bind(this);
    this.down = this.down.bind(this);
    this.rotate = this.rotate.bind(this);
  }

  getRawCoordinates() {
    return this.states[this.stateIndex];
  }

  getCoordinates() {
    this.prevCoordinates = this.coordinates;
    this.coordinates = this.states[this.stateIndex].map(({ x, y }) => ({
      x: x + this.offsetX,
      y: y + this.offsetY
    }));
    return this.coordinates;
  }

  left() {
    this.offsetX--;
    this.getCoordinates();
  }

  right() {
    this.offsetX++;
    this.getCoordinates();
  }

  down() {
    this.offsetY++;
    this.getCoordinates();
  }

  rotate() {
    this.stateIndex++;
    if (this.stateIndex == this.states.length) this.stateIndex = 0;
    this.getCoordinates();
  }
}
