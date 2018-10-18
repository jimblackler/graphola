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

export function getEdgePairs(edges) {
  const neighbourPairs = new Map();
  for (const edge of edges) {
    add(neighbourPairs, edge[0], edge[1]);
    add(neighbourPairs, edge[1], edge[0]);
  }
  return neighbourPairs;
}