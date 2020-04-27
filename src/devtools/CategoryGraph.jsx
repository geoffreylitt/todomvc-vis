import React, { useState, useEffect } from "react";
import styled from 'styled-components'
import * as d3 from 'd3';
import { clientPoint } from 'd3-selection';
import uniq from 'lodash/uniq'
import Line from './Line'

const GraphContainer = styled.svg`
  border: solid thin #eee;
  cursor: pointer;
`

const CategoryGraph = ({ data, width, height, selectedStateId, setSelectedStateId, jumpToState, currentStateId }) => {

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

  const selectionMarker = d3.line().curve(d3.curveLinear)([
      [xScale(selectedStateId), yScale.range()[0]],
      [xScale(selectedStateId), yScale.range()[1]],
    ])

  const bisect = d3.bisector(d => d.stateId).right;

  const getStateIdFromMouseEvent = (e) => {
    const [xPos, yPos] = d3.clientPoint(e.target, e);
    const position = {
      x: xScale.invert(xPos),
    };
    return bisect(data, position.x, 1);
  }

  const onMouseMove = (e) => {
    setSelectedStateId(getStateIdFromMouseEvent(e));
  }

  const onClick = (e) => {
    jumpToState(getStateIdFromMouseEvent(e));
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

  return <GraphContainer width={width} height={height} >
    { rects }
    <Line path={selectionMarker} stroke='#ffcece' />
  </GraphContainer>
}


export default CategoryGraph;

