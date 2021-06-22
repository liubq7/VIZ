import * as d3 from "d3";

export const initializeNodes = (translateX, translateY) => {
  const numNodes = 100;
  let nodes = d3.range(numNodes).map(function () {
    return { radius: 5 };
  });

  const initialRadius = 20,
    initialAngle = Math.PI * (3 - Math.sqrt(5));

  for (let i = 0, n = nodes.length, node; i < n; ++i) {
    node = nodes[i];
    node.index = i;
    // if (isNaN(node.x) || isNaN(node.y)) {
    const radius = initialRadius * Math.sqrt(0.5 + i),
      angle = i * initialAngle;
    node.x = radius * Math.cos(angle);
    node.y = radius * Math.sin(angle);
    // }
    node.id = "node" + i;
  }

  function center(x, y) {
    let i,
      sx = 0,
      sy = 0;
    const n = nodes.length;

    for (i = 0; i < n; ++i) {
      let node = nodes[i];
      sx += node.x;
      sy += node.y;
    }

    for (sx = sx / n - x, sy = sy / n - y, i = 0; i < n; ++i) {
      let node = nodes[i];
      node.x -= sx;
      node.y -= sy;
    }
  }

  center(translateX, translateY);

  return nodes;
};

export const drawInitNodes = (svg, nodes) => {

  svg
    .selectAll("circle")
    .data(nodes)
    .enter()
    .append("circle")
    .attr("r", function (d) {
      return d.radius;
    })
    .attr("cx", function (d) {
      return d.x;
    })
    .attr("cy", function (d) {
      return d.y;
    })
    .attr("id", function (d) {
      return d.id;
    })
    .style("fill", "white");

  return svg.node();
};

export const drawLinkedNodes = (svg, nodes, nodesData, linksData) => {
  console.log(nodesData);
  const p = svg.selectAll(".recieved").data(nodesData);
  p.enter().append("circle").attr("class", "recieved");
  p.attr("r", 5)
    .attr("cx", function (d) {
      return nodes[d].x;
    })
    .attr("cy", function (d) {
      return nodes[d].y;
    })
    .style("fill", "yellow");
  p.exit().remove();

  const l = svg.selectAll(".connect").data(linksData);
  l.enter().append("line").attr("class", "connect");
  l.style("stroke", "yellow")
    .attr("x1", function (d) {
      return nodes[d.startPoint].x;
    })
    .attr("y1", function (d) {
      return nodes[d.startPoint].y;
    })
    .attr("x2", function (d) {
      return nodes[d.endPoint].x;
    })
    .attr("y2", function (d) {
      return nodes[d.endPoint].y;
    });
  l.exit().remove();

  return svg.node();
};
