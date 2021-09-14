import * as d3 from "d3";
import seedrandom from "seedrandom";

const R = 2.5;
const SPACING = 15;
const NODES_MAX = 100;

function randomDivide(size, txVizHash) {
  if (size <= NODES_MAX) {
    return Array(size + 1)
      .fill()
      .map((x, i) => i);
  }

  const s = new Set();
  const rng = seedrandom(txVizHash);
  while (s.size < NODES_MAX - 1) {
    s.add(Math.floor(rng() * (size - 1)) + 1);
  }
  return [0, size, ...s].sort(function (a, b) {
    return a - b;
  });
}

export const initNodes = (
  translateX,
  translateY,
  txVizData,
  txVizHash,
  nodesGeoMap
) => {
  const size = txVizData.length;
  const divide = randomDivide(size, txVizHash);
  let nodes = d3.range(divide.length - 1).map(function (i) {
    const n = divide[i+1] - divide[i];
    return { radius: (n > 23 ? 12 : R * Math.sqrt(n)) };
  });

  const initialRadius = SPACING,
    initialAngle = Math.PI * (3 - Math.sqrt(5));

  for (let i = 0, n = nodes.length, node; i < n; ++i) {
    node = nodes[i];
    node.index = divide[i];
    node.received = false;

    const radius = initialRadius * Math.sqrt(0.5 + i),
      angle = i * initialAngle;
    node.x = radius * Math.cos(angle);
    node.y = radius * Math.sin(angle);

    node.coord = [];
    for (let j = divide[i]; j < divide[i+1]; j++) {
      const id = txVizData[j].node_id;
      node.coord.push('(' + nodesGeoMap.get(id) + ')');
    }
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

export const drawViz = (svg, nodes, nodeData, linkData) => {
  for (let i in nodes) {
    nodes[i].received = nodes[i].index < nodeData;
  }

  const p = svg.selectAll(".point").data(nodes);
  p.enter().append("circle").attr("class", "point");

  p.attr("r", function (d) {
    return d.radius;
  })
    .attr("cx", function (d) {
      return d.x;
    })
    .attr("cy", function (d) {
      return d.y;
    })
    .attr("data-tip", function (d) {
      return d.coord;
    })
    .style("fill", function (d) {
      return d.received ? "#18EFB1" : "#E6E6E6";
    });
  p.exit().remove();

  const l = svg.selectAll(".link").data(linkData);
  l.enter()
    .append("line")
    .attr("class", "link")
    .style("stroke", "#18EFB1")
    .attr("x1", function (d) {
      return getNode(d.startPoint, nodes).x;
    })
    .attr("y1", function (d) {
      return getNode(d.startPoint, nodes).y;
    })
    .attr("x2", function (d) {
      return getNode(d.endPoint, nodes).x;
    })
    .attr("y2", function (d) {
      return getNode(d.endPoint, nodes).y;
    });
  l.exit().remove();

  return svg.node();
};

function getNode(n, nodes) {
  let i = 0;
  while (i < nodes.length && nodes[i].index <= n) {
    i += 1;
  }
  return nodes[i - 1];
}
