import {Alea} from './alea.js';
import {generateLayout} from './generateLayout.js';
import {graphFromLayout} from './graphFromLayout.js';
import {Renderer} from './renderer.js';

const layout = generateLayout(Alea(2), 1024, 800, 16, 30, 99);
const graph = graphFromLayout(layout, 18);

const renderer = new Renderer(document.getElementById('diagram'));
renderer.render(layout, graph);
