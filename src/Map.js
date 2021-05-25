import React from "react";
import * as d3 from "d3";
import * as topojson from "topojson";
import { geoPath } from "d3-geo";
import { geoRobinson } from "d3-geo-projection";
import { useD3 } from "./useD3";

const Map = () => {
  const ref = useD3(
    (svg) => {
      const height = 500;
      const width = 850;

      const projection = geoRobinson()
        .scale(130)
        .translate([width / 2, height / 2]);
      const path = geoPath().projection(projection).pointRadius(1);

      d3.json('./countries.topo.json').then(function (world) {
        const mapData = topojson.feature(
          world,
          world.objects.countries
        ).features;
        svg
          .select(".world-map")
          .attr("class", "countries")
          .selectAll("path")
          .data(mapData)
          .enter()
          .append("path")
          .attr("d", path);
      });
    },
    []
  );

  return (
    <svg
      ref={ref}
      style={{
        height: 500,
        width: 850,
        marginRight: "0px",
        marginLeft: "0px",
      }}
    >
      <g className="world-map" />
    </svg>
  );
};

export default Map;
