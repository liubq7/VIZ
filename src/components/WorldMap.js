import React from "react";
import * as d3 from "d3";
import * as topojson from "topojson";
import { geoPath } from "d3-geo";
import { geoRobinson } from "d3-geo-projection";

const WorldMap = () => {
  const height = 700;
  const width = 1000;

  const projection = geoRobinson()
    .scale(175)
    .translate([width / 2, height / 2]);
  const path = geoPath().projection(projection).pointRadius(1);

  d3.json("./countries.topo.json").then(function (world) {
    const mapData = topojson.feature(world, world.objects.countries).features;
    d3
      .select(".world-map")
      .attr("class", "countries")
      .selectAll("path")
      .data(mapData)
      .enter()
      .append("path")
      .attr("d", path)
      .style("fill", "#101010")  //"#101010"
      .style("stroke", "#2c2c2c");  // "#2c2c2c"
  });

  return (
    <svg
      style={{
        height: 700,
        width: 1000,
        marginRight: "0px",
        marginLeft: "0px",
      }}
    >
      <g className="world-map" />
    </svg>
  );
};

export default WorldMap;
