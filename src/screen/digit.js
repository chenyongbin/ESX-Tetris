const showDigit = function(canvas, d, fillStyle) {
  if (![1, 4].includes(d.digit)) {
    d.canvas.fillHalfEllipse(
      d.x + d.size / 2,
      d.y,
      d.radius,
      true,
      false,
      d.scale,
      { fillStyle: fillStyle }
    );
  }

  if (![5, 6].includes(d.digit)) {
    canvas.fillHalfEllipse(
      d.x + d.size,
      d.y + d.size / 2,
      d.radius,
      false,
      false,
      d.scale,
      { fillStyle: fillStyle }
    );
  }

  if (![2].includes(d.digit)) {
    canvas.fillHalfEllipse(
      d.x + d.size,
      d.y + d.size * 1.5,
      d.radius,
      false,
      false,
      d.scale,
      { fillStyle: fillStyle }
    );
  }

  if (![1, 4, 7].includes(d.digit)) {
    canvas.fillHalfEllipse(
      d.x + d.size / 2,
      d.y + d.size * 2,
      d.radius,
      true,
      true,
      d.scale,
      { fillStyle: fillStyle }
    );
  }

  if ([0, 2, 6, 8].includes(d.digit)) {
    canvas.fillHalfEllipse(
      d.x,
      d.y + d.size * 1.5,
      d.radius,
      false,
      true,
      d.scale,
      { fillStyle: fillStyle }
    );
  }

  if (![0, 1, 7].includes(d.digit)) {
    canvas.fillHalfEllipse(
      d.x + d.size / 2,
      d.y + d.size,
      d.radius,
      true,
      false,
      d.scale,
      { fillStyle: fillStyle }
    );
  }

  if (![1, 2, 3, 7].includes(d.digit)) {
    canvas.fillHalfEllipse(
      d.x,
      d.y + d.size / 2,
      d.radius,
      false,
      true,
      d.scale,
      { fillStyle: fillStyle }
    );
  }
};

/**
 * 数字类
 * @export Digit
 * @class Digit
 */
export default class Digit {
  constructor(x, y, size, bgCanvs, canvas) {
    if (!bgCanvs || !canvas)
      throw new Error(
        "The digit backgroundCanvas and canvas should not be null."
      );

    this.x = x;
    this.y = y;
    this.size = size;
    this.scale = 0.4;
    this.radius = this.size / 2 - 1;
    this.scaleRadius = this.scale * this.radius;
    this.digit = 8;
    this.bgCanvas = bgCanvs;
    this.canvas = canvas;

    this.show = this.show.bind(this);
    this.hide = this.hide.bind(this);

    this.hide();
  }

  show(digit) {
    digit = Number.parseInt(digit);
    if (!Number.isInteger(digit) || digit < 0 || digit > 9) return;
    this.digit = digit;
    this.bgCanvas.clearRect(
      this.x - this.scaleRadius,
      this.y - this.scaleRadius,
      this.size + 2 * this.scaleRadius,
      this.size * 2 + 2 * this.scaleRadius
    );
    this.canvas.clearRect(
      this.x - this.scaleRadius,
      this.y - this.scaleRadius,
      this.size + 2 * this.scaleRadius,
      this.size * 2 + 2 * this.scaleRadius
    );
    showDigit(this.canvas, this);
  }

  hide() {
    this.digit = 8;
    this.bgCanvas.clearRect(
      this.x - this.scaleRadius,
      this.y - this.scaleRadius,
      this.size + 2 * this.scaleRadius,
      this.size * 2 + 2 * this.scaleRadius
    );
    this.canvas.clearRect(
      this.x - this.scaleRadius,
      this.y - this.scaleRadius,
      this.size + 2 * this.scaleRadius,
      this.size * 2 + 2 * this.scaleRadius
    );
    showDigit(this.bgCanvas, this, "#84946e");
  }
}
