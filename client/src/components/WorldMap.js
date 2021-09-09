import React, { useRef, useEffect, Fragment } from "react";
import * as d3 from "d3";
import * as topojson from "topojson";
import { geoPath } from "d3-geo";
import countriesData from "../data/countries.topo.json";
import ReactTooltip from "react-tooltip";
import "../css/WorldMap.css";

const WorldMap = (props) => {
  const worldMap = useRef();

  const { centerStyle, projection } = props;

  const path = geoPath().projection(projection).pointRadius(1);
  const mapData = topojson.feature(
    countriesData,
    countriesData.objects.countries
  ).features;

  function mouseover(d) {
    d3.select(this).style("fill", "#3E3F3E");
  }
  function mouseleave(d) {
    d3.select(this).style("fill", "#1F1F1F");
  }

  useEffect(() => {
    d3.selectAll("path").remove();

    d3.select(worldMap.current)
      .selectAll("path")
      .data(mapData)
      .enter()
      .append("path")
      .attr("d", path)
      .attr("data-tip", function (d) {
        return d.properties.name;
      })
      .style("fill", "#1F1F1F")
      .style("stroke", "#090909")
      .style("stroke-width", 0.7)
      .on("mouseover", mouseover)
      .on("mouseleave", mouseleave);

    ReactTooltip.rebuild();
  }, [props]);

  return (
    <Fragment>
      <svg style={centerStyle}>
        <g className="world-map" ref={worldMap} />
      </svg>
      <ReactTooltip />
    </Fragment>
  );
};

export default React.memo(WorldMap);
