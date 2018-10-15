export class Renderer {
  render(layout, graph) {
    this._canvas.width = layout.width;
    this._canvas.height = layout.height;
    for (const point of layout.points) {
      this._ctx.beginPath();
      this._ctx.arc(point[0], point[1], layout.radius, 0, 2 * Math.PI);
      this._ctx.stroke();
    }

    for (const edge of graph.edges) {
      this._ctx.beginPath();
      const p0 = layout.points[edge[0]];
      const p1 = layout.points[edge[1]];
      const delta = [p1[0] - p0[0], p1[1] - p0[1]];
      const length = Math.sqrt(delta[0] * delta[0] + delta[1] * delta[1]);
      const unit = [delta[0] / length, delta[1] / length];
      this._ctx.moveTo(p0[0] + unit[0] * layout.radius, p0[1] + unit[1] * layout.radius);
      this._ctx.lineTo(p1[0] - unit[0] * layout.radius, p1[1] - unit[1] * layout.radius);
      this._ctx.stroke();
    }
  }

  constructor(canvas) {
    this._canvas = canvas;
    this._ctx = canvas.getContext('2d');
  }
}
