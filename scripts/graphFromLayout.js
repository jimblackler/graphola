import {Graph} from './graph.js';

function edgeAvoidsNodes(layout, i0, i1, minApproach) {
  const p0 = layout.points[i0];
  const p1 = layout.points[i1];
  const delta = [p1[0] - p0[0], p1[1] - p0[1]];
  const length = Math.sqrt(delta[0] * delta[0] + delta[1] * delta[1]);
  const unit = [delta[0] / length, delta[1] / length];
  const rot90 = [unit[1], -unit[0]];

  for (let idx = 0; idx < layout.points.length; idx++) {
    if (idx == i0 || idx == i1) {
      continue;
    }

    const point = layout.points[idx];
    const delta2 = [point[0] - p0[0], point[1] - p0[1]];

    const along = unit[0] * delta2[0] + unit[1] * delta2[1];
    if (along < 0) {
      continue;
    }
    if (along > length) {
      continue;
    }

    const approach = rot90[0] * delta2[0] + rot90[1] * delta2[1];
    if (Math.abs(approach) < minApproach) {
      return false;
    }
  }
  return true;
}
export function graphFromLayout(layout, minApproach) {
  const graph = new Graph();

  for (let idx = 0; idx < layout.points.length - 1; idx++) {
    for (let idx2 = idx + 1; idx2 < layout.points.length; idx2++) {
      if (edgeAvoidsNodes(layout, idx, idx2, minApproach)) {
        graph.edges.push([idx, idx2]);
      }
    }
  }

  return graph;
}