export function toGraphViz(graph) {

  console.log(`digraph {`);
  console.log(`  edge [dir=none]`);
  for (const edge of graph.edges) {
    console.log(`  ${edge[0]} -> ${edge[1]}`);
  }
  console.log(`}`);
}