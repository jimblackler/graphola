export function findPath(edgePairs, nodes) {
  const path = [];
  let node =  nodes.entries().next().value[0];
  while (true) {
    nodes.delete(node);
    path.push(node);
    if (nodes.size == 0) {
      return path;
    }
    for (const neighbour of edgePairs.get(node)) {
      if (nodes.has(neighbour)) {
        node = neighbour;
        break;
      }
    }
  }
}