import {Alea} from './alea.js';
import {average} from './averager.js';
import {buildReachMatrix} from "./reachMatrix.js";
import {filterGraph} from "./filterGraph.js";
import {generateLayout} from './generateLayout.js';
import {getEdgePairs} from "./getEdgePairs.js";
import {getPerimeterNodes} from "./findPerimeter.js";
import {graphFromLayout} from './graphFromLayout.js';
import {makeBorderLayout} from './makeBorderLayout.js';
import {maximumSteps} from "./reachMatrix.js";
import {maximumStepsFrom} from "./reachMatrix.js";
import {Renderer} from './renderer.js';
import {toGraphViz} from './toGraphViz.js';

function newCanvas() {
  const diagrams = document.getElementById('diagrams');
  const canvas = document.createElement('canvas');
  diagrams.appendChild(canvas);
  return canvas;
}

const width = 1024;
const height = 800;
const radius = 16;

const random = Alea(19);
const layout = generateLayout(random, width, height, radius, 30, 45);
const graph = graphFromLayout(random, layout, 30, 0.75, 0.75);

new Renderer(newCanvas()).render(layout, graph);
toGraphViz(graph);

if (true) {
  const edgePairs = getEdgePairs(graph.edges);
  const reachMatrix = buildReachMatrix(edgePairs);
  const [east, west] = maximumSteps(reachMatrix);
  const north = maximumStepsFrom(reachMatrix, new Set([east, west]));
  const south = maximumStepsFrom(reachMatrix, new Set([east, west, north]));


  new Renderer(newCanvas()).render(layout, graph);
  const eastToWest = reachMatrix.get(east).get(west);
  const northToSouth = reachMatrix.get(north).get(south);
  for (const [node, reach] of reachMatrix.entries()) {
    const tx0 = reach.get(east) / eastToWest;
    const tx1 = 1 - reach.get(west) / eastToWest;
    console.log(eastToWest, tx0, tx1, reach.get(east), reach.get(west));

    const ty0 = reach.get(north) / northToSouth;
    const ty1 = 1 - reach.get(south) / northToSouth;
    console.log(northToSouth, ty0, ty1, reach.get(north), reach.get(south));

  }

}  else if (false) {
  const edgePairs = getEdgePairs(graph.edges);
  const perimeterNodes = getPerimeterNodes(edgePairs);

  const graph2 = filterGraph(graph, perimeterNodes);
  new Renderer(newCanvas()).render(layout, graph2);
} else if (false) {
  const layout2 = makeBorderLayout(width, height, radius, graph);
  new Renderer(newCanvas()).render(layout2, graph);

  for (let idx = 0; idx < 10; idx++) {
    average(layout2, graph);
  }
  new Renderer(newCanvas()).render(layout2, graph);
}