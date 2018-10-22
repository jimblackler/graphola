import {findCycle} from "./findCycle.js";
import {getEdgePairs} from "./getEdgePairs.js";
import {getPerimeterNodes} from "./findPerimeter.js";
import {Layout} from "./layout.js";
import {squareCoords} from './borderCoords.js';

export function makeBorderLayout(width, height, radius, graph) {
  const edgePairs = getEdgePairs(graph.edges);
  const perimeterPath = findCycle(edgePairs, getPerimeterNodes(edgePairs));
  const newLayout = new Layout(width, height, radius);

  // Position points on perimeter.
  for (let idx = 0; idx < perimeterPath.length; idx++) {
    const t = idx / perimeterPath.length;
    newLayout.points[perimeterPath[idx]] = squareCoords(t, width, height, radius);
  }

  return newLayout;
}