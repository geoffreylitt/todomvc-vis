import React, { useState, useEffect } from "react";
import styled from 'styled-components'
import * as d3 from 'd3';
import { clientPoint } from 'd3-selection';
import Line from './Line';
import GraphContainer from './GraphContainer'

const LineGraph = ({ data, width, height, setSelectedStateId, selectedStateId, jumpToState, currentStateId, resetToSelectedState }) => {
  // add another data point to line graph, to align with category graph
  // todo: think about a more robust way to do this... kinda hacky
  const lastDataPoint = data.slice(-1)[0];
  let graphData = data.concat([{ stateId: lastDataPoint.stateId + 1, value: lastDataPoint.value }])

  const xScale = d3.scaleLinear()
                 .domain(d3.extent(graphData, d => d.stateId))
                 .range([1, width - 1]);

  const yScale = d3.scaleLinear()
                 .domain(d3.extent(graphData, d => d.value))
                 .range([height - 1, 1]);

  const line = d3.line()
      .defined(d => !isNaN(d.value))
      .curve(d3.curveStepAfter)
      .x((d) => { return xScale(d.stateId); })
      .y((d) => { return yScale(d.value); });

  const currentStateMarker = d3.line().curve(d3.curveLinear)([
      [xScale(currentStateId), yScale.range()[0]],
      [xScale(currentStateId), yScale.range()[1]],
    ])

  const selectedStateMarker = d3.line().curve(d3.curveLinear)([
      [xScale(selectedStateId), yScale.range()[0]],
      [xScale(selectedStateId), yScale.range()[1]],
    ])

  const bisect = d3.bisector(d => d.stateId).right;

  const getStateIdFromMouseEvent = (e) => {
    const [xPos, yPos] = d3.clientPoint(e.target, e);
    const position = {
      x: xScale.invert(xPos),
      y: yScale.invert(yPos)
    };
    const stateId = bisect(graphData, position.x, 1);

    // clamp selected state to the last real data point
    if (stateId <= lastDataPoint.stateId) {
      return stateId;
    } else {
      return lastDataPoint.stateId
    }
  }

  const onClick = (e) => {
    const clickedStateId = getStateIdFromMouseEvent(e);
    if (clickedStateId === selectedStateId) {
      // unpin
      setSelectedStateId(null);
    } else {
      setSelectedStateId(clickedStateId);
    }
  }

  const onMouseMove = (e) => {
    jumpToState(getStateIdFromMouseEvent(e));
  }

  const onMouseLeave = (e) => {
    resetToSelectedState();
  }

  let currentValue;

  if (currentStateId && data.find(d => d.stateId === currentStateId)) {
    currentValue = data.find(d => d.stateId === currentStateId).value
  }

  let valueOverlay;
  if (currentValue !== undefined) {
    valueOverlay = <text
          x={xScale(currentStateId) + 5}
          y={12}
          height={10}
          width={50}
          fill="#999"
          fontSize="12px">
          {currentValue}
        </text>
  }

  return <>
    <GraphContainer width={width} height={height} onMouseMove={onMouseMove} onClick={onClick} onMouseLeave={onMouseLeave}>
      <Line path={line(graphData)} stroke='#a6d2ff' />
      <Line path={currentStateMarker} stroke='#aaa' strokeDasharray={3} strokeWidth={1} />
      { selectedStateId ? <Line path={selectedStateMarker} stroke='#ffcece' /> : null }

      {valueOverlay}

    </GraphContainer>


  </>
}


export default LineGraph;

