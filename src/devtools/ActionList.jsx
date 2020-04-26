import React, { useRef, useState } from "react";
import styled from 'styled-components'

const Action = styled.div`
  display: inline-block;
  width: 80px;
  background-color: ${props => props.selected ? "#ccc" : "#eee"};
  overflow: hidden;
  text-overflow: ellipsis;
  margin-right: 10px;
  padding: 5px;
  border-radius: 5px;
`

const ActionList = ({ stagedActionIds, actionsById, selectedStateId, setSelectedStateId }) => {
  const actionDivs = stagedActionIds.map(actionId => {
    const action = actionsById[actionId];
    return <Action
      key={actionId}
      onMouseOver={ () => setSelectedStateId(actionId) }
      selected={actionId === selectedStateId} >
        { action.action.type }
      </Action>;
  })

  return <div>
      { actionDivs }
  </div>
}

export default ActionList;
