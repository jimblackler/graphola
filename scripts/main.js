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

const layout = generateLayout(Alea(2), width, height, radius, 30, 30);
const graph = graphFromLayout(layout, 18);

new Renderer(newCanvas()).render(layout, graph);

const layout2 = makeBorderLayout(width, height, radius, graph);
new Renderer(newCanvas()).render(layout2, graph);

for (let idx = 0; idx < 10; idx++) {
  average(layout2, graph);
}
new Renderer(newCanvas()).render(layout2, graph);