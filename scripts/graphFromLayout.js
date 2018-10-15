import {Graph} from './graph.js';

export function graphFromLayout(layout) {
  const graph = new Graph();

  for (let idx = 0; idx < layout.points.length - 1; idx++) {
    for (let idx2 = idx + 1; idx2 < layout.points.length; idx2++) {
      graph.edges.push([idx, idx2]);
    }
  }

  return graph;
}