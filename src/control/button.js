/**
 * 控制板按钮类
 * @export Button
 * @class Button
 */
export default class Button {
  constructor(
    canvas,
    x,
    y,
    radius,
    text,
    name = "未命名按钮",
    options = { showShadow: true }
  ) {
    this.canvas = canvas;
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.sx = this.x + this.radius;
    this.sy = this.y + this.radius;
    this.text = text;
    this.name = name;

    let gradient = canvas.getLinearGradient(
      this.x + this.radius * 2,
      this.y,
      this.x,
      this.y + this.radius * 2,
      [
        { position: 0, color: options.stopColor1 || "#343434" },
        { position: 1, color: options.stopColor2 || "black" }
      ]
    );
    canvas.fillCircle(this.sx, this.sy, this.radius, 0, Math.PI * 2, false, {
      fillStyle: gradient,
      shadowOffsetX: options.showShadow ? -4 : 0,
      shadowOffsetY: options.showShadow ? 4 : 0,
      shadowBlur: options.showShadow ? 2 : 0,
      shadowColor: options.shadownColor || "rgb(0,0,0,0.5)"
    });

    if (this.text) {
      let textWidth = this.canvas.measureText(this.text),
        fontSize = this.radius * 0.5;
      fontSize = fontSize < 10 ? 10 : fontSize;
      this.canvas.fillText(text, this.sx, this.sy + fontSize / 4, {
        font: `${fontSize}px Arial`,
        fillStyle: "white",
        textAlign: "center",
        textBaseLine: "hanging"
      });
    }

    this.contains = this.contains.bind(this);
  }

  /**
   * 是否包含该坐标
   *
   * @param {number} x 坐标x
   * @param {number} y 坐标y
   * @returns
   * @memberof Button
   */
  contains(x, y) {
    return (
      Math.sqrt(Math.pow(x - this.sx, 2) + Math.pow(y - this.sy, 2)) <=
      this.radius
    );
  }
}
