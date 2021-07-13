import React from "react";
import * as d3 from "d3";
import data from "../data/nodes.csv";

const MapNodes = (props) => {
  const txsInfo = props.txsInfo;
  const scaleInfo = props.scaleInfo;

  const projection = scaleInfo.projection;
  const centerStyle = scaleInfo.centerStyle;

  console.log(txsInfo);

  let m = new Map();
  let s = new Set();
  for (let i = 0; i < 100; i++) {
    m.set(i.toString(), 0);
  }
  for (let i in txsInfo) {
    const node = txsInfo[i].node.toString();
    const hash = txsInfo[i].hash;
    m.set(node, m.get(node) + 1);
    s.add(hash);
  }
  const txNum = s.size;

  d3.csv(data).then(function (data) {
    const nodeGeoInfo = data;

    d3.selectAll(".node").remove();

    const nodeSvg = d3
      .select(".nodes")
      .append("g")
      .attr("class", "node")
      .selectAll("circle")
      .data(nodeGeoInfo)
      .enter();

    nodeSvg
      .append("circle")
      .attr("cx", function (d) {
        return projection([d.long, d.lat])[0];
      })
      .attr("cy", function (d) {
        return projection([d.long, d.lat])[1];
      })
      .attr("r", function (d) {
        return (4 * m.get(d.id)) / txNum;
      })
      .style("fill", "#18efb1")
      .style("opacity", function (d) {
        return (m.get(d.id) / txNum) * 0.8;
      });

    // nodeSvg
    //   .append("circle")
    //   .attr("cx", function (d) {
    //     return projection([d.long, d.lat])[0];
    //   })
    //   .attr("cy", function (d) {
    //     return projection([d.long, d.lat])[1];
    //   })
    //   .attr("r", function (d) {
    //     return (6 * m.get(d.id)) / txNum;
    //   })
    //   .style("fill", "#18efb1")
    //   .style("opacity", function (d) {
    //     return (m.get(d.id) / txNum) * 0.1;
    //   });

    // nodeSvg
    //   .append("circle")
    //   .attr("cx", function (d) {
    //     return projection([d.long, d.lat])[0];
    //   })
    //   .attr("cy", function (d) {
    //     return projection([d.long, d.lat])[1];
    //   })
    //   .attr("r", function (d) {
    //     return (9 * m.get(d.id)) / txNum;
    //   })
    //   .style("fill", "#18efb1")
    //   .style("opacity", function (d) {
    //     return (m.get(d.id) / txNum) * 0.03;
    //   });
  });

  return (
    <svg
      style={centerStyle}
    >
      <g className="nodes" />
    </svg>
  );
};

export default MapNodes;
