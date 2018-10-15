export class Renderer {
  render(layout) {
    this._canvas.width = layout.width;
    this._canvas.height = layout.height;
    for (const point of layout.points) {
      this._ctx.beginPath();
      this._ctx.arc(point[0], point[1], layout.radius, 0, 2 * Math.PI);
      this._ctx.stroke();
    }
  }

  constructor(canvas) {
    this._canvas = canvas;
    this._ctx = canvas.getContext('2d');
  }
}
