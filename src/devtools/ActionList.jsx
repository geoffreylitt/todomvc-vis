import React, { useRef, useState } from "react";
import styled from 'styled-components'

const Action = styled.div`
  display: inline-block;
  width: 80px;
  background-color: ${props => props.active ? (props.selected ? "#ffcece" : "#a6d2ff") : "#eee"};
  overflow: hidden;
  text-overflow: ellipsis;
  margin-right: 10px;
  padding: 5px;
  border-radius: 5px;
`

const ActionList = ({ currentStateId, stagedActionIds, actionsById, selectedStateId, setSelectedStateId }) => {
  const actionDivs = stagedActionIds.map(actionId => {
    const action = actionsById[actionId];
    const active = currentStateId >= actionId;
    console.log("active", currentStateId, actionId, active);
    return <Action
      key={actionId}
      onMouseOver={ () => setSelectedStateId(actionId) }
      selected={actionId === selectedStateId}
      active={active}
       >
        { action.action.type }
      </Action>;
  })

  return <div>
      { actionDivs }
  </div>
}

export default ActionList;
