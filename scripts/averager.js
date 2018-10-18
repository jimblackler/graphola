import {getEdgePairs} from "./getEdgePairs.js";
import {getPerimeterNodes} from "./findPerimeter.js";

export function average(layout, graph) {
  const edgePairs = getEdgePairs(graph.edges);
  const perimeterNodes = getPerimeterNodes(edgePairs);
  const nextPoints = [];
  for (const [node, neighbours] of edgePairs) {
    if (perimeterNodes.has(node)) {
      nextPoints[node] = layout.points[node];
      continue;
    }
    let combinedPositions = [0, 0];
    let validNeighbours = 0;
    for (const neighbour of neighbours) {
      const neighbourPosition = layout.points[neighbour];
      if (neighbourPosition === undefined) {
        continue;
      }
      combinedPositions[0] += neighbourPosition[0];
      combinedPositions[1] += neighbourPosition[1];
      validNeighbours++;
    }
    if (validNeighbours > 0) {
      nextPoints[node] = [combinedPositions[0] / validNeighbours, combinedPositions[1] / validNeighbours];
    }
  }

  for (let idx = 0; idx < nextPoints.length; idx++) {
    layout.points[idx] = nextPoints[idx];
  }

}