import {findPath} from './findPath.js';

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

export function filteredPerimeterNodes(edgePairs) {
  const perimeterNodes = getPerimeterNodes(edgePairs);
  const filtered = new Set();
  perimeterNodes.forEach(node => {
    const neighbours = edgePairs.get(node);
    let count = 0;
    neighbours.forEach(neighbour => {
      if (perimeterNodes.has(neighbour)) {
        count++;
      }
    });
    if (count == 2) {
      filtered.add(node);
    }
  });

  return filtered;
}

export function getPerimeterPath(edgePairs) {
  const nodes = getPerimeterNodes(edgePairs);
  return findPath(edgePairs, nodes);
}