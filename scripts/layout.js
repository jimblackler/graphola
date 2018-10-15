export class Layout {
  get radius() {
    return this._radius;
  }
  get height() {
    return this._height;
  }
  get width() {
    return this._width;
  }
  get points() {
    return this._points;
  }
  constructor(width, height, radius) {
    this._width = width;
    this._height = height;
    this._radius = radius;
    this._points = [];
  }
}