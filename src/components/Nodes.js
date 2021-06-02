import React from "react";
import * as d3 from "d3";
import { geoRobinson } from "d3-geo-projection";

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

  const height = 700;
  const width = 1100;

  const projection = geoRobinson()
    .scale(185)
    .translate([width / 2, height / 2]);

  const rangeColor = d3
    .scaleLinear()
    .domain([0, 10])
    .range(["#939998", "#1EE8C6"]);

  d3.csv("./nodes.csv").then(function (data) {
    const nodeInfo = data;

    d3.selectAll(".node").remove();

    d3.select(".nodes")
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
      .attr("r", function (d) {
        return (5 * m.get(d.id)) / txNum;
        // return 5;
      })
      // .style("fill", function (d) {
      //   return rangeColor(Math.trunc(m.get(d.id) / txNum * 10));
      // })
      .style("fill", "#18efb1")
      .style("opacity", function (d) {
        return m.get(d.id) / txNum;
      });
  });

  return (
    <svg
      style={{
        height: height,
        width: width,
        marginRight: "0px",
        marginLeft: "0px",
      }}
    >
      <g className="nodes" />
    </svg>
  );
};

export default Nodes;
