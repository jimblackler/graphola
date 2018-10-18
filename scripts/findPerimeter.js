import {findPath} from './findPath.js';
import {getEdgePairs} from './getEdgePairs.js';

export function getPerimeterNodes(edgePairs) {
  const perimeterNodes = new Set();

  for (let [node, neighbours] of edgePairs) {
    let neighbourCoEdges = 0;
    for (const neighbourNode of neighbours) {
      const neighbourNeighbours = edgePairs.get(neighbourNode);
      const intersection = new Set([...neighbourNeighbours].filter(x => neighbours.has(x)));
      neighbourCoEdges += intersection.size;
    }
    if (neighbourCoEdges < neighbours.size * 2) {
      perimeterNodes.add(node);
    }
  }
  return perimeterNodes;
}

export function findPerimeter(graph) {
  const edgePairs = getEdgePairs(graph.edges);
  const perimeterNodes = getPerimeterNodes(edgePairs);
  return findPath(edgePairs, perimeterNodes);
}