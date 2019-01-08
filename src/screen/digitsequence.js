import Digit from "./digit";

/**
 * 数字序列类
 * @export DigitSequence
 * @class DigitSequence
 */
export default class DigitSequence {
  constructor(bgCanvas, canvas, x, y, width) {
    this.x = x;
    this.y = y;
    this.width = width;

    this.min = 0;
    this.max = 999999;
    this.digitList = [];
    this.digitNumber = 6;
    this.digitSpanProportion = 0.4;
    this.size =
      this.width / (this.digitNumber + (this.digitNumber - 1) * this.digitSpanProportion);

    for (let i = this.digitNumber - 1; i >= 0; i--) {
      this.digitList.push(
        new Digit(
          this.x + i * this.size + i * this.digitSpanProportion * this.size,
          this.y,
          this.size,
          bgCanvas,
          canvas
        )
      );
    }

    this.show = this.show.bind(this);
    this.reset = this.reset.bind(this);
  }

  show(value) {
    if (!Number.isInteger(value))
      throw new Error("The value should be an integer.");
    if (value < this.min || value > this.max)
      throw new Error(`The value should between ${this.min} and ${this.max}.`);

    this.reset();
    let valueStr = value.toString();
    for (let i = 0; i < valueStr.length; i++) {
      i < this.digitNumber &&
        this.digitList[i].show(valueStr.charAt(valueStr.length - 1 - i));
    }
  }

  reset() {
    this.digitList.forEach(d => d.hide());
  }
}
