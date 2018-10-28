import {Graph} from "./graph.js";

export function filterGraph(graph, retainNodes) {
  const newGraph = new Graph();
  for (const edge of graph.edges) {
    if (!retainNodes.has(edge[0])) {
      continue;
    }
    if (!retainNodes.has(edge[1])) {
      continue;
    }
    newGraph.edges.push(edge);
  }

  return newGraph;
}
