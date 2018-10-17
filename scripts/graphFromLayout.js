import {Graph} from './graph.js';

function edgeAvoidsNodes(layout, i0, i1, minApproach) {
  const p0 = layout.points[i0];
  const p1 = layout.points[i1];
  const delta = [p1[0] - p0[0], p1[1] - p0[1]];
  const length = Math.sqrt(delta[0] * delta[0] + delta[1] * delta[1]);
  const unit = [delta[0] / length, delta[1] / length];
  const rot90 = [unit[1], -unit[0]];

  for (let idx = 0; idx < layout.points.length; idx++) {
    if (idx === i0 || idx === i1) {
      continue;
    }

    const point = layout.points[idx];
    const delta1 = [point[0] - p0[0], point[1] - p0[1]];

    const along = unit[0] * delta1[0] + unit[1] * delta1[1];
    if (along < 0) {
      continue;
    }
    if (along > length) {
      continue;
    }

    const approach = rot90[0] * delta1[0] + rot90[1] * delta1[1];
    if (Math.abs(approach) < minApproach) {
      return false;
    }
  }
  return true;
}

function collidesWithEdges(layout, i0, i1, edges) {
  const p0 = layout.points[i0];
  const p1 = layout.points[i1];
  const delta = [p1[0] - p0[0], p1[1] - p0[1]];
  const length = Math.sqrt(delta[0] * delta[0] + delta[1] * delta[1]);
  const unit = [delta[0] / length, delta[1] / length];
  const rot90 = [unit[1], -unit[0]];

  for (const other of edges) {
    if (other[0] === i0 || other[0] === i1) {
      continue;
    }
    if (other[1] === i0 || other[1] === i1) {
      continue;
    }

    const other0 = layout.points[other[0]];
    const other1 = layout.points[other[1]];

    const delta0 = [other0[0] - p0[0], other0[1] - p0[1]];
    const delta1 = [other1[0] - p0[0], other1[1] - p0[1]];

    const cross0 = delta0[0] * rot90[0] + delta0[1] * rot90[1];
    const cross1 = delta1[0] * rot90[0] + delta1[1] * rot90[1];

    if (cross0 < 0 === cross1 < 0) {
      continue;
    }

    const t = cross0 / (cross0 - cross1);

    const along0 = delta0[0] * unit[0] + delta0[1] * unit[1];
    const along1 = delta1[0] * unit[0] + delta1[1] * unit[1];
    const alongT = along0 + (along1 - along0) * t;

    if (alongT < 0) {
      continue;
    }

    if (alongT > length) {
      continue;
    }

    return true;
  }
  return false;
}

export function graphFromLayout(layout, minApproach) {
  const graph = new Graph();

  const edgesAndLengths = [];

  for (let i0 = 0; i0 < layout.points.length - 1; i0++) {
    for (let i1 = i0 + 1; i1 < layout.points.length; i1++) {
      if (edgeAvoidsNodes(layout, i0, i1, minApproach)) {
        const p0 = layout.points[i0];
        const p1 = layout.points[i1];
        const delta = [p1[0] - p0[0], p1[1] - p0[1]];
        const length = Math.sqrt(delta[0] * delta[0] + delta[1] * delta[1]);
        edgesAndLengths.push([length, [i0, i1]]);
      }
    }
  }

  edgesAndLengths.sort((a, b) => a[0] - b[0]);

  for (const edgeAndLength of edgesAndLengths) {
    const edge = edgeAndLength[1];
    if (!collidesWithEdges(layout, edge[0], edge[1], graph.edges)) {
      graph.edges.push(edge);
    }
  }

  return graph;
}