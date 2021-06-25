import React, { useRef, useEffect } from "react";
import * as d3 from "d3";
import * as topojson from "topojson";
import { geoPath } from "d3-geo";
import { geoMiller} from "d3-geo-projection";
import countriesData from "../data/countries.topo.json";

const WorldMap = () => {
  const worldMap = useRef()
  const height = 700;
  const width = 1100;

  const projection = geoMiller()
    .scale(150)
    .rotate([-11, 0])
    .translate([width / 2, height / 2]);
  const path = geoPath().projection(projection).pointRadius(1);

  console.log(countriesData);
  const mapData = topojson.feature(countriesData, countriesData.objects.countries).features;

  useEffect(() => {
    d3
      .select(worldMap.current)
      .selectAll("path")
      .data(mapData)
      .enter()
      .append("path")
      .attr("d", path)
      .style("fill", "#101010")
      .style("stroke", "#2c2c2c");  
  }, []);

  return (
    <svg
      style={{
        height: height,
        width: width,
        marginRight: "0px",
        marginLeft: "0px",
      }}
    >
      <g className="world-map" ref={worldMap} />
    </svg>
  );
};

export default WorldMap;
