export class Graph {
  get edges() {
    // TODO: consider making Graph immutable.
    return this._edges;
  }
  constructor() {
    this._edges = [];
  }
}