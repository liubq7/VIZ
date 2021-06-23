import React, { useRef, useEffect } from "react";
import * as d3 from "d3";
import {
  initializeNodes,
  drawInitNodes,
  drawLinkedNodes,
} from "../helpers/txNodes";
import { generateLinks, filterNodeData, filterLinkData } from "../helpers/processData";

const TXNodes = (props) => {
  const vizContainer = useRef();
  const width = 800;
  const height = 500;
  const nodes = initializeNodes(width / 2, height / 2);
  const links = generateLinks();
  let nodesData = filterNodeData(props.time);
  let linksData = filterLinkData(props.time, links);

  useEffect(() => {
    d3.select(vizContainer.current)
      .call((svg) => drawInitNodes(svg, nodes))
      .call((svg) => drawLinkedNodes(svg, nodes, nodesData, linksData));
  }, [nodes, nodesData, linksData]);

  return <svg ref={vizContainer} style={{ height: height, width: width }} />;
};

export default TXNodes;
