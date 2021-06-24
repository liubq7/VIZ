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
  // TODO: lift state up??
  const nodes = initializeNodes(width / 2, height / 2);
  const links = generateLinks();
  let nodeData = filterNodeData(props.time);
  let linkData = filterLinkData(props.time, links);

  // console.log(nodeData);

  useEffect(() => {
    d3.select(vizContainer.current)
      .call((svg) => drawInitNodes(svg, nodes))
      .call((svg) => drawLinkedNodes(svg, nodes, nodeData, linkData));
  }, [nodeData, linkData]);

  return <svg ref={vizContainer} style={{ height: height, width: width }} />;
};

export default TXNodes;
