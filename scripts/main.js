import {Alea} from './alea.js';
import {generateLayout} from './generateLayout.js';
import {graphFromLayout} from './graphFromLayout.js';
import {Renderer} from './renderer.js';

const layout = generateLayout(Alea(2), 800, 600, 16, 24, 50);
const graph = graphFromLayout(layout, 20);

const renderer = new Renderer(document.getElementById('diagram'));
renderer.render(layout, graph);
