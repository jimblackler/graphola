import {Alea} from './alea.js';
import {generateLayout} from './generateLayout.js';
import {Renderer} from './renderer.js';

const layout = generateLayout(Alea(2), 800, 600, 20, 30, 55);
const renderer = new Renderer(document.getElementById('diagram'));
renderer.render(layout);
