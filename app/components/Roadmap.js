"use client";
import React, { useRef, useEffect } from "react";
import * as d3 from "d3";
import { groups, items } from "../data/sampleData";

const Roadmap = () => {
  const svgRef = useRef();

  useEffect(() => {
    const width = 1000;
    const height = 500;
    const margin = { top: 50, right: 20, bottom: 50, left: 200 };

    // Create D3 container for zoom
    const svg = d3.select(svgRef.current);
    const container = svg
      .select(".roadmap-container")
      .attr("transform", `translate(${margin.left}, ${margin.top})`);

    // Apply ZoomHandler
    ZoomHandler(svg, container, width, height);
  }, []);

  return (
    <SVGContainer svgRef={svgRef} width={1200} height={600}>
      <g className="roadmap-container">
        <GroupLabels groups={groups} />
        <GridLines groups={groups} />
        <TimelineItems groups={groups} items={items} />
        <TimeAxis items={items} />
      </g>
    </SVGContainer>
  );
};

export default Roadmap;


const SVGContainer = ({ svgRef, width, height, children }) => {
  return (
    <svg
      ref={svgRef}
      width={width}
      height={height}
      style={{ border: "1px solid #ccc" }}
    >
      {children}
    </svg>
  );
};


const GroupLabels = ({ groups }) => {
  return (
    <g className="group-labels">
      {groups.map((group, index) => (
        <React.Fragment key={group.id}>
          <rect
            x={-200}
            y={index * 50}
            width={190}
            height={40}
            fill={group.isParent ? "#f4f4f4" : "#ffffff"}
            stroke="#ccc"
          />
          <text
            x={-190}
            y={index * 50 + 20}
            fontSize="12"
            fontWeight={group.isParent ? "bold" : "normal"}
            dy="0.35em"
          >
            {group.title}
          </text>
        </React.Fragment>
      ))}
    </g>
  );
};


const GridLines = ({ groups }) => {
  return (
    <g className="grid-lines">
      {groups.map((group, index) => (
        <line
          key={group.id}
          x1={0}
          x2={1000}
          y1={index * 50}
          y2={index * 50}
          stroke="#ddd"
        />
      ))}
    </g>
  );
};


const TimelineItems = ({ items, groups }) => {
  // Create scales
  const timeScale = d3
    .scaleTime()
    .domain([
      d3.min(items, (d) => new Date(d.start_time)),
      d3.max(items, (d) => new Date(d.end_time)),
    ])
    .range([0, 1000]);

  const groupScale = d3
    .scaleBand()
    .domain(groups.map((g) => g.id))
    .range([0, 500])
    .padding(0.1);

  return (
    <g className="timeline-items">
      {items.map((item) => (
        <rect
          key={item.id}
          x={timeScale(new Date(item.start_time))}
          y={groupScale(item.group) + groupScale.bandwidth() * 0.1}
          width={
            timeScale(new Date(item.end_time)) -
            timeScale(new Date(item.start_time))
          }
          height={groupScale.bandwidth() * 0.8}
          fill={
            item.type === "milestone"
              ? "yellow"
              : item.type === "task"
              ? "lightblue"
              : item.type === "launch"
              ? "orange"
              : "purple"
          }
          rx={8}
        />
      ))}
    </g>
  );
};



const TimeAxis = ({ items }) => {
  const axisRef = useRef();

  useEffect(() => {
    const timeScale = d3
      .scaleTime()
      .domain([
        d3.min(items, (d) => new Date(d.start_time)),
        d3.max(items, (d) => new Date(d.end_time)),
      ])
      .range([0, 1000]);

    const axis = d3.axisBottom(timeScale).ticks(10).tickFormat(d3.timeFormat("%b %d"));

    d3.select(axisRef.current).call(axis);
  }, [items]);

  return <g ref={axisRef} transform="translate(0, 500)" />;
};


const ZoomHandler = (svg, container, width, height) => {
  const zoom = d3
    .zoom()
    .scaleExtent([1, 10])
    .translateExtent([
      [0, 0],
      [width, height],
    ])
    .on("zoom", (event) => {
      container.attr("transform", event.transform);
    });

  svg.call(zoom);
};

