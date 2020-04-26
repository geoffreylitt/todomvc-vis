import React, { useRef, useState } from "react";
import styled from 'styled-components'

const Action = styled.div`
  display: inline-block;
  width: 80px;
  background-color: #eee;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-right: 10px;
  padding: 5px;
  border-radius: 5px;

  &:hover {
    background-color: #ddd;
  }
`

const ActionList = ({ stagedActionIds, actionsById, setHoveredStateId }) => {
  const actionDivs = stagedActionIds.map(actionId => {
    const action = actionsById[actionId];
    return <Action
      key={actionId}
      onMouseOver={ () => setHoveredStateId(actionId) } >
        { action.action.type }
      </Action>;
  })

  return <div>
      { actionDivs }
  </div>
}

export default ActionList;
