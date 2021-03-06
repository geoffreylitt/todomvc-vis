import React, { useState, useEffect } from "react";

const Line = ({ path, stroke, fill, strokeWidth, strokeDasharray }) => {
  return <path
    d={path}
    fill={fill}
    stroke={stroke}
    strokeWidth={strokeWidth}
    strokeDasharray={strokeDasharray}
    opacity={0.8}
    />
}

Line.defaultProps = {
  stroke:       'blue',
  fill:         'none',
  strokeWidth:  2
}

export default Line;
