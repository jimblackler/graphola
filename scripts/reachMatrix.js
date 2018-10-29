function buildReach(node, edgePairs) {
  const reach = new Map();
  let scan = new Set([node]);
  let round = 0;
  while (scan.size > 0) {
    const next = new Set();
    for (const node of scan) {
      reach.set(node, round);
      for (const neighbour of edgePairs.get(node)) {
        if (!reach.has(neighbour)) {
          next.add(neighbour);
        }
      }
    }
    scan = next;
    round++;
  }
  return reach;

}

export function buildReachMatrix(edgePairs) {

  const reachMatrix = new Map();
  for (const edge of edgePairs) {
    reachMatrix.set(edge[0], buildReach(edge[0], edgePairs));
  }
  return reachMatrix;
}

export function maximumSteps(reachMatrix) {
  let maxSteps = 0;
  let maxStepsNode = -1;
  let maxStepsDestination = -1;
  for (const [node, reach] of reachMatrix.entries()) {
    for (const [destination, steps] of reach.entries()) {
      if (steps > maxSteps) {
        maxSteps = steps;
        maxStepsNode = node;
        maxStepsDestination = destination;
      }
    }
  }
  return [maxStepsNode, maxStepsDestination];
}

export function maximumStepsFrom(reachMatrix, fromNodes) {
  let maxMinReach = -1;
  let maxMinReachNode = -1;
  for (const [node, reach] of reachMatrix.entries()) {
    let minReach = Number.MAX_SAFE_INTEGER;
    for (const from of fromNodes) {
      if (reach.get(from) < minReach) {
        minReach = reach.get(from);
      }
    }
    if (minReach > maxMinReach) {
      maxMinReach = minReach;
      maxMinReachNode = node;
    }
  }
  return maxMinReachNode;
}