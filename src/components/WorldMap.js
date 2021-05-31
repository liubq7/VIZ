import React from "react";
import * as d3 from "d3";
import * as topojson from "topojson";
import { geoPath } from "d3-geo";
import { geoRobinson } from "d3-geo-projection";
import { useD3 } from "../hooks/useD3";

const WorldMap = (props) => {
  const txNum = props.txs.length;
  const ref = useD3(
    (svg) => {
      const height = 700;
      const width = 1000;

      const projection = geoRobinson()
        .scale(175)
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

      const coordinates = projection([119, 25.44]);

      svg.append('g')
        .attr('class', 'node')
        // .selectAll('path')
        // .data(node)
        // .enter()
        .append("circle")
        .attr("cx", coordinates[0])
        .attr("cy", coordinates[1])
        .attr("r", 5)
        .style("fill", "blue")
        .style("opacity", txNum/10);
    },
    [txNum]
  );

  return (
    <svg
      ref={ref}
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
