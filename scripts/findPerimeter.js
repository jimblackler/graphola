import {findCycle} from './findCycle.js';

export function getPerimeterNodes(edgePairs) {
  const perimeterNodes = new Set();

  for (let [node, neighbours] of edgePairs) {
    if (neighbours.size == 2 || !findCycle(edgePairs, neighbours)) {
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
