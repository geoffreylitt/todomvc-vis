import React, { useState, useEffect } from "react";
import styled from 'styled-components'
import * as d3 from 'd3';
import { clientPoint } from 'd3-selection';
import Line from './Line';

const GraphContainer = styled.svg`
  border: solid thin #eee;
  cursor: pointer;
`

const LineGraph = ({ data, width, height, selectedStateId, setSelectedStateId, jumpToState, currentStateId }) => {

  const activeData = data.filter(d => d.stateId <= currentStateId)
  const inactiveData = data.filter(d => d.stateId >= currentStateId)

  const xScale = d3.scaleLinear()
                 .domain(d3.extent(data, d => d.stateId))
                 .range([1, width - 1]);

  const yScale = d3.scaleLinear()
                 .domain(d3.extent(data, d => d.value))
                 .range([height - 1, 1]);

  const line = d3.line()
      .defined(d => !isNaN(d.value))
      .curve(d3.curveStepAfter)
      .x((d) => { return xScale(d.stateId); })
      .y((d) => { return yScale(d.value); });

  const selectionMarker = d3.line().curve(d3.curveLinear)([
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
    return bisect(data, position.x, 1);
  }

  const onMouseMove = (e) => {
    setSelectedStateId(getStateIdFromMouseEvent(e));
  }

  const onClick = (e) => {
    jumpToState(getStateIdFromMouseEvent(e));
  }

  return <GraphContainer width={width} height={height} onMouseMove={onMouseMove} onClick={onClick}>
    <Line path={line(activeData)} stroke='#a6d2ff' />
    <Line path={line(inactiveData)} stroke="#eee" />
    <Line path={selectionMarker} stroke='#ffcece' />
  </GraphContainer>
}


export default LineGraph;

