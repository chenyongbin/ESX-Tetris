import Digit from "./digit";

let digitSpanProportion = 0.4,
  digitList = [];

const initialize = function(x, y, width, bgCanvas, canvas) {
  let digitNumber = 6,
    size = width / (digitNumber + (digitNumber - 1) * digitSpanProportion);
  while (digitNumber > 0) {
    digitNumber--;
    digitList.push(
      new Digit(
        x + digitNumber * size + digitNumber * digitSpanProportion * size,
        y,
        size,
        bgCanvas,
        canvas
      )
    );
  }
};

const show = function(value) {
  if (!Number.isInteger(value))
    throw new Error("The value should be an integer.");
  if (value < 0 || value > 999999)
    throw new Error("The value should between 0 and 999999.");
  let valueStr = value.toString();
  reset();
  for (let i = 0; i < valueStr.length; i++) {
    digitList[i].show(valueStr.charAt(valueStr.length - 1 - i));
  }
};

const reset = function() {
  digitList.forEach(d => d.hide());
};

export default {
  initialize,
  show,
  reset
};
