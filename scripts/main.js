import {Alea} from './alea.js';
import {generateLayout} from './generateLayout.js';
import {graphFromLayout} from './graphFromLayout.js';
import {regenerateLayout} from './regenerateLayout.js';
import {Renderer} from './renderer.js';


const width = 1024;
const height = 800;
const radius = 16;

const layout = generateLayout(Alea(2), width, height, radius, 30, 10);
const graph = graphFromLayout(layout, 18);

const renderer = new Renderer(document.getElementById('diagram'));
renderer.render(layout, graph);

const layout2 = regenerateLayout(width, height, radius, graph);
const renderer2 = new Renderer(document.getElementById('diagram2'));
renderer2.render(layout2, graph);
