import {Layout} from "./layout.js";
import {findPerimeter} from './findPerimeter.js';
import {squareCoords} from './borderCoords.js';

export function makeBorderLayout(width, height, radius, graph) {
  const perimeterNodes = findPerimeter(graph);
  // TODO: only place perimeter nodes with exactly two perimeter neighbours on the border.

  const newLayout = new Layout(width, height, radius);

  // Position points on perimeter.
  for (let idx = 0; idx < perimeterNodes.length; idx++) {
    const t = idx / perimeterNodes.length;
    newLayout.points[perimeterNodes[idx]] = squareCoords(t, width, height, radius);
  }

  return newLayout;
}