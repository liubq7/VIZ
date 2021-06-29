import React, { useRef, useEffect } from "react";
import * as d3 from "d3";
import * as topojson from "topojson";
import { geoPath } from "d3-geo";
import countriesData from "../data/countries.topo.json";

const WorldMap = (props) => {
  const worldMap = useRef();

  const style = props.style;
  const projection = props.projection;

  const path = geoPath().projection(projection).pointRadius(1);
  const mapData = topojson.feature(
    countriesData,
    countriesData.objects.countries
  ).features;

  useEffect(() => {
    d3.selectAll("path").remove();

    d3.select(worldMap.current)
      .selectAll("path")
      .data(mapData)
      .enter()
      .append("path")
      .attr("d", path)
      .style("fill", "#1F1F1F")
      .style("stroke", "#090909")
      .style("stroke-width", 0.7);
  }, [props]);

  return (
    <svg
      style={style}
    >
      <g className="world-map" ref={worldMap} />
    </svg>
  );
};

export default WorldMap;
