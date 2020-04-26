import React, { useRef, useState } from "react";
import styled from 'styled-components'

const Action = styled.div`
  display: inline-block;
  width: 80px;
  background-color: ${props => props.selected ? "#ffcece" : (props.active ? "#a6d2ff" : "#eee")};
  overflow: hidden;
  text-overflow: ellipsis;
  margin-right: 10px;
  padding: 5px;
  border-radius: 5px;
  cursor: pointer;
`

const ActionList = ({ currentStateId, stagedActionIds, actionsById, selectedStateId, setSelectedStateId, jumpToState }) => {
  const actionDivs = stagedActionIds.map(actionId => {
    const action = actionsById[actionId];
    return <Action
      key={actionId}
      onMouseOver={ () => setSelectedStateId(actionId) }
      selected={actionId === selectedStateId}
      active={currentStateId >= actionId}
      onClick={ () => jumpToState(actionId) }
       >
        { action.action.type }
      </Action>;
  })

  return <div>
      { actionDivs }
  </div>
}

export default ActionList;
