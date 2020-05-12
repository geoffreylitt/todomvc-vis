import React, { useState, useEffect } from "react";
import styled from 'styled-components'
import * as d3 from 'd3';
import { clientPoint } from 'd3-selection';
import uniq from 'lodash/uniq'
import Line from './Line'
import GraphContainer from './GraphContainer'

const CategoryGraph = ({ data, width, height, setSelectedStateId, jumpToState, currentStateId, resetToSelectedState }) => {

  const paddingRight = 50;

  const xScale = d3.scaleBand()
                 .domain(data.map(d => d.stateId))
                 .range([1, width - 1])
                 .padding(0.1);

  const yScale = d3.scaleBand()
                .domain(uniq(data.map(d => d.value)))
                .range([height - 1, 1])
                .padding(0.1);

  const activeColor = d3.scaleOrdinal()
                .domain(uniq(data.map(d => d.value)))
                .range(d3.schemePastel1)

  const xPosToValue = (xPos) => {
    const index = Math.round((xPos / xScale.step()));
    const domain = xScale.domain();
    if (index >= domain.length) {
      return domain.slice(-1)[0];
    } else if (index < 0) {
      return domain[0];
    } else {
      return domain[index]
    }
  }

  const selectionMarker = d3.line().curve(d3.curveLinear)([
      [xScale(currentStateId), yScale.range()[0]],
      [xScale(currentStateId), yScale.range()[1]],
    ])

  const bisect = d3.bisector(d => d.stateId).right;

  const getStateIdFromMouseEvent = (e) => {
    const [xPos, yPos] = d3.clientPoint(e.target, e);
    return xPosToValue(xPos);
  }

  const onClick = (e) => {
    setSelectedStateId(getStateIdFromMouseEvent(e), currentStateId);
  }

  const onMouseMove = (e) => {
    jumpToState(getStateIdFromMouseEvent(e));
  }

  const onMouseLeave = (e) => {
    resetToSelectedState();
  }

  const rects = data.map(d => {
    let color;
    if (currentStateId >= d.stateId) {
      color = activeColor(d.value);
    } else {
      color = "#eee";
    }
    return <rect
      key={d.stateId}
      fill={color}
      x={xScale(d.stateId)}
      y={yScale(d.value)}
      height={yScale.bandwidth()}
      width={xScale.bandwidth()}>
    </rect>
  })


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
      { rects }
      <Line path={selectionMarker} stroke='#ffcece' />
      {valueOverlay}
    </GraphContainer>
  </>
}


export default CategoryGraph;

