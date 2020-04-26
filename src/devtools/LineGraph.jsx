import React, { useRef, useState } from "react";
import styled from 'styled-components'
import { VegaLite } from 'react-vega';

const spec = {
  "$schema": "https://vega.github.io/schema/vega-lite/v4.json",
  "description": "value over time",
  "data": {"name": "table"},
  "mark": {
    "type": "line",
    "interpolate": "step"
  },
  "encoding": {
    "x": {"field": "stateId", "type": "ordinal", "axis": null},
    "y": {"field": "value", "type": "quantitative", "axis": null}
  },
  "width": 150,
  "height": 30
}

const signalListeners = { hover: (e) => { console.log(e) } };

const LineGraph = ({ values }) => {
  const vegaData = { table: values || [] }

  return <div className="line-graph-container">
    <VegaLite spec={spec} data={vegaData} signalListeners={signalListeners} />
  </div>
}

export default LineGraph;

