import React, { Component, PureComponent } from 'react';
import PropTypes from 'prop-types';
import { ActionCreators } from 'redux-devtools';
import styled from 'styled-components'
import ActionList from './ActionList'
import LineGraph from './LineGraph'
import CategoryGraph from './CategoryGraph'
import mapValues from 'lodash/mapValues'
import { getVisibleTodos, getCompletedTodoCount } from '../selectors'

const { reset, jumpToState } = ActionCreators;

const Panel = styled.div`
  padding: 20px;
  font-size: 14px;
  font-weight: normal;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
`
const GraphLabel = styled.span`
  font-family: Courier New,Courier,Lucida Sans Typewriter,Lucida Typewriter,monospace;
  font-weight: 700;
  margin-right: 10px;
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
      currentStateIndex, computedStates, actionsById, stagedActionIds, skippedActionIds, dispatch
    } = this.props;

    const todosLength = computedStates.map((state, index) => ({
      stateId: index,
      value: state.state.todos.length
    }))

    const visibleTodosLength = computedStates.map((state, index) => ({
      stateId: index,
      value: getVisibleTodos(state.state).length
    }))

    const completedTodosCount = computedStates.map((state, index) => ({
      stateId: index,
      value: getCompletedTodoCount(state.state)
    }))

    const visibilityFilter = computedStates.map((state, index) => ({
      stateId: index,
      value: state.state.visibilityFilter
    }))

    return (
      <Panel>
        <h3>6.894 A4 Prototype, Geoffrey Litt</h3>

        <div>Actions:</div>
        <ActionList
          currentStateId={currentStateIndex}
          stagedActionIds={stagedActionIds}
          skippedActionIds={skippedActionIds}
          actionsById={actionsById}
          setSelectedStateId={this.setSelectedStateId}
          selectedStateId={this.state.selectedStateId}
          jumpToState={(stateId) => dispatch(jumpToState(stateId))}
          />

        <div>
          <GraphLabel>state.todos.length</GraphLabel>

          {/* todo: could dynamically define the state -> value function? */}
          <LineGraph
            data={todosLength}
            currentStateId={currentStateIndex}
            width={150}
            height={25}
            setSelectedStateId={this.setSelectedStateId}
            selectedStateId={this.state.selectedStateId}
            jumpToState={(stateId) => dispatch(jumpToState(stateId))}
            />
        </div>

        <div>
          <GraphLabel>visibleTodos.length</GraphLabel>

          {/* todo: could dynamically define the state -> value function? */}
          <LineGraph
            data={visibleTodosLength}
            currentStateId={currentStateIndex}
            width={150}
            height={25}
            setSelectedStateId={this.setSelectedStateId}
            selectedStateId={this.state.selectedStateId}
            jumpToState={(stateId) => dispatch(jumpToState(stateId))}
            />
        </div>

        <div>
          <GraphLabel>completedTodosCount</GraphLabel>

          {/* todo: could dynamically define the state -> value function? */}
          <LineGraph
            data={completedTodosCount}
            currentStateId={currentStateIndex}
            width={150}
            height={25}
            setSelectedStateId={this.setSelectedStateId}
            selectedStateId={this.state.selectedStateId}
            jumpToState={(stateId) => dispatch(jumpToState(stateId))}
            />
        </div>

        <div>
          <GraphLabel>visibilityFilter</GraphLabel>

          {/* todo: could dynamically define the state -> value function? */}
          <CategoryGraph
            data={visibilityFilter}
            currentStateId={currentStateIndex}
            width={150}
            height={25}
            setSelectedStateId={this.setSelectedStateId}
            selectedStateId={this.state.selectedStateId}
            jumpToState={(stateId) => dispatch(jumpToState(stateId))}
            />
        </div>

        <div>
          Debug: hovered state Id: {this.state.selectedStateId}, current state index: {currentStateIndex}
        </div>
      </Panel>
    );
  }
}
