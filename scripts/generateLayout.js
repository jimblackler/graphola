import {Layout} from './layout.js';

export function generateLayout(random, width, height, radius, nodes) {
  const layout = new Layout();
  for (let i = 0; i < nodes; i++) {
    layout.points.push(random() * (width - radius * 2) + radius, random() * (height - radius * 2) + radius);
  }
  return layout;
}