import React, { useState, useEffect } from "react";
import styled from 'styled-components'
import * as d3 from 'd3';
import { clientPoint } from 'd3-selection';
import Line from './Line';

const GraphContainer = styled.svg`
  border: solid thin #eee;
  cursor: pointer;
  margin-right: 10px;
`

const CurrentValue = styled.div`
  display: inline-block;
  color: #aaa;
`

const LineGraph = ({ data, width, height, selectedStateId, setSelectedStateId, jumpToState, currentStateId }) => {
  // add another data point to line graph, to align with category graph
  // todo: think about a more robust way to do this... kinda hacky
  const lastDataPoint = data.slice(-1)[0];
  let graphData = data.concat([{ stateId: lastDataPoint.stateId + 1, value: lastDataPoint.value }])

  let activeData = graphData.filter(d => d.stateId <= currentStateId)
  const inactiveData = graphData.filter(d => d.stateId >= currentStateId)

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
    const stateId = bisect(graphData, position.x, 1);

    // clamp selected state to the last real data point
    if (stateId <= lastDataPoint.stateId) {
      return stateId;
    } else {
      return lastDataPoint.stateId
    }
  }

  const onMouseMove = (e) => {
    setSelectedStateId(getStateIdFromMouseEvent(e));
  }

  const onClick = (e) => {
    jumpToState(getStateIdFromMouseEvent(e));
  }

  let selectedValue;

  if (selectedStateId && graphData.find(d => d.stateId === selectedStateId)) {
    selectedValue = graphData.find(d => d.stateId === selectedStateId).value
  }

  return <>
    <GraphContainer width={width} height={height} onMouseMove={onMouseMove} onClick={onClick}>
      <Line path={line(activeData)} stroke='#a6d2ff' />
      <Line path={line(inactiveData)} stroke="#eee" />
      <Line path={selectionMarker} stroke='#ffcece' />

    </GraphContainer>

    { (selectedValue !== undefined) ? <CurrentValue>{selectedValue}</CurrentValue> : "" }
  </>
}


export default LineGraph;

