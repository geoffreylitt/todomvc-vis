import React, { useState, useEffect } from "react";
import styled from 'styled-components'
import * as d3 from 'd3';
import { clientPoint } from 'd3-selection';
import uniq from 'lodash/uniq'
import Line from './Line'
import GraphContainer from './GraphContainer'

const actionNameToSymbol = (actionName) => {
  const symbols = {
    "@@INIT": "⏯",
    "ADD_TODO": "➕",
    "SET_VISIBILITY_FILTER": "🔍",
    "EDIT_TODO": "✏️",
    "DELETE_TODO": "🗑",
    "COMPLETE_TODO": "✅",
    "COMPLETE_ALL_TODOS": "✅",
    "CLEAR_COMPLETED": "🗑"
  };

  return symbols[actionName] || "?";
}

const ActionsGraph = ({ data, width, height, setSelectedStateId, jumpToState, currentStateId, resetToSelectedState, selectedStateId }) => {

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
    return xPosToValue(xPos);
  }

  const onClick = (e) => {
    if (selectedStateId !== null) {
      setSelectedStateId(null);
    } else {
      setSelectedStateId(getStateIdFromMouseEvent(e));
    }
  }

  const onMouseMove = (e) => {
    jumpToState(getStateIdFromMouseEvent(e));
  }

  const onMouseLeave = (e) => {
    resetToSelectedState();
  }

  const icons = data.map(d =>
    <text
      key={d.stateId}
      x={xScale(d.stateId) - 7}
      y={25}
      height={10}
      width={xScale.bandwidth()}>
      {actionNameToSymbol(d.value)}
    </text>
  )


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

  let selectionPin;
  if (selectedStateId) {
    selectionPin = <text
      x={xScale(selectedStateId)}
      y={-5}>📌</text>
  }

  return <>
    <GraphContainer width={width} height={height} onMouseMove={onMouseMove} onClick={onClick} onMouseLeave={onMouseLeave}>
      { icons }
      <Line path={currentStateMarker} stroke='#aaa' strokeDasharray={3} strokeWidth={1} />
      { selectedStateId ? <Line path={selectedStateMarker} stroke='#ffcece' /> : null }
      {selectionPin}
      {valueOverlay}
    </GraphContainer>
  </>
}


export default ActionsGraph;

