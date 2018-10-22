/**
 * Find any path connecting all of the nodes using any of the specified edges, without repeating an edge in reverse.
 * @param edgePairs A map of edges, as a set of destination nodes keyed by origin node.
 * @param nodes The nodes to connect.
 * @returns {*} A list of nodes, or null if no path exists.
 */
export function findCycle(edgePairs, nodes) {
  const firstNode =  nodes.entries().next().value[0];

  let candidates = new Set();

  candidates.add([[firstNode], nodes]);

  while(true) {
    const next = new Set();
    for (const candidate of candidates) {
      const path = candidate[0];
      const nodes = candidate[1];
      const lastNode = path[path.length - 1];
      for (const neighbour of edgePairs.get(lastNode)) {
        if (!nodes.has(neighbour)) {
          continue;
        }
        const newNodes = new Set(nodes);
        newNodes.delete(neighbour);
        if (newNodes.size == 0) {
          if (neighbour == firstNode) {
            return path;
          }
        } else {
          next.add([path.concat(neighbour), newNodes]);
        }
      }
    }
    if (next.size == 0) {
      return null;
    }
    candidates = next;
  }
}