import React, { useContext, useEffect, useRef } from "react";
import * as d3 from "d3";
import { NodesContext } from "../context/NodesContext";

const MapNodes = (props) => {
  const { nodesGeoData } = useContext(NodesContext);
  const nodesRef = useRef();

  const scaleInfo = props.scaleInfo;
  const projection = scaleInfo.projection;
  const centerStyle = scaleInfo.centerStyle;

  const txNum = props.txNum;
  const txs = props.txs;

  let m = new Map();
  for (let i in txs) {
    const node = txs[i].node_id;
    m.set(node, (m.get(node) || 0) + 1);
  }

  useEffect(() => {
    d3.selectAll(".node").remove();

    const nodeSvg = d3
      .select(nodesRef.current)
      .append("g")
      .attr("class", "node")
      .selectAll("circle")
      .data(nodesGeoData)
      .enter();

    // TODO: transition
    nodeSvg
      .append("circle")
      .attr("cx", function (d) {
        return projection([d.longitude, d.latitude])[0];
      })
      .attr("cy", function (d) {
        return projection([d.longitude, d.latitude])[1];
      })
      .attr("r", function (d) {
        return 4 * Math.sqrt((m.get(d.node_id) || 0) / txNum);
      })
      // .transition()
      // .duration(200)
      .style("fill", "#18efb1")
      .style("opacity", function (d) {
        return ((m.get(d.node_id) || 0) / txNum);
      });
  }, [props]);

  return (
    <svg style={centerStyle}>
      <g className="nodes" ref={nodesRef} />
    </svg>
  );
};

export default MapNodes;
