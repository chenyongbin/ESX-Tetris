export default class Block {
  constructor(canvas, x, y, size) {
    this.canvas = canvas;
    this.x = x;
    this.y = y;
    this.size = size;
    this.borderWidth = 0.6;
    this.padding = 2;
    this.margin = 1.7;

    this.outline = {
      x: this.x + this.margin,
      y: this.y + this.margin,
      size: this.size - this.margin * 2
    };
    this.core = {
      x: this.outline.x + this.borderWidth + this.padding,
      y: this.outline.y + this.borderWidth + this.padding,
      size: this.outline.size - this.borderWidth * 2 - this.padding * 2
    };

    this.isActive = false;
    this.activate = this.activate.bind(this);
    this.inactivate = this.inactivate.bind(this);
  }

  activate(
    outlineOptions = { strokeStyle: "black" },
    coreOptions = { fillStyle: "black" }
  ) {
    if (this.isActive) return;
    this.canvas.strokeRect(
      this.outline.x,
      this.outline.y,
      this.outline.size,
      this.outline.size,
      outlineOptions
    );
    this.canvas.fillRect(
      this.core.x,
      this.core.y,
      this.core.size,
      this.core.size,
      coreOptions
    );
    this.isActive = true;
  }

  inactivate() {
    if (!this.isActive) return;
    this.canvas.clearRect(this.x, this.y, this.size, this.size);
    this.isActive = false;
  }
}
