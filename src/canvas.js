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
    extend(this.context, options);
    this.context.fillText(text, x, y);
  }
}
