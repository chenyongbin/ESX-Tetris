import { extend } from "./util";

export default class Canvas {
  constructor(
    containerDOM,
    offsetX,
    offsetY,
    width,
    height,
    name = "undefined name canvas"
  ) {
    if (!containerDOM) {
      throw new Error(`Cannot find container for ${name}.`);
    }

    this.offsetX = offsetX;
    this.offsetY = offsetY;
    this.width = width;
    this.height = height;
    this.name = name;
    this.canvas = document.createElement("canvas");
    this.canvas.width = this.width;
    this.canvas.height = this.height;
    containerDOM.appendChild(this.canvas);
    this.context = this.canvas.getContext("2d");

    this.setStyles = this.setStyles.bind(this);
    this.strokeRect = this.strokeRect.bind(this);
    this.fillRect = this.fillRect.bind(this);
    this.clearRect = this.clearRect.bind(this);
    this.measureText = this.measureText.bind(this);
    this.fillText = this.fillText.bind(this);
    this.fillHalfEllipse = this.fillHalfEllipse.bind(this);
    this.fillCircle = this.fillCircle.bind(this);
    this.getLinearGradient = this.getLinearGradient.bind(this);
  }

  setStyles(styles) {
    if (Array.isArray(styles)) {
      styles.forEach(style => {
        let items = style.split(":");
        if (items[0] in this.canvas.style) {
          this.canvas.style[items[0]] = items[1].replace(";", "");
        }
      });
    }
  }

  strokeRect(x, y, width, height, options) {
    extend(this.context, options);
    this.context.strokeRect(x, y, width, height);
  }

  fillRect(x, y, width, height, options) {
    extend(this.context, options);
    this.context.fillRect(x, y, width, height);
  }

  clearRect(x, y, width, height, options) {
    extend(this.context, options);
    this.context.clearRect(x, y, width, height);
  }

  measureText(text) {
    return this.context.measureText(text).width;
  }

  fillText(text, x, y, options) {
    this.context.save();
    extend(this.context, options);
    this.context.fillText(text, x, y);
    this.context.restore();
  }

  fillHalfEllipse(
    x,
    y,
    radius,
    isHorizontal,
    anticlockwise,
    scale,
    options = { fillStyle: "black" }
  ) {
    let scaleX = 1,
      scaleY = 1,
      startAngle = 0,
      endAngle = 0;
    if (isHorizontal === true) {
      scaleY = scale;
      endAngle = Math.PI;
    } else {
      scaleX = scale;
      startAngle = Math.PI / 2;
      endAngle = (Math.PI * 3) / 2;
    }

    this.context.save();
    extend(this.context, options);
    this.context.beginPath();
    this.context.closePath();
    this.context.moveTo(x, y);
    this.context.scale(scaleX, scaleY);
    this.context.arc(
      x / scaleX,
      y / scaleY,
      radius,
      startAngle,
      endAngle,
      anticlockwise
    );
    this.context.fill();
    this.context.restore();
  }

  fillCircle(x, y, radius, startAngle, endAngle, anticlockwise, options = {}) {
    this.context.save();
    extend(this.context, options);
    this.context.beginPath();
    this.context.moveTo(x, y);
    this.context.arc(x, y, radius, startAngle, endAngle, anticlockwise);
    this.context.closePath();
    this.context.fill();
    this.context.restore();
  }

  getLinearGradient(x0, y0, x1, y1, colorStops = []) {
    let gradient = this.context.createLinearGradient(x0, y0, x1, y1);
    if (Array.isArray(colorStops)) {
      colorStops.forEach(stop => {
        gradient.addColorStop(stop.position, stop.color);
      });
    }
    return gradient;
  }
}
