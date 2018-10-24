import {Alea} from './alea.js';
import {average} from './averager.js';
import {generateLayout} from './generateLayout.js';
import {graphFromLayout} from './graphFromLayout.js';
import {makeBorderLayout} from './makeBorderLayout.js';
import {Renderer} from './renderer.js';

function newCanvas() {
  const diagrams = document.getElementById('diagrams');
  const canvas = document.createElement('canvas');
  diagrams.appendChild(canvas);
  return canvas;
}

const width = 1024;
const height = 800;
const radius = 16;

const random = Alea(13);
const layout = generateLayout(random, width, height, radius, 30, 45);
const graph = graphFromLayout(random, layout, 30, 0.8, 0.8);

new Renderer(newCanvas()).render(layout, graph);

const layout2 = makeBorderLayout(width, height, radius, graph);
new Renderer(newCanvas()).render(layout2, graph);

for (let idx = 0; idx < 10; idx++) {
  average(layout2, graph);
}
new Renderer(newCanvas()).render(layout2, graph);