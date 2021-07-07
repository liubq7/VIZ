import React, { useRef, useEffect, Fragment } from "react";
import * as d3 from "d3";
import {
  initializeNodes,
  drawInitNodes,
  drawLinkedNodes,
} from "../helpers/txNodes";
import {
  generateLinks,
  filterNodeData,
  filterLinkData,
} from "../helpers/processData";
import ReactTooltip from "react-tooltip";

const TXNodes = (props) => {
  const vizContainer = useRef();
  const width = props.width;
  const height = props.height - 40;

  const nodes = initializeNodes(width / 2, height / 2);
  const links = generateLinks();
  let nodeData = filterNodeData(props.time);
  let linkData = filterLinkData(props.time, links);

  useEffect(() => {
    d3.select(vizContainer.current)
      .call((svg) => drawInitNodes(svg, nodes))
      .call((svg) => drawLinkedNodes(svg, nodes, nodeData, linkData));
    ReactTooltip.rebuild();
  }, [nodes, nodeData, linkData]);

  return (
    <Fragment>
      <svg ref={vizContainer} style={{ height: height, width: width }} />
      <ReactTooltip />
    </Fragment>
  );
};

export default TXNodes;
