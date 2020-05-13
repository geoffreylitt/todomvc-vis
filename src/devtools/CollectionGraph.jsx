import React, { useState, useEffect } from "react";
import styled from 'styled-components'
import * as d3 from 'd3';
import { clientPoint } from 'd3-selection';
import uniq from 'lodash/uniq'
import Line from './Line'
import GraphContainer from './GraphContainer'

const color = d3.scaleOrdinal()
              .domain([])
              .range(d3.schemePastel1)

const CollectionGraph = ({ data, width, height, setSelectedStateId, selectedStateId, jumpToState, currentStateId, resetToSelectedState }) => {

  const xScale = d3.scaleBand()
                 .domain(data.map(d => d.stateId))
                 .range([1, width - 1])
                 .padding(0.1);

  const yScale = d3.scaleBand()
                .domain([])
                .range([height - 1, 1])
                .padding(0.1);

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

  const currentStateMarker = d3.line().curve(d3.curveLinear)([
      [xScale(currentStateId), height - 1],
      [xScale(currentStateId), yScale.range()[1]],
    ])

  const selectedStateMarker = d3.line().curve(d3.curveLinear)([
      [xScale(selectedStateId), yScale.range()[0]],
      [xScale(selectedStateId), yScale.range()[1]],
    ])


  const bisect = d3.bisector(d => d.stateId).right;

  const getStateIdFromMouseEvent = (e) => {
    const [xPos, yPos] = d3.clientPoint(e.target, e);
    return xPosToValue(xPos);
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

  const dots = data.flatMap(d => {
    return d.value.map((todo, index) => {
      const column = Math.floor(index / 5);
      const row = index % 5;
      return <circle
        key={`${d.stateId}:${todo.id}`}
        fill={color(todo.id)}
        stroke="#999"
        cx={xScale(d.stateId) + (column * 5)}
        cy={4 + (row * 7) + (column * 4)}
        r={4}
       />
    })
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
          fill="#333"
          fontSize="12px">
          {currentValue.length} todos
        </text>
  }

  return <>
    <GraphContainer width={width} height={height} onMouseMove={onMouseMove} onClick={onClick} onMouseLeave={onMouseLeave}>
      { dots }
      <Line path={currentStateMarker} stroke='#aaa' strokeDasharray={3} strokeWidth={1} />
      { selectedStateId ? <Line path={selectedStateMarker} stroke='#ffcece' /> : null }
      {valueOverlay}
    </GraphContainer>
  </>
}


export default CollectionGraph;

