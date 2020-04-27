import React, { useState, useEffect } from "react";

const Line = ({ path, stroke, fill, strokeWidth }) => {
  return <path
    d={path}
    fill={fill}
    stroke={stroke}
    strokeWidth={strokeWidth}
    />
}

Line.defaultProps = {
  stroke:       'blue',
  fill:         'none',
  strokeWidth:  2
}

export default Line;
