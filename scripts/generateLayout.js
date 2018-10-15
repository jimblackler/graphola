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

  while (layout.points.length < nodes) {

    const candidate = [random() * (width - radius * 2) + radius, random() * (height - radius * 2) + radius];
    if (!collided(candidate, layout.points, clearance)) {
      layout.points.push(candidate);
    }
  }
  return layout;
}