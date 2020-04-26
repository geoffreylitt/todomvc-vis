import React, { Component, PureComponent } from 'react';
import PropTypes from 'prop-types';
import { ActionCreators } from 'redux-devtools';
import styled from 'styled-components'
import ActionList from './ActionList'
import LineGraph from './LineGraph'
import mapValues from 'lodash/mapValues'

const { reset, jumpToState } = ActionCreators;

const Panel = styled.div`
  padding: 20px;
  font-size: 14px;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
`

function reducer() {
  return {};
}

// Todo: switch to functional component
export default class VisMonitor extends (PureComponent || Component) {
  static update = reducer;

  static propTypes = {
    dispatch: PropTypes.func,
    computedStates: PropTypes.array,
    stagedActionIds: PropTypes.array,
    actionsById: PropTypes.object,
    currentStateIndex: PropTypes.number,
    monitorState: PropTypes.shape({
      initialScrollTop: PropTypes.number
    }),
    preserveScrollTop: PropTypes.bool,
    stagedActions: PropTypes.array,
    select: PropTypes.func.isRequired,
  };

  static defaultProps = {
    select: state => state,
  };

  state = {
    selectedStateId: this.props.currentStateIndex
  };

  setSelectedStateId = (stateId) => this.setState({ selectedStateId: stateId })

  render() {
    const {
      currentStateIndex, computedStates, actionsById, stagedActionIds, skippedActionIds
    } = this.props;

    const todosLength = computedStates.map((state, index) => ({
      stateId: index,
      value: state.state.todos.length
    }))

    return (
      <Panel>
        <h3>6.894 A4 Prototype</h3>

        <div>Actions:</div>
        <ActionList currentStateId={currentStateIndex} stagedActionIds={stagedActionIds} skippedActionIds={skippedActionIds} actionsById={actionsById} setSelectedStateId={this.setSelectedStateId} selectedStateId={this.state.selectedStateId} />

        <div>state.todos.length:</div>

        {/* todo: could dynamically define the state -> value function? */}
        <LineGraph data={todosLength} width={150} height={30} setSelectedStateId={this.setSelectedStateId} selectedStateId={this.state.selectedStateId}/>

        <div>
          hovered state Id: {this.state.selectedStateId}
        </div>

        <div>
          current state index: {currentStateIndex}
        </div>
      </Panel>
    );
  }
}
