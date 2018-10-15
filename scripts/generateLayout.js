import {Layout} from './layout.js';

export function generateLayout(random, width, height, radius, clearance, nodes) {
  const layout = new Layout(width, height, radius);
  for (let i = 0; i < nodes; i++) {
    layout.points.push([random() * (width - radius * 2) + radius, random() * (height - radius * 2) + radius]);
  }
  return layout;
}