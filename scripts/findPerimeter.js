import {findPath} from './findPath.js';

function add(edgeByNodes, node0, node1) {
  let neighbours;
  if (edgeByNodes.has(node0)) {
    neighbours = edgeByNodes.get(node0);
  } else {
    neighbours = new Set();
    edgeByNodes.set(node0, neighbours);
  }
  neighbours.add(node1);
}

function getEdgePairs(graph) {
  const neighbourPairs = new Map();
  for (const edge of graph.edges) {
    add(neighbourPairs, edge[0], edge[1]);
    add(neighbourPairs, edge[1], edge[0]);
  }
  return neighbourPairs;
}

export function findPerimeter(graph) {
  const perimeterNodes = new Set();
  const edgePairs = getEdgePairs(graph);

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

  return findPath(edgePairs, perimeterNodes);
}