import {findPerimeter} from './findPerimeter.js';
import {Layout} from './layout.js';
import {squareCoords} from './borderCoords.js';

export function regenerateLayout(width, height, radius, graph) {
  const edgeNodes = findPerimeter(graph);
  const newLayout = new Layout(width, height, radius,);

  for (let idx = 0; idx < edgeNodes.length; idx++) {
    const t = idx / edgeNodes.length;
    newLayout.points[edgeNodes[idx]] = squareCoords(t, width, height, radius);
  }

  return newLayout;
}