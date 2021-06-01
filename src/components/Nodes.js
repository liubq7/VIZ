import React from "react";
import * as d3 from "d3";
import { geoRobinson } from "d3-geo-projection";
import { useD3 } from "../hooks/useD3";

const Nodes = (props) => {
  const nodeTxs = props.nodeTxs;

  let m = new Map();
  let s = new Set();
  for (let i = 0; i < 100; i++) {
    m.set(i.toString(), 0);
  }
  for (let i in nodeTxs) {
    const node = nodeTxs[i].node;
    const hash = nodeTxs[i].hash;
    m.set(node, m.get(node) + 1);
    s.add(hash);
  }
  const txNum = s.size;

  const ref = useD3(
    (svg) => {
      const height = 700;
      const width = 1000;

      const projection = geoRobinson()
        .scale(175)
        .translate([width / 2, height / 2]);  

      d3.csv("./nodes.csv").then(function (data) {
        const nodeInfo = data;

        d3.selectAll(".node").remove();

        svg
          .append("g")
          .attr("class", "node")
          .selectAll("circle")
          .data(nodeInfo)
          .enter()
          .append("circle")
          .attr("cx", function (d) {
            return projection([d.long, d.lat])[0];
          })
          .attr("cy", function (d) {
            return projection([d.long, d.lat])[1];
          })
          .attr("r", 5)
          .style("fill", "blue")
          .style("opacity", function (d) {
            return m.get(d.id) / txNum;
          });
      });
    },
    [nodeTxs]
  );

  return (
    <svg
      ref={ref}
      style={{
        height: 700,
        width: 1000,
        marginRight: "0px",
        marginLeft: "0px",
      }}
    >
    </svg>
  );
};

export default Nodes;
