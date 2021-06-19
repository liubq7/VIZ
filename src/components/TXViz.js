import { Fragment } from "react";
import * as d3 from "d3";
import "./TXViz.css";

function seedRandom(seed) {
  return ((seed * 9301 + 49297) % 233280) / 233280.0;
}

const TXViz = () => {
  const width = 800;
  const height = 500;

  const numNodes = 100;
  let nodes = d3.range(numNodes).map(function () {
    return { radius: 5 };
  });

  const initialRadius = 20,
    initialAngle = Math.PI * (3 - Math.sqrt(5));

  function initializeNodes() {
    for (let i = 0, n = nodes.length, node; i < n; ++i) {
      node = nodes[i];
      node.index = i;
      if (isNaN(node.x) || isNaN(node.y)) {
        const radius = initialRadius * Math.sqrt(0.5 + i),
          angle = i * initialAngle;
        node.x = radius * Math.cos(angle);
        node.y = radius * Math.sin(angle);
      }
      node.id = "node" + i;
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

  initializeNodes();
  center(width / 2, height / 2);
  console.log(nodes);

  // disappear after refresh???
  d3.select(".nodes-circle")
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


  return (
    // <Fragment>
      <svg style={{ height: height, width: width }}>
        <g className="nodes-circle" />
      </svg>
    //   {/* <div>
    //     <svg style={{ height: 70, width: width }}>
    //       <g className="slider" />
    //     </svg>
    //     <button id="play-button">play</button>
    //   </div>
    // </Fragment> */}
  );
};

export default TXViz;
