import React, { useRef, useEffect, Fragment, useContext, useState } from "react";
import * as d3 from "d3";
import {
  initializeNodes,
  drawInitNodes,
  drawLinkedNodes,
  mapNodesGeoData,
} from "../helpers/txNodes";
import {
  generateLinks,
  filterNodeData,
  filterLinkData,
} from "../helpers/processData";
import ReactTooltip from "react-tooltip";
import { TXVizContext } from "../context/TXVizContext";
import { NodesContext } from "../context/NodesContext";

const TXNodes = (props) => {
  const vizContainer = useRef();
  const width = props.width;
  const height = props.height - 40;

  const {txVizHash, txVizData} = useContext(TXVizContext);
  const {nodesGeoData} = useContext(NodesContext);

  const [nodes, setNodes] = useState();
  const [links, setLinks] = useState();
  const [nodeData, setNodeData] = useState();
  const [linkData, setLinkData] = useState();
  const [nodesGeoMap, setNodesGeoMap] = useState(new Map());

  useEffect(() => {
    setNodesGeoMap(mapNodesGeoData(nodesGeoData));
    setNodes(initializeNodes(width / 2, height / 2, txVizData, nodesGeoMap));
    setLinks(generateLinks(txVizData, txVizHash));
  }, [txVizHash, txVizData]);

  useEffect(() => {
    setNodeData(filterNodeData(props.time, txVizData));
    setLinkData(filterLinkData(props.time, links));
  }, [props.time])

  useEffect(() => {
    if (nodes) {
      d3.select(vizContainer.current)
        .call((svg) => drawInitNodes(svg, nodes))
        .call((svg) => drawLinkedNodes(svg, nodes, nodeData, linkData));
      ReactTooltip.rebuild();
    }
  }, [nodes, nodeData, linkData]);

  return (
    <Fragment>
      <svg ref={vizContainer} style={{ width, height }} />
      <ReactTooltip />
    </Fragment>
  );
};

export default TXNodes;
