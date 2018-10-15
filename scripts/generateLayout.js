import {Layout} from './layout.js';

function collided(candidate, points, clearance) {
  for (const point of points) {
    const distanceSquared = (point[0] - candidate[0]) * (point[0] - candidate[0]) +
        (point[1] - candidate[1]) * (point[1] - candidate[1]);
    if (distanceSquared < clearance * 2 * clearance * 2) {
      return true;
    }
  }
  return false;
}

export function generateLayout(random, width, height, radius, clearance, nodes) {
  const layout = new Layout(width, height, radius);

  const edgeChance = 0.05;
  const tweenChance = 0.7;
  while (layout.points.length < nodes) {

    let candidate;

    if (random() < tweenChance && layout.points.length >= 2) {
      const p0 = layout.points[random() * layout.points.length | 0];
      const p1 = layout.points[random() * layout.points.length | 0];
      const delta = [p1[0] - p0[0], p1[1] - p0[1]];
      const intervals = 6;
      const d = ((random() * (intervals - 1)) | 0) + 2;
      const n = ((random() * (d - 2)) | 0) + 1;
      candidate = [p0[0] + (delta[0] * n) / d, p0[1] + (delta[1] * n) / d];
    } else {
      candidate = [random() * (width - radius * 2) + radius, random() * (height - radius * 2) + radius];
    }
    if (random() < edgeChance) {
      candidate[0] = radius;
    } else if (random() < edgeChance) {
      candidate[0] = width - radius;
    }

    if (random() < edgeChance) {
      candidate[1] = radius;
    } else if (random() < edgeChance) {
      candidate[1] = height - radius;
    }


    if (!collided(candidate, layout.points, clearance)) {
      layout.points.push(candidate);
    }
  }
  return layout;
}